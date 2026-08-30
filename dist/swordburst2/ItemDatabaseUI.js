(function () {

    'use strict';

    console.log(
        '===== DATABASE CLASSIFICATION TEST ====='
    );

   function classifyItem(item) {

    if (!item || !item.type) {

        return {
            category: 'Needs Review',
            subtype: ''
        };

    }

    var type =
        String(item.type)
            .trim()
            .toLowerCase();

    var weaponTypes = [
        'longsword',
        'greatsword',
        'katana',
        'rapier',
        'spear',
        'scythe'
    ];

    var foundWeaponTypes = [];

    weaponTypes.forEach(
        function (weaponType) {

            var pattern =
                new RegExp(
                    '\\b' +
                    weaponType +
                    '\\b',
                    'i'
                );

            if (
                pattern.test(type)
            ) {

                foundWeaponTypes.push(
                    weaponType
                );

            }

        }
    );

    if (
        foundWeaponTypes.length === 2 &&
        foundWeaponTypes.includes('scythe')
    ) {

        var secondWeaponType =
            foundWeaponTypes.find(
                function (weaponType) {

                    return weaponType !==
                        'scythe';

                }
            );

        return {
            category: 'Weapons',
            subtype: secondWeaponType
        };

    }

    if (
        foundWeaponTypes.length > 1
    ) {

        return {
            category: 'Needs Review',
            subtype: 'Multiple weapon types'
        };

    }

    if (
        foundWeaponTypes.length === 1
    ) {

        return {
            category: 'Weapons',
            subtype: foundWeaponTypes[0]
        };

    }

    if (
        type === 'pet'
    ) {

        return {
            category: 'Pets',
            subtype: ''
        };

    }

    if (
        type === 'aura' ||
        type === 'body aura'
    ) {

        return {
            category: 'Auras / Body Auras',
            subtype:
                type === 'aura'
                    ? 'Aura'
                    : 'Body Aura'
        };

    }

    if (
        type === 'armor' ||
        type === 'armour' ||
        /\bcategory:armor\|armor\b/i.test(type) ||
        /\(\s*armor\s*\)/i.test(type) ||
        /\(\s*armour\s*\)/i.test(type) ||
        /\bexclusive armor\b/i.test(type) ||
        /\blimited armor\b/i.test(type)
    ) {

        return {
            category: 'Armor',
            subtype: ''
        };

    }

    if (
        type === 'accessory' ||
        type === 'accessories' ||
        /\(\s*accessory\s*\)/i.test(type) ||
        /\baccessories\b/i.test(type)
    ) {

        return {
            category: 'Accessories',
            subtype: ''
        };

    }

    if (
        /\bshield\b/i.test(type)
    ) {

        return {
            category: 'Accessories',
            subtype: 'Shield'
        };

    }

    if (
        /\bcape\b/i.test(type)
    ) {

        return {
            category: 'Accessories',
            subtype: 'Cape'
        };

    }

if ( 
    /\bweapon\b/i.test(type) 
) { 
 
    return { 
        category: 'Needs Review', 
        subtype: 'Unspecified weapon' 
    }; 
 
}

if (
    type === 'miscellaneous'
) {

    return {
        category: 'Miscellaneous',
        subtype: ''
    };

}

    return {
        category: 'Needs Review',
        subtype: ''
    };

}

    function createCategoryNavigation(structure) {

var currentSort =
    'az';

var sortButton =
    document.createElement('button');

sortButton.type =
    'button';

sortButton.textContent =
    'A → Z';

sortButton.dataset.sort =
    'az';

sortButton.addEventListener(
    'click',
    function () {

        if (
            currentSort ===
            'az'
        ) {

            currentSort =
                'za';

            sortButton.textContent =
                'Z → A';

        } else {

            currentSort =
                'az';

            sortButton.textContent =
                'A → Z';

        }

        if (
            window.itemDatabaseLastItems
        ) {

            showItems(
                window.itemDatabaseLastItems
            );

        }

    }
);


var levelSort =
    'asc';

var levelButton =
    document.createElement('button');

levelButton.type =
    'button';

levelButton.textContent =
    'Nivel ↑';

levelButton.dataset.sort =
    'level-asc';

levelButton.addEventListener(
    'click',
    function () {

        if (
            levelSort ===
            'asc'
        ) {

            levelSort =
                'desc';

            levelButton.textContent =
                'Nivel ↓';

        } else {

            levelSort =
                'asc';

            levelButton.textContent =
                'Nivel ↑';

        }

        currentSort =
            levelSort === 'asc'
                ? 'level-asc'
                : 'level-desc';

        if (
            window.itemDatabaseLastItems
        ) {

            showItems(
                window.itemDatabaseLastItems
            );

        }

    }
);

        var app =
            document.getElementById(
                'item-database-app'
            );

        if (!app) {

            console.error(
                '===== ITEM DATABASE APP NOT FOUND ====='
            );

            return;

        }


        var existing =
            document.getElementById(
                'item-database-category-navigation'
            );

        if (existing) {

            existing.remove();

        }


        var navigation =
            document.createElement('div');

var itemCount =
    document.createElement('div');

itemCount.id =
    'item-database-item-count';

itemCount.textContent =
    structure.Weapons.Longsword.length +
    structure.Weapons.Greatsword.length +
    structure.Weapons.Katana.length +
    structure.Weapons.Rapier.length +
    structure.Weapons.Spear.length +
    structure.Weapons.Scythe.length +
    structure.Armor.length +
    structure.Accessories.length +
    structure['Needs Review'].length +
    structure['Auras / Body Auras'].Aura.length +
    structure['Auras / Body Auras']['Body Aura'].length +
    structure.Pets.length +
structure.Miscellaneous.Material.length +
structure.Miscellaneous.Currency.length +
structure.Miscellaneous['Crafting Material'].length +
structure.Miscellaneous.Gift.length +
structure.Miscellaneous.Others.length +    ' Items';

navigation.appendChild(
    itemCount
);

navigation.appendChild(
    sortButton
);


function showItems(items) {

    var results =
        document.getElementById(
            'item-database-results'
        );

    var sortedItems =
        items.slice();

    sortedItems.sort(
        function (a, b) {

            var nameA =
                a.item
                    ? a.item.name
                    : a.name;

            var nameB =
                b.item
                    ? b.item.name
                    : b.name;

            nameA =
                String(
                    nameA || ''
                ).toLowerCase();

            nameB =
                String(
                    nameB || ''
                ).toLowerCase();

if (
    currentSort ===
    'level-asc'
    ||
    currentSort ===
    'level-desc'
) {

    var itemA =
        a.item
            ? a.item
            : a;

    var itemB =
        b.item
            ? b.item
            : b;

    var levelA =
        parseFloat(
            String(
                itemA.level || ''
            ).replace(
                /[^0-9.-]/g,
                ''
            )
        );

    var levelB =
        parseFloat(
            String(
                itemB.level || ''
            ).replace(
                /[^0-9.-]/g,
                ''
            )
        );

    var missingA =
        isNaN(levelA);

    var missingB =
        isNaN(levelB);

    if (
        missingA &&
        missingB
    ) {

        return nameA.localeCompare(
            nameB
        );

    }

    if (missingA) {
        return 1;
    }

    if (missingB) {
        return -1;
    }

    return currentSort ===
        'level-asc'
        ? levelA - levelB
        : levelB - levelA;

}

return currentSort === 'az'
    ? nameA.localeCompare(nameB)
    : nameB.localeCompare(nameA);

        }
    );

    items =
        sortedItems;

window.itemDatabaseLastItems =
    items;

    console.log(
        '===== SHOW ITEMS ====='
    );

    console.log(
        'Items received:',
        items
    );

    if (!results) {

        console.error(
            'Item Database results container not found.'
        );

        return;

    }

    results.innerHTML = '';

    if (
        !items ||
        !items.length
    ) {

        results.textContent =
            'No items found.';

        return;

    }

    var gallery =
        document.createElement('div');

    gallery.className =
        'item-database-gallery';

    items.forEach(
        function (item) {

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

var name =
    document.createElement('div');

name.className =
    'item-database-gallery-name';

name.textContent =
    item.name
        ? item.name
        : 'Unnamed Item';


var itemForLevel =
    item.item
        ? item.item
        : item;


var level =
    document.createElement('div');

level.className =
    'item-database-gallery-level';


if (
    itemForLevel.level
) {

    level.textContent =
        'Level ' +
        itemForLevel.level;

}

            entry.appendChild(
                icon
            );

            entry.appendChild(
                name
            );

if (
    itemForLevel.level
) {

    entry.appendChild(
        level
    );

}

            entry.addEventListener(
                'click',
                function () {

window.itemDatabaseLastScroll =
    window.scrollY;

                    console.log(
                        '===== ITEM SELECTED ====='
                    );

                    console.log(
                        'Name:',
                        item && item.name
                            ? item.name
                            : 'Unnamed Item'
                    );

                    console.log(
                        'Item object:',
                        item
                    );

                    showItemDetails(
                        item
                    );

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

    console.log(
        '===== ITEMS DISPLAYED ====='
    );

    console.log(
        'Items displayed:',
        items.length
    );

}






function showItemDetails(item) {

var results =
    document.getElementById(
        'item-database-results'
    );

if (!results) {

    console.error(
        'Item Database results container not found.'
    );

    return;

}

results.innerHTML = '';

var backButton =
    document.createElement('button');

backButton.type =
    'button';

backButton.textContent =
    '← Back';

backButton.className =
    'item-database-back-button';

backButton.addEventListener(
    'click',
    function () {

        var previousScroll =
            window.itemDatabaseLastScroll;

        if (
            window.itemDatabaseLastItems
        ) {

            showItems(
                window.itemDatabaseLastItems
            );

            requestAnimationFrame(
                function () {

                    window.scrollTo({
                        top: previousScroll,
                        behavior: 'smooth'
                    });

                }
            );

        }

    }
);

results.appendChild(
    backButton
);

var card =
    document.createElement('div');

card.className =
    'item-database-card';

var detailsLayout =
    document.createElement('div');

detailsLayout.className =
    'item-database-details-layout';

var detailsInfo =
    document.createElement('div');

detailsInfo.className =
    'item-database-details-info';

var detailsImage =
    document.createElement('div');

detailsImage.className =
    'item-database-details-image';

if (item.icon) {

    var itemIcon =
        document.createElement('img');

    itemIcon.src =
        mw.util.getUrl(
            'Special:Redirect/file/' +
            item.icon
        );

    itemIcon.alt =
        item.name || 'Item';

    itemIcon.className =
        'item-database-details-icon';

    detailsImage.appendChild(
        itemIcon
    );

}

var title =
    document.createElement('h2');

var itemType =
    String(
        item && item.type
            ? item.type
            : ''
    )
        .trim()
        .toLowerCase();

var itemName =
    item && item.name
        ? item.name
        : 'Unnamed Item';

var specialPages = [];

if (
    itemType === 'pet'
) {

    specialPages = [
        'Obtainable Companions (Mobs / Quests)'
    ];

}

else if (
    itemType === 'aura' ||
    itemType === 'body aura'
) {

    specialPages = [
        'Obtainable Auras (Mobs / Quests)',
        'Obtainable Auras (Burst Store)'
    ];

}

title.textContent =
    itemName;

card.appendChild(
    title
);

function createItemTitleLink(
    targetPage
) {

    title.textContent = '';

    var link =
        document.createElement('a');

    link.href =
        mw.util.getUrl(
            targetPage
        );

    link.textContent =
        itemName;

    title.appendChild(
        link
    );

}

if (
    !specialPages.length
) {

    createItemTitleLink(
        itemName
    );

} else {

    var requests =
        specialPages.map(
            function (pageName) {

                return new mw.Api()
                    .get({
                        action: 'parse',
                        page: pageName,
                        prop: 'wikitext',
                        formatversion: 2
                    });

            }
        );

    Promise.all(requests)
        .then(
            function (responses) {

                for (
                    var i = 0;
                    i < responses.length;
                    i++
                ) {

                    var response =
                        responses[i];

                    var wikitext =
                        response &&
                        response.parse &&
                        response.parse.wikitext
                            ? String(
                                response.parse.wikitext
                            )
                            : '';

                    if (
                        wikitext
                            .toLowerCase()
                            .indexOf(
                                itemName.toLowerCase()
                            ) !== -1
                    ) {

                        createItemTitleLink(
                            specialPages[i]
                        );

                        return;

                    }

                }

            }
        )
        .catch(
            function (error) {

                console.error(
                    'SPECIAL ITEM PAGE CHECK ERROR:',
                    error
                );

            }
        );

}


card.appendChild(
    title
);

var info =
    document.createElement('div');

info.className =
    'item-database-info';

function parseWikiLinks(text) {

    if (!text) {
        return '';
    }

    text = String(text);

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

            var wikiLink =
                document.createElement(
                    'a'
                );

            wikiLink.href =
                mw.util.getUrl(
                    target.trim()
                );

            wikiLink.textContent =
                label || target;

            return wikiLink.outerHTML;

        }
    );

    text = text.replace(
        /\[([a-z]+:\/\/[^\s\]]+)(?:\s+([^\]]+))?\]/gi,
        function (match, url, label) {

            var externalLink =
                document.createElement(
                    'a'
                );

            externalLink.href =
                url;

            externalLink.textContent =
                label || url;

            externalLink.target =
                '_blank';

            externalLink.rel =
                'noopener noreferrer';

            return externalLink.outerHTML;

        }
    );

    return text;

}

var html = '';

html += `
    <div>
        <strong>Type:</strong>
        ${item.type || 'Unknown'}
    </div>
`;

if (item.stats) {

    html += `
        <div>
            <strong>Stats:</strong>
            ${parseWikiLinks(item.stats)}
        </div>
    `;

}

if (item.rarity) {

    html += `
        <div>
            <strong>Rarity:</strong>
            ${item.rarity}
        </div>
    `;

}

if (item.level) {

    html += `
        <div>
            <strong>Level:</strong>
            ${item.level}
        </div>
    `;

}

if (item.dmg) {

    html += `
        <div>
            <strong>Damage:</strong>
            ${String(item.dmg).replace(
                /\n/g,
                '<br>'
            )}
        </div>
    `;

}

if (item.def) {

    html += `
        <div>
            <strong>Defense:</strong>
            ${String(item.def).replace(
                /\n/g,
                '<br>'
            )}
        </div>
    `;

}

if (item.crit) {

    html += `
        <div>
            <strong>Crit:</strong>
            ${item.crit}
        </div>
    `;

}

if (item.abilities) {

    html += `
        <div>
            <strong>Abilities:</strong>
            <ul>
                ${
                    String(item.abilities)
                        .split('\n')
                        .map(function (ability) {

                            return '<li>' +
                                parseWikiLinks(
                                    ability
                                        .replace(
                                            /^\s*\*\s*/,
                                            ''
                                        )
                                        .trim()
                                ) +
                                '</li>';

                        })
                        .join('')
                }
            </ul>
        </div>
    `;

}

if (item.skill) {

    html += `
        <div>
            <strong>Skill:</strong>
            ${parseWikiLinks(item.skill)}
        </div>
    `;

}

if (item.chance) {

    html += `
        <div>
            <strong>Chance:</strong>
            ${item.chance}
        </div>
    `;

}

if (item.chanceCost) {

    html += `
        <div>
            <strong>Chance Cost:</strong>
            ${parseWikiLinks(item.chanceCost)}
        </div>
    `;

}

if (
    item.cost &&
    String(item.cost).toLowerCase() !== 'none'
) {

    html += `
        <div>
            <strong>Cost:</strong>
            ${
                item.store
                ?
                `<img
                    src="${mw.util.getUrl('Special:Redirect/file/RobuxIcon.png')}"
                    style="height:20px;width:auto;vertical-align:middle;"
                > ${parseWikiLinks(item.cost)}`
                :
                parseWikiLinks(item.cost)
            }
        </div>
    `;

}

if (item.store) {

    html += `
        <div>
            <strong>Obtain:</strong>
            ${
                item.unobtainable
                ?
                `
                <s>
                    ${
                        item.bundle
                        ?
                        `<a href="${mw.util.getUrl('Bundles')}">Bundle</a>`
                        :
                        `<a href="${mw.util.getUrl('Burst Store')}">Shop</a>`
                    }
                </s>

                <br>

                <strong>Currently unobtainable</strong>
                `
                :
                (
                    item.bundle
                    ?
                    `<a href="${mw.util.getUrl('Bundles')}">Bundle</a>`
                    :
                    `<a href="${mw.util.getUrl('Burst Store')}">Shop</a>`
                )
            }
        </div>
    `;

} else if (item.obtain) {

    if (item.unobtainable) {

        html += `
            <div>
                <strong>Obtain:</strong>

                <ul>
                    ${
                        String(item.obtain)
                            .split('\n')
                            .map(function (obtain) {

                                return '<li><s>' +
                                    parseWikiLinks(
                                        obtain
                                            .replace(
                                                /^\s*\*\s*/,
                                                ''
                                            )
                                            .trim()
                                    ) +
                                    '</s></li>';

                            })
                            .join('')
                    }
                </ul>

                <strong>Currently unobtainable</strong>
            </div>
        `;

    } else {

        html += `
            <div>
                <strong>Obtain:</strong>
                ${parseWikiLinks(item.obtain)}
            </div>
        `;

    }

}

if (item.description) {

    html += `
        <div>
            <strong>Description:</strong>
            ${parseWikiLinks(
                String(item.description).replace(
                    /\n/g,
                    '<br>'
                )
            )}
        </div>
    `;

}

info.innerHTML =
    html;

detailsInfo.appendChild(
    title
);

detailsInfo.appendChild(
    info
);

detailsLayout.appendChild(
    detailsInfo
);

detailsLayout.appendChild(
    detailsImage
);

card.appendChild(
    detailsLayout
);

results.appendChild(
    card
);

window.scrollTo({
    top: results.getBoundingClientRect().top +
        window.scrollY -
        60,
    behavior: 'smooth'
});

console.log(
    '===== ITEM DETAILS DISPLAYED ====='
);

console.log(
    'Item:',
    item
);

}



window.itemDatabaseShowItemDetails =
    showItemDetails;





        navigation.id =
            'item-database-category-navigation';


        var title =
            document.createElement('div');

        title.textContent =
            'Categories';


        navigation.appendChild(
            title
        );


var categories = [

    'Weapons',
    'Armor',
    'Accessories',
    'Needs Review',
    'Auras / Body Auras',
    'Pets',
    'Miscellaneous'

];


        categories.forEach(
            function (category) {

                var button =
                    document.createElement('button');

                button.type =
                    'button';

                button.textContent =
                    category;


                button.dataset.category =
                    category;



                button.addEventListener(
                    'click',
                    function () {

if (
    levelButton.parentNode
) {

    levelButton.remove();

}

                        console.log(
                            '===== CATEGORY SELECTED ====='
                        );

                        console.log(
                            category
                        );

                        console.log(
                            structure[category]
                        );

if (
    category ===
    'Weapons'
) {

    var weaponCount =
        0;

    Object.keys(
        structure.Weapons
    ).forEach(
        function (weaponType) {

            weaponCount +=
                structure
                    .Weapons[
                        weaponType
                    ].length;

        }
    );

    itemCount.textContent =
        weaponCount +
        ' Items';

} else if (
    category ===
    'Miscellaneous'
) {

    var miscellaneousCount =
        structure.Miscellaneous.Material.length +
        structure.Miscellaneous.Currency.length +
        structure.Miscellaneous['Crafting Material'].length +
        structure.Miscellaneous.Gift.length +
        structure.Miscellaneous.Others.length;

    itemCount.textContent =
        miscellaneousCount +
        ' Items';

} else {

    if (
        category ===
        'Auras / Body Auras'
    ) {

        var auraCount =
            structure[
                'Auras / Body Auras'
            ].Aura.length;

        var bodyAuraCount =
            structure[
                'Auras / Body Auras'
            ]['Body Aura'].length;

        itemCount.textContent =
            auraCount +
            bodyAuraCount +
            ' Items';

    } else {

        itemCount.textContent =
            structure[category].length +
            ' Items';

    }

}




                        var existingSubcategories =
                            document.getElementById(
                                'item-database-subcategories'
                            );

                        if (existingSubcategories) {

                            existingSubcategories.remove();

                        }


                        var subcategories =
                            document.createElement('div');

                        subcategories.id =
                            'item-database-subcategories';


                        if (
                            category ===
                            'Weapons'
                        ) {

                            var weaponTypes = [

                                'Longsword',
                                'Greatsword',
                                'Katana',
                                'Rapier',
                                'Spear',
                                'Scythe'

                            ];

var allWeapons = [];

Object.keys(
    structure.Weapons
).forEach(
    function (weaponType) {

        allWeapons =
            allWeapons.concat(
                structure.Weapons[
                    weaponType
                ]
            );

    }
);

showItems(
    allWeapons
);


                            weaponTypes.forEach(
                                function (weaponType) {

                                    var subtypeButton =
                                        document.createElement(
                                            'button'
                                        );

                                    subtypeButton.type =
                                        'button';

                                    subtypeButton.textContent =
                                        weaponType;

                                    subtypeButton.dataset.category =
                                        category;

                                    subtypeButton.dataset.subtype =
                                        weaponType;

                                    subtypeButton.addEventListener(
                                        'click',
                                        function () {

                                            console.log(
                                                '===== SUBCATEGORY SELECTED ====='
                                            );

                                            console.log(
                                                'Category:',
                                                category
                                            );

                                            console.log(
                                                'Subtype:',
                                                weaponType
                                            );

                                            console.log(
                                                structure
                                                    .Weapons[
                                                        weaponType
                                                    ]
                                            );

                                            showItems(
                                                structure
                                                    .Weapons[
                                                        weaponType
                                                    ]
                                            );

itemCount.textContent =
    structure
        .Weapons[
            weaponType
        ].length +
    ' Items';

                                        }
                                    );

                                    subcategories.appendChild(
                                        subtypeButton
                                    );

                                }
                            );

                        }


else if (
    category ===
    'Miscellaneous'
) {

var miscellaneousTypes = [

    'Material',
    'Currency',
    'Crafting Material',
    'Gift',
    'Others'

];

    miscellaneousTypes.forEach(
        function (miscellaneousType) {

            var subtypeButton =
                document.createElement(
                    'button'
                );

            subtypeButton.type =
                'button';

subtypeButton.textContent =
    miscellaneousType === 'Gift'
        ? 'Gifts'
        : miscellaneousType;

            subtypeButton.dataset.category =
                category;

            subtypeButton.dataset.subtype =
                miscellaneousType;

            subtypeButton.addEventListener(
                'click',
                function () {

                    console.log(
                        '===== SUBCATEGORY SELECTED ====='
                    );

                    console.log(
                        'Category:',
                        category
                    );

                    console.log(
                        'Subtype:',
                        miscellaneousType
                    );

                    console.log(
                        structure.Miscellaneous[
                            miscellaneousType
                        ]
                    );

                    itemCount.textContent =
                        structure.Miscellaneous[
                            miscellaneousType
                        ].length +
                        ' Items';

                    showItems(
                        structure.Miscellaneous[
                            miscellaneousType
                        ]
                    );

                }
            );

var allMiscellaneous = [];

miscellaneousTypes.forEach(
    function (miscellaneousType) {

        allMiscellaneous =
            allMiscellaneous.concat(
                structure.Miscellaneous[
                    miscellaneousType
                ]
            );

    }
);

showItems(
    allMiscellaneous
);

            subcategories.appendChild(
                subtypeButton
            );

        }
    );

}

                        else if (
                            category ===
                            'Auras / Body Auras'
                        ) {

                            var auraTypes = [

                                'Aura',
                                'Body Aura'

                            ];


                            auraTypes.forEach(
                                function (auraType) {

                                    var subtypeButton =
                                        document.createElement(
                                            'button'
                                        );

                                    subtypeButton.type =
                                        'button';

                                    subtypeButton.textContent =
                                        auraType;

                                    subtypeButton.dataset.category =
                                        category;

                                    subtypeButton.dataset.subtype =
                                        auraType;


                                    subtypeButton.addEventListener(
                                        'click',
                                        function () {

                                            console.log(
                                                '===== SUBCATEGORY SELECTED ====='
                                            );

                                            console.log(
                                                'Category:',
                                                category
                                            );

                                            console.log(
                                                'Subtype:',
                                                auraType
                                            );

                                            console.log(
                                                structure[
                                                    'Auras / Body Auras'
                                                ][
                                                    auraType
                                                ]
                                            );

itemCount.textContent =
    structure[
        'Auras / Body Auras'
    ][auraType].length +
    ' Items';

showItems(
    structure[
        'Auras / Body Auras'
    ][
        auraType
    ]
);

                                        }
                                    );


var allAuras = [];

auraTypes.forEach(
    function (auraType) {

        allAuras =
            allAuras.concat(
                structure[
                    'Auras / Body Auras'
                ][
                    auraType
                ]
            );

    }
);

showItems(
    allAuras
);


                                    subcategories.appendChild(
                                        subtypeButton
                                    );

                                }
                            );

                        }


                        if (
                            subcategories.children.length
                        ) {

                            navigation.appendChild(
                                subcategories
                            );

                        }

                        else {

                            showItems(
                                structure[
                                    category
                                ]
                            );

                        }

if (
    category !== 'Pets' &&
    category !== 'Auras / Body Auras' &&
    category !== 'Miscellaneous' &&
    category !== 'Needs Review'
) {

    navigation.appendChild(
        levelButton
    );

}

                    }
                );


                navigation.appendChild(
                    button
                );

            }
        );


        var content =
            app.querySelector(
                '.item-database-content'
            );

        if (content) {

            content.insertBefore(
                navigation,
                document.getElementById(
                    'item-database-results'
                )
            );

        } else {

            app.appendChild(
                navigation
            );

        }


        console.log(
            '===== CATEGORY NAVIGATION CREATED ====='
        );

    }




    function testDatabase() {

        if (
            !window.itemDatabaseAPI ||
            typeof window.itemDatabaseAPI.getDatabase !== 'function'
        ) {

            setTimeout(
                testDatabase,
                500
            );

            return;

        }

        window.itemDatabaseAPI
            .getDatabase()

            .then(
                function (database) {

                    var structure = {

                        Weapons: {
                            Longsword: [],
                            Greatsword: [],
                            Katana: [],
                            Rapier: [],
                            Spear: [],
                            Scythe: []
                        },

                        Armor: [],

                        Accessories: [],

'Needs Review': [],

Miscellaneous: {
    Material: [],
    Currency: [],
    'Crafting Material': [],
    Gift: [],
    Others: []
},
'Auras / Body Auras': {
    Aura: [],
    'Body Aura': []
},

Pets: []

};


                    Object.keys(database)
                        .forEach(
                            function (name) {

                                var item =
                                    database[name];

                                var result =
                                    classifyItem(item);


                                if (
                                    result.category ===
                                    'Weapons'
                                ) {

                                    var weaponSubtype =
                                        result.subtype;


                                    var weaponKey =
                                        weaponSubtype
                                            ? weaponSubtype
                                                .charAt(0)
                                                .toUpperCase() +
                                              weaponSubtype
                                                .slice(1)
                                            : '';


                                    if (
                                        structure.Weapons[
                                            weaponKey
                                        ]
                                    ) {

                                        structure.Weapons[
                                            weaponKey
                                        ].push(
                                            item
                                        );

                                    }

                                    return;

                                }


                                if (
                                    result.category ===
                                    'Armor'
                                ) {

                                    structure.Armor.push(
                                        item
                                    );

                                    return;

                                }


                                if (
                                    result.category ===
                                    'Accessories'
                                ) {

                                    structure.Accessories.push(
                                        item
                                    );

                                    return;

                                }


                                if (
                                    result.category ===
                                    'Needs Review'
                                ) {

                                    structure[
                                        'Needs Review'
                                    ].push({

                                        item: item,

                                        subtype:
                                            result.subtype

                                    });

                                    return;

                                }


if (
    result.category ===
    'Miscellaneous'
) {

    var miscellaneousCategory =
        item.category
            ? String(
                item.category
            ).trim()
            : '';

    if (
        structure.Miscellaneous[
            miscellaneousCategory
        ]
    ) {

        structure.Miscellaneous[
            miscellaneousCategory
        ].push(
            item
        );

    } else {

        console.warn(
            'Unknown Miscellaneous category:',
            miscellaneousCategory,
            item
        );

    }

    return;

}

                                if (
                                    result.category ===
                                    'Auras / Body Auras'
                                ) {

                                    if (
                                        result.subtype ===
                                        'Aura'
                                    ) {

                                        structure[
                                            'Auras / Body Auras'
                                        ].Aura.push(
                                            item
                                        );

                                    }

                                    else if (
                                        result.subtype ===
                                        'Body Aura'
                                    ) {

                                        structure[
                                            'Auras / Body Auras'
                                        ]['Body Aura'].push(
                                            item
                                        );

                                    }

                                    return;

                                }


                                if (
                                    result.category ===
                                    'Pets'
                                ) {

                                    structure.Pets.push(
                                        item
                                    );

                                    return;

                                }

                            }
                        );


                    console.log(
                        '===== DATABASE UI STRUCTURE ====='
                    );


                    console.log(
                        structure
                    );


                    console.log(
                        '===== DATABASE UI STRUCTURE COUNTS ====='
                    );


                    console.log(
                        'Weapons'
                    );

                    console.table({

                        Longsword:
                            structure.Weapons.Longsword.length,

                        Greatsword:
                            structure.Weapons.Greatsword.length,

                        Katana:
                            structure.Weapons.Katana.length,

                        Rapier:
                            structure.Weapons.Rapier.length,

                        Spear:
                            structure.Weapons.Spear.length,

                        Scythe:
                            structure.Weapons.Scythe.length

                    });


                    console.table({

                        Armor:
                            structure.Armor.length,

                        Accessories:
                            structure.Accessories.length,

                        'Needs Review':
                            structure[
                                'Needs Review'
                            ].length,

Miscellaneous:
    structure.Miscellaneous.Material.length +
    structure.Miscellaneous.Currency.length +
    structure.Miscellaneous['Crafting Material'].length +
    structure.Miscellaneous.Others.length,

Pets:
    structure.Pets.length,

                        Aura:
                            structure[
                                'Auras / Body Auras'
                            ].Aura.length,

                        'Body Aura':
                            structure[
                                'Auras / Body Auras'
                            ]['Body Aura'].length

                    });

createCategoryNavigation(
    structure
);

                    console.log(
                        '===== DATABASE UI STRUCTURE READY ====='
                    );

                }
            )

            .catch(
                function (error) {

                    console.error(
                        'DATABASE UI STRUCTURE ERROR:',
                        error
                    );

                }
            );

    }

    testDatabase();

})();