/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC11.4 FAST UX REVIEW READY
Страница Fandom: MediaWiki:LofarianAchievements/Bootstrap.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Создаёт внутренний runtime, загружает локальные модули по dependency-layer и условные feature-модули, затем запускает Core.

ДАННЫЕ / I/O
Загружает только локальные MediaWiki:*.js страницы этой вики; внешний исполняемый код отсутствует.

ПРОЗРАЧНОСТЬ И БЕЗОПАСНОСТЬ
- Это открытый, человекочитаемый локальный JavaScript этой вики.
- eval, new Function, обфускация и скрытый/удалённый исполняемый код не используются.
- Исполняемые зависимости находятся только на локальных MediaWiki:*.js страницах.
- Сторонние трекеры и передача пользовательских данных внешним сервисам отсутствуют.
- Код не получает пароль, email или содержимое авторизационных cookie пользователя.
- Официальные награды не доверяются localStorage; localStorage используется только как технический клиентский кэш/очередь.
- Реклама Fandom не скрывается и не модифицируется.

ИНТЕРФЕЙС И ПРАВА
Сам Bootstrap не изменяет DOM/роли/права; он только загружает локальные модули. RC9 не переименовывает Administrator/Bureaucrat. Отдельный UI/Roles.js на профиле добавляет только собственные локальные декоративные теги рядом с системными плашками, не изменяя их.

ПРОИЗВОДИТЕЛЬНОСТЬ
- Модуль загружается в предусмотренном dependency-layer; файлы слоя пакетируются штатным Fandom importArticles()/ResourceLoader.
- Повторные загрузки модулей дедуплицируются; тяжёлые Profile/Hall/Admin части подключаются условно.
- Каталог из Project:LofarianAchievementsData/* читается пакетно через MediaWiki API, а не отдельным запросом на каждое достижение.

RC11 — ДОБРОВОЛЬНОЕ УЧАСТИЕ / OPT-IN + КАТАЛОГ
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
Этот файл является одним модулем одной системы Lofarian Achievements. RC11 специально
разделён на небольшие MediaWiki:*.js страницы для прозрачности сопровождения, но
загружается штатным Fandom importArticles()/ResourceLoader с пакетированием.
===============================================================================
*/
/*
===============================================================================
                 LOFARIAN ACHIEVEMENTS — MODULAR BOOTSTRAP
                 behavioral base: TEST 1.16.3 — RC11.4 FAST UX REVIEW READY
===============================================================================
Назначение:
локальная модульная загрузка существующей системы достижений Fandom/MediaWiki.
Это структурный рефакторинг рабочего TEST 1.16.3, а не новая реализация.

RC9:
- локальные MediaWiki:*.js загружаются через официальный Fandom importArticles();
- файлы одного dependency-layer объединяются ResourceLoader в пакетный запрос;
- Profile/Hall/Admin/Leaderboard загружаются только когда реально нужны;
- повторная загрузка одного и того же локального JS блокируется Promise-кэшем;
- каталог Reading/Editing/Creation/Activity/Discussions/Special/Hidden читается
  пакетно через MediaWiki API;
- системные роли Fandom не переименовываются и их плашки не клонируются;
- UI/Roles.js загружается только на профиле и создаёт отдельные локальные теги сообщества из Project:LofarianRolesData; эти теги не предоставляют MediaWiki/Fandom rights;
- декларативные JS-зеркала каталога не исполняются;
- L7, AbuseFilter, ID, критерии и пользовательские записи не меняются.

Данные и совместимость:
- индекс каталога: Project:LofarianAchievementsData;
- категории каталога: Project:LofarianAchievementsData/Reading, /Editing,
  /Creation, /Activity, /Discussions, /Special, /Hidden;
- ручные/защищённые награды: Project:LofarianAchievementsUsers/00..ff;
- progress: Project:LofarianAchievementsProgress/0..255;
- актуальный машинный формат: L7;
- схема L7, сегментация, edit summary и AbuseFilter-совместимость не меняются.

Безопасность:
- eval/new Function/обфускация/минификация не используются;
- исполняемые JS-файлы — только локальные страницы MediaWiki этой вики;
- внешних серверов, сторонних трекеров и удалённого исполняемого JS нет;
- localStorage остаётся недоверенным клиентским кэшем/очередью;
- код не получает пароль/email и не меняет встроенные права MediaWiki.
===============================================================================
*/
(function (root) {
    'use strict';

    if (root.__LofarianAchievementsBootstrapPromise) {
        return;
    }

    var I = root.__LofarianAchievementsInternal = {
        build: 'TEST 1.16.3 modular-refactor RC11 achievements-hub review-ready',
        functions: Object.create(null),
        modules: Object.create(null),
        loadedScripts: Object.create(null),
        featurePromises: Object.create(null),
        config: null,
        state: null,
        api: null,
        achievementRegistry: null,
        metricsRegistry: null,

        registerModule: function (name, meta) {
            if (this.modules[name]) {
                throw new Error(
                    '[Lofarian Achievements] Повторная регистрация модуля: ' + name
                );
            }
            this.modules[name] = meta || {};
        },

        registerFunctions: function (moduleName, map, dependencies) {
            var self = this;

            Object.keys(map || {}).forEach(function (name) {
                if (self.functions[name]) {
                    throw new Error(
                        '[Lofarian Achievements] Дублирующая функция: ' +
                        name + ' (' + moduleName + ')'
                    );
                }
                self.functions[name] = map[name];
            });

            self.registerModule(moduleName, {
                functions: Object.keys(map || {}),
                dependencies: (dependencies || []).slice()
            });
        },

        invoke: function (name, argsLike) {
            var fn = this.functions[name];
            if (typeof fn !== 'function') {
                throw new Error(
                    '[Lofarian Achievements] Функция ещё не зарегистрирована: ' + name
                );
            }
            return fn.apply(
                undefined,
                Array.prototype.slice.call(argsLike || [])
            );
        },

        has: function (name) {
            return typeof this.functions[name] === 'function';
        },

        validateDependencies: function () {
            var self = this;
            var missing = [];

            Object.keys(self.modules).forEach(function (moduleName) {
                (self.modules[moduleName].dependencies || []).forEach(function (name) {
                    if (!self.has(name)) {
                        missing.push(moduleName + ' -> ' + name);
                    }
                });
            });

            if (missing.length) {
                throw new Error(
                    '[Lofarian Achievements] Незагруженные зависимости: ' +
                    missing.join(', ')
                );
            }

            return true;
        },

        loadLayer: function (titles) {
            var self = this;
            var requested = (titles || []).filter(Boolean);
            var pending = [];
            var waits = [];

            requested.forEach(function (title) {
                if (self.loadedScripts[title]) {
                    waits.push(self.loadedScripts[title]);
                } else {
                    pending.push(title);
                }
            });

            if (pending.length) {
                if (typeof root.importArticles !== 'function') {
                    return Promise.reject(
                        new Error(
                            '[Lofarian Achievements] Fandom importArticles() недоступен.'
                        )
                    );
                }

                /*
                 * Fandom ResourceLoader объединяет все страницы из pending
                 * в один пакетный запрос, минифицирует и кэширует результат.
                 * Все страницы остаются отдельными MediaWiki:*.js для review.
                 */
                var batchPromise = root.importArticles({
                    type: 'script',
                    articles: pending
                }).then(function () {
                    return pending.slice();
                }).catch(function (error) {
                    pending.forEach(function (title) {
                        delete self.loadedScripts[title];
                    });
                    console.error(
                        '[Lofarian Achievements] Не удалось загрузить пакет модулей:',
                        pending,
                        error
                    );
                    throw error;
                });

                pending.forEach(function (title) {
                    self.loadedScripts[title] = batchPromise.then(function () {
                        return title;
                    });
                    waits.push(self.loadedScripts[title]);
                });
            }

            return Promise.all(waits).then(function () {
                return requested.slice();
            });
        },

        loadPageScript: function (title) {
            var self = this;
            return self.loadLayer([title]).then(function () {
                return title;
            });
        },

        ensureFeature: function (name) {

            var self = this;
            var registry = root.LofarianAchievementsModuleRegistry;
            var titles = registry && registry.features && registry.features[name];

            if (!Array.isArray(titles)) {
                return Promise.reject(
                    new Error('[Lofarian Achievements] Неизвестная feature: ' + name)
                );
            }

            if (self.featurePromises[name]) {
                return self.featurePromises[name];
            }

            /*
             * Feature-файлы уже изолированы и регистрируют функции без запуска
             * бизнес-логики на этапе загрузки, поэтому их можно отдать Fandom
             * ResourceLoader одним пакетным importArticles() вместо N
             * последовательных запросов. Это особенно заметно на профиле и
             * в Зале славы.
             */
            self.featurePromises[name] = self.loadLayer(titles).catch(function (error) {
                delete self.featurePromises[name];
                throw error;
            });

            return self.featurePromises[name];
        }
    };

    function isProfilePage() {
        return mw.config.get('wgNamespaceNumber') === 2 &&
            !!mw.config.get('wgTitle') &&
            String(mw.config.get('wgTitle')).indexOf('/') === -1;
    }

    function isHallPage() {
        var title = String(mw.config.get('wgTitle') || '').trim();
        var namespace = String(mw.config.get('wgCanonicalNamespace') || '');

        return title === 'Зал славы' &&
            (namespace === 'Project' || namespace === '');
    }

    function isAchievementsPage() {
        return Number(mw.config.get('wgNamespaceNumber')) === 4 &&
            String(mw.config.get('wgTitle') || '').trim() === 'Достижения';
    }

    function isLightAdmin() {
        var groups = mw.config.get('wgUserGroups') || [];
        return groups.indexOf('sysop') !== -1 || groups.indexOf('bureaucrat') !== -1;
    }

    function needsFullRuntime(participation) {
        /*
         * Участник получает полный движок на любой обычной странице.
         * Неучастнику полный runtime нужен только в viewer-mode для просмотра
         * профилей/Зала славы. Администратору он также доступен для команд.
         */
        return !!(
            participation && participation.active ||
            isProfilePage() ||
            isHallPage() ||
            isAchievementsPage() ||
            isLightAdmin()
        );
    }

    console.log('[Lofarian Achievements] Modular Bootstrap RC11.4 FAST UX REVIEW READY запущен');

    root.__LofarianAchievementsBootstrapPromise = mw.loader
        .using(['mediawiki.api', 'mediawiki.util', 'user.options'])
        .then(function () {
            I.api = new mw.Api();

            if (typeof root.importArticles !== 'function') {
                throw new Error(
                    '[Lofarian Achievements] Fandom importArticles() недоступен.'
                );
            }

            /*
             * Для всех посетителей грузятся только лёгкие opt-in стили и один
             * Participation.js. Полные 250+ КБ стилей и runtime ниже не
             * загружаются, пока это не требуется.
             */
            return Promise.all([
                root.importArticles({
                    type: 'style',
                    articles: ['MediaWiki:LofarianAchievementsGate.css']
                }),
                I.loadLayer(['MediaWiki:LofarianAchievements/Participation.js'])
            ]);
        })
        .then(function () {
            if (!I.has('initParticipationGate')) {
                throw new Error(
                    '[Lofarian Achievements] Participation.js не зарегистрировал initParticipationGate.'
                );
            }
            return I.invoke('initParticipationGate', []);
        })
        .then(function (participation) {
            if (!needsFullRuntime(participation)) {
                console.log(
                    '[Lofarian Achievements] Лёгкий opt-in режим: полный runtime не требуется.'
                );
                return { lightOnly: true, participation: participation };
            }

            I.viewerOnly = !(participation && participation.active);

            return Promise.all([
                root.importArticles({
                    type: 'style',
                    articles: [
                        'MediaWiki:LofarianAchievements/Styles/01_Base.css',
                        'MediaWiki:LofarianAchievements/Styles/02_Profile_Core.css',
                        'MediaWiki:LofarianAchievements/Styles/03_Rarities.css',
                        'MediaWiki:LofarianAchievements/Styles/04_Profile_Polish.css',
                        'MediaWiki:LofarianAchievements/Styles/05_Achievements_Page.css',
                        'MediaWiki:LofarianAchievements/Styles/06_Profile_Hub.css',
                        'MediaWiki:LofarianAchievements/Styles/07_Hall_Of_Fame.css',
                        'MediaWiki:LofarianAchievements/Styles/08_Notifications.css',
                        'MediaWiki:LofarianAchievements/Styles/09_Final_Polish.css'
                    ]
                }),
                I.loadLayer([
                    'MediaWiki:LofarianAchievements/Config.js',
                    'MediaWiki:LofarianAchievements/Registry.js'
                ])
            ]).then(function () {
                return { lightOnly: false, participation: participation };
            });
        })
        .then(function (gateResult) {
            if (gateResult.lightOnly) {
                return gateResult;
            }

            var registry = root.LofarianAchievementsModuleRegistry;

            if (!registry || !Array.isArray(registry.coreLayers)) {
                throw new Error(
                    '[Lofarian Achievements] Registry.js не создал coreLayers.'
                );
            }

            var chain = Promise.resolve();

            registry.coreLayers.forEach(function (layer) {
                chain = chain.then(function () {
                    return I.loadLayer(layer);
                });
            });

            return chain.then(function () {
                return gateResult;
            });
        })
        .then(function (gateResult) {
            if (gateResult.lightOnly) {
                return gateResult;
            }

            /*
             * RC11.4: page-feature больше не ждёт userinfo/admin. Профиль, Зал
             * славы или каталог начинают грузиться сразу. Admin определяется
             * параллельно и не задерживает первый пользовательский интерфейс.
             */
            var featurePromise = Promise.resolve();
            if (isHallPage()) {
                featurePromise = I.ensureFeature('hall');
            } else if (isProfilePage()) {
                featurePromise = I.ensureFeature('profile');
            } else if (isAchievementsPage()) {
                featurePromise = I.ensureFeature('achievementsPage');
            }

            I.adminPermissionPromise = I.invoke('getUserInfo', []).then(function (userInfo) {
                return !!I.invoke('userCanAdmin', [userInfo]);
            }).catch(function (error) {
                console.warn('[Lofarian Achievements] Проверка Admin отложена:', error);
                return false;
            });

            return featurePromise.then(function () { return gateResult; });
        })
        .then(function (gateResult) {
            if (gateResult.lightOnly) {
                return gateResult;
            }
            var registry = root.LofarianAchievementsModuleRegistry;
            return I.loadPageScript(registry.core).then(function () {
                return gateResult;
            });
        })
        .then(function (gateResult) {
            if (gateResult.lightOnly) {
                return gateResult;
            }

            I.validateDependencies();

            if (!I.has('startApplication')) {
                throw new Error(
                    '[Lofarian Achievements] Engine/Core.js не зарегистрировал startApplication.'
                );
            }

            var applicationPromise = Promise.resolve(I.invoke('startApplication', []));

            /* Admin-функции не участвуют в первом рендере и догружаются после запуска UI. */
            Promise.resolve(I.adminPermissionPromise).then(function (canAdmin) {
                if (canAdmin) {
                    return I.ensureFeature('admin');
                }
                return null;
            }).catch(function (error) {
                console.warn('[Lofarian Achievements] Отложенная загрузка Admin пропущена:', error);
            });

            return applicationPromise;
        })
        .catch(function (error) {
            console.error(
                '[Lofarian Achievements] Ошибка модульной загрузки:',
                error
            );
            throw error;
        });
})(window);