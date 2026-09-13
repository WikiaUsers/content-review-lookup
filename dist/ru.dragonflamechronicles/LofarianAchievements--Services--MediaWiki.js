/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC10 PARTICIPATION CUTOFF REVIEW READY
Страница Fandom: MediaWiki:LofarianAchievements/Services/MediaWiki.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Единая обёртка над MediaWiki API этой же вики: чтение страниц, contributions, logs, categories, revisions и разрешённые записи.

ДАННЫЕ / I/O
Запись использует MediaWiki edit/protect API и CSRF token; внешних доменов нет.

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
    if (!I) { throw new Error('[Lofarian Achievements] Runtime отсутствует: Services/MediaWiki'); }
    var C = I.config || {};
    var STATE = I.state || {};
    var api = I.api;
    var DATA_CLASS = C.DATA_CLASS;
    var STO_DOROG_ID = C.STO_DOROG_ID;
    var CONTEXT_HISTORY_SCAN_LIMIT = C.CONTEXT_HISTORY_SCAN_LIMIT;
    var ROAD_CATEGORY_PAGE_SCAN_LIMIT = C.ROAD_CATEGORY_PAGE_SCAN_LIMIT;
    var TECHNICAL_SCAN_LIMIT = C.TECHNICAL_SCAN_LIMIT;
    var GLOBAL_RECENT_CHANGES_SCAN_LIMIT = C.GLOBAL_RECENT_CHANGES_SCAN_LIMIT;
    var GLOBAL_RECENT_CHANGES_CACHE_MS = C.GLOBAL_RECENT_CHANGES_CACHE_MS;
    var EDITOR_SCAN_LIMIT = C.EDITOR_SCAN_LIMIT;
    var FILE_SCAN_LIMIT = C.FILE_SCAN_LIMIT;
    var CREATED_ARTICLE_SCAN_LIMIT = C.CREATED_ARTICLE_SCAN_LIMIT;
    var ADMIN_GROUPS = C.ADMIN_GROUPS;

    var achievementFileUrlCache = {};
    function chunkArray() { return I.invoke('chunkArray', arguments); }
    function cloneData() { return I.invoke('cloneData', arguments); }
    function normalizeUserLookupKey() { return I.invoke('normalizeUserLookupKey', arguments); }
    function registrationToUnix() { return I.invoke('registrationToUnix', arguments); }
    function timestampToUnix() { return I.invoke('timestampToUnix', arguments); }

    function extractJsonFromPage(content) {
        content = String(content || '')
            .replace(/^\uFEFF/, '')
            .trim();

        var divPattern = /<div\b[^>]*class\s*=\s*["'][^"']*\blof-achievements-database\b[^"']*["'][^>]*>([\s\S]*?)<\/div\s*>/i;
        var match = content.match(divPattern);
        var body = match ? match[1] : content;

        body = String(body).trim();
        body = body.replace(/^\s*<nowiki\s*>\s*/i, '');
        body = body.replace(/\s*<\/nowiki\s*>\s*$/i, '');

        return body.trim();
    }


    function wrapJsonForPage(value, pretty) {
        var json = JSON.stringify(
            value,
            null,
            pretty ? 2 : 0
        );

        return '<div class="' + DATA_CLASS + '"><nowiki>\n' +
            json +
            '\n</nowiki></div>';
    }


    function normalizeWikiTitleKey(title) {
        return String(title || '')
            .replace(/_/g, ' ')
            .trim()
            .toLowerCase();
    }


    function readWikiPages(titles) {
        titles = Array.isArray(titles)
            ? titles.slice()
            : [titles];

        titles = titles
            .map(function (title) {
                return String(title || '').trim();
            })
            .filter(function (title, index, list) {
                return !!title && list.indexOf(title) === index;
            });

        if (!titles.length) {
            return Promise.resolve([]);
        }

        return api.get({
            action: 'query',
            prop: 'revisions',
            titles: titles.join('|'),
            rvprop: 'ids|timestamp|content',
            rvslots: 'main',
            formatversion: 2
        }).then(function (data) {
            var query = data && data.query || {};
            var pages = Array.isArray(query.pages)
                ? query.pages
                : [];
            var byKey = Object.create(null);
            var normalizedMap = Object.create(null);

            ['normalized', 'converted', 'redirects'].forEach(function (field) {
                var rows = Array.isArray(query[field])
                    ? query[field]
                    : [];

                rows.forEach(function (item) {
                    if (item && item.from && item.to) {
                        normalizedMap[normalizeWikiTitleKey(item.from)] = item.to;
                    }
                });
            });

            function resolvedRequestedKey(title) {
                var current = String(title || '');
                var guard = 0;

                while (
                    normalizedMap[normalizeWikiTitleKey(current)] &&
                    guard < 8
                ) {
                    current = normalizedMap[normalizeWikiTitleKey(current)];
                    guard++;
                }

                return normalizeWikiTitleKey(current);
            }

            pages.forEach(function (page) {
                var title = page && page.title
                    ? page.title
                    : '';
                var revision = page && page.revisions && page.revisions[0];
                var result = {
                    title: title,
                    exists: !(page && page.missing),
                    content: revision && revision.slots && revision.slots.main
                        ? revision.slots.main.content || ''
                        : '',
                    revid: revision ? revision.revid : 0,
                    timestamp: revision ? revision.timestamp : null
                };

                byKey[normalizeWikiTitleKey(title)] = result;
            });

            return titles.map(function (requestedTitle) {
                var found = byKey[resolvedRequestedKey(requestedTitle)];

                if (found) {
                    found = cloneData(found);
                    found.requestedTitle = requestedTitle;
                    return found;
                }

                return {
                    title: requestedTitle,
                    requestedTitle: requestedTitle,
                    exists: false,
                    content: '',
                    revid: 0,
                    timestamp: null
                };
            });
        });
    }


    function readWikiPage(title) {
        return readWikiPages([title]).then(function (pages) {
            var page = pages[0];

            if (page && Object.prototype.hasOwnProperty.call(page, 'requestedTitle')) {
                delete page.requestedTitle;
            }

            return page;
        });
    }


    function writeWikiPage(title, text, baseRevisionId) {
        var params = {
            action: 'edit',
            title: title,
            text: text,
            watchlist: 'nochange',
            formatversion: 2
        };

        if (baseRevisionId) {
            params.baserevid = baseRevisionId;
        }

        return api.postWithToken('csrf', params);
    }


    /*
     * RC11.9.16: удаление служебной страницы через штатный MediaWiki API.
     * Это используется News.clearNews(): Fandom Phalanx на некоторых вики
     * блокирует replacement-edit страницы объявления даже тогда, когда
     * администратор меняет только технический флаг active. Удаление страницы
     * не передаёт старый текст на повторную проверку Phalanx и оставляет
     * прозрачную запись в журнале удалений. Функция вызывается только после
     * отдельной sysop/bureaucrat-проверки в Services/News.js.
     */
    function deleteWikiPage(title, reason) {
        return api.postWithToken('csrf', {
            action: 'delete',
            title: title,
            reason: String(reason || 'Lofarian Achievements: отключение текущего объявления'),
            watchlist: 'nochange',
            formatversion: 2
        });
    }


    function protectTechnicalPage(title) {
        return api.postWithToken('csrf', {
            action: 'protect',
            title: title,
            protections: 'edit=sysop|move=sysop',
            expiry: 'infinite|infinite',
            watchlist: 'nochange',
            formatversion: 2
        }).then(function (result) {
            console.log(
                '[Lofarian Achievements] Страница защищена:',
                title
            );

            return result;
        }).catch(function (error) {
            console.error(
                '[Lofarian Achievements] ⚠ Не удалось автоматически защитить страницу:',
                title,
                error
            );

            return {
                warning: true,
                error: error
            };
        });
    }


    function getUserInfo() {
        if (STATE.userInfoCache) {
            return Promise.resolve(
                cloneData(STATE.userInfoCache)
            );
        }

        if (STATE.userInfoPromise) {
            return STATE.userInfoPromise.then(function (userInfo) {
                return cloneData(userInfo);
            });
        }

        STATE.userInfoPromise = api.get({
            action: 'query',
            meta: 'userinfo',
            uiprop: 'groups|rights',
            formatversion: 2
        }).then(function (data) {
            var userInfo = data.query.userinfo;
            STATE.userInfoCache = cloneData(userInfo);
            STATE.userInfoPromise = null;
            return userInfo;
        }).catch(function (error) {
            STATE.userInfoPromise = null;
            throw error;
        });

        return STATE.userInfoPromise.then(function (userInfo) {
            return cloneData(userInfo);
        });
    }


    function userCanAdmin(userInfo) {
        var groups = (userInfo && userInfo.groups) || [];

        for (var i = 0; i < ADMIN_GROUPS.length; i++) {
            if (groups.indexOf(ADMIN_GROUPS[i]) !== -1) {
                return true;
            }
        }

        return false;
    }


    function resolveUser(username) {
        username = String(username || '').trim();

        if (!username) {
            return Promise.reject(
                new Error('Не указано имя пользователя.')
            );
        }

        var cacheKey =
            normalizeUserLookupKey(username);

        if (STATE.userResolveCache[cacheKey]) {
            return Promise.resolve(
                cloneData(STATE.userResolveCache[cacheKey])
            );
        }

        return api.get({
            action: 'query',
            list: 'users',
            ususers: username,
            usprop: 'registration',
            formatversion: 2
        }).then(function (data) {
            var users = data.query.users || [];
            var user = users[0];

            if (
                !user ||
                user.missing ||
                user.invalid ||
                !user.userid
            ) {
                throw new Error(
                    'Пользователь не найден на этой вики: ' +
                    username
                );
            }

            var result = {
                userid: Number(user.userid),
                name: user.name,
                registration: user.registration || null,
                registrationUnix:
                    registrationToUnix(user.registration)
            };

            STATE.userResolveCache[cacheKey] =
                cloneData(result);

            return result;
        });
    }


    function fetchNamespaceContributions(
        user,
        namespaceNumber,
        limit,
        showFilter,
        startedAt
    ) {
        var contributions = [];

        namespaceNumber =
            Number(namespaceNumber);

        limit =
            Math.max(
                1,
                Math.floor(
                    Number(limit) || 1
                )
            );

        function next(uccontinue) {
            var params = {
                action: 'query',
                list: 'usercontribs',
                ucuser: user.name,
                ucnamespace: namespaceNumber,
                ucdir: 'newer',
                uclimit: 'max',
                ucprop: 'ids|title|timestamp|flags|sizediff',
                formatversion: 2
            };

            /*
             * Для Зодчего используем серверный фильтр ucshow=new.
             * Поэтому в выборку вообще не попадают обычные правки.
             */
            if (showFilter) {
                params.ucshow =
                    showFilter;
            }

            startedAt = Math.floor(Number(startedAt) || 0);
            if (startedAt >= 946684800) {
                params.ucstart = new Date(startedAt * 1000).toISOString();
            }

            if (uccontinue) {
                params.uccontinue =
                    uccontinue;
            }

            return api.get(params)
                .then(function (data) {
                    var rows =
                        (
                            data.query &&
                            data.query.usercontribs
                        ) || [];

                    for (
                        var i = 0;
                        i < rows.length;
                        i++
                    ) {
                        var item =
                            rows[i] || {};

                        /*
                         * Дополнительная проверка namespace.
                         * Даже если API когда-либо вернёт лишнюю
                         * запись, статья и файл не смешаются.
                         */
                        if (
                            item.ns !== undefined &&
                            Number(item.ns) !==
                                namespaceNumber
                        ) {
                            continue;
                        }

                        contributions.push(
                            item
                        );

                        if (
                            contributions.length >=
                            limit
                        ) {
                            return contributions;
                        }
                    }

                    var continuation =
                        data.continue &&
                        data.continue.uccontinue;

                    if (
                        continuation &&
                        contributions.length <
                            limit
                    ) {
                        return next(
                            continuation
                        );
                    }

                    return contributions;
                });
        }

        return next(null);
    }


    function fetchArticleContributions(user, startedAt) {
        return fetchNamespaceContributions(
            user,
            0,
            EDITOR_SCAN_LIMIT,
            null,
            startedAt
        );
    }


    function fetchGlobalRecentChanges() {
        if (
            STATE.globalRecentChangesCache &&
            Date.now() - STATE.globalRecentChangesCacheAt <
                GLOBAL_RECENT_CHANGES_CACHE_MS
        ) {
            return Promise.resolve(
                cloneData(STATE.globalRecentChangesCache)
            );
        }

        if (STATE.globalRecentChangesPromise) {
            return STATE.globalRecentChangesPromise.then(
                function (rows) {
                    return cloneData(rows);
                }
            );
        }

        var rows = [];

        function next(rccontinue) {
            var params = {
                action: 'query',
                list: 'recentchanges',
                rctype: 'edit|new',
                rclimit: 'max',
                rcprop: 'ids|title|timestamp|user|flags',
                formatversion: 2
            };

            if (rccontinue) {
                params.rccontinue = rccontinue;
            }

            return api.get(params).then(function (data) {
                var part =
                    data && data.query &&
                    Array.isArray(data.query.recentchanges)
                        ? data.query.recentchanges
                        : [];

                part.forEach(function (item) {
                    if (
                        rows.length <
                        GLOBAL_RECENT_CHANGES_SCAN_LIMIT
                    ) {
                        rows.push(item || {});
                    }
                });

                var continuation =
                    data && data.continue &&
                    data.continue.rccontinue;

                if (
                    continuation &&
                    rows.length <
                        GLOBAL_RECENT_CHANGES_SCAN_LIMIT
                ) {
                    return next(continuation);
                }

                rows.sort(function (a, b) {
                    return (
                        timestampToUnix(a.timestamp) -
                        timestampToUnix(b.timestamp)
                    );
                });

                return rows;
            });
        }

        STATE.globalRecentChangesPromise = next(null)
            .then(function (result) {
                STATE.globalRecentChangesCache =
                    cloneData(result);
                STATE.globalRecentChangesCacheAt =
                    Date.now();
                STATE.globalRecentChangesPromise = null;
                return result;
            })
            .catch(function (error) {
                STATE.globalRecentChangesPromise = null;
                console.warn(
                    '[Lofarian Achievements] recentchanges для скрытых достижений недоступен:',
                    error
                );
                return [];
            });

        return STATE.globalRecentChangesPromise.then(
            function (result) {
                return cloneData(result);
            }
        );
    }


    function fetchCreatedArticleContributions(user, startedAt) {
        /*
         * Это отдельный серверный запрос.
         * ucshow=new означает: только ревизии,
         * которыми была создана новая страница.
         *
         * Никакой проверки hasOwnProperty('new')
         * здесь больше нет.
         */
        return fetchNamespaceContributions(
            user,
            0,
            CREATED_ARTICLE_SCAN_LIMIT,
            'new',
            startedAt
        );
    }


    function fetchUploadLogEvents(user, startedAt) {
        var events = [];

        function next(lecontinue) {
            var params = {
                action: 'query',
                list: 'logevents',

                /*
                 * Только ПЕРВАЯ загрузка нового файла.
                 *
                 * upload/overwrite и upload/revert сюда
                 * не входят.
                 */
                leaction: 'upload/upload',

                leuser: user.name,
                ledir: 'newer',
                lelimit: 'max',
                leprop: 'ids|title|timestamp|type|user',
                formatversion: 2
            };

            startedAt = Math.floor(Number(startedAt) || 0);
            if (startedAt >= 946684800) {
                params.lestart = new Date(startedAt * 1000).toISOString();
            }

            if (lecontinue) {
                params.lecontinue =
                    lecontinue;
            }

            return api.get(params)
                .then(function (data) {
                    var rows =
                        (
                            data.query &&
                            data.query.logevents
                        ) || [];

                    for (
                        var i = 0;
                        i < rows.length;
                        i++
                    ) {
                        events.push(
                            rows[i]
                        );

                        if (
                            events.length >=
                            FILE_SCAN_LIMIT
                        ) {
                            return events;
                        }
                    }

                    var continuation =
                        data.continue &&
                        data.continue.lecontinue;

                    if (
                        continuation &&
                        events.length <
                            FILE_SCAN_LIMIT
                    ) {
                        return next(
                            continuation
                        );
                    }

                    return events;
                });
        }

        return next(null);
    }


    function fetchTechnicalContributions(user, startedAt) {
        /*
         * Пространства запрашиваются отдельно, чтобы не зависеть
         * от поддержки multi-value ucnamespace конкретной сборкой Fandom.
         */
        return Promise.all([
            fetchNamespaceContributions(
                user,
                4,
                TECHNICAL_SCAN_LIMIT,
                null,
                startedAt
            ),

            fetchNamespaceContributions(
                user,
                10,
                TECHNICAL_SCAN_LIMIT,
                null,
                startedAt
            ),

            fetchNamespaceContributions(
                user,
                14,
                TECHNICAL_SCAN_LIMIT,
                null,
                startedAt
            )
        ]).then(function (groups) {
            var rows = [];

            groups.forEach(function (group) {
                rows =
                    rows.concat(
                        Array.isArray(group)
                            ? group
                            : []
                    );
            });

            rows.sort(function (a, b) {
                return (
                    timestampToUnix(
                        a.timestamp
                    ) -
                    timestampToUnix(
                        b.timestamp
                    )
                );
            });

            return rows.slice(
                -TECHNICAL_SCAN_LIMIT
            );
        });
    }


    function fetchParentRevisionMetadata(
        contributions
    ) {
        contributions =
            Array.isArray(contributions)
                ? contributions
                : [];

        var selected =
            contributions.slice(
                -CONTEXT_HISTORY_SCAN_LIMIT
            );

        var ids = [];
        var seenIds = {};

        selected.forEach(function (item) {
            var parentId =
                Math.floor(
                    Number(
                        item.parentid
                    ) || 0
                );

            if (
                parentId > 0 &&
                !seenIds[
                    parentId
                ]
            ) {
                seenIds[
                    parentId
                ] =
                    true;

                ids.push(
                    parentId
                );
            }
        });

        if (!ids.length) {
            return Promise.resolve({
                contributions:
                    selected,

                revisions:
                    {}
            });
        }

        var batches =
            chunkArray(
                ids,
                50
            );

        var revisions = {};

        return Promise.all(
            batches.map(function (batch) {
                return api.get({
                    action:
                        'query',

                    prop:
                        'revisions',

                    revids:
                        batch.join('|'),

                    rvprop:
                        'ids|timestamp|size',

                    formatversion:
                        2
                });
            })
        ).then(function (groups) {
            groups.forEach(function (data) {
                var pages =
                    (
                        data.query &&
                        data.query.pages
                    ) || [];

                pages.forEach(function (page) {
                    (
                        page.revisions ||
                        []
                    ).forEach(function (revision) {
                        var revisionId =
                            Number(
                                revision.revid
                            ) || 0;

                        if (
                            revisionId >
                            0
                        ) {
                            revisions[
                                revisionId
                            ] = {
                                timestamp:
                                    revision.timestamp ||
                                    null,

                                size:
                                    Math.max(
                                        0,
                                        Math.floor(
                                            Number(
                                                revision.size
                                            ) || 0
                                        )
                                    )
                            };
                        }
                    });
                });
            });

            return {
                contributions:
                    selected,

                revisions:
                    revisions
            };
        });
    }


    function fetchRoadCategoryStats(
        contributions
    ) {
        contributions =
            Array.isArray(contributions)
                ? contributions
                : [];

        var pageIds = [];
        var seenPageIds = {};
        var timestampByPageId = {};

        contributions.forEach(function (item) {
            var pageId =
                Math.floor(
                    Number(
                        item.pageid
                    ) || 0
                );

            if (
                pageId <= 0 ||
                seenPageIds[
                    pageId
                ] ||
                pageIds.length >=
                    ROAD_CATEGORY_PAGE_SCAN_LIMIT
            ) {
                return;
            }

            seenPageIds[
                pageId
            ] =
                true;

            pageIds.push(
                pageId
            );

            timestampByPageId[
                pageId
            ] =
                timestampToUnix(
                    item.timestamp
                );
        });

        if (!pageIds.length) {
            return Promise.resolve({
                roadCategories:
                    0,

                achievementMap:
                    {}
            });
        }

        var categoryMap = {};
        var batches =
            chunkArray(
                pageIds,
                50
            );

        function fetchBatch(
            batch,
            clcontinue
        ) {
            var params = {
                action:
                    'query',

                prop:
                    'categories',

                pageids:
                    batch.join('|'),

                cllimit:
                    'max',

                formatversion:
                    2
            };

            if (clcontinue) {
                params.clcontinue =
                    clcontinue;
            }

            return api.get(params)
                .then(function (data) {
                    var pages =
                        (
                            data.query &&
                            data.query.pages
                        ) || [];

                    pages.forEach(function (page) {
                        var pageId =
                            Number(
                                page.pageid
                            ) || 0;

                        if (
                            pageId <= 0
                        ) {
                            return;
                        }

                        if (
                            !categoryMap[
                                pageId
                            ]
                        ) {
                            categoryMap[
                                pageId
                            ] =
                                [];
                        }

                        (
                            page.categories ||
                            []
                        ).forEach(function (item) {
                            if (item.title) {
                                categoryMap[
                                    pageId
                                ].push(
                                    String(
                                        item.title
                                    )
                                );
                            }
                        });
                    });

                    var continuation =
                        data.continue &&
                        data.continue.clcontinue;

                    if (continuation) {
                        return fetchBatch(
                            batch,
                            continuation
                        );
                    }
                });
        }

        return Promise.all(
            batches.map(function (batch) {
                return fetchBatch(
                    batch,
                    null
                );
            })
        ).then(function () {
            var categories = {};
            var count = 0;
            var awardAt = 0;

            pageIds.forEach(function (pageId) {
                (
                    categoryMap[
                        pageId
                    ] || []
                ).forEach(function (title) {
                    if (
                        categories[
                            title
                        ]
                    ) {
                        return;
                    }

                    categories[
                        title
                    ] =
                        true;

                    count +=
                        1;

                    if (
                        count >= 100 &&
                        !awardAt
                    ) {
                        awardAt =
                            timestampByPageId[
                                pageId
                            ] ||
                            1;
                    }
                });
            });

            var result = {
                roadCategories:
                    count,

                achievementMap:
                    {}
            };

            if (count >= 100) {
                result.achievementMap[
                    STO_DOROG_ID
                ] =
                    awardAt ||
                    1;
            }

            return result;
        });
    }



    function getPageCategories(pageId) {
        return api.get({
            action: 'query',
            prop: 'categories',
            pageids: Number(pageId),
            cllimit: 'max',
            formatversion: 2
        }).then(function (data) {
            var pages = data && data.query && data.query.pages || [];
            return pages[0] && Array.isArray(pages[0].categories)
                ? pages[0].categories
                : [];
        });
    }


    function postWikiEdit(params) {
        return api.postWithToken('csrf', params);
    }


    function normalizeImageUrl(url) {
        if (!url) {
            return null;
        }

        if (url.indexOf('//') === 0) {
            return window.location.protocol + url;
        }

        return url;
    }


    function resolveFileUrl(fileName) {
        fileName = String(fileName || '')
            .replace(/^(?:Файл|File)\s*:\s*/i, '')
            .trim();

        if (!fileName) {
            return Promise.reject(
                new Error('Не указано название изображения.')
            );
        }

        var cacheKey =
            fileName.toLocaleLowerCase(
                'ru'
            );

        if (
            achievementFileUrlCache[
                cacheKey
            ]
        ) {
            return achievementFileUrlCache[
                cacheKey
            ];
        }

        var titles = [
            'File:' + fileName,
            'Файл:' + fileName
        ];

        var request =
            api.get({
                action: 'query',
                prop: 'imageinfo',
                titles: titles.join('|'),
                iiprop: 'url|size|mime',
                iiurlwidth: 180,
                redirects: 1,
                formatversion: 2
            }).then(function (data) {
                var pages = data.query.pages || [];

                for (var i = 0; i < pages.length; i++) {
                    var page = pages[i];

                    if (
                        page.missing ||
                        !page.imageinfo ||
                        !page.imageinfo.length
                    ) {
                        continue;
                    }

                    var info =
                        page.imageinfo[0];

                    var thumbUrl =
                        normalizeImageUrl(
                            info.thumburl
                        );

                    var originalUrl =
                        normalizeImageUrl(
                            info.url
                        );

                    var url =
                        thumbUrl ||
                        originalUrl;

                    if (!url) {
                        continue;
                    }

                    /*
                     * Сразу прогреваем браузерный image-cache.
                     * Поэтому перелистывание значков и открытие
                     * полного списка не должны показывать повторную
                     * визуальную подгрузку тех же изображений.
                     */
                    [
                        thumbUrl,
                        originalUrl
                    ].forEach(function (candidate) {
                        if (!candidate) {
                            return;
                        }

                        try {
                            var preloader =
                                new Image();

                            preloader.decoding =
                                'async';

                            preloader.src =
                                candidate;
                        } catch (error) {
                            /* no-op */
                        }
                    });

                    return {
                        fileName:
                            fileName,

                        title:
                            page.title,

                        url:
                            url,

                        thumbUrl:
                            thumbUrl,

                        originalUrl:
                            originalUrl,

                        width:
                            info.width,

                        height:
                            info.height,

                        mime:
                            info.mime
                    };
                }

                throw new Error(
                    'Файл не найден: ' +
                    fileName
                );
            });

        achievementFileUrlCache[
            cacheKey
        ] =
            request.catch(
                function (error) {
                    /*
                     * Ошибку не кэшируем навсегда: если файл только
                     * что загрузили, следующая попытка сможет его найти.
                     */
                    delete achievementFileUrlCache[
                        cacheKey
                    ];

                    throw error;
                }
            );

        return achievementFileUrlCache[
            cacheKey
        ];
    }


    I.registerFunctions('Services/MediaWiki', {
        extractJsonFromPage: extractJsonFromPage,
        wrapJsonForPage: wrapJsonForPage,
        readWikiPage: readWikiPage,
        readWikiPages: readWikiPages,
        writeWikiPage: writeWikiPage,
        deleteWikiPage: deleteWikiPage,
        protectTechnicalPage: protectTechnicalPage,
        getUserInfo: getUserInfo,
        userCanAdmin: userCanAdmin,
        resolveUser: resolveUser,
        fetchNamespaceContributions: fetchNamespaceContributions,
        fetchArticleContributions: fetchArticleContributions,
        fetchGlobalRecentChanges: fetchGlobalRecentChanges,
        fetchCreatedArticleContributions: fetchCreatedArticleContributions,
        fetchUploadLogEvents: fetchUploadLogEvents,
        fetchTechnicalContributions: fetchTechnicalContributions,
        fetchParentRevisionMetadata: fetchParentRevisionMetadata,
        fetchRoadCategoryStats: fetchRoadCategoryStats,
        getPageCategories: getPageCategories,
        postWikiEdit: postWikiEdit,
        normalizeImageUrl: normalizeImageUrl,
        resolveFileUrl: resolveFileUrl
    }, ["chunkArray", "cloneData", "normalizeUserLookupKey", "registrationToUnix", "timestampToUnix"]);
})(window);