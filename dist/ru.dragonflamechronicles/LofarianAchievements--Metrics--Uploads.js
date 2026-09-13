/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC10 PARTICIPATION CUTOFF REVIEW READY
Страница Fandom: MediaWiki:LofarianAchievements/Metrics/Uploads.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Анализирует локальный журнал загрузок для достижений, связанных с файлами/изображениями.

ДАННЫЕ / I/O
Использует уже полученные записи MediaWiki upload log.

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
    if (!I) { throw new Error('[Lofarian Achievements] Runtime отсутствует: Metrics/Uploads'); }
    var C = I.config || {};
    var STATE = I.state || {};
    var api = I.api;
    var HUDOZHNIK_THRESHOLDS = C.HUDOZHNIK_THRESHOLDS;
    function getTierLevel() { return I.invoke('getTierLevel', arguments); }
    function timestampToUnix() { return I.invoke('timestampToUnix', arguments); }

    function analyzeUploadLogEvents(
        user,
        events
    ) {
        var result = {
            uploadedFiles: 0,
            hudozhnikLevel: 0,
            hudozhnikAwardAt: 0
        };

        events =
            Array.isArray(events)
                ? events
                : [];

        events.forEach(
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

                /*
                 * Запрос уже отфильтрован через
                 * leaction=upload/upload.
                 */
                result.uploadedFiles +=
                    1;

                var nextLevel =
                    getTierLevel(
                        HUDOZHNIK_THRESHOLDS,
                        result.uploadedFiles
                    );

                if (
                    nextLevel >
                    result.hudozhnikLevel
                ) {
                    result.hudozhnikLevel =
                        nextLevel;

                    result.hudozhnikAwardAt =
                        unix;
                }
            }
        );

        return result;
    }


    I.registerFunctions('Metrics/Uploads', {
        analyzeUploadLogEvents: analyzeUploadLogEvents
    }, ["getTierLevel", "timestampToUnix"]);
})(window);