/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC10 PARTICIPATION CUTOFF REVIEW READY
Страница Fandom: MediaWiki:LofarianAchievements/UI/Progress.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Подготавливает шкалы прогресса, следующую ступень и состояние неполученных достижений для UI профиля.

ДАННЫЕ / I/O
Использует уже рассчитанные метрики/каталог/карты наград.

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
    if (!I) { throw new Error('[Lofarian Achievements] Runtime отсутствует: UI/Progress'); }
    var C = I.config || {};
    var STATE = I.state || {};
    var api = I.api;
    var HALL_TOP_500_ID = C.HALL_TOP_500_ID;
    var HALL_TOP_100_ID = C.HALL_TOP_100_ID;
    var HALL_TOP_10_ID = C.HALL_TOP_10_ID;
    var ACHIEVEMENT_COUNT_MILESTONE_IDS = C.ACHIEVEMENT_COUNT_MILESTONE_IDS;
    var STAGED_ACHIEVEMENT_ID_INFO = C.STAGED_ACHIEVEMENT_ID_INFO;
    var DISCUSSION_RULE_BY_ID = C.DISCUSSION_RULE_BY_ID;
    var DIRECT_PROGRESS_RULE_BY_ID = C.DIRECT_PROGRESS_RULE_BY_ID;
    var META_ACHIEVEMENT_IDS = C.META_ACHIEVEMENT_IDS;
    var META_RULE_BY_ID = C.META_RULE_BY_ID;
    function createEmptyDiscussionStats() { return I.invoke('createEmptyDiscussionStats', arguments); }
    function createEmptyEditorStats() { return I.invoke('createEmptyEditorStats', arguments); }
    function formatFamilyThreshold() { return I.invoke('formatFamilyThreshold', arguments); }
    function getAchievement() { return I.invoke('getAchievement', arguments); }
    function getAchievementCollectorProgressInfo() { return I.invoke('getAchievementCollectorProgressInfo', arguments); }
    function getAchievementCollectorState() { return I.invoke('getAchievementCollectorState', arguments); }
    function getAchievementVisualCategory() { return I.invoke('getAchievementVisualCategory', arguments); }
    function getCurrentUserId() { return I.invoke('getCurrentUserId', arguments); }
    function getDiscussionRuleCurrentValue() { return I.invoke('getDiscussionRuleCurrentValue', arguments); }
    function getLocalWikiPresenceStartUnix() { return I.invoke('getLocalWikiPresenceStartUnix', arguments); }
    function getMetaAchievementProgressInfo() { return I.invoke('getMetaAchievementProgressInfo', arguments); }
    function getStagedAchievementSeriesState() { return I.invoke('getStagedAchievementSeriesState', arguments); }
    function isPlainObject() { return I.invoke('isPlainObject', arguments); }
    function metaRuleCurrentValue() { return I.invoke('metaRuleCurrentValue', arguments); }
    function nowUnix() { return I.invoke('nowUnix', arguments); }
    function romanAchievementLevel() { return I.invoke('romanAchievementLevel', arguments); }
    function sanitizePublicProgress() { return I.invoke('sanitizePublicProgress', arguments); }

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


    I.registerFunctions('UI/Progress', {
        buildProfileProgressContext: buildProfileProgressContext,
        buildThresholdProgressInfo: buildThresholdProgressInfo,
        getDirectAchievementProgressInfo: getDirectAchievementProgressInfo,
        getDiscussionAchievementProgressInfo: getDiscussionAchievementProgressInfo,
        getStagedAchievementProgressInfo: getStagedAchievementProgressInfo,
        getAchievementProgressInfo: getAchievementProgressInfo,
        getProfileViewedStorageKey: getProfileViewedStorageKey,
        loadProfileUnreadAchievementMap: loadProfileUnreadAchievementMap,
        markProfileAchievementViewed: markProfileAchievementViewed,
        collectProfileUnearnedTargets: collectProfileUnearnedTargets
    }, ["createEmptyDiscussionStats", "createEmptyEditorStats", "formatFamilyThreshold", "getAchievement", "getAchievementCollectorProgressInfo", "getAchievementCollectorState", "getAchievementVisualCategory", "getCurrentUserId", "getDiscussionRuleCurrentValue", "getLocalWikiPresenceStartUnix", "getMetaAchievementProgressInfo", "getStagedAchievementSeriesState", "isPlainObject", "metaRuleCurrentValue", "nowUnix", "romanAchievementLevel", "sanitizePublicProgress"]);
})(window);