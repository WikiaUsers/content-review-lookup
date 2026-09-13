/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC10 PARTICIPATION CUTOFF REVIEW READY
Страница Fandom: MediaWiki:LofarianAchievements/Metrics/Reading.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Считает чтение текущих статей, активное время и тематические показатели; подключает существующий трекер чтения.

ДАННЫЕ / I/O
Progress синхронизируется только через Storage в локальные Progress-сегменты; не отслеживает пользователя вне этой вики.

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
    if (!I) { throw new Error('[Lofarian Achievements] Runtime отсутствует: Metrics/Reading'); }
    var C = I.config || {};
    var STATE = I.state || {};
    var api = I.api;
    var THEME_KEYS = C.THEME_KEYS;
    var THEME_CATEGORY_TITLES = C.THEME_CATEGORY_TITLES;
    var ARTICLE_READ_MIN_SECONDS = C.ARTICLE_READ_MIN_SECONDS;
    var ACTIVE_IDLE_TIMEOUT_MS = C.ACTIVE_IDLE_TIMEOUT_MS;
    var LOCAL_PROGRESS_SAVE_INTERVAL_MS = C.LOCAL_PROGRESS_SAVE_INTERVAL_MS;
    var REMOTE_PROGRESS_SYNC_INTERVAL_MS = C.REMOTE_PROGRESS_SYNC_INTERVAL_MS;
    function cloneData() { return I.invoke('cloneData', arguments); }
    function ensureOwnProgressRecord() { return I.invoke('ensureOwnProgressRecord', arguments); }
    function getCurrentUserId() { return I.invoke('getCurrentUserId', arguments); }
    function getCurrentUserName() { return I.invoke('getCurrentUserName', arguments); }
    function getPageCategories() { return I.invoke('getPageCategories', arguments); }
    function loadLocalProgress() { return I.invoke('loadLocalProgress', arguments); }
    function readUserProgress() { return I.invoke('readUserProgress', arguments); }
    function resolveUser() { return I.invoke('resolveUser', arguments); }
    function saveLocalProgress() { return I.invoke('saveLocalProgress', arguments); }
    function syncOwnProgressStep() { return I.invoke('syncOwnProgressStep', arguments); }

    function getCurrentArticleIdentity() {
        var namespace =
            Number(
                mw.config.get(
                    'wgNamespaceNumber'
                )
            );

        var articleId =
            Number(
                mw.config.get(
                    'wgArticleId'
                ) || 0
            );

        var action =
            String(
                mw.config.get(
                    'wgAction'
                ) || ''
            );

        if (
            namespace !== 0 ||
            articleId <= 0 ||
            action !== 'view'
        ) {
            return null;
        }

        return {
            pageId:
                articleId,

            title:
                String(
                    mw.config.get(
                        'wgPageName'
                    ) || ''
                )
        };
    }


    function getCurrentArticleThemes(article) {
        var result = {
            era_zarozhdeniya: false,
            era_drakona: false,
            kevariytsy: false
        };

        if (
            !article ||
            !article.pageId
        ) {
            return Promise.resolve(
                result
            );
        }

        return getPageCategories(
            article.pageId
        ).then(function (categories) {
            var names = {};

            categories.forEach(function (item) {
                var title =
                    String(
                        item.title || ''
                    );

                var colon =
                    title.indexOf(':');

                if (colon !== -1) {
                    title =
                        title.slice(
                            colon + 1
                        );
                }

                title =
                    title
                        .replace(/_/g, ' ')
                        .trim()
                        .toLocaleLowerCase(
                            'ru'
                        );

                if (title) {
                    names[title] =
                        true;
                }
            });

            THEME_KEYS.forEach(function (themeKey) {
                var expected =
                    String(
                        THEME_CATEGORY_TITLES[
                            themeKey
                        ] || ''
                    )
                    .trim()
                    .toLocaleLowerCase(
                        'ru'
                    );

                result[
                    themeKey
                ] =
                    !!names[
                        expected
                    ];
            });

            return result;
        }).catch(function (error) {
            console.warn(
                '[Lofarian Achievements] Не удалось определить тематические категории статьи:',
                error
            );

            return result;
        });
    }


    function initReadingTracker(
        catalog
    ) {
        if (STATE.readingTrackerStarted) {
            return STATE.currentProgressReady ||
                Promise.resolve(
                    STATE.currentProgressState
                );
        }

        STATE.readingTrackerStarted =
            true;

        var userId =
            getCurrentUserId();

        var username =
            getCurrentUserName();

        if (
            userId <= 0 ||
            !username
        ) {
            STATE.currentProgressReady =
                Promise.resolve(null);

            return STATE.currentProgressReady;
        }

        STATE.currentProgressReady =
            resolveUser(username)
                .then(function (user) {
                    if (
                        user.name.indexOf('|') !== -1
                    ) {
                        throw new Error(
                            'Имя пользователя содержит недопустимый для progress-протокола символ |.'
                        );
                    }

                    var state =
                        loadLocalProgress(
                            user.userid,
                            user.name
                        );

                    STATE.currentProgressState =
                        state;

                    return ensureOwnProgressRecord(
                        user,
                        0
                    ).then(function (official) {
                        STATE.currentOfficialProgress =
                            cloneData(
                                official
                            );

                        var article =
                            getCurrentArticleIdentity();

                        if (!article) {
                            return state;
                        }

                        return getCurrentArticleThemes(
                            article
                        ).then(function (activeThemes) {
                            var seen =
                                new Set(
                                    state.seenArticleIds
                                );

                            var articleAlreadyCounted =
                                seen.has(
                                    article.pageId
                                );

                            var themeSeenSets = {};
                            var themeAlreadyCounted = {};

                            THEME_KEYS.forEach(function (themeKey) {
                                themeSeenSets[
                                    themeKey
                                ] =
                                    new Set(
                                        state.themeSeenArticleIds[
                                            themeKey
                                        ] || []
                                    );

                                themeAlreadyCounted[
                                    themeKey
                                ] =
                                    themeSeenSets[
                                        themeKey
                                    ].has(
                                        article.pageId
                                    );
                            });

                            var pageActiveSeconds =
                                0;

                            var lastActivityAt =
                                Date.now();

                            var lastLocalSaveAt =
                                Date.now();

                            var lastRemoteSyncAt =
                                Date.now();

                            function markActivity() {
                                lastActivityAt =
                                    Date.now();
                            }

                            [
                                'mousemove',
                                'mousedown',
                                'keydown',
                                'scroll',
                                'touchstart',
                                'pointerdown'
                            ].forEach(function (eventName) {
                                window.addEventListener(
                                    eventName,
                                    markActivity,
                                    {
                                        passive:
                                            true
                                    }
                                );
                            });

                            function flushLocal() {
                                saveLocalProgress(
                                    state
                                );

                                lastLocalSaveAt =
                                    Date.now();
                            }

                            function tryRemoteSync() {
                                lastRemoteSyncAt =
                                    Date.now();

                                return syncOwnProgressStep(
                                    catalog,
                                    user,
                                    state,
                                    0
                                );
                            }

                            var timer =
                                setInterval(
                                    function () {
                                        var visible =
                                            document.visibilityState ===
                                            'visible';

                                        var active =
                                            Date.now() -
                                            lastActivityAt <=
                                            ACTIVE_IDLE_TIMEOUT_MS;

                                        if (
                                            visible &&
                                            active
                                        ) {
                                            state.pendingActiveSeconds +=
                                                1;

                                            pageActiveSeconds +=
                                                1;

                                            THEME_KEYS.forEach(function (themeKey) {
                                                if (
                                                    activeThemes[
                                                        themeKey
                                                    ]
                                                ) {
                                                    state.pendingThemeActiveSeconds[
                                                        themeKey
                                                    ] +=
                                                        1;
                                                }
                                            });

                                            if (
                                                !articleAlreadyCounted &&
                                                pageActiveSeconds >=
                                                    ARTICLE_READ_MIN_SECONDS
                                            ) {
                                                articleAlreadyCounted =
                                                    true;

                                                seen.add(
                                                    article.pageId
                                                );

                                                state.seenArticleIds =
                                                    Array.from(
                                                        seen
                                                    )
                                                    .slice(-6000);

                                                state.pendingArticles +=
                                                    1;
                                            }

                                            if (
                                                pageActiveSeconds >=
                                                ARTICLE_READ_MIN_SECONDS
                                            ) {
                                                THEME_KEYS.forEach(function (themeKey) {
                                                    if (
                                                        !activeThemes[
                                                            themeKey
                                                        ] ||
                                                        themeAlreadyCounted[
                                                            themeKey
                                                        ]
                                                    ) {
                                                        return;
                                                    }

                                                    themeAlreadyCounted[
                                                        themeKey
                                                    ] =
                                                        true;

                                                    themeSeenSets[
                                                        themeKey
                                                    ].add(
                                                        article.pageId
                                                    );

                                                    state.themeSeenArticleIds[
                                                        themeKey
                                                    ] =
                                                        Array.from(
                                                            themeSeenSets[
                                                                themeKey
                                                            ]
                                                        )
                                                        .slice(-1500);

                                                    state.pendingThemeArticles[
                                                        themeKey
                                                    ] +=
                                                        1;
                                                });
                                            }

                                            if (
                                                pageActiveSeconds ===
                                                    ARTICLE_READ_MIN_SECONDS
                                            ) {
                                                flushLocal();
                                                tryRemoteSync();
                                            }
                                        }

                                        if (
                                            Date.now() -
                                            lastLocalSaveAt >=
                                            LOCAL_PROGRESS_SAVE_INTERVAL_MS
                                        ) {
                                            flushLocal();
                                        }

                                        var hasThemePending =
                                            THEME_KEYS.some(
                                                function (themeKey) {
                                                    return (
                                                        state.pendingThemeActiveSeconds[
                                                            themeKey
                                                        ] > 0 ||
                                                        state.pendingThemeArticles[
                                                            themeKey
                                                        ] > 0
                                                    );
                                                }
                                            );

                                        if (
                                            Date.now() -
                                            lastRemoteSyncAt >=
                                            REMOTE_PROGRESS_SYNC_INTERVAL_MS &&
                                            (
                                                state.pendingActiveSeconds > 0 ||
                                                state.pendingArticles > 0 ||
                                                hasThemePending
                                            )
                                        ) {
                                            tryRemoteSync();
                                        }
                                    },
                                    1000
                                );

                            window.addEventListener(
                                'pagehide',
                                function () {
                                    flushLocal();
                                    tryRemoteSync();
                                    clearInterval(timer);
                                },
                                {
                                    once:
                                        true
                                }
                            );

                            document.addEventListener(
                                'visibilitychange',
                                function () {
                                    if (
                                        document.visibilityState ===
                                        'hidden'
                                    ) {
                                        flushLocal();
                                        tryRemoteSync();
                                    } else {
                                        markActivity();
                                    }
                                }
                            );

                            return state;
                        });
                    });
                }).catch(function (error) {
                    console.warn(
                        '[Lofarian Achievements] ' +
                        'Счётчик чтения не запущен:',
                        error
                    );

                    STATE.currentProgressState =
                        loadLocalProgress(
                            userId,
                            username
                        );

                    return STATE.currentProgressState;
                });

        return STATE.currentProgressReady;
    }


    function getProgressForUser(
        user,
        forceReload
    ) {
        return readUserProgress(
            user,
            forceReload
        ).then(function (progress) {
            if (
                Number(user.userid) ===
                getCurrentUserId()
            ) {
                STATE.currentOfficialProgress =
                    cloneData(
                        progress
                    );
            }

            return progress;
        });
    }


    I.registerFunctions('Metrics/Reading', {
        getCurrentArticleIdentity: getCurrentArticleIdentity,
        getCurrentArticleThemes: getCurrentArticleThemes,
        initReadingTracker: initReadingTracker,
        getProgressForUser: getProgressForUser
    }, ["cloneData", "ensureOwnProgressRecord", "getCurrentUserId", "getCurrentUserName", "loadLocalProgress", "readUserProgress", "resolveUser", "saveLocalProgress", "syncOwnProgressStep", "getPageCategories"]);
})(window);