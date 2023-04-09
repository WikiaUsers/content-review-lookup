/* Any JavaScript here will be loaded for all users on every page load. */
/* <pre> */

// ============================================================
// Custom edit buttons
// ============================================================

// ============================================================
// LinkPreview
// ============================================================
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://vignette.wikia.nocookie.net/nfs/images/a/aa/NFSHPR_Wordmark.png/revision/latest?cb=20210607205725&path-prefix=en';
window.pPreview.noimage = 'https://vignette.wikia.nocookie.net/nfs/images/a/aa/NFSHPR_Wordmark.png/revision/latest?cb=20210607205725&path-prefix=en';
window.pPreview.RegExp.iparents = ['.notice', '.icons'];
function customEditButtons() {
    if (mwCustomEditButtons) {
        mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
            "speedTip": "Redirect",
            "tagOpen": "#REDIRECT [[",
            "tagClose": "]]",
            "sampleText": "Insert text"
        };

        mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/central/images/4/4a/Button_table.png",
            "speedTip": "Insert a table",
            "tagOpen": '{| class="wikitable"\n|-\n',
            "tagClose": "\n|}",
            "sampleText": "! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3"
        };

        mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
            "speedTip": "Line break",
            "tagOpen": "<br />",
            "tagClose": "",
            "sampleText": ""
        };

        mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/central/images/1/12/Button_gallery.png",
            "speedTip": "Insert a picture gallery",
            "tagOpen": '\n<div align="center"><gallery>\n',
            "tagClose": "\n</gallery></div>",
            "sampleText": "Image:Example.jpg|Caption1\nImage:Example.jpg|Caption2"
        };
    }
}

if (wgAction == "edit" || wgAction == "submit") {
    addOnloadHook(customEditButtons);
}

// ============================================================
// End of Custom edit buttons
// ============================================================

// ============================================================
// Test if an element has a certain class
//
// Description: Uses regular expressions and caching for better performance.
// Maintainers: User:Mike Dillon, User:R. Koot, User:SG
// ============================================================

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

function getElementsByClassName(oElm, strTagName, oClassNames) {
    var arrElements = (strTagName == "*" && oElm.all) ? oElm.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    var arrRegExpClassNames = new Array();
    if (typeof oClassNames == "object") {
        for (var i = 0; i < oClassNames.length; i++) {
            arrRegExpClassNames[arrRegExpClassNames.length] = new RegExp("(^|\\s)" + oClassNames[i].replace(/\-/g, "\\-") + "(\\s|$)");
        }
    } else {
        arrRegExpClassNames[arrRegExpClassNames.length] = new RegExp("(^|\\s)" + oClassNames.replace(/\-/g, "\\-") + "(\\s|$)");
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
    return (arrReturnElements)
}

// ============================================================
// End of hasClass and getElementsByClassName
// ============================================================

// =====================================================================
// Collapsible Tables
//
// Description: Allows tables to be collapsed, showing only the header.
// Reference:   [[Wikipedia:Wikipedia:NavFrame]]
//              [[Wikipedia:Help:Collapsing]]
// Maintainers: [[Wikipedia:User:R. Koot]]
//
// =====================================================================

var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
var maxHeight = 300;

function collapseTable(tableIndex) {
    var Button = document.getElementById("collapseButton" + tableIndex);
    var Table = document.getElementById("collapsibleTable" + tableIndex);
    if (!Table || !Button) return false;

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
    var navBoxes = new Object();
    var Tables = document.getElementsByTagName("table");

    for (var i = 0; i < Tables.length; i++) {
        if (hasClass(Tables[i], "collapsible")) {

            /* Only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName("tr")[0];
            if (!HeaderRow) continue;

            var Header = HeaderRow.getElementsByTagName("th")[0];
            if (!Header) continue;

            navBoxes[tableIndex] = Tables[i];
            Tables[i].setAttribute("id", "collapsibleTable" + tableIndex);

            var Button = document.createElement("span");
            var ButtonLink = document.createElement("a");
            var ButtonText = document.createTextNode(collapseCaption);

            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontSize = "90%";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.width = "6em";

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

    var j = 0;
    for (var i = 0; i < tableIndex; i++) {
        if (hasClass(navBoxes[i], "navbox") && hasClass(navBoxes[i], "collapsible") && hasClass(navBoxes[i], "autocollapse")) j++;

        var h = 0;
        if (hasClass(navBoxes[i], "navbox") && hasClass(navBoxes[i], "collapsible")) h = navBoxes[i].clientHeight;
        if (h == null || h == undefined) h = 0;

        // Collapses if:
        //   1. Contains "collapsed"
        //   2. If j>autoCollapse, and contains "navbox collapsible autocollapse"
        //   3. If table height > maxHeight, and contains "navbox collapsible"
        //   4. If there are "innercollapse" tables in "outercollapse" tables */
        if (hasClass(navBoxes[i], "collapsed") || (j > autoCollapse) || (h > maxHeight)) {
            collapseTable(i);
        } else if (hasClass(navBoxes[i], "innercollapse")) {
            var element = navBoxes[i];
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

// =====================================================================
// End of Collapsible Tables
// =====================================================================

// ============================================================
// Collapsible sidebar portlets 
// Source: http://www.wikia.com/wiki/User:Splarka/tricks
// ============================================================

function foldingPortlets() {
    var portlets = getElementsByClassName(document.getElementById('column-one'), 'div', 'portlet');
    var portskip = ['p-personal', 'p-cactions', 'p-logo', 'ads-top-left', 'p-search', 'p-tb', 'p-wikicities-nav', 'p-lang'];
    var num = 0;

    for (var i = 0; i < portlets.length; i++) {
        if (portskip.join(' ').indexOf(portlets[i].id) == -1) {
            var pd = portlets[i].getElementsByTagName('div')[0];
            var ph = portlets[i].getElementsByTagName('h5')[0];

            ph.className = 'portletCollapsible';
            pd.setAttribute('id', 'pbody-' + i);
            pd.style.display = 'none';

            var link = document.createElement('a');
            var head = getAllText(ph);

            while (ph.firstChild) {
                ph.removeChild(ph.firstChild);
            }

            link.appendChild(document.createTextNode(head));
            link.setAttribute('href', 'javascript:showPortlet(\'' + i + '\');');
            link.setAttribute('id', 'plink-' + i);
            link.className = 'portletClosed';
            ph.appendChild(link);

            if (num++<3) {
                showPortlet(i);
            }
        }
    }
}

function getAllText(thing) {
    if (thing.nodeType == 3) {
        return thing.nodeValue;
    }

    var text = new Array();
    var i = 0;

    while (thing.childNodes[i]) {
        text[text.length] = getAllText(thing.childNodes[i]);
        i++;
    }

    return text.join('');
}

function showPortlet(id) {
    var pd = document.getElementById('pbody-' + id);
    var pl = document.getElementById('plink-' + id);

    if (pd.style.display == 'none') {
        pd.style.display = 'block';
        pl.className = 'portletOpened';
    } else {
        pd.style.display = 'none';
        pl.className = 'portletClosed';
    }
}

if (skin == 'monobook' && !window.portletsNormal) {
    addOnloadHook(foldingPortlets);
}

// ============================================================
// End of Collapsible sidebar portlets 
// ============================================================

// ============================================================
// Changes 'article' to 'main page' on the monobook skin
// ============================================================

function changeMainPageName() {
    var nstab = document.getElementById('ca-nstab-main');
    if (nstab && wgUserLanguage == 'en') {
        while (nstab.firstChild) nstab = nstab.firstChild
        nstab.nodeValue = 'Main page'
    }
}

if (skin == 'monobook' && (wgPageName == 'RuneScape_Wiki' || wgPageName == 'Talk:RuneScape_Wiki')) {
    addOnloadHook(changeMainPageName);
}

/* </pre> */