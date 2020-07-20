/* Any JavaScript here will be loaded for all users on every page load. */

//************
// User Tags
//************

// Load core from JSON page

$.get(mw.util.wikiScript('load'), {
    mode: 'articles',
    articles: 'MediaWiki:Custom-UserTags',
    only: 'styles'
}, function(d) {
    window.UserTagsJS = JSON.parse(d.replace(/\/\*.*\*\//g, ''));
});

// Special tag text for permabanned users

window.addEventListener('load', function() {

    // Timeouts are always a terrible way to go, but UserTags has no event dispatched 
    // when it finished loading.
    
    setTimeout(function() {
		if (document.getElementById('UserProfileMasthead') === null) return;
		var blockTag = document.querySelector('.tag.usergroup-blocked.blocked-user');
		if (blockTag === null) return;
		new mw.Api().get({
			action: 'query',
			list: 'blocks',
			bkprop: 'expiry',
			bktimestamp: new Date().getTime(),
			bkusers: wgTitle
		}).done(function(d) {
			if (d.query.blocks[0] && d.query.blocks[0].expiry == 'infinity') {
				blockTag.innerHTML = 'Permabanned';
			}
		});
	}, 250);
});

//****************
// Admin tools
//****************

window.PRAoptions = {
    editSummary: 'Updating page links after rename (automatic)'
};

LIRoptions = {
    bottomMessage: '',
    editSummary: 'Updating file links after rename (automatic)',
    singleButtonText: 'Rename and update',
    queueButtonText: 'Add to queue',
    delay: 2000
};

var roll = wgUserGroups.includes("rollback");
var cmod = wgUserGroups.includes("content-moderator");
var admin = wgUserGroups.includes("sysop");

if (roll || cmod || admin) {
    importArticles({
        type: 'script',
        articles: [
            "u:dev:MediaWiki:AjaxRename/code.js",
            "u:dev:MediaWiki:CategoryRenameAuto-update/code.js",
            "u:dev:MediaWiki:FileUsageAuto-update/code.js",
            "u:dev:MediaWiki:AjaxUndo/code.js"
        ]
    });
}

window.MassCategorizationGroups = [
    'bot',
    'bureaucrat', 
    'content-moderator', 
    'rollback',
    'sysop'
];
 
window.massCategorizationDelay = 2500; // 2.5 second interval

window.MassRenameRevertGroups = [
    'bot',
    'bureaucrat', 
    'content-moderator', 
    'rollback',
    'sysop'
];

//********************
// AJAX Auto-Refresh
//********************

window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page over time';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/dev/images/b/ba/Snake_throbber_dark-bg.gif/revision/latest?cb=20140519203615';
window.ajaxPages = Array(
    "Special:WikiActivity",
    "Special:WikiActivity/watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:Watchlist",
    "Special:RecentChanges",
    "Special:RecentChangesLinked",
    "Special:Images",
    "Special:ListFiles",
    "Special:NewPages",
    "Special:UncategorizedPages",
    "Special:Categories",
    "Blog:Recent_posts",
    "Project:Duplicate Images",
    "Project:Dynamic file index"
);

jQuery.extend(true, window, {dev: {i18n: {overrides: {AjaxRC: {
    'ajaxrc-refresh-text': 'Auto-refresh',
    'ajaxrc-refresh-hover': 'Automatically refresh the page over time',
}}}}});

//**********
// RailWAM
//**********

window.railWAM = {
    logPage: "Project:WAM Log"
};

//*******************************
// Archive unused Forum boards
//*******************************

window.ArchiveBoards = {
    boards: ["New on One Minute Melee Fanon Wiki"],
    boardNotice: "This board has not been used in years and is now superseded by a new \
                  board, hence it is archived and you can't post here.",
    groupCustom: ["content-moderator", "rollback", "threadmoderator"],
    threads: true,
    post: true
};

//*********************
// Mark banned users
//*********************

jQuery.extend(true, window, {
    mbTempStyle: 'opacity: 0.7; text-decoration: line-through; font-weight: bold;',
    mbIndefStyle: 'opacity: 0.4; font-style: italic; text-decoration: line-through; font-weight: bold;',
    mbTooltip: 'Banned ($1) by $2: $3 ($4 ago)',
    mbTipBox: false,
    mbTipBoxStyle: 'font-size:85%; background:#FFFFF0; border:1px solid #FEA; padding:0 0.3em; color:#AAA',
    mbLoadingOpacity: 0.85,
    mbNoAutoStart: false
});

// ******************************************************
// Experimental JavaScript countdown timer (By Splarka)
// Version 0.0.3
// ******************************************************
//
// Usage example:
//  <span class = "countdown" style = "display:none;">
//  Only <span class = "countdowndate">January 01 2007 00:00:00 PST</span> until New years. </span>
//  <span class = "nocountdown">JavaScript disabled.</span>
 
function updatetimer(i) {
    var now = new Date();
    var then = timers[i].eventdate;
    var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);
   
    // Catch bad date strings

    if (isNaN(diff)) { 
      timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
      return;
    }
   
    // Determine plus/minus

    if (diff < 0) {
      diff = -diff;
      var tpm = 'T plus ';
    } else {
      var tpm = 'T minus ';
    }
   
    // Calculate the diff

    var left = (diff % 60) + ' seconds',
        diff = Math.floor(diff / 60);
    
    if (diff > 0) left = (diff % 60) + ' minutes ' + left;
        diff = Math.floor(diff / 60);
    
    if (diff > 0) left = (diff % 24) + ' hours ' + left;
        diff = Math.floor(diff / 24);
    
    if (diff > 0) left = diff + ' days ' + left;
    timers[i].firstChild.nodeValue = tpm + left;
   
    // A setInterval() is more efficient, but calling setTimeout()
    // Makes errors break the script rather than infinitely recurse

    timeouts[i] = setTimeout('updatetimer('+i+')', 1000);
  }
   
  function checktimers() {

    // Hide 'nocountdown' and show 'countdown'

    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for(var i in nocountdowns) nocountdowns[i].style.display = 'none';
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for(var i in countdowns) countdowns[i].style.display = 'inline';
   
    // Set up global objects timers and timeouts.

    timers = getElementsByClassName(document, 'span', 'countdowndate');  // Global
    timeouts = new Array(); // Generic holder for the timeouts, global
    if (timers.length === 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i);  // Start it up
    }
  }
   
  addOnloadHook(checktimers);

//*********************************************************
// Makes {{Username}} display the username of the vistor
// Requires copying of Template:Username
//*********************************************************
 
$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) !== 'undefined' && 
    disableUsernameReplace || wgUserName === null) return;
    $(".Username").text(wgUserName);
});

//*******************************************************************
// Adds separate list of uncreated categories on Special:Categories.
//*******************************************************************
 
function unCats() {
    var $newCats = $('<div>').css('float', 'right').text('Uncreated categories:');
    var $newCatsList = $('<ul>').appendTo($newCats);
    $('.mw-spcontent > ul').before($newCats);
    $('.mw-spcontent > ul > li').has('.newcategory').clone().appendTo($newCatsList);
} 
 
if (mw.config.get('wgCanonicalSpecialPageName') === 'Categories') {
    unCats();
    mw.hook('wikipage.content').add(unCats);
}
 
//*******************************************
// Adds a button to clear Deletion reasons
//*******************************************
 
if (mw.config.get('wgAction') === 'delete') {
    $('#wpReason').after(' <span id = "wpClearReason" class = "button">\u232b</span>');
    $('#wpClearReason').click(function () {
        $('#wpReason').val('').focus();
    });
}

//*******************************************
// Allows advanced image size manipulation
//*******************************************

$(".image-resize").each(function() {
    var a = $(this).children(".image-resize-new").text().split("_"),
        img = $(this).find("img");
    if (!isNaN(Number(a[1])) && !isNaN(Number(a[1]))) {
        img.attr({
            width: a[0],
            height: a[1]
        });
    }
});