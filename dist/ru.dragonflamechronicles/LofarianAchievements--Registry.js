/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC11 ACHIEVEMENTS HUB REVIEW READY
Страница Fandom: MediaWiki:LofarianAchievements/Registry.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Декларирует список локальных runtime-модулей, порядок dependency-layer и условные Profile/Hall/Admin feature-пакеты.

ДАННЫЕ / I/O
Не читает пользовательские данные и не выполняет MediaWiki API-запросы.

ПРОЗРАЧНОСТЬ И БЕЗОПАСНОСТЬ
- Это открытый, человекочитаемый локальный JavaScript этой вики.
- eval, new Function, обфускация и скрытый/удалённый исполняемый код не используются.
- Исполняемые зависимости находятся только на локальных MediaWiki:*.js страницах.
- Сторонние трекеры и передача пользовательских данных внешним сервисам отсутствуют.
- Код не получает пароль, email или содержимое авторизационных cookie пользователя.
- Официальные награды не доверяются localStorage; localStorage используется только как технический клиентский кэш/очередь.
- Реклама Fandom не скрывается и не модифицируется.

ИНТЕРФЕЙС И ПРАВА
Только декларация списка файлов и feature-пакетов. UI/Roles.js подключается только на профиле и добавляет отдельные локальные декоративные теги; системные Administrator/Bureaucrat и другие плашки Fandom не переименовываются и не изменяются.

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

ПРИМЕЧАНИЕ ДЛЯ REVIEW
Этот файл является одним модулем одной системы Lofarian Achievements. RC11 специально
разделён на небольшие MediaWiki:*.js страницы для прозрачности сопровождения, но
загружается штатным Fandom importArticles()/ResourceLoader с пакетированием.
===============================================================================
*/
(function (root) {
    'use strict';

    var base = 'MediaWiki:LofarianAchievements/';

    root.LofarianAchievementsModuleRegistry = {
        /*
         * Каждый слой загружается после предыдущего, а файлы внутри слоя —
         * параллельно. Cache идёт отдельно, потому что остальные модули
         * захватывают ссылку I.state при инициализации.
         */
        coreLayers: [
            [
                base + 'Services/Cache.js'
            ],
            [
                base + 'Engine/Utils.js',
                base + 'Engine/Rules.js',
                base + 'Achievements/Base.js',
                base + 'Metrics/Activity.js'
            ],
            [
                base + 'Engine/Families.js',
                base + 'Services/MediaWiki.js',
                base + 'Achievements/Discussions.js'
            ],
            [
                base + 'Services/Catalog.js',
                base + 'Services/Storage.js',
                base + 'Services/FandomDiscussions.js',
                base + 'Services/News.js',
                base + 'Metrics/Uploads.js',
                base + 'Achievements/Activity.js'
            ],
            [
                base + 'Metrics/Discussions.js',
                base + 'Metrics/Reading.js'
            ],
            [
                base + 'Metrics/Editing.js'
            ],
            [
                base + 'Achievements/Hidden.js'
            ],
            [
                base + 'Achievements/Special.js'
            ],
            [
                base + 'Engine/Events.js'
            ],
            [
                base + 'UI/Lore.js'
            ],
            [
                base + 'UI/Cards.js',
                base + 'UI/Catalog.js',
                base + 'UI/Prevalence.js'
            ],
            [
                base + 'UI/Notifications.js'
            ]
        ],

        features: {
            leaderboard: [
                base + 'Services/Leaderboard.js'
            ],
            profile: [
                base + 'Services/Leaderboard.js',
                base + 'UI/Progress.js',
                base + 'UI/Profile.js',
                base + 'UI/Roles.js'
            ],
            hall: [
                base + 'Services/Leaderboard.js',
                base + 'UI/Progress.js',
                base + 'UI/Profile.js',
                base + 'UI/HallOfFame.js'
            ],
            achievementsPage: [
                base + 'UI/AchievementsPage.js'
            ],
            admin: [
                base + 'Services/Leaderboard.js',
                base + 'Admin.js'
            ]
        },

        /*
         * Декларативные RC2-зеркала Reading/Editing/Creation не являются
         * runtime-модулями RC3. Их актуальные данные живут в Project:...Data/*.
         */
        core: base + 'Engine/Core.js'
    };
})(window);