/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC10 PARTICIPATION CUTOFF REVIEW READY
Страница Fandom: MediaWiki:LofarianAchievements/Achievements/Hidden.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Проверяет скрытые достижения и раскрывает их описание только после получения; названия hidden:true остаются видимыми всем.

ДАННЫЕ / I/O
Условия исполняются на клиенте без обфускации; заинтересованный пользователь технически может изучить исходник.

ПРОЗРАЧНОСТЬ И БЕЗОПАСНОСТЬ
- Это открытый, человекочитаемый локальный JavaScript этой вики.
- eval, new Function, обфускация и скрытый/удалённый исполняемый код не используются.
- Исполняемые зависимости находятся только на локальных MediaWiki:*.js страницах.
- Сторонние трекеры и передача пользовательских данных внешним сервисам отсутствуют.
- Код не получает пароль, email или содержимое авторизационных cookie пользователя.
- Официальные награды не доверяются localStorage; localStorage используется только как технический клиентский кэш/очередь.
- Реклама Fandom не скрывается и не модифицируется.

ИНТЕРФЕЙС И ПРАВА
Не скрывает рекламу, не переименовывает Administrator/Bureaucrat, не создаёт системные роли и не меняет MediaWiki user rights. Отдельный UI/Roles.js может показывать только локальные декоративные теги сообщества; они не являются группами прав и не изменяют системные плашки Fandom.

ПРОИЗВОДИТЕЛЬНОСТЬ
- Модуль загружается в предусмотренном dependency-layer; файлы слоя пакетируются штатным Fandom importArticles()/ResourceLoader.
- Повторные загрузки модулей дедуплицируются; тяжёлые Profile/Hall/Admin части подключаются условно.
- Каталог из Project:LofarianAchievementsData/* читается пакетно через MediaWiki API, а не отдельным запросом на каждое достижение.

RC10 — ДОБРОВОЛЬНОЕ УЧАСТИЕ / OPT-IN + CUTOFF
- На обычных страницах этот тяжёлый runtime не загружается для гостей и
  зарегистрированных пользователей, не подключивших систему достижений.
- Неучастники сохраняют возможность просматривать достижения других участников
  на профилях и в Зале славы через viewer-mode без личного подсчёта/записи.
- Участие хранится штатной user-script preference MediaWiki; временный отказ от
  приглашения использует только локальный browser storage.
- Для новых участников серверно фиксируется Unix-время нажатия «Принять участие»;
  исторические правки/создания/загрузки/Discussions до этой отметки не засчитываются.
- Старые участники мигрируются без обнуления уже существующих достижений.

ХРАНЕНИЕ И СОВМЕСТИМОСТЬ
- Официальные записи остаются на этой же вики в Project:LofarianAchievementsUsers/00..ff.
- Progress остаётся в Project:LofarianAchievementsProgress/0..255 в существующем формате L7.
- Схема L7, 256-сегментная модель, edit summary и AbuseFilter-совместимость RC9 не меняются.
- Критичные записи выполняются через стандартный MediaWiki API с CSRF token и действующими правами пользователя.

ПРИМЕЧАНИЕ ДЛЯ REVIEW
Этот файл является одним модулем одной системы Lofarian Achievements. RC10 специально
разделён на небольшие MediaWiki:*.js страницы для прозрачности сопровождения, но
загружается штатным Fandom importArticles()/ResourceLoader с пакетированием.
===============================================================================
*/
(function (root) {
    'use strict';
    var I = root.__LofarianAchievementsInternal;
    if (!I) { throw new Error('[Lofarian Achievements] Runtime отсутствует: Achievements/Hidden'); }
    var C = I.config || {};
    var STATE = I.state || {};
    var api = I.api;
    var HALL_TOP_500_ID = C.HALL_TOP_500_ID;
    var HALL_TOP_100_ID = C.HALL_TOP_100_ID;
    var HALL_TOP_10_ID = C.HALL_TOP_10_ID;
    var ACHIEVEMENT_COUNT_MILESTONE_IDS = C.ACHIEVEMENT_COUNT_MILESTONE_IDS;
    var META_ACHIEVEMENT_IDS = C.META_ACHIEVEMENT_IDS;
    var HIDDEN_AUTOMATIC_ACHIEVEMENT_IDS = C.HIDDEN_AUTOMATIC_ACHIEVEMENT_IDS;
    var SECRET_SERVICE_PAGE_TITLE = 'Project:След Лофариан';
    var FORBIDDEN_ENTITY_TITLE = 'Архаил';
    var RED_THREAD_TITLES = ['Архаил', 'Око Элу-Товир', 'Нтарк-Кевари'];
    var HIDDEN_PAIR_WINDOW_SECONDS = 60 * 60;
    var GLOBAL_SILENCE_SECONDS = 12 * 60 * 60;
    function buildEffectiveAchievementMap() { return I.invoke('buildEffectiveAchievementMap', arguments); }
    function getAchievement() { return I.invoke('getAchievement', arguments); }
    function getCurrentUserId() { return I.invoke('getCurrentUserId', arguments); }
    function getCurrentUserName() { return I.invoke('getCurrentUserName', arguments); }
    function getEditorStatsForUser() { return I.invoke('getEditorStatsForUser', arguments); }
    function getProgressForUser() { return I.invoke('getProgressForUser', arguments); }
    function getParticipationStartedAt() { return I.invoke('getParticipationStartedAt', arguments); }
    function getRarityInfo() { return I.invoke('getRarityInfo', arguments); }
    function getUserAchievementMap() { return I.invoke('getUserAchievementMap', arguments); }
    function isPlainObject() { return I.invoke('isPlainObject', arguments); }
    function nowUnix() { return I.invoke('nowUnix', arguments); }
    function readUserSegment() { return I.invoke('readUserSegment', arguments); }
    function resolveUser() { return I.invoke('resolveUser', arguments); }
    function timestampToUnix() { return I.invoke('timestampToUnix', arguments); }
    function utcDayFromTimestamp() { return I.invoke('utcDayFromTimestamp', arguments); }

function viewerKnowsHiddenAchievement(
    viewerAchievementMap,
    achievementId
) {
    return !!(
        isPlainObject(viewerAchievementMap) &&
        viewerAchievementMap[String(achievementId || '')]
    );
}


var HIDDEN_REVEAL_DESCRIPTIONS = {
    "hidden_ink_not_dry": "Четыре содержательные правки статей совершены в пределах десяти минут.",
    "hidden_forgotten_page": "Отредактирована статья, к которой никто не прикасался не менее двух лет.",
    "hidden_returning_chronicler": "После отсутствия продолжительностью не менее ста восьмидесяти дней пользователь вернулся и в тот же день совершил не менее трёх правок статей.",
    "hidden_one_against_void": "Почти пустая статья одной правкой превращена в заметно более крупный материал: объём вырос минимум на 4500 байт, минимум в четыре раза и достиг 6000 байт.",
    "hidden_quiet_corrector": "Выполнена немалая переработка крупной статьи почти без изменения её итогового объёма.",
    "hidden_dawn_trace": "Правка статьи совершена в узком рассветном промежутке между 04:44 и 04:59 UTC.",
    "hidden_thrice_returned": "К одной и той же статье трижды возвращались после периодов тишины не менее тридцати дней.",
    "hidden_without_traces": "За один день выполнены три разных вида полезной работы — правка статьи, создание статьи и техническая работа — при этом на этот день не пришлась текущая количественная ступень цепочки.",
    "hidden_beyond_chronicle": "Два разных скрытых достижения получены с промежутком не более одного часа.",
    "hidden_something_was_here": "Отредактирована намеренно подготовленная служебная страница «След Лофариан».",
    "hidden_dont_say_name": "Совершено действие со страницей сущности, чьё имя лучше было не произносить.",
    "hidden_red_thread": "За один день затронуты все три страницы скрытой лорной связки.",
    "hidden_last_page": "Правка оказалась последней перед периодом общей тишины на вики продолжительностью не менее двенадцати часов.",
    "hidden_first_after_silence": "Совершена первая правка на вики после общей тишины продолжительностью не менее двенадцати часов.",
    "hidden_thirteenth_sign": "Тринадцатым логическим достижением пользователя стало достижение Мифической редкости.",
    "hidden_forum_thirteen": "В обсуждениях сообщества совершено не менее тринадцати публичных действий. Тринадцатый след оказался замечен Летописью.",
    "hidden_forum_seventy_seven": "В обсуждениях сообщества оставлено не менее семидесяти семи публичных сообщений и ответов.",
    "hidden_forum_likes_thirteen": "Собственные сообщения и ответы получили суммарно не менее тринадцати отметок «Нравится».",
    "hidden_forum_post_seven_likes": "Одно собственное сообщение или ответ получило не менее семи отметок «Нравится».",
    "hidden_forum_dawn": "Публичное действие в обсуждениях совершено между 04:44 и 04:59 UTC.",
    "hidden_forum_old_echo": "Оставлен ответ в беседе, начатой не менее ста восьмидесяти дней назад.",
    "hidden_forum_thirteen_threads": "Создано не менее тринадцати собственных бесед сообщества.",
    "hidden_forum_seventy_seven_replies": "Отправлено не менее семидесяти семи ответов в существующих беседах сообщества.",
    "hidden_forum_seven_liked_posts": "Не менее семи разных собственных сообщений или ответов получили отметку «Нравится».",
    "hidden_forum_thirty_three_threads": "Публичные действия оставлены как минимум в тридцати трёх разных беседах сообщества."
};

function getHiddenUnlockedDescription(achievementId, fallbackDescription) {
    achievementId = String(achievementId || '');
    if (Object.prototype.hasOwnProperty.call(HIDDEN_REVEAL_DESCRIPTIONS, achievementId)) {
        return HIDDEN_REVEAL_DESCRIPTIONS[achievementId];
    }
    return String(fallbackDescription || '');
}


function buildHiddenConditionNoise(achievementId) {
    /*
     * TEST 1.12.5:
     * у скрытых/тайных достижений больше нет декоративного шума.
     * Для кеварийского секретного достижения оставлена отдельная
     * каноническая формулировка.
     */
    if (
        String(achievementId || '') ===
        'znaet_sudbu_kevar'
    ) {
        return 'КРАСНАЯ ТИШИНА';
    }

    return 'Условие засекречено';
}


    function normalizeHiddenTitle(value) {
        return String(value || '')
            .replace(/_/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .toLocaleLowerCase('ru');
    }


    function isSecretServicePageTitle(value) {
        var title = normalizeHiddenTitle(value);
        var expected = normalizeHiddenTitle(SECRET_SERVICE_PAGE_TITLE);
        var newTail = normalizeHiddenTitle('След Лофариан');

        /*
         * RC11.7: техническая страница использует несклоняемое имя
         * мира — «След Лофариан». Если на вики осталась старая страница
         * с прежним названием, её следует один раз переименовать.
         */
        return (
            title === expected ||
            title.slice(-(':' + newTail).length) === ':' + newTail
        );
    }


    function analyzeCrossContributionHiddenAchievements(
        catalog,
        user,
        articleContributions,
        createdContributions,
        technicalContributions,
        globalRecentChanges,
        baseAchievementMap
    ) {
        var result = {
            hiddenWithoutTraces: false,
            hiddenRedThread: false,
            hiddenFirstAfterSilence: false,
            hiddenLastPage: false,
            achievementMap: {}
        };

        articleContributions = Array.isArray(articleContributions)
            ? articleContributions
            : [];
        createdContributions = Array.isArray(createdContributions)
            ? createdContributions
            : [];
        technicalContributions = Array.isArray(technicalContributions)
            ? technicalContributions
            : [];
        globalRecentChanges = Array.isArray(globalRecentChanges)
            ? globalRecentChanges
            : [];

        var dayTypes = {};
        var dayMaxUnix = {};
        var redThreadByDay = {};
        var redThreadRequired = {};

        RED_THREAD_TITLES.forEach(function (title) {
            redThreadRequired[normalizeHiddenTitle(title)] = true;
        });

        function registerDayType(timestamp, type) {
            var day = utcDayFromTimestamp(timestamp);
            var unix = timestampToUnix(timestamp);

            if (!day || unix <= 0) {
                return;
            }

            if (!dayTypes[day]) {
                dayTypes[day] = {};
            }

            dayTypes[day][type] = true;
            dayMaxUnix[day] = Math.max(
                Number(dayMaxUnix[day] || 0),
                unix
            );
        }

        articleContributions.forEach(function (item) {
            item = item || {};
            var unix = timestampToUnix(item.timestamp);
            var normalized = normalizeHiddenTitle(item.title);

            if (Math.abs(Number(item.sizediff) || 0) >= 50) {
                registerDayType(item.timestamp, 'edit');
            }

            if (
                normalized === normalizeHiddenTitle(FORBIDDEN_ENTITY_TITLE) &&
                unix > 0 &&
                !result.achievementMap.hidden_dont_say_name
            ) {
                result.achievementMap.hidden_dont_say_name = unix;
            }

            if (redThreadRequired[normalized]) {
                var day = utcDayFromTimestamp(item.timestamp);
                if (day) {
                    if (!redThreadByDay[day]) {
                        redThreadByDay[day] = {};
                    }
                    redThreadByDay[day][normalized] = true;
                    dayMaxUnix[day] = Math.max(
                        Number(dayMaxUnix[day] || 0),
                        unix
                    );
                }
            }
        });

        createdContributions.forEach(function (item) {
            registerDayType(item && item.timestamp, 'creation');
        });

        technicalContributions.forEach(function (item) {
            item = item || {};
            var ns = Number(item.ns);
            var unix = timestampToUnix(item.timestamp);

            if (
                (ns === 10 || ns === 14) &&
                item.new === true
            ) {
                registerDayType(item.timestamp, 'technical');
            }

            if (
                isSecretServicePageTitle(item.title) &&
                unix > 0 &&
                !result.achievementMap.hidden_something_was_here
            ) {
                result.achievementMap.hidden_something_was_here = unix;
            }
        });

        Object.keys(redThreadByDay).some(function (day) {
            var found = redThreadByDay[day];
            var complete = Object.keys(redThreadRequired).every(
                function (key) {
                    return !!found[key];
                }
            );

            if (complete) {
                result.achievementMap.hidden_red_thread =
                    Number(dayMaxUnix[day] || 1);
                result.hiddenRedThread = true;
                return true;
            }
            return false;
        });

        var tierAwardDays = {};
        Object.keys(baseAchievementMap || {}).forEach(function (id) {
            var achievement = getAchievement(catalog, id);
            if (!achievement || !achievement.family) {
                return;
            }
            var unix = Number(baseAchievementMap[id] || 0);
            if (unix < 946684800) {
                return;
            }
            tierAwardDays[
                new Date(unix * 1000).toISOString().slice(0, 10)
            ] = true;
        });

        Object.keys(dayTypes).some(function (day) {
            var types = dayTypes[day];
            if (
                types.edit &&
                types.creation &&
                types.technical &&
                !tierAwardDays[day]
            ) {
                result.achievementMap.hidden_without_traces =
                    Number(dayMaxUnix[day] || 1);
                result.hiddenWithoutTraces = true;
                return true;
            }
            return false;
        });

        /*
         * Две «тишины» сверяются с единым кэшированным recentchanges.
         * Для одной сборки Зала славы список запрашивается один раз.
         */
        var rcIndexByRevision = {};
        globalRecentChanges.forEach(function (row, index) {
            var revid = Number(row && row.revid) || 0;
            if (revid > 0) {
                rcIndexByRevision[revid] = index;
            }
        });

        articleContributions.some(function (item) {
            var index = rcIndexByRevision[
                Number(item && item.revid) || 0
            ];

            if (index === undefined) {
                return false;
            }

            var row = globalRecentChanges[index] || {};
            var unix = timestampToUnix(row.timestamp);
            if (unix <= 0) {
                return false;
            }

            if (index > 0) {
                var previousUnix = timestampToUnix(
                    globalRecentChanges[index - 1] &&
                    globalRecentChanges[index - 1].timestamp
                );

                if (
                    previousUnix > 0 &&
                    unix - previousUnix >= GLOBAL_SILENCE_SECONDS &&
                    !result.achievementMap.hidden_first_after_silence
                ) {
                    result.achievementMap.hidden_first_after_silence = unix;
                    result.hiddenFirstAfterSilence = true;
                }
            }

            var nextUnix = 0;
            if (index + 1 < globalRecentChanges.length) {
                nextUnix = timestampToUnix(
                    globalRecentChanges[index + 1] &&
                    globalRecentChanges[index + 1].timestamp
                );
            }

            if (
                (
                    nextUnix > 0 &&
                    nextUnix - unix >= GLOBAL_SILENCE_SECONDS
                ) ||
                (
                    index === globalRecentChanges.length - 1 &&
                    nowUnix() - unix >= GLOBAL_SILENCE_SECONDS
                )
            ) {
                if (!result.achievementMap.hidden_last_page) {
                    result.achievementMap.hidden_last_page = unix;
                    result.hiddenLastPage = true;
                }
            }

            return (
                result.hiddenFirstAfterSilence &&
                result.hiddenLastPage
            );
        });

        return result;
    }


    function addDerivedHiddenAchievements(
        catalog,
        achievementMap
    ) {
        achievementMap = isPlainObject(achievementMap)
            ? achievementMap
            : {};

        /* «По ту сторону Летописи»: две разные скрытые награды за час. */
        var hiddenTimes = [];
        Object.keys(HIDDEN_AUTOMATIC_ACHIEVEMENT_IDS).forEach(
            function (achievementId) {
                if (
                    achievementId === 'hidden_beyond_chronicle' ||
                    achievementId === 'hidden_thirteenth_sign'
                ) {
                    return;
                }

                var unix = Number(achievementMap[achievementId] || 0);
                if (unix >= 946684800) {
                    hiddenTimes.push({ id: achievementId, unix: unix });
                }
            }
        );

        hiddenTimes.sort(function (a, b) {
            return a.unix - b.unix;
        });

        for (var i = 1; i < hiddenTimes.length; i++) {
            if (
                hiddenTimes[i].id !== hiddenTimes[i - 1].id &&
                hiddenTimes[i].unix - hiddenTimes[i - 1].unix <=
                    HIDDEN_PAIR_WINDOW_SECONDS
            ) {
                achievementMap.hidden_beyond_chronicle =
                    hiddenTimes[i].unix;
                break;
            }
        }

        /*
         * «Тринадцатый знак»: мета/коллекторные награды не вмешиваются
         * в последовательность. Уровневая семья считается одним логическим
         * достижением по текущей максимальной подтверждённой ступени.
         */
        var logical = {};

        Object.keys(achievementMap).forEach(function (achievementId) {
            if (
                ACHIEVEMENT_COUNT_MILESTONE_IDS[achievementId] ||
                META_ACHIEVEMENT_IDS[achievementId] ||
                achievementId === HALL_TOP_500_ID ||
                achievementId === HALL_TOP_100_ID ||
                achievementId === HALL_TOP_10_ID ||
                achievementId === 'hidden_thirteenth_sign'
            ) {
                return;
            }

            var achievement = getAchievement(catalog, achievementId);
            if (!achievement) {
                return;
            }

            var unix = Number(achievementMap[achievementId] || 0);
            if (unix < 946684800) {
                return;
            }

            var logicalId = achievement.family
                ? 'family:' + String(achievement.family)
                : 'achievement:' + achievementId;

            var previous = logical[logicalId];
            if (
                !previous ||
                Number(achievement.tier || 0) >
                    Number(previous.achievement.tier || 0)
            ) {
                logical[logicalId] = {
                    id: achievementId,
                    achievement: achievement,
                    unix: unix
                };
            }
        });

        var timeline = Object.keys(logical)
            .map(function (key) { return logical[key]; })
            .sort(function (a, b) {
                if (a.unix !== b.unix) {
                    return a.unix - b.unix;
                }
                return String(a.id).localeCompare(String(b.id), 'ru');
            });

        if (timeline.length >= 13) {
            var thirteenth = timeline[12];
            var rarity = getRarityInfo(
                catalog,
                thirteenth.achievement
            );

            if (rarity.key === 'mythic') {
                achievementMap.hidden_thirteenth_sign =
                    thirteenth.unix;
            }
        }

        return achievementMap;
    }


    function getCurrentViewerEffectiveAchievementMap(
        catalog
    ) {
        var currentId = getCurrentUserId();
        var currentName = getCurrentUserName();

        if (!currentId || !currentName) {
            return Promise.resolve({});
        }

        return resolveUser(currentName)
            .then(function (viewerUser) {
                return Promise.all([
                    readUserSegment(viewerUser.userid, false),
                    getProgressForUser(viewerUser, false),
                    Promise.all([
                        readUserSegment(viewerUser.userid, false),
                        getProgressForUser(viewerUser, false)
                    ]).then(function (cutoffData) {
                        var cutoffProtected = getUserAchievementMap(
                            cutoffData[0].data,
                            viewerUser.userid
                        );
                        var explicitStartedAt = I.participation
                            ? Number(I.participation.startedAt || 0)
                            : 0;
                        var startedAt = getParticipationStartedAt(
                            cutoffProtected,
                            cutoffData[1],
                            explicitStartedAt
                        );
                        var baseline = I.participation
                            ? Number(I.participation.discussionBaselineTotal)
                            : -1;
                        return getEditorStatsForUser(
                            viewerUser,
                            false,
                            startedAt,
                            baseline
                        );
                    })
                ]).then(function (viewerResults) {
                    var viewerProtectedMap =
                        getUserAchievementMap(
                            viewerResults[0].data,
                            viewerUser.userid
                        );

                    return buildEffectiveAchievementMap(
                        catalog,
                        viewerUser,
                        viewerProtectedMap,
                        viewerResults[1],
                        viewerResults[2].achievementMap,
                        viewerResults[2]
                    );
                });
            })
            .catch(function (error) {
                console.warn(
                    '[Lofarian Achievements] Не удалось загрузить собственные раскрытые тайны:',
                    error
                );
                return {};
            });
    }



    /*
     * RC3: декларативное зеркало каталога удалено из runtime.
     * Единственный пользовательский источник названий/описаний/редкостей/
     * очков и семей — Project:LofarianAchievementsData и его части.
     * Этот модуль содержит только исполняемую логику TEST 1.16.3.
     */

    I.registerFunctions('Achievements/Hidden', {
        viewerKnowsHiddenAchievement: viewerKnowsHiddenAchievement,
        getHiddenUnlockedDescription: getHiddenUnlockedDescription,
        buildHiddenConditionNoise: buildHiddenConditionNoise,
        normalizeHiddenTitle: normalizeHiddenTitle,
        isSecretServicePageTitle: isSecretServicePageTitle,
        analyzeCrossContributionHiddenAchievements: analyzeCrossContributionHiddenAchievements,
        addDerivedHiddenAchievements: addDerivedHiddenAchievements,
        getCurrentViewerEffectiveAchievementMap: getCurrentViewerEffectiveAchievementMap
    }, ["buildEffectiveAchievementMap", "getAchievement", "getCurrentUserId", "getCurrentUserName", "getEditorStatsForUser", "getProgressForUser", "getParticipationStartedAt", "getRarityInfo", "getUserAchievementMap", "isPlainObject", "nowUnix", "readUserSegment", "resolveUser", "timestampToUnix", "utcDayFromTimestamp"]);
})(window);