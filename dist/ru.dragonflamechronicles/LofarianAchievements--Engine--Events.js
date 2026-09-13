/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC10 PARTICIPATION CUTOFF REVIEW READY
Страница Fandom: MediaWiki:LofarianAchievements/Engine/Events.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Оркестрация синхронизации собственного progress и проверки новых достижений после событий runtime.

ДАННЫЕ / I/O
Записи выполняются только через Storage/MediaWiki service и существующие защищённые механизмы.

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
    if (!I) { throw new Error('[Lofarian Achievements] Runtime отсутствует: Engine/Events'); }
    var C = I.config || {};
    var STATE = I.state || {};
    var api = I.api;
    var COMM_GIVEN_LIKE_PREFIX = C.COMM_GIVEN_LIKE_PREFIX;
    var COMM_GIVEN_LIKE_THRESHOLDS = C.COMM_GIVEN_LIKE_THRESHOLDS;
    var THEME_KEYS = C.THEME_KEYS;
    var ARTICLE_READ_MIN_SECONDS = C.ARTICLE_READ_MIN_SECONDS;
    var MAX_REMOTE_ACTIVE_STEP = C.MAX_REMOTE_ACTIVE_STEP;
    var MAX_ARTICLE_COUNT = C.MAX_ARTICLE_COUNT;
    var MAX_ACTIVE_SECONDS = C.MAX_ACTIVE_SECONDS;
    var MAX_THEME_ARTICLE_COUNT = C.MAX_THEME_ARTICLE_COUNT;
    var MAX_THEME_ACTIVE_SECONDS = C.MAX_THEME_ACTIVE_SECONDS;
    var CHRONIST_THRESHOLDS = C.CHRONIST_THRESHOLDS;
    var THOUGHTFUL_THRESHOLDS = C.THOUGHTFUL_THRESHOLDS;
    function buildEffectiveAchievementMap() { return I.invoke('buildEffectiveAchievementMap', arguments); }
    function clearProgressSegmentCache() { return I.invoke('clearProgressSegmentCache', arguments); }
    function cloneData() { return I.invoke('cloneData', arguments); }
    function createEmptyPublicProgress() { return I.invoke('createEmptyPublicProgress', arguments); }
    function ensureOwnProgressRecord() { return I.invoke('ensureOwnProgressRecord', arguments); }
    function getAchievement() { return I.invoke('getAchievement', arguments); }
    function getCurrentUserId() { return I.invoke('getCurrentUserId', arguments); }
    function getCurrentUserName() { return I.invoke('getCurrentUserName', arguments); }
    function getEditorStatsForUser() { return I.invoke('getEditorStatsForUser', arguments); }
    function getProgressForUser() { return I.invoke('getProgressForUser', arguments); }
    function getParticipationStartedAt() { return I.invoke('getParticipationStartedAt', arguments); }
    function getTierLevel() { return I.invoke('getTierLevel', arguments); }
    function getUserAchievementMap() { return I.invoke('getUserAchievementMap', arguments); }
    function isAutomaticProgressAchievementId() { return I.invoke('isAutomaticProgressAchievementId', arguments); }
    function isPlainObject() { return I.invoke('isPlainObject', arguments); }
    function nowUnix() { return I.invoke('nowUnix', arguments); }
    function postProgressSegmentText() { return I.invoke('postProgressSegmentText', arguments); }
    function readCatalog() { return I.invoke('readCatalog', arguments); }
    function readProgressSegment() { return I.invoke('readProgressSegment', arguments); }
    function readUserSegment() { return I.invoke('readUserSegment', arguments); }
    function replaceProgressRecordInSegment() { return I.invoke('replaceProgressRecordInSegment', arguments); }
    function resolveUser() { return I.invoke('resolveUser', arguments); }
    function sanitizePublicProgress() { return I.invoke('sanitizePublicProgress', arguments); }
    function saveLocalProgress() { return I.invoke('saveLocalProgress', arguments); }
    function showAchievementPopup() { return I.invoke('showAchievementPopup', arguments); }
    function tierAchievementId() { return I.invoke('tierAchievementId', arguments); }

    function syncOwnHallRankAwardTimes(
        user,
        rank,
        retry
    ) {
        retry =
            Number(retry) || 0;

        rank =
            Math.max(
                0,
                Math.floor(
                    Number(rank) || 0
                )
            );

        if (
            !user ||
            !user.name ||
            Number(user.userid) <= 0 ||
            Number(user.userid) !==
                Number(
                    getCurrentUserId()
                ) ||
            rank <= 0 ||
            rank > 500
        ) {
            return Promise.resolve(
                null
            );
        }

        if (
            STATE.currentHallRankAwardSyncPromise
        ) {
            return STATE.currentHallRankAwardSyncPromise;
        }

        STATE.currentHallRankAwardSyncPromise =
            ensureOwnProgressRecord(
                user,
                0
            ).then(function () {
                return readProgressSegment(
                    user.name,
                    true
                );
            }).then(function (loaded) {
                var oldProgress =
                    loaded.segment &&
                    loaded.segment.records[
                        user.name
                    ];

                if (!oldProgress) {
                    return null;
                }

                oldProgress =
                    sanitizePublicProgress(
                        oldProgress,
                        user.name
                    );

                var nextProgress =
                    cloneData(
                        oldProgress
                    );

                var needs500 =
                    rank <= 500 &&
                    !oldProgress.hallTop500AwardAt;

                var needs100 =
                    rank <= 100 &&
                    !oldProgress.hallTop100AwardAt;

                var needs10 =
                    rank <= 10 &&
                    !oldProgress.hallTop10AwardAt;

                if (
                    !needs500 &&
                    !needs100 &&
                    !needs10
                ) {
                    return oldProgress;
                }

                var awardAt =
                    Math.max(
                        nowUnix(),
                        Number(
                            oldProgress.updatedAt
                        ) + 1
                    );

                nextProgress.updatedAt =
                    awardAt;

                if (needs500) {
                    nextProgress.hallTop500AwardAt =
                        awardAt;
                }

                if (needs100) {
                    nextProgress.hallTop100AwardAt =
                        awardAt;
                }

                if (needs10) {
                    nextProgress.hallTop10AwardAt =
                        awardAt;
                }

                var newText =
                    replaceProgressRecordInSegment(
                        loaded,
                        nextProgress
                    );

                return postProgressSegmentText(
                    loaded,
                    newText
                ).then(function () {
                    clearProgressSegmentCache(
                        user.name
                    );

                    STATE.currentOfficialProgress =
                        cloneData(
                            nextProgress
                        );

                    return nextProgress;
                });
            }).then(
                function (result) {
                    STATE.currentHallRankAwardSyncPromise =
                        null;

                    return result;
                },
                function (error) {
                    STATE.currentHallRankAwardSyncPromise =
                        null;

                    if (
                        retry < 2 &&
                        String(error)
                            .toLowerCase()
                            .indexOf('editconflict') !== -1
                    ) {
                        clearProgressSegmentCache(
                            user.name
                        );

                        return syncOwnHallRankAwardTimes(
                            user,
                            rank,
                            retry + 1
                        );
                    }

                    console.warn(
                        '[Lofarian Achievements] Не удалось сохранить дату статуса Зала славы:',
                        error
                    );

                    return null;
                }
            );

        return STATE.currentHallRankAwardSyncPromise;
    }


    function syncOwnGivenLikeProgressStep(user, increment, bootstrapOnly, retry) {
        retry = Number(retry) || 0;
        increment = Math.max(0, Math.floor(Number(increment) || 0));

        if (
            !user ||
            !user.name ||
            Number(user.userid) <= 0 ||
            Number(user.userid) !== Number(getCurrentUserId())
        ) {
            return Promise.resolve(null);
        }

        return ensureOwnProgressRecord(user, 0)
            .then(function () {
                return readProgressSegment(user.name, true);
            })
            .then(function (loaded) {
                var oldProgress =
                    loaded.segment &&
                    loaded.segment.records[user.name];

                if (!oldProgress) {
                    throw new Error('Не найдена progress-запись для фиксации лайка.');
                }

                oldProgress = sanitizePublicProgress(
                    oldProgress,
                    user.name
                );

                var oldCount = Math.max(
                    0,
                    Math.floor(Number(oldProgress.likesGivenCount) || 0)
                );

                if (bootstrapOnly && oldCount > 0) {
                    return oldProgress;
                }

                var nextCount = bootstrapOnly
                    ? Math.max(1, oldCount)
                    : Math.min(9999999, oldCount + Math.max(1, increment));

                if (nextCount <= oldCount) {
                    return oldProgress;
                }

                var oldLevel = getTierLevel(
                    COMM_GIVEN_LIKE_THRESHOLDS,
                    oldCount
                );
                var nextLevel = getTierLevel(
                    COMM_GIVEN_LIKE_THRESHOLDS,
                    nextCount
                );

                var nextProgress = cloneData(oldProgress);
                var awardAt = Math.max(
                    nowUnix(),
                    Number(oldProgress.updatedAt || 0) + 1
                );

                nextProgress.updatedAt = awardAt;
                nextProgress.likesGivenCount = nextCount;

                if (nextLevel > oldLevel) {
                    nextProgress.likesGivenAwardAt = awardAt;
                }

                var newText = replaceProgressRecordInSegment(
                    loaded,
                    nextProgress
                );

                return postProgressSegmentText(loaded, newText)
                    .then(function () {
                        clearProgressSegmentCache(user.name);
                        STATE.currentOfficialProgress = cloneData(nextProgress);
                        STATE.editorStatsCache = {};
                        STATE.leaderboardRowsCache = null;
                        STATE.leaderboardRowsCacheAt = 0;

                        if (nextLevel <= oldLevel) {
                            return nextProgress;
                        }

                        return readCatalog(false).then(function (catalog) {
                            var achievementId = tierAchievementId(
                                COMM_GIVEN_LIKE_PREFIX,
                                nextLevel
                            );
                            var achievement = getAchievement(
                                catalog,
                                achievementId
                            );

                            if (achievement) {
                                showAchievementPopup(
                                    catalog,
                                    achievement,
                                    achievementId
                                );
                            }

                            return nextProgress;
                        });
                    });
            })
            .catch(function (error) {
                if (
                    retry < 2 &&
                    String(error).toLowerCase().indexOf('editconflict') !== -1
                ) {
                    clearProgressSegmentCache(user.name);
                    return syncOwnGivenLikeProgressStep(
                        user,
                        increment,
                        bootstrapOnly,
                        retry + 1
                    );
                }

                console.warn(
                    '[Lofarian Achievements] Не удалось сохранить прогресс «Знака поддержки»: ',
                    error
                );
                return null;
            });
    }


    function queueOwnGivenLikeProgress(user, increment, bootstrapOnly) {
        if (bootstrapOnly) {
            STATE.pendingGivenLikeBootstrap = true;
        } else {
            STATE.pendingGivenLikeIncrements += Math.max(
                1,
                Math.floor(Number(increment) || 1)
            );
        }

        if (STATE.currentGivenLikeSyncPromise) {
            return STATE.currentGivenLikeSyncPromise;
        }

        function consumeQueue() {
            var bootstrap = STATE.pendingGivenLikeBootstrap;
            var incrementNow = 0;

            STATE.pendingGivenLikeBootstrap = false;

            if (!bootstrap && STATE.pendingGivenLikeIncrements > 0) {
                incrementNow = 1;
                STATE.pendingGivenLikeIncrements--;
            }

            if (!bootstrap && incrementNow <= 0) {
                return Promise.resolve(null);
            }

            return syncOwnGivenLikeProgressStep(
                user,
                incrementNow,
                bootstrap,
                0
            ).then(function (result) {
                if (
                    STATE.pendingGivenLikeBootstrap ||
                    STATE.pendingGivenLikeIncrements > 0
                ) {
                    return consumeQueue();
                }

                return result;
            });
        }

        STATE.currentGivenLikeSyncPromise = consumeQueue().then(
            function (result) {
                STATE.currentGivenLikeSyncPromise = null;
                return result;
            },
            function (error) {
                STATE.currentGivenLikeSyncPromise = null;
                throw error;
            }
        );

        return STATE.currentGivenLikeSyncPromise;
    }


    function syncOwnProgressStep(
        catalog,
        user,
        state,
        retry
    ) {
        retry =
            Number(retry) || 0;

        if (STATE.currentProgressSyncPromise) {
            return STATE.currentProgressSyncPromise;
        }

        STATE.currentProgressSyncPromise =
            ensureOwnProgressRecord(
                user,
                0
            ).then(function () {
                return readProgressSegment(
                    user.name,
                    true
                );
            }).then(function (loaded) {
                var oldProgress =
                    loaded.segment &&
                    loaded.segment.records[
                        user.name
                    ];

                if (!oldProgress) {
                    throw new Error(
                        'После создания не найдена собственная progress-запись.'
                    );
                }

                oldProgress =
                    sanitizePublicProgress(
                        oldProgress,
                        user.name
                    );

                STATE.currentOfficialProgress =
                    cloneData(
                        oldProgress
                    );

                var now =
                    nowUnix();

                var elapsed =
                    Math.max(
                        0,
                        now -
                        oldProgress.updatedAt
                    );

                var activeStep =
                    Math.min(
                        state.pendingActiveSeconds,
                        MAX_REMOTE_ACTIVE_STEP,
                        elapsed,
                        MAX_ACTIVE_SECONDS -
                        oldProgress.activeSeconds
                    );

                activeStep =
                    Math.max(
                        0,
                        Math.floor(activeStep)
                    );

                var canArticle =
                    state.pendingArticles > 0 &&
                    oldProgress.articleCount <
                        MAX_ARTICLE_COUNT &&
                    elapsed >=
                        ARTICLE_READ_MIN_SECONDS &&
                    activeStep >=
                        ARTICLE_READ_MIN_SECONDS &&
                    (
                        oldProgress.lastArticleAt === 0 ||
                        now -
                        oldProgress.lastArticleAt >=
                            ARTICLE_READ_MIN_SECONDS
                    );

                var articleStep =
                    canArticle
                        ? 1
                        : 0;

                var themeActiveSteps = {};
                var themeArticleSteps = {};
                var hasThemeStep = false;

                THEME_KEYS.forEach(function (themeKey) {
                    var pendingSeconds =
                        Math.max(
                            0,
                            Math.floor(
                                Number(
                                    state.pendingThemeActiveSeconds[
                                        themeKey
                                    ]
                                ) || 0
                            )
                        );

                    var themeActiveStep =
                        Math.min(
                            pendingSeconds,
                            activeStep,
                            MAX_THEME_ACTIVE_SECONDS -
                                oldProgress.themeActiveSeconds[
                                    themeKey
                                ]
                        );

                    themeActiveStep =
                        Math.max(
                            0,
                            Math.floor(
                                themeActiveStep
                            )
                        );

                    themeActiveSteps[
                        themeKey
                    ] =
                        themeActiveStep;

                    var canThemeArticle =
                        Number(
                            state.pendingThemeArticles[
                                themeKey
                            ] || 0
                        ) > 0 &&
                        oldProgress.themeArticleCounts[
                            themeKey
                        ] <
                            MAX_THEME_ARTICLE_COUNT &&
                        elapsed >=
                            ARTICLE_READ_MIN_SECONDS &&
                        themeActiveStep >=
                            ARTICLE_READ_MIN_SECONDS;

                    themeArticleSteps[
                        themeKey
                    ] =
                        canThemeArticle
                            ? 1
                            : 0;

                    if (
                        themeActiveStep > 0 ||
                        themeArticleSteps[
                            themeKey
                        ] > 0
                    ) {
                        hasThemeStep =
                            true;
                    }
                });

                if (
                    activeStep <= 0 &&
                    articleStep <= 0 &&
                    !hasThemeStep
                ) {
                    return oldProgress;
                }

                var nextProgress =
                    cloneData(
                        oldProgress
                    );

                nextProgress.activeSeconds =
                    Math.min(
                        MAX_ACTIVE_SECONDS,
                        oldProgress.activeSeconds +
                        activeStep
                    );

                nextProgress.articleCount =
                    Math.min(
                        MAX_ARTICLE_COUNT,
                        oldProgress.articleCount +
                        articleStep
                    );

                if (articleStep > 0) {
                    nextProgress.lastArticleAt =
                        now;
                }

                var oldThemeArticleLevels =
                    cloneData(
                        oldProgress.themeArticleLevels
                    );

                var oldThemeThoughtfulLevels =
                    cloneData(
                        oldProgress.themeThoughtfulLevels
                    );

                THEME_KEYS.forEach(function (themeKey) {
                    nextProgress.themeActiveSeconds[
                        themeKey
                    ] =
                        Math.min(
                            MAX_THEME_ACTIVE_SECONDS,
                            oldProgress.themeActiveSeconds[
                                themeKey
                            ] +
                            themeActiveSteps[
                                themeKey
                            ]
                        );

                    nextProgress.themeArticleCounts[
                        themeKey
                    ] =
                        Math.min(
                            MAX_THEME_ARTICLE_COUNT,
                            oldProgress.themeArticleCounts[
                                themeKey
                            ] +
                            themeArticleSteps[
                                themeKey
                            ]
                        );
                });

                nextProgress.updatedAt =
                    now;

                var oldChronistLevel =
                    oldProgress.chronistLevel;

                var oldThoughtfulLevel =
                    oldProgress.thoughtfulLevel;

                var nextChronistLevel =
                    getTierLevel(
                        CHRONIST_THRESHOLDS,
                        nextProgress.articleCount
                    );

                var nextThoughtfulLevel =
                    getTierLevel(
                        THOUGHTFUL_THRESHOLDS,
                        nextProgress.activeSeconds
                    );

                if (
                    nextChronistLevel >
                    oldChronistLevel
                ) {
                    nextProgress.chronistAwardAt =
                        now;
                }

                if (
                    nextThoughtfulLevel >
                    oldThoughtfulLevel
                ) {
                    nextProgress.thoughtfulAwardAt =
                        now;
                }

                var newText =
                    replaceProgressRecordInSegment(
                        loaded,
                        nextProgress
                    );

                return postProgressSegmentText(
                    loaded,
                    newText
                ).then(function () {
                    state.pendingActiveSeconds =
                        Math.max(
                            0,
                            state.pendingActiveSeconds -
                            activeStep
                        );

                    state.pendingArticles =
                        Math.max(
                            0,
                            state.pendingArticles -
                            articleStep
                        );

                    THEME_KEYS.forEach(function (themeKey) {
                        state.pendingThemeActiveSeconds[
                            themeKey
                        ] =
                            Math.max(
                                0,
                                Number(
                                    state.pendingThemeActiveSeconds[
                                        themeKey
                                    ] || 0
                                ) -
                                themeActiveSteps[
                                    themeKey
                                ]
                            );

                        state.pendingThemeArticles[
                            themeKey
                        ] =
                            Math.max(
                                0,
                                Number(
                                    state.pendingThemeArticles[
                                        themeKey
                                    ] || 0
                                ) -
                                themeArticleSteps[
                                    themeKey
                                ]
                            );
                    });

                    saveLocalProgress(state);

                    clearProgressSegmentCache(
                        user.name
                    );

                    nextProgress =
                        sanitizePublicProgress(
                            nextProgress,
                            user.name
                        );

                    STATE.currentOfficialProgress =
                        cloneData(
                            nextProgress
                        );

                    var tierChanged =
                        nextProgress.chronistLevel >
                            oldChronistLevel ||
                        nextProgress.thoughtfulLevel >
                            oldThoughtfulLevel;

                    THEME_KEYS.forEach(function (themeKey) {
                        if (
                            nextProgress.themeArticleLevels[
                                themeKey
                            ] >
                                oldThemeArticleLevels[
                                    themeKey
                                ] ||
                            nextProgress.themeThoughtfulLevels[
                                themeKey
                            ] >
                                oldThemeThoughtfulLevels[
                                    themeKey
                                ]
                        ) {
                            tierChanged =
                                true;
                        }
                    });

                    if (tierChanged) {
                        return checkForNewAchievements(
                            catalog
                        ).then(function () {
                            return nextProgress;
                        });
                    }

                    return nextProgress;
                });
            }).catch(function (error) {
                if (
                    retry < 2 &&
                    String(error)
                        .toLowerCase()
                        .indexOf('editconflict') !== -1
                ) {
                    clearProgressSegmentCache(
                        user.name
                    );

                    STATE.currentProgressSyncPromise =
                        null;

                    return syncOwnProgressStep(
                        catalog,
                        user,
                        state,
                        retry + 1
                    );
                }

                console.warn(
                    '[Lofarian Achievements] ' +
                    'Синхронизация прогресса отклонена или не выполнена:',
                    error
                );

                return STATE.currentOfficialProgress ||
                    createEmptyPublicProgress(
                        user.name
                    );
            });

        STATE.currentProgressSyncPromise =
            STATE.currentProgressSyncPromise.then(
                function (result) {
                    STATE.currentProgressSyncPromise =
                        null;

                    return result;
                },
                function (error) {
                    STATE.currentProgressSyncPromise =
                        null;

                    throw error;
                }
            );

        return STATE.currentProgressSyncPromise;
    }


    function checkForNewAchievements(catalog) {
        var userId = getCurrentUserId();
        var username = getCurrentUserName();
        if (userId <= 0 || !username) {
            return Promise.resolve();
        }
        return Promise.all([
            resolveUser(username),
            readUserSegment(userId, false)
        ]).then(function (results) {
            var user = results[0];
            var loaded = results[1];
            return getProgressForUser(user, false).then(function (progress) {
                var protectedMap = getUserAchievementMap(loaded.data, userId);
                var explicitStartedAt = I.participation && Number(I.participation.startedAt || 0);
                var startedAt = getParticipationStartedAt(
                    protectedMap,
                    progress,
                    explicitStartedAt
                );
                var discussionBaseline = I.participation
                    ? Number(I.participation.discussionBaselineTotal)
                    : -1;

                return getEditorStatsForUser(
                    user,
                    false,
                    startedAt,
                    discussionBaseline
                ).then(function (editorStats) {

                var current = buildEffectiveAchievementMap(
                    catalog,
                    user,
                    getUserAchievementMap(loaded.data, userId),
                    progress,
                    editorStats.achievementMap,
                    editorStats
                );
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
                var newIds = [];
                Object.keys(current).forEach(function (achievementId) {
                    var seenAt =
                        Number(
                            seen[achievementId] || 0
                        );

                    var currentAt =
                        Number(
                            current[achievementId] || 0
                        );

                    if (
                        isAutomaticProgressAchievementId(
                            achievementId
                        )
                    ) {
                        /*
                         * Для ступеней новый уровень = новый ID.
                         * Поэтому одноразовая смена технической даты
                         * при LOFREAD1/2/3/4/L5/L6 -> L7 не должна повторно
                         * показывать уже полученную ступень.
                         */
                        if (
                            seenAt <= 0 &&
                            currentAt > 0
                        ) {
                            newIds.push(
                                achievementId
                            );
                        }

                        return;
                    }

                    if (seenAt !== currentAt) {
                        newIds.push(
                            achievementId
                        );
                    }
                });
                localStorage.setItem(storageKey, JSON.stringify(current));
                newIds.forEach(function (achievementId, index) {
                    var achievement = getAchievement(catalog, achievementId);
                    if (!achievement) {
                        return;
                    }
                    setTimeout(function () {
                        showAchievementPopup(catalog, achievement);
                    }, index * 7600);
                });
                return current;
                });
            });
        });
    }


    I.registerFunctions('Engine/Events', {
        syncOwnHallRankAwardTimes: syncOwnHallRankAwardTimes,
        syncOwnGivenLikeProgressStep: syncOwnGivenLikeProgressStep,
        queueOwnGivenLikeProgress: queueOwnGivenLikeProgress,
        syncOwnProgressStep: syncOwnProgressStep,
        checkForNewAchievements: checkForNewAchievements
    }, ["buildEffectiveAchievementMap", "clearProgressSegmentCache", "cloneData", "createEmptyPublicProgress", "ensureOwnProgressRecord", "getAchievement", "getCurrentUserId", "getCurrentUserName", "getEditorStatsForUser", "getProgressForUser", "getParticipationStartedAt", "getTierLevel", "getUserAchievementMap", "isAutomaticProgressAchievementId", "isPlainObject", "nowUnix", "postProgressSegmentText", "readCatalog", "readProgressSegment", "readUserSegment", "replaceProgressRecordInSegment", "resolveUser", "sanitizePublicProgress", "saveLocalProgress", "showAchievementPopup", "tierAchievementId"]);
})(window);