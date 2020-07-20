/* Any JavaScript here will be loaded for all users on every page load. */

//====================================================================
// Replace download links with custom-designed Download buttons
// By Wither. Please notify me if you plan to use this somewhere!
//====================================================================

! function() {
   var theLink = mw.html.escape($(".DownloadLink").text());
   $(".DownloadLink").replaceWith("<div class = 'DownloadButton'><span>Download</span></div>");
   $(".DownloadButton").attr("href", theLink);
   importStylesheetPage("MediaWiki:DownloadButton.css", "minecraft-modsmc");
   $(".DownloadButton").on("click", function() {
        window.open(theLink, '_blank');
   });
} ();

//=============
// RailWAM
//=============

window.railWAM = {
    logPage: "Project:WAM Log"
};

//=====================
// AJAX Auto-Refresh
//=====================
 
window.ajaxPages = [
    "Blog:Recent_posts",
    "Special:WikiActivity",
    "Special:WikiActivity/watchlist",
    "Special:Watchlist",
    "Special:Log",
    "Special:Images",
    "Special:Contributions",
    "Special:WithoutImages",
    "Special:DoubleRedirects",
    "Special:RecentChanges",
    "Special:RecentChangesLinked",
    "Special:NewPages",
    "Special:UncategorizedPages"
];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/dev/images/b/ba/Snake_throbber_dark-bg.gif/revision/latest?cb=20140519203615';

//======================================================
// Allows CSS to target pages with a specific template. 
// Made by KockaAdmiralac upon request.
//======================================================
 
$('body').attr('data-topic', $('#mw-content-text .article-topic').attr('data-topic'));

//========================================================== 
// Allows the entire box on Help:Contents to be clickable
//==========================================================
 
if (wgPageName == 'Help:Contents') {
    $('.centralhelpbox').click(function() {
        window.location.href = '/wiki/Help:' + $(this).attr('data-link');
    });
}
 
//=========================================================================== 
// Opens chat in a window when clicked through a page link or the homepage
//===========================================================================
 
$(".openchat a").click(function () {
    window.open(
        '/wiki/Special:Chat',
        'wikiachat',
        'width=600,height=600,menubar=no,status=no,location=no,\
        toolbar=no,scrollbars=no,resizable=yes'
    );
    
    return false;
});

//=====================================================
// START CODES TAKEN FROM ONETWOTHREEFALL'S GLOBAL JS
//=====================================================
 
// Adds links to Special:WhatLinksHere to edit pages linked on it.
 
if (mw.config.get('wgCanonicalSpecialPageName') === 'Whatlinkshere') {
    $('#mw-whatlinkshere-list > li').each(function (ignore, element) {
        var link = new mw.Uri($(element).children('a').attr('href'));
        link.extend({action: 'edit'});
        $(element).find('.mw-whatlinkshere-tools > a:last-child')
            .after(' | ', $('<a>').attr('href', link.toString()).text('edit'));
    });
}
 
// Adds separate list of uncreated categories on Special:Categories.
 
if (mw.config.get('wgCanonicalSpecialPageName') === 'Categories') {
    var $newCats = $('<div>').css('float', 'right').text('Uncreated categories:');
    var $newCatsList = $('<ul>').appendTo($newCats);
    $('.mw-spcontent > ul').before($newCats);
    $('.mw-spcontent > ul > li').has('.newcategory').clone().appendTo($newCatsList);
}
 
// Adds a button to clear Deletion reasons
 
if (mw.config.get('wgAction') === 'delete') {
    $('#wpReason').after(' <span id="wpClearReason" class="button">\u232b</span>');
    $('#wpClearReason').click(function () {
        $('#wpReason').val('').focus();
    });
}
 
// Expand collapsed information on Recent Changes and Watchlist
 
if ($.inArray(mw.config.get('wgCanonicalSpecialPageName'), ['Recentchanges', 'Recentchangeslinked', 'Watchlist']) !== -1) {
    $(window).load(function () {
        $('.mw-collapsible-toggle-collapsed').click();
    });
}
 
//=================================================
//END CODES TAKEN FROM ONETWOTHREEFALL'S GLOBAL JS 
//=================================================

//========================================================= 
// Sorts content on Special:WhatLinksHere alphabetically
//=========================================================
 
(function($) {
    if (wgCanonicalSpecialPageName !== 'Whatlinkshere') return;
    var sorted_list,
        $list = $('#mw-whatlinkshere-list');
    sorted_list = $list.children('li').sort(function (a, b) {
        return ($(a).find('a:first').attr('title') > $(b).find('a:first')
        .attr('title')) ? 1 : -1;});
    $list.children('li').remove();
    $list.append(sorted_list);
})(jQuery);

//================================================================================
/* When used in tandem with code in Common.css and the FlipText and FlipContent 
templates, allows content to be hidden in text and revealed with a click */
//================================================================================
 
$(".container").click(function() {
  $div = $(this).find("div");
  $($div).toggleClass("active");
});
 
/*******************************************************************************
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ USER TAGS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
*******************************************************************************/

// Core Configuration
 
window.UserTagsJS = {
    modules: {},
    tags: {
        ontrial: {
            u: 'On Repent Trial',
            link: 'Project:Repent Trials',
            title: 'Ths user used to be banned, but is considered to be forgiven and allowed back into the community. They are therefore on a trial to prove that they are worthy of it and have truly changed for the better.'
        },
        'head_bureaucrat': { 
            u: 'Head Bureaucrat',
            title: 'This user is the head of the Minecraft Mods Wiki.'
        },
        'head_admin': { 
            u: 'Head Admin',
            title: 'This user is the head of the Minecraft Mods Wiki.'
        },
       'wiki_adopter': { 
            u: 'Wiki Adopter',
            title: 'This user gained bureaucrat rights on this wiki through the adoption process after its original founder dropped it.'
       },
       'wiki_coder': {
           u: 'Wiki Coder',
           title: "This user manages the wiki's CSS and JavaScript."
       },
       'founder' : {
           u: 'Founder',
           title: 'This user started the Minecraft Mods Wiki.',
           order: -1/0
       },
       'blocked': {
           u: 'Banned',
           title: "This user misbehaved on this wiki, didn't follow its rules, policies and guidelines or is a sockpuppet of a user who did one of the aforementioned. They have therefore been kicked out and reduced to usage of a read-only mode.",
           order: -1/0
       },
       'bannedfromchat': {
           u: 'Banned from Chat',
           title: "This user misbehaved in this wiki's chatroom and didn't follow its rules. They are now denied access to it, but can still contribute to the wiki. This tag also appears when a user is blocked from the wiki in general without being chatbanned first.",
           order: 1
       },
       'autoconfirmed': {
           title: "This user has been on FANDOM / Wikia for at least four days and have therefore been bestowed the full toolbox and privileges of the registered user group.",
           order: 1/0,
       },
       'emailconfirmed': {
           title: "This user has confirmed their registration per e-mail and are therefore no longer affected by certain restrictions from non-emailconfirmed users.",
           order: 1/0
       },
       'moderator': {
           u: 'Moderator' 
       }
}};

// Add tags to users

UserTagsJS.modules.custom = {
     'Anikaitgarg': ['founder'],
     'Ben101994': ['head_bureaucrat', 'head_admin', 'wiki_adopter'],
     'Withersoul 235': ['wiki_coder']
};

// Tag users with zero edits in Oasis
 
UserTagsJS.modules.nonuser = true;
 
// Tag New Users
 
UserTagsJS.modules.newuser = {
    days: 7, // Must have been on the Wiki for one week (7 days)
    edits: 20, // And have at least 20 edits to remove the tag
};
 
// Determines if users are blocked or not
 
UserTagsJS.modules.isblocked = true;

// Inactive Users Tag Configuration
 
UserTagsJS.modules.inactive = 80;
/* If a user has not contributed at all for 
80 days, they will be marked as Inactive. */
 
// Keep most tags of blocked users
 
UserTagsJS.modules.stopblocked = false;

/* Automatically add global tags to users in question + download
text and data for some other tags. */
 
UserTagsJS.modules.mwGroups = [
    // Append bot rank + global ranks to accounts in question
    'authenticated',
    'bot',
    'bot-global',
    'checkuser-global',
    'council',
    'helper',
    'util',
    'voldev',
    'vanguard',
    'vstf'
];

// Add tags to all users within a group without touching their other tags
 
UserTagsJS.modules.explode = {
    'sysop': ['bureaucrat']
};

UserTagsJS.modules.metafilter = {
    // Remove tags like "Inactive" and "New Editor" from blocked users
    'inactive': ['blocked'],
    'neweditor': ['blocked'],
    // Make autoconfirmed tag not appear unless otherwise stated
    'autoconfirmed': ['autoconfirmed']
};

UserTagsJS.modules.implode = {
    // Combine all three moderator tags in one if a user has all three of them
	'moderator': ['content-moderator', 'chatmoderator', 'threadmoderator']
};

// Remove / override certain existing tags
 
UserTagsJS.modules.userfilter = {
	'Ben101994': ['bureaucrat', 'sysop'],
};

/*******************************************************************************
\\\\\\\\\\\\\\\\\\\\\\\\\\ END OF USER TAGS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
*******************************************************************************/

//=============================================
// Test if an element has a certain class.
// Increases general performance.
//=============================================
 
var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className]: (reCache[className] = 
        new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

//================================================================================ 
// Collapsible tables; allows tables to be collapsed, showing only the header.
// See [[Wikipedia:NavFrame]]. Taken from Wikipedia's Common.js.
//================================================================================
 
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
 
addOnloadHook(createCollapseButtons);

//=============================================== 
// Dynamic Navigation Bars
// Description: See [[Wikipedia:NavFrame]].
// Taken from Wikipedia's Common.js.
//===============================================
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
 
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled
  function toggleNavigationBar(indexNavigationBar)
  {
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
  function createNavigationBarToggleButton()
  {
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
             NavToggle.setAttribute(
                 'href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');'
            );
 
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
 
  addOnloadHook(createNavigationBarToggleButton);