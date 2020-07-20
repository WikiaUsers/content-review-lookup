/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto Refresh */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges", "Special:WikiActivity"];

// Import scripts from Wikia Developers' Wiki
importArticles({
    type: 'script',
    articles: 'u:prototype:MediaWiki:Common.js/top.js'
});

/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */

function disableOldForumEdit() {
    if (typeof (enableOldForumEdit) != 'undefined' && enableOldForumEdit) {
        return;
    }
    if (!document.getElementById('old-forum-warning')) {
        return;
    }
 
    if (skin == 'oasis') {
        $('#WikiaPageHeader .wikia-menu-button a:first').html('Archived').removeAttr('href');
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
 
if (wgNamespaceNumber == 110) {
    disableOldForumEdit();
}

/* 
////////////////////////////////////////////////////////////////////
// THE BELOW CODE ADDS CUSTOM BUTTONS TO THE JAVASCRIPT EDIT TOOLBAR
////////////////////////////////////////////////////////////////////
*/

if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/youngjustice/images/d/dc/Image_Button.png",
        "speedTip": "Insert filebox template",
        "tagOpen": "\{\{Filebox\r| description = ",
        "tagClose": "\r| episode     = \r| film        = \r| show        = \r| source      = \r| origin      = \r| license     = screenshot\r\}\}",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/youngjustice/images/1/1d/Copyrights_needed_Button.png",
        "speedTip": "Uncredited image tag",
        "tagOpen": "\{\{subst:ukn|",
        "tagClose": "}}",
        "sampleText": "both"
    };

}

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});

/* End of the {{USERNAME}} replacement */

// START OF TOOLTIP CODE
// This tooltip code was written by Pcj
// Updated to work with Wikia skin by Uberfuzzy


var article = "",
    tooltipsOn = true,
    $tfb,
    $ttfb,
    $htt,
    activeHoverLink = null,
    tipCache = new Object;

function hideTip() {
    $tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility", "hidden");
    activeHoverLink = null;
}

function displayTip(e) {
    $htt.not(":empty").removeClass("hidden").addClass("tooltip-ready");
    moveTip(e);
    $htt.not(":empty").css("visibility", "visible");
    moveTip(e);
}

function moveTip(e) {
    $ct = $htt.not(":empty");
    var newTop = e.clientY + (e.clientY > $(window).height() / 2 ? -($ct.innerHeight() + 20) : 20);
    var newLeft = e.clientX + (e.clientX > $(window).width() / 2 ? -($ct.innerWidth() + 20) : 20);
    $ct.css({
        position: "fixed",
        top: newTop + "px",
        left: newLeft + "px"
    });
}

function showTip(e) {
    var $t = $(this);
    activeHoverLink = $t;
    $p = $t.parent();
    if ($p.hasClass("selflink") === false) {
        $t.removeAttr("title");
        $p.removeAttr("title");
        var url = "/index.php?title=" + $t.data("tt").replace(/ /g, "_").replace(/\?/g, "%3F") + "&action=render div.tooltip-content";
        if (tipCache[url] !== null) {
            $tfb.html(tipCache[url]);
            displayTip(e);
            return;
        }
        $tfb.load(url, function() {
            if ($t != activeHoverLink) return;
            if ($tfb.html() === "") $tfb.html('<div class="tooltip-content module" style="background:#000000 !important; color:#ffffff"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
            $tfb.find(".tooltip-content").css("display", "");
            tipCache[url] = $tfb.html();
            displayTip(e);
        });
    }
}

function hideTemplateTip() {
    $ttfb.html("").removeClass("tooltip-ready").addClass("hidden");
}

function showTemplateTip(e) {
    $ttfb.html('<div class="tooltip-content">' + $(this).next().html() + "</div>");
    displayTip(e);
}

function bindTT() {
    $t = $(this);
    $p = $t.parent();
    if ($p.hasClass("selflink") === false) {
        $t.data("tt", $p.attr("title").replace(" (page does not exist)", "").replace("?", "%3F")).hover(showTip, hideTip).mousemove(moveTip);
    }
}

function ttMouseOver() {
    if (tooltipsOn) {
        $(article).append('<div id="tfb" class="htt"></div><div id="templatetfb" class="htt"></div>');
        $tfb = $("#tfb");
        $ttfb = $("#templatetfb");
        $htt = $("#tfb,#templatetfb");
        $(article + " span.ajaxttlink").each(bindTT);
        $(article + " span.tttemplatelink").hover(showTemplateTip, hideTemplateTip).mousemove(moveTip);
    }
}

// check to see if it is active then do it
$(function() {
    if (skin == 'oasis') {
        article = "#WikiaArticle";
    } else {
        article = "#bodyContent";
    }

    ttMouseOver();
});
// END OF TOOLTIP CODE
////////////////////////////////////////////////////////////////////////////////

// ============================================================
// BEGIN collapsible tables
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
// ============================================================

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

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */
/* customized for Fallout wiki */

var autoCollapse = 1;
var collapseCaption = "hide";
var expandCaption = "show";

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
    var collapseIndex = 0;
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

            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.marginLeft = "-100%";
            Button.style.width = "6em";
            Button.className = "t_show_hide";

            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
            ButtonLink.setAttribute("href", "javascript:collapseTable(" + tableIndex + ");");
            ButtonLink.appendChild(ButtonText);

            Button.appendChild(document.createTextNode("["));
            Button.appendChild(ButtonLink);
            Button.appendChild(document.createTextNode("]"));

            Header.insertBefore(Button, Header.childNodes[0]);

            if (!hasClass(Tables[i], "nocount")) {
                collapseIndex++;
            }
            tableIndex++;
        }
    }

    for (var i = 0; i < tableIndex; i++) {
        if (hasClass(NavigationBoxes[i], "collapsed") || (collapseIndex >= autoCollapse && hasClass(NavigationBoxes[i], "autocollapse"))) {
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

// ============================================================
// END collapsible tables
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
// ============================================================


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


function getElementsByClass(node, className, tagName) {
    if (node.getElementsByClassName && (tagName === undefined || tagName === null || tagName == '*')) return node.getElementsByClassName(className);
    var list = node.getElementsByTagName(tagName ? tagName : '*');
    var array = new Array();
    var i = 0;
    for (i in list) {
        if (hasClass(list[i], className))
            array.push(list[i]);
    }
    return array;
}

/* Creates the method getElementsByClass, if unsupported from the browser */
if (!document.getElementsByClass) document.getElementsByClass = function(className) {
    return getElementsByClass(document, className, '*');
};


function getElementsByName(name, root) {
    if (root === undefined) root = document;
    var e = root.getElementsByTagName('*');
    var r = new Array();
    for (var i = 0; i < e.length; i++) {
        if (e[i].getAttribute('name') == name) r[r.length] = e[i];
    }
    return r;
}