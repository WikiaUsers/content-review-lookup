/* Any JavaScript here will be loaded for all users on every page load. */
/* AJAX stuff here */
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:WikiActivity/activity",
    "Special:WikiActivity/watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:NewFiles",
    "Special:Statistics",
    "Special:NewPages",
    "Special:ListFiles"
];
window.AjaxRCRefreshText = 'Automatic refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';


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
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none'
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (var i in countdowns) countdowns[i].style.display = 'inline'

    //set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = new Array(); // generic holder for the timeouts, global
    if (timers.length == 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
    }
}
addOnloadHook(checktimers);

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

// Replaces {{USERNAME}} with the name of the user browsing the page
$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
});
// End of the {{USERNAME}} replacement

importArticles({
    type: 'script',
    articles: [
        // Imports are only permissible from the MediaWiki namespace
        //'u:keroro:Project:JS/hide.js',
        //'u:keroro:Project:JS/ShowHideHC.js',
        //'u:keroro:Project:JS/tabber.js',
        //'w:deadisland:User:Jgjake2/js/DISPLAYTITLE.js',

        'u:runescape:MediaWiki:Common.js/countdowntimer.js',
        'u:runescape:MediaWiki:Common.js/preload.js',
    ]
});

// UserBadges settings
window.UserTagsJS = {
    modules: {},
    tags: {
        bureaucrat: {
            link: 'Project:Wiki Staff'
        },
        sysop: {
            link: 'Project:Wiki Staff'
        },
        rollback: {
            link: 'Project:Wiki Staff'
        },
        chatmoderator: {
            link: 'Project:Wiki Staff'
        }
    }
};

UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'sysop',
    'rollback',
    'chatmoderator',
    'bot',
    'autoconfirmed'
];
UserTagsJS.modules.metafilter = {
    'notautoconfirmed': ['newuser']
};
UserTagsJS.modules.newuser = {
    days: 5,
    edits: 0
};

/* Inactive users list */
window.InactiveUsers = {
    days: 30,
    gone: ['Bigmanrob'],
};

/* Automatic filler for the summary field in upload form
 * Obtained from Avatar Wiki @ w:c:avatar:MediaWiki:Imagebox.js
 * Original code by User:Xiao Qiao @ w:c:avatar:User:Xiao Qiao
 * Modifications by User:Spottedstar @ w:c:kungfupanda:User:Spottedstar
 */
if (wgCanonicalSpecialPageName == "Upload") {
    document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Filesummary.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
}

if (wgCanonicalSpecialPageName == "MultipleUpload") {
    document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Filesummary.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
}

/* Share buttons on blogs
 * Originally obtained from Avatar Wiki @ w:c:avatar:MediaWiki:Common.js
 * Original code by The 888th Avatar @ w:c:avatar:User:The 888th Avatar
 * Additions and modifications by Spottedstar @ w:c:kungfupanda:User:Spottedstar
 */
$(function BlogLike() {
    if (wgCanonicalNamespace == 'User_blog') {
        $('#WikiaUserPagesHeader .author-details').prepend('<div style="float:right;"><table><tr><td><a class="addthis_button_facebook_like" fb:like:layout="box_count"></a></td><td><a class="addthis_button_tweet" tw:count="vertical" tw:via="KFPWikiOfficial" tw:related="KungFuPanda" tw:text="Check this out:"></a></td><td><a class="addthis_button_google_plusone" g:plusone:size="tall"></a></td><td><a class="addthis_counter"></a></td></tr></table></div>');
    }
});

importScriptURI('http://apis.google.com/js/plusone.js');

$(window).load(function() {
    $('#SharingToolbar').prepend('<div class="g-plusone" data-size="tall"></div>');
});

/* Add icons to page header bottom border
 * Obtained from Avatar Wiki @ w:c:avatar:MediaWiki:Common.js
 * Code by The 888th Avatar @ w:c:avatar:User:The 888th Avatar
 */
$(function() {
    if (skin == "oasis" || skin == "wikia") {
        $('.WikiaPageHeader').append($('#icons'));
        $('#icons').css({
            'position': 'absolute',
            'right': '0',
            'bottom': '-1.2em'
        });
    }
});