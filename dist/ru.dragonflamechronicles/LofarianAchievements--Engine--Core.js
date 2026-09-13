/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC11.5 FAST UI + INLINE DETAILS REVIEW READY
Страница Fandom: MediaWiki:LofarianAchievements/Engine/Core.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Главная точка запуска и публичный API window.LofarianAchievements; связывает каталог, метрики, хранение, UI и admin feature.

ДАННЫЕ / I/O
Самостоятельно не использует внешние сервисы; вызывает только зарегистрированные локальные модули.

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

RC11 — ДОБРОВОЛЬНОЕ УЧАСТИЕ / OPT-IN + КАТАЛОГ
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

- RC11.5 использует уже доступные mw.config user groups вместо отдельного userinfo-запроса перед первым рендером, когда Fandom их предоставляет.

ПРИМЕЧАНИЕ ДЛЯ REVIEW
Этот файл является одним модулем одной системы Lofarian Achievements. RC11 специально
разделён на небольшие MediaWiki:*.js страницы для прозрачности сопровождения, но
загружается штатным Fandom importArticles()/ResourceLoader с пакетированием.
===============================================================================
*/
(function (root) {
    'use strict';
    var I = root.__LofarianAchievementsInternal;
    if (!I) { throw new Error('[Lofarian Achievements] Runtime отсутствует: Engine/Core'); }
    var C = I.config || {};
    var STATE = I.state || {};
    var api = I.api;
    var VERSION = C.VERSION;
    var CATALOG_PAGE = C.CATALOG_PAGE;
    var USERS_PAGE_PREFIX = C.USERS_PAGE_PREFIX;
    var SEGMENT_COUNT = C.SEGMENT_COUNT;
    var DATA_CLASS = C.DATA_CLASS;
    var HALL_PAGE = C.HALL_PAGE;
    var PROFILE_RAIL_PAGE_SIZE = C.PROFILE_RAIL_PAGE_SIZE;
    var LEADERBOARD_LIMIT = C.LEADERBOARD_LIMIT;
    var FIRST_LOGIN_ID = C.FIRST_LOGIN_ID;
    var THEME_CATEGORY_TITLES = C.THEME_CATEGORY_TITLES;
    var PROGRESS_PAGE_PREFIX = C.PROGRESS_PAGE_PREFIX;
    var PROGRESS_SEGMENT_COUNT = C.PROGRESS_SEGMENT_COUNT;
    var PROGRESS_RECORD_VERSION = C.PROGRESS_RECORD_VERSION;
    var ARTICLE_READ_MIN_SECONDS = C.ARTICLE_READ_MIN_SECONDS;
    var CONTEXT_HISTORY_SCAN_LIMIT = C.CONTEXT_HISTORY_SCAN_LIMIT;
    var ROAD_CATEGORY_PAGE_SCAN_LIMIT = C.ROAD_CATEGORY_PAGE_SCAN_LIMIT;
    var LEADERBOARD_PAGE_SIZE = C.LEADERBOARD_PAGE_SIZE;
    function auditProfile() { return I.invoke('auditProfile', arguments); }
    function checkForNewAchievements() { return I.invoke('checkForNewAchievements', arguments); }
    function checkManualAchievementNews() { return I.invoke('checkManualAchievementNews', arguments); }
    function checkImageInternal() { return I.invoke('checkImageInternal', arguments); }
    function cleanProfile() { return I.invoke('cleanProfile', arguments); }
    function cloneData() { return I.invoke('cloneData', arguments); }
    function compactAllProgressSegments() { return I.invoke('compactAllProgressSegments', arguments); }
    function compactProgressSegmentPage() { return I.invoke('compactProgressSegmentPage', arguments); }
    function getAchievement() { return I.invoke('getAchievement', arguments); }
    function getAchievementPrevalenceMap() { return I.invoke('getAchievementPrevalenceMap', arguments); }
    function getCurrentUserName() { return I.invoke('getCurrentUserName', arguments); }
    function getEditorStatsForUser() { return I.invoke('getEditorStatsForUser', arguments); }
    function getProgressSegmentNumber() { return I.invoke('getProgressSegmentNumber', arguments); }
    function getProgressSegmentTitle() { return I.invoke('getProgressSegmentTitle', arguments); }
    function getParticipationStartedAt() { return I.invoke('getParticipationStartedAt', arguments); }
    function getRarityInfo() { return I.invoke('getRarityInfo', arguments); }
    function getSegmentPageTitle() { return I.invoke('getSegmentPageTitle', arguments); }
    function getUserInfo() { return I.invoke('getUserInfo', arguments); }
    function getUserAchievementMap() { return I.invoke('getUserAchievementMap', arguments); }
    function grantTo() { return I.invoke('grantTo', arguments); }
    function initReadingTracker() { return I.invoke('initReadingTracker', arguments); }
    function inspectUser() { return I.invoke('inspectUser', arguments); }
    function installGivenLikeTracker() { return I.invoke('installGivenLikeTracker', arguments); }
    function isPlainObject() { return I.invoke('isPlainObject', arguments); }
    function openRarityPreview() { return I.invoke('openRarityPreview', arguments); }
    function readCatalog() { return I.invoke('readCatalog', arguments); }
    function protectCatalogPages() { return I.invoke('protectCatalogPages', arguments); }
    function protectTechnicalPage() { return I.invoke('protectTechnicalPage', arguments); }
    function readUserProgress() { return I.invoke('readUserProgress', arguments); }
    function readUserSegment() { return I.invoke('readUserSegment', arguments); }
    function removeProfileAchievementsOverlay() { return I.has('removeProfileAchievementsOverlay') ? I.invoke('removeProfileAchievementsOverlay', arguments) : undefined; }
    function renderHallOfFame() { return I.has('renderHallOfFame') ? I.invoke('renderHallOfFame', arguments) : Promise.resolve(); }
    function renderProfileAchievements() { return I.has('renderProfileAchievements') ? I.invoke('renderProfileAchievements', arguments) : Promise.resolve(); }
    function resolveUser() { return I.invoke('resolveUser', arguments); }
    function revokeFrom() { return I.invoke('revokeFrom', arguments); }
    function scoreFor() { return I.invoke('scoreFor', arguments); }
    function segmentFor() { return I.invoke('segmentFor', arguments); }
    function showAchievementPopup() { return I.invoke('showAchievementPopup', arguments); }
    function topUsers() { return I.invoke('topUsers', arguments); }
    function userCanAdmin() { return I.invoke('userCanAdmin', arguments); }
    function publishNews() { return I.invoke('publishNews', arguments); }
    function clearNews() { return I.invoke('clearNews', arguments); }
    function newsStatus() { return I.invoke('newsStatus', arguments); }


    function getAchievementVisualCategory(
        achievementId,
        achievement
    ) {
        achievementId =
            String(
                achievementId || ''
            );

        var family =
            achievement &&
            achievement.family
                ? String(
                    achievement.family
                )
                : '';

        if (
            achievement &&
            String(achievement.category || '') === 'communication'
        ) {
            return 'communication';
        }

        if (
            /^(?:chronist|thoughtful_chronist|chronist_era_zarozhdeniya|thoughtful_era_zarozhdeniya|chronist_era_drakona|thoughtful_era_drakona|chronist_kevariytsy|thoughtful_kevariytsy)$/.test(
                family
            )
        ) {
            return 'reading';
        }

        if (
            /^(?:zodchiy|hudozhnik|tkach_kategoriy|tkach_shablonov|neutomimyy_zodchiy)$/.test(
                family
            ) ||
            /^(?:sozidatel)$/.test(
                achievementId
            )
        ) {
            return 'creation';
        }

        if (
            /^(?:letopisets|multigran|verny_letopisets|neslomlennaya_tsep|ispravitel|chernilny_potok|chernilny_sled|ruka_letopistsa|arkhivarius|probuzhdayushchiy_stranitsy|hranitel_drevnostey|vozvrashchenie_k_letopisi|neutomimoe_pero)$/.test(
                family
            )
        ) {
            return 'editing';
        }

        if (
            /^(?:starozhil)$/.test(
                family
            ) ||
            /^(?:hall_top_500|hall_top_100|hall_top_10|night_hero)$/.test(
                achievementId
            )
        ) {
            return 'activity';
        }

        return 'special';
    }


    function getRarestEarnedAchievements(
        catalog,
        achievementMap,
        limit
    ) {
        var entries = [];

        Object.keys(
            achievementMap || {}
        ).forEach(function (achievementId) {
            var achievement =
                getAchievement(
                    catalog,
                    achievementId
                );

            if (!achievement) {
                return;
            }

            entries.push({
                id:
                    achievementId,

                achievement:
                    achievement,

                rarity:
                    getRarityInfo(
                        catalog,
                        achievement
                    ),

                earnedAt:
                    achievementMap[
                        achievementId
                    ]
            });
        });

        entries.sort(function (a, b) {
            if (
                b.rarity.order !==
                a.rarity.order
            ) {
                return (
                    b.rarity.order -
                    a.rarity.order
                );
            }

            var pointsDifference =
                getAchievementPoints(
                    b.achievement
                ) -
                getAchievementPoints(
                    a.achievement
                );

            if (pointsDifference) {
                return pointsDifference;
            }

            var tierDifference =
                Number(
                    b.achievement.tier || 0
                ) -
                Number(
                    a.achievement.tier || 0
                );

            if (tierDifference) {
                return tierDifference;
            }

            var earnedDifference =
                Number(
                    b.earnedAt || 0
                ) -
                Number(
                    a.earnedAt || 0
                );

            if (earnedDifference) {
                return earnedDifference;
            }

            return String(
                a.achievement.title || ''
            ).localeCompare(
                String(
                    b.achievement.title || ''
                ),
                'ru'
            );
        });

        if (
            Number(limit) > 0
        ) {
            return entries.slice(
                0,
                Math.floor(
                    Number(limit)
                )
            );
        }

        return entries;
    }


    function getRarestEarnedAchievement(
        catalog,
        achievementMap
    ) {
        return (
            getRarestEarnedAchievements(
                catalog,
                achievementMap,
                1
            )[0] ||
            null
        );
    }


function getAchievementPoints(achievement) {
        var points = Number(
            achievement && achievement.points
        );

        if (!Number.isFinite(points) || points < 0) {
            return 0;
        }

        return Math.floor(points);
    }


    function calculateScore(catalog, achievementMap) {
        var score = 0;
        var count = 0;
        var countedFamilies = {};

        if (!isPlainObject(achievementMap)) {
            return { score: 0, count: 0 };
        }

        Object.keys(achievementMap).forEach(
            function (achievementId) {
                var achievement = getAchievement(
                    catalog,
                    achievementId
                );

                if (!achievement) {
                    return;
                }

                score += getAchievementPoints(achievement);

                /*
                 * TEST 1.12.5:
                 * количество достижений считает цепочку I–C один раз.
                 * Достаточно иметь хотя бы одну её ступень.
                 */
                if (achievement.family) {
                    if (
                        !countedFamilies[
                            achievement.family
                        ]
                    ) {
                        countedFamilies[
                            achievement.family
                        ] = true;
                        count++;
                    }
                } else {
                    count++;
                }
            }
        );

        return { score: score, count: count };
    }


    function mergeAchievementMap(baseMap, extraMap) {
        var result =
            isPlainObject(baseMap)
                ? cloneData(baseMap)
                : {};

        if (!isPlainObject(extraMap)) {
            return result;
        }

        Object.keys(extraMap).forEach(function (id) {
            var earnedAt =
                Number(extraMap[id] || 0);

            if (earnedAt > 0) {
                result[id] = earnedAt;
            }
        });

        return result;
    }


    function isCurrentParticipationActive() {
        return !!(I.participation && I.participation.active === true);
    }


    function showJoinWelcomeIfNeeded(catalog) {
        if (!I.participation || I.participation.justJoined !== true) {
            return false;
        }

        var achievement = getAchievement(catalog, FIRST_LOGIN_ID);
        if (!achievement) {
            return false;
        }

        var userId = Math.max(0, Number(mw.config.get('wgUserId')) || 0);
        var earnedAt = Math.max(
            1,
            Math.floor(
                Number(I.participation && I.participation.startedAt) ||
                Number(
                    STATE.currentOfficialProgress &&
                    STATE.currentOfficialProgress.firstSeenAt
                ) ||
                Date.now() / 1000
            )
        );

        /* Не даём обычной проверке продублировать welcome-popup. */
        if (userId > 0) {
            var storageKey = 'lof-achievements-seen:user:' + userId;
            var seen = {};
            try {
                seen = JSON.parse(localStorage.getItem(storageKey) || '{}');
            } catch (error) {
                seen = {};
            }
            if (!isPlainObject(seen)) {
                seen = {};
            }
            seen[FIRST_LOGIN_ID] = earnedAt;
            try {
                localStorage.setItem(storageKey, JSON.stringify(seen));
            } catch (error) {}
        }

        try {
            sessionStorage.removeItem('lof-achievements-just-joined-v1');
        } catch (error) {}

        I.participation.justJoined = false;
        showAchievementPopup(catalog, achievement);
        return true;
    }


    function startApplication() {
        mw.util.addCSS('.' + DATA_CLASS + '{display:none!important;}');

        /*
         * RC11.5: в обычном MediaWiki/Fandom группы текущего пользователя уже
         * присутствуют в mw.config. Не делаем отдельный meta=userinfo запрос
         * перед первым рендером, если этих данных достаточно. Это убирает один
         * сетевой round-trip со страницы достижений, профиля и Зала славы.
         */
        var configGroups = mw.config.get('wgUserGroups');
        var quickUserInfo = {
            userid: Number(mw.config.get('wgUserId') || 0),
            name: String(mw.config.get('wgUserName') || ''),
            groups: Array.isArray(configGroups) ? configGroups.slice() : []
        };
        var userInfoPromise = Array.isArray(configGroups)
            ? Promise.resolve(quickUserInfo)
            : getUserInfo();

        return Promise.all([
            userInfoPromise,
            readCatalog(false)
        ]).then(function (results) {
            var userInfo = results[0];
            var catalog = results[1];
            var canAdmin = userCanAdmin(userInfo);
            var participantActive = isCurrentParticipationActive();

            if (participantActive) {
                installGivenLikeTracker(userInfo);
            }

            if (typeof scoreFor !== 'function') {
                throw new Error(
                    'Внутренняя функция scoreFor не определена.'
                );
            }

            document.addEventListener(
                'keydown',
                function (event) {
                    if (
                        event.key === 'Escape' &&
                        document.getElementById(
                            'lof-profile-achievements-overlay'
                        )
                    ) {
                        removeProfileAchievementsOverlay();
                    }
                }
            );

            window.LofarianAchievements = {
                version: VERSION,
                catalogPage: CATALOG_PAGE,
                usersPagePrefix: USERS_PAGE_PREFIX,
                segments: SEGMENT_COUNT,
                hallPage: HALL_PAGE,
                leaderboardLimit: LEADERBOARD_LIMIT,
                leaderboardPageSize: LEADERBOARD_PAGE_SIZE,
                activeParticipantDefinition: 'Hall of Fame participant with at least one achievement and positive score',
                rarityPercentDenominator: 'same active Hall of Fame rows, capped at 1000',
                leaderboardCandidateSource: 'system progress records + protected achievement records; no allusers scan',
                leaderboardPersistentCacheHours: 168,
                leaderboardAchievementViewer: true,
                profileHallRank: true,
                discussionsAchievements: 'Fandom Discussions /f via same-wiki wikia.php; optional fail-safe cache',
                profileHallRankLimit: 1000,
                profileAchievementsPlacement: 'main profile content; native Fandom right rail intact; static styling split across MediaWiki:LofarianAchievements/Styles/01_Base.css..09_Final_Polish.css; full list includes earned and unearned standalone targets; staged series collapse to one current card',
                profileAchievementsPageSize: PROFILE_RAIL_PAGE_SIZE,
                nativeFandomAchievementsVisuallyHiddenOnProfile: false,
                progressRecordVersion: PROGRESS_RECORD_VERSION,
                starozhilSource: 'first confirmed local wiki activity; never global Fandom registration',
                hallRankAchievementsExclusive: true,
                firstLoginAchievement: FIRST_LOGIN_ID,
                firstLoginMode: 'voluntary-opt-in-participation',
                participationActive: participantActive,
                participationStartedAt: Number(I.participation && I.participation.startedAt || 0),
                participationMode: participantActive ? 'participant' : 'viewer-only',
                participationPage: (I.participation && I.participation.pageTitle) || 'Летопись Лофариана Вики:Достижения',
                chronistLevels: 100,
                thoughtfulChronistLevels: 100,
                letopisetsLevels: 100,
                zodchiyLevels: 100,
                multigranLevels: 100,
                vernyLetopisetsLevels: 100,
                neugasimyRoscherkLevels: 100,
                vozvrashchenieLevels: 100,
                chernilnyPotokLevels: 100,
                chernilnySledLevels: 100,
                rukaLetopistsaLevels: 100,
                hudozhnikLevels: 100,
                starozhilLevels: 100,
                neslomlennayaTsepLevels: 100,
                probuzhdayushchiyLevels: 100,
                ispravitelLevels: 100,
                tkachKategoriyLevels: 100,
                tkachShablonovLevels: 100,
                arkhivariusLevels: 100,
                neutomimyyZodchiyLevels: 100,
                hranitelDrevnosteyLevels: 100,
                thematicReadingLevels: 100,
                thematicReadingCategories: cloneData(THEME_CATEGORY_TITLES),
                historyContextScanLimit: CONTEXT_HISTORY_SCAN_LIMIT,
                roadCategoryPageScanLimit: ROAD_CATEGORY_PAGE_SCAN_LIMIT,
                editorAchievementSource: 'MediaWiki usercontribs + revisions + recentchanges + categories + upload log',
                catalogMode: 'compact-families-v1',
                rarityMode: 'fixed-level-bands',
                rarityMaximum: 'mythic',
                rarityCount: 13,
                rarityGradations: 3,
                rarityPreview: openRarityPreview,
                staticStylesLocation: 'MediaWiki:LofarianAchievements/Styles/01_Base.css..09_Final_Polish.css',
                unearnedProfileMode: 'unearned standalone achievements only; I-C and staged-series future tiers excluded; hidden/secret condition unlocked globally for viewers who already earned it',
                achievementPrevalence: 'percentage among participants counted by Hall of Fame',
                secretAchievementId: 'znaet_sudbu_kevar',
                articleReadMinSeconds: ARTICLE_READ_MIN_SECONDS,
                progressPagePrefix: PROGRESS_PAGE_PREFIX,
                progressSegmentCount: PROGRESS_SEGMENT_COUNT,
                progress: function () {
                    if (!STATE.currentProgressReady) {
                        return Promise.resolve(null);
                    }

                    return STATE.currentProgressReady
                        .then(function () {
                            return {
                                official:
                                    STATE.currentOfficialProgress
                                        ? cloneData(
                                            STATE.currentOfficialProgress
                                        )
                                        : null,

                                localQueue:
                                    STATE.currentProgressState
                                        ? cloneData(
                                            STATE.currentProgressState
                                        )
                                        : null
                            };
                        });
                },
                isAdmin: canAdmin
            };

            if (canAdmin) {
                window.LofarianAchievements.admin = {

                    grant: function (achievementId) {
                        return grantTo(
                            getCurrentUserName(),
                            achievementId
                        );
                    },

                    grantTo: grantTo,

                    revoke: function (achievementId) {
                        return revokeFrom(
                            getCurrentUserName(),
                            achievementId
                        );
                    },

                    revokeFrom: revokeFrom,

                    inspectUser: inspectUser,

                    scoreFor: scoreFor,

                    firstLoginFor: function (username) {
                        return resolveUser(username)
                            .then(function (user) {
                                return Promise.all([
                                    readUserSegment(user.userid, false),
                                    readUserProgress(user, false)
                                ]).then(function (rows) {
                                    var protectedMap = getUserAchievementMap(
                                        rows[0].data,
                                        user.userid
                                    );
                                    var earnedAt = Math.max(
                                        0,
                                        Math.floor(Number(rows[1].firstSeenAt) || 0)
                                    );

                                    Object.keys(protectedMap || {}).forEach(function (id) {
                                        var value = Math.floor(Number(protectedMap[id]) || 0);
                                        if (value > 0 && (earnedAt <= 0 || value < earnedAt)) {
                                            earnedAt = value;
                                        }
                                    });

                                    var result = {
                                        username: user.name,
                                        userId: user.userid,
                                        earnedAt: earnedAt || null,
                                        participant: earnedAt > 0,
                                        automatic: earnedAt > 0,
                                        source: 'opt-in participation evidence'
                                    };

                                    console.log(
                                        '[Lofarian Achievements] first_login:',
                                        result
                                    );

                                    return result;
                                });
                            });
                    },

                    readingProgressFor: function (username) {
                        return resolveUser(username).then(function (user) {
                            return readUserProgress(user, true);
                        }).then(function (progress) {
                            console.log('[Lofarian Achievements] reading progress:', progress);
                            return progress;
                        });
                    },

                    editorStatsFor: function (username) {
                        return resolveUser(username)
                            .then(function (user) {
                                return Promise.all([
                                    readUserSegment(user.userid, true),
                                    readUserProgress(user, true)
                                ]).then(function (cutoffData) {
                                    var protectedMap = getUserAchievementMap(cutoffData[0].data, user.userid);
                                    var explicitStartedAt = Number(user.userid) === Number(mw.config.get('wgUserId')) && I.participation
                                        ? Number(I.participation.startedAt || 0)
                                        : 0;
                                    var startedAt = getParticipationStartedAt(
                                        protectedMap,
                                        cutoffData[1],
                                        explicitStartedAt
                                    );
                                    var baseline = Number(user.userid) === Number(mw.config.get('wgUserId')) && I.participation
                                        ? Number(I.participation.discussionBaselineTotal)
                                        : -1;
                                    return getEditorStatsForUser(user, true, startedAt, baseline);
                                });
                            })
                            .then(function (stats) {
                                console.log('[Lofarian Achievements] editor stats:', stats);
                                return stats;
                            });
                    },

                    progressSegmentFor: function (username) {
                        return resolveUser(username)
                            .then(function (user) {
                                var result = {
                                    username: user.name,
                                    segment:
                                        getProgressSegmentNumber(
                                            user.name
                                        ),
                                    page:
                                        getProgressSegmentTitle(
                                            user.name
                                        )
                                };

                                console.log(
                                    '[Lofarian Achievements] progress segment:',
                                    result
                                );

                                return result;
                            });
                    },

                    top: topUsers,

                    auditProfile: auditProfile,

                    cleanProfile: cleanProfile,

                    segmentFor: segmentFor,

                    checkImage: checkImageInternal,

                    achievementInfo: function (achievementId) {
                        return readCatalog(
                            true
                        ).then(function (freshCatalog) {
                            var achievement =
                                getAchievement(
                                    freshCatalog,
                                    achievementId
                                );

                            if (!achievement) {
                                throw new Error(
                                    'Неизвестное достижение: ' +
                                    achievementId
                                );
                            }

                            var rarity =
                                getRarityInfo(
                                    freshCatalog,
                                    achievement
                                );

                            var result =
                                cloneData(
                                    achievement
                                );

                            result.rarityInfo =
                                rarity;

                            console.log(
                                '[Lofarian Achievements] achievement:',
                                result
                            );

                            return result;
                        });
                    },

                    rarityPreview: openRarityPreview,

                    rarityPercent: function (achievementId) {
                        return readCatalog(
                            false
                        ).then(function (freshCatalog) {
                            return getAchievementPrevalenceMap(
                                freshCatalog,
                                [
                                    achievementId
                                ]
                            );
                        }).then(function (map) {
                            var result =
                                map[
                                    achievementId
                                ] || null;

                            console.log(
                                '[Lofarian Achievements] rarity percent:',
                                achievementId,
                                result
                            );

                            return result;
                        });
                    },

                    reloadCatalog: function () {
                        STATE.catalogCache = null;
                        return readCatalog(true);
                    },

                    reloadUser: function (username) {
                        return resolveUser(username)
                            .then(function (user) {
                                return readUserSegment(
                                    user.userid,
                                    true
                                );
                            });
                    },

                    show: function (achievementId) {
                        return readCatalog(true)
                            .then(function (freshCatalog) {
                                var achievement = getAchievement(
                                    freshCatalog,
                                    achievementId
                                );

                                if (!achievement) {
                                    throw new Error(
                                        'Неизвестное достижение: ' +
                                        achievementId
                                    );
                                }

                                showAchievementPopup(
                                    freshCatalog,
                                    achievement
                                );
                            });
                    },

                    compactProgressSegment: function (segmentNumber) {
                        return compactProgressSegmentPage(
                            segmentNumber
                        );
                    },

                    compactProgressSegments: function () {
                        return compactAllProgressSegments();
                    },

                    publishNews: function (title, message) {
                        return publishNews(title, message);
                    },

                    clearNews: function () {
                        return clearNews();
                    },

                    newsStatus: function () {
                        return newsStatus();
                    },

                    protectCatalog: function () {
                        return protectCatalogPages();
                    },

                    protectSegmentFor: function (username) {
                        return resolveUser(username)
                            .then(function (user) {
                                return protectTechnicalPage(
                                    getSegmentPageTitle(
                                        user.userid
                                    )
                                );
                            });
                    }
                };
            }

            var trackerReady = participantActive
                ? initReadingTracker(catalog)
                : Promise.resolve(null);

            if (participantActive) {
                trackerReady.then(function () {
                    var welcomed = showJoinWelcomeIfNeeded(catalog);
                    if (welcomed) {
                        return new Promise(function (resolve) {
                            setTimeout(resolve, 900);
                        }).then(function () {
                            return checkForNewAchievements(catalog);
                        });
                    }
                    return checkForNewAchievements(catalog);
                }).catch(function (error) {
                    console.warn(
                        '[Lofarian Achievements] ' +
                        'Ошибка проверки новых достижений:',
                        error
                    );
                });

                trackerReady.then(function () {
                    return checkManualAchievementNews();
                }).catch(function (error) {
                    console.warn(
                        '[Lofarian Achievements] Ошибка ручного уведомления:',
                        error
                    );
                });
            }

            /*
             * RC11.4: профиль не ждёт инициализацию Reading tracker.
             * Визуальный список достижений и его loading-state запускаются
             * сразу; трекер продолжает инициализироваться параллельно.
             */
            Promise.resolve(renderProfileAchievements(catalog)).catch(function (error) {
                console.warn(
                    '[Lofarian Achievements] ' +
                    'Ошибка отображения достижений профиля:',
                    error
                );
            });

            renderHallOfFame(catalog)
                .catch(function (error) {
                    console.warn(
                        '[Lofarian Achievements] ' +
                        'Ошибка построения Зала славы:',
                        error
                    );
                });

            if (I.has('renderAchievementsHub')) {
                Promise.resolve(I.invoke('renderAchievementsHub', [catalog]))
                    .catch(function (error) {
                        console.warn(
                            '[Lofarian Achievements] Ошибка каталога достижений:',
                            error
                        );
                    });
            }

            console.log(
                '======================================='
            );
            console.log(
                '[Lofarian Achievements] ✅ ' +
                VERSION +
                ' готова.'
            );
            console.log(
                '[Lofarian Achievements] Каталог:',
                CATALOG_PAGE
            );
            console.log(
                '[Lofarian Achievements] Сегментов:',
                SEGMENT_COUNT,
                '(00–ff)'
            );
            console.log(
                '[Lofarian Achievements] Участник программы:',
                participantActive
            );
            console.log(
                '[Lofarian Achievements] Администратор:',
                canAdmin
            );
            console.log(
                '[Lofarian Achievements] Группы:',
                userInfo.groups || []
            );
            console.log(
                '======================================='
            );

        }).catch(function (error) {
            console.error(
                '======================================='
            );
            console.error(
                '[Lofarian Achievements] ' +
                '❌ ОШИБКА ИНИЦИАЛИЗАЦИИ'
            );
            console.error(error);
            console.error(
                '======================================='
            );
        });
    }

    I.registerFunctions('Engine/Core', {
        getAchievementVisualCategory: getAchievementVisualCategory,
        getRarestEarnedAchievements: getRarestEarnedAchievements,
        getRarestEarnedAchievement: getRarestEarnedAchievement,
        getAchievementPoints: getAchievementPoints,
        calculateScore: calculateScore,
        mergeAchievementMap: mergeAchievementMap,
        startApplication: startApplication
    }, ["checkForNewAchievements", "checkManualAchievementNews", "cloneData", "getAchievement", "getCurrentUserName", "getEditorStatsForUser", "getProgressSegmentNumber", "getProgressSegmentTitle", "getParticipationStartedAt", "getRarityInfo", "getSegmentPageTitle", "getUserInfo", "getUserAchievementMap", "initReadingTracker", "installGivenLikeTracker", "isPlainObject", "openRarityPreview", "protectTechnicalPage", "readUserProgress", "readUserSegment", "resolveUser", "showAchievementPopup", "userCanAdmin", "readCatalog", "protectCatalogPages"]);
})(window);