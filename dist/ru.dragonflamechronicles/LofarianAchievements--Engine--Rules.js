/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC10 PARTICIPATION CUTOFF REVIEW READY
Страница Fandom: MediaWiki:LofarianAchievements/Engine/Rules.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Универсальная проверка простых правил и вычисление текущих значений rule-based достижений.

ДАННЫЕ / I/O
Использует уже подготовленные метрики; прямых внешних запросов нет.

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
    if (!I) { throw new Error('[Lofarian Achievements] Runtime отсутствует: Engine/Rules'); }
    var C = I.config || {};
    var STATE = I.state || {};
    var api = I.api;

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



    /* Универсальный движок для новых декларативных достижений.
     * Существующие TEST 1.16.3 checkers не заменяются этим кодом во время
     * структурного рефакторинга, поэтому поведение старых наград сохраняется. */
    function evaluateSimpleRule(rule, metrics) {
        metrics = metrics || {};
        if (!rule) { return false; }
        if (Array.isArray(rule.all)) {
            return rule.all.every(function (part) { return evaluateSimpleRule(part, metrics); });
        }
        if (Array.isArray(rule.any)) {
            return rule.any.some(function (part) { return evaluateSimpleRule(part, metrics); });
        }
        var value = metrics[rule.metric];
        if (Object.prototype.hasOwnProperty.call(rule, 'gte')) { return Number(value) >= Number(rule.gte); }
        if (Object.prototype.hasOwnProperty.call(rule, 'lte')) { return Number(value) <= Number(rule.lte); }
        if (Object.prototype.hasOwnProperty.call(rule, 'eq')) { return value === rule.eq; }
        if (Array.isArray(rule.between) && rule.between.length >= 2) {
            return Number(value) >= Number(rule.between[0]) && Number(value) <= Number(rule.between[1]);
        }
        if (Object.prototype.hasOwnProperty.call(rule, 'target')) { return Number(value) >= Number(rule.target); }
        return false;
    }

    I.registerFunctions('Engine/Rules', {
        metaRuleCurrentValue: metaRuleCurrentValue,
        evaluateSimpleRule: evaluateSimpleRule
    }, []);
})(window);