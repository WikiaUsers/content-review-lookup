(function () {


    if (mw.config.get('wgPageName') !== 'Item_Database_(New)') {
        return;
    }

    /* =========================================================
       1. CONFIGURATION
       ========================================================= */

    var CONFIG = {

        databaseContainerId: 'item-database-app',

        theme: {
            background: '#202020',
            accent: '#51C2AD'
        },

        rarityColors: {
            Common: '#9E9E9E',
            Uncommon: '#4CAF50',
            Rare: '#42A5F5',
            Legendary: '#AB47BC',
            Tribute: '#FFD54F',
            Burst: '#EF5350'
        },

        views: {
            detailed: 'detailed',
            cards: 'cards'
        },

        categories: [
            {
                id: 'longswords',
                name: 'Longswords',
                guideId: 'weapon-types-longswords',
                group: 'weapons'
            },
            {
                id: 'greatswords',
                name: 'Greatswords',
                guideId: 'weapon-types-greatswords',
                group: 'weapons'
            },
            {
                id: 'katanas',
                name: 'Katanas',
                guideId: 'weapon-types-katanas',
                group: 'weapons'
            },
            {
                id: 'rapiers',
                name: 'Rapiers',
                guideId: 'weapon-types-rapiers',
                group: 'weapons'
            },
            {
                id: 'spears',
                name: 'Spears',
                guideId: 'weapon-types-spears',
                group: 'weapons'
            },
            {
                id: 'scythes',
                name: 'Scythes',
                guideId: 'weapon-types-scythes',
                group: 'weapons'
            },
            {
                id: 'armor',
                name: 'Armor',
                guideId: 'armor',
                group: 'equipment'
            },
            {
                id: 'accessories',
                name: 'Accessories',
                guideId: 'accessories',
                group: 'equipment'
            },
            {
                id: 'companions',
                name: 'Companions',
                guideId: 'companions',
                group: 'equipment'
            },
            {
                id: 'auras',
                name: 'Auras',
                guideId: 'auras',
                group: 'cosmetics'
            },
            {
                id: 'miscellaneous',
                name: 'Miscellaneous',
                guideId: 'miscellaneous',
                group: 'miscellaneous'
            }
        ],

detailed: {
    defaultSort: 'level',
    defaultSortDirection: 'asc',
    filters: {
        levelMin: null,
        levelMax: null
    }
},

        cards: {
            cardsPerRow: 8
        },

guide: {
    storageKey: 'item-database-guide-hidden',
    activeSection: 'overview',

    sections: [
                {
                    id: 'overview',
                    title: 'Overview'
                },
                {
                    id: 'rarity',
                    title: 'Rarity'
                },
                {
                    id: 'forge',
                    title: 'Forge / Upgrade Crystals'
                },
                {
                    id: 'weapon-types',
                    title: 'Weapon Types'
                },
                {
                    id: 'armor',
                    title: 'Armor'
                },
                {
                    id: 'accessories',
                    title: 'Accessories'
                },
                {
                    id: 'companions',
                    title: 'Companions'
                },
                {
                    id: 'auras',
                    title: 'Auras'
                },
                {
                    id: 'miscellaneous',
                    title: 'Miscellaneous'
                }
            ]
        }

    };


    /* =========================================================
       2. APPLICATION STATE
       ========================================================= */

 var state = {

    database: [],

    isLoading: true,

    currentView: CONFIG.views.detailed,

    currentCategory: 'longswords',

    search: '',

    detailed: {
        sortBy: CONFIG.detailed.defaultSort,
        sortDirection: CONFIG.detailed.defaultSortDirection,
filters: {
    levelMin: CONFIG.detailed.filters.levelMin,
    levelMax: CONFIG.detailed.filters.levelMax,
    rarity: null,
    obtainable: 'all'
}
    },

    cards: {
                view: 'cards',
                sortBy: 'level',
                sortDirection: 'asc',

            filters: {
                levelMin: null,
                levelMax: null,
                rarities: [],
                minStat: null,
                maxStat: null,
                obtainable: 'all'
            },
            selectedItems: []
        },

        compare: {
            active: false,
            items: []
        },

        editor: {
            visible: false,
            updating: false,
            progress: 0
        }

    };

    /* =========================================================
       3. INITIALIZATION
       ========================================================= */

    function initialize() {

        var app = document.getElementById(
            CONFIG.databaseContainerId
        );

        if (!app) {
            console.error(
                'Item Database container not found.'
            );
            return;
        }

        waitForDatabaseAPI()
            .then(function () {
                return loadDatabase();
            })

.then(function (database) {

    state.database = validateDatabase(database);

    state.isLoading = false;

    renderDatabase();

})

            .catch(function (error) {

                state.isLoading = false;

                console.error(
                    'Item Database initialization failed:',
                    error
                );
            });
    }


    function waitForDatabaseAPI() {

        return new Promise(function (resolve, reject) {

            var attempts = 0;
            var maxAttempts = 100;

            function check() {

                if (
                    window.itemDatabaseAPI &&
                    typeof window.itemDatabaseAPI.getDatabase === 'function'
                ) {
                    resolve();
                    return;
                }

                attempts++;

                if (attempts >= maxAttempts) {

                    reject(
                        new Error(
                            'Database API was not available.'
                        )
                    );

                    return;
                }

                setTimeout(check, 100);
            }

            check();
        });
    }


function loadDatabase() {

    try {

        return Promise.resolve(
            window.itemDatabaseAPI.getDatabase()
        );

    } catch (error) {

        return Promise.reject(
            error
        );
    }
}


function validateDatabase(database) {
    if (
        !database ||
        typeof database !== 'object' ||
        Array.isArray(database)
    ) {
        console.error('Database returned an invalid format.');
        return {};
    }

    var allowedFields = [
        'name',
        'icon',
        'type',
        'rarity',
        'level',
        'dmg',
        'def',
        'crit',
        'obtain',
        'unobtainable',
        'description',
        'abilities',
        'stats',
        'skill',
        'chance',
        'chanceCost',
        'cost',
        'store'
    ];

var validatedDatabase = Object.create(null);

    Object.keys(database).forEach(function (name) {
        var item = database[name];

        if (
            !item ||
            typeof item !== 'object' ||
            Array.isArray(item) ||
            typeof item.name !== 'string' ||
            !item.name.trim()
        ) {
            return;
        }

        var validatedItem = {};

        allowedFields.forEach(function (field) {
            if (
                Object.prototype.hasOwnProperty.call(
                    item,
                    field
                )
            ) {
                validatedItem[field] = item[field];
            }
        });

        if (
            typeof validatedItem.name === 'string' &&
            validatedItem.name.trim()
        ) {
            validatedDatabase[name] = validatedItem;
        }
    });

    return validatedDatabase;
}

function getSafeWikiUrl(pageName) {
    if (typeof pageName !== 'string') {
        return '#';
    }

    var cleanPageName = pageName.trim();

    if (!cleanPageName) {
        return '#';
    }

    return mw.util.getUrl(cleanPageName);
}

    /* =========================================================
       4. GUIDE
       ========================================================= */

    var GUIDE_CONTENT = {

    overview: {
        title: 'Overview',
        sourceId: 'guide-source-overview'
    },

    rarity: {
        title: 'Rarity',
        sourceId: 'guide-source-rarity'
    },

    forge: {
        title: 'Forge / Upgrade Crystals',
        sourceId: 'guide-source-forge'
    },

    weaponTypes: {
        title: 'Weapon Types',
        sourceId: 'guide-source-weapon-types'
    },

    armor: {
        title: 'Armor',
        sourceId: 'guide-source-armor'
    },

    accessories: {
        title: 'Accessories',
        sourceId: 'guide-source-accessories'
    },

    companions: {
        title: 'Companions',
        sourceId: 'guide-source-companions'
    },

    auras: {
        title: 'Auras',
        sourceId: 'guide-source-auras'
    },

    miscellaneous: {
        title: 'Miscellaneous',
        sourceId: 'guide-source-miscellaneous'
    }

};

function initializeWeaponTypesGuide() {

    var guide =
        document.getElementById(
            'guide-weapon-types'
        );

    if (!guide) {
        return;
    }

    var navigation =
        guide.querySelector(
            '#weapon-types-navigation'
        );

    if (!navigation) {
        return;
    }

    var weaponTypes = [
        {
            id: 'weapon-types-longswords',
            title: 'Longswords'
        },
        {
            id: 'weapon-types-greatswords',
            title: 'Greatswords'
        },
        {
            id: 'weapon-types-katanas',
            title: 'Katanas'
        },
        {
            id: 'weapon-types-rapiers',
            title: 'Rapiers'
        },
        {
            id: 'weapon-types-spears',
            title: 'Spears'
        },
        {
            id: 'weapon-types-scythes',
            title: 'Scythes'
        }
    ];

    navigation.replaceChildren();

    weaponTypes.forEach(
        function (weaponType) {

            var button =
                document.createElement('button');

            button.type = 'button';

            button.className =
                'item-database-weapon-type-button';

            button.textContent =
                weaponType.title;

            button.addEventListener(
                'click',
                function () {

                    weaponTypes.forEach(
                        function (otherType) {

                            var element =
                                guide.querySelector(
                                    '#' + otherType.id
                                );

                            if (element) {

                                element.style.display =
                                    otherType.id ===
                                    weaponType.id
                                        ? 'block'
                                        : 'none';

                            }

                        }
                    );

                    navigation
                        .querySelectorAll(
                            '.item-database-weapon-type-button'
                        )
                        .forEach(
                            function (otherButton) {

                                otherButton.classList.remove(
                                    'active'
                                );

                            }
                        );

                    button.classList.add(
                        'active'
                    );
                }
            );

            navigation.appendChild(
                button
            );

        }
    );

weaponTypes.forEach(
    function (weaponType, index) {

        var element =
            guide.querySelector(
                '#' + weaponType.id
            );

        if (element) {

            element.style.display =
                index === 0
                    ? 'block'
                    : 'none';

        }

    }
);

var firstButton =
    navigation.querySelector(
        '.item-database-weapon-type-button'
    );

if (firstButton) {
    firstButton.classList.add('active');
}
}

function renderGuideSection(section, sectionId) {
    var content = GUIDE_CONTENT[section];

    if (!content) {
        return null;
    }

    var sectionElement = document.createElement('section');
    sectionElement.className = 'item-database-guide-section';
    sectionElement.id = 'guide-' + sectionId;

    var title = document.createElement('h2');
    title.textContent = content.title;

    var guideContent = document.createElement('div');
    guideContent.className = 'item-database-guide-content';

    var source = content.sourceId
        ? document.getElementById(content.sourceId)
        : null;

    if (source) {
        var clone = source.cloneNode(true);
        clone.removeAttribute('id');

        while (clone.firstChild) {
            guideContent.appendChild(clone.firstChild);
        }
    } else if (content.content) {
        guideContent.textContent = content.content;
    }

    sectionElement.appendChild(title);
    sectionElement.appendChild(guideContent);

    return sectionElement;
}


function renderGuide() {

    var app = document.getElementById(
        CONFIG.databaseContainerId
    );

    if (!app) {
        return;
    }

    var guide = document.createElement('div');

    guide.id = 'item-database-guide';

var isHidden = false;

try {
    isHidden =
        localStorage.getItem(
            CONFIG.guide.storageKey
        ) === 'true';
} catch (error) {
    isHidden = false;
}

    if (isHidden) {
        guide.classList.add('is-hidden');
    }

    var activeSection =
        CONFIG.guide.activeSection || 'overview';

    var header =
        document.createElement('div');

    header.className =
        'item-database-guide-header';

    var title =
        document.createElement('h2');

    title.textContent =
        'Database Guide';

    header.appendChild(title);

    var toggleButton =
        document.createElement('button');

    toggleButton.type = 'button';

    toggleButton.className =
        'item-database-guide-toggle';

    toggleButton.textContent =
        isHidden
            ? 'Show Guide ↓'
            : 'Hide Guide ↑';

    toggleButton.addEventListener(
        'click',
        function () {

            var hidden =
                guide.classList.toggle(
                    'is-hidden'
                );

try {
    localStorage.setItem(
        CONFIG.guide.storageKey,
        hidden ? 'true' : 'false'
    );
} catch (error) {
}

            toggleButton.textContent =
                hidden
                    ? 'Show Guide ↓'
                    : 'Hide Guide ↑';
        }
    );

    header.appendChild(toggleButton);

    guide.appendChild(header);

    var navigation =
        document.createElement('div');

    navigation.className =
        'item-database-guide-navigation';

    var content =
        document.createElement('div');

    content.className =
        'item-database-guide-content-wrapper';

    CONFIG.guide.sections.forEach(
        function (section) {

            var button =
                document.createElement('button');

            button.type = 'button';

            button.setAttribute(
                'data-guide-id',
                section.id
            );

            button.className =
                'item-database-guide-button';

            button.textContent =
                section.title;

            if (
                section.id === activeSection
            ) {
                button.classList.add('active');
            }

            button.addEventListener(
                'click',
                function () {

                    CONFIG.guide.activeSection =
                        section.id;

                    navigation
                        .querySelectorAll(
                            '.item-database-guide-button'
                        )
                        .forEach(function (otherButton) {

                            otherButton.classList.remove(
                                'active'
                            );

                        });

                    button.classList.add('active');

                    content
                        .querySelectorAll(
                            '.item-database-guide-section'
                        )
                        .forEach(function (sectionElement) {

                            sectionElement.style.display =
                                'none';

                        });

                    var target =
                        document.getElementById(
                            'guide-' + section.id
                        );

                    if (target) {
                        target.style.display =
                            'block';
                    }
                }
            );

            navigation.appendChild(button);

var sectionElement = renderGuideSection(
    getGuideContentKey(section.id),
    section.id
);

if (sectionElement) {
    content.appendChild(sectionElement);
}
        }
    );

guide.appendChild(navigation);
guide.appendChild(content);

app.appendChild(guide);

initializeWeaponTypesGuide();

content
    .querySelectorAll(
        '.item-database-guide-section'
    )
    .forEach(function (section) {

        section.style.display =
            section.id ===
            'guide-' + activeSection
                ? 'block'
                : 'none';

    });
}


    function getGuideContentKey(sectionId) {

        var contentKeys = {
            overview: 'overview',
            rarity: 'rarity',
            forge: 'forge',
            'weapon-types': 'weaponTypes',
            armor: 'armor',
            accessories: 'accessories',
            companions: 'companions',
            auras: 'auras',
            miscellaneous: 'miscellaneous'
        };

          return contentKeys[sectionId] || null;
    }

    /* =========================================================
       5. DATABASE NAVIGATION
       ========================================================= */

    function getCategoryById(categoryId) {

        return CONFIG.categories.find(function (category) {
            return category.id === categoryId;
        }) || null;
    }


    function setCurrentView(view) {

        if (
            view !== CONFIG.views.detailed &&
            view !== CONFIG.views.cards
        ) {
            return;
        }

        state.currentView = view;

        renderDatabase();
    }


    function setCurrentCategory(categoryId) {

    var category =
        getCategoryById(categoryId);

    if (!category) {
        return;
    }

state.currentCategory =
    category.id;

    state.cards.selectedItems =
        [];

    renderDatabase();
}


   function renderDatabaseNavigation() {

    var navigation = document.createElement('div');

    navigation.className =
        'item-database-navigation';


    var searchContainer =
        document.createElement('div');

    searchContainer.className =
        'item-database-search-container';

var searchCategoryCounts =
    document.createElement('div');

searchCategoryCounts.className =
    'item-database-search-category-counts';

searchContainer.appendChild(
    searchCategoryCounts
);

    var searchInput =
        document.createElement('input');

    searchInput.type = 'search';

    searchInput.className =
        'item-database-search';

    searchInput.placeholder =
        'Search items...';

    searchInput.value =
        state.search;

    searchInput.setAttribute(
        'aria-label',
        'Search items'
    );

searchInput.addEventListener(
    'input',
    function () {

        state.search =
            searchInput.value;

        if (
            state.search.trim()
        ) {
            focusDatabaseSearchAnchor();
        }

renderSearchCategoryCounts(
    searchCategoryCounts
);

        if (
            state.currentView ===
            CONFIG.views.cards
        ) {
            refreshCardsView();
            return;
        }

        if (
            state.currentView ===
            CONFIG.views.detailed
        ) {
            renderDetailedList();
        }
    }
);

searchContainer.appendChild(
    searchInput
);

renderSearchCategoryCounts(
    searchCategoryCounts
);

navigation.appendChild(
    searchContainer
);


    var viewNavigation =
        document.createElement('div');

    viewNavigation.className =
        'item-database-view-navigation';

    var detailedButton =
        document.createElement('button');

    detailedButton.type = 'button';

    detailedButton.textContent =
        'Detailed';

    detailedButton.className =
        'item-database-view-button';

    if (
        state.currentView ===
        CONFIG.views.detailed
    ) {
        detailedButton.classList.add(
            'active'
        );
    }

    detailedButton.addEventListener(
        'click',
        function () {
            setCurrentView(
                CONFIG.views.detailed
            );
        }
    );

    var cardsButton =
        document.createElement('button');

    cardsButton.type = 'button';

    cardsButton.textContent =
        'Cards';

    cardsButton.className =
        'item-database-view-button';

    if (
        state.currentView ===
        CONFIG.views.cards
    ) {
        cardsButton.classList.add(
            'active'
        );
    }

    cardsButton.addEventListener(
        'click',
        function () {
            setCurrentView(
                CONFIG.views.cards
            );
        }
    );

    viewNavigation.appendChild(
        detailedButton
    );

    viewNavigation.appendChild(
        cardsButton
    );

    navigation.appendChild(
        viewNavigation
    );


    var categoryNavigation =
        document.createElement('div');

    categoryNavigation.className =
        'item-database-category-navigation';

    CONFIG.categories.forEach(
        function (category) {

            var button =
                document.createElement('button');

            button.type = 'button';

            button.textContent =
                category.name;

            button.className =
                'item-database-category-button';

            if (
                state.currentCategory ===
                category.id
            ) {
                button.classList.add(
                    'active'
                );
            }

            button.addEventListener(
                'click',
                function () {
                    setCurrentCategory(
                        category.id
                    );
                }
            );

            categoryNavigation.appendChild(
                button
            );
        }
    );

    navigation.appendChild(
        categoryNavigation
    );

    return navigation;
}

    /* =========================================================
       6. DETAILED
       ========================================================= */

    var DETAILED_CONTENT = {

        longswords: {
            summary:
                'Longswords are one-handed weapons with a balanced attack style.'
        },

        greatswords: {
            summary:
                'Greatswords are two-handed weapons known for their heavier attack style and high critical chance.'
        },

        katanas: {
            summary:
                'Katanas are two-handed weapons associated with the Ninja attack animation.'
        },

        rapiers: {
            summary:
                'Rapiers are one-handed weapons with a fast and precise attack style.'
        },

        spears: {
            summary:
                'Spears are two-handed weapons with a distinct attack pattern and high critical potential.'
        },

        scythes: {
            summary:
                'Scythes are two-handed weapons with a distinct attack pattern and varied critical statistics.'
        },

        armor: {
            summary:
                'Armor provides additional defense and increases the player\'s available health.'
        },

        accessories: {
            summary:
                'Accessories provide additional statistics or cosmetic effects and can be equipped alongside other equipment.'
        },

        companions: {
            summary:
                'Companions provide additional support through their statistics or abilities.'
        },

        auras: {
            summary:
                'Auras are primarily cosmetic items and are obtained through various sources.'
        },

        miscellaneous: {
            summary:
                'Miscellaneous contains items that do not fit into the primary equipment and collectible categories.'
        }

    };


    function getDetailedContent(categoryId) {

        return DETAILED_CONTENT[categoryId] || {
            summary:
                'Browse the items available in this category.'
        };
    }

    function getItemCategory(item) {

        if (
            !item ||
            typeof item.type !== 'string'
        ) {
            return null;
        }

        var type = item.type.toLowerCase();

        if (/\blongsword\b/.test(type)) {
            return 'longswords';
        }

        if (/\bgreatsword\b/.test(type)) {
            return 'greatswords';
        }

        if (/\bkatana\b/.test(type)) {
            return 'katanas';
        }

        if (/\brapier\b/.test(type)) {
            return 'rapiers';
        }

        if (/\bspear\b/.test(type)) {
            return 'spears';
        }

        if (/\bscythe\b/.test(type)) {
            return 'scythes';
        }

        if (/\barmor\b/.test(type)) {
            return 'armor';
        }

        if (
            /\baccessor(?:y|ies)\b/.test(type) ||
            /\bshield\b/.test(type)
        ) {
            return 'accessories';
        }

        if (/\baura\b/.test(type)) {
            return 'auras';
        }

        if (/\bpet\b/.test(type) ||
            /\bcompanion\b/.test(type)
        ) {
            return 'companions';
        }

        if (/\bmiscellaneous\b/.test(type)) {
            return 'miscellaneous';
        }

        return null;
    }

    function getItemsForCategory(categoryId) {

        var category = getCategoryById(categoryId);

        if (!category) {
            return [];
        }

        return Object.keys(state.database)
            .map(function (name) {
                return state.database[name];
            })
            .filter(function (item) {

                return getItemCategory(item) === category.id;

            });
    }

function getSearchCategoryCounts(searchTerm) {

    var counts = {};

    CONFIG.categories.forEach(
        function (category) {

            counts[category.id] = 0;

        }
    );

    var search =
        searchTerm
            .trim()
            .toLowerCase();

    if (!search) {
        return counts;
    }

    Object.keys(state.database).forEach(
        function (name) {

            var item =
                state.database[name];

            if (!item) {
                return;
            }

            var itemName =
                String(
                    item.name || name
                ).toLowerCase();

            if (
                !itemName.includes(search)
            ) {
                return;
            }

            var categoryId =
                getItemCategory(item);

            if (
                categoryId &&
                counts[categoryId] !== undefined
            ) {
                counts[categoryId]++;
            }

        }
    );

    return counts;
}

var SEARCH_CATEGORY_ICONS = {

    longswords: 'Nevalis.png',
    greatswords: 'Steel Greatsword.png',
    katanas: 'Kaego.png',
    rapiers: 'Steel Rapier.png',
    spears: 'Kobold Spear.png',
    scythes: 'Rose Reaper.png',
    armor: 'Blue Novice Armor.png',
    accessories: 'Novice Shield.png',
    companions: 'Kitsune Pals.png',
    auras: 'Cross.png',
    miscellaneous: 'Burst Upgrade Crystal.png'

};

function renderSearchCategoryCounts(
    container
) {

    container.textContent = '';

    if (
        !state.search.trim()
    ) {
        return;
    }

    var categoryCounts =
        getSearchCategoryCounts(
            state.search
        );

    CONFIG.categories.forEach(
        function (category) {

            var count =
                categoryCounts[
                    category.id
                ];

            if (!count) {
                return;
            }

var countElement =
    document.createElement('span');

countElement.className =
    'item-database-search-category-count';

if (
    category.id === state.currentCategory
) {
    countElement.classList.add('active');
}

countElement.title =
    category.name +
    ': ' +
    count;

var icon =
    document.createElement('img');

icon.src =
    mw.util.getUrl(
        'Special:Redirect/file/' +
        SEARCH_CATEGORY_ICONS[
            category.id
        ]
    );

icon.alt =
    category.name;

var countLabel =
    document.createElement('span');

countLabel.textContent =
    count;

countElement.appendChild(
    icon
);

countElement.appendChild(
    countLabel
);

container.appendChild(
    countElement
);

        }
    );
}

  function renderDetailedHeader() {
    var category = getCategoryById(
        state.currentCategory
    );

    var content = getDetailedContent(
        state.currentCategory
    );

    if (!category) {
        return null;
    }

    var header = document.createElement('div');
    header.className = 'item-database-detailed-header';

    var title = document.createElement('h2');
    title.className = 'item-database-detailed-title';
    title.textContent = category.name;

    var summary = document.createElement('p');
    summary.className = 'item-database-detailed-summary';
    summary.textContent = content.summary;

    var learnMore = document.createElement('button');
    learnMore.type = 'button';
    learnMore.className = 'item-database-learn-more';
    learnMore.setAttribute(
        'data-guide-id',
        category.guideId
    );
    learnMore.textContent = 'Learn more →';

    header.appendChild(title);
    header.appendChild(summary);
    header.appendChild(learnMore);

    return header;
}


function getDetailedColumns(categoryId) {

    if (
        categoryId === 'longswords' ||
        categoryId === 'greatswords' ||
        categoryId === 'katanas' ||
        categoryId === 'rapiers' ||
        categoryId === 'spears' ||
        categoryId === 'scythes'
    ) {
        return [
            'Name',
            'Lvl.',
            'Damage',
            'Crit',
            'Cost/Drop',
            'Rarity'
        ];
    }

    if (categoryId === 'armor') {
        return [
            'Name',
            'Lvl.',
            'Defense',
            'Cost/Drop',
            'Rarity'
        ];
    }

if (categoryId === 'accessories') {
    return [
        'Name',
        'Lvl.',
        'Stats',
        'Cost/Drop',
        'Rarity'
    ];
}

if (categoryId === 'companions') {
    return [
        'Name',
        'Stats',
        'Skill',
        'Cost/Drop'
    ];
}

if (categoryId === 'auras') {
    return [
        'Name',
        'Stats',
        'Body Aura/Aura',
        'Cost/Drop'
    ];
}

if (categoryId === 'miscellaneous') {
    return [
        'Name',
        'Description',
        'Cost/Drop',
        'Rarity'
    ];
}

    return [
        'Name',
        'Cost/Drop',
        'Rarity'
    ];
}


function renderDetailedList() {

    var container = document.getElementById(
        'item-database-detailed-list'
    );

    if (!container) {
        return;
    }

    var items = getItemsForCategory(
        state.currentCategory
    );

    items = filterDetailedItems(items);
    items = sortDetailedItems(items);

    container.textContent = '';

    var table = document.createElement('table');

    table.className =
        'item-database-detailed-table';

    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');

getDetailedColumns(
    state.currentCategory
).forEach(function (label) {

        var th = document.createElement('th');

        th.textContent = label;

        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    var tbody = document.createElement('tbody');

    items.forEach(function (item) {

        var row = document.createElement('tr');

        var nameCell = document.createElement('td');

var categoryId =
    state.currentCategory;

var nameLink =
    document.createElement('a');

var nameTarget =
    item.name;

if (
    categoryId === 'miscellaneous'
) {

    nameTarget =
        'Miscellaneous';
}

if (
    categoryId === 'companions' &&
    item.chance
) {

    nameTarget =
        'Obtainable Companions (Mobs / Quests)';

} else if (
    categoryId === 'companions' &&
    !item.chance &&
    typeof item.obtain === 'string'
) {

    var obtainMatch =
        item.obtain.match(
            /^\[\[([^|\]]+)/
        );

    if (obtainMatch) {
        nameTarget =
            obtainMatch[1].trim();
    }

} else if (
    categoryId === 'auras'
) {

    if (item.store === true) {

        nameTarget =
            'Obtainable Auras (Burst Store)';

    } else if (
        item.chance
    ) {

        nameTarget =
            'Obtainable Auras (Mobs / Quests)';

    } else if (
        typeof item.obtain === 'string'
    ) {

        var auraObtainMatch =
            item.obtain.match(
                /^\[\[([^|\]]+)/
            );

        if (auraObtainMatch) {

            nameTarget =
                auraObtainMatch[1].trim();

        } else {

            nameTarget =
                'Obtainable Auras (Mobs / Quests)';
        }

    } else {

        nameTarget =
            'Obtainable Auras (Mobs / Quests)';
    }
}

nameLink.href =
    getSafeWikiUrl(nameTarget);

nameLink.textContent =
    item.name;

        nameCell.appendChild(nameLink);

        if (item.icon) {

    var image =
        document.createElement('img');

    image.src =
        '/images/' + item.icon;

    image.alt =
        item.name;

    image.className =
        'item-database-detailed-image';

    nameCell.insertBefore(
        image,
        nameLink
    );
}

        row.appendChild(nameCell);

if (categoryId === 'miscellaneous') {

    var descriptionCell =
        document.createElement('td');

    if (item.description) {

        descriptionCell.appendChild(
            renderDescription(
                item.description
            )
        );

    } else {

        descriptionCell.textContent = '—';
    }

    row.appendChild(descriptionCell);
}

if (
    categoryId === 'longswords' ||
    categoryId === 'greatswords' ||
    categoryId === 'katanas' ||
    categoryId === 'rapiers' ||
    categoryId === 'spears' ||
    categoryId === 'scythes'
) {

    var levelCell =
        document.createElement('td');

    levelCell.textContent =
        item.level !== undefined &&
        item.level !== null
            ? String(item.level)
            : '—';

    row.appendChild(levelCell);

    var damageCell =
        document.createElement('td');

    damageCell.textContent =
        formatDamage(item.dmg) || '—';

    row.appendChild(damageCell);

    var critCell =
        document.createElement('td');

    critCell.textContent =
        item.crit !== undefined &&
        item.crit !== null
            ? String(item.crit)
            : '—';

    row.appendChild(critCell);
}

if (categoryId === 'armor') {

    var armorLevelCell =
        document.createElement('td');

    armorLevelCell.textContent =
        item.level !== undefined &&
        item.level !== null
            ? String(item.level)
            : '—';

    row.appendChild(armorLevelCell);

var defenseCell = document.createElement('td');

defenseCell.textContent =
    formatDamage(item.def) || '—';

row.appendChild(defenseCell);
}

if (
    categoryId === 'accessories'
) {

    var accessoryLevelCell =
        document.createElement('td');

    accessoryLevelCell.textContent =
        item.level !== undefined &&
        item.level !== null
            ? String(item.level)
            : '—';

    row.appendChild(accessoryLevelCell);
}

if (
    categoryId === 'companions'
) {

    var statsCell =
        document.createElement('td');

    statsCell.textContent =
        item.stats
            ? item.stats
                .replace(/\*/g, '')
                .replace(/\n/g, ', ')
                .trim()
            : '—';

    row.appendChild(statsCell);
}

if (
    categoryId === 'companions'
) {

    var skillCell =
        document.createElement('td');

    skillCell.textContent =
        item.skill || '—';

    row.appendChild(skillCell);
}

if (
    categoryId === 'accessories'
) {

    var statsCell =
        document.createElement('td');

    statsCell.textContent =
item.abilities
    ? item.abilities
        .replace(/\*/g, '')
        .replace(/\n/g, ', ')
        .trim()
    : '—';

    row.appendChild(statsCell);
}

if (
    categoryId === 'auras'
) {

    var auraStatsCell =
        document.createElement('td');

    auraStatsCell.textContent =
        item.stats || '—';

    row.appendChild(auraStatsCell);
}

if (
    categoryId === 'auras'
) {

    var auraTypeCell =
        document.createElement('td');

    auraTypeCell.textContent =
        item.type || '—';

    row.appendChild(auraTypeCell);
}

if (
    categoryId === 'armor' ||
    categoryId === 'accessories' ||
    categoryId === 'companions' ||
    categoryId === 'auras' ||
    categoryId === 'miscellaneous' ||
    categoryId === 'longswords' ||
    categoryId === 'greatswords' ||
    categoryId === 'katanas' ||
    categoryId === 'rapiers' ||
    categoryId === 'spears' ||
    categoryId === 'scythes'
) {

    var obtainCell =
        document.createElement('td');

    if (item.obtain) {

        obtainCell.appendChild(
            renderObtain(
                item.obtain,
                item.unobtainable
            )
        );

    } else {

        obtainCell.textContent = '—';
    }

    row.appendChild(obtainCell);
}

if (
    categoryId === 'armor' ||
    categoryId === 'accessories' ||
    categoryId === 'miscellaneous' ||
    categoryId === 'longswords' ||
    categoryId === 'greatswords' ||
    categoryId === 'katanas' ||
    categoryId === 'rapiers' ||
    categoryId === 'spears' ||
    categoryId === 'scythes'
) {

    var rarityCell =
        document.createElement('td');

    rarityCell.textContent =
        item.rarity || '—';

    if (
        item.rarity &&
        CONFIG.rarityColors[item.rarity]
    ) {
        rarityCell.style.color =
            CONFIG.rarityColors[item.rarity];
    }

    row.appendChild(rarityCell);
}

        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    container.appendChild(table);
}


   function filterDetailedItems(items) {

    var search = state.search
        .trim()
        .toLowerCase();

    var levelMin =
        state.detailed.filters.levelMin;

    var levelMax =
        state.detailed.filters.levelMax;

var rarity =
    state.detailed.filters.rarity;

    return items.filter(function (item) {

if (
    search &&
    (
        typeof item.name !== 'string' ||
        !item.name
            .toLowerCase()
            .includes(search)
    )
) {
    return false;
}

if (
    state.currentCategory !== 'companions' &&
    state.currentCategory !== 'auras' &&
    state.currentCategory !== 'miscellaneous'
) {

    if (
        levelMin !== null &&
        (
            item.level === undefined ||
            item.level === null ||
            Number(item.level) < levelMin
        )
    ) {
        return false;
    }

    if (
        levelMax !== null &&
        (
            item.level === undefined ||
            item.level === null ||
            Number(item.level) > levelMax
        )
    ) {
        return false;
    }
}

if (
    rarity &&
    state.currentCategory !== 'companions' &&
    state.currentCategory !== 'auras' &&
    item.rarity !== rarity
) {
    return false;
}

var obtainable =
    state.detailed.filters.obtainable;

if (
    obtainable === 'obtainable' &&
    item.unobtainable === true
) {
    return false;
}

if (
    obtainable === 'unobtainable' &&
    item.unobtainable !== true
) {
    return false;
}

        return true;
    });
}

function getCardStatValue(item) {

    var category =
        state.currentCategory;

    if (
        category === 'longswords' ||
        category === 'greatswords' ||
        category === 'katanas' ||
        category === 'rapiers' ||
        category === 'spears' ||
        category === 'scythes'
    ) {
        var damage =
            String(item.dmg || '');

        var maxMatch =
            damage.match(
                /(?:Max|Maxed)\s*:\s*([\d,]+)/
            );

        if (maxMatch) {
            return Number(
                maxMatch[1].replace(/,/g, '')
            );
        }

        return null;
    }

    if (category === 'armor') {
        var defense =
            String(item.def || '');

        var defenseMatch =
            defense.match(/[\d,]+/);

        if (defenseMatch) {
            return Number(
                defenseMatch[0].replace(/,/g, '')
            );
        }

        return null;
    }

    if (category === 'accessories') {
        var abilities =
            String(item.abilities || '');

        var abilityMatches =
            abilities.match(
                /\+?[\d,]+(?:\.\d+)?%?/g
            );

        if (abilityMatches) {

            var abilityValues =
                abilityMatches.map(function (value) {

                    return Number(
                        value
                            .replace(/[+,%]/g, '')
                            .replace(/,/g, '')
                    );

                });

            return Math.max.apply(
                null,
                abilityValues
            );
        }

        return null;
    }

    if (
        category === 'companions' ||
        category === 'auras'
    ) {
        var stats =
            String(item.stats || '');

        var statMatches =
            stats.match(
                /\+?[\d,]+(?:\.\d+)?%?/g
            );

        if (statMatches) {

            var statValues =
                statMatches.map(function (value) {

                    return Number(
                        value
                            .replace(/[+,%]/g, '')
                            .replace(/,/g, '')
                    );

                });

            return Math.max.apply(
                null,
                statValues
            );
        }

        return null;
    }

    return null;
}

function filterCardItems(items) {

    var filters =
        state.cards.filters;

    var showLevelFilter =
        state.currentCategory !== 'companions' &&
        state.currentCategory !== 'auras' &&
        state.currentCategory !== 'miscellaneous';

    var showRarityFilter =
        state.currentCategory !== 'companions' &&
        state.currentCategory !== 'auras' &&
        state.currentCategory !== 'miscellaneous';

    var showStatsFilter =
        state.currentCategory === 'accessories' ||
        state.currentCategory === 'companions' ||
        state.currentCategory === 'auras';

    return items.filter(function (item) {

        if (
            state.search &&
            !String(item.name || '')
                .toLowerCase()
                .includes(
                    state.search.toLowerCase()
                )
        ) {
            return false;
        }

        var hasLevel =
            item.level !== undefined &&
            item.level !== null &&
            item.level !== '';

        if (
            showLevelFilter &&
            filters.levelMin !== null &&
            hasLevel &&
            Number(item.level) < filters.levelMin
        ) {
            return false;
        }

        if (
            showLevelFilter &&
            filters.levelMax !== null &&
            hasLevel &&
            Number(item.level) > filters.levelMax
        ) {
            return false;
        }

        if (
            showRarityFilter &&
            filters.rarities.length > 0 &&
            filters.rarities.indexOf(
                item.rarity
            ) === -1
        ) {
            return false;
        }

        var stat =
            getCardStatValue(item);

        if (
            showStatsFilter &&
            filters.minStat !== null &&
            (
                stat === null ||
                stat < filters.minStat
            )
        ) {
            return false;
        }

        if (
            showStatsFilter &&
            filters.maxStat !== null &&
            (
                stat === null ||
                stat > filters.maxStat
            )
        ) {
            return false;
        }

        if (
            filters.obtainable === 'obtainable' &&
            item.unobtainable === true
        ) {
            return false;
        }

        if (
            filters.obtainable === 'unobtainable' &&
            item.unobtainable !== true
        ) {
            return false;
        }

        return true;
    });
}










    function sortDetailedItems(items) {

        var sortedItems = items.slice();

        sortedItems.sort(function (a, b) {

            var valueA = a[
                state.detailed.sortBy
            ];

            var valueB = b[
                state.detailed.sortBy
            ];

            if (
                valueA === undefined ||
                valueA === null
            ) {
                return 1;
            }

            if (
                valueB === undefined ||
                valueB === null
            ) {
                return -1;
            }

            if (
                state.detailed.sortBy === 'level'
            ) {
                valueA = Number(valueA);
                valueB = Number(valueB);
            } else {
                valueA = String(valueA)
                    .toLowerCase();

                valueB = String(valueB)
                    .toLowerCase();
            }

            if (valueA < valueB) {
                return state.detailed.sortDirection === 'asc'
                    ? -1
                    : 1;
            }

            if (valueA > valueB) {
                return state.detailed.sortDirection === 'asc'
                    ? 1
                    : -1;
            }

            return 0;
        });

        return sortedItems;
    }

function formatDamage(damage) {

    if (typeof damage !== 'string') {
        return '';
    }

    if (
        /damage based on level/i.test(damage) ||
        /level based/i.test(damage)
    ) {
        return 'Varies';
    }

    var cleanMatch = damage.match(
        /Clean:\s*([^\n]+)/i
    );

    var maxMatch = damage.match(
        /Max(?:ed)?:\s*([^\n]+)/i
    );

    var clean = cleanMatch
        ? cleanMatch[1].trim()
        : '';

    var max = maxMatch
        ? maxMatch[1].trim()
        : '';

    if (clean && max) {
        return clean + ' / ' + max;
    }

    return clean || max || damage.trim();
}

function renderObtain(content, unobtainable) {

    var container = document.createElement('span');

    if (
        typeof content !== 'string' ||
        !content.trim()
    ) {
        container.textContent = '—';
        return container;
    }

content = content.replace(
    /(^|\s)\*/g,
    '$1'
);

content = content.replace(
    /<\/?s>/gi,
    ''
);

content = content.replace(
    /<small>\(formerly\)<\/small>/gi,
    ''
);

content = content.replace(
    /<small>(.*?)<\/small>/gi,
    '$1'
);

    function renderParts(parent, text) {

        var remaining = text;

        while (remaining) {

            var strikeStart = remaining.indexOf('~~');

if (strikeStart !== -1) {

    var beforeStrike =
        remaining.slice(0, strikeStart);

    if (beforeStrike) {
        renderParts(
            parent,
            beforeStrike
        );
    }

    var strikeEnd =
        remaining.indexOf(
            '~~',
            strikeStart + 2
        );

    if (strikeEnd !== -1) {

        renderParts(
            parent,
            remaining.slice(
                strikeStart + 2,
                strikeEnd
            )
        );

        remaining =
            remaining.slice(
                strikeEnd + 2
            );

        continue;
    }

    parent.appendChild(
        document.createTextNode('~~')
    );

    remaining =
        remaining.slice(
            strikeStart + 2
        );

    continue;
}

var linkMatch = remaining.match(
    /^\s*(?:\*\s*)?\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/
);

            if (linkMatch) {

                var link =
                    document.createElement('a');

link.href = 
    getSafeWikiUrl(
        linkMatch[1].trim()
    );

                link.textContent =
                    'Obtain';

if (parent.childNodes.length > 0) {
    parent.appendChild(
        document.createTextNode(' ')
    );
}

                parent.appendChild(link);

                remaining =
                    remaining.slice(
                        linkMatch[0].length
                    );

                continue;
            }

var plainObtain =
    remaining
        .replace(/~~/g, '')
        .trim()
        .toLowerCase();

if (
    plainObtain === 'shop' ||
    plainObtain === 'bundle'
) {

    var obtainLink =
        document.createElement('a');

    obtainLink.href =
        mw.util.getUrl(
            plainObtain === 'shop'
                ? 'Burst Store'
                : 'Bundles'
        );

    obtainLink.textContent =
        plainObtain === 'shop'
            ? 'Shop'
            : 'Bundle';

    parent.appendChild(obtainLink);

    remaining = '';

    continue;
}

            var nextLink =
                remaining.search(/\[\[/);

            var nextStrike =
                remaining.search(/~~/);

var next =
    remaining.length;

if (nextLink !== -1) {
    next = Math.min(next, nextLink);
}

if (nextStrike !== -1) {
    next = Math.min(next, nextStrike);
}

if (next === 0) {
    parent.appendChild(
        document.createTextNode(
            remaining.charAt(0)
        )
    );

    remaining =
        remaining.slice(1);

    continue;
}

parent.appendChild(
    document.createTextNode(
        remaining.slice(0, next)
    )
);

remaining =
    remaining.slice(next);
        }
    }

    renderParts(container, content);

if (unobtainable === true) {

    var strike =
        document.createElement('s');

    while (container.firstChild) {

        strike.appendChild(
            container.firstChild
        );
    }

    container.appendChild(strike);
}

    return container;
}

function renderWikiText(text) {

    var container = document.createElement('span');

    if (typeof text !== 'string' || !text.trim()) {
        return container;
    }

    var remaining = text;
    var linkPattern = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/;

    while (remaining) {

        var match = remaining.match(linkPattern);

        if (!match) {
            container.appendChild(
                document.createTextNode(remaining)
            );
            break;
        }

        var before = remaining.slice(
            0,
            match.index
        );

        if (before) {
            container.appendChild(
                document.createTextNode(before)
            );
        }

        var pageName = match[1].trim();

        var linkText = match[2]
            ? match[2].trim()
            : pageName;

        var link = document.createElement('a');

        link.href =
            getSafeWikiUrl(pageName);

        link.textContent =
            linkText;

        container.appendChild(link);

        remaining = remaining.slice(
            match.index + match[0].length
        );
    }

    return container;
}

function renderDescription(text) {

    var container =
        document.createElement('span');

    if (
        typeof text !== 'string' ||
        !text.trim()
    ) {
        return container;
    }

    var remaining = text;

    remaining =
        remaining.replace(
            /'''/g,
            ''
        );

    var linkPattern =
        /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/;

    while (remaining) {

        var match =
            remaining.match(
                linkPattern
            );

        if (!match) {

            container.appendChild(
                document.createTextNode(
                    remaining
                )
            );

            break;
        }

        var before =
            remaining.slice(
                0,
                match.index
            );

        if (before) {

            container.appendChild(
                document.createTextNode(
                    before
                )
            );
        }

        var pageName =
            match[1].trim();

        if (
            pageName
                .toLowerCase()
                .indexOf('file:') === 0
        ) {

            remaining =
                remaining.slice(
                    match.index +
                    match[0].length
                );

            continue;
        }

        var linkText =
            match[2]
                ? match[2].trim()
                : pageName;

        var link =
            document.createElement('a');

        link.href =
            getSafeWikiUrl(
                pageName
            );

        link.textContent =
            linkText;

        container.appendChild(
            link
        );

        remaining =
            remaining.slice(
                match.index +
                match[0].length
            );
    }

    return container;
}

function focusDatabaseSearchAnchor() {

    var anchor;

    if (
        state.currentView ===
        CONFIG.views.detailed
    ) {

        anchor =
            document.querySelector(
                '.item-database-learn-more'
            );

    } else if (
        state.currentView ===
        CONFIG.views.cards
    ) {

        anchor =
            document.querySelector(
                '.item-database-card-view-switcher'
            );

    }

    if (!anchor) {
        return;
    }

    anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function preserveScrollUpdate(callback, scrollToTop) {

    callback();

    if (!scrollToTop) {
        return;
    }

    requestAnimationFrame(
        function () {

            if (
                state.currentView ===
                CONFIG.views.detailed
            ) {

                var anchor =
                    document.querySelector(
                        '.item-database-learn-more'
                    );

                if (!anchor) {
                    return;
                }

                var rect =
                    anchor.getBoundingClientRect();

                window.scrollTo(
                    0,
                    Math.max(
                        0,
                        window.scrollY +
                        rect.top -
                        60
                    )
                );

            } else if (
                state.currentView ===
                CONFIG.views.cards
            ) {

                requestAnimationFrame(
                    function () {

                        requestAnimationFrame(
                            function () {

                                var anchor =
                                    document.querySelector(
                                        '.item-database-card-view-switcher'
                                    );

                                if (!anchor) {
                                    return;
                                }

                                var rect =
                                    anchor.getBoundingClientRect();

                                window.scrollTo(
                                    0,
                                    Math.max(
                                        0,
                                        window.scrollY +
                                        rect.top -
                                        60
                                    )
                                );

                            }
                        );

                    }
                );

            }

        }
    );
}

function renderDetailed() {

    var container = document.createElement('div');

    container.id =
        'item-database-detailed';

var detailedHeader = renderDetailedHeader();

if (detailedHeader) {
    container.appendChild(detailedHeader);
}

    var filters =
        document.createElement('div');

    filters.className =
        'item-database-detailed-filters';

    var hasFilters = false;

    if (
        state.currentCategory !== 'companions' &&
        state.currentCategory !== 'auras' &&
        state.currentCategory !== 'miscellaneous'
    ) {

        var levelMinInput =
            document.createElement('input');

        levelMinInput.type = 'number';
        levelMinInput.placeholder = 'Min Level';
        levelMinInput.min = '0';

        levelMinInput.value =
            state.detailed.filters.levelMin !== null
                ? state.detailed.filters.levelMin
                : '';

        var levelMaxInput =
            document.createElement('input');

        levelMaxInput.type = 'number';
        levelMaxInput.placeholder = 'Max Level';
        levelMaxInput.min = '0';

        levelMaxInput.value =
            state.detailed.filters.levelMax !== null
                ? state.detailed.filters.levelMax
                : '';

levelMinInput.addEventListener(
    'input',
    function () {

var minValue =
    Number(levelMinInput.value);

state.detailed.filters.levelMin =
    levelMinInput.value === '' ||
    !Number.isFinite(minValue) ||
    minValue < 0
        ? null
        : minValue;

        preserveScrollUpdate(
            renderDetailedList,
            true
        );
    }
);

        levelMaxInput.addEventListener(
            'input',
            function () {

var maxValue =
    Number(levelMaxInput.value);

state.detailed.filters.levelMax =
    levelMaxInput.value === '' ||
    !Number.isFinite(maxValue) ||
    maxValue < 0
        ? null
        : maxValue;

preserveScrollUpdate(
    renderDetailedList,
    true
);
            }
        );

        filters.appendChild(levelMinInput);
        filters.appendChild(levelMaxInput);

        hasFilters = true;
    }

    if (
        state.currentCategory !== 'companions' &&
        state.currentCategory !== 'auras'
    ) {

        var raritySelect =
            document.createElement('select');

        var rarityOptions = [
            'All Rarities',
            'Common',
            'Uncommon',
            'Rare',
            'Legendary',
            'Tribute',
            'Burst'
        ];

        rarityOptions.forEach(function (rarity) {

            var option =
                document.createElement('option');

            option.value =
                rarity === 'All Rarities'
                    ? ''
                    : rarity;

            option.textContent =
                rarity;

            if (
                rarity !== 'All Rarities' &&
                CONFIG.rarityColors[rarity]
            ) {
                option.style.color =
                    CONFIG.rarityColors[rarity];
            }

            raritySelect.appendChild(option);
        });

        raritySelect.value =
            state.detailed.filters.rarity || '';

        raritySelect.addEventListener(
            'change',
            function () {

                state.detailed.filters.rarity =
                    raritySelect.value || null;

preserveScrollUpdate(
    renderDetailedList,
    true
);
            }
        );

        filters.appendChild(raritySelect);

        hasFilters = true;
    }

var obtainabilitySelect =
    document.createElement('select');

var obtainabilityOptions = [
    {
        value: 'all',
        label: 'All'
    },
    {
        value: 'obtainable',
        label: 'Obtainable'
    },
    {
        value: 'unobtainable',
        label: 'Unobtainable'
    }
];

obtainabilityOptions.forEach(function (optionData) {

    var option =
        document.createElement('option');

    option.value =
        optionData.value;

    option.textContent =
        optionData.label;

    obtainabilitySelect.appendChild(option);
});

obtainabilitySelect.value =
    state.detailed.filters.obtainable;

obtainabilitySelect.addEventListener(
    'change',
    function () {

        state.detailed.filters.obtainable =
            obtainabilitySelect.value;

preserveScrollUpdate(
    renderDetailedList,
    true
);
    }
);

filters.appendChild(
    obtainabilitySelect
);

hasFilters = true;

if (hasFilters) {

    var sticky =
        document.createElement('div');

    sticky.className =
        'item-database-detailed-sticky';

    sticky.appendChild(
        filters
    );

    container.appendChild(
        sticky
    );
}

var list =
    document.createElement('div');

list.id =
    'item-database-detailed-list';

container.appendChild(
    list
);

    return container;
}

function getCardData(item) {

    var category =
        state.currentCategory;

    if (
        category === 'longswords' ||
        category === 'greatswords' ||
        category === 'katanas' ||
        category === 'rapiers' ||
        category === 'spears' ||
        category === 'scythes'
    ) {

        return {
            primary: formatDamage(item.dmg),
            secondary: item.obtain || '',
            type: 'weapon'
        };
    }

if (category === 'armor') {

    return {
        primary: formatDamage(item.def),
        secondary: item.obtain || '',
        type: 'armor'
    };
}

if (category === 'accessories') {

    return {
primary: String(item.abilities || '')
    .replace(/\s+(?=\+|\d+%)/g, ', '),
        secondary: item.obtain || '',
        type: 'accessory',
        expandablePrimary: true
    };
}

if (category === 'companions') {

    return {
        primary: String(item.stats || ''),
        secondary: String(item.skill || ''),
        obtain: String(item.obtain || ''),
        type: 'companion',
        expandablePrimary: true,
        expandableSecondary: true
    };
}

if (category === 'auras') {

    return {
        primary: String(item.stats || ''),
        secondary: String(item.obtain || ''),
        type: 'aura',
        expandablePrimary: true
    };
}

if (category === 'miscellaneous') {

    return {
        primary: item.description || '',
        secondary: item.obtain || '',
        type: 'miscellaneous',
        expandablePrimary: true
    };
}

    return {
        primary: '',
        secondary: '',
        type: 'default'
    };
}

function renderCardSecondary(content, unobtainable) {

    var container =
        document.createElement('span');

    if (!content) {
        container.textContent = '—';
        return container;
    }

    var text =
        String(content)
            .replace(/^\*+/gm, '')
            .trim();

    var wikiMatch =
        text.match(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/);

    if (wikiMatch) {

        var target =
            wikiMatch[1].trim();

        var label =
            wikiMatch[2]
                ? wikiMatch[2].trim()
                : target;

        var link =
            document.createElement('a');

 link.href = 
    getSafeWikiUrl(target);

        link.textContent =
            label;

        if (unobtainable) {
            link.style.textDecoration =
                'line-through';
        }

        container.appendChild(link);

        return container;
    }

    container.textContent =
        text.replace(/<[^>]*>/g, '');

    if (unobtainable) {
        container.style.textDecoration =
            'line-through';
    }

    return container;
}

var CARD_ICONS = {

    longsword: 'Steel Longsword.png',
    greatsword: 'Steel Greatsword.png',
    katana: 'Steel Katana.png',
    rapier: 'Steel Rapier.png',
    spear: 'Kobold Spear.png',
    scythe: 'Rose Reaper.png',
    armor: 'Blue Novice Armor.png',
    accessory: 'Novice Shield.png',
    companion: 'Kitsune Pals.png',
    aura: 'Cross.png',
    miscellaneous: 'Burst Upgrade Crystal.png'

};

function getCardIcon(item) {

    var type =
        String(item.type || '')
            .replace(/<[^>]*>/g, '')
            .toLowerCase();

    if (type.indexOf('longsword') !== -1) {
        return 'longsword';
    }

    if (type.indexOf('greatsword') !== -1) {
        return 'greatsword';
    }

    if (type.indexOf('katana') !== -1) {
        return 'katana';
    }

    if (type.indexOf('rapier') !== -1) {
        return 'rapier';
    }

    if (type.indexOf('spear') !== -1) {
        return 'spear';
    }

    if (type.indexOf('scythe') !== -1) {
        return 'scythe';
    }

    if (type.indexOf('armor') !== -1) {
        return 'armor';
    }

    if (type.indexOf('accessory') !== -1) {
        return 'accessory';
    }

    if (type.indexOf('pet') !== -1) {
        return 'companion';
    }

    if (type.indexOf('aura') !== -1) {
        return 'aura';
    }

    return 'miscellaneous';
}

function createCardExpandableText(content, renderer) {

    var wrapper =
        document.createElement('div');

    wrapper.className =
        'item-database-card-expandable';

    var text =
        document.createElement('span');

    var cleanContent =
        String(content || '')
            .replace(/^\*+/gm, '')
            .trim();

    if (renderer) {

        var rendered =
            renderer(cleanContent);

        while (rendered.firstChild) {

            text.appendChild(
                rendered.firstChild
            );
        }

    } else {

        text.textContent =
            cleanContent;
    }

    var readMore =
        document.createElement('button');

    readMore.type =
        'button';

    readMore.textContent =
        'Read more';

    readMore.className =
        'item-database-card-read-more';

    readMore.style.display =
        'none';

    wrapper.appendChild(text);
    wrapper.appendChild(readMore);

    return {
        wrapper: wrapper,
        text: text,
        button: readMore
    };
}


function setupCardExpandable(element) {

    if (!element || !element.text) {
        return;
    }

    requestAnimationFrame(function () {

        var text =
            element.text;

        if (
            text.scrollHeight >
            text.clientHeight
        ) {

            element.button.style.display =
                'block';

            element.button.addEventListener(
                'click',
                function () {

                    var expanded =
                        element.wrapper.classList.toggle(
                            'is-expanded'
                        );

                    element.button.textContent =
                        expanded
                            ? 'Show less'
                            : 'Read more';
                }
            );
        }
    });
}







var UPGRADE_FORMULAS = {
    weapon: {
        Common: {
            percentage: 0.04,
            maxUpgrade: 10
        },
        Uncommon: {
            percentage: 0.04,
            maxUpgrade: 10
        },
        Rare: {
            percentage: 0.04,
            maxUpgrade: 15
        },
        Legendary: {
            percentage: 0.05,
            maxUpgrade: 20
        },
        Tribute: {
            percentage: 0.05,
            maxUpgrade: 20
        },
        Burst: {
            percentage: 0.06,
            maxUpgrade: 25
        }
    },

    armor: {
        Common: {
            percentage: 0.04,
            maxUpgrade: 10
        },
        Uncommon: {
            percentage: 0.04,
            maxUpgrade: 10
        },
        Rare: {
            percentage: 0.026667,
            maxUpgrade: 15
        },
        Legendary: {
            percentage: 0.02,
            maxUpgrade: 20
        },
        Tribute: {
            percentage: 0.02,
            maxUpgrade: 20
        },
        Burst: {
            percentage: 0.016,
            maxUpgrade: 25
        }
    }
};


function getUpgradeData(item) {

    if (!item) {
        return null;
    }

    var categoryType = null;

    if (
        state.currentCategory === 'longswords' ||
        state.currentCategory === 'greatswords' ||
        state.currentCategory === 'katanas' ||
        state.currentCategory === 'rapiers' ||
        state.currentCategory === 'spears' ||
        state.currentCategory === 'scythes'
    ) {
        categoryType = 'weapon';
    }

    if (state.currentCategory === 'armor') {
        categoryType = 'armor';
    }

    if (!categoryType) {
        return null;
    }

    var rarity =
        String(item.rarity || '');

    var formula =
        UPGRADE_FORMULAS[categoryType] &&
        UPGRADE_FORMULAS[categoryType][rarity];

    if (!formula) {
        return null;
    }

    var stat =
        categoryType === 'weapon'
            ? String(item.dmg || '')
            : String(item.def || '');

    var cleanMatch =
        stat.match(
            /Clean\s*:\s*([\d,]+)/
        );

    var maxMatch =
        stat.match(
            /Max(?:ed)?\s*:\s*([\d,]+)/
        );

    if (!cleanMatch || !maxMatch) {
        return null;
    }

    var clean =
        Number(
            cleanMatch[1].replace(/,/g, '')
        );

    var max =
        Number(
            maxMatch[1].replace(/,/g, '')
        );

    if (
        !Number.isFinite(clean) ||
        !Number.isFinite(max) ||
        clean <= 0 ||
        max <= 0
    ) {
        return null;
    }

    var upgrades = [];

    for (
        var level = 0;
        level <= formula.maxUpgrade;
        level++
    ) {

        var value =
            Math.floor(
                clean +
                (
                    clean *
                    formula.percentage *
                    level
                )
            );

        upgrades.push({
            level: level,
            value: value
        });
    }

    return {
        clean: clean,
        max: max,
        rarity: rarity,
        percentage: formula.percentage,
        maxUpgrade: formula.maxUpgrade,
        upgrades: upgrades
    };
}

function sortCardItems(items) {

    var sortedItems =
        items.slice();

    var sortBy =
        state.cards.sortBy || 'level';

    var sortDirection =
        state.cards.sortDirection;

    sortedItems.sort(function (a, b) {

        if (sortBy === 'name') {

            var nameA =
                String(a.name || '')
                    .toLowerCase();

            var nameB =
                String(b.name || '')
                    .toLowerCase();

            if (nameA < nameB) {
                return sortDirection === 'asc'
                    ? -1
                    : 1;
            }

            if (nameA > nameB) {
                return sortDirection === 'asc'
                    ? 1
                    : -1;
            }

            return 0;
        }

        var levelA =
            Number(a.level);

        var levelB =
            Number(b.level);

        if (
            isNaN(levelA) &&
            isNaN(levelB)
        ) {
            return 0;
        }

        if (isNaN(levelA)) {
            return 1;
        }

        if (isNaN(levelB)) {
            return -1;
        }

        if (levelA !== levelB) {

            return sortDirection === 'asc'
                ? levelA - levelB
                : levelB - levelA;
        }

        return String(a.name || '')
            .localeCompare(
                String(b.name || '')
            );
    });

    return sortedItems;
}


function refreshCardsView() {

    var cardsContainer =
        document.querySelector(
            '.item-database-cards-view'
        );

    if (!cardsContainer) {
        renderDatabase();
        return;
    }

    var filters =
        renderCardFilters();

    var compareBar =
        renderCompareBar();

    var cards =
        renderCards();

    var controls =
        document.createElement('div');

    controls.className =
        'item-database-card-controls';

    var viewSwitcher =
        filters.querySelector(
            '.item-database-card-view-switcher'
        );

    if (viewSwitcher) {

        controls.appendChild(
            viewSwitcher
        );

    }

    var sticky =
        document.createElement('div');

    sticky.className =
        'item-database-card-sticky';

    var filterContainer =
        filters.querySelector(
            '.item-database-card-filters'
        );

    if (filterContainer) {

        sticky.appendChild(
            filterContainer
        );

    }

    if (compareBar) {

        sticky.appendChild(
            compareBar
        );

    }

    cardsContainer.replaceChildren();

    cardsContainer.appendChild(
        controls
    );

    cardsContainer.appendChild(
        sticky
    );

    cardsContainer.appendChild(
        cards
    );
}






function renderCardFilters() {

    var filters =
        state.cards.filters;

var showLevelFilter =
    state.currentCategory !== 'companions' &&
    state.currentCategory !== 'auras' &&
    state.currentCategory !== 'miscellaneous';

var showRarityFilter =
    state.currentCategory !== 'companions' &&
    state.currentCategory !== 'auras' &&
    state.currentCategory !== 'miscellaneous';

var showStatsFilter =
    state.currentCategory === 'accessories' ||
    state.currentCategory === 'companions' ||
    state.currentCategory === 'auras';

var wrapper =
    document.createElement('div');

wrapper.className =
    'item-database-card-controls';

var container =
    document.createElement('div');

container.className =
    'item-database-card-filters';

var viewSwitcher =
    document.createElement('div');

viewSwitcher.className =
    'item-database-card-view-switcher';

var cardsButton =
    document.createElement('button');

cardsButton.type =
    'button';

cardsButton.textContent =
    'Cards';

cardsButton.className =
    'item-database-view-button';

cardsButton.classList.toggle(
    'active',
    state.cards.view === 'cards'
);

cardsButton.addEventListener(
    'click',
    function () {

        setCardsView('cards');
    }
);

var compactButton =
    document.createElement('button');

compactButton.type =
    'button';

compactButton.textContent =
    'Compact';

compactButton.className =
    'item-database-view-button';

compactButton.classList.toggle(
    'active',
    state.cards.view === 'compact'
);

compactButton.addEventListener(
    'click',
    function () {

        setCardsView('compact');
    }
);

viewSwitcher.appendChild(
    cardsButton
);

viewSwitcher.appendChild(
    compactButton
);

    var title =
        document.createElement('div');

    title.className =
        'item-database-card-filters-title';

    title.textContent =
        'Advanced Filters';

    container.appendChild(title);

var primaryFiltersRow =
    document.createElement('div');

primaryFiltersRow.className =
    'item-database-card-primary-filters';

var sortGroup =
    document.createElement('div');

sortGroup.className =
    'item-database-card-filter-group';

var sortLabel =
    document.createElement('label');

sortLabel.textContent =
    'Sort';

var sortButtons =
    document.createElement('div');

sortButtons.className =
    'item-database-card-sort-buttons';

var nameButton =
    document.createElement('button');

nameButton.type =
    'button';

nameButton.textContent =
    state.cards.sortBy === 'name'
        ? (
            state.cards.sortDirection === 'asc'
                ? 'A-Z'
                : 'Z-A'
        )
        : 'A-Z';

nameButton.classList.toggle(
    'active',
    state.cards.sortBy === 'name'
);

var levelButton =
    document.createElement('button');

levelButton.type =
    'button';

levelButton.textContent =
    state.cards.sortBy === 'level'
        ? (
            state.cards.sortDirection === 'asc'
                ? 'Level ↑'
                : 'Level ↓'
        )
        : 'Level ↑';

levelButton.classList.toggle(
    'active',
    state.cards.sortBy === 'level'
);

nameButton.addEventListener(
    'click',
    function () {

        if (
            state.cards.sortBy === 'name'
        ) {

            state.cards.sortDirection =
                state.cards.sortDirection === 'asc'
                    ? 'desc'
                    : 'asc';

        } else {

            state.cards.sortBy =
                'name';

            state.cards.sortDirection =
                'asc';
        }

        refreshCardsView();
    }
);

levelButton.addEventListener(
    'click',
    function () {

        if (
            state.cards.sortBy === 'level'
        ) {

            state.cards.sortDirection =
                state.cards.sortDirection === 'asc'
                    ? 'desc'
                    : 'asc';

        } else {

            state.cards.sortBy =
                'level';

            state.cards.sortDirection =
                'asc';
        }

        refreshCardsView();
    }
);


sortButtons.appendChild(
    nameButton
);

if (showLevelFilter) {

    sortButtons.appendChild(
        levelButton
    );
}

sortGroup.appendChild(
    sortLabel
);

sortGroup.appendChild(
    sortButtons
);

primaryFiltersRow.appendChild(
    sortGroup
);







if (showLevelFilter) {

    var levelGroup =
        document.createElement('div');

    levelGroup.className =
        'item-database-card-filter-group';

    var levelLabel =
        document.createElement('span');

    levelLabel.textContent =
        'Level';

    levelGroup.appendChild(levelLabel);

    var levelMin =
        document.createElement('input');

    levelMin.type = 'number';
    levelMin.placeholder = 'Min';
    levelMin.min = '0';
    levelMin.className =
        'item-database-card-filter-level-min';

    var levelMax =
        document.createElement('input');

    levelMax.type = 'number';
    levelMax.placeholder = 'Max';
    levelMax.min = '0';
    levelMax.className =
        'item-database-card-filter-level-max';

    levelMin.value =
        filters.levelMin !== null
            ? filters.levelMin
            : '';

    levelMax.value =
        filters.levelMax !== null
            ? filters.levelMax
            : '';

    levelGroup.appendChild(levelMin);
    levelGroup.appendChild(levelMax);

primaryFiltersRow.appendChild(
    levelGroup
);

}

if (showRarityFilter) {

    var rarityGroup =
        document.createElement('div');

    rarityGroup.className =
        'item-database-card-filter-group';

    var rarityLabel =
        document.createElement('span');

    rarityLabel.textContent =
        'Rarity';

    rarityGroup.appendChild(
        rarityLabel
    );

    var rarityDropdown =
        document.createElement('div');

    rarityDropdown.className =
        'item-database-rarity-dropdown';

    var rarityButton =
        document.createElement('button');

    rarityButton.type =
        'button';

    rarityButton.className =
        'item-database-rarity-button';

    var rarityOptions =
        document.createElement('div');

    rarityOptions.className =
        'item-database-rarity-options';

[
    'All',
    'Common',
    'Uncommon',
    'Rare',
    'Legendary',
    'Tribute',
    'Burst'
].forEach(function (rarity) {

    var option =
        document.createElement('button');

    option.type =
        'button';

    option.className =
        'item-database-rarity-option';

    option.textContent =
        rarity;

    if (
        rarity === 'All' &&
        filters.rarities.length === 0
    ) {

        option.classList.add(
            'selected'
        );

    } else if (
        filters.rarities.indexOf(
            rarity
        ) !== -1
    ) {

        option.classList.add(
            'selected'
        );
    }

    option.addEventListener(
        'click',
        function () {

            if (rarity === 'All') {

                filters.rarities = [];

                rarityOptions
                    .querySelectorAll(
                        '.item-database-rarity-option'
                    )
                    .forEach(function (element) {

                        element.classList.remove(
                            'selected'
                        );

                    });

                option.classList.add(
                    'selected'
                );

            } else {

                var index =
                    filters.rarities.indexOf(
                        rarity
                    );

                if (index === -1) {

                    filters.rarities.push(
                        rarity
                    );

                    option.classList.add(
                        'selected'
                    );

                } else {

                    filters.rarities.splice(
                        index,
                        1
                    );

                    option.classList.remove(
                        'selected'
                    );
                }

                var allOption =
                    rarityOptions.querySelector(
                        '.item-database-rarity-option'
                    );

                if (
                    filters.rarities.length
                ) {

                    allOption.classList.remove(
                        'selected'
                    );

                } else {

                    allOption.classList.add(
                        'selected'
                    );
                }
            }

            updateRarityButton();

            preserveScrollUpdate(
                refreshCardsView,
                true
            );
        }
    );

    rarityOptions.appendChild(
        option
    );

});

    function updateRarityButton() {

        if (
            filters.rarities.length === 0
        ) {

            rarityButton.textContent =
                'All ▼';

            return;
        }

        rarityButton.textContent =
            filters.rarities.join(
                ', '
            ) +
            ' ▼';
    }

    updateRarityButton();

    rarityButton.addEventListener(
        'click',
        function () {

            rarityDropdown.classList.toggle(
                'open'
            );
        }
    );

    rarityDropdown.appendChild(
        rarityButton
    );

    rarityDropdown.appendChild(
        rarityOptions
    );

    rarityGroup.appendChild(
        rarityDropdown
    );

    primaryFiltersRow.appendChild(
        rarityGroup
    );
}

if (showStatsFilter) {

    var statGroup =
        document.createElement('div');

    statGroup.className =
        'item-database-card-filter-group';

    var statLabel =
        document.createElement('span');

    statLabel.textContent =
        'Stats';

    statGroup.appendChild(statLabel);

    var statMin =
        document.createElement('input');

    statMin.type = 'number';
    statMin.placeholder = 'Min';
    statMin.min = '0';

    statMin.className =
        'item-database-card-filter-stat-min';

    var statMax =
        document.createElement('input');

    statMax.type = 'number';
    statMax.placeholder = 'Max';
    statMax.min = '0';

    statMax.className =
        'item-database-card-filter-stat-max';

    statMin.value =
        filters.minStat !== null
            ? filters.minStat
            : '';

    statMax.value =
        filters.maxStat !== null
            ? filters.maxStat
            : '';

    statGroup.appendChild(statMin);
    statGroup.appendChild(statMax);

    container.appendChild(statGroup);

}

    var obtainGroup =
        document.createElement('div');

    obtainGroup.className =
        'item-database-card-filter-group';

    var obtainLabel =
        document.createElement('span');

    obtainLabel.textContent =
        'Obtainability';

    obtainGroup.appendChild(obtainLabel);

    var obtainSelect =
        document.createElement('select');

    obtainSelect.className =
        'item-database-card-filter-obtainable';

    [
        {
            value: 'all',
            label: 'All'
        },
        {
            value: 'obtainable',
            label: 'Obtainable'
        },
        {
            value: 'unobtainable',
            label: 'Unobtainable'
        }
    ].forEach(function (optionData) {

        var option =
            document.createElement('option');

        option.value =
            optionData.value;

        option.textContent =
            optionData.label;

        obtainSelect.appendChild(option);

    });

    obtainSelect.value =
        filters.obtainable;

    obtainSelect.addEventListener(
        'change',
        function () {

            filters.obtainable =
                obtainSelect.value;

preserveScrollUpdate(
    refreshCardsView,
    true
);
        }
    );

    obtainGroup.appendChild(
        obtainSelect
    );

primaryFiltersRow.appendChild(
    obtainGroup
);

    var clearButton =
        document.createElement('button');

    clearButton.type = 'button';

    clearButton.className =
        'item-database-card-filter-clear';

    clearButton.textContent =
        'Clear Filters';

    clearButton.addEventListener(
        'click',
        function () {

            filters.levelMin = null;
            filters.levelMax = null;
            filters.rarities = [];
            filters.minStat = null;
            filters.maxStat = null;
            filters.obtainable = 'all';

preserveScrollUpdate(
    refreshCardsView,
    true
);
        }
    );

primaryFiltersRow.appendChild(
    clearButton
);

container.appendChild(
    primaryFiltersRow
);

function applyLevelFilters() {

    var minValue = Number(levelMin.value);
    var maxValue = Number(levelMax.value);

    filters.levelMin =
        levelMin.value === '' ||
        !Number.isFinite(minValue) ||
        minValue < 0
            ? null
            : minValue;

    filters.levelMax =
        levelMax.value === '' ||
        !Number.isFinite(maxValue) ||
        maxValue < 0
            ? null
            : maxValue;

    preserveScrollUpdate(
        refreshCardsView,
        true
    );
}

function applyStatFilters() {

    var minValue = Number(statMin.value);
    var maxValue = Number(statMax.value);

    filters.minStat =
        statMin.value === '' ||
        !Number.isFinite(minValue) ||
        minValue < 0
            ? null
            : minValue;

    filters.maxStat =
        statMax.value === '' ||
        !Number.isFinite(maxValue) ||
        maxValue < 0
            ? null
            : maxValue;

    preserveScrollUpdate(
        refreshCardsView,
        true
    );
}

if (showLevelFilter) {

    levelMin.addEventListener(
        'change',
        applyLevelFilters
    );

    levelMax.addEventListener(
        'change',
        applyLevelFilters
    );
}

if (showStatsFilter) {

    statMin.addEventListener(
        'change',
        applyStatFilters
    );

    statMax.addEventListener(
        'change',
        applyStatFilters
    );
}

wrapper.appendChild(
    viewSwitcher
);

wrapper.appendChild(
    container
);

return wrapper;
}

function isWeaponCategory() {

    return (
        state.currentCategory === 'longswords' ||
        state.currentCategory === 'greatswords' ||
        state.currentCategory === 'katanas' ||
        state.currentCategory === 'rapiers' ||
        state.currentCategory === 'spears' ||
        state.currentCategory === 'scythes'
    );
}

function setCardsView(view) {

    if (
        view !== 'cards' &&
        view !== 'compact'
    ) {
        return;
    }

    state.cards.view = view;

    refreshCardsView();
}

function toggleCompareItem(item) {

    var index =
        state.compare.items.findIndex(
            function (compareItem) {
                return compareItem.name === item.name;
            }
        );

    if (index !== -1) {

        state.compare.items.splice(
            index,
            1
        );

    } else {

        if (
            state.compare.items.length >= 3
        ) {
            return;
        }

        state.compare.items.push(item);
    }

    refreshCardsView();
}


function isItemSelectedForCompare(item) {

    return state.compare.items.some(
        function (compareItem) {
            return compareItem.name === item.name;
        }
    );
}


function renderCompareBar() {

    if (!isWeaponCategory()) {
        return null;
    }

    var bar =
        document.createElement('div');

    bar.className =
        'item-database-compare-bar';

    var count =
        document.createElement('span');

    count.className =
        'item-database-compare-count';

    count.textContent =
        state.compare.items.length +
        ' / 3 selected';

    bar.appendChild(
        count
    );

    var selectedItems =
        document.createElement('div');

    selectedItems.className =
        'item-database-compare-selected-items';

    state.compare.items.forEach(
        function (item) {

            var selectedItem =
                document.createElement('button');

            selectedItem.type =
                'button';

            selectedItem.className =
                'item-database-compare-selected-item';

            selectedItem.textContent =
                item.name + ' ×';

            selectedItem.addEventListener(
                'click',
                function () {

                    var index =
                        state.compare.items.findIndex(
                            function (compareItem) {
                                return compareItem.name === item.name;
                            }
                        );

                    if (index === -1) {
                        return;
                    }

                    state.compare.items.splice(
                        index,
                        1
                    );

                    refreshCardsView();
                }
            );

            selectedItems.appendChild(
                selectedItem
            );
        }
    );

    bar.appendChild(
        selectedItems
    );

    var actions =
        document.createElement('div');

    actions.className =
        'item-database-compare-actions';

    var compareButton =
        document.createElement('button');

    compareButton.type =
        'button';

    compareButton.className =
        'item-database-compare-button';

    compareButton.textContent =
        'Compare Selected';

    compareButton.disabled =
        state.compare.items.length < 2;

    compareButton.addEventListener(
        'click',
        function () {

            if (
                state.compare.items.length < 2
            ) {
                return;
            }

            state.compare.active =
                true;

            renderCompareView();
        }
    );

    actions.appendChild(
        compareButton
    );

    var clearButton =
        document.createElement('button');

    clearButton.type =
        'button';

    clearButton.className =
        'item-database-compare-clear';

    clearButton.textContent =
        'Clear Selections';

    clearButton.disabled =
        state.compare.items.length === 0;

    clearButton.addEventListener(
        'click',
        function () {

            state.compare.items =
                [];

            state.compare.active =
                false;

            refreshCardsView();
        }
    );

    actions.appendChild(
        clearButton
    );

    bar.appendChild(
        actions
    );

    return bar;
}

function renderUpgradeView(item) {

    var app =
        document.getElementById(
            CONFIG.databaseContainerId
        );

    if (!app) {
        return;
    }

    var upgradeData =
        getUpgradeData(item);

    if (!upgradeData) {
        return;
    }

    var existingOverlay =
        document.getElementById(
            'item-database-upgrade-overlay'
        );

    if (existingOverlay) {
        existingOverlay.remove();
    }

    var overlay =
        document.createElement('div');

    overlay.id =
        'item-database-upgrade-overlay';

    var modal =
        document.createElement('div');

    modal.className =
        'item-database-upgrade-modal';

    var header =
        document.createElement('div');

    header.className =
        'item-database-upgrade-header';

    var title =
        document.createElement('h2');

    title.textContent =
        item.name;

    header.appendChild(
        title
    );

    var closeButton =
        document.createElement('button');

    closeButton.type =
        'button';

    closeButton.className =
        'item-database-upgrade-close';

    closeButton.textContent =
        'Close';

    closeButton.addEventListener(
        'click',
        function () {
            closeUpgradeView();
        }
    );

    header.appendChild(
        closeButton
    );

    modal.appendChild(
        header
    );

    var info =
        document.createElement('div');

    info.className =
        'item-database-upgrade-info';

    var rarity =
        document.createElement('span');

    rarity.textContent =
        'Rarity: ' +
        upgradeData.rarity;

    info.appendChild(
        rarity
    );

    var base =
        document.createElement('span');

    base.textContent =
        'Clean: ' +
        upgradeData.clean.toLocaleString();

    info.appendChild(
        base
    );

    var max =
        document.createElement('span');

    max.textContent =
        'Max: ' +
        upgradeData.max.toLocaleString();

    info.appendChild(
        max
    );

    modal.appendChild(
        info
    );

    var table =
        document.createElement('table');

    table.className =
        'item-database-upgrade-table';

    var thead =
        document.createElement('thead');

    var headerRow =
        document.createElement('tr');

    var levelHeader =
        document.createElement('th');

    levelHeader.textContent =
        'Upgrade Level';

    headerRow.appendChild(
        levelHeader
    );

    var valueHeader =
        document.createElement('th');

valueHeader.textContent =
    state.currentCategory === 'armor'
        ? 'Defense'
        : 'Damage';

    headerRow.appendChild(
        valueHeader
    );

    thead.appendChild(
        headerRow
    );

    table.appendChild(
        thead
    );

    var tbody =
        document.createElement('tbody');

    upgradeData.upgrades.forEach(
        function (upgrade) {

            var row =
                document.createElement('tr');

            var levelCell =
                document.createElement('td');

            levelCell.textContent =
                '+' +
                upgrade.level;

            row.appendChild(
                levelCell
            );

            var valueCell =
                document.createElement('td');

            valueCell.textContent =
                upgrade.value.toLocaleString();

            row.appendChild(
                valueCell
            );

            tbody.appendChild(
                row
            );
        }
    );

    table.appendChild(
        tbody
    );

    modal.appendChild(
        table
    );

    overlay.appendChild(
        modal
    );

    overlay.addEventListener(
        'click',
        handleUpgradeOverlayClick
    );

    document.addEventListener(
        'keydown',
        handleUpgradeEscape
    );

    document.addEventListener(
        'scroll',
        handleUpgradeScroll
    );

    app.appendChild(
        overlay
    );
}

function closeUpgradeView() {

    var overlay =
        document.getElementById(
            'item-database-upgrade-overlay'
        );

    if (!overlay) {
        return;
    }

    overlay.remove();

    document.removeEventListener(
        'keydown',
        handleUpgradeEscape
    );

    document.removeEventListener(
        'scroll',
        handleUpgradeScroll
    );
}

function handleUpgradeOverlayClick(event) {

    var overlay =
        document.getElementById(
            'item-database-upgrade-overlay'
        );

    if (!overlay) {
        return;
    }

    if (event.target === overlay) {
        closeUpgradeView();
    }
}

function handleUpgradeEscape(event) {

    if (event.key !== 'Escape') {
        return;
    }

    closeUpgradeView();
}

function handleUpgradeScroll() {
    closeUpgradeView();
}

function renderCompareView() {

    var app =
        document.getElementById(
            CONFIG.databaseContainerId
        );

    if (!app) {
        return;
    }

    var existingOverlay =
        document.getElementById(
            'item-database-compare-overlay'
        );

    if (existingOverlay) {
        existingOverlay.remove();
    }

    var overlay =
        document.createElement('div');

    overlay.id =
        'item-database-compare-overlay';

    var modal =
        document.createElement('div');

    modal.className =
        'item-database-compare-modal';

    var title =
        document.createElement('h2');

    title.textContent =
        'Compare Weapons';

    modal.appendChild(
        title
    );

    var closeButton =
        document.createElement('button');

    closeButton.type =
        'button';

    closeButton.className =
        'item-database-compare-close';

    closeButton.textContent =
        'Close';

closeButton.addEventListener(
    'click',
    function () {
        closeCompareView();
    }
);

    modal.appendChild(
        closeButton
    );

    var table =
        document.createElement('table');

    table.className =
        'item-database-compare-table';

    var headerRow =
        document.createElement('tr');

    var emptyHeader =
        document.createElement('th');

    emptyHeader.textContent =
        'Stat';

    headerRow.appendChild(
        emptyHeader
    );

    state.compare.items.forEach(
        function (item) {

            var header =
                document.createElement('th');

            header.textContent =
                item.name;

            headerRow.appendChild(
                header
            );
        }
    );

    table.appendChild(
        headerRow
    );

    var rows = [
        {
            label: 'Level',
            value: function (item) {

                return (
                    item.level !== undefined &&
                    item.level !== null &&
                    item.level !== ''
                )
                    ? String(item.level)
                    : '—';
            }
        },
        {
            label: 'Damage',
            value: function (item) {

                var damage =
                    String(item.dmg || '');

                var maxMatch =
                    damage.match(
                        /(?:Max|Maxed)\s*:\s*([\d,]+)/
                    );

                if (maxMatch) {
                    return maxMatch[1];
                }

                return damage || '—';
            }
        },
        {
            label: 'Crit',
            value: function (item) {

                return item.crit || '—';
            }
        },
        {
            label: 'Rarity',
            value: function (item) {

                return item.rarity || '—';
            }
        }
    ];

    rows.forEach(
        function (rowData) {

            var row =
                document.createElement('tr');

            var label =
                document.createElement('th');

            label.textContent =
                rowData.label;

            row.appendChild(
                label
            );

            state.compare.items.forEach(
                function (item) {

                    var cell =
                        document.createElement('td');

                    cell.textContent =
                        rowData.value(item);

                    row.appendChild(
                        cell
                    );
                }
            );

            table.appendChild(
                row
            );
        }
    );

    var obtainRow =
        document.createElement('tr');

    var obtainLabel =
        document.createElement('th');

    obtainLabel.textContent =
        'Cost / Drop';

    obtainRow.appendChild(
        obtainLabel
    );

    state.compare.items.forEach(
        function (item) {

            var cell =
                document.createElement('td');

            if (item.obtain) {

                cell.appendChild(
                    renderCardSecondary(
                        item.obtain,
                        item.unobtainable
                    )
                );

            } else {

                cell.textContent =
                    '—';
            }

            obtainRow.appendChild(
                cell
            );
        }
    );

    table.appendChild(
        obtainRow
    );

    modal.appendChild(
        table
    );

    overlay.appendChild(
        modal
    );

overlay.addEventListener(
    'click',
    handleCompareOverlayClick
);

document.addEventListener(
    'keydown',
    handleCompareEscape
);

document.addEventListener(
    'scroll',
    handleCompareScroll
);

    app.appendChild(
        overlay
    );
}

function closeCompareView() {

    var overlay =
        document.getElementById(
            'item-database-compare-overlay'
        );

    if (!overlay) {
        return;
    }

    overlay.remove();

    document.removeEventListener(
        'keydown',
        handleCompareEscape
    );

    document.removeEventListener(
        'scroll',
        handleCompareScroll
    );

    state.compare.active =
        false;
}


function handleCompareOverlayClick(event) {

    var overlay =
        document.getElementById(
            'item-database-compare-overlay'
        );

    if (!overlay) {
        return;
    }

    if (event.target === overlay) {
        closeCompareView();
    }
}


function handleCompareEscape(event) {

    if (event.key !== 'Escape') {
        return;
    }

    closeCompareView();
}

function renderCompactGallery() {

    var container =
        document.createElement('div');

    container.className =
        'item-database-compact-view';

    var items =
        getItemsForCategory(
            state.currentCategory
        );

    items = filterCardItems(items);
    items = sortCardItems(items);

    items.forEach(function (item) {

        var galleryItem =
            document.createElement('button');

        galleryItem.type =
            'button';

        galleryItem.className =
            'item-database-compact-item';

var cardData =
    getCardData(item);

if (cardData.type === 'companion') {

    galleryItem.style.setProperty(
        '--item-rarity-color',
        '#8B7DFF'
    );

} else if (cardData.type === 'aura') {

    galleryItem.style.setProperty(
        '--item-rarity-color',
        '#D98CFF'
    );

} else if (
    item.rarity &&
    CONFIG.rarityColors[item.rarity]
) {

    galleryItem.style.setProperty(
        '--item-rarity-color',
        CONFIG.rarityColors[item.rarity]
    );
}

        var icon =
            document.createElement('img');

        if (item.icon) {

            icon.src =
                '/images/' + item.icon;
        }

        icon.alt =
            item.name;

        icon.className =
            'item-database-compact-icon';

        icon.draggable =
            false;

        galleryItem.appendChild(
            icon
        );

        var name =
            document.createElement('span');

        name.className =
            'item-database-compact-name';

        name.textContent =
            item.name;

        galleryItem.appendChild(
            name
        );

        if (
            item.level !== undefined &&
            item.level !== null &&
            item.level !== ''
        ) {

            var level =
                document.createElement('span');

            level.className =
                'item-database-compact-level';

            level.textContent =
                'Level ' +
                String(item.level);

            galleryItem.appendChild(
                level
            );
        }

        galleryItem.addEventListener(
            'click',
            function () {

                showItemDetails(item);
            }
        );

        container.appendChild(
            galleryItem
        );
    });

    return container;
}

function showItemDetails(item) {

    var app =
        document.getElementById(
            CONFIG.databaseContainerId
        );

    if (!app || !item) {
        return;
    }

    var existingDetails =
        document.getElementById(
            'item-database-item-details'
        );

    if (existingDetails) {
        existingDetails.remove();
    }

    var details =
        document.createElement('div');

    details.id =
        'item-database-item-details';

    var card =
        document.createElement('div');

    card.className =
        'item-database-card';

    var backButton =
        document.createElement('button');

    backButton.type =
        'button';

    backButton.className =
        'item-database-details-back';

    backButton.textContent =
        'Back';

    backButton.addEventListener(
        'click',
        function () {
            closeItemDetails();
        }
    );

    card.appendChild(
        backButton
    );

    var layout =
        document.createElement('div');

    layout.className =
        'item-database-details-layout';

    var imageContainer =
        document.createElement('div');

    imageContainer.className =
        'item-database-details-image';

    if (item.icon) {

        var image =
            document.createElement('img');

        image.src =
            '/images/' + item.icon;

        image.alt =
            item.name || '';

        image.draggable =
            false;

        imageContainer.appendChild(
            image
        );
    }

    layout.appendChild(
        imageContainer
    );

    var info =
        document.createElement('div');

    info.className =
        'item-database-details-info';

var title =
    document.createElement('h2');

var titleLink =
    document.createElement('a');

titleLink.href =
    getSafeWikiUrl(
        getDetailsLink(item)
    );

titleLink.textContent =
    item.name || 'Unknown Item';

title.appendChild(
    titleLink
);

info.appendChild(
    title
);

    function addDetail(label, value, renderer) {

        if (
            value === undefined ||
            value === null ||
            value === ''
        ) {
            return;
        }

        var row =
            document.createElement('div');

        row.className =
            'item-database-details-row';

        var labelElement =
            document.createElement('strong');

        labelElement.textContent =
            label;

        row.appendChild(
            labelElement
        );

        var valueElement =
            document.createElement('span');

        if (renderer) {

            var rendered =
                renderer(value);

            if (rendered) {

                valueElement.appendChild(
                    rendered
                );
            }

        } else {

            valueElement.textContent =
                String(value)
                    .replace(/^\*+/gm, '')
                    .trim();
        }

        row.appendChild(
            valueElement
        );

        info.appendChild(
            row
        );
    }

function renderWikiContent(value) {

    var container =
        document.createElement('span');

    var text =
        String(value || '')
            .replace(/^\*+/gm, '')
            .trim();

    var parts =
        text.split(
            /(\[\[[^\]]+\]\])/
        );

    parts.forEach(
        function (part) {

            var fileMatch =
                part.match(
                    /^\[\[File:([^|\]]+)(?:\|([^\]]+))?\]\]$/i
                );

            if (fileMatch) {

    var image =
        document.createElement('img');

    image.src =
        '/wiki/Special:Redirect/file/' +
        encodeURIComponent(
            fileMatch[1].trim()
        );

    image.alt = '';

    image.draggable =
        false;

    image.style.width =
        '20px';

    image.style.height =
        '20px';

    image.style.objectFit =
        'contain';

    image.style.verticalAlign =
        'middle';

    container.appendChild(
        image
    );

    return;
}

            var match =
                part.match(
                    /^\[\[([^\]|]+)(?:\|([^\]]+))?\]\]$/
                );

            if (match) {

                var link =
                    document.createElement('a');

link.href = 
    getSafeWikiUrl(
        match[1].trim()
    );

                link.textContent =
                    match[2]
                        ? match[2].trim()
                        : match[1].trim();

                container.appendChild(
                    link
                );

            } else if (part) {

                var textNode =
                    document.createTextNode(
                        part
                            .replace(
                                /<br\s*\/?>/gi,
                                '\n'
                            )
                            .replace(
                                /<[^>]*>/g,
                                ''
                            )
                    );

                container.appendChild(
                    textNode
                );
            }
        }
    );

    return container;
}

function getDetailsLink(item) {

    var type =
        getCardData(item).type;

    if (type === 'companion') {

        if (item.chance) {

            return 'Obtainable Companions (Mobs / Quests)';

        }

        var companionObtainMatch =
            String(item.obtain || '').match(
                /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/
            );

        return companionObtainMatch
            ? companionObtainMatch[1].trim()
            : item.name;
    }

    if (type === 'aura') {

        if (item.chance) {

            return 'Obtainable Auras (Mobs / Quests)';

        }

        if (item.store) {

            return 'Obtainable Auras (Burst Store)';
        }

        var auraObtainMatch =
            String(item.obtain || '').match(
                /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/
            );

        return auraObtainMatch
            ? auraObtainMatch[1].trim()
            : item.name;
    }

    if (type === 'miscellaneous') {

        return 'Miscellaneous';
    }

    return item.name;
}

    function renderMultiline(value) {

        var container =
            document.createElement('span');

        String(value || '')
            .replace(/^\*+/gm, '')
            .split(/\n|<br\s*\/?>/i)
            .map(function (line) {
                return line
                    .replace(/<[^>]*>/g, '')
                    .trim();
            })
            .filter(Boolean)
            .forEach(
                function (line, index) {

                    if (index > 0) {

                        container.appendChild(
                            document.createElement('br')
                        );
                    }

                    container.appendChild(
                        document.createTextNode(
                            line
                        )
                    );
                }
            );

        return container;
    }

    var type =
        String(item.type || '')
            .replace(/<[^>]*>/g, '')
            .trim();

    addDetail(
        'Type',
        type
    );

    addDetail(
        'Rarity',
        item.rarity
    );

    addDetail(
        'Level',
        item.level
    );

    addDetail(
        'Damage',
        item.dmg,
        renderMultiline
    );

    addDetail(
        'Defense',
        item.def,
        renderMultiline
    );

    addDetail(
        'Crit',
        item.crit
    );

    addDetail(
        'Abilities',
        item.abilities,
        renderMultiline
    );

    addDetail(
        'Stats',
        item.stats,
        renderMultiline
    );

    addDetail(
        'Skill',
        item.skill,
        renderWikiContent
    );

    addDetail(
        'Chance',
        item.chance
    );

    addDetail(
        'Chance Cost',
        item.chanceCost
    );

addDetail(
    'Cost',
    item.cost,
    renderWikiContent
);

addDetail(
    'Obtain',
    item.obtain,
    renderWikiContent
);

    addDetail(
        'Description',
        item.description,
        renderMultiline
    );

    layout.appendChild(
        info
    );

    card.appendChild(
        layout
    );

    details.appendChild(
        card
    );

    var results =
        app.querySelector(
            '#item-database-results'
        );

    if (results) {

        results.style.display =
            'none';

        results.parentNode.insertBefore(
            details,
            results
        );

    } else {

        app.appendChild(
            details
        );
    }

    function closeItemDetails() {

        details.remove();

        if (results) {
            results.style.display = '';
        }

        document.removeEventListener(
            'keydown',
            handleDetailsEscape
        );

        document.removeEventListener(
            'scroll',
            handleDetailsScroll
        );

document.removeEventListener(
    'click',
    handleDetailsOutsideClick
);

    }

    function handleDetailsEscape(event) {

        if (event.key === 'Escape') {
            closeItemDetails();
        }
    }

function handleDetailsScroll() {
    closeItemDetails();
}

function handleDetailsOutsideClick(event) {

    if (
        details &&
        !details.contains(event.target)
    ) {
        closeItemDetails();
    }
}

document.addEventListener(
    'keydown',
    handleDetailsEscape
);

document.addEventListener(
    'scroll',
    handleDetailsScroll
);

setTimeout(function () {

    document.addEventListener(
        'click',
        handleDetailsOutsideClick
    );

}, 0);

    return details;
}


function renderCards() {

    if (state.cards.view === 'compact') {
        return renderCompactGallery();
    }

    var container =
        document.createElement('div');

    container.id =
        'item-database-cards';

    var items =
        getItemsForCategory(
            state.currentCategory
        );

    items = filterCardItems(items);
    items = sortCardItems(items);

    items.forEach(function (item) {

        var card =
            document.createElement('div');

        card.className =
            'item-database-card';

        var cardData =
            getCardData(item);

        var cardColor = '';

        if (
            cardData.type === 'companion'
        ) {

            cardColor = '#8B7DFF';

        } else if (
            cardData.type === 'aura'
        ) {

            cardColor = '#D98CFF';

        } else if (
            item.rarity &&
            CONFIG.rarityColors[item.rarity]
        ) {

            cardColor =
                CONFIG.rarityColors[item.rarity];
        }

        if (cardColor) {

            card.style.setProperty(
                '--item-rarity-color',
                cardColor
            );
        }

        var header =
            document.createElement('div');

        header.className =
            'item-database-card-header';

        var level =
            document.createElement('div');

        level.className =
            'item-database-card-level';

        if (
            cardData.type === 'weapon' ||
            cardData.type === 'armor' ||
            cardData.type === 'accessory'
        ) {

            level.textContent =
                item.level !== undefined &&
                item.level !== null
                    ? String(item.level)
                    : '—';

        } else {

            level.style.display =
                'none';
        }

        var crit =
            document.createElement('div');

        crit.className =
            'item-database-card-crit';

        if (cardData.type === 'weapon') {

            crit.textContent =
                item.crit || '—';

        } else {

            crit.style.display =
                'none';
        }

        var weaponIcon =
            document.createElement('div');

        weaponIcon.className =
            'item-database-card-weapon-icon';

        var iconType =
            getCardIcon(item);

        weaponIcon.dataset.type =
            iconType;

        var iconFile =
            CARD_ICONS[iconType];

        if (iconFile) {

            var iconImage =
                document.createElement('img');

            iconImage.src =
                '/wiki/Special:Redirect/file/' +
                encodeURIComponent(iconFile);

            iconImage.alt =
                '';

            iconImage.draggable =
                false;

            weaponIcon.appendChild(
                iconImage
            );
        }

        var image =
            document.createElement('img');

        if (item.icon) {

            image.src =
                '/images/' + item.icon;
        }

        image.alt =
            item.name;

        image.className =
            'item-database-card-image';

        var name =
            document.createElement('a');

        if (
            cardData.type === 'companion'
        ) {

            if (item.chance) {

                name.href =
                    mw.util.getUrl(
                        'Obtainable Companions (Mobs / Quests)'
                    );

            } else {

                var obtainMatch =
                    String(item.obtain || '').match(
                        /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/
                    );

name.href =
    getSafeWikiUrl(
        obtainMatch
            ? obtainMatch[1].trim()
            : item.name
    );
            }

        } else if (
            cardData.type === 'aura'
        ) {

            if (item.chance) {

                name.href =
                    mw.util.getUrl(
                        'Obtainable Auras (Mobs / Quests)'
                    );

            } else if (item.store) {

                name.href =
                    mw.util.getUrl(
                        'Obtainable Auras (Burst Store)'
                    );

            } else {

                var auraObtainMatch =
                    String(item.obtain || '').match(
                        /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/
                    );

name.href =
    getSafeWikiUrl(
        auraObtainMatch
            ? auraObtainMatch[1].trim()
            : item.name
    );
            }

        } else if (
            cardData.type === 'miscellaneous'
        ) {

            name.href =
                mw.util.getUrl(
                    'Miscellaneous'
                );

        } else {

name.href =
    getSafeWikiUrl(
        item.name
    );
        }

        name.textContent =
            item.name;

        name.className =
            'item-database-card-name';

        var damage =
            document.createElement('div');

        damage.className =
            'item-database-card-damage';

        if (cardData.expandablePrimary) {

            var primaryExpandable =
                createCardExpandableText(
                    cardData.primary,
                    cardData.type === 'miscellaneous'
                        ? renderDescription
                        : null
                );

            damage.appendChild(
                primaryExpandable.wrapper
            );

            setupCardExpandable(
                primaryExpandable
            );

        } else {

            var damageText =
                document.createElement('span');

            damageText.textContent =
                cardData.primary;

            damage.appendChild(
                damageText
            );
        }

        var obtain =
            document.createElement('div');

        obtain.className =
            'item-database-card-obtain';

        var obtainText =
            document.createElement('div');

        if (cardData.secondary) {

            if (
                cardData.expandableSecondary
            ) {

                var secondaryExpandable =
                    createCardExpandableText(
                        cardData.secondary
                    );

                obtainText.appendChild(
                    secondaryExpandable.wrapper
                );

                setupCardExpandable(
                    secondaryExpandable
                );

            } else {

                obtainText.appendChild(
                    renderCardSecondary(
                        cardData.secondary,
                        item.unobtainable
                    )
                );
            }

        } else {

            obtainText.textContent =
                '—';
        }

        obtain.appendChild(
            obtainText
        );

        if (
            cardData.type === 'companion' &&
            cardData.obtain
        ) {

            var companionObtain =
                document.createElement('div');

            companionObtain.className =
                'item-database-card-companion-obtain';

            companionObtain.appendChild(
                renderCardSecondary(
                    cardData.obtain,
                    item.unobtainable
                )
            );

            obtain.appendChild(
                companionObtain
            );
        }

        header.appendChild(level);
        header.appendChild(weaponIcon);
        header.appendChild(crit);

        card.appendChild(header);
        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(damage);
        card.appendChild(obtain);

        var cardActions =
            document.createElement('div');

        cardActions.className =
            'item-database-card-actions';

        var upgradeData =
            getUpgradeData(item);

        if (upgradeData) {

            var upgradeButton =
                document.createElement('button');

            upgradeButton.type =
                'button';

            upgradeButton.className =
                'item-database-card-upgrades';

            upgradeButton.textContent =
                'Upgrades';

            upgradeButton.addEventListener(
                'click',
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    renderUpgradeView(item);
                }
            );

            cardActions.appendChild(
                upgradeButton
            );
        }

        if (isWeaponCategory()) {

            var compareButton =
                document.createElement('button');

            compareButton.type =
                'button';

            compareButton.className =
                'item-database-card-compare';

            var selected =
                isItemSelectedForCompare(item);

            compareButton.textContent =
                selected
                    ? 'Remove'
                    : 'Compare';

            compareButton.classList.toggle(
                'selected',
                selected
            );

            compareButton.disabled =
                !selected &&
                state.compare.items.length >= 3;

            compareButton.addEventListener(
                'click',
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    toggleCompareItem(item);
                }
            );

            cardActions.appendChild(
                compareButton
            );
        }

        if (cardActions.children.length > 0) {

            card.appendChild(
                cardActions
            );
        }

        container.appendChild(card);
    });

    return container;
}





function handleCompareScroll() {

    closeCompareView();
}

function renderDatabase() {

    var app = document.getElementById(
        CONFIG.databaseContainerId
    );

    if (!app) {
        return;
    }

    var adminPanel =
        document.getElementById(
            'item-database-admin'
        );

    app.textContent = '';

    if (state.isLoading) {

        var loading = document.createElement('div');

        loading.className =
            'item-database-loading';

        loading.textContent =
            'Loading database...';

        app.appendChild(loading);

        return;
    }

if (
    !document.getElementById(
        'item-database-guide'
    )
) {
    renderGuide();
}

app.appendChild(
    renderDatabaseNavigation()
);

if (state.currentView === CONFIG.views.detailed) {

    app.appendChild(
        renderDetailed()
    );

renderDetailedList();

} else if (state.currentView === CONFIG.views.cards) {

    var cardsContainer =
        document.createElement('div');

    cardsContainer.className =
        'item-database-cards-view';

    var filters =
        renderCardFilters();

    var controls =
        document.createElement('div');

    controls.className =
        'item-database-card-controls';

    var viewSwitcher =
        filters.querySelector(
            '.item-database-card-view-switcher'
        );

    if (viewSwitcher) {

        controls.appendChild(
            viewSwitcher
        );

    }

    var sticky =
        document.createElement('div');

    sticky.className =
        'item-database-card-sticky';

    var filterContainer =
        filters.querySelector(
            '.item-database-card-filters'
        );

    if (filterContainer) {

        sticky.appendChild(
            filterContainer
        );

    }

    var compareBar =
        renderCompareBar();

    if (compareBar) {

        sticky.appendChild(
            compareBar
        );

    }

    cardsContainer.appendChild(
        controls
    );

    cardsContainer.appendChild(
        sticky
    );

    cardsContainer.appendChild(
        renderCards()
    );

    app.appendChild(
        cardsContainer
    );

}

var userGroups =
    mw.config.get('wgUserGroups') || [];

var canManage =
    userGroups.indexOf('sysop') !== -1 ||
    userGroups.indexOf('bureaucrat') !== -1;

if (canManage && adminPanel) {

    adminPanel.style.display =
        'none';

    adminPanel.style.position =
        'fixed';

    adminPanel.style.right =
        '20px';

    adminPanel.style.bottom =
        '75px';

    adminPanel.style.width =
        '420px';

    adminPanel.style.maxHeight =
        '80vh';

    adminPanel.style.overflowY =
        'auto';

    adminPanel.style.zIndex =
        '9998';

    app.appendChild(
        adminPanel
    );
}

if (canManage) {

    var adminButton =
        document.createElement('button');

    adminButton.id =
        'item-database-admin-button';

    adminButton.type =
        'button';

    adminButton.textContent =
        '⚙️';

    adminButton.style.position =
        'fixed';

    adminButton.style.right =
        '20px';

    adminButton.style.bottom =
        '20px';

    adminButton.style.width =
        '42px';

    adminButton.style.height =
        '42px';

    adminButton.style.zIndex =
        '9999';

    adminButton.style.cursor =
        'pointer';

    adminButton.addEventListener(
        'click',
        function () {

            if (!adminPanel) {
                return;
            }

if (
    adminPanel.style.display ===
    'none'
) {

    adminPanel.style.display =
        'block';

    requestAnimationFrame(
        function () {

            adminPanel.classList.add(
                'admin-panel-open'
            );

        }
    );

} else {

    adminPanel.classList.remove(
        'admin-panel-open'
    );

    setTimeout(
        function () {

            adminPanel.style.display =
                'none';

        },
        180
    );

}

        }
    );

    app.appendChild(
        adminButton
    );

}
}

    /* =========================================================
       7. EVENTS
       ========================================================= */

    function handleGuideNavigation(event) {

    var button =
        event.target.closest(
            '.item-database-learn-more'
        );

    if (!button) {
        return;
    }

    var guideId =
        button.getAttribute(
            'data-guide-id'
        );

    if (!guideId) {
        return;
    }

    var guide =
        document.getElementById(
            'item-database-guide'
        );

    if (!guide) {
        return;
    }

    var guideSectionId =
        guideId;

    if (
        guideId === 'weapon-types-longswords' ||
        guideId === 'weapon-types-greatswords' ||
        guideId === 'weapon-types-katanas' ||
        guideId === 'weapon-types-rapiers' ||
        guideId === 'weapon-types-spears' ||
        guideId === 'weapon-types-scythes'
    ) {
        guideSectionId = 'weapon-types';
    }

    var guideButton =
        guide.querySelector(
            '.item-database-guide-button[data-guide-id="' +
            guideSectionId +
            '"]'
        );

    if (!guideButton) {
        var buttons =
            guide.querySelectorAll(
                '.item-database-guide-button'
            );

        buttons.forEach(function (button) {

            if (
                button.textContent.trim() ===
                getGuideButtonTitle(guideSectionId)
            ) {
                guideButton = button;
            }

        });
    }

    if (!guideButton) {
        return;
    }

    if (
        guide.classList.contains(
            'is-hidden'
        )
    ) {
        var toggleButton =
            guide.querySelector(
                '.item-database-guide-toggle'
            );

        if (toggleButton) {
            toggleButton.click();
        }
    }

guideButton.click();

if (
    guideId.indexOf('weapon-types-') === 0
) {

    var weaponTypeName =
        guideId
            .replace(
                'weapon-types-',
                ''
            );

    weaponTypeName =
        weaponTypeName.charAt(0).toUpperCase() +
        weaponTypeName.slice(1);

    var weaponTypeButton =
        Array.from(
            guide.querySelectorAll(
                '.item-database-weapon-type-button'
            )
        ).find(function (button) {

            return button.textContent.trim() ===
                weaponTypeName;

        });

    if (weaponTypeButton) {
        weaponTypeButton.click();
    }
}

setTimeout(function () {

var targetId =
    guideId.indexOf('weapon-types-') === 0
        ? guideId
        : 'guide-' + guideId;

var target =
    document.getElementById(
        targetId
    );

    if (!target) {
        return;
    }

    var targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        80;

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });

}, 50);
}


function getGuideButtonTitle(sectionId) {

    var titles = {
        overview: 'Overview',
        rarity: 'Rarity',
        forge: 'Forge / Upgrade Crystals',
        'weapon-types': 'Weapon Types',
        armor: 'Armor',
        accessories: 'Accessories',
        companions: 'Companions',
        auras: 'Auras',
        miscellaneous: 'Miscellaneous'
    };

    return titles[sectionId] || '';
}

    document.addEventListener(
        'click',
        handleGuideNavigation
    );

    initialize();

})();