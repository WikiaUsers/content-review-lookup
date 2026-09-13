/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC10 PARTICIPATION CUTOFF REVIEW READY
Страница Fandom: MediaWiki:LofarianAchievements/Services/Storage.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Хранение официальных пользовательских наград и progress: Users/00..ff и Progress/0..255, парсинг/сериализация L7, очередь синхронизации и клиентская очередь.

ДАННЫЕ / I/O
Серверные записи идут только в локальные Project:-страницы через MediaWiki API; progress дополнительно контролируется AbuseFilter.

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
    if (!I) { throw new Error('[Lofarian Achievements] Runtime отсутствует: Services/Storage'); }
    var C = I.config || {};
    var STATE = I.state || {};
    var api = I.api;
    var USERS_PAGE_PREFIX = C.USERS_PAGE_PREFIX;
    var SEGMENT_COUNT = C.SEGMENT_COUNT;
    var DATA_CLASS = C.DATA_CLASS;
    var THEME_KEYS = C.THEME_KEYS;
    var PROGRESS_PAGE_PREFIX = C.PROGRESS_PAGE_PREFIX;
    var PROGRESS_SEGMENT_COUNT = C.PROGRESS_SEGMENT_COUNT;
    var PROGRESS_HEADER = C.PROGRESS_HEADER;
    var PROGRESS_RECORD_VERSION = C.PROGRESS_RECORD_VERSION;
    var PROGRESS_EDIT_SUMMARY = C.PROGRESS_EDIT_SUMMARY;
    var MAX_ARTICLE_COUNT = C.MAX_ARTICLE_COUNT;
    var MAX_ACTIVE_SECONDS = C.MAX_ACTIVE_SECONDS;
    var MAX_THEME_ARTICLE_COUNT = C.MAX_THEME_ARTICLE_COUNT;
    var MAX_THEME_ACTIVE_SECONDS = C.MAX_THEME_ACTIVE_SECONDS;
    var THEME_ARTICLE_THRESHOLDS = C.THEME_ARTICLE_THRESHOLDS;
    var THEME_TIME_THRESHOLDS = C.THEME_TIME_THRESHOLDS;
    var CHRONIST_THRESHOLDS = C.CHRONIST_THRESHOLDS;
    var THOUGHTFUL_THRESHOLDS = C.THOUGHTFUL_THRESHOLDS;
    function cloneData() { return I.invoke('cloneData', arguments); }
    function extractJsonFromPage() { return I.invoke('extractJsonFromPage', arguments); }
    function formatAchievementDate() { return I.invoke('formatAchievementDate', arguments); }
    function getTierLevel() { return I.invoke('getTierLevel', arguments); }
    function isPlainObject() { return I.invoke('isPlainObject', arguments); }
    function nowUnix() { return I.invoke('nowUnix', arguments); }
    function protectTechnicalPage() { return I.invoke('protectTechnicalPage', arguments); }
    function readWikiPage() { return I.invoke('readWikiPage', arguments); }
    function wrapJsonForPage() { return I.invoke('wrapJsonForPage', arguments); }
    function writeWikiPage() { return I.invoke('writeWikiPage', arguments); }

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
            STATE.progressSegmentCache[title] &&
            !forceReload
        ) {
            return Promise.resolve(
                cloneData(
                    STATE.progressSegmentCache[title]
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

                STATE.progressSegmentCache[title] =
                    cloneData(result);

                return result;
            });
    }


    function clearProgressSegmentCache(
        username
    ) {
        delete STATE.progressSegmentCache[
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
            STATE.leaderboardRowsCache = null;
            STATE.leaderboardRowsCacheAt = 0;

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
        if (STATE.segmentCache[segmentId] && !forceReload) {
            return Promise.resolve(
                cloneData(STATE.segmentCache[segmentId])
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

                    STATE.segmentCache[segmentId] =
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

                STATE.segmentCache[segmentId] = cloneData(result);

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
            delete STATE.segmentCache[loadedSegment.id];

            STATE.leaderboardRowsCache = null;
            STATE.leaderboardRowsCacheAt = 0;

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


    I.registerFunctions('Services/Storage', {
        getSegmentNumber: getSegmentNumber,
        getSegmentId: getSegmentId,
        getSegmentPageTitle: getSegmentPageTitle,
        normalizeProgressUsername: normalizeProgressUsername,
        countCharacter: countCharacter,
        getProgressSegmentNumber: getProgressSegmentNumber,
        getProgressSegmentTitle: getProgressSegmentTitle,
        createEmptyPublicProgress: createEmptyPublicProgress,
        sanitizePublicProgress: sanitizePublicProgress,
        parseProgressRecordLine: parseProgressRecordLine,
        formatProgressRecordLine: formatProgressRecordLine,
        createNewProgressSegmentText: createNewProgressSegmentText,
        parseProgressSegmentText: parseProgressSegmentText,
        readProgressSegment: readProgressSegment,
        clearProgressSegmentCache: clearProgressSegmentCache,
        readUserProgress: readUserProgress,
        getEarliestReliableUnixFromMap: getEarliestReliableUnixFromMap,
        getLocalWikiPresenceStartUnix: getLocalWikiPresenceStartUnix,
        getLocalProgressStorageKey: getLocalProgressStorageKey,
        createEmptyLocalProgress: createEmptyLocalProgress,
        loadLocalProgress: loadLocalProgress,
        saveLocalProgress: saveLocalProgress,
        appendProgressRecordToSegment: appendProgressRecordToSegment,
        replaceProgressRecordInSegment: replaceProgressRecordInSegment,
        postProgressSegmentText: postProgressSegmentText,
        ensureOwnProgressRecord: ensureOwnProgressRecord,
        createEmptySegment: createEmptySegment,
        validateSegment: validateSegment,
        readSegmentById: readSegmentById,
        readUserSegment: readUserSegment,
        saveSegment: saveSegment,
        getUserAchievementMap: getUserAchievementMap
    }, ["cloneData", "extractJsonFromPage", "formatAchievementDate", "getTierLevel", "isPlainObject", "nowUnix", "protectTechnicalPage", "readWikiPage", "wrapJsonForPage", "writeWikiPage"]);
})(window);