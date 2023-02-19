/**
 * This script allows users to interact with the character lists.
 * Use it by making an HTML element with an id of filterFormPlaceholder
 */
// Defines what each section is called and what checkboxes it has
var formInfo = {
"filterRarity":{
    "legend":"Rarity",
    "checkboxes":[
        {
            "target":"Rarity6",
            "label":"6Star"
        },
        {
            "target":"Rarity5",
            "label":"5Star"
        },
        {
            "target":"Rarity4",
            "label":"4Star"
        },
        {
            "target":"Rarity3",
            "label":"3Star"
        },
        {
            "target":"Rarity2",
            "label":"2Star"
        },
        {
            "target":"RarityEvent",
            "label":"Event"
        },
        {
            "target":"RarityOther",
            "label":"Other"
        }
    ]
},
"filterNation":{
    "legend":"Nation",
    "checkboxes":[
        {
            "target":"NationWR",
            "label":"WinterRose"
        },
        {
            "target":"NationBO",
            "label":"BananaOcean"
        },
        {
            "target":"NationBH",
            "label":"BlossomHill"
        },
        {
            "target":"NationBV",
            "label":"BergamotValley"
        },
        {
            "target":"NationLW",
            "label":"LilyWood"
        },
        {
            "target":"NationLL",
            "label":"LotusLake"
        }
    ]
},
"filterAttr":{
    "legend":"Attribute",
    "checkboxes":[
        {
            "target":"AttrSlash",
            "label":"Slash"
        },
        {
            "target":"AttrPierce",
            "label":"Pierce"
        },
        {
            "target":"AttrBlunt",
            "label":"Blunt"
        },
        {
            "target":"AttrMagic",
            "label":"Magic"
        }
    ]
},
"filterSkill":{
    "legend":"Skill",
    "checkboxes":[
        {
            "target":"SkOneTarget",
            "label":"OneTarget"
        },
        {
            "target":"SkTwoTarget",
            "label":"TwoTarget"
        },
        {
            "target":"SkAllTarget",
            "label":"AllTarget"
        },
        {
            "target":"SkMultTarget",
            "label":"Multi-Target"
        },
        {
            "target":"SkDrain",
            "label":"OneTarget,Drain"
        },
        {
            "target":"SkAffection",
            "label":"OneTarget,Affection-Based"
        },
        {
            "target":"SkAffDrain",
            "label":"OneTarget,Affection-Based,Drain"
        },
        {
            "target":"SkMultToAllTarget",
            "label":"MultitoAllTarget"
        },
        {
            "target":"SkRemainEnemyDmg",
            "label":"RemainingEnemyCount"
        }
    ]
}
};

/**
 * Toggles the CSS class that makes some "target" hide or not.
 */
window.toggleStyles = function(evt) {
    'use strict';
    console.log(evt);
    var target = evt.target || {};
    var checked = target.checked;
    // Table row vars for looping
    var rows = getAllKnightRows();
    var i;
    var len = rows.length;
    // Intermediary vars for use inside the loop
    var thisChar;
    var toShow;
    var thisRowId;
    var thisRowElement;
    var isHidden;

    // 1. Loop over all table rows
    for (i = 0; i < len; i++) {
        // 2. Set the visibility of a knight/row based on the target value
        thisRowId = rows[i].id;
        thisChar = seenValuesByChar[thisRowId];
        if (!thisChar) {
            //console.log('This character does not exist ' + thisRowId);
            continue;
        }
        thisChar.toggleVal(target.value);
        toShow = thisChar.shouldShow();

        // 3. Make the whole row (not) show using .hideTr and toShow()
        thisRowElement = document.getElementById(thisRowId);
        isHidden = thisRowElement.classList.contains('hideTr');
        if (toShow && isHidden) {
            thisRowElement.classList.remove('hideTr');
        } else if (!toShow && !isHidden) {
            thisRowElement.classList.add('hideTr');
        }
        // else, do nothing because we don't need to toggle the hiding class
    }

    // 4. Error checking
    if (len <= 0) {
        console.log('Nothing changed for target ' + target +
            '. Is the filter form\'s JSON matching up with the' +
            ' character table module\'s CSS class names?');
    }
};

/**
 * This variable is a mapping of objects that state which properties
 * should be shown or hidden for some character.
 * The map's key can be anything, but the short character ID would suffice.
 * For rarity growth, the character ID + "R" would suffice too.
 */
window.seenValuesByChar = {};

/**
 * "Constructor" for one "object" in the above list.
 * All passed parameters are strings. The meanings are obvious.
 */
function SeenValues(attr, rarity, nation, skill) {
    'use strict';
    if (!(this instanceof SeenValues)) {
        // The ctor wasn't called with "new".
        return new SeenValues(attr, rarity, nation, skill);
    }
    // The specific values of the character.
    // All of these are STRINGS.
    this.attr = attr || '';
    this.rarity = rarity || '';
    this.nation = nation || '';
    this.skill = skill || '';
    // Visibility of each value. If any of these are false, hide the tr.
    this.visible = {
        'attr': true,
        'rarity': true,
        'nation': true,
        'skill': true
    };
}
SeenValues.prototype = {
    /**
     * Checks if this character's tr should be visible.
     * Returns true if all its values are true.
     */
    shouldShow: function() {
        'use strict';
        return (this.visible.attr && this.visible.rarity &&
            this.visible.nation && this.visible.skill);
    },
    /**
     * Toggles the appropriate value's visibility based on the passed string.
     */
    toggleVal: function(keyword) {
        'use strict';
        if (keyword === this.attr)
            this.visible.attr = !this.visible.attr;
        else if (keyword === this.rarity)
            this.visible.rarity = !this.visible.rarity;
        else if (keyword === this.nation)
            this.visible.nation = !this.visible.nation;
        else if (keyword === this.skill)
            this.visible.skill = !this.visible.skill;
        else {
            // Minor issue or future-proofing?
            //console.log('Unknown target for SeenValues.');
        }
    }
};

/**
 * Gets all rows in the table for the comprehensive list of knights.
 */
function getAllKnightRows() {
    return document.querySelectorAll('table.char-bigtbl tr[class]');
}

/**
 * Builds seenValuesByChar from the comprehensive list of flower knights.
 */
function buildSeenValuesList() {
    'use strict';
    var allRows;
    // Outer loop vars
    var i, row, numRows;
    // Inner loop vars
    var j, thisClass, numClasses;
    // Vars for making the object
    var attr, rarity, nation, skill;
    // Vars for working with CSS classes
    var validClasses;

    // 1. Find all rows in the comprehensive character table.
    allRows = getAllKnightRows();
    numRows = allRows.length;
    for (i = 0; i < numRows; i++) {
        row = allRows[i];

        // 3. Extract the classes. This is all we really need.
        validClasses = true;
        // It's a valid class related to a character, so store the value.
        attr = rarity = nation = skill = '';
        numClasses = row.classList.length;
        for (j = 0; j < numClasses; j++) {
            thisClass = row.classList[j];
            validClasses = thisClass.startsWith('char');
            if (!validClasses) {
                // id has been checked for sanity earlier. Safe to log.
                // console.error('This CSS class does not describe character: ' +
                // 	thisClass + ', at row ' + row.id);
                continue;
            }

            // Chop off the initial "char" part of the class name.
            thisClass = thisClass.substring(4);
            if (thisClass.startsWith('Attr')) {
                attr = thisClass;
            } else if (thisClass.startsWith('Rarity')) {
                // Rarity of the character from 2* to 6*.
                // States "event" / "other" as well.
                rarity = thisClass;
            } else if (thisClass.startsWith('Tier')) {
                // The evolution tier from 1 to 4.
                // Currently not used, but this if-statement prevents the log.
            } else if (thisClass.startsWith('Nation')) {
                nation = thisClass;
            } else if (thisClass.startsWith('Sk')) {
                skill = thisClass;
            }
        }

        // 4. Data extracted. Make the object out of it.
        if (validClasses) {
            // Assign it to the row's id which is based on the character's id.
            // The row's id is checked for sanity from earlier.
            seenValuesByChar[row.id] = new SeenValues(attr, rarity, nation, skill);
        }
    }
    console.log('Made the list that tracks each character\'s visibility');
}

/**
 * Replaces a div with a specific id to have the character list filter options.
 * Example partial output:
 * <form id="filterForm">
 *		<fieldset class="filterFieldset" id="filterRarity">
 *			<legend>Rarity</legend>
 *			<label for="chkRarity6">
 *				<input type="checkbox" checked="" id="chkRarity6"
 *						onchange="toggleStyle('Rarity6')">
 *					6Star
 *			</label>
 *			<label for="chkRarity5">
 *				<input type="checkbox" checked="" id="chkRarity5"
 *						onchange="toggleStyle('Rarity5')">
 *					5Star
 *			</label>
 *		</fieldset>
 * </form>
 * @author HydroKirby
 * @date 24-Jan-2021
 */
(function() {
    'use strict';
    var ui;

    function makeFilterForm(lib) {
        ui = lib;
        
        var nodeToReplace = $('#filterFormPlaceholder');
        if (!nodeToReplace) {
            return;
        }

        // Make each fieldset which holds multiple checkboxes
        var nodeFieldsetList = [];
        for (var sectionName in formInfo) {
            var sectionInfo = formInfo[sectionName];

            // Make a legend with multiple checkboxes under it
            var nodeFieldsetChildren = [ui.legend({
                text: sectionInfo.legend
            })];
            var checkboxInfoList = sectionInfo.checkboxes;
            var numCheckboxes = checkboxInfoList.length;
            for (var i = 0; i < numCheckboxes; i++) {
            	var checkboxInfo = checkboxInfoList[i];
                var targetName = checkboxInfo.target;
                var labelName = checkboxInfo.label;

                // Make the interactive checkbox
                var nodeCheckbox = ui.input({
                    id: 'chk' + targetName,
                    attrs: {
                        type: 'checkbox'
                    },
                    events: {
                        change: toggleStyles
                    },
                    props: {
                        checked: true,
                        value: targetName
                    }
                });

                // Make the text label that relates to the checkbox
                var nodeLabel = ui.label({
                    for: 'chk' + targetName,
                    children: [nodeCheckbox],
                    text: labelName
                });

                nodeFieldsetChildren.push(nodeLabel);
            } // end of (var i = 0; i < numCheckboxes; i++)

            nodeFieldsetList.push(ui.fieldset({
                class: 'filterFieldset',
                id: 'filter' + sectionName,
                children: nodeFieldsetChildren
            }));
        } // end of for (var sectionName in formInfo)

        var topForm = ui.form({
            id: 'filterForm',
            children: nodeFieldsetList
        });

        nodeToReplace.replaceWith(topForm);
        buildSeenValuesList();
    }
    
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:Dorui.js'
    });
    
    mw.hook('doru.ui').add(makeFilterForm);
})();