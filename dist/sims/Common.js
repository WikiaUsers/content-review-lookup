// 04:03, 23 January 2024 (UTC)
// <source lang="JavaScript">
/* Any JavaScript here will be loaded for all users on every page load. */

/* IRC login */
importScript('MediaWiki:Common.js/irclogin.js');

/* Test if an element has a certain class **************************************
  *
  * Description: Uses regular expressions and caching for better performance.
  * Taken from Wikipedia's Common.js.
  */

/* ######################################################################## */
/* ### TITLE ICONS (Template:Games)                                     ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Add icons to article title                          ### */
/* ### Credit:      User:Porter21                                       ### */
/* ######################################################################## */

function addTitleIcons() {
    var iconBar = $('#va-titleicons');
    var previewBar = $('#va-titleicons-preview');

    if (skin != 'monobook' && skin != 'oasis' && skin != 'wikia') {
        return;
    }

    if (iconBar.length > 0 && $('a', previewBar).length > 0) {
        if (skin == 'oasis' || skin == 'wikia') {
            var articleDiv = $('#WikiaArticle');

            if (articleDiv.length > 0) {
                iconBar.css('display', 'block').prependTo(articleDiv);
            }
        } else if (skin == 'monobook') {
            var firstHeading = $('#firstHeading').css('position', 'relative');

            if (firstHeading.length > 0) {
                iconBar.css('display', 'block').appendTo(firstHeading.css('padding-right', previewBar.width() + 25));
            }
        }

        $('#va-titleicons-more').append('<img width="0" height="0" class="va-titleicons-chevron" src="https://images.wikia.nocookie.net/common/skins/common/blank.gif">');

        iconBar.hover(
        function() {
            $(this).addClass('va-titleicons-hover');
        }, function() {
            $(this).removeClass('va-titleicons-hover');
        });
    }
}

// Standard Edit Summaries
importScript('MediaWiki:Common.js/standardeditsummaries.js');
// END of Standard Edit Summaries
/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Taken from Wikipedia's Common.js.
 */

var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

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

            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.width = "3.5em";

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
        }
    }
}

$(createCollapseButtons);

importScriptPage('EditIntroButton/code.js', 'dev');

importScriptPage('PurgeButton/code.js', 'dev');

/** Dynamic Navigation Bars (experimental) *************************************
 *
 *  Description: See [[Wikipedia:NavFrame]].
 *  Taken from Wikipedia's Common.js.
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
        for (
        var NavChild = NavFrame.firstChild;
        NavChild != null;
        NavChild = NavChild.nextSibling) {
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
        var NavChild = NavFrame.firstChild;
        NavChild != null;
        NavChild = NavChild.nextSibling) {
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
    var i = 0;
    NavFrame = divs[i];
    i++) {
        // if found a navigation bar
        if (hasClass(NavFrame, "NavFrame")) {

            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');

            var NavToggleText = document.createTextNode(NavigationBarHide);
            for (
            var NavChild = NavFrame.firstChild;
            NavChild != null;
            NavChild = NavChild.nextSibling) {
                if (hasClass(NavChild, 'NavPic') || hasClass(NavChild, 'NavContent')) {
                    if (NavChild.style.display == 'none') {
                        NavToggleText = document.createTextNode(NavigationBarShow);
                        break;
                    }
                }
            }

            NavToggle.appendChild(NavToggleText);
            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
            for (
            var j = 0;
            j < NavFrame.childNodes.length;
            j++) {
                if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                    NavFrame.childNodes[j].appendChild(NavToggle);
                }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
}

$(createNavigationBarToggleButton);

// **************************************************
// Hide namespaces in categories (Splarka)
// **************************************************
// A quick script to hide namespace prefixes in category lists. Just add
// <div id="catnoprefix" style="display:none;"></div>
// to the category description page to  activate it.

$(function catprefix() {
    if ($('#catnoprefix').length > 0) {
       var anchors = document.getElementById('mw-pages').getElementsByTagName('a');
        for (var i = 0; i < anchors.length; i++) {
            if (anchors[i].firstChild.nodeValue.indexOf(':') != -1) {
                anchors[i].firstChild.nodeValue = anchors[i].firstChild.nodeValue.substring(anchors[i].firstChild.nodeValue.indexOf(':') + 1);
            }
        }
    }
});

// **************************************************
//  - end -  Hide namespaces in categories
// **************************************************
/* Username replace feature
 * Inserts viewing user's name into <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */

if (wgUserName != 'null') {
    $('.insertusername').html(wgUserName);
}

/* Tooltip script begin */

var $tfb;

// hides the tooltip


function hideTip() {
    $tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility", "hidden");
}

// displays the tooltip


function displayTip(e) {
    $tfb.not(":empty").removeClass("hidden").addClass("tooltip-ready");
    moveTip(e);
    $tfb.not(":empty").css("visibility", "visible");
}

// moves the tooltip


function moveTip(e) {
    var newTop = e.clientY + ((e.clientY > ($(window).height() / 2)) ? -($tfb.not(".hidden").innerHeight() + 20) : 20);
    var newLeft = e.clientX + ((e.clientX > ($(window).width() / 2)) ? -($tfb.not(".hidden").innerWidth() + 20) : 20);
    $tfb.not(".hidden").css({
        "position": "fixed",
        "top": newTop + "px",
        "left": newLeft + "px"
    });
}

// AJAX tooltips


function showTip(e) {
    $t = $(this);
    $p = $t.parent();
    if ($p.hasClass("selflink") == false) {
        $t.removeAttr("title");
        $p.removeAttr("title");
        $tfb.load("/" + $t.data("tt").replace(/ /g, "_").replace(/\?/g, "%3F") + "?action=render div.tooltip-content", function() {
            if ($tfb.html() == "") $tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
            $tfb.find(".tooltip-content").css("display", "");
            displayTip(e);
        });
    }
}

function bindTT() {
    $t = $(this);
    $p = $t.parent();
    if ($p.hasClass("selflink") == false) $t.data("tt", $p.attr("title").replace(" (page does not exist)", "").replace("?", "%3F")).mouseover(showTip).mouseout(hideTip).mousemove(moveTip);
}

// check to see if it is active then do it
$(function() {
    $("#bodyContent").mouseover(hideTip);
    $("#bodyContent").append('<div id="tfb" class="htt"></div>');
    $tfb = $("#tfb");
    $("#bodyContent span.ajaxttlink").each(bindTT);
});

/* Tooltip script end */

/* PCJ's dup finder start */
dil = new Array();

function findDupImages(gf) {
    output = "";
    url = "/api.php?action=query&generator=allimages&prop=duplicatefiles&gailimit=500&format=json";
    if (gf) url += "&gaifrom=" + gf;
    $.getJSON(url, function(data) {
        if (data.query) {
            pages = data.query.pages;
            for (pageID in pages) {
                dils = "," + dil.join();
                if (dils.indexOf("," + pages[pageID].title) == -1 && pages[pageID].title.indexOf("File::") == -1 && pages[pageID].duplicatefiles) {
                    output += "<h3><a href='/" + pages[pageID].title + "'>" + pages[pageID].title + "</a></h3>\n<ul>\n";
                    for (x = 0; x < pages[pageID].duplicatefiles.length; x++) {
                        output += "<li><a href='/File:" + pages[pageID].duplicatefiles[x].name + "'>File:" + pages[pageID].duplicatefiles[x].name + "</a></li>\n";
                        dil.push("File:" + pages[pageID].duplicatefiles[x].name.replace(/_/g, " "));
                    }
                    output += "</ul>\n\n"
                }
            }
            $("#mw-dupimages").append(output);
            if (data["query-continue"]) setTimeout("findDupImages('" + data["query-continue"].allimages.gaifrom + "');", 5000);
        }
    });
}
$(function() {
    if ($("#mw-dupimages").length) findDupImages();
}); /* PCJ's dup finder end */

/* Move SiteNotice
 * By w:c:avatar:Joeyaa
 * Requires #mw-dismissable-notice span {display:none;} in css
 */

$('#sitenotice-dismiss').html('[<a href="javascript:dismissNotice();">dismiss</a>]');

// ============================================================
// BEGIN Template:Era
// ============================================================
// Description: Add game icons to top right corner of articles
// Credit:      User:Mirar (based on Template:Eras by User:Sikon), copied from fallout.wikia

function addTitleGames() {
    var titleDiv = document.getElementById("title-games");
    if (titleDiv != null && titleDiv != undefined) {
        var content = document.getElementById('article');
        if (!content) {
            var content = document.getElementById('content');
        }

        if (content) {
            var hs = content.getElementsByTagName('h1');
            var firstHeading;
            for (var i = 0; i < hs.length; i++) {
                if ((' ' + hs[i].className + ' ').indexOf(' firstHeading ') != -1) {
                    firstHeading = hs[i];
                    break;
                }
            }

            var cloneNode = titleDiv.cloneNode(true);
            firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
            cloneNode.style.display = "block";
            cloneNode.style.visibility = "visible";
            if (skin != "monaco") {
                cloneNode.style.marginTop = "-11px";
            }
        }
    }
}

$(addTitleGames);

//Facebook 'Like Box'
//Graciously (and unknowingly) provided by The Spanish 'Simspedia'

function fBox() {
    $('#fbox').append('<iframe marginheight="0" marginwidth="0" src="https://www.facebook.com/connect/connect.php?id=126686564044617&amp;connections=10" align="top" frameborder="0" width="300" height="250" scrolling="no" />');
}

$(fBox);


// *************************************************
// Pagetitle rewrite
//
// Rewrites the page's title, used by Template:Title
// *************************************************
$(function() {
    var inter = setInterval(function() {
        if (!$('h1[itemprop=\"name\"]').length) return;

        clearInterval(inter);
        var newTitle = $("span.newPageTitle").find(':not(big, small, center, h1, h2, h3, h4, h5, h6, b, i, u, s, span, div)').remove().end().html();
        var edits = $("#user_masthead_since").text();
        $(".firstHeading,h1[itemprop=\"name\"],.resizable-container .page-header__title").html(mw.html.escape(newTitle));
        $("#user_masthead_head h2").html(mw.html.escape(newTitle + "<small id='user_masthead_since'>" + edits + "</small>"));
    });
});

$(function changeTitle(){
    if (!$('span.newPageTitle').length) {
        return;
    }
    var title = $('span.newPageTitle').find(':not(big, small, center, h1, h2, h3, h4, h5, h6, b, i, u, s, span, div)').remove().end().html();
    $('h1.page-header__title').html(mw.html.escape(title));
});

/* Ajax Auto-Refresh (courtesy pcj) */
/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution
 */

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges"];
importScriptPage('AjaxRC/code.js', 'dev');

// *************************************************
// change profile labels on individual pages
//
// Code is currently broken for /subpages - disabling for now
// *************************************************
/* if (wgCanonicalNamespace === "User_talk" || wgCanonicalNamespace === "User") {
    if (document.getElementById('UserProfileMasthead').getElementsByClassName('group').length === 1) {
        if (document.getElementById('adm-changetitle') !== null) {
            document.getElementById('UserProfileApp').getElementsByClassName('group')[0].innerHTML = document.getElementById('adm-changetitle').innerHTML;
        }
    }
} */

// </source>