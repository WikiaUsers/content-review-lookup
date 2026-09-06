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

var showUnobtainable = true;

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

var unobtainableButton =
    document.createElement('button');

unobtainableButton.type =
    'button';

unobtainableButton.textContent =
    'Unobtainable: ✅';

unobtainableButton.dataset.filter =
    'unobtainable';

unobtainableButton.addEventListener(
    'click',
    function () {

        showUnobtainable =
            !showUnobtainable;

        unobtainableButton.textContent =
            showUnobtainable
                ? 'Unobtainable: ✅'
                : 'Unobtainable: ❌';

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
    'Level ↑';

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
                'Level ↓';

        } else {

            levelSort =
                'asc';

            levelButton.textContent =
                'Level ↑';

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

var sortContainer =
    document.createElement('div');

sortContainer.className =
    'item-database-sort-container';

sortContainer.appendChild(
    levelButton
);

sortContainer.appendChild(
    sortButton
);

sortContainer.appendChild(
    levelButton
);

sortContainer.appendChild(
    sortButton
);

sortContainer.appendChild(
    unobtainableButton
);

var topButton =
    document.createElement('button');

topButton.type =
    'button';

topButton.textContent =
    '↑';

topButton.title =
    'Go to top';

topButton.addEventListener(
    'click',
    function () {

        window.scrollTo({
            top: 320,
            behavior: 'smooth'
        });

    }
);

var bottomButton =
    document.createElement('button');

bottomButton.type =
    'button';

bottomButton.textContent =
    '↓';

bottomButton.title =
    'Go to bottom';

bottomButton.addEventListener(
    'click',
    function () {

        var target =
            document.querySelector(
                '[aria-controls="collapsible-content-categories"]'
            );

        if (
            !target
        ) {

            var panels =
                document.querySelectorAll(
                    '.wds-collapsible-panel__header'
                );

            panels.forEach(
                function (panel) {

                    var text =
                        String(
                            panel.textContent || ''
                        )
                            .trim()
                            .toLowerCase();

                    if (
                        text === 'categories'
                    ) {

                        target = panel;

                    }

                }
            );

        }

        if (
            target
        ) {

            var targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY;

            window.scrollTo({
                top:
                    targetPosition -
                    500,
                behavior:
                    'smooth'
            });

        }

    }
);

sortContainer.appendChild(
    topButton
);

sortContainer.appendChild(
    bottomButton
);

navigation.appendChild(
    sortContainer
);


function showItems(items) {

    var results =
        document.getElementById(
            'item-database-results'
        );

window.itemDatabaseLastItems =
    items;

var filteredItems =
    items.filter(
        function (item) {

            if (
                showUnobtainable
            ) {
                return true;
            }

            return !item.unobtainable;

        }
    );

itemCount.textContent =
    filteredItems.length +
    ' Items';

var sortedItems =
    filteredItems.slice();

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

while (
    results.firstChild
) {

    results.removeChild(
        results.firstChild
    );

}
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

    var safeIconUrl =
        createSafeFileUrl(
            item.icon
        );

    if (safeIconUrl) {

        icon.src =
            safeIconUrl;

    }

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
    filteredItems.length
);

}






function createSafeFileUrl(fileName) {

    if (!fileName) {
        return '';
    }

    var value =
        String(fileName)
            .trim()
            .replace(/^File:/i, '')
            .replace(/^Image:/i, '')
            .trim();

    if (!value) {
        return '';
    }

    if (
        /[\\/:*?"<>|]/.test(value)
    ) {
        return '';
    }

    if (
        !/^[^.\s][^"]*\.(png|jpg|jpeg|gif|webp)$/i.test(value)
    ) {
        return '';
    }

    return mw.util.getUrl(
        'Special:Redirect/file/' +
        value
    );

}



function isSafeWikiTarget(target) {

    if (!target) {
        return false;
    }

    var value =
        String(target)
            .trim();

    if (!value) {
        return false;
    }

    if (
        /^[a-z][a-z0-9+.-]*:/i.test(
            value
        )
    ) {
        return false;
    }

    if (
        /^\/\//.test(value)
    ) {
        return false;
    }

    if (
        /^https?:\/\//i.test(value)
    ) {
        return false;
    }

    if (
        /[<>"`]/.test(value)
    ) {
        return false;
    }

    return true;

}




function createTextElement(
    tagName,
    text
) {

    var element =
        document.createElement(
            tagName
        );

    element.textContent =
        text === undefined ||
        text === null
            ? ''
            : String(text);

    return element;

}


function appendSafeWikiText(
    container,
    text
) {

    if (
        text === undefined ||
        text === null
    ) {
        return;
    }

    text =
        String(text);

    var pattern =
        /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

    var lastIndex =
        0;

    var match;

    while (
        (match = pattern.exec(text)) !== null
    ) {

        if (
            match.index >
            lastIndex
        ) {

            container.appendChild(
                document.createTextNode(
                    text.slice(
                        lastIndex,
                        match.index
                    )
                )
            );

        }

        var target =
            String(
                match[1] || ''
            ).trim();

        var label =
            match[2] !== undefined
                ? String(match[2]).trim()
                : target;

        if (
            /^file:/i.test(target) ||
            /^image:/i.test(target)
        ) {

            var fileName =
                target
                    .replace(
                        /^(file|image):/i,
                        ''
                    )
                    .trim();

            var fileUrl =
                createSafeFileUrl(
                    fileName
                );

            if (fileUrl) {

                var img =
                    document.createElement(
                        'img'
                    );

                var sizeMatch =
                    label.match(
                        /(?:^|\|)\s*(\d{1,4})px\s*(?:\||$)/i
                    );

                var size =
                    sizeMatch
                        ? sizeMatch[1] + 'px'
                        : '20px';

                img.src =
                    fileUrl;

                img.alt =
                    fileName;

                img.style.height =
                    size;

                img.style.width =
                    'auto';

                img.style.verticalAlign =
                    'middle';

                container.appendChild(
                    img
                );

            } else {

                container.appendChild(
                    document.createTextNode(
                        match[0]
                    )
                );

            }

        } else {

if (
    isSafeWikiTarget(
        target
    )
) {

                var wikiLink =
                    document.createElement(
                        'a'
                    );

                wikiLink.href =
                    mw.util.getUrl(
                        target
                    );

                wikiLink.textContent =
                    label;

                container.appendChild(
                    wikiLink
                );

            } else {

                container.appendChild(
                    document.createTextNode(
                        match[0]
                    )
                );

            }

        }

        lastIndex =
            pattern.lastIndex;

    }

    if (
        lastIndex <
        text.length
    ) {

        container.appendChild(
            document.createTextNode(
                text.slice(
                    lastIndex
                )
            )
        );

    }

}


function appendSafeMultilineText(
    container,
    text
) {

    if (
        text === undefined ||
        text === null
    ) {
        return;
    }

    var lines =
        String(text).split('\n');

    lines.forEach(
        function (line, index) {

            appendSafeWikiText(
                container,
                line
            );

            if (
                index <
                lines.length - 1
            ) {

                container.appendChild(
                    document.createElement(
                        'br'
                    )
                );

            }

        }
    );

}


function showItemDetails(item) {

    console.log(
        '===== SHOW ITEM DETAILS ====='
    );

    console.log(
        'Item:',
        item
    );

    var app =
        document.getElementById(
            'item-database-app'
        );

    if (!app) {

        console.error(
            'Item Database app not found.'
        );

        return;

    }

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

    var oldDetails =
        document.getElementById(
            'item-database-item-details'
        );

    if (oldDetails) {

        oldDetails.remove();

    }

    var details =
        document.createElement('div');

    details.id =
        'item-database-item-details';

    details.className =
        'item-database-item-details';

    var backButton =
        document.createElement('button');

    backButton.type =
        'button';

    backButton.textContent =
        '← Back';

    backButton.className =
        'item-database-back-button';

    function closeItemDetails() {

    if (!details.parentNode) {
        return;
    }

    details.remove();

    window.removeEventListener(
        'wheel',
        handleDetailsWheel
    );

    document.removeEventListener(
        'keydown',
        handleDetailsKeydown
    );

document.removeEventListener(
    'touchmove',
    handleDetailsTouchMove
);

    document.removeEventListener(
        'click',
        handleDetailsOutsideClick
    );

}

backButton.addEventListener(
    'click',
    closeItemDetails
);

    details.appendChild(
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

    if (item && item.icon) {

        var itemIconUrl =
            createSafeFileUrl(
                item.icon
            );

        if (itemIconUrl) {

            var itemIcon =
                document.createElement('img');

            itemIcon.src =
                itemIconUrl;

            itemIcon.alt =
                item.name || 'Item';

            itemIcon.className =
                'item-database-details-icon';

            detailsImage.appendChild(
                itemIcon
            );

        }

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
            ? String(item.name)
            : 'Unnamed Item';

    title.textContent =
        itemName;

    var specialPages = [];

    if (
        itemType === 'pet'
    ) {

        specialPages = [
            'Obtainable Companions (Mobs / Quests)'
        ];

    } else if (
        itemType === 'aura' ||
        itemType === 'body aura'
    ) {

        specialPages = [
            'Obtainable Auras (Mobs / Quests)',
            'Obtainable Auras (Burst Store)'
        ];

    }

    function createItemTitleLink(
        targetPage
    ) {

        title.textContent =
            '';

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

    var info =
        document.createElement('div');

    info.className =
        'item-database-info';


    function appendInfoRow(
        label,
        value,
        multiline,
        wikiText
    ) {

        if (
            value === undefined ||
            value === null ||
            String(value).trim() === ''
        ) {
            return;
        }

        var row =
            document.createElement('div');

        var strong =
            document.createElement('strong');

        strong.textContent =
            label + ':';

        row.appendChild(
            strong
        );

        row.appendChild(
            document.createTextNode(' ')
        );

        if (wikiText) {

            if (multiline) {

                appendSafeMultilineText(
                    row,
                    value
                );

            } else {

                appendSafeWikiText(
                    row,
                    value
                );

            }

        } else {

            if (multiline) {

                var lines =
                    String(value)
                        .split('\n');

                lines.forEach(
                    function (line, index) {

                        row.appendChild(
                            document.createTextNode(
                                line
                            )
                        );

                        if (
                            index <
                            lines.length - 1
                        ) {

                            row.appendChild(
                                document.createElement(
                                    'br'
                                )
                            );

                        }

                    }
                );

            } else {

                row.appendChild(
                    document.createTextNode(
                        String(value)
                    )
                );

            }

        }

        info.appendChild(
            row
        );

    }


    appendInfoRow(
        'Type',
        item.type || 'Unknown',
        false,
        false
    );


    appendInfoRow(
        'Stats',
        item.stats,
        false,
        true
    );


    appendInfoRow(
        'Rarity',
        item.rarity,
        false,
        false
    );


    appendInfoRow(
        'Level',
        item.level,
        false,
        false
    );


    appendInfoRow(
        'Damage',
        item.dmg,
        true,
        false
    );


    appendInfoRow(
        'Defense',
        item.def,
        true,
        false
    );


    appendInfoRow(
        'Crit',
        item.crit,
        false,
        false
    );


    if (
        item.abilities
    ) {

        var abilitiesRow =
            document.createElement('div');

        var abilitiesStrong =
            document.createElement('strong');

        abilitiesStrong.textContent =
            'Abilities:';

        abilitiesRow.appendChild(
            abilitiesStrong
        );

        var abilitiesList =
            document.createElement('ul');

        String(item.abilities)
            .split('\n')
            .forEach(
                function (ability) {

                    var cleanAbility =
                        ability
                            .replace(
                                /^\s*\*\s*/,
                                ''
                            )
                            .trim();

                    if (!cleanAbility) {
                        return;
                    }

                    var li =
                        document.createElement(
                            'li'
                        );

                    appendSafeWikiText(
                        li,
                        cleanAbility
                    );

                    abilitiesList.appendChild(
                        li
                    );

                }
            );

        abilitiesRow.appendChild(
            abilitiesList
        );

        info.appendChild(
            abilitiesRow
        );

    }


    appendInfoRow(
        'Skill',
        item.skill,
        false,
        true
    );


    appendInfoRow(
        'Chance',
        item.chance,
        false,
        false
    );


    appendInfoRow(
        'Chance Cost',
        item.chanceCost,
        false,
        true
    );


    if (
        item.cost &&
        String(item.cost)
            .toLowerCase() !== 'none'
    ) {

        var costRow =
            document.createElement('div');

        var costStrong =
            document.createElement('strong');

        costStrong.textContent =
            'Cost:';

        costRow.appendChild(
            costStrong
        );

        costRow.appendChild(
            document.createTextNode(' ')
        );

        if (
            item.store
        ) {

            var robuxUrl =
                createSafeFileUrl(
                    'RobuxIcon.png'
                );

            if (robuxUrl) {

                var robuxIcon =
                    document.createElement(
                        'img'
                    );

                robuxIcon.src =
                    robuxUrl;

                robuxIcon.alt =
                    'Robux';

                robuxIcon.style.height =
                    '20px';

                robuxIcon.style.width =
                    'auto';

                robuxIcon.style.verticalAlign =
                    'middle';

                costRow.appendChild(
                    robuxIcon
                );

                costRow.appendChild(
                    document.createTextNode(' ')
                );

            }

        }

        appendSafeWikiText(
            costRow,
            item.cost
        );

        info.appendChild(
            costRow
        );

    }


    if (
        item.store
    ) {

        var obtainRow =
            document.createElement('div');

        var obtainStrong =
            document.createElement('strong');

        obtainStrong.textContent =
            'Obtain:';

        obtainRow.appendChild(
            obtainStrong
        );

        obtainRow.appendChild(
            document.createTextNode(' ')
        );

        var obtainLink =
            document.createElement('a');

        if (
            item.bundle
        ) {

            obtainLink.href =
                mw.util.getUrl(
                    'Bundles'
                );

            obtainLink.textContent =
                'Bundle';

        } else {

            obtainLink.href =
                mw.util.getUrl(
                    'Burst Store'
                );

            obtainLink.textContent =
                'Shop';

        }

        if (
            item.unobtainable
        ) {

            var strike =
                document.createElement(
                    's'
                );

            strike.appendChild(
                obtainLink
            );

            obtainRow.appendChild(
                strike
            );

            obtainRow.appendChild(
                document.createElement(
                    'br'
                )
            );

            var unavailable =
                document.createElement(
                    'strong'
                );

            unavailable.textContent =
                'Currently unobtainable';

            obtainRow.appendChild(
                unavailable
            );

        } else {

            obtainRow.appendChild(
                obtainLink
            );

        }

        info.appendChild(
            obtainRow
        );

    } else if (
        item.obtain
    ) {

        var obtainContainer =
            document.createElement(
                'div'
            );

        var obtainStrong =
            document.createElement('strong');

        obtainStrong.textContent =
            'Obtain:';

        obtainContainer.appendChild(
            obtainStrong
        );

        var obtainList =
            document.createElement('ul');

        String(item.obtain)
            .split('\n')
            .forEach(
                function (obtain) {

                    var cleanObtain =
                        obtain
                            .replace(
                                /^\s*\*\s*/,
                                ''
                            )
                            .trim();

                    if (!cleanObtain) {
                        return;
                    }

                    var li =
                        document.createElement(
                            'li'
                        );

                    if (
                        item.unobtainable
                    ) {

                        var strike =
                            document.createElement(
                                's'
                            );

                        appendSafeWikiText(
                            strike,
                            cleanObtain
                        );

                        li.appendChild(
                            strike
                        );

                    } else {

                        appendSafeWikiText(
                            li,
                            cleanObtain
                        );

                    }

                    obtainList.appendChild(
                        li
                    );

                }
            );

        obtainContainer.appendChild(
            obtainList
        );

        if (
            item.unobtainable
        ) {

            obtainContainer.appendChild(
                document.createElement(
                    'br'
                )
            );

            var unavailable =
                document.createElement(
                    'strong'
                );

            unavailable.textContent =
                'Currently unobtainable';

            obtainContainer.appendChild(
                unavailable
            );

        }

        info.appendChild(
            obtainContainer
        );

    }


    if (
        item.description
    ) {

        var descriptionRow =
            document.createElement(
                'div'
            );

        var descriptionStrong =
            document.createElement(
                'strong'
            );

        descriptionStrong.textContent =
            'Description:';

        descriptionRow.appendChild(
            descriptionStrong
        );

        descriptionRow.appendChild(
            document.createTextNode(' ')
        );

        appendSafeMultilineText(
            descriptionRow,
            item.description
        );

        info.appendChild(
            descriptionRow
        );

    }


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

    details.appendChild(
        card
    );

    results.insertAdjacentElement(
        'beforebegin',
        details
    );

function handleDetailsWheel() {

    closeItemDetails();

}

function handleDetailsKeydown(event) {

    if (
        event.key === 'Escape'
    ) {

        closeItemDetails();

    }

}

function handleDetailsOutsideClick(event) {

    if (
        !details.contains(
            event.target
        )
    ) {

        closeItemDetails();

    }

}

var touchStartX = 0;
var touchStartY = 0;

function handleDetailsTouchStart(event) {

    if (
        !event.touches ||
        !event.touches.length
    ) {
        return;
    }

    touchStartX =
        event.touches[0].clientX;

    touchStartY =
        event.touches[0].clientY;

}

function handleDetailsTouchMove(event) {

    if (
        !event.touches ||
        !event.touches.length
    ) {
        return;
    }

    var touch =
        event.touches[0];

    var deltaX =
        touch.clientX -
        touchStartX;

    var deltaY =
        touch.clientY -
        touchStartY;

    var distance =
        Math.sqrt(
            deltaX * deltaX +
            deltaY * deltaY
        );

    if (
        distance >= 5
    ) {

        closeItemDetails();

    }

}

window.addEventListener(
    'wheel',
    handleDetailsWheel,
    {
        passive: true
    }
);

document.addEventListener(
    'keydown',
    handleDetailsKeydown
);

setTimeout(
    function () {

        if (
            details.parentNode
        ) {

            document.addEventListener(
                'click',
                handleDetailsOutsideClick
            );

        }

    },
    0
);

document.addEventListener(
    'touchstart',
    handleDetailsTouchStart,
    {
        passive: true
    }
);

document.addEventListener(
    'touchmove',
    handleDetailsTouchMove,
    {
        passive: true
    }
);

    console.log(
        '===== ITEM DETAILS DISPLAYED ABOVE DATABASE ====='
    );

}

















window.itemDatabaseShowItemDetails =
    showItemDetails;





        navigation.id =
            'item-database-category-navigation';


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
    category === 'Pets' ||
    category === 'Auras / Body Auras' ||
    category === 'Miscellaneous' ||
    category === 'Needs Review'
) {

    levelButton.style.display =
        'none';

} else {

    levelButton.style.display =
        '';

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

setupSearchSuggestions(
    database
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

function createSafeSuggestionFileUrl(fileName) {

    if (!fileName) {
        return '';
    }

    var value =
        String(fileName)
            .trim()
            .replace(/^File:/i, '')
            .replace(/^Image:/i, '')
            .trim();

    if (!value) {
        return '';
    }

    if (
        /[\\/:*?"<>|]/.test(value)
    ) {
        return '';
    }

    if (
        !/^[^.\s][^"]*\.(png|jpg|jpeg|gif|webp)$/i.test(
            value
        )
    ) {
        return '';
    }

    return (
        '/wiki/Special:Redirect/file/' +
        encodeURIComponent(value)
    );

}

function setupSearchSuggestions(database) {

    var searchInput =
        document.getElementById(
            'item-database-search-input'
        );

    if (!searchInput) {
        console.error(
            'Item Database search input not found.'
        );
        return;
    }

    var searchButton =
        document.getElementById(
            'item-database-search-button'
        );

   var searchContainer =
    searchInput.parentNode;

if (!searchContainer) {
    return;
}

var existingWrapper =
    document.getElementById(
        'item-database-search-wrapper'
    );

if (existingWrapper) {
    existingWrapper.remove();
}

var suggestions =
    document.createElement('div');

suggestions.id =
    'item-database-search-suggestions';

suggestions.className =
    'item-database-search-suggestions';

document.body.appendChild(
    suggestions
);

function positionSuggestions() {

    var rect =
        searchInput.getBoundingClientRect();

    suggestions.style.left =
        rect.left + 'px';

    suggestions.style.top =
        rect.bottom + 'px';

    suggestions.style.width =
        rect.width + 'px';

}

    var names =
        Object.keys(database);

    function calculateDistance(a, b) {

        var matrix = [];

        for (
            var i = 0;
            i <= b.length;
            i++
        ) {

            matrix[i] = [i];

        }

        for (
            var j = 0;
            j <= a.length;
            j++
        ) {

            matrix[0][j] = j;

        }

        for (
            var i = 1;
            i <= b.length;
            i++
        ) {

            for (
                var j = 1;
                j <= a.length;
                j++
            ) {

                if (
                    b.charAt(i - 1) ===
                    a.charAt(j - 1)
                ) {

                    matrix[i][j] =
                        matrix[i - 1][j - 1];

                } else {

                    matrix[i][j] =
                        Math.min(
                            matrix[i - 1][j - 1] + 1,
                            matrix[i][j - 1] + 1,
                            matrix[i - 1][j] + 1
                        );

                }

            }

        }

        return matrix[b.length][a.length];

    }

    function getSuggestions(query) {

var search =
    query
        .trim()
        .toLowerCase()
        .slice(0, 50);

        if (!search) {
            return [];
        }

        return names
            .map(
                function (name) {

                    var lowerName =
                        name.toLowerCase();

                    var score = 99;

                    if (
                        lowerName ===
                        search
                    ) {

                        score = 0;

                    } else if (
                        lowerName.indexOf(
                            search
                        ) === 0
                    ) {

                        score = 1;

                    } else if (
                        lowerName
                            .split(/\s+/)
                            .some(
                                function (word) {
                                    return word.indexOf(
                                        search
                                    ) === 0;
                                }
                            )
                    ) {

                        score = 2;

                    } else if (
                        lowerName.indexOf(
                            search
                        ) !== -1
                    ) {

                        score = 3;

                    } else if (
                        search.length >= 3
                    ) {

                        var distance =
                            calculateDistance(
                                lowerName,
                                search
                            );

                        var allowedDistance =
                            search.length <= 4
                                ? 1
                                : 2;

                        if (
                            distance <=
                            allowedDistance
                        ) {

                            score = 4;

                        }

                    }

                    if (
                        score === 99
                    ) {

                        return null;

                    }

                    var distanceFromLength =
                        Math.abs(
                            lowerName.length -
                            search.length
                        );

                    return {
                        name: name,
                        score: score,
                        distance:
                            distanceFromLength
                    };

                }
            )
            .filter(
                function (result) {
                    return result !== null;
                }
            )
            .sort(
                function (a, b) {

                    if (
                        a.score !==
                        b.score
                    ) {

                        return (
                            a.score -
                            b.score
                        );

                    }

                    if (
                        a.distance !==
                        b.distance
                    ) {

                        return (
                            a.distance -
                            b.distance
                        );

                    }

                    return a.name.localeCompare(
                        b.name
                    );

                }
            )
            .slice(0, 5);

    }

    function hideSuggestions() {

        suggestions.innerHTML =
            '';

        suggestions.style.display =
            'none';

    }

    function showSuggestions() {

    positionSuggestions();

        var matches =
            getSuggestions(
                searchInput.value
            );

        suggestions.innerHTML =
            '';

        if (!matches.length) {

            suggestions.style.display =
                'none';

            return;

        }

        matches.forEach(
            function (match) {

                var option =
                    document.createElement(
                        'button'
                    );

                option.type =
                    'button';

                option.className =
                    'item-database-search-suggestion';

var selectedItem =
    database[match.name];

if (
    !selectedItem ||
    typeof selectedItem.icon !== 'string' ||
    !selectedItem.icon
) {
    return;
}

var icon =
    document.createElement('img');

var safeIconUrl =
    createSafeSuggestionFileUrl(
        selectedItem.icon
    );

if (safeIconUrl) {
    icon.src =
        safeIconUrl;
} else {
    return;
}

icon.width = 20;
icon.height = 20;
icon.alt = '';
icon.loading = 'lazy';

icon.style.width = '20px';
icon.style.height = '20px';
icon.style.objectFit = 'contain';
icon.style.flexShrink = '0';

var label =
    document.createElement('span');

label.textContent =
    match.name;

option.style.display = 'flex';
option.style.alignItems = 'center';
option.style.gap = '8px';

option.appendChild(icon);
option.appendChild(label);

                option.addEventListener(
                    'click',
                    function () {

                        var selectedItem =
                            database[
                                match.name
                            ];

                        searchInput.value =
                            match.name;

                        hideSuggestions();

                        if (
                            selectedItem
                        ) {

                            window.itemDatabaseLastScroll =
                                window.scrollY;

                            showItemDetails(
                                selectedItem
                            );

                        }

                    }
                );

                suggestions.appendChild(
                    option
                );

            }
        );

        suggestions.style.display =
              'block';

    }

    searchInput.addEventListener(
        'input',
        function () {

            showSuggestions();

        }
    );

    searchInput.addEventListener(
        'focus',
        function () {

            if (
                searchInput.value.trim()
            ) {

                showSuggestions();

            }

        }
    );

    searchInput.addEventListener(
        'keydown',
        function (event) {

            if (
                event.key === 'Escape'
            ) {

                hideSuggestions();

            }

        }
    );

    document.addEventListener(
        'click',
        function (event) {

if (
    !searchContainer.contains(event.target) &&
    !suggestions.contains(event.target)
) {
    hideSuggestions();
}

        }
    );

window.addEventListener(
    'resize',
    function () {

        if (
            suggestions.style.display !==
            'none'
        ) {

            positionSuggestions();

        }

    }
);

window.addEventListener(
    'scroll',
    function () {

        if (
            suggestions.style.display !==
            'none'
        ) {

            positionSuggestions();

        }

    },
    true
);

    if (searchButton) {

        searchButton.addEventListener(
            'click',
            function () {

                hideSuggestions();

            }
        );

    }

}

    testDatabase();

})();