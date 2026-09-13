/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC11.5 FAST CATALOG CACHE REVIEW READY
Страница Fandom: MediaWiki:LofarianAchievements/Services/Catalog.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Читает и валидирует индекс Project:LofarianAchievementsData и семь локальных частей каталога одним batch action=query; поддерживает старый монолитный формат.

ДАННЫЕ / I/O
Может по явной admin-команде защитить страницы каталога через обычный MediaWiki protection API.

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
- RC11.5 хранит только публичный текст страниц каталога в sessionStorage до 5 минут и localStorage до 10 минут как необязательный performance-cache; это не пользовательские/официальные данные, forceReload очищает оба кэша.

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

- RC11.5 кэширует только публичные страницы каталога кратковременно (sessionStorage 5 мин, localStorage 10 мин) и имеет timeout/fallback для медленного batch-чтения. Официальные пользовательские данные в этот кэш не попадают.

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
        throw new Error('[Lofarian Achievements] Runtime отсутствует: Services/Catalog');
    }

    var C = I.config || {};
    var STATE = I.state || {};
    var CATALOG_PAGE = C.CATALOG_PAGE;
    var CATALOG_PART_PAGES = C.CATALOG_PART_PAGES || [];
    var CATALOG_SESSION_CACHE_KEY = 'lof-achievements-catalog-pages-v1';
    var CATALOG_SESSION_CACHE_TTL_MS = 5 * 60 * 1000;
    var CATALOG_LOCAL_CACHE_KEY = 'lof-achievements-catalog-pages-local-v1';
    var CATALOG_LOCAL_CACHE_TTL_MS = 10 * 60 * 1000;
    var CATALOG_LOCAL_STALE_MAX_MS = 24 * 60 * 60 * 1000;
    var CATALOG_READ_TIMEOUT_MS = 6000;

    function cloneData() { return I.invoke('cloneData', arguments); }
    function extractJsonFromPage() { return I.invoke('extractJsonFromPage', arguments); }
    function isPlainObject() { return I.invoke('isPlainObject', arguments); }
    function protectTechnicalPage() { return I.invoke('protectTechnicalPage', arguments); }
    function readWikiPage() { return I.invoke('readWikiPage', arguments); }
    function readWikiPages() { return I.invoke('readWikiPages', arguments); }

    /*
     * Каталог TEST 1.16.3 может существовать в двух полностью совместимых видах:
     *
     * 1. старый монолитный Project:LofarianAchievementsData;
     * 2. модульный индекс Project:LofarianAchievementsData + локальные части
     *    Project:LofarianAchievementsData/Reading, /Editing и т. д.
     *
     * На выходе readCatalog() ВСЕГДА возвращает тот же единый объект каталога,
     * который ожидал монолит TEST 1.16.3. Engine/UI не знают, как он хранится.
     */

    function parseCatalogJson(title, content) {
        var jsonText = extractJsonFromPage(content);

        try {
            return JSON.parse(jsonText);
        } catch (error) {
            console.error(
                '[Lofarian Achievements] Некорректный JSON каталога на странице:',
                title,
                jsonText
            );

            throw new Error(
                'В ' + title + ' находится некорректный JSON.'
            );
        }
    }

    function validateCatalog(catalog) {
        if (!isPlainObject(catalog)) {
            throw new Error(
                'Каталог достижений должен быть JSON-объектом.'
            );
        }

        if (!catalog.schemaVersion) {
            catalog.schemaVersion = 1;
        }

        if (!catalog.defaultImage) {
            catalog.defaultImage = 'Достижение универсальное.png';
        }

        if (!isPlainObject(catalog.achievements)) {
            catalog.achievements = {};
        }

        if (!isPlainObject(catalog.families)) {
            catalog.families = {};
        }

        if (!isPlainObject(catalog.rarities)) {
            catalog.rarities = {};
        }

        if (!Array.isArray(catalog.rarityScale)) {
            catalog.rarityScale = [];
        }

        return catalog;
    }

    function normalizeCatalogPartDescriptor(value, index) {
        var descriptor;

        if (typeof value === 'string') {
            descriptor = {
                key: 'part-' + String(index + 1),
                page: value
            };
        } else if (isPlainObject(value)) {
            descriptor = {
                key: String(value.key || ('part-' + String(index + 1))),
                page: String(value.page || '')
            };
        } else {
            throw new Error(
                'Некорректное описание части каталога #' + String(index + 1) + '.'
            );
        }

        if (!descriptor.page) {
            throw new Error(
                'Для части каталога ' + descriptor.key + ' не указана MediaWiki-страница.'
            );
        }

        return descriptor;
    }

    function getCatalogPartDescriptors(manifest) {
        if (!manifest || !Array.isArray(manifest.parts)) {
            return [];
        }

        return manifest.parts.map(normalizeCatalogPartDescriptor);
    }

    function addFragmentMap(target, source, kind, pageTitle) {
        if (source === undefined || source === null) {
            return;
        }

        if (!isPlainObject(source)) {
            throw new Error(
                'Раздел ' + kind + ' на странице ' + pageTitle + ' должен быть JSON-объектом.'
            );
        }

        Object.keys(source).forEach(function (id) {
            if (Object.prototype.hasOwnProperty.call(target, id)) {
                throw new Error(
                    'Дублирующий ID ' + id + ' в модульном каталоге (' + pageTitle + ').'
                );
            }

            target[id] = source[id];
        });
    }

    function rebuildLegacyOrderedMap(source, legacyOrder, kind) {
        var result = {};
        var seen = {};

        if (Array.isArray(legacyOrder)) {
            legacyOrder.forEach(function (id) {
                id = String(id || '');

                if (!id) {
                    return;
                }

                if (!Object.prototype.hasOwnProperty.call(source, id)) {
                    throw new Error(
                        'В модульном каталоге отсутствует обязательный ' + kind + ': ' + id
                    );
                }

                result[id] = source[id];
                seen[id] = true;
            });
        }

        /*
         * Новые достижения/семейства, которых не было в legacyOrder TEST 1.16.3,
         * просто добавляются после старого набора. Поэтому в будущем для обычного
         * добавления записи достаточно изменить только соответствующую категорию.
         */
        Object.keys(source).forEach(function (id) {
            if (!seen[id]) {
                result[id] = source[id];
            }
        });

        return result;
    }

    function assembleModularCatalog(manifest, loadedParts) {
        var achievements = {};
        var families = {};

        loadedParts.forEach(function (item) {
            var fragment = item.fragment;

            if (!isPlainObject(fragment)) {
                throw new Error(
                    'Часть каталога ' + item.pageTitle + ' должна быть JSON-объектом.'
                );
            }

            addFragmentMap(
                achievements,
                fragment.achievements,
                'achievements',
                item.pageTitle
            );

            addFragmentMap(
                families,
                fragment.families,
                'families',
                item.pageTitle
            );
        });

        /*
         * Порядок старых ключей восстанавливается один в один с монолитом
         * TEST 1.16.3. Это важно, потому что Object.keys() в существующем UI
         * использует порядок вставки. Само разделение страниц не должно менять
         * порядок карточек или обход каталога.
         */
        achievements = rebuildLegacyOrderedMap(
            achievements,
            manifest.legacyAchievementOrder,
            'achievement'
        );

        families = rebuildLegacyOrderedMap(
            families,
            manifest.legacyFamilyOrder,
            'family'
        );

        /*
         * Создаём объект ровно в старой форме. Служебные parts/order-поля
         * существуют только на индексной MediaWiki-странице и наружу не выходят.
         */
        return {
            schemaVersion: manifest.schemaVersion,
            mode: manifest.mode,
            defaultImage: manifest.defaultImage,
            rarities: cloneData(manifest.rarities || {}),
            rarityScale: cloneData(manifest.rarityScale || []),
            achievements: achievements,
            families: families
        };
    }

    var FAMILY_THRESHOLD_CONFIG = {
        chronist: { key: 'CHRONIST_THRESHOLDS' },
        thoughtful_chronist: { key: 'THOUGHTFUL_THRESHOLDS' },
        letopisets: { key: 'LETOPISETS_THRESHOLDS' },
        zodchiy: { key: 'ZODCHIY_THRESHOLDS' },
        multigran: { key: 'MULTIGRAN_THRESHOLDS' },
        verny_letopisets: { key: 'VERNY_LETOPISETS_THRESHOLDS' },
        neutomimoe_pero: { key: 'NEUTOMIMOE_PERO_THRESHOLDS' },
        vozvrashchenie_k_letopisi: { key: 'VOZVRASHCHENIE_THRESHOLDS', multiplier: 86400 },
        chernilny_potok: { key: 'CHERNILNY_POTOK_THRESHOLDS' },
        chernilny_sled: { key: 'CHERNILNY_SLED_THRESHOLDS' },
        ruka_letopistsa: { key: 'RUKA_LETOPISTSA_THRESHOLDS' },
        hudozhnik: { key: 'HUDOZHNIK_THRESHOLDS' },
        starozhil: { key: 'STAROZHIL_THRESHOLDS_DAYS' },
        neslomlennaya_tsep: { key: 'NESLOMLENNAYA_TSEP_THRESHOLDS' },
        probuzhdayushchiy_stranitsy: { key: 'PROBUZHDAYUSHCHIY_THRESHOLDS' },
        ispravitel: { key: 'ISPRAVITEL_THRESHOLDS' },
        tkach_kategoriy: { key: 'TKACH_KATEGORIY_THRESHOLDS' },
        tkach_shablonov: { key: 'TKACH_SHABLONOV_THRESHOLDS' },
        arkhivarius: { key: 'ARKHIVARIUS_THRESHOLDS' },
        neutomimyy_zodchiy: { key: 'NEUTOMIMYY_ZODCHIY_THRESHOLDS' },
        hranitel_drevnostey: { key: 'HRANITEL_DREVNOSTEY_THRESHOLDS_DAYS' },
        comm_voice: { key: 'COMM_VOICE_THRESHOLDS' },
        comm_given_like: { key: 'COMM_GIVEN_LIKE_THRESHOLDS' },
        chronist_era_zarozhdeniya: { key: 'THEME_ARTICLE_THRESHOLDS' },
        thoughtful_era_zarozhdeniya: { key: 'THEME_TIME_THRESHOLDS' },
        chronist_era_drakona: { key: 'THEME_ARTICLE_THRESHOLDS' },
        thoughtful_era_drakona: { key: 'THEME_TIME_THRESHOLDS' },
        chronist_kevariytsy: { key: 'THEME_ARTICLE_THRESHOLDS' },
        thoughtful_kevariytsy: { key: 'THEME_TIME_THRESHOLDS' }
    };


    function syncArrayInPlace(target, values) {
        if (!Array.isArray(target) || !Array.isArray(values)) {
            return;
        }

        target.splice.apply(target, [0, target.length].concat(values));
    }


    function syncRuntimeThresholdsFromCatalog(catalog) {
        var families = catalog && catalog.families || {};
        var seenShared = Object.create(null);

        Object.keys(FAMILY_THRESHOLD_CONFIG).forEach(function (familyId) {
            var family = families[familyId];
            var spec = FAMILY_THRESHOLD_CONFIG[familyId];
            var target = C[spec.key];

            if (!family || !Array.isArray(family.thresholds) || !Array.isArray(target)) {
                return;
            }

            var multiplier = Number(spec.multiplier || 1);
            var values = family.thresholds.map(function (value) {
                return Number(value) * multiplier;
            });

            if (seenShared[spec.key]) {
                var previous = seenShared[spec.key];
                if (JSON.stringify(previous) !== JSON.stringify(values)) {
                    throw new Error(
                        'Семьи каталога, использующие общую runtime-шкалу ' +
                        spec.key + ', имеют разные thresholds.'
                    );
                }
                return;
            }

            seenShared[spec.key] = values.slice();
            syncArrayInPlace(target, values);
        });
    }


    function finalizeCatalog(catalog) {
        validateCatalog(catalog);
        syncRuntimeThresholdsFromCatalog(catalog);

        /*
         * Декларативные JS-модули могут только добавить ещё отсутствующие
         * определения. Существующие определения из Project:...Data не
         * перезаписываются и остаются источником совместимости TEST 1.16.3.
         */
        if (
            I.achievementRegistry &&
            typeof I.achievementRegistry.extendCatalog === 'function'
        ) {
            catalog = I.achievementRegistry.extendCatalog(catalog);
        }

        STATE.catalogCache = cloneData(catalog);

        return cloneData(catalog);
    }


    function loadCatalogPagesFromSession() {
        try {
            var raw = root.sessionStorage && root.sessionStorage.getItem(CATALOG_SESSION_CACHE_KEY);
            if (!raw) { return null; }
            var parsed = JSON.parse(raw);
            if (!parsed || !Array.isArray(parsed.pages)) { return null; }
            if ((Date.now() - Number(parsed.savedAt || 0)) > CATALOG_SESSION_CACHE_TTL_MS) {
                root.sessionStorage.removeItem(CATALOG_SESSION_CACHE_KEY);
                return null;
            }
            return parsed.pages;
        } catch (error) {
            return null;
        }
    }

    function saveCatalogPagesToSession(pages) {
        try {
            if (!root.sessionStorage) { return; }
            var compact = (pages || []).map(function (page) {
                return {
                    requestedTitle: page && page.requestedTitle,
                    title: page && page.title,
                    exists: !!(page && page.exists),
                    content: String(page && page.content || '')
                };
            });
            root.sessionStorage.setItem(CATALOG_SESSION_CACHE_KEY, JSON.stringify({
                savedAt: Date.now(),
                pages: compact
            }));
        } catch (error) {
            /* sessionStorage — только необязательный performance cache. */
        }
    }

    function loadCatalogPagesFromLocal(allowStale) {
        try {
            var raw = root.localStorage && root.localStorage.getItem(CATALOG_LOCAL_CACHE_KEY);
            if (!raw) { return null; }
            var parsed = JSON.parse(raw);
            if (!parsed || !Array.isArray(parsed.pages)) { return null; }
            var age = Date.now() - Number(parsed.savedAt || 0);
            if (age > CATALOG_LOCAL_STALE_MAX_MS) {
                root.localStorage.removeItem(CATALOG_LOCAL_CACHE_KEY);
                return null;
            }
            if (!allowStale && age > CATALOG_LOCAL_CACHE_TTL_MS) {
                return null;
            }
            return parsed.pages;
        } catch (error) {
            return null;
        }
    }

    function saveCatalogPagesToLocal(pages) {
        try {
            if (!root.localStorage) { return; }
            var compact = (pages || []).map(function (page) {
                return {
                    requestedTitle: page && page.requestedTitle,
                    title: page && page.title,
                    exists: !!(page && page.exists),
                    content: String(page && page.content || '')
                };
            });
            root.localStorage.setItem(CATALOG_LOCAL_CACHE_KEY, JSON.stringify({
                savedAt: Date.now(),
                pages: compact
            }));
        } catch (error) {
            /* Публичный performance-cache необязателен. */
        }
    }

    function withCatalogTimeout(promise, timeoutMs) {
        var timer = null;
        return Promise.race([
            promise,
            new Promise(function (resolve, reject) {
                timer = root.setTimeout(function () {
                    reject(new Error('Каталог не ответил за ' + String(timeoutMs) + ' мс.'));
                }, timeoutMs);
            })
        ]).then(function (value) {
            if (timer) { root.clearTimeout(timer); }
            return value;
        }, function (error) {
            if (timer) { root.clearTimeout(timer); }
            throw error;
        });
    }

    function readCatalogPagesNetwork(titles) {
        return withCatalogTimeout(readWikiPages(titles), CATALOG_READ_TIMEOUT_MS)
            .catch(function (firstError) {
                /*
                 * Fallback only after a slow/failed large batch: split into two
                 * smaller same-site MediaWiki API requests in parallel. This
                 * avoids keeping the page loader hanging on one oversized answer.
                 */
                var chunks = [];
                for (var i = 0; i < titles.length; i += 4) {
                    chunks.push(titles.slice(i, i + 4));
                }
                return Promise.all(chunks.map(function (chunk) {
                    return withCatalogTimeout(readWikiPages(chunk), 8000);
                })).then(function (rows) {
                    return rows.reduce(function (all, row) {
                        return all.concat(row || []);
                    }, []);
                }).catch(function () {
                    throw firstError;
                });
            });
    }

    function readInitialCatalogPages(titles, forceReload) {
        if (!forceReload) {
            var cached = loadCatalogPagesFromSession();
            if (cached && cached.length) {
                return Promise.resolve(cached);
            }

            cached = loadCatalogPagesFromLocal();
            if (cached && cached.length) {
                saveCatalogPagesToSession(cached);
                return Promise.resolve(cached);
            }
        }

        return readCatalogPagesNetwork(titles)
            .then(function (pages) {
                saveCatalogPagesToSession(pages);
                saveCatalogPagesToLocal(pages);
                return pages;
            })
            .catch(function (error) {
                var stale = loadCatalogPagesFromLocal(true);
                if (stale && stale.length) {
                    console.warn('[Lofarian Achievements] Используется последний публичный кэш каталога после медленного ответа API:', error);
                    saveCatalogPagesToSession(stale);
                    return stale;
                }
                throw error;
            });
    }

    function readCatalog(forceReload) {
        if (forceReload) {
            try {
                if (root.sessionStorage) { root.sessionStorage.removeItem(CATALOG_SESSION_CACHE_KEY); }
                if (root.localStorage) { root.localStorage.removeItem(CATALOG_LOCAL_CACHE_KEY); }
            } catch (error) {}
        }
        if (STATE.catalogCache && !forceReload) {
            return Promise.resolve(
                cloneData(STATE.catalogCache)
            );
        }

        var initialTitles = [CATALOG_PAGE].concat(
            CATALOG_PART_PAGES || []
        );

        return readInitialCatalogPages(initialTitles, forceReload).then(function (initialPages) {
            var rootPage = initialPages[0];

            if (!rootPage || !rootPage.exists) {
                throw new Error(
                    'Не существует каталог: ' + CATALOG_PAGE
                );
            }

            var rootCatalog = parseCatalogJson(
                CATALOG_PAGE,
                rootPage.content
            );

            var descriptors = getCatalogPartDescriptors(rootCatalog);

            /* Старый монолит TEST 1.16.3 продолжает читаться без миграции. */
            if (!descriptors.length) {
                return finalizeCatalog(rootCatalog);
            }

            var pageMap = Object.create(null);

            initialPages.forEach(function (page) {
                var key = String(
                    page && (page.requestedTitle || page.title) || ''
                ).replace(/_/g, ' ').trim().toLowerCase();

                if (key) {
                    pageMap[key] = page;
                }
            });

            var missingTitles = [];

            descriptors.forEach(function (descriptor) {
                var key = String(descriptor.page || '')
                    .replace(/_/g, ' ')
                    .trim()
                    .toLowerCase();

                if (!pageMap[key]) {
                    missingTitles.push(descriptor.page);
                }
            });

            var extraPromise = missingTitles.length
                ? withCatalogTimeout(readWikiPages(missingTitles), CATALOG_READ_TIMEOUT_MS)
                : Promise.resolve([]);

            return extraPromise.then(function (extraPages) {
                extraPages.forEach(function (page) {
                    var key = String(
                        page && (page.requestedTitle || page.title) || ''
                    ).replace(/_/g, ' ').trim().toLowerCase();

                    if (key) {
                        pageMap[key] = page;
                    }
                });

                var loadedParts = descriptors.map(function (descriptor) {
                    var key = String(descriptor.page || '')
                        .replace(/_/g, ' ')
                        .trim()
                        .toLowerCase();
                    var partPage = pageMap[key];

                    if (!partPage || !partPage.exists) {
                        throw new Error(
                            'Не существует обязательная часть каталога: ' + descriptor.page
                        );
                    }

                    return {
                        key: descriptor.key,
                        pageTitle: descriptor.page,
                        fragment: parseCatalogJson(
                            descriptor.page,
                            partPage.content
                        )
                    };
                });

                return finalizeCatalog(
                    assembleModularCatalog(
                        rootCatalog,
                        loadedParts
                    )
                );
            });
        });
    }

    function getCatalogPageTitles() {
        return readWikiPage(CATALOG_PAGE).then(function (page) {
            if (!page.exists) {
                throw new Error(
                    'Не существует каталог: ' + CATALOG_PAGE
                );
            }

            var manifest = parseCatalogJson(
                CATALOG_PAGE,
                page.content
            );

            var result = [CATALOG_PAGE];

            getCatalogPartDescriptors(manifest).forEach(function (descriptor) {
                if (result.indexOf(descriptor.page) < 0) {
                    result.push(descriptor.page);
                }
            });

            return result;
        });
    }

    function protectCatalogPages() {
        return getCatalogPageTitles().then(function (titles) {
            return Promise.all(
                titles.map(function (title) {
                    return protectTechnicalPage(title);
                })
            ).then(function () {
                console.log(
                    '[Lofarian Achievements] Защищены страницы каталога:',
                    titles
                );

                return titles;
            });
        });
    }

    I.registerFunctions('Services/Catalog', {
        validateCatalog: validateCatalog,
        readCatalog: readCatalog,
        getCatalogPageTitles: getCatalogPageTitles,
        protectCatalogPages: protectCatalogPages
    }, [
        'cloneData',
        'extractJsonFromPage',
        'isPlainObject',
        'protectTechnicalPage',
        'readWikiPage',
        'readWikiPages'
    ]);
})(window);