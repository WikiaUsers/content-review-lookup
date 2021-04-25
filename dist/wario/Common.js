/* Any JavaScript here will be loaded for all users on every page load. */

/**
 --------------------------------------------
 * BEGIN Script configurations
 --------------------------------------------
**/

window.UserStatusSettings = {
    colorBlindMode:  1,
    lightTheme:      0,
    statusIndicator: 1
};

window.ajaxPages = new Array(
		"Special:WikiActivity", 
		"Special:WikiActivity/watchlist",
		"Special:WikiActivity/feeds",
		"Special:WikiActivity/images",
		"Special:MultipleActivity",
		"Special:SocialActivity",
		"Special:RecentChanges",
		"Special:RecentChangesLinked",
		"Special:Log",
		"Special:Contributions",
		"Special:NewFiles",
		"Special:ListFiles",
		"Special:Videos",
		"Special:NewPages",
		"Blog:Recent_posts"
);
	
window.ajaxRefresh            = 30000;
window.AjaxRCRefreshText      = 'Auto-refresh',
window.AjaxRCRefreshHoverText = 'Automatically refresh the page over time';
window.ajaxIndicator          = 
	'https://vignette.wikia.nocookie.net/deathbattlefanon/images/d/de/Ajax-loader.gif/revision/latest?cb=20200828094018';

/**
 --------------------------------------------
 * END Script configurations
 --------------------------------------------
**/

/**
 --------------------------------------------
 * BEGIN Functions
 --------------------------------------------
**/

// -----------------------------------------
// Test if an element has a certain class.
// Increases general performance.
// Taken from Wikipedia's Common.js
// -----------------------------------------

var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className]: (reCache[className] = 
        	new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
};})();

// -----------------------------------------------------------------------------
// Collapsible tables; allows tables to be collapsed, showing only the header.
// See [[Wikipedia:NavFrame]]. Taken from Wikipedia's Common.js.
// ----------------------------------------------------------------------------- 
 
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
 
    for (var i = 0; i < tableIndex; i++) {
        if (hasClass(NavigationBoxes[i], "collapsed") || (tableIndex >= autoCollapse && hasClass(NavigationBoxes[i], "autocollapse"))) {
            collapseTable(i);
        }
    }
}
 
createCollapseButtons();

// -------------------------------------------------
// Dynamic Navigation Bars
// Description: See [[Wikipedia:NavFrame]].
// Taken from Wikipedia's Common.js.
// -------------------------------------------------

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
             NavChild !== null;
             NavChild = NavChild.nextSibling
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
             var NavChild = NavFrame.firstChild;
             NavChild !== null;
             NavChild = NavChild.nextSibling
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
 for(
         var i = 0; 
         i < divs.length; 
         i++
     ) {
         NavFrame = divs[i];
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
              NavChild !== null;
              NavChild = NavChild.nextSibling
             ) {
             if (hasClass(NavChild, 'NavPic') || hasClass(NavChild, 'NavContent')) {
                 if (NavChild.style.display == 'none') {
                     NavToggleText = document.createTextNode(NavigationBarShow);
                     break;
                 }
             }
         }

         NavToggle.appendChild(NavToggleText);
         // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
         for(
           var j = 0; 
           j < NavFrame.childNodes.length; 
           j++
         ) {
           if (hasClass(NavFrame.childNodes[j], "NavHead")) {
             NavFrame.childNodes[j].appendChild(NavToggle);
           }
         }
         NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
     }
 }
}

createNavigationBarToggleButton();

// -------------------------------------------------------
// Makes {{Username}} display the username of the vistor
// Requires copying of Template:Username
// -------------------------------------------------------
 
$(function UserNameReplace() {
    if (
    	typeof(disableUsernameReplace) !== 'undefined' && 
    	disableUsernameReplace || wgUserName === null
    ) return;
    
    $(".Username").text(wgUserName);
});

// -------------------------------------------------------
// Allows CSS to target pages with a specific template. 
// Made by KockaAdmiralac upon request.
// --------------------------------------------------------
 
$('body').attr('data-topic', $('#mw-content-text .article-topic').attr('data-topic'));

// -------------------------------------------------------
// Sorts content on Special:WhatLinksHere alphabetically
// ------------------------------------------------------

!function($) {
    if (wgCanonicalSpecialPageName !== 'Whatlinkshere') 
    	return;
    	
    var 
    	sorted_list, $list = $('#mw-whatlinkshere-list');
    	sorted_list        = $list.children('li').sort(function (a, b) {
        	return (
        		$(a).find('a:first').attr('title') > $(b).find('a:first').attr('title')
        	) ? 1: -1;
    	});
    	
    $list.children('li').remove(); 
    $list.append(sorted_list);
}(jQuery);

// -----------------------------------------------------------------
// Adds links to Special:WhatLinksHere to edit pages linked on it.
// By OneTwoThreeFall
// -----------------------------------------------------------------

if (mw.config.get('wgCanonicalSpecialPageName') === 'Whatlinkshere') {
    $('#mw-whatlinkshere-list > li').each(function (ignore, element) {
        var link = new mw.Uri($(element).children('a').attr('href'));
        link.extend({action: 'edit'});
        $(element).find('.mw-whatlinkshere-tools > a:last-child')
            .after(' | ', $('<a>').attr('href', link.toString()).text('edit'));
    });
}

// -------------------------------------------
// Allows more in-depth resizing of images
// -------------------------------------------

$(".image-resize").each(function() {
    var a   = $(this).children(".image-resize-new").text().split("_"),
        img = $(this).find("img");
    if (!isNaN(Number(a[1])) && !isNaN(Number(a[1]))) {
        img.attr({
            width:  a[0],
            height: a[1]
        });
    }
});

/**
 --------------------------------------------
 * END Functions
 --------------------------------------------
**/