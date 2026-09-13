/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC10 PARTICIPATION CUTOFF REVIEW READY
Страница Fandom: MediaWiki:LofarianAchievements/Config.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Централизованные константы, ID, пути страниц, лимиты и совместимые runtime-настройки TEST 1.16.3.

ДАННЫЕ / I/O
Прямых API-запросов и записи данных нет.

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
/*
===============================================================================
 LOFARIAN ACHIEVEMENTS — CONFIG — TEST 1.16.3 MODULAR REFACTOR
===============================================================================
This file is a structural extraction of the constants/tables from the working
TEST 1.16.3 monolith. IDs, thresholds, rarity rules, page names and L7 storage
format are intentionally unchanged.
===============================================================================
*/
(function (root) {
    'use strict';
    var I = root.__LofarianAchievementsInternal;
    if (!I) { throw new Error('[Lofarian Achievements] Bootstrap runtime отсутствует.'); }
    var VERSION = 'TEST 1.16.3';
    var CATALOG_PAGE = 'Project:LofarianAchievementsData';
    var CATALOG_PART_PAGES = [
        'Project:LofarianAchievementsData/Reading',
        'Project:LofarianAchievementsData/Editing',
        'Project:LofarianAchievementsData/Creation',
        'Project:LofarianAchievementsData/Activity',
        'Project:LofarianAchievementsData/Discussions',
        'Project:LofarianAchievementsData/Special',
        'Project:LofarianAchievementsData/Hidden'
    ];
    var USERS_PAGE_PREFIX = 'Project:LofarianAchievementsUsers/';
    var SEGMENT_COUNT = 256;
    var DATA_CLASS = 'lof-achievements-database';
    var HALL_PAGE = 'Project:Зал славы';

    var PROFILE_RAIL_PAGE_SIZE = 16;
    var PROFILE_RAIL_MOBILE_BREAKPOINT = 1023;
    var PROFILE_RAIL_FALLBACK_COLLAPSE_KEY =
        'lof-achievements-profile-rail-collapsed-v1';
    var LEADERBOARD_LIMIT = 1000;
    var FIRST_LOGIN_ID = 'first_login';
    var CHRONIST_PREFIX = 'chronist_';
    var THOUGHTFUL_PREFIX = 'thoughtful_chronist_';
    var LETOPISETS_PREFIX = 'letopisets_';
    var ZODCHIY_PREFIX = 'zodchiy_';
    var MULTIGRAN_PREFIX = 'multigran_';
    var VERNY_LETOPISETS_PREFIX = 'verny_letopisets_';

    var FIRST_EDIT_ID = 'first_edit';
    var SOZIDATEL_ID = 'sozidatel';

    var NEUTOMIMOE_PERO_PREFIX = 'neutomimoe_pero_';
    var VOZVRASHCHENIE_PREFIX = 'vozvrashchenie_k_letopisi_';
    var CHERNILNY_POTOK_PREFIX = 'chernilny_potok_';
    var CHERNILNY_SLED_PREFIX = 'chernilny_sled_';
    var RUKA_LETOPISTSA_PREFIX = 'ruka_letopistsa_';
    var HUDOZHNIK_PREFIX = 'hudozhnik_';
    var STAROZHIL_PREFIX = 'starozhil_';
    var NESLOMLENNAYA_TSEP_PREFIX = 'neslomlennaya_tsep_';
    var PROBUZHDAYUSHCHIY_PREFIX = 'probuzhdayushchiy_stranitsy_';
    var ISPRAVITEL_PREFIX = 'ispravitel_';
    var TKACH_KATEGORIY_PREFIX = 'tkach_kategoriy_';
    var TKACH_SHABLONOV_PREFIX = 'tkach_shablonov_';
    var ARKHIVARIUS_PREFIX = 'arkhivarius_';
    var NEUTOMIMYY_ZODCHIY_PREFIX = 'neutomimyy_zodchiy_';
    var HRANITEL_DREVNOSTEY_PREFIX = 'hranitel_drevnostey_';

    var NIGHT_HERO_ID = 'night_hero';
    var TYSYACHA_STROK_ID = 'tysyacha_strok';
    var HALL_TOP_500_ID = 'hall_top_500';
    var HALL_TOP_100_ID = 'hall_top_100';
    var HALL_TOP_10_ID = 'hall_top_10';
    var STO_DOROG_ID = 'sto_dorog';
    var ZAVERSHITEL_ID = 'zavershitel';

    /*
     * TEST 1.12.9: шестиступенчатая серия за количество
     * уже полученных логических достижений. Они не учитывают сами
     * себя при проверке порога, чтобы не возникало каскадной выдачи.
     */
    var ACHIEVEMENT_COUNT_MILESTONES = [
        { id: 'achievement_collector_5', threshold: 5 },
        { id: 'achievement_collector_10', threshold: 10 },
        { id: 'achievement_collector_25', threshold: 25 },
        { id: 'achievement_collector_50', threshold: 50 },
        { id: 'achievement_collector_75', threshold: 75 },
        { id: 'achievement_collector_100', threshold: 100 }
    ];

    var ACHIEVEMENT_COUNT_MILESTONE_IDS = {};
    ACHIEVEMENT_COUNT_MILESTONES.forEach(function (item) {
        ACHIEVEMENT_COUNT_MILESTONE_IDS[item.id] = true;
    });


    /*
     * TEST 1.14.1: самостоятельные многоступенчатые серии.
     *
     * В полном списке каждая такая серия ведёт себя как ОДНО достижение:
     * показывается только максимальная уже полученная ступень. Будущие
     * ступени не засоряют «Неполученные», а текущая карточка показывает
     * прогресс до следующей. На последней ступени выводится «Высшая стадия».
     */
    var STAGED_ACHIEVEMENT_SERIES = [
        {
            key: 'collector',
            displayTier: true,
            ids: ACHIEVEMENT_COUNT_MILESTONES.map(function (item) {
                return item.id;
            })
        },
        {
            key: 'trophy_shelf',
            displayTier: true,
            ids: [
                'meta_trophy_shelf_5',
                'meta_trophy_shelf_10',
                'meta_trophy_shelf_20'
            ]
        },
        {
            key: 'award_archive',
            displayTier: true,
            ids: [
                'meta_award_archive_10',
                'meta_award_archive_25',
                'meta_award_archive_50'
            ]
        },
        {
            key: 'harvest_day',
            displayTier: true,
            ids: [
                'meta_harvest_day_3',
                'meta_harvest_day_5',
                'meta_harvest_day_10'
            ]
        },
        {
            key: 'community_approval',
            displayTier: true,
            ids: [
                'comm_approval_1',
                'comm_approval_5',
                'comm_approval_10',
                'comm_approval_25',
                'comm_approval_50',
                'comm_approval_100'
            ]
        }
    ];

    var STAGED_ACHIEVEMENT_ID_INFO = {};
    STAGED_ACHIEVEMENT_SERIES.forEach(function (series) {
        series.ids.forEach(function (achievementId, index) {
            STAGED_ACHIEVEMENT_ID_INFO[achievementId] = {
                series: series,
                index: index
            };
        });
    });

    /*
     * TEST 1.14.2: смысловые мета-цепочки, которые не схлопываются в одну
     * карточку, но должны показывать прогресс к следующему рубежу и
     * «Высшая стадия» на последнем рубеже.
     *
     * «Тринадцать печатей» остаётся отдельным мифическим капстоуном,
     * поэтому «Хранитель редкостей» является высшей стадией своей
     * четырёхступенчатой коллекционной линии.
     */
    var META_PROGRESS_SERIES = [
        [
            'meta_rarity_3',
            'meta_rarity_5',
            'meta_rarity_8',
            'meta_rarity_10'
        ],
        [
            'meta_secret_1',
            'meta_secret_3'
        ],
        [
            'meta_chain_complete_1',
            'meta_chain_complete_3'
        ],
        [
            'meta_steps_100',
            'meta_steps_500',
            'meta_steps_1000'
        ],
        [
            'meta_rarity_13'
        ],
        [
            'meta_three_grades'
        ],
        [
            'meta_categories_5'
        ],
        [
            'meta_versatile_master'
        ],
        [
            'meta_threshold_of_legend'
        ],
        [
            'meta_beyond_hundred'
        ]
    ];

    var META_PROGRESS_ID_INFO = {};
    META_PROGRESS_SERIES.forEach(function (ids) {
        ids.forEach(function (achievementId, index) {
            META_PROGRESS_ID_INFO[achievementId] = {
                ids: ids,
                index: index
            };
        });
    });


    /* TEST 1.16.0: «Голос Летописи» теперь полноценная цепочка I–C. */
    /* TEST 1.16.3: «Знак поддержки» также является полноценной цепочкой I–C. */
    var COMM_GIVEN_LIKE_PREFIX = 'comm_given_like_';
    var COMM_GIVEN_LIKE_THRESHOLDS = [1,3,5,10,15,25,35,50,75,100,105,110,115,125,135,150,165,180,200,215,240,260,285,305,335,360,390,420,450,480,515,545,580,620,655,695,735,775,815,855,900,945,990,1035,1085,1130,1180,1230,1280,1335,1385,1440,1495,1550,1610,1665,1725,1785,1845,1905,1965,2030,2090,2155,2220,2285,2355,2420,2490,2560,2630,2700,2770,2845,2920,2990,3065,3145,3220,3295,3375,3455,3535,3615,3695,3775,3860,3940,4025,4110,4195,4285,4370,4460,4545,4635,4725,4815,4910,5000];

    var COMM_VOICE_PREFIX = 'comm_voice_';
    var COMM_VOICE_THRESHOLDS = [5,10,25,50,75,100,105,110,115,120,130,135,140,150,155,165,170,180,190,200,210,220,230,240,255,265,280,295,310,325,340,355,375,395,415,435,455,480,500,530,560,580,610,640,680,710,750,780,820,860,910,950,1000,1050,1100,1160,1220,1280,1340,1410,1480,1550,1630,1710,1800,1890,1990,2075,2200,2300,2425,2525,2675,2800,2950,3075,3250,3400,3575,3750,3950,4150,4350,4575,4800,5025,5300,5550,5825,6125,6425,6750,7100,7450,7825,8225,8625,9075,9525,10000];

    var DISCUSSION_ACHIEVEMENT_RULES = [
        { id: 'comm_first_word', type: 'total', threshold: 1 },
        { id: 'comm_first_thread', type: 'threads', threshold: 1 },
        { id: 'comm_first_reply', type: 'replies', threshold: 1 },
        { id: 'comm_ten_threads', type: 'uniqueThreads', threshold: 10 },
        { id: 'comm_lively_day', type: 'maxDay', threshold: 10 },

        /* Полученные отметки «Нравится» на собственных сообщениях /f. */
        { id: 'comm_approval_1', type: 'likesReceived', threshold: 1 },
        { id: 'comm_approval_5', type: 'likesReceived', threshold: 5 },
        { id: 'comm_approval_10', type: 'likesReceived', threshold: 10 },
        { id: 'comm_approval_25', type: 'likesReceived', threshold: 25 },
        { id: 'comm_approval_50', type: 'likesReceived', threshold: 50 },
        { id: 'comm_approval_100', type: 'likesReceived', threshold: 100 },
        { id: 'comm_liked_posts_10', type: 'likedPosts', threshold: 10 },
        { id: 'comm_post_likes_10', type: 'maxLikes', threshold: 10 },
        { id: 'comm_post_likes_25', type: 'maxLikes', threshold: 25 },
        { id: 'comm_threads_25', type: 'uniqueThreads', threshold: 25 },
        { id: 'comm_threads_50', type: 'uniqueThreads', threshold: 50 },
        { id: 'comm_threads_100', type: 'uniqueThreads', threshold: 100 },
        { id: 'comm_replies_50', type: 'replies', threshold: 50 },
        { id: 'comm_replies_100', type: 'replies', threshold: 100 },
        { id: 'comm_threads_created_10', type: 'threads', threshold: 10 },
        { id: 'comm_lively_day_25', type: 'maxDay', threshold: 25 },

        /* Скрытые знаки общения. */
        { id: 'hidden_forum_thirteen', type: 'total', threshold: 13 },
        { id: 'hidden_forum_seventy_seven', type: 'total', threshold: 77 },
        { id: 'hidden_forum_likes_thirteen', type: 'likesReceived', threshold: 13 },
        { id: 'hidden_forum_post_seven_likes', type: 'maxLikes', threshold: 7 },
        { id: 'hidden_forum_dawn', type: 'dawnActions', threshold: 1 },
        { id: 'hidden_forum_old_echo', type: 'oldThreadReplies', threshold: 1 },
        { id: 'hidden_forum_thirteen_threads', type: 'threads', threshold: 13 },
        { id: 'hidden_forum_seventy_seven_replies', type: 'replies', threshold: 77 },
        { id: 'hidden_forum_seven_liked_posts', type: 'likedPosts', threshold: 7 },
        { id: 'hidden_forum_thirty_three_threads', type: 'uniqueThreads', threshold: 33 }
    ];

    var DISCUSSION_ACHIEVEMENT_IDS = {};
    var DISCUSSION_RULE_BY_ID = {};
    DISCUSSION_ACHIEVEMENT_RULES.forEach(function (rule) {
        DISCUSSION_ACHIEVEMENT_IDS[rule.id] = true;
        DISCUSSION_RULE_BY_ID[rule.id] = rule;
    });

    /*
     * Измеримые одиночные достижения. Для них шкала действительно
     * отражает путь к условию, поэтому они используют тот же интерфейс
     * прогресса, что цепочки и мета-достижения.
     */
    var DIRECT_PROGRESS_RULES = [
        { id: 'first_edit', key: 'editCount', threshold: 1 },
        { id: 'sozidatel', key: 'createdArticles', threshold: 1 },
        { id: 'night_hero', key: 'maxNightEditsInOneDay', threshold: 25 },
        { id: 'tysyacha_strok', key: 'maxPositiveBytesInOneEdit', threshold: 25000 },
        { id: 'sto_dorog', key: 'roadCategories', threshold: 100 },
        { id: 'zavershitel', key: 'completedDrafts', threshold: 1 }
    ];

    var DIRECT_PROGRESS_RULE_BY_ID = {};
    DIRECT_PROGRESS_RULES.forEach(function (rule) {
        DIRECT_PROGRESS_RULE_BY_ID[rule.id] = rule;
    });

    /*
     * TEST 1.13.0: мета-достижения самой коллекции.
     *
     * Они рассчитываются только по уже существующим обычным,
     * уровневым, скрытым и рейтинговым достижениям. Сами мета-
     * достижения и «Собиратель наград» не могут выполнить свои
     * собственные условия и не создают рекурсивную выдачу.
     */
    var META_ACHIEVEMENT_RULES = [
        { id: 'meta_rarity_3', type: 'rarities', threshold: 3 },
        { id: 'meta_rarity_5', type: 'rarities', threshold: 5 },
        { id: 'meta_rarity_8', type: 'rarities', threshold: 8 },
        { id: 'meta_rarity_10', type: 'rarities', threshold: 10 },
        { id: 'meta_rarity_13', type: 'rarities', threshold: 13 },
        { id: 'meta_three_grades', type: 'grades', threshold: 3 },
        { id: 'meta_first_relic', type: 'rarity', rarity: 'relic', threshold: 1 },
        { id: 'meta_first_legendary', type: 'rarity', rarity: 'legendary', threshold: 1 },
        { id: 'meta_first_mythic', type: 'rarity', rarity: 'mythic', threshold: 1 },
        { id: 'meta_secret_1', type: 'secrets', threshold: 1 },
        { id: 'meta_secret_3', type: 'secrets', threshold: 3 },
        { id: 'meta_categories_5', type: 'categories', threshold: 5 },
        { id: 'meta_chain_complete_1', type: 'completeChains', threshold: 1 },
        { id: 'meta_chain_complete_3', type: 'completeChains', threshold: 3 },
        { id: 'meta_steps_100', type: 'tierSteps', threshold: 100 },
        { id: 'meta_steps_500', type: 'tierSteps', threshold: 500 },
        { id: 'meta_grade3_5', type: 'grade3', threshold: 5 },

        /* TEST 1.14.0: расширенная мета-коллекция. */
        { id: 'meta_full_shelf', type: 'startedChains', threshold: 10 },
        { id: 'meta_trophy_shelf_5', type: 'completeChains', threshold: 5 },
        { id: 'meta_trophy_shelf_10', type: 'completeChains', threshold: 10 },
        { id: 'meta_trophy_shelf_20', type: 'completeChains', threshold: 20 },
        { id: 'meta_versatile_master', type: 'completeCategories', threshold: 4 },
        { id: 'meta_threshold_of_legend', type: 'raritiesToRelic', threshold: 11 },
        { id: 'meta_award_archive_10', type: 'awardDays', threshold: 10 },
        { id: 'meta_award_archive_25', type: 'awardDays', threshold: 25 },
        { id: 'meta_award_archive_50', type: 'awardDays', threshold: 50 },
        { id: 'meta_harvest_day_3', type: 'maxAwardsDay', threshold: 3 },
        { id: 'meta_harvest_day_5', type: 'maxAwardsDay', threshold: 5 },
        { id: 'meta_harvest_day_10', type: 'maxAwardsDay', threshold: 10 },
        { id: 'meta_award_week', type: 'awardDaysSeven', threshold: 5 },
        { id: 'meta_golden_page', type: 'maxAwardCategoriesDay', threshold: 3 },
        { id: 'meta_steps_1000', type: 'tierSteps', threshold: 1000 },
        { id: 'meta_beyond_hundred', type: 'beyondHundred', threshold: 1 }
    ];

    var META_ACHIEVEMENT_IDS = {};
    var META_RULE_BY_ID = {};
    META_ACHIEVEMENT_RULES.forEach(function (rule) {
        META_ACHIEVEMENT_IDS[rule.id] = true;
        META_RULE_BY_ID[rule.id] = rule;
    });

    /*
     * TEST 1.14.0: скрытые автоматические достижения. Они не требуют
     * ручной выдачи и вычисляются только по серверной истории MediaWiki,
     * текущей локальной странице для одной пасхалки и уже подтверждённым
     * достижениям. Условия до получения маскируются интерфейсом.
     */
    var HIDDEN_AUTOMATIC_ACHIEVEMENT_IDS = {
        hidden_ink_not_dry: true,
        hidden_forgotten_page: true,
        hidden_returning_chronicler: true,
        hidden_one_against_void: true,
        hidden_quiet_corrector: true,
        hidden_dawn_trace: true,
        hidden_thrice_returned: true,
        hidden_without_traces: true,
        hidden_beyond_chronicle: true,
        hidden_something_was_here: true,
        hidden_dont_say_name: true,
        hidden_red_thread: true,
        hidden_last_page: true,
        hidden_first_after_silence: true,
        hidden_thirteenth_sign: true,
        hidden_forum_thirteen: true,
        hidden_forum_seventy_seven: true
    };


    /*
     * TEST 1.12.9: «Собиратель наград» — одна шестиступенчатая
     * цепочка, а не шесть независимых карточек. В effective map
     * хранится только текущая максимальная ступень. Предыдущие
     * исчезают из витрины, а будущие не засоряют «Неполученные».
     */

    var THEME_KEYS = [
        'era_zarozhdeniya',
        'era_drakona',
        'kevariytsy'
    ];

    var THEME_CATEGORY_TITLES = {
        era_zarozhdeniya: 'Эра Зарождения',
        era_drakona: 'Эра Дракона',
        kevariytsy: 'Кеварийцы'
    };

    var THEME_ARTICLE_PREFIXES = {
        era_zarozhdeniya: 'chronist_era_zarozhdeniya_',
        era_drakona: 'chronist_era_drakona_',
        kevariytsy: 'chronist_kevariytsy_'
    };

    var THEME_TIME_PREFIXES = {
        era_zarozhdeniya: 'thoughtful_era_zarozhdeniya_',
        era_drakona: 'thoughtful_era_drakona_',
        kevariytsy: 'thoughtful_kevariytsy_'
    };
    var PROGRESS_PAGE_PREFIX =
        'Project:LofarianAchievementsProgress/';

    var PROGRESS_SEGMENT_COUNT = 256;
    var PROGRESS_HEADER = 'LOFARIAN_READING_PROGRESS_V1';
    var PROGRESS_RECORD_VERSION = 'L7';
    var PROGRESS_EDIT_SUMMARY =
        'LofarianAchievements: reading progress';

    var ARTICLE_READ_MIN_SECONDS = 20;
    var ACTIVE_IDLE_TIMEOUT_MS = 60 * 1000;
    var LOCAL_PROGRESS_SAVE_INTERVAL_MS = 15 * 1000;
    var REMOTE_PROGRESS_SYNC_INTERVAL_MS = 30 * 1000;
    var MAX_REMOTE_ACTIVE_STEP = 120;
    var MAX_ARTICLE_COUNT = 5000;
    var MAX_ACTIVE_SECONDS = 3000 * 60 * 60;
    var MAX_THEME_ARTICLE_COUNT = 500;
    var MAX_THEME_ACTIVE_SECONDS = 500 * 60 * 60;
    var CONTEXT_HISTORY_SCAN_LIMIT = 250;
    var ROAD_CATEGORY_PAGE_SCAN_LIMIT = 250;
    var TECHNICAL_SCAN_LIMIT = 5000;
    var CORRECTOR_MIN_REMOVED_BYTES = 50;
    var DORMANT_MIN_SECONDS = 30 * 24 * 60 * 60;
    var NIGHT_EDIT_MIN_COUNT = 25;
    var THOUSAND_LINES_MIN_BYTES = 25000;
    var COMPLETER_BEFORE_MAX_BYTES = 2000;
    var COMPLETER_AFTER_MIN_BYTES = 5000;

    var GLOBAL_RECENT_CHANGES_SCAN_LIMIT = 5000;
    var GLOBAL_RECENT_CHANGES_CACHE_MS = 10 * 60 * 1000;

    /* TEST 1.15.0: достижения общения на Fandom Discussions (/f). */
    var DISCUSSION_RECENT_LIMIT = 100;
    var DISCUSSION_STATS_CACHE_MS = 10 * 60 * 1000;

    var STAROZHIL_THRESHOLDS_DAYS = [7, 8, 12, 17, 23, 30, 38, 47, 58, 69, 81, 94, 108, 123, 138, 154, 171, 189, 208, 227, 247, 268, 289, 312, 335, 358, 382, 407, 433, 459, 486, 513, 541, 570, 599, 629, 660, 691, 722, 755, 788, 821, 855, 890, 925, 961, 997, 1034, 1071, 1109, 1148, 1187, 1226, 1266, 1307, 1348, 1390, 1432, 1475, 1518, 1562, 1606, 1651, 1697, 1742, 1789, 1836, 1883, 1931, 1979, 2028, 2077, 2127, 2177, 2228, 2279, 2331, 2383, 2436, 2489, 2543, 2597, 2652, 2707, 2762, 2818, 2875, 2932, 2989, 3047, 3105, 3164, 3223, 3283, 3343, 3403, 3464, 3526, 3588, 3650];
    var NESLOMLENNAYA_TSEP_THRESHOLDS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 30, 32, 35, 37, 39, 42, 44, 47, 50, 52, 55, 58, 61, 64, 67, 70, 73, 76, 80, 83, 86, 90, 93, 97, 101, 104, 108, 112, 116, 120, 123, 127, 132, 136, 140, 144, 148, 153, 157, 161, 166, 170, 175, 180, 184, 189, 194, 199, 203, 208, 213, 218, 223, 228, 234, 239, 244, 249, 255, 260, 266, 271, 277, 282, 288, 293, 299, 305, 311, 317, 322, 328, 334, 340, 346, 353, 359, 365];
    var PROBUZHDAYUSHCHIY_THRESHOLDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 30, 32, 34, 36, 38, 39, 41, 44, 46, 48, 50, 52, 54, 57, 59, 61, 64, 66, 69, 71, 74, 76, 79, 82, 84, 87, 90, 93, 96, 98, 101, 104, 107, 110, 113, 116, 120, 123, 126, 129, 132, 136, 139, 143, 146, 149, 153, 156, 160, 163, 167, 171, 174, 178, 182, 186, 189, 193, 197, 201, 205, 209, 213, 217, 221, 225, 229, 233, 237, 242, 246, 250];
    var ISPRAVITEL_THRESHOLDS = [5, 7, 12, 18, 26, 36, 48, 60, 74, 90, 106, 124, 143, 163, 185, 207, 230, 255, 280, 307, 334, 363, 392, 423, 454, 486, 520, 554, 589, 624, 661, 699, 737, 777, 817, 858, 900, 942, 986, 1030, 1075, 1121, 1168, 1215, 1263, 1312, 1362, 1413, 1464, 1516, 1569, 1622, 1677, 1732, 1787, 1844, 1901, 1959, 2018, 2077, 2137, 2198, 2259, 2322, 2384, 2448, 2512, 2577, 2643, 2709, 2776, 2844, 2912, 2981, 3050, 3121, 3192, 3263, 3336, 3408, 3482, 3556, 3631, 3707, 3783, 3859, 3937, 4015, 4094, 4173, 4253, 4333, 4415, 4496, 4579, 4662, 4745, 4830, 4915, 5000];
    var TKACH_KATEGORIY_THRESHOLDS = [1, 2, 3, 4, 5, 7, 10, 12, 15, 18, 21, 25, 29, 33, 37, 41, 46, 51, 56, 61, 67, 73, 78, 85, 91, 97, 104, 111, 118, 125, 132, 140, 147, 155, 163, 172, 180, 188, 197, 206, 215, 224, 234, 243, 253, 262, 272, 283, 293, 303, 314, 324, 335, 346, 357, 369, 380, 392, 404, 415, 427, 440, 452, 464, 477, 490, 502, 515, 529, 542, 555, 569, 582, 596, 610, 624, 638, 653, 667, 682, 696, 711, 726, 741, 757, 772, 787, 803, 819, 835, 851, 867, 883, 899, 916, 932, 949, 966, 983, 1000];
    var TKACH_SHABLONOV_THRESHOLDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 21, 24, 26, 29, 31, 34, 37, 40, 43, 46, 49, 52, 56, 59, 63, 67, 70, 74, 78, 82, 86, 90, 95, 99, 103, 108, 112, 117, 122, 127, 132, 137, 142, 147, 152, 157, 163, 168, 174, 179, 185, 190, 196, 202, 208, 214, 220, 226, 232, 239, 245, 251, 258, 265, 271, 278, 285, 291, 298, 305, 312, 319, 327, 334, 341, 348, 356, 363, 371, 378, 386, 394, 402, 409, 417, 425, 433, 442, 450, 458, 466, 475, 483, 491, 500];
    var ARKHIVARIUS_THRESHOLDS = [5, 6, 9, 13, 18, 24, 31, 38, 47, 56, 66, 76, 88, 100, 113, 126, 140, 155, 170, 186, 203, 220, 237, 255, 274, 294, 314, 334, 355, 376, 398, 421, 444, 468, 492, 516, 541, 567, 593, 620, 647, 674, 702, 731, 760, 789, 819, 849, 880, 911, 943, 975, 1007, 1040, 1074, 1108, 1142, 1177, 1212, 1247, 1283, 1320, 1357, 1394, 1432, 1470, 1508, 1547, 1587, 1626, 1666, 1707, 1748, 1789, 1831, 1873, 1916, 1959, 2002, 2046, 2090, 2134, 2179, 2224, 2270, 2316, 2363, 2409, 2457, 2504, 2552, 2600, 2649, 2698, 2747, 2797, 2847, 2898, 2949, 3000];
    var NEUTOMIMYY_ZODCHIY_THRESHOLDS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 41, 43, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 73, 75, 77, 79, 82, 84, 87, 89, 91, 94, 96, 99, 101, 104, 107, 109, 112, 115, 117, 120, 123, 126, 128, 131, 134, 137, 140, 143, 146, 149, 152, 155, 158, 161, 164, 167, 170, 174, 177, 180, 183, 187, 190, 193, 197, 200];
    var HRANITEL_DREVNOSTEY_THRESHOLDS_DAYS = [30, 31, 34, 38, 43, 49, 55, 63, 71, 80, 90, 101, 112, 124, 137, 150, 164, 179, 194, 209, 226, 243, 260, 278, 297, 316, 336, 356, 377, 398, 420, 443, 465, 489, 513, 537, 562, 587, 613, 640, 666, 694, 721, 750, 778, 807, 837, 867, 898, 928, 960, 992, 1024, 1057, 1090, 1123, 1157, 1192, 1227, 1262, 1298, 1334, 1370, 1407, 1445, 1483, 1521, 1559, 1598, 1638, 1678, 1718, 1758, 1799, 1841, 1883, 1925, 1967, 2010, 2054, 2097, 2142, 2186, 2231, 2276, 2322, 2368, 2414, 2461, 2508, 2556, 2604, 2652, 2701, 2750, 2799, 2849, 2899, 2949, 3000];
    var THEME_ARTICLE_THRESHOLDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 21, 24, 26, 29, 31, 34, 37, 40, 43, 46, 49, 52, 56, 59, 63, 67, 70, 74, 78, 82, 86, 90, 95, 99, 103, 108, 112, 117, 122, 127, 132, 137, 142, 147, 152, 157, 163, 168, 174, 179, 185, 190, 196, 202, 208, 214, 220, 226, 232, 239, 245, 251, 258, 265, 271, 278, 285, 291, 298, 305, 312, 319, 327, 334, 341, 348, 356, 363, 371, 378, 386, 394, 402, 409, 417, 425, 433, 442, 450, 458, 466, 475, 483, 491, 500];
    var THEME_TIME_THRESHOLDS = [300, 1029, 2668, 5018, 7993, 11543, 15628, 20220, 25296, 30837, 36828, 43252, 50100, 57359, 65020, 73074, 81513, 90329, 99516, 109068, 118978, 129242, 139853, 150807, 162100, 173728, 185685, 197969, 210576, 223501, 236743, 250297, 264161, 278331, 292806, 307581, 322655, 338025, 353688, 369643, 385887, 402417, 419233, 436330, 453709, 471366, 489300, 507509, 525991, 544745, 563768, 583060, 602618, 622442, 642529, 662878, 683488, 704357, 725483, 746867, 768505, 790398, 812543, 834940, 857587, 880483, 903627, 927018, 950654, 974535, 998659, 1023026, 1047635, 1072484, 1097572, 1122898, 1148463, 1174263, 1200300, 1226571, 1253076, 1279813, 1306783, 1333984, 1361416, 1389077, 1416967, 1445084, 1473429, 1502000, 1530797, 1559819, 1589065, 1618534, 1648226, 1678140, 1708274, 1738630, 1769205, 1800000];

    var CHRONIST_THRESHOLDS = [5, 7, 12, 18, 26, 36, 48, 60, 74, 90, 105, 125, 145, 165, 185, 205, 230, 255, 280, 305, 335, 365, 390, 425, 455, 485, 520, 555, 590, 625, 660, 700, 735, 775, 815, 860, 900, 940, 985, 1030, 1080, 1120, 1170, 1220, 1260, 1310, 1360, 1410, 1460, 1520, 1570, 1620, 1680, 1730, 1790, 1840, 1900, 1960, 2020, 2080, 2140, 2200, 2260, 2320, 2380, 2450, 2510, 2580, 2640, 2710, 2780, 2840, 2910, 2980, 3050, 3120, 3190, 3260, 3340, 3410, 3480, 3560, 3630, 3710, 3780, 3860, 3940, 4010, 4090, 4170, 4250, 4330, 4410, 4500, 4580, 4660, 4750, 4830, 4910, 5000];

    var THOUGHTFUL_THRESHOLDS = [600, 660, 720, 780, 900, 960, 1080, 1200, 1320, 1440, 1620, 1800, 1980, 2160, 2400, 2640, 2940, 3240, 3540, 3900, 4200, 4800, 5400, 5700, 6600, 7200, 7800, 8700, 9600, 10500, 11700, 12900, 14100, 15600, 17400, 19200, 21300, 23400, 26100, 28800, 31500, 35100, 38700, 42300, 46800, 51300, 56700, 63000, 69300, 76500, 84600, 93600, 104400, 115200, 126000, 140400, 154800, 169200, 187200, 205200, 226800, 252000, 277200, 306000, 338400, 378000, 414000, 450000, 504000, 558000, 612000, 684000, 738000, 828000, 918000, 1008000, 1116000, 1224000, 1350000, 1494000, 1656000, 1818000, 2016000, 2214000, 2448000, 2700000, 2988000, 3294000, 3636000, 4014000, 4428000, 4896000, 5400000, 5958000, 6588000, 7272000, 8028000, 8856000, 9774000, 10800000];

    var LETOPISETS_THRESHOLDS = [5, 8, 14, 23, 36, 51, 69, 90, 115, 140, 165, 195, 230, 265, 300, 340, 380, 425, 470, 515, 565, 620, 670, 725, 785, 845, 905, 970, 1030, 1100, 1170, 1240, 1310, 1390, 1460, 1540, 1620, 1700, 1790, 1870, 1960, 2050, 2140, 2230, 2330, 2420, 2520, 2620, 2720, 2820, 2930, 3030, 3140, 3250, 3360, 3470, 3590, 3710, 3820, 3940, 4060, 4190, 4310, 4440, 4560, 4690, 4820, 4950, 5090, 5220, 5360, 5500, 5640, 5780, 5920, 6070, 6220, 6360, 6510, 6660, 6820, 6970, 7130, 7280, 7440, 7600, 7760, 7930, 8090, 8260, 8420, 8590, 8760, 8940, 9110, 9280, 9460, 9640, 9820, 10000];
    var ZODCHIY_THRESHOLDS = [3, 4, 5, 7, 9, 11, 14, 17, 21, 25, 28, 33, 37, 42, 47, 52, 57, 62, 68, 74, 80, 86, 93, 99, 105, 115, 120, 130, 135, 145, 150, 160, 165, 175, 185, 190, 200, 210, 220, 230, 235, 245, 255, 265, 275, 285, 295, 305, 315, 325, 335, 350, 360, 370, 380, 390, 405, 415, 425, 440, 450, 460, 475, 485, 500, 510, 525, 535, 550, 565, 575, 590, 600, 615, 630, 640, 655, 670, 685, 700, 710, 725, 740, 755, 770, 785, 800, 815, 830, 845, 860, 875, 890, 905, 920, 935, 950, 970, 985, 1000];
    var MULTIGRAN_THRESHOLDS = [5, 6, 9, 13, 18, 24, 31, 38, 47, 56, 66, 76, 88, 100, 115, 125, 140, 155, 170, 185, 205, 220, 235, 255, 275, 295, 315, 335, 355, 375, 400, 420, 445, 470, 490, 515, 540, 565, 595, 620, 645, 675, 700, 730, 760, 790, 820, 850, 880, 910, 945, 975, 1010, 1040, 1070, 1110, 1140, 1180, 1210, 1250, 1280, 1320, 1360, 1390, 1430, 1470, 1510, 1550, 1590, 1630, 1670, 1710, 1750, 1790, 1830, 1870, 1920, 1960, 2000, 2050, 2090, 2130, 2180, 2220, 2270, 2320, 2360, 2410, 2460, 2500, 2550, 2600, 2650, 2700, 2750, 2800, 2850, 2900, 2950, 3000];
    var VERNY_LETOPISETS_THRESHOLDS = [2, 6, 9, 13, 17, 20, 24, 28, 31, 35, 39, 42, 46, 50, 53, 57, 61, 64, 68, 72, 75, 79, 83, 86, 90, 94, 97, 101, 105, 108, 112, 116, 119, 123, 127, 130, 134, 138, 141, 145, 149, 152, 156, 160, 163, 167, 171, 174, 178, 182, 185, 189, 193, 196, 200, 204, 207, 211, 215, 218, 222, 226, 229, 233, 237, 240, 244, 248, 251, 255, 259, 262, 266, 270, 273, 277, 281, 284, 288, 292, 295, 299, 303, 306, 310, 314, 317, 321, 325, 328, 332, 336, 339, 343, 347, 350, 354, 358, 361, 365];

    var NEUTOMIMOE_PERO_THRESHOLDS = [25, 30, 35, 39, 44, 49, 54, 59, 63, 68, 73, 78, 83, 87, 92, 97, 102, 107, 111, 116, 121, 126, 131, 135, 140, 145, 150, 155, 159, 164, 169, 174, 179, 183, 188, 193, 198, 203, 207, 212, 217, 222, 227, 231, 236, 241, 246, 251, 255, 260, 265, 270, 274, 279, 284, 289, 294, 298, 303, 308, 313, 318, 322, 327, 332, 337, 342, 346, 351, 356, 361, 366, 370, 375, 380, 385, 390, 394, 399, 404, 409, 414, 418, 423, 428, 433, 438, 442, 447, 452, 457, 462, 466, 471, 476, 481, 486, 490, 495, 500];
    var VOZVRASHCHENIE_THRESHOLDS = [2592000, 5184000, 7776000, 10368000, 12960000, 15552000, 18144000, 20736000, 23328000, 25920000, 28512000, 31104000, 33696000, 36288000, 38880000, 41472000, 44064000, 46656000, 49248000, 51840000, 54432000, 57024000, 59616000, 62208000, 64800000, 67392000, 69984000, 72576000, 75168000, 77760000, 80352000, 82944000, 85536000, 88128000, 90720000, 93312000, 95904000, 98496000, 101088000, 103680000, 106272000, 108864000, 111456000, 114048000, 116640000, 119232000, 121824000, 124416000, 127008000, 129600000, 132192000, 134784000, 137376000, 139968000, 142560000, 145152000, 147744000, 150336000, 152928000, 155520000, 158112000, 160704000, 163296000, 165888000, 168480000, 171072000, 173664000, 176256000, 178848000, 181440000, 184032000, 186624000, 189216000, 191808000, 194400000, 196992000, 199584000, 202176000, 204768000, 207360000, 209952000, 212544000, 215136000, 217728000, 220320000, 222912000, 225504000, 228096000, 230688000, 233280000, 235872000, 238464000, 241056000, 243648000, 246240000, 248832000, 251424000, 254016000, 256608000, 259200000];
    var CHERNILNY_POTOK_THRESHOLDS = [100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000, 1100000, 1200000, 1300000, 1400000, 1500000, 1600000, 1700000, 1800000, 1900000, 2000000, 2100000, 2200000, 2300000, 2400000, 2500000, 2600000, 2700000, 2800000, 2900000, 3000000, 3100000, 3200000, 3300000, 3400000, 3500000, 3600000, 3700000, 3800000, 3900000, 4000000, 4100000, 4200000, 4300000, 4400000, 4500000, 4600000, 4700000, 4800000, 4900000, 5000000, 5100000, 5200000, 5300000, 5400000, 5500000, 5600000, 5700000, 5800000, 5900000, 6000000, 6100000, 6200000, 6300000, 6400000, 6500000, 6600000, 6700000, 6800000, 6900000, 7000000, 7100000, 7200000, 7300000, 7400000, 7500000, 7600000, 7700000, 7800000, 7900000, 8000000, 8100000, 8200000, 8300000, 8400000, 8500000, 8600000, 8700000, 8800000, 8900000, 9000000, 9100000, 9200000, 9300000, 9400000, 9500000, 9600000, 9700000, 9800000, 9900000, 10000000];
    var CHERNILNY_SLED_THRESHOLDS = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500, 1550, 1600, 1650, 1700, 1750, 1800, 1850, 1900, 1950, 2000, 2050, 2100, 2150, 2200, 2250, 2300, 2350, 2400, 2450, 2500, 2550, 2600, 2650, 2700, 2750, 2800, 2850, 2900, 2950, 3000, 3050, 3100, 3150, 3200, 3250, 3300, 3350, 3400, 3450, 3500, 3550, 3600, 3650, 3700, 3750, 3800, 3850, 3900, 3950, 4000, 4050, 4100, 4150, 4200, 4250, 4300, 4350, 4400, 4450, 4500, 4550, 4600, 4650, 4700, 4750, 4800, 4850, 4900, 4950, 5000];
    var RUKA_LETOPISTSA_THRESHOLDS = [5, 6, 9, 14, 20, 28, 37, 47, 59, 72, 86, 100, 115, 135, 155, 170, 195, 215, 235, 260, 285, 310, 340, 365, 395, 425, 455, 485, 520, 555, 585, 625, 660, 695, 735, 775, 815, 855, 895, 940, 980, 1030, 1070, 1120, 1170, 1210, 1260, 1310, 1360, 1410, 1470, 1520, 1570, 1630, 1680, 1740, 1800, 1850, 1910, 1970, 2030, 2090, 2160, 2220, 2280, 2350, 2410, 2480, 2550, 2610, 2680, 2750, 2820, 2890, 2960, 3040, 3110, 3180, 3260, 3330, 3410, 3490, 3560, 3640, 3720, 3800, 3880, 3960, 4050, 4130, 4210, 4300, 4380, 4470, 4560, 4640, 4730, 4820, 4910, 5000];
    var HUDOZHNIK_THRESHOLDS = [1, 3, 6, 12, 19, 28, 38, 49, 62, 76, 91, 110, 125, 145, 165, 185, 205, 230, 255, 280, 305, 330, 360, 390, 420, 450, 485, 515, 550, 585, 620, 655, 695, 730, 770, 810, 850, 895, 935, 980, 1020, 1070, 1120, 1160, 1210, 1260, 1310, 1360, 1410, 1460, 1510, 1570, 1620, 1680, 1730, 1790, 1850, 1900, 1960, 2020, 2080, 2140, 2200, 2270, 2330, 2390, 2460, 2530, 2590, 2660, 2730, 2790, 2860, 2930, 3000, 3080, 3150, 3220, 3290, 3370, 3440, 3520, 3600, 3670, 3750, 3830, 3910, 3990, 4070, 4150, 4230, 4310, 4400, 4480, 4570, 4650, 4740, 4820, 4910, 5000];

    var EDITOR_SCAN_LIMIT = 10000;
    var FILE_SCAN_LIMIT = 5000;
    var CREATED_ARTICLE_SCAN_LIMIT = 1000;
    var MAJOR_EDIT_MIN_ABS_BYTES = 500;
    var EDITOR_STATS_CACHE_MS = 5 * 60 * 1000;
    var EDITOR_HALL_USER_LIMIT = 1000;
    var EDITOR_HALL_CONCURRENCY = 8;
    var LEADERBOARD_PAGE_SIZE = 50;


    var ADMIN_GROUPS = [
        'sysop',
        'bureaucrat'
    ];

    var LEADERBOARD_CACHE_MS = 15 * 60 * 1000;

    var LEADERBOARD_STORAGE_KEY =
        'lof-achievements-hall-cache-v3';

    var LEADERBOARD_STORAGE_MAX_AGE_MS =
        7 * 24 * 60 * 60 * 1000;

    I.config = {
        VERSION: VERSION,
        CATALOG_PAGE: CATALOG_PAGE,
        CATALOG_PART_PAGES: CATALOG_PART_PAGES,
        USERS_PAGE_PREFIX: USERS_PAGE_PREFIX,
        SEGMENT_COUNT: SEGMENT_COUNT,
        DATA_CLASS: DATA_CLASS,
        HALL_PAGE: HALL_PAGE,
        PROFILE_RAIL_PAGE_SIZE: PROFILE_RAIL_PAGE_SIZE,
        PROFILE_RAIL_MOBILE_BREAKPOINT: PROFILE_RAIL_MOBILE_BREAKPOINT,
        PROFILE_RAIL_FALLBACK_COLLAPSE_KEY: PROFILE_RAIL_FALLBACK_COLLAPSE_KEY,
        LEADERBOARD_LIMIT: LEADERBOARD_LIMIT,
        FIRST_LOGIN_ID: FIRST_LOGIN_ID,
        CHRONIST_PREFIX: CHRONIST_PREFIX,
        THOUGHTFUL_PREFIX: THOUGHTFUL_PREFIX,
        LETOPISETS_PREFIX: LETOPISETS_PREFIX,
        ZODCHIY_PREFIX: ZODCHIY_PREFIX,
        MULTIGRAN_PREFIX: MULTIGRAN_PREFIX,
        VERNY_LETOPISETS_PREFIX: VERNY_LETOPISETS_PREFIX,
        FIRST_EDIT_ID: FIRST_EDIT_ID,
        SOZIDATEL_ID: SOZIDATEL_ID,
        NEUTOMIMOE_PERO_PREFIX: NEUTOMIMOE_PERO_PREFIX,
        VOZVRASHCHENIE_PREFIX: VOZVRASHCHENIE_PREFIX,
        CHERNILNY_POTOK_PREFIX: CHERNILNY_POTOK_PREFIX,
        CHERNILNY_SLED_PREFIX: CHERNILNY_SLED_PREFIX,
        RUKA_LETOPISTSA_PREFIX: RUKA_LETOPISTSA_PREFIX,
        HUDOZHNIK_PREFIX: HUDOZHNIK_PREFIX,
        STAROZHIL_PREFIX: STAROZHIL_PREFIX,
        NESLOMLENNAYA_TSEP_PREFIX: NESLOMLENNAYA_TSEP_PREFIX,
        PROBUZHDAYUSHCHIY_PREFIX: PROBUZHDAYUSHCHIY_PREFIX,
        ISPRAVITEL_PREFIX: ISPRAVITEL_PREFIX,
        TKACH_KATEGORIY_PREFIX: TKACH_KATEGORIY_PREFIX,
        TKACH_SHABLONOV_PREFIX: TKACH_SHABLONOV_PREFIX,
        ARKHIVARIUS_PREFIX: ARKHIVARIUS_PREFIX,
        NEUTOMIMYY_ZODCHIY_PREFIX: NEUTOMIMYY_ZODCHIY_PREFIX,
        HRANITEL_DREVNOSTEY_PREFIX: HRANITEL_DREVNOSTEY_PREFIX,
        NIGHT_HERO_ID: NIGHT_HERO_ID,
        TYSYACHA_STROK_ID: TYSYACHA_STROK_ID,
        HALL_TOP_500_ID: HALL_TOP_500_ID,
        HALL_TOP_100_ID: HALL_TOP_100_ID,
        HALL_TOP_10_ID: HALL_TOP_10_ID,
        STO_DOROG_ID: STO_DOROG_ID,
        ZAVERSHITEL_ID: ZAVERSHITEL_ID,
        ACHIEVEMENT_COUNT_MILESTONES: ACHIEVEMENT_COUNT_MILESTONES,
        ACHIEVEMENT_COUNT_MILESTONE_IDS: ACHIEVEMENT_COUNT_MILESTONE_IDS,
        STAGED_ACHIEVEMENT_SERIES: STAGED_ACHIEVEMENT_SERIES,
        STAGED_ACHIEVEMENT_ID_INFO: STAGED_ACHIEVEMENT_ID_INFO,
        META_PROGRESS_SERIES: META_PROGRESS_SERIES,
        META_PROGRESS_ID_INFO: META_PROGRESS_ID_INFO,
        COMM_GIVEN_LIKE_PREFIX: COMM_GIVEN_LIKE_PREFIX,
        COMM_GIVEN_LIKE_THRESHOLDS: COMM_GIVEN_LIKE_THRESHOLDS,
        COMM_VOICE_PREFIX: COMM_VOICE_PREFIX,
        COMM_VOICE_THRESHOLDS: COMM_VOICE_THRESHOLDS,
        DISCUSSION_ACHIEVEMENT_RULES: DISCUSSION_ACHIEVEMENT_RULES,
        DISCUSSION_ACHIEVEMENT_IDS: DISCUSSION_ACHIEVEMENT_IDS,
        DISCUSSION_RULE_BY_ID: DISCUSSION_RULE_BY_ID,
        DIRECT_PROGRESS_RULES: DIRECT_PROGRESS_RULES,
        DIRECT_PROGRESS_RULE_BY_ID: DIRECT_PROGRESS_RULE_BY_ID,
        META_ACHIEVEMENT_RULES: META_ACHIEVEMENT_RULES,
        META_ACHIEVEMENT_IDS: META_ACHIEVEMENT_IDS,
        META_RULE_BY_ID: META_RULE_BY_ID,
        HIDDEN_AUTOMATIC_ACHIEVEMENT_IDS: HIDDEN_AUTOMATIC_ACHIEVEMENT_IDS,
        THEME_KEYS: THEME_KEYS,
        THEME_CATEGORY_TITLES: THEME_CATEGORY_TITLES,
        THEME_ARTICLE_PREFIXES: THEME_ARTICLE_PREFIXES,
        THEME_TIME_PREFIXES: THEME_TIME_PREFIXES,
        PROGRESS_PAGE_PREFIX: PROGRESS_PAGE_PREFIX,
        PROGRESS_SEGMENT_COUNT: PROGRESS_SEGMENT_COUNT,
        PROGRESS_HEADER: PROGRESS_HEADER,
        PROGRESS_RECORD_VERSION: PROGRESS_RECORD_VERSION,
        PROGRESS_EDIT_SUMMARY: PROGRESS_EDIT_SUMMARY,
        ARTICLE_READ_MIN_SECONDS: ARTICLE_READ_MIN_SECONDS,
        ACTIVE_IDLE_TIMEOUT_MS: ACTIVE_IDLE_TIMEOUT_MS,
        LOCAL_PROGRESS_SAVE_INTERVAL_MS: LOCAL_PROGRESS_SAVE_INTERVAL_MS,
        REMOTE_PROGRESS_SYNC_INTERVAL_MS: REMOTE_PROGRESS_SYNC_INTERVAL_MS,
        MAX_REMOTE_ACTIVE_STEP: MAX_REMOTE_ACTIVE_STEP,
        MAX_ARTICLE_COUNT: MAX_ARTICLE_COUNT,
        MAX_ACTIVE_SECONDS: MAX_ACTIVE_SECONDS,
        MAX_THEME_ARTICLE_COUNT: MAX_THEME_ARTICLE_COUNT,
        MAX_THEME_ACTIVE_SECONDS: MAX_THEME_ACTIVE_SECONDS,
        CONTEXT_HISTORY_SCAN_LIMIT: CONTEXT_HISTORY_SCAN_LIMIT,
        ROAD_CATEGORY_PAGE_SCAN_LIMIT: ROAD_CATEGORY_PAGE_SCAN_LIMIT,
        TECHNICAL_SCAN_LIMIT: TECHNICAL_SCAN_LIMIT,
        CORRECTOR_MIN_REMOVED_BYTES: CORRECTOR_MIN_REMOVED_BYTES,
        DORMANT_MIN_SECONDS: DORMANT_MIN_SECONDS,
        NIGHT_EDIT_MIN_COUNT: NIGHT_EDIT_MIN_COUNT,
        THOUSAND_LINES_MIN_BYTES: THOUSAND_LINES_MIN_BYTES,
        COMPLETER_BEFORE_MAX_BYTES: COMPLETER_BEFORE_MAX_BYTES,
        COMPLETER_AFTER_MIN_BYTES: COMPLETER_AFTER_MIN_BYTES,
        GLOBAL_RECENT_CHANGES_SCAN_LIMIT: GLOBAL_RECENT_CHANGES_SCAN_LIMIT,
        GLOBAL_RECENT_CHANGES_CACHE_MS: GLOBAL_RECENT_CHANGES_CACHE_MS,
        DISCUSSION_RECENT_LIMIT: DISCUSSION_RECENT_LIMIT,
        DISCUSSION_STATS_CACHE_MS: DISCUSSION_STATS_CACHE_MS,
        STAROZHIL_THRESHOLDS_DAYS: STAROZHIL_THRESHOLDS_DAYS,
        NESLOMLENNAYA_TSEP_THRESHOLDS: NESLOMLENNAYA_TSEP_THRESHOLDS,
        PROBUZHDAYUSHCHIY_THRESHOLDS: PROBUZHDAYUSHCHIY_THRESHOLDS,
        ISPRAVITEL_THRESHOLDS: ISPRAVITEL_THRESHOLDS,
        TKACH_KATEGORIY_THRESHOLDS: TKACH_KATEGORIY_THRESHOLDS,
        TKACH_SHABLONOV_THRESHOLDS: TKACH_SHABLONOV_THRESHOLDS,
        ARKHIVARIUS_THRESHOLDS: ARKHIVARIUS_THRESHOLDS,
        NEUTOMIMYY_ZODCHIY_THRESHOLDS: NEUTOMIMYY_ZODCHIY_THRESHOLDS,
        HRANITEL_DREVNOSTEY_THRESHOLDS_DAYS: HRANITEL_DREVNOSTEY_THRESHOLDS_DAYS,
        THEME_ARTICLE_THRESHOLDS: THEME_ARTICLE_THRESHOLDS,
        THEME_TIME_THRESHOLDS: THEME_TIME_THRESHOLDS,
        CHRONIST_THRESHOLDS: CHRONIST_THRESHOLDS,
        THOUGHTFUL_THRESHOLDS: THOUGHTFUL_THRESHOLDS,
        LETOPISETS_THRESHOLDS: LETOPISETS_THRESHOLDS,
        ZODCHIY_THRESHOLDS: ZODCHIY_THRESHOLDS,
        MULTIGRAN_THRESHOLDS: MULTIGRAN_THRESHOLDS,
        VERNY_LETOPISETS_THRESHOLDS: VERNY_LETOPISETS_THRESHOLDS,
        NEUTOMIMOE_PERO_THRESHOLDS: NEUTOMIMOE_PERO_THRESHOLDS,
        VOZVRASHCHENIE_THRESHOLDS: VOZVRASHCHENIE_THRESHOLDS,
        CHERNILNY_POTOK_THRESHOLDS: CHERNILNY_POTOK_THRESHOLDS,
        CHERNILNY_SLED_THRESHOLDS: CHERNILNY_SLED_THRESHOLDS,
        RUKA_LETOPISTSA_THRESHOLDS: RUKA_LETOPISTSA_THRESHOLDS,
        HUDOZHNIK_THRESHOLDS: HUDOZHNIK_THRESHOLDS,
        EDITOR_SCAN_LIMIT: EDITOR_SCAN_LIMIT,
        FILE_SCAN_LIMIT: FILE_SCAN_LIMIT,
        CREATED_ARTICLE_SCAN_LIMIT: CREATED_ARTICLE_SCAN_LIMIT,
        MAJOR_EDIT_MIN_ABS_BYTES: MAJOR_EDIT_MIN_ABS_BYTES,
        EDITOR_STATS_CACHE_MS: EDITOR_STATS_CACHE_MS,
        EDITOR_HALL_USER_LIMIT: EDITOR_HALL_USER_LIMIT,
        EDITOR_HALL_CONCURRENCY: EDITOR_HALL_CONCURRENCY,
        LEADERBOARD_PAGE_SIZE: LEADERBOARD_PAGE_SIZE,
        ADMIN_GROUPS: ADMIN_GROUPS,
        LEADERBOARD_CACHE_MS: LEADERBOARD_CACHE_MS,
        LEADERBOARD_STORAGE_KEY: LEADERBOARD_STORAGE_KEY,
        LEADERBOARD_STORAGE_MAX_AGE_MS: LEADERBOARD_STORAGE_MAX_AGE_MS
    };
    I.registerModule('Config', { constants: Object.keys(I.config), progressRecordVersion: I.config.PROGRESS_RECORD_VERSION });
})(window);