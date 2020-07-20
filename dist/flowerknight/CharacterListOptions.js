/**[[Category:CharacterJS]]
<nowiki>
This script gives users interactive ways to work with the character lists.
Use it by following these steps.
1. Call putFormInPlaceholder() in a page that has some element with an id of "filterFormPlaceholder".
2. That page needs an element with an id of "filterFormJson" whose innerText is the JSON to make the form.
 
For part one, just something like this will work.
<p id="filterFormPlaceholder">Javascript not ready or available.</p>
 
For part two, the form's JSON should look a lot like this.
<code id="filterFormJson" style="display:none">{
    "filterRarity":{
        "legend":"Rarity",
        "checkboxes":[
            {"target":"Rarity6", "label":"6 Star"},
            {"target":"Rarity5", "label":"5 Star"},
            {"target":"Rarity4", "label":"4 Star"},
            {"target":"Rarity3", "label":"3 Star"},
            {"target":"Rarity2", "label":"2 Star"},
            {"target":"RarityEvent", "label":"Event"},
            {"target":"RarityOther", "label":"Other"}
        ]
    },
    "filterNation":{
        "legend":"Nation",
        "checkboxes":[
            {"target":"NationWR", "label":"Winter Rose"},
            {"target":"NationBO", "label":"Banana Ocean"},
            {"target":"NationBH", "label":"Blossom Hill"},
            {"target":"NationBV", "label":"Bergamot Valley"},
            {"target":"NationLW", "label":"Lily Wood"},
            {"target":"NationLL", "label":"Lotus Lake"}
        ]
    },
    "filterAttr":{
        "legend":"Attribute",
        "checkboxes":[
            {"target":"AttrSlash", "label":"Slash"},
            {"target":"AttrThrust", "label":"Thrust"},
            {"target":"AttrBlunt", "label":"Blunt"},
            {"target":"AttrMagic", "label":"Magic"}
        ]
    },
    "filterSkill":{
        "legend":"Skill",
        "checkboxes":[
            {"target":"SkOneTgt", "label":"One Target"},
            {"target":"SkTwoTgt", "label":"Two Target"},
            {"target":"SkAllTgt", "label":"All Target"},
            {"target":"SkMultTgt", "label":"Multi-Target"},
            {"target":"SkDrain", "label":"One Target, Drain"},
            {"target":"SkAff", "label":"One Target, Affection-Based"},
            {"target":"SkAffDrain", "label":"One Target, Affection-Based, Drain"},
            {"target":"SkMultToAllTgt", "label":"Multi to All Target"},
            {"target":"SkRemain", "label":"Remaining Enemy Count"}
        ]
    }
}</code>
*/

/**
Toggles the class that makes some "target" hide or not.
*/
function toggleStyle(target) {
    'use strict';
    var checked = document.getElementById('chk' + target).checked;
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
        thisChar.toggleVal(target);
        toShow = thisChar.shouldShow();

        // 3. Make the whole row (not) show using .hideTr and toShow()
        thisRowElement = document.getElementById(thisRowId);
        isHidden = thisRowElement.classList.contains('hideTr');
        if (toShow && isHidden)
            thisRowElement.classList.remove('hideTr');
        else if (!toShow && !isHidden)
            thisRowElement.classList.add('hideTr');
        // else, do nothing because we don't need to toggle the hiding class
    }

    // 4. Error checking
    if (len <= 0) {
        console.log('Nothing changed for target ' + target +
            '. Is the filter form\'s JSON matching up with the' +
            ' character table module\'s CSS class names?');
    }
}

/**
Parses JSON, but throws out the whole thing if it has suspicious keys or values.
Keys and values MUST be composed of only ASCII letters, numbers, spaces,
and dashes.
@param      plainText  Text that will go through JSON.parse().
@returns    The table represented by the JSON on success. nil otherwise.
*/
function saneJsonParse(plainText) {
    'use strict';
    // Regex that only allows alphanumeric characters, () {} single and double
    // quotes, and (in the future) unicode in the range of Japanese characters
    var whitelistRegex = new RegExp('[\w\{\}\(\):"' + "'" + ']*', 'u');

    // 1. Sanitize through jQuery's text()
    var jsonTable = $(plainText).text();
    // 2. Regex to remove newlines and pairs of space characters (tabbing).
    jsonTable.replace(/[\n\r|\ \ ]/g, '');
    // 3. Parse safely as JSON
    try {
        jsonTable = JSON.parse(jsonTable);
    } catch (DOMException) {
        // Not parseable as JSON
        jsonTable = '';
    }
    // 4. Check for suspicious code
    if (whitelistRegex.test(jsonTable))
        return jsonTable;
    return '';
}

/**
Checks if a string has any dangerous tag names in it.
*/
var RISKY_WORDS = ['script', 'frame', 'style'];
function hasRiskyWords(str) {
    'use strict';
    var word;
    var len = RISKY_WORDS.length;
    var i;
    for (i = 0; i < len; i++) {
        word = RISKY_WORDS[i];
        if (str.indexOf(word) >= 0) {
            console.error('The word ' + word +
                ' is not trustworthy. Aborting.');
            return true;
        }
    }
    return false;
}

/**
This variable is a mapping of objects that state which properties
should be shown or hidden for some character.
The map's key can be anything, but the short character ID would suffice.
For rarity growth, the character ID + "R" would suffice too.
*/
var seenValuesByChar = {};
/**
"Constructor" for one "object" in the above list.
All passed parameters are strings. The meanings are obvious.
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
    Checks if this character's tr should be visible.
    Returns true if all its values are true.
    */
    shouldShow: function() {
        'use strict';
        return (this.visible.attr && this.visible.rarity &&
            this.visible.nation && this.visible.skill);
    },
    /**
    Toggles the appropriate value's visibility based on the passed string.
    */
    toggleVal: function(target) {
        'use strict';
        if (target === this.attr)
            this.visible.attr = !this.visible.attr;
        else if (target === this.rarity)
            this.visible.rarity = !this.visible.rarity;
        else if (target === this.nation)
            this.visible.nation = !this.visible.nation;
        else if (target === this.skill)
            this.visible.skill = !this.visible.skill;
        else {
            // Minor issue or future-proofing?
            //console.log('Unknown target for SeenValues.');
        }
    }
}

/**
Gets all rows in the table for the comprehensive list of knights.
*/
function getAllKnightRows() {
    return document.querySelectorAll('table.char-bigtbl tr[class]');
}

/**
Builds seenValuesByChar from the comprehensive list of flower knights.
*/
function buildSeenValuesList() {
    'use strict';
    var allRows;
    // Outer loop vars
    var i, row, numRows;
    // Inner loop vars
    var j, thisClass, numClasses;
    // Vars for making the object
    var seenV, attr, rarity, nation, skill;
    // Vars for working with CSS classes
    var validClasses;

    // 1. Find all rows in the comprehensive character table.
    allRows = getAllKnightRows();
    numRows = allRows.length;
    for (i = 0; i < numRows; i++) {
        row = allRows[i];
        // 2. Sanitize the whole row and look for risky words.
        if (hasRiskyWords( $(row).text() ))
            continue;
        // Everything beyond this point should have sane, but NOT encoded text.

        // 3. Extract the classes. This is all we really need.
        validClasses = true;
        // It's a valid class related to a character, so store the value.
        attr = rarity = nation = skill = '';
        numClasses = row.classList.length;
        for (j = 0; j < numClasses; j++) {
            thisClass = row.classList[j];
            if (!thisClass.startsWith('char')) {
                // id has been checked for sanity earlier. Safe to log.
                console.error('Unusual class found for ' + row.id);
                validClasses = false;
                continue;
            }

            // Chop off the initial "char" part of the class name.
            thisClass = thisClass.substring(4);
            if (thisClass.startsWith('Attr'))
                attr = thisClass;
            else if (thisClass.startsWith('Rarity')) {
                // Rarity of the character from 2* to 6*.
                // States "event" / "other" as well.
                rarity = thisClass;
            } else if (thisClass.startsWith('Tier')) {
                // The evolution tier from 1 to 4.
                // Currently not used, but this if-statement prevents the log.
            } else if (thisClass.startsWith('Nation'))
                nation = thisClass;
            else if (thisClass.startsWith('Sk'))
                skill = thisClass;
            else {
                console.error('Unknown, suspicious class for id ' + row.id);
                // Take no chances. We will not include this in our data set.
                validClasses = false;
            }
        }

        // 4. Data extracted. Make the object out of it.
        if (validClasses) {
            seenV = new SeenValues(attr, rarity, nation, skill);
            // Assign it to the row's id which is based on the character's id.
            // The row's id is checked for sanity from earlier.
            seenValuesByChar[row.id] = seenV;
        }
    }
}

/**
Creates the form that shows/hides rows.
It returns the entire form. You need to input it into the DOM.
Returns an ordinary string on success, or an empty string on failure.
*/
function makeFilterForm() {
    'use strict';
    // Filter form loop vars
    var selectors, i;
    // Make a placeholder for the HTML to be written into
    var filterFormJson = '';
    var filterName;
    var fieldset;
    var out = [];
    // Outer loop vars; the keys of the JSON are the names of the filters
    var filterIdx, allFilterNames, numJsonKeys;
    // Inner loop vars
    var checkboxInfo, checkboxIdx, numCheckboxes;

    // 1. Find the JSON table which MUST be in the Wikia page's content area.
    //      Do not trust ids. Check all classes supposed to have this form,
    //      and ignore the ones with untrustworthy text.
    selectors = document.querySelectorAll(
        '#WikiaMainContentContainer .filterFormJson');
    for (i = 0; i < selectors.length && filterFormJson === ''; i++) {
        filterFormJson = saneJsonParse(selectors[i]);
    }
    if (filterFormJson === '') {
        // Couldn't find the form data, or all found JSON was untrustworthy.
        return '';
    }

    // 2. Create the filter form
    // Write the opening tag
    out.push('<form id="filterForm">');
    // Loop over the JSON
    allFilterNames = Object.keys(filterFormJson);
    numJsonKeys = allFilterNames.length;
    for (filterIdx = 0; filterIdx < numJsonKeys; filterIdx++) {
        filterName = allFilterNames[filterIdx];
        // The outermost table is the field's name
        if (filterName === undefined)
            continue;
        fieldset = filterFormJson[filterName];
        out.push('<fieldset class="filterFieldset" id="' + filterName +
            '"><legend>' + fieldset.legend + '</legend>');

        // Make the fieldset's contents
        // It should make a single field like this.
        /*
        <label for="chkRarity6">
            <input type="checkbox" checked id="chkRarity6"
                onchange="toggleStyle('Rarity6')"/>
            6 Star
        </label>
        */
        numCheckboxes = fieldset.checkboxes.length;
        for (checkboxIdx = 0; checkboxIdx < numCheckboxes; checkboxIdx++) {
            checkboxInfo = fieldset.checkboxes[checkboxIdx];
            out.push(
                '<label for="chk' +
                checkboxInfo.target +
                '"><input type="checkbox" checked id="chk' +
                checkboxInfo.target +
                '" onchange="toggleStyle(\'' +
                checkboxInfo.target +
                '\')"/>' +
                checkboxInfo.label +
                '</label>'
            );
        }

        // Close the fieldset
        out.push('</fieldset>');
    }

    // Close the form
    out.push('</form>');

    // Concatenate the whole string of HTML
    out = out.join('');

    // Sanitization: We don't want frame or script tags.
    // In fact, we should only expect stuff like
    // form, field, fieldset, legend, label, checkbox, etc.
    if (hasRiskyWords(out))
        return '';
    return out;
}
/** If it exists, replaces the placeholder element with the filter form */
function putFormInPlaceholder() {
    'use strict';
    var placeholderElem = document.getElementById('filterFormPlaceholder');
    var formHtml;

    if (placeholderElem === null)
        return;
    // The placeholder exists, so make the form and replace it
    formHtml = makeFilterForm();
    placeholderElem.outerHTML = formHtml;
    buildSeenValuesList();
}
// Run the function to moment the page loads.
window.addEventListener('load', putFormInPlaceholder());
//</nowiki>