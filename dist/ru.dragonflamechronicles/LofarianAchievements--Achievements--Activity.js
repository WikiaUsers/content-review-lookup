/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC10 PARTICIPATION CUTOFF REVIEW READY
Страница Fandom: MediaWiki:LofarianAchievements/Achievements/Activity.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Логика автоматических достижений общей активности, включая подтверждение первого локального появления/регистрации.

ДАННЫЕ / I/O
Использует MediaWiki user data через внутренние сервисы.

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
    if (!I) { throw new Error('[Lofarian Achievements] Runtime отсутствует: Achievements/Activity'); }
    var C = I.config || {};
    var STATE = I.state || {};
    var api = I.api;
    var FIRST_LOGIN_ID = C.FIRST_LOGIN_ID;
    function cloneData() { return I.invoke('cloneData', arguments); }
    function getAchievement() { return I.invoke('getAchievement', arguments); }
    function isPlainObject() { return I.invoke('isPlainObject', arguments); }

    function addAutomaticFirstLogin(
        catalog,
        user,
        achievementMap,
        participantStartedAt
    ) {
        var result = isPlainObject(achievementMap)
            ? cloneData(achievementMap)
            : {};

        participantStartedAt = Math.max(
            0,
            Math.floor(Number(participantStartedAt) || 0)
        );

        if (
            !user ||
            !user.userid ||
            participantStartedAt <= 0 ||
            !getAchievement(catalog, FIRST_LOGIN_ID)
        ) {
            return result;
        }

        /*
         * RC9 OPT-IN:
         * «Добро пожаловать» теперь означает первое подтверждённое
         * участие в добровольной программе достижений этой вики.
         * Дата берётся из существующей локальной progress/Users записи,
         * а не из глобальной даты регистрации Fandom.
         */
        result[FIRST_LOGIN_ID] = participantStartedAt;

        return result;
    }



    /*
     * RC3: декларативное зеркало каталога удалено из runtime.
     * Единственный пользовательский источник названий/описаний/редкостей/
     * очков и семей — Project:LofarianAchievementsData и его части.
     * Этот модуль содержит только исполняемую логику TEST 1.16.3.
     */

    I.registerFunctions('Achievements/Activity', {
        addAutomaticFirstLogin: addAutomaticFirstLogin
    }, ["cloneData", "getAchievement", "isPlainObject"]);
})(window);