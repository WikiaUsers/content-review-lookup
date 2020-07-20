/* Any JavaScript here will be loaded for all users on every page load. */

/****
 ———————————————————————————————————————————————————————————————————————————————
 # User Tags
 ———————————————————————————————————————————————————————————————————————————————
**/

window.UserTagsJS = {
    modules: {
        stopblocked: false, //Keep tags of blocked users
        isblocked: true,
        inactive: 45, //Mark users as inactive after 45 days of no activity
        implode: { // Combine certain combinations of usergroups into one tag
              'moderator': ['content-moderator', 'threadmoderator']
         },
        newuser: {
              // Remove "New editor" tag after four days and ten edits
              days: 4, edits: 10 
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
            // Remove unneeded tags from certain combinations
            'chatmoderator': ['superordinate', 'moderator'], 
          },
        //Adding custom tags to users
        custom: {
           "Withersoul 235": ['darkestmind'],
           "InsomniacReader": ['fbureau'],
           "Insanelyimpulsive": ['founder', 'fbureau']
        }
    },
    //Tag creation/customization
    tags: {
        "darkestmind": {u: 'Darkest Mind', order: 3},
        "fbureau": {u: 'Former Bureaucrat'},
        "founder": {u: 'Founder'},
        "moderator": {u: 'Moderator', order: 3},
        //Begin repositioning of existing tags
        'bureaucrat': {order: 1},
	'sysop': {order: 2},
	'content-moderator': {order: 4},
	'threadmoderator': {order: 5},
        'rollback': {order: 6},
	'chatmoderator': {order: 7}
}};

/****
 ———————————————————————————————————————————————————————————————————————————————
 # Make the site perform better and load faster
 ———————————————————————————————————————————————————————————————————————————————
**/
 
var hasClass = (function () {
    var reCache = {}; return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] =
        new RegExp("(?:\\s|^)" + className + "(?:\\s|$)")))
        .test(element.className);
};})();
 
/****
 ———————————————————————————————————————————————————————————————————————————————
 # Replaces content with removable spoiler warning
 # Use as follows: <div id="SpoilerAlert"> [spoilers] </div>
 # This will NOT work if over half of the page's height is in the tags.
 ———————————————————————————————————————————————————————————————————————————————
**/
 
window.SpoilerAlertJS = {
    question: 'Warning! This part of the page contains hardcore spoilers for \
    and information about key details and events in the books or movie and \
    also covers plot twists. Are you sure you want to see them?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 825
};

/****
 ———————————————————————————————————————————————————————————————————————————————
 # AJAX Auto-Refresh
 ———————————————————————————————————————————————————————————————————————————————
**/
 
window.ajaxPages = new Array(
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
    "Blog:Recent posts");
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page over time';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/dev/images/b/ba/Snake_throbber_dark-bg.gif/revision/latest?cb=20140519203615';

/****
 ———————————————————————————————————————————————————————————————————————————————
 # RevealAnonIP
 ———————————————————————————————————————————————————————————————————————————————
**/

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

//=========================================================
// Makes {{Username}} display the username of the visitor
// Requires copying of Template:Username
//=========================================================
 
$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) !== 'undefined' && 
    disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
});

//=============================================================
// Allows CSS to target pages with a specific template. 
// Made by KockaAdmiralac upon request.
//=============================================================
 
$('body').attr('data-topic', $('#mw-content-text .article-topic').attr('data-topic'));

 
//=====================================================================
// Adds separate list of uncreated categories on Special:Categories.
// By OneTwoThreeFall
//=====================================================================
 
window.ajaxCallAgain = window.ajaxCallAgain || new Array();
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

//*************************************************************************
/* Automatically displays the Edit dropdown menu on userpages upon hover 
rather than click */
//*************************************************************************
 
$('.UserProfileActionButton .drop').hover(function() {
 $('.UserProfileActionButton .wikia-menu-button').addClass('active'); 
});

//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// Notify users of unsigned posts on the Forum
//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
/*<nowiki>*/

window.i = window.i || 0; //Necessary for the script to work
window.SignatureCheckJS = {
	preamble: 'Hold up a sec...',
	noSignature: 'Please sign your post with three or four consecutive tildes \
	(~~~ or ~~~~) or, if applicable, your custom signature template. It is \
	important and required that you do so. It makes it easier to find out \
	who sent the message.',
	noForumHeader: 'There is no forum header on this page. You may not create \
	pages without the header or remove it from existing posts since they will\
	not show up in the forum lists, making them harder to find.',
	epilogue: 'Please correct your message. Proceeding regardless will incur a \
	warning or other action by the admins or moderators.',
	forumheader: 'Forumheader',
	checkSignature: Boolean(true) // Enable the signature check function
}; importScriptPage("MediaWiki:SignatureCheck/code.js", "dev");