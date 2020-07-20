/* Import more specific scripts if necessary */

if (wgAction == "edit" || wgAction == "submit" || wgPageName == "Special:Upload") { //scripts specific to editing pages 
    importScript("MediaWiki:Common.js/edit.js");
} else if (wgPageName == "Special:Watchlist") { //watchlist scripts
    importScript("MediaWiki:Common.js/watchlist.js");
} else if (wgPageName == "Special:Search") { //scripts specific to Special:Search
    importScript("MediaWiki:Common.js/search.js");
}

/** Sysop Javascript *******************************************************
 *
 *  Description: Allows for sysop-specific Javascript at [[MediaWiki:Sysop.js]].
 */
$(function sysopFunctions() {
    if (wgUserGroups && !window.disableSysopJS) {
        for (var g = 0; g < wgUserGroups.length; ++g) {
            if (wgUserGroups[g] == "sysop") {
                importScript("MediaWiki:Sysop.js");
                break;
            }
        }
    }
});

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */

var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();


/** Interwiki links to featured articles ***************************************
 *
 *  Description: Highlights interwiki links to featured articles (or
 *               equivalents) by changing the bullet before the interwiki link
 *               into a star.
 *  Maintainers: [[User:R. Koot]]
 */

$(function LinkFA() {
    if (document.getElementById("p-lang")) {
        var InterwikiLinks = document.getElementById("p-lang").getElementsByTagName("li");

        for (var i = 0; i < InterwikiLinks.length; i++) {
            if (document.getElementById(InterwikiLinks[i].className + "-fa")) {
                InterwikiLinks[i].className += " FA"
                InterwikiLinks[i].title = "This is a featured article in another language.";
            }
        }
    }
});


/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */

var autoCollapse = 2;
var collapseCaption = "esconder";
var expandCaption = "mostrar";

function collapseTable(tableIndex) {
    var Button = document.getElementById("collapseButton" + tableIndex);
    var Table = document.getElementById("collapsibleTable" + tableIndex);

    if (!Table || !Button) {
        return false;
    }

    var Rows = Table.rows;

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

            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName("tr")[0];
            if (!HeaderRow) continue;
            var Header = HeaderRow.getElementsByTagName("th")[0];
            if (!Header) continue;

            NavigationBoxes[tableIndex] = Tables[i];
            Tables[i].setAttribute("id", "collapsibleTable" + tableIndex);

            var Button = document.createElement("span");
            var ButtonLink = document.createElement("a");
            var ButtonText = document.createTextNode(collapseCaption);

            Button.className = "collapseButton"; //Styles are declared in Common.css

            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
            ButtonLink.setAttribute("href", "javascript:collapseTable(" + tableIndex + ");");
            ButtonLink.appendChild(ButtonText);

            Button.appendChild(document.createTextNode("["));
            Button.appendChild(ButtonLink);
            Button.appendChild(document.createTextNode("]"));

            Header.insertBefore(Button, Header.childNodes[0]);
            tableIndex++;
        }
    }

    for (var i = 0; i < tableIndex; i++) {
        if (hasClass(NavigationBoxes[i], "collapsed") || (tableIndex >= autoCollapse && hasClass(NavigationBoxes[i], "autocollapse"))) {
            collapseTable(i);
        } else if (hasClass(NavigationBoxes[i], "innercollapse")) {
            var element = NavigationBoxes[i];
            while (element = element.parentNode) {
                if (hasClass(element, "outercollapse")) {
                    collapseTable(i);
                    break;
                }
            }
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
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
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
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
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
    for (var i = 0; NavFrame = divs[i]; i++) {
        // if found a navigation bar
        if (hasClass(NavFrame, "NavFrame")) {

            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');

            var isCollapsed = hasClass(NavFrame, "collapsed");
            /*
             * Check if any children are already hidden.  This loop is here for backwards compatibility:
             * the old way of making NavFrames start out collapsed was to manually add style="display:none"
             * to all the NavPic/NavContent elements.  Since this was bad for accessibility (no way to make
             * the content visible without JavaScript support), the new recommended way is to add the class
             * "collapsed" to the NavFrame itself, just like with collapsible tables.
             */
            for (var NavChild = NavFrame.firstChild; NavChild != null && !isCollapsed; NavChild = NavChild.nextSibling) {
                if (hasClass(NavChild, 'NavPic') || hasClass(NavChild, 'NavContent')) {
                    if (NavChild.style.display == 'none') {
                        isCollapsed = true;
                    }
                }
            }
            if (isCollapsed) {
                for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
                    if (hasClass(NavChild, 'NavPic') || hasClass(NavChild, 'NavContent')) {
                        NavChild.style.display = 'none';
                    }
                }
            }
            var NavToggleText = document.createTextNode(isCollapsed ? NavigationBarShow : NavigationBarHide);
            NavToggle.appendChild(NavToggleText);

            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
            for (var j = 0; j < NavFrame.childNodes.length; j++) {
                if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                    NavFrame.childNodes[j].appendChild(NavToggle);
                }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
}

addOnloadHook(createNavigationBarToggleButton);

/** Table sorting fixes ************************************************
 *
 *  Description: Disables code in table sorting routine to set classes on even/odd rows
 *  Maintainers: [[User:Random832]]
 */

ts_alternate_row_colors = false;

/** Magic editintros ****************************************************
 *
 *  Description: Adds editintros on disambiguation pages and BLP pages.
 *  Maintainers: [[User:RockMFR]]
 */

function addEditIntro(name) {
    var el = document.getElementById('ca-edit');
    if (!el)
        return;
    el = el.getElementsByTagName('a')[0];
    if (el)
        el.href += '&editintro=' + name;
}

if (wgNamespaceNumber == 0) {
    addOnloadHook(function() {
        if (document.getElementById('disambig') || document.getElementById('disambigbox'))
            addEditIntro('Template:Disambig_editintro');
    });

    addOnloadHook(function() {
        var cats = document.getElementById('mw-normal-catlinks');
        if (!cats)
            return;
        cats = cats.getElementsByTagName('a');
        for (var i = 0; i < cats.length; i++) {
            if (cats[i].title == 'Category:Living people') {
                addEditIntro('Template:BLP_editintro');
                break;
            }
        }
    });
}

function getInnerText(el) {
    if (typeof el == "string") return el;
    if (typeof el == "undefined") {
        return el;
    }
    if (el.textContent) return el.textContent; // not needed but it is faster
    if (el.innerText) return el.innerText; // IE doesn't have textContent
    var str = "";

    var cs = el.childNodes;
    var l = cs.length;
    for (var i = 0; i < l; i++) {
        switch (cs[i].nodeType) {
            case 1: //ELEMENT_NODE
                str += ts_getInnerText(cs[i]);
                break;
            case 3: //TEXT_NODE
                str += cs[i].nodeValue;
                break;
        }
    }
    return str;
}

/**
 * Set up accesskeys/tooltips from the deprecated ta array.  If doId
 * is specified, only set up for that id.  Note that this function is
 * deprecated and will not be supported indefinitely -- use
 * updateTooltipAccessKey() instead.
 *
 * @param mixed doId string or null
 */
function akeytt(doId) {
    // A lot of user scripts (and some of the code below) break if
    // ta isn't defined, so we make sure it is.  Explictly using
    // window.ta avoids a "ta is not defined" error.
    if (!window.ta) window.ta = new Array();

    // Make a local, possibly restricted, copy to avoid clobbering
    // the original.
    var ta;
    if (doId) {
        ta = [doId];
    } else {
        ta = window.ta;
    }

    // Now deal with evil deprecated ta
    var watchCheckboxExists = document.getElementById('wpWatchthis') ? true : false;
    for (var id in ta) {
        var n = document.getElementById(id);
        if (n) {
            var a = null;
            var ak = '';
            // Are we putting accesskey in it
            if (ta[id][0].length > 0) {
                // Is this object a object? If not assume it's the next child.

                if (n.nodeName.toLowerCase() == "a") {
                    a = n;
                } else {
                    a = n.childNodes[0];
                }
                // Don't add an accesskey for the watch tab if the watch
                // checkbox is also available.
                if (a && ((id != 'ca-watch' && id != 'ca-unwatch') || !watchCheckboxExists)) {
                    a.accessKey = ta[id][0];
                    ak = ' [' + tooltipAccessKeyPrefix + ta[id][0] + ']';
                }
            } else {
                // We don't care what type the object is when assigning tooltip
                a = n;
                ak = '';
            }

            if (a) {
                a.title = ta[id][1] + ak;
            }
        }
    }
}

var checkboxes;
var lastCheckbox;

function setupCheckboxShiftClick() {
    checkboxes = [];
    lastCheckbox = null;
    var inputs = document.getElementsByTagName('input');
    addCheckboxClickHandlers(inputs);
}

function addCheckboxClickHandlers(inputs, start) {
    if (!start) start = 0;

    var finish = start + 250;
    if (finish > inputs.length)
        finish = inputs.length;

    for (var i = start; i < finish; i++) {
        var cb = inputs[i];
        if (!cb.type || cb.type.toLowerCase() != 'checkbox')
            continue;
        var end = checkboxes.length;
        checkboxes[end] = cb;
        cb.index = end;
        cb.onclick = checkboxClickHandler;
    }

    if (finish < inputs.length) {
        setTimeout(function() {
            addCheckboxClickHandlers(inputs, finish);
        }, 200);
    }
}

function checkboxClickHandler(e) {
    if (typeof e == 'undefined') {
        e = window.event;
    }
    if (!e.shiftKey || lastCheckbox === null) {
        lastCheckbox = this.index;
        return true;
    }
    var endState = this.checked;
    var start, finish;
    if (this.index < lastCheckbox) {
        start = this.index + 1;
        finish = lastCheckbox;
    } else {
        start = lastCheckbox;
        finish = this.index - 1;
    }
    for (var i = start; i <= finish; ++i) {
        checkboxes[i].checked = endState;
        if (i > start && typeof checkboxes[i].onchange == 'function')
            checkboxes[i].onchange(); // fire triggers
    }
    lastCheckbox = this.index;
    return true;
}

function toggle_element_activation(ida, idb) {
    if (!document.getElementById) {
        return;
    }
    document.getElementById(ida).disabled = true;
    document.getElementById(idb).disabled = false;
}

function toggle_element_check(ida, idb) {
    if (!document.getElementById) {
        return;
    }
    document.getElementById(ida).checked = true;
    document.getElementById(idb).checked = false;
}

/*
	Written by Jonathan Snook, http://www.snook.ca/jonathan
	Add-ons by Robert Nyman, http://www.robertnyman.com
	Author says "The credit comment is all it takes, no license. Go crazy with it!:-)"
	From http://www.robertnyman.com/2005/11/07/the-ultimate-getelementsbyclassname/
*/
function getElementsByClassName(oElm, strTagName, oClassNames) {
    var arrReturnElements = new Array();
    if (typeof(oElm.getElementsByClassName) == "function") {
        /* Use a native implementation where possible FF3, Saf3.2, Opera 9.5 */
        var arrNativeReturn = oElm.getElementsByClassName(oClassNames);
        if (strTagName == "*")
            return arrNativeReturn;
        for (var h = 0; h < arrNativeReturn.length; h++) {
            if (arrNativeReturn[h].tagName.toLowerCase() == strTagName.toLowerCase())
                arrReturnElements[arrReturnElements.length] = arrNativeReturn[h];
        }
        return arrReturnElements;
    }
    var arrElements = (strTagName == "*" && oElm.all) ? oElm.all : oElm.getElementsByTagName(strTagName);
    var arrRegExpClassNames = new Array();
    if (typeof oClassNames == "object") {
        for (var i = 0; i < oClassNames.length; i++) {
            arrRegExpClassNames[arrRegExpClassNames.length] =
                new RegExp("(^|\\s)" + oClassNames[i].replace(/\-/g, "\\-") + "(\\s|$)");
        }
    } else {
        arrRegExpClassNames[arrRegExpClassNames.length] =
            new RegExp("(^|\\s)" + oClassNames.replace(/\-/g, "\\-") + "(\\s|$)");
    }
    var oElement;
    var bMatchesAll;
    for (var j = 0; j < arrElements.length; j++) {
        oElement = arrElements[j];
        bMatchesAll = true;
        for (var k = 0; k < arrRegExpClassNames.length; k++) {
            if (!arrRegExpClassNames[k].test(oElement.className)) {
                bMatchesAll = false;
                break;
            }
        }
        if (bMatchesAll) {
            arrReturnElements[arrReturnElements.length] = oElement;
        }
    }
    return (arrReturnElements);
}

/**************************************************************/
/* sliders using jquery by User:Tierrie in Dragon Age Wiki */
/**************************************************************/
mw.loader.using(['jquery.ui.tabs'], function() {
    $(document).ready(function() {
        var $tabs = $("#portal_slider").tabs({
            fx: {
                opacity: 'toggle',
                duration: 100
            }
        });
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
        $('#portal_next').click(function() {
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1); // switch to next tab
            return false;
        });
        $('#portal_prev').click(function() { // bind click event to link
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1); // switch to previous tab
            return false;
        });
    });
});

// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>

function updatetimer(i) {
    var now = new Date();
    var then = timers[i].eventdate;
    var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);

    // catch bad date strings
    if (isNaN(diff)) {
        timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
        return;
    }

    // determine plus/minus
    if (diff < 0) {
        diff = -diff;
        var tpm = 'T plus ';
    } else {
        var tpm = 'T minus ';
    }

    // calcuate the diff
    var left = (diff % 60) + ' seconds';
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 60) + ' minutes ' + left;
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 24) + ' hours ' + left;
    diff = Math.floor(diff / 24);
    if (diff > 0) left = diff + ' days ' + left
    timers[i].firstChild.nodeValue = tpm + left;

    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}

function checktimers() {
    //hide 'nocountdown' and show 'countdown'
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none';
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (var i in countdowns) countdowns[i].style.display = 'inline';

    //set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = new Array(); // generic holder for the timeouts, global
    if (timers.length === 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
    }
}
addOnloadHook(checktimers);


// **************************************************
// Tabber changes to avoid anchor points on URL for articles
// **************************************************

mw.hook('wikipage.content').add(function($content){
    $.each($content.find('.tabbernav a, .tabbertab'), function(){
        var $this = $(this);
        $this.attr('title', $this.attr('title') + '.');
    });
});