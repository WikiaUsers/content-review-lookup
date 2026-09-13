/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC10 PARTICIPATION CUTOFF REVIEW READY
Страница Fandom: MediaWiki:LofarianAchievements/Achievements/Special.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Логика специальных и мета-достижений: количество достижений, комбинации и производные состояния.

ДАННЫЕ / I/O
Работает с уже подтверждённой картой наград и локальным каталогом.

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
    if (!I) { throw new Error('[Lofarian Achievements] Runtime отсутствует: Achievements/Special'); }
    var C = I.config || {};
    var STATE = I.state || {};
    var api = I.api;
    var CHRONIST_PREFIX = C.CHRONIST_PREFIX;
    var THOUGHTFUL_PREFIX = C.THOUGHTFUL_PREFIX;
    var STAROZHIL_PREFIX = C.STAROZHIL_PREFIX;
    var HALL_TOP_500_ID = C.HALL_TOP_500_ID;
    var HALL_TOP_100_ID = C.HALL_TOP_100_ID;
    var HALL_TOP_10_ID = C.HALL_TOP_10_ID;
    var ACHIEVEMENT_COUNT_MILESTONES = C.ACHIEVEMENT_COUNT_MILESTONES;
    var ACHIEVEMENT_COUNT_MILESTONE_IDS = C.ACHIEVEMENT_COUNT_MILESTONE_IDS;
    var META_PROGRESS_ID_INFO = C.META_PROGRESS_ID_INFO;
    var COMM_GIVEN_LIKE_PREFIX = C.COMM_GIVEN_LIKE_PREFIX;
    var COMM_GIVEN_LIKE_THRESHOLDS = C.COMM_GIVEN_LIKE_THRESHOLDS;
    var META_ACHIEVEMENT_RULES = C.META_ACHIEVEMENT_RULES;
    var META_ACHIEVEMENT_IDS = C.META_ACHIEVEMENT_IDS;
    var META_RULE_BY_ID = C.META_RULE_BY_ID;
    var THEME_KEYS = C.THEME_KEYS;
    var THEME_ARTICLE_PREFIXES = C.THEME_ARTICLE_PREFIXES;
    var THEME_TIME_PREFIXES = C.THEME_TIME_PREFIXES;
    var STAROZHIL_THRESHOLDS_DAYS = C.STAROZHIL_THRESHOLDS_DAYS;
    function addAutomaticFirstLogin() { return I.invoke('addAutomaticFirstLogin', arguments); }
    function addDerivedHiddenAchievements() { return I.invoke('addDerivedHiddenAchievements', arguments); }
    function calculateScore() { return I.invoke('calculateScore', arguments); }
    function collapseStagedAchievementSeries() { return I.invoke('collapseStagedAchievementSeries', arguments); }
    function formatCatalogInteger() { return I.invoke('formatCatalogInteger', arguments); }
    function getAchievement() { return I.invoke('getAchievement', arguments); }
    function getAchievementVisualCategory() { return I.invoke('getAchievementVisualCategory', arguments); }
    function getFamilyMetricValue() { return I.invoke('getFamilyMetricValue', arguments); }
    function getLocalWikiPresenceStartUnix() { return I.invoke('getLocalWikiPresenceStartUnix', arguments); }
    function getRarityInfo() { return I.invoke('getRarityInfo', arguments); }
    function getRarityKeyForLevel() { return I.invoke('getRarityKeyForLevel', arguments); }
    function getTierLevel() { return I.invoke('getTierLevel', arguments); }
    function isPlainObject() { return I.invoke('isPlainObject', arguments); }
    function mergeAchievementMap() { return I.invoke('mergeAchievementMap', arguments); }
    function metaRuleCurrentValue() { return I.invoke('metaRuleCurrentValue', arguments); }
    function nowUnix() { return I.invoke('nowUnix', arguments); }
    function romanAchievementLevel() { return I.invoke('romanAchievementLevel', arguments); }
    function sanitizePublicProgress() { return I.invoke('sanitizePublicProgress', arguments); }
    function tierAchievementId() { return I.invoke('tierAchievementId', arguments); }

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
                        STATE.catalogCache || {},
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


    function getParticipationStartedAt(protectedMap, progress, user) {
        var explicitStartedAt = (
            user &&
            Number(user.userid) === Number(mw.config.get('wgUserId')) &&
            I.participation
        ) ? Number(I.participation.startedAt || 0) : 0;
        return I.invoke('getParticipationStartedAt', [protectedMap, progress, explicitStartedAt]);
    }


    function buildEffectiveAchievementMap(
        catalog,
        user,
        protectedMap,
        progress,
        editorMap,
        editorStats
    ) {
        progress =
            sanitizePublicProgress(
                progress,
                user.name
            );

        /*
         * RC9 OPT-IN:
         * История правок сама по себе больше не делает пользователя
         * участником. Нужна подтверждённая локальная запись участия:
         * progress.firstSeenAt либо существующая protected Users-награда.
         * Благодаря этому неучастники могут просматривать чужие профили,
         * но им не рассчитывается собственный набор наград задним числом.
         */
        var participantStartedAt =
            getParticipationStartedAt(
                protectedMap,
                progress,
                user
            );

        if (participantStartedAt <= 0) {
            return {};
        }

        var result =
            addAutomaticFirstLogin(
                catalog,
                user,
                protectedMap,
                participantStartedAt
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

        /* Публикуем уже рассчитанные значения один раз для декларативных
         * модулей. Текущие TEST 1.16.3 достижения от этого не меняются. */
        if (I.metricsRegistry) {
            I.metricsRegistry.publishReadingProgress(user.name, progress);
            I.metricsRegistry.publishEditorStats(user.name, editorStats || {});
        }
        if (I.achievementRegistry && I.metricsRegistry) {
            result = I.achievementRegistry.evaluate(
                catalog,
                I.metricsRegistry.snapshot(user.name),
                result,
                { user: user, progress: progress, editorStats: editorStats || {}, nowUnix: nowUnix() }
            );
        }

        return result;
    }



    /*
     * RC3: декларативное зеркало каталога удалено из runtime.
     * Единственный пользовательский источник названий/описаний/редкостей/
     * очков и семей — Project:LofarianAchievementsData и его части.
     * Этот модуль содержит только исполняемую логику TEST 1.16.3.
     */

    I.registerFunctions('Achievements/Special', {
        getAchievementCollectorState: getAchievementCollectorState,
        getAchievementCollectorProgressInfo: getAchievementCollectorProgressInfo,
        buildMetaAchievementFacts: buildMetaAchievementFacts,
        deriveMetaAchievementAwardAt: deriveMetaAchievementAwardAt,
        addMetaAchievements: addMetaAchievements,
        getMetaAchievementProgressInfo: getMetaAchievementProgressInfo,
        deriveAchievementCollectorAwardAt: deriveAchievementCollectorAwardAt,
        addAchievementCountMilestones: addAchievementCountMilestones,
        buildEffectiveAchievementMap: buildEffectiveAchievementMap
    }, ["addAutomaticFirstLogin", "addDerivedHiddenAchievements", "calculateScore", "collapseStagedAchievementSeries", "formatCatalogInteger", "getAchievement", "getAchievementVisualCategory", "getFamilyMetricValue", "getLocalWikiPresenceStartUnix", "getParticipationStartedAt", "getRarityInfo", "getRarityKeyForLevel", "getTierLevel", "isPlainObject", "mergeAchievementMap", "metaRuleCurrentValue", "nowUnix", "romanAchievementLevel", "sanitizePublicProgress", "tierAchievementId"]);
})(window);