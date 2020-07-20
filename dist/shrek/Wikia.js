/***** Comment @WikiShrek badges *****/
/* Sysops */
$('#article-comments .edited-by a[href="http://shrek.wikia.com/wiki/User:Dyego_Halliwell"]').after('<a href="http://shrek.wikia.com/wiki/WS:ListAdmin" class="AdminMessage"></a>');
$('#article-comments .edited-by a[href="http://shrek.wikia.com/wiki/User:TheSitcomLover"]').after('<a href="http://shrek.wikia.com/wiki/WS:ListAdmin" class="AdminMessage"></a>');
$('#article-comments .edited-by a[href="http://shrek.wikia.com/wiki/User:Tua_Scoot"]').after('<a href="http://shrek.wikia.com/wiki/WS:ListAdmin" class="AdminMessage"></a>');
$('#article-comments .edited-by a[href="http://shrek.wikia.com/wiki/User:Puss-In-Boots-Rocks"]').after('<a href="shrek.wikia.com/wiki/WS:ListAdmin" class="AdminMessage"></a>');

/* Crats */
$('#article-comments .edited-by a[href="http://shrek.wikia.com/wiki/User:Airhogs777"]').after('<a href="http://shrek.wikia.com/wiki/WS:ListAdmin" class="AdminMessage"></a>');
$('#article-comments .edited-by a[href="http://shrek.wikia.com/wiki/User:%E1%B8%A0w%E1%BA%B5ine_%E1%B8%B8%D9%8D%D9%8Dk%C6%A8_%C4%B9i%C4%B8e_%CF%BE%E1%BB%81%D0%BB%C8%91%E1%BB%81d"]').after('<a href="http://shrek.wikia.com/wiki/WS:ListAdmin" class="AdminMessage"></a>');
$('#article-comments .edited-by a[href="http://shrek.wikia.com/wiki/User:Lil_Diriz_77"]').after('<a href="http://shrek.wikia.com/wiki/WS:ListAdmin" class="AdminMessage"></a>');
$('#article-comments .edited-by a[href="http://shrek.wikia.com/wiki/User:Leandromelon"]').after('<a href="http://shrek.wikia.com/wiki/WS:ListAdmin" class="AdminMessage"></a>');
$('#article-comments .edited-by a[href="http://shrek.wikia.com/wiki/User:Manyman"]').after('<a href="http://shrek.wikia.com/wiki/WS:ListAdmin" class="AdminMessage"></a>');
$('#article-comments .edited-by a[href="http://shrek.wikia.com/wiki/User:Matias_Arana"]').after('<a href="http://shrek.wikia.com/wiki/WS:ListAdmin" class="AdminMessage"></a>');

/***** Message Wall @WikiShrek badges *****/
/* Sysops */
$('.Wall a[href="http://shrek.wikia.com/wiki/User:Dyego_Halliwell"].subtle').after('<a href="http://shrek.wikia.com/wiki/WS:ListAdmin" class="AdminMessage"></a>');
$('.Wall a[href="http://shrek.wikia.com/wiki/User:TheSitcomLover"].subtle').after('<a href="http://shrek.wikia.com/wiki/WS:ListAdmin" class="AdminMessage"></a>');
$('.Wall a[href="http://shrek.wikia.com/wiki/User:Tua_Scoot"].subtle').after('<a href="http://shrek.wikia.com/wiki/WS:ListAdmin" class="AdminMessage"></a>');
$('.Wall a[href="http://shrek.wikia.com/wiki/User:Puss-In-Boots-Rocks"].subtle').after('<a href="http://shrek.wikia.com/wiki/WS:ListAdmin" class="AdminMessage"></a>');

/* Crats */
$('.Wall a[href="http://shrek.wikia.com/wiki/User:Airhogs777"].subtle').after('<a href="http://shrek.wikia.com/wiki/WS:ListAdmin" class="AdminMessage"></a>');
$('.Wall a[href="http://shrek.wikia.com/wiki/User:%E1%B8%A0w%E1%BA%B5ine_%E1%B8%B8%D9%8D%D9%8Dk%C6%A8_%C4%B9i%C4%B8e_%CF%BE%E1%BB%81%D0%BB%C8%91%E1%BB%81d"].subtle').after('<a href="http://shrek.wikia.com/wiki/WS:ListAdmin" class="AdminMessage"></a>');
$('.Wall a[href="http://shrek.wikia.com/wiki/User:Lil_Diriz_77"].subtle').after('<a href="http://shrek.wikia.com/wiki/WS:ListAdmin" class="AdminMessage"></a>');
$('.Wall a[href="http://shrek.wikia.com/wiki/User:Leandromelon"].subtle').after('<a href="http://shrek.wikia.com/wiki/WS:ListAdmin" class="AdminMessage"></a>');
$('.Wall a[href="http://shrek.wikia.com/wiki/User:Manyman"].subtle').after('<a href="http://shrek.wikia.com/wiki/WS:ListAdmin" class="AdminMessage"></a>');
$('.Wall a[href="http://shrek.wikia.com/wiki/User:Matias_Arana"].subtle').after('<a href="http://shrek.wikia.com/wiki/WS:ListAdmin" class="AdminMessage"></a>');

$('.AdminMessage').prepend('<img src="https://images.wikia.nocookie.net/__cb20110701133502/shrek/images/f/f8/At_WikiShrek.png" height="12" style="margin-left: 5px;"/>');

/* Custom edit buttons */
if (mwCustomEditButtons) {

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
        "speedTip": "Redirect",
        "tagOpen": "#REDIRECT [[",
        "tagClose": "]]",
        "sampleText": "Insert text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://img571.imageshack.us/img571/6707/cebnote.png",
        "speedTip": "Song",
        "tagOpen": "{{song|",
        "tagClose": "}}",
        "sampleText": "song name"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/4/4a/Button_table.png",
        "speedTip": "Insert a table",
        "tagOpen": '{| class="wikitable"\n|-\n',
        "tagClose": "\n|}",
        "sampleText": "! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3"
    };
}

/* Ajax Auto-refresh. Code by "pcj" */
var indicator = 'http://img16.imageshack.us/img16/4265/3811.gif';

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
        if ($(Tables[i]).hasClass("collapsible")) {

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
        if ($(navBoxes[i]).hasClass("navbox") && $(navBoxes[i]).hasClass("collapsible") && $(navBoxes[i]).hasClass("autocollapse")) j++;

        var h = 0;
        if ($(navBoxes[i]).hasClass("navbox") && $(navBoxes[i]).hasClass("collapsible")) h = navBoxes[i].clientHeight;
        if (h == null || h == undefined) h = 0;

        // Does not collapse if:
        //   Contains "uncollapsed"

        // Collapses if:
        //   1. Contains "collapsed"
        //   2. If j>autoCollapse, and contains "navbox collapsible autocollapse"
        //   3. If table height > maxHeight, and contains "navbox collapsible"
        //   4. If there are "innercollapse" tables in "outercollapse" tables

        if (!$(navBoxes[i]).hasClass("uncollapsed")) {
            if ($(navBoxes[i]).hasClass("collapsed") || (j > autoCollapse) || (h > maxHeight)) {
                collapseTable(i);
            } else if ($(navBoxes[i]).hasClass("innercollapse")) {
                var element = navBoxes[i];
                while (element = element.parentNode) {
                    if ($(element).hasClass("outercollapse")) {
                        collapseTable(i);
                        break;
                    }
                }
            }
        }
    }
}

addOnloadHook(createCollapseButtons);

// =====================================================================
// End of Collapsible Tables
// =====================================================================

//BEGIN IRC CODE
///HERE IS THE IRC REPLACER. Adds Embedded IRC to RS:IRC made by Green Reaper & ShadowTale
function onloadhookcustom() {
    var replace = document.getElementById("IRCReplace");
    if (null != replace) {
        var getvalue = replace.getAttribute("class");
        var nick = (wgUserName == null) ? ('Guest-' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_');
        replace.innerHTML = '<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=wikia-shrek&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="100%" height="400" style="border:0;"></iframe>';
    }
}

if (window.addEventListener) window.addEventListener("load", onloadhookcustom, false);
else if (window.attachEvent) window.attachEvent("onload", onloadhookcustom);
//END IRC CODE

// This script changes the "Your signature with timestamp" edit button to use a real em dash instead of two hyphens.

(function() {
    var oldAddButton = window.addButton;
    if (typeof(oldAddButton) != 'function') return;
    window.addButton = function() {
        if (arguments.length > 2)
            arguments[2] = arguments[2].replace(/^--(~+)$/, '—$1');
        oldAddButton.apply(this, arguments);
    };
})();

/* add purge to the dropdown menu for pages - 3/8/11 */
$(function PurgeDropdownMenuItem() {
    if ($('ul.wikia-menu-button').length === 0) {
        $('#WikiaPageHeader a.wikia-button').removeClass('wikia-button').wrap('<ul class="wikia-menu-button" />').wrap('<li/>');
        $('ul.wikia-menu-button').append('<img class="chevron" src="https://images.wikia.nocookie.net/__cb34175/common/skins/common/blank.gif"><ul></ul>');
    }
    $('ul.wikia-menu-button ul').append('<li><a href="/index.php?title=' + encodeURIComponent(wgPageName) + '&action=purge">Purge</a></li>');
});