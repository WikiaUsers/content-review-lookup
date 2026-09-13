/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC10 PARTICIPATION CUTOFF REVIEW READY
Страница Fandom: MediaWiki:LofarianAchievements/Engine/Families.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Работа с многоступенчатыми сериями, thresholds, римскими уровнями, редкостями и объединённым каталогом.

ДАННЫЕ / I/O
Читает данные уже загруженного локального каталога.

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
    if (!I) { throw new Error('[Lofarian Achievements] Runtime отсутствует: Engine/Families'); }
    var C = I.config || {};
    var STATE = I.state || {};
    var api = I.api;
    var STAGED_ACHIEVEMENT_SERIES = C.STAGED_ACHIEVEMENT_SERIES;
    var STAGED_ACHIEVEMENT_ID_INFO = C.STAGED_ACHIEVEMENT_ID_INFO;
    function cloneData() { return I.invoke('cloneData', arguments); }
    function isPlainObject() { return I.invoke('isPlainObject', arguments); }

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


    I.registerFunctions('Engine/Families', {
        romanAchievementLevel: romanAchievementLevel,
        getAchievementBaseTitle: getAchievementBaseTitle,
        getAchievementTierLabel: getAchievementTierLabel,
        getAchievementCategoryTitle: getAchievementCategoryTitle,
        formatCatalogInteger: formatCatalogInteger,
        durationWord: durationWord,
        formatCatalogDuration: formatCatalogDuration,
        formatCatalogDays: formatCatalogDays,
        formatFamilyThreshold: formatFamilyThreshold,
        getRarityKeyForLevel: getRarityKeyForLevel,
        getRarityInfo: getRarityInfo,
        getAchievement: getAchievement,
        forEachCatalogAchievement: forEachCatalogAchievement,
        getStagedAchievementSeriesState: getStagedAchievementSeriesState,
        collapseStagedAchievementSeries: collapseStagedAchievementSeries,
        getTierLevel: getTierLevel,
        tierAchievementId: tierAchievementId,
        getFamilyMetricValue: getFamilyMetricValue
    }, ["cloneData", "isPlainObject"]);
})(window);