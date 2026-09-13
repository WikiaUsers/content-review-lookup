/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC11.9.2 SERIES + MYTHIC TYPOGRAPHY HOTFIX
Страница Fandom: MediaWiki:LofarianAchievements/UI/AchievementsPage.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Оформляет обычную Project-страницу «Достижения» как интерактивный каталог
Lofarian Achievements: показывает сводку, поиск, фильтры, логические карточки
достижений и единое окно подробностей по клику. Уровневые цепочки I–C показываются одной
карточкой серии, а не сотней одновременно, чтобы интерфейс и DOM оставались
компактными.

ДАННЫЕ / I/O
- Использует уже загруженный локальный каталог Project:LofarianAchievementsData/*.
- Для участника может выполнить один read-only запрос к его Users-сегменту,
  чтобы визуально отметить уже официально полученные награды и раскрыть условие
  скрытого достижения, которое уже записано в защищённом хранилище.
- Для гостей и неучастников персональная статистика не рассчитывается и не пишется.
- Иконки не блокируют первый рендер: карточки получают same-wiki Special:Redirect/file сразу; существующий стандартный MediaWiki resolver используется только как fallback при ошибке конкретного файла.

ПРИВАТНОСТЬ И БЕЗОПАСНОСТЬ
- Файл ничего не записывает в Users/Progress и не выдаёт достижения.
- Нет внешних серверов, трекеров, eval/new Function, обфускации или удалённого JS.
- Не изменяет системные группы/права Fandom, рекламу и глобальную навигацию.
- Скрытые условия неучастнику/неполучившему пользователю не раскрываются.

ПРОИЗВОДИТЕЛЬНОСТЬ
- Модуль загружается только на странице «Достижения».
- 29 уровневых семейств сворачиваются в 29 логических карточек вместо тысяч
  сгенерированных ступеней; поиск/фильтрация выполняются локально по этой
  компактной коллекции.
- RC11.9.1 показывает по 20 логических карточек на страницу, использует тот же popup подробностей UI/Cards, что и «Все достижения» профиля, а загрузка иконок полностью отделена от критического пути рендера.
===============================================================================
*/
(function (root) {
    'use strict';

    var I = root.__LofarianAchievementsInternal;
    if (!I) { throw new Error('[Lofarian Achievements] Runtime отсутствует: UI/AchievementsPage'); }

    var ACHIEVEMENTS_PAGE = 'Летопись Лофариана Вики:Достижения';
    var HALL_PAGE = (I.config && I.config.HALL_PAGE) || 'Project:Зал славы';
    var activeCatalog = null;
    var showcaseKeys = null;

    function getAchievementLoreDescription() { return I.invoke('getAchievementLoreDescription', arguments); }
    function setRarityLabel() { return I.invoke('setRarityLabel', arguments); }

    function escapeHtml() { return I.invoke('escapeHtml', arguments); }
    function getAchievement() { return I.invoke('getAchievement', arguments); }
    function getRarityInfo() { return I.invoke('getRarityInfo', arguments); }
    function getAchievementVisualCategory() { return I.invoke('getAchievementVisualCategory', arguments); }
    function getAchievementCategoryTitle() { return I.invoke('getAchievementCategoryTitle', arguments); }
    function getCurrentUserId() { return I.invoke('getCurrentUserId', arguments); }
    function readUserSegment() { return I.invoke('readUserSegment', arguments); }
    function getUserAchievementMap() { return I.invoke('getUserAchievementMap', arguments); }
    function getHiddenUnlockedDescription() { return I.invoke('getHiddenUnlockedDescription', arguments); }
    function getAchievementTierLabel() { return I.invoke('getAchievementTierLabel', arguments); }
    function resolveAchievementImage() { return I.invoke('resolveAchievementImage', arguments); }
    function applyResolvedImageToElement() { return I.invoke('applyResolvedImageToElement', arguments); }
    function openAchievementDetailsModal() { return I.invoke('openAchievementDetailsModal', arguments); }

    var PAGE_SIZE = 20;

    /*
     * Небольшие мета-цепочки раньше лежали в каталоге отдельными I/II/III
     * достижениями. На публичной странице они показываются как одна растущая
     * серия — так же, как обычные family-цепочки. Сами achievement ID и
     * условия в каталоге не меняются.
     */
    var VIRTUAL_SERIES = [
        {
            id: 'achievement_collector',
            title: 'Собиратель наград',
            ids: [
                'achievement_collector_5',
                'achievement_collector_10',
                'achievement_collector_25',
                'achievement_collector_50',
                'achievement_collector_75',
                'achievement_collector_100'
            ],
            imageId: 'achievement_collector_50'
        },
        {
            id: 'meta_award_archive',
            title: 'Архив наград',
            ids: ['meta_award_archive_10', 'meta_award_archive_25', 'meta_award_archive_50'],
            imageId: 'meta_award_archive_50'
        },
        {
            id: 'meta_harvest_day',
            title: 'Урожайный день',
            ids: ['meta_harvest_day_3', 'meta_harvest_day_5', 'meta_harvest_day_10']
        },
        {
            id: 'meta_trophy_shelf',
            title: 'Полка трофеев',
            ids: ['meta_trophy_shelf_5', 'meta_trophy_shelf_10', 'meta_trophy_shelf_20']
        },
        {
            id: 'comm_approval',
            title: 'Одобрено сообществом',
            ids: [
                'comm_approval_1',
                'comm_approval_5',
                'comm_approval_10',
                'comm_approval_25',
                'comm_approval_50',
                'comm_approval_100'
            ]
        }
    ];

    var RARITY_DESCRIPTIONS = {
        common: [
            'Обычная — первая и самая доступная ступень редкости. Такие достижения знакомят с системой и отмечают действия, которые естественно происходят во время чтения, первых правок и знакомства с вики.',
            'Они не считаются «маловажными»: именно из обычных наград начинается коллекция. Их задача — показать принцип системы без необходимости специально охотиться за сложными условиями.'
        ],
        unusual: [
            'Необычная редкость появляется там, где одного случайного действия уже мало. Обычно требуется небольшой накопленный прогресс, повторение действия или чуть более конкретный маршрут по вики.',
            'Это всё ещё ранняя часть коллекции, но такие награды уже показывают, что участник не просто заглянул один раз, а начал оставлять собственную историю.'
        ],
        notable: [
            'Примечательная редкость отмечает заметные рубежи. Условия становятся ощутимее: нужно больше прочитанного, больше вклада или последовательность действий, которая уже выделяется на фоне самого начала.',
            'Такие награды хорошо показывают переход от знакомства с системой к настоящему прогрессу.'
        ],
        special: [
            'Особая редкость предназначена для условий, которые хуже укладываются в обычный счётчик. Это может быть определённый тип активности, необычное сочетание действий или отдельный эпизод пути.',
            'Поэтому две особые награды могут сильно отличаться друг от друга: редкость говорит не только о сложности, но и о необычности самого условия.'
        ],
        rare: [
            'Редкая награда уже требует серьёзного рубежа или события, которое происходит далеко не у каждого участника. Здесь случайного знакомства с системой обычно недостаточно.',
            'Такие достижения становятся заметной частью коллекции: они показывают либо продолжительный прогресс, либо достаточно редкий сценарий поведения на вики.'
        ],
        outstanding: [
            'Выдающаяся редкость открывается на высоких этапах прогресса. Это награды для тех случаев, когда вклад, чтение или активность уже трудно назвать обычными.',
            'Именно с этой ступени коллекция начинает особенно хорошо отражать индивидуальный путь участника: одинаковые наборы наград встречаются всё реже.'
        ],
        superior: [
            'Превосходная редкость отмечает крупные и труднодостижимые рубежи. Обычно за ней стоит значительный объём работы, долгий путь по серии или редкое сочетание уже полученных наград.',
            'Получение такой награды — не промежуточная мелочь, а отдельный этап, который заметен даже в большой коллекции.'
        ],
        exceptional: [
            'Исключительная редкость предназначена для действительно необычных результатов. Условия здесь либо очень высоки, либо требуют сценария, который сложно выполнить случайно.',
            'Такие достижения отделяют просто активную коллекцию от коллекции, в которой уже появились редкие личные истории.'
        ],
        unique: [
            'Уникальная редкость встречается у небольшой части участников. Она отмечает условия, для которых требуется серьёзная последовательность, редкое событие или глубокое продвижение по системе.',
            'Название редкости не означает, что награда существует в единственном экземпляре: оно подчёркивает, насколько необычным считается сам путь к ней.'
        ],
        exotic: [
            'Экзотические награды появляются на крайне необычных сочетаниях условий или очень высоких значениях прогресса. Они специально расположены почти у вершины шкалы.',
            'В большой коллекции такая печать сразу выделяется: чаще всего за ней стоит история, которую трудно повторить одним коротким заходом на вики.'
        ],
        relic: [
            'Реликтовая — первая редкость III градации. Это территория тяжёлых рубежей, где система уже отмечает исключительный объём пройденного пути.',
            'Реликтовые награды рассчитаны на долгую дистанцию. Их появление в коллекции показывает, что участник добрался до верхней части всей шкалы достижений.'
        ],
        legendary: [
            'Легендарная редкость стоит почти на вершине системы. Её получают за результаты, которые остаются заметными даже среди самых активных участников и самых заполненных коллекций.',
            'Такая награда должна ощущаться событием сама по себе: за ней обычно стоит завершённая длинная дорога, крупный рубеж или очень редкая комбинация достижений.'
        ],
        mythic: [
            'Мифическая — высшая редкость системы достижений. Она предназначена для самых трудных, самых редких или наиболее необычных условий, которые существуют в каталоге.',
            'Мифическая печать не обязана быть последней наградой пользователя, но каждая такая награда должна оставаться отдельным событием в коллекции. Именно поэтому её название и оформление выделены сильнее всех остальных редкостей.'
        ]
    };

    function isAchievementsPage() {
        return Number(mw.config.get('wgNamespaceNumber')) === 4 &&
            String(mw.config.get('wgTitle') || '').trim() === 'Достижения';
    }

    function fileUrl(name) {
        name = String(name || '').trim();
        if (!name) { return ''; }
        return mw.util.getUrl('Special:Redirect/file/' + name);
    }

    var THUMB_CACHE_STORAGE_KEY = 'lof-achievements-page-thumb-cache-v2';
    var thumbnailCache = {};
    var thumbnailQueue = {};
    var thumbnailTimer = null;

    try {
        var savedThumbs = JSON.parse(root.sessionStorage.getItem(THUMB_CACHE_STORAGE_KEY) || '{}');
        if (savedThumbs && typeof savedThumbs === 'object') { thumbnailCache = savedThumbs; }
    } catch (ignoreThumbCacheRead) {}

    function imageCacheKey(name) {
        return String(name || '')
            .replace(/^(?:Файл|File)\s*:\s*/i, '')
            .replace(/_/g, ' ')
            .trim()
            .toLocaleLowerCase('ru');
    }

    function rememberThumbnail(name, url) {
        var key = imageCacheKey(name);
        if (!key || !url) { return; }
        thumbnailCache[key] = String(url);
        try {
            var keys = Object.keys(thumbnailCache);
            if (keys.length > 240) {
                keys.slice(0, keys.length - 200).forEach(function (oldKey) {
                    delete thumbnailCache[oldKey];
                });
            }
            root.sessionStorage.setItem(THUMB_CACHE_STORAGE_KEY, JSON.stringify(thumbnailCache));
        } catch (ignoreThumbCacheWrite) {}
    }

    function flushThumbnailQueue() {
        thumbnailTimer = null;
        var keys = Object.keys(thumbnailQueue).slice(0, 40);
        if (!keys.length) { return; }

        var batch = {};
        var names = [];
        keys.forEach(function (key) {
            batch[key] = thumbnailQueue[key];
            delete thumbnailQueue[key];
            names.push(batch[key].name);
        });

        var localApi = new mw.Api();
        Promise.resolve(localApi.get({
            action: 'query',
            prop: 'imageinfo',
            titles: names.map(function (name) { return 'File:' + name; }).join('|'),
            iiprop: 'url',
            iiurlwidth: 128,
            redirects: 1,
            formatversion: 2
        })).then(function (data) {
            var found = {};
            var query = data && data.query || {};
            (query.pages || []).forEach(function (page) {
                if (!page || page.missing || !page.imageinfo || !page.imageinfo.length) { return; }
                var url = page.imageinfo[0].thumburl || page.imageinfo[0].url || '';
                var titleKey = imageCacheKey(page.title || '');
                if (titleKey && url) { found[titleKey] = url; }
            });

            (query.redirects || []).forEach(function (redirect) {
                var fromKey = imageCacheKey(redirect.from || '');
                var toKey = imageCacheKey(redirect.to || '');
                if (fromKey && toKey && found[toKey]) { found[fromKey] = found[toKey]; }
            });

            keys.forEach(function (key) {
                var entry = batch[key];
                var url = found[key] || '';
                if (url) {
                    rememberThumbnail(entry.name, url);
                    entry.resolve(url);
                } else {
                    entry.reject(new Error('Thumbnail не найден: ' + entry.name));
                }
            });
        }).catch(function (error) {
            keys.forEach(function (key) { batch[key].reject(error); });
        }).then(function () {
            if (Object.keys(thumbnailQueue).length && !thumbnailTimer) {
                thumbnailTimer = root.setTimeout(flushThumbnailQueue, 0);
            }
        });
    }

    function requestThumbnail(name) {
        name = String(name || '').trim();
        var key = imageCacheKey(name);
        if (!key) { return Promise.reject(new Error('Не указано изображение.')); }
        if (thumbnailCache[key]) { return Promise.resolve(thumbnailCache[key]); }
        if (thumbnailQueue[key]) { return thumbnailQueue[key].promise; }

        var resolvePromise;
        var rejectPromise;
        var promise = new Promise(function (resolve, reject) {
            resolvePromise = resolve;
            rejectPromise = reject;
        });
        thumbnailQueue[key] = {
            name: name,
            promise: promise,
            resolve: resolvePromise,
            reject: rejectPromise
        };
        if (!thumbnailTimer) { thumbnailTimer = root.setTimeout(flushThumbnailQueue, 0); }
        return promise;
    }

    function loadOfficialViewerMap() {
        if (!I.participation || I.participation.active !== true) {
            return Promise.resolve({});
        }

        var userId = Number(getCurrentUserId() || 0);
        if (!userId) { return Promise.resolve({}); }

        return readUserSegment(userId, false)
            .then(function (segment) {
                return getUserAchievementMap(segment && segment.data, userId) || {};
            })
            .catch(function (error) {
                console.warn('[Lofarian Achievements] Не удалось отметить полученные награды в каталоге:', error);
                return {};
            });
    }

    function familyEarned(map, familyId) {
        var prefix = String(familyId || '') + '_';
        return Object.keys(map || {}).some(function (id) {
            return id.indexOf(prefix) === 0 && Number(map[id] || 0) > 0;
        });
    }

    function logicalItems(catalog, earnedMap) {
        var result = [];
        var virtualSeriesIds = {};
        VIRTUAL_SERIES.forEach(function (series) {
            (series.ids || []).forEach(function (id) { virtualSeriesIds[id] = true; });
        });

        Object.keys(catalog.achievements || {}).forEach(function (id) {
            if (virtualSeriesIds[id]) { return; }
            var achievement = getAchievement(catalog, id);
            if (!achievement) { return; }
            var rarity = getRarityInfo(catalog, achievement);
            var category = getAchievementVisualCategory(id, achievement);
            var earned = Number(earnedMap[id] || 0) > 0;
            var hidden = achievement.hidden === true || achievement.secret === true;
            var condition = hidden && !earned
                ? 'Условие засекречено.'
                : (hidden ? getHiddenUnlockedDescription(id, achievement.description) : String(achievement.description || ''));
            var flavor = getAchievementLoreDescription(achievement, {
                id: id,
                title: achievement.title || id,
                categoryKey: category,
                hidden: hidden,
                earned: earned,
                type: 'achievement',
                description: condition
            });

            result.push({
                key: 'achievement:' + id,
                id: id,
                type: 'achievement',
                title: String(achievement.title || id),
                description: flavor,
                condition: condition,
                image: String(achievement.image || catalog.defaultImage || ''),
                points: Math.max(0, Math.floor(Number(achievement.points) || 0)),
                hidden: hidden,
                earned: earned,
                category: category,
                rarity: rarity,
                rarityKeys: [rarity.key],
                achievement: achievement
            });
        });

        VIRTUAL_SERIES.forEach(function (series) {
            var tiers = (series.ids || []).map(function (id) {
                return getAchievement(catalog, id);
            }).filter(Boolean);
            if (!tiers.length) { return; }

            var first = tiers[0];
            var last = tiers[tiers.length - 1];
            var displayAchievement = series.imageId ? getAchievement(catalog, series.imageId) : first;
            if (!displayAchievement) { displayAchievement = first; }
            var firstId = String(series.ids[0] || first.id || '');
            var lastId = String(series.ids[series.ids.length - 1] || last.id || '');
            var firstRarity = getRarityInfo(catalog, first);
            var lastRarity = getRarityInfo(catalog, last);
            var category = getAchievementVisualCategory(firstId, first);
            var rarityKeys = [];

            tiers.forEach(function (tier) {
                var rarity = getRarityInfo(catalog, tier);
                if (rarityKeys.indexOf(rarity.key) === -1) { rarityKeys.push(rarity.key); }
            });

            var earned = (series.ids || []).some(function (id) {
                return Number(earnedMap[id] || 0) > 0;
            });
            var hidden = tiers.some(function (tier) {
                return tier.hidden === true || tier.secret === true;
            });
            var condition = hidden && !earned
                ? 'Условие засекречено.'
                : ('Растущая серия из ' + tiers.length + ' ступеней. Первый рубеж: ' + String(first.description || '') + ' Высший рубеж: ' + String(last.description || ''));
            var flavor = getAchievementLoreDescription(first, {
                id: series.id,
                loreTitle: series.title,
                title: series.title,
                categoryKey: category,
                hidden: hidden,
                earned: earned,
                type: 'family',
                description: condition
            });

            result.push({
                key: 'family:' + series.id,
                id: series.id,
                type: 'family',
                title: String(series.title),
                description: flavor,
                condition: condition,
                /* RC11.9.12: сводная карточка серии использует универсальный знак. */
                image: String(catalog.defaultImage || 'Достижение универсальное.png'),
                useUniversalImage: true,
                points: 0,
                hidden: hidden,
                earned: earned,
                category: category,
                rarity: firstRarity,
                lastRarity: lastRarity,
                rarityKeys: rarityKeys,
                levels: tiers.length,
                first: first,
                last: last,
                family: { title: series.title, virtual: true },
                achievement: displayAchievement,
                virtualIds: series.ids.slice()
            });
        });

        Object.keys(catalog.families || {}).forEach(function (familyId) {
            var family = catalog.families[familyId];
            if (!family || !Array.isArray(family.thresholds) || !family.thresholds.length) { return; }

            var firstId = familyId + '_01';
            var lastId = familyId + '_' + String(family.thresholds.length).padStart(2, '0');
            var first = getAchievement(catalog, firstId);
            var last = getAchievement(catalog, lastId);
            if (!first || !last) { return; }

            var firstRarity = getRarityInfo(catalog, first);
            var lastRarity = getRarityInfo(catalog, last);
            var category = getAchievementVisualCategory(firstId, first);
            var rarityKeys = [];

            for (var level = 1; level <= family.thresholds.length; level++) {
                var tier = getAchievement(catalog, familyId + '_' + String(level).padStart(2, '0'));
                if (!tier) { continue; }
                var rarity = getRarityInfo(catalog, tier);
                if (rarityKeys.indexOf(rarity.key) === -1) { rarityKeys.push(rarity.key); }
            }

            var earned = familyEarned(earnedMap, familyId);
            var hidden = family.hidden === true || family.secret === true;
            var condition = hidden && !earned
                ? 'Условие засекречено.'
                : ('Уровневая серия из ' + family.thresholds.length + ' ступеней. Первая ступень: ' + String(first.description || ''));
            var flavor = getAchievementLoreDescription(first, {
                id: familyId,
                loreTitle: family.title || familyId,
                categoryKey: category,
                hidden: hidden,
                earned: earned,
                type: 'family',
                description: condition
            });

            result.push({
                key: 'family:' + familyId,
                id: familyId,
                type: 'family',
                title: String(family.title || familyId),
                description: flavor,
                condition: condition,
                image: String(first.image || family.image || catalog.defaultImage || ''),
                points: 0,
                hidden: hidden,
                earned: earned,
                category: category,
                rarity: firstRarity,
                lastRarity: lastRarity,
                rarityKeys: rarityKeys,
                levels: family.thresholds.length,
                first: first,
                last: last,
                family: family
            });
        });

        return result.sort(function (a, b) {
            var categoryCompare = String(a.category).localeCompare(String(b.category), 'ru');
            if (categoryCompare) { return categoryCompare; }
            var rarityCompare = Number(a.rarity.order || 0) - Number(b.rarity.order || 0);
            if (rarityCompare) { return rarityCompare; }
            return String(a.title).localeCompare(String(b.title), 'ru');
        });
    }

    function makeStat(value, label) {
        var node = document.createElement('div');
        node.className = 'lof-achievements-hub-stat';
        node.innerHTML = '<strong>' + escapeHtml(String(value)) + '</strong><span>' + escapeHtml(label) + '</span>';
        return node;
    }

    function buildHero(items, catalog) {
        var hero = document.createElement('section');
        hero.className = 'lof-achievements-hub-hero';

        var hiddenCount = items.filter(function (item) { return item.hidden; }).length;
        var familyCount = items.filter(function (item) { return item.type === 'family'; }).length;
        var directCount = items.length - familyCount;

        hero.innerHTML =
            '<div class="lof-achievements-hub-hero-copy">' +
                '<div class="lof-achievements-hub-kicker">ЛЕТОПИСЬ ЛОФАРИАНА</div>' +
                '<h2>Все достижения</h2>' +
                '<p>Полный каталог системы. Ищите награды по названию, категории и редкости; нажмите на карточку, чтобы открыть подробности.</p>' +
            '</div>' +
            '<a class="lof-achievements-hub-hall" href="' + escapeHtml(mw.util.getUrl(HALL_PAGE)) + '">Зал славы →</a>';

        var stats = document.createElement('div');
        stats.className = 'lof-achievements-hub-stats';
        stats.appendChild(makeStat(items.length, 'достижений и серий'));
        stats.appendChild(makeStat(directCount, 'одиночных'));
        stats.appendChild(makeStat(familyCount, 'уровневых серий'));
        stats.appendChild(makeStat(hiddenCount, 'скрытых'));
        hero.appendChild(stats);

        return hero;
    }

    function buildToolbar(catalog, state, render) {
        var toolbar = document.createElement('div');
        toolbar.className = 'lof-achievements-hub-toolbar';

        var search = document.createElement('input');
        search.type = 'search';
        search.className = 'lof-achievements-hub-search';
        search.placeholder = 'Найти достижение…';
        search.setAttribute('aria-label', 'Поиск достижений');
        search.addEventListener('input', function () {
            state.query = String(search.value || '').trim().toLowerCase();
            state.page = 1;
            render();
        });
        toolbar.appendChild(search);

        /*
         * RC11.9.9: системные <select> заменены на собственные выпадающие
         * меню. Так раскрытый список оформляется в стиле Летописи, а не
         * стандартным меню браузера/Windows.
         */
        function makeDropdown(stateKey, ariaLabel, options) {
            var wrap = document.createElement('div');
            wrap.className = 'lof-achievements-hub-dropdown';
            wrap.setAttribute('data-filter-key', stateKey);

            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'lof-achievements-hub-dropdown-button';
            button.setAttribute('aria-label', ariaLabel);
            button.setAttribute('aria-haspopup', 'listbox');
            button.setAttribute('aria-expanded', 'false');

            var labelCopy = document.createElement('span');
            labelCopy.className = 'lof-achievements-hub-dropdown-copy';

            var labelKind = document.createElement('span');
            labelKind.className = 'lof-achievements-hub-dropdown-kind';
            labelKind.textContent = ariaLabel;

            var label = document.createElement('span');
            label.className = 'lof-achievements-hub-dropdown-label';

            labelCopy.appendChild(labelKind);
            labelCopy.appendChild(label);

            var chevron = document.createElement('span');
            chevron.className = 'lof-achievements-hub-dropdown-chevron';
            chevron.setAttribute('aria-hidden', 'true');
            chevron.textContent = '⌄';

            button.appendChild(labelCopy);
            button.appendChild(chevron);

            var menu = document.createElement('div');
            menu.className = 'lof-achievements-hub-dropdown-menu';
            menu.setAttribute('role', 'listbox');
            menu.hidden = true;

            var menuTitle = document.createElement('div');
            menuTitle.className = 'lof-achievements-hub-dropdown-menu-title';
            menuTitle.textContent = ariaLabel;
            menu.appendChild(menuTitle);

            function selectedOption() {
                var current = String(state[stateKey] == null ? '' : state[stateKey]);
                return options.filter(function (item) {
                    return String(item[0]) === current;
                })[0] || options[0];
            }

            function sync() {
                var selected = selectedOption();
                label.textContent = selected ? selected[1] : '';
                Array.prototype.forEach.call(
                    menu.querySelectorAll('.lof-achievements-hub-dropdown-option'),
                    function (optionNode) {
                        var active = optionNode.getAttribute('data-value') === String(state[stateKey]);
                        optionNode.classList.toggle('is-active', active);
                        optionNode.setAttribute('aria-selected', active ? 'true' : 'false');
                    }
                );
            }

            function closeMenu() {
                menu.hidden = true;
                wrap.classList.remove('is-open');
                button.setAttribute('aria-expanded', 'false');
                document.removeEventListener('mousedown', onDocumentMouseDown, true);
            }

            function onDocumentMouseDown(event) {
                if (!wrap.contains(event.target)) {
                    closeMenu();
                }
            }

            function openMenu() {
                menu.hidden = false;
                wrap.classList.add('is-open');
                button.setAttribute('aria-expanded', 'true');
                document.addEventListener('mousedown', onDocumentMouseDown, true);
            }

            options.forEach(function (item) {
                var option = document.createElement('button');
                option.type = 'button';
                option.className = 'lof-achievements-hub-dropdown-option';
                option.setAttribute('role', 'option');
                option.setAttribute('data-value', String(item[0]));

                var optionText = document.createElement('span');
                optionText.className = 'lof-achievements-hub-dropdown-option-text';
                optionText.textContent = item[1];

                var check = document.createElement('span');
                check.className = 'lof-achievements-hub-dropdown-check';
                check.setAttribute('aria-hidden', 'true');
                check.textContent = '✓';

                option.appendChild(optionText);
                option.appendChild(check);

                option.addEventListener('click', function () {
                    state[stateKey] = item[0];
                    state.page = 1;
                    sync();
                    closeMenu();
                    render();
                    button.focus();
                });

                menu.appendChild(option);
            });

            button.addEventListener('click', function () {
                if (menu.hidden) {
                    openMenu();
                } else {
                    closeMenu();
                }
            });

            button.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') {
                    closeMenu();
                    return;
                }
                if ((event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') && menu.hidden) {
                    event.preventDefault();
                    openMenu();
                    var first = menu.querySelector('.lof-achievements-hub-dropdown-option');
                    if (first) { first.focus(); }
                }
            });

            menu.addEventListener('keydown', function (event) {
                var nodes = Array.prototype.slice.call(
                    menu.querySelectorAll('.lof-achievements-hub-dropdown-option')
                );
                var index = nodes.indexOf(document.activeElement);

                if (event.key === 'Escape') {
                    event.preventDefault();
                    closeMenu();
                    button.focus();
                } else if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    nodes[Math.min(nodes.length - 1, index + 1)].focus();
                } else if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    nodes[Math.max(0, index - 1)].focus();
                }
            });

            wrap.appendChild(button);
            wrap.appendChild(menu);
            sync();
            return wrap;
        }

        toolbar.appendChild(
            makeDropdown(
                'category',
                'Категория',
                [
                    ['all', 'Все категории'],
                    ['reading', 'Чтение'],
                    ['editing', 'Редактирование'],
                    ['creation', 'Создание'],
                    ['activity', 'Активность'],
                    ['communication', 'Общение'],
                    ['special', 'Особое']
                ]
            )
        );

        var rarityOptions = [['all', 'Все редкости']];
        Object.keys(catalog.rarities || {})
            .map(function (key) {
                var data = catalog.rarities[key] || {};
                return { key: key, title: String(data.title || key), order: Number(data.order || 0) };
            })
            .sort(function (a, b) { return a.order - b.order; })
            .forEach(function (item) {
                rarityOptions.push([item.key, item.title]);
            });

        toolbar.appendChild(
            makeDropdown(
                'rarity',
                'Редкость',
                rarityOptions
            )
        );

        toolbar.appendChild(
            makeDropdown(
                'type',
                'Тип достижения',
                [
                    ['all', 'Все типы'],
                    ['achievement', 'Одиночные'],
                    ['family', 'Серии'],
                    ['hidden', 'Скрытые']
                ]
            )
        );

        return toolbar;
    }

    function imageNode(item, eager) {
        var badge = document.createElement('span');
        badge.className = 'lof-achievements-hub-badge lof-profile-rail-badge';
        badge.setAttribute('data-rarity', item.rarity.key);

        var wrap = document.createElement('span');
        wrap.className = 'lof-achievements-hub-image-wrap lof-profile-rail-badge-image-wrap';

        var placeholder = document.createElement('span');
        placeholder.className = 'lof-achievements-hub-image-placeholder';
        placeholder.textContent = '✦';
        placeholder.setAttribute('aria-hidden', 'true');

        var img = document.createElement('img');
        img.className = 'lof-achievements-hub-image lof-profile-rail-badge-image';
        img.alt = item.title ? ('Иконка достижения «' + item.title + '»') : '';
        img.decoding = 'async';
        if (!eager) { img.loading = 'lazy'; }

        wrap.appendChild(placeholder);
        wrap.appendChild(img);
        badge.appendChild(wrap);

        var sourceAchievement = item.useUniversalImage
            ? {
                title: item.title || 'Достижение',
                image: String(activeCatalog && activeCatalog.defaultImage || 'Достижение универсальное.png')
            }
            : (item.achievement || item.first || null);
        var directName = String(item.image || (sourceAchievement && sourceAchievement.image) || '').trim();
        var triedFallback = false;

        function reveal() {
            img.classList.add('is-ready');
            placeholder.style.display = 'none';
        }

        function apiFallback() {
            if (triedFallback) { return; }
            triedFallback = true;
            resolveAchievementImage(activeCatalog, sourceAchievement)
                .then(function (result) {
                    applyResolvedImageToElement(img, result, function () {
                        img.classList.remove('is-ready');
                        placeholder.style.display = '';
                    });
                })
                .catch(function () {
                    img.classList.remove('is-ready');
                    placeholder.style.display = '';
                });
        }

        img.addEventListener('load', reveal);
        img.addEventListener('error', apiFallback, { once: true });

        if (directName) {
            /*
             * RC11.9.1: изображение не участвует в критическом пути рендера.
             * Браузер сразу получает same-wiki URL, а карточка уже видна.
             * Никакого ожидания batch imageinfo/mw.Api перед отображением нет.
             */
            img.src = fileUrl(directName);
        } else {
            apiFallback();
        }

        if (img.complete && img.naturalWidth > 0) { reveal(); }
        return badge;
    }

    function openCatalogItemDetails(catalog, item) {
        if (!catalog || !item) { return null; }
        var achievement = item.achievement || item.first || item.last;
        if (!achievement) { return null; }

        if (item.useUniversalImage) {
            achievement = Object.assign({}, achievement, {
                image: String(catalog.defaultImage || 'Достижение универсальное.png')
            });
        }

        var rarityTitle = item.type === 'family' && item.lastRarity && item.lastRarity.key !== item.rarity.key
            ? item.rarity.title + ' → ' + item.lastRarity.title
            : item.rarity.title;
        var details = {
            compact: true,
            id: item.id,
            title: item.title,
            loreTitle: item.title,
            categoryKey: item.category,
            categoryTitle: getAchievementCategoryTitle(item.category),
            rarityKey: item.rarity.key,
            rarityTitle: rarityTitle,
            statusText: item.earned ? 'Получено' : 'Не получено',
            description: item.condition || '',
            hidden: item.hidden === true,
            earned: item.earned === true,
            type: item.type
        };

        if (item.type === 'family') {
            var firstTier = getAchievementTierLabel(item.first) || 'I';
            var lastTier = getAchievementTierLabel(item.last) || String(item.levels || '');
            details.tierText = firstTier + '–' + lastTier + ' · ' + String(item.levels || 0) + ' ступеней';
            var firstPoints = Math.max(0, Math.floor(Number(item.first && item.first.points) || 0));
            var lastPoints = Math.max(0, Math.floor(Number(item.last && item.last.points) || 0));
            if (firstPoints || lastPoints) {
                details.pointsText = firstPoints === lastPoints
                    ? String(firstPoints) + ' опыта за ступень'
                    : String(firstPoints) + '–' + String(lastPoints) + ' опыта за ступень';
            }
        } else {
            var tierText = getAchievementTierLabel(achievement);
            if (tierText) { details.tierText = tierText; }
        }

        return openAchievementDetailsModal(catalog, achievement, details);
    }

    function buildCard(item, onSelect, options) {
        options = options || {};
        var card = document.createElement('button');
        card.type = 'button';
        card.className = 'lof-achievements-hub-card';
        card.setAttribute('data-rarity', item.rarity.key);
        card.setAttribute('aria-label', 'Показать описание достижения «' + item.title + '»');
        if (item.earned) { card.classList.add('is-earned'); }
        if (item.hidden) { card.classList.add('is-hidden-achievement'); }

        card.appendChild(imageNode(item, options.eager === true));

        var body = document.createElement('span');
        body.className = 'lof-achievements-hub-card-body';

        var rarityTitle = item.type === 'family' && item.lastRarity && item.lastRarity.key !== item.rarity.key
            ? item.rarity.title + ' → ' + item.lastRarity.title
            : item.rarity.title;

        body.innerHTML =
            '<span class="lof-achievements-hub-card-meta">' +
                '<span>' + escapeHtml(getAchievementCategoryTitle(item.category)) + '</span>' +
                '<span class="lof-rarity-' + escapeHtml(item.rarity.key) + '">' + escapeHtml(rarityTitle) + '</span>' +
            '</span>' +
            '<strong class="lof-achievements-hub-card-title">' + escapeHtml(item.title) + '</strong>' +
            '<span class="lof-achievements-hub-card-description">' + escapeHtml(item.description) + '</span>' +
            '<span class="lof-achievements-hub-card-footer">' +
                (item.type === 'family'
                    ? escapeHtml(String(item.levels) + ' ступеней')
                    : escapeHtml(String(item.points) + ' опыта')) +
                (item.earned ? '<em>✓ Получено</em>' : '<em>Показать описание ↓</em>') +
            '</span>';

        var rarityLabelNode = body.querySelector('.lof-rarity-' + item.rarity.key);
        if (rarityLabelNode) {
            setRarityLabel(rarityLabelNode, rarityTitle, item.rarity.key);
        }

        card.appendChild(body);
        card.setAttribute('data-item-key', item.key);
        card.addEventListener('click', function (event) {
            /*
             * Карточки каталога не являются профильными badge-кнопками.
             * Останавливаем всплытие намеренно, чтобы старые/общие делегированные
             * обработчики профиля или Hall of Fame не могли открыть второй
             * popup поверх общего окна подробностей из UI/Cards.
             */
            if (event) {
                event.preventDefault();
                event.stopPropagation();
                if (typeof event.stopImmediatePropagation === 'function') {
                    event.stopImmediatePropagation();
                }
            }
            if (typeof onSelect === 'function') { onSelect(item, card); }
        });
        return card;
    }

    function getRandomShowcaseItems(items, count) {
        count = Math.max(1, Math.floor(Number(count) || 6));
        var pool = items.filter(function (item) {
            return item && !item.hidden && item.type === 'achievement';
        });
        if (pool.length < count) {
            pool = items.filter(function (item) { return item && !item.hidden; });
        }

        if (showcaseKeys && showcaseKeys.length) {
            var remembered = showcaseKeys.map(function (key) {
                return pool.find(function (item) { return item.key === key; });
            }).filter(Boolean);
            if (remembered.length >= Math.min(count, pool.length)) {
                return remembered.slice(0, count);
            }
        }

        /* Fisher–Yates: случайный набор на каждую загрузку страницы. */
        for (var i = pool.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = pool[i];
            pool[i] = pool[j];
            pool[j] = tmp;
        }

        var selected = pool.slice(0, Math.min(count, pool.length));
        showcaseKeys = selected.map(function (item) { return item.key; });
        return selected;
    }

    function buildProgramShowcase(items, catalog, onSelect) {
        var wrap = document.createElement('section');
        wrap.className = 'lof-achievements-program-showcase';

        var intro = document.createElement('div');
        intro.className = 'lof-achievements-program-intro';
        intro.innerHTML =
            '<div class="lof-achievements-program-kicker">НЕ ПРОСТО ЗНАЧКИ В ПРОФИЛЕ</div>' +
            '<h2>Исследуйте Лофариан — и собирайте свою историю</h2>' +
            '<p>Достижения превращают обычное путешествие по вики в дополнительную игру. Читайте статьи, возвращайтесь к забытым страницам, создавайте новое, общайтесь и открывайте награды — от самых простых до тех, чьи условия специально скрыты.</p>';
        wrap.appendChild(intro);

        var features = document.createElement('div');
        features.className = 'lof-achievements-program-features';
        [
            ['01', 'Исследуйте', 'Награды за чтение, возвращение на вики и знакомство с новыми страницами.'],
            ['02', 'Создавайте', 'Правки, новые статьи, шаблоны, категории, изображения и работа над самой вики.'],
            ['03', 'Общайтесь', 'Отдельные достижения связаны с Discussions и жизнью сообщества.'],
            ['04', 'Ищите скрытое', 'У некоторых наград название видно заранее, но настоящее условие остаётся тайной до получения.']
        ].forEach(function (data) {
            var card = document.createElement('div');
            card.className = 'lof-achievements-program-feature';
            card.innerHTML =
                '<span>' + escapeHtml(data[0]) + '</span>' +
                '<strong>' + escapeHtml(data[1]) + '</strong>' +
                '<p>' + escapeHtml(data[2]) + '</p>';
            features.appendChild(card);
        });
        wrap.appendChild(features);

        var examples = document.createElement('div');
        examples.className = 'lof-achievements-program-examples';
        examples.innerHTML =
            '<div class="lof-achievements-program-section-head">' +
                '<div><div class="lof-achievements-program-kicker">ПРИМЕРЫ</div><h3>Нажмите на достижение</h3></div>' +
                '<p>При каждой загрузке выбираются шесть случайных наград из каталога. Нажмите на любую, чтобы посмотреть её подробнее.</p>' +
            '</div>';

        var exampleGrid = document.createElement('div');
        exampleGrid.className = 'lof-achievements-program-example-grid';
        getRandomShowcaseItems(items, 6).forEach(function (candidate) {
            var card = buildCard(candidate, function (item) {
                if (typeof onSelect === 'function') { onSelect(item, card); }
            }, { eager: true });
            card.classList.add('is-showcase-example');
            exampleGrid.appendChild(card);
        });
        examples.appendChild(exampleGrid);
        wrap.appendChild(examples);

        var rarityBlock = document.createElement('div');
        rarityBlock.className = 'lof-achievements-program-rarities';
        var rarityTitle = document.createElement('div');
        rarityTitle.className = 'lof-achievements-program-section-head';
        rarityTitle.innerHTML =
            '<div><div class="lof-achievements-program-kicker">РЕДКОСТИ</div><h3>Не все награды одинаковы</h3></div>' +
            '<p>Редкость помогает сразу понять, насколько необычным считается достижение.</p>';
        rarityBlock.appendChild(rarityTitle);

        var rarityRow = document.createElement('div');
        rarityRow.className = 'lof-achievements-program-rarity-row';

        var rarityInfo = document.createElement('div');
        rarityInfo.className = 'lof-achievements-program-rarity-info';
        rarityInfo.innerHTML = '<strong>Выберите редкость</strong><span>Нажмите на название редкости, чтобы узнать, какое место она занимает в системе.</span>';

        Object.keys(catalog.rarities || {})
            .map(function (key) {
                var data = catalog.rarities[key] || {};
                return {
                    key: key,
                    title: String(data.title || key),
                    order: Number(data.order || 0),
                    grade: Number(data.grade || 1)
                };
            })
            .sort(function (a, b) { return a.order - b.order; })
            .forEach(function (rarity) {
                var chip = document.createElement('button');
                chip.type = 'button';
                chip.className = 'lof-achievements-program-rarity lof-rarity-' + rarity.key;
                setRarityLabel(chip, rarity.title, rarity.key);
                chip.setAttribute('aria-label', 'Подробнее о редкости «' + rarity.title + '»');
                chip.addEventListener('click', function () {
                    rarityRow.querySelectorAll('.lof-achievements-program-rarity').forEach(function (other) {
                        other.classList.toggle('is-active', other === chip);
                    });
                    rarityInfo.setAttribute('data-rarity', rarity.key);
                    rarityInfo.innerHTML = '';
                    var rarityInfoTitle = document.createElement('strong');
                    rarityInfoTitle.className = 'lof-rarity-' + rarity.key;
                    setRarityLabel(rarityInfoTitle, rarity.title, rarity.key);
                    rarityInfo.appendChild(rarityInfoTitle);

                    var rarityParagraphs = RARITY_DESCRIPTIONS[rarity.key] || ['Отдельная ступень редкости в системе достижений.'];
                    rarityParagraphs.forEach(function (text) {
                        var paragraph = document.createElement('p');
                        paragraph.textContent = text;
                        rarityInfo.appendChild(paragraph);
                    });

                    var rarityFoot = document.createElement('small');
                    rarityFoot.textContent = String(rarity.order) + '-я редкость из ' + String(Object.keys(catalog.rarities || {}).length) + ' · ' + String(rarity.grade) + '-я градация';
                    rarityInfo.appendChild(rarityFoot);
                });
                rarityRow.appendChild(chip);
            });
        rarityBlock.appendChild(rarityRow);
        rarityBlock.appendChild(rarityInfo);
        wrap.appendChild(rarityBlock);

        var secret = document.createElement('div');
        secret.className = 'lof-achievements-program-secret';
        secret.innerHTML =
            '<div class="lof-achievements-program-secret-mark">?</div>' +
            '<div><div class="lof-achievements-program-kicker">СКРЫТЫЕ ДОСТИЖЕНИЯ</div>' +
            '<h3>Некоторые условия никто не расскажет заранее</h3>' +
            '<p>Название такой награды можно увидеть в каталоге, а условие останется засекреченным. Если вы случайно выполните его — получите обычное уведомление о достижении.</p></div>';
        wrap.appendChild(secret);

        var hall = document.createElement('a');
        hall.className = 'lof-achievements-program-hall';
        hall.href = mw.util.getUrl(HALL_PAGE);
        hall.innerHTML =
            '<div><div class="lof-achievements-program-kicker">ЗАЛ СЛАВЫ</div>' +
            '<strong>Посмотрите, что уже открыли другие участники</strong>' +
            '<span>Очки, места и коллекции достижений участников вики.</span></div>' +
            '<b>Открыть Зал славы →</b>';
        wrap.appendChild(hall);

        return wrap;
    }

    function renderAchievementsHub(catalog) {
        if (!isAchievementsPage()) { return Promise.resolve(null); }

        var target = document.getElementById('lof-achievements-catalog-hub');
        if (!target) { return Promise.resolve(null); }
        activeCatalog = catalog;

        var loading = document.getElementById('lof-achievements-page-loading');
        var content = document.getElementById('lof-achievements-page-content');
        if (content) { content.style.display = ''; }

        function finishLoading() {
            if (loading && loading.parentNode) {
                loading.parentNode.removeChild(loading);
            }
        }

        /*
         * Fail-open UI: технический loader не должен закрывать обычный
         * Wiki-текст, даже если один из интерактивных блоков позже упадёт.
         */
        if (loading) { loading.style.display = 'none'; }

        /*
         * RC11.4: первый рендер НЕ ждёт Users-сегмент текущего участника.
         * Каталог, примеры и редкости появляются сразу после
         * каталога. Метки «Получено» и раскрытие уже заработанных скрытых наград
         * догружаются отдельным read-only запросом в фоне. Поэтому медленный или
         * неудачный Users API больше не может удерживать всю страницу на loader.
         */
        var currentEarnedMap = {};
        var state = { query: '', category: 'all', rarity: 'all', type: 'all', page: 1 };
        var expanded = false;
        var refreshSerial = 0;

        function mount(earnedMap, preserveUi) {
            refreshSerial += 1;
            var serial = refreshSerial;
            currentEarnedMap = earnedMap || {};
            var items = logicalItems(catalog, currentEarnedMap);

            target.innerHTML = '';
            target.classList.add('lof-achievements-hub');
            target.classList.toggle('is-collapsed', !expanded);

            var disclosure = document.createElement('div');
            disclosure.className = 'lof-achievements-hub-disclosure';
            var toggle = document.createElement('button');
            toggle.type = 'button';
            toggle.className = 'lof-achievements-hub-toggle';
            toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
            toggle.textContent = expanded ? 'Свернуть список' : 'Показать все достижения';
            var count = document.createElement('span');
            count.textContent = items.length + ' достижений и серий';
            disclosure.appendChild(toggle);
            disclosure.appendChild(count);
            target.appendChild(disclosure);

            var catalogBody = document.createElement('div');
            catalogBody.className = 'lof-achievements-hub-collapsible';
            catalogBody.hidden = !expanded;

            var resultsLine = document.createElement('div');
            resultsLine.className = 'lof-achievements-hub-results-line';

            var grid = document.createElement('div');
            grid.className = 'lof-achievements-hub-grid';

            var pagination = document.createElement('nav');
            pagination.className = 'lof-achievements-hub-pagination';
            pagination.setAttribute('aria-label', 'Страницы каталога достижений');

            function selectItem(item) {
                openCatalogItemDetails(catalog, item);
            }

            var showcaseTarget = document.getElementById('lof-achievements-program-showcase');
            if (showcaseTarget) {
                showcaseTarget.innerHTML = '';
                showcaseTarget.appendChild(buildProgramShowcase(items, catalog, selectItem));
            }

            function filteredItems() {
                return items.filter(function (item) {
                    if (state.category !== 'all' && item.category !== state.category) { return false; }
                    if (state.rarity !== 'all' && item.rarityKeys.indexOf(state.rarity) === -1) { return false; }
                    if (state.type === 'achievement' && item.type !== 'achievement') { return false; }
                    if (state.type === 'family' && item.type !== 'family') { return false; }
                    if (state.type === 'hidden' && !item.hidden) { return false; }
                    if (state.query) {
                        var haystack = (item.title + ' ' + item.description + ' ' + item.condition + ' ' + getAchievementCategoryTitle(item.category) + ' ' + item.rarity.title).toLowerCase();
                        if (haystack.indexOf(state.query) === -1) { return false; }
                    }
                    return true;
                });
            }

            function addPageButton(label, page, active, disabled) {
                var button = document.createElement('button');
                button.type = 'button';
                button.className = 'lof-achievements-hub-page';
                button.textContent = label;
                if (active) {
                    button.classList.add('is-active');
                    button.setAttribute('aria-current', 'page');
                }
                button.disabled = !!disabled;
                if (!disabled && !active) {
                    button.addEventListener('click', function () {
                        state.page = page;
                        renderGrid();
                    });
                }
                pagination.appendChild(button);
            }

            function renderPagination(totalPages) {
                pagination.innerHTML = '';
                if (totalPages <= 1) {
                    pagination.hidden = true;
                    return;
                }
                pagination.hidden = false;
                addPageButton('←', Math.max(1, state.page - 1), false, state.page <= 1);

                var pages = [];
                if (totalPages <= 7) {
                    for (var p = 1; p <= totalPages; p++) { pages.push(p); }
                } else {
                    pages.push(1);
                    var from = Math.max(2, state.page - 2);
                    var to = Math.min(totalPages - 1, state.page + 2);
                    if (from > 2) { pages.push('…'); }
                    for (var middle = from; middle <= to; middle++) { pages.push(middle); }
                    if (to < totalPages - 1) { pages.push('…'); }
                    pages.push(totalPages);
                }

                pages.forEach(function (page) {
                    if (page === '…') {
                        var dots = document.createElement('span');
                        dots.className = 'lof-achievements-hub-page-dots';
                        dots.textContent = '…';
                        pagination.appendChild(dots);
                    } else {
                        addPageButton(String(page), page, page === state.page, false);
                    }
                });
                addPageButton('→', Math.min(totalPages, state.page + 1), false, state.page >= totalPages);
            }

            function renderGrid() {
                if (serial !== refreshSerial) { return; }
                grid.innerHTML = '';
                pagination.innerHTML = '';

                if (!expanded) {
                    resultsLine.textContent = 'Полный список пока свёрнут — страница загружена и готова.';
                    pagination.hidden = true;
                    return;
                }

                var filtered = filteredItems();
                if (!filtered.length) {
                    resultsLine.textContent = 'Показано: 0 из ' + items.length;
                    var empty = document.createElement('div');
                    empty.className = 'lof-achievements-hub-empty';
                    empty.textContent = 'По выбранным условиям ничего не найдено.';
                    grid.appendChild(empty);
                    pagination.hidden = true;
                    return;
                }

                var totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
                state.page = Math.min(Math.max(1, Number(state.page) || 1), totalPages);
                var startIndex = (state.page - 1) * PAGE_SIZE;
                var pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);
                var endIndex = startIndex + pageItems.length;

                resultsLine.textContent = 'Показано: ' + String(startIndex + 1) + '–' + String(endIndex) + ' из ' + String(filtered.length) +
                    (filtered.length !== items.length ? ' · всего ' + String(items.length) : '');

                var fragment = document.createDocumentFragment();
                pageItems.forEach(function (item) {
                    fragment.appendChild(buildCard(item, selectItem));
                });
                grid.appendChild(fragment);
                renderPagination(totalPages);
            }

            var toolbar = buildToolbar(catalog, state, renderGrid);
            catalogBody.appendChild(toolbar);
            catalogBody.appendChild(resultsLine);
            catalogBody.appendChild(grid);
            catalogBody.appendChild(pagination);
            target.appendChild(catalogBody);

            /* Preserve filter controls after background earned-map refresh. */
            var search = toolbar.querySelector('.lof-achievements-hub-search');
            if (search) { search.value = state.query || ''; }

            renderGrid();

            toggle.addEventListener('click', function () {
                expanded = !expanded;
                toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
                toggle.textContent = expanded ? 'Свернуть список' : 'Показать все достижения';
                catalogBody.hidden = !expanded;
                target.classList.toggle('is-collapsed', !expanded);
                renderGrid();
            });

            return target;
        }

        /* Первый рабочий кадр — без персонального запроса. */
        try {
            mount({}, false);
        } catch (error) {
            finishLoading();
            target.innerHTML =
                '<div class="lof-achievements-hub-empty">Каталог не удалось отрисовать автоматически. Перезагрузите страницу; основной текст и участие в программе остаются доступны.</div>';
            console.error('[Lofarian Achievements] Ошибка первого рендера каталога:', error);
            return Promise.resolve(target);
        }
        finishLoading();

        /*
         * Персональные отметки — фоновой задачей. requestIdleCallback не
         * обязателен: на браузерах без него используем короткий setTimeout.
         */
        if (I.participation && I.participation.active === true) {
            var schedule = typeof root.requestIdleCallback === 'function'
                ? function (fn) { root.requestIdleCallback(fn, { timeout: 1200 }); }
                : function (fn) { root.setTimeout(fn, 120); };

            schedule(function () {
                loadOfficialViewerMap().then(function (earnedMap) {
                    if (earnedMap && Object.keys(earnedMap).length) {
                        mount(earnedMap, true);
                    }
                }).catch(function (error) {
                    console.warn('[Lofarian Achievements] Фоновая отметка полученных наград пропущена:', error);
                });
            });
        }

        return Promise.resolve(target);
    }

    I.registerFunctions('UI/AchievementsPage', {
        renderAchievementsHub: renderAchievementsHub
    }, [
        'escapeHtml', 'getAchievement', 'getRarityInfo', 'getAchievementVisualCategory',
        'getAchievementCategoryTitle', 'getCurrentUserId', 'readUserSegment',
        'getUserAchievementMap', 'getHiddenUnlockedDescription', 'getAchievementTierLabel',
        'resolveAchievementImage', 'applyResolvedImageToElement', 'openAchievementDetailsModal', 'getAchievementLoreDescription', 'setRarityLabel'
    ]);
})(window);