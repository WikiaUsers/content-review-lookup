/* Any JavaScript here will be loaded for all users on every page load. */

/**** 
 # Affects information on the page The Enchanted Cave, to make maps 
more colorful.
 # https://flashgaming.wikia.com/wiki/The_Enchanted_Cave?oldid=3925
 # Full explanation: The map at the bottom of the page linked above is
 made out of characters which this code replaces with coloured squares 
**/

var allLvls = document.evaluate(
    '//pre[@class="cavelvl"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var x = 0; x < allLvls.snapshotLength; x++) {
    var thisLvl = allLvls.snapshotItem(x);
    sRows = thisLvl.innerHTML;
    sRows = sRows.replace(/#/g, "<span style=\"color: #333; background-color: #333\">#</style>");
    sRows = sRows.replace(/\./g, "<span style=\"color: #CCC; background-color: #CCC\">.</style>");
    sRows = sRows.replace(/i/g, "<span style=\"color: #C96; background-color: #C96\">i</style>");
    sRows = sRows.replace(/m/g, "<span style=\"color: #F66; background-color: #F66\">m</style>");
    sRows = sRows.replace(/@/g, "<span style=\"color: #69C; background-color: #69C\">@</style>");
    sRows = sRows.replace(/\}/g, "<span style=\"color: #6C6; background-color: #6C6\">&gt;</style>");
    thisLvl.innerHTML = sRows;
    thisLvl.setAttribute("style", "line-height: 10px; letter-spacing: 1px;");
}

/**
 * Import new buttons in specific circumstances
*/

if ($("#ca-edit").length || $("a[data-id='editprofile']").length) {
  importArticles({
	type: 'script',
	articles: [
	    'u:dev:MediaWiki:Ajax Rename/code.js',
	    'u:dev:MediaWiki:EditIntroButton/code.js',
]});}

/* Create Dev Wiki namespace */

window.dev = window.dev || {};

/****
   --------------------------------------------------------------
   # Start codes taken from OneTwoThreeFall's Global JS
   --------------------------------------------------------------
**/

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

/****
   ------------------------------------------------------------
   # End codes taken from OneTwoThreeFall's Global JS
   ------------------------------------------------------------
**/

// Allows CSS to target pages with a specific template. 
// Made by KockaAdmiralac upon request.

$('#WikiaMainContent',
  '#WikiaRail',
  ".background-fixed", //to set backgrounds for the included pages
  "#WikiaBarWrapper").attr('data-topic', 
  $('#mw-content-text .article-topic').attr('data-topic'));

//===========================================
// Test if an element has a certain class.
// Increases general performance.
//===========================================
 
var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = 
        new RegExp("(?:\\s|^)" + className + "(?:\\s|$)")))
        .test(element.className);
};})();

// Collapsible tables; allows tables to be collapsed, showing only the header.
// See [[Wikipedia:NavFrame]]. Taken from Wikipedia's Common.js.

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

// Dynamic Navigation Bars
// Description: See [[Wikipedia:NavFrame]].
// Taken from Wikipedia's Common.js.
 
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
             if ( hasClass( NavChild, 'NavPic' ) ) {
                 NavChild.style.display = 'none';
             }
             if ( hasClass( NavChild, 'NavContent') ) {
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
             var i=0; 
             i< divs.length; 
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
                 if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                     if (NavChild.style.display == 'none') {
                         NavToggleText = document.createTextNode(NavigationBarShow);
                         break;
                     }
                 }
             }
 
             NavToggle.appendChild(NavToggleText);
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
             for(
               var j=0; 
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
 
  addOnloadHook( createNavigationBarToggleButton );

//=========================================================
// Makes {{Username}} display the username of the vistor
// Requires copying of Template:Username
//=========================================================
 
$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && 
    disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
});

// **************************************************
// Experimental JavaScript countdown timer (Splarka)
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
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = 'T plus ';
  } else {
    var tpm = 'T minus ';
  }
 
  // calculate the diff
  var left = (diff%60) + ' seconds';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left;
  timers[i].firstChild.nodeValue = tpm + left;
 
  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}
 
function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none';
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline';
 
  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length === 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);

//========================================================  
// Allows the entire box on Help:Contents to be clickable
//========================================================

if (wgPageName == 'Help:Contents') {
    $('.centralhelpbox').click(function() {
        window.location.href = '/wiki/Help:' + $(this).attr('data-link');
    });
}

//==========================================================================
// Opens chat in a window when clicked through a page link or the homepage
//==========================================================================

$(".openchat a").click(function () {
    window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
    return false;
});

/* Redirects "User:<username>/skin.js" or "User:<username>/skin.css" 
to the skin page they are currently using, unless the 
"skin.js" or "skin.css" subpage really exists. 
 
For example, heading to "User:<username>/skin.js" 
while using the Oasis skin will redirect them to 
"User:<username>/wikia.js", and going to 
"User:<username>/skin.css" on the Monobook skin 
will take them to "User:<username>/monobook.css". */

if (mw.config.get('wgArticleId') === 0 && mw.config.get('wgNamespaceNumber') === 2) {
    var titleParts = mw.config.get('wgPageName').split('/');
    /* Make sure there was a part before and after the slash
       and that the latter is 'skin.js' or 'skin.css' */
    if (titleParts.length == 2) {
        var userSkinPage = titleParts.shift() + '/' + mw.config.get('skin');
        if (titleParts.slice(-1) == 'skin.js') {
            window.location.href = mw.util.getUrl(userSkinPage + '.js');
        } else if (titleParts.slice(-1) == 'skin.css') {
            window.location.href = mw.util.getUrl(userSkinPage + '.css');
        }
    }
}

/* =============================================================================
******************************* User Tags **********************************
============================================================================ */

// Core Configuration

window.UserTagsJS = {
    modules: {},
    tags: {
        ontrial: {
            u: 'On Repent Trial',
            link: 'Flash Gaming Wiki:Repent Trials',
            title: 'Ths user used to be banned, but is considered to be forgiven and allowed back into the community. They are therefore on a trial to prove that they are worthy of it and have truly changed for the better.'
        },
        'head_bureaucrat': { 
            u: 'Head Bureaucrat',
            title: 'This user is the head of the Flash Gaming Wiki.'
        },
        'head_admin': { 
            u: 'Head Admin',
            title: 'This user is the head of the Flash Gaming Wiki.'
        },
       'wiki_adopter': { 
            u: 'Wiki Adopter',
            title: 'This user gained bureaucrat rights on this wiki after its original founder dropped it. He came into contact with him and requested to moderate the wiki in his place. No adoption process was required.'
       },
       'wiki_coder': {
           u: 'Wiki Coder',
           title: "This user manages the wiki's CSS and JavaScript."
       },
       'founder' : {
           u: 'Founder',
           title: 'This user started the Flash Gaming Wiki, all the way back in 2010.',
           order: -1/0
       },
       'blocked': {
           u: 'Access Revoked',
           title: "This user misbehaved on this wiki, didn't follow its rules, policies and guidelines or is a sockpuppet of a user who did one of the aforementioned. They have therefore been kicked out and reduced to usage of a read-only mode.",
           order: -1/0
       },
       'bannedfromchat': {
           u: 'Expelled from Chat',
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
       'inkagames': {
           u: 'Head of the Inkagames Wiki',
           link: 'https://inkagames-english.wikia.com/wiki/User%3AValentin_girl',
           title: 'This user is the head of the Inkagames Wiki, an associate of our wiki that covers all flashgames made by Inkagames, such as the various Saw Games and the Obama series.',
           order: 2
       },
       'gemcraft': {
           u: 'Head of the Gemcraft Wiki',
           link: 'https://gemcraft.wikia.com/wiki/User%3ALevenThumps',
           title: 'This user is the head of the Gemcraft Wiki, an associate of our wiki that covers all flashgames made by Gameinabottle, specifically the Gemcraft series.',
           order: 2
       }
}
};

// Add tags to users

UserTagsJS.modules.custom = {
	'Withersoul 235': ['wiki_adopter', 'wiki_coder'],
	'Mr Morshu': ['head_bureaucrat', 'head_admin'],
	'LevenThumps': ['gemcraft'],
	'Valentin girl': ['inkagames']
};

// Remove / override certain existing tags

UserTagsJS.modules.userfilter = {
	'Withersoul 235': ['bureaucrat', 'sysop'],
	'XtinaS': ['bureaucrat'] // Remove bureaucrat tag from XtinaS
};

UserTagsJS.modules.metafilter = {
    // Remove tags like "Inactive" and "New Editor" from blocked users
    'inactive': ['blocked'],
    'neweditor': ['blocked'],
    // Make autoconfirmed tag not appear unless otherwise stated
    'autoconfirmed': ['autoconfirmed']
};

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
    'vstf',
    // Import some wikispecific tags
    'bannedfromchat',
    'autoconfirmed',
    'emailconfirmed'
];

// Tag users with zero edits in Oasis

UserTagsJS.modules.nonuser = true;

// Tag users with brand-new accounts

UserTagsJS.modules.autoconfirmed = true;

// Tag New Users

UserTagsJS.modules.newuser = {
    days: 7, // Must have been on the Wiki for one week (7 days)
    edits: 20, // And have at least 20 edits to remove the tag
};

// Determines if users are blocked or not

UserTagsJS.modules.isblocked = true;

// Add tags to all users within a group without touching their other tags

UserTagsJS.modules.explode = {
    // Add Banned from Chat tag to all blocked users
    'bannedfromchat': ['blocked']
};

// Inactive Users Tag Configuration

UserTagsJS.modules.inactive = 80;
/* If a user has not contributed at all for 
80 days, they will be marked as Inactive. */

// Keep most tags of blocked users

UserTagsJS.modules.stopblocked = false;

/* =============================================================================
******************************* End of User Tags *******************************
============================================================================ */

/***************************************************************************
||||||||||||||||||||||||| Other Configurations |||||||||||||||||||||||||||||
****************************************************************************/

//============================
// AJAX Auto-Refresh
//============================

window.ajaxPages = [
    "Special:WikiActivity",
    "Special:RecentChanges",
    "Special:RecentChangesLinked",
    "Special:Log",
    "Special:Images",
    "Special:ListFiles",
    "Special:Contributions",
    "Special:NewPages",
    "Special:UncategorizedPages",
    "Special:DoubleRedirects",
    "Special:WhatLinksHere",
    "Special:Categories",
    "Special:Videos",
    "Special:Watchlist",
    "Special:LonelyPages",
    "Special:BrokenRedirects",
    "Special:DeadendPages",
    "Special:Disambiguation",
    "Special:Withoutimages",
    "Blog:Recent posts"];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page over time';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/dev/images/b/ba/Snake_throbber_dark-bg.gif/revision/latest?cb=20140519203615';
 
if($(//If user is on any talk/Forum namespace or Message Wall
   wgNamespaceNumber == 110 || 
   wgNamespaceNumber == 111 ||
   wgNamespaceNumber == 3 ||
   wgNamespaceNumber == 1 ||
   wgNamespaceNumber == 5 ||
   wgNamespaceNumber == 7 ||
   wgNamespaceNumber == 9 ||
   wgNamespaceNumber == 11 ||
   wgNamespaceNumber == 13 ||
   wgNamespaceNumber == 15 ||
   wgNamespaceNumber == 503 ||
   wgNamespaceNumber == 829 ||
   wgNamespaceNumber == 1200 ||
   wgNamespaceNumber == 1201 ||
   wgNamespaceNumber == 2000 ||
   wgNamespaceNumber == 2001))
{window.ajaxPages.push(wgPageName);}

//------------------------------------------------------------
// Check other flash game wikis for similar offenses / users

window.TBL_GROUP = "flashgames-en";

//**************************************
// Spoiler Alert / Mature Content Code
//**************************************

window.SpoilerAlertJS = {
    question: "Hola bruddah! There's several herds of hostile spoilers 'round these parts. Are you sure you want to face them? It's up to you. Choose carefully; there's no going back after this.",
    yes: 'Let me pass, old man!',
    no: 'Preferably not; thanks for the advice.',
    fadeDelay: 625
};

!function() {
    var cats = mw.config.get('wgCategories'),
        mature = $.inArray('Mature content', cats) !== -1;
    window.SpoilerAlert = {};
    window.SpoilerAlert.isSpoiler = function() {
        return mature;
    };
    back: true;
    if (mature) {
        window.SpoilerAlert.question = 'Warning! This page is marked as mature. It thereby contains one or more of the following: Excessive gore, excessive physical/psychologcal abuse, very scary content, very excessive use of foul language, animal abuse, over-the-top dark humor or otherwise innapropriate content unsuited for younger or sensitive individuals. Are you sure you want to read it?';
        window.SpoilerAlert.yes = 'Yes, I am willing to take the risk';
        window.spoilerAlert.no = 'No, preferably not.';
        window.spoilerAlert.fadeDelay = 1260;
}}());

//*********************************
// Check IP of unregistered users
//*********************************

window.RevealAnonIP = {
    permissions: [
        'rollback', 
        'checkuser', 
        'chatmoderator', 
        'threadmoderator', 
        'content-moderator', 
        'sysop', 
        'bureaucrat' 
    ]
};

/***************************************************************************
||||||||||||||||||||||||||||||| End Configurations |||||||||||||||||||||||||
****************************************************************************/

//=========================================================================
// Allows one to update file-links across all pages when renaming an image
//=========================================================================

window.LIRoptions = {
    bottomMessage: '',
    editSummary: 'Updating file links after renaming of image (automatic)',
    singleButtonText: 'Rename and update',
    queueButtonText: 'Add to queue',
    delay: 1000
};

if (wgPageName.indexOf('Special:MovePage/File:') !== -1 || 
   (wgCanonicalNamespace === 'File' && Storage)) {
    importScriptPage('FileUsageAuto-update/code.js', 'dev');
}

//==================
// Ajax Redirect
//==================

if (mw.config.get("wgUserGroups").indexOf('sysop') > -1 ||
    mw.config.get("wgUserGroups").indexOf('content-moderator') > -1)
   {importScriptPage('MediaWiki:AjaxRedirect/code.js', 'dev');}

//-----------------------------------------------------------------------------
/* When used in tandem with code in Common.css and the FlipText and FlipContent 
templates, allows content to be hidden in text and revealed with a click */
//-----------------------------------------------------------------------------

$(".container").click(function() {
  $div = $(this).find("div");
  $($div).toggleClass("active");
});

//==============================================================
// Sorts content on Special:WhatLinksHere alphabetically
// By Fngplg
//==============================================================

(function($) {
    if (wgCanonicalSpecialPageName !== 'Whatlinkshere') return;
    var sorted_list, $list = $('#mw-whatlinkshere-list');
    sorted_list = $list.children('li').sort(function (a, b) {
        return ($(a).find('a:first').attr('title') > $(b)
        .find('a:first').attr('title')) ? 1 : -1;
    }); $list.children('li').remove(); $list.append(sorted_list);
})(jQuery);

//=======================================================================
// Prompt users if they didn't sign their posts on the Community Forum
//=======================================================================
//<nowiki>
 
window.i = window.i || 0; //Necessary for SignatureCheck to work
 
window.SignatureCheckJS = {
	preamble: 'Hold up a sec...',
	noSignature: 'Please sign your post with three or four consecutive tildes' + 
	'~~~ or ~~~~ or, if applicable, your custom signature template. It is' + 
	' important and required that you do so. It makes it easier to find out' + 
	' who sent the message.',
	noForumHeader: 'There is no forum header on this page. You may not create' + 
	' pages without the header or remove it from existing posts since they will'+
	' not actually show up in the forum list.',
	epilogue: 'Please correct your message. Proceeding regardless will incur a'+
	' warning or other action by the admins or moderators.',
	forumheader: 'Forumheader',
	checkSignature: true, // Enable the signature check function
        extraNamespaces: [{    // Enable signature checking on other namespaces and subpages can be omitted
                        namespace: 9,
                        patterns: ['/Archive'],
                    },{
                        namespace: 11,
                        patterns: ['/Archive'],
                    },{
                        namespace: 13,
                        patterns: ['/Archive'],
                    },{
                        namespace: 15,
                        patterns: ['/Archive']
                    },{
                        namespace: 7,
                        patterns: ['/Archive']
                    }    
 
]};

//====================================================================
// Load ext.geshi.local to better support code syntax highlighting
//====================================================================
 
!function ($, mw) {
    if ([1200, 1201].indexOf(mw.config.get('wgNamespaceNumber')) !== -1 && 
    $('.mw-geshi').length) {mw.loader.load('ext.geshi.local');}})
(jQuery, mediaWiki);

/********* ARCHIVE *********/

/*// SVG Image Scaling Script Config

window.dev.DynamicImages = {
    svgGallery: true,
    svgLightbox: true,
    svgIncreaseSrc: 2
};

// Refresh Thread Script

window.RefreshThreads = {
    interval: 30000,
    auto_add: true
};

//==============================
// UploadInPage Configuration
//==============================

window.needsLicense = false;
window.allowMultiUpload = true;
window.maxFiles = 100;
window.uploadDetails = true;

//===================
// Message Block
//===================

var MessageBlock = {
  title : "You're Out.",
  message : "You have been banned for $2 for the following reason: $1. If you feel eligible for a Repent Trial or think you should be unbanned, let an admin know or contact the FANDOM Staff. Have a nice day.",
  autocheck : false
};