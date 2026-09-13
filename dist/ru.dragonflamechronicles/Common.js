/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC10 PARTICIPATION CUTOFF REVIEW READY
Страница Fandom: MediaWiki:Common.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Минимальный глобальный загрузчик Lofarian Achievements. Загружает только локальный Bootstrap через MediaWiki ResourceLoader.

ДАННЫЕ / I/O
Не читает и не записывает пользовательский прогресс сам; использует только mw.loader/mw.util.

ПРОЗРАЧНОСТЬ И БЕЗОПАСНОСТЬ
- Это открытый, человекочитаемый локальный JavaScript этой вики.
- eval, new Function, обфускация и скрытый/удалённый исполняемый код не используются.
- Исполняемые зависимости находятся только на локальных MediaWiki:*.js страницах.
- Сторонние трекеры и передача пользовательских данных внешним сервисам отсутствуют.
- Код не получает пароль, email или содержимое авторизационных cookie пользователя.
- Официальные награды не доверяются localStorage; localStorage используется только как технический клиентский кэш/очередь.
- Реклама Fandom не скрывается и не модифицируется.

ИНТЕРФЕЙС И ПРАВА
Только минимальная точка входа. Не изменяет DOM, права, роли, рекламу или данные пользователя.

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
/* Lofarian Achievements TEST 1.16.3 — modular RC10 PARTICIPATION CUTOFF REVIEW READY loader only. */
(function (root) {
    'use strict';

    if (root.__LofarianAchievementsBootstrapPromise) {
        return;
    }

    mw.loader.using('mediawiki.util').then(function () {
        if (typeof root.importArticles !== 'function') {
            throw new Error(
                '[Lofarian Achievements] Fandom importArticles() недоступен.'
            );
        }

        /*
         * Официальный Fandom importArticles()/ResourceLoader:
         * Bootstrap остаётся отдельной reviewable MediaWiki:*.js страницей,
         * но загружается через штатный пакетный/кэшируемый механизм Fandom.
         */
        return root.importArticles({
            type: 'script',
            articles: [
                'MediaWiki:LofarianAchievements/Bootstrap.js'
            ]
        });
    }).catch(function (error) {
        console.error(
            '[Lofarian Achievements] Не удалось загрузить Bootstrap:',
            error
        );
    });
})(window);


/*
===============================================================================
LOFARIAN CHRONICLER CARD v1.3.5 — FANDOM JS REVIEW NOTE
Страница Fandom: MediaWiki:Common.js

НАЗНАЧЕНИЕ ЭТОГО БЛОКА
Отдельный минимальный глобальный загрузчик системы «Личная карточка летописца».
Он не переносит логику паспорта в Common.js, а только подключает две локальные
MediaWiki-страницы:

- MediaWiki:LofarianChroniclerCard.css
- MediaWiki:LofarianChroniclerCard.js

НАЗНАЧЕНИЕ LOFARIAN CHRONICLER CARD
Статистический паспорт участника программы Lofarian Achievements. Карточка
показывает статистику работы пользователя на вики и его личные предпочтения.

СТАТИСТИЧЕСКИЕ ДАННЫЕ
Карточка может показывать:
- дату первого найденного действия пользователя на этой вики;
- дату выдачи паспорта — первое подтверждённое подключение к программе достижений;
- стаж на Википедии мира Лофариан и статус активности;
- общее число правок;
- количество созданных статей;
- количество загруженных изображений;
- активность за текущий месяц;
- календарь активности по дням;
- текущую серию дней активности;
- личный рекорд серии;
- дату последнего действия;
- «почерк летописца», охват статей, активные дни, среднюю и рекордную активность;
- первую/последнюю созданную и самую редактируемую статью;
- самый активный месяц, день недели и распределение деятельности;
- любимые разделы;
- любимую категорию статей;
- до пяти выбранных пользователем любимых достижений;
- паспортную серию и номер (PHAY 0001 зарезервирован за Phaynipe; обычная выдача начинается с AAAA 0001).
- любимые достижения выбираются только из уже полученных наград владельца;
- используются только уникальные локальные роли из Project:LofarianRolesData; у ролей и статуса участника есть отдельные описания;
- показатели паспорта кликабельны и ведут к соответствующей публичной статистике;
- любимые достижения открывают штатное мини-окно Lofarian Achievements с информацией о награде.

УЧАСТИЕ
Карточка предназначена только для участников программы достижений. Данные
Lofarian Achievements используются только для определения участия и для
отображения выбранных пользователем достижений. Карточка не выдаёт награды и
не изменяет прогресс программы достижений.

РАЗДЕЛЕНИЕ СИСТЕМ
Lofarian Chronicler Card является отдельной системой и НЕ изменяет:
- MediaWiki:LofarianAchievements/Bootstrap.js;
- модули Engine, Services, Metrics и UI Lofarian Achievements;
- каталог достижений;
- очки опыта;
- Зал славы;
- Project:LofarianAchievementsUsers/00..ff;
- Project:LofarianAchievementsProgress/0..255;
- AbuseFilter-логику системы достижений.

ПОЛЬЗОВАТЕЛЬСКИЕ НАСТРОЙКИ
Владелец профиля может выбрать:
- до трёх любимых разделов;
- одну любимую категорию;
- до пяти любимых достижений.

Настройки карточки хранятся отдельно от официального прогресса достижений.

ДАННЫЕ / I/O
Статистика читается через стандартный MediaWiki API этой же вики. Запись
настроек выполняется только по явному действию пользователя и через стандартный
MediaWiki API с действующими правами и CSRF token.

ПРОЗРАЧНОСТЬ И БЕЗОПАСНОСТЬ
- Код полностью локальный и человекочитаемый.
- Внешний сервер не используется.
- Сторонние трекеры и аналитика отсутствуют.
- eval, new Function и обфускация не используются.
- Пароли, email и содержимое авторизационных cookie не читаются.
- Реклама Fandom не скрывается и не модифицируется.

ПРОИЗВОДИТЕЛЬНОСТЬ
- Используется штатный Fandom importArticles()/ResourceLoader.
- Есть защита от повторного подключения при повторном выполнении Common.js.
- Сама логика паспорта хранится в отдельном MediaWiki:LofarianChroniclerCard.js.
- Оформление хранится в отдельном MediaWiki:LofarianChroniclerCard.css.
===============================================================================
*/
/* Lofarian Chronicler Card v1.3.5 — standalone loader only. */
(function (root) {
    'use strict';

    if (root.__LofarianChroniclerCardLoaderPromise) {
        return;
    }

    root.__LofarianChroniclerCardLoaderPromise = mw.loader.using([
        'mediawiki.api',
        'mediawiki.util'
    ]).then(function () {
        if (typeof root.importArticles !== 'function') {
            throw new Error(
                '[Lofarian Chronicler Card] Fandom importArticles() недоступен.'
            );
        }

        return root.importArticles({
            type: 'style',
            articles: [
                'MediaWiki:LofarianChroniclerCard.css'
            ]
        });
    }).then(function () {
        return root.importArticles({
            type: 'script',
            articles: [
                'MediaWiki:LofarianChroniclerCard.js'
            ]
        });
    }).catch(function (error) {
        root.__LofarianChroniclerCardLoaderPromise = null;

        console.error(
            '[Lofarian Chronicler Card] Не удалось загрузить систему:',
            error
        );
    });
})(window);