/* Any JavaScript here will be loaded for all users on every page load. */

//<nowiki>
// Prevent MediaWiki parsing in code files. (e.g. ~~~~ into a signature)

//==============================================================
// Create dev namespace 
// Required for Standard Edit Summaries and DynamicImages
//==============================================================

window.dev = window.dev || {};

/******************************************************************************
########################## START DEV WIKI CODES ###############################
*******************************************************************************/

//=========================
// AJAX Auto-Refresh
//=========================

window.ajaxPages = new Array(
    "Special:WikiActivity",
    "Special:WikiActivity/watchlist",
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
    "Special:DynamicFileList", // Custom special page, see below for reference
    "Special:DupImageList", // Same here
    "Special:BlockList",
    "Special:ChatBanList",
    "Blog:Recent_posts");
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page over time';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/deathbattlefanon/images/d/de/Ajax-loader.gif/revision/latest?cb=20200828094018';

/****** Import new buttons in specific circumstances ******/
//-------------------------------------------------------------

/** Imports Null Edit and Edit Intro Buttons if page can be edited and Refresh 
    button if not. 
    ~ The Null Edit button doesn't load on locked pages.
      Therefore, we import a fallback for these pages.
    ~ The Edit Intro Button would be useless as it wouldn't work at all on those 
      pages, being there just for the heck of it. 
**/

window.PurgeButtonText = "Refresh"; //Set text for PurgeButton

if ($("#ca-edit").length || $("a[data-id='editprofile']").length) {
  importArticles({
	type: 'script',
	articles: [
	    'u:dev:MediaWiki:EditIntroButton/code.js',
	    'u:dev:MediaWiki:NullEditButton/code.js'
]})} else {importScriptPage('MediaWiki:PurgeButton/code.js', 'dev')}

/** Ajax Rename (Rollback, Content Mod and Admin only) **/

var edit = $("#ca-edit").length; 
var pedit = $("a[data-id='editprofile']").length;
var cmod = mw.config.get("wgUserGroups").indexOf('content-moderator') > -1;
var roll = wgUserGroups.includes("rollback");
var sysop = wgUserGroups.includes("sysop");

if (roll && edit || roll && pedit || edit && cmod || cmod && pedit
    || sysop && edit || sysop && pedit) {
      importScriptPage("MediaWiki:AjaxRename/code.js", "dev");
}

/** Ajax Redirect (Admin / Content Moderator only) **/

if (cmod || sysop) {
	  importArticle({
	  type: 'script',
	  article: 'u:dev:MediaWiki:AjaxRedirect/code.js'
})}

//-------------------------------------------------------------
/****** End button imports ******/

//같같같같같같같같같같같
// Less configuration
//같같같같같같같같같같같

window.lessOpts = window.lessOpts || [];
 
window.lessOpts.push({
    target: 'MediaWiki:Less.css',
    source: 'MediaWiki:Custom-general.less',
    load: [
        'MediaWiki:Less.css',
        'MediaWiki:Custom-general.less'
    ],
    header: "MediaWiki:Custom-LESS-header/general"
}); window.lessOpts.push({
    target: 'MediaWiki:Specifics.css',
    source: 'MediaWiki:Custom-specifics.less',
    load: [
        'MediaWiki:Specifics.css',
        'MediaWiki:Custom-specifics.less'
    ],
    header: "MediaWiki:Custom-LESS-header/specifics"
});

window.lessConfig = {
    reload: true,
    wrap: false // Don't wrap Less in <pre> tags
};

//********************************************************
// Mass Categorization
// Can be used by: Rollbacks, Content Mods, Admins, Bots
//********************************************************

window.MassCategorizationGroups = [
    'bot',
    'bureaucrat', 
    'content-moderator', 
    'rollback',
    'sysop'
];

window.massCategorizationDelay = 2500; // 2.5 second interval

/**-----------**/
/** User tags **/
/**-----------**/
 
// Core Configuration
 
window.UserTagsJS = {
    modules: {
        
        // Add tags to users
       
        custom: {
	        'Withersoul 235': ['founder', 'hbureaucrat', 'coder'],
	        'RedFurnace': ['exburo']
	},
	   
	// Remove / override existing tags
	   
        userfilter: {
            'Withersoul 235': ['bureaucrat', 'sysop'],
            'RedFurnace': ['bureaucrat'],
        },
	    
        metafilter: { 
	      
            // Remove tags like "Inactive" and "New Editor" from blocked users
            // Also remove "New Editor" from staff
            'inactive': ['blocked', 'bot', 'bot-global'],
        
            'newuser': 
        
            ['blocked', 'bureaucrat', 'sysop', 'content-moderator', 'rollback',
            'chatmoderator', 'threadmoderator', 'moderator', 'operator',
            'superintendent', 'superordinate', 'staff', 'vstf', 'helper',
            'content-volunteer', 'util', 'bot', 'bot-global'],
        
            // Do mostly the same with the "Not Autoconfirmed" tag
            'notautoconfirmed': 
        
            ['bureaucrat', 'sysop', 'content-moderator', 'rollback',
            'chatmoderator', 'threadmoderator', 'moderator', 'operator',
            'superintendent', 'superordinate', 'staff', 'vstf', 'helper',
            'content-volunteer', 'util', 'blocked'],
        
            // Autoconfirmed tag
        
            'autoconfirmed':
        
            ['bureaucrat', 'sysop', 'content-moderator', 'rollback',
            'chatmoderator', 'threadmoderator', 'moderator', 'operator',
            'superintendent', 'superordinate', 'staff', 'vstf', 'helper',
            'content-volunteer', 'util', 'blocked']},
    
        //  New users
        /** If the expression is true then they will be 
            marked as a new user, if the expression is false 
            then they won't. The tag is removed as soon as 
            the user gets 30 edits, or as soon as they 
		    have been present for 10 days, whichever happens first **/
		    
        newuser: {
            computation: function(days, edits) {
                return days < 10 && edits < 30;
            }
        },
        
        /** Add tags to all users within a group without 
            touching their other tags **/
        //---------------------------------------------------    
        /** Add Banned from Chat tag to all banned users **/
        
        explode: {'bannedfromchat': ['blocked']},
        //---------------------------------------------------
    
        // Combine certain tags
        implode: {
            // If user has these, combine all three Moderator tags into one
	        'moderator': [
	            'content-moderator',
	            'chatmoderator',
	            'threadmoderator'
	        ],
        },
    
        // Miscellaneous
    
        isblocked: true, // Determine if users are banned
        nonuser: true, // Tag users who never contributed here
        autoconfirmed: true, // Tag users with new accounts
        inactive: {
            days: 80, // Tag users as inactive after 80 days of inactivity
            zeroIsInactive: false},
        stopblocked: false // Keep tags of banned users
    },
    tags: {
        
        ontrial: {
            u: 'On Repent Trial',
            link: 'Minecraft Animation Wiki:Repent Trials',
            title: 'Ths user used to be banned, but is considered to be' +
            ' forgiven and allowed back into the community. They are' +
            ' therefore on a trial to prove that they are worthy of it' +
            ' and have truly changed for the better.'
        },
        
        'hbureaucrat': { 
            u: 'Head Bureaucrat',
            title: 'This user is the head of the Minecraft Animation Wiki.'
        },
        
       'coder': {
           u: 'Wiki Coder',
           title: "This user manages the wiki's templates, CSS, Lua and" +
           " JavaScript."
       },
       
       'tagalog': {
           u: 'Tagalog Wiki Maintainer',
           title: "This user leads the Tagalog translation of the wiki."
       },
       
       'ptbr': {
           u: 'Portuguese Wiki Maintainer',
           title: "This user leads the Portuguese translation of the wiki."
       },
       
       'founder' : {
           u: 'Founder',
           title: 'This user started the Minecraft Animation Wiki,' +
           ' all the way back in 2014.',
           order: -1/0
       },
       
       'blocked': {
           u: 'Banned',
           title: "This user misbehaved on this wiki, didn't follow its" + 
           " policies or is a sockpuppet of a user who did one of the" +
           " aforementioned. They have therefore been kicked out and reduced" + 
           " to usage of a read-only mode.",
           order: -1/0
       },
       
       'bannedfromchat': {
           u: 'Chat-banned',
           title: "This user misbehaved in this wiki's chatroom and didn't" +
           " follow its rules. They are now denied access to it, but can" +
           " still contribute to the wiki. This tag also appears when a user" +
           " is blocked from the wiki in general without being chatbanned first.",
           order: 1
       },
       
       'moderator': {
           u: 'Moderator',
           title: 'This user is a general moderator of the wiki.' +
           " They have all the permissions of the Chat, Content and" +
           " Discussions Moderator positions.",
           order: 3
       },
       
       'exburo': {
           u: 'Former Bureaucrat',
           title: 'This user has been a bureaucrat in the past, but has left,' +
                   ' resigned or was demoted.',
           order: 1
       },
       
     // Begin changing order of default tags
    'bureaucrat': {order: 1},
    'sysop': {order: 2},
    'content-moderator': {order: 4},
    'rollback': {order: 5},
    'threadmoderator': {order: 6},
    'chatmoderator': {order: 7},
}};
 
/* Automatically add global tags to users in question + download
text and data for some other tags. */
 
UserTagsJS.modules.mwGroups = Array(
    
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
    //'autoconfirmed',
    'emailconfirmed',
    'rollback'
);

//=======================
// Spoiler Alert
//=======================

window.SpoilerAlertJS = {
    question: "Warning! This section contains spoilers, important plot details \
    and information regarding plot twists or the ending of an animation. \
    Are you sure you want to see the article?",
    yes: 'Yes.',
    no: 'No.',
    fadeDelay: 545
};

//===================
// Message Block
//===================

var MessageBlock = {
	  title: "You're out.",
	  message: "You have been banned for the following reason: $1. \
	  The expiry of your ban has been set to $2. \
	  If you feel eligible for a Repent Trial or think you should be unbanned,\
	  let an admin know or contact the FANDOM Staff. Have a nice day.",
	  autocheck: false
};

//==========================================
// Provides better support for SVG images
//==========================================

window.dev.DynamicImages = {
	 svgGallery: true,
	 svgLightbox: true,
	 svgIncreaseSrc: 4
};

//=====================
// Bot message walls
//=====================

window.DisableBotMessageWalls = {
    // Account belongs to human VSTF member who activated bot flag
    exceptions: ['Jr Mime']
};

//=================================
// Create custom Special pages
//=================================

/*

window.JSSpecialPagePages = window.JSSpecialPagePages || [ ];

mw.hook('jsspecialpage.ready').add(function(e) {
    
    e(
      'DynamicFileList',
      'This page provides a form to query the \
       MediaWiki API for images and requires JavaScript in order to \
       function. Navigate to <a href="https://dev.wikia.com/wiki/ListFiles" \
       >this page</a> for more information.<br><b>NOTE:</b> This page is not \
       a standard Special page, but has been created using the \
       <a href="https://dev.wikia.com/wiki/JSSpecialPage"> \
       JSSpecialPage plugin</a>. Follow the link for more info on \
       how to use it yourself.<br /><div id="ListFiles-container"></div>'
    );
    
    e(
      'DupImageList',
      'This page contains a list of duplicate images on the wiki; or \
       in other words, identical images that have been uploaded multiple \
       times to the wiki. Unless these duplicates are widely used, they \
       should be deleted. Administrators and content moderators are expected \
       to check this page on a regular basis. This page requires JavaScript \
       in order to function. Navigate to <a href="https://dev.wikia.com \
       /wiki/DupImageList">this page</a> for more info.<br><b>NOTE:</b> \
       This page is not a standard Special page, but has been created using \
       the <a href="https://dev.wikia.com/wiki/JSSpecialPage">JSSpecial \
       Page plugin</a>. Follow the link for more info on how to use \
       it yourself.<br /><div id="mw-dupimages"></div>'
    );
});

// If hooks don't work for whatever reason, resort to Plan B

if (!mw.hook) {
    /*
    window.JSSpecialPagePages.push({
        t: 'DynamicFileList',
        c: 'This page provides a form to query the\
            MediaWiki API for images and requires JavaScript\
            in order to function. See <a href="\
            https://dev.wikia.com/wiki/ListFiles">this page</a>\
            for more information.<br> NOTE: This page is not a default Special\
            page, but has been generated using the <a href=\
            "https://dev.wikia.com/wiki/JSSpecialPage">\
            JSSpecialPage plugin</a>. Follow the link for more info on\
            how to use it yourself.<br /> <div id="ListFiles-container"></div>'
    });
    
    window.JSSpecialPagePages.push({
        t: 'DupImageList',
        c: 'This page contains a list of duplicate images on the wiki; or \
        in other words, identical images that have been uploaded multiple \
        times to the wiki. Unless these duplicates are widely used, they \
        should be deleted. Administrators and content moderators are expected \
        to check this page on a regular basis. This page requires JavaScript \
        in order to function. Navigate to <a href="https://dev.wikia.com \
        /wiki/DupImageList">this page</a> for more info.<br><b>NOTE:</b> \
        This page is not a standard Special page, but has been created using \
        the <a href="https://dev.wikia.com/wiki/JSSpecialPage">JSSpecial \
        Page plugin</a>. Follow the link for more info on how to use \
        it yourself.<br /><div id="mw-dupimages"></div>'
    });
} */

/** Do some small things on Special:SpecialPages **/

/*

void function() {
	if (wgPageName !== "Special:SpecialPages") {return}
	
	// Remove "Special:" from the link to JSSpecialPage-generated pages 
	    
	mw.hook('jsspecialpage.ready').add(function() {
	    $("a[href$='Special:DynamicFileList']").html("Dynamic file list");
	    $("a[href$='Special:DupImageList']").html("Duplicate image list");
	});
	
	// Fix broken link texts
	
	$("a[href$='Special:UserSignup']").text("User signup");
	$("a[href$='Special:WikiaConfirmEmail']").text("Confirm email");
}(); */

//==========================
// Script imports
//==========================

importArticles({
    type: 'script',
    articles: new Array(
        //"w:c:dev:MediaWiki:DisableBotMessageWalls/code.js",
        'u:dev:MessageBlock/code.js',
        'u:dev:MediaWiki:AdminDashboard JS-Button/code.js',
        "w:c:dev:AdminDashboard block/code.js",
        //"u:dev:AjaxCommentDelete/code.js",
        'u:dev:MediaWiki:ShowUserGroups.js',
        'u:dev:DynamicImages/code.js',
        //'w:c:dev:MediaWiki:DupImageList/code.js',
        "u:dev:MediaWiki:GlobalEditcount/code.js",
        'w:c:dev:GameSlider/code.js',
        "u:dev:MediaWiki:ProtectionIcons/code.js",
        //'u:dev:MediaWiki:RefreshThreads/code.js',
        "w:c:dev:JSSpecialPage/code.js",
        //'u:dev:MediaWiki:SimilarArticles/code.js',
        'u:dev:MediaWiki:LuaError/code.js',
        'u:dev:WallGreetingButton/code.js',
        "u:dev:SearchSuggest/code.js"
        //"w:c:dev:MediaWiki:ListFiles/code.js"
    )
});

/******************************************************************************
########################## START OTHER CODES ##################################
*******************************************************************************/

//=================================================================
// Auto-updates numbers in the first column of countdown tables
// Authors: Wither, Miraro3
//=================================================================

document.addEventListener("DOMContentLoaded", function() {
    var rows = document.querySelectorAll(".CountdownTable tr");
    for (var h = 2; h < rows.length; h++) {
        var cell = rows[h].querySelector("td");
        cell.textContent = h - 1;
    }
});

//=================================================================
// Replace spans, divs and p's with "Clock" class with local time
//=================================================================

setInterval(function() {
    $('.Clock').text(new Date().toLocaleTimeString());
}, 1000);

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

// **************************************************
// Experimental JavaScript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">JavaScript disabled.</span>
 
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // determine plus/minus
  if(diff < 0) {
    diff = -diff;
    var tpm = 'T plus ';
  } else {
    var tpm = 'T minus ';
  }
 
  // calculate the diff
  var left = (diff % 60) + ' seconds';
    diff = Math.floor(diff / 60);
  if(diff > 0) left = (diff % 60) + ' minutes ' + left;
    diff = Math.floor(diff / 60);
  if(diff > 0) left = (diff % 24) + ' hours ' + left;
    diff = Math.floor(diff / 24);
  if(diff > 0) left = diff + ' days ' + left;
  timers[i].firstChild.nodeValue = tpm + left;
 
  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer('+i+')', 1000);
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

//=========================================================
// Makes {{Username}} display the username of the vistor
// Requires copying of Template:Username
//=========================================================
 
$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) !== 'undefined' && 
    disableUsernameReplace || wgUserName === null) return;
    $(".Username").text(wgUserName);
});

//==============================================================================
/* Fixes a bug caused by undoing an edit and leaving no 
summary if "Prompt me when entering a blank edit summary" is checked in 
one's Preferences */
//==============================================================================
 
$(function() {
    if (document.location.search.indexOf("undo=") !== -1 && 
        document.getElementsByName('wpAutoSummary')[0]) {
          document.getElementsByName('wpAutoSummary')[0].value = '1';}
});

//=============================================================
// Allows CSS to target pages with a specific template. 
// Made by KockaAdmiralac upon request.
//=============================================================
 
$('body').attr('data-topic', $('#mw-content-text .article-topic').attr('data-topic'));

//*************************************************************************
/* Automatically displays the Edit dropdown menu on userpages upon hover 
rather than click */
//*************************************************************************

$('.UserProfileActionButton .drop').hover(function() {
 $('.UserProfileActionButton .wikia-menu-button').addClass('active'); 
});

//===========================================================
// Bureaucrat certainity messages
//===========================================================

var BuroWarning = "Do you truly want to promote this user to bureaucrat?" + 
    " This is irreversible through conventional means!";
!function () {
  if (wgCanonicalSpecialPageName !== 'Userrights') {return}
  $('#mw-content-text').on('change', '#wpGroup-bureaucrat', function() {
    if (
      !!$('#wpGroup-bureaucrat').attr('checked') &&
      !confirm(String(BuroWarning)) ) {
          $('#wpGroup-bureaucrat').attr('checked', null);}
    });
}();


/******************************************************************************
########################## END ORIGINAL CODES #################################
*******************************************************************************/
//Planned extension to bureaucrat certainity message 
//(doesn't work in current state)
/*
var DemoteWarning = "Are you sure you want to remove your bureaucrat rights?"+
    " This is irreversible and permanent unless someone else repromotes you!";
    
if (!!$("input#username").attr('value', wgUserName)&&
        !!~wgUserGroups.indexOf("bureaucrat")&&
        !$('#wpGroup-bureaucrat').attr('checked')&&
        !confirm(String(DemoteWarning))) {
          $('#wpGroup-bureaucrat').attr('checked', Boolean(true));
}
*/

//</nowiki>