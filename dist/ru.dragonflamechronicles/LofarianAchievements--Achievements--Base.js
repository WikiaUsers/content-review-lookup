/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC10 PARTICIPATION CUTOFF REVIEW READY
Страница Fandom: MediaWiki:LofarianAchievements/Achievements/Base.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Базовые определения/помощники автоматических достижений, используемые движком TEST 1.16.3.

ДАННЫЕ / I/O
Работает с локальным runtime и каталогом.

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
    var definitions = Object.create(null);
    var families = Object.create(null);
    var custom = Object.create(null);

    function clone(value) {
        return value == null ? value : JSON.parse(JSON.stringify(value));
    }

    function tierId(familyId, level) {
        return String(familyId) + '_' + String(level).padStart(2, '0');
    }

    function numeric(value) {
        value = Number(value);
        return Number.isFinite(value) ? value : 0;
    }

    function directRulePass(definition, metrics) {
        if (definition.rule && I.has('evaluateSimpleRule')) {
            return I.invoke('evaluateSimpleRule', [definition.rule, metrics]);
        }
        if (definition.metric) {
            return numeric(metrics[definition.metric]) >= numeric(definition.target);
        }
        return false;
    }

    var api = {
        add: function (definition) {
            if (!definition || !definition.id) {
                throw new Error('[Lofarian Achievements] achievements.add требует id.');
            }
            definitions[String(definition.id)] = clone(definition);
            return api;
        },

        family: function (definition) {
            if (!definition || !definition.id || !Array.isArray(definition.thresholds)) {
                throw new Error('[Lofarian Achievements] achievements.family требует id и thresholds.');
            }
            families[String(definition.id)] = clone(definition);
            return api;
        },

        custom: function (id, checker) {
            if (!id || typeof checker !== 'function') {
                throw new Error('[Lofarian Achievements] achievements.custom требует id и checker.');
            }
            custom[String(id)] = checker;
            return api;
        },

        extendCatalog: function (catalog) {
            if (!Object.keys(definitions).length && !Object.keys(families).length) {
                return catalog;
            }

            var result = clone(catalog);
            result.achievements = result.achievements || {};
            result.families = result.families || {};

            Object.keys(definitions).forEach(function (id) {
                if (!result.achievements[id]) {
                    var item = clone(definitions[id]);
                    delete item.id;
                    delete item.metric;
                    delete item.target;
                    delete item.rule;
                    delete item.earnedAtMetric;
                    result.achievements[id] = item;
                }
            });

            Object.keys(families).forEach(function (id) {
                if (!result.families[id]) {
                    var family = clone(families[id]);
                    delete family.id;
                    delete family.metric;
                    result.families[id] = family;
                }
            });

            return result;
        },

        evaluate: function (catalog, metrics, baseMap, context) {
            metrics = metrics || {};
            context = context || {};
            var result = {};
            Object.keys(baseMap || {}).forEach(function (id) {
                result[id] = baseMap[id];
            });

            var defaultEarnedAt = Math.max(1, Math.floor(Number(context.nowUnix) || Date.now() / 1000));

            Object.keys(definitions).forEach(function (id) {
                var definition = definitions[id];
                var passed = false;
                var earnedAt = defaultEarnedAt;

                if (custom[id]) {
                    var customResult = custom[id](metrics, context, definition);
                    if (customResult && typeof customResult === 'object') {
                        passed = customResult.earned === true;
                        earnedAt = Math.max(1, Math.floor(Number(customResult.earnedAt) || earnedAt));
                    } else {
                        passed = customResult === true;
                    }
                } else {
                    passed = directRulePass(definition, metrics);
                }

                if (passed) {
                    if (definition.earnedAtMetric && metrics[definition.earnedAtMetric]) {
                        earnedAt = Math.max(1, Math.floor(Number(metrics[definition.earnedAtMetric]) || earnedAt));
                    }
                    result[id] = result[id] || earnedAt;
                }
            });

            Object.keys(families).forEach(function (familyId) {
                var family = families[familyId];
                if (!family.metric || !Array.isArray(family.thresholds)) {
                    return;
                }
                var value = numeric(metrics[family.metric]);
                var level = 0;
                for (var i = 0; i < family.thresholds.length; i++) {
                    if (value >= numeric(family.thresholds[i])) {
                        level = i + 1;
                    } else {
                        break;
                    }
                }
                if (level > 0) {
                    var id = tierId(familyId, level);
                    result[id] = result[id] || defaultEarnedAt;
                }
            });

            return result;
        },

        definitions: definitions,
        families: families,
        customCheckers: custom
    };

    I.achievementRegistry = api;
    I.registerModule('Achievements/Base', {
        declarativeRegistry: true,
        currentDefinitions: 0,
        note: 'TEST 1.16.3 definitions are mirrored by category modules; legacy checkers remain authoritative where required for exact parity.'
    });
})(window);