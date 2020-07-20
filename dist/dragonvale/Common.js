// ============================================================
//                       Imports
// ============================================================
// Check ImportJS for imports

// ============================================================
// BEGIN Dynamic Navigation Bars (experimantal)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */

var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */

var autoCollapse = 2;
var collapseCaption = "Hide";
var expandCaption = "Show";

function collapseTable(tableIndex) {
    var Button = document.getElementById("collapseButton" + tableIndex);
    var Table = document.getElementById("collapsibleTable" + tableIndex);

    if (!Table || !Button) {
        return false;
    }

    var Rows = Table.getElementsByTagName("tr");

    if (Button.firstChild.data == collapseCaption) {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = "none";
        }
        Button.firstChild.data = expandCaption;
    } else {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
}

function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName("table");

    for (var i = 0; i < Tables.length; i++) {
        if (hasClass(Tables[i], "collapsible")) {
            NavigationBoxes[tableIndex] = Tables[i];
            Tables[i].setAttribute("id", "collapsibleTable" + tableIndex);

            var Button = document.createElement("span");
            var ButtonLink = document.createElement("a");
            var ButtonText = document.createTextNode(collapseCaption);

            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.width = "6em";

            ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
            ButtonLink.setAttribute("href", "javascript:collapseTable(" + tableIndex + ");");
            ButtonLink.appendChild(ButtonText);

            Button.appendChild(document.createTextNode("["));
            Button.appendChild(ButtonLink);
            Button.appendChild(document.createTextNode("]"));

            var Header = Tables[i].getElementsByTagName("tr")[0].getElementsByTagName("th")[0];
            /* only add button and increment count if there is a header row to work with */
            if (Header) {
                Header.insertBefore(Button, Header.childNodes[0]);
                tableIndex++;
            }
        }
    }

    for (var i = 0; i < tableIndex; i++) {
        if (hasClass(NavigationBoxes[i], "collapsed") || (tableIndex >= autoCollapse && hasClass(NavigationBoxes[i], "autocollapse"))) {
            collapseTable(i);
        }
    }
}
addOnloadHook(createCollapseButtons);

/** Dynamic Navigation Bars (experimental) *************************************
 *
 *  Description: See [[Wikipedia:NavFrame]].
 *  Maintainers: UNMAINTAINED
 */

// set up the words in your language
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';

// set up max count of Navigation Bars on page,
// if there are more, all will be hidden
// NavigationBarShowDefault = 0; // all bars will be hidden
// NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
var NavigationBarShowDefault = autoCollapse;


// shows and hides content and picture (if available) of navigation bars
// Parameters:
//     indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar(indexNavigationBar) {
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);

    if (!NavFrame || !NavToggle) {
        return false;
    }

    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (
            var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling
        ) {
            if (hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'none';
            }
            if (hasClass(NavChild, 'NavContent')) {
                NavChild.style.display = 'none';
            }
        }
        NavToggle.firstChild.data = NavigationBarShow;

        // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (
            var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling
        ) {
            if (hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'block';
            }
            if (hasClass(NavChild, 'NavContent')) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }
}

// adds show/hide-button to navigation bars
function createNavigationBarToggleButton() {
    var indexNavigationBar = 0;
    // iterate over all < div >-elements 
    var divs = document.getElementsByTagName("div");
    for (
        var i = 0; NavFrame = divs[i]; i++
    ) {
        // if found a navigation bar
        if (hasClass(NavFrame, "NavFrame")) {

            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');

            var NavToggleText = document.createTextNode(NavigationBarHide);
            NavToggle.appendChild(NavToggleText);
            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
            for (
                var j = 0; j < NavFrame.childNodes.length; j++
            ) {
                if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                    NavFrame.childNodes[j].appendChild(NavToggle);
                }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
    // if more Navigation Bars found than Default: hide all
    if (NavigationBarShowDefault < indexNavigationBar) {
        for (
            var i = 1; i <= indexNavigationBar; i++
        ) {
            toggleNavigationBar(i);
        }
    }

}
addOnloadHook(createNavigationBarToggleButton);

// ==================================================
//  Folding Multi Wiki Tabs (experimental)
// ==================================================

function foldingTabsMulti() {
    var len = 0;
    ftsets = getElementsByClassName(document, 'div', 'foldtabSet'); //global object array thingy
    if (ftsets.length == 0) return

    for (var i = 0; i < ftsets.length; i++) {
        ftsets[i].head = getElementsByClassName(ftsets[i], 'div', 'foldtabHead')[0];
        ftsets[i].links = ftsets[i].head.getElementsByTagName('a');
        ftsets[i].boxen = getElementsByClassName(ftsets[i], 'div', 'foldtabBox');

        if (ftsets[i].links.length < ftsets[i].boxen.length) {
            len = ftsets[i].boxen.length;
        } else {
            len = ftsets[i].links.length;
        }

        for (var j = 0; j < len; j++) {
            ftsets[i].links[j].href = 'javascript:showmultitab(\'' + i + '\',\'' + j + '\');';
            ftsets[i].links[j].title = 'click to display tab ' + j + ' of set ' + i;
        }
        showmultitab(i, '0');
        ftsets[i].head.style.display = 'block';
    }
}
addOnloadHook(foldingTabsMulti);

function showmultitab(set, num) {
    for (var j = 0; j < ftsets[set].boxen.length; j++) {
        if (j == num) {
            ftsets[set].boxen[j].style.display = 'block';
        } else {
            ftsets[set].boxen[j].style.display = 'none';
        }
    }
    for (var j = 0; j < ftsets[set].links.length; j++) {
        if (j == num) {
            ftsets[set].links[j].className = 'selected';
            ftsets[set].links[j].blur();
        } else {
            ftsets[set].links[j].className = '';
        }
    }
}

// ==================================================
//            END Folding Multi Wiki Tabs
// ==================================================

/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */

if (wgNamespaceNumber == 110) {
    disableOldForumEdit();
}

function disableOldForumEdit() {
    if (typeof(enableOldForumEdit) != 'undefined' && enableOldForumEdit) {
        return;
    }
    if (!document.getElementById('old-forum-warning')) {
        return;
    }

    if (skin == 'oasis') {
        $("#WikiaPageHeader .wikia-menu-button li a:first").html('Archived').removeAttr('href');
        $('#WikiaPageHeader .wikia-button').html('Archived').removeAttr('href');
        return;
    }

    if (!document.getElementById('ca-edit')) {
        return;
    }
    var editLink = null;
    if (skin == 'monobook') {
        editLink = document.getElementById('ca-edit').firstChild;
    } else {
        return;
    }


    editLink.removeAttribute('href', 0);
    editLink.removeAttribute('title', 0);
    editLink.style.color = 'gray';
    editLink.innerHTML = 'Archived';

    $('span.editsection-upper').remove();

}

/* Changes the Lock Old Blogs After 30 Days To A Chosen Amount */
window.LockOldBlogs = {
    expiryDays: 500,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this blog!",
    nonexpiryCategory: "Never archived blogs"
};

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});
/* End of the {{USERNAME}} replacement */

/* Spoiler Alert */
window.SpoilerAlert = {
    question: 'Greetings, Wizard!',
    yes: '<img src="https://images.wikia.nocookie.net/dragonvale/images/a/a5/Enter.png">',
    no: '<img src="https://images.wikia.nocookie.net/dragonvale/images/7/78/BigXIcon.png">',
    isSpoiler: function() {
        return Boolean($('.spoiler').length);
    }
};
/* End Spoiler Alert */

/* Dragon Reference Chart All Drop Down */
$(function() {
    // Add dropdown for element filtering to 'dragon reference chart' page at the right position.
    $('.page-Dragon_Reference_Chart div.var2').last().prepend('<label>&nbsp &nbsp &nbsp Show dragons with the epic element:</label><select id="elementSelector"><option value="epic">All</option><option value="rainbow">Rainbow</option><option value="moon">Moon</option><option value="sun">Sun</option><option value="treasure">Treasure</option><option value="olympus">Olympus</option><option value="seasonal">Seasonal</option><option value="apocalypse">Apocalypse</option><option value="dream">Dream</option><option value="galaxy">Galaxy</option><option value="rift">Rift</option><option value="snowflake">Snowflake</option><option value="monolith">Monolith</option><option value="ornamental">Ornamental</option><option value="aura">Aura</option><option value="chrysalis">Chrysalis</option><option value="hidden">Hidden</option></select>');
    $('#elementSelector').on('change', function(event) {
        var newValue = this.value;
        // When the dropdown box changes value, first show all rows
        $('.var2 tbody tr').show();
        // Then hide the rows not matching the selected element
        if (newValue !== 'all') {
            $('.var2 tbody tr:not(.' + newValue + ')').hide();
        }
    });
});

$(function() {
    // Add dropdown for element filtering to 'dragon reference chart' page at the right position.
    $('.page-Dragon_Reference_Chart div.var2').last().prepend('<label>&nbsp &nbsp &nbsp Show dragons with the element:</label><select id="elementSelector"><option value="all">All</option><option value="plant">Plant</option><option value="fire">Fire</option><option value="earth">Earth</option><option value="cold">Cold</option><option value="lightning">Lightning</option><option value="water">Water</option><option value="air">Air</option><option value="metal">Metal</option><option value="light">Light</option><option value="dark">Dark</option><option value="epic">Epic</option></select>');
    $('#elementSelector').on('change', function(event) {
        var newValue = this.value;
        // When the dropdown box changes value, first show all rows
        $('.var2 tbody tr').show();
        // Then hide the rows not matching the selected element
        if (newValue !== 'all') {
            $('.var2 tbody tr:not(.' + newValue + ')').hide();
        }
    });
});

/* Assigned Element Drop Down */
$(function() {
    // Add dropdown for element filtering to 'assigned element chart' page at the left position.
    $('.page-Assigned_Elements div.var1').last().prepend('<label>&nbsp &nbsp &nbsp Show decorations with the following element:</label><select id="elementSelector"><option value="all">All</option><option value="plant">Plant</option><option value="fire">Fire</option><option value="earth">Earth</option><option value="cold">Cold</option><option value="lightning">Lightning</option><option value="water">Water</option><option value="air">Air</option><option value="metal">Metal</option><option value="light">Light</option><option value="dark">Dark</option><option value="rainbow">Rainbow</option><option value="moon">Moon</option><option value="sun">Sun</option><option value="treasure">Treasure</option><option value="olympus">Olympus</option><option value="seasonal">Seasonal</option><option value="apocalypse">Apocalypse</option><option value="dream">Dream</option><option value="snowflake">Snowflake</option><option value="monolith">Monolith</option><option value="celebration">Celebration</option><option value="omni">Omni</option><option value="none">None</option></select>');
    $('#elementSelector').on('change', function(event) {
        var newValue = this.value;
        // When the dropdown box changes value, first show all rows
        $('.var1 tbody tr').show();
        // Then hide the rows not matching the selected element
        if (newValue !== 'all') {
            $('.var1 tbody tr:not(.' + newValue + ')').hide();
        }
    });
});

$(function() {
    // Add dropdown for element filtering to 'assigned element chart' page at the left position.
    $('.page-Assigned_Elements div.var2').last().prepend('<label>&nbsp &nbsp &nbsp Show habitats with the following element:</label><select id="elementSelector"><option value="all">All</option><option value="plant">Plant</option><option value="fire">Fire</option><option value="earth">Earth</option><option value="cold">Cold</option><option value="lightning">Lightning</option><option value="water">Water</option><option value="air">Air</option><option value="metal">Metal</option><option value="light">Light</option><option value="dark">Dark</option><option value="rainbow">Rainbow</option><option value="moon">Moon</option><option value="sun">Sun</option><option value="treasure">Treasure</option><option value="olympus">Olympus</option><option value="seasonal">Seasonal</option><option value="apocalypse">Apocalypse</option><option value="dream">Dream</option><option value="snowflake">Snowflake</option><option value="monolith">Monolith</option><option value="celebration">Celebration</option><option value="omni">Omni</option><option value="none">None</option></select>');
    $('#elementSelector').on('change', function(event) {
        var newValue = this.value;
        // When the dropdown box changes value, first show all rows
        $('.var2 tbody tr').show();
        // Then hide the rows not matching the selected element
        if (newValue !== 'all') {
            $('.var2 tbody tr:not(.' + newValue + ')').hide();
        }
    });
});

$(function() {
    // Add dropdown for element filtering to 'assigned element chart' page at the left position.
    $('.page-Assigned_Elements div.var3').last().prepend('<label>&nbsp &nbsp &nbsp Show buildings with the following element:</label><select id="elementSelector"><option value="all">All</option><option value="plant">Plant</option><option value="fire">Fire</option><option value="earth">Earth</option><option value="cold">Cold</option><option value="lightning">Lightning</option><option value="water">Water</option><option value="air">Air</option><option value="metal">Metal</option><option value="light">Light</option><option value="dark">Dark</option><option value="rainbow">Rainbow</option><option value="moon">Moon</option><option value="sun">Sun</option><option value="treasure">Treasure</option><option value="olympus">Olympus</option><option value="seasonal">Seasonal</option><option value="apocalypse">Apocalypse</option><option value="dream">Dream</option><option value="snowflake">Snowflake</option><option value="monolith">Monolith</option><option value="celebration">Celebration</option><option value="omni">Omni</option><option value="none">None</option></select>');
    $('#elementSelector').on('change', function(event) {
        var newValue = this.value;
        // When the dropdown box changes value, first show all rows
        $('.var3 tbody tr').show();
        // Then hide the rows not matching the selected element
        if (newValue !== 'all') {
            $('.var3 tbody tr:not(.' + newValue + ')').hide();
        }
    });
});

$(function() {
    // Add dropdown for element filtering to 'assigned element chart' page at the left position.
    $('.page-Assigned_Elements div.var4').last().prepend('<label>&nbsp &nbsp &nbsp Show islands with the following element:</label><select id="elementSelector"><option value="all">All</option><option value="plant">Plant</option><option value="fire">Fire</option><option value="earth">Earth</option><option value="cold">Cold</option><option value="lightning">Lightning</option><option value="water">Water</option><option value="air">Air</option><option value="metal">Metal</option><option value="light">Light</option><option value="dark">Dark</option><option value="rainbow">Rainbow</option><option value="moon">Moon</option><option value="sun">Sun</option><option value="treasure">Treasure</option><option value="olympus">Olympus</option><option value="seasonal">Seasonal</option><option value="apocalypse">Apocalypse</option><option value="dream">Dream</option><option value="snowflake">Snowflake</option><option value="monolith">Monolith</option><option value="celebration">Celebration</option><option value="omni">Omni</option><option value="none">None</option></select>');
    $('#elementSelector').on('change', function(event) {
        var newValue = this.value;
        // When the dropdown box changes value, first show all rows
        $('.var4 tbody tr').show();
        // Then hide the rows not matching the selected element
        if (newValue !== 'all') {
            $('.var4 tbody tr:not(.' + newValue + ')').hide();
        }
    });
});