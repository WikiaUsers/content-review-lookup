/*
===============================================================================
                         LOFARIAN ACHIEVEMENTS
                   СИСТЕМА ДОСТИЖЕНИЙ ВИКИ ЛОФАРИАН
===============================================================================

Версия системы: TEST 1.16.3
Среда: Fandom / MediaWiki
Основной файл: MediaWiki:Common.js

Этот JavaScript реализует внутреннюю систему достижений русскоязычной
Fandom вики мира Лофариан.

Система создана как элемент геймификации сообщества. Она награждает
участников за полезную активность на вики: чтение материалов,
редактирование, создание страниц, длительную работу с проектом,
технические действия, участие в Discussions и другие заранее
определённые действия.

Система не является внешней аналитикой и не передаёт пользовательские
данные за пределы Fandom.


===============================================================================
                           1. ОСНОВНАЯ АРХИТЕКТУРА
===============================================================================

Вся система работает непосредственно внутри Fandom.

Используются:

    • MediaWiki:Common.js
    • MediaWiki:Common.css
    • стандартный MediaWiki API
    • внутренний каталог достижений
    • внутренние progress страницы
    • AbuseFilter
    • публичные данные Fandom Discussions

Внешний backend отсутствует.

Система не подключает удалённый JavaScript и не использует сторонние
серверы для хранения пользовательского прогресса.


===============================================================================
                         2. КАТАЛОГ ДОСТИЖЕНИЙ
===============================================================================

Основной каталог расположен на странице:

    Project:LofarianAchievementsData

В каталоге хранятся:

    • ID достижения
    • название
    • описание
    • изображение
    • редкость
    • категория
    • количество очков
    • параметры автоматической проверки
    • параметры скрытых достижений
    • семейства уровневых достижений

Крупные цепочки I–C не дублируются сотней отдельных одинаковых объектов.

Они описываются компактными семействами, после чего Common.js формирует
необходимые ступени непосредственно во время работы системы.


===============================================================================
                          3. ИСТОЧНИКИ ДАННЫХ
===============================================================================

Для расчёта достижений используются данные, доступные внутри MediaWiki
и самой Fandom вики.

В зависимости от конкретного достижения система может учитывать:

    • количество правок
    • количество созданных страниц
    • размеры и изменения страниц
    • даты редактирования
    • пространство имён
    • загрузки файлов
    • работу со старыми страницами
    • длительность активности
    • последовательность активных дней
    • публичную активность Discussions
    • публичные отметки «Нравится»
    • внутренний агрегированный прогресс достижений

Система не получает доступ к паролям, электронной почте, личным
сообщениям или иной закрытой информации пользователя.


===============================================================================
                         4. ПРОГРЕСС ЧТЕНИЯ
===============================================================================

Некоторые достижения связаны с чтением материалов вики.

Для них используется внутренний агрегированный progress.

ВАЖНО:

Система НЕ сохраняет полную историю посещённых страниц.

Она НЕ формирует список прочитанных пользователем статей.

Она НЕ сохраняет последовательность переходов между страницами.

Она НЕ хранит содержимое просмотренных материалов.

В технических данных сохраняются только итоговые числовые показатели,
необходимые для игровой системы достижений.


===============================================================================
                        5. PROGRESS СТРАНИЦЫ
===============================================================================

Агрегированные показатели пользователей распределяются между
256 внутренними техническими страницами:

    Project:LofarianAchievementsProgress/0

                           ...

    Project:LofarianAchievementsProgress/255

Разделение на 256 сегментов необходимо для того, чтобы не хранить
состояние всей системы на одной огромной странице и не переписывать
данные всех участников при каждом обновлении.

Каждый пользователь относится только к одному сегменту.

Текущий компактный формат progress:

    L7

Запись содержит исключительно игровые счётчики и необходимые временные
метки.


===============================================================================
                         6. ЧТО НЕ СОХРАНЯЕТСЯ
===============================================================================

LofarianAchievements не сохраняет:

    • IP адреса
    • точную геолокацию
    • сведения об устройстве
    • fingerprint браузера
    • cookies
    • пароли
    • адреса электронной почты
    • содержимое личных сообщений
    • историю просмотра сайтов
    • полную историю чтения статей
    • рекламные идентификаторы
    • внешние аналитические идентификаторы

Данные системы не отправляются в сторонние базы данных.

Весь игровой прогресс остаётся внутри самой Fandom вики.


===============================================================================
                         7. ЗАЩИТА ПРОГРЕССА
===============================================================================

Технические progress страницы защищаются AbuseFilter.

Это необходимо, чтобы пользователь не мог вручную изменить собственные
счётчики и самостоятельно выдать себе достижения.

AbuseFilter проверяет допустимость изменений progress записи.

Для отдельных значений предусмотрены ограничения на:

    • направление изменения
    • максимальный прирост
    • допустимое время
    • формат записи
    • структуру технической страницы

Отдельный AbuseFilter защищает progress страницы от перемещения.

AbuseFilter является встроенной системой Fandom / MediaWiki.


===============================================================================
                          8. СКРЫТЫЕ ДОСТИЖЕНИЯ
===============================================================================

Часть достижений является скрытой.

До выполнения условия пользователь не получает информацию,
позволяющую определить настоящий способ получения награды.

Вместо реального условия отображается:

    «Условие засекречено»

Для специального достижения:

    «Знает судьбу кевар»

используется тематическая надпись:

    «КРАСНАЯ ТИШИНА»

После получения скрытого достижения его условие считается раскрытым
для этого пользователя.

Если пользователь уже раскрыл данное достижение, система может
показывать ему настоящее описание и при просмотре того же достижения
у другого участника.

Это исключительно игровая механика интерфейса.


===============================================================================
                          9. FANDOM DISCUSSIONS
===============================================================================

Некоторые достижения относятся к публичному общению пользователей
на странице Discussions:

    /ru/f

Система может учитывать публично доступные:

    • публикации
    • ответы
    • участие в разных обсуждениях
    • количество публичных действий
    • полученные отметки «Нравится»
    • поставленные другим участникам отметки «Нравится»

Для Discussions используются только запросы чтения.

Система НЕ:

    • публикует сообщения от имени пользователя
    • изменяет сообщения
    • удаляет сообщения
    • выполняет модераторские действия
    • отправляет личные сообщения

Запросы выполняются только к инфраструктуре Fandom.

Для уменьшения нагрузки используется кэширование.

Если Discussions API недоступен или изменился, соответствующая часть
системы завершается безопасно и не должна нарушать работу остальных
достижений.


===============================================================================
                       10. ОТМЕТКИ «НРАВИТСЯ»
===============================================================================

Система различает:

    1. отметки, полученные публикациями пользователя;
    2. отметки, которые пользователь сам поставил другим участникам.

Для поставленных отметок хранится только необходимый агрегированный
счётчик прогресса.

Система не создаёт постоянный журнал того:

    • кому пользователь поставил отметку;
    • какое сообщение было отмечено;
    • какой текст содержался в публикации.

Эта информация не используется для построения пользовательского
профиля интересов.


===============================================================================
                            11. ЗАЛ СЛАВЫ
===============================================================================

Зал славы является внутренним рейтингом участников системы достижений.

В него включаются участники, имеющие хотя бы одно засчитанное
достижение и ненулевой игровой счёт.

Используются уже существующие данные системы и публичная статистика
вики.

Постоянный полный перебор всех зарегистрированных аккаунтов Fandom
не выполняется.

Для снижения нагрузки применяются:

    • ограниченные выборки
    • кэширование
    • существующие progress записи

Процент «Получили» рассчитывается относительно активных участников
системы достижений.


===============================================================================
                         12. ИНТЕРФЕЙС ПРОФИЛЯ
===============================================================================

В пользовательский профиль добавляется блок:

    «Официальные достижения»

В нём отображаются:

    • коллекция
    • последние достижения
    • редчайшие достижения
    • общий прогресс
    • очки
    • редкости
    • полный список наград
    • неполученные достижения
    • Зал славы

Система не заменяет профиль Fandom целиком.

Штатные элементы интерфейса Fandom сохраняются.

В актуальной версии Common.js НЕ удаляет и НЕ переносит:

    • «Сохранить»
    • «Править»
    • меню «⋮»

Стандартный right rail Fandom также не уничтожается.


===============================================================================
                      13. ВНЕШНИЕ РЕСУРСЫ
===============================================================================

LofarianAchievements не использует:

    • собственный внешний сервер
    • Firebase
    • Supabase
    • Google Analytics
    • сторонние базы данных
    • внешнее хранилище достижений
    • сторонние рекламные сервисы
    • удалённо исполняемый JavaScript

Изображения достижений являются обычными файлами,
загруженными непосредственно на эту Fandom вики.


===============================================================================
                        14. ЧИТАЕМОСТЬ КОДА
===============================================================================

Код намеренно не обфусцирован.

Основные функции, структуры и переменные имеют осмысленные названия.

Не используется скрытая загрузка внешнего исполняемого JavaScript.

Для уменьшения размера установленного Common.js удалена часть
устаревших комментариев разработки и избыточного форматирования.

Сама логика остаётся доступной для проверки.

Полный исходный вариант системы также сохраняется отдельно
в разработочном архиве.


===============================================================================
                         15. ПРОИЗВОДИТЕЛЬНОСТЬ
===============================================================================

Для уменьшения нагрузки используются:

    • кэширование каталога
    • кэширование Зала славы
    • кэширование Discussions
    • компактные progress записи
    • 256 сегментов progress
    • ограниченные запросы API
    • повторное использование уже вычисленных показателей
    • fail safe обработка ошибок дополнительных модулей

Система старается не выполнять повторные тяжёлые запросы,
если необходимые данные уже были получены ранее.


===============================================================================
                      16. АДМИНИСТРАТИВНЫЕ ФУНКЦИИ
===============================================================================

В Common.js присутствуют вспомогательные административные команды.

Они используются для:

    • диагностики системы
    • проверки изображений
    • тестового отображения popup
    • проверки каталога
    • обслуживания progress
    • выдачи или отзыва специальных наград администраторами

Тестовое отображение popup не изменяет официальный прогресс
пользователя.


===============================================================================
                         17. НАЗНАЧЕНИЕ СИСТЕМЫ
===============================================================================

LofarianAchievements является исключительно внутренней системой
геймификации сообщества.

Она предназначена для поощрения:

    • чтения материалов
    • редактирования статей
    • создания новых страниц
    • улучшения старых материалов
    • технической работы
    • длительной активности
    • общения в сообществе
    • участия в Discussions
    • исследования возможностей самой вики

Система не предназначена для скрытого наблюдения за пользователями,
рекламного профилирования или передачи пользовательских данных
третьим лицам.

Все используемые данные либо уже являются публичными данными
MediaWiki / Fandom, либо представляют собой минимальные агрегированные
игровые показатели, необходимые исключительно для расчёта достижений.


===============================================================================
                       18. ПРИМЕЧАНИЕ ДЛЯ REVIEW
===============================================================================

Если отдельная функция системы окажется несовместимой с актуальными
требованиями Fandom или изменениями внутреннего API, она может быть
отключена независимо от остальных компонентов.

Архитектура LofarianAchievements построена таким образом, чтобы
необязательные модули не являлись критической зависимостью
основной системы.

===============================================================================
                            END OF NOTICE
===============================================================================
*/

console.log('[Lofarian Achievements] Common.js запущен');

mw.loader.using([
    'mediawiki.api',
    'mediawiki.util'
]).then(function () {

    'use strict';

    var VERSION = 'TEST 1.16.3';
    var CATALOG_PAGE = 'Project:LofarianAchievementsData';
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

    var SECRET_SERVICE_PAGE_TITLE = 'Project:След Лофариана';
    var FORBIDDEN_ENTITY_TITLE = 'Архаил';
    var RED_THREAD_TITLES = [
        'Архаил',
        'Око Элу-Товир',
        'Нтарк-Кевари'
    ];


    /*
     * TEST 1.12.9: «Собиратель наград» — одна шестиступенчатая
     * цепочка, а не шесть независимых карточек. В effective map
     * хранится только текущая максимальная ступень. Предыдущие
     * исчезают из витрины, а будущие не засоряют «Неполученные».
     */
    function getAchievementCollectorState(catalog, achievementMap) {
        var sourceMap = {};

        Object.keys(achievementMap || {}).forEach(function (achievementId) {
            if (!ACHIEVEMENT_COUNT_MILESTONE_IDS[achievementId]) {
                sourceMap[achievementId] = achievementMap[achievementId];
            }
        });

        var logicalCount = calculateScore(
            catalog,
            sourceMap
        ).count;

        var current = null;
        var next = null;

        ACHIEVEMENT_COUNT_MILESTONES.forEach(function (item, index) {
            if (logicalCount >= item.threshold) {
                current = {
                    id: item.id,
                    threshold: item.threshold,
                    index: index
                };
            } else if (!next) {
                next = {
                    id: item.id,
                    threshold: item.threshold,
                    index: index
                };
            }
        });

        return {
            logicalCount: logicalCount,
            current: current,
            next: next
        };
    }


    function getAchievementCollectorProgressInfo(
        achievement,
        logicalCount
    ) {
        if (
            !achievement ||
            !ACHIEVEMENT_COUNT_MILESTONE_IDS[achievement.id]
        ) {
            return null;
        }

        logicalCount = Math.max(
            0,
            Math.floor(Number(logicalCount) || 0)
        );

        var index = -1;

        ACHIEVEMENT_COUNT_MILESTONES.some(function (item, itemIndex) {
            if (item.id === achievement.id) {
                index = itemIndex;
                return true;
            }
            return false;
        });

        if (index < 0) {
            return null;
        }

        var own = ACHIEVEMENT_COUNT_MILESTONES[index];
        var target = logicalCount >= own.threshold
            ? ACHIEVEMENT_COUNT_MILESTONES[index + 1]
            : own;

        if (!target) {
            return {
                complete: true,
                percent: 100,
                hidePercentLabel: true,
                text:
                    'Высшая стадия · ' +
                    formatCatalogInteger(own.threshold) +
                    ' / ' +
                    formatCatalogInteger(own.threshold)
            };
        }

        var percent = target.threshold > 0
            ? Math.max(
                0,
                Math.min(
                    100,
                    Math.floor(logicalCount / target.threshold * 100)
                )
            )
            : 100;

        return {
            complete: false,
            percent: percent,
            text:
                'До ' +
                romanAchievementLevel(target.index + 1) +
                ': ' +
                formatCatalogInteger(logicalCount) +
                ' / ' +
                formatCatalogInteger(target.threshold) +
                ' · ' +
                String(percent) +
                '%'
        };
    }

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

    /* TEST 1.14.0: пороги скрытых достижений. */
    var HIDDEN_QUICK_EDIT_MIN_ABS_BYTES = 200;
    var HIDDEN_QUICK_EDIT_COUNT = 4;
    var HIDDEN_QUICK_EDIT_WINDOW_SECONDS = 10 * 60;
    var HIDDEN_RETURN_GAP_SECONDS = 180 * 24 * 60 * 60;
    var HIDDEN_RETURN_DAY_MIN_EDITS = 3;
    var HIDDEN_FORGOTTEN_GAP_SECONDS = 730 * 24 * 60 * 60;
    var HIDDEN_THRICE_RETURN_GAP_SECONDS = 30 * 24 * 60 * 60;
    var HIDDEN_VOID_BEFORE_MAX_BYTES = 1500;
    var HIDDEN_VOID_AFTER_MIN_BYTES = 6000;
    var HIDDEN_VOID_MIN_GROWTH_BYTES = 4500;
    var HIDDEN_VOID_MIN_RATIO = 4;
    var HIDDEN_QUIET_MIN_ARTICLE_BYTES = 8000;
    var HIDDEN_QUIET_MAX_NET_BYTES = 120;
    var HIDDEN_PAIR_WINDOW_SECONDS = 60 * 60;
    var GLOBAL_SILENCE_SECONDS = 12 * 60 * 60;
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

    var api = new mw.Api();
    var catalogCache = null;
    var segmentCache = {};
    var userResolveCache = {};
    var progressSegmentCache = {};
    var editorStatsCache = {};
    var discussionStatsCache = {};
    var globalRecentChangesCache = null;
    var globalRecentChangesCacheAt = 0;
    var globalRecentChangesPromise = null;

    /*
     * Процент получения достижения считается по участникам,
     * которых система уже учитывает в Зале славы.
     *
     * Один общий кэш не даёт каждой карточке отдельно запускать
     * тяжёлый обход MediaWiki API.
     */
    var leaderboardRowsCache = null;
    var leaderboardRowsCacheAt = 0;
    var leaderboardBuildPromise = null;
    var LEADERBOARD_CACHE_MS = 15 * 60 * 1000;

    var LEADERBOARD_STORAGE_KEY =
        'lof-achievements-hall-cache-v3';

    var LEADERBOARD_STORAGE_MAX_AGE_MS =
        7 * 24 * 60 * 60 * 1000;

    var currentProgressState = null;
    var currentOfficialProgress = null;
    var currentProgressReady = null;
    var readingTrackerStarted = false;
    var currentProgressSyncPromise = null;


    /* ========================================================
     * ТЕХНИЧЕСКИЕ СТРАНИЦЫ НЕ ПОКАЗЫВАЕМ
     * ======================================================== */

    mw.util.addCSS(
        '.' + DATA_CLASS + '{display:none!important;}'
    );


    /* ========================================================
     * ОБЩИЕ ФУНКЦИИ
     * ======================================================== */

    function getCurrentUserName() {
        return mw.config.get('wgUserName');
    }

    function getCurrentUserId() {
        var id = Number(mw.config.get('wgUserId') || 0);
        return Number.isFinite(id) ? id : 0;
    }

    function escapeHtml(text) {
        return $('<div>')
            .text(String(text == null ? '' : text))
            .html();
    }

    function cloneData(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function nowUnix() {
        return Math.floor(Date.now() / 1000);
    }

    function registrationToUnix(value) {
        if (!value) {
            return 0;
        }

        var timestamp = Date.parse(String(value));

        return Number.isFinite(timestamp)
            ? Math.floor(timestamp / 1000)
            : 0;
    }

    function addAutomaticFirstLogin(
        catalog,
        user,
        achievementMap
    ) {
        var result = isPlainObject(achievementMap)
            ? cloneData(achievementMap)
            : {};

        if (
            !user ||
            !user.userid ||
            !getAchievement(catalog, FIRST_LOGIN_ID)
        ) {
            return result;
        }

        /*
         * Для очень старых аккаунтов registration иногда может
         * отсутствовать. Значение 1 означает: достижение есть,
         * но дату в профиле не показываем.
         */
        result[FIRST_LOGIN_ID] =
            Number(user.registrationUnix || 0) > 0
                ? Number(user.registrationUnix)
                : 1;

        return result;
    }

    function normalizeUserLookupKey(username) {
        return String(username || '')
            .replace(/_/g, ' ')
            .trim()
            .toLowerCase();
    }

    function isPlainObject(value) {
        return !!value &&
            typeof value === 'object' &&
            !Array.isArray(value);
    }


    /* ========================================================
     * DIV + NOWIKI ОБЁРТКА
     * ======================================================== */

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


    /* ========================================================
     * ЧТЕНИЕ И ЗАПИСЬ WIKI-СТРАНИЦ
     * ======================================================== */

    function readWikiPage(title) {
        return api.get({
            action: 'query',
            prop: 'revisions',
            titles: title,
            rvprop: 'ids|timestamp|content',
            rvslots: 'main',
            formatversion: 2
        }).then(function (data) {
            var page = data.query.pages[0];

            if (page.missing) {
                return {
                    title: title,
                    exists: false,
                    content: '',
                    revid: 0,
                    timestamp: null
                };
            }

            var revision = page.revisions && page.revisions[0];

            return {
                title: title,
                exists: true,
                content: revision && revision.slots && revision.slots.main
                    ? revision.slots.main.content || ''
                    : '',
                revid: revision ? revision.revid : 0,
                timestamp: revision ? revision.timestamp : null
            };
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


    /* ========================================================
     * ЗАЩИТА ТЕХНИЧЕСКИХ СТРАНИЦ
     * ======================================================== */

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


    /* ========================================================
     * ПРАВА
     * ======================================================== */

    function getUserInfo() {
        return api.get({
            action: 'query',
            meta: 'userinfo',
            uiprop: 'groups|rights',
            formatversion: 2
        }).then(function (data) {
            return data.query.userinfo;
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


    /* ========================================================
     * USERNAME -> ЧИСЛОВОЙ USER ID
     * ======================================================== */

    function resolveUser(username) {
        username = String(username || '').trim();

        if (!username) {
            return Promise.reject(
                new Error('Не указано имя пользователя.')
            );
        }

        var cacheKey =
            normalizeUserLookupKey(username);

        if (userResolveCache[cacheKey]) {
            return Promise.resolve(
                cloneData(userResolveCache[cacheKey])
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

            userResolveCache[cacheKey] =
                cloneData(result);

            return result;
        });
    }


    /* ========================================================
     * СЕГМЕНТИРОВАНИЕ: 00 ... FF
     * ======================================================== */

    function getSegmentNumber(userId) {
        userId = Number(userId);

        if (!Number.isFinite(userId) || userId <= 0) {
            throw new Error(
                'Некорректный user ID: ' + userId
            );
        }

        return Math.floor(userId) % SEGMENT_COUNT;
    }

    function getSegmentId(userId) {
        return getSegmentNumber(userId)
            .toString(16)
            .padStart(2, '0');
    }

    function getSegmentPageTitle(userId) {
        return USERS_PAGE_PREFIX + getSegmentId(userId);
    }


    /* ========================================================
     * КАТАЛОГ ДОСТИЖЕНИЙ
     * ======================================================== */

    function validateCatalog(catalog) {
        if (!isPlainObject(catalog)) {
            throw new Error(
                'Каталог достижений должен быть JSON-объектом.'
            );
        }

        if (!catalog.schemaVersion) {
            catalog.schemaVersion = 1;
        }

        if (!catalog.defaultImage) {
            catalog.defaultImage =
                'Достижение универсальное.png';
        }

        if (!isPlainObject(catalog.achievements)) {
            catalog.achievements = {};
        }

        if (!isPlainObject(catalog.families)) {
            catalog.families = {};
        }

        if (!isPlainObject(catalog.rarities)) {
            catalog.rarities = {};
        }

        if (!Array.isArray(catalog.rarityScale)) {
            catalog.rarityScale = [];
        }

        return catalog;
    }


    function readCatalog(forceReload) {
        if (
            catalogCache &&
            !forceReload
        ) {
            return Promise.resolve(
                cloneData(
                    catalogCache
                )
            );
        }

        return readWikiPage(
            CATALOG_PAGE
        ).then(function (page) {
            if (!page.exists) {
                throw new Error(
                    'Не существует каталог: ' +
                    CATALOG_PAGE
                );
            }

            var jsonText =
                extractJsonFromPage(
                    page.content
                );

            var catalog;

            try {
                catalog =
                    JSON.parse(
                        jsonText
                    );
            } catch (error) {
                console.error(
                    '[Lofarian Achievements] JSON каталога:',
                    jsonText
                );

                throw new Error(
                    'В ' +
                    CATALOG_PAGE +
                    ' находится некорректный JSON.'
                );
            }

            validateCatalog(
                catalog
            );

            catalogCache =
                cloneData(
                    catalog
                );

            return cloneData(
                catalog
            );
        });
    }


    function romanAchievementLevel(value) {
        value =
            Math.max(
                1,
                Math.min(
                    100,
                    Math.floor(
                        Number(value) || 1
                    )
                )
            );

        var parts = [
            [100, 'C'],
            [90, 'XC'],
            [50, 'L'],
            [40, 'XL'],
            [10, 'X'],
            [9, 'IX'],
            [5, 'V'],
            [4, 'IV'],
            [1, 'I']
        ];

        var result = '';

        parts.forEach(
            function (part) {
                while (
                    value >=
                    part[0]
                ) {
                    result +=
                        part[1];

                    value -=
                        part[0];
                }
            }
        );

        return result;
    }


    function getAchievementBaseTitle(
        achievement
    ) {
        var title =
            String(
                achievement &&
                achievement.title ||
                ''
            );

        var tier =
            Math.floor(
                Number(
                    achievement &&
                    achievement.tier
                ) || 0
            );

        if (tier <= 0) {
            return title;
        }

        var roman =
            romanAchievementLevel(
                tier
            );

        var suffix =
            ' ' +
            roman;

        if (
            title.slice(
                -suffix.length
            ) ===
                suffix
        ) {
            return title.slice(
                0,
                -suffix.length
            );
        }

        return title;
    }


    function getAchievementTierLabel(
        achievement
    ) {
        var tier =
            Math.floor(
                Number(
                    achievement &&
                    achievement.tier
                ) || 0
            );

        if (tier <= 0) {
            return '';
        }

        return romanAchievementLevel(
            tier
        );
    }


    function getAchievementCategoryTitle(
        category
    ) {
        var titles = {
            reading:
                'Чтение',

            editing:
                'Редактирование',

            creation:
                'Создание',

            activity:
                'Активность',

            communication:
                'Общение',

            special:
                'Особое'
        };

        return (
            titles[
                String(
                    category || ''
                )
            ] ||
            titles.special
        );
    }


    function formatCatalogInteger(value) {
        value =
            Math.max(
                0,
                Math.floor(
                    Number(value) || 0
                )
            );

        return String(value)
            .replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ' '
            );
    }


    function durationWord(
        value,
        one,
        few,
        many
    ) {
        value =
            Math.abs(
                Math.floor(
                    Number(value) || 0
                )
            );

        var mod100 =
            value % 100;

        var mod10 =
            value % 10;

        if (
            mod100 >= 11 &&
            mod100 <= 14
        ) {
            return many;
        }

        if (mod10 === 1) {
            return one;
        }

        if (
            mod10 >= 2 &&
            mod10 <= 4
        ) {
            return few;
        }

        return many;
    }


    function formatCatalogDuration(seconds) {
        seconds =
            Math.max(
                0,
                Math.floor(
                    Number(seconds) || 0
                )
            );

        if (seconds < 3600) {
            var minutes =
                Math.floor(
                    seconds / 60
                );

            return (
                formatCatalogInteger(
                    minutes
                ) +
                ' ' +
                durationWord(
                    minutes,
                    'минута',
                    'минуты',
                    'минут'
                )
            );
        }

        var hours =
            Math.floor(
                seconds / 3600
            );

        var remainingMinutes =
            Math.floor(
                (
                    seconds %
                    3600
                ) /
                60
            );

        var text =
            formatCatalogInteger(
                hours
            ) +
            ' ' +
            durationWord(
                hours,
                'час',
                'часа',
                'часов'
            );

        if (
            remainingMinutes >
            0
        ) {
            text +=
                ' ' +
                formatCatalogInteger(
                    remainingMinutes
                ) +
                ' ' +
                durationWord(
                    remainingMinutes,
                    'минута',
                    'минуты',
                    'минут'
                );
        }

        return text;
    }

    function formatCatalogDays(days) {
        days =
            Math.max(
                0,
                Math.floor(
                    Number(days) || 0
                )
            );

        if (days < 30) {
            return (
                formatCatalogInteger(days) +
                ' ' +
                durationWord(
                    days,
                    'день',
                    'дня',
                    'дней'
                )
            );
        }

        if (days < 365) {
            var months =
                Math.floor(
                    days / 30
                );

            var remainingDays =
                days % 30;

            var monthText =
                formatCatalogInteger(months) +
                ' ' +
                durationWord(
                    months,
                    'месяц',
                    'месяца',
                    'месяцев'
                );

            if (remainingDays > 0) {
                monthText +=
                    ' ' +
                    formatCatalogInteger(
                        remainingDays
                    ) +
                    ' ' +
                    durationWord(
                        remainingDays,
                        'день',
                        'дня',
                        'дней'
                    );
            }

            return monthText;
        }

        var years =
            Math.floor(
                days / 365
            );

        var remaining =
            days % 365;

        var text =
            formatCatalogInteger(years) +
            ' ' +
            durationWord(
                years,
                'год',
                'года',
                'лет'
            );

        if (remaining >= 30) {
            var remainingMonths =
                Math.floor(
                    remaining / 30
                );

            text +=
                ' ' +
                formatCatalogInteger(
                    remainingMonths
                ) +
                ' ' +
                durationWord(
                    remainingMonths,
                    'месяц',
                    'месяца',
                    'месяцев'
                );
        }

        return text;
    }



    function formatFamilyThreshold(
        family,
        value
    ) {
        if (
            family &&
            family.thresholdFormat ===
                'duration'
        ) {
            return formatCatalogDuration(
                value
            );
        }

        if (
            family &&
            family.thresholdFormat ===
                'days'
        ) {
            return formatCatalogDays(
                value
            );
        }

        return formatCatalogInteger(
            value
        );
    }


    function getRarityKeyForLevel(
        catalog,
        level
    ) {
        level =
            Math.max(
                1,
                Math.floor(
                    Number(level) || 1
                )
            );

        var scale =
            Array.isArray(
                catalog &&
                catalog.rarityScale
            )
                ? catalog.rarityScale
                : [];

        for (
            var i = 0;
            i < scale.length;
            i++
        ) {
            var band =
                scale[i] || {};

            if (
                level >=
                    Number(
                        band.from || 1
                    ) &&
                level <=
                    Number(
                        band.to || 100
                    ) &&
                band.rarity
            ) {
                return String(
                    band.rarity
                );
            }
        }

        return 'common';
    }


    function getRarityInfo(
        catalog,
        achievement
    ) {
        var key =
            achievement &&
            achievement.rarity
                ? String(
                    achievement.rarity
                )
                : 'common';

        /*
         * Совместимость со старым каталогом до TEST 1.11.0.
         * Старое uncommon соответствовало Примечательному,
         * старое exceptional — Выдающемуся.
         */
        var legacyAliases = {
            uncommon:
                'notable',

            exceptional:
                'outstanding'
        };

        if (
            legacyAliases[
                key
            ] &&
            catalog &&
            catalog.rarities &&
            catalog.rarities[
                legacyAliases[
                    key
                ]
            ]
        ) {
            key =
                legacyAliases[
                    key
                ];
        }

        var info =
            catalog &&
            catalog.rarities &&
            catalog.rarities[
                key
            ];

        if (!isPlainObject(info)) {
            info = {
                title:
                    'Обычная',

                groupTitle:
                    'Обычные',

                order:
                    1,

                grade:
                    1
            };
        }

        return {
            key:
                key,

            title:
                String(
                    info.title ||
                    'Обычная'
                ),

            groupTitle:
                String(
                    info.groupTitle ||
                    info.title ||
                    'Обычные'
                ),

            order:
                Math.floor(
                    Number(
                        info.order
                    ) || 1
                ),

            grade:
                Math.max(
                    1,
                    Math.min(
                        3,
                        Math.floor(
                            Number(
                                info.grade
                            ) || 1
                        )
                    )
                )
        };
    }


    /*
     * Чисто визуальная группировка для окна профиля.
     * Она не влияет на критерии, очки или выдачу.
     */
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


    function buildProfileProgressContext(
        protectedMap,
        progress,
        editorStats
    ) {
        progress =
            sanitizePublicProgress(
                progress,
                progress &&
                progress.username
            );

        editorStats =
            editorStats ||
            createEmptyEditorStats(
                progress.username
            );

        var localPresenceStart =
            getLocalWikiPresenceStartUnix(
                protectedMap || {},
                progress,
                editorStats.achievementMap ||
                {}
            );

        var starozhilDays =
            localPresenceStart > 0
                ? Math.max(
                    0,
                    Math.floor(
                        (
                            nowUnix() -
                            localPresenceStart
                        ) /
                        86400
                    )
                )
                : 0;

        var discussionStats =
            editorStats.discussionStats ||
            createEmptyDiscussionStats();

        return {
            __discussionStats:
                discussionStats,

            __directFacts: {
                editCount: Number(editorStats.editCount || 0),
                createdArticles: Number(editorStats.createdArticles || 0),
                maxNightEditsInOneDay: Number(editorStats.maxNightEditsInOneDay || 0),
                maxPositiveBytesInOneEdit: Number(editorStats.maxPositiveBytesInOneEdit || 0),
                roadCategories: Number(editorStats.roadCategories || 0),
                completedDrafts: Number(editorStats.completedDrafts || 0)
            },

            chronist:
                progress.articleCount,

            thoughtful_chronist:
                progress.activeSeconds,

            letopisets:
                editorStats.editCount,

            zodchiy:
                editorStats.createdArticles,

            multigran:
                editorStats.uniqueArticles,

            verny_letopisets:
                editorStats.distinctEditDays,

            neutomimoe_pero:
                editorStats.maxEditsInOneDay,

            vozvrashchenie_k_letopisi:
                Math.floor(
                    Number(
                        editorStats.maxReturnGapSeconds ||
                        0
                    ) /
                    86400
                ),

            chernilny_potok:
                editorStats.positiveBytes,

            chernilny_sled:
                editorStats.uniqueArticles,

            ruka_letopistsa:
                editorStats.majorEdits,

            hudozhnik:
                editorStats.uploadedFiles,

            starozhil:
                starozhilDays,

            neslomlennaya_tsep:
                editorStats.maxConsecutiveEditDays,

            probuzhdayushchiy_stranitsy:
                editorStats.awakenedArticles,

            ispravitel:
                editorStats.correctiveEdits,

            tkach_kategoriy:
                editorStats.createdCategories,

            tkach_shablonov:
                editorStats.createdTemplates,

            arkhivarius:
                editorStats.uniqueTechnicalPages,

            neutomimyy_zodchiy:
                editorStats.maxCreatedArticlesInOneDay,

            hranitel_drevnostey:
                Math.floor(
                    Number(
                        editorStats.maxDormantGapSeconds ||
                        0
                    ) /
                    86400
                ),

            chronist_era_zarozhdeniya:
                Number(
                    progress.themeArticleCounts &&
                    progress.themeArticleCounts
                        .era_zarozhdeniya ||
                    0
                ),

            thoughtful_era_zarozhdeniya:
                Number(
                    progress.themeActiveSeconds &&
                    progress.themeActiveSeconds
                        .era_zarozhdeniya ||
                    0
                ),

            chronist_era_drakona:
                Number(
                    progress.themeArticleCounts &&
                    progress.themeArticleCounts
                        .era_drakona ||
                    0
                ),

            thoughtful_era_drakona:
                Number(
                    progress.themeActiveSeconds &&
                    progress.themeActiveSeconds
                        .era_drakona ||
                    0
                ),

            chronist_kevariytsy:
                Number(
                    progress.themeArticleCounts &&
                    progress.themeArticleCounts
                        .kevariytsy ||
                    0
                ),

            thoughtful_kevariytsy:
                Number(
                    progress.themeActiveSeconds &&
                    progress.themeActiveSeconds
                        .kevariytsy ||
                    0
                ),

            comm_voice:
                Number(
                    discussionStats.total ||
                    0
                ),

            comm_given_like:
                Number(
                    progress.likesGivenCount ||
                    0
                )
        };
    }


    function buildThresholdProgressInfo(currentValue, threshold) {
        currentValue = Math.max(0, Number(currentValue) || 0);
        threshold = Math.max(1, Number(threshold) || 1);

        var percent = Math.max(
            0,
            Math.min(100, Math.floor(currentValue / threshold * 100))
        );

        return {
            complete: currentValue >= threshold,
            percent: percent,
            text:
                String(Math.floor(currentValue)) +
                ' / ' +
                String(Math.floor(threshold)) +
                ' · ' +
                String(percent) +
                '%'
        };
    }


    function getDirectAchievementProgressInfo(achievement, progressContext) {
        var rule = achievement && DIRECT_PROGRESS_RULE_BY_ID[achievement.id];
        var facts = progressContext && progressContext.__directFacts;

        if (!rule || !facts) {
            return null;
        }

        return buildThresholdProgressInfo(
            facts[rule.key],
            rule.threshold
        );
    }


    function getDiscussionAchievementProgressInfo(achievement, progressContext) {
        if (
            !achievement ||
            achievement.hidden === true ||
            achievement.secret === true
        ) {
            return null;
        }

        var rule = DISCUSSION_RULE_BY_ID[achievement.id];
        var stats = progressContext && progressContext.__discussionStats;

        if (!rule || !stats) {
            return null;
        }

        return buildThresholdProgressInfo(
            getDiscussionRuleCurrentValue(rule, stats),
            rule.threshold
        );
    }


    function getStagedAchievementProgressInfo(
        achievement,
        progressContext
    ) {
        if (!achievement) {
            return null;
        }

        var info =
            STAGED_ACHIEVEMENT_ID_INFO[achievement.id];

        if (!info) {
            return null;
        }

        /* «Собиратель наград» использует свой логический счётчик. */
        if (ACHIEVEMENT_COUNT_MILESTONE_IDS[achievement.id]) {
            return getAchievementCollectorProgressInfo(
                achievement,
                progressContext &&
                    progressContext.__achievementCollectorCount
            );
        }

        var facts =
            progressContext &&
            progressContext.__metaFacts;

        var discussionStats =
            progressContext &&
            progressContext.__discussionStats;

        var currentRule = META_RULE_BY_ID[achievement.id] || null;
        var currentValue = 0;
        var ruleSource = 'meta';

        if (currentRule && facts) {
            currentValue = Math.max(
                0,
                Number(metaRuleCurrentValue(currentRule, facts)) || 0
            );
        } else {
            currentRule = DISCUSSION_RULE_BY_ID[achievement.id] || null;
            ruleSource = 'discussion';

            if (currentRule && discussionStats) {
                currentValue = Math.max(
                    0,
                    Number(getDiscussionRuleCurrentValue(currentRule, discussionStats)) || 0
                );
            }
        }

        if (!currentRule) {
            return null;
        }

        var targetIndex =
            currentValue >= Number(currentRule.threshold || 0)
                ? info.index + 1
                : info.index;

        if (targetIndex >= info.series.ids.length) {
            var finalThreshold = Math.max(
                1,
                Number(currentRule.threshold) || 1
            );

            return {
                complete: true,
                percent: 100,
                hidePercentLabel: true,
                text:
                    'Высшая стадия · ' +
                    String(
                        Math.min(
                            Math.floor(currentValue),
                            Math.floor(finalThreshold)
                        )
                    ) +
                    ' / ' +
                    String(Math.floor(finalThreshold))
            };
        }

        var targetId = info.series.ids[targetIndex];
        var targetRule =
            ruleSource === 'discussion'
                ? DISCUSSION_RULE_BY_ID[targetId]
                : META_RULE_BY_ID[targetId];

        if (!targetRule) {
            return null;
        }

        var threshold = Math.max(
            1,
            Number(targetRule.threshold) || 1
        );

        var percent = Math.max(
            0,
            Math.min(
                100,
                Math.floor(currentValue / threshold * 100)
            )
        );

        return {
            complete: false,
            percent: percent,
            text:
                'До ' +
                romanAchievementLevel(targetIndex + 1) +
                ': ' +
                String(Math.floor(currentValue)) +
                ' / ' +
                String(Math.floor(threshold)) +
                ' · ' +
                String(percent) +
                '%'
        };
    }


    function getAchievementProgressInfo(
        catalog,
        achievement,
        progressContext
    ) {
        if (
            achievement &&
            STAGED_ACHIEVEMENT_ID_INFO[achievement.id]
        ) {
            return getStagedAchievementProgressInfo(
                achievement,
                progressContext
            );
        }

        if (
            achievement &&
            META_ACHIEVEMENT_IDS[achievement.id]
        ) {
            return getMetaAchievementProgressInfo(
                achievement,
                progressContext &&
                    progressContext.__metaFacts
            );
        }

        if (
            achievement &&
            DISCUSSION_RULE_BY_ID[achievement.id]
        ) {
            return getDiscussionAchievementProgressInfo(
                achievement,
                progressContext
            );
        }

        if (
            achievement &&
            DIRECT_PROGRESS_RULE_BY_ID[achievement.id]
        ) {
            return getDirectAchievementProgressInfo(
                achievement,
                progressContext
            );
        }

        if (
            !achievement ||
            !achievement.family ||
            !achievement.tier ||
            !catalog ||
            !catalog.families
        ) {
            return null;
        }

        var family =
            catalog.families[
                achievement.family
            ];

        if (
            !family ||
            !Array.isArray(
                family.thresholds
            )
        ) {
            return null;
        }

        var level =
            Math.floor(
                Number(
                    achievement.tier
                ) || 0
            );

        if (
            level >=
            family.thresholds.length
        ) {
            var finalThreshold = Number(
                family.thresholds[family.thresholds.length - 1] || 0
            );

            return {
                complete:
                    true,

                percent:
                    100,

                hidePercentLabel:
                    true,

                text:
                    'Высшая стадия · ' +
                    formatFamilyThreshold(
                        family,
                        finalThreshold
                    ) +
                    ' / ' +
                    formatFamilyThreshold(
                        family,
                        finalThreshold
                    )
            };
        }

        var currentValue =
            Number(
                progressContext &&
                progressContext[
                    achievement.family
                ]
            );

        if (!Number.isFinite(currentValue)) {
            return {
                complete:
                    false,

                percent:
                    null,

                text:
                    'Следующая ступень: ' +
                    romanAchievementLevel(
                        level + 1
                    ) +
                    ' · ' +
                    formatFamilyThreshold(
                        family,
                        family.thresholds[
                            level
                        ]
                    )
            };
        }

        var nextThreshold =
            Number(
                family.thresholds[
                    level
                ]
            );

        var percent =
            nextThreshold > 0
                ? Math.max(
                    0,
                    Math.min(
                        100,
                        Math.floor(
                            currentValue /
                            nextThreshold *
                            100
                        )
                    )
                )
                : 100;

        return {
            complete:
                false,

            percent:
                percent,

            text:
                'До ' +
                romanAchievementLevel(
                    level + 1
                ) +
                ': ' +
                formatFamilyThreshold(
                    family,
                    currentValue
                ) +
                ' / ' +
                formatFamilyThreshold(
                    family,
                    nextThreshold
                ) +
                ' · ' +
                String(
                    percent
                ) +
                '%'
        };
    }


    function getProfileViewedStorageKey(
        userId
    ) {
        return (
            'lof-achievements-profile-viewed-v1:user:' +
            String(
                userId || 0
            )
        );
    }


    function loadProfileUnreadAchievementMap(
        userId,
        achievementMap
    ) {
        if (
            Number(
                userId
            ) !==
            Number(
                getCurrentUserId()
            )
        ) {
            return {};
        }

        var key =
            getProfileViewedStorageKey(
                userId
            );

        var viewed =
            null;

        try {
            var raw =
                localStorage.getItem(
                    key
                );

            if (raw) {
                viewed =
                    JSON.parse(
                        raw
                    );
            }
        } catch (error) {
            viewed =
                null;
        }

        /*
         * Первый запуск новой визуальной системы не помечает всю
         * старую коллекцию как "новую". Создаём исходную отметку.
         */
        if (!isPlainObject(viewed)) {
            viewed = {};

            Object.keys(
                achievementMap || {}
            ).forEach(function (achievementId) {
                viewed[
                    achievementId
                ] =
                    Number(
                        achievementMap[
                            achievementId
                        ] || 1
                    );
            });

            try {
                localStorage.setItem(
                    key,
                    JSON.stringify(
                        viewed
                    )
                );
            } catch (error) {
                /* no-op */
            }

            return {};
        }

        var unread = {};

        Object.keys(
            achievementMap || {}
        ).forEach(function (achievementId) {
            var earnedAt =
                Number(
                    achievementMap[
                        achievementId
                    ] || 1
                );

            var viewedAt =
                Number(
                    viewed[
                        achievementId
                    ] || 0
                );

            if (
                !viewedAt ||
                earnedAt >
                    viewedAt
            ) {
                unread[
                    achievementId
                ] =
                    true;
            }
        });

        return unread;
    }


    function markProfileAchievementViewed(
        userId,
        achievementId,
        earnedAt
    ) {
        if (
            Number(
                userId
            ) !==
            Number(
                getCurrentUserId()
            )
        ) {
            return;
        }

        var key =
            getProfileViewedStorageKey(
                userId
            );

        var viewed = {};

        try {
            viewed =
                JSON.parse(
                    localStorage.getItem(
                        key
                    ) ||
                    '{}'
                );
        } catch (error) {
            viewed = {};
        }

        if (!isPlainObject(viewed)) {
            viewed = {};
        }

        viewed[
            String(
                achievementId
            )
        ] =
            Math.max(
                1,
                Number(
                    earnedAt
                ) || nowUnix()
            );

        try {
            localStorage.setItem(
                key,
                JSON.stringify(
                    viewed
                )
            );
        } catch (error) {
            /* no-op */
        }

        document.querySelectorAll(
            '[data-lof-achievement-id="' +
            String(
                achievementId
            ).replace(
                /"/g,
                '\\"'
            ) +
            '"]'
        ).forEach(function (node) {
            node.classList.remove(
                'is-new-achievement'
            );

            node.querySelectorAll(
                '.lof-profile-rail-new-mark, ' +
                '.lof-profile-achievement-new-mark'
            ).forEach(function (mark) {
                mark.remove();
            });
        });
    }


    function getAchievement(
        catalog,
        achievementId
    ) {
        achievementId =
            String(
                achievementId || ''
            );

        if (
            !catalog ||
            !achievementId
        ) {
            return null;
        }

        /*
         * Одиночные достижения хранятся напрямую.
         */
        var direct =
            catalog.achievements &&
            catalog.achievements[
                achievementId
            ];

        if (direct) {
            var directResult =
                cloneData(
                    direct
                );

            directResult.id =
                achievementId;

            if (!directResult.rarity) {
                directResult.rarity =
                    'common';
            }

            /*
             * TEST 1.14.2: у самостоятельных серий с I / II / III...
             * римская ступень оформляется тем же штатным бейджем, что и
             * у уровневых цепочек, а не остаётся частью строки названия.
             */
            var stagedDisplayInfo =
                STAGED_ACHIEVEMENT_ID_INFO[achievementId];

            if (
                stagedDisplayInfo &&
                stagedDisplayInfo.series &&
                stagedDisplayInfo.series.displayTier === true
            ) {
                directResult.tier = stagedDisplayInfo.index + 1;
                directResult.stageSeries = stagedDisplayInfo.series.key;
            }

            return directResult;
        }

        /*
         * Уровневые достижения больше не занимают
         * сто полных JSON-объектов каждое.
         *
         * Пример:
         * letopisets_47
         * thoughtful_chronist_100
         */
        var match =
            achievementId.match(
                /^(.+)_([0-9]{2,3})$/
            );

        if (
            !match ||
            !catalog.families
        ) {
            return null;
        }

        var familyId =
            match[1];

        var level =
            Number(
                match[2]
            );

        var family =
            catalog.families[
                familyId
            ];

        if (
            !isPlainObject(family) ||
            !Array.isArray(
                family.thresholds
            ) ||
            level < 1 ||
            level >
                family.thresholds.length
        ) {
            return null;
        }

        var threshold =
            family.thresholds[
                level - 1
            ];

        var formattedThreshold =
            formatFamilyThreshold(
                family,
                threshold
            );

        var description =
            String(
                family.descriptionTemplate ||
                ''
            ).replace(
                /\{value\}/g,
                formattedThreshold
            );

        return {
            id:
                achievementId,

            title:
                String(
                    family.title ||
                    familyId
                ) +
                ' ' +
                romanAchievementLevel(
                    level
                ),

            description:
                description,

            image:
                family.imageTemplate
                    ? String(family.imageTemplate)
                        .replace(/\{roman\}/g, romanAchievementLevel(level))
                        .replace(/\{level\}/g, String(level))
                    : (family.image || catalog.defaultImage),

            points:
                Math.max(
                    0,
                    Math.floor(
                        Number(family.pointsBase) || 0
                    ) +
                    Math.floor(
                        Number(
                            family.pointsPerLevel
                        ) || 0
                    ) *
                    level
                ),

            hidden:
                family.hidden === true,

            secret:
                family.secret === true,

            family:
                familyId,

            tier:
                level,

            category:
                family.category ||
                'special',

            rarity:
                family.rarity ||
                getRarityKeyForLevel(
                    catalog,
                    level
                )
        };
    }


    function forEachCatalogAchievement(
        catalog,
        callback
    ) {
        Object.keys(
            catalog.achievements ||
            {}
        ).forEach(function (id) {
            var achievement =
                getAchievement(
                    catalog,
                    id
                );

            if (achievement) {
                callback(
                    id,
                    achievement
                );
            }
        });

        Object.keys(
            catalog.families ||
            {}
        ).forEach(function (familyId) {
            var family =
                catalog.families[
                    familyId
                ];

            if (
                !family ||
                !Array.isArray(
                    family.thresholds
                )
            ) {
                return;
            }

            for (
                var level = 1;
                level <=
                    family.thresholds.length;
                level++
            ) {
                var id =
                    familyId +
                    '_' +
                    String(level)
                        .padStart(
                            2,
                            '0'
                        );

                var achievement =
                    getAchievement(
                        catalog,
                        id
                    );

                if (achievement) {
                    callback(
                        id,
                        achievement
                    );
                }
            }
        });
    }



function getStagedAchievementSeriesState(
    achievementMap,
    series
) {
    achievementMap = isPlainObject(achievementMap)
        ? achievementMap
        : {};

    var currentIndex = -1;

    (series && Array.isArray(series.ids) ? series.ids : [])
        .forEach(function (achievementId, index) {
            if (achievementMap[achievementId]) {
                currentIndex = Math.max(currentIndex, index);
            }
        });

    return {
        currentIndex: currentIndex,
        currentId:
            currentIndex >= 0 && series && series.ids
                ? series.ids[currentIndex]
                : null,
        nextIndex:
            series && series.ids && currentIndex + 1 < series.ids.length
                ? currentIndex + 1
                : -1,
        nextId:
            series && series.ids && currentIndex + 1 < series.ids.length
                ? series.ids[currentIndex + 1]
                : null
    };
}


function collapseStagedAchievementSeries(
    achievementMap
) {
    achievementMap = isPlainObject(achievementMap)
        ? achievementMap
        : {};

    STAGED_ACHIEVEMENT_SERIES.forEach(function (series) {
        var state = getStagedAchievementSeriesState(
            achievementMap,
            series
        );

        if (state.currentIndex < 0) {
            return;
        }

        var keepId = state.currentId;
        var keepAt = Number(achievementMap[keepId] || 0);

        series.ids.forEach(function (achievementId) {
            if (achievementId !== keepId) {
                delete achievementMap[achievementId];
            }
        });

        achievementMap[keepId] = keepAt || 1;
    });

    return achievementMap;
}


function viewerKnowsHiddenAchievement(
    viewerAchievementMap,
    achievementId
) {
    return !!(
        isPlainObject(viewerAchievementMap) &&
        viewerAchievementMap[String(achievementId || '')]
    );
}


function collectProfileUnearnedTargets(
    catalog,
    achievementMap,
    profileProgressContext
) {
    var result = [];

    achievementMap =
        isPlainObject(
            achievementMap
        )
            ? achievementMap
            : {};


    var collectorState =
        getAchievementCollectorState(
            catalog,
            achievementMap
        );

    var collectorProgressContext =
        Object.assign(
            {},
            profileProgressContext || {},
            {
                __achievementCollectorCount:
                    collectorState.logicalCount
            }
        );

    /*
     * TEST 1.12.3:
     * Будущие ступени уровневых цепочек I–C в «Неполученные»
     * больше не выводятся вообще, включая ближайшую следующую.
     *
     * Здесь остаются только самостоятельные достижения из
     * catalog.achievements. Скрытые и секретные самостоятельные
     * достижения видны как карточки, но их условие и прогресс
     * до получения маскируются. Hall Top-500/100/10 являются
     * текущими динамическими статусами и не показываются как цели.
     */
    Object.keys(
        catalog.achievements || {}
    ).forEach(function (achievementId) {
        var stagedInfo =
            STAGED_ACHIEVEMENT_ID_INFO[achievementId];

        if (stagedInfo) {
            /*
             * TEST 1.14.1:
             * у многоступенчатых самостоятельных серий в «Неполученные»
             * не выводятся ни уже пройденные, ни будущие ступени.
             * Если серия ещё не начата, показывается только первая стадия.
             */
            var stagedState =
                getStagedAchievementSeriesState(
                    achievementMap,
                    stagedInfo.series
                );

            if (stagedState.currentIndex >= 0) {
                return;
            }

            if (stagedInfo.index !== 0) {
                return;
            }
        }

        if (
            achievementMap[
                achievementId
            ]
        ) {
            return;
        }

        if (
            achievementId ===
                HALL_TOP_500_ID ||
            achievementId ===
                HALL_TOP_100_ID ||
            achievementId ===
                HALL_TOP_10_ID
        ) {
            return;
        }

        var achievement =
            getAchievement(
                catalog,
                achievementId
            );

        if (!achievement) {
            return;
        }

        var concealCondition =
            achievement.hidden === true ||
            achievement.secret === true;

        result.push({
            id:
                achievementId,

            achievement:
                achievement,

            earnedAt:
                null,

            earned:
                false,

            category:
                getAchievementVisualCategory(
                    achievementId,
                    achievement
                ),

            progressInfo:
                concealCondition
                    ? null
                    : getAchievementProgressInfo(
                        catalog,
                        achievement,
                        ACHIEVEMENT_COUNT_MILESTONE_IDS[achievementId]
                            ? collectorProgressContext
                            : profileProgressContext
                    ),

            concealCondition:
                concealCondition,

            isNew:
                false
        });
    });

    return result;
}


function buildHiddenConditionNoise(achievementId) {
    /*
     * TEST 1.12.5:
     * у скрытых/тайных достижений больше нет декоративного шума.
     * Для кеварийского секретного достижения оставлена отдельная
     * каноническая формулировка.
     */
    if (
        String(achievementId || '') ===
        'znaet_sudbu_kevar'
    ) {
        return 'КРАСНАЯ ТИШИНА';
    }

    return 'Условие засекречено';
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

    function pointsWord(value) {
        value = Math.abs(Number(value) || 0);
        var mod100 = value % 100;
        var mod10 = value % 10;

        if (mod100 >= 11 && mod100 <= 14) {
            return 'очков';
        }

        if (mod10 === 1) {
            return 'очко';
        }

        if (mod10 >= 2 && mod10 <= 4) {
            return 'очка';
        }

        return 'очков';
    }

    function formatPoints(value) {
        value = Math.max(
            0,
            Math.floor(Number(value) || 0)
        );

        return value + ' ' + pointsWord(value);
    }


    function getTierLevel(thresholds, value) {
        value = Math.max(0, Number(value) || 0);
        var level = 0;
        for (var i = 0; i < thresholds.length; i++) {
            if (value >= thresholds[i]) {
                level = i + 1;
            } else {
                break;
            }
        }
        return level;
    }

    function tierAchievementId(prefix, level) {
        level = Math.max(
            1,
            Math.min(
                100,
                Math.floor(
                    Number(level) || 1
                )
            )
        );

        return prefix +
            String(level).padStart(2, '0');
    }

    function isAutomaticProgressAchievementId(achievementId) {
        achievementId =
            String(
                achievementId || ''
            );

        if (
            META_ACHIEVEMENT_IDS[achievementId] ||
            HIDDEN_AUTOMATIC_ACHIEVEMENT_IDS[achievementId]
        ) {
            return true;
        }

        return (
            /^(?:chronist|thoughtful_chronist|letopisets|zodchiy|multigran|verny_letopisets|neutomimoe_pero|vozvrashchenie_k_letopisi|chernilny_potok|chernilny_sled|ruka_letopistsa|hudozhnik|starozhil|neslomlennaya_tsep|probuzhdayushchiy_stranitsy|ispravitel|tkach_kategoriy|tkach_shablonov|arkhivarius|neutomimyy_zodchiy|hranitel_drevnostey|chronist_era_zarozhdeniya|thoughtful_era_zarozhdeniya|chronist_era_drakona|thoughtful_era_drakona|chronist_kevariytsy|thoughtful_kevariytsy|comm_voice|comm_given_like)_(?:0[1-9]|[1-9][0-9]|100)$/.test(
                achievementId
            ) ||
            /^(?:first_edit|sozidatel|night_hero|tysyacha_strok|sto_dorog|zavershitel|hall_top_500|hall_top_100|hall_top_10|achievement_collector_5|achievement_collector_10|achievement_collector_25|achievement_collector_50|achievement_collector_75|achievement_collector_100)$/.test(
                achievementId
            )
        );
    }

    function normalizeProgressUsername(username) {
        return String(username || '')
            .replace(/_/g, ' ')
            .trim();
    }


    function countCharacter(text, character) {
        var count = 0;

        Array.from(text).forEach(function (item) {
            if (item === character) {
                count += 1;
            }
        });

        return count;
    }


    /*
     * ВАЖНО:
     * Эта формула ДОЛЖНА совпадать с формулой AbuseFilter.
     * Хэш не является защитой. Он только определяет один из
     * 256 сегментов. Защиту выполняет сам AbuseFilter.
     */
    function getProgressSegmentNumber(username) {
        var name =
            normalizeProgressUsername(username)
                .toLowerCase();

        var hash =
            Array.from(name).length * 71;

        var weights = {
            'a': 3,
            'e': 5,
            'i': 7,
            'o': 11,
            'u': 13,
            'y': 17,
            'а': 19,
            'е': 23,
            'ё': 29,
            'и': 31,
            'о': 37,
            'у': 41,
            'ы': 43,
            'э': 47,
            'ю': 53,
            'я': 59,
            '0': 61,
            '1': 67,
            '2': 71,
            '3': 73,
            '4': 79,
            '5': 83,
            '6': 89,
            '7': 97,
            '8': 101,
            '9': 103,
            ' ': 107
        };

        Object.keys(weights)
            .forEach(function (character) {
                hash +=
                    countCharacter(
                        name,
                        character
                    ) *
                    weights[character];
            });

        return (
            (hash % PROGRESS_SEGMENT_COUNT) +
            PROGRESS_SEGMENT_COUNT
        ) % PROGRESS_SEGMENT_COUNT;
    }


    function getProgressSegmentTitle(username) {
        return (
            PROGRESS_PAGE_PREFIX +
            String(
                getProgressSegmentNumber(
                    username
                )
            )
        );
    }



    /* ========================================================
     * РЕДАКТОРСКИЕ ДОСТИЖЕНИЯ
     * Источник: серверная история MediaWiki usercontribs, ns 0.
     * ======================================================== */

    function createEmptyEditorStats(username) {
        return {
            username:
                normalizeProgressUsername(
                    username
                ),

            scannedEdits: 0,
            editCount: 0,
            createdArticles: 0,
            uniqueArticles: 0,
            distinctEditDays: 0,
            maxEditsInOneDay: 0,
            maxReturnGapSeconds: 0,
            positiveBytes: 0,
            majorEdits: 0,
            uploadedFiles: 0,

            maxConsecutiveEditDays: 0,
            correctiveEdits: 0,
            createdCategories: 0,
            createdTemplates: 0,
            uniqueTechnicalPages: 0,
            maxCreatedArticlesInOneDay: 0,
            awakenedArticles: 0,
            maxDormantGapSeconds: 0,
            roadCategories: 0,
            completedDrafts: 0,
            maxNightEditsInOneDay: 0,
            maxPositiveBytesInOneEdit: 0,
            nightHero: false,
            thousandLines: false,

            hiddenQuickEdits: false,
            hiddenForgottenPage: false,
            hiddenReturningChronicler: false,
            hiddenOneAgainstVoid: false,
            hiddenQuietCorrector: false,
            hiddenDawnTrace: false,
            hiddenThriceReturned: false,
            hiddenWithoutTraces: false,
            hiddenRedThread: false,
            hiddenFirstAfterSilence: false,
            hiddenLastPage: false,

            discussionStats: {
                total: 0,
                threads: 0,
                replies: 0,
                uniqueThreads: 0,
                maxActionsInDay: 0,
                firstAt: 0,
                latestAt: 0,
                achievementMap: {}
            },

            firstEditAt: 0,
            firstCreatedArticleAt: 0,

            letopisetsLevel: 0,
            zodchiyLevel: 0,
            multigranLevel: 0,
            vernyLetopisetsLevel: 0,
            neugasimyRoscherkLevel: 0,
            vozvrashchenieLevel: 0,
            chernilnyPotokLevel: 0,
            chernilnySledLevel: 0,
            rukaLetopistsaLevel: 0,
            hudozhnikLevel: 0,

            neslomlennayaTsepLevel: 0,
            probuzhdayushchiyLevel: 0,
            ispravitelLevel: 0,
            tkachKategoriyLevel: 0,
            tkachShablonovLevel: 0,
            arkhivariusLevel: 0,
            neutomimyyZodchiyLevel: 0,
            hranitelDrevnosteyLevel: 0,

            achievementMap: {}
        };
    }

    function timestampToUnix(value) {
        var parsed = Date.parse(String(value || ''));
        return Number.isFinite(parsed)
            ? Math.floor(parsed / 1000)
            : 0;
    }

    function utcDayFromTimestamp(value) {
        value = String(value || '');
        return /^\d{4}-\d{2}-\d{2}T/.test(value)
            ? value.slice(0, 10)
            : '';
    }

    function fetchNamespaceContributions(
        user,
        namespaceNumber,
        limit,
        showFilter
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


    function fetchArticleContributions(user) {
        return fetchNamespaceContributions(
            user,
            0,
            EDITOR_SCAN_LIMIT,
            null
        );
    }


    function fetchGlobalRecentChanges() {
        if (
            globalRecentChangesCache &&
            Date.now() - globalRecentChangesCacheAt <
                GLOBAL_RECENT_CHANGES_CACHE_MS
        ) {
            return Promise.resolve(
                cloneData(globalRecentChangesCache)
            );
        }

        if (globalRecentChangesPromise) {
            return globalRecentChangesPromise.then(
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

        globalRecentChangesPromise = next(null)
            .then(function (result) {
                globalRecentChangesCache =
                    cloneData(result);
                globalRecentChangesCacheAt =
                    Date.now();
                globalRecentChangesPromise = null;
                return result;
            })
            .catch(function (error) {
                globalRecentChangesPromise = null;
                console.warn(
                    '[Lofarian Achievements] recentchanges для скрытых достижений недоступен:',
                    error
                );
                return [];
            });

        return globalRecentChangesPromise.then(
            function (result) {
                return cloneData(result);
            }
        );
    }


    function fetchCreatedArticleContributions(user) {
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
            'new'
        );
    }


    function analyzeCreatedArticleContributions(
        user,
        contributions
    ) {
        var result = {
            createdArticles: 0,
            firstCreatedArticleAt: 0,
            zodchiyLevel: 0,
            zodchiyAwardAt: 0,
            maxCreatedArticlesInOneDay: 0,
            neutomimyyZodchiyLevel: 0,
            neutomimyyZodchiyAwardAt: 0,
            achievementMap: {}
        };

        var dailyCreated = {};

        contributions =
            Array.isArray(contributions)
                ? contributions
                : [];

        contributions.forEach(
            function (item) {
                item =
                    item || {};

                var unix =
                    timestampToUnix(
                        item.timestamp
                    );

                if (unix <= 0) {
                    return;
                }

                result.createdArticles +=
                    1;

                if (
                    !result.firstCreatedArticleAt
                ) {
                    result.firstCreatedArticleAt =
                        unix;

                    result.achievementMap[
                        SOZIDATEL_ID
                    ] =
                        unix;
                }

                var nextLevel =
                    getTierLevel(
                        ZODCHIY_THRESHOLDS,
                        result.createdArticles
                    );

                if (
                    nextLevel >
                    result.zodchiyLevel
                ) {
                    result.zodchiyLevel =
                        nextLevel;

                    result.zodchiyAwardAt =
                        unix;
                }

                var day =
                    utcDayFromTimestamp(
                        item.timestamp
                    );

                if (day) {
                    dailyCreated[day] =
                        Number(
                            dailyCreated[day] || 0
                        ) + 1;

                    result.maxCreatedArticlesInOneDay =
                        Math.max(
                            result.maxCreatedArticlesInOneDay,
                            dailyCreated[day]
                        );

                    var nextDailyLevel =
                        getTierLevel(
                            NEUTOMIMYY_ZODCHIY_THRESHOLDS,
                            dailyCreated[day]
                        );

                    if (
                        nextDailyLevel >
                        result.neutomimyyZodchiyLevel
                    ) {
                        result.neutomimyyZodchiyLevel =
                            nextDailyLevel;

                        result.neutomimyyZodchiyAwardAt =
                            unix;
                    }
                }
            }
        );

        if (
            result.zodchiyLevel >
            0
        ) {
            result.achievementMap[
                tierAchievementId(
                    ZODCHIY_PREFIX,
                    result.zodchiyLevel
                )
            ] =
                result.zodchiyAwardAt ||
                result.firstCreatedArticleAt ||
                1;
        }

        if (
            result.neutomimyyZodchiyLevel >
            0
        ) {
            result.achievementMap[
                tierAchievementId(
                    NEUTOMIMYY_ZODCHIY_PREFIX,
                    result.neutomimyyZodchiyLevel
                )
            ] =
                result.neutomimyyZodchiyAwardAt ||
                result.firstCreatedArticleAt ||
                1;
        }

        return result;
    }


    function fetchUploadLogEvents(user) {
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


    function analyzeUploadLogEvents(
        user,
        events
    ) {
        var result = {
            uploadedFiles: 0,
            hudozhnikLevel: 0,
            hudozhnikAwardAt: 0
        };

        events =
            Array.isArray(events)
                ? events
                : [];

        events.forEach(
            function (item) {
                item =
                    item || {};

                var unix =
                    timestampToUnix(
                        item.timestamp
                    );

                if (unix <= 0) {
                    return;
                }

                /*
                 * Запрос уже отфильтрован через
                 * leaction=upload/upload.
                 */
                result.uploadedFiles +=
                    1;

                var nextLevel =
                    getTierLevel(
                        HUDOZHNIK_THRESHOLDS,
                        result.uploadedFiles
                    );

                if (
                    nextLevel >
                    result.hudozhnikLevel
                ) {
                    result.hudozhnikLevel =
                        nextLevel;

                    result.hudozhnikAwardAt =
                        unix;
                }
            }
        );

        return result;
    }


    function analyzeEditorContributions(user, contributions) {
        var stats =
            createEmptyEditorStats(
                user.name
            );

        var map = {};
        var uniquePages = {};
        var editDays = {};
        var dailyCounts = {};
        var nightlyCounts = {};
        var previousUnix = 0;
        var previousDayIndex = null;
        var currentStreak = 0;
        var substantiveEditTimes = [];
        var longReturnCandidates = [];

        var awardAt = {
            letopisets: 0,
            multigran: 0,
            verny: 0,
            neugasimy: 0,
            vozvrashchenie: 0,
            potok: 0,
            sled: 0,
            ruka: 0,
            streak: 0,
            ispravitel: 0
        };

        contributions =
            Array.isArray(contributions)
                ? contributions
                : [];

        stats.scannedEdits =
            contributions.length;

        contributions.forEach(
            function (item) {
                item = item || {};

                var unix =
                    timestampToUnix(
                        item.timestamp
                    );

                if (unix <= 0) {
                    return;
                }

                stats.editCount += 1;

                if (!stats.firstEditAt) {
                    stats.firstEditAt =
                        unix;

                    map[FIRST_EDIT_ID] =
                        unix;
                }

                var nextLetopisets =
                    getTierLevel(
                        LETOPISETS_THRESHOLDS,
                        stats.editCount
                    );

                if (
                    nextLetopisets >
                    stats.letopisetsLevel
                ) {
                    stats.letopisetsLevel =
                        nextLetopisets;

                    awardAt.letopisets =
                        unix;
                }

                var pageKey =
                    Number(item.pageid) > 0
                        ? 'id:' +
                            String(
                                item.pageid
                            )
                        : 'title:' +
                            String(
                                item.title || ''
                            );

                if (
                    pageKey &&
                    !uniquePages[pageKey]
                ) {
                    uniquePages[pageKey] =
                        true;

                    stats.uniqueArticles +=
                        1;

                    var nextMultigran =
                        getTierLevel(
                            MULTIGRAN_THRESHOLDS,
                            stats.uniqueArticles
                        );

                    if (
                        nextMultigran >
                        stats.multigranLevel
                    ) {
                        stats.multigranLevel =
                            nextMultigran;

                        awardAt.multigran =
                            unix;
                    }

                    var nextSled =
                        getTierLevel(
                            CHERNILNY_SLED_THRESHOLDS,
                            stats.uniqueArticles
                        );

                    if (
                        nextSled >
                        stats.chernilnySledLevel
                    ) {
                        stats.chernilnySledLevel =
                            nextSled;

                        awardAt.sled =
                            unix;
                    }
                }

                var day =
                    utcDayFromTimestamp(
                        item.timestamp
                    );

                var dayIndex =
                    Math.floor(
                        unix /
                        86400
                    );

                if (day) {
                    if (!editDays[day]) {
                        editDays[day] =
                            true;

                        stats.distinctEditDays +=
                            1;

                        var nextVerny =
                            getTierLevel(
                                VERNY_LETOPISETS_THRESHOLDS,
                                stats.distinctEditDays
                            );

                        if (
                            nextVerny >
                            stats.vernyLetopisetsLevel
                        ) {
                            stats.vernyLetopisetsLevel =
                                nextVerny;

                            awardAt.verny =
                                unix;
                        }

                        if (
                            previousDayIndex ===
                            null
                        ) {
                            currentStreak =
                                1;
                        } else if (
                            dayIndex ===
                            previousDayIndex + 1
                        ) {
                            currentStreak +=
                                1;
                        } else if (
                            dayIndex !==
                            previousDayIndex
                        ) {
                            currentStreak =
                                1;
                        }

                        previousDayIndex =
                            dayIndex;

                        if (
                            currentStreak >
                            stats.maxConsecutiveEditDays
                        ) {
                            stats.maxConsecutiveEditDays =
                                currentStreak;

                            var nextStreak =
                                getTierLevel(
                                    NESLOMLENNAYA_TSEP_THRESHOLDS,
                                    stats.maxConsecutiveEditDays
                                );

                            if (
                                nextStreak >
                                stats.neslomlennayaTsepLevel
                            ) {
                                stats.neslomlennayaTsepLevel =
                                    nextStreak;

                                awardAt.streak =
                                    unix;
                            }
                        }
                    }

                    dailyCounts[day] =
                        Number(
                            dailyCounts[day] || 0
                        ) + 1;

                    stats.maxEditsInOneDay =
                        Math.max(
                            stats.maxEditsInOneDay,
                            dailyCounts[day]
                        );

                    var nextNeugasimy =
                        getTierLevel(
                            NEUTOMIMOE_PERO_THRESHOLDS,
                            dailyCounts[day]
                        );

                    if (
                        nextNeugasimy >
                        stats.neugasimyRoscherkLevel
                    ) {
                        stats.neugasimyRoscherkLevel =
                            nextNeugasimy;

                        awardAt.neugasimy =
                            unix;
                    }

                    var hour =
                        new Date(
                            String(
                                item.timestamp
                            )
                        ).getUTCHours();

                    if (
                        hour >= 0 &&
                        hour <= 5
                    ) {
                        nightlyCounts[day] =
                            Number(
                                nightlyCounts[day] || 0
                            ) + 1;

                        stats.maxNightEditsInOneDay =
                            Math.max(
                                stats.maxNightEditsInOneDay,
                                nightlyCounts[day]
                            );

                        if (
                            !stats.nightHero &&
                            nightlyCounts[day] >=
                                NIGHT_EDIT_MIN_COUNT
                        ) {
                            stats.nightHero =
                                true;

                            map[NIGHT_HERO_ID] =
                                unix;
                        }
                    }
                }

                var exactDate =
                    new Date(
                        String(item.timestamp)
                    );

                if (
                    exactDate.getUTCHours() === 4 &&
                    exactDate.getUTCMinutes() >= 44 &&
                    exactDate.getUTCMinutes() <= 59 &&
                    !map.hidden_dawn_trace
                ) {
                    map.hidden_dawn_trace = unix;
                    stats.hiddenDawnTrace = true;
                }

                if (previousUnix > 0) {
                    var gapSeconds =
                        Math.max(
                            0,
                            unix -
                            previousUnix
                        );

                    stats.maxReturnGapSeconds =
                        Math.max(
                            stats.maxReturnGapSeconds,
                            gapSeconds
                        );

                    var nextReturn =
                        getTierLevel(
                            VOZVRASHCHENIE_THRESHOLDS,
                            gapSeconds
                        );

                    if (
                        nextReturn >
                        stats.vozvrashchenieLevel
                    ) {
                        stats.vozvrashchenieLevel =
                            nextReturn;

                        awardAt.vozvrashchenie =
                            unix;
                    }

                    if (
                        gapSeconds >=
                            HIDDEN_RETURN_GAP_SECONDS &&
                        day
                    ) {
                        longReturnCandidates.push({
                            day: day,
                            unix: unix
                        });
                    }
                }

                previousUnix =
                    unix;

                var rawSizeDiff =
                    Math.floor(
                        Number(
                            item.sizediff
                        ) || 0
                    );

                var diff =
                    Math.max(
                        0,
                        rawSizeDiff
                    );

                if (
                    Math.abs(rawSizeDiff) >=
                    HIDDEN_QUICK_EDIT_MIN_ABS_BYTES
                ) {
                    substantiveEditTimes.push(unix);

                    while (
                        substantiveEditTimes.length &&
                        substantiveEditTimes[0] <
                            unix - HIDDEN_QUICK_EDIT_WINDOW_SECONDS
                    ) {
                        substantiveEditTimes.shift();
                    }

                    if (
                        substantiveEditTimes.length >=
                            HIDDEN_QUICK_EDIT_COUNT &&
                        !map.hidden_ink_not_dry
                    ) {
                        map.hidden_ink_not_dry = unix;
                        stats.hiddenQuickEdits = true;
                    }
                }

                stats.maxPositiveBytesInOneEdit =
                    Math.max(
                        stats.maxPositiveBytesInOneEdit,
                        Math.max(0, rawSizeDiff)
                    );

                stats.positiveBytes +=
                    diff;

                if (
                    rawSizeDiff <=
                    -CORRECTOR_MIN_REMOVED_BYTES
                ) {
                    stats.correctiveEdits +=
                        1;

                    var nextCorrector =
                        getTierLevel(
                            ISPRAVITEL_THRESHOLDS,
                            stats.correctiveEdits
                        );

                    if (
                        nextCorrector >
                        stats.ispravitelLevel
                    ) {
                        stats.ispravitelLevel =
                            nextCorrector;

                        awardAt.ispravitel =
                            unix;
                    }
                }

                if (
                    !stats.thousandLines &&
                    rawSizeDiff >=
                        THOUSAND_LINES_MIN_BYTES
                ) {
                    stats.thousandLines =
                        true;

                    map[TYSYACHA_STROK_ID] =
                        unix;
                }

                if (
                    Math.abs(
                        rawSizeDiff
                    ) >=
                    MAJOR_EDIT_MIN_ABS_BYTES
                ) {
                    stats.majorEdits +=
                        1;

                    var nextRuka =
                        getTierLevel(
                            RUKA_LETOPISTSA_THRESHOLDS,
                            stats.majorEdits
                        );

                    if (
                        nextRuka >
                        stats.rukaLetopistsaLevel
                    ) {
                        stats.rukaLetopistsaLevel =
                            nextRuka;

                        awardAt.ruka =
                            unix;
                    }
                }

                var nextPotok =
                    getTierLevel(
                        CHERNILNY_POTOK_THRESHOLDS,
                        stats.positiveBytes
                    );

                if (
                    nextPotok >
                    stats.chernilnyPotokLevel
                ) {
                    stats.chernilnyPotokLevel =
                        nextPotok;

                    awardAt.potok =
                        unix;
                }
            }
        );

        longReturnCandidates.some(function (candidate) {
            if (
                Number(dailyCounts[candidate.day] || 0) >=
                HIDDEN_RETURN_DAY_MIN_EDITS
            ) {
                map.hidden_returning_chronicler =
                    candidate.unix;
                stats.hiddenReturningChronicler = true;
                return true;
            }
            return false;
        });

        function addTier(prefix, level, timestamp) {
            if (level <= 0) {
                return;
            }

            map[
                tierAchievementId(
                    prefix,
                    level
                )
            ] =
                timestamp ||
                stats.firstEditAt ||
                1;
        }

        addTier(
            LETOPISETS_PREFIX,
            stats.letopisetsLevel,
            awardAt.letopisets
        );

        addTier(
            MULTIGRAN_PREFIX,
            stats.multigranLevel,
            awardAt.multigran
        );

        addTier(
            VERNY_LETOPISETS_PREFIX,
            stats.vernyLetopisetsLevel,
            awardAt.verny
        );

        addTier(
            NEUTOMIMOE_PERO_PREFIX,
            stats.neugasimyRoscherkLevel,
            awardAt.neugasimy
        );

        addTier(
            VOZVRASHCHENIE_PREFIX,
            stats.vozvrashchenieLevel,
            awardAt.vozvrashchenie
        );

        addTier(
            CHERNILNY_POTOK_PREFIX,
            stats.chernilnyPotokLevel,
            awardAt.potok
        );

        addTier(
            CHERNILNY_SLED_PREFIX,
            stats.chernilnySledLevel,
            awardAt.sled
        );

        addTier(
            RUKA_LETOPISTSA_PREFIX,
            stats.rukaLetopistsaLevel,
            awardAt.ruka
        );

        addTier(
            NESLOMLENNAYA_TSEP_PREFIX,
            stats.neslomlennayaTsepLevel,
            awardAt.streak
        );

        addTier(
            ISPRAVITEL_PREFIX,
            stats.ispravitelLevel,
            awardAt.ispravitel
        );

        stats.achievementMap =
            map;

        return stats;
    }


    function fetchTechnicalContributions(user) {
        /*
         * Пространства запрашиваются отдельно, чтобы не зависеть
         * от поддержки multi-value ucnamespace конкретной сборкой Fandom.
         */
        return Promise.all([
            fetchNamespaceContributions(
                user,
                4,
                TECHNICAL_SCAN_LIMIT,
                null
            ),

            fetchNamespaceContributions(
                user,
                10,
                TECHNICAL_SCAN_LIMIT,
                null
            ),

            fetchNamespaceContributions(
                user,
                14,
                TECHNICAL_SCAN_LIMIT,
                null
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


    function analyzeTechnicalContributions(
        user,
        contributions
    ) {
        var result = {
            createdCategories: 0,
            createdTemplates: 0,
            uniqueTechnicalPages: 0,
            tkachKategoriyLevel: 0,
            tkachShablonovLevel: 0,
            arkhivariusLevel: 0,
            achievementMap: {}
        };

        var uniquePages = {};
        var awardAt = {
            categories: 0,
            templates: 0,
            archivist: 0
        };

        contributions =
            Array.isArray(contributions)
                ? contributions
                : [];

        contributions.forEach(function (item) {
            item =
                item || {};

            var unix =
                timestampToUnix(
                    item.timestamp
                );

            if (unix <= 0) {
                return;
            }

            var pageKey =
                Number(item.pageid) > 0
                    ? 'id:' +
                        String(
                            item.pageid
                        )
                    : 'title:' +
                        String(
                            item.title || ''
                        );

            if (
                pageKey &&
                !uniquePages[
                    pageKey
                ]
            ) {
                uniquePages[
                    pageKey
                ] =
                    true;

                result.uniqueTechnicalPages +=
                    1;

                var nextArchivist =
                    getTierLevel(
                        ARKHIVARIUS_THRESHOLDS,
                        result.uniqueTechnicalPages
                    );

                if (
                    nextArchivist >
                    result.arkhivariusLevel
                ) {
                    result.arkhivariusLevel =
                        nextArchivist;

                    awardAt.archivist =
                        unix;
                }
            }

            /*
             * В formatversion=2 флаг создания страницы
             * приходит как boolean true.
             */
            if (item.new !== true) {
                return;
            }

            if (
                Number(item.ns) ===
                14
            ) {
                result.createdCategories +=
                    1;

                var nextCategory =
                    getTierLevel(
                        TKACH_KATEGORIY_THRESHOLDS,
                        result.createdCategories
                    );

                if (
                    nextCategory >
                    result.tkachKategoriyLevel
                ) {
                    result.tkachKategoriyLevel =
                        nextCategory;

                    awardAt.categories =
                        unix;
                }
            }

            if (
                Number(item.ns) ===
                10
            ) {
                result.createdTemplates +=
                    1;

                var nextTemplate =
                    getTierLevel(
                        TKACH_SHABLONOV_THRESHOLDS,
                        result.createdTemplates
                    );

                if (
                    nextTemplate >
                    result.tkachShablonovLevel
                ) {
                    result.tkachShablonovLevel =
                        nextTemplate;

                    awardAt.templates =
                        unix;
                }
            }
        });

        if (
            result.tkachKategoriyLevel >
            0
        ) {
            result.achievementMap[
                tierAchievementId(
                    TKACH_KATEGORIY_PREFIX,
                    result.tkachKategoriyLevel
                )
            ] =
                awardAt.categories ||
                1;
        }

        if (
            result.tkachShablonovLevel >
            0
        ) {
            result.achievementMap[
                tierAchievementId(
                    TKACH_SHABLONOV_PREFIX,
                    result.tkachShablonovLevel
                )
            ] =
                awardAt.templates ||
                1;
        }

        if (
            result.arkhivariusLevel >
            0
        ) {
            result.achievementMap[
                tierAchievementId(
                    ARKHIVARIUS_PREFIX,
                    result.arkhivariusLevel
                )
            ] =
                awardAt.archivist ||
                1;
        }

        return result;
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


    function analyzeHistoricalContext(
        user,
        context
    ) {
        var result = {
            awakenedArticles: 0,
            maxDormantGapSeconds: 0,
            probuzhdayushchiyLevel: 0,
            hranitelDrevnosteyLevel: 0,
            completedDrafts: 0,
            hiddenForgottenPage: false,
            hiddenOneAgainstVoid: false,
            hiddenQuietCorrector: false,
            hiddenThriceReturned: false,
            achievementMap: {}
        };

        var contributions =
            context && Array.isArray(context.contributions)
                ? context.contributions
                : [];

        var revisions =
            context && isPlainObject(context.revisions)
                ? context.revisions
                : {};

        var awakenedPages = {};
        var dormantReturnsByPage = {};
        var awakenedAwardAt = 0;
        var ancientAwardAt = 0;

        contributions.forEach(function (item) {
            item = item || {};

            var unix = timestampToUnix(item.timestamp);
            var parentId = Math.floor(Number(item.parentid) || 0);
            var parent = revisions[parentId];

            if (unix <= 0 || !parent) {
                return;
            }

            var pageKey =
                Number(item.pageid) > 0
                    ? 'id:' + String(item.pageid)
                    : 'title:' + String(item.title || '');

            var parentUnix = timestampToUnix(parent.timestamp);

            if (parentUnix > 0) {
                var gapSeconds = Math.max(0, unix - parentUnix);

                if (gapSeconds >= DORMANT_MIN_SECONDS) {
                    if (pageKey && !awakenedPages[pageKey]) {
                        awakenedPages[pageKey] = true;
                        result.awakenedArticles += 1;

                        var nextAwakener = getTierLevel(
                            PROBUZHDAYUSHCHIY_THRESHOLDS,
                            result.awakenedArticles
                        );

                        if (nextAwakener > result.probuzhdayushchiyLevel) {
                            result.probuzhdayushchiyLevel = nextAwakener;
                            awakenedAwardAt = unix;
                        }
                    }
                }

                if (
                    gapSeconds >= HIDDEN_FORGOTTEN_GAP_SECONDS &&
                    !result.achievementMap.hidden_forgotten_page
                ) {
                    result.achievementMap.hidden_forgotten_page = unix;
                    result.hiddenForgottenPage = true;
                }

                if (
                    gapSeconds >= HIDDEN_THRICE_RETURN_GAP_SECONDS &&
                    pageKey
                ) {
                    dormantReturnsByPage[pageKey] =
                        Number(dormantReturnsByPage[pageKey] || 0) + 1;

                    if (
                        dormantReturnsByPage[pageKey] >= 3 &&
                        !result.achievementMap.hidden_thrice_returned
                    ) {
                        result.achievementMap.hidden_thrice_returned = unix;
                        result.hiddenThriceReturned = true;
                    }
                }

                if (gapSeconds > result.maxDormantGapSeconds) {
                    result.maxDormantGapSeconds = gapSeconds;

                    var dormantDays = Math.floor(gapSeconds / 86400);
                    var nextAncient = getTierLevel(
                        HRANITEL_DREVNOSTEY_THRESHOLDS_DAYS,
                        dormantDays
                    );

                    if (nextAncient > result.hranitelDrevnosteyLevel) {
                        result.hranitelDrevnosteyLevel = nextAncient;
                        ancientAwardAt = unix;
                    }
                }
            }

            var parentSize = Math.max(
                0,
                Math.floor(Number(parent.size) || 0)
            );

            var rawSizeDiff = Math.floor(Number(item.sizediff) || 0);
            var afterSize = Math.max(0, parentSize + rawSizeDiff);

            if (
                parentSize < COMPLETER_BEFORE_MAX_BYTES &&
                afterSize >= COMPLETER_AFTER_MIN_BYTES
            ) {
                result.completedDrafts += 1;

                if (!result.achievementMap[ZAVERSHITEL_ID]) {
                    result.achievementMap[ZAVERSHITEL_ID] = unix || 1;
                }
            }

            if (
                parentSize > 0 &&
                parentSize <= HIDDEN_VOID_BEFORE_MAX_BYTES &&
                afterSize >= HIDDEN_VOID_AFTER_MIN_BYTES &&
                rawSizeDiff >= HIDDEN_VOID_MIN_GROWTH_BYTES &&
                afterSize / Math.max(1, parentSize) >=
                    HIDDEN_VOID_MIN_RATIO &&
                !result.achievementMap.hidden_one_against_void
            ) {
                result.achievementMap.hidden_one_against_void = unix;
                result.hiddenOneAgainstVoid = true;
            }

            /*
             * MediaWiki usercontribs не сообщает объём реально заменённого
             * текста, поэтому «Тихий исправитель» проверяет надёжно
             * доступный признак: крупная статья и почти нулевой итоговый
             * sizediff при немелкой правке. Это исключает простое наращивание.
             */
            if (
                parentSize >= HIDDEN_QUIET_MIN_ARTICLE_BYTES &&
                Math.abs(rawSizeDiff) <= HIDDEN_QUIET_MAX_NET_BYTES &&
                item.minor !== true &&
                !result.achievementMap.hidden_quiet_corrector
            ) {
                result.achievementMap.hidden_quiet_corrector = unix;
                result.hiddenQuietCorrector = true;
            }
        });

        if (result.probuzhdayushchiyLevel > 0) {
            result.achievementMap[
                tierAchievementId(
                    PROBUZHDAYUSHCHIY_PREFIX,
                    result.probuzhdayushchiyLevel
                )
            ] = awakenedAwardAt || 1;
        }

        if (result.hranitelDrevnosteyLevel > 0) {
            result.achievementMap[
                tierAchievementId(
                    HRANITEL_DREVNOSTEY_PREFIX,
                    result.hranitelDrevnosteyLevel
                )
            ] = ancientAwardAt || 1;
        }

        return result;
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


    function normalizeHiddenTitle(value) {
        return String(value || '')
            .replace(/_/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .toLocaleLowerCase('ru');
    }


    function isSecretServicePageTitle(value) {
        var title = normalizeHiddenTitle(value);
        var expected = normalizeHiddenTitle(SECRET_SERVICE_PAGE_TITLE);

        return (
            title === expected ||
            title.slice(-(':' + normalizeHiddenTitle('След Лофариана')).length) ===
                ':' + normalizeHiddenTitle('След Лофариана')
        );
    }


    function analyzeCrossContributionHiddenAchievements(
        catalog,
        user,
        articleContributions,
        createdContributions,
        technicalContributions,
        globalRecentChanges,
        baseAchievementMap
    ) {
        var result = {
            hiddenWithoutTraces: false,
            hiddenRedThread: false,
            hiddenFirstAfterSilence: false,
            hiddenLastPage: false,
            achievementMap: {}
        };

        articleContributions = Array.isArray(articleContributions)
            ? articleContributions
            : [];
        createdContributions = Array.isArray(createdContributions)
            ? createdContributions
            : [];
        technicalContributions = Array.isArray(technicalContributions)
            ? technicalContributions
            : [];
        globalRecentChanges = Array.isArray(globalRecentChanges)
            ? globalRecentChanges
            : [];

        var dayTypes = {};
        var dayMaxUnix = {};
        var redThreadByDay = {};
        var redThreadRequired = {};

        RED_THREAD_TITLES.forEach(function (title) {
            redThreadRequired[normalizeHiddenTitle(title)] = true;
        });

        function registerDayType(timestamp, type) {
            var day = utcDayFromTimestamp(timestamp);
            var unix = timestampToUnix(timestamp);

            if (!day || unix <= 0) {
                return;
            }

            if (!dayTypes[day]) {
                dayTypes[day] = {};
            }

            dayTypes[day][type] = true;
            dayMaxUnix[day] = Math.max(
                Number(dayMaxUnix[day] || 0),
                unix
            );
        }

        articleContributions.forEach(function (item) {
            item = item || {};
            var unix = timestampToUnix(item.timestamp);
            var normalized = normalizeHiddenTitle(item.title);

            if (Math.abs(Number(item.sizediff) || 0) >= 50) {
                registerDayType(item.timestamp, 'edit');
            }

            if (
                normalized === normalizeHiddenTitle(FORBIDDEN_ENTITY_TITLE) &&
                unix > 0 &&
                !result.achievementMap.hidden_dont_say_name
            ) {
                result.achievementMap.hidden_dont_say_name = unix;
            }

            if (redThreadRequired[normalized]) {
                var day = utcDayFromTimestamp(item.timestamp);
                if (day) {
                    if (!redThreadByDay[day]) {
                        redThreadByDay[day] = {};
                    }
                    redThreadByDay[day][normalized] = true;
                    dayMaxUnix[day] = Math.max(
                        Number(dayMaxUnix[day] || 0),
                        unix
                    );
                }
            }
        });

        createdContributions.forEach(function (item) {
            registerDayType(item && item.timestamp, 'creation');
        });

        technicalContributions.forEach(function (item) {
            item = item || {};
            var ns = Number(item.ns);
            var unix = timestampToUnix(item.timestamp);

            if (
                (ns === 10 || ns === 14) &&
                item.new === true
            ) {
                registerDayType(item.timestamp, 'technical');
            }

            if (
                isSecretServicePageTitle(item.title) &&
                unix > 0 &&
                !result.achievementMap.hidden_something_was_here
            ) {
                result.achievementMap.hidden_something_was_here = unix;
            }
        });

        Object.keys(redThreadByDay).some(function (day) {
            var found = redThreadByDay[day];
            var complete = Object.keys(redThreadRequired).every(
                function (key) {
                    return !!found[key];
                }
            );

            if (complete) {
                result.achievementMap.hidden_red_thread =
                    Number(dayMaxUnix[day] || 1);
                result.hiddenRedThread = true;
                return true;
            }
            return false;
        });

        var tierAwardDays = {};
        Object.keys(baseAchievementMap || {}).forEach(function (id) {
            var achievement = getAchievement(catalog, id);
            if (!achievement || !achievement.family) {
                return;
            }
            var unix = Number(baseAchievementMap[id] || 0);
            if (unix < 946684800) {
                return;
            }
            tierAwardDays[
                new Date(unix * 1000).toISOString().slice(0, 10)
            ] = true;
        });

        Object.keys(dayTypes).some(function (day) {
            var types = dayTypes[day];
            if (
                types.edit &&
                types.creation &&
                types.technical &&
                !tierAwardDays[day]
            ) {
                result.achievementMap.hidden_without_traces =
                    Number(dayMaxUnix[day] || 1);
                result.hiddenWithoutTraces = true;
                return true;
            }
            return false;
        });

        /*
         * Две «тишины» сверяются с единым кэшированным recentchanges.
         * Для одной сборки Зала славы список запрашивается один раз.
         */
        var rcIndexByRevision = {};
        globalRecentChanges.forEach(function (row, index) {
            var revid = Number(row && row.revid) || 0;
            if (revid > 0) {
                rcIndexByRevision[revid] = index;
            }
        });

        articleContributions.some(function (item) {
            var index = rcIndexByRevision[
                Number(item && item.revid) || 0
            ];

            if (index === undefined) {
                return false;
            }

            var row = globalRecentChanges[index] || {};
            var unix = timestampToUnix(row.timestamp);
            if (unix <= 0) {
                return false;
            }

            if (index > 0) {
                var previousUnix = timestampToUnix(
                    globalRecentChanges[index - 1] &&
                    globalRecentChanges[index - 1].timestamp
                );

                if (
                    previousUnix > 0 &&
                    unix - previousUnix >= GLOBAL_SILENCE_SECONDS &&
                    !result.achievementMap.hidden_first_after_silence
                ) {
                    result.achievementMap.hidden_first_after_silence = unix;
                    result.hiddenFirstAfterSilence = true;
                }
            }

            var nextUnix = 0;
            if (index + 1 < globalRecentChanges.length) {
                nextUnix = timestampToUnix(
                    globalRecentChanges[index + 1] &&
                    globalRecentChanges[index + 1].timestamp
                );
            }

            if (
                (
                    nextUnix > 0 &&
                    nextUnix - unix >= GLOBAL_SILENCE_SECONDS
                ) ||
                (
                    index === globalRecentChanges.length - 1 &&
                    nowUnix() - unix >= GLOBAL_SILENCE_SECONDS
                )
            ) {
                if (!result.achievementMap.hidden_last_page) {
                    result.achievementMap.hidden_last_page = unix;
                    result.hiddenLastPage = true;
                }
            }

            return (
                result.hiddenFirstAfterSilence &&
                result.hiddenLastPage
            );
        });

        return result;
    }


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

    function getDiscussionRuleCurrentValue(rule, stats) {
        stats = stats || createEmptyDiscussionStats();

        switch (String(rule && rule.type || '')) {
            case 'total':
                return Number(stats.total || 0);
            case 'threads':
                return Number(stats.threads || 0);
            case 'replies':
                return Number(stats.replies || 0);
            case 'uniqueThreads':
                return Number(stats.uniqueThreads || 0);
            case 'maxDay':
                return Number(stats.maxActionsInDay || 0);
            case 'likesReceived':
                return Number(stats.likesReceived || 0);
            case 'likedPosts':
                return Number(stats.likedPosts || 0);
            case 'maxLikes':
                return Number(stats.maxLikesOnPost || 0);
            case 'dawnActions':
                return Number(stats.dawnActions || 0);
            case 'oldThreadReplies':
                return Number(stats.oldThreadReplies || 0);
            default:
                return 0;
        }
    }

    function discussionPostUnix(post) {
        post = post || {};
        var value = post.creationDate && post.creationDate.epochSecond;
        var unix = Number(value || 0);

        if (unix > 0) {
            return Math.floor(unix);
        }

        return timestampToUnix(
            post.creationDate && post.creationDate.iso8601 ||
            post.createdAt ||
            post.timestamp ||
            ''
        );
    }


    function discussionPostLikeCount(post) {
        post = post || {};

        var embedded = post._embedded || {};
        var embeddedCount = embedded.count || {};
        var candidates = [
            post.upvoteCount,
            post.upvotesCount,
            post.likeCount,
            post.likesCount,
            post.reactionCount,
            post.reactionsCount,
            embeddedCount.UPVOTE,
            embeddedCount.upvote,
            embeddedCount.LIKE,
            embeddedCount.like
        ];

        if (Array.isArray(embedded.upvotes)) {
            candidates.push(embedded.upvotes.length);
        }
        if (Array.isArray(embedded['doc:upvotes'])) {
            candidates.push(embedded['doc:upvotes'].length);
        }
        if (Array.isArray(post.upvotes)) {
            candidates.push(post.upvotes.length);
        }

        return candidates.reduce(function (maxValue, value) {
            return Math.max(maxValue, Math.max(0, Math.floor(Number(value) || 0)));
        }, 0);
    }

    function discussionThreadUnix(thread) {
        thread = thread || {};
        return discussionPostUnix(
            thread.firstPost || thread
        );
    }

    function extractDiscussionPosts(data) {
        if (
            data && data._embedded &&
            Array.isArray(data._embedded['doc:posts'])
        ) {
            return data._embedded['doc:posts'];
        }

        if (
            data && data._embedded &&
            Array.isArray(data._embedded.posts)
        ) {
            return data._embedded.posts;
        }

        if (data && Array.isArray(data.posts)) {
            return data.posts;
        }

        return [];
    }

    function discussionApiUrl() {
        var scriptPath = String(
            mw.config.get('wgScriptPath') || ''
        ).replace(/\/$/, '');

        return scriptPath + '/wikia.php';
    }

    function analyzeDiscussionResponse(data) {
        var stats = createEmptyDiscussionStats();
        var posts = extractDiscussionPosts(data);
        var uniqueThreads = {};
        var actionsByDay = {};

        var embeddedCount =
            data && data._embedded && data._embedded.count;

        stats.total = Math.max(
            0,
            Math.floor(Number(
                data && data.postCount ||
                embeddedCount && embeddedCount.FORUM ||
                posts.length ||
                0
            ) || 0)
        );

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

    function fetchDiscussionStatsForUser(user, forceReload) {
        if (!user || !user.userid) {
            return Promise.resolve(createEmptyDiscussionStats());
        }

        var key = String(user.userid);
        var cached = discussionStatsCache[key];

        if (
            cached && !forceReload &&
            Date.now() - cached.fetchedAt < DISCUSSION_STATS_CACHE_MS
        ) {
            return Promise.resolve(cloneData(cached.data));
        }

        return $.ajax({
            url: discussionApiUrl(),
            method: 'GET',
            dataType: 'json',
            cache: true,
            data: {
                controller: 'DiscussionContribution',
                method: 'getPosts',
                userId: Number(user.userid),
                limit: DISCUSSION_RECENT_LIMIT,
                responseGroup: 'full',
                viewableOnly: true,
                canViewHiddenPosts: false,
                canViewHiddenPostsInContainer: false,
                containerType: 'FORUM'
            }
        }).then(function (data) {
            var stats = analyzeDiscussionResponse(data || {});

            discussionStatsCache[key] = {
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

    function getEditorStatsForUser(user, forceReload) {
        if (
            !user ||
            !user.userid ||
            !user.name
        ) {
            return Promise.resolve(
                createEmptyEditorStats('')
            );
        }

        var key =
            String(
                user.userid
            );

        var cached =
            editorStatsCache[key];

        if (
            cached &&
            !forceReload &&
            Date.now() -
                cached.fetchedAt <
                EDITOR_STATS_CACHE_MS
        ) {
            return Promise.resolve(
                cloneData(
                    cached.data
                )
            );
        }

        return Promise.all([
            fetchArticleContributions(
                user
            ),

            fetchCreatedArticleContributions(
                user
            ),

            fetchUploadLogEvents(
                user
            ),

            fetchTechnicalContributions(
                user
            ),

            fetchGlobalRecentChanges(),

            fetchDiscussionStatsForUser(
                user,
                forceReload
            )
        ]).then(function (groups) {
            var articleContributions =
                groups[0];

            var stats =
                analyzeEditorContributions(
                    user,
                    articleContributions
                );

            var creationStats =
                analyzeCreatedArticleContributions(
                    user,
                    groups[1]
                );

            var fileStats =
                analyzeUploadLogEvents(
                    user,
                    groups[2]
                );

            var technicalStats =
                analyzeTechnicalContributions(
                    user,
                    groups[3]
                );

            stats.createdArticles =
                creationStats.createdArticles;

            stats.firstCreatedArticleAt =
                creationStats.firstCreatedArticleAt;

            stats.zodchiyLevel =
                creationStats.zodchiyLevel;

            stats.maxCreatedArticlesInOneDay =
                creationStats.maxCreatedArticlesInOneDay;

            stats.neutomimyyZodchiyLevel =
                creationStats.neutomimyyZodchiyLevel;

            stats.achievementMap =
                mergeAchievementMap(
                    stats.achievementMap,
                    creationStats.achievementMap
                );

            stats.uploadedFiles =
                fileStats.uploadedFiles;

            stats.hudozhnikLevel =
                fileStats.hudozhnikLevel;

            if (
                fileStats.hudozhnikLevel >
                0
            ) {
                stats.achievementMap[
                    tierAchievementId(
                        HUDOZHNIK_PREFIX,
                        fileStats.hudozhnikLevel
                    )
                ] =
                    fileStats.hudozhnikAwardAt ||
                    stats.firstEditAt ||
                    1;
            }

            stats.createdCategories =
                technicalStats.createdCategories;

            stats.createdTemplates =
                technicalStats.createdTemplates;

            stats.uniqueTechnicalPages =
                technicalStats.uniqueTechnicalPages;

            stats.tkachKategoriyLevel =
                technicalStats.tkachKategoriyLevel;

            stats.tkachShablonovLevel =
                technicalStats.tkachShablonovLevel;

            stats.arkhivariusLevel =
                technicalStats.arkhivariusLevel;

            stats.achievementMap =
                mergeAchievementMap(
                    stats.achievementMap,
                    technicalStats.achievementMap
                );

            stats.discussionStats =
                groups[5] || createEmptyDiscussionStats();

            stats.achievementMap =
                mergeAchievementMap(
                    stats.achievementMap,
                    stats.discussionStats.achievementMap
                );

            /*
             * Более дорогие проверки выполняются пакетно и только
             * по ограниченному числу последних правок.
             */
            return Promise.all([
                fetchParentRevisionMetadata(
                    articleContributions
                ).then(function (context) {
                    return analyzeHistoricalContext(
                        user,
                        context
                    );
                }).catch(function (error) {
                    console.warn(
                        '[Lofarian Achievements] Не удалось проверить древние/пробуждённые статьи:',
                        error
                    );

                    return {
                        awakenedArticles: 0,
                        maxDormantGapSeconds: 0,
                        probuzhdayushchiyLevel: 0,
                        hranitelDrevnosteyLevel: 0,
                        completedDrafts: 0,
                        achievementMap: {}
                    };
                }),

                fetchRoadCategoryStats(
                    articleContributions
                ).catch(function (error) {
                    console.warn(
                        '[Lofarian Achievements] Не удалось подсчитать «Сто дорог»:',
                        error
                    );

                    return {
                        roadCategories: 0,
                        achievementMap: {}
                    };
                })
            ]).then(function (heavy) {
                var historical =
                    heavy[0];

                var roads =
                    heavy[1];

                stats.awakenedArticles =
                    historical.awakenedArticles;

                stats.maxDormantGapSeconds =
                    historical.maxDormantGapSeconds;

                stats.probuzhdayushchiyLevel =
                    historical.probuzhdayushchiyLevel;

                stats.hranitelDrevnosteyLevel =
                    historical.hranitelDrevnosteyLevel;

                stats.completedDrafts =
                    historical.completedDrafts;

                stats.roadCategories =
                    roads.roadCategories;

                stats.achievementMap =
                    mergeAchievementMap(
                        stats.achievementMap,
                        historical.achievementMap
                    );

                stats.achievementMap =
                    mergeAchievementMap(
                        stats.achievementMap,
                        roads.achievementMap
                    );

                stats.hiddenForgottenPage =
                    historical.hiddenForgottenPage === true;
                stats.hiddenOneAgainstVoid =
                    historical.hiddenOneAgainstVoid === true;
                stats.hiddenQuietCorrector =
                    historical.hiddenQuietCorrector === true;
                stats.hiddenThriceReturned =
                    historical.hiddenThriceReturned === true;

                var hiddenCross =
                    analyzeCrossContributionHiddenAchievements(
                        catalogCache || { achievements: {}, families: {}, rarities: {} },
                        user,
                        articleContributions,
                        groups[1],
                        groups[3],
                        groups[4],
                        stats.achievementMap
                    );

                stats.hiddenWithoutTraces =
                    hiddenCross.hiddenWithoutTraces === true;
                stats.hiddenRedThread =
                    hiddenCross.hiddenRedThread === true;
                stats.hiddenFirstAfterSilence =
                    hiddenCross.hiddenFirstAfterSilence === true;
                stats.hiddenLastPage =
                    hiddenCross.hiddenLastPage === true;

                stats.achievementMap =
                    mergeAchievementMap(
                        stats.achievementMap,
                        hiddenCross.achievementMap
                    );

                editorStatsCache[key] = {
                    fetchedAt:
                        Date.now(),

                    data:
                        cloneData(
                            stats
                        )
                };

                return stats;
            });
        }).catch(function (error) {
            console.warn(
                '[Lofarian Achievements] Не удалось получить серверную историю статей/созданий/загрузок ' +
                user.name +
                ':',
                error
            );

            return createEmptyEditorStats(
                user.name
            );
        });
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


    function createEmptyPublicProgress(username) {
        username =
            normalizeProgressUsername(
                username
            );

        return {
            username:
                username,

            articleCount:
                0,

            activeSeconds:
                0,

            lastArticleAt:
                0,

            updatedAt:
                0,

            /*
             * Первое подтверждённое появление пользователя
             * именно на этой вики.
             *
             * Для новых записей ставится серверно проверяемое
             * текущее время. Старые LOFREAD1/2/3/4 мигрируют в
             * L7 с сохранением данных; для LOFREAD1/2/3 firstSeenAt
             * безопасно фиксируется при миграции.
             *
             * Если у пользователя есть более ранняя локальная
             * серверная история правок, Старожил использует её.
             */
            firstSeenAt:
                0,

            chronistAwardAt:
                0,

            thoughtfulAwardAt:
                0,

            /*
             * Даты первого зафиксированного попадания в пороги
             * Зала славы. Эти поля НЕ определяют право на статус:
             * право всегда пересчитывается по текущему rank.
             * Поля нужны только для стабильной даты получения.
             */
            hallTop500AwardAt:
                0,

            hallTop100AwardAt:
                0,

            hallTop10AwardAt:
                0,

            /*
             * «Знак поддержки» I–C.
             * likesGivenCount хранит подтверждённое число поставленных
             * отметок «Нравится» другим участникам. likesGivenAwardAt
             * хранит дату получения текущей максимальной ступени.
             */
            likesGivenAwardAt:
                0,

            likesGivenCount:
                0,

            chronistLevel:
                0,

            thoughtfulLevel:
                0,

            themeArticleCounts: {
                era_zarozhdeniya: 0,
                era_drakona: 0,
                kevariytsy: 0
            },

            themeActiveSeconds: {
                era_zarozhdeniya: 0,
                era_drakona: 0,
                kevariytsy: 0
            },

            themeArticleLevels: {
                era_zarozhdeniya: 0,
                era_drakona: 0,
                kevariytsy: 0
            },

            themeThoughtfulLevels: {
                era_zarozhdeniya: 0,
                era_drakona: 0,
                kevariytsy: 0
            }
        };
    }


    function sanitizePublicProgress(
        value,
        username
    ) {
        var result =
            createEmptyPublicProgress(
                username
            );

        if (!isPlainObject(value)) {
            return result;
        }

        result.articleCount =
            Math.max(
                0,
                Math.min(
                    MAX_ARTICLE_COUNT,
                    Math.floor(
                        Number(
                            value.articleCount
                        ) || 0
                    )
                )
            );

        result.activeSeconds =
            Math.max(
                0,
                Math.min(
                    MAX_ACTIVE_SECONDS,
                    Math.floor(
                        Number(
                            value.activeSeconds
                        ) || 0
                    )
                )
            );

        result.lastArticleAt =
            Math.max(
                0,
                Math.floor(
                    Number(
                        value.lastArticleAt
                    ) || 0
                )
            );

        result.updatedAt =
            Math.max(
                0,
                Math.floor(
                    Number(
                        value.updatedAt
                    ) || 0
                )
            );

        result.firstSeenAt =
            Math.max(
                0,
                Math.floor(
                    Number(
                        value.firstSeenAt
                    ) || 0
                )
            );

        result.hallTop500AwardAt =
            Math.max(
                0,
                Math.floor(
                    Number(
                        value.hallTop500AwardAt
                    ) || 0
                )
            );

        result.hallTop100AwardAt =
            Math.max(
                0,
                Math.floor(
                    Number(
                        value.hallTop100AwardAt
                    ) || 0
                )
            );

        result.hallTop10AwardAt =
            Math.max(
                0,
                Math.floor(
                    Number(
                        value.hallTop10AwardAt
                    ) || 0
                )
            );

        result.likesGivenAwardAt =
            Math.max(
                0,
                Math.floor(
                    Number(
                        value.likesGivenAwardAt
                    ) || 0
                )
            );


        result.likesGivenCount =
            Math.max(
                0,
                Math.min(
                    9999999,
                    Math.floor(
                        Number(
                            value.likesGivenCount
                        ) || 0
                    )
                )
            );

        result.chronistAwardAt =
            Math.max(
                0,
                Math.floor(
                    Number(
                        value.chronistAwardAt
                    ) || 0
                )
            );

        result.thoughtfulAwardAt =
            Math.max(
                0,
                Math.floor(
                    Number(
                        value.thoughtfulAwardAt
                    ) || 0
                )
            );

        var sourceArticleCounts =
            isPlainObject(
                value.themeArticleCounts
            )
                ? value.themeArticleCounts
                : {};

        var sourceActiveSeconds =
            isPlainObject(
                value.themeActiveSeconds
            )
                ? value.themeActiveSeconds
                : {};

        THEME_KEYS.forEach(function (themeKey) {
            result.themeArticleCounts[
                themeKey
            ] =
                Math.max(
                    0,
                    Math.min(
                        MAX_THEME_ARTICLE_COUNT,
                        Math.floor(
                            Number(
                                sourceArticleCounts[
                                    themeKey
                                ]
                            ) || 0
                        )
                    )
                );

            result.themeActiveSeconds[
                themeKey
            ] =
                Math.max(
                    0,
                    Math.min(
                        MAX_THEME_ACTIVE_SECONDS,
                        Math.floor(
                            Number(
                                sourceActiveSeconds[
                                    themeKey
                                ]
                            ) || 0
                        )
                    )
                );

            result.themeArticleLevels[
                themeKey
            ] =
                getTierLevel(
                    THEME_ARTICLE_THRESHOLDS,
                    result.themeArticleCounts[
                        themeKey
                    ]
                );

            result.themeThoughtfulLevels[
                themeKey
            ] =
                getTierLevel(
                    THEME_TIME_THRESHOLDS,
                    result.themeActiveSeconds[
                        themeKey
                    ]
                );
        });

        result.chronistLevel =
            getTierLevel(
                CHRONIST_THRESHOLDS,
                result.articleCount
            );

        result.thoughtfulLevel =
            getTierLevel(
                THOUGHTFUL_THRESHOLDS,
                result.activeSeconds
            );

        return result;
    }


    function parseProgressRecordLine(line) {
        line =
            String(line || '');

        /*
         * L5 — компактный позиционный формат. Порядок после username:
         * a, s, la, u, ca, ta, eza, ezs, eda, eds, kva, kvs,
         * fs, h500, h100, h10.
         *
         * Названия полей не повторяются в каждой строке, поэтому одна
         * запись примерно на треть короче LOFREAD4. Старые форматы ниже
         * продолжают читаться без потери совместимости.
         */
        /*
         * L7 = L6 + likesGivenCount последним позиционным полем.
         * Старые L6/L5 продолжают читаться ниже и безопасно мигрируют.
         */
        var matchL7 =
            line.match(
                /^L7\|([^|\r\n]+)\|([0-9]{1,4})\|([0-9]{1,8})\|([0-9]{1,10})\|([0-9]{10})\|([0-9]{1,10})\|([0-9]{1,10})\|([0-9]{1,3})\|([0-9]{1,7})\|([0-9]{1,3})\|([0-9]{1,7})\|([0-9]{1,3})\|([0-9]{1,7})\|([0-9]{10})\|([0-9]{1,10})\|([0-9]{1,10})\|([0-9]{1,10})\|([0-9]{1,10})\|([0-9]{1,7})$/
            );

        if (matchL7) {
            return sanitizePublicProgress(
                {
                    articleCount: Number(matchL7[2]),
                    activeSeconds: Number(matchL7[3]),
                    lastArticleAt: Number(matchL7[4]),
                    updatedAt: Number(matchL7[5]),
                    chronistAwardAt: Number(matchL7[6]),
                    thoughtfulAwardAt: Number(matchL7[7]),
                    themeArticleCounts: {
                        era_zarozhdeniya: Number(matchL7[8]),
                        era_drakona: Number(matchL7[10]),
                        kevariytsy: Number(matchL7[12])
                    },
                    themeActiveSeconds: {
                        era_zarozhdeniya: Number(matchL7[9]),
                        era_drakona: Number(matchL7[11]),
                        kevariytsy: Number(matchL7[13])
                    },
                    firstSeenAt: Number(matchL7[14]),
                    hallTop500AwardAt: Number(matchL7[15]),
                    hallTop100AwardAt: Number(matchL7[16]),
                    hallTop10AwardAt: Number(matchL7[17]),
                    likesGivenAwardAt: Number(matchL7[18]),
                    likesGivenCount: Number(matchL7[19])
                },
                matchL7[1]
            );
        }

        /*
         * L6 = L5 + likesGivenAwardAt последним позиционным полем.
         * Старые L5 продолжают читаться ниже и безопасно мигрируют.
         */
        var matchL6 =
            line.match(
                /^L6\|([^|\r\n]+)\|([0-9]{1,4})\|([0-9]{1,8})\|([0-9]{1,10})\|([0-9]{10})\|([0-9]{1,10})\|([0-9]{1,10})\|([0-9]{1,3})\|([0-9]{1,7})\|([0-9]{1,3})\|([0-9]{1,7})\|([0-9]{1,3})\|([0-9]{1,7})\|([0-9]{10})\|([0-9]{1,10})\|([0-9]{1,10})\|([0-9]{1,10})\|([0-9]{1,10})$/
            );

        if (matchL6) {
            return sanitizePublicProgress(
                {
                    articleCount: Number(matchL6[2]),
                    activeSeconds: Number(matchL6[3]),
                    lastArticleAt: Number(matchL6[4]),
                    updatedAt: Number(matchL6[5]),
                    chronistAwardAt: Number(matchL6[6]),
                    thoughtfulAwardAt: Number(matchL6[7]),
                    themeArticleCounts: {
                        era_zarozhdeniya: Number(matchL6[8]),
                        era_drakona: Number(matchL6[10]),
                        kevariytsy: Number(matchL6[12])
                    },
                    themeActiveSeconds: {
                        era_zarozhdeniya: Number(matchL6[9]),
                        era_drakona: Number(matchL6[11]),
                        kevariytsy: Number(matchL6[13])
                    },
                    firstSeenAt: Number(matchL6[14]),
                    hallTop500AwardAt: Number(matchL6[15]),
                    hallTop100AwardAt: Number(matchL6[16]),
                    hallTop10AwardAt: Number(matchL6[17]),
                    likesGivenAwardAt: Number(matchL6[18]),
                    likesGivenCount: Number(matchL6[18]) > 0 ? 1 : 0
                },
                matchL6[1]
            );
        }

        var matchL5 =
            line.match(
                /^L5\|([^|\r\n]+)\|([0-9]{1,4})\|([0-9]{1,8})\|([0-9]{1,10})\|([0-9]{10})\|([0-9]{1,10})\|([0-9]{1,10})\|([0-9]{1,3})\|([0-9]{1,7})\|([0-9]{1,3})\|([0-9]{1,7})\|([0-9]{1,3})\|([0-9]{1,7})\|([0-9]{10})\|([0-9]{1,10})\|([0-9]{1,10})\|([0-9]{1,10})$/
            );

        if (matchL5) {
            return sanitizePublicProgress(
                {
                    articleCount: Number(matchL5[2]),
                    activeSeconds: Number(matchL5[3]),
                    lastArticleAt: Number(matchL5[4]),
                    updatedAt: Number(matchL5[5]),
                    chronistAwardAt: Number(matchL5[6]),
                    thoughtfulAwardAt: Number(matchL5[7]),
                    themeArticleCounts: {
                        era_zarozhdeniya: Number(matchL5[8]),
                        era_drakona: Number(matchL5[10]),
                        kevariytsy: Number(matchL5[12])
                    },
                    themeActiveSeconds: {
                        era_zarozhdeniya: Number(matchL5[9]),
                        era_drakona: Number(matchL5[11]),
                        kevariytsy: Number(matchL5[13])
                    },
                    firstSeenAt: Number(matchL5[14]),
                    hallTop500AwardAt: Number(matchL5[15]),
                    hallTop100AwardAt: Number(matchL5[16]),
                    hallTop10AwardAt: Number(matchL5[17]),
                    likesGivenAwardAt: 0,
                    likesGivenCount: 0
                },
                matchL5[1]
            );
        }

        var matchV4 =
            line.match(
                /^LOFREAD4\|([^|\r\n]+)\|a=([0-9]{1,4})\|s=([0-9]{1,8})\|la=([0-9]{1,10})\|u=([0-9]{10})\|ca=([0-9]{1,10})\|ta=([0-9]{1,10})\|eza=([0-9]{1,3})\|ezs=([0-9]{1,7})\|eda=([0-9]{1,3})\|eds=([0-9]{1,7})\|kva=([0-9]{1,3})\|kvs=([0-9]{1,7})\|fs=([0-9]{10})\|h500=([0-9]{1,10})\|h100=([0-9]{1,10})\|h10=([0-9]{1,10})$/
            );

        if (matchV4) {
            return sanitizePublicProgress(
                {
                    articleCount:
                        Number(matchV4[2]),

                    activeSeconds:
                        Number(matchV4[3]),

                    lastArticleAt:
                        Number(matchV4[4]),

                    updatedAt:
                        Number(matchV4[5]),

                    chronistAwardAt:
                        Number(matchV4[6]),

                    thoughtfulAwardAt:
                        Number(matchV4[7]),

                    themeArticleCounts: {
                        era_zarozhdeniya:
                            Number(matchV4[8]),

                        era_drakona:
                            Number(matchV4[10]),

                        kevariytsy:
                            Number(matchV4[12])
                    },

                    themeActiveSeconds: {
                        era_zarozhdeniya:
                            Number(matchV4[9]),

                        era_drakona:
                            Number(matchV4[11]),

                        kevariytsy:
                            Number(matchV4[13])
                    },

                    firstSeenAt:
                        Number(matchV4[14]),

                    hallTop500AwardAt:
                        Number(matchV4[15]),

                    hallTop100AwardAt:
                        Number(matchV4[16]),

                    hallTop10AwardAt:
                        Number(matchV4[17])
                },
                matchV4[1]
            );
        }

        var matchV3 =
            line.match(
                /^LOFREAD3\|([^|\r\n]+)\|a=([0-9]{1,4})\|s=([0-9]{1,8})\|la=([0-9]{1,10})\|u=([0-9]{10})\|ca=([0-9]{1,10})\|ta=([0-9]{1,10})\|eza=([0-9]{1,3})\|ezs=([0-9]{1,7})\|eda=([0-9]{1,3})\|eds=([0-9]{1,7})\|kva=([0-9]{1,3})\|kvs=([0-9]{1,7})$/
            );

        if (matchV3) {
            return sanitizePublicProgress(
                {
                    articleCount:
                        Number(matchV3[2]),

                    activeSeconds:
                        Number(matchV3[3]),

                    lastArticleAt:
                        Number(matchV3[4]),

                    updatedAt:
                        Number(matchV3[5]),

                    chronistAwardAt:
                        Number(matchV3[6]),

                    thoughtfulAwardAt:
                        Number(matchV3[7]),

                    themeArticleCounts: {
                        era_zarozhdeniya:
                            Number(matchV3[8]),

                        era_drakona:
                            Number(matchV3[10]),

                        kevariytsy:
                            Number(matchV3[12])
                    },

                    themeActiveSeconds: {
                        era_zarozhdeniya:
                            Number(matchV3[9]),

                        era_drakona:
                            Number(matchV3[11]),

                        kevariytsy:
                            Number(matchV3[13])
                    },

                    firstSeenAt: 0,
                    hallTop500AwardAt: 0,
                    hallTop100AwardAt: 0,
                    hallTop10AwardAt: 0
                },
                matchV3[1]
            );
        }

        var matchV2 =
            line.match(
                /^LOFREAD2\|([^|\r\n]+)\|a=([0-9]{1,4})\|s=([0-9]{1,8})\|la=([0-9]{1,10})\|u=([0-9]{10})\|ca=([0-9]{1,10})\|ta=([0-9]{1,10})$/
            );

        if (matchV2) {
            return sanitizePublicProgress(
                {
                    articleCount:
                        Number(matchV2[2]),

                    activeSeconds:
                        Number(matchV2[3]),

                    lastArticleAt:
                        Number(matchV2[4]),

                    updatedAt:
                        Number(matchV2[5]),

                    chronistAwardAt:
                        Number(matchV2[6]),

                    thoughtfulAwardAt:
                        Number(matchV2[7]),

                    firstSeenAt: 0,
                    hallTop500AwardAt: 0,
                    hallTop100AwardAt: 0,
                    hallTop10AwardAt: 0
                },
                matchV2[1]
            );
        }

        var matchV1 =
            line.match(
                /^LOFREAD1\|([^|\r\n]+)\|a=([0-9]{1,4})\|s=([0-9]{1,8})\|la=([0-9]{1,10})\|u=([0-9]{10})$/
            );

        if (!matchV1) {
            return null;
        }

        var legacy =
            sanitizePublicProgress(
                {
                    articleCount:
                        Number(matchV1[2]),

                    activeSeconds:
                        Number(matchV1[3]),

                    lastArticleAt:
                        Number(matchV1[4]),

                    updatedAt:
                        Number(matchV1[5]),

                    chronistAwardAt:
                        0,

                    thoughtfulAwardAt:
                        0,

                    firstSeenAt: 0,
                    hallTop500AwardAt: 0,
                    hallTop100AwardAt: 0,
                    hallTop10AwardAt: 0
                },
                matchV1[1]
            );

        if (legacy.chronistLevel > 0) {
            legacy.chronistAwardAt =
                legacy.lastArticleAt ||
                legacy.updatedAt ||
                0;
        }

        if (legacy.thoughtfulLevel > 0) {
            legacy.thoughtfulAwardAt =
                legacy.updatedAt ||
                0;
        }

        return legacy;
    }


    function formatProgressRecordLine(
        progress
    ) {
        progress =
            sanitizePublicProgress(
                progress,
                progress.username
            );

        /*
         * L7 хранит поля позиционно, сохраняя компактность L6 и добавляя
         * только одно последнее поле количества поставленных лайков.
         */
        return (
            PROGRESS_RECORD_VERSION +
            '|' + progress.username +
            '|' + progress.articleCount +
            '|' + progress.activeSeconds +
            '|' + progress.lastArticleAt +
            '|' + progress.updatedAt +
            '|' + progress.chronistAwardAt +
            '|' + progress.thoughtfulAwardAt +
            '|' + progress.themeArticleCounts.era_zarozhdeniya +
            '|' + progress.themeActiveSeconds.era_zarozhdeniya +
            '|' + progress.themeArticleCounts.era_drakona +
            '|' + progress.themeActiveSeconds.era_drakona +
            '|' + progress.themeArticleCounts.kevariytsy +
            '|' + progress.themeActiveSeconds.kevariytsy +
            '|' + progress.firstSeenAt +
            '|' + progress.hallTop500AwardAt +
            '|' + progress.hallTop100AwardAt +
            '|' + progress.hallTop10AwardAt +
            '|' + progress.likesGivenAwardAt +
            '|' + progress.likesGivenCount
        );
    }


    function createNewProgressSegmentText(
        progress
    ) {
        return (
            '<div class="' +
            DATA_CLASS +
            '"><nowiki>\n' +
            PROGRESS_HEADER +
            '\n' +
            formatProgressRecordLine(
                progress
            ) +
            '\n</nowiki></div>'
        );
    }


    function parseProgressSegmentText(
        content,
        title
    ) {
        var normalized =
            String(content || '')
                .replace(/\r\n/g, '\n')
                .replace(/\r/g, '\n');

        var lines =
            normalized.split('\n');

        if (
            lines.length &&
            lines[lines.length - 1] === ''
        ) {
            lines.pop();
        }

        if (
            lines.length < 3 ||
            lines[0] !==
                '<div class="' +
                DATA_CLASS +
                '"><nowiki>' ||
            lines[1] !==
                PROGRESS_HEADER ||
            lines[lines.length - 1] !==
                '</nowiki></div>'
        ) {
            throw new Error(
                'Повреждён формат progress-сегмента: ' +
                title
            );
        }

        var records = {};
        var indexes = {};

        for (
            var i = 2;
            i < lines.length - 1;
            i++
        ) {
            if (!lines[i]) {
                throw new Error(
                    'Пустая строка внутри progress-сегмента: ' +
                    title
                );
            }

            var record =
                parseProgressRecordLine(
                    lines[i]
                );

            if (!record) {
                throw new Error(
                    'Некорректная запись progress-сегмента: ' +
                    lines[i]
                );
            }

            if (records[record.username]) {
                throw new Error(
                    'Повторная запись пользователя в progress-сегменте: ' +
                    record.username
                );
            }

            records[record.username] =
                record;

            indexes[record.username] =
                i;
        }

        return {
            title:
                title,

            lines:
                lines,

            records:
                records,

            indexes:
                indexes
        };
    }


    function readProgressSegment(
        username,
        forceReload
    ) {
        username =
            normalizeProgressUsername(
                username
            );

        var title =
            getProgressSegmentTitle(
                username
            );

        if (
            progressSegmentCache[title] &&
            !forceReload
        ) {
            return Promise.resolve(
                cloneData(
                    progressSegmentCache[title]
                )
            );
        }

        return readWikiPage(title)
            .then(function (page) {
                var result = {
                    exists:
                        page.exists,

                    title:
                        title,

                    revid:
                        page.revid || 0,

                    content:
                        page.content || '',

                    segment:
                        null
                };

                if (page.exists) {
                    result.segment =
                        parseProgressSegmentText(
                            page.content,
                            title
                        );
                }

                progressSegmentCache[title] =
                    cloneData(result);

                return result;
            });
    }


    function clearProgressSegmentCache(
        username
    ) {
        delete progressSegmentCache[
            getProgressSegmentTitle(
                username
            )
        ];
    }


    function readUserProgress(
        user,
        forceReload
    ) {
        if (!user || !user.name) {
            return Promise.resolve(
                createEmptyPublicProgress('')
            );
        }

        return readProgressSegment(
            user.name,
            forceReload
        ).then(function (loaded) {
            if (
                !loaded.exists ||
                !loaded.segment
            ) {
                return createEmptyPublicProgress(
                    user.name
                );
            }

            var progress =
                loaded.segment.records[
                    user.name
                ];

            return progress
                ? cloneData(progress)
                : createEmptyPublicProgress(
                    user.name
                );
        });
    }


    function getEarliestReliableUnixFromMap(map) {
        if (!isPlainObject(map)) {
            return 0;
        }

        var earliest =
            0;

        Object.keys(map).forEach(
            function (key) {
                var value =
                    Math.floor(
                        Number(
                            map[key]
                        ) || 0
                    );

                /*
                 * Игнорируем технические fallback-значения 1.
                 * 2000-01-01 используется и в formatAchievementDate.
                 */
                if (
                    value < 946684800
                ) {
                    return;
                }

                if (
                    !earliest ||
                    value < earliest
                ) {
                    earliest =
                        value;
                }
            }
        );

        return earliest;
    }


    function getLocalWikiPresenceStartUnix(
        protectedMap,
        progress,
        editorMap
    ) {
        progress =
            sanitizePublicProgress(
                progress,
                progress &&
                progress.username
            );

        var candidates = [
            progress.firstSeenAt,
            progress.chronistAwardAt,
            progress.thoughtfulAwardAt,
            progress.lastArticleAt,
            getEarliestReliableUnixFromMap(
                protectedMap
            ),
            getEarliestReliableUnixFromMap(
                editorMap
            )
        ];

        var earliest =
            0;

        candidates.forEach(
            function (value) {
                value =
                    Math.floor(
                        Number(value) || 0
                    );

                if (
                    value < 946684800
                ) {
                    return;
                }

                if (
                    !earliest ||
                    value < earliest
                ) {
                    earliest =
                        value;
                }
            }
        );

        return earliest;
    }



    function getFamilyMetricValue(familyId, context) {
        context = context || {};
        var progress = context.progress || {};
        var editorStats = context.editorStats || {};

        var values = {
            chronist: Number(progress.articleCount || 0),
            thoughtful_chronist: Number(progress.activeSeconds || 0),
            letopisets: Number(editorStats.editCount || 0),
            zodchiy: Number(editorStats.createdArticles || 0),
            multigran: Number(editorStats.uniqueArticles || 0),
            verny_letopisets: Number(editorStats.distinctEditDays || 0),
            neutomimoe_pero: Number(editorStats.maxEditsInOneDay || 0),
            vozvrashchenie_k_letopisi: Number(editorStats.maxReturnGapSeconds || 0),
            chernilny_potok: Number(editorStats.positiveBytes || 0),
            chernilny_sled: Number(editorStats.uniqueArticles || 0),
            ruka_letopistsa: Number(editorStats.majorEdits || 0),
            hudozhnik: Number(editorStats.uploadedFiles || 0),
            starozhil: Number(context.starozhilDays || 0),
            neslomlennaya_tsep: Number(editorStats.maxConsecutiveEditDays || 0),
            probuzhdayushchiy_stranitsy: Number(editorStats.awakenedArticles || 0),
            ispravitel: Number(editorStats.correctiveEdits || 0),
            tkach_kategoriy: Number(editorStats.createdCategories || 0),
            tkach_shablonov: Number(editorStats.createdTemplates || 0),
            arkhivarius: Number(editorStats.uniqueTechnicalPages || 0),
            neutomimyy_zodchiy: Number(editorStats.maxCreatedArticlesInOneDay || 0),
            hranitel_drevnostey: Math.floor(
                Number(editorStats.maxDormantGapSeconds || 0) / 86400
            ),
            chronist_era_zarozhdeniya: Number(
                progress.themeArticleCounts &&
                progress.themeArticleCounts.era_zarozhdeniya || 0
            ),
            thoughtful_era_zarozhdeniya: Number(
                progress.themeActiveSeconds &&
                progress.themeActiveSeconds.era_zarozhdeniya || 0
            ),
            chronist_era_drakona: Number(
                progress.themeArticleCounts &&
                progress.themeArticleCounts.era_drakona || 0
            ),
            thoughtful_era_drakona: Number(
                progress.themeActiveSeconds &&
                progress.themeActiveSeconds.era_drakona || 0
            ),
            chronist_kevariytsy: Number(
                progress.themeArticleCounts &&
                progress.themeArticleCounts.kevariytsy || 0
            ),
            thoughtful_kevariytsy: Number(
                progress.themeActiveSeconds &&
                progress.themeActiveSeconds.kevariytsy || 0
            ),
            comm_voice: Number(
                editorStats.discussionStats &&
                editorStats.discussionStats.total || 0
            ),
            comm_given_like: Number(
                progress.likesGivenCount || 0
            )
        };

        return Math.max(0, Number(values[familyId] || 0));
    }


    function buildMetaAchievementFacts(
        catalog,
        achievementMap,
        context
    ) {
        var sourceMap = {};
        var rarities = {};
        var categories = {};
        var familyMaxTier = {};
        var familyAwardAt = {};
        var familyAchievement = {};
        var logicalGrade3 = {};
        var secretLogical = {};
        var logicalTimeline = [];
        var tierSteps = 0;
        var completeChains = 0;
        var completeCategories = {};
        var beyondHundred = 0;

        Object.keys(achievementMap || {}).forEach(function (achievementId) {
            if (
                ACHIEVEMENT_COUNT_MILESTONE_IDS[achievementId] ||
                META_ACHIEVEMENT_IDS[achievementId] ||
                achievementId === HALL_TOP_500_ID ||
                achievementId === HALL_TOP_100_ID ||
                achievementId === HALL_TOP_10_ID
            ) {
                return;
            }

            sourceMap[achievementId] = achievementMap[achievementId];
        });

        function registerTimeline(
            logicalId,
            achievementId,
            achievement,
            earnedAt
        ) {
            var unix = Number(earnedAt || 0);
            var rarity = getRarityInfo(catalog, achievement);

            logicalTimeline.push({
                logicalId: logicalId,
                achievementId: achievementId,
                achievement: achievement,
                earnedAt: unix,
                rarity: rarity,
                category: getAchievementVisualCategory(
                    achievementId,
                    achievement
                )
            });
        }

        Object.keys(sourceMap).forEach(function (achievementId) {
            var achievement = getAchievement(catalog, achievementId);
            if (!achievement) {
                return;
            }

            var logicalId = achievement.family
                ? 'family:' + String(achievement.family)
                : 'achievement:' + achievementId;

            categories[
                getAchievementVisualCategory(achievementId, achievement)
            ] = true;

            if (
                achievement.hidden === true ||
                achievement.secret === true
            ) {
                secretLogical[logicalId] = true;
            }

            if (achievement.family) {
                var familyId = String(achievement.family);
                var tier = Math.max(
                    1,
                    Math.floor(Number(achievement.tier) || 1)
                );

                if (
                    tier > Number(familyMaxTier[familyId] || 0)
                ) {
                    familyMaxTier[familyId] = tier;
                    familyAwardAt[familyId] = Number(
                        sourceMap[achievementId] || 0
                    );
                    familyAchievement[familyId] = {
                        id: achievementId,
                        achievement: achievement
                    };
                }
                return;
            }

            var rarity = getRarityInfo(catalog, achievement);
            rarities[rarity.key] = true;

            if (Number(rarity.grade) === 3) {
                logicalGrade3[logicalId] = true;
            }

            registerTimeline(
                logicalId,
                achievementId,
                achievement,
                sourceMap[achievementId]
            );
        });

        Object.keys(familyMaxTier).forEach(function (familyId) {
            var family =
                catalog && catalog.families &&
                catalog.families[familyId];

            if (
                !family ||
                !Array.isArray(family.thresholds) ||
                !family.thresholds.length
            ) {
                return;
            }

            var maxTier = Math.min(
                family.thresholds.length,
                Math.max(1, Math.floor(Number(familyMaxTier[familyId]) || 1))
            );

            tierSteps += maxTier;

            if (maxTier >= family.thresholds.length) {
                completeChains++;

                var completeAchievement = getAchievement(
                    catalog,
                    familyId + '_' +
                    String(family.thresholds.length).padStart(2, '0')
                );

                var completeCategory = getAchievementVisualCategory(
                    completeAchievement ? completeAchievement.id : '',
                    completeAchievement || { family: familyId }
                );

                if (
                    /^(?:reading|editing|creation|activity)$/.test(
                        completeCategory
                    )
                ) {
                    completeCategories[completeCategory] = true;
                }

                var metric = getFamilyMetricValue(familyId, context);
                var lastThreshold = Number(
                    family.thresholds[family.thresholds.length - 1] || 0
                );

                if (
                    lastThreshold > 0 &&
                    metric >= lastThreshold * 1.5
                ) {
                    beyondHundred++;
                }
            }

            var familyHasGrade3 = false;

            for (var level = 1; level <= maxTier; level++) {
                var rarityKey =
                    family.rarity ||
                    getRarityKeyForLevel(catalog, level);

                if (!rarityKey) {
                    continue;
                }

                rarityKey = String(rarityKey);
                rarities[rarityKey] = true;

                var rarityConfig =
                    catalog && catalog.rarities &&
                    catalog.rarities[rarityKey];

                if (
                    rarityConfig &&
                    Number(rarityConfig.grade) === 3
                ) {
                    familyHasGrade3 = true;
                }
            }

            if (familyHasGrade3) {
                logicalGrade3['family:' + familyId] = true;
            }

            var familyEntry = familyAchievement[familyId];
            if (familyEntry) {
                registerTimeline(
                    'family:' + familyId,
                    familyEntry.id,
                    familyEntry.achievement,
                    familyAwardAt[familyId]
                );
            }
        });

        var grades = {};
        Object.keys(rarities).forEach(function (rarityKey) {
            var rarityConfig =
                catalog && catalog.rarities &&
                catalog.rarities[rarityKey];

            if (!rarityConfig) {
                return;
            }

            grades[
                String(
                    Math.max(
                        1,
                        Math.min(
                            3,
                            Math.floor(Number(rarityConfig.grade) || 1)
                        )
                    )
                )
            ] = true;
        });

        var awardDays = {};
        var awardsByDay = {};
        var categoriesByDay = {};

        logicalTimeline.forEach(function (entry) {
            if (entry.earnedAt < 946684800) {
                return;
            }

            var day = new Date(entry.earnedAt * 1000)
                .toISOString()
                .slice(0, 10);

            awardDays[day] = true;
            awardsByDay[day] = Number(awardsByDay[day] || 0) + 1;

            if (!categoriesByDay[day]) {
                categoriesByDay[day] = {};
            }
            categoriesByDay[day][entry.category] = true;
        });

        var maxAwardsInDay = 0;
        var maxAwardCategoriesInDay = 0;

        Object.keys(awardDays).forEach(function (day) {
            maxAwardsInDay = Math.max(
                maxAwardsInDay,
                Number(awardsByDay[day] || 0)
            );
            maxAwardCategoriesInDay = Math.max(
                maxAwardCategoriesInDay,
                Object.keys(categoriesByDay[day] || {}).length
            );
        });

        var dayIndexes = Object.keys(awardDays)
            .map(function (day) {
                return Math.floor(
                    Date.parse(day + 'T00:00:00Z') / 86400000
                );
            })
            .sort(function (a, b) { return a - b; });

        var maxAwardDaysInSeven = 0;
        var left = 0;
        for (var right = 0; right < dayIndexes.length; right++) {
            while (
                dayIndexes[right] - dayIndexes[left] > 6
            ) {
                left++;
            }
            maxAwardDaysInSeven = Math.max(
                maxAwardDaysInSeven,
                right - left + 1
            );
        }

        var relicCoverageKeys = [
            'common', 'unusual', 'notable', 'special', 'rare',
            'outstanding', 'superior', 'exceptional', 'unique',
            'exotic', 'relic'
        ];
        var raritiesToRelic = relicCoverageKeys.filter(
            function (key) { return !!rarities[key]; }
        ).length;

        return {
            rarityCount: Object.keys(rarities).length,
            gradeCount: Object.keys(grades).length,
            categoryCount: [
                'reading',
                'editing',
                'creation',
                'activity',
                'special'
            ].filter(function (key) {
                return !!categories[key];
            }).length,
            secretCount: Object.keys(secretLogical).length,
            startedChains: Object.keys(familyMaxTier).length,
            completeChains: completeChains,
            completeCategoryCount: Object.keys(completeCategories).length,
            tierSteps: tierSteps,
            grade3Count: Object.keys(logicalGrade3).length,
            awardDayCount: Object.keys(awardDays).length,
            maxAwardsInDay: maxAwardsInDay,
            maxAwardDaysInSeven: maxAwardDaysInSeven,
            maxAwardCategoriesInDay: maxAwardCategoriesInDay,
            raritiesToRelic: raritiesToRelic,
            beyondHundred: beyondHundred,
            rarities: rarities,
            logicalTimeline: logicalTimeline
        };
    }


    function metaRuleCurrentValue(
        rule,
        facts
    ) {
        if (!rule || !facts) {
            return 0;
        }

        switch (String(rule.type || '')) {
            case 'rarities':
                return facts.rarityCount;
            case 'grades':
                return facts.gradeCount;
            case 'rarity':
                return facts.rarities &&
                    facts.rarities[String(rule.rarity || '')]
                        ? 1 : 0;
            case 'secrets':
                return facts.secretCount;
            case 'categories':
                return facts.categoryCount;
            case 'startedChains':
                return facts.startedChains;
            case 'completeChains':
                return facts.completeChains;
            case 'completeCategories':
                return facts.completeCategoryCount;
            case 'tierSteps':
                return facts.tierSteps;
            case 'grade3':
                return facts.grade3Count;
            case 'raritiesToRelic':
                return facts.raritiesToRelic;
            case 'awardDays':
                return facts.awardDayCount;
            case 'maxAwardsDay':
                return facts.maxAwardsInDay;
            case 'awardDaysSeven':
                return facts.maxAwardDaysInSeven;
            case 'maxAwardCategoriesDay':
                return facts.maxAwardCategoriesInDay;
            case 'beyondHundred':
                return facts.beyondHundred;
            default:
                return 0;
        }
    }


    function deriveMetaAchievementAwardAt(
        rule,
        facts
    ) {
        if (!rule || !facts) {
            return 0;
        }

        var timeline = Array.isArray(facts.logicalTimeline)
            ? facts.logicalTimeline
                .filter(function (entry) {
                    return Number(entry.earnedAt || 0) >= 946684800;
                })
                .slice()
                .sort(function (a, b) {
                    return Number(a.earnedAt || 0) - Number(b.earnedAt || 0);
                })
            : [];

        if (!timeline.length) {
            return 0;
        }

        function nthDistinct(entries, threshold, keyFn) {
            var seen = {};
            var count = 0;

            for (var i = 0; i < entries.length; i++) {
                var key = String(keyFn(entries[i]) || '');
                if (!key || seen[key]) {
                    continue;
                }

                seen[key] = true;
                count++;

                if (count >= threshold) {
                    return Number(entries[i].earnedAt || 0);
                }
            }

            return 0;
        }

        var threshold = Math.max(1, Number(rule.threshold) || 1);
        var type = String(rule.type || '');

        if (type === 'rarity') {
            for (var r = 0; r < timeline.length; r++) {
                if (
                    timeline[r].rarity &&
                    String(timeline[r].rarity.key) === String(rule.rarity || '')
                ) {
                    return Number(timeline[r].earnedAt || 0);
                }
            }
        }

        if (type === 'secrets') {
            var secretEntries = timeline.filter(function (entry) {
                return entry.achievement &&
                    (
                        entry.achievement.hidden === true ||
                        entry.achievement.secret === true
                    );
            });

            if (secretEntries.length >= threshold) {
                return Number(secretEntries[threshold - 1].earnedAt || 0);
            }
        }

        if (type === 'categories') {
            return nthDistinct(
                timeline.filter(function (entry) {
                    return /^(?:reading|editing|creation|activity|special)$/.test(
                        String(entry.category || '')
                    );
                }),
                threshold,
                function (entry) { return entry.category; }
            );
        }

        if (type === 'startedChains') {
            return nthDistinct(
                timeline.filter(function (entry) {
                    return entry.achievement && entry.achievement.family;
                }),
                threshold,
                function (entry) {
                    return entry.achievement.family;
                }
            );
        }

        if (type === 'completeChains') {
            var completeEntries = timeline.filter(function (entry) {
                return entry.achievement &&
                    entry.achievement.family &&
                    Number(entry.achievement.tier || 0) >= 100;
            });

            if (completeEntries.length >= threshold) {
                return Number(completeEntries[threshold - 1].earnedAt || 0);
            }
        }

        if (type === 'completeCategories') {
            var completeCategoryEntries = timeline.filter(function (entry) {
                return entry.achievement &&
                    entry.achievement.family &&
                    Number(entry.achievement.tier || 0) >= 100 &&
                    /^(?:reading|editing|creation|activity)$/.test(
                        String(entry.category || '')
                    );
            });

            return nthDistinct(
                completeCategoryEntries,
                threshold,
                function (entry) { return entry.category; }
            );
        }

        if (type === 'tierSteps') {
            var familyEvents = timeline
                .filter(function (entry) {
                    return entry.achievement && entry.achievement.family;
                })
                .sort(function (a, b) {
                    return Number(a.earnedAt || 0) - Number(b.earnedAt || 0);
                });

            var steps = 0;
            for (var f = 0; f < familyEvents.length; f++) {
                steps += Math.max(
                    1,
                    Math.floor(Number(familyEvents[f].achievement.tier) || 1)
                );

                if (steps >= threshold) {
                    return Number(familyEvents[f].earnedAt || 0);
                }
            }
        }

        if (type === 'grade3') {
            var grade3Entries = timeline.filter(function (entry) {
                return entry.rarity && Number(entry.rarity.grade) === 3;
            });

            if (grade3Entries.length >= threshold) {
                return Number(grade3Entries[threshold - 1].earnedAt || 0);
            }
        }

        if (type === 'awardDays') {
            return nthDistinct(
                timeline,
                threshold,
                function (entry) {
                    return new Date(Number(entry.earnedAt) * 1000)
                        .toISOString()
                        .slice(0, 10);
                }
            );
        }

        if (type === 'maxAwardsDay') {
            var byDay = {};

            timeline.forEach(function (entry) {
                var day = new Date(Number(entry.earnedAt) * 1000)
                    .toISOString()
                    .slice(0, 10);

                if (!byDay[day]) {
                    byDay[day] = [];
                }

                byDay[day].push(entry);
            });

            var days = Object.keys(byDay).sort();
            for (var d = 0; d < days.length; d++) {
                var dayEntries = byDay[days[d]]
                    .slice()
                    .sort(function (a, b) {
                        return Number(a.earnedAt) - Number(b.earnedAt);
                    });

                if (dayEntries.length >= threshold) {
                    return Number(dayEntries[threshold - 1].earnedAt || 0);
                }
            }
        }

        if (type === 'awardDaysSeven') {
            var distinctDays = [];
            var seenDays = {};

            timeline.forEach(function (entry) {
                var day = new Date(Number(entry.earnedAt) * 1000)
                    .toISOString()
                    .slice(0, 10);

                if (!seenDays[day]) {
                    seenDays[day] = true;
                    distinctDays.push({
                        day: day,
                        index: Math.floor(Date.parse(day + 'T00:00:00Z') / 86400000),
                        earnedAt: Number(entry.earnedAt || 0)
                    });
                }
            });

            distinctDays.sort(function (a, b) { return a.index - b.index; });

            var left = 0;
            for (var right = 0; right < distinctDays.length; right++) {
                while (
                    distinctDays[right].index - distinctDays[left].index > 6
                ) {
                    left++;
                }

                if (right - left + 1 >= threshold) {
                    return distinctDays[right].earnedAt;
                }
            }
        }

        if (type === 'maxAwardCategoriesDay') {
            var categoriesByDay = {};

            timeline.forEach(function (entry) {
                var day = new Date(Number(entry.earnedAt) * 1000)
                    .toISOString()
                    .slice(0, 10);

                if (!categoriesByDay[day]) {
                    categoriesByDay[day] = {};
                }

                if (!categoriesByDay[day][entry.category]) {
                    categoriesByDay[day][entry.category] = Number(entry.earnedAt || 0);
                }
            });

            var categoryDays = Object.keys(categoriesByDay).sort();
            for (var c = 0; c < categoryDays.length; c++) {
                var times = Object.keys(categoriesByDay[categoryDays[c]])
                    .map(function (key) {
                        return categoriesByDay[categoryDays[c]][key];
                    })
                    .sort(function (a, b) { return a - b; });

                if (times.length >= threshold) {
                    return Number(times[threshold - 1] || 0);
                }
            }
        }

        /*
         * Для охвата редкостей/градаций и «За гранью сотни» старая
         * архитектура не хранит отдельный timestamp каждой промежуточной
         * редкости. Берём последнюю реально известную дату достижения,
         * которая уже участвовала в вычислении условия. Это стабильная
         * серверная дата, а не текущий момент открытия профиля.
         */
        return Number(timeline[timeline.length - 1].earnedAt || 0);
    }


    function addMetaAchievements(
        catalog,
        achievementMap,
        context
    ) {
        achievementMap =
            isPlainObject(
                achievementMap
            )
                ? achievementMap
                : {};

        var facts =
            buildMetaAchievementFacts(
                catalog,
                achievementMap,
                context
            );

        var previousMetaTimes = {};

        META_ACHIEVEMENT_RULES.forEach(function (rule) {
            previousMetaTimes[rule.id] = Number(
                achievementMap[rule.id] || 0
            );

            delete achievementMap[
                rule.id
            ];
        });

        META_ACHIEVEMENT_RULES.forEach(function (rule) {
            var achievement =
                getAchievement(
                    catalog,
                    rule.id
                );

            if (!achievement) {
                return;
            }

            var currentValue =
                metaRuleCurrentValue(
                    rule,
                    facts
                );

            if (
                currentValue >=
                Number(
                    rule.threshold || 0
                )
            ) {
                /*
                 * Значение 1 намеренно стабильно. Оно отмечает факт
                 * автоматической выдачи, но не меняется при новых
                 * правках, поэтому popup не повторяется при каждом
                 * пересчёте профиля.
                 */
                var previousAwardAt = Number(
                    previousMetaTimes[rule.id] || 0
                );

                achievementMap[
                    rule.id
                ] =
                    previousAwardAt >= 946684800
                        ? previousAwardAt
                        : (
                            deriveMetaAchievementAwardAt(
                                rule,
                                facts
                            ) ||
                            1
                        );
            }
        });

        return achievementMap;
    }


    function getMetaAchievementProgressInfo(
        achievement,
        facts
    ) {
        if (
            !achievement ||
            !META_ACHIEVEMENT_IDS[
                achievement.id
            ] ||
            !facts
        ) {
            return null;
        }

        var rule = META_RULE_BY_ID[achievement.id] || null;

        if (!rule) {
            return null;
        }

        var currentValue =
            Math.max(
                0,
                Number(
                    metaRuleCurrentValue(
                        rule,
                        facts
                    )
                ) || 0
            );

        var threshold =
            Math.max(
                1,
                Number(
                    rule.threshold
                ) || 1
            );

        var progressSeriesInfo =
            META_PROGRESS_ID_INFO[achievement.id];

        /*
         * Если текущий рубеж уже пройден и у этой смысловой линии есть
         * следующий рубеж, карточка показывает прогресс именно к нему.
         * Если следующего рубежа нет, больше не остаётся бессмысленных
         * «10 / 10 · 100%» — выводится «Высшая стадия».
         */
        if (
            currentValue >= threshold &&
            progressSeriesInfo
        ) {
            var nextId =
                progressSeriesInfo.ids[
                    progressSeriesInfo.index + 1
                ];

            if (!nextId) {
                return {
                    complete: true,
                    percent: 100,
                    hidePercentLabel: true,
                    text:
                        'Высшая стадия · ' +
                        String(
                            Math.min(
                                Math.floor(currentValue),
                                Math.floor(threshold)
                            )
                        ) +
                        ' / ' +
                        String(Math.floor(threshold))
                };
            }

            var nextRule = META_RULE_BY_ID[nextId] || null;

            if (nextRule) {
                var nextThreshold =
                    Math.max(
                        1,
                        Number(nextRule.threshold) || 1
                    );

                var nextPercent =
                    Math.max(
                        0,
                        Math.min(
                            100,
                            Math.floor(
                                currentValue /
                                nextThreshold *
                                100
                            )
                        )
                    );

                var nextAchievement =
                    getAchievement(
                        catalogCache || {},
                        nextId
                    );

                return {
                    complete: false,
                    percent: nextPercent,
                    text:
                        'До ' +
                        (
                            nextAchievement &&
                            nextAchievement.title
                                ? nextAchievement.title
                                : 'следующей стадии'
                        ) +
                        ': ' +
                        String(Math.floor(currentValue)) +
                        ' / ' +
                        String(Math.floor(nextThreshold)) +
                        ' · ' +
                        String(nextPercent) +
                        '%'
                };
            }
        }

        var percent =
            Math.max(
                0,
                Math.min(
                    100,
                    Math.floor(
                        currentValue /
                        threshold *
                        100
                    )
                )
            );

        return {
            complete:
                currentValue >=
                    threshold,

            percent:
                percent,

            text:
                String(
                    Math.floor(
                        currentValue
                    )
                ) +
                ' / ' +
                String(
                    Math.floor(
                        threshold
                    )
                ) +
                ' · ' +
                String(
                    percent
                ) +
                '%'
        };
    }


    function deriveAchievementCollectorAwardAt(
        catalog,
        achievementMap,
        threshold
    ) {
        var logical = {};

        Object.keys(achievementMap || {}).forEach(function (achievementId) {
            if (
                ACHIEVEMENT_COUNT_MILESTONE_IDS[achievementId] ||
                META_ACHIEVEMENT_IDS[achievementId] ||
                achievementId === HALL_TOP_500_ID ||
                achievementId === HALL_TOP_100_ID ||
                achievementId === HALL_TOP_10_ID
            ) {
                return;
            }

            var achievement = getAchievement(catalog, achievementId);
            if (!achievement) {
                return;
            }

            var unix = Number(achievementMap[achievementId] || 0);
            if (unix < 946684800) {
                return;
            }

            var logicalId = achievement.family
                ? 'family:' + String(achievement.family)
                : 'achievement:' + achievementId;

            var previous = logical[logicalId];
            if (
                !previous ||
                Number(achievement.tier || 0) >
                    Number(previous.achievement.tier || 0)
            ) {
                logical[logicalId] = {
                    achievement: achievement,
                    earnedAt: unix
                };
            }
        });

        var entries = Object.keys(logical)
            .map(function (key) { return logical[key]; })
            .sort(function (a, b) {
                return Number(a.earnedAt) - Number(b.earnedAt);
            });

        threshold = Math.max(1, Math.floor(Number(threshold) || 1));

        return entries.length >= threshold
            ? Number(entries[threshold - 1].earnedAt || 0)
            : 0;
    }


    function addAchievementCountMilestones(
        catalog,
        achievementMap
    ) {
        var previousTimes = {};

        ACHIEVEMENT_COUNT_MILESTONES.forEach(function (item) {
            previousTimes[item.id] = achievementMap[item.id];
            delete achievementMap[item.id];
        });

        /*
         * TEST 1.12.9:
         * серия выдаётся как одна цепочка. В карте остаётся только
         * максимальная достигнутая ступень. Поэтому I/II/III и т. д.
         * не лежат рядом и не увеличивают количество достижений.
         */
        var state = getAchievementCollectorState(
            catalog,
            achievementMap
        );

        if (
            state.current &&
            getAchievement(catalog, state.current.id)
        ) {
            var previousCollectorAt = Number(
                previousTimes[state.current.id] || 0
            );

            achievementMap[state.current.id] =
                previousCollectorAt >= 946684800
                    ? previousCollectorAt
                    : (
                        deriveAchievementCollectorAwardAt(
                            catalog,
                            achievementMap,
                            state.current.threshold
                        ) ||
                        1
                    );
        }

        return achievementMap;
    }


    function addDerivedHiddenAchievements(
        catalog,
        achievementMap
    ) {
        achievementMap = isPlainObject(achievementMap)
            ? achievementMap
            : {};

        /* «По ту сторону Летописи»: две разные скрытые награды за час. */
        var hiddenTimes = [];
        Object.keys(HIDDEN_AUTOMATIC_ACHIEVEMENT_IDS).forEach(
            function (achievementId) {
                if (
                    achievementId === 'hidden_beyond_chronicle' ||
                    achievementId === 'hidden_thirteenth_sign'
                ) {
                    return;
                }

                var unix = Number(achievementMap[achievementId] || 0);
                if (unix >= 946684800) {
                    hiddenTimes.push({ id: achievementId, unix: unix });
                }
            }
        );

        hiddenTimes.sort(function (a, b) {
            return a.unix - b.unix;
        });

        for (var i = 1; i < hiddenTimes.length; i++) {
            if (
                hiddenTimes[i].id !== hiddenTimes[i - 1].id &&
                hiddenTimes[i].unix - hiddenTimes[i - 1].unix <=
                    HIDDEN_PAIR_WINDOW_SECONDS
            ) {
                achievementMap.hidden_beyond_chronicle =
                    hiddenTimes[i].unix;
                break;
            }
        }

        /*
         * «Тринадцатый знак»: мета/коллекторные награды не вмешиваются
         * в последовательность. Уровневая семья считается одним логическим
         * достижением по текущей максимальной подтверждённой ступени.
         */
        var logical = {};

        Object.keys(achievementMap).forEach(function (achievementId) {
            if (
                ACHIEVEMENT_COUNT_MILESTONE_IDS[achievementId] ||
                META_ACHIEVEMENT_IDS[achievementId] ||
                achievementId === HALL_TOP_500_ID ||
                achievementId === HALL_TOP_100_ID ||
                achievementId === HALL_TOP_10_ID ||
                achievementId === 'hidden_thirteenth_sign'
            ) {
                return;
            }

            var achievement = getAchievement(catalog, achievementId);
            if (!achievement) {
                return;
            }

            var unix = Number(achievementMap[achievementId] || 0);
            if (unix < 946684800) {
                return;
            }

            var logicalId = achievement.family
                ? 'family:' + String(achievement.family)
                : 'achievement:' + achievementId;

            var previous = logical[logicalId];
            if (
                !previous ||
                Number(achievement.tier || 0) >
                    Number(previous.achievement.tier || 0)
            ) {
                logical[logicalId] = {
                    id: achievementId,
                    achievement: achievement,
                    unix: unix
                };
            }
        });

        var timeline = Object.keys(logical)
            .map(function (key) { return logical[key]; })
            .sort(function (a, b) {
                if (a.unix !== b.unix) {
                    return a.unix - b.unix;
                }
                return String(a.id).localeCompare(String(b.id), 'ru');
            });

        if (timeline.length >= 13) {
            var thirteenth = timeline[12];
            var rarity = getRarityInfo(
                catalog,
                thirteenth.achievement
            );

            if (rarity.key === 'mythic') {
                achievementMap.hidden_thirteenth_sign =
                    thirteenth.unix;
            }
        }

        return achievementMap;
    }


    function buildEffectiveAchievementMap(
        catalog,
        user,
        protectedMap,
        progress,
        editorMap,
        editorStats
    ) {
        var result =
            addAutomaticFirstLogin(
                catalog,
                user,
                protectedMap
            );

        progress =
            sanitizePublicProgress(
                progress,
                user.name
            );

        var givenLikeLevel =
            getTierLevel(
                COMM_GIVEN_LIKE_THRESHOLDS,
                progress.likesGivenCount
            );

        if (givenLikeLevel > 0) {
            result[
                tierAchievementId(
                    COMM_GIVEN_LIKE_PREFIX,
                    givenLikeLevel
                )
            ] = progress.likesGivenAwardAt || progress.updatedAt || 1;
        }

        /*
         * СТАРОЖИЛ:
         *
         * Больше НЕ использует MediaWiki registration, потому что
         * на Fandom это возраст глобального Fandom-аккаунта.
         *
         * Считается только подтверждённое присутствие именно
         * на этой вики:
         *
         * 1. дата первой локальной серверной правки/достижения;
         * 2. либо firstSeenAt из защищаемой progress-записи L7/L6/L5/LOFREAD4.
         *
         * Берётся самая ранняя доступная локальная дата.
         */
        var localPresenceStart =
            getLocalWikiPresenceStartUnix(
                protectedMap,
                progress,
                editorMap
            );

        var starozhilDaysForMeta =
            localPresenceStart > 0
                ? Math.max(
                    0,
                    Math.floor(
                        (nowUnix() - localPresenceStart) /
                        86400
                    )
                )
                : 0;

        if (
            localPresenceStart >
            0
        ) {
            var ageDays =
                Math.max(
                    0,
                    Math.floor(
                        (
                            nowUnix() -
                            localPresenceStart
                        ) /
                        86400
                    )
                );

            var starozhilLevel =
                getTierLevel(
                    STAROZHIL_THRESHOLDS_DAYS,
                    ageDays
                );

            if (starozhilLevel > 0) {
                result[
                    tierAchievementId(
                        STAROZHIL_PREFIX,
                        starozhilLevel
                    )
                ] =
                    localPresenceStart +
                    STAROZHIL_THRESHOLDS_DAYS[
                        starozhilLevel - 1
                    ] *
                    86400;
            }
        }

        if (progress.chronistLevel > 0) {
            result[
                tierAchievementId(
                    CHRONIST_PREFIX,
                    progress.chronistLevel
                )
            ] =
                progress.chronistAwardAt ||
                progress.lastArticleAt ||
                progress.updatedAt ||
                progress.firstSeenAt ||
                nowUnix();
        }

        if (
            progress.thoughtfulLevel > 0
        ) {
            result[
                tierAchievementId(
                    THOUGHTFUL_PREFIX,
                    progress.thoughtfulLevel
                )
            ] =
                progress.thoughtfulAwardAt ||
                progress.updatedAt ||
                progress.lastArticleAt ||
                progress.firstSeenAt ||
                nowUnix();
        }

        THEME_KEYS.forEach(function (themeKey) {
            var articleLevel =
                Number(
                    progress.themeArticleLevels[
                        themeKey
                    ] || 0
                );

            if (articleLevel > 0) {
                result[
                    tierAchievementId(
                        THEME_ARTICLE_PREFIXES[
                            themeKey
                        ],
                        articleLevel
                    )
                ] =
                    progress.updatedAt ||
                    progress.lastArticleAt ||
                    progress.firstSeenAt ||
                    nowUnix();
            }

            var thoughtfulLevel =
                Number(
                    progress.themeThoughtfulLevels[
                        themeKey
                    ] || 0
                );

            if (thoughtfulLevel > 0) {
                result[
                    tierAchievementId(
                        THEME_TIME_PREFIXES[
                            themeKey
                        ],
                        thoughtfulLevel
                    )
                ] =
                    progress.updatedAt ||
                    progress.lastArticleAt ||
                    progress.firstSeenAt ||
                    nowUnix();
            }
        });

        result =
            mergeAchievementMap(
                result,
                editorMap
            );

        result =
            addDerivedHiddenAchievements(
                catalog,
                result
            );

        result =
            addMetaAchievements(
                catalog,
                result,
                {
                    progress: progress,
                    editorStats: editorStats || {},
                    starozhilDays: starozhilDaysForMeta
                }
            );

        result =
            addAchievementCountMilestones(
                catalog,
                result
            );

        result =
            collapseStagedAchievementSeries(
                result
            );

        return result;
    }


    function getLocalProgressStorageKey(
        userId
    ) {
        return (
            'lof-achievements-reading-progress-v3:user:' +
            String(userId)
        );
    }


    function createEmptyLocalProgress(
        userId,
        username
    ) {
        return {
            userId:
                Number(userId) || 0,

            username:
                normalizeProgressUsername(
                    username
                ),

            seenArticleIds:
                [],

            pendingArticles:
                0,

            pendingActiveSeconds:
                0,

            themeSeenArticleIds: {
                era_zarozhdeniya: [],
                era_drakona: [],
                kevariytsy: []
            },

            pendingThemeArticles: {
                era_zarozhdeniya: 0,
                era_drakona: 0,
                kevariytsy: 0
            },

            pendingThemeActiveSeconds: {
                era_zarozhdeniya: 0,
                era_drakona: 0,
                kevariytsy: 0
            },

            updatedAt:
                0
        };
    }


    function loadLocalProgress(
        userId,
        username
    ) {
        var result =
            createEmptyLocalProgress(
                userId,
                username
            );

        try {
            var rawText =
                localStorage.getItem(
                    getLocalProgressStorageKey(
                        userId
                    )
                );

            /*
             * Автоматическая миграция старого локального
             * reading-progress-v2.
             */
            if (!rawText) {
                rawText =
                    localStorage.getItem(
                        'lof-achievements-reading-progress-v2:user:' +
                        String(userId)
                    );
            }

            var raw =
                JSON.parse(
                    rawText || '{}'
                );

            if (isPlainObject(raw)) {
                result.seenArticleIds =
                    Array.isArray(
                        raw.seenArticleIds
                    )
                        ? raw.seenArticleIds
                            .map(Number)
                            .filter(function (id) {
                                return (
                                    Number.isFinite(id) &&
                                    id > 0
                                );
                            })
                            .slice(-6000)
                        : [];

                result.pendingArticles =
                    Math.max(
                        0,
                        Math.floor(
                            Number(
                                raw.pendingArticles
                            ) || 0
                        )
                    );

                result.pendingActiveSeconds =
                    Math.max(
                        0,
                        Math.floor(
                            Number(
                                raw.pendingActiveSeconds
                            ) || 0
                        )
                    );

                var rawThemeSeen =
                    isPlainObject(
                        raw.themeSeenArticleIds
                    )
                        ? raw.themeSeenArticleIds
                        : {};

                var rawPendingArticles =
                    isPlainObject(
                        raw.pendingThemeArticles
                    )
                        ? raw.pendingThemeArticles
                        : {};

                var rawPendingSeconds =
                    isPlainObject(
                        raw.pendingThemeActiveSeconds
                    )
                        ? raw.pendingThemeActiveSeconds
                        : {};

                THEME_KEYS.forEach(function (themeKey) {
                    result.themeSeenArticleIds[
                        themeKey
                    ] =
                        Array.isArray(
                            rawThemeSeen[
                                themeKey
                            ]
                        )
                            ? rawThemeSeen[
                                themeKey
                            ]
                                .map(Number)
                                .filter(function (id) {
                                    return (
                                        Number.isFinite(id) &&
                                        id > 0
                                    );
                                })
                                .slice(-1500)
                            : [];

                    result.pendingThemeArticles[
                        themeKey
                    ] =
                        Math.max(
                            0,
                            Math.floor(
                                Number(
                                    rawPendingArticles[
                                        themeKey
                                    ]
                                ) || 0
                            )
                        );

                    result.pendingThemeActiveSeconds[
                        themeKey
                    ] =
                        Math.max(
                            0,
                            Math.floor(
                                Number(
                                    rawPendingSeconds[
                                        themeKey
                                    ]
                                ) || 0
                            )
                        );
                });
            }
        } catch (error) {
            console.warn(
                '[Lofarian Achievements] ' +
                'Не удалось прочитать локальную очередь прогресса:',
                error
            );
        }

        return result;
    }


    function saveLocalProgress(
        state
    ) {
        if (!state || !state.userId) {
            return;
        }

        state.updatedAt =
            nowUnix();

        try {
            localStorage.setItem(
                getLocalProgressStorageKey(
                    state.userId
                ),
                JSON.stringify(state)
            );
        } catch (error) {
            console.warn(
                '[Lofarian Achievements] ' +
                'Не удалось сохранить локальную очередь прогресса:',
                error
            );
        }
    }


    function appendProgressRecordToSegment(
        loaded,
        record
    ) {
        if (!loaded.exists) {
            return createNewProgressSegmentText(
                record
            );
        }

        var segment =
            loaded.segment;

        if (!segment) {
            throw new Error(
                'Progress-сегмент не разобран: ' +
                loaded.title
            );
        }

        if (segment.records[record.username]) {
            throw new Error(
                'Запись уже существует: ' +
                record.username
            );
        }

        var lines =
            segment.lines.slice();

        lines.splice(
            lines.length - 1,
            0,
            formatProgressRecordLine(
                record
            )
        );

        return lines.join('\n');
    }


    function replaceProgressRecordInSegment(
        loaded,
        record
    ) {
        var segment =
            loaded.segment;

        if (!segment) {
            throw new Error(
                'Progress-сегмент не разобран: ' +
                loaded.title
            );
        }

        var index =
            segment.indexes[
                record.username
            ];

        if (
            index === undefined ||
            index === null
        ) {
            throw new Error(
                'Не найдена собственная progress-запись: ' +
                record.username
            );
        }

        var lines =
            segment.lines.slice();

        lines[index] =
            formatProgressRecordLine(
                record
            );

        return lines.join('\n');
    }


    function postProgressSegmentText(
        loaded,
        text
    ) {
        var params = {
            action:
                'edit',

            title:
                loaded.title,

            text:
                text,

            summary:
                PROGRESS_EDIT_SUMMARY,

            watchlist:
                'nochange',

            formatversion:
                2
        };

        if (loaded.revid) {
            params.baserevid =
                loaded.revid;
        }

        return api.postWithToken(
            'csrf',
            params
        ).then(function (result) {
            leaderboardRowsCache = null;
            leaderboardRowsCacheAt = 0;

            return result;
        });
    }


    function ensureOwnProgressRecord(
        user,
        retry
    ) {
        retry =
            Number(retry) || 0;

        return readProgressSegment(
            user.name,
            true
        ).then(function (loaded) {
            var existing =
                loaded.exists &&
                loaded.segment &&
                loaded.segment.records[
                    user.name
                ];

            if (existing) {
                var existingIndex =
                    loaded.segment.indexes[
                        user.name
                    ];

                var existingLine =
                    existingIndex !== undefined &&
                    existingIndex !== null
                        ? String(
                            loaded.segment.lines[
                                existingIndex
                            ] || ''
                          )
                        : '';

                var alreadyCompact =
                    existingLine.indexOf(
                        PROGRESS_RECORD_VERSION + '|'
                    ) === 0;

                existing =
                    sanitizePublicProgress(
                        existing,
                        user.name
                    );

                /*
                 * TEST 1.13.1: даже корректная LOFREAD4-запись с уже
                 * существующим firstSeenAt один раз переводится в L7.
                 * Значения прогресса при этом не меняются; updatedAt
                 * получает только свежий технический timestamp миграции.
                 */
                if (
                    existing.firstSeenAt > 0 &&
                    alreadyCompact
                ) {
                    return cloneData(
                        existing
                    );
                }

                var migrated =
                    cloneData(
                        existing
                    );

                var migrationNow =
                    Math.max(
                        nowUnix(),
                        Number(
                            existing.updatedAt
                        ) + 1
                    );

                migrated.updatedAt =
                    migrationNow;

                /*
                 * LOFREAD1/2/3 не содержат firstSeenAt. Для них дата
                 * по-прежнему фиксируется только в момент безопасной
                 * миграции. LOFREAD4 сохраняет уже имеющийся firstSeenAt.
                 */
                if (
                    existing.firstSeenAt <= 0
                ) {
                    migrated.firstSeenAt =
                        migrationNow;

                    migrated.hallTop500AwardAt =
                        0;

                    migrated.hallTop100AwardAt =
                        0;

                    migrated.hallTop10AwardAt =
                        0;
                }

                var migratedText =
                    replaceProgressRecordInSegment(
                        loaded,
                        migrated
                    );

                return postProgressSegmentText(
                    loaded,
                    migratedText
                ).then(function () {
                    clearProgressSegmentCache(
                        user.name
                    );

                    return readUserProgress(
                        user,
                        true
                    );
                });
            }

            var initial =
                createEmptyPublicProgress(
                    user.name
                );

            var createdAt =
                nowUnix();

            initial.firstSeenAt =
                createdAt;

            initial.updatedAt =
                createdAt;

            var text =
                appendProgressRecordToSegment(
                    loaded,
                    initial
                );

            return postProgressSegmentText(
                loaded,
                text
            ).then(function () {
                clearProgressSegmentCache(
                    user.name
                );

                return readUserProgress(
                    user,
                    true
                );
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

                return ensureOwnProgressRecord(
                    user,
                    retry + 1
                );
            }

            throw error;
        });
    }


    var currentHallRankAwardSyncPromise =
        null;


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
            currentHallRankAwardSyncPromise
        ) {
            return currentHallRankAwardSyncPromise;
        }

        currentHallRankAwardSyncPromise =
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

                    currentOfficialProgress =
                        cloneData(
                            nextProgress
                        );

                    return nextProgress;
                });
            }).then(
                function (result) {
                    currentHallRankAwardSyncPromise =
                        null;

                    return result;
                },
                function (error) {
                    currentHallRankAwardSyncPromise =
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

        return currentHallRankAwardSyncPromise;
    }


    var currentGivenLikeSyncPromise = null;
    var pendingGivenLikeIncrements = 0;
    var pendingGivenLikeBootstrap = false;

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
                        currentOfficialProgress = cloneData(nextProgress);
                        editorStatsCache = {};
                        leaderboardRowsCache = null;
                        leaderboardRowsCacheAt = 0;

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
            pendingGivenLikeBootstrap = true;
        } else {
            pendingGivenLikeIncrements += Math.max(
                1,
                Math.floor(Number(increment) || 1)
            );
        }

        if (currentGivenLikeSyncPromise) {
            return currentGivenLikeSyncPromise;
        }

        function consumeQueue() {
            var bootstrap = pendingGivenLikeBootstrap;
            var incrementNow = 0;

            pendingGivenLikeBootstrap = false;

            if (!bootstrap && pendingGivenLikeIncrements > 0) {
                incrementNow = 1;
                pendingGivenLikeIncrements--;
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
                    pendingGivenLikeBootstrap ||
                    pendingGivenLikeIncrements > 0
                ) {
                    return consumeQueue();
                }

                return result;
            });
        }

        currentGivenLikeSyncPromise = consumeQueue().then(
            function (result) {
                currentGivenLikeSyncPromise = null;
                return result;
            },
            function (error) {
                currentGivenLikeSyncPromise = null;
                throw error;
            }
        );

        return currentGivenLikeSyncPromise;
    }

    function discussionLikeControlLooksPressed(control) {
        if (!control) {
            return false;
        }

        var pressed = String(control.getAttribute('aria-pressed') || '').toLowerCase();
        if (pressed === 'true') {
            return true;
        }

        var state = String(
            control.getAttribute('data-state') ||
            control.getAttribute('data-active') ||
            ''
        ).toLowerCase();

        if (state === 'active' || state === 'true' || state === 'pressed' || state === 'selected') {
            return true;
        }

        var classText = String(control.className || '').toLowerCase();
        return /(?:^|\s)(?:active|pressed|selected|upvoted|liked)(?:\s|$)/.test(classText);
    }

    function discussionControlIsLike(control) {
        if (!control) {
            return false;
        }

        var text = [
            control.getAttribute && control.getAttribute('aria-label'),
            control.getAttribute && control.getAttribute('title'),
            control.getAttribute && control.getAttribute('data-testid'),
            control.className,
            control.textContent
        ].filter(Boolean).join(' ').toLocaleLowerCase('ru');

        return (
            text.indexOf('нрав') !== -1 ||
            text.indexOf('like') !== -1 ||
            text.indexOf('upvote') !== -1 ||
            text.indexOf('vote-up') !== -1
        );
    }

    function discussionLikeTargetsAnotherUser(control, user) {
        if (!control || !user) {
            return false;
        }

        var node = control;
        var links = [];
        var depth = 0;

        while (node && depth < 8) {
            if (node.querySelectorAll) {
                links = Array.prototype.slice.call(
                    node.querySelectorAll('a[href*="/f/u/"],a[href*="/wiki/User:"]')
                );

                if (links.length) {
                    break;
                }
            }

            node = node.parentElement;
            depth++;
        }

        if (!links.length) {
            /*
             * В некоторых вариантах карточек Discussions имя автора
             * вынесено за ближайший DOM-контейнер. Самолайк интерфейсом
             * Fandom обычно не предлагается, поэтому неизвестный автор
             * не блокирует подтверждённое действие кнопки.
             */
            return true;
        }

        var currentId = String(user.userid || '');
        var currentName = String(user.name || '')
            .replace(/_/g, ' ')
            .toLocaleLowerCase('ru');
        var foundOwn = false;
        var foundOther = false;

        links.forEach(function (link) {
            var href = String(link.getAttribute('href') || '');
            var idMatch = href.match(/\/f\/u\/(\d+)/);

            if (idMatch) {
                if (String(idMatch[1]) === currentId) {
                    foundOwn = true;
                } else {
                    foundOther = true;
                }
                return;
            }

            var userMatch = href.match(/\/wiki\/User:([^?#]+)/i);
            if (userMatch) {
                var name = '';
                try {
                    name = decodeURIComponent(userMatch[1])
                        .replace(/_/g, ' ')
                        .toLocaleLowerCase('ru');
                } catch (error) {
                    name = String(userMatch[1])
                        .replace(/_/g, ' ')
                        .toLocaleLowerCase('ru');
                }

                if (name === currentName) {
                    foundOwn = true;
                } else {
                    foundOther = true;
                }
            }
        });

        return foundOther || !foundOwn;
    }

    function installGivenLikeTracker(user) {
        if (
            !user ||
            Number(user.userid) !== Number(getCurrentUserId()) ||
            !user.name
        ) {
            return;
        }

        function tryConfirmControl(control) {
            if (
                !discussionControlIsLike(control) ||
                !discussionLikeControlLooksPressed(control) ||
                !discussionLikeTargetsAnotherUser(control, user)
            ) {
                return false;
            }

            queueOwnGivenLikeProgress(user, 0, true);
            return true;
        }

        /*
         * Небольшой ретро-check: если в уже загруженной ленте /f есть
         * ранее поставленный пользователем лайк, он тоже может раскрыть
         * достижение без необходимости ставить второй лайк.
         */
        window.setTimeout(function () {
            var controls = document.querySelectorAll(
                'button,[role="button"],a'
            );

            for (var i = 0; i < controls.length; i++) {
                if (tryConfirmControl(controls[i])) {
                    break;
                }
            }
        }, 1600);

        document.addEventListener('click', function (event) {
            var target = event.target;
            if (!target || !target.closest) {
                return;
            }

            var control = target.closest('button,[role="button"],a');
            if (
                !discussionControlIsLike(control) ||
                !discussionLikeTargetsAnotherUser(control, user)
            ) {
                return;
            }

            /* Уже нажатая кнопка означает снятие лайка, а не новый лайк. */
            var wasPressed = discussionLikeControlLooksPressed(control);
            if (wasPressed) {
                return;
            }

            window.setTimeout(function () {
                if (!document.documentElement.contains(control)) {
                    return;
                }

                /*
                 * Fandom после успешного upvote обычно переводит контрол в
                 * pressed/active state. Если конкретная версия интерфейса не
                 * выставляет состояние, достижение просто не выдаётся ложноположительно.
                 */
                if (!discussionLikeControlLooksPressed(control)) {
                    return;
                }

                queueOwnGivenLikeProgress(user, 1, false);
            }, 650);
        }, true);
    }

    function syncOwnProgressStep(
        catalog,
        user,
        state,
        retry
    ) {
        retry =
            Number(retry) || 0;

        if (currentProgressSyncPromise) {
            return currentProgressSyncPromise;
        }

        currentProgressSyncPromise =
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

                currentOfficialProgress =
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

                    currentOfficialProgress =
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

                    currentProgressSyncPromise =
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

                return currentOfficialProgress ||
                    createEmptyPublicProgress(
                        user.name
                    );
            });

        currentProgressSyncPromise =
            currentProgressSyncPromise.then(
                function (result) {
                    currentProgressSyncPromise =
                        null;

                    return result;
                },
                function (error) {
                    currentProgressSyncPromise =
                        null;

                    throw error;
                }
            );

        return currentProgressSyncPromise;
    }


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

        return api.get({
            action:
                'query',

            prop:
                'categories',

            pageids:
                article.pageId,

            cllimit:
                'max',

            formatversion:
                2
        }).then(function (data) {
            var pages =
                (
                    data.query &&
                    data.query.pages
                ) || [];

            var categories =
                pages[0] &&
                Array.isArray(
                    pages[0].categories
                )
                    ? pages[0].categories
                    : [];

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
        if (readingTrackerStarted) {
            return currentProgressReady ||
                Promise.resolve(
                    currentProgressState
                );
        }

        readingTrackerStarted =
            true;

        var userId =
            getCurrentUserId();

        var username =
            getCurrentUserName();

        if (
            userId <= 0 ||
            !username
        ) {
            currentProgressReady =
                Promise.resolve(null);

            return currentProgressReady;
        }

        currentProgressReady =
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

                    currentProgressState =
                        state;

                    return ensureOwnProgressRecord(
                        user,
                        0
                    ).then(function (official) {
                        currentOfficialProgress =
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

                    currentProgressState =
                        loadLocalProgress(
                            userId,
                            username
                        );

                    return currentProgressState;
                });

        return currentProgressReady;
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
                currentOfficialProgress =
                    cloneData(
                        progress
                    );
            }

            return progress;
        });
    }


    /* ========================================================
     * ПОЛЬЗОВАТЕЛЬСКИЕ СЕГМЕНТЫ
     * ======================================================== */

    function createEmptySegment() {
        return {
            schemaVersion: 1,
            users: {}
        };
    }

    function validateSegment(segment) {
        if (!isPlainObject(segment)) {
            throw new Error(
                'Пользовательский сегмент должен быть JSON-объектом.'
            );
        }

        if (!segment.schemaVersion) {
            segment.schemaVersion = 1;
        }

        if (!isPlainObject(segment.users)) {
            segment.users = {};
        }

        return segment;
    }

    function readSegmentById(segmentId, forceReload) {
        if (segmentCache[segmentId] && !forceReload) {
            return Promise.resolve(
                cloneData(segmentCache[segmentId])
            );
        }

        var title = USERS_PAGE_PREFIX + segmentId;

        return readWikiPage(title)
            .then(function (page) {
                if (!page.exists) {
                    var emptyResult = {
                        id: segmentId,
                        title: title,
                        exists: false,
                        revid: 0,
                        data: createEmptySegment()
                    };

                    segmentCache[segmentId] =
                        cloneData(emptyResult);

                    return emptyResult;
                }

                var jsonText = extractJsonFromPage(page.content);
                var segment;

                try {
                    segment = JSON.parse(jsonText);
                } catch (error) {
                    console.error(
                        '[Lofarian Achievements] Повреждён сегмент:',
                        title,
                        jsonText
                    );

                    throw new Error(
                        'В ' + title +
                        ' находится некорректный JSON.'
                    );
                }

                validateSegment(segment);

                var result = {
                    id: segmentId,
                    title: title,
                    exists: true,
                    revid: page.revid,
                    data: segment
                };

                segmentCache[segmentId] = cloneData(result);

                return cloneData(result);
            });
    }

    function readUserSegment(userId, forceReload) {
        return readSegmentById(
            getSegmentId(userId),
            forceReload
        );
    }

    function saveSegment(loadedSegment) {
        validateSegment(loadedSegment.data);

        var wasMissing = !loadedSegment.exists;

        /*
         * Сегменты сохраняются компактным JSON.
         * Это заметно увеличивает запас по числу пользователей.
         */
        var text = wrapJsonForPage(
            loadedSegment.data,
            false
        );

        return writeWikiPage(
            loadedSegment.title,
            text,
            loadedSegment.revid
        ).then(function (editResult) {
            delete segmentCache[loadedSegment.id];

            leaderboardRowsCache = null;
            leaderboardRowsCacheAt = 0;

            if (wasMissing) {
                return protectTechnicalPage(
                    loadedSegment.title
                ).then(function (protectionResult) {
                    return {
                        edit: editResult,
                        protection: protectionResult
                    };
                });
            }

            return {
                edit: editResult,
                protection: null
            };
        });
    }

    function getUserAchievementMap(segment, userId) {
        var key = String(userId);
        var map = segment.users[key];

        return isPlainObject(map)
            ? map
            : {};
    }


    /* ========================================================
     * ИЗОБРАЖЕНИЯ
     * ======================================================== */

    /*
     * Один и тот же файл достижения используется одновременно
     * в rail, полном списке, уведомлении и Зале славы.
     * Не спрашиваем imageinfo у MediaWiki заново для каждого места.
     */
    var achievementFileUrlCache = {};

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


    function applyResolvedImageToElement(image, result, onFinalFailure) {
        if (!image || !result) {
            if (typeof onFinalFailure === 'function') {
                onFinalFailure();
            }

            return;
        }

        var candidates = [];

        [
            result.thumbUrl,
            result.originalUrl,
            result.url
        ].forEach(function (candidate) {
            candidate =
                normalizeImageUrl(candidate);

            if (
                candidate &&
                candidates.indexOf(candidate) === -1
            ) {
                candidates.push(candidate);
            }
        });

        if (!candidates.length) {
            if (typeof onFinalFailure === 'function') {
                onFinalFailure();
            }

            return;
        }

        var index = 0;

        image.onerror = function () {
            index++;

            if (index < candidates.length) {
                /*
                 * Если Fandom CDN не отдал thumbnail, пробуем
                 * оригинальный файл. Это особенно важно сразу
                 * после загрузки нового изображения, когда API уже
                 * видит файл, а thumbnail на static.wikia ещё может
                 * временно отвечать ошибкой.
                 */
                image.src = candidates[index];
                return;
            }

            image.onerror = null;

            if (typeof onFinalFailure === 'function') {
                onFinalFailure();
            }
        };

        image.src = candidates[0];

        if (
            image.complete &&
            image.naturalWidth > 0
        ) {
            image.dispatchEvent(
                new Event('load')
            );
        }
    }


    function resolveAchievementImage(catalog, achievement) {
        /*
         * TEST 1.14.2: более устойчивый поиск иконок самостоятельных
         * ступенчатых серий. Сначала используется точное имя из каталога.
         * Если на Fandom файл был загружен под базовым названием серии,
         * пробуем и его, затем универсальную иконку.
         */
        var names = [];

        function addName(value) {
            value = String(value || '').trim();

            if (!value || names.indexOf(value) !== -1) {
                return;
            }

            names.push(value);
        }

        if (achievement) {
            addName(achievement.image);

            if (achievement.title) {
                addName(String(achievement.title) + '.png');
            }

            if (achievement.family) {
                addName(
                    getAchievementBaseTitle(achievement) + '.png'
                );
            }

            var stagedInfo =
                STAGED_ACHIEVEMENT_ID_INFO[achievement.id];

            if (
                stagedInfo &&
                stagedInfo.series &&
                stagedInfo.series.displayTier === true
            ) {
                var baseTitle =
                    getAchievementBaseTitle(achievement);

                addName(
                    baseTitle +
                    ' ' +
                    romanAchievementLevel(stagedInfo.index + 1) +
                    '.png'
                );

                addName(
                    baseTitle +
                    ' ' +
                    String(stagedInfo.index + 1) +
                    '.png'
                );

                addName(baseTitle + '.png');
            }
        }

        addName(catalog && catalog.defaultImage);

        function tryIndex(index) {
            if (index >= names.length) {
                return Promise.reject(
                    new Error('Не удалось найти изображение достижения.')
                );
            }

            return resolveFileUrl(names[index])
                .catch(function () {
                    return tryIndex(index + 1);
                });
        }

        return tryIndex(0);
    }


    /* ========================================================
     * СТИЛИ УВЕДОМЛЕНИЯ И ПРОФИЛЯ
     * ======================================================== */

    /* Статическое оформление перенесено в MediaWiki:Common.css — TEST 1.12.1. */

    /*
     * ============================================================
     * TEST 1.10.4 — READABILITY / COMPOSITION POLISH
     * ============================================================
     *
     * Это только визуальный слой. Критерии, очки, L7/L6/L5/LOFREAD4,
     * защищённые достижения и серверные источники не меняются.
     */
    /* Статическое оформление перенесено в MediaWiki:Common.css — TEST 1.12.1. */

    /* Статическое оформление перенесено в MediaWiki:Common.css — TEST 1.12.1. */

    /*
     * ============================================================
     * TEST 1.10.6 — META / RANK MEDALS / STICKY FILTERS
     * ============================================================
     */
    /* Статическое оформление перенесено в MediaWiki:Common.css — TEST 1.12.1. */

    /*
     * ============================================================
     * TEST 1.10.7 — RARITY FRAME REDESIGN / FIXED INSPECTOR
     * ============================================================
     *
     * Обычная и мифическая рамки НЕ меняются.
     * Полностью переделаны:
     * Примечательное
     * Редкое
     * Выдающееся
     * Легендарное
     */
    /* Статическое оформление перенесено в MediaWiki:Common.css — TEST 1.12.1. */

    /*
     * ============================================================
     * TEST 1.11.0 — 13 РЕДКОСТЕЙ / 3 ГРАДАЦИИ
     * ============================================================
     */
    /* Статическое оформление перенесено в MediaWiki:Common.css — TEST 1.12.1. */

    /*
     * ============================================================
     * TEST 1.11.1 — РАСТУЩИЙ ПАФОС / МИФИЧЕСКАЯ ГЕОМЕТРИЯ
     * ============================================================
     */
    /* Статическое оформление перенесено в MediaWiki:Common.css — TEST 1.12.1. */

    /*
     * ============================================================
     * TEST 1.11.2 — ПЕРЕСТАНОВКА РАМОК / INLINE РЕДКОСТИ
     * ============================================================
     */
    /* Статическое оформление перенесено в MediaWiki:Common.css — TEST 1.12.1. */

    /*
     * ============================================================
     * TEST 1.12.0 — MAIN PROFILE PANEL / NATIVE FANDOM RAIL RESTORED
     * ============================================================
     */
    /* Статическое оформление перенесено в MediaWiki:Common.css — TEST 1.12.1. */


    /* ========================================================
     * УВЕДОМЛЕНИЕ
     * ======================================================== */

    function openAchievementFromPopup(
        achievementId
    ) {
        achievementId =
            String(
                achievementId || ''
            );

        var username =
            getCurrentUserName();

        if (
            !achievementId ||
            !username
        ) {
            return;
        }

        /*
         * Если popup появился прямо на собственном профиле,
         * не перезагружаем страницу: открываем уже смонтированное
         * окно «Все достижения» и сразу передаём ему нужный ID.
         */
        var profileUsername =
            getProfileUsername();

        var allButton =
            document.querySelector(
                '#lof-profile-achievements-rail ' +
                '.lof-profile-rail-all-button'
            );

        if (
            allButton &&
            profileUsername &&
            normalizeUserLookupKey(
                profileUsername
            ) ===
                normalizeUserLookupKey(
                    username
                )
        ) {
            allButton.setAttribute(
                'data-lof-popup-achievement',
                achievementId
            );

            allButton.click();

            allButton.removeAttribute(
                'data-lof-popup-achievement'
            );

            return;
        }

        /*
         * На любой другой странице ведём на собственный профиль.
         * Deep-link автоматически открывает официальные достижения
         * и прокручивает список к конкретной карточке.
         */
        var profileTitle =
            'User:' +
            username;

        var baseUrl = '';

        if (
            window.mw &&
            mw.util &&
            typeof mw.util.getUrl ===
                'function'
        ) {
            baseUrl =
                mw.util.getUrl(
                    profileTitle
                );
        } else {
            baseUrl =
                String(
                    mw.config.get(
                        'wgScript'
                    ) || '/index.php'
                ) +
                '?title=' +
                encodeURIComponent(
                    profileTitle
                );
        }

        var separator =
            baseUrl.indexOf('?') === -1
                ? '?'
                : '&';

        window.location.assign(
            baseUrl +
            separator +
            'lofAchievements=1' +
            '&lofAchievement=' +
            encodeURIComponent(
                achievementId
            )
        );
    }


    function showAchievementPopup(catalog, achievement) {
        var container = document.getElementById(
            'lof-achievement-container'
        );

        if (!container) {
            container = document.createElement('div');
            container.id = 'lof-achievement-container';
            document.body.appendChild(container);
        }

        var popup = document.createElement('div');

        var rarityInfo =
            getRarityInfo(
                catalog,
                achievement
            );

        popup.className =
            'lof-achievement-popup ' +
            'lof-rarity-border-' +
            rarityInfo.key;

        popup.innerHTML =
            '<div class="lof-achievement-icon-box">' +
                '<div class="lof-achievement-placeholder">✦</div>' +
                '<img class="lof-achievement-icon" alt="">' +
            '</div>' +
            '<div class="lof-achievement-content">' +
                '<div class="lof-achievement-label">' +
                    '<span class="lof-achievement-spark" aria-hidden="true">✦</span>' +
                    'Получено достижение' +
                '</div>' +
                '<div class="lof-achievement-title-row">' +
                    '<div class="lof-achievement-title">' +
                        escapeHtml(
                            getAchievementBaseTitle(
                                achievement
                            )
                        ) +
                    '</div>' +
                    (
                        getAchievementTierLabel(
                            achievement
                        )
                            ? '<span class="lof-achievement-tier-label">' +
                                escapeHtml(
                                    getAchievementTierLabel(
                                        achievement
                                    )
                                ) +
                              '</span>'
                            : ''
                    ) +
                '</div>' +
                '<div class="lof-achievement-description">' +
                    escapeHtml(achievement.description) +
                '</div>' +
                '<div class="lof-achievement-footer">' +
                    (
                        getAchievementPoints(achievement) > 0
                            ? '<span class="lof-achievement-points">+' +
                                escapeHtml(
                                    formatPoints(
                                        getAchievementPoints(achievement)
                                    )
                                ) +
                              '</span>'
                            : ''
                    ) +
                    '<span class="lof-achievement-rarity lof-rarity-' +
                        escapeHtml(rarityInfo.key) +
                    '">' +
                        escapeHtml(rarityInfo.title) +
                    '</span>' +
                    (
                        achievement.secret === true ||
                        achievement.hidden === true
                            ? '<span class="lof-achievement-secret">Скрытое</span>'
                            : ''
                    ) +
                    '<span class="lof-achievement-prevalence" ' +
                        'data-lof-prevalence-id="' +
                        escapeHtml(achievement.id || '') +
                    '">Получили: …</span>' +
                '</div>' +
                '<div class="lof-achievement-details-link">' +
                    'Подробнее <span aria-hidden="true">→</span>' +
                '</div>' +
            '</div>';

        popup.setAttribute(
            'role',
            'button'
        );

        popup.setAttribute(
            'tabindex',
            '0'
        );

        popup.setAttribute(
            'aria-label',
            'Открыть достижение «' +
            getAchievementBaseTitle(
                achievement
            ) +
            '» во всех достижениях'
        );

        popup.addEventListener(
            'click',
            function () {
                openAchievementFromPopup(
                    achievement.id
                );
            }
        );

        popup.addEventListener(
            'keydown',
            function (event) {
                if (
                    event.key === 'Enter' ||
                    event.key === ' '
                ) {
                    event.preventDefault();

                    openAchievementFromPopup(
                        achievement.id
                    );
                }
            }
        );

        container.appendChild(popup);

        applyAchievementPrevalenceToRoot(
            catalog,
            popup
        );

        var image = popup.querySelector(
            '.lof-achievement-icon'
        );

        var placeholder = popup.querySelector(
            '.lof-achievement-placeholder'
        );

        image.onload = function () {
            placeholder.style.display = 'none';
            image.style.display = 'block';
        };

        resolveAchievementImage(
            catalog,
            achievement
        ).then(function (result) {
            applyResolvedImageToElement(
                image,
                result,
                function () {
                    image.style.display = 'none';
                    placeholder.style.display = 'flex';
                }
            );
        }).catch(function (error) {
            image.style.display = 'none';
            placeholder.style.display = 'flex';

            console.error(
                '[Lofarian Achievements] Не удалось загрузить изображение:',
                error
            );
        });

        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                popup.classList.add('is-visible');
            });
        });

        setTimeout(function () {
            popup.classList.remove('is-visible');
            popup.classList.add('is-hiding');

            setTimeout(function () {
                if (popup.parentNode) {
                    popup.parentNode.removeChild(popup);
                }
            }, 500);
        }, 7000);
    }


    /* ========================================================
     * НОВЫЕ ДОСТИЖЕНИЯ ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ
     * ======================================================== */

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
            return Promise.all([
                getProgressForUser(user, false),
                getEditorStatsForUser(user, false)
            ]).then(function (automaticResults) {
                var progress = automaticResults[0];
                var editorStats = automaticResults[1];

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
    }


    /* ========================================================
     * ПРОФИЛЬ
     * ======================================================== */

    function getProfileUsername() {
        if (mw.config.get('wgNamespaceNumber') !== 2) {
            return null;
        }

        var title = mw.config.get('wgTitle');

        if (!title || title.indexOf('/') !== -1) {
            return null;
        }

        return title;
    }

    function getManualAchievementsHeading() {
        var headings = document.querySelectorAll(
            '.mw-parser-output h2'
        );

        for (var i = 0; i < headings.length; i++) {
            var heading = headings[i];
            var headline = heading.querySelector('.mw-headline');
            var title = headline
                ? headline.textContent
                : heading.textContent;

            if (
                String(title).trim().toLowerCase() ===
                'достижения'
            ) {
                return heading;
            }
        }

        return null;
    }

    function hideManualAchievementsSection() {
        var heading = getManualAchievementsHeading();

        if (!heading) {
            return;
        }

        heading.style.display = 'none';

        var node = heading.nextElementSibling;

        while (node && node.tagName !== 'H2') {
            node.style.display = 'none';
            node = node.nextElementSibling;
        }
    }

    function formatAchievementDate(unixTime) {
        unixTime = Number(unixTime);

        if (!Number.isFinite(unixTime) || unixTime < 946684800) {
            return '';
        }

        return new Date(unixTime * 1000)
            .toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
    }

    function removeProfileAchievementsOverlay() {
        var overlay =
            document.getElementById(
                'lof-profile-achievements-overlay'
            );

        if (overlay) {
            overlay.remove();
        }

        document.body.classList.remove(
            'lof-profile-achievements-dialog-open'
        );
    }


    function restoreNativeAchievementsModules() {
        document.querySelectorAll(
            '.lof-native-achievements-hidden'
        ).forEach(function (node) {
            node.classList.remove(
                'lof-native-achievements-hidden'
            );

            if (
                node.dataset &&
                node.dataset.lofPreviousDisplay !==
                    undefined
            ) {
                if (
                    node.dataset.lofPreviousDisplay
                ) {
                    node.style.setProperty(
                        'display',
                        node.dataset.lofPreviousDisplay
                    );
                } else {
                    node.style.removeProperty(
                        'display'
                    );
                }

                delete node.dataset.lofPreviousDisplay;
            } else {
                node.style.removeProperty(
                    'display'
                );
            }
        });

        document.querySelectorAll(
            '.lof-native-rail-toggle-shell-hidden'
        ).forEach(function (node) {
            node.classList.remove(
                'lof-native-rail-toggle-shell-hidden'
            );

            node.style.removeProperty(
                'display'
            );
        });

    }


    function restoreFandomRightRailUtilities() {
        document.querySelectorAll(
            '.lof-native-achievements-hidden'
        ).forEach(function (node) {
            var hasUtility =
                node.querySelector &&
                node.querySelector(
                    'a[href*="Special:Contributions"], ' +
                    'a[href*="Contributions"], ' +
                    'a[href*="print"], ' +
                    '[title*="Печат"], ' +
                    '[aria-label*="Печат"]'
                );

            if (hasUtility) {
                node.classList.remove(
                    'lof-native-achievements-hidden'
                );
                node.style.removeProperty('display');
                node.style.removeProperty('visibility');
            }
        });
    }


    function restoreFandomProfileRightRail() {
        var pageRail =
            document.querySelector(
                '.page__right-rail'
            );

        if (pageRail) {
            pageRail.classList.remove(
                'lof-achievements-exclusive-rail'
            );

            pageRail.style.removeProperty(
                'display'
            );

            pageRail.style.removeProperty(
                'visibility'
            );

            pageRail.style.removeProperty(
                'overflow'
            );
        }

        /*
         * На случай soft-navigation после старой версии:
         * возвращаем только те элементы, которые прежде маркировал
         * именно наш код. Новые штатные элементы Fandom не трогаем.
         */
        document.querySelectorAll(
            [
                '.lof-native-achievements-hidden',
                '.lof-native-rail-toggle-shell-hidden',
                '.lof-fandom-collapse-control-hidden',
                '.lof-fandom-collapse-shell-hidden'
            ].join(',')
        ).forEach(function (node) {
            node.classList.remove(
                'lof-native-achievements-hidden',
                'lof-native-rail-toggle-shell-hidden',
                'lof-fandom-collapse-control-hidden',
                'lof-fandom-collapse-shell-hidden'
            );

            node.style.removeProperty(
                'display'
            );

            node.style.removeProperty(
                'visibility'
            );

            node.style.removeProperty(
                'width'
            );

            node.style.removeProperty(
                'height'
            );

            node.style.removeProperty(
                'overflow'
            );
        });
    }


    function restoreProfileHeaderActions() {
        var actionRow =
            document.querySelector(
                '.page-header__actions[data-lof-profile-actions-moved="1"]'
            );

        var anchor =
            document.getElementById(
                'lof-profile-native-actions-anchor'
            );

        if (
            actionRow &&
            anchor &&
            anchor.parentNode
        ) {
            anchor.parentNode.insertBefore(
                actionRow,
                anchor.nextSibling
            );

            actionRow.removeAttribute(
                'data-lof-profile-actions-moved'
            );
        }

        var shell =
            document.getElementById(
                'lof-profile-below-actions'
            );

        if (shell) {
            shell.remove();
        }

        if (anchor) {
            anchor.remove();
        }

        var legacyEdit =
            document.getElementById(
                'lof-profile-below-edit'
            );

        if (legacyEdit) {
            legacyEdit.remove();
        }

        document.querySelectorAll(
            '.lof-native-profile-edit-hidden'
        ).forEach(function (node) {
            node.classList.remove(
                'lof-native-profile-edit-hidden'
            );
        });
    }



    function removeProfileAchievementsRail() {
        restoreProfileHeaderActions();

        var railModule =
            document.getElementById(
                'lof-profile-achievements-rail'
            );

        if (railModule) {
            railModule.remove();
        }

        var floating =
            document.getElementById(
                'lof-profile-floating-rail'
            );

        if (floating) {
            floating.remove();
        }

        restoreNativeAchievementsModules();
        restoreFandomProfileRightRail();

        removeProfileAchievementsOverlay();
    }


    function normalizeRailText(value) {
        return String(
            value || ''
        )
            .replace(
                /\s+/g,
                ' '
            )
            .trim()
            .toLocaleLowerCase(
                'ru'
            );
    }


    function looksLikeNativeFandomAchievements(node) {
        if (
            !node ||
            node.id ===
                'lof-profile-achievements-rail' ||
            node.id ===
                'lof-profile-floating-rail'
        ) {
            return false;
        }

        if (
            node.classList &&
            node.classList.contains(
                'lof-profile-rail-module'
            )
        ) {
            return false;
        }

        var className =
            String(
                node.className || ''
            ).toLocaleLowerCase(
                'en'
            );

        if (
            className.indexOf(
                'userprofileachievementsmodule'
            ) !== -1
        ) {
            return true;
        }

        var text =
            normalizeRailText(
                node.textContent
            );

        if (!text) {
            return false;
        }

        var russian =
            (
                text.indexOf(
                    'вы можете заработать'
                ) !== -1 ||
                text.indexOf(
                    'заработать ещё больше значков'
                ) !== -1 ||
                text.indexOf(
                    'заработать еще больше значков'
                ) !== -1
            ) &&
            (
                text.indexOf(
                    'значк'
                ) !== -1 ||
                text.indexOf(
                    'балл'
                ) !== -1
            );

        var english =
            (
                text.indexOf(
                    'you can earn'
                ) !== -1 ||
                text.indexOf(
                    'earn more badges'
                ) !== -1
            ) &&
            text.indexOf(
                'badge'
            ) !== -1;

        return (
            russian ||
            english
        );
    }


    function findNativeFandomAchievementModules(wrapper) {
        if (!wrapper) {
            return [];
        }

        var found = [];

        function add(node) {
            if (
                !node ||
                node === wrapper ||
                found.indexOf(node) !== -1 ||
                !looksLikeNativeFandomAchievements(
                    node
                )
            ) {
                return;
            }

            found.push(
                node
            );
        }

        /*
         * Сначала проверяем непосредственные модули right rail.
         * Именно так сейчас устроен профиль Fandom.
         */
        Array.prototype.forEach.call(
            wrapper.children || [],
            add
        );

        /*
         * Затем ищем известные и вероятные классы на случай
         * очередного переименования фронтенда Fandom.
         */
        wrapper.querySelectorAll(
            [
                '.UserProfileAchievementsModule',
                '[class*="AchievementsModule"]',
                '[class*="achievements-module"]',
                '[class*="AchievementModule"]',
                '[class*="achievement-module"]',
                '.rail-module',
                'section'
            ].join(',')
        ).forEach(function (node) {
            if (
                !looksLikeNativeFandomAchievements(
                    node
                )
            ) {
                return;
            }

            var host =
                node;

            /*
             * Если совпал внутренний элемент текста, поднимаемся
             * до ближайшего модуля, но не выше wrapper.
             */
            var candidate =
                node.closest &&
                node.closest(
                    '.rail-module, section, aside, [class*="Module"], [class*="module"]'
                );

            if (
                candidate &&
                candidate !== wrapper &&
                wrapper.contains(
                    candidate
                )
            ) {
                host =
                    candidate;
            }

            add(
                host
            );
        });

        return found;
    }


    function isUsableBackgroundColor(value) {
        value =
            String(
                value || ''
            )
            .trim()
            .toLowerCase();

        return (
            value &&
            value !==
                'transparent' &&
            value !==
                'rgba(0, 0, 0, 0)' &&
            value !==
                'rgba(0,0,0,0)'
        );
    }


    function captureNativeRailAppearance(
        wrapper,
        modules
    ) {
        if (
            !wrapper ||
            !modules ||
            !modules.length
        ) {
            return;
        }

        var source =
            modules[0];

        var candidates = [
            source
        ];

        /*
         * У Fandom фон иногда висит не на корневом rail-module,
         * а на первом внутреннем контейнере.
         */
        Array.prototype.slice.call(
            source.children || [],
            0,
            8
        ).forEach(function (child) {
            candidates.push(
                child
            );
        });

        var chosen =
            null;

        candidates.some(function (node) {
            try {
                var style =
                    window.getComputedStyle(
                        node
                    );

                if (
                    isUsableBackgroundColor(
                        style.backgroundColor
                    )
                ) {
                    chosen = {
                        node:
                            node,

                        style:
                            style
                    };

                    return true;
                }
            } catch (error) {
                /* пробуем следующий контейнер */
            }

            return false;
        });

        if (!chosen) {
            return;
        }

        var style =
            chosen.style;

        wrapper.style.setProperty(
            '--lof-native-rail-background',
            style.backgroundColor
        );

        if (
            style.color
        ) {
            wrapper.style.setProperty(
                '--lof-native-rail-color',
                style.color
            );
        }

        if (
            style.borderRadius &&
            style.borderRadius !==
                '0px'
        ) {
            wrapper.style.setProperty(
                '--lof-native-rail-radius',
                style.borderRadius
            );
        }

        if (
            style.boxShadow &&
            style.boxShadow !==
                'none'
        ) {
            wrapper.style.setProperty(
                '--lof-native-rail-shadow',
                style.boxShadow
            );
        }

        if (
            style.borderTopWidth !==
                '0px'
        ) {
            wrapper.style.setProperty(
                '--lof-native-rail-border',
                style.borderTopWidth +
                    ' ' +
                    style.borderTopStyle +
                    ' ' +
                    style.borderTopColor
            );
        }
    }


    function hideNativeFandomAchievementModules(wrapper) {
        /*
         * LEGACY NO-OP — TEST 1.12.0.
         * Штатные модули Fandom больше не скрываются.
         */
        return [];
    }


    function getProfileRightRailWrapper() {
        var wrapper =
            document.querySelector(
                '.page__right-rail .right-rail-wrapper'
            ) ||
            document.querySelector(
                '.right-rail-wrapper'
            );

        if (!wrapper) {
            return null;
        }

        return {
            wrapper:
                wrapper,

            created:
                false
        };
    }



    function looksLikeRailToggle(node) {
        if (!node) {
            return false;
        }

        var text =
            [
                node.getAttribute &&
                    node.getAttribute(
                        'aria-label'
                    ),
                node.getAttribute &&
                    node.getAttribute(
                        'title'
                    ),
                node.className,
                node.id,
                node.textContent
            ]
            .filter(Boolean)
            .join(' ')
            .toLocaleLowerCase(
                'ru'
            );

        return (
            text.indexOf('свер') !== -1 ||
            text.indexOf('развер') !== -1 ||
            text.indexOf('collapse') !== -1 ||
            text.indexOf('expand') !== -1 ||
            text.indexOf('right-rail-toggle') !== -1 ||
            text.indexOf('rail-toggle') !== -1 ||
            text.indexOf('sidebar-toggle') !== -1
        );
    }


    function suppressNativeRailToggle(wrapper) {
        /*
         * LEGACY NO-OP — TEST 1.12.0.
         * Нативный right rail Fandom не изменяется.
         */
        return;
    }


    function isFandomRightRailUtilityControl(node) {
        if (!node) {
            return false;
        }

        var text =
            [
                node.textContent,
                node.getAttribute && node.getAttribute('aria-label'),
                node.getAttribute && node.getAttribute('title'),
                node.getAttribute && node.getAttribute('href')
            ]
            .filter(Boolean)
            .join(' ')
            .toLocaleLowerCase('ru');

        return (
            text.indexOf('печат') !== -1 ||
            text.indexOf('print') !== -1 ||
            text.indexOf('вклад') !== -1 ||
            text.indexOf('contrib') !== -1 ||
            text.indexOf('участник') !== -1 ||
            text.indexOf('contributors') !== -1
        );
    }


    function keepFandomRightRailExpanded(wrapper) {
        /*
         * LEGACY NO-OP — TEST 1.12.0.
         * Нативный right rail Fandom не изменяется.
         */
        return;
    }


    function flattenProfileAchievementGroups(groupList) {
        var entries = [];

        groupList.forEach(
            function (group) {
                group.items.forEach(
                    function (entry) {
                        entries.push({
                            id:
                                entry.id,

                            achievement:
                                entry.achievement,

                            earnedAt:
                                entry.earnedAt,

                            rarity:
                                getRarityInfo(
                                    null,
                                    entry.achievement
                                )
                        });
                    }
                );
            }
        );

        return entries;
    }



function getProfileAchievementsDeepLink() {
    var result = {
        open:
            false,

        achievementId:
            ''
    };

    try {
        var params =
            new URLSearchParams(
                window.location.search || ''
            );

        result.achievementId =
            String(
                params.get(
                    'lofAchievement'
                ) || ''
            );

        result.open =
            params.get(
                'lofAchievements'
            ) ===
                '1' ||
            !!result.achievementId;
    } catch (error) {
        /* Старый браузер: обычное открытие профиля продолжит работать. */
    }

    return result;
}


    function openProfileAchievementsDialog(
        catalog,
        username,
        scoreInfo,
        visibleCount,
        section,
        targetAchievementId
    ) {
        removeProfileAchievementsOverlay();

        var unearnedTargetCount =
            section.querySelectorAll(
                '.lof-profile-achievement[data-lof-earned="0"]'
            ).length;

        var overlay =
            document.createElement(
                'div'
            );

        overlay.id =
            'lof-profile-achievements-overlay';

        overlay.className =
            'lof-profile-achievements-overlay';

        var dialog =
            document.createElement(
                'section'
            );

        dialog.className =
            'lof-profile-achievements-dialog';

        dialog.setAttribute(
            'role',
            'dialog'
        );

        dialog.setAttribute(
            'aria-modal',
            'true'
        );

        var head =
            document.createElement(
                'div'
            );

        head.className =
            'lof-profile-achievements-dialog-head';

        var titleBlock =
            document.createElement(
                'div'
            );

        titleBlock.innerHTML =
            '<div class="lof-profile-achievements-dialog-kicker">' +
                'Официальные достижения' +
            '</div>' +
            '<h3 class="lof-profile-achievements-dialog-title">' +
                escapeHtml(
                    username
                ) +
            '</h3>' +
            '<div class="lof-profile-achievements-dialog-summary">' +
                escapeHtml(
                    String(
                        visibleCount
                    )
                ) +
                ' получено · ' +
                escapeHtml(
                    String(
                        unearnedTargetCount
                    )
                ) +
                ' впереди · ' +
                escapeHtml(
                    formatPoints(
                        scoreInfo.score
                    )
                ) +
                ' опыта' +
            '</div>';

        var close =
            document.createElement(
                'button'
            );

        close.type =
            'button';

        close.className =
            'lof-profile-achievements-dialog-close';

        close.setAttribute(
            'aria-label',
            'Закрыть'
        );

        close.textContent =
                'Закрыть';

        close.addEventListener(
            'click',
            removeProfileAchievementsOverlay
        );

        head.appendChild(
            titleBlock
        );

        head.appendChild(
            close
        );

        var body =
            document.createElement(
                'div'
            );

        body.className =
            'lof-profile-achievements-dialog-body';

        var profileCards =
            Array.prototype.slice.call(
                section.querySelectorAll(
                    '.lof-profile-achievement[data-lof-achievement-id]'
                )
            );

        var earnedCards =
            profileCards.filter(
                function (card) {
                    return (
                        card.getAttribute(
                            'data-lof-earned'
                        ) !==
                            '0'
                    );
                }
            );

        var unearnedCards =
            profileCards.filter(
                function (card) {
                    return (
                        card.getAttribute(
                            'data-lof-earned'
                        ) ===
                            '0'
                    );
                }
            );

        var completedChains =
            earnedCards.filter(
                function (card) {
                    return card.classList.contains(
                        'is-tier-complete'
                    );
                }
            ).length;

        var rarestCard =
            earnedCards.slice()
                .sort(function (a, b) {
                    return (
                        Number(
                            b.getAttribute(
                                'data-lof-rarity-order'
                            ) || 0
                        ) -
                        Number(
                            a.getAttribute(
                                'data-lof-rarity-order'
                            ) || 0
                        )
                    );
                })[0] ||
                null;

        var stats =
            document.createElement(
                'div'
            );

        stats.className =
            'lof-profile-dialog-stats';

        [
            {
                label:
                    'Получено',

                value:
                    String(
                        visibleCount
                    )
            },
            {
                label:
                    'Впереди',

                value:
                    String(
                        unearnedCards.length
                    )
            },
            {
                label:
                    'Очки опыта',

                value:
                    formatPoints(
                        scoreInfo.score
                    )
            },
            {
                label:
                    'Завершено цепочек',

                value:
                    String(
                        completedChains
                    )
            },
            {
                label:
                    'Редчайшее',

                value:
                    rarestCard
                        ? rarestCard.getAttribute(
                            'data-lof-title'
                        ) ||
                            '—'
                        : '—',

                card:
                    rarestCard
            }
        ].forEach(function (item) {
            var clickable =
                !!item.card;

            var stat =
                document.createElement(
                    clickable
                        ? 'button'
                        : 'div'
                );

            if (clickable) {
                stat.type =
                    'button';
            }

            stat.className =
                'lof-profile-dialog-stat' +
                (
                    clickable
                        ? ' is-clickable-rarest'
                        : ''
                );

            var achievementId =
                clickable
                    ? String(
                        item.card.getAttribute(
                            'data-lof-achievement-id'
                        ) || ''
                    )
                    : '';

            stat.innerHTML =
                (
                    clickable
                        ? '<span class="lof-profile-dialog-stat-icon-wrap">' +
                            '<img class="lof-profile-dialog-stat-icon" alt="">' +
                          '</span>'
                        : ''
                ) +
                '<span class="lof-profile-dialog-stat-copy">' +
                    '<span class="lof-profile-dialog-stat-label">' +
                        escapeHtml(
                            item.label
                        ) +
                    '</span>' +
                    '<span class="lof-profile-dialog-stat-value">' +
                        escapeHtml(
                            item.value
                        ) +
                    '</span>' +
                '</span>';

            if (clickable) {
                stat.setAttribute(
                    'aria-label',
                    'Перейти к достижению «' +
                    item.value +
                    '»'
                );

                stat.addEventListener(
                    'click',
                    function () {
                        applyProfileFilter(
                            'all'
                        );

                        var targetCard =
                            null;

                        profileCards.forEach(
                            function (card) {
                                card.classList.remove(
                                    'is-selected-from-rail'
                                );

                                if (
                                    !targetCard &&
                                    card.getAttribute(
                                        'data-lof-achievement-id'
                                    ) === achievementId
                                ) {
                                    targetCard =
                                        card;
                                }
                            }
                        );

                        if (targetCard) {
                            targetCard.classList.add(
                                'is-selected-from-rail'
                            );

                            requestAnimationFrame(
                                function () {
                                    targetCard.scrollIntoView({
                                        behavior:
                                            'smooth',

                                        block:
                                            'center',

                                        inline:
                                            'nearest'
                                    });
                                }
                            );
                        }
                    }
                );

                var rarestAchievement =
                    getAchievement(
                        catalog,
                        achievementId
                    );

                var statIcon =
                    stat.querySelector(
                        '.lof-profile-dialog-stat-icon'
                    );

                if (
                    rarestAchievement &&
                    statIcon
                ) {
                    resolveAchievementImage(
                        catalog,
                        rarestAchievement
                    ).then(function (result) {
                        applyResolvedImageToElement(
                            statIcon,
                            result,
                            function () {
                                statIcon.style.visibility =
                                    'hidden';
                            }
                        );
                    }).catch(function () {
                        statIcon.style.visibility =
                            'hidden';
                    });
                }
            }

            stats.appendChild(
                stat
            );
        });

        var filterbar =
            document.createElement(
                'div'
            );

        filterbar.className =
            'lof-profile-achievements-filterbar';

        var rarityPreviewPane =
            buildRarityPreviewPane(
                catalog,
                section
            );

        var filterDefinitions = [
            ['all', 'Все'],
            ['earned', 'Полученные'],
            ['unearned', 'Неполученные'],
            ['reading', 'Чтение'],
            ['editing', 'Редактирование'],
            ['creation', 'Создание'],
            ['activity', 'Активность'],
            ['communication', 'Общение'],
            ['special', 'Особые'],
            ['rarities', 'Редкости']
        ];

        function applyProfileFilter(
            filterKey
        ) {
            var rarityMode =
                filterKey ===
                    'rarities';

            section.style.display =
                rarityMode
                    ? 'none'
                    : '';

            rarityPreviewPane.style.display =
                rarityMode
                    ? ''
                    : 'none';

            profileCards.forEach(function (card) {
                var cardEarned =
                    card.getAttribute(
                        'data-lof-earned'
                    ) !==
                        '0';

                var visible =
                    filterKey ===
                        'all' ||
                    (
                        filterKey ===
                            'earned' &&
                        cardEarned
                    ) ||
                    (
                        filterKey ===
                            'unearned' &&
                        !cardEarned
                    ) ||
                    card.getAttribute(
                        'data-lof-category'
                    ) ===
                        filterKey;

                card.style.display =
                    visible
                        ? ''
                        : 'none';
            });

            section.querySelectorAll(
                '.lof-profile-rarity-group'
            ).forEach(function (group) {
                var hasVisible =
                    Array.prototype.some.call(
                        group.querySelectorAll(
                            '.lof-profile-achievement'
                        ),
                        function (card) {
                            return (
                                card.style.display !==
                                'none'
                            );
                        }
                    );

                group.classList.toggle(
                    'is-filter-empty',
                    !hasVisible
                );
            });

            filterbar.querySelectorAll(
                '.lof-profile-achievements-filter'
            ).forEach(function (button) {
                button.classList.toggle(
                    'is-active',
                    button.getAttribute(
                        'data-filter'
                    ) ===
                        filterKey
                );
            });
        }

        filterDefinitions.forEach(
            function (definition) {
                var filterButton =
                    document.createElement(
                        'button'
                    );

                filterButton.type =
                    'button';

                filterButton.className =
                    'lof-profile-achievements-filter' +
                    (
                        definition[0] ===
                            'all'
                            ? ' is-active'
                            : ''
                    );

                filterButton.setAttribute(
                    'data-filter',
                    definition[0]
                );

                filterButton.textContent =
                    definition[1];

                filterButton.addEventListener(
                    'click',
                    function () {
                        applyProfileFilter(
                            definition[0]
                        );
                    }
                );

                filterbar.appendChild(
                    filterButton
                );
            }
        );

        applyProfileFilter(
            'all'
        );

        body.appendChild(
            stats
        );

        body.appendChild(
            filterbar
        );

        body.appendChild(
            section
        );

        body.appendChild(
            rarityPreviewPane
        );

        dialog.appendChild(
            head
        );

        dialog.appendChild(
            body
        );

        overlay.appendChild(
            dialog
        );

        overlay.addEventListener(
            'mousedown',
            function (event) {
                if (
                    event.target ===
                    overlay
                ) {
                    removeProfileAchievementsOverlay();
                }
            }
        );

        document.body.appendChild(
            overlay
        );

        document.body.classList.add(
            'lof-profile-achievements-dialog-open'
        );

        applyAchievementPrevalenceToRoot(
            catalog,
            section
        );

        /*
         * Если окно открыли кликом по конкретной иконке в rail,
         * прокручиваем полный список прямо к этой карточке и
         * визуально выделяем её.
         */
        section.querySelectorAll(
            '.lof-profile-achievement.is-selected-from-rail'
        ).forEach(function (card) {
            card.classList.remove(
                'is-selected-from-rail'
            );
        });

        if (targetAchievementId) {
            var targetCard =
                null;

            section.querySelectorAll(
                '.lof-profile-achievement[data-lof-achievement-id]'
            ).forEach(function (card) {
                if (
                    !targetCard &&
                    card.getAttribute(
                        'data-lof-achievement-id'
                    ) ===
                        String(
                            targetAchievementId
                        )
                ) {
                    targetCard =
                        card;
                }
            });

            if (targetCard) {
                targetCard.classList.add(
                    'is-selected-from-rail'
                );

                requestAnimationFrame(
                    function () {
                        requestAnimationFrame(
                            function () {
                                targetCard.scrollIntoView({
                                    behavior:
                                        'smooth',

                                    block:
                                        'center',

                                    inline:
                                        'nearest'
                                });
                            }
                        );
                    }
                );
            }
        }

        close.focus();
    }


    function mountProfileAchievementsRail(
        catalog,
        root,
        username,
        profileUserId,
        scoreInfo,
        groupList,
        visibleCount,
        fullSection,
        rankBanner,
        viewerAchievementMap
    ) {
        removeProfileAchievementsRail();

        var entries = [];

        groupList.forEach(
            function (group) {
                group.items.forEach(
                    function (entry) {
                        entries.push({
                            id:
                                entry.id,

                            achievement:
                                entry.achievement,

                            earnedAt:
                                entry.earnedAt,

                            rarity:
                                getRarityInfo(
                                    catalog,
                                    entry.achievement
                                ),

                            category:
                                entry.category,

                            progressInfo:
                                entry.progressInfo,

                            isNew:
                                entry.isNew ===
                                    true
                        });
                    }
                );
            }
        );

        /*
         * Прогреваем изображения всех полученных достижений сразу.
         * Следующие страницы rail и полный список используют тот же
         * кэш и не делают повторный imageinfo-запрос.
         */
        entries.forEach(function (entry) {
            resolveAchievementImage(
                catalog,
                entry.achievement
            ).catch(function () {
                /* отсутствие картинки не мешает панели */
            });
        });

        /*
         * TEST 1.12.3:
         * Коллекция в профиле является хронологической лентой.
         * Сначала показываются достижения, полученные последними,
         * а не достижения более высокой редкости. Витрина TOP-5
         * ниже по-прежнему отдельно сортирует копию массива по
         * редкости и поэтому не зависит от этого порядка.
         */
        entries.sort(function (a, b) {
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
                a.id || ''
            ).localeCompare(
                String(
                    b.id || ''
                ),
                'ru'
            );
        });

        var module =
            document.createElement(
                'section'
            );

        module.id =
            'lof-profile-achievements-rail';

        module.className =
            'lof-profile-rail-module lof-profile-achievements-main';

        var head =
            document.createElement(
                'div'
            );

        head.className =
            'lof-profile-rail-head';

        var headText =
            document.createElement(
                'div'
            );

        headText.innerHTML =
            '<div class="lof-profile-rail-kicker">' +
                'Летопись Лофариана' +
            '</div>' +
            '<h2 class="lof-profile-rail-title">Достижения</h2>' +
            '<div class="lof-profile-rail-summary">' +
                escapeHtml(
                    String(
                        visibleCount
                    )
                ) +
                ' получено · ' +
                escapeHtml(
                    formatPoints(
                        scoreInfo.score
                    )
                ) +
                ' опыта' +
            '</div>';

        var hall =
            document.createElement(
                'a'
            );

        hall.className =
            'lof-profile-rail-hall-link';

        hall.href =
            mw.util.getUrl(
                HALL_PAGE
            );

        hall.setAttribute(
            'aria-label',
            'Зал славы'
        );

        hall.setAttribute(
            'title',
            'Зал славы'
        );

        hall.innerHTML =
            '<span class="lof-profile-rail-hall-diamond" aria-hidden="true">◆</span>';

        head.appendChild(
            headText
        );

        head.appendChild(
            hall
        );

        module.appendChild(
            head
        );

        if (rankBanner) {
            rankBanner.className =
                'lof-profile-rail-rank';

            module.appendChild(
                rankBanner
            );
        }

        /*
         * Единый информационный блок для ВСЕХ значков:
         * и редчайших, и основной коллекции.
         */
        var inspector =
            document.createElement(
                'div'
            );

        inspector.className =
            'lof-profile-rail-inspector';

        inspector.innerHTML =
            '<div class="lof-profile-rail-inspector-title">' +
                'Наведите на достижение' +
            '</div>' +
            '<div class="lof-profile-rail-inspector-meta">' +
                'Название, редкость, дата и прогресс появятся здесь.' +
            '</div>';

        function showEntryInInspector(entry, date) {
            if (!entry) {
                return;
            }

            var canRevealHiddenCondition =
                !(
                    entry.achievement &&
                    (
                        entry.achievement.hidden === true ||
                        entry.achievement.secret === true
                    )
                ) ||
                viewerKnowsHiddenAchievement(
                    viewerAchievementMap,
                    entry.id
                );

            var progressHtml =
                '';

            if (
                entry.progressInfo &&
                canRevealHiddenCondition
            ) {
                var readableProgressText =
                    String(
                        entry.progressInfo.text || ''
                    ).replace(
                        /\s*·\s*[0-9]+%\s*$/,
                        ''
                    );

                progressHtml =
                    '<div class="lof-profile-rail-inspector-progress">' +
                        '<div class="lof-profile-rail-inspector-progress-head">' +
                            '<span>' +
                                escapeHtml(
                                    readableProgressText
                                ) +
                            '</span>' +
                            (
                                entry.progressInfo.percent !== null &&
                                entry.progressInfo.hidePercentLabel !== true
                                    ? '<strong>' +
                                        escapeHtml(
                                            String(
                                                entry.progressInfo.percent
                                            )
                                        ) +
                                        '%</strong>'
                                    : ''
                            ) +
                        '</div>' +
                        (
                            entry.progressInfo.percent !==
                                null
                                ? '<div class="lof-profile-rail-inspector-bar">' +
                                    '<span style="width:' +
                                        escapeHtml(
                                            String(
                                                entry.progressInfo.percent
                                            )
                                        ) +
                                        '%"></span>' +
                                  '</div>'
                                : ''
                        ) +
                    '</div>';
            }

            var tierLabel =
                getAchievementTierLabel(
                    entry.achievement
                );

            inspector.innerHTML =
                '<div class="lof-profile-rail-inspector-title-row">' +
                    '<div class="lof-profile-rail-inspector-title">' +
                        escapeHtml(
                            getAchievementBaseTitle(
                                entry.achievement
                            )
                        ) +
                    '</div>' +
                    (
                        tierLabel
                            ? '<span class="lof-profile-rail-inspector-tier">' +
                                escapeHtml(
                                    tierLabel
                                ) +
                              '</span>'
                            : ''
                    ) +
                '</div>' +
                '<div class="lof-profile-rail-inspector-meta lof-profile-rail-inspector-meta-primary">' +
                    '<span class="lof-profile-rail-inspector-rarity lof-rarity-' +
                        escapeHtml(
                            entry.rarity.key
                        ) +
                    '">' +
                        '<i aria-hidden="true"></i>' +
                        '<span class="lof-profile-rail-inspector-rarity-title">' +
                            escapeHtml(
                                entry.rarity.title
                            ) +
                        '</span>' +
                    '</span>' +
                    '<span class="lof-profile-rail-inspector-grade">' +
                        escapeHtml(
                            (
                                entry.rarity.grade === 1
                                    ? 'I'
                                    : (
                                        entry.rarity.grade === 2
                                            ? 'II'
                                            : 'III'
                                    )
                            ) +
                            ' градация'
                        ) +
                    '</span>' +
                    (
                        entry.achievement.secret === true ||
                        entry.achievement.hidden === true
                            ? '<span class="lof-profile-rail-inspector-secret">Скрытое</span>'
                            : ''
                    ) +
                    '<span class="lof-profile-rail-inspector-points">' +
                        escapeHtml(
                            formatPoints(
                                getAchievementPoints(
                                    entry.achievement
                                )
                            )
                        ) +
                    '</span>' +
                '</div>' +
                '<div class="lof-profile-rail-inspector-meta lof-profile-rail-inspector-meta-secondary">' +
                    '<span class="lof-profile-rail-inspector-category">' +
                        'Раздел: ' +
                        escapeHtml(
                            getAchievementCategoryTitle(
                                entry.category
                            )
                        ) +
                    '</span>' +
                    '<span class="lof-profile-rail-inspector-date">' +
                        'Получено: ' +
                        escapeHtml(
                            date || 'дата не зафиксирована'
                        ) +
                    '</span>' +
                '</div>' +
                '<div class="lof-profile-rail-inspector-prevalence" ' +
                    'data-lof-prevalence-id="' +
                    escapeHtml(
                        entry.id
                    ) +
                    '" ' +
                    'data-lof-prevalence-mode="detailed">' +
                    'Получили: считаем…' +
                '</div>' +
                progressHtml;

            /*
             * Один и тот же prevalence-механизм используется
             * для обычных значков и витрины. В inspector выводим
             * не только процент, но и абсолютное число участников.
             */
            applyAchievementPrevalenceToRoot(
                catalog,
                inspector
            );
        }

        if (entries.length) {
            var featuredEntries =
                entries.slice()
                    .sort(function (a, b) {
                        if (b.rarity.order !== a.rarity.order) {
                            return b.rarity.order - a.rarity.order;
                        }

                        var pointsDiff =
                            getAchievementPoints(b.achievement) -
                            getAchievementPoints(a.achievement);

                        if (pointsDiff) {
                            return pointsDiff;
                        }

                        return (
                            Number(b.achievement.tier || 0) -
                            Number(a.achievement.tier || 0)
                        );
                    })
                    .slice(0, Math.min(5, entries.length));

            if (featuredEntries.length) {
                var featuredSection =
                    document.createElement('div');

                featuredSection.className =
                    'lof-profile-rail-featured-section';

                var featuredHeading =
                    document.createElement('div');

                featuredHeading.className =
                    'lof-profile-rail-featured-heading';

                featuredHeading.innerHTML =
                    '<span>Редчайшие достижения</span>' +
                    '<small>ТОП 5 коллекции</small>';

                featuredSection.appendChild(
                    featuredHeading
                );

                var featuredList =
                    document.createElement('div');

                featuredList.className =
                    'lof-profile-rail-featured-list';

                featuredEntries.forEach(
                    function (featuredEntry, featuredIndex) {
                        var featured =
                            document.createElement('button');

                        featured.type = 'button';
                        featured.className =
                            'lof-profile-rail-featured' +
                            (
                                featuredIndex === 0
                                    ? ' is-primary'
                                    : ''
                            );

                        featured.setAttribute(
                            'data-rarity',
                            featuredEntry.rarity.key
                        );

                        featured.setAttribute(
                            'data-lof-achievement-id',
                            featuredEntry.id
                        );

                        var number =
                            document.createElement('span');

                        number.className =
                            'lof-profile-rail-featured-number';

                        number.textContent =
                            (
                                ['I', 'II', 'III', 'IV', 'V'][
                                    featuredIndex
                                ] ||
                                String(featuredIndex + 1)
                            );

                        var imageWrap =
                            document.createElement('span');

                        imageWrap.className =
                            'lof-profile-rail-featured-image-wrap';

                        var image =
                            document.createElement('img');

                        image.className =
                            'lof-profile-rail-featured-image';

                        image.alt = '';
                        imageWrap.appendChild(image);

                        var text =
                            document.createElement('span');

                        text.className =
                            'lof-profile-rail-featured-text';

                        text.innerHTML =
                            '<span class="lof-profile-rail-featured-title-row">' +
                                '<span class="lof-profile-rail-featured-title">' +
                                    escapeHtml(
                                        getAchievementBaseTitle(
                                            featuredEntry.achievement
                                        )
                                    ) +
                                '</span>' +
                                (
                                    getAchievementTierLabel(
                                        featuredEntry.achievement
                                    )
                                        ? '<span class="lof-profile-rail-featured-tier">' +
                                            escapeHtml(
                                                getAchievementTierLabel(
                                                    featuredEntry.achievement
                                                )
                                            ) +
                                          '</span>'
                                        : ''
                                ) +
                            '</span>' +
                            '<span class="lof-profile-rail-featured-meta lof-rarity-' +
                                escapeHtml(featuredEntry.rarity.key) +
                            '">' +
                                escapeHtml(featuredEntry.rarity.title) +
                                (
                                    featuredEntry.achievement.tier === 100
                                        ? ' · Цепочка C'
                                        : ''
                                ) +
                            '</span>' +
                            (
                                featuredEntry.achievement.secret === true ||
                                featuredEntry.achievement.hidden === true
                                    ? '<span class="lof-profile-rail-featured-secret">Скрытое</span>'
                                    : ''
                            ) +
                            '<span class="lof-profile-rail-featured-prevalence" ' +
                                'data-lof-prevalence-id="' +
                                escapeHtml(featuredEntry.id) +
                                '" data-lof-prevalence-mode="compact">' +
                                'Получили: …' +
                            '</span>';

                        featured.appendChild(number);
                        featured.appendChild(imageWrap);
                        featured.appendChild(text);

                        var featuredDate =
                            formatAchievementDate(
                                featuredEntry.earnedAt
                            );

                        featured.addEventListener(
                            'mouseenter',
                            function () {
                                showEntryInInspector(
                                    featuredEntry,
                                    featuredDate
                                );
                            }
                        );

                        featured.addEventListener(
                            'focus',
                            function () {
                                showEntryInInspector(
                                    featuredEntry,
                                    featuredDate
                                );
                            }
                        );

                        featured.addEventListener(
                            'click',
                            function () {
                                if (featuredEntry.isNew) {
                                    markProfileAchievementViewed(
                                        profileUserId,
                                        featuredEntry.id,
                                        featuredEntry.earnedAt
                                    );
                                    featuredEntry.isNew = false;
                                }

                                openProfileAchievementsDialog(
                                    catalog,
                                    username,
                                    scoreInfo,
                                    visibleCount,
                                    fullSection,
                                    featuredEntry.id
                                );
                            }
                        );

                        resolveAchievementImage(
                            catalog,
                            featuredEntry.achievement
                        ).then(function (result) {
                            applyResolvedImageToElement(
                                image,
                                result,
                                function () {
                                    image.style.visibility = 'hidden';
                                }
                            );
                        }).catch(function () {
                            image.style.visibility = 'hidden';
                        });

                        featuredList.appendChild(featured);
                    }
                );

                featuredSection.appendChild(featuredList);
                module.appendChild(featuredSection);

                applyAchievementPrevalenceToRoot(
                    catalog,
                    featuredSection
                );

                module.appendChild(
                    inspector
                );
            }
        }


        if (!entries.length) {
            var empty =
                document.createElement(
                    'div'
                );

            empty.className =
                'lof-profile-rail-empty';

            empty.textContent =
                'Официальных достижений пока нет.';

            module.appendChild(
                empty
            );
        } else {
            var grid =
                document.createElement(
                    'div'
                );

            grid.className =
                'lof-profile-rail-badges';

            var pager =
                document.createElement(
                    'div'
                );

            pager.className =
                'lof-profile-rail-pager';

            var pageInfo =
                document.createElement(
                    'div'
                );

            pageInfo.className =
                'lof-profile-rail-page-info';

            var pageButtons =
                document.createElement(
                    'div'
                );

            pageButtons.className =
                'lof-profile-rail-page-buttons';

            var previous =
                document.createElement(
                    'button'
                );

            previous.type =
                'button';

            previous.className =
                'lof-profile-rail-page-button';

            previous.textContent =
                '‹';

            previous.setAttribute(
                'aria-label',
                'Предыдущие достижения'
            );

            var next =
                document.createElement(
                    'button'
                );

            next.type =
                'button';

            next.className =
                'lof-profile-rail-page-button';

            next.textContent =
                '›';

            next.setAttribute(
                'aria-label',
                'Следующие достижения'
            );

            pageButtons.appendChild(
                previous
            );

            pageButtons.appendChild(
                next
            );

            pager.appendChild(
                pageInfo
            );

            pager.appendChild(
                pageButtons
            );

            var collectionHeading =
                document.createElement(
                    'div'
                );

            collectionHeading.className =
                'lof-profile-rail-collection-heading';

            collectionHeading.innerHTML =
                '<span>Коллекция</span>' +
                '<span>' +
                    escapeHtml(
                        String(
                            entries.length
                        )
                    ) +
                    ' получено' +
                '</span>';

            module.appendChild(
                collectionHeading
            );

            module.appendChild(
                grid
            );

            if (
                entries.length >
                PROFILE_RAIL_PAGE_SIZE
            ) {
                module.appendChild(
                    pager
                );
            }

            var currentPage = 1;

            function renderBadgePage(skipAnimation) {
                if (!skipAnimation) {
                    grid.classList.add(
                        'is-changing-page'
                    );
                }

                var pageCount =
                    Math.max(
                        1,
                        Math.ceil(
                            entries.length /
                            PROFILE_RAIL_PAGE_SIZE
                        )
                    );

                currentPage =
                    Math.min(
                        Math.max(
                            1,
                            currentPage
                        ),
                        pageCount
                    );

                var start =
                    (
                        currentPage - 1
                    ) *
                    PROFILE_RAIL_PAGE_SIZE;

                var end =
                    Math.min(
                        entries.length,
                        start +
                        PROFILE_RAIL_PAGE_SIZE
                    );

                grid.innerHTML =
                    '';

                entries
                    .slice(
                        start,
                        end
                    )
                    .forEach(function (entry) {
                        var button =
                            document.createElement(
                                'button'
                            );

                        button.type =
                            'button';

                        button.className =
                            'lof-profile-rail-badge' +
                            (
                                entry.isNew
                                    ? ' is-new-achievement'
                                    : ''
                            ) +
                            (
                                entry.achievement.tier ===
                                    100
                                    ? ' is-tier-complete'
                                    : ''
                            );

                        button.setAttribute(
                            'data-rarity',
                            entry.rarity.key
                        );

                        button.setAttribute(
                            'data-lof-achievement-id',
                            entry.id
                        );

                        var date =
                            formatAchievementDate(
                                entry.earnedAt
                            );

                        button.setAttribute(
                            'aria-label',
                            entry.achievement.title +
                            ' · ' +
                            entry.rarity.title +
                            (
                                date
                                    ? ' · Получено: ' +
                                        date
                                    : ''
                            )
                        );

                        var imageWrap =
                            document.createElement(
                                'span'
                            );

                        imageWrap.className =
                            'lof-profile-rail-badge-image-wrap';

                        var image =
                            document.createElement(
                                'img'
                            );

                        image.className =
                            'lof-profile-rail-badge-image';

                        image.alt =
                            '';

                        imageWrap.appendChild(
                            image
                        );

                        if (
                            entry.achievement.secret ===
                            true
                        ) {
                            var secret =
                                document.createElement(
                                    'span'
                                );

                            secret.className =
                                'lof-profile-rail-secret-mark';

                            secret.textContent =
                                '✦';

                            imageWrap.appendChild(
                                secret
                            );
                        }

                        if (
                            entry.achievement.tier ===
                            100
                        ) {
                            var tierComplete =
                                document.createElement(
                                    'span'
                                );

                            tierComplete.className =
                                'lof-profile-rail-tier-complete';

                            tierComplete.textContent =
                                'C';

                            tierComplete.title =
                                'Цепочка завершена';

                            imageWrap.appendChild(
                                tierComplete
                            );
                        }

                        if (entry.isNew) {
                            var newMark =
                                document.createElement(
                                    'span'
                                );

                            newMark.className =
                                'lof-profile-rail-new-mark';

                            newMark.title =
                                'Новое достижение';

                            imageWrap.appendChild(
                                newMark
                            );
                        }



                        button.appendChild(
                            imageWrap
                        );

                        button.addEventListener(
                            'mouseenter',
                            function () {
                                showEntryInInspector(
                                    entry,
                                    date
                                );
                            }
                        );

                        button.addEventListener(
                            'focus',
                            function () {
                                showEntryInInspector(
                                    entry,
                                    date
                                );
                            }
                        );

                        button.addEventListener(
                            'click',
                            function () {
                                if (entry.isNew) {
                                    markProfileAchievementViewed(
                                        profileUserId,
                                        entry.id,
                                        entry.earnedAt
                                    );

                                    entry.isNew =
                                        false;
                                }

                                openProfileAchievementsDialog(
                                    catalog,
                                    username,
                                    scoreInfo,
                                    visibleCount,
                                    fullSection,
                                    entry.id
                                );
                            }
                        );

                        grid.appendChild(
                            button
                        );

                        image.addEventListener(
                            'load',
                            function () {
                                image.classList.add(
                                    'is-ready'
                                );
                            },
                            {
                                once:
                                    true
                            }
                        );

                        resolveAchievementImage(
                            catalog,
                            entry.achievement
                        ).then(function (result) {
                            applyResolvedImageToElement(
                                image,
                                result,
                                function () {
                                    image.style.visibility =
                                        'hidden';
                                }
                            );
                        }).catch(function () {
                            image.style.visibility =
                                'hidden';
                        });
                    });

                pageInfo.textContent =
                    String(
                        currentPage
                    ) +
                    ' / ' +
                    String(
                        pageCount
                    ) +
                    ' · ' +
                    String(
                        start + 1
                    ) +
                    '–' +
                    String(
                        end
                    ) +
                    ' из ' +
                    String(
                        entries.length
                    );

                previous.disabled =
                    currentPage <= 1;

                next.disabled =
                    currentPage >= pageCount;

                requestAnimationFrame(
                    function () {
                        requestAnimationFrame(
                            function () {
                                grid.classList.remove(
                                    'is-changing-page'
                                );
                            }
                        );
                    }
                );
            }

            previous.addEventListener(
                'click',
                function () {
                    if (currentPage > 1) {
                        currentPage--;
                        renderBadgePage(true);
                    }
                }
            );

            next.addEventListener(
                'click',
                function () {
                    var pageCount =
                        Math.max(
                            1,
                            Math.ceil(
                                entries.length /
                                PROFILE_RAIL_PAGE_SIZE
                            )
                        );

                    if (
                        currentPage <
                        pageCount
                    ) {
                        currentPage++;
                        renderBadgePage();
                    }
                }
            );

            renderBadgePage();
        }

        var actions =
            document.createElement(
                'div'
            );

        actions.className =
            'lof-profile-rail-actions';

        var allButton =
            document.createElement(
                'button'
            );

        allButton.type =
            'button';

        allButton.className =
            'lof-profile-rail-all-button';

        allButton.innerHTML =
            '<span class="lof-profile-rail-all-icon" aria-hidden="true">▦</span>' +
            '<span>Все достижения</span>';

        allButton.addEventListener(
            'click',
            function () {
                var deepLink =
                    getProfileAchievementsDeepLink();

                var popupAchievementId =
                    String(
                        allButton.getAttribute(
                            'data-lof-popup-achievement'
                        ) || ''
                    );

                openProfileAchievementsDialog(
                    catalog,
                    username,
                    scoreInfo,
                    visibleCount,
                    fullSection,
                    popupAchievementId ||
                    deepLink.achievementId ||
                        null
                );
            }
        );

        actions.appendChild(
            allButton
        );

        module.appendChild(
            actions
        );

        /*
         * TEST 1.12.0:
         * достижения монтируются только в основную область профиля.
         * Штатную правую колонку Fandom код не изменяет.
         */
        restoreFandomProfileRightRail();

        if (root.firstChild) {
            root.insertBefore(
                module,
                root.firstChild
            );
        } else {
            root.appendChild(
                module
            );
        }

        /* TEST 1.12.6: штатные действия Fandom остаются на родном месте. */
        restoreProfileHeaderActions();

        var deepLink =
            getProfileAchievementsDeepLink();

        if (deepLink.open) {
            setTimeout(
                function () {
                    if (
                        document.body.contains(
                            allButton
                        )
                    ) {
                        allButton.click();
                    }
                },
                0
            );
        }

        return;


    }


    function getCurrentViewerEffectiveAchievementMap(
        catalog
    ) {
        var currentId = getCurrentUserId();
        var currentName = getCurrentUserName();

        if (!currentId || !currentName) {
            return Promise.resolve({});
        }

        return resolveUser(currentName)
            .then(function (viewerUser) {
                return Promise.all([
                    readUserSegment(viewerUser.userid, false),
                    getProgressForUser(viewerUser, false),
                    getEditorStatsForUser(viewerUser, false)
                ]).then(function (viewerResults) {
                    var viewerProtectedMap =
                        getUserAchievementMap(
                            viewerResults[0].data,
                            viewerUser.userid
                        );

                    return buildEffectiveAchievementMap(
                        catalog,
                        viewerUser,
                        viewerProtectedMap,
                        viewerResults[1],
                        viewerResults[2].achievementMap,
                        viewerResults[2]
                    );
                });
            })
            .catch(function (error) {
                console.warn(
                    '[Lofarian Achievements] Не удалось загрузить собственные раскрытые тайны:',
                    error
                );
                return {};
            });
    }


    function renderProfileAchievements(catalog, hallRowsOverride) {
        var username =
            getProfileUsername();

        if (!username) {
            return Promise.resolve();
        }

        var root =
            document.querySelector(
                '.mw-parser-output'
            );

        if (!root) {
            return Promise.resolve();
        }

        hideManualAchievementsSection();
        removeProfileAchievementsRail();

        var oldRank =
            document.getElementById(
                'lof-profile-hall-rank'
            );

        if (oldRank) {
            oldRank.remove();
        }

        var old =
            document.getElementById(
                'lof-official-achievements'
            );

        if (old) {
            old.remove();
        }

        return resolveUser(
            username
        ).then(function (resolvedUser) {
            return Promise.all([
                readUserSegment(
                    resolvedUser.userid,
                    false
                ),

                getProgressForUser(
                    resolvedUser,
                    false
                ),

                getEditorStatsForUser(
                    resolvedUser,
                    false
                ),

                Number(resolvedUser.userid) === Number(getCurrentUserId())
                    ? Promise.resolve(null)
                    : getCurrentViewerEffectiveAchievementMap(catalog)
            ]).then(function (results) {
                var loaded =
                    results[0];

                var progress =
                    results[1];

                var editorStats =
                    results[2];

                var protectedMap =
                    getUserAchievementMap(
                        loaded.data,
                        resolvedUser.userid
                    );

                var achievementMap =
                    buildEffectiveAchievementMap(
                        catalog,
                        resolvedUser,
                        protectedMap,
                        progress,
                        editorStats.achievementMap,
                        editorStats
                    );

                var viewerAchievementMap =
                    results[3] || achievementMap;

                var profileProgressContext =
                    buildProfileProgressContext(
                        protectedMap,
                        progress,
                        editorStats
                    );


                profileProgressContext.__discussionStats =
                    editorStats.discussionStats ||
                    createEmptyDiscussionStats();

                profileProgressContext.__achievementCollectorCount =
                    getAchievementCollectorState(
                        catalog,
                        achievementMap
                    ).logicalCount;

                profileProgressContext.__metaFacts =
                    buildMetaAchievementFacts(
                        catalog,
                        achievementMap,
                        {
                            progress: progress,
                            editorStats: editorStats,
                            starozhilDays: (function () {
                                var start = getLocalWikiPresenceStartUnix(
                                    protectedMap,
                                    progress,
                                    editorStats.achievementMap
                                );
                                return start > 0
                                    ? Math.max(
                                        0,
                                        Math.floor((nowUnix() - start) / 86400)
                                    )
                                    : 0;
                            })()
                        }
                    );

                var unreadAchievementMap =
                    loadProfileUnreadAchievementMap(
                        resolvedUser.userid,
                        achievementMap
                    );

                if (
                    Array.isArray(
                        hallRowsOverride
                    )
                ) {
                    hallRowsOverride.some(
                        function (row) {
                            if (
                                Number(
                                    row.userId
                                ) !==
                                Number(
                                    resolvedUser.userid
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
                                    achievementMap[
                                        achievementId
                                    ] =
                                        row.achievementMap[
                                            achievementId
                                        ];
                                }
                            });

                            return true;
                        }
                    );
                }

                var scoreInfo =
                    calculateScore(
                        catalog,
                        achievementMap
                    );

                /*
                 * Самый верх профиля:
                 * место пользователя по очкам опыта среди тех,
                 * кто реально входит в текущий Top-1000 Зала славы.
                 */
                var rankBanner =
                    document.createElement(
                        'div'
                    );

                rankBanner.id =
                    'lof-profile-hall-rank';

                rankBanner.className =
                    'lof-profile-hall-rank';

                rankBanner.innerHTML =
                    '<span class="lof-profile-hall-rank-medal" aria-hidden="true">◆</span>' +
                    '<div class="lof-profile-hall-rank-main">' +
                        '<div class="lof-profile-hall-rank-label">' +
                            'Место на вики по очкам опыта' +
                        '</div>' +
                        '<div class="lof-profile-hall-rank-value">' +
                            'Определяем место…' +
                        '</div>' +
                        '<div class="lof-profile-hall-rank-score">' +
                            escapeHtml(
                                formatPoints(
                                    scoreInfo.score
                                )
                            ) +
                            ' опыта' +
                        '</div>' +
                    '</div>' +
                    '<a class="lof-profile-hall-rank-link" href="' +
                        escapeHtml(
                            mw.util.getUrl(
                                HALL_PAGE
                            )
                        ) +
                    '">' +
                        'Зал славы →' +
                    '</a>';

                (
                    Array.isArray(
                        hallRowsOverride
                    )
                        ? Promise.resolve(
                            hallRowsOverride
                        )
                        : getLeaderboardRowsCached(
                            catalog,
                            false
                        )
                ).then(function (rows) {
                    var ownRow =
                        null;

                    rows.some(
                        function (row) {
                            if (
                                Number(
                                    row.userId
                                ) ===
                                Number(
                                    resolvedUser.userid
                                )
                            ) {
                                ownRow =
                                    row;

                                return true;
                            }

                            return false;
                        }
                    );

                    if (
                        ownRow &&
                        Number(
                            resolvedUser.userid
                        ) ===
                        Number(
                            getCurrentUserId()
                        )
                    ) {
                        syncOwnHallRankAwardTimes(
                            resolvedUser,
                            ownRow.rank,
                            0
                        );
                    }

                    if (
                        !Array.isArray(
                            hallRowsOverride
                        ) &&
                        ownRow &&
                        ownRow.achievementMap &&
                        (
                            (
                                ownRow.achievementMap[
                                    HALL_TOP_500_ID
                                ] &&
                                !achievementMap[
                                    HALL_TOP_500_ID
                                ]
                            ) ||
                            (
                                ownRow.achievementMap[
                                    HALL_TOP_100_ID
                                ] &&
                                !achievementMap[
                                    HALL_TOP_100_ID
                                ]
                            ) ||
                            (
                                ownRow.achievementMap[
                                    HALL_TOP_10_ID
                                ] &&
                                !achievementMap[
                                    HALL_TOP_10_ID
                                ]
                            )
                        )
                    ) {
                        renderProfileAchievements(
                            catalog,
                            rows
                        );

                        return;
                    }

                    var value =
                        rankBanner.querySelector(
                            '.lof-profile-hall-rank-value'
                        );

                    if (!value) {
                        return;
                    }

                    rankBanner.classList.remove(
                        'is-rank-first',
                        'is-rank-top10',
                        'is-rank-top100',
                        'is-rank-top500'
                    );

                    var medal =
                        rankBanner.querySelector(
                            '.lof-profile-hall-rank-medal'
                        );

                    if (medal) {
                        medal.textContent =
                            '◆';
                    }

                    if (ownRow) {
                        value.textContent =
                            '#' +
                            String(
                                ownRow.rank
                            ) +
                            ' в Зале славы';

                        if (Number(ownRow.rank) === 1) {
                            rankBanner.classList.add(
                                'is-rank-first'
                            );

                            if (medal) {
                                medal.textContent =
                                    'I';
                            }
                        } else if (Number(ownRow.rank) <= 10) {
                            rankBanner.classList.add(
                                'is-rank-top10'
                            );

                            if (medal) {
                                medal.textContent =
                                    'X';
                            }
                        } else if (Number(ownRow.rank) <= 100) {
                            rankBanner.classList.add(
                                'is-rank-top100'
                            );

                            if (medal) {
                                medal.textContent =
                                    'C';
                            }
                        } else if (Number(ownRow.rank) <= 500) {
                            rankBanner.classList.add(
                                'is-rank-top500'
                            );

                            if (medal) {
                                medal.textContent =
                                    '◆';
                            }
                        }
                    } else {
                        value.textContent =
                            'В Зал славы не входит';
                    }
                }).catch(function (error) {
                    var value =
                        rankBanner.querySelector(
                            '.lof-profile-hall-rank-value'
                        );

                    if (value) {
                        value.textContent =
                            'Место временно недоступно';
                    }

                    console.warn(
                        '[Lofarian Achievements] Не удалось определить место профиля:',
                        error
                    );
                });

                var section =
                    document.createElement(
                        'section'
                    );

                section.id =
                    'lof-official-achievements';

                section.innerHTML =
                    '<h2 class="lof-profile-title">Достижения</h2>';

                var groups = {};
                var visibleCount = 0;

                Object.keys(
                    achievementMap
                ).forEach(function (achievementId) {
                    var achievement =
                        getAchievement(
                            catalog,
                            achievementId
                        );

                    if (!achievement) {
                        return;
                    }

                    var rarity =
                        getRarityInfo(
                            catalog,
                            achievement
                        );

                    if (!groups[rarity.key]) {
                        groups[rarity.key] = {
                            rarity:
                                rarity,

                            items:
                                []
                        };
                    }

                    groups[
                        rarity.key
                    ].items.push({
                        id:
                            achievementId,

                        achievement:
                            achievement,

                        earnedAt:
                            achievementMap[
                                achievementId
                            ],

                        category:
                            getAchievementVisualCategory(
                                achievementId,
                                achievement
                            ),

                        progressInfo:
                            getAchievementProgressInfo(
                                catalog,
                                achievement,
                                profileProgressContext
                            ),

                        isNew:
                            unreadAchievementMap[
                                achievementId
                            ] ===
                                true
                    });

                    visibleCount++;
                });

                /*
                 * TEST 1.12.5:
                 * ступени одной I–C цепочки не раздувают счётчик
                 * «получено». Если получена хотя бы одна ступень,
                 * вся цепочка считается одним достижением.
                 */
                visibleCount =
                    countLogicalEarnedAchievements(
                        catalog,
                        achievementMap
                    );

                var groupList =
                    Object.keys(
                        groups
                    )
                    .map(function (key) {
                        return groups[
                            key
                        ];
                    })
                    .sort(function (a, b) {
                        /*
                         * В профиле сначала самые престижные.
                         */
                        return (
                            b.rarity.order -
                            a.rarity.order
                        );
                    });

                var dialogGroups = {};

                /*
                 * Полученные достижения копируем в отдельную структуру
                 * полного списка. Исходный groupList остаётся только
                 * для компактной витрины профиля.
                 */
                groupList.forEach(
                    function (group) {
                        if (
                            !dialogGroups[
                                group.rarity.key
                            ]
                        ) {
                            dialogGroups[
                                group.rarity.key
                            ] = {
                                rarity:
                                    group.rarity,

                                items:
                                    []
                            };
                        }

                        group.items.forEach(
                            function (entry) {
                                var copy =
                                    Object.assign(
                                        {},
                                        entry
                                    );

                                copy.earned =
                                    true;

                                dialogGroups[
                                    group.rarity.key
                                ].items.push(
                                    copy
                                );
                            }
                        );
                    }
                );

                var unearnedTargets =
                    collectProfileUnearnedTargets(
                        catalog,
                        achievementMap,
                        profileProgressContext
                    );

                unearnedTargets.forEach(
                    function (entry) {
                        var rarity =
                            getRarityInfo(
                                catalog,
                                entry.achievement
                            );

                        if (
                            !dialogGroups[
                                rarity.key
                            ]
                        ) {
                            dialogGroups[
                                rarity.key
                            ] = {
                                rarity:
                                    rarity,

                                items:
                                    []
                            };
                        }

                        dialogGroups[
                            rarity.key
                        ].items.push(
                            entry
                        );
                    }
                );

                var dialogGroupList =
                    Object.keys(
                        dialogGroups
                    )
                    .map(function (key) {
                        return dialogGroups[
                            key
                        ];
                    })
                    .sort(function (a, b) {
                        return (
                            b.rarity.order -
                            a.rarity.order
                        );
                    });

                dialogGroupList.forEach(
                    function (group) {
                        group.items.sort(
                            function (a, b) {
                                if (
                                    (
                                        a.earned !==
                                            false
                                    ) !==
                                    (
                                        b.earned !==
                                            false
                                    )
                                ) {
                                    return (
                                        a.earned !==
                                            false
                                            ? -1
                                            : 1
                                    );
                                }

                                var pointDifference =
                                    getAchievementPoints(
                                        b.achievement
                                    ) -
                                    getAchievementPoints(
                                        a.achievement
                                    );

                                if (pointDifference) {
                                    return pointDifference;
                                }

                                return String(
                                    a.achievement.title
                                ).localeCompare(
                                    String(
                                        b.achievement.title
                                    ),
                                    'ru'
                                );
                            }
                        );

                        var raritySection =
                            document.createElement(
                                'div'
                            );

                        raritySection.className =
                            'lof-profile-rarity-group';

                        raritySection.setAttribute(
                            'data-rarity',
                            group.rarity.key
                        );

                        var heading =
                            document.createElement(
                                'h3'
                            );

                        heading.className =
                            'lof-profile-rarity-heading ' +
                            'lof-rarity-' +
                            group.rarity.key;

                        heading.innerHTML =
                            '<span class="lof-profile-rarity-heading-main">' +
                                escapeHtml(
                                    group.rarity.groupTitle
                                ) +
                                '<small>' +
                                    escapeHtml(
                                        (
                                            group.rarity.grade === 1
                                                ? 'I'
                                                : (
                                                    group.rarity.grade === 2
                                                        ? 'II'
                                                        : 'III'
                                                )
                                        ) +
                                        ' градация'
                                    ) +
                                '</small>' +
                            '</span>' +
                            '<span class="lof-profile-rarity-count">' +
                                escapeHtml(
                                    String(
                                        group.items.length
                                    )
                                ) +
                            '</span>';

                        raritySection.appendChild(
                            heading
                        );

                        var grid =
                            document.createElement(
                                'div'
                            );

                        grid.className =
                            'lof-profile-achievements-grid';

                        group.items.forEach(
                            function (entry) {
                                var achievement =
                                    entry.achievement;

                                var rarity =
                                    getRarityInfo(
                                        catalog,
                                        achievement
                                    );

                                var card =
                                    document.createElement(
                                        'div'
                                    );

                                card.className =
                                    'lof-profile-achievement ' +
                                    'lof-rarity-border-' +
                                    rarity.key +
                                    (
                                        entry.earned ===
                                            false
                                            ? ' is-unearned-achievement'
                                            : ' is-earned-achievement'
                                    ) +
                                    (
                                        entry.isNew
                                            ? ' is-new-achievement'
                                            : ''
                                    ) +
                                    (
                                        entry.earned !==
                                            false &&
                                        achievement.tier ===
                                            100
                                            ? ' is-tier-complete'
                                            : ''
                                    ) +
                                    (
                                        entry.progressInfo
                                            ? ' has-progress'
                                            : ' no-progress'
                                    );

                                card.setAttribute(
                                    'data-lof-achievement-id',
                                    entry.id
                                );

                                if (achievement.family) {
                                    card.setAttribute(
                                        'data-lof-family',
                                        String(achievement.family)
                                    );

                                    card.setAttribute(
                                        'data-lof-tier',
                                        String(
                                            Math.max(
                                                1,
                                                Math.floor(Number(achievement.tier) || 1)
                                            )
                                        )
                                    );
                                }

                                card.setAttribute(
                                    'data-lof-category',
                                    entry.category
                                );

                                card.setAttribute(
                                    'data-lof-earned',
                                    entry.earned ===
                                        false
                                        ? '0'
                                        : '1'
                                );

                                card.setAttribute(
                                    'data-rarity',
                                    rarity.key
                                );

                                card.setAttribute(
                                    'data-lof-rarity-order',
                                    String(
                                        rarity.order
                                    )
                                );

                                card.setAttribute(
                                    'data-lof-title',
                                    (
                                        entry.earned === false &&
                                        achievement.concealTitle === true
                                    )
                                        ? 'Скрытое достижение'
                                        : achievement.title
                                );

                                var image =
                                    document.createElement(
                                        'img'
                                    );

                                image.className =
                                    'lof-profile-achievement-image';

                                image.alt =
                                    '';

                                var textBlock =
                                    document.createElement(
                                        'div'
                                    );

                                var points =
                                    getAchievementPoints(
                                        achievement
                                    );

                                var fullTierLabel =
                                    getAchievementTierLabel(
                                        achievement
                                    );

                                var isHiddenCondition =
                                    achievement.hidden === true ||
                                    achievement.secret === true;

                                var concealCondition =
                                    isHiddenCondition &&
                                    !viewerKnowsHiddenAchievement(
                                        viewerAchievementMap,
                                        entry.id
                                    );

                                var visibleBaseTitle =
                                    concealCondition &&
                                    entry.earned === false &&
                                    achievement.concealTitle === true
                                        ? 'Скрытое достижение'
                                        : getAchievementBaseTitle(
                                            achievement
                                        );

                                textBlock.innerHTML =
                                    '<div class="lof-profile-achievement-name-row">' +
                                        '<div class="lof-profile-achievement-name">' +
                                            escapeHtml(
                                                visibleBaseTitle
                                            ) +
                                            (
                                                entry.isNew
                                                    ? '<span class="lof-profile-achievement-new-mark">Новое</span>'
                                                    : ''
                                            ) +
                                        '</div>' +
                                        (
                                            fullTierLabel
                                                ? '<span class="lof-profile-achievement-tier-label">' +
                                                    escapeHtml(
                                                        fullTierLabel
                                                    ) +
                                                  '</span>'
                                                : ''
                                        ) +
                                    '</div>' +
                                    (
                                        entry.earned ===
                                            false
                                            ? '<div class="lof-profile-achievement-unearned-label">' +
                                                (
                                                    concealCondition
                                                        ? 'Скрытая цель'
                                                        : 'Не получено'
                                                ) +
                                              '</div>'
                                            : ''
                                    ) +
                                    '<div class="lof-profile-achievement-description' +
                                        (
                                            concealCondition
                                                ? ' is-concealed-condition'
                                                : ''
                                        ) +
                                    '">' +
                                        escapeHtml(
                                            concealCondition
                                                ? buildHiddenConditionNoise(
                                                    entry.id
                                                )
                                                : achievement.description
                                        ) +
                                    '</div>';

                                var date =
                                    formatAchievementDate(
                                        entry.earnedAt
                                    );

                                if (entry.earned !== false) {
                                    textBlock.innerHTML +=
                                        '<div class="lof-profile-achievement-date">Получено: ' +
                                            escapeHtml(
                                                date || 'дата не зафиксирована'
                                            ) +
                                        '</div>';
                                }

                                if (
                                    entry.progressInfo &&
                                    !concealCondition
                                ) {
                                    textBlock.innerHTML +=
                                        '<div class="lof-profile-achievement-progress lof-rarity-' +
                                            escapeHtml(
                                                rarity.key
                                            ) +
                                            (
                                                entry.progressInfo.complete
                                                    ? ' is-complete'
                                                    : ''
                                            ) +
                                        '">' +
                                            '<div class="lof-profile-achievement-progress-text">' +
                                                '<span>' +
                                                    escapeHtml(
                                                        entry.progressInfo.text
                                                    ) +
                                                '</span>' +
                                                (
                                                    entry.progressInfo.percent !== null &&
                                                    entry.progressInfo.hidePercentLabel !== true
                                                        ? '<strong>' +
                                                            escapeHtml(
                                                                String(
                                                                    entry.progressInfo.percent
                                                                )
                                                            ) +
                                                            '%</strong>'
                                                        : ''
                                                ) +
                                            '</div>' +
                                            (
                                                entry.progressInfo.percent !== null
                                                    ? '<div class="lof-profile-achievement-progress-bar">' +
                                                        '<span style="width:' +
                                                            escapeHtml(
                                                                String(
                                                                    entry.progressInfo.percent
                                                                )
                                                            ) +
                                                            '%"></span>' +
                                                      '</div>'
                                                    : ''
                                            ) +
                                        '</div>';
                                }

                                textBlock.innerHTML +=
                                    '<div class="lof-profile-achievement-footer">' +
                                        (
                                            points > 0
                                                ? '<span class="lof-profile-achievement-points">+' +
                                                    escapeHtml(
                                                        formatPoints(
                                                            points
                                                        )
                                                    ) +
                                                  '</span>'
                                                : ''
                                        ) +
                                        '<span class="lof-profile-achievement-rarity lof-rarity-' +
                                            escapeHtml(
                                                rarity.key
                                            ) +
                                        '">' +
                                            escapeHtml(
                                                rarity.title
                                            ) +
                                        '</span>' +
                                        (
                                            achievement.secret === true ||
                                            achievement.hidden === true
                                                ? '<span class="lof-profile-achievement-secret">Скрытое</span>'
                                                : ''
                                        ) +
                                        (
                                            entry.earned ===
                                                false
                                                ? '<span class="lof-profile-achievement-unearned-status">Не получено</span>'
                                                : ''
                                        ) +
                                        '<span class="lof-profile-achievement-prevalence" ' +
                                            'data-lof-prevalence-id="' +
                                            escapeHtml(
                                                entry.id
                                            ) +
                                        '">Получили: …</span>' +
                                    '</div>';

                                if (
                                    entry.earned !==
                                        false &&
                                    achievement.tier ===
                                        100
                                ) {
                                    var completeMark =
                                        document.createElement(
                                            'span'
                                        );

                                    completeMark.className =
                                        'lof-profile-achievement-tier-complete';

                                    completeMark.textContent =
                                        'C';

                                    completeMark.title =
                                        'Цепочка завершена';

                                    card.appendChild(
                                        completeMark
                                    );
                                }

                                card.addEventListener(
                                    'click',
                                    function () {
                                        if (
                                            entry.earned !==
                                                false &&
                                            entry.isNew
                                        ) {
                                            markProfileAchievementViewed(
                                                resolvedUser.userid,
                                                entry.id,
                                                entry.earnedAt
                                            );

                                            entry.isNew =
                                                false;
                                        }
                                    }
                                );

                                card.appendChild(
                                    image
                                );

                                card.appendChild(
                                    textBlock
                                );

                                grid.appendChild(
                                    card
                                );

                                resolveAchievementImage(
                                    catalog,
                                    achievement
                                ).then(function (result) {
                                    applyResolvedImageToElement(
                                        image,
                                        result,
                                        function () {
                                            image.style.visibility =
                                                'hidden';
                                        }
                                    );
                                }).catch(function () {
                                    image.style.visibility =
                                        'hidden';
                                });
                            }
                        );

                        raritySection.appendChild(
                            grid
                        );

                        section.appendChild(
                            raritySection
                        );
                    }
                );

                if (
                    visibleCount <= 0 &&
                    unearnedTargets.length <= 0
                ) {
                    var empty =
                        document.createElement(
                            'div'
                        );

                    empty.className =
                        'lof-profile-empty';

                    empty.textContent =
                        'Официальных достижений пока нет.';

                    section.appendChild(
                        empty
                    );
                }

                var footer =
                    document.createElement(
                        'div'
                    );

                footer.className =
                    'lof-profile-score-footer';

                var total =
                    document.createElement(
                        'div'
                    );

                total.className =
                    'lof-profile-score-total';

                total.innerHTML =
                    'Очки достижений: <strong>' +
                    escapeHtml(
                        formatPoints(
                            scoreInfo.score
                        )
                    ) +
                    '</strong>';

                var hallLink =
                    document.createElement(
                        'a'
                    );

                hallLink.className =
                    'lof-hall-link';

                hallLink.href =
                    mw.util.getUrl(
                        HALL_PAGE
                    );

                hallLink.textContent =
                    'Перейти в Зал славы →';

                footer.appendChild(
                    total
                );

                footer.appendChild(
                    hallLink
                );

                section.appendChild(
                    footer
                );

                /*
                 * Проценты полного списка запускаем заранее, пока сам
                 * список ещё скрыт. При открытии окна значения обычно
                 * уже готовы и не появляются с заметной подгрузкой.
                 */
                applyAchievementPrevalenceToRoot(
                    catalog,
                    section
                );

                /*
                 * TEST 1.12.0:
                 * компактная витрина достижений находится в основной
                 * области профиля. Полный список по-прежнему открывается
                 * через «Все достижения». Штатный right rail Fandom
                 * остаётся полностью самостоятельным.
                 */
                mountProfileAchievementsRail(
                    catalog,
                    root,
                    resolvedUser.name,
                    resolvedUser.userid,
                    scoreInfo,
                    groupList,
                    visibleCount,
                    section,
                    rankBanner,
                    viewerAchievementMap
                );
            });
        }).catch(function (error) {
            console.warn(
                '[Lofarian Achievements] Не удалось определить владельца профиля:',
                username,
                error
            );
        });
    }


    /* ========================================================
     * ИСХОДНИК USER:-СТРАНИЦЫ И РУЧНОЙ РАЗДЕЛ
     * ======================================================== */

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


    /* ========================================================
     * ВЫДАТЬ ДОСТИЖЕНИЕ
     * ======================================================== */

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
                    'first_login выдаётся автоматически MediaWiki. ' +
                    'Вручную его выдавать не нужно.'
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


    /* ========================================================
     * ОТОЗВАТЬ ДОСТИЖЕНИЕ
     * ======================================================== */

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
                    'first_login нельзя отозвать: это системное ' +
                    'достижение локальной учётной записи.'
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


    /* ========================================================
     * ПОСМОТРЕТЬ ОФИЦИАЛЬНЫЕ ДОСТИЖЕНИЯ ПОЛЬЗОВАТЕЛЯ
     * ======================================================== */

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
                getEditorStatsForUser(user, true)
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


    /* ========================================================
     * АУДИТ САМОПИСНЫХ ДОСТИЖЕНИЙ
     * ======================================================== */

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
                getEditorStatsForUser(user, true),
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


    /* ========================================================
     * УДАЛИТЬ РУЧНОЙ РАЗДЕЛ == ДОСТИЖЕНИЯ ==
     * ======================================================== */

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


    /* ========================================================
     * ЗАЛ СЛАВЫ — ОБЩИЙ РЕЙТИНГ
     *
     * Отдельная база очков НЕ создаётся.
     * Очки всегда считаются по текущим достижениям.
     * ======================================================== */

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
                                    false
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
        if (leaderboardBuildPromise) {
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
            leaderboardRowsCache &&
            Date.now() -
                leaderboardRowsCacheAt <
                LEADERBOARD_CACHE_MS;

        if (
            fresh &&
            !forceReload
        ) {
            return Promise.resolve(
                cloneData(
                    leaderboardRowsCache
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
                leaderboardRowsCache =
                    cloneData(
                        persistent.rows
                    );

                leaderboardRowsCacheAt =
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

        if (leaderboardBuildPromise) {
            return leaderboardBuildPromise;
        }

        leaderboardBuildPromise =
            buildLeaderboard(
                catalog
            ).then(
                function (rows) {
                    leaderboardRowsCache =
                        cloneData(
                            rows
                        );

                    leaderboardRowsCacheAt =
                        Date.now();

                    savePersistentLeaderboardRows(
                        rows
                    );

                    leaderboardBuildPromise =
                        null;

                    return cloneData(
                        rows
                    );
                },
                function (error) {
                    leaderboardBuildPromise =
                        null;

                    throw error;
                }
            );

        return leaderboardBuildPromise;
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


    var hallRarestTooltipNode = null;

    function hideHallRarestTooltip() {
        if (!hallRarestTooltipNode) {
            return;
        }

        hallRarestTooltipNode.classList.remove(
            'is-visible'
        );
    }


    function getHallRarestTooltipNode() {
        if (
            hallRarestTooltipNode &&
            document.body.contains(
                hallRarestTooltipNode
            )
        ) {
            return hallRarestTooltipNode;
        }

        hallRarestTooltipNode =
            document.createElement(
                'div'
            );

        hallRarestTooltipNode.className =
            'lof-hall-rarest-tooltip';

        hallRarestTooltipNode.setAttribute(
            'role',
            'tooltip'
        );

        document.body.appendChild(
            hallRarestTooltipNode
        );

        window.addEventListener(
            'scroll',
            hideHallRarestTooltip,
            true
        );

        window.addEventListener(
            'resize',
            hideHallRarestTooltip
        );

        return hallRarestTooltipNode;
    }


    function positionHallRarestTooltip(
        tooltip,
        anchor
    ) {
        if (!tooltip || !anchor) {
            return;
        }

        var anchorRect =
            anchor.getBoundingClientRect();

        var tooltipRect =
            tooltip.getBoundingClientRect();

        var gap = 10;
        var viewportPadding = 10;

        var left =
            anchorRect.right + gap;

        if (
            left + tooltipRect.width >
            window.innerWidth - viewportPadding
        ) {
            left =
                anchorRect.left -
                tooltipRect.width -
                gap;
        }

        left =
            Math.max(
                viewportPadding,
                Math.min(
                    left,
                    window.innerWidth -
                        tooltipRect.width -
                        viewportPadding
                )
            );

        var top =
            anchorRect.top +
            (
                anchorRect.height -
                tooltipRect.height
            ) / 2;

        top =
            Math.max(
                viewportPadding,
                Math.min(
                    top,
                    window.innerHeight -
                        tooltipRect.height -
                        viewportPadding
                )
            );

        tooltip.style.left =
            Math.round(left) + 'px';

        tooltip.style.top =
            Math.round(top) + 'px';
    }


    function showHallRarestTooltip(
        anchor,
        data
    ) {
        if (!anchor || !data) {
            return;
        }

        var tooltip =
            getHallRarestTooltipNode();

        var rarityKey =
            String(
                data.rarityKey ||
                'common'
            );

        tooltip.setAttribute(
            'data-rarity',
            rarityKey
        );

        tooltip.innerHTML =
            '<div class="lof-hall-rarest-tooltip-title">' +
                escapeHtml(
                    data.title || 'Достижение'
                ) +
            '</div>' +
            '<div class="lof-hall-rarest-tooltip-meta">' +
                (
                    data.rarity
                        ? '<span class="lof-hall-rarest-tooltip-rarity lof-rarity-' +
                            escapeHtml(rarityKey) +
                          '">' +
                            escapeHtml(data.rarity) +
                          '</span>'
                        : ''
                ) +
                (
                    Number(data.points) > 0
                        ? '<span class="lof-hall-rarest-tooltip-points">+' +
                            escapeHtml(
                                formatPoints(
                                    Number(data.points)
                                )
                            ) +
                            ' опыта</span>'
                        : ''
                ) +
            '</div>' +
            '<div class="lof-hall-rarest-tooltip-stat">' +
                'Получили: <strong>' +
                    escapeHtml(
                        formatPlayersCount(
                            Number(data.count) || 0
                        )
                    ) +
                '</strong> из ' +
                escapeHtml(
                    String(
                        Number(data.total) || 0
                    )
                ) +
                (
                    data.formatted
                        ? ' · ' +
                            escapeHtml(data.formatted)
                        : ''
                ) +
            '</div>' +
            (
                data.earned
                    ? '<div class="lof-hall-rarest-tooltip-date">' +
                        'Получено: ' +
                        escapeHtml(data.earned) +
                      '</div>'
                    : ''
            ) +
            (
                data.owner
                    ? '<div class="lof-hall-rarest-tooltip-hint">' +
                        'Нажмите, чтобы открыть «Официальные достижения» ' +
                        escapeHtml(data.owner) +
                      '</div>'
                    : ''
            );

        tooltip.classList.add(
            'is-visible'
        );

        positionHallRarestTooltip(
            tooltip,
            anchor
        );
    }


    function bindHallRarestTooltip(
        anchor,
        data
    ) {
        if (!anchor) {
            return;
        }

        anchor._lofRarestTooltipData =
            data;

        anchor.removeAttribute(
            'title'
        );

        if (
            anchor.getAttribute(
                'data-lof-rich-tooltip-bound'
            ) === '1'
        ) {
            return;
        }

        anchor.setAttribute(
            'data-lof-rich-tooltip-bound',
            '1'
        );

        function show() {
            showHallRarestTooltip(
                anchor,
                anchor._lofRarestTooltipData
            );
        }

        anchor.addEventListener(
            'mouseenter',
            show
        );

        anchor.addEventListener(
            'focus',
            show
        );

        anchor.addEventListener(
            'mouseleave',
            hideHallRarestTooltip
        );

        anchor.addEventListener(
            'blur',
            hideHallRarestTooltip
        );

        anchor.addEventListener(
            'click',
            hideHallRarestTooltip
        );
    }


    function applyAchievementPrevalenceToRoot(
        catalog,
        root
    ) {
        if (!root) {
            return;
        }

        var elements =
            root.querySelectorAll(
                '[data-lof-prevalence-id]'
            );

        if (!elements.length) {
            return;
        }

        var ids = [];

        Array.prototype.forEach.call(
            elements,
            function (element) {
                var id =
                    String(
                        element.getAttribute(
                            'data-lof-prevalence-id'
                        ) || ''
                    );

                if (id) {
                    ids.push(
                        id
                    );
                }
            }
        );

        getAchievementPrevalenceMap(
            catalog,
            ids
        ).then(function (map) {
            Array.prototype.forEach.call(
                elements,
                function (element) {
                    var id =
                        String(
                            element.getAttribute(
                                'data-lof-prevalence-id'
                            ) || ''
                        );

                    var data =
                        map[id];

                    if (!data) {
                        element.textContent =
                            'Получили: —';

                        return;
                    }

                    var mode =
                        element.getAttribute(
                            'data-lof-prevalence-mode'
                        ) ||
                        '';

                    var detailed =
                        mode ===
                            'detailed';

                    var compact =
                        mode ===
                            'compact';

                    var countOnly =
                        mode ===
                            'count';

                    element.textContent =
                        'Получили: ' +
                        (
                            countOnly
                                ? formatPlayersCount(
                                    data.count
                                )
                                : compact
                                    ? String(
                                        data.count
                                    ) +
                                        '/' +
                                        String(
                                            data.total
                                        ) +
                                        ' · ' +
                                        data.formatted
                                    : data.formatted +
                                        (
                                            detailed
                                                ? ' · ' +
                                                    String(
                                                        data.count
                                                    ) +
                                                    ' из ' +
                                                    String(
                                                        data.total
                                                    ) +
                                                    ' участников'
                                                : ''
                                        )
                        );

                    var tooltipTitle =
                        element.getAttribute(
                            'data-lof-tooltip-title'
                        );

                    if (tooltipTitle) {
                        var tooltipLines = [
                            tooltipTitle
                        ];

                        var tooltipRarity =
                            element.getAttribute(
                                'data-lof-tooltip-rarity'
                            );

                        if (tooltipRarity) {
                            tooltipLines.push(
                                'Редкость: ' +
                                tooltipRarity
                            );
                        }

                        var tooltipPoints =
                            Number(
                                element.getAttribute(
                                    'data-lof-tooltip-points'
                                ) || 0
                            );

                        if (tooltipPoints > 0) {
                            tooltipLines.push(
                                'Очки опыта: +' +
                                formatPoints(
                                    tooltipPoints
                                )
                            );
                        }

                        tooltipLines.push(
                            'Получили: ' +
                            String(
                                data.count
                            ) +
                            ' из ' +
                            String(
                                data.total
                            ) +
                            ' участников (' +
                            data.formatted +
                            ')'
                        );

                        var tooltipEarned =
                            element.getAttribute(
                                'data-lof-tooltip-earned'
                            );

                        if (tooltipEarned) {
                            tooltipLines.push(
                                'Получено участником: ' +
                                tooltipEarned
                            );
                        }

                        var tooltipOwner =
                            element.getAttribute(
                                'data-lof-tooltip-owner'
                            );

                        if (tooltipOwner) {
                            tooltipLines.push(
                                'Нажмите, чтобы открыть официальные достижения ' +
                                tooltipOwner
                            );
                        }

                        var hallItem =
                            element.closest(
                                '.lof-hall-rarest-item'
                            );

                        if (hallItem) {
                            element.removeAttribute(
                                'title'
                            );

                            bindHallRarestTooltip(
                                hallItem,
                                {
                                    title:
                                        tooltipTitle,

                                    rarity:
                                        tooltipRarity || '',

                                    rarityKey:
                                        element.getAttribute(
                                            'data-lof-tooltip-rarity-key'
                                        ) || 'common',

                                    points:
                                        tooltipPoints,

                                    count:
                                        data.count,

                                    total:
                                        data.total,

                                    formatted:
                                        data.formatted,

                                    earned:
                                        tooltipEarned || '',

                                    owner:
                                        tooltipOwner || ''
                                }
                            );
                        } else {
                            element.title =
                                tooltipLines.join(
                                    '\n'
                                );
                        }
                    } else {
                        element.title =
                            String(
                                data.count
                            ) +
                            ' из ' +
                            String(
                                data.total
                            ) +
                            ' участников системы';
                    }
                }
            );
        }).catch(function (error) {
            console.warn(
                '[Lofarian Achievements] Не удалось рассчитать процент получения:',
                error
            );

            Array.prototype.forEach.call(
                elements,
                function (element) {
                    element.textContent =
                        'Получили: —';
                }
            );
        });
    }


    function isHallOfFamePage() {
        var title = String(
            mw.config.get('wgTitle') || ''
        ).trim();

        var canonicalNamespace = String(
            mw.config.get('wgCanonicalNamespace') || ''
        );

        if (
            title === 'Зал славы' &&
            (
                canonicalNamespace === 'Project' ||
                canonicalNamespace === ''
            )
        ) {
            return true;
        }

        return !!document.getElementById(
            'lof-achievements-leaderboard'
        );
    }

    function getLeaderboardRoot() {
        var existing = document.getElementById(
            'lof-achievements-leaderboard'
        );

        if (existing) {
            return existing;
        }

        var content = document.querySelector(
            '.mw-parser-output'
        );

        if (!content) {
            return null;
        }

        var root = document.createElement('div');
        root.id = 'lof-achievements-leaderboard';
        content.appendChild(root);

        return root;
    }

    function renderHallOfFame(catalog) {
        if (!isHallOfFamePage()) {
            return Promise.resolve();
        }

        var root =
            getLeaderboardRoot();

        if (!root) {
            return Promise.resolve();
        }

        root.innerHTML =
            '<div class="lof-leaderboard-loading">' +
                'Загружаем Зал славы…' +
            '</div>';

        var loadingTimer =
            setTimeout(
                function () {
                    var loading =
                        root.querySelector(
                            '.lof-leaderboard-loading'
                        );

                    if (loading) {
                        loading.textContent =
                            'Обновляем достижения и места в Зале славы…';
                    }
                },
                1800
            );

        /*
         * При лимите до 1000 активных участников первый
         * полный расчёт может быть заметно тяжелее прежнего.
         * После него результат кэшируется на 15 минут и
         * используется также для процентов достижений.
         */
        var hardTimeout =
            new Promise(function (
                resolve,
                reject
            ) {
                setTimeout(
                    function () {
                        reject(
                            new Error(
                                'MediaWiki API не успел построить рейтинг за 120 секунд.'
                            )
                        );
                    },
                    120000
                );
            });

        function formatHallRank(rank) {
            rank =
                Math.max(
                    1,
                    Math.floor(
                        Number(rank) || 1
                    )
                );

            if (rank === 1) {
                return 'I';
            }

            if (rank === 2) {
                return 'II';
            }

            if (rank === 3) {
                return 'III';
            }

            return String(rank);
        }

        function participantInitial(name) {
            name =
                String(
                    name || '?'
                ).trim();

            return (
                name.charAt(0) ||
                '?'
            ).toUpperCase();
        }


        var viewerHallAchievementMap = {};

        function buildHallOfficialAchievementsSection(
            row
        ) {
            var achievementMap =
                isPlainObject(
                    row.achievementMap
                )
                    ? row.achievementMap
                    : {};

            var scoreInfo =
                calculateScore(
                    catalog,
                    achievementMap
                );


            var hallCollectorState =
                getAchievementCollectorState(
                    catalog,
                    achievementMap
                );

            var hallCollectorProgressContext = {
                __achievementCollectorCount:
                    hallCollectorState.logicalCount,

                __discussionStats:
                    row.discussionStats ||
                    createEmptyDiscussionStats(),

                __directFacts:
                    row.directProgressFacts || {},

                __metaFacts:
                    buildMetaAchievementFacts(
                        catalog,
                        achievementMap
                    )
            };

            var section =
                document.createElement(
                    'section'
                );

            section.id =
                'lof-official-achievements';

            section.innerHTML =
                '<h2 class="lof-profile-title">Достижения</h2>';

            var groups = {};
            var visibleCount = 0;

            function addEntry(
                entry
            ) {
                var achievement =
                    entry.achievement;

                if (!achievement) {
                    return;
                }

                var rarity =
                    getRarityInfo(
                        catalog,
                        achievement
                    );

                if (!groups[rarity.key]) {
                    groups[rarity.key] = {
                        rarity:
                            rarity,

                        items:
                            []
                    };
                }

                groups[
                    rarity.key
                ].items.push(
                    entry
                );
            }

            Object.keys(
                achievementMap
            ).forEach(function (achievementId) {
                var achievement =
                    getAchievement(
                        catalog,
                        achievementId
                    );

                if (!achievement) {
                    return;
                }

                addEntry({
                    id:
                        achievementId,

                    achievement:
                        achievement,

                    earnedAt:
                        achievementMap[
                            achievementId
                        ],

                    earned:
                        true,

                    category:
                        getAchievementVisualCategory(
                            achievementId,
                            achievement
                        ),

                    progressInfo:
                        getAchievementProgressInfo(
                            catalog,
                            achievement,
                            hallCollectorProgressContext
                        ),

                    concealCondition:
                        false,

                    isNew:
                        false
                });

                visibleCount++;
            });

            visibleCount =
                countLogicalEarnedAchievements(
                    catalog,
                    achievementMap
                );

            collectProfileUnearnedTargets(
                catalog,
                achievementMap,
                hallCollectorProgressContext
            ).forEach(
                addEntry
            );

            Object.keys(
                groups
            )
            .map(function (key) {
                return groups[
                    key
                ];
            })
            .sort(function (a, b) {
                return (
                    b.rarity.order -
                    a.rarity.order
                );
            })
            .forEach(function (group) {
                group.items.sort(
                    function (a, b) {
                        if (
                            (
                                a.earned !==
                                    false
                            ) !==
                            (
                                b.earned !==
                                    false
                            )
                        ) {
                            return (
                                a.earned !==
                                    false
                                    ? -1
                                    : 1
                            );
                        }

                        var pointDifference =
                            getAchievementPoints(
                                b.achievement
                            ) -
                            getAchievementPoints(
                                a.achievement
                            );

                        if (pointDifference) {
                            return pointDifference;
                        }

                        return String(
                            a.achievement.title
                        ).localeCompare(
                            String(
                                b.achievement.title
                            ),
                            'ru'
                        );
                    }
                );

                var raritySection =
                    document.createElement(
                        'div'
                    );

                raritySection.className =
                    'lof-profile-rarity-group';

                raritySection.setAttribute(
                    'data-rarity',
                    group.rarity.key
                );

                var heading =
                    document.createElement(
                        'h3'
                    );

                heading.className =
                    'lof-profile-rarity-heading ' +
                    'lof-rarity-' +
                    group.rarity.key;

                heading.innerHTML =
                    '<span class="lof-profile-rarity-heading-main">' +
                        escapeHtml(
                            group.rarity.groupTitle
                        ) +
                        '<small>' +
                            escapeHtml(
                                (
                                    group.rarity.grade === 1
                                        ? 'I'
                                        : (
                                            group.rarity.grade === 2
                                                ? 'II'
                                                : 'III'
                                        )
                                ) +
                                ' градация'
                            ) +
                        '</small>' +
                    '</span>' +
                    '<span class="lof-profile-rarity-count">' +
                        escapeHtml(
                            String(
                                group.items.length
                            )
                        ) +
                    '</span>';

                raritySection.appendChild(
                    heading
                );

                var grid =
                    document.createElement(
                        'div'
                    );

                grid.className =
                    'lof-profile-achievements-grid';

                group.items.forEach(
                    function (entry) {
                        var achievement =
                            entry.achievement;

                        var rarity =
                            getRarityInfo(
                                catalog,
                                achievement
                            );

                        var card =
                            document.createElement(
                                'div'
                            );

                        card.className =
                            'lof-profile-achievement ' +
                            'lof-rarity-border-' +
                            rarity.key +
                            (
                                entry.earned ===
                                    false
                                    ? ' is-unearned-achievement'
                                    : ' is-earned-achievement'
                            ) +
                            (
                                entry.earned !==
                                    false &&
                                achievement.tier ===
                                    100
                                    ? ' is-tier-complete'
                                    : ''
                            ) +
                            (
                                entry.progressInfo
                                    ? ' has-progress'
                                    : ' no-progress'
                            );

                        card.setAttribute(
                            'data-lof-achievement-id',
                            entry.id
                        );

                        if (achievement.family) {
                            card.setAttribute(
                                'data-lof-family',
                                String(achievement.family)
                            );

                            card.setAttribute(
                                'data-lof-tier',
                                String(
                                    Math.max(
                                        1,
                                        Math.floor(Number(achievement.tier) || 1)
                                    )
                                )
                            );
                        }

                        card.setAttribute(
                            'data-lof-category',
                            entry.category
                        );

                        card.setAttribute(
                            'data-lof-earned',
                            entry.earned ===
                                false
                                ? '0'
                                : '1'
                        );

                        card.setAttribute(
                            'data-rarity',
                            rarity.key
                        );

                        card.setAttribute(
                            'data-lof-rarity-order',
                            String(
                                rarity.order
                            )
                        );

                        card.setAttribute(
                            'data-lof-title',
                            (
                                entry.earned === false &&
                                achievement.concealTitle === true
                            )
                                ? 'Скрытое достижение'
                                : achievement.title
                        );

                        var image =
                            document.createElement(
                                'img'
                            );

                        image.className =
                            'lof-profile-achievement-image';

                        image.alt =
                            '';

                        var textBlock =
                            document.createElement(
                                'div'
                            );

                        var points =
                            getAchievementPoints(
                                achievement
                            );

                        var fullTierLabel =
                            getAchievementTierLabel(
                                achievement
                            );

                        var isHiddenCondition =
                            achievement.hidden === true ||
                            achievement.secret === true;

                        var concealCondition =
                            isHiddenCondition &&
                            !viewerKnowsHiddenAchievement(
                                viewerHallAchievementMap,
                                entry.id
                            );

                        var visibleHallBaseTitle =
                            concealCondition &&
                            entry.earned === false &&
                            achievement.concealTitle === true
                                ? 'Скрытое достижение'
                                : getAchievementBaseTitle(
                                    achievement
                                );

                        textBlock.innerHTML =
                            '<div class="lof-profile-achievement-name-row">' +
                                '<div class="lof-profile-achievement-name">' +
                                    escapeHtml(
                                        visibleHallBaseTitle
                                    ) +
                                '</div>' +
                                (
                                    fullTierLabel
                                        ? '<span class="lof-profile-achievement-tier-label">' +
                                            escapeHtml(
                                                fullTierLabel
                                            ) +
                                          '</span>'
                                        : ''
                                ) +
                            '</div>' +
                            (
                                entry.earned ===
                                    false
                                    ? '<div class="lof-profile-achievement-unearned-label">' +
                                        (
                                            concealCondition
                                                ? 'Скрытая цель'
                                                : 'Не получено'
                                        ) +
                                      '</div>'
                                    : ''
                            ) +
                            '<div class="lof-profile-achievement-description' +
                                (
                                    concealCondition
                                        ? ' is-concealed-condition'
                                        : ''
                                ) +
                            '">' +
                                escapeHtml(
                                    concealCondition
                                        ? buildHiddenConditionNoise(
                                            entry.id
                                        )
                                        : achievement.description
                                ) +
                            '</div>';

                        var date =
                            formatAchievementDate(
                                entry.earnedAt
                            );

                        if (entry.earned !== false) {
                            textBlock.innerHTML +=
                                '<div class="lof-profile-achievement-date">Получено: ' +
                                    escapeHtml(
                                        date || 'дата не зафиксирована'
                                    ) +
                                '</div>';
                        }

                        textBlock.innerHTML +=
                            '<div class="lof-profile-achievement-footer">' +
                                (
                                    points > 0
                                        ? '<span class="lof-profile-achievement-points">+' +
                                            escapeHtml(
                                                formatPoints(
                                                    points
                                                )
                                            ) +
                                          '</span>'
                                        : ''
                                ) +
                                '<span class="lof-profile-achievement-rarity lof-rarity-' +
                                    escapeHtml(
                                        rarity.key
                                    ) +
                                '">' +
                                    escapeHtml(
                                        rarity.title
                                    ) +
                                '</span>' +
                                (
                                    achievement.secret === true ||
                                    achievement.hidden === true
                                        ? '<span class="lof-profile-achievement-secret">Скрытое</span>'
                                        : ''
                                ) +
                                (
                                    entry.earned ===
                                        false
                                        ? '<span class="lof-profile-achievement-unearned-status">Не получено</span>'
                                        : ''
                                ) +
                                '<span class="lof-profile-achievement-prevalence" ' +
                                    'data-lof-prevalence-id="' +
                                    escapeHtml(
                                        entry.id
                                    ) +
                                '">Получили: …</span>' +
                            '</div>';

                        if (
                            entry.earned !==
                                false &&
                            achievement.tier ===
                                100
                        ) {
                            var completeMark =
                                document.createElement(
                                    'span'
                                );

                            completeMark.className =
                                'lof-profile-achievement-tier-complete';

                            completeMark.textContent =
                                'C';

                            completeMark.title =
                                'Цепочка завершена';

                            card.appendChild(
                                completeMark
                            );
                        }

                        card.appendChild(
                            image
                        );

                        card.appendChild(
                            textBlock
                        );

                        grid.appendChild(
                            card
                        );

                        resolveAchievementImage(
                            catalog,
                            achievement
                        ).then(function (result) {
                            applyResolvedImageToElement(
                                image,
                                result,
                                function () {
                                    image.style.visibility =
                                        'hidden';
                                }
                            );
                        }).catch(function () {
                            image.style.visibility =
                                'hidden';
                        });
                    }
                );

                raritySection.appendChild(
                    grid
                );

                section.appendChild(
                    raritySection
                );
            });

            var footer =
                document.createElement(
                    'div'
                );

            footer.className =
                'lof-profile-score-footer';

            footer.innerHTML =
                '<div class="lof-profile-score-total">' +
                    'Очки достижений: <strong>' +
                    escapeHtml(
                        formatPoints(
                            scoreInfo.score
                        )
                    ) +
                    '</strong>' +
                '</div>';

            section.appendChild(
                footer
            );

            return {
                section:
                    section,

                scoreInfo:
                    scoreInfo,

                visibleCount:
                    visibleCount
            };
        }


        function openHallOfficialAchievements(
            row,
            targetAchievementId
        ) {
            var built =
                buildHallOfficialAchievementsSection(
                    row
                );

            openProfileAchievementsDialog(
                catalog,
                row.name,
                built.scoreInfo,
                built.visibleCount,
                built.section,
                targetAchievementId ||
                    null
            );
        }


        function buildHallRarestList(
            row,
            podiumMode
        ) {
            var rarestLimit =
                Number(
                    row.rank
                ) <= 10
                    ? 5
                    : 1;

            var rarestEntries =
                getRarestEarnedAchievements(
                    catalog,
                    row.achievementMap || {},
                    rarestLimit
                );

            if (!rarestEntries.length) {
                return null;
            }

            var list =
                document.createElement(
                    'div'
                );

            list.className =
                podiumMode
                    ? 'lof-hall-rarest-list lof-hall-podium-rarest-list'
                    : 'lof-hall-rarest-list';

            rarestEntries.forEach(
                function (entry) {
                    var button =
                        document.createElement(
                            'button'
                        );

                    button.type =
                        'button';

                    button.className =
                        'lof-hall-rarest-item';

                    button.setAttribute(
                        'data-rarity',
                        entry.rarity.key
                    );

                    button.setAttribute(
                        'aria-label',
                        entry.achievement.title +
                        ' · ' +
                        entry.rarity.title +
                        ' · открыть в официальных достижениях ' +
                        row.name
                    );

                    var imageWrap =
                        document.createElement(
                            'span'
                        );

                    imageWrap.className =
                        'lof-hall-rarest-item-image-wrap';

                    var image =
                        document.createElement(
                            'img'
                        );

                    image.className =
                        'lof-hall-rarest-item-image';

                    image.alt =
                        '';

                    imageWrap.appendChild(
                        image
                    );

                    var text =
                        document.createElement(
                            'span'
                        );

                    text.className =
                        'lof-hall-rarest-item-text';

                    var earnedDate =
                        formatAchievementDate(
                            row.achievementMap &&
                            row.achievementMap[
                                entry.id
                            ]
                        );

                    text.innerHTML =
                        '<span class="lof-hall-rarest-item-title">' +
                            escapeHtml(
                                entry.achievement.title
                            ) +
                        '</span>' +
                        '<span class="lof-hall-rarest-item-meta">' +
                            '<span class="lof-hall-rarest-item-rarity lof-rarity-' +
                                escapeHtml(
                                    entry.rarity.key
                                ) +
                            '">' +
                                escapeHtml(
                                    entry.rarity.title
                                ) +
                            '</span>' +
                            '<span class="lof-hall-rarest-item-prevalence" ' +
                                'data-lof-prevalence-id="' +
                                escapeHtml(
                                    entry.id
                                ) +
                                '" data-lof-prevalence-mode="count">Получили: …</span>' +
                        '</span>';

                    var prevalence =
                        text.querySelector(
                            '.lof-hall-rarest-item-prevalence'
                        );

                    if (prevalence) {
                        prevalence.setAttribute(
                            'data-lof-tooltip-title',
                            entry.achievement.title
                        );

                        prevalence.setAttribute(
                            'data-lof-tooltip-rarity',
                            entry.rarity.title
                        );

                        prevalence.setAttribute(
                            'data-lof-tooltip-rarity-key',
                            entry.rarity.key
                        );

                        prevalence.setAttribute(
                            'data-lof-tooltip-points',
                            String(
                                getAchievementPoints(
                                    entry.achievement
                                )
                            )
                        );

                        prevalence.setAttribute(
                            'data-lof-tooltip-owner',
                            row.name
                        );

                        if (earnedDate) {
                            prevalence.setAttribute(
                                'data-lof-tooltip-earned',
                                earnedDate
                            );
                        }
                    }

                    button.appendChild(
                        imageWrap
                    );

                    button.appendChild(
                        text
                    );

                    button.addEventListener(
                        'click',
                        function () {
                            openHallOfficialAchievements(
                                row,
                                entry.id
                            );
                        }
                    );

                    resolveAchievementImage(
                        catalog,
                        entry.achievement
                    ).then(function (result) {
                        applyResolvedImageToElement(
                            image,
                            result,
                            function () {
                                image.style.visibility =
                                    'hidden';
                            }
                        );
                    }).catch(function () {
                        image.style.visibility =
                            'hidden';
                    });

                    list.appendChild(
                        button
                    );
                }
            );

            applyAchievementPrevalenceToRoot(
                catalog,
                list
            );

            return list;
        }



        function buildPodiumCard(
            row,
            currentId
        ) {
            var card =
                document.createElement(
                    'div'
                );

            card.className =
                'lof-hall-podium-card';

            card.setAttribute(
                'data-rank',
                String(
                    row.rank
                )
            );

            var medal =
                document.createElement(
                    'div'
                );

            medal.className =
                'lof-hall-podium-medal';

            medal.textContent =
                formatHallRank(
                    row.rank
                );

            var avatar =
                document.createElement(
                    'div'
                );

            avatar.className =
                'lof-hall-podium-avatar';

            avatar.textContent =
                participantInitial(
                    row.name
                );

            var user =
                document.createElement(
                    'a'
                );

            user.className =
                'lof-hall-podium-user';

            user.href =
                mw.util.getUrl(
                    'User:' +
                    row.name
                );

            user.textContent =
                row.name;

            if (
                row.userId ===
                currentId
            ) {
                var badge =
                    document.createElement(
                        'span'
                    );

                badge.className =
                    'lof-hall-current-badge';

                badge.textContent =
                    'Вы';

                user.appendChild(
                    badge
                );
            }

            var score =
                document.createElement(
                    'div'
                );

            score.className =
                'lof-hall-podium-score';

            score.textContent =
                formatPoints(
                    row.score
                ) +
                ' очков';

            var count =
                document.createElement(
                    'div'
                );

            count.className =
                'lof-hall-podium-count';

            count.textContent =
                String(
                    row.count
                ) +
                ' достижений';

            card.appendChild(
                medal
            );

            card.appendChild(
                avatar
            );

            card.appendChild(
                user
            );

            card.appendChild(
                score
            );

            card.appendChild(
                count
            );

            var podiumRarestList =
                buildHallRarestList(
                    row,
                    true
                );

            if (podiumRarestList) {
                card.appendChild(
                    podiumRarestList
                );
            }

            var achievementsButton =
                document.createElement(
                    'button'
                );

            achievementsButton.type =
                'button';

            achievementsButton.className =
                'lof-hall-achievements-button';

            achievementsButton.textContent =
                'Все достижения';

            achievementsButton.addEventListener(
                'click',
                function () {
                    openHallOfficialAchievements(
                        row
                    );
                }
            );

            card.appendChild(
                achievementsButton
            );

            return card;
        }

        return Promise.all([
            Promise.race([
                getLeaderboardRowsCached(
                    catalog,
                    false
                ),
                hardTimeout
            ]),
            getCurrentViewerEffectiveAchievementMap(catalog)
        ]).then(function (hallResults) {
            var rows = hallResults[0];
            viewerHallAchievementMap = hallResults[1] || {};
            clearTimeout(
                loadingTimer
            );

            root.innerHTML =
                '';

            if (!rows.length) {
                root.innerHTML =
                    '<div class="lof-leaderboard-empty">' +
                        'В Зале славы пока никого нет.' +
                    '</div>';

                return rows;
            }

            var currentId =
                getCurrentUserId();

            var currentRow =
                null;

            rows.some(function (row) {
                if (
                    row.userId ===
                    currentId
                ) {
                    currentRow =
                        row;

                    return true;
                }

                return false;
            });

            if (
                currentRow &&
                Number(
                    currentRow.userId
                ) ===
                Number(
                    getCurrentUserId()
                )
            ) {
                syncOwnHallRankAwardTimes(
                    {
                        userid:
                            currentRow.userId,

                        name:
                            currentRow.name
                    },
                    currentRow.rank,
                    0
                );
            }

            var totalPoints = 0;
            var totalAchievements = 0;

            rows.forEach(function (row) {
                totalPoints +=
                    Number(
                        row.score
                    ) || 0;

                totalAchievements +=
                    Number(
                        row.count
                    ) || 0;
            });

            var shell =
                document.createElement(
                    'div'
                );

            shell.className =
                'lof-hall-shell';

            /*
             * Верхняя сводка.
             */
            var hero =
                document.createElement(
                    'section'
                );

            hero.className =
                'lof-hall-hero';

            hero.innerHTML =
                '<div class="lof-hall-kicker">Летопись Лофариана</div>' +
                '<h2 class="lof-hall-heading">Зал славы</h2>' +
                '<p class="lof-hall-subtitle">' +
                    'Рейтинг активных участников системы достижений. ' +
                    'В расчёт входят только участники, имеющие хотя бы одно ' +
                    'засчитанное достижение и ненулевой счёт. ' +
                    'Именно этот состав используется для процента «Получили».' +
                '</p>';

            var stats =
                document.createElement(
                    'div'
                );

            stats.className =
                'lof-hall-stats';

            var statsData = [
                {
                    label:
                        'Участников',

                    value:
                        formatCatalogInteger(
                            rows.length
                        )
                },
                {
                    label:
                        'Всего очков',

                    value:
                        formatPoints(
                            totalPoints
                        )
                },
                {
                    label:
                        'Получено достижений',

                    value:
                        formatCatalogInteger(
                            totalAchievements
                        )
                },
                {
                    label:
                        'Ваше место',

                    value:
                        currentRow
                            ? '#' +
                                String(
                                    currentRow.rank
                                )
                            : '—'
                }
            ];

            statsData.forEach(
                function (item) {
                    var stat =
                        document.createElement(
                            'div'
                        );

                    stat.className =
                        'lof-hall-stat';

                    stat.innerHTML =
                        '<span class="lof-hall-stat-label">' +
                            escapeHtml(
                                item.label
                            ) +
                        '</span>' +
                        '<span class="lof-hall-stat-value">' +
                            escapeHtml(
                                item.value
                            ) +
                        '</span>';

                    stats.appendChild(
                        stat
                    );
                }
            );

            hero.appendChild(
                stats
            );

            shell.appendChild(
                hero
            );

            /*
             * Пьедестал первых трёх.
             * Визуально: II | I | III.
             */
            var topThree =
                rows.slice(
                    0,
                    3
                );

            if (topThree.length) {
                var podium =
                    document.createElement(
                        'section'
                    );

                podium.className =
                    'lof-hall-podium';

                var podiumOrder =
                    topThree.length >= 3
                        ? [
                            topThree[1],
                            topThree[0],
                            topThree[2]
                        ]
                        : topThree;

                podiumOrder.forEach(
                    function (row) {
                        if (!row) {
                            return;
                        }

                        podium.appendChild(
                            buildPodiumCard(
                                row,
                                currentId
                            )
                        );
                    }
                );

                shell.appendChild(
                    podium
                );
            }

            /*
             * Основная таблица. Максимум 1000 участников
             * остаются доступны, но DOM строит только
             * 50 строк на странице.
             */
            var board =
                document.createElement(
                    'section'
                );

            board.className =
                'lof-hall-board';

            var toolbar =
                document.createElement(
                    'div'
                );

            toolbar.className =
                'lof-hall-toolbar';

            var search =
                document.createElement(
                    'input'
                );

            search.className =
                'lof-hall-search';

            search.type =
                'search';

            search.placeholder =
                'Найти участника…';

            search.setAttribute(
                'aria-label',
                'Поиск участника в Зале славы'
            );

            var resultInfo =
                document.createElement(
                    'div'
                );

            resultInfo.className =
                'lof-hall-result-info';

            toolbar.appendChild(
                search
            );

            toolbar.appendChild(
                resultInfo
            );

            board.appendChild(
                toolbar
            );

            var wrap =
                document.createElement(
                    'div'
                );

            wrap.className =
                'lof-leaderboard-table-wrap';

            var table =
                document.createElement(
                    'table'
                );

            table.className =
                'lof-leaderboard-table';

            table.innerHTML =
                '<thead>' +
                    '<tr>' +
                        '<th>Место</th>' +
                        '<th>Участник</th>' +
                        '<th>Редчайшие</th>' +
                        '<th>Очки</th>' +
                        '<th>Достижения</th>' +
                    '</tr>' +
                '</thead>' +
                '<tbody></tbody>';

            var tbody =
                table.querySelector(
                    'tbody'
                );

            wrap.appendChild(
                table
            );

            board.appendChild(
                wrap
            );

            var pagination =
                document.createElement(
                    'div'
                );

            pagination.className =
                'lof-hall-pagination';

            var pageStatus =
                document.createElement(
                    'div'
                );

            pageStatus.className =
                'lof-hall-page-status';

            var buttons =
                document.createElement(
                    'div'
                );

            buttons.className =
                'lof-hall-page-buttons';

            var previous =
                document.createElement(
                    'button'
                );

            previous.type =
                'button';

            previous.className =
                'lof-hall-page-button';

            previous.textContent =
                '← Назад';

            var next =
                document.createElement(
                    'button'
                );

            next.type =
                'button';

            next.className =
                'lof-hall-page-button';

            next.textContent =
                'Вперёд →';

            buttons.appendChild(
                previous
            );

            buttons.appendChild(
                next
            );

            pagination.appendChild(
                pageStatus
            );

            pagination.appendChild(
                buttons
            );

            board.appendChild(
                pagination
            );

            shell.appendChild(
                board
            );

            root.appendChild(
                shell
            );

            var page = 1;
            var query = '';

            function filteredRows() {
                if (!query) {
                    return rows;
                }

                return rows.filter(
                    function (row) {
                        return String(
                            row.name
                        )
                        .toLocaleLowerCase(
                            'ru'
                        )
                        .indexOf(
                            query
                        ) !== -1;
                    }
                );
            }

            function renderTablePage() {
                var filtered =
                    filteredRows();

                var pages =
                    Math.max(
                        1,
                        Math.ceil(
                            filtered.length /
                            LEADERBOARD_PAGE_SIZE
                        )
                    );

                page =
                    Math.min(
                        Math.max(
                            1,
                            page
                        ),
                        pages
                    );

                var start =
                    (
                        page - 1
                    ) *
                    LEADERBOARD_PAGE_SIZE;

                var end =
                    Math.min(
                        start +
                        LEADERBOARD_PAGE_SIZE,
                        filtered.length
                    );

                tbody.innerHTML =
                    '';

                if (!filtered.length) {
                    var emptyRow =
                        document.createElement(
                            'tr'
                        );

                    var emptyCell =
                        document.createElement(
                            'td'
                        );

                    emptyCell.colSpan =
                        5;

                    emptyCell.className =
                        'lof-hall-no-results';

                    emptyCell.textContent =
                        'Участник не найден.';

                    emptyRow.appendChild(
                        emptyCell
                    );

                    tbody.appendChild(
                        emptyRow
                    );
                } else {
                    filtered
                        .slice(
                            start,
                            end
                        )
                        .forEach(
                            function (row) {
                                var tr =
                                    document.createElement(
                                        'tr'
                                    );

                                if (
                                    row.userId ===
                                    currentId
                                ) {
                                    tr.className =
                                        'lof-leaderboard-current';
                                }

                                var rank =
                                    document.createElement(
                                        'td'
                                    );

                                rank.className =
                                    'lof-leaderboard-rank';

                                var rankSeal =
                                    document.createElement(
                                        'span'
                                    );

                                rankSeal.className =
                                    'lof-rank-seal';

                                rankSeal.setAttribute(
                                    'data-rank',
                                    String(
                                        row.rank
                                    )
                                );

                                rankSeal.textContent =
                                    formatHallRank(
                                        row.rank
                                    );

                                rank.appendChild(
                                    rankSeal
                                );

                                var userCell =
                                    document.createElement(
                                        'td'
                                    );

                                userCell.className =
                                    'lof-leaderboard-user';

                                var userLink =
                                    document.createElement(
                                        'a'
                                    );

                                userLink.href =
                                    mw.util.getUrl(
                                        'User:' +
                                        row.name
                                    );

                                userLink.textContent =
                                    row.name;

                                userCell.appendChild(
                                    userLink
                                );

                                if (
                                    row.userId ===
                                    currentId
                                ) {
                                    var currentBadge =
                                        document.createElement(
                                            'span'
                                        );

                                    currentBadge.className =
                                        'lof-hall-current-badge';

                                    currentBadge.textContent =
                                        'Вы';

                                    userCell.appendChild(
                                        currentBadge
                                    );
                                }

                                var rarestCell =
                                    document.createElement(
                                        'td'
                                    );

                                var rowRarestList =
                                    buildHallRarestList(
                                        row,
                                        false
                                    );

                                if (rowRarestList) {
                                    rarestCell.appendChild(
                                        rowRarestList
                                    );
                                } else {
                                    rarestCell.textContent =
                                        '—';
                                }

                                var score =
                                    document.createElement(
                                        'td'
                                    );

                                score.className =
                                    'lof-leaderboard-score';

                                score.textContent =
                                    formatPoints(
                                        row.score
                                    );

                                var count =
                                    document.createElement(
                                        'td'
                                    );

                                count.className =
                                    'lof-leaderboard-count';

                                var viewButton =
                                    document.createElement(
                                        'button'
                                    );

                                viewButton.type =
                                    'button';

                                viewButton.className =
                                    'lof-hall-achievements-button';

                                viewButton.textContent =
                                    String(
                                        row.count
                                    ) +
                                    ' · Смотреть';

                                viewButton.addEventListener(
                                    'click',
                                    function () {
                                        openHallOfficialAchievements(
                                            row
                                        );
                                    }
                                );

                                count.appendChild(
                                    viewButton
                                );

                                tr.appendChild(
                                    rank
                                );

                                tr.appendChild(
                                    userCell
                                );

                                tr.appendChild(
                                    rarestCell
                                );

                                tr.appendChild(
                                    score
                                );

                                tr.appendChild(
                                    count
                                );

                                tbody.appendChild(
                                    tr
                                );
                            }
                        );
                }

                if (filtered.length) {
                    resultInfo.textContent =
                        formatCatalogInteger(
                            filtered.length
                        ) +
                        (
                            query
                                ? ' найдено'
                                : ' активных участников'
                        );

                    pageStatus.textContent =
                        formatCatalogInteger(
                            start + 1
                        ) +
                        '–' +
                        formatCatalogInteger(
                            end
                        ) +
                        ' из ' +
                        formatCatalogInteger(
                            filtered.length
                        ) +
                        ' · страница ' +
                        String(
                            page
                        ) +
                        ' из ' +
                        String(
                            pages
                        );
                } else {
                    resultInfo.textContent =
                        '0 найдено';

                    pageStatus.textContent =
                        'Нет результатов';
                }

                previous.disabled =
                    page <= 1;

                next.disabled =
                    page >= pages;
            }

            search.addEventListener(
                'input',
                function () {
                    query =
                        String(
                            search.value || ''
                        )
                        .trim()
                        .toLocaleLowerCase(
                            'ru'
                        );

                    page = 1;

                    renderTablePage();
                }
            );

            previous.addEventListener(
                'click',
                function () {
                    if (page > 1) {
                        page--;

                        renderTablePage();

                        board.scrollIntoView({
                            behavior:
                                'smooth',

                            block:
                                'start'
                        });
                    }
                }
            );

            next.addEventListener(
                'click',
                function () {
                    var filtered =
                        filteredRows();

                    var pages =
                        Math.max(
                            1,
                            Math.ceil(
                                filtered.length /
                                LEADERBOARD_PAGE_SIZE
                            )
                        );

                    if (page < pages) {
                        page++;

                        renderTablePage();

                        board.scrollIntoView({
                            behavior:
                                'smooth',

                            block:
                                'start'
                        });
                    }
                }
            );

            document.addEventListener(
                'keydown',
                function (event) {
                    if (
                        event.key ===
                            'Escape' &&
                        openAchievementOverlay
                    ) {
                        closeHallAchievementViewer();
                    }
                }
            );

            renderTablePage();

            return rows;
        }).catch(function (error) {
            clearTimeout(
                loadingTimer
            );

            root.innerHTML =
                '<div class="lof-leaderboard-error">' +
                    'Не удалось построить Зал славы. ' +
                    'Подробности записаны в консоль.' +
                '</div>';

            console.error(
                '[Lofarian Achievements] Ошибка Зала славы:',
                error
            );

            throw error;
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


    /* ========================================================
     * ПРОВЕРИТЬ КАРТИНКУ
     * ======================================================== */

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


    /* ========================================================
     * УЗНАТЬ СЕГМЕНТ ПОЛЬЗОВАТЕЛЯ
     * ======================================================== */

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



    /* ========================================================
     * ПРЕДПРОСМОТР ВСЕХ 13 РЕДКОСТЕЙ
     * ======================================================== */

    function countLogicalEarnedAchievements(
        catalog,
        achievementMap
    ) {
        achievementMap =
            isPlainObject(
                achievementMap
            )
                ? achievementMap
                : {};

        var directCount = 0;
        var earnedFamilies = {};

        Object.keys(
            achievementMap
        ).forEach(function (achievementId) {
            var achievement =
                getAchievement(
                    catalog,
                    achievementId
                );

            if (!achievement) {
                return;
            }

            if (achievement.family) {
                earnedFamilies[
                    achievement.family
                ] = true;
                return;
            }

            directCount++;
        });

        return (
            directCount +
            Object.keys(
                earnedFamilies
            ).length
        );
    }


    function getLogicalRarityAchievementCounts(
        catalog
    ) {
        var rarityCounts = {};
        var totalAchievementCount = 0;

        /*
         * Одиночное достижение считается один раз.
         */
        var hasCollectorSeries = false;

        Object.keys(
            catalog.achievements || {}
        ).forEach(function (achievementId) {
            if (ACHIEVEMENT_COUNT_MILESTONE_IDS[achievementId]) {
                hasCollectorSeries = true;
                return;
            }

            var achievement =
                getAchievement(
                    catalog,
                    achievementId
                );

            if (!achievement) {
                return;
            }

            var rarity =
                getRarityInfo(
                    catalog,
                    achievement
                );

            totalAchievementCount++;
            rarityCounts[rarity.key] =
                (rarityCounts[rarity.key] || 0) + 1;
        });

        if (hasCollectorSeries) {
            totalAchievementCount++;
            rarityCounts.common =
                (rarityCounts.common || 0) + 1;
        }

        /*
         * Уровневая цепочка I–C является одним достижением.
         * Внутри конкретной редкости хоть одна, хоть двадцать пять
         * её ступеней дают ровно +1 к количеству этой редкости.
         * Если цепочка проходит через несколько редкостей, она по
         * одному разу присутствует в каждой затронутой редкости,
         * но в общем количестве системы остаётся одной цепочкой.
         */
        Object.keys(
            catalog.families || {}
        ).forEach(function (familyId) {
            var family =
                catalog.families[
                    familyId
                ];

            if (
                !family ||
                !Array.isArray(
                    family.thresholds
                ) ||
                !family.thresholds.length
            ) {
                return;
            }

            totalAchievementCount++;

            var familyRarities = {};

            for (
                var level = 1;
                level <= family.thresholds.length;
                level++
            ) {
                var rarityKey =
                    family.rarity ||
                    getRarityKeyForLevel(
                        catalog,
                        level
                    );

                if (rarityKey) {
                    familyRarities[
                        String(rarityKey)
                    ] = true;
                }
            }

            Object.keys(
                familyRarities
            ).forEach(function (rarityKey) {
                rarityCounts[rarityKey] =
                    (rarityCounts[rarityKey] || 0) + 1;
            });
        });

        return {
            total:
                totalAchievementCount,

            byRarity:
                rarityCounts
        };
    }


    function getLogicalEarnedRarityCounts(
        catalog,
        achievementSection
    ) {
        var counts = {};
        var seen = {};
        var earnedFamilyMaxTier = {};

        if (!achievementSection) {
            return counts;
        }

        function registerEarned(
            rarityKey,
            logicalId
        ) {
            rarityKey =
                String(
                    rarityKey || ''
                );

            logicalId =
                String(
                    logicalId || ''
                );

            if (
                !rarityKey ||
                !logicalId
            ) {
                return;
            }

            var scopedId =
                rarityKey +
                '|' +
                logicalId;

            if (seen[scopedId]) {
                return;
            }

            seen[scopedId] =
                true;

            counts[rarityKey] =
                (counts[rarityKey] || 0) + 1;
        }

        achievementSection.querySelectorAll(
            '.lof-profile-achievement[data-lof-earned="1"]' +
            '[data-lof-achievement-id]'
        ).forEach(function (card) {
            var achievementId =
                String(
                    card.getAttribute(
                        'data-lof-achievement-id'
                    ) || ''
                );

            var achievement =
                getAchievement(
                    catalog,
                    achievementId
                );

            if (!achievement) {
                return;
            }

            /*
             * TEST 1.12.7:
             * если пользователь дошёл до более высокой ступени цепочки,
             * все реально пройденные нижние редкости этой же цепочки тоже
             * считаются полученными. Например, достигнутая Мифическая ступень
             * автоматически означает, что Обычная/Необычная/... ступени,
             * лежащие до неё в той же I–C цепочке, уже были пройдены.
             * Внутри каждой редкости сама цепочка всё равно даёт максимум +1.
             */
            var renderedFamily =
                String(
                    card.getAttribute('data-lof-family') ||
                    achievement.family ||
                    ''
                );

            if (renderedFamily) {
                var tier =
                    Math.max(
                        1,
                        Math.floor(
                            Number(
                                card.getAttribute('data-lof-tier') ||
                                achievement.tier
                            ) || 1
                        )
                    );

                earnedFamilyMaxTier[renderedFamily] =
                    Math.max(
                        Number(
                            earnedFamilyMaxTier[renderedFamily]
                        ) || 0,
                        tier
                    );

                return;
            }

            var rarity =
                getRarityInfo(
                    catalog,
                    achievement
                );

            registerEarned(
                rarity.key,
                'achievement:' +
                    achievementId
            );
        });

        Object.keys(
            earnedFamilyMaxTier
        ).forEach(function (familyId) {
            var family =
                catalog &&
                catalog.families &&
                catalog.families[familyId];

            if (
                !family ||
                !Array.isArray(
                    family.thresholds
                ) ||
                !family.thresholds.length
            ) {
                return;
            }

            var maxTier =
                Math.min(
                    family.thresholds.length,
                    Math.max(
                        1,
                        Math.floor(
                            Number(
                                earnedFamilyMaxTier[familyId]
                            ) || 1
                        )
                    )
                );

            /*
             * Идём с I ступени, а не только с текущей. Поэтому если
             * пользователь уже дошёл до II/III градации, пройденная
             * Обычная стадия этой цепочки тоже попадает в «получено».
             */
            for (
                var level = 1;
                level <= maxTier;
                level++
            ) {
                var rarityKey =
                    family.rarity ||
                    getRarityKeyForLevel(
                        catalog,
                        level
                    );

                registerEarned(
                    rarityKey,
                    'family:' +
                        familyId
                );
            }
        });

        return counts;
    }


    function buildRarityPreviewPane(
        catalog,
        achievementSection
    ) {
        var pane =
            document.createElement(
                'section'
            );

        pane.className =
            'lof-rarity-preview-pane';

        pane.style.display =
            'none';

        var logicalRarityCounts =
            getLogicalRarityAchievementCounts(
                catalog
            );

        var rarityAchievementCounts =
            logicalRarityCounts.byRarity;

        var totalAchievementCount =
            logicalRarityCounts.total;

        var earnedRarityCounts =
            getLogicalEarnedRarityCounts(
                catalog,
                achievementSection
            );

        var intro =
            document.createElement(
                'div'
            );

        intro.className =
            'lof-rarity-preview-inline-intro';

        intro.innerHTML =
            '<div class="lof-rarity-preview-kicker">' +
                'СИСТЕМА РЕДКОСТЕЙ' +
            '</div>' +
            '<div class="lof-rarity-preview-title">' +
                'Все оформления редкостей' +
            '</div>' +
            '<div class="lof-rarity-preview-subtitle">' +
                'Три градации · тринадцать рамок · всего ' +
                escapeHtml(
                    String(
                        totalAchievementCount
                    )
                ) +
                ' достижений' +
            '</div>';

        pane.appendChild(
            intro
        );

        var rarities =
            Object.keys(
                catalog.rarities || {}
            )
            .map(function (key) {
                var item =
                    catalog.rarities[
                        key
                    ] || {};

                return {
                    key:
                        key,

                    title:
                        String(
                            item.title || key
                        ),

                    order:
                        Number(
                            item.order || 0
                        ),

                    grade:
                        Number(
                            item.grade || 1
                        )
                };
            })
            .sort(function (a, b) {
                return a.order - b.order;
            });

        var sample =
            getAchievement(
                catalog,
                'first_login'
            ) ||
            {
                title:
                    'Предпросмотр',

                image:
                    'Добро пожаловать.png'
            };

        [1, 2, 3].forEach(function (grade) {
            var items =
                rarities.filter(
                    function (item) {
                        return item.grade ===
                            grade;
                    }
                );

            if (!items.length) {
                return;
            }

            var section =
                document.createElement(
                    'section'
                );

            section.className =
                'lof-rarity-preview-grade';

            var heading =
                document.createElement(
                    'h3'
                );

            heading.textContent =
                (
                    grade === 1
                        ? 'I'
                        : (
                            grade === 2
                                ? 'II'
                                : 'III'
                        )
                ) +
                ' градация';

            section.appendChild(
                heading
            );

            var grid =
                document.createElement(
                    'div'
                );

            grid.className =
                'lof-rarity-preview-grid';

            items.forEach(function (rarity) {
                var card =
                    document.createElement(
                        'div'
                    );

                card.className =
                    'lof-rarity-preview-card';

                var badge =
                    document.createElement(
                        'div'
                    );

                badge.className =
                    'lof-profile-rail-badge';

                badge.setAttribute(
                    'data-rarity',
                    rarity.key
                );

                var wrap =
                    document.createElement(
                        'span'
                    );

                wrap.className =
                    'lof-profile-rail-badge-image-wrap';

                var image =
                    document.createElement(
                        'img'
                    );

                image.className =
                    'lof-profile-rail-badge-image';

                image.alt =
                    '';

                wrap.appendChild(
                    image
                );

                badge.appendChild(
                    wrap
                );

                var info =
                    document.createElement(
                        'div'
                    );

                info.className =
                    'lof-rarity-preview-info';

                info.innerHTML =
                    '<strong class="lof-rarity-' +
                        escapeHtml(
                            rarity.key
                        ) +
                    '">' +
                        escapeHtml(
                            rarity.title
                        ) +
                    '</strong>' +
                    '<span>' +
                        String(
                            earnedRarityCounts[
                                rarity.key
                            ] || 0
                        ) +
                        ' из ' +
                        String(
                            rarityAchievementCounts[
                                rarity.key
                            ] || 0
                        ) +
                        ' получено' +
                    '</span>';

                card.appendChild(
                    badge
                );

                card.appendChild(
                    info
                );

                grid.appendChild(
                    card
                );

                resolveAchievementImage(
                    catalog,
                    sample
                ).then(function (result) {
                    applyResolvedImageToElement(
                        image,
                        result,
                        function () {
                            image.style.visibility =
                                'hidden';
                        }
                    );
                }).catch(function () {
                    image.style.visibility =
                        'hidden';
                });
            });

            section.appendChild(
                grid
            );

            pane.appendChild(
                section
            );
        });

        return pane;
    }


    function openRarityPreview() {
        var overlay =
            document.getElementById(
                'lof-profile-achievements-overlay'
            );

        function activateTab() {
            var button =
                document.querySelector(
                    '#lof-profile-achievements-overlay ' +
                    '.lof-profile-achievements-filter[data-filter="rarities"]'
                );

            if (button) {
                button.click();
                return true;
            }

            return false;
        }

        if (
            overlay &&
            activateTab()
        ) {
            return Promise.resolve(
                overlay
            );
        }

        var allButton =
            document.querySelector(
                '#lof-profile-achievements-rail ' +
                '.lof-profile-rail-all-button'
            );

        if (!allButton) {
            return Promise.resolve(
                null
            );
        }

        allButton.click();

        return new Promise(function (resolve) {
            window.setTimeout(
                function () {
                    activateTab();

                    resolve(
                        document.getElementById(
                            'lof-profile-achievements-overlay'
                        )
                    );
                },
                0
            );
        });
    }


    /* ========================================================
     * АДМИНСКАЯ КОМПАКТИЗАЦИЯ PROGRESS-СЕГМЕНТОВ
     * ======================================================== */

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

            return api.postWithToken(
                'csrf',
                params
            ).then(function () {
                delete progressSegmentCache[
                    title
                ];

                leaderboardRowsCache = null;
                leaderboardRowsCacheAt = 0;

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


    /* ========================================================
     * ЗАПУСК
     * ======================================================== */

    Promise.all([
        getUserInfo(),
        readCatalog(false)
    ]).then(function (results) {
        var userInfo = results[0];
        var catalog = results[1];
        var canAdmin = userCanAdmin(userInfo);

        installGivenLikeTracker(userInfo);

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
            profileAchievementsPlacement: 'main profile content; native Fandom right rail intact; static styling moved to Common.css; full list includes earned and unearned standalone targets; staged series collapse to one current card',
            profileAchievementsPageSize: PROFILE_RAIL_PAGE_SIZE,
            nativeFandomAchievementsVisuallyHiddenOnProfile: false,
            progressRecordVersion: PROGRESS_RECORD_VERSION,
            starozhilSource: 'first confirmed local wiki activity; never global Fandom registration',
            hallRankAchievementsExclusive: true,
            firstLoginAchievement: FIRST_LOGIN_ID,
            firstLoginMode: 'local-account-registration',
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
            staticStylesLocation: 'MediaWiki:Common.css',
            unearnedProfileMode: 'unearned standalone achievements only; I-C and staged-series future tiers excluded; hidden/secret condition unlocked globally for viewers who already earned it',
            achievementPrevalence: 'percentage among participants counted by Hall of Fame',
            secretAchievementId: 'znaet_sudbu_kevar',
            articleReadMinSeconds: ARTICLE_READ_MIN_SECONDS,
            progressPagePrefix: PROGRESS_PAGE_PREFIX,
            progressSegmentCount: PROGRESS_SEGMENT_COUNT,
            progress: function () {
                if (!currentProgressReady) {
                    return Promise.resolve(null);
                }

                return currentProgressReady
                    .then(function () {
                        return {
                            official:
                                currentOfficialProgress
                                    ? cloneData(
                                        currentOfficialProgress
                                    )
                                    : null,

                            localQueue:
                                currentProgressState
                                    ? cloneData(
                                        currentProgressState
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
                            var result = {
                                username: user.name,
                                userId: user.userid,
                                registration:
                                    user.registration,
                                earnedAt:
                                    user.registrationUnix || null,
                                automatic: true
                            };

                            console.log(
                                '[Lofarian Achievements] first_login:',
                                result
                            );

                            return result;
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
                            return getEditorStatsForUser(user, true);
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
                    catalogCache = null;
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

                protectCatalog: function () {
                    return protectTechnicalPage(
                        CATALOG_PAGE
                    );
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

        var trackerReady = initReadingTracker(catalog);

        trackerReady.then(function () {
            return checkForNewAchievements(catalog);
        }).catch(function (error) {
            console.warn(
                '[Lofarian Achievements] ' +
                'Ошибка проверки новых достижений:',
                error
            );
        });

        trackerReady.then(function () {
            return renderProfileAchievements(catalog);
        }).catch(function (error) {
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

}).catch(function (error) {
    console.error(
        '[Lofarian Achievements] ' +
        'Ошибка загрузки MediaWiki:',
        error
    );
});



(function () {

    /* =========================================================
       ПЕРЕИМЕНОВАНИЕ СИСТЕМНЫХ РОЛЕЙ
       ========================================================= */

    const SYSTEM_ROLE_NAMES = {
        'Бюрократ': 'Основатель',
        'Bureaucrat': 'Основатель',

        'Администратор': 'Хранитель',
        'Administrator': 'Хранитель'
    };


    /* =========================================================
       КАСТОМНЫЕ РОЛИ
       ========================================================= */

    const ROLE_STYLES = {

        developer: {
            title: 'Разработчик',
            background: '#44576b',
            color: '#ffffff'
        },

        chronicler: {
            title: 'Хронист',
            background: '#755d46',
            color: '#ffffff'
        },

        cartographer: {
            title: 'Картограф',
            background: '#496b5b',
            color: '#ffffff'
        }

    };


    /* =========================================================
       РОЛИ ПОЛЬЗОВАТЕЛЕЙ
       ========================================================= */

    const USER_ROLES = {

        'Phaynipe': [
            'developer',
            'chronicler'
        ]

    };


    /* =========================================================
       ПЕРЕИМЕНОВЫВАЕМ СИСТЕМНЫЕ ПЛАШКИ
       ========================================================= */

    function renameSystemRoles() {

        document.querySelectorAll('span, a, div').forEach(function (el) {

            if (el.children.length) {
                return;
            }

            const text = el.textContent.trim();

            if (SYSTEM_ROLE_NAMES[text]) {
                el.textContent = SYSTEM_ROLE_NAMES[text];
            }

        });

    }


    /* =========================================================
       ИМЯ ПОЛЬЗОВАТЕЛЯ
       ========================================================= */

    function getProfileUser() {

        if (typeof mw === 'undefined') {
            return null;
        }

        return mw.config.get('wgRelevantUserName') || null;

    }


    /* =========================================================
       ИЩЕМ ПЛАШКУ ХРАНИТЕЛЯ
       ========================================================= */

    function findGuardianBadge() {

        const elements = document.querySelectorAll('span, a, div');

        for (const el of elements) {

            if (el.children.length) {
                continue;
            }

            const text = el.textContent.trim();

            if (
                text === 'Хранитель' ||
                text === 'Администратор' ||
                text === 'Administrator'
            ) {
                return el;
            }

        }

        return null;

    }


    /* =========================================================
       ДОБАВЛЯЕМ РОЛИ
       ========================================================= */

    function addCustomRoles() {

        const username = getProfileUser();

        if (!username) {
            return;
        }

        const roles = USER_ROLES[username];

        if (!roles || !roles.length) {
            return;
        }

        /* Чтобы не добавлялось повторно */
        if (document.querySelector('.lofarian-role')) {
            return;
        }


        const guardianBadge = findGuardianBadge();

        if (!guardianBadge) {
            return;
        }


        /*
         * Не создаём отдельную строку.
         * Вставляем непосредственно после Хранителя.
         */

        let lastBadge = guardianBadge;


        roles.forEach(function (roleId) {

            const role = ROLE_STYLES[roleId];

            if (!role) {
                return;
            }


            /*
             * Клонируем системную плашку Fandom.
             * Благодаря этому размер, шрифт и форма
             * будут абсолютно такими же.
             */

            const badge = guardianBadge.cloneNode(true);

            badge.textContent = role.title;

            badge.classList.add('lofarian-role');

            badge.dataset.lofarianRole = roleId;

            badge.style.backgroundColor = role.background;
            badge.style.color = role.color;


            lastBadge.insertAdjacentElement(
                'afterend',
                badge
            );

            lastBadge = badge;

        });

    }


    /* =========================================================
       ОБНОВЛЕНИЕ
       ========================================================= */

    function updateRoles() {

        renameSystemRoles();
        addCustomRoles();

    }


    updateRoles();


    let timer = null;

    const observer = new MutationObserver(function () {

        clearTimeout(timer);

        timer = setTimeout(function () {
            updateRoles();
        }, 100);

    });


    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();