/* Any JavaScript here will be loaded for all users on every page load. */

//=================
// Cleanup tools
//=================

window.massCategorizationDelay = 1800;
window.MassCategorizationGroups = ['sysop', 'content-moderator', 'rollback', 'bot'];

importArticles({
    type: "script",
    articles: [
        "external:dev:MediaWiki:MassCategorization/code.js",
        "external:dev:MediaWiki:CategoryRenameAuto-update/code.js"
    ]
});

//========================
// Script configurations
//========================

//ImprovedTabbers

window.ImprovedTabbers = {
        HideHeaderTitle: true,
        HideContentTitle: true,
        NonASCIIAnchor: true,
        SynchroInfoboxes: false,
        SynchroTabbers: false,
};

//UserTags

window.UserTagsJS = {
    
    modules: {
        
        //Inactive tag, added after 2 months of total inactivity
        
        inactive: {
            
            days: 60,
            zeroIsInactive: false
            
        },
        
        //New editor config
        
        newuser: {
            
            /**Remove new editor tag after the user either hits 25 edits or is a member
               of the wiki for 10 days, whichever happens first**/
            
            computation: function(days, edits) {
                return days < 10 && edits < 25;
            }
            
        },
        
        //Add usertags to all members of a certain group
        
        explode: {
            
            //Add administrator to bureaucrat
            //(By default, UserTags removes admin from bureaucrat for odd reasons)
            
            'sysop': ['bureaucrat']
            
        },
        
        //Merge usertags
        
        implode: {
            
            //Custom usergroup creation
            
            'moderator': ['content-moderator', 'threadmoderator'],
            'dualmod':   ['content-moderator', 'chatmoderator'],
            'patroller': ['rollback', 'threadmoderator'],
            'assistant': ['rollback', 'chatmoderator']
            
        },
        
        //Opposite of explode (Remove tags rather than add them)
        
        metafilter: {
            
            //Remove Chat Mod from Moderator, if present
            
            'chatmoderator': ['moderator']
            
        },
        
        //Add tags to rollbacks, util, authenticated accounts etc
        
        mwGroups: ['authenticated', 'util', 'rollback', 'bannedfromchat'],
        
        //Add tags to users
        
        custom: {
            
            'PennyFitzgerald':   ['founder', 'exburo'],
            '5raptor5':          ['exsysop'],
            'XavierPanama':      ['exsysop'],
            'TheBestGamer':      ['exsysop'],
            'Justinrich2001':    ['exdmod', 'exchmod'],
            'Kainsword17':       ['exchmod']
            
        }
        
    },
    
    tags: {
        
        'founder': {order: -1/0, title: "This user created the wiki in 2012."},
        'bureaucrat': {order: 1, link: "Project:Staff#Bureaucrats"},
        'sysop': {order: 2, u: "Administrator", link: "Project:Staff#Administrators"},
        'moderator': {order: 3, u: "Moderator", link: "Project:Staff#Moderators"},
        'dualmod': {order: 4, u: "Dual Moderator", link: "Project:Staff#Dual_Moderators"},
        'content-moderator': {order: 5, link: "Project:Staff#Content_Moderators"},
        'patroller': {order: 6, u: "Patroller",  link: "Project:Staff#Patrollers"},
        'threadmoderator':{order: 7, link: "Project:Staff#Discussions Moderators"},
        'assistant': {order: 8, u: "Assistant", link: "Project:Staff#Assistants"},
        'rollback': {order: 9, link: "Project:Staff#Rollbacks"},
        'chatmoderator': {order: 10, link: "Project:Staff#Chat_Moderators"},
        'bot': {order: 0.5, link: "Project:Bots"},
        
        'exsysop':   {order: 12, u: 'Former Administrator'},
        'exburo':    {order: 11, u: 'Former Bureaucrat'},
        'exdmod':    {order: 13, u: 'Former Discussions Moderator'},
        'exchmod':   {order: 14, u: 'Former Chat Moderator'}
        
    },
    
};

//MarkForDeletion

window.MarkForDeletion = {
    promptedDeleteReason: "Violates site rules",
    replace: false
};

//BackToTopButton

window.BackToTopModern = true;
window.BackToTopFade = 300;

//AJAX Auto-Refresh

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
    "Special:BlockList",
    "Special:ChatBanList",
    "Blog:Recent_posts");
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page over time';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/deathbattlefanon/images/d/de/Ajax-loader.gif/revision/latest?cb=20200828094018';

//DiscussionsRaikModule

window.discussionsModuleConfig = {
	'size': '6',
	'mostrecent': true
};

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

//=====================================================================
// Adds separate list of uncreated categories on Special:Categories.
//=====================================================================
 
window.ajaxCallAgain = window.ajaxCallAgain || Array();
window.ajaxCallAgain.push(function() {
    if (wgPageName === "Special:Categories") {
    var $newCats =  $('<div>')
            .css('float', 'right')
            .text('Uncreated categories:')
            .attr('id', 'EmptyCats');
    var $newCatsList = $('<ul>').appendTo($newCats);
    $('.mw-spcontent > ul').before($newCats);
    $('.mw-spcontent > ul > li')
        .has('.newcategory')
        .clone()
        .appendTo($newCatsList);}
});
 
//============================================
// Adds a button to clear Deletion reasons
//============================================
 
if (mw.config.get('wgAction') === 'delete') {
    $('#wpReason')
        .after(' <span id="wpClearReason" class="button">\u232b</span>');
    $('#wpClearReason').click(function() {$('#wpReason').val('').focus();});
}

//===========================================
// Allows more in-depth resizing of images
//===========================================
 
$(".image-resize").each(function() {
    var a = $(this).children(".image-resize-new").text().split("_");
        img = $(this).find("img");
    if (!isNaN(Number(a[1])) && !isNaN(Number(a[1]))) {
        img.attr({
            width: a[0],
            height: a[1]
        });
    }
});
 
//===========================================
// Special tag text for permabanned users
//===========================================
 
window.addEventListener('load', function() {
 
    // Timeouts are always a terrible way to go, but UserTags has no event dispatched when it 
    // finished loading.
 
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