/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC10 PARTICIPATION CUTOFF REVIEW READY
Страница Fandom: MediaWiki:LofarianAchievements/Metrics/Discussions.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Преобразует ответы Fandom Discussions в общие метрики: действия, ответы, темы, лайки и другие счётчики.

ДАННЫЕ / I/O
Не обращается к сторонним доменам; сырой ответ получает через Services/FandomDiscussions.

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
    if (!I) { throw new Error('[Lofarian Achievements] Runtime отсутствует: Metrics/Discussions'); }
    var C = I.config || {};
    var STATE = I.state || {};
    var api = I.api;
    var COMM_VOICE_PREFIX = C.COMM_VOICE_PREFIX;
    var COMM_VOICE_THRESHOLDS = C.COMM_VOICE_THRESHOLDS;
    var DISCUSSION_ACHIEVEMENT_RULES = C.DISCUSSION_ACHIEVEMENT_RULES;
    var DISCUSSION_RECENT_LIMIT = C.DISCUSSION_RECENT_LIMIT;
    var DISCUSSION_STATS_CACHE_MS = C.DISCUSSION_STATS_CACHE_MS;
    function cloneData() { return I.invoke('cloneData', arguments); }
    function discussionApiUrl() { return I.invoke('discussionApiUrl', arguments); }
    function discussionPostLikeCount() { return I.invoke('discussionPostLikeCount', arguments); }
    function discussionPostUnix() { return I.invoke('discussionPostUnix', arguments); }
    function discussionThreadUnix() { return I.invoke('discussionThreadUnix', arguments); }
    function extractDiscussionPosts() { return I.invoke('extractDiscussionPosts', arguments); }
    function fetchDiscussionPostsRaw() { return I.invoke('fetchDiscussionPostsRaw', arguments); }
    function getDiscussionRuleCurrentValue() { return I.invoke('getDiscussionRuleCurrentValue', arguments); }
    function getTierLevel() { return I.invoke('getTierLevel', arguments); }
    function tierAchievementId() { return I.invoke('tierAchievementId', arguments); }

    function createEmptyDiscussionStats() {
        return {
            total: 0,
            threads: 0,
            replies: 0,
            uniqueThreads: 0,
            maxActionsInDay: 0,
            likesReceived: 0,
            likedPosts: 0,
            maxLikesOnPost: 0,
            dawnActions: 0,
            oldThreadReplies: 0,
            voiceLevel: 0,
            firstAt: 0,
            latestAt: 0,
            achievementMap: {}
        };
    }


    function analyzeDiscussionResponse(data, startedAt, baselineTotal) {
        var stats = createEmptyDiscussionStats();
        startedAt = Math.floor(Number(startedAt) || 0);
        baselineTotal = Math.floor(Number(baselineTotal));
        var allPosts = extractDiscussionPosts(data);
        var posts = allPosts.filter(function (post) {
            if (startedAt < 946684800) {
                return true;
            }
            var unix = discussionPostUnix(post || {});
            return unix >= startedAt;
        });
        var uniqueThreads = {};
        var actionsByDay = {};

        var embeddedCount =
            data && data._embedded && data._embedded.count;

        var currentTotal = Math.max(
            0,
            Math.floor(Number(
                data && data.postCount ||
                embeddedCount && embeddedCount.FORUM ||
                allPosts.length ||
                0
            ) || 0)
        );

        if (startedAt >= 946684800) {
            /*
             * Для нового участника общий postCount очищается от истории
             * до opt-in с помощью baseline, сохранённого при вступлении.
             * Если baseline недоступен, используем безопасный нижний предел
             * по подтверждённым постам после startedAt — старые действия
             * никогда не засчитываются.
             */
            stats.total = baselineTotal >= 0
                ? Math.max(0, currentTotal - baselineTotal)
                : posts.length;
        } else {
            stats.total = currentTotal;
        }

        posts.forEach(function (post) {
            post = post || {};

            var unix = discussionPostUnix(post);
            if (unix > 0) {
                stats.firstAt = stats.firstAt > 0
                    ? Math.min(stats.firstAt, unix)
                    : unix;
                stats.latestAt = Math.max(stats.latestAt, unix);

                var day = new Date(unix * 1000)
                    .toISOString()
                    .slice(0, 10);
                actionsByDay[day] =
                    Number(actionsByDay[day] || 0) + 1;
            }

            var thread =
                post._embedded &&
                Array.isArray(post._embedded.thread)
                    ? post._embedded.thread[0]
                    : null;

            var firstPost = thread && thread.firstPost;
            var postId = String(post.id || post.postId || '');
            var threadId = String(
                post.threadId ||
                thread && (thread.threadId || thread.id) ||
                ''
            );

            if (threadId) {
                uniqueThreads[threadId] = true;
            }

            var firstPostId = String(
                firstPost && (firstPost.id || firstPost.postId) || ''
            );

            var isThread = !!(
                postId &&
                (
                    firstPostId && postId === firstPostId ||
                    threadId && postId === threadId
                )
            );

            var likeCount = discussionPostLikeCount(post);
            stats.likesReceived += likeCount;
            if (likeCount > 0) {
                stats.likedPosts++;
                stats.maxLikesOnPost = Math.max(
                    stats.maxLikesOnPost,
                    likeCount
                );
            }

            if (unix > 0) {
                var actionDate = new Date(unix * 1000);
                if (
                    actionDate.getUTCHours() === 4 &&
                    actionDate.getUTCMinutes() >= 44 &&
                    actionDate.getUTCMinutes() <= 59
                ) {
                    stats.dawnActions++;
                }
            }

            if (!isThread && unix > 0 && thread) {
                var threadUnix = discussionThreadUnix(thread);
                if (
                    threadUnix > 0 &&
                    unix - threadUnix >= 180 * 86400
                ) {
                    stats.oldThreadReplies++;
                }
            }

            if (isThread) {
                stats.threads++;
            } else {
                stats.replies++;
            }
        });

        stats.uniqueThreads = Object.keys(uniqueThreads).length;
        stats.maxActionsInDay = Object.keys(actionsByDay).reduce(
            function (maxValue, day) {
                return Math.max(
                    maxValue,
                    Number(actionsByDay[day] || 0)
                );
            },
            0
        );

        /*
         * Если endpoint сообщает общий postCount больше текущего окна,
         * общий счётчик остаётся точным. Потоковые признаки
         * (ветки/ответы/разные беседы/день) являются безопасным нижним
         * пределом по последним доступным 100 действиям и никогда не
         * выдают достижение без подтверждённых записей.
         */
        var stableAt = stats.latestAt || stats.firstAt || 1;

        stats.voiceLevel = getTierLevel(
            COMM_VOICE_THRESHOLDS,
            stats.total
        );

        if (stats.voiceLevel > 0) {
            stats.achievementMap[
                tierAchievementId(
                    COMM_VOICE_PREFIX,
                    stats.voiceLevel
                )
            ] = stableAt;
        }

        DISCUSSION_ACHIEVEMENT_RULES.forEach(function (rule) {
            if (
                getDiscussionRuleCurrentValue(rule, stats) >=
                Number(rule.threshold || 0)
            ) {
                stats.achievementMap[rule.id] = stableAt;
            }
        });

        return stats;
    }


    function fetchDiscussionStatsForUser(user, forceReload, startedAt, baselineTotal) {
        if (!user || !user.userid) {
            return Promise.resolve(createEmptyDiscussionStats());
        }

        startedAt = Math.floor(Number(startedAt) || 0);
        baselineTotal = Math.floor(Number(baselineTotal));
        var key = String(user.userid) + ':' + String(startedAt) + ':' + String(Number.isFinite(baselineTotal) ? baselineTotal : -1);
        var cached = STATE.discussionStatsCache[key];

        if (
            cached && !forceReload &&
            Date.now() - cached.fetchedAt < DISCUSSION_STATS_CACHE_MS
        ) {
            return Promise.resolve(cloneData(cached.data));
        }

        return fetchDiscussionPostsRaw(
            Number(user.userid),
            DISCUSSION_RECENT_LIMIT
        ).then(function (data) {
            var stats = analyzeDiscussionResponse(data || {}, startedAt, baselineTotal);

            STATE.discussionStatsCache[key] = {
                fetchedAt: Date.now(),
                data: cloneData(stats)
            };

            return stats;
        }).catch(function (error) {
            console.warn(
                '[Lofarian Achievements] Fandom Discussions недоступен для ' +
                String(user.name || user.userid) + ':',
                error
            );

            return createEmptyDiscussionStats();
        });
    }


    I.registerFunctions('Metrics/Discussions', {
        createEmptyDiscussionStats: createEmptyDiscussionStats,
        analyzeDiscussionResponse: analyzeDiscussionResponse,
        fetchDiscussionStatsForUser: fetchDiscussionStatsForUser
    }, ["cloneData", "discussionPostLikeCount", "discussionPostUnix", "discussionThreadUnix", "extractDiscussionPosts", "getDiscussionRuleCurrentValue", "getTierLevel", "tierAchievementId", "fetchDiscussionPostsRaw"]);
})(window);