(function () {

    if (mw.config.get('wgPageName') !== 'Item_Database_(New)') {
        return;
    }

    var app = document.getElementById('item-database-app');

    if (!app) {
        console.error('Item Database container not found.');
        return;
    }

    var userGroups = mw.config.get('wgUserGroups') || [];

    var isAdmin =
        userGroups.indexOf('sysop') !== -1;

    var isBureaucrat =
        userGroups.indexOf('bureaucrat') !== -1;

    var canUpdate =
        isAdmin || isBureaucrat;

    app.innerHTML = `
        <div class="item-database">

            <div class="item-database-header">
                <h1>Item Database</h1>
                <p>
                    Browse and search the SwordBurst 2 items.
                </p>
            </div>

            <div class="item-database-content">

                <div class="item-database-search">

                    <input
                        id="item-database-search-input"
                        type="text"
                        placeholder="Search for an item..."
                    >

                    <button
                        id="item-database-search-button"
                    >
                        Search
                    </button>

                </div>

                <div
                    id="item-database-results"
                    class="item-database-results"
                ></div>

            </div>

            <div
                id="item-database-admin"
                class="item-database-admin"
            ></div>

        </div>
    `;

    var searchInput =
        document.getElementById(
            'item-database-search-input'
        );

    var searchButton =
        document.getElementById(
            'item-database-search-button'
        );

    var results =
        document.getElementById(
            'item-database-results'
        );

function parseWikiLinks(text) {

    if (!text) {
        return '';
    }

    text = text.replace(
        /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,
        function (match, target, label) {

            if (
                target
                    .trim()
                    .toLowerCase()
                    .indexOf('file:') === 0
            ) {

                var fileName =
                    target
                        .trim()
                        .replace(
                            /^file:/i,
                            ''
                        );

                var options =
                    label || '';

                var sizeMatch =
                    options.match(
                        /(\d+)px/i
                    );

                var size =
                    sizeMatch
                        ? sizeMatch[1] + 'px'
                        : '20px';

                var img =
                    document.createElement(
                        'img'
                    );

                img.src =
                    mw.util.getUrl(
                        'Special:Redirect/file/' +
                        fileName
                    );

                img.style.height =
                    size;

                img.style.width =
                    'auto';

                img.style.verticalAlign =
                    'middle';

                return img.outerHTML;

            }

            var link =
                document.createElement(
                    'a'
                );

            link.href =
                mw.util.getUrl(
                    target
                );

            link.textContent =
                label || target;

            return link.outerHTML;

        }
    );

    text = text.replace(
        /\[([a-z]+:\/\/[^\s\]]+)(?:\s+([^\]]+))?\]/gi,
        function (match, url, label) {

            var link =
                document.createElement(
                    'a'
                );

            link.href =
                url;

            link.textContent =
                label || url;

            link.target =
                '_blank';

            link.rel =
                'noopener noreferrer';

            return link.outerHTML;

        }
    );

    return text;

}



function createItemLink(item) {

    var type =
        String(item && item.type || '')
            .trim()
            .toLowerCase();

    var noLink =
        type === 'pet' ||
        type === 'aura' ||
        type === 'body aura';

    if (noLink) {

        var text =
            document.createElement('span');

        text.textContent =
            item && item.name
                ? item.name
                : 'Unnamed Item';

        return text;

    }

    var link =
        document.createElement('a');

    link.href =
        mw.util.getUrl(
            item.name
        );

    link.textContent =
        item.name;

    return link;

}



    searchButton.addEventListener(
        'click',
        function () {

            var query =
                searchInput.value.trim();

            if (!query) {

                results.innerHTML =
                    '<p>Enter an item name.</p>';

                return;
            }

            results.innerHTML =
                '<p>Searching...</p>';

            getDatabase()

                .then(function (database) {

                    var search =
                        query.toLowerCase();

                    var matches =
                        Object.keys(database)
                            .filter(function (name) {

                                return name
                                    .toLowerCase()
                                    .includes(search);

                            });

                    if (!matches.length) {

                        results.innerHTML =
                            '<p>No items found.</p>';

                        return;
                    }

results.innerHTML =
    '';

var gallery =
    document.createElement('div');

gallery.className =
    'item-database-gallery';

window.itemDatabaseLastItems =
    matches.map(
        function (name) {
            return database[name];
        }
    );

matches.forEach(
    function (name) {

        var item =
            database[name];

        var entry =
            document.createElement('div');

        entry.className =
            'item-database-gallery-item';

        var icon =
            document.createElement('img');

        if (item.icon) {

            icon.src =
                mw.util.getUrl(
                    'Special:Redirect/file/' +
                    item.icon
                );

        }

        icon.alt =
            item.name || 'Item';

        icon.className =
            'item-database-gallery-icon';

        var itemName =
            document.createElement('div');

        itemName.className =
            'item-database-gallery-name';

        itemName.textContent =
            item.name
                ? item.name
                : 'Unnamed Item';


var itemLevel =
    document.createElement('div');

itemLevel.className =
    'item-database-gallery-level';

itemLevel.textContent =
    item.level
        ? 'Level ' + item.level
        : '';

        entry.appendChild(
            icon
        );

        entry.appendChild(
            itemName
        );

entry.appendChild(
    itemLevel
);

        entry.addEventListener(
            'click',
            function () {

                if (
                    typeof window.itemDatabaseShowItemDetails ===
                    'function'
                ) {

                    window.itemDatabaseShowItemDetails(
                        item
                    );

                }

            }
        );

        gallery.appendChild(
            entry
        );

    }
);

results.appendChild(
    gallery
);

                })

                .catch(function (error) {

                    console.error(
                        '===== DATABASE SEARCH ERROR ====='
                    );

                    console.error(error);

                    results.innerHTML =
                        '<p>Unable to load the database.</p>';

                });

        }
    );

    searchInput.addEventListener(
        'keydown',
        function (event) {

            if (event.key === 'Enter') {
                searchButton.click();
            }

        }
    );

    var adminPanel =
        document.getElementById(
            'item-database-admin'
        );

    if (!canUpdate) {

        adminPanel.remove();

        return;

    }

    adminPanel.innerHTML = `

        <div class="item-database-admin-panel">

            <div class="item-database-admin-title">
                Database Administration
            </div>

            <div class="item-database-admin-search">

                <input
                    id="item-database-update-search"
                    type="text"
                    placeholder="Search item to update..."
                >

                <button
                    id="item-database-update-item"
                >
                    Update Item
                </button>

            </div>

            <div class="item-database-divider"></div>

            <button
                id="item-database-update-all"
                class="item-database-update-all"
            >
                Update Entire Database
            </button>


            <div class="item-database-divider"></div>

            <button
                id="item-database-scan-collectibles"
                class="item-database-update-all"
            >
                Scan Auras/Body Auras
            </button>

<button
    id="item-database-scan-pets"
    class="item-database-update-all"
>
    Scan Pets
</button>

            <div
                id="item-database-progress"
                class="item-database-progress"
            >

                <div
                    id="item-database-progress-text"
                >
                    Status: Ready
                </div>

                <div
                    class="item-database-progress-bar"
                >

                    <div
                        id="item-database-progress-fill"
                    ></div>

                </div>

                <div
                    id="item-database-progress-count"
                ></div>

            </div>

        </div>

    `;

    var excludedItemNames = new Set([

        "Abaddon's Visage",
        "Abyssal Heart",
        "A.C.W Striker",
        "Anti-Conflict",
        "Aquareaver",
        "Ashened",
        "Azavee",
        "Blitzklinge",
        "Broken Wish",
        "Candy Bags",
        "Candies",
        "Conflict Cape",
        "Code.error",
        "D0nut",
        "Demon's Nightmare",
        "Demon's Conflict",
        "Deific Touch",
        "Divine Rapier",
        "Dragons Fang",
        "Equinox fragment",
        "Exitium Regis",
        "Emerald's Wrath",
        "Festive Gifts",
        "Glacier Falls",
        "Hero's Guardian (Shield)",
        "Industrializer",
        "Infinity Wave",
        "Mari's Striking Star of the Cursed Winds",
        "Nightmarish Craft Items",
        "Nightmare Craft Items",
        "Nightmare Candy Bag",
        "Nightmarish Candies",
        "Ohm Messiah",
        "OG Worldslayer",
        "Plasma Cape",
        "Respawn Anchor",
        "Rekka no Rangetsu",
        "Ryujin Watatsumi",
        "Shadow Shard",
        "Shard of Banishment",
        "Shard of Judgement",
        "Starburst",
        "Spooky Craft Items",
        "Starshattering Winter",
        "Starlight",
        "Upgrade Crystal",
        "Upgrade Protection Scroll",
        "Undying Flame Essence",
        "Venom's Fang",
        "Vel",
        "Violence",
        "Yato's Calamity",

        "Jack-o's Light Aura",
        "Specter Encounter Aura",
        "Azure Voltage Aura",
        "Fuscia Malice Aura",
        "Magic Flare Aura",
        "Toxic Ooze Aura",
        "Souls Lament Aura",
        "Wraith's Curse Aura",
        "Scarlet Madness Aura",
        "Hell's Star Aura",
        "Aethierian Nova Aura",
        "Starblitz Aura",
        "Final Spectrum",
        "Plasma Aura",
        "Nightmaric Aberration",
        "Vicious Spirit Aura"

    ]);

    var scanItemIDButton =
        document.createElement('button');

    scanItemIDButton.id =
        'item-database-scan-itemid';

    scanItemIDButton.textContent =
        'Scan ItemID';

    scanItemIDButton.style.marginTop =
        '10px';

    adminPanel
        .querySelector('.item-database-admin-panel')
        .appendChild(scanItemIDButton);

var scanMiscellaneousButton =
    document.createElement('button');

scanMiscellaneousButton.id =
    'item-database-scan-miscellaneous';

scanMiscellaneousButton.textContent =
    'Scan Miscellaneous';

scanMiscellaneousButton.style.marginTop =
    '10px';

adminPanel
    .querySelector('.item-database-admin-panel')
    .appendChild(scanMiscellaneousButton);


    var updateSearch =
        document.getElementById(
            'item-database-update-search'
        );

    var updateItemButton =
        document.getElementById(
            'item-database-update-item'
        );

    var updateAllButton =
        document.getElementById(
            'item-database-update-all'
        );

var scanCollectiblesButton =
    document.getElementById(
        'item-database-scan-collectibles'
    );

var scanPetsButton =
    document.getElementById(
        'item-database-scan-pets'
    );
var removeItemButton =
    document.createElement('button');

removeItemButton.id =
    'item-database-remove-item';

removeItemButton.textContent =
    'Remove Item';

removeItemButton.style.marginTop =
    '10px';

adminPanel
    .querySelector('.item-database-admin-panel')
    .appendChild(removeItemButton);

    var progressText =
        document.getElementById(
            'item-database-progress-text'
        );

    var progressFill =
        document.getElementById(
            'item-database-progress-fill'
        );

    var progressCount =
        document.getElementById(
            'item-database-progress-count'
        );

    var updating = false;

    function setUpdating(state) {

        updating = state;

        updateItemButton.disabled =
            state;

        updateAllButton.disabled =
            state;

        updateSearch.disabled =
            state;

        searchInput.disabled =
            state;

        searchButton.disabled =
            state;

        scanItemIDButton.disabled =
            state;

        scanCollectiblesButton.disabled =
            state;

scanPetsButton.disabled =
    state;

removeItemButton.disabled =
    state;

scanMiscellaneousButton.disabled =
    state;

    }

scanCollectiblesButton.addEventListener(
    'click',
    function () {

        if (updating) {
            return;
        }

        var confirmed =
            confirm(
                'Scan all pages for Aura Gallery?\n\n' +
                'This will NOT edit or change any pages.'
            );

        if (!confirmed) {
            return;
        }

        setUpdating(true);

        setProgress(
            0,
            1,
            'Finding Aura Gallery pages...'
        );

        console.log(
            '===== COLLECTIBLE SCANNER STARTED ====='
        );

        var api =
            new mw.Api();

        var pageTitles = [];

function findAuraPages(
    template,
    continueToken
) {

            var params = {

                action:
                    'query',

                list:
    'embeddedin',

eititle:
    template,

einamespace:
    0,

eilimit:
    'max',

                formatversion:
                    2

            };

if (continueToken) {

    params.eicontinue =
        continueToken;

}

            return api.get(
                params
            )

            .then(
                function (data) {

if (
    data.query &&
    data.query.embeddedin
) {

    data.query.embeddedin.forEach(
                            function (result) {

                                pageTitles.push(
                                    result.title
                                );

                            }
                        );

                    }

if (
    data.continue &&
    data.continue.eicontinue
) {

return findAuraPages(
    template,
    data.continue.eicontinue
);

}

                    return pageTitles;

                }
            );

        }

Promise.all([
    findAuraPages(
        'Template:Aura Gallery'
    ),

    findAuraPages(
        'Template:Store Aura Gallery'
    ),

    findAuraPages(
        'Template:Drop Aura Gallery'
    )
])

.then(function () {

    return pageTitles;

})
        .then(
            function (pages) {

                console.log(
                    '===== AURA GALLERY PAGES FOUND ====='
                );

                console.log(
                    'Total pages:',
                    pages.length
                );

                if (!pages.length) {

                    throw new Error(
                        'No Aura Gallery pages found.'
                    );

                }

                var allAuraResults = [];

                var checked =
                    0;

                function scanNextBatch() {

                    var batch =
                        pages.slice(
                            checked,
                            checked + 20
                        );

   if (!batch.length) {

    console.log(
        '===== AURA GALLERY SCAN COMPLETE ====='
    );

    console.log(
        'Pages checked:',
        pages.length
    );

    console.log(
        'Total Aura Gallery entries:',
        allAuraResults.length
    );

    getDatabase()
        .then(function (database) {

            console.log(
                '===== AURA DATABASE CHECK ====='
            );



            console.log(
                '===== AURA DATABASE SYNC ====='
            );

            var confirmed =
                confirm(
                    'Found ' +
                    allAuraResults.length +
                    ' Aura Gallery entries.\n\n' +
                    'All existing Aura and Body Aura entries will be replaced with the results of this scan.\n\n' +
                    'All other database entries will remain unchanged.\n\n' +
                    'Continue?'
                );

            if (!confirmed) {

                console.log(
                    'Aura database update cancelled.'
                );

                setUpdating(false);

                return;

            }



var removedAuras = 0;

Object.keys(database).forEach(
    function (name) {

        var item =
            database[name];

        if (!item) {
            return;
        }

        var type =
            String(
                item.type || ''
            )
                .trim()
                .toLowerCase();

        if (
            type === 'aura' ||
            type === 'body aura'
        ) {

            delete database[name];

            removedAuras++;

        }

    }
);

console.log(
    'Auras removed from database:',
    removedAuras
);


            allAuraResults.forEach(
                function (aura) {

                    database[
                        aura.name
                    ] =
                        aura;

                }
            );

            console.log(
                'Auras added from scan:',
                allAuraResults.length
            );

            saveDatabase(
                database
            )

                .then(function () {

                    console.log(
                        '===== AURA DATABASE UPDATED ====='
                    );

                    console.log(
                        'Auras replaced:',
                        removedAuras
                    );

                    console.log(
                        'Auras added:',
                        allAuraResults.length
                    );

                    console.log(
                        'Total database entries:',
                        Object.keys(database).length
                    );

                    setUpdating(false);

                })

                .catch(function (error) {

                    console.error(
                        '===== ERROR SAVING AURAS ====='
                    );

                    console.error(
                        error
                    );

                    setUpdating(false);

                });

        })

    return;

}

                    api.get({

                        action:
                            'query',

                        prop:
                            'revisions',

                        titles:
                            batch.join('|'),

                        rvprop:
                            'content',

                        rvslots:
                            'main',

                        formatversion:
                            2

                    })

                    .then(
                        function (data) {

                            var apiPages =
                                data.query &&
                                data.query.pages;

                            if (
                                !apiPages ||
                                !apiPages.length
                            ) {

                                checked +=
                                    batch.length;

                                setProgress(
                                    checked,
                                    pages.length,
                                    'Scanning Aura Gallery pages...'
                                );

                                scanNextBatch();

                                return;

                            }

                            apiPages.forEach(
                                function (page) {

                                    var content =
                                        page.revisions &&
                                        page.revisions[0] &&
                                        page.revisions[0].slots &&
                                        page.revisions[0].slots.main &&
                                        page.revisions[0].slots.main.content;

                                    if (!content) {
                                        return;
                                    }

var auraMatches =
    content.match(
        /\{\{\s*(?:Aura Gallery|Store Aura Gallery|Drop Aura Gallery)\b[\s\S]*?\}\}/gi
    ) || [];

                                    if (!auraMatches.length) {
                                        return;
                                    }

                                    auraMatches.forEach(
                                        function (
                                            auraTemplate,
                                            index
                                        ) {

var auraPosition =
    content.indexOf(
        auraTemplate
    );

var contentBeforeAura =
    auraPosition >= 0
        ?
        content.substring(
            0,
            auraPosition
        )
        :
        '';

var chestMatches =
    contentBeforeAura.match(
        /\[\[File:([^|\]]+?)(?:\|[^\]]*)?\]\]/gi
    );

var chestName =
    '';

if (
    chestMatches &&
    chestMatches.length
) {

    var lastChest =
        chestMatches[
            chestMatches.length - 1
        ];

    var chestMatch =
        lastChest.match(
            /\[\[File:([^|\]]+?)(?:\|[^\]]*)?\]\]/i
        );

    if (chestMatch) {

        chestName =
            chestMatch[1]
                .trim()
                .replace(
                    /\.(?:png|jpg|jpeg|gif)$/i,
                    ''
                );

    }

}

var isBodyAura =
    /\{\{\s*BodyA\b/i.test(
        content
    );

var pageUnobtainable =
    /\{\{\s*Unobtainable\b/i.test(
        content
    );

var isStoreAura =
    /\{\{\s*Store Aura Gallery\b/i.test(
        auraTemplate
    );

var isDropAura =
    /\{\{\s*Drop Aura Gallery\b/i.test(
        auraTemplate
    );

console.log(
    'AURA TEMPLATE TYPE:',
    isStoreAura
        ? 'Store Aura Gallery'
        : isDropAura
            ? 'Drop Aura Gallery'
            : 'Aura Gallery'
);


                                           function getAuraParam(
    parameter
) {

    var regex =
        new RegExp(
            '\\|\\s*' +
            parameter +
            '\\s*=\\s*([^\\n\\r]+)',
            'i'
        );

    var match =
        auraTemplate.match(
            regex
        );

    if (!match) {
        return '';
    }

    return match[1].trim();

}

var name =
    getAuraParam(
        'title'
    );

var icon =
    getAuraParam(
        'icon'
    );

var obtain =
    getAuraParam(
        'drop'
    );

var chance =
    getAuraParam(
        'chance'
    );

var chanceCost =
    getAuraParam(
        'chancecost'
    );

var cost =
    getAuraParam(
        'cost'
    );

var stats =
    getAuraParam(
        'stats'
    );

var bodyParam =
    getAuraParam(
        'body'
    );

var bundleParam =
    getAuraParam(
        'bundle'
    );

var unobtainableParam =
    getAuraParam(
        'unobtainable'
    );

if (isStoreAura) {

    if (
        bundleParam
            .toLowerCase() ===
        'yes'
    ) {

        obtain =
            'Bundle';

    } else {

        obtain =
            'Shop';

    }

} else if (isDropAura) {

    if (!obtain) {

        obtain =
            page.title;

    }

} else if (!obtain) {

    obtain =
        '[[' +
        page.title +
        ']]';

}

var isUnobtainable =
    pageUnobtainable ||
    unobtainableParam
        .toLowerCase() ===
        'yes';

if (!name) {

    console.warn(
        'Aura Gallery without title on:',
        page.title
    );

    return;

}

var auraData = {

    name:
        name,

type:
    (
        isStoreAura ||
        isDropAura
    )
        ?
        (
            bodyParam
                .toLowerCase() === 'yes'
                ?
                'Body Aura'
                :
                'Aura'
        )
        :
        (
            isBodyAura
                ?
                'Body Aura'
                :
                'Aura'
        ),

    obtain:
        obtain,

    icon:
        icon,

    chance:
        chance,

    chanceCost:
        chanceCost,

cost:
    cost,

stats:
    stats,

bundle:
        bundleParam
            .toLowerCase() === 'yes',

store:
    isStoreAura,

    unobtainable:
        isUnobtainable

};

allAuraResults.push(
    auraData
);


                                            console.log(
                                                'Found Aura:',
                                                auraData
                                            );

                                        }
                                    );

                                }
                            );

                            checked +=
                                batch.length;

                            setProgress(
                                checked,
                                pages.length,
                                'Scanning Aura Gallery pages...'
                            );

                            scanNextBatch();

                        }
                    )

                    .catch(
                        function (error) {

                            console.error(
                                'Error scanning batch:',
                                error
                            );

                            checked +=
                                batch.length;

                            scanNextBatch();

                        }
                    );

                }

                scanNextBatch();

            }
        )

        .catch(
            function (error) {

                console.error(
                    '===== COLLECTIBLE SCANNER ERROR ====='
                );

                console.error(
                    error
                );

                setUpdating(false);

            }
        );

    }
);



scanMiscellaneousButton.addEventListener(
    'click',
    function () {

        if (updating) {
            return;
        }

        var confirmed =
            confirm(
                'Scan Miscellaneous Gallery?\n\n' +
                'This will NOT edit or change any pages.'
            );

        if (!confirmed) {
            return;
        }

        setUpdating(true);

        setProgress(
            0,
            1,
            'Reading Miscellaneous Gallery...'
        );

        console.log(
            '===== MISCELLANEOUS SCANNER STARTED ====='
        );

        var api =
            new mw.Api();

        api.get({

            action:
                'query',

            prop:
                'revisions',

           titles:
    'Miscellaneous',

            rvprop:
                'content',

            rvslots:
                'main',

            formatversion:
                2

        })

        .then(
            function (data) {

                var page =
                    data.query &&
                    data.query.pages &&
                    data.query.pages[0];

                if (
                    !page ||
                    !page.revisions ||
                    !page.revisions[0]
                ) {

                    throw new Error(
                        'Miscellaneous Gallery page not found.'
                    );

                }

                var content =
                    page.revisions[0]
                        .slots
                        .main
                        .content || '';

                console.log(
                    '===== MISCELLANEOUS GALLERY PAGE LOADED ====='
                );

                console.log(
                    'Characters:',
                    content.length
                );

                var galleryMatches =
                    content.match(
                        /\{\{\s*Miscellaneous Gallery\b[\s\S]*?\}\}/gi
                    ) || [];

                console.log(
                    'Miscellaneous Gallery templates found:',
                    galleryMatches.length
                );

                var allMiscellaneousResults = [];

galleryMatches.forEach(
    function (
        galleryTemplate,
        index
    ) {

        function getMiscellaneousParam(
            parameter
        ) {

            var regex =
                new RegExp(
                    '\\|\\s*' +
                    parameter +
                    '\\s*=\\s*([^\\n\\r]+)',
                    'i'
                );

            var match =
                galleryTemplate.match(
                    regex
                );

            if (!match) {
                return '';
            }

            return match[1].trim();

        }

        var name =
            getMiscellaneousParam(
                'title'
            );

        var icon =
            getMiscellaneousParam(
                'icon'
            );

        var rarity =
            getMiscellaneousParam(
                'rarity'
            );

        var category =
            getMiscellaneousParam(
                'category'
            );

        var obtain =
            getMiscellaneousParam(
                'obtain'
            );

        var chance =
            getMiscellaneousParam(
                'chance'
            );

        var state =
            getMiscellaneousParam(
                'state'
            );

        var description =
            getMiscellaneousParam(
                'desc'
            );

        name =
            name
                .replace(
                    /^\[\[([^|\]]+)\|([^\]]+)\]\]$/,
                    '$2'
                )
                .replace(
                    /^\[\[([^\]]+)\]\]$/,
                    '$1'
                )
                .trim();

        icon =
            icon
                .replace(
                    /^\[\[(?:File|Image):\s*/i,
                    ''
                )
                .replace(
                    /\|[\s\S]*$/,
                    ''
                )
                .replace(
                    /\]\]$/,
                    ''
                )
                .trim();

        var unobtainable =
            state
                .trim()
                .toLowerCase() ===
            'unobtainable';

        var miscellaneousData = {

            name:
                name,

            type:
                'Miscellaneous',

            rarity:
                rarity,

            category:
                category,

            obtain:
                obtain,

            chance:
                chance,

            description:
                description,

            icon:
                icon,

            unobtainable:
                unobtainable

        };

        allMiscellaneousResults.push(
            miscellaneousData
        );

        console.log(
            '===== MISCELLANEOUS #' +
            (index + 1) +
            ' ====='
        );

        console.log(
            miscellaneousData
        );

    }
);

console.log(
    '===== MISCELLANEOUS EXTRACTION COMPLETE ====='
);

console.log(
    'Total Miscellaneous:',
    allMiscellaneousResults.length
);

console.log(
    allMiscellaneousResults
);

getDatabase()

    .then(
        function (database) {

            console.log(
                '===== MISCELLANEOUS DATABASE CHECK ====='
            );

            var confirmed =
                confirm(
                    'Found ' +
                    allMiscellaneousResults.length +
                    ' Miscellaneous Gallery entries.\n\n' +
                    'All existing Miscellaneous entries will be replaced with the results of this scan.\n\n' +
                    'All other database entries will remain unchanged.\n\n' +
                    'Continue?'
                );

            if (!confirmed) {

                console.log(
                    'Miscellaneous database update cancelled.'
                );

                setUpdating(false);

                return;

            }

            var removedMiscellaneous =
                0;

            Object.keys(database).forEach(
                function (name) {

                    var item =
                        database[name];

                    if (!item) {
                        return;
                    }

                    if (
                        item.type &&
                        item.type.toLowerCase() ===
                        'miscellaneous'
                    ) {

                        delete database[name];

                        removedMiscellaneous++;

                    }

                }
            );

            console.log(
                'Miscellaneous entries removed from database:',
                removedMiscellaneous
            );

            allMiscellaneousResults.forEach(
                function (miscellaneous) {

                    database[
                        miscellaneous.name
                    ] =
                        miscellaneous;

                }
            );

            console.log(
                'Miscellaneous entries added from scan:',
                allMiscellaneousResults.length
            );

            saveDatabase(
                database
            )

                .then(
                    function () {

                        console.log(
                            '===== MISCELLANEOUS DATABASE UPDATED ====='
                        );

                        console.log(
                            'Miscellaneous replaced:',
                            removedMiscellaneous
                        );

                        console.log(
                            'Miscellaneous added:',
                            allMiscellaneousResults.length
                        );

                        console.log(
                            'Total database entries:',
                            Object.keys(database).length
                        );

                        setProgress(
                            allMiscellaneousResults.length,
                            allMiscellaneousResults.length,
                            'Miscellaneous database updated!'
                        );

                        setUpdating(false);

                    }
                )

                .catch(
                    function (error) {

                        console.error(
                            '===== ERROR SAVING MISCELLANEOUS ====='
                        );

                        console.error(
                            error
                        );

                        progressText.textContent =
                            'Error saving Miscellaneous: ' +
                            error.message;

                        progressFill.style.width =
                            '0%';

                        progressCount.textContent =
                            '';

                        setUpdating(false);

                    }
                );

        }
    )

    .catch(
        function (error) {

            console.error(
                '===== MISCELLANEOUS DATABASE ERROR ====='
            );

            console.error(
                error
            );

            progressText.textContent =
                'Error loading database: ' +
                error.message;

            progressFill.style.width =
                '0%';

            progressCount.textContent =
                '';

            setUpdating(false);

        }
    );

            }
        )

        .catch(
            function (error) {

                console.error(
                    '===== MISCELLANEOUS SCANNER ERROR ====='
                );

                console.error(
                    error
                );

                progressText.textContent =
                    'Error: ' +
                    error.message;

                progressFill.style.width =
                    '0%';

                progressCount.textContent =
                    '';

                setUpdating(false);

            }
        );

    }
);



scanPetsButton.addEventListener(
    'click',
    function () {

        if (updating) {
            return;
        }

        var confirmed =
            confirm(
                'Scan all pages for Pets Gallery?\n\n' +
                'This will NOT edit or change any pages.'
            );

        if (!confirmed) {
            return;
        }

        setUpdating(true);

        setProgress(
            0,
            1,
            'Finding Pets Gallery pages...'
        );

        console.log(
            '===== PETS SCANNER STARTED ====='
        );

        var api =
            new mw.Api();

        var pageTitles = [];

        function findPetPages(
            continueToken
        ) {

            var params = {

                action:
                    'query',

                list:
                    'embeddedin',

                eititle:
                    'Template:Pets Gallery',

                einamespace:
                    0,

                eilimit:
                    'max',

                formatversion:
                    2

            };

            if (continueToken) {

                params.eicontinue =
                    continueToken;

            }

            return api.get(
                params
            )

            .then(
                function (data) {

                    if (
                        data.query &&
                        data.query.embeddedin
                    ) {

                        data.query.embeddedin.forEach(
                            function (result) {

                                pageTitles.push(
                                    result.title
                                );

                            }
                        );

                    }

                    if (
                        data.continue &&
                        data.continue.eicontinue
                    ) {

                        return findPetPages(
                            data.continue.eicontinue
                        );

                    }

                    return pageTitles;

                }
            );

        }

        findPetPages()

            .then(
                function (pages) {

                    console.log(
                        '===== PETS GALLERY PAGES FOUND ====='
                    );

                    console.log(
                        'Total pages:',
                        pages.length
                    );

                    if (!pages.length) {

                        throw new Error(
                            'No Pets Gallery pages found.'
                        );

                    }

                    var allPetResults = [];

                    var checked =
                        0;

                    function scanNextBatch() {

                        var batch =
                            pages.slice(
                                checked,
                                checked + 20
                            );

                        if (!batch.length) {

                            console.log(
                                '===== PETS GALLERY SCAN COMPLETE ====='
                            );

                            console.log(
                                'Pages checked:',
                                pages.length
                            );

                            console.log(
                                'Total Pets Gallery entries:',
                                allPetResults.length
                            );

                            getDatabase()

                                .then(
                                    function (database) {

                                        console.log(
                                            '===== PET DATABASE CHECK ====='
                                        );

                                        var confirmed =
                                            confirm(
                                                'Found ' +
                                                allPetResults.length +
                                                ' Pets Gallery entries.\n\n' +
                                                'All existing Pet entries will be replaced with the results of this scan.\n\n' +
                                                'All other database entries will remain unchanged.\n\n' +
                                                'Continue?'
                                            );

                                        if (!confirmed) {

                                            console.log(
                                                'Pet database update cancelled.'
                                            );

                                            setUpdating(false);

                                            return;

                                        }

                                        var removedPets =
                                            0;

                                        Object.keys(database).forEach(
                                            function (name) {

                                                var item =
                                                    database[name];

                                                if (!item) {
                                                    return;
                                                }

                                                if (
                                                    item.type &&
                                                    item.type.toLowerCase() ===
                                                    'pet'
                                                ) {

                                                    delete database[name];

                                                    removedPets++;

                                                }

                                            }
                                        );

                                        console.log(
                                            'Pets removed from database:',
                                            removedPets
                                        );

                                        allPetResults.forEach(
                                            function (pet) {

                                                database[
                                                    pet.name
                                                ] =
                                                    pet;

                                            }
                                        );

                                        console.log(
                                            'Pets added from scan:',
                                            allPetResults.length
                                        );

                                        saveDatabase(
                                            database
                                        )

                                            .then(
                                                function () {

                                                    console.log(
                                                        '===== PET DATABASE UPDATED ====='
                                                    );

                                                    console.log(
                                                        'Pets replaced:',
                                                        removedPets
                                                    );

                                                    console.log(
                                                        'Pets added:',
                                                        allPetResults.length
                                                    );

                                                    console.log(
                                                        'Total database entries:',
                                                        Object.keys(database).length
                                                    );

                                                    setUpdating(false);

                                                }
                                            )

                                            .catch(
                                                function (error) {

                                                    console.error(
                                                        '===== ERROR SAVING PETS ====='
                                                    );

                                                    console.error(
                                                        error
                                                    );

                                                    setUpdating(false);

                                                }
                                            );

                                    }
                                )

                                .catch(
                                    function (error) {

                                        console.error(
                                            '===== PET DATABASE ERROR ====='
                                        );

                                        console.error(
                                            error
                                        );

                                        setUpdating(false);

                                    }
                                );

                            return;

                        }

                        api.get({

                            action:
                                'query',

                            prop:
                                'revisions',

                            titles:
                                batch.join('|'),

                            rvprop:
                                'content',

                            rvslots:
                                'main',

                            formatversion:
                                2

                        })

                        .then(
                            function (data) {

                                var apiPages =
                                    data.query &&
                                    data.query.pages;

                                if (
                                    !apiPages ||
                                    !apiPages.length
                                ) {

                                    checked +=
                                        batch.length;

                                    setProgress(
                                        checked,
                                        pages.length,
                                        'Scanning Pets Gallery pages...'
                                    );

                                    scanNextBatch();

                                    return;

                                }

                                apiPages.forEach(
                                    function (page) {

                                        var content =
                                            page.revisions &&
                                            page.revisions[0] &&
                                            page.revisions[0].slots &&
                                            page.revisions[0].slots.main &&
                                            page.revisions[0].slots.main.content;

                                        if (!content) {
                                            return;
                                        }

                                        var petMatches =
                                            content.match(
                                                /\{\{\s*Pets Gallery\b[\s\S]*?\}\}/gi
                                            ) || [];

                                        if (!petMatches.length) {
                                            return;
                                        }

                                        petMatches.forEach(
                                            function (
                                                petTemplate
                                            ) {

                                                function getPetParam(
                                                    parameter
                                                ) {

                                                    var regex =
                                                        new RegExp(
                                                            '\\|\\s*' +
                                                            parameter +
                                                            '\\s*=\\s*([^\\n\\r]+)',
                                                            'i'
                                                        );

                                                    var match =
                                                        petTemplate.match(
                                                            regex
                                                        );

                                                    if (!match) {
                                                        return '';
                                                    }

                                                    return match[1].trim();

                                                }

                                                var name =
                                                    getPetParam(
                                                        'title'
                                                    );

                                                var icon =
                                                    getPetParam(
                                                        'icon'
                                                    );

var petPosition =
    content.indexOf(
        petTemplate
    );

var contentBeforePet =
    petPosition >= 0
        ?
        content.substring(
            0,
            petPosition
        )
        :
        '';

var chestMatches =
    contentBeforePet.match(
        /\[\[File:([^|\]]+?)(?:\|[^\]]*)?\]\]/gi
    );

var chestName =
    '';

if (
    chestMatches &&
    chestMatches.length
) {

    var lastChest =
        chestMatches[
            chestMatches.length - 1
        ];

    var chestMatch =
        lastChest.match(
            /\[\[File:([^|\]]+?)(?:\|[^\]]*)?\]\]/i
        );

    if (chestMatch) {

chestName =
    chestMatch[1]
        .trim()
        .replace(
            /\.(?:png|jpg|jpeg|gif)$/i,
            ''
        )
        .replace(
            /\s+Icon$/i,
            ''
        );

    }

}

                                                var obtain =
                                                    getPetParam(
                                                        'obtain'
                                                    );

                                                var chance =
                                                    getPetParam(
                                                        'chance'
                                                    );

                                                var stats =
                                                    getPetParam(
                                                        'stats'
                                                    );

                                                var skill =
                                                    getPetParam(
                                                        'skill'
                                                    );

                                                var unobtainableParam =
                                                    getPetParam(
                                                        'unobtainable'
                                                    );

if (!obtain && chestName) {

    obtain =
        '[[' +
        chestName +
        ']]';

}

var pageUnobtainable =
    /\{\{\s*Unobtainable\b/i.test(
        content
    );

                                                if (!name) {

                                                    console.warn(
                                                        'Pets Gallery without title on:',
                                                        page.title
                                                    );

                                                    return;

                                                }

                                                var petData = {

                                                    name:
                                                        name,

                                                    type:
                                                        'Pet',

                                                    obtain:
                                                        obtain,

                                                    icon:
                                                        icon,

                                                    chance:
                                                        chance,

                                                    stats:
                                                        stats,

                                                    skill:
                                                        skill,

unobtainable:
    pageUnobtainable ||
    unobtainableParam
        .toLowerCase() ===
    'yes'

                                                };

                                                allPetResults.push(
                                                    petData
                                                );

                                                console.log(
                                                    'Found Pet:',
                                                    petData
                                                );

                                            }
                                        );

                                    }
                                );

                                checked +=
                                    batch.length;

                                setProgress(
                                    checked,
                                    pages.length,
                                    'Scanning Pets Gallery pages...'
                                );

                                scanNextBatch();

                            }
                        )

                        .catch(
                            function (error) {

                                console.error(
                                    'Error scanning pet batch:',
                                    error
                                );

                                checked +=
                                    batch.length;

                                scanNextBatch();

                            }
                        );

                    }

                    scanNextBatch();

                }
            )

            .catch(
                function (error) {

                    console.error(
                        '===== PET SCANNER ERROR ====='
                    );

                    console.error(
                        error
                    );

                    setUpdating(false);

                }
            );

    }
);












    function setProgress(
        current,
        total,
        message
    ) {

        var percentage = 0;

        if (total > 0) {

            percentage =
                Math.floor(
                    (current / total) * 100
                );

        }

        progressText.textContent =
            message ||
            'Updating database...';

        progressFill.style.width =
            percentage + '%';

        progressCount.textContent =
            current +
            ' / ' +
            total +
            ' items (' +
            percentage +
            '%)';

    }

    scanItemIDButton.addEventListener(
        'click',
        function () {

            if (updating) {
                return;
            }

            var confirmed =
                confirm(
                    'Scan all item pages for ItemID?\n\n' +
                    'This will NOT edit or change any pages.'
                );

            if (!confirmed) {
                return;
            }

            setUpdating(true);

            setProgress(
                0,
                1,
                'Finding item pages...'
            );

            console.log(
                '===== ITEMID SCAN STARTED ====='
            );

            var api =
                new mw.Api();

            var itemPages = [];

            function getPages(continueToken) {

                var params = {
                    action: 'query',
                    list: 'allpages',
                    aplimit: 'max',
                    apnamespace: 0,
                    formatversion: 2
                };

                if (continueToken) {

                    params.apcontinue =
                        continueToken;

                }

                return api.get(params)
                    .then(function (data) {

                        if (
                            data.query &&
                            data.query.allpages
                        ) {

                            data.query.allpages.forEach(
                                function (page) {

                                    itemPages.push(
                                        page.title
                                    );

                                }
                            );

                        }

                        if (
                            data.continue &&
                            data.continue.apcontinue
                        ) {

                            return getPages(
                                data.continue.apcontinue
                            );

                        }

                        return itemPages;

                    });

            }

            getPages()
                .then(function (pages) {

                    console.log(
                        'Total pages found:',
                        pages.length
                    );

                    if (!pages.length) {

                        throw new Error(
                            'No pages found.'
                        );

                    }

                    var checked = 0;
                    var validItems = [];
                    var excludedItems = [];
                    var errors = [];

                    function checkNextBatch() {

                        var batch =
                            pages.slice(
                                checked,
                                checked + 20
                            );

                        if (!batch.length) {

    console.log(
        '===== ITEMID SCAN COMPLETE ====='
    );

    console.log(
        'Pages checked:',
        pages.length
    );

    console.log(
        'Valid Items:',
        validItems.length
    );

    console.log(
        'Excluded Items:',
        excludedItems.length
    );

    console.log(
        'Errors:',
        errors.length
    );

    setProgress(
        0,
        validItems.length,
        'Checking existing ItemID templates...'
    );

    var itemIDChecked = 0;
    var alreadyHaveItemID = [];
    var needItemID = [];
    var itemIDErrors = [];

    function checkItemIDBatch() {

        var itemIDBatch =
            validItems.slice(
                itemIDChecked,
                itemIDChecked + 20
            );

        if (!itemIDBatch.length) {

            console.log(
                '===== ITEMID CHECK COMPLETE ====='
            );

            console.log(
                'Already have ItemID:',
                alreadyHaveItemID
            );

            console.log(
                'Need ItemID:',
                needItemID
            );

            console.log(
                'ItemID errors:',
                itemIDErrors
            );

            results.innerHTML = `

                <div>

                    <h3>
                        Item Scan Results
                    </h3>

                    <p>
                        Pages checked:
                        <strong>
                            ${pages.length}
                        </strong>
                    </p>

                    <p>
                        Valid items:
                        <strong>
                            ${validItems.length}
                        </strong>
                    </p>

                    <p>
                        Already have ItemID:
                        <strong>
                            ${alreadyHaveItemID.length}
                        </strong>
                    </p>

                    <p>
                        Need ItemID:
                        <strong>
                            ${needItemID.length}
                        </strong>
                    </p>

                    <p>
                        Excluded:
                        <strong>
                            ${excludedItems.length}
                        </strong>
                    </p>

                    <p>
                        Errors:
                        <strong>
                            ${errors.length + itemIDErrors.length}
                        </strong>
                    </p>

                    <h4>
                        Valid Items
                    </h4>

                    <ul>
                        ${
                            validItems
                                .map(function (name) {

                                    return (
                                        '<li>' +
                                        '<a href="' +
                                        mw.util.getUrl(name) +
                                        '" target="_blank">' +
                                        mw.html.escape(name) +
                                        '</a>' +
                                        '</li>'
                                    );

                                })
                                .join('')
                        }
                    </ul>

                    <h4>
                        Already Have ItemID
                    </h4>

                    <ul>
                        ${
                            alreadyHaveItemID
                                .map(function (name) {

                                    return (
                                        '<li>' +
                                        mw.html.escape(name) +
                                        '</li>'
                                    );

                                })
                                .join('')
                        }
                    </ul>

                    <h4>
                        Need ItemID
                    </h4>

                    <ul>
                        ${
                            needItemID
                                .map(function (name) {

                                    return (
                                        '<li>' +
                                        mw.html.escape(name) +
                                        '</li>'
                                    );

                                })
                                .join('')
                        }
                    </ul>

                    <h4>
                        Excluded
                    </h4>

                    <ul>
                        ${
                            excludedItems
                                .map(function (name) {

                                    return (
                                        '<li>' +
                                        mw.html.escape(name) +
                                        '</li>'
                                    );

                                })
                                .join('')
                        }
                    </ul>

                    ${
                        (
                            errors.length +
                            itemIDErrors.length
                        ) > 0
                        ?
                        `
                        <h4>
                            Errors
                        </h4>

                        <ul>
                            ${
                                errors
                                    .concat(itemIDErrors)
                                    .map(function (name) {

                                        return (
                                            '<li>' +
                                            mw.html.escape(name) +
                                            '</li>'
                                        );

                                    })
                                    .join('')
                            }
                        </ul>
                        `
                        :
                        ''
                    }

                    ${
                        needItemID.length
                        ?
                        `
                        <button
                            id="item-database-add-itemid"
                            style="margin-top: 15px;"
                        >
                            Add ItemID to Valid Items
                        </button>
                        `
                        :
                        ''
                    }

                </div>

            `;

            var addItemIDButton =
                document.getElementById(
                    'item-database-add-itemid'
                );

            if (addItemIDButton) {

                addItemIDButton.addEventListener(
                    'click',
                    function () {

                        if (updating) {
                            return;
                        }

                        var confirmed =
                            confirm(
                                'Add ItemID to all items that need it?\n\n' +
                                needItemID.length +
                                ' pages will be edited.\n\n' +
                                'Pages that already have {{ItemID}} will be skipped.\n\n' +
                                'Continue?'
                            );

                        if (!confirmed) {
                            return;
                        }

                        addItemIDToValidItems(
                            needItemID
                        );

                    }
                );

            }

            setProgress(
                validItems.length,
                validItems.length,
                'Scan completed!'
            );

            setUpdating(false);

            return;
        }

        var itemIDRequests =
            itemIDBatch.map(
                function (title) {

                    return api.get({

                        action: 'query',
                        prop: 'revisions',
                        rvprop: 'content',
                        rvslots: 'main',
                        titles: title,
                        formatversion: 2

                    })

                    .then(function (data) {

                        var page =
                            data.query &&
                            data.query.pages &&
                            data.query.pages[0];

                        if (
                            !page ||
                            !page.revisions ||
                            !page.revisions[0]
                        ) {

                            itemIDErrors.push(
                                title
                            );

                            return;
                        }

                        var text =
                            page.revisions[0]
                                .slots
                                .main
                                .content || '';

                        var hasItemID =
                            /\{\{\s*ItemID\b/i.test(
                                text
                            );

                        if (hasItemID) {

                            alreadyHaveItemID.push(
                                title
                            );

                        } else {

                            needItemID.push(
                                title
                            );

                        }

                    })

                    .catch(function (error) {

                        console.error(
                            'Error checking ItemID:',
                            title
                        );

                        console.error(
                            error
                        );

                        itemIDErrors.push(
                            title
                        );

                    });

                }
            );

        Promise.all(
            itemIDRequests
        )

            .then(function () {

                itemIDChecked +=
                    itemIDBatch.length;

                setProgress(
                    itemIDChecked,
                    validItems.length,
                    'Checking existing ItemID templates...'
                );

                setTimeout(
                    checkItemIDBatch,
                    250
                );

            });

    }

    checkItemIDBatch();

    return;
}



                        var requests =
                            batch.map(
                                function (title) {

                                    return api.get({

                                        action: 'query',
                                        prop: 'revisions',
                                        rvprop: 'content',
                                        rvslots: 'main',
                                        titles: title,
                                        formatversion: 2

                                    }).then(
                                        function (data) {

                                            var page =
                                                data.query &&
                                                data.query.pages &&
                                                data.query.pages[0];

                                            if (
                                                !page ||
                                                !page.revisions ||
                                                !page.revisions[0]
                                            ) {

                                                errors.push(
                                                    title
                                                );

                                                return;
                                            }

                                            var text =
                                                page.revisions[0]
                                                    .slots
                                                    .main
                                                    .content || '';


var hasNoItem =
    /\{\{\s*NoItem\b/i.test(text);

var hasInfobox =
    /\{\{\s*Item[_ ]infobox\b/i
        .test(text);

var isManuallyExcluded =
    excludedItemNames.has(
        title
    );

if (
    hasNoItem
) {

    excludedItems.push(
        title
    );

} else if (
    hasInfobox &&
    !isManuallyExcluded
) {

    validItems.push(
        title
    );

} else {

    excludedItems.push(
        title
    );

}

                                        }
                                    ).catch(
                                        function (error) {

                                            console.error(
                                                'Error scanning:',
                                                title
                                            );

                                            console.error(
                                                error
                                            );

                                            errors.push(
                                                title
                                            );

                                        }
                                    );

                                }
                            );

                        Promise.all(requests)
                            .then(function () {

                                checked +=
                                    batch.length;

                                var percent =
                                    Math.floor(
                                        (
                                            checked /
                                            pages.length
                                        ) * 100
                                    );

                                setProgress(
                                    checked,
                                    pages.length,
                                    'Scanning item pages...'
                                );

                                console.log(
                                    'Scan progress:',
                                    checked,
                                    '/',
                                    pages.length,
                                    '(' +
                                    percent +
                                    '%)'
                                );

                                setTimeout(
                                    checkNextBatch,
                                    250
                                );

                            });

                    }

                    checkNextBatch();

                })
                .catch(function (error) {

                    console.error(
                        '===== ITEMID SCAN ERROR ====='
                    );

                    console.error(error);

                    progressText.textContent =
                        'Error: ' +
                        error.message;

                    progressFill.style.width =
                        '0%';

                    progressCount.textContent =
                        '';

                    setUpdating(false);

                });

        }
    );

    function addItemID(text) {

        if (!text) {

            return {
                changed: false,
                text: text,
                reason: 'empty'
            };

        }

        var hasItemID =
            /\{\{\s*ItemID\b/i.test(text);

        if (hasItemID) {

            return {
                changed: false,
                text: text,
                reason: 'already_exists'
            };

        }

        var newText =
            '{{ItemID}}\n' + text;

        return {
            changed: true,
            text: newText,
            reason: 'added'
        };

    }

function addItemIDToValidItems(validItems) {

    var api = 
        new mw.Api();

    var current = 0;
    var added = [];
    var alreadyHad = [];
    var errors = [];

    var NORMAL_DELAY = 2000;
    var MAX_RETRIES = 5;

    function processNext() {

        if (
            current >= 
            validItems.length
        ) {

            console.log(
                '===== ITEMID ADD COMPLETE ====='
            );

            console.log(
                'Added:',
                added
            );

            console.log(
                'Already had ItemID:',
                alreadyHad
            );

            console.log(
                'Errors:',
                errors
            );

            results.innerHTML = `

                <div>

                    <h3>
                        ItemID Update Complete
                    </h3>

                    <p>
                        Pages processed:
                        <strong>
                            ${validItems.length}
                        </strong>
                    </p>

                    <p>
                        ItemID added:
                        <strong>
                            ${added.length}
                        </strong>
                    </p>

                    <p>
                        Already had ItemID:
                        <strong>
                            ${alreadyHad.length}
                        </strong>
                    </p>

                    <p>
                        Errors:
                        <strong>
                            ${errors.length}
                        </strong>
                    </p>

                    ${
                        errors.length
                        ?
                        `
                        <h4>
                            Errors
                        </h4>

                        <ul>
                            ${
                                errors
                                    .map(function (name) {

                                        return (
                                            '<li>' +
                                            mw.html.escape(name) +
                                            '</li>'
                                        );

                                    })
                                    .join('')
                            }
                        </ul>
                        `
                        :
                        ''
                    }

                </div>

            `;

            setUpdating(false);

            setProgress(
                validItems.length,
                validItems.length,
                'ItemID update completed!'
            );

            return;
        }

        var title =
            validItems[current];

        var retryCount = 0;

        function processItem() {

            setProgress(
                current,
                validItems.length,
                'Adding ItemID to ' +
                title +
                '...'
            );

            api.get({

                action: 'query',
                prop: 'revisions',
                rvprop: 'content',
                rvslots: 'main',
                titles: title,
                formatversion: 2

            })

            .then(function (data) {

                var page =
                    data.query &&
                    data.query.pages &&
                    data.query.pages[0];

                if (
                    !page ||
                    !page.revisions ||
                    !page.revisions[0]
                ) {

                    throw new Error(
                        'Page content not found.'
                    );

                }

                var text =
                    page.revisions[0]
                        .slots
                        .main
                        .content || '';

                var result =
                    addItemID(text);

                if (!result.changed) {

                    if (
                        result.reason ===
                        'already_exists'
                    ) {

                        alreadyHad.push(
                            title
                        );

                    }

                    current++;

                    setTimeout(
                        processNext,
                        NORMAL_DELAY
                    );

                    return null;
                }

                return saveItemPage(
                    title,
                    result.text
                );

            })

            .then(function (saveResult) {

                if (!saveResult) {
                    return;
                }

                added.push(
                    title
                );

                current++;

                setTimeout(
                    processNext,
                    NORMAL_DELAY
                );

            })

            .catch(function (error) {

                console.error(
                    'Failed to add ItemID to:',
                    title
                );

                console.error(
                    error
                );

                var errorText =
                    '';

                try {

                    errorText =
                        JSON.stringify(
                            error
                        ).toLowerCase();

                } catch (e) {

                    errorText =
                        String(
                            error
                        ).toLowerCase();

                }

                var isRateLimited =
                    errorText.indexOf(
                        'ratelimited'
                    ) !== -1 ||
                    errorText.indexOf(
                        'rate limit'
                    ) !== -1;

                if (
                    isRateLimited &&
                    retryCount < MAX_RETRIES
                ) {

                    retryCount++;

                    var retryDelay =
                        retryCount * 10000;

                    console.warn(
                        'Rate limited:',
                        title,
                        'Retry:',
                        retryCount,
                        '/',
                        MAX_RETRIES,
                        'Waiting:',
                        retryDelay / 1000,
                        'seconds'
                    );

                    setProgress(
                        current,
                        validItems.length,
                        'Rate limited. Retrying ' +
                        title +
                        ' in ' +
                        (
                            retryDelay / 1000
                        ) +
                        ' seconds...'
                    );

                    setTimeout(
                        processItem,
                        retryDelay
                    );

                    return;
                }

                errors.push(
                    title
                );

                current++;

                setTimeout(
                    processNext,
                    NORMAL_DELAY
                );

            });

        }

        processItem();

    }

    processNext();

}

    function saveItemPage(
        title,
        text
    ) {

        var api =
            new mw.Api();

        return api.postWithToken(
            'csrf',
            {
                action: 'edit',
                title: title,
                text: text,
                summary:
                    'Add ItemID template automatically',
                formatversion: 2
            }
        );

    }

    function getItemPage(title) {

        var api =
            new mw.Api();

        return api.get({

            action: 'query',
            prop: 'revisions',
            rvprop: 'content',
            rvslots: 'main',
            titles: title,
            formatversion: 2

        }).then(function (data) {

            if (
                !data.query.pages ||
                !data.query.pages.length ||
                !data.query.pages[0].revisions ||
                !data.query.pages[0].revisions[0]
            ) {

                throw new Error(
                    'Item page not found: ' +
                    title
                );

            }

            return {

                title:
                    data.query.pages[0].title,

                text:
                    data.query.pages[0]
                        .revisions[0]
                        .slots
                        .main
                        .content

            };

        });

    }

    function extractItemData(page) {

        var text =
            page.text;

        var start =
            text.search(
                /\{\{\s*Item[_ ]infobox\b/i
            );

        if (start === -1) {

            throw new Error(
                'No Item infobox found on ' +
                page.title
            );

        }

        var depth = 0;
        var end = -1;

        for (
            var i = start;
            i < text.length - 1;
            i++
        ) {

            var pair =
                text.substring(
                    i,
                    i + 2
                );

            if (pair === '{{') {

                depth++;
                i++;

            } else if (pair === '}}') {

                depth--;

                if (depth === 0) {

                    end =
                        i + 2;

                    break;

                }

                i++;

            }

        }

        if (end === -1) {

            throw new Error(
                'Could not parse Item infobox on ' +
                page.title
            );

        }

        var infobox =
            text.substring(
                start,
                end
            );

        var inner =
            infobox
                .replace(
                    /^\{\{\s*Item[_ ]infobox\b/i,
                    ''
                )
                .replace(
                    /\}\}\s*$/,
                    ''
                );

var parameters = {};
var current = '';
var nestedDepth = 0;
var linkDepth = 0;
var galleryDepth = 0;

for (
    var i = 0;
    i < inner.length;
    i++
) {

    var pair =
        inner.substring(
            i,
            i + 2
        );

    if (
        inner.substring(i, i + 9).toLowerCase() === '<gallery>'
    ) {

        galleryDepth++;

        current +=
            inner.substring(
                i,
                i + 9
            );

        i += 8;

    } else if (
        inner.substring(i, i + 10).toLowerCase() === '</gallery>'
    ) {

        if (galleryDepth > 0) {
            galleryDepth--;
        }

        current +=
            inner.substring(
                i,
                i + 10
            );

        i += 9;

    } else if (pair === '{{') {

        nestedDepth++;

        current +=
            pair;

        i++;

    } else if (pair === '}}') {

        if (nestedDepth > 0) {
            nestedDepth--;
        }

        current +=
            pair;

        i++;

    } else if (
        inner.substring(i, i + 2) === '[['
    ) {

        linkDepth++;

        current +=
            '[[';

        i++;

    } else if (
        inner.substring(i, i + 2) === ']]'
    ) {

        if (linkDepth > 0) {
            linkDepth--;
        }

        current +=
            ']]';

        i++;

    } else if (
        inner[i] === '|' &&
        nestedDepth === 0 &&
        linkDepth === 0 &&
        galleryDepth === 0
    ) {

        processParameter(
            current
        );

        current = '';

    } else {

        current +=
            inner[i];

    }

}


        processParameter(
            current
        );

        function processParameter(value) {

            var equalIndex =
                value.indexOf('=');

            if (equalIndex === -1) {
                return;
            }

            var key =
                value
                    .substring(
                        0,
                        equalIndex
                    )
                    .trim();

            var val =
                value
                    .substring(
                        equalIndex + 1
                    )
                    .trim();

            if (!key) {
                return;
            }

            parameters[
                key.toLowerCase()
            ] = val;

        }

        function getParam(name) {

            return (
                parameters[
                    name.toLowerCase()
                ] || null
            );

        }

        var name =
            getParam('name');

        if (
            !name ||
            name === '{{PAGENAME}}'
        ) {

            name =
                page.title;

        }

var isUnobtainable =
    /\{\{\s*Unobtainable\b/i.test(text);

var image =
    getParam('image');

var icon = null;

if (image) {

var galleryMatch =
    image.match(
        /([^|<>\[\]\r\n]+?\.(?:png|jpg|jpeg|gif|webp))\s*\|\s*Icon\b/i
    );

    if (galleryMatch) {

        icon =
            galleryMatch[1]
                .trim();

    } else {

        var fileMatch =
            image.match(
                /\[\[\s*(?:File|Image):\s*([^|\]]+\.(?:png|jpg|jpeg|gif|webp))/i
            );

        if (fileMatch) {

            icon =
                fileMatch[1]
                    .trim();

        } else {

            var directMatch =
                image.match(
                    /^\s*([^\s|<>\[\]]+\.(?:png|jpg|jpeg|gif|webp))\s*$/i
                );

            if (directMatch) {

                icon =
                    directMatch[1]
                        .trim();

            }

        }

    }

}

return {

    name: name,

    type:
        getParam('type'),

    rarity:
        getParam('rarity'),

    level:
        getParam('level'),

    dmg:
        getParam('dmg'),

    def:
        getParam('def'),

    crit:
        getParam('crit'),

    abilities:
        getParam('abilities'),

    cost:
        getParam('cost'),

    obtain:
        getParam('obtain'),

    description:
        getParam('description'),

    icon:
        icon,

    unobtainable:
        isUnobtainable

};

    }

    function getDatabase() {

        var api =
            new mw.Api();

        return api.get({

            action: 'query',

            prop: 'revisions',

            rvprop: 'content',

            rvslots: 'main',

            titles:
                'Template:ItemDatabaseDataTest',

            formatversion: 2

        }).then(function (data) {

            var page =
                data.query.pages[0];

            if (
                !page.revisions ||
                !page.revisions[0]
            ) {

                return {};

            }

            var text =
                page.revisions[0]
                    .slots
                    .main
                    .content;

            text =
                text
                    .replace(
                        /^<pre>/,
                        ''
                    )
                    .replace(
                        /<\/pre>$/,
                        ''
                    )
                    .trim();

            if (!text) {
                return {};
            }

           try {

    var parsed =
        JSON.parse(
            text
        );

    if (
        !parsed ||
        typeof parsed !== 'object' ||
        Array.isArray(parsed)
    ) {

        return {};

    }

    return parsed;

} catch (error) {

    throw new Error(
        'ItemDatabaseDataTest contains invalid JSON.'
    );

}

        });

    }

window.itemDatabaseAPI = {
    getDatabase: getDatabase,
    removeItem: removeItem
};

    function saveDatabase(database) {

        var api =
            new mw.Api();

        var json =
            JSON.stringify(
                database,
                null,
                2
            );

console.log(
    '===== ATTEMPTING DATABASE SAVE ====='
);

console.log(
    'Database entries:',
    Object.keys(database).length
);

console.log(
    'Save timestamp:',
    new Date().toISOString()
);

        return api.postWithToken(
            'csrf',
            {

                action: 'edit',

                title:
                    'Template:ItemDatabaseDataTest',

                text:
                    '<pre>' +
                    json +
                    '</pre>',

                summary:
                    'Update Item Database data',

                                formatversion: 2

            }
        )

        .then(function (data) {

            console.log(
                '===== DATABASE SAVE RESPONSE ====='
            );

            console.log(
                data
            );

            return data;

        })

        .catch(function (error) {

            console.error(
                '===== DATABASE SAVE API ERROR ====='
            );

            console.error(
                error
            );

            throw error;

        });

    }

function removeItem(title) {

    return getDatabase()

        .then(function (database) {

            var existingItem =
                Object.keys(database).find(
                    function (name) {

                        return name.toLowerCase() ===
                            title.toLowerCase();

                    }
                );

            if (!existingItem) {

                throw new Error(
                    'Item not found in the database.'
                );

            }

            var item =
                database[existingItem];

            if (!item) {

                throw new Error(
                    'Invalid item data.'
                );

            }

            var type =
                String(item.type || '')
                    .trim()
                    .toLowerCase();

            var category =
                '';

            if (
                type === 'aura' ||
                type === 'body aura'
            ) {

                category =
                    'Auras / Body Auras';

            } else if (
                type === 'pet'
            ) {

                category =
                    'Pets';

            } else {

                var weaponTypes = [
                    'longsword',
                    'greatsword',
                    'katana',
                    'rapier',
                    'spear',
                    'scythe'
                ];

                var isWeapon =
                    weaponTypes.some(
                        function (weaponType) {

                            return type.includes(
                                weaponType
                            );

                        }
                    );

                if (isWeapon) {

                    category =
                        'Weapons';

                } else if (
                    type === 'armor' ||
                    type === 'armour' ||
                    /\barmor\b/i.test(type) ||
                    /\barmour\b/i.test(type)
                ) {

                    category =
                        'Armor';

                } else {

                    category =
                        'Accessories';

                }

            }

            if (
                category ===
                    'Auras / Body Auras' ||
                category ===
                    'Pets'
            ) {

                throw new Error(
                    'Auras, Body Auras and Pets cannot be removed individually.'
                );

            }

            var confirmed =
                confirm(
                    'Are you sure you want to remove "' +
                    existingItem +
                    '" from the database?'
                );

            if (!confirmed) {

                return {
                    cancelled: true,
                    name: existingItem
                };

            }

            delete database[
                existingItem
            ];

            return saveDatabase(
                database
            )

                .then(function () {

                    console.log(
                        '===== ITEM REMOVED ====='
                    );

                    console.log(
                        existingItem
                    );

                    return {
                        cancelled: false,
                        name: existingItem,
                        category: category
                    };

                });

        });

}

    function updateSingleItem(title) {

        setUpdating(true);

        setProgress(
            0,
            1,
            'Checking database...'
        );

        getDatabase()

            .then(function (database) {

                var existingItem =
                    Object.keys(database).find(
                        function (name) {

                            return name.toLowerCase() ===
                                title.toLowerCase();

                        }
                    );

                if (existingItem) {

                    var confirmed =
                        confirm(
                            existingItem +
                            ' is already registered in the database.\n\n' +
                            'Do you want to update its data?'
                        );

                    if (!confirmed) {

                        setUpdating(false);

                        setProgress(
                            0,
                            1,
                            'Update cancelled.'
                        );

                        return null;

                    }

                }

                setProgress(
                    0,
                    1,
                    'Reading ' +
                    title +
                    '...'
                );

return getItemPage(
    title
)

            })

.then(function (page) {

    if (!page) {
        return null;
    }

    var text = page.text || '';

    var hasNoItem =
        /\{\{\s*NoItem\b/i.test(text);

    var hasInfobox =
        /\{\{\s*Item[_ ]infobox\b/i.test(text);

    var hasItemID =
        /\{\{\s*ItemID\b/i.test(text);

    if (hasNoItem) {

        throw new Error(
            'This page contains {{NoItem}} and cannot be added to the database.'
        );

    }

    if (!hasInfobox) {

        throw new Error(
            'This page does not contain {{Item infobox}}.'
        );

    }

    if (!hasItemID) {

        throw new Error(
            'This page does not contain {{ItemID}}.'
        );

    }

    setProgress(
        0,
        1,
        'Reading Item infobox...'
    );

    return extractItemData(
        page
    );

})

            .then(function (itemData) {

                if (!itemData) {
                    return null;
                }

                setProgress(
                    0,
                    1,
                    'Updating database...'
                );

                return getDatabase()

                    .then(function (database) {

                        database[
                            itemData.name
                        ] =
                            itemData;

                        return saveDatabase(
                            database
                        );

                    });

            })

            .then(function () {

                if (!updating) {
                    return;
                }

                setProgress(
                    1,
                    1,
                    'Update completed!'
                );

                console.log(
                    '===== ITEM UPDATED ====='
                );

                console.log(
                    title
                );

                setUpdating(false);

            })

            .catch(function (error) {

                console.error(
                    '===== ITEM UPDATE ERROR ====='
                );

                console.error(error);

                progressText.textContent =
                    'Error: ' +
                    error.message;

                progressFill.style.width =
                    '0%';

                progressCount.textContent =
                    '';

                setUpdating(false);

            });

    }

function removeSingleItem(title) {

setUpdating(true);

setProgress(
    0,
    1,
    'Checking database...'
);

getDatabase()

    .then(function (database) {

        var searchTitle =
            String(title || '')
                .trim()
                .toLowerCase();

        var exactMatch =
            Object.keys(database).find(
                function (name) {

                    return String(name || '')
                        .trim()
                        .toLowerCase() ===
                        searchTitle;

                }
            );

        var partialMatch =
            Object.keys(database).find(
                function (name) {

                    var cleanName =
                        String(name || '')
                            .split('<')[0]
                            .trim()
                            .toLowerCase();

                    return cleanName ===
                        searchTitle;

                }
            );

        var existingItem =
            partialMatch ||
            exactMatch;

        if (!existingItem) {

            throw new Error(
                'Item not found in the database.'
            );

        }

        var item =
            database[existingItem];

        if (!item) {

            throw new Error(
                'Invalid database entry.'
            );

        }

        var type =
            String(
                item.type || ''
            )
                .trim()
                .toLowerCase();

        if (
            type === 'aura' ||
            type === 'body aura' ||
            type === 'pet'
        ) {

            throw new Error(
                'Aura, Body Aura, and Pet entries cannot be removed manually. Use their scanner instead.'
            );

        }

        var confirmed =
            confirm(
                'Remove "' +
                existingItem +
                '" from the database?\n\n' +
                'This will only remove the item from the database. The wiki page will not be changed.'
            );

        if (!confirmed) {

            setUpdating(false);

            setProgress(
                0,
                1,
                'Removal cancelled.'
            );

            return null;

        }

        setProgress(
            0,
            1,
            'Removing ' +
            existingItem +
            '...'
        );

        delete database[
            existingItem
        ];

        return saveDatabase(
            database
        )

            .then(function () {

                console.log(
                    '===== ITEM REMOVED ====='
                );

                console.log(
                    'Removed item:',
                    existingItem
                );

                console.log(
                    'Remaining database entries:',
                    Object.keys(database).length
                );

                setProgress(
                    1,
                    1,
                    'Item removed successfully!'
                );

                setUpdating(false);

            });

    })

    .catch(function (error) {

        console.error(
            '===== ITEM REMOVAL ERROR ====='
        );

        console.error(
            error
        );

        progressText.textContent =
            'Error: ' +
            error.message;

        progressFill.style.width =
            '0%';

        progressCount.textContent =
            '';

        setUpdating(false);

    });


}




    updateItemButton.addEventListener(
        'click',
        function () {

            if (updating) {
                return;
            }

            var item =
                updateSearch.value.trim();

            if (!item) {

                progressText.textContent =
                    'Status: Enter an item name.';

                return;
            }

            console.log(
                '===== UPDATE ITEM ====='
            );

            console.log(
                item
            );

            updateSingleItem(
                item
            );

        }
    );

removeItemButton.addEventListener(
    'click',
    function () {

        if (updating) {
            return;
        }

        var item =
            updateSearch.value.trim();

        if (!item) {

            progressText.textContent =
                'Status: Enter an item name.';

            return;

        }

        console.log(
            '===== REMOVE ITEM ====='
        );

        console.log(
            item
        );

        removeSingleItem(
            item
        );

    }
);

function updateEntireDatabase(
    validItems,
    excludedItems
) {
        var current = 0;

var database = null;
var updated = [];
var errors = [];

getDatabase()
    .then(function (existingDatabase) {

        var oldDatabase =
            existingDatabase || {};

        database = {};

        Object.keys(oldDatabase).forEach(
            function (name) {

                var item =
                    oldDatabase[name];

                if (!item) {
                    return;
                }

if (
    item.type &&
    (
        item.type.toLowerCase() ===
        'aura' ||

        item.type.toLowerCase() ===
        'body aura' ||

        item.type.toLowerCase() ===
        'pet' ||

        item.type.toLowerCase() ===
        'miscellaneous'
    )
) {

    database[name] =
        item;

}

            }
        );

        processNext();

    })
    .catch(function (error) {

        console.error(
            'Error loading existing database:',
            error
        );

        setUpdating(false);

    });

        function processNext() {

            if (
                current >=
                validItems.length
            ) {

                setProgress(
                    validItems.length,
                    validItems.length,
                    'Saving database...'
                );

console.log(
    '===== FINAL DATABASE CHECK ====='
);

console.log(
    'Total database entries:',
    Object.keys(database).length
);

console.log(
    'Total updated:',
    updated.length
);

console.log(
    'Total errors:',
    errors.length
);

console.log(
    'Aura entries:',
    Object.values(database).filter(function (item) {

        return item &&
            item.type &&
            (
                item.type.toLowerCase() === 'aura' ||
                item.type.toLowerCase() === 'body aura'
            );

    }).length
);

console.log(
    'Aura entries:',
    Object.values(database).filter(function (item) {

        return item &&
            item.type &&
            item.type.toLowerCase() === 'aura';

    }).length
);

console.log(
    'Body Aura entries:',
    Object.values(database).filter(function (item) {

        return item &&
            item.type &&
            item.type.toLowerCase() === 'body aura';

    }).length
);

console.log(
    'Pet entries:',
    Object.values(database).filter(function (item) {

        return item &&
            item.type &&
            item.type.toLowerCase() === 'pet';

    }).length
);

console.log(
    'Item entries:',
    Object.values(database).filter(function (item) {

        return item &&
            item.type &&
            item.type.toLowerCase() !== 'aura' &&
            item.type.toLowerCase() !== 'body aura' &&
            item.type.toLowerCase() !== 'pet';

    }).length
);

                saveDatabase(
                    database
                )

                    .then(function () {

                        console.log(
                            '===== ENTIRE DATABASE UPDATE COMPLETE ====='
                        );

                        console.log(
                            'Updated:',
                            updated
                        );

                        console.log(
                            'Errors:',
                            errors
                        );

                        results.innerHTML = `

                            <div>

                                <h3>
                                    Database Update Complete
                                </h3>

                                <p>
                                    Items processed:
                                    <strong>
                                        ${validItems.length}
                                    </strong>
                                </p>

                                <p>
                                    Successfully added:
                                    <strong>
                                        ${updated.length}
                                    </strong>
                                </p>

                                <p>
                                    Errors:
                                    <strong>
                                        ${errors.length}
                                    </strong>
                                </p>

                                ${
                                    errors.length
                                    ?
                                    `
                                    <h4>
                                        Errors
                                    </h4>

                                    <ul>
                                        ${
                                            errors
                                                .map(function (name) {

                                                    return (
                                                        '<li>' +
                                                        mw.html.escape(name) +
                                                        '</li>'
                                                    );

                                                })
                                                .join('')
                                        }
                                    </ul>
                                    `
                                    :
                                    ''
                                }

                            </div>

                        `;

                        setProgress(
                            validItems.length,
                            validItems.length,
                            'Database update completed!'
                        );

                        setUpdating(false);

                    })

                    .catch(function (error) {

                        console.error(
                            '===== DATABASE SAVE ERROR ====='
                        );

                        console.error(error);

                        progressText.textContent =
                            'Error saving database: ' +
                            error.message;

                        progressFill.style.width =
                            '0%';

                        progressCount.textContent =
                            '';

                        setUpdating(false);

                    });

                return;

            }

            var title =
                validItems[current];

            setProgress(
                current,
                validItems.length,
                'Reading ' +
                title +
                '...'
            );

            getItemPage(
                title
            )

                .then(function (page) {

                    setProgress(
                        current,
                        validItems.length,
                        'Reading Item infobox: ' +
                        title
                    );

                    return extractItemData(
                        page
                    );

                })

                .then(function (itemData) {

                    database[
                        itemData.name
                    ] =
                        itemData;

                    updated.push(
                        itemData.name
                    );

                    current++;

                    setTimeout(
                        processNext,
                        250
                    );

                })

.catch(function (error) {

    console.error(
        '===== ITEM PROCESSING ERROR ====='
    );

    console.error(
        'Item:',
        title
    );

    console.error(
        'Error:',
        error
    );

    console.error(
        'Error message:',
        error && error.message
    );

    console.error(
        'Error stack:',
        error && error.stack
    );

    errors.push(
        title
    );

    current++;

    setTimeout(
        processNext,
        250
    );

});

        }

        if (!validItems.length) {

            setUpdating(false);

            setProgress(
                0,
                0,
                'No valid items found.'
            );

            return;

        }

    }

    updateAllButton.addEventListener(
        'click',
        function () {

            if (updating) {
                return;
            }

            var confirmed =
                confirm(
                    'Update the entire Item Database?\n\n' +
                    'The wiki will be scanned first.\n' +
                    'Only pages containing an Item infobox will be included.\n\n' +
                    'This may take some time.\n\n' +
                    'Continue?'
                );

            if (!confirmed) {
                return;
            }

            console.log(
                '===== UPDATE ENTIRE DATABASE STARTED ====='
            );

            setUpdating(true);

            setProgress(
                0,
                1,
                'Finding item pages...'
            );

            var api =
                new mw.Api();

            var pages = [];

            function getAllPages(
                continueToken
            ) {

                var params = {

                    action: 'query',

                    list: 'allpages',

                    aplimit: 'max',

                    apnamespace: 0,

                    formatversion: 2

                };

                if (continueToken) {

                    params.apcontinue =
                        continueToken;

                }

                return api.get(
                    params
                )

                    .then(function (data) {

                        if (
                            data.query &&
                            data.query.allpages
                        ) {

                            data.query.allpages.forEach(
                                function (page) {

                                    pages.push(
                                        page.title
                                    );

                                }
                            );

                        }

                        if (
                            data.continue &&
                            data.continue.apcontinue
                        ) {

                            return getAllPages(
                                data.continue.apcontinue
                            );

                        }

                        return pages;

                    });

            }

            getAllPages()

                .then(function (pages) {

                    console.log(
                        'Total pages found:',
                        pages.length
                    );

                    setProgress(
                        0,
                        pages.length,
                        'Scanning item pages...'
                    );

                    var checked = 0;

                    var validItems = [];

                    var excludedItems = [];

                    var errors = [];

                    function scanNextBatch() {

                        var batch =
                            pages.slice(
                                checked,
                                checked + 20
                            );

                        if (!batch.length) {

                            console.log(
                                '===== PAGE SCAN COMPLETE ====='
                            );

                            console.log(
                                'Valid items:',
                                validItems
                            );

                            console.log(
                                'Excluded:',
                                excludedItems
                            );

                            console.log(
                                'Errors:',
                                errors
                            );

                            if (!validItems.length) {

                                setUpdating(false);

                                setProgress(
                                    pages.length,
                                    pages.length,
                                    'No valid items found.'
                                );

                                return;

                            }

                            setProgress(
                                0,
                                validItems.length,
                                'Preparing database update...'
                            );

updateEntireDatabase(
    validItems,
    excludedItems
);

                            return;

                        }

                        var requests =
                            batch.map(
                                function (title) {

                                    return api.get({

                                        action: 'query',

                                        prop: 'revisions',

                                        rvprop: 'content',

                                        rvslots: 'main',

                                        titles: title,

                                        formatversion: 2

                                    })

                                    .then(function (data) {

                                        var page =
                                            data.query &&
                                            data.query.pages &&
                                            data.query.pages[0];

                                        if (
                                            !page ||
                                            !page.revisions ||
                                            !page.revisions[0]
                                        ) {

                                            errors.push(
                                                title
                                            );

                                            return;

                                        }

                                        var text =
                                            page.revisions[0]
                                                .slots
                                                .main
                                                .content || '';


var hasNoItem =
    /\{\{\s*NoItem\b/i.test(text);

var hasInfobox =
    /\{\{\s*Item[_ ]infobox\b/i
        .test(text);

var isManuallyExcluded =
    excludedItemNames.has(
        title
    );

if (
    hasNoItem
) {

    excludedItems.push(
        title
    );

} else if (
    hasInfobox &&
    !isManuallyExcluded
) {

    validItems.push(
        title
    );

} else {

    excludedItems.push(
        title
    );

}

                                    })

                                    .catch(function (error) {

                                        console.error(
                                            'Error scanning:',
                                            title
                                        );

                                        console.error(
                                            error
                                        );

                                        errors.push(
                                            title
                                        );

                                    });

                                }
                            );

                        Promise.all(
                            requests
                        )

                            .then(function () {

                                checked +=
                                    batch.length;

                                setProgress(
                                    checked,
                                    pages.length,
                                    'Scanning item pages...'
                                );

                                console.log(
                                    'Scan progress:',
                                    checked,
                                    '/',
                                    pages.length
                                );

                                setTimeout(
                                    scanNextBatch,
                                    250
                                );

                            });

                    }

                    scanNextBatch();

                })

                .catch(function (error) {

                    console.error(
                        '===== FULL UPDATE SCAN ERROR ====='
                    );

                    console.error(error);

                    progressText.textContent =
                        'Error: ' +
                        error.message;

                    progressFill.style.width =
                        '0%';

                    progressCount.textContent =
                        '';

                    setUpdating(false);

                });

        }
    );

    window.addEventListener(
        'beforeunload',
        function (event) {

            if (!updating) {
                return;
            }

            event.preventDefault();

            event.returnValue = '';

        }
    );

    console.log(
        '===== ITEM DATABASE SYSTEM LOADED ====='
    );

    console.log(
        'Update permissions:',
        canUpdate
    );

})();