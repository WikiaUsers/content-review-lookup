/* Any JavaScript here will be loaded for all users on every page load. */
/* <pre> */

/* Auto-Refresh in Recent Changes */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxSpecialPages = ['Recentchanges', 'WikiActivity'];

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
var collapseCaption = "hide";
var expandCaption = "show";

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

function getElementsByClass(searchClass, node, tag) {
    var classElements = new Array();

    if (node == null)
        node = document;

    if (tag == null)
        tag = '*';

    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var tester = new ClassTester(searchClass);

    for (i = 0, j = 0; i < elsLen; i++) {
        if (tester.isMatch(els[i])) {
            classElements[j] = els[i];
            j++;
        }
    }

    return classElements;
}

function ClassTester(className) {
    this.regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
}
ClassTester.prototype.isMatch = function(element) {
    return this.regex.test(element.className);
}
/*
    end getElementsByClass
*/

var DOCHEAD = document.getElementsByTagName('HEAD')[0];

function createElement(tag, children, props) {
    var element = document.createElement(tag);
    if (!(children instanceof Array)) children = [children];
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (typeof child == 'string') child = document.createTextNode(child);
        if (child) element.appendChild(child);
    }
    if (typeof props == 'object') {
        for (var k in props) {
            switch (k) {
                case 'styles':
                    var styles = props.styles;
                    for (var s in styles) element.style[s] = styles[s];
                    break;
                case 'events':
                    var events = props.events;
                    for (var e in events) addHandler(element, e, events[e]);
                    break;
                case 'class':
                    element.className = props[k];
                    break;
                default:
                    element.setAttribute(k, props[k]);
            }
        }
    }
    return element;
}

// =====================================================================
// Pagetitle rewrite
//
// =====================================================================
// Pagetitle rewrite
//
// Rewrites the page's title, used by Template:Title
//
// =====================================================================

$(function() {
    var newTitle = $("#title-meta").html();
    if (!newTitle) return;
    var edits = $("#user_masthead_since").text();
    $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
    $(".#user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
});

/* --------------------------------------------------
//  <TT> News ticker 2.0, by Splarka, better version
// --------------------------------------------------
var ticker;
var tickertxt;
var tickerdiv;

function newsticker() {
    if (document.getElementById) {
        if ((document.getElementById('ticker')) && (document.getElementById('tickerdiv')) && (document.getElementById('tickertxt'))) {
            ticker = document.getElementById('ticker');
            ticker.style.display = 'block';
            tickerdiv = document.getElementById('tickerdiv');
            tickertxt = document.getElementById('tickertxt').offsetWidth;
            tickerdiv.style.left = parseInt(ticker.style.width) + 10 + 'px';
            lefttime = setInterval("newstickergo()", 200);
        }
    }
}

$(function newstickergo() {
    tickerdiv.style.left = (parseInt(tickerdiv.style.left) > (-10 - tickertxt)) ? parseInt(tickerdiv.style.left) - 10 + "px" : parseInt(ticker.style.width) + 10 + "px";
}); */
// --------------------------------------------------
//             End <TT> News ticker 2.0
// --------------------------------------------------

// *********
// IRC Login 
// *********
$(function() {
    if ($('#IRClogin')) {
        var nick = (wgUserName == null) ? ('Wikian' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_');
        $('#IRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=wikia-combatarms&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="950" height="400" style="border:0;"></iframe>');
    }
    if ($('#CVNIRClogin')) {
        var nick = (wgUserName == null) ? ('Wikian' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_');
        $('#CVNIRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=cvn-wikia-combatarms&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="950" height="400" style="border:0;"></iframe>');
    }
});

/* written by H Fern for more streamlined featured articles */
if (document.getElementById('plugin_featured') !== null) {
    s = document.getElementById('plugin_featured');
    dt = s.innerHTML;
    document.getElementById('WikiaPageHeader').getElementsByClassName("comments")[0].setAttribute('style', 'clear:none;');
    li = document.createElement('li');
    li.setAttribute('style', 'float:left;clear:both;height:20px;');
    li.setAttribute('title', dt == '' ? 'This article is a featured Article.' : 'This article was featured ' + dt + '.');
    li.innerHTML = '<img src="https://images.wikia.nocookie.net/combatarms/images/1/1f/Gold_star.png" style="width:20px;height;20px;"><span style="padding-left:5px;">Featured</span>';
    n = document.getElementById('WikiaPageHeader').getElementsByClassName('commentslikes')[0];
    n.insertBefore(li, n.childNodes[0]);
}