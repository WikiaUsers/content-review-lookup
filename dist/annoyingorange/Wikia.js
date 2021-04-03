/* add contribs to user menu - 2/1/11 */

$(function UserContribsMenuItem() {
    $('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Contributions/' + encodeURIComponent(wgUserName) + '">Contributions</a></li>');
});

function CompressContent(headerWidth, contentWidth, catlinksWidth) {
    $('header#WikiaPageHeader.WikiaPageHeader details').css({
        "width": headerWidth
    });
    $('article#WikiaMainContent.WikiaMainContent').css({
        "width": contentWidth
    });
    $('div#catlinks.catlinks').css({
        "width": catlinksWidth
    });
    $('div#WikiaRail.WikiaRail').css({
        "display": 'block'
    });
    $('ul#resizeButton').replaceWith('<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="ExpandContent(' + headerWidth + ', ' + contentWidth + ', ' + catlinksWidth + ');" data-id="resizeButton" style="color:#fff;" title="Expands the content area. Note that this will hide the side rail."> Expand <--> </a></ul>');
}

/** Test if an element has a certain class **************************************
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

/** Collapsible tables (From [[wikipedia:MediaWiki:Common.js]] *******************************
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
            addHandler(ButtonLink, "click", new Function("evt", "collapseTable(" + tableIndex + " ); return killEvt( evt );"));
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

/* This code is outdated. Please update to https://dev.wikia.com/wiki/ProfileTags */
function addMastheadTags() {
    var rights = {};

    // BEGIN List of Accounts Given Extra User Rights Icons - Must list all tags

    rights["Brainulator9"] = ["Bureaucrat"];
    rights["Bryce53"] = ["Globally disabled"];
    rights["Bryce53-alt"] = ["Globally disabled"];
    rights["MHLU2"] = ["Globally disabled"];
    rights["Knife!"] = ["Rollback"];
    rights["BobNewbie"] = ["Administrator", "Inactive"];
    rights["OrangeSnowman258"] = ["Bureaucrat", "Inactive"];
    rights["X2"] = ["Globally disabled"];
    rights["The Toa"] = ["Administrator", "Inactive"];
    rights["Darkapple"] = ["Bureaucrat"];
    rights["JKaffekimbo"] = ["Bureaucrat"];
    rights["JM. Krait"] = ["Bureaucrat", "Inactive"];
    rights["Gemstones"] = ["Chat Moderator", "Inactive"];
    rights["SpideyBot"] = ["Bot", "Rollback", "Inactive"];
    rights["Seacactus"] = ["Bureaucrat"];
    rights["Heart215"] = ["Chat Moderator", "Inactive"];
    rights["DayleLucy101"] = ["Chat Moderator"];
    rights["Henry Medals"] = ["Bureaucrat"];
    rights["Ian Bush"] = ["Bureaucrat", "Inactive"];
    rights["Jakovu"] = ["Bureaucrat"];
    rights["BNB"] = ["Bot", "Inactive"];
    rights["JuddA3"] = ["Rollback", "Inactive"];
    // END List of Accounts Given Extra User Rights Icons

    // BEGIN Script to Remove Old Rights Icons & Insert New

    if (wgCanonicalSpecialPageName == "Contributions") {
        var user = wgPageName.substring(wgPageName.lastIndexOf("/") + 1).replace(/_/g, " ");
    } else {
        var user = wgTitle;
    }

    if (typeof rights[user] != "undefined") {

        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();

        for (var i = 0, len = rights[user].length; i < len; i++) {

            // add new rights
            $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
                '</span>').appendTo('.masthead-info hgroup');
        }
    }

    // END Script to Remove Old Rights Icons & Insert New
}

$(function() {
    if ($('#UserProfileMasthead')) {
        addMastheadTags();
    }
});
window.rwaOptions