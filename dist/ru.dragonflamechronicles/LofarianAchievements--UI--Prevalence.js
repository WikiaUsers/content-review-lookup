/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC10 PARTICIPATION CUTOFF REVIEW READY
Страница Fandom: MediaWiki:LofarianAchievements/UI/Prevalence.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Отображает рассчитанный процент распространённости достижения среди участников Зала славы.

ДАННЫЕ / I/O
Использует результат Services/Leaderboard.

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
    if (!I) {
        throw new Error('[Lofarian Achievements] Runtime отсутствует: UI/Prevalence');
    }

    function applyAchievementPrevalenceToRoot(catalog, rootNode) {
        if (!rootNode) {
            return Promise.resolve();
        }

        var elements = rootNode.querySelectorAll(
            '[data-lof-prevalence-id]'
        );

        if (!elements.length) {
            return Promise.resolve();
        }

        var ids = [];

        Array.prototype.forEach.call(
            elements,
            function (element) {
                var id = String(
                    element.getAttribute('data-lof-prevalence-id') || ''
                );

                if (id && ids.indexOf(id) === -1) {
                    ids.push(id);
                }
            }
        );

        if (!ids.length) {
            return Promise.resolve();
        }

        function setUnavailable() {
            Array.prototype.forEach.call(
                elements,
                function (element) {
                    element.textContent = 'Получили: —';
                }
            );
        }

        var ready = typeof I.ensureFeature === 'function'
            ? I.ensureFeature('leaderboard')
            : Promise.resolve();

        return ready.then(function () {
            if (!I.has('getAchievementPrevalenceMap')) {
                throw new Error('Services/Leaderboard не зарегистрирован.');
            }

            return I.invoke('getAchievementPrevalenceMap', [catalog, ids]);
        }).then(function (map) {
            Array.prototype.forEach.call(
                elements,
                function (element) {
                    var id = String(
                        element.getAttribute('data-lof-prevalence-id') || ''
                    );
                    var data = map[id];

                    if (!data) {
                        element.textContent = 'Получили: —';
                        return;
                    }

                    var mode = element.getAttribute(
                        'data-lof-prevalence-mode'
                    ) || '';
                    var detailed = mode === 'detailed';
                    var compact = mode === 'compact';
                    var countOnly = mode === 'count';

                    var countText = I.has('formatPlayersCount')
                        ? I.invoke('formatPlayersCount', [data.count])
                        : String(data.count);

                    element.textContent =
                        'Получили: ' +
                        (
                            countOnly
                                ? countText
                                : compact
                                    ? String(data.count) + '/' +
                                        String(data.total) + ' · ' +
                                        data.formatted
                                    : data.formatted +
                                        (
                                            detailed
                                                ? ' · ' + String(data.count) +
                                                    ' из ' + String(data.total) +
                                                    ' участников'
                                                : ''
                                        )
                        );
                }
            );
        }).catch(function (error) {
            console.warn(
                '[Lofarian Achievements] Не удалось получить процент достижения:',
                error
            );
            setUnavailable();
        });
    }

    I.registerFunctions('UI/Prevalence', {
        applyAchievementPrevalenceToRoot: applyAchievementPrevalenceToRoot
    }, []);
})(window);