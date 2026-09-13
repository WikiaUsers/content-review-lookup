/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC10 PARTICIPATION CUTOFF REVIEW READY
Страница Fandom: MediaWiki:LofarianAchievements/UI/Catalog.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Интерфейс общего каталога, групп редкости и просмотра полученных/неполученных достижений.

ДАННЫЕ / I/O
Работает с уже загруженным каталогом и состоянием пользователя.

ПРОЗРАЧНОСТЬ И БЕЗОПАСНОСТЬ
- Это открытый, человекочитаемый локальный JavaScript этой вики.
- eval, new Function, обфускация и скрытый/удалённый исполняемый код не используются.
- Исполняемые зависимости находятся только на локальных MediaWiki:*.js страницах.
- Сторонние трекеры и передача пользовательских данных внешним сервисам отсутствуют.
- Код не получает пароль, email или содержимое авторизационных cookie пользователя.
- Официальные награды не доверяются localStorage; localStorage используется только как технический клиентский кэш/очередь.
- Реклама Fandom не скрывается и не модифицируется.

ИНТЕРФЕЙС И ПРАВА
Рисует только интерфейс каталога Lofarian Achievements. Не меняет глобальную навигацию, рекламу, системные роли или права.

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
    if (!I) { throw new Error('[Lofarian Achievements] Runtime отсутствует: UI/Catalog'); }
    var C = I.config || {};
    var STATE = I.state || {};
    var api = I.api;
    var ACHIEVEMENT_COUNT_MILESTONE_IDS = C.ACHIEVEMENT_COUNT_MILESTONE_IDS;
    var ACHIEVEMENTS_PAGE = 'Летопись Лофариана Вики:Достижения';

    /*
     * RC11.9.6: те же пояснения редкостей, которые уже используются
     * на публичной странице «Достижения». В профиле они открываются
     * по клику на карточку редкости, чтобы не дублировать короткие
     * подписи без контекста.
     */
    var RARITY_DESCRIPTIONS = {
        common: [
            'Обычная — первая и самая доступная ступень редкости. Такие достижения знакомят с системой и отмечают действия, которые естественно происходят во время чтения, первых правок и знакомства с вики.',
            'Они не считаются «маловажными»: именно из обычных наград начинается коллекция. Их задача — показать принцип системы без необходимости специально охотиться за сложными условиями.'
        ],
        unusual: [
            'Необычная редкость появляется там, где одного случайного действия уже мало. Обычно требуется небольшой накопленный прогресс, повторение действия или чуть более конкретный маршрут по вики.',
            'Это всё ещё ранняя часть коллекции, но такие награды уже показывают, что участник не просто заглянул один раз, а начал оставлять собственную историю.'
        ],
        notable: [
            'Примечательная редкость отмечает заметные рубежи. Условия становятся ощутимее: нужно больше прочитанного, больше вклада или последовательность действий, которая уже выделяется на фоне самого начала.',
            'Такие награды хорошо показывают переход от знакомства с системой к настоящему прогрессу.'
        ],
        special: [
            'Особая редкость предназначена для условий, которые хуже укладываются в обычный счётчик. Это может быть определённый тип активности, необычное сочетание действий или отдельный эпизод пути.',
            'Поэтому две особые награды могут сильно отличаться друг от друга: редкость говорит не только о сложности, но и о необычности самого условия.'
        ],
        rare: [
            'Редкая награда уже требует серьёзного рубежа или события, которое происходит далеко не у каждого участника. Здесь случайного знакомства с системой обычно недостаточно.',
            'Такие достижения становятся заметной частью коллекции: они показывают либо продолжительный прогресс, либо достаточно редкий сценарий поведения на вики.'
        ],
        outstanding: [
            'Выдающаяся редкость открывается на высоких этапах прогресса. Это награды для тех случаев, когда вклад, чтение или активность уже трудно назвать обычными.',
            'Именно с этой ступени коллекция начинает особенно хорошо отражать индивидуальный путь участника: одинаковые наборы наград встречаются всё реже.'
        ],
        superior: [
            'Превосходная редкость отмечает крупные и труднодостижимые рубежи. Обычно за ней стоит значительный объём работы, долгий путь по серии или редкое сочетание уже полученных наград.',
            'Получение такой награды — не промежуточная мелочь, а отдельный этап, который заметен даже в большой коллекции.'
        ],
        exceptional: [
            'Исключительная редкость предназначена для действительно необычных результатов. Условия здесь либо очень высоки, либо требуют сценария, который сложно выполнить случайно.',
            'Такие достижения отделяют просто активную коллекцию от коллекции, в которой уже появились редкие личные истории.'
        ],
        unique: [
            'Уникальная редкость встречается у небольшой части участников. Она отмечает условия, для которых требуется серьёзная последовательность, редкое событие или глубокое продвижение по системе.',
            'Название редкости не означает, что награда существует в единственном экземпляре: оно подчёркивает, насколько необычным считается сам путь к ней.'
        ],
        exotic: [
            'Экзотические награды появляются на крайне необычных сочетаниях условий или очень высоких значениях прогресса. Они специально расположены почти у вершины шкалы.',
            'В большой коллекции такая печать сразу выделяется: чаще всего за ней стоит история, которую трудно повторить одним коротким заходом на вики.'
        ],
        relic: [
            'Реликтовая — первая редкость III градации. Это территория тяжёлых рубежей, где система уже отмечает исключительный объём пройденного пути.',
            'Реликтовые награды рассчитаны на долгую дистанцию. Их появление в коллекции показывает, что участник добрался до верхней части всей шкалы достижений.'
        ],
        legendary: [
            'Легендарная редкость стоит почти на вершине системы. Её получают за результаты, которые остаются заметными даже среди самых активных участников и самых заполненных коллекций.',
            'Такая награда должна ощущаться событием сама по себе: за ней обычно стоит завершённая длинная дорога, крупный рубеж или очень редкая комбинация достижений.'
        ],
        mythic: [
            'Мифическая — высшая редкость системы достижений. Она предназначена для самых трудных, самых редких или наиболее необычных условий, которые существуют в каталоге.',
            'Мифическая печать не обязана быть последней наградой пользователя, но каждая такая награда должна оставаться отдельным событием в коллекции. Именно поэтому её название и оформление выделены сильнее всех остальных редкостей.'
        ]
    };

    var RARITY_GRADE_DESCRIPTIONS = {
        1: 'Первая градация объединяет пять начальных редкостей — от Обычной до Редкой. Это основа коллекции: от первых действий до уже заметных рубежей.',
        2: 'Вторая градация объединяет пять более высоких редкостей — от Выдающейся до Экзотической. Здесь условия становятся значительно реже и требовательнее.',
        3: 'Третья градация — вершина шкалы: Реликтовая, Легендарная и Мифическая. В неё входят самые тяжёлые, редкие и необычные награды системы.'
    };
    function applyResolvedImageToElement() { return I.invoke('applyResolvedImageToElement', arguments); }
    function escapeHtml() { return I.invoke('escapeHtml', arguments); }
    function getAchievement() { return I.invoke('getAchievement', arguments); }
    function getRarityInfo() { return I.invoke('getRarityInfo', arguments); }
    function getRarityKeyForLevel() { return I.invoke('getRarityKeyForLevel', arguments); }
    function isPlainObject() { return I.invoke('isPlainObject', arguments); }
    function resolveAchievementImage() { return I.invoke('resolveAchievementImage', arguments); }
    function setRarityLabel() { return I.invoke('setRarityLabel', arguments); }

    /*
     * RC11.9.12: единый перечень небольших логических серий, которые
     * физически хранятся как отдельные achievement ID, но во всех
     * пользовательских счётчиках считаются одной серией.
     *
     * Это тот же принцип, который уже использует страница «Достижения»:
     * I/II/III/… — ступени одной награды, а не самостоятельные записи.
     */
    var LOGICAL_VIRTUAL_SERIES = [
        {
            id: 'achievement_collector',
            ids: [
                'achievement_collector_5',
                'achievement_collector_10',
                'achievement_collector_25',
                'achievement_collector_50',
                'achievement_collector_75',
                'achievement_collector_100'
            ]
        },
        {
            id: 'meta_award_archive',
            ids: [
                'meta_award_archive_10',
                'meta_award_archive_25',
                'meta_award_archive_50'
            ]
        },
        {
            id: 'meta_harvest_day',
            ids: [
                'meta_harvest_day_3',
                'meta_harvest_day_5',
                'meta_harvest_day_10'
            ]
        },
        {
            id: 'meta_trophy_shelf',
            ids: [
                'meta_trophy_shelf_5',
                'meta_trophy_shelf_10',
                'meta_trophy_shelf_20'
            ]
        },
        {
            id: 'comm_approval',
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

    function buildLogicalVirtualSeriesMemberMap() {
        var map = {};

        LOGICAL_VIRTUAL_SERIES.forEach(function (series) {
            (series.ids || []).forEach(function (achievementId) {
                map[String(achievementId)] = String(series.id);
            });
        });

        return map;
    }

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
        var earnedVirtualSeries = {};
        var virtualMemberMap =
            buildLogicalVirtualSeriesMemberMap();

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

            if (virtualMemberMap[achievementId]) {
                earnedVirtualSeries[
                    virtualMemberMap[achievementId]
                ] = true;
                return;
            }

            directCount++;
        });

        return (
            directCount +
            Object.keys(
                earnedFamilies
            ).length +
            Object.keys(
                earnedVirtualSeries
            ).length
        );
    }


    /*
     * RC11.9.23: параллельный счётчик «рубежей пути».
     * Основная коллекция по-прежнему считает развивающуюся награду один раз
     * (110 логических достижений/серий), но здесь каждую пройденную ступень
     * считаем отдельно. Для текущего каталога это 97 явных achievement ID
     * + 29 family-цепочек по 100 ступеней = 2997 возможных рубежей.
     *
     * Небольшие staged-серии физически лежат в achievements, поэтому их
     * достигнутый максимум разворачивается обратно в количество реально
     * пройденных стадий: если текущая стадия IV, считаются I–IV.
     */
    function getAchievementStepStats(
        catalog,
        achievementMap
    ) {
        catalog = catalog || {};
        achievementMap = isPlainObject(achievementMap)
            ? achievementMap
            : {};

        var directCatalog = catalog.achievements || {};
        var familyCatalog = catalog.families || {};
        var stagedSeries = Array.isArray(C.STAGED_ACHIEVEMENT_SERIES)
            ? C.STAGED_ACHIEVEMENT_SERIES
            : LOGICAL_VIRTUAL_SERIES;

        var totalDirect = Object.keys(directCatalog).length;
        var totalFamilySteps = 0;

        Object.keys(familyCatalog).forEach(function (familyId) {
            var family = familyCatalog[familyId] || {};
            if (Array.isArray(family.thresholds)) {
                totalFamilySteps += family.thresholds.length;
            }
        });

        var stagedMemberMap = {};
        stagedSeries.forEach(function (series) {
            (series.ids || []).forEach(function (achievementId, index) {
                stagedMemberMap[String(achievementId)] = {
                    series: series,
                    index: index
                };
            });
        });

        var earnedDirect = 0;
        Object.keys(achievementMap).forEach(function (achievementId) {
            if (stagedMemberMap[achievementId]) {
                return;
            }

            if (
                Object.prototype.hasOwnProperty.call(
                    directCatalog,
                    achievementId
                )
            ) {
                earnedDirect++;
            }
        });

        var earnedStagedSteps = 0;
        stagedSeries.forEach(function (series) {
            var highestIndex = -1;

            (series.ids || []).forEach(function (achievementId, index) {
                if (
                    Object.prototype.hasOwnProperty.call(
                        achievementMap,
                        achievementId
                    )
                ) {
                    highestIndex = Math.max(highestIndex, index);
                }
            });

            if (highestIndex >= 0) {
                earnedStagedSteps += highestIndex + 1;
            }
        });

        var familyMaxTier = {};

        Object.keys(achievementMap).forEach(function (achievementId) {
            var achievement = getAchievement(catalog, achievementId);

            if (!achievement || !achievement.family) {
                return;
            }

            var familyId = String(achievement.family);
            var tier = Math.max(
                1,
                Math.floor(Number(achievement.tier) || 1)
            );

            familyMaxTier[familyId] = Math.max(
                Number(familyMaxTier[familyId] || 0),
                tier
            );
        });

        var earnedFamilySteps = 0;

        Object.keys(familyMaxTier).forEach(function (familyId) {
            var family = familyCatalog[familyId] || {};
            var totalTiers = Array.isArray(family.thresholds)
                ? family.thresholds.length
                : 0;

            if (!totalTiers) {
                return;
            }

            earnedFamilySteps += Math.min(
                totalTiers,
                Math.max(0, Math.floor(Number(familyMaxTier[familyId]) || 0))
            );
        });

        var total = totalDirect + totalFamilySteps;
        var earned = Math.min(
            total,
            earnedDirect + earnedStagedSteps + earnedFamilySteps
        );

        return {
            total: total,
            earned: earned,
            percent: total > 0
                ? Math.max(0, Math.min(100, earned / total * 100))
                : 0,
            directTotal: totalDirect,
            familyStepsTotal: totalFamilySteps,
            directEarned: earnedDirect + earnedStagedSteps,
            familyStepsEarned: earnedFamilySteps
        };
    }


    function getLogicalRarityAchievementCounts(
        catalog
    ) {
        var rarityCounts = {};
        var totalAchievementCount = 0;
        var virtualMemberMap =
            buildLogicalVirtualSeriesMemberMap();

        /*
         * Одиночные достижения считаются по одному. Члены небольших
         * виртуальных серий здесь пропускаются и добавляются ниже одной
         * логической записью на серию.
         */
        Object.keys(
            catalog.achievements || {}
        ).forEach(function (achievementId) {
            if (virtualMemberMap[achievementId]) {
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

        /*
         * Каждая виртуальная серия — одна логическая награда в общем
         * количестве. В раскладке по редкостям серия представлена по одному
         * разу в каждой редкости, через которую проходят её ступени.
         */
        LOGICAL_VIRTUAL_SERIES.forEach(function (series) {
            var seriesRarities = {};
            var hasAnyTier = false;

            (series.ids || []).forEach(function (achievementId) {
                var achievement =
                    getAchievement(
                        catalog,
                        achievementId
                    );

                if (!achievement) {
                    return;
                }

                hasAnyTier = true;

                var rarity =
                    getRarityInfo(
                        catalog,
                        achievement
                    );

                if (rarity && rarity.key) {
                    seriesRarities[String(rarity.key)] = true;
                }
            });

            if (!hasAnyTier) {
                return;
            }

            totalAchievementCount++;

            Object.keys(seriesRarities).forEach(function (rarityKey) {
                rarityCounts[rarityKey] =
                    (rarityCounts[rarityKey] || 0) + 1;
            });
        });

        /*
         * Уровневая цепочка I–C является одним достижением.
         * Внутри конкретной редкости хоть одна, хоть двадцать пять
         * её ступеней дают ровно +1 к количеству этой редкости.
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
        var virtualMemberMap =
            buildLogicalVirtualSeriesMemberMap();

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
                virtualMemberMap[achievementId]
                    ? 'virtual:' + virtualMemberMap[achievementId]
                    : 'achievement:' + achievementId
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


    function rarityGradeRoman(grade) {
        return Number(grade) === 1
            ? 'I'
            : (Number(grade) === 2 ? 'II' : 'III');
    }

    function removeRarityInfoOverlay() {
        var existing = document.getElementById('lof-rarity-info-overlay');
        if (!existing) { return; }

        if (existing._lofKeydownHandler) {
            window.removeEventListener('keydown', existing._lofKeydownHandler);
        }

        if (existing.parentNode) {
            existing.parentNode.removeChild(existing);
        }

        document.body.classList.remove('lof-rarity-info-open');
    }

    function openRarityInfoDialog(
        catalog,
        rarity,
        sample,
        earnedCount,
        totalCount
    ) {
        removeRarityInfoOverlay();

        var overlay = document.createElement('div');
        overlay.id = 'lof-rarity-info-overlay';
        overlay.className = 'lof-rarity-info-overlay';

        var dialog = document.createElement('section');
        dialog.className = 'lof-rarity-info-dialog';
        dialog.setAttribute('role', 'dialog');
        dialog.setAttribute('aria-modal', 'true');
        dialog.setAttribute('data-rarity', rarity.key);

        var head = document.createElement('div');
        head.className = 'lof-rarity-info-head';

        var headCopy = document.createElement('div');
        headCopy.innerHTML =
            '<div class="lof-rarity-info-kicker">РЕДКОСТЬ ДОСТИЖЕНИЯ</div>' +
            '<h3 class="lof-rarity-info-title lof-rarity-' + escapeHtml(rarity.key) + '"></h3>' +
            '<div class="lof-rarity-info-meta">' +
                escapeHtml(rarityGradeRoman(rarity.grade) + ' градация · ' + String(rarity.order) + '-я редкость из ' + String(Object.keys(catalog.rarities || {}).length)) +
            '</div>';

        var rarityTitleNode = headCopy.querySelector('.lof-rarity-info-title');
        if (rarityTitleNode) {
            setRarityLabel(rarityTitleNode, rarity.title, rarity.key);
        }

        var close = document.createElement('button');
        close.type = 'button';
        close.className = 'lof-rarity-info-close';
        close.textContent = 'Закрыть';
        close.setAttribute('aria-label', 'Закрыть информацию о редкости');
        close.addEventListener('click', removeRarityInfoOverlay);

        head.appendChild(headCopy);
        head.appendChild(close);

        var body = document.createElement('div');
        body.className = 'lof-rarity-info-body';

        var visual = document.createElement('div');
        visual.className = 'lof-rarity-info-visual';

        var badge = document.createElement('div');
        badge.className = 'lof-profile-rail-badge lof-rarity-info-badge';
        badge.setAttribute('data-rarity', rarity.key);

        var imageWrap = document.createElement('span');
        imageWrap.className = 'lof-profile-rail-badge-image-wrap';
        imageWrap.setAttribute('data-rarity', rarity.key);

        var image = document.createElement('img');
        image.className = 'lof-profile-rail-badge-image';
        image.alt = '';
        imageWrap.appendChild(image);
        badge.appendChild(imageWrap);
        visual.appendChild(badge);

        var counts = document.createElement('div');
        counts.className = 'lof-rarity-info-counts';
        counts.innerHTML =
            '<strong>' + escapeHtml(String(earnedCount || 0)) + ' из ' + escapeHtml(String(totalCount || 0)) + '</strong>' +
            '<span>получено в этой коллекции</span>';
        visual.appendChild(counts);

        var copy = document.createElement('div');
        copy.className = 'lof-rarity-info-copy';

        (RARITY_DESCRIPTIONS[rarity.key] || ['Отдельная ступень редкости в системе достижений.']).forEach(function (text) {
            var paragraph = document.createElement('p');
            paragraph.textContent = text;
            copy.appendChild(paragraph);
        });

        var source = document.createElement('div');
        source.className = 'lof-rarity-info-source';
        source.innerHTML =
            '<span>То же описание используется в разделе «Редкости» на странице достижений.</span>' +
            '<a href="' + escapeHtml(mw.util.getUrl(ACHIEVEMENTS_PAGE)) + '">Подробнее о системе →</a>';
        copy.appendChild(source);

        body.appendChild(visual);
        body.appendChild(copy);
        dialog.appendChild(head);
        dialog.appendChild(body);
        overlay.appendChild(dialog);

        overlay.addEventListener('mousedown', function (event) {
            if (event.target === overlay) {
                removeRarityInfoOverlay();
            }
        });

        overlay._lofKeydownHandler = function (event) {
            if (event.key === 'Escape') {
                removeRarityInfoOverlay();
            }
        };
        window.addEventListener('keydown', overlay._lofKeydownHandler);

        document.body.appendChild(overlay);
        document.body.classList.add('lof-rarity-info-open');

        resolveAchievementImage(catalog, sample).then(function (result) {
            applyResolvedImageToElement(image, result, function () {
                image.style.visibility = 'hidden';
            });
        }).catch(function () {
            image.style.visibility = 'hidden';
        });

        window.setTimeout(function () {
            close.focus();
        }, 0);
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

        /*
         * RC11.9.8: предпросмотр редкостей использует одну нейтральную
         * универсальную иконку, а не изображение конкретного достижения.
         * Так рамка показывает именно редкость и не создаёт впечатление,
         * будто карточка относится к «Добро пожаловать».
         */
        var sample = {
            title:
                'Редкость',

            image:
                String(
                    catalog.defaultImage ||
                    'Достижение универсальное.png'
                )
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

            var gradeDescription =
                document.createElement(
                    'p'
                );

            gradeDescription.className =
                'lof-rarity-preview-grade-description';

            gradeDescription.textContent =
                RARITY_GRADE_DESCRIPTIONS[grade] ||
                'Отдельная группа редкостей системы достижений.';

            section.appendChild(
                gradeDescription
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
                        'button'
                    );

                card.type =
                    'button';

                card.className =
                    'lof-rarity-preview-card';

                card.setAttribute(
                    'aria-label',
                    'Подробнее о редкости «' +
                        rarity.title +
                    '»'
                );

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

                var rarityNameNode = info.querySelector('strong');
                if (rarityNameNode) {
                    setRarityLabel(rarityNameNode, rarity.title, rarity.key);
                }

                card.appendChild(
                    badge
                );

                card.appendChild(
                    info
                );

                card.addEventListener(
                    'click',
                    function () {
                        openRarityInfoDialog(
                            catalog,
                            rarity,
                            sample,
                            earnedRarityCounts[rarity.key] || 0,
                            rarityAchievementCounts[rarity.key] || 0
                        );
                    }
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


    I.registerFunctions('UI/Catalog', {
        countLogicalEarnedAchievements: countLogicalEarnedAchievements,
        getAchievementStepStats: getAchievementStepStats,
        getLogicalRarityAchievementCounts: getLogicalRarityAchievementCounts,
        getLogicalEarnedRarityCounts: getLogicalEarnedRarityCounts,
        buildRarityPreviewPane: buildRarityPreviewPane,
        openRarityPreview: openRarityPreview
    }, ["applyResolvedImageToElement", "escapeHtml", "getAchievement", "getRarityInfo", "getRarityKeyForLevel", "isPlainObject", "resolveAchievementImage", "setRarityLabel"]);
})(window);