/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC10 PARTICIPATION CUTOFF REVIEW READY
Страница Fandom: MediaWiki:LofarianAchievements/Metrics/Activity.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Общие показатели локальной активности пользователя для достижений.

ДАННЫЕ / I/O
Работает с уже полученными данными runtime; самостоятельных внешних запросов нет.

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
    if (!I) { throw new Error('[Lofarian Achievements] Runtime отсутствует: Metrics/Activity'); }
    var snapshots = Object.create(null);

    function key(username) { return String(username || '').trim().toLowerCase(); }
    function merge(username, values) {
        var k = key(username);
        if (!k) { return {}; }
        var target = snapshots[k] = snapshots[k] || {};
        Object.keys(values || {}).forEach(function (name) { target[name] = values[name]; });
        return target;
    }
    function fromEditorStats(stats) {
        stats = stats || {};
        var d = stats.discussionStats || {};
        return {
            edits: Number(stats.editCount || 0), articleEdits: Number(stats.editCount || 0),
            pagesCreated: Number(stats.createdArticles || 0), uniqueArticles: Number(stats.uniqueArticles || 0),
            activeDays: Number(stats.distinctEditDays || 0), longestStreak: Number(stats.maxConsecutiveEditDays || 0),
            maxEditsInOneDay: Number(stats.maxEditsInOneDay || 0), bytesAdded: Number(stats.positiveBytes || 0),
            bytesRemoved: Number(stats.negativeBytesAbs || stats.removedBytes || 0), majorEdits: Number(stats.majorEdits || 0),
            uploads: Number(stats.uploadedFiles || 0), categoriesCreated: Number(stats.createdCategories || 0),
            templatesCreated: Number(stats.createdTemplates || 0), correctiveEdits: Number(stats.correctiveEdits || 0),
            awakenedArticles: Number(stats.awakenedArticles || 0), maxDormantGapSeconds: Number(stats.maxDormantGapSeconds || 0),
            roadCategories: Number(stats.roadCategories || 0), completedDrafts: Number(stats.completedDrafts || 0),
            uniqueTechnicalPages: Number(stats.uniqueTechnicalPages || 0),
            maxCreatedArticlesInOneDay: Number(stats.maxCreatedArticlesInOneDay || 0),
            maxDormantGapDays: Math.floor(Number(stats.maxDormantGapSeconds || 0) / 86400),
            maxReturnGapSeconds: Number(stats.maxReturnGapSeconds || 0),
            discussionActions: Number(d.total || 0), discussionTopics: Number(d.threads || 0),
            discussionReplies: Number(d.replies || 0), discussionThreads: Number(d.uniqueThreads || 0),
            discussionMaxLikes: Number(d.maxLikesOnPost || 0), discussionLikedMessages: Number(d.likedPosts || 0),
            discussionLikesReceived: Number(d.likesReceived || 0), discussionMaxDay: Number(d.maxActionsInDay || 0),
            discussionDawnActions: Number(d.dawnActions || 0), discussionOldThreadReplies: Number(d.oldThreadReplies || 0)
        };
    }
    function fromReadingProgress(progress) {
        progress = progress || {};
        return {
            articleReads: Number(progress.articleCount || 0), readingSeconds: Number(progress.activeSeconds || 0),
            firstSeenAt: Number(progress.firstSeenAt || 0), lastArticleAt: Number(progress.lastArticleAt || 0),
            likesGiven: Number(progress.likesGivenCount || 0),
            eraZarozhdeniyaReads: Number(progress.themeArticleCounts && progress.themeArticleCounts.era_zarozhdeniya || 0),
            eraZarozhdeniyaSeconds: Number(progress.themeActiveSeconds && progress.themeActiveSeconds.era_zarozhdeniya || 0),
            eraDrakonaReads: Number(progress.themeArticleCounts && progress.themeArticleCounts.era_drakona || 0),
            eraDrakonaSeconds: Number(progress.themeActiveSeconds && progress.themeActiveSeconds.era_drakona || 0),
            kevariytsyReads: Number(progress.themeArticleCounts && progress.themeArticleCounts.kevariytsy || 0),
            kevariytsySeconds: Number(progress.themeActiveSeconds && progress.themeActiveSeconds.kevariytsy || 0)
        };
    }
    I.metricsRegistry = {
        merge: merge,
        publishEditorStats: function (username, stats) { return merge(username, fromEditorStats(stats)); },
        publishReadingProgress: function (username, progress) { return merge(username, fromReadingProgress(progress)); },
        snapshot: function (username) {
            var src = snapshots[key(username)] || {}, result = {};
            Object.keys(src).forEach(function (name) { result[name] = src[name]; });
            return result;
        },
        clear: function (username) { delete snapshots[key(username)]; }
    };
    I.registerModule('Metrics/Activity', { registry: true, sharedMetricCache: true });
})(window);