/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC10 PARTICIPATION CUTOFF REVIEW READY
Страница Fandom: MediaWiki:LofarianAchievements/Engine/Utils.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Общие чистые вспомогательные функции: форматирование, даты, клонирование, нормализация и утилиты runtime.

ДАННЫЕ / I/O
Прямого сетевого ввода/вывода нет.

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
    if (!I) { throw new Error('[Lofarian Achievements] Runtime отсутствует: Engine/Utils'); }
    var C = I.config || {};
    var STATE = I.state || {};
    var api = I.api;
    var META_ACHIEVEMENT_IDS = C.META_ACHIEVEMENT_IDS;
    var HIDDEN_AUTOMATIC_ACHIEVEMENT_IDS = C.HIDDEN_AUTOMATIC_ACHIEVEMENT_IDS;

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


    function getParticipationStartedAt(protectedMap, progress, explicitStartedAt) {
        var explicit = Math.floor(Number(explicitStartedAt) || 0);
        if (explicit >= 946684800) {
            return explicit;
        }

        var firstLoginId = String(C.FIRST_LOGIN_ID || 'first_login');
        var protectedAt = protectedMap && Math.floor(Number(protectedMap[firstLoginId]) || 0);
        if (protectedAt >= 946684800) {
            return protectedAt;
        }

        var progressAt = progress && Math.floor(Number(progress.firstSeenAt) || 0);
        return progressAt >= 946684800 ? progressAt : 0;
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


    function chunkArray(items, size) {
        var chunks = [];
        size = Math.max(1, Math.floor(Number(size) || 1));

        for (var i = 0; i < (items || []).length; i += size) {
            chunks.push(items.slice(i, i + size));
        }

        return chunks;
    }


    function formatAchievementDate(unixTime) {
        unixTime = Number(unixTime || 0);

        if (!unixTime || unixTime <= 1) {
            return '';
        }

        var date = new Date(unixTime * 1000);

        if (!Number.isFinite(date.getTime())) {
            return '';
        }

        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }


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


    I.registerFunctions('Engine/Utils', {
        getCurrentUserName: getCurrentUserName,
        getCurrentUserId: getCurrentUserId,
        escapeHtml: escapeHtml,
        cloneData: cloneData,
        nowUnix: nowUnix,
        registrationToUnix: registrationToUnix,
        normalizeUserLookupKey: normalizeUserLookupKey,
        isPlainObject: isPlainObject,
        pointsWord: pointsWord,
        formatPoints: formatPoints,
        isAutomaticProgressAchievementId: isAutomaticProgressAchievementId,
        getParticipationStartedAt: getParticipationStartedAt,
        timestampToUnix: timestampToUnix,
        utcDayFromTimestamp: utcDayFromTimestamp,
        chunkArray: chunkArray,
        formatAchievementDate: formatAchievementDate,
        getProfileUsername: getProfileUsername
    }, []);
})(window);