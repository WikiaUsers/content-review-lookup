/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC10 PARTICIPATION CUTOFF REVIEW READY
Страница Fandom: MediaWiki:LofarianAchievements/Admin.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Административные команды grant/revoke/audit/repair/compact/checkImage и диагностика для существующего публичного admin API.

ДАННЫЕ / I/O
Feature подключается только пользователям с разрешёнными группами; записи идут через MediaWiki API/Storage и CSRF token.

ПРОЗРАЧНОСТЬ И БЕЗОПАСНОСТЬ
- Это открытый, человекочитаемый локальный JavaScript этой вики.
- eval, new Function, обфускация и скрытый/удалённый исполняемый код не используются.
- Исполняемые зависимости находятся только на локальных MediaWiki:*.js страницах.
- Сторонние трекеры и передача пользовательских данных внешним сервисам отсутствуют.
- Код не получает пароль, email или содержимое авторизационных cookie пользователя.
- Официальные награды не доверяются localStorage; localStorage используется только как технический клиентский кэш/очередь.
- Реклама Fandom не скрывается и не модифицируется.

ИНТЕРФЕЙС И ПРАВА
Админские команды не создают/не переименовывают MediaWiki-группы и не меняют user rights. Модуль доступен runtime только пользователю, которого MediaWiki userinfo определяет как администратора.

ПРОИЗВОДИТЕЛЬНОСТЬ
- Этот тяжёлый/контекстный модуль подключается условно только для соответствующей feature (profile/hall/admin/leaderboard), а не на каждой странице.
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
    if (!I) { throw new Error('[Lofarian Achievements] Runtime отсутствует: Admin'); }
    var C = I.config || {};
    var STATE = I.state || {};
    var api = I.api;
    var FIRST_LOGIN_ID = C.FIRST_LOGIN_ID;
    var HALL_TOP_500_ID = C.HALL_TOP_500_ID;
    var HALL_TOP_100_ID = C.HALL_TOP_100_ID;
    var HALL_TOP_10_ID = C.HALL_TOP_10_ID;
    var PROGRESS_PAGE_PREFIX = C.PROGRESS_PAGE_PREFIX;
    var PROGRESS_SEGMENT_COUNT = C.PROGRESS_SEGMENT_COUNT;
    var PROGRESS_RECORD_VERSION = C.PROGRESS_RECORD_VERSION;
    var PROGRESS_EDIT_SUMMARY = C.PROGRESS_EDIT_SUMMARY;
    function buildEffectiveAchievementMap() { return I.invoke('buildEffectiveAchievementMap', arguments); }
    function calculateScore() { return I.invoke('calculateScore', arguments); }
    function cloneData() { return I.invoke('cloneData', arguments); }
    function forEachCatalogAchievement() { return I.invoke('forEachCatalogAchievement', arguments); }
    function formatAchievementDate() { return I.invoke('formatAchievementDate', arguments); }
    function formatPoints() { return I.invoke('formatPoints', arguments); }
    function formatProgressRecordLine() { return I.invoke('formatProgressRecordLine', arguments); }
    function getAchievement() { return I.invoke('getAchievement', arguments); }
    function getAchievementPoints() { return I.invoke('getAchievementPoints', arguments); }
    function getCurrentUserId() { return I.invoke('getCurrentUserId', arguments); }
    function getEditorStatsForUser() { return I.invoke('getEditorStatsForUser', arguments); }
    function getLeaderboardRowsCached() { return I.invoke('getLeaderboardRowsCached', arguments); }
    function getProgressForUser() { return I.invoke('getProgressForUser', arguments); }
    function getParticipationStartedAt() { return I.invoke('getParticipationStartedAt', arguments); }
    function getSegmentId() { return I.invoke('getSegmentId', arguments); }
    function getSegmentPageTitle() { return I.invoke('getSegmentPageTitle', arguments); }
    function getUserAchievementMap() { return I.invoke('getUserAchievementMap', arguments); }
    function isAutomaticProgressAchievementId() { return I.invoke('isAutomaticProgressAchievementId', arguments); }
    function isPlainObject() { return I.invoke('isPlainObject', arguments); }
    function nowUnix() { return I.invoke('nowUnix', arguments); }
    function parseProgressRecordLine() { return I.invoke('parseProgressRecordLine', arguments); }
    function parseProgressSegmentText() { return I.invoke('parseProgressSegmentText', arguments); }
    function readCatalog() { return I.invoke('readCatalog', arguments); }
    function readUserSegment() { return I.invoke('readUserSegment', arguments); }
    function readWikiPage() { return I.invoke('readWikiPage', arguments); }
    function resolveFileUrl() { return I.invoke('resolveFileUrl', arguments); }
    function resolveUser() { return I.invoke('resolveUser', arguments); }
    function saveSegment() { return I.invoke('saveSegment', arguments); }
    function showAchievementPopup() { return I.invoke('showAchievementPopup', arguments); }
    function writeWikiPage() { return I.invoke('writeWikiPage', arguments); }
    function postWikiEdit() { return I.invoke('postWikiEdit', arguments); }
    function publishAchievementNews() { return I.invoke('publishAchievementNews', arguments); }
    function clearAchievementNews() { return I.invoke('clearAchievementNews', arguments); }
    function readAchievementNews() { return I.invoke('readAchievementNews', arguments); }


    function readUserPageSource(username) {
        return readWikiPage('User:' + username);
    }


    function extractManualAchievementsSection(content) {
        var targetRegex =
            /^==\s*Достижения\s*==\s*$/gmi;

        var match = targetRegex.exec(content);

        if (!match) {
            return null;
        }

        var start = match.index;
        var bodyStart = match.index + match[0].length;
        var rest = content.slice(bodyStart);

        var nextMatch =
            /^==\s*[^=\n].*?\s*==\s*$/m.exec(rest);

        var end = nextMatch
            ? bodyStart + nextMatch.index
            : content.length;

        return {
            start: start,
            end: end,
            text: content.slice(start, end),
            body: content.slice(bodyStart, end)
        };
    }


    function extractManualAchievementTitles(content) {
        var section = extractManualAchievementsSection(content);

        if (!section) {
            return [];
        }

        var result = [];
        var pattern = /'''([^']+)'''/g;
        var match;

        while ((match = pattern.exec(section.body))) {
            result.push(match[1].trim());
        }

        return result;
    }


    function grantTo(username, achievementId) {
        username = String(username || '').trim();
        achievementId = String(achievementId || '').trim();

        if (!username) {
            return Promise.reject(
                new Error('Не указано имя пользователя.')
            );
        }

        if (!achievementId) {
            return Promise.reject(
                new Error('Не указан ID достижения.')
            );
        }

        if (achievementId === FIRST_LOGIN_ID) {
            return Promise.reject(
                new Error(
                    'first_login выдаётся автоматически при добровольном ' +
                    'подключении к Летописи достижений. Вручную его ' +
                    'выдавать не нужно.'
                )
            );
        }

        if (isAutomaticProgressAchievementId(achievementId)) {
            return Promise.reject(
                new Error(
                    'Это автоматическое достижение. Оно рассчитывается системой и вручную не выдаётся.'
                )
            );
        }

        return Promise.all([
            readCatalog(false),
            resolveUser(username)
        ]).then(function (results) {
            var catalog = results[0];
            var user = results[1];
            var achievement = getAchievement(
                catalog,
                achievementId
            );

            if (!achievement) {
                throw new Error(
                    'Неизвестное достижение: ' + achievementId
                );
            }

            return readUserSegment(
                user.userid,
                true
            ).then(function (loaded) {
                var userKey = String(user.userid);
                var achievementMap = getUserAchievementMap(
                    loaded.data,
                    user.userid
                );

                if (achievementMap[achievementId]) {
                    console.log(
                        '[Lofarian Achievements] У пользователя уже есть достижение:',
                        user.name,
                        achievementId
                    );

                    return {
                        success: true,
                        alreadyOwned: true,
                        user: user,
                        segment: loaded.id
                    };
                }

                if (!isPlainObject(loaded.data.users[userKey])) {
                    loaded.data.users[userKey] = {};
                }

                var earnedAt = nowUnix();

                loaded.data.users[userKey][achievementId] =
                    earnedAt;

                return saveSegment(loaded)
                    .then(function (saveResult) {
                        console.log(
                            '[Lofarian Achievements] ✅ Достижение выдано:',
                            achievementId,
                            '→',
                            user.name,
                            '| segment',
                            loaded.id
                        );

                        if (user.userid === getCurrentUserId()) {
                            showAchievementPopup(
                                catalog,
                                achievement
                            );

                            var seenKey =
                                'lof-achievements-seen:user:' +
                                user.userid;

                            var seen = {};

                            try {
                                seen = JSON.parse(
                                    localStorage.getItem(seenKey) ||
                                    '{}'
                                );
                            } catch (error) {
                                seen = {};
                            }

                            if (!isPlainObject(seen)) {
                                seen = {};
                            }

                            seen[achievementId] = earnedAt;

                            localStorage.setItem(
                                seenKey,
                                JSON.stringify(seen)
                            );
                        }

                        return {
                            success: true,
                            alreadyOwned: false,
                            user: user,
                            segment: loaded.id,
                            segmentPage: loaded.title,
                            earnedAt: earnedAt,
                            save: saveResult
                        };
                    });
            });
        });
    }


    function revokeFrom(username, achievementId) {
        username = String(username || '').trim();
        achievementId = String(achievementId || '').trim();

        if (!username) {
            return Promise.reject(
                new Error('Не указано имя пользователя.')
            );
        }

        if (!achievementId) {
            return Promise.reject(
                new Error('Не указан ID достижения.')
            );
        }

        if (achievementId === FIRST_LOGIN_ID) {
            return Promise.reject(
                new Error(
                    'first_login нельзя отозвать отдельно: это стартовое ' +
                    'достижение добровольного участия в программе.'
                )
            );
        }

        if (isAutomaticProgressAchievementId(achievementId)) {
            return Promise.reject(
                new Error(
                    'Это автоматическое достижение. Оно рассчитывается системой и вручную не отзывается.'
                )
            );
        }

        return Promise.all([
            readCatalog(false),
            resolveUser(username)
        ]).then(function (results) {
            var catalog = results[0];
            var user = results[1];

            if (!getAchievement(catalog, achievementId)) {
                throw new Error(
                    'Неизвестное достижение: ' + achievementId
                );
            }

            return readUserSegment(
                user.userid,
                true
            ).then(function (loaded) {
                if (!loaded.exists) {
                    return {
                        success: true,
                        removed: false,
                        user: user,
                        segment: loaded.id
                    };
                }

                var userKey = String(user.userid);
                var achievementMap =
                    loaded.data.users[userKey];

                if (
                    !isPlainObject(achievementMap) ||
                    !achievementMap[achievementId]
                ) {
                    return {
                        success: true,
                        removed: false,
                        user: user,
                        segment: loaded.id
                    };
                }

                /*
                 * НИКАКОЙ ИСТОРИИ ОТЗЫВА.
                 * Просто удаляем запись.
                 */
                delete achievementMap[achievementId];

                /*
                 * Если достижений не осталось,
                 * пользователя в базе тоже больше нет.
                 */
                if (Object.keys(achievementMap).length === 0) {
                    delete loaded.data.users[userKey];
                }

                return saveSegment(loaded)
                    .then(function (saveResult) {
                        console.log(
                            '[Lofarian Achievements] ✅ Достижение удалено:',
                            achievementId,
                            '←',
                            user.name
                        );

                        if (user.userid === getCurrentUserId()) {
                            var seenKey =
                                'lof-achievements-seen:user:' +
                                user.userid;

                            var seen = {};

                            try {
                                seen = JSON.parse(
                                    localStorage.getItem(seenKey) ||
                                    '{}'
                                );
                            } catch (error) {
                                seen = {};
                            }

                            if (isPlainObject(seen)) {
                                delete seen[achievementId];

                                localStorage.setItem(
                                    seenKey,
                                    JSON.stringify(seen)
                                );
                            }
                        }

                        return {
                            success: true,
                            removed: true,
                            user: user,
                            segment: loaded.id,
                            segmentPage: loaded.title,
                            save: saveResult
                        };
                    });
            });
        });
    }


    function inspectUser(username) {
        return Promise.all([
            readCatalog(false),
            resolveUser(username)
        ]).then(function (results) {
            var catalog = results[0];
            var user = results[1];
            return Promise.all([
                readUserSegment(user.userid, true),
                getProgressForUser(user, true),
                Promise.all([
                    readUserSegment(user.userid, true),
                    getProgressForUser(user, true)
                ]).then(function (cutoffData) {
                    var cutoffProtected = getUserAchievementMap(cutoffData[0].data, user.userid);
                    var startedAt = getParticipationStartedAt(cutoffProtected, cutoffData[1], 0);
                    return getEditorStatsForUser(user, true, startedAt, -1);
                })
            ]).then(function (inner) {
                var loaded = inner[0];
                var progress = inner[1];
                var editorStats = inner[2];

                var map = buildEffectiveAchievementMap(
                    catalog,
                    user,
                    getUserAchievementMap(loaded.data, user.userid),
                    progress,
                    editorStats.achievementMap,
                    editorStats
                );
                var scoreInfo = calculateScore(catalog, map);
                var rows = Object.keys(map).map(function (achievementId) {
                    var achievement = getAchievement(catalog, achievementId);
                    return {
                        id: achievementId,
                        title: achievement ? achievement.title : '(ID отсутствует в каталоге)',
                        points: achievement ? getAchievementPoints(achievement) : 0,
                        earned: formatAchievementDate(map[achievementId]),
                        unix: map[achievementId]
                    };
                });
                var result = {
                    username: user.name,
                    userId: user.userid,
                    segment: loaded.id,
                    segmentPage: loaded.title,
                    score: scoreInfo.score,
                    achievementCount: scoreInfo.count,
                    achievements: cloneData(map),
                    readingProgress: cloneData(progress),
                    editorStats: cloneData(editorStats)
                };
                console.log('========== ДОСТИЖЕНИЯ ПОЛЬЗОВАТЕЛЯ ==========');
                console.log('Пользователь:', user.name);
                console.log('User ID:', user.userid);
                console.log('Сегмент:', loaded.id);
                console.log('Страница:', loaded.title);
                console.log('Очки:', formatPoints(scoreInfo.score));
                console.log('Прочитано статей:', progress.articleCount);
                console.log('Активное чтение, секунд:', progress.activeSeconds);
                console.log('Правок в статьях:', editorStats.editCount);
                console.log('Создано статей:', editorStats.createdArticles);
                console.log('Различных статей с правками:', editorStats.uniqueArticles);
                console.log('Дней с правками:', editorStats.distinctEditDays);
                console.log('Крупных правок (|Δ| ≥ 500 байт):', editorStats.majorEdits);
                console.log('Новых загруженных файлов:', editorStats.uploadedFiles);
                console.log('Максимальная цепочка дней:', editorStats.maxConsecutiveEditDays);
                console.log('Очищающих правок:', editorStats.correctiveEdits);
                console.log('Создано категорий:', editorStats.createdCategories);
                console.log('Создано шаблонов:', editorStats.createdTemplates);
                console.log('Разных технических страниц:', editorStats.uniqueTechnicalPages);
                console.log('Максимум созданных статей за сутки:', editorStats.maxCreatedArticlesInOneDay);
                console.log('Пробуждённых статей в историческом окне:', editorStats.awakenedArticles);
                console.log('Максимальная тишина статьи, секунд:', editorStats.maxDormantGapSeconds);
                console.log('Категорий в «Сто дорог»:', editorStats.roadCategories);
                console.log('Завершённых заготовок:', editorStats.completedDrafts);
                console.log('Тематическое чтение:', progress.themeArticleCounts);
                console.log('Тематическое активное время:', progress.themeActiveSeconds);
                console.table(rows);
                console.log('=============================================');
                return result;
            });
        });
    }


    function auditProfile(username) {
        return Promise.all([
            readCatalog(false),
            resolveUser(username),
            readUserPageSource(username)
        ]).then(function (results) {
            var catalog = results[0];
            var user = results[1];
            var page = results[2];
            return Promise.all([
                readUserSegment(user.userid, true),
                getProgressForUser(user, true),
                Promise.all([
                    readUserSegment(user.userid, true),
                    getProgressForUser(user, true)
                ]).then(function (cutoffData) {
                    var cutoffProtected = getUserAchievementMap(cutoffData[0].data, user.userid);
                    var startedAt = getParticipationStartedAt(cutoffProtected, cutoffData[1], 0);
                    return getEditorStatsForUser(user, true, startedAt, -1);
                }),
                getLeaderboardRowsCached(
                    catalog,
                    false
                )
            ]).then(function (inner) {
                var loaded = inner[0];
                var progress = inner[1];
                var editorStats = inner[2];
                var hallRows = inner[3];

                var officialMap = buildEffectiveAchievementMap(
                    catalog,
                    user,
                    getUserAchievementMap(loaded.data, user.userid),
                    progress,
                    editorStats.achievementMap,
                    editorStats
                );
                hallRows.some(function (row) {
                    if (
                        Number(
                            row.userId
                        ) !==
                        Number(
                            user.userid
                        )
                    ) {
                        return false;
                    }

                    [
                        HALL_TOP_500_ID,
                        HALL_TOP_100_ID,
                        HALL_TOP_10_ID
                    ].forEach(function (achievementId) {
                        if (
                            row.achievementMap &&
                            row.achievementMap[
                                achievementId
                            ]
                        ) {
                            officialMap[
                                achievementId
                            ] =
                                row.achievementMap[
                                    achievementId
                                ];
                        }
                    });

                    return true;
                });

                var officialIds = Object.keys(officialMap);
                var manualSection = extractManualAchievementsSection(page.content);
                var manualTitles = extractManualAchievementTitles(page.content);
                var titleToId = {};

                forEachCatalogAchievement(
                    catalog,
                    function (
                        id,
                        achievement
                    ) {
                        if (
                            achievement &&
                            achievement.title
                        ) {
                            titleToId[
                                String(
                                    achievement.title
                                )
                                .trim()
                                .toLowerCase()
                            ] =
                                id;
                        }
                    }
                );
                var fake = [];
                var unknown = [];
                var duplicatedOfficial = [];
                manualTitles.forEach(function (title) {
                    var id = titleToId[String(title).trim().toLowerCase()];
                    if (!id) {
                        unknown.push(title);
                        return;
                    }
                    if (officialIds.indexOf(id) === -1) {
                        fake.push({ id: id, title: title });
                    } else {
                        duplicatedOfficial.push({ id: id, title: title });
                    }
                });
                var result = {
                    username: user.name,
                    userId: user.userid,
                    segment: loaded.id,
                    manualSectionExists: !!manualSection,
                    officialIds: officialIds,
                    manualTitles: manualTitles,
                    fake: fake,
                    unknown: unknown,
                    duplicatedOfficial: duplicatedOfficial
                };
                console.log('========== АУДИТ ДОСТИЖЕНИЙ ==========');
                console.log('Пользователь:', user.name);
                console.log('User ID:', user.userid);
                console.log('Сегмент:', loaded.id);
                console.log('Официальные:', officialIds);
                console.log('Ручной раздел существует:', !!manualSection);
                console.log('Вписано вручную:', manualTitles);
                console.log('Поддельные известные:', fake);
                console.log('Неизвестные названия:', unknown);
                console.log('Официальные, но продублированные вручную:', duplicatedOfficial);
                console.log('=======================================');
                return result;
            });
        });
    }


    function cleanProfile(username) {
        return readUserPageSource(username)
            .then(function (page) {
                if (!page.exists) {
                    return {
                        success: true,
                        removed: false
                    };
                }

                var section = extractManualAchievementsSection(
                    page.content
                );

                if (!section) {
                    return {
                        success: true,
                        removed: false
                    };
                }

                var before = page.content
                    .slice(0, section.start)
                    .replace(/\s+$/, '');

                var after = page.content
                    .slice(section.end)
                    .replace(/^\s+/, '');

                var newContent = before;

                if (before && after) {
                    newContent += '\n\n' + after;
                } else if (after) {
                    newContent = after;
                }

                return writeWikiPage(
                    page.title,
                    newContent,
                    page.revid
                ).then(function (result) {
                    console.log(
                        '[Lofarian Achievements] ' +
                        'Ручной раздел «Достижения» удалён у:',
                        username
                    );

                    return {
                        success: true,
                        removed: true,
                        result: result
                    };
                });
            });
    }


    function scoreFor(username) {
        return inspectUser(username)
            .then(function (result) {
                console.log(
                    '[Lofarian Achievements] Итог:',
                    result.username,
                    '—',
                    formatPoints(result.score)
                );

                return {
                    username:
                        result.username,

                    userId:
                        result.userId,

                    score:
                        result.score,

                    achievementCount:
                        result.achievementCount
                };
            });
    }


    function topUsers(limit) {
        limit = Math.max(
            1,
            Math.floor(Number(limit) || 20)
        );

        return readCatalog(true)
            .then(function (catalog) {
                return getLeaderboardRowsCached(catalog, true);
            })
            .then(function (rows) {
                var top = rows.slice(0, limit);

                console.table(
                    top.map(function (row) {
                        return {
                            place: row.rank,
                            user: row.name,
                            points: row.score,
                            achievements: row.count,
                            userId: row.userId
                        };
                    })
                );

                return top;
            });
    }


    function checkImageInternal(fileName) {
        return resolveFileUrl(fileName)
            .then(function (result) {
                console.log(
                    '======================================='
                );
                console.log('✅ КАРТИНКА НАЙДЕНА');
                console.log('Файл:', result.title);
                console.log(
                    'Размер:',
                    result.width,
                    'x',
                    result.height
                );
                console.log('MIME:', result.mime);
                console.log('URL:', result.url);
                console.log(
                    'Thumbnail:',
                    result.thumbUrl || 'нет'
                );
                console.log(
                    'Оригинал:',
                    result.originalUrl || 'нет'
                );
                console.log(
                    '======================================='
                );

                return result;
            }).catch(function (error) {
                console.error(
                    '❌ КАРТИНКА НЕ НАЙДЕНА:',
                    fileName,
                    error
                );

                throw error;
            });
    }


    function segmentFor(username) {
        return resolveUser(username)
            .then(function (user) {
                var result = {
                    username: user.name,
                    userId: user.userid,
                    segment: getSegmentId(user.userid),
                    page: getSegmentPageTitle(user.userid)
                };

                console.log(
                    '[Lofarian Achievements] Сегмент:',
                    result
                );

                return result;
            });
    }


    function compactProgressSegmentPage(
        segmentNumber
    ) {
        segmentNumber =
            Math.max(
                0,
                Math.min(
                    PROGRESS_SEGMENT_COUNT - 1,
                    Math.floor(
                        Number(segmentNumber) || 0
                    )
                )
            );

        var title =
            PROGRESS_PAGE_PREFIX +
            String(segmentNumber);

        return readWikiPage(
            title
        ).then(function (page) {
            if (!page.exists) {
                return {
                    segment: segmentNumber,
                    title: title,
                    changed: false,
                    records: 0,
                    legacyRecords: 0,
                    missing: true
                };
            }

            var parsed =
                parseProgressSegmentText(
                    page.content,
                    title
                );

            var lines =
                parsed.lines.slice();

            var legacyRecords = 0;
            var skippedOlderRecords = 0;
            var recordCount = 0;

            for (
                var i = 2;
                i < lines.length - 1;
                i++
            ) {
                recordCount++;

                if (
                    String(lines[i]).indexOf(
                        PROGRESS_RECORD_VERSION + '|'
                    ) === 0
                ) {
                    continue;
                }

                /*
                 * Массовая компактизация переводит только LOFREAD4:
                 * там firstSeenAt уже существует и его можно сохранить
                 * без каких-либо догадок. LOFREAD1/2/3 остаются как есть
                 * и безопасно мигрируют при следующей активности владельца.
                 */
                if (
                    String(lines[i]).indexOf(
                        'LOFREAD4|'
                    ) !== 0
                ) {
                    skippedOlderRecords++;
                    continue;
                }

                var record =
                    parseProgressRecordLine(
                        lines[i]
                    );

                if (!record) {
                    throw new Error(
                        'Нельзя компактировать повреждённую запись: ' +
                        title +
                        ' / строка ' +
                        String(i + 1)
                    );
                }

                lines[i] =
                    formatProgressRecordLine(
                        record
                    );

                legacyRecords++;
            }

            if (!legacyRecords) {
                return {
                    segment: segmentNumber,
                    title: title,
                    changed: false,
                    records: recordCount,
                    legacyRecords: 0,
                    skippedOlderRecords: skippedOlderRecords,
                    missing: false
                };
            }

            var params = {
                action: 'edit',
                title: title,
                text: lines.join('\n'),
                summary: PROGRESS_EDIT_SUMMARY,
                watchlist: 'nochange',
                formatversion: 2
            };

            if (page.revid) {
                params.baserevid =
                    page.revid;
            }

            return postWikiEdit(
                params
            ).then(function () {
                delete STATE.progressSegmentCache[
                    title
                ];

                STATE.leaderboardRowsCache = null;
                STATE.leaderboardRowsCacheAt = 0;

                return {
                    segment: segmentNumber,
                    title: title,
                    changed: true,
                    records: recordCount,
                    legacyRecords: legacyRecords,
                    skippedOlderRecords: skippedOlderRecords,
                    missing: false
                };
            });
        });
    }


    function compactAllProgressSegments() {
        var report = {
            scanned: 0,
            changedPages: 0,
            migratedRecords: 0,
            missingPages: 0,
            skippedOlderRecords: 0,
            errors: []
        };

        var chain =
            Promise.resolve();

        for (
            var segmentNumber = 0;
            segmentNumber < PROGRESS_SEGMENT_COUNT;
            segmentNumber++
        ) {
            (function (currentNumber) {
                chain = chain.then(function () {
                    return compactProgressSegmentPage(
                        currentNumber
                    ).then(function (result) {
                        report.scanned++;

                        if (result.changed) {
                            report.changedPages++;
                            report.migratedRecords +=
                                result.legacyRecords;
                        }

                        if (result.missing) {
                            report.missingPages++;
                        }

                        report.skippedOlderRecords +=
                            Number(
                                result.skippedOlderRecords || 0
                            );

                        if (
                            currentNumber % 16 === 15 ||
                            currentNumber ===
                                PROGRESS_SEGMENT_COUNT - 1
                        ) {
                            console.log(
                                '[Lofarian Achievements] compact progress:',
                                String(currentNumber + 1) +
                                '/' +
                                String(PROGRESS_SEGMENT_COUNT),
                                cloneData(report)
                            );
                        }
                    }).catch(function (error) {
                        report.scanned++;
                        report.errors.push({
                            segment: currentNumber,
                            error: String(error)
                        });

                        console.warn(
                            '[Lofarian Achievements] Не удалось компактировать progress-сегмент ' +
                            String(currentNumber) +
                            ':',
                            error
                        );
                    });
                });
            })(segmentNumber);
        }

        return chain.then(function () {
            console.log(
                '[Lofarian Achievements] Компактизация progress завершена:',
                report
            );

            return report;
        });
    }


    function publishNews(title, message) {
        return publishAchievementNews(title, message);
    }

    function clearNews() {
        return clearAchievementNews();
    }

    function newsStatus() {
        return readAchievementNews(true).then(function (news) {
            console.log('[Lofarian Achievements] news status:', news);
            return news;
        });
    }


    I.registerFunctions('Admin', {
        readUserPageSource: readUserPageSource,
        extractManualAchievementsSection: extractManualAchievementsSection,
        extractManualAchievementTitles: extractManualAchievementTitles,
        grantTo: grantTo,
        revokeFrom: revokeFrom,
        inspectUser: inspectUser,
        auditProfile: auditProfile,
        cleanProfile: cleanProfile,
        scoreFor: scoreFor,
        topUsers: topUsers,
        checkImageInternal: checkImageInternal,
        segmentFor: segmentFor,
        compactProgressSegmentPage: compactProgressSegmentPage,
        compactAllProgressSegments: compactAllProgressSegments,
        publishNews: publishNews,
        clearNews: clearNews,
        newsStatus: newsStatus
    }, ["buildEffectiveAchievementMap", "calculateScore", "cloneData", "forEachCatalogAchievement", "formatAchievementDate", "formatPoints", "formatProgressRecordLine", "getAchievement", "getAchievementPoints", "getCurrentUserId", "getEditorStatsForUser", "getLeaderboardRowsCached", "getProgressForUser", "getParticipationStartedAt", "getSegmentId", "getSegmentPageTitle", "getUserAchievementMap", "isAutomaticProgressAchievementId", "isPlainObject", "nowUnix", "parseProgressRecordLine", "parseProgressSegmentText", "readCatalog", "readUserSegment", "readWikiPage", "resolveFileUrl", "resolveUser", "saveSegment", "showAchievementPopup", "writeWikiPage", "postWikiEdit", "publishAchievementNews", "clearAchievementNews", "readAchievementNews"]);
})(window);