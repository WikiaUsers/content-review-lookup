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

var articleElement = document.getElementById("WikiaArticle");
/* Encodes text to hash-part of URL */
function encodeHash(string, includehash) {
    if (includehash) string = string.slice(1);
    string = encodeURIComponent(string).replaceAll("%", ".");
    if (includehash) string = "#" + string;
    return string;
}

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
    var divs = articleElement.getElementsByTagName("div");
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

/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */

if (wgNamespaceNumber == 110) {

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
        if (skin == 'monaco') {
            editLink = document.getElementById('ca-edit');
        } else if (skin == 'monobook') {
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
    addOnloadHook(disableOldForumEdit);
}

//=============================================================================
// IRC support
// from http://dev.wikia.com/wiki/Freenode_IRC#Embedding_Wikia.27s_IRC_gateway
//=============================================================================
function onloadhookcustomirc() {
    var replace = document.getElementById("JRChatReplace");
    if (null != replace) {
        replace.innerHTML = '<iframe src="http://webchat.freenode.net/?channels=wikia-onepiece" width="450" height="400"></iframe>';
        if (window.attachEvent) window.attachEvent("onbeforeunload", confirmexitjrchat);
        else window.onbeforeunload = confirmexitjrchat;

    }
    //alert(document.getElementById("JRChatReplace").innerHTML);

}

if (window.addEventListener) window.addEventListener("load", onloadhookcustomirc, false);
else if (window.attachEvent) window.attachEvent("onload", onloadhookcustomirc);

importScriptPage('MediaWiki:Tooltip.js', 'joeplayground');

//Creates a node given HTML
//E.g. '<div style="color: blue" class="red">' will create div element with given style and class
//Parameters without values (e.g. "disabled") cannot be used.
Document.prototype.createElementFromHTML = function(input) {
    var innerhtml;
    if (input.contains("</")) {
        innerhtml = input.split(">");
        innerhtml.shift();
        innerhtml = innerhtml.join(">").split("<");
        innerhtml.pop();
        innerhtml = innerhtml.join("<");
    }
    input = input.split(">")[0].split('"');
    for (var i = 0; i < input.length; i++) {
        if (i % 2 === 0 && i != input.length - 1) input[i] = input[i].replaceAll(" ", "@s@");
    }
    if (input.length > 1) input.pop();
    input = input.join('"');
    var attribs = input.split("@s@");
    var tag = attribs.shift().replace("<", "").replace(">", "");
    var elem = document.createElement(tag);
    for (var i = 0; i < attribs.length; i++) {
        var attval = attribs[i].split("=");
        attval[1] = attval[1].split('"')[1];
        elem.setAttribute(attval[0], attval[1]);
    }
    if (innerhtml) elem.innerHTML = innerhtml;
    return elem;
};

Node.prototype.getFirstAncestorByTagName = function(tag, limit) {
    if (!limit) limit = -1;
    var e = this;
    for (var i = 0; i != limit; i++) {
        e = e.parentNode;
        if (e.tagName.toLowerCase() == tag.toLowerCase()) break;
        if (i == limit - 1) return undefined;
    }
    return e;
};

Node.prototype.getElementsByTagAndClass = function(tagN, classN) {
    if (typeof(getElementsByClassName) != "undefined") return getElementsByClassName(this, tagN, classN);
    var arr = this.getElementsByClassName(classN);
    var outp = [];
    for (var i = 0; i < arr.length; i++)
        if (arr[i].tagName.toLowerCase() === tagN.toLowerCase()) outp.push(arr[i]);
    return outp;
};

Node.prototype.setStyles = function(styles, optValue) {
    if (optValue) {
        this.styles = optValue;
        return;
    }
    for (var x in styles) {
        this.style[x] = styles[x];
    }
};

Node.prototype.insertAfter = function(moveElement, staticElement) {
    var nextAfter = staticElement.nextSibling;
    if (nextAfter) {
        this.insertBefore(moveElement, nextAfter);
        return;
    }
    this.appendChild(moveElement);
};

Node.prototype.stealChildren = function(el, before) {
    if (before)
        for (var i = 0; el.childNodes.length > 0; i++) {
            if (i === 0) this.insertBefore(el.childNodes[0], this.childNodes[0]);
            else this.insertAfter(el.childNodes[0], this.childNodes[i]);
        }
    while (el.childNodes.length > 0) this.appendChild(el.childNodes[0]);
};

Node.prototype.addClass = function(className) {
    if (this.classList) this.classList.add(className);
    else if (!((" " + this.className + " ").contains("className"))) this.className += " " + className;
};

Node.prototype.removeClass = function(className) {
    if (this.classList) this.classList.remove(className);
    else if (((" " + this.className + " ").contains("className"))) this.className = "(@s@ " + this.className + " @e@".replaceAll(" className ", " ").replaceAll("@s@ ", "").replaceAll(" @e@", "").replaceAll("@e@", "");

};

Node.prototype.hasClass = function(className) {
    if (this.classList) return this.classList.contains(className);
    return (" " + this.className + " ").contains(" " + className + " ");
};

Node.prototype.createCssRules = function(rules, id) {
    return createCssRules(rules, id, this);
};

function insertAfter(moveElement, staticElement) {
    staticElement.parentNode.insertAfter(moveElement, staticElement);
}

function insertBefore(moveElement, staticElement) {
    staticElement.parentNode.insertBefore(moveElement, staticElement);
}

Node.prototype.kill = function() { //deprecated
    this.remove;
};

function killElement(e) //deprecated
{
    if (e) e.remove(e);
}

function killElementsByClassName(c) //deprecated
{
    var e = document.getElementsByClassName(c);
    for (var i = 0; i < e.length; i++) {
        e[i].remove();
    }
}

function killElementById(id) //deprecated
{
    if (document.getElementById(id)) document.getElementById(id).remove();
}

(function() {
    var arrayMethods = Object.getOwnPropertyNames(Array.prototype);
    var arrayLike = [NodeList, HTMLCollection];
    arrayLike.forEach(function(a) {
        arrayMethods.forEach(function(b) {
            a.prototype[b] = Array.prototype[b];
        });
    });
})();

Object.defineProperty(Node.prototype, "documentOffsetTop", {
    get: function() {
        var element = this;
        var x = 0;
        while (true) {
            if (element.offsetTop === undefined) break;
            x += element.offsetTop;
            if (element.tagName == "BODY" || !element.offsetParent === undefined) break;
            element = element.offsetParent;
        }
        return x;
    }
});

Object.defineProperty(Node.prototype, "documentOffsetLeft", {
    get: function() {
        var element = this;
        var x = 0;
        while (true) {
            if (element.offsetLeft === undefined) break;
            x += element.offsetLeft;
            if (element.tagName == "BODY" || !element.offsetParent === undefined) break;
            element = element.offsetParent;
        }
        return x;
    }
});

Object.defineProperty(Node.prototype, "documentOffsetBottom", {
    get: function() {
        return this.documentOffsetTop + this.offsetHeight;
    }
});

Object.defineProperty(Node.prototype, "documentOffsetRight", {
    get: function() {
        return this.documentOffsetLeft + this.offsetWidth;
    }
});

/*** String stuff ***********************************************************
 * Small functions that are used with strings.
 * Documentation on Help:JavaScript
 ****************************************************************************/
String.prototype.replaceAll = function(f, r) {
    if (typeof(r) == "undefined") r = "";
    return this.split(f).join(r);
};
String.prototype.searchAppend = function(f, a) {
    return this.replaceAll(f, f + a);
};
String.prototype.searchPrepend = function(f, a) {
    return this.replaceAll(f, a + f);
};
String.prototype.fAndR = String.prototype.replaceAll; //deprecated
String.prototype.toExec = function() {
    return this.replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&");
};
String.prototype.urlEncode = function() {
    return this.replaceAll(" ", "_");
};
String.prototype.contains = function(search) {
    if (this.indexOf(search) != -1) return true;
    return false;
};

function rewriteSearchFormLink() {
    if ($('#searchform').length === 0) {
        return;
    }
    var links = document.getElementById('searchform').getElementsByTagName('a');

    if (links.length > 0) {
        links[0].href = wgScriptPath + '/index.php?title=Special:Search&adv=1';
    }
}

var firstRun = true;

function loadFunc() {
    console.log("(tabber)loadFunc()", new Date());
    if (firstRun) firstRun = false;
    else return;

    rewriteSearchFormLink();

    fixSearch();
}

function fixSearch() {
    var button = document.getElementById('searchSubmit');

    if (button) button.name = 'go';
}

addOnloadHook(loadFunc);

/*** Tabber extension - change tabs with hash *******************************
 * Allows changing of tab with given syntax
 * Defaults to using location.hash
 * Syntax is (#)[tabber.title]:[tab.title];
 * For tabs within tabs, repeat again
 * Written by JBed of FFWiki
 ****************************************************************************/
if (articleElement) window.addEventListener("hashchange", function() {
    changeTabWithHash();
});

function changeTabWithHash(hashstring) {
    if (!hashstring) hashstring = location.hash.slice(1);
    hashstring = encodeHash(hashstring);
    if (!hashstring.contains(".3A")) return;
    var search = articleElement;
    var hash = hashstring.split(".3B"); //semi-colon
    for (var i = 0; i < hash.length; i++) {
        var tabbers = search.getElementsByClassName("tabberlive");
        var selector = hash[i].split(".3A"); //colon
        if (!selector[1]) return;
        var tab;
        for (var j = 0; j < tabbers.length; j++) {
            if (encodeHash(tabbers[j].title.urlEncode()) == selector[0].replaceAll(".27", "'")) {
                tab = tabbers[j];
                break;
            }
        }
        if (!tab) return;
        var navtabs = tab.getElementsByClassName("tabbernav")[0].getElementsByTagName("a");
        for (var j = 0; j < navtabs.length; j++) {
            if (encodeHash(navtabs[j].title.urlEncode()) == selector[1]) {
                navtabs[j].click();
                break;
            }
        }
        if (i == hash.length - 1) return;
        var actualtabs = tab.getElementsByClassName("tabbertab");
        for (var j = 0; j < actualtabs.length; j++) {
            if (!(actualtabs[j].hasClass("tabbertabhide")) && actualtabs[j].parentNode == tab) {
                search = actualtabs[j];
                break;
            }
            if (j == actualtabs.length - 1) return;
        }
    }
}

importArticle({
    type: 'script',
    article: 'u:dev:NullEditButton/code.js'
});
  
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/custom.js',
        // ...
    ]
});