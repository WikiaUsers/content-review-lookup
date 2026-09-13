/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC10 PARTICIPATION CUTOFF REVIEW READY
Страница Fandom: MediaWiki:LofarianAchievements/Metrics/Editing.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Анализирует локальные contributions/revisions/categories и исторический контекст для редакторских достижений.

ДАННЫЕ / I/O
Читает только MediaWiki API/Fandom wiki data через Services/MediaWiki и связанные локальные сервисы.

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
    if (!I) { throw new Error('[Lofarian Achievements] Runtime отсутствует: Metrics/Editing'); }
    var C = I.config || {};
    var STATE = I.state || {};
    var api = I.api;
    var LETOPISETS_PREFIX = C.LETOPISETS_PREFIX;
    var ZODCHIY_PREFIX = C.ZODCHIY_PREFIX;
    var MULTIGRAN_PREFIX = C.MULTIGRAN_PREFIX;
    var VERNY_LETOPISETS_PREFIX = C.VERNY_LETOPISETS_PREFIX;
    var FIRST_EDIT_ID = C.FIRST_EDIT_ID;
    var SOZIDATEL_ID = C.SOZIDATEL_ID;
    var NEUTOMIMOE_PERO_PREFIX = C.NEUTOMIMOE_PERO_PREFIX;
    var VOZVRASHCHENIE_PREFIX = C.VOZVRASHCHENIE_PREFIX;
    var CHERNILNY_POTOK_PREFIX = C.CHERNILNY_POTOK_PREFIX;
    var CHERNILNY_SLED_PREFIX = C.CHERNILNY_SLED_PREFIX;
    var RUKA_LETOPISTSA_PREFIX = C.RUKA_LETOPISTSA_PREFIX;
    var HUDOZHNIK_PREFIX = C.HUDOZHNIK_PREFIX;
    var NESLOMLENNAYA_TSEP_PREFIX = C.NESLOMLENNAYA_TSEP_PREFIX;
    var PROBUZHDAYUSHCHIY_PREFIX = C.PROBUZHDAYUSHCHIY_PREFIX;
    var ISPRAVITEL_PREFIX = C.ISPRAVITEL_PREFIX;
    var TKACH_KATEGORIY_PREFIX = C.TKACH_KATEGORIY_PREFIX;
    var TKACH_SHABLONOV_PREFIX = C.TKACH_SHABLONOV_PREFIX;
    var ARKHIVARIUS_PREFIX = C.ARKHIVARIUS_PREFIX;
    var NEUTOMIMYY_ZODCHIY_PREFIX = C.NEUTOMIMYY_ZODCHIY_PREFIX;
    var HRANITEL_DREVNOSTEY_PREFIX = C.HRANITEL_DREVNOSTEY_PREFIX;
    var NIGHT_HERO_ID = C.NIGHT_HERO_ID;
    var TYSYACHA_STROK_ID = C.TYSYACHA_STROK_ID;
    var ZAVERSHITEL_ID = C.ZAVERSHITEL_ID;
    var CORRECTOR_MIN_REMOVED_BYTES = C.CORRECTOR_MIN_REMOVED_BYTES;
    var DORMANT_MIN_SECONDS = C.DORMANT_MIN_SECONDS;
    var NIGHT_EDIT_MIN_COUNT = C.NIGHT_EDIT_MIN_COUNT;
    var THOUSAND_LINES_MIN_BYTES = C.THOUSAND_LINES_MIN_BYTES;
    var COMPLETER_BEFORE_MAX_BYTES = C.COMPLETER_BEFORE_MAX_BYTES;
    var COMPLETER_AFTER_MIN_BYTES = C.COMPLETER_AFTER_MIN_BYTES;
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
    var NESLOMLENNAYA_TSEP_THRESHOLDS = C.NESLOMLENNAYA_TSEP_THRESHOLDS;
    var PROBUZHDAYUSHCHIY_THRESHOLDS = C.PROBUZHDAYUSHCHIY_THRESHOLDS;
    var ISPRAVITEL_THRESHOLDS = C.ISPRAVITEL_THRESHOLDS;
    var TKACH_KATEGORIY_THRESHOLDS = C.TKACH_KATEGORIY_THRESHOLDS;
    var TKACH_SHABLONOV_THRESHOLDS = C.TKACH_SHABLONOV_THRESHOLDS;
    var ARKHIVARIUS_THRESHOLDS = C.ARKHIVARIUS_THRESHOLDS;
    var NEUTOMIMYY_ZODCHIY_THRESHOLDS = C.NEUTOMIMYY_ZODCHIY_THRESHOLDS;
    var HRANITEL_DREVNOSTEY_THRESHOLDS_DAYS = C.HRANITEL_DREVNOSTEY_THRESHOLDS_DAYS;
    var LETOPISETS_THRESHOLDS = C.LETOPISETS_THRESHOLDS;
    var ZODCHIY_THRESHOLDS = C.ZODCHIY_THRESHOLDS;
    var MULTIGRAN_THRESHOLDS = C.MULTIGRAN_THRESHOLDS;
    var VERNY_LETOPISETS_THRESHOLDS = C.VERNY_LETOPISETS_THRESHOLDS;
    var NEUTOMIMOE_PERO_THRESHOLDS = C.NEUTOMIMOE_PERO_THRESHOLDS;
    var VOZVRASHCHENIE_THRESHOLDS = C.VOZVRASHCHENIE_THRESHOLDS;
    var CHERNILNY_POTOK_THRESHOLDS = C.CHERNILNY_POTOK_THRESHOLDS;
    var CHERNILNY_SLED_THRESHOLDS = C.CHERNILNY_SLED_THRESHOLDS;
    var RUKA_LETOPISTSA_THRESHOLDS = C.RUKA_LETOPISTSA_THRESHOLDS;
    var MAJOR_EDIT_MIN_ABS_BYTES = C.MAJOR_EDIT_MIN_ABS_BYTES;
    var EDITOR_STATS_CACHE_MS = C.EDITOR_STATS_CACHE_MS;
    function analyzeCrossContributionHiddenAchievements() { return I.invoke('analyzeCrossContributionHiddenAchievements', arguments); }
    function analyzeUploadLogEvents() { return I.invoke('analyzeUploadLogEvents', arguments); }
    function cloneData() { return I.invoke('cloneData', arguments); }
    function createEmptyDiscussionStats() { return I.invoke('createEmptyDiscussionStats', arguments); }
    function fetchArticleContributions() { return I.invoke('fetchArticleContributions', arguments); }
    function fetchCreatedArticleContributions() { return I.invoke('fetchCreatedArticleContributions', arguments); }
    function fetchDiscussionStatsForUser() { return I.invoke('fetchDiscussionStatsForUser', arguments); }
    function fetchGlobalRecentChanges() { return I.invoke('fetchGlobalRecentChanges', arguments); }
    function fetchParentRevisionMetadata() { return I.invoke('fetchParentRevisionMetadata', arguments); }
    function fetchRoadCategoryStats() { return I.invoke('fetchRoadCategoryStats', arguments); }
    function fetchTechnicalContributions() { return I.invoke('fetchTechnicalContributions', arguments); }
    function fetchUploadLogEvents() { return I.invoke('fetchUploadLogEvents', arguments); }
    function getTierLevel() { return I.invoke('getTierLevel', arguments); }
    function isPlainObject() { return I.invoke('isPlainObject', arguments); }
    function mergeAchievementMap() { return I.invoke('mergeAchievementMap', arguments); }
    function normalizeProgressUsername() { return I.invoke('normalizeProgressUsername', arguments); }
    function tierAchievementId() { return I.invoke('tierAchievementId', arguments); }
    function timestampToUnix() { return I.invoke('timestampToUnix', arguments); }
    function utcDayFromTimestamp() { return I.invoke('utcDayFromTimestamp', arguments); }

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


    function getEditorStatsForUser(user, forceReload, startedAt, discussionBaselineTotal) {
        if (
            !user ||
            !user.userid ||
            !user.name
        ) {
            return Promise.resolve(
                createEmptyEditorStats('')
            );
        }

        startedAt = Math.floor(Number(startedAt) || 0);
        if (startedAt < 946684800) {
            startedAt = 0;
        }
        discussionBaselineTotal = Math.floor(Number(discussionBaselineTotal));
        if (!Number.isFinite(discussionBaselineTotal)) {
            discussionBaselineTotal = -1;
        }

        var key =
            String(user.userid) + ':' + String(startedAt) + ':' + String(discussionBaselineTotal);

        var cached =
            STATE.editorStatsCache[key];

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
                user,
                startedAt
            ),

            fetchCreatedArticleContributions(
                user,
                startedAt
            ),

            fetchUploadLogEvents(
                user,
                startedAt
            ),

            fetchTechnicalContributions(
                user,
                startedAt
            ),

            fetchGlobalRecentChanges(),

            fetchDiscussionStatsForUser(
                user,
                forceReload,
                startedAt,
                discussionBaselineTotal
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
                        STATE.catalogCache || { achievements: {}, families: {}, rarities: {} },
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

                STATE.editorStatsCache[key] = {
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


    I.registerFunctions('Metrics/Editing', {
        createEmptyEditorStats: createEmptyEditorStats,
        analyzeCreatedArticleContributions: analyzeCreatedArticleContributions,
        analyzeEditorContributions: analyzeEditorContributions,
        analyzeTechnicalContributions: analyzeTechnicalContributions,
        analyzeHistoricalContext: analyzeHistoricalContext,
        getEditorStatsForUser: getEditorStatsForUser
    }, ["analyzeCrossContributionHiddenAchievements", "analyzeUploadLogEvents", "cloneData", "createEmptyDiscussionStats", "fetchArticleContributions", "fetchCreatedArticleContributions", "fetchDiscussionStatsForUser", "fetchGlobalRecentChanges", "fetchParentRevisionMetadata", "fetchRoadCategoryStats", "fetchTechnicalContributions", "fetchUploadLogEvents", "getTierLevel", "isPlainObject", "mergeAchievementMap", "normalizeProgressUsername", "tierAchievementId", "timestampToUnix", "utcDayFromTimestamp"]);
})(window);