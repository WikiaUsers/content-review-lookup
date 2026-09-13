/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC10 PARTICIPATION CUTOFF REVIEW READY
Страница Fandom: MediaWiki:LofarianAchievements/Services/Leaderboard.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Собирает Зал славы и распространённость достижений из локальных Users/Progress сегментов и MediaWiki user data.

ДАННЫЕ / I/O
Использует память/localStorage только как временный кэш; официальные награды из localStorage не выдаются.

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
    if (!I) { throw new Error('[Lofarian Achievements] Runtime отсутствует: Services/Leaderboard'); }
    var C = I.config || {};
    var STATE = I.state || {};
    var api = I.api;
    var USERS_PAGE_PREFIX = C.USERS_PAGE_PREFIX;
    var SEGMENT_COUNT = C.SEGMENT_COUNT;
    var LEADERBOARD_LIMIT = C.LEADERBOARD_LIMIT;
    var HALL_TOP_500_ID = C.HALL_TOP_500_ID;
    var HALL_TOP_100_ID = C.HALL_TOP_100_ID;
    var HALL_TOP_10_ID = C.HALL_TOP_10_ID;
    var PROGRESS_PAGE_PREFIX = C.PROGRESS_PAGE_PREFIX;
    var PROGRESS_SEGMENT_COUNT = C.PROGRESS_SEGMENT_COUNT;
    var EDITOR_HALL_USER_LIMIT = C.EDITOR_HALL_USER_LIMIT;
    var EDITOR_HALL_CONCURRENCY = C.EDITOR_HALL_CONCURRENCY;
    var LEADERBOARD_CACHE_MS = C.LEADERBOARD_CACHE_MS;
    var LEADERBOARD_STORAGE_KEY = C.LEADERBOARD_STORAGE_KEY;
    var LEADERBOARD_STORAGE_MAX_AGE_MS = C.LEADERBOARD_STORAGE_MAX_AGE_MS;
    function buildEffectiveAchievementMap() { return I.invoke('buildEffectiveAchievementMap', arguments); }
    function calculateScore() { return I.invoke('calculateScore', arguments); }
    function cloneData() { return I.invoke('cloneData', arguments); }
    function createEmptyDiscussionStats() { return I.invoke('createEmptyDiscussionStats', arguments); }
    function createEmptyEditorStats() { return I.invoke('createEmptyEditorStats', arguments); }
    function createEmptyPublicProgress() { return I.invoke('createEmptyPublicProgress', arguments); }
    function extractJsonFromPage() { return I.invoke('extractJsonFromPage', arguments); }
    function getAchievement() { return I.invoke('getAchievement', arguments); }
    function getEditorStatsForUser() { return I.invoke('getEditorStatsForUser', arguments); }
    function getParticipationStartedAt() { return I.invoke('getParticipationStartedAt', arguments); }
    function isPlainObject() { return I.invoke('isPlainObject', arguments); }
    function normalizeProgressUsername() { return I.invoke('normalizeProgressUsername', arguments); }
    function nowUnix() { return I.invoke('nowUnix', arguments); }
    function parseProgressSegmentText() { return I.invoke('parseProgressSegmentText', arguments); }
    function registrationToUnix() { return I.invoke('registrationToUnix', arguments); }
    function sanitizePublicProgress() { return I.invoke('sanitizePublicProgress', arguments); }
    function validateSegment() { return I.invoke('validateSegment', arguments); }

    function getAllSegmentTitles() {
        var titles = [];

        for (var i = 0; i < SEGMENT_COUNT; i++) {
            titles.push(
                USERS_PAGE_PREFIX +
                i.toString(16).padStart(2, '0')
            );
        }

        return titles;
    }


    function chunkArray(items, size) {
        var chunks = [];

        for (var i = 0; i < items.length; i += size) {
            chunks.push(items.slice(i, i + size));
        }

        return chunks;
    }


    function readLeaderboardSegmentBatch(titles) {
        return api.get({
            action: 'query',
            prop: 'revisions',
            titles: titles.join('|'),
            rvprop: 'content',
            rvslots: 'main',
            formatversion: 2
        }).then(function (data) {
            var pages = data.query.pages || [];
            var result = [];

            pages.forEach(function (page) {
                if (
                    page.missing ||
                    !page.revisions ||
                    !page.revisions.length
                ) {
                    return;
                }

                var revision = page.revisions[0];
                var content = revision.slots &&
                    revision.slots.main
                    ? revision.slots.main.content || ''
                    : '';

                try {
                    var segment = JSON.parse(
                        extractJsonFromPage(content)
                    );

                    validateSegment(segment);
                    result.push(segment);

                } catch (error) {
                    console.error(
                        '[Lofarian Achievements] Не удалось прочитать сегмент рейтинга:',
                        page.title,
                        error
                    );
                }
            });

            return result;
        });
    }


    function readAllSegmentsForLeaderboard() {
        var batches = chunkArray(
            getAllSegmentTitles(),
            50
        );

        return Promise.all(
            batches.map(function (batch) {
                return readLeaderboardSegmentBatch(batch);
            })
        ).then(function (groups) {
            var segments = [];

            groups.forEach(function (group) {
                segments = segments.concat(group);
            });

            return segments;
        });
    }


    function resolveUserNamesByIds(userIds) {
        var unique = [];
        var seen = {};

        userIds.forEach(function (userId) {
            var key = String(userId);

            if (!seen[key]) {
                seen[key] = true;
                unique.push(key);
            }
        });

        var batches = chunkArray(unique, 50);
        var nameMap = {};

        return Promise.all(
            batches.map(function (batch) {
                return api.get({
                    action: 'query',
                    list: 'users',
                    ususerids: batch.join('|'),
                    formatversion: 2
                }).then(function (data) {
                    var users = data.query.users || [];

                    users.forEach(function (user) {
                        if (
                            user &&
                            user.userid &&
                            !user.missing
                        ) {
                            nameMap[String(user.userid)] =
                                user.name;
                        }
                    });
                });
            })
        ).then(function () {
            return nameMap;
        });
    }


    function resolveLeaderboardUsersByIds(userIds) {
        var unique = [];
        var seen = {};
        userIds.forEach(function (userId) {
            var key = String(userId);
            if (!seen[key]) {
                seen[key] = true;
                unique.push(key);
            }
        });
        if (!unique.length) {
            return Promise.resolve({});
        }
        var batches = chunkArray(unique, 50);
        var result = {};
        return Promise.all(batches.map(function (batch) {
            return api.get({
                action: 'query',
                list: 'users',
                ususerids: batch.join('|'),
                usprop: 'registration|editcount',
                formatversion: 2
            }).then(function (data) {
                (data.query.users || []).forEach(function (user) {
                    if (!user || !user.userid || user.missing || user.invalid) {
                        return;
                    }
                    result[String(user.userid)] = {
                        userid: Number(user.userid),
                        name: user.name,
                        registration: user.registration || null,
                        registrationUnix:
                            registrationToUnix(
                                user.registration
                            ),
                        editcount:
                            Math.max(
                                0,
                                Math.floor(
                                    Number(
                                        user.editcount
                                    ) || 0
                                )
                            )
                    };
                });
            });
        })).then(function () {
            return result;
        });
    }


    function getAllProgressSegmentTitles() {
        var titles = [];

        for (
            var i = 0;
            i < PROGRESS_SEGMENT_COUNT;
            i++
        ) {
            titles.push(
                PROGRESS_PAGE_PREFIX +
                String(i)
            );
        }

        return titles;
    }


    function readProgressSegmentBatch(
        titles
    ) {
        return api.get({
            action:
                'query',

            prop:
                'revisions',

            titles:
                titles.join('|'),

            rvprop:
                'content',

            rvslots:
                'main',

            formatversion:
                2
        }).then(function (data) {
            var result = {};

            (data.query.pages || [])
                .forEach(function (page) {
                    if (
                        !page ||
                        page.missing ||
                        !page.revisions ||
                        !page.revisions.length
                    ) {
                        return;
                    }

                    var revision =
                        page.revisions[0];

                    var content =
                        revision.slots &&
                        revision.slots.main
                            ? revision.slots.main.content || ''
                            : '';

                    var parsed;

                    try {
                        parsed =
                            parseProgressSegmentText(
                                content,
                                page.title
                            );
                    } catch (error) {
                        console.error(
                            '[Lofarian Achievements] ' +
                            'Повреждён progress-сегмент:',
                            page.title,
                            error
                        );

                        return;
                    }

                    Object.keys(
                        parsed.records
                    ).forEach(function (username) {
                        var incoming =
                            parsed.records[
                                username
                            ];

                        var existing =
                            result[username];

                        if (!existing) {
                            result[username] =
                                incoming;

                            return;
                        }

                        /*
                         * На случай ручного админского дубля
                         * берём максимальный НЕубывающий прогресс.
                         * Обычный пользователь дубли создать не
                         * сможет из-за проверки сегмента AbuseFilter.
                         */
                        result[username] =
                            sanitizePublicProgress(
                                {
                                    articleCount:
                                        Math.max(
                                            existing.articleCount,
                                            incoming.articleCount
                                        ),

                                    activeSeconds:
                                        Math.max(
                                            existing.activeSeconds,
                                            incoming.activeSeconds
                                        ),

                                    lastArticleAt:
                                        Math.max(
                                            existing.lastArticleAt,
                                            incoming.lastArticleAt
                                        ),

                                    updatedAt:
                                        Math.max(
                                            existing.updatedAt,
                                            incoming.updatedAt
                                        )
                                },
                                username
                            );
                    });
                });

            return result;
        });
    }


    function readAllPublicReadingProgress() {
        var batches =
            chunkArray(
                getAllProgressSegmentTitles(),
                50
            );

        return Promise.all(
            batches.map(function (batch) {
                return readProgressSegmentBatch(
                    batch
                );
            })
        ).then(function (groups) {
            var result = {};

            groups.forEach(function (group) {
                Object.keys(group)
                    .forEach(function (username) {
                        result[username] =
                            group[username];
                    });
            });

            return result;
        }).catch(function (error) {
            console.warn(
                '[Lofarian Achievements] ' +
                'Не удалось прочитать progress-сегменты:',
                error
            );

            return {};
        });
    }


    function resolveLeaderboardUsersByNames(
        usernames
    ) {
        var unique = [];
        var seen = {};

        usernames.forEach(function (username) {
            username =
                normalizeProgressUsername(
                    username
                );

            if (
                username &&
                !seen[username]
            ) {
                seen[username] = true;
                unique.push(username);
            }
        });

        if (!unique.length) {
            return Promise.resolve({});
        }

        var batches =
            chunkArray(
                unique,
                50
            );

        var result = {};

        return Promise.all(
            batches.map(function (batch) {
                return api.get({
                    action:
                        'query',

                    list:
                        'users',

                    ususers:
                        batch.join('|'),

                    usprop:
                        'registration|editcount',

                    formatversion:
                        2
                }).then(function (data) {
                    (data.query.users || [])
                        .forEach(function (user) {
                            if (
                                !user ||
                                !user.userid ||
                                user.missing ||
                                user.invalid
                            ) {
                                return;
                            }

                            result[user.name] = {
                                userid:
                                    Number(user.userid),

                                name:
                                    user.name,

                                registration:
                                    user.registration || null,

                                registrationUnix:
                                    registrationToUnix(
                                        user.registration
                                    ),

                                editcount:
                                    Math.max(
                                        0,
                                        Math.floor(
                                            Number(
                                                user.editcount
                                            ) || 0
                                        )
                                    )
                            };
                        });
                });
            })
        ).then(function () {
            return result;
        });
    }


    function readEditorHallCandidates() {
        var users = [];

        function next(aufrom) {
            var params = {
                action: 'query',
                list: 'allusers',
                aulimit: 'max',
                auprop: 'editcount|registration',
                auwitheditsonly: 1,
                formatversion: 2
            };

            if (aufrom) {
                params.aufrom = aufrom;
            }

            return api.get(params).then(function (data) {
                var rows =
                    (data.query && data.query.allusers) || [];

                for (var i = 0; i < rows.length; i++) {
                    var item = rows[i];

                    if (
                        !item ||
                        !item.userid ||
                        Number(item.editcount || 0) <= 0
                    ) {
                        continue;
                    }

                    users.push({
                        userid: Number(item.userid),
                        name: item.name,
                        registration: item.registration || null,
                        registrationUnix:
                            registrationToUnix(item.registration)
                    });

                    if (
                        users.length >= EDITOR_HALL_USER_LIMIT
                    ) {
                        return users;
                    }
                }

                var continuation =
                    data.continue &&
                    data.continue.aufrom;

                return continuation
                    ? next(continuation)
                    : users;
            });
        }

        return next(null).catch(function (error) {
            console.warn(
                '[Lofarian Achievements] Не удалось получить список редакторов для Зала славы:',
                error
            );
            return [];
        });
    }


    function mapWithConcurrency(items, concurrency, worker) {
        items = Array.isArray(items) ? items : [];
        concurrency = Math.max(1, Math.floor(Number(concurrency) || 1));

        var results = new Array(items.length);
        var cursor = 0;

        function runner() {
            function step() {
                var index = cursor++;

                if (index >= items.length) {
                    return Promise.resolve();
                }

                return Promise.resolve(
                    worker(items[index], index)
                ).then(function (value) {
                    results[index] = value;
                    return step();
                });
            }

            return step();
        }

        var runners = [];

        for (
            var i = 0;
            i < Math.min(concurrency, items.length);
            i++
        ) {
            runners.push(runner());
        }

        return Promise.all(runners).then(function () {
            return results;
        });
    }


    function rankLeaderboardRows(rows) {
        rows.sort(function (a, b) {
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            if (b.count !== a.count) {
                return b.count - a.count;
            }
            return String(a.name).localeCompare(String(b.name), 'ru');
        });
        var previousScore = null;
        var previousRank = 0;
        rows.forEach(function (row, index) {
            if (previousScore !== null && row.score === previousScore) {
                row.rank = previousRank;
            } else {
                row.rank = index + 1;
                previousRank = row.rank;
                previousScore = row.score;
            }
        });
        return rows;
    }


    function addHallRankAchievementsToRows(
        catalog,
        rows
    ) {
        rows =
            Array.isArray(rows)
                ? rows
                : [];

        rows.forEach(function (row) {
            if (
                !row ||
                !row.rank ||
                !isPlainObject(
                    row.achievementMap
                )
            ) {
                return;
            }

            /*
             * Эти три достижения являются ОДНИМ текущим статусом.
             *
             * Пользователь #7 показывает только
             * «В десятке летописцев», а не одновременно
             * «В десятке», «В сотне» и «В полутысяче».
             *
             * При падении места статус автоматически меняется
             * на соответствующую более широкую группу.
             */
            delete row.achievementMap[
                HALL_TOP_500_ID
            ];

            delete row.achievementMap[
                HALL_TOP_100_ID
            ];

            delete row.achievementMap[
                HALL_TOP_10_ID
            ];

            var achievementId =
                null;

            var storedAwardAt =
                0;

            if (
                row.rank <= 10 &&
                getAchievement(
                    catalog,
                    HALL_TOP_10_ID
                )
            ) {
                achievementId =
                    HALL_TOP_10_ID;

                storedAwardAt =
                    Number(
                        row.hallTop10AwardAt
                    ) || 0;
            } else if (
                row.rank <= 100 &&
                getAchievement(
                    catalog,
                    HALL_TOP_100_ID
                )
            ) {
                achievementId =
                    HALL_TOP_100_ID;

                storedAwardAt =
                    Number(
                        row.hallTop100AwardAt
                    ) || 0;
            } else if (
                row.rank <= 500 &&
                getAchievement(
                    catalog,
                    HALL_TOP_500_ID
                )
            ) {
                achievementId =
                    HALL_TOP_500_ID;

                storedAwardAt =
                    Number(
                        row.hallTop500AwardAt
                    ) || 0;
            }

            if (achievementId) {
                row.achievementMap[
                    achievementId
                ] =
                    storedAwardAt >=
                        946684800
                        ? storedAwardAt
                        : nowUnix();
            }

            /*
             * Статусные достижения рейтинга имеют 0 очков,
             * поэтому не могут сами изменить порядок рейтинга.
             */
            row.count =
                calculateScore(
                    catalog,
                    row.achievementMap
                ).count;
        });

        return rows;
    }


    function buildLeaderboard(catalog) {
        /*
         * Быстрый Зал славы:
         * вместо обхода allusers берём только реальных
         * участников самой системы достижений.
         */
        return Promise.all([
            readAllSegmentsForLeaderboard(),
            readAllPublicReadingProgress()
        ]).then(function (results) {
            var achievementSegments =
                results[0];

            var progressByName =
                results[1];

            var protectedByUserId = {};
            var protectedUserIds = [];

            achievementSegments.forEach(
                function (segment) {
                    Object.keys(
                        segment.users || {}
                    ).forEach(function (userId) {
                        var map =
                            segment.users[
                                userId
                            ];

                        if (
                            !isPlainObject(map) ||
                            Object.keys(map).length ===
                                0
                        ) {
                            return;
                        }

                        protectedByUserId[
                            String(userId)
                        ] =
                            map;

                        protectedUserIds.push(
                            String(userId)
                        );
                    });
                }
            );

            /*
             * Любой вошедший пользователь получает progress-запись
             * при запуске системы, даже если ещё ничего не прочитал.
             * Поэтому все progress-имена — реальные участники системы.
             */
            var progressNames =
                Object.keys(
                    progressByName
                );

            return Promise.all([
                resolveLeaderboardUsersByIds(
                    protectedUserIds
                ),
                resolveLeaderboardUsersByNames(
                    progressNames
                )
            ]).then(function (resolved) {
                var byId =
                    resolved[0];

                var byName =
                    resolved[1];

                var candidates = {};

                function addCandidate(
                    user,
                    protectedMap,
                    progress
                ) {
                    if (
                        !user ||
                        !user.userid ||
                        !user.name
                    ) {
                        return;
                    }

                    var key =
                        String(
                            user.userid
                        );

                    if (!candidates[key]) {
                        candidates[key] = {
                            user:
                                user,

                            protectedMap:
                                protectedMap ||
                                {},

                            progress:
                                progress ||
                                createEmptyPublicProgress(
                                    user.name
                                )
                        };

                        return;
                    }

                    if (
                        protectedMap &&
                        Object.keys(
                            protectedMap
                        ).length
                    ) {
                        candidates[
                            key
                        ].protectedMap =
                            protectedMap;
                    }

                    if (progress) {
                        candidates[
                            key
                        ].progress =
                            progress;
                    }

                    if (
                        Number(
                            user.editcount
                        ) >
                        Number(
                            candidates[
                                key
                            ].user.editcount ||
                            0
                        )
                    ) {
                        candidates[
                            key
                        ].user.editcount =
                            Number(
                                user.editcount
                            );
                    }
                }

                Object.keys(
                    byId
                ).forEach(function (userId) {
                    var user =
                        byId[
                            userId
                        ];

                    addCandidate(
                        user,
                        protectedByUserId[
                            userId
                        ] || {},
                        progressByName[
                            user.name
                        ] ||
                        createEmptyPublicProgress(
                            user.name
                        )
                    );
                });

                Object.keys(
                    byName
                ).forEach(function (username) {
                    var user =
                        byName[
                            username
                        ];

                    addCandidate(
                        user,
                        protectedByUserId[
                            String(
                                user.userid
                            )
                        ] || {},
                        progressByName[
                            user.name
                        ] ||
                        createEmptyPublicProgress(
                            user.name
                        )
                    );
                });

                var items =
                    Object.keys(
                        candidates
                    ).map(function (userId) {
                        return candidates[
                            userId
                        ];
                    });

                /*
                 * При экстремальном размере вики ограничиваем
                 * один расчёт 1000 системными участниками.
                 */
                if (
                    items.length >
                    LEADERBOARD_LIMIT
                ) {
                    items.sort(
                        function (a, b) {
                            function priority(item) {
                                var protectedCount =
                                    Object.keys(
                                        item.protectedMap ||
                                        {}
                                    ).length;

                                var progress =
                                    item.progress ||
                                    {};

                                return (
                                    protectedCount *
                                        1000000000 +
                                    Number(
                                        progress.articleCount ||
                                        0
                                    ) *
                                        100000 +
                                    Number(
                                        progress.activeSeconds ||
                                        0
                                    ) +
                                    Number(
                                        item.user.editcount ||
                                        0
                                    ) *
                                        100
                                );
                            }

                            return (
                                priority(b) -
                                priority(a)
                            );
                        }
                    );

                    items =
                        items.slice(
                            0,
                            LEADERBOARD_LIMIT
                        );
                }

                return mapWithConcurrency(
                    items,
                    EDITOR_HALL_CONCURRENCY,
                    function (item) {
                        /*
                         * Если у пользователя editcount=0,
                         * usercontribs вообще не вызывается.
                         */
                        var editorPromise =
                            Number(
                                item.user.editcount ||
                                0
                            ) > 0
                                ? getEditorStatsForUser(
                                    item.user,
                                    false,
                                    getParticipationStartedAt(
                                        item.protectedMap,
                                        item.progress,
                                        0
                                    ),
                                    -1
                                )
                                : Promise.resolve(
                                    createEmptyEditorStats(
                                        item.user.name
                                    )
                                );

                        return editorPromise.then(
                            function (editorStats) {
                                var achievementMap =
                                    buildEffectiveAchievementMap(
                                        catalog,
                                        item.user,
                                        item.protectedMap,
                                        item.progress,
                                        editorStats.achievementMap,
                                        editorStats
                                    );

                                var scoreInfo =
                                    calculateScore(
                                        catalog,
                                        achievementMap
                                    );

                                if (
                                    scoreInfo.count <=
                                        0 ||
                                    scoreInfo.score <=
                                        0
                                ) {
                                    return null;
                                }

                                return {
                                    userId:
                                        item.user.userid,

                                    name:
                                        item.user.name,

                                    score:
                                        scoreInfo.score,

                                    count:
                                        scoreInfo.count,

                                    editcount:
                                        Number(
                                            item.user.editcount ||
                                            0
                                        ),

                                    hallTop500AwardAt:
                                        Number(
                                            item.progress.hallTop500AwardAt ||
                                            0
                                        ),

                                    hallTop100AwardAt:
                                        Number(
                                            item.progress.hallTop100AwardAt ||
                                            0
                                        ),

                                    hallTop10AwardAt:
                                        Number(
                                            item.progress.hallTop10AwardAt ||
                                            0
                                        ),

                                    achievementMap:
                                        cloneData(
                                            achievementMap
                                        ),

                                    discussionStats:
                                        cloneData(
                                            editorStats.discussionStats ||
                                            createEmptyDiscussionStats()
                                        ),

                                    directProgressFacts: {
                                        editCount: Number(editorStats.editCount || 0),
                                        createdArticles: Number(editorStats.createdArticles || 0),
                                        maxNightEditsInOneDay: Number(editorStats.maxNightEditsInOneDay || 0),
                                        maxPositiveBytesInOneEdit: Number(editorStats.maxPositiveBytesInOneEdit || 0),
                                        roadCategories: Number(editorStats.roadCategories || 0),
                                        completedDrafts: Number(editorStats.completedDrafts || 0)
                                    }
                                };
                            }
                        );
                    }
                ).then(function (rows) {
                    rows =
                        rows.filter(
                            function (row) {
                                return !!row;
                            }
                        );

                    rows =
                        rankLeaderboardRows(
                            rows
                        ).slice(
                            0,
                            LEADERBOARD_LIMIT
                        );

                    return addHallRankAchievementsToRows(
                        catalog,
                        rows
                    );
                });
            });
        });
    }


    function loadPersistentLeaderboardRows() {
        try {
            var raw =
                localStorage.getItem(
                    LEADERBOARD_STORAGE_KEY
                );

            if (!raw) {
                return null;
            }

            var parsed =
                JSON.parse(
                    raw
                );

            if (
                !parsed ||
                !Array.isArray(
                    parsed.rows
                ) ||
                !parsed.savedAt
            ) {
                return null;
            }

            if (
                Date.now() -
                    Number(
                        parsed.savedAt
                    ) >
                    LEADERBOARD_STORAGE_MAX_AGE_MS
            ) {
                localStorage.removeItem(
                    LEADERBOARD_STORAGE_KEY
                );

                return null;
            }

            return {
                savedAt:
                    Number(
                        parsed.savedAt
                    ),

                rows:
                    parsed.rows
            };
        } catch (error) {
            return null;
        }
    }


    function savePersistentLeaderboardRows(rows) {
        try {
            localStorage.setItem(
                LEADERBOARD_STORAGE_KEY,
                JSON.stringify({
                    savedAt:
                        Date.now(),

                    rows:
                        rows
                })
            );
        } catch (error) {
            /*
             * Если localStorage недоступен, система продолжает
             * работать через обычный кэш памяти.
             */
        }
    }


    function refreshLeaderboardRowsInBackground(catalog) {
        if (STATE.leaderboardBuildPromise) {
            return;
        }

        setTimeout(
            function () {
                getLeaderboardRowsCached(
                    catalog,
                    true
                ).catch(
                    function (error) {
                        console.warn(
                            '[Lofarian Achievements] Фоновое обновление Зала славы не удалось:',
                            error
                        );
                    }
                );
            },
            50
        );
    }


    function getLeaderboardRowsCached(
        catalog,
        forceReload
    ) {
        var fresh =
            STATE.leaderboardRowsCache &&
            Date.now() -
                STATE.leaderboardRowsCacheAt <
                LEADERBOARD_CACHE_MS;

        if (
            fresh &&
            !forceReload
        ) {
            return Promise.resolve(
                cloneData(
                    STATE.leaderboardRowsCache
                )
            );
        }

        if (!forceReload) {
            var persistent =
                loadPersistentLeaderboardRows();

            if (
                persistent &&
                persistent.rows.length
            ) {
                STATE.leaderboardRowsCache =
                    cloneData(
                        persistent.rows
                    );

                STATE.leaderboardRowsCacheAt =
                    persistent.savedAt;

                if (
                    Date.now() -
                        persistent.savedAt >=
                        LEADERBOARD_CACHE_MS
                ) {
                    refreshLeaderboardRowsInBackground(
                        catalog
                    );
                }

                return Promise.resolve(
                    cloneData(
                        persistent.rows
                    )
                );
            }
        }

        if (STATE.leaderboardBuildPromise) {
            return STATE.leaderboardBuildPromise;
        }

        STATE.leaderboardBuildPromise =
            buildLeaderboard(
                catalog
            ).then(
                function (rows) {
                    STATE.leaderboardRowsCache =
                        cloneData(
                            rows
                        );

                    STATE.leaderboardRowsCacheAt =
                        Date.now();

                    savePersistentLeaderboardRows(
                        rows
                    );

                    STATE.leaderboardBuildPromise =
                        null;

                    return cloneData(
                        rows
                    );
                },
                function (error) {
                    STATE.leaderboardBuildPromise =
                        null;

                    throw error;
                }
            );

        return STATE.leaderboardBuildPromise;
    }


    function parseTierAchievementIdentity(
        catalog,
        achievementId
    ) {
        var achievement =
            getAchievement(
                catalog,
                achievementId
            );

        if (
            !achievement ||
            !achievement.family ||
            !achievement.tier
        ) {
            return null;
        }

        return {
            family:
                String(
                    achievement.family
                ),

            tier:
                Math.max(
                    1,
                    Math.floor(
                        Number(
                            achievement.tier
                        ) || 1
                    )
                )
        };
    }


    function participantReachedAchievement(
        catalog,
        row,
        achievementId
    ) {
        row =
            row || {};

        var achievementMap =
            row.achievementMap;

        /*
         * В интерфейсе показывается только ОДИН лучший текущий
         * статус Зала славы. Но для процентов пороги остаются
         * логически накопительными:
         *
         * место #7 считается достигшим Top-10, Top-100 и Top-500.
         */
        if (
            achievementId ===
                HALL_TOP_500_ID
        ) {
            return (
                Number(row.rank) > 0 &&
                Number(row.rank) <= 500
            );
        }

        if (
            achievementId ===
                HALL_TOP_100_ID
        ) {
            return (
                Number(row.rank) > 0 &&
                Number(row.rank) <= 100
            );
        }

        if (
            achievementId ===
                HALL_TOP_10_ID
        ) {
            return (
                Number(row.rank) > 0 &&
                Number(row.rank) <= 10
            );
        }

        if (
            !isPlainObject(
                achievementMap
            )
        ) {
            return false;
        }

        /*
         * Одиночное достижение:
         * нужна точная запись ID.
         */
        if (
            achievementMap[
                achievementId
            ]
        ) {
            return true;
        }

        /*
         * Для уровневой цепочки человек, имеющий более высокий
         * уровень, считается также достигшим всех нижних.
         */
        var target =
            parseTierAchievementIdentity(
                catalog,
                achievementId
            );

        if (!target) {
            return false;
        }

        var ids =
            Object.keys(
                achievementMap
            );

        for (
            var i = 0;
            i < ids.length;
            i++
        ) {
            var owned =
                parseTierAchievementIdentity(
                    catalog,
                    ids[i]
                );

            if (
                owned &&
                owned.family ===
                    target.family &&
                owned.tier >=
                    target.tier
            ) {
                return true;
            }
        }

        return false;
    }


    function formatPlayersCount(
        count
    ) {
        count =
            Math.max(
                0,
                Math.floor(
                    Number(count) || 0
                )
            );

        var mod100 =
            count % 100;

        var mod10 =
            count % 10;

        var word =
            (
                mod100 >= 11 &&
                mod100 <= 14
            )
                ? 'игроков'
                : (
                    mod10 === 1
                        ? 'игрок'
                        : (
                            mod10 >= 2 &&
                            mod10 <= 4
                                ? 'игрока'
                                : 'игроков'
                        )
                );

        return (
            String(count) +
            ' ' +
            word
        );
    }


    function formatAchievementPrevalence(
        count,
        total
    ) {
        count =
            Math.max(
                0,
                Math.floor(
                    Number(count) || 0
                )
            );

        total =
            Math.max(
                0,
                Math.floor(
                    Number(total) || 0
                )
            );

        if (total <= 0) {
            return '—';
        }

        var percent =
            count /
            total *
            100;

        if (
            count > 0 &&
            percent < .1
        ) {
            return '<0,1%';
        }

        if (
            Math.abs(
                percent -
                Math.round(percent)
            ) <
            .05
        ) {
            return (
                String(
                    Math.round(
                        percent
                    )
                ) +
                '%'
            );
        }

        return (
            percent
                .toFixed(1)
                .replace('.', ',') +
            '%'
        );
    }


    function getAchievementPrevalenceMap(
        catalog,
        achievementIds
    ) {
        achievementIds =
            Array.isArray(
                achievementIds
            )
                ? achievementIds
                : [];

        var uniqueIds = [];
        var seen = {};

        achievementIds.forEach(
            function (id) {
                id =
                    String(
                        id || ''
                    );

                if (
                    id &&
                    !seen[id]
                ) {
                    seen[id] =
                        true;

                    uniqueIds.push(
                        id
                    );
                }
            }
        );

        if (!uniqueIds.length) {
            return Promise.resolve(
                {}
            );
        }

        return getLeaderboardRowsCached(
            catalog,
            false
        ).then(function (rows) {
            var total =
                rows.length;

            var result = {};

            uniqueIds.forEach(
                function (achievementId) {
                    var count = 0;

                    rows.forEach(
                        function (row) {
                            if (
                                participantReachedAchievement(
                                    catalog,
                                    row,
                                    achievementId
                                )
                            ) {
                                count++;
                            }
                        }
                    );

                    result[
                        achievementId
                    ] = {
                        count:
                            count,

                        total:
                            total,

                        percent:
                            total > 0
                                ? (
                                    count /
                                    total *
                                    100
                                )
                                : 0,

                        formatted:
                            formatAchievementPrevalence(
                                count,
                                total
                            )
                    };
                }
            );

            return result;
        });
    }


    I.registerFunctions('Services/Leaderboard', {
        getAllSegmentTitles: getAllSegmentTitles,
        readLeaderboardSegmentBatch: readLeaderboardSegmentBatch,
        readAllSegmentsForLeaderboard: readAllSegmentsForLeaderboard,
        resolveUserNamesByIds: resolveUserNamesByIds,
        resolveLeaderboardUsersByIds: resolveLeaderboardUsersByIds,
        getAllProgressSegmentTitles: getAllProgressSegmentTitles,
        readProgressSegmentBatch: readProgressSegmentBatch,
        readAllPublicReadingProgress: readAllPublicReadingProgress,
        resolveLeaderboardUsersByNames: resolveLeaderboardUsersByNames,
        readEditorHallCandidates: readEditorHallCandidates,
        mapWithConcurrency: mapWithConcurrency,
        rankLeaderboardRows: rankLeaderboardRows,
        addHallRankAchievementsToRows: addHallRankAchievementsToRows,
        buildLeaderboard: buildLeaderboard,
        loadPersistentLeaderboardRows: loadPersistentLeaderboardRows,
        savePersistentLeaderboardRows: savePersistentLeaderboardRows,
        refreshLeaderboardRowsInBackground: refreshLeaderboardRowsInBackground,
        getLeaderboardRowsCached: getLeaderboardRowsCached,
        parseTierAchievementIdentity: parseTierAchievementIdentity,
        participantReachedAchievement: participantReachedAchievement,
        formatPlayersCount: formatPlayersCount,
        formatAchievementPrevalence: formatAchievementPrevalence,
        getAchievementPrevalenceMap: getAchievementPrevalenceMap
    }, ["buildEffectiveAchievementMap", "calculateScore", "cloneData", "createEmptyDiscussionStats", "createEmptyEditorStats", "createEmptyPublicProgress", "extractJsonFromPage", "getAchievement", "getEditorStatsForUser", "getParticipationStartedAt", "isPlainObject", "normalizeProgressUsername", "nowUnix", "parseProgressSegmentText", "registrationToUnix", "sanitizePublicProgress", "validateSegment"]);
})(window);