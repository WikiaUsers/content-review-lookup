/* Any JavaScript here will be loaded for all users on every page load. */

/** ---------------------- **/
/** Collapsible infoboxes  **/
/** ---------------------- **/

!function () {
    $('<a class = "infoboxtoggle" href = "#">+/-</a>')
       .appendTo($('.infobox tr.header').filter(function() {
         return $(this).attr('class').split(" ").length > 1 }).find("th")
    );
 
    $(".infobox tr.header").each(function(){
      var $this = $(this);
      if ($this.hasClass("hidden")) {
        var firstclass = $this.attr("class").split(" ")[Number];
        $this.siblings("." + firstclass).addClass("hidden");}
   });
 
    $('a.infoboxtoggle').click (
      function (infoboxtoggle) {
        var parent = $(this).parent();
        var grandparent = parent.parent();
        var firstclass = grandparent.attr('class').split(" ")[Number];
 
        infoboxtoggle.preventDefault();
        grandparent.siblings ('.' + firstclass).has('td').toggleClass('hidden');
      });
};

/** ----------------------------- **/
/** Make the site perform better  **/
/** ----------------------------- **/

var hasClass = (function() {
    var reCache = {}; return function(element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = 
        new RegExp("(?:\\s|^)" + className + "(?:\\s|$)")))
        .test(element.className);
}})();

/**-----------**/
/** User tags **/
/**-----------**/
 
// Core Configuration
 
window.UserTagsJS = {
    modules: {
        
       // Add tags to users
        
       custom: {
	        'Withersoul 235': ['adopter', 'coder']
	   },
	   
	  //Remove / override existing tags
	   
	  userfilter: {/** Nothing yet!**/},
	  metafilter: { 
      // Remove tags like "Inactive" and "New Editor" from blocked users
      // Also remove "New Editor" from staff
            'inactive': ['blocked', 'bot', 'bot-global'],
            'newuser':  [
              'blocked', 'bureaucrat', 'sysop', 'content-moderator', 'rollback',
              'chatmoderator', 'threadmoderator', 'moderator', 
              'staff', 'vstf', 'helper', 'content-volunteer', 'util',
              'bot', 'bot-global'
            ],
    // Do mostly the same with the "Not Autoconfirmed" tag
            'notautoconfirmed':  [
              'bureaucrat', 'sysop', 'content-moderator', 'rollback',
              'chatmoderator', 'threadmoderator', 'moderator', 
              'staff', 'vstf', 'helper', 'content-volunteer', 'util'
            ],
    // Autoconfirmed tag
            'autoconfirmed': [
            'bureaucrat', 'sysop', 'content-moderator', 'rollback',
            'chatmoderator', 'threadmoderator', 'moderator', 
            'staff', 'vstf', 'helper', 'content-volunteer', 'util']},
    // New users
    /** If the expression is true then they will be 
        marked as a new user if the expression is false 
        then they won't. The tag is removed as soon as 
        the user gets 30 edits, or as soon as they 
		have been present for 10 days, whichever happens first **/
    newuser: {
        computation: function(days, edits) {
            return days < 10 && edits < 30;
        }
    },
    // Add tags to all users within a group without touching their other tags
    /** Add Banned from Chat tag to all banned users **/
    implode: {
        'bannedfromchat': ['blocked'], 
        // If user has these, combine all three Moderator tags into one
	    'moderator': [
	        'content-moderator',
	        'chatmoderator',
	        'threadmoderator'
	]},
    
    // Misc.
    
    isblocked: true, //Determine if users are banned
    nonuser: true, //Tag users who never contributed here
    autoconfirmed: true, //Tag users with new accounts
    inactive: 80, /**Tag users as inactive after 80 days of no 
                    contributing**/
    stopblocked: Boolean}, //Keep tags of banned users
    tags: {
        'ontrial': {
            u: 'On Repent Trial',
            link: 'Project:Repent Trials',
            title: 'Ths user used to be banned, but is considered to be \
            forgiven and allowed back into the community. They are \
            therefore on a trial to prove that they are worthy of it \
            and have truly changed for the better.'
        },
       'coder': {
           u: 'Wiki Coder',
           title: "This user manages the wiki's templates, CSS, Lua and \
           JavaScript."
       },
       'founder' : {
           u: 'Founder',
           title: 'This user started the Slenderverse Wiki, \
           all the way back in 2012.',
           order: -1/0
       },
       'blocked': {
           u: 'Reported Missing',
           title: "This user misbehaved on this wiki, didn't follow its \
           policies or is a sockpuppet of a user who did one of the \
           aforementioned. They have therefore been kicked out and reduced \
           to usage of a read-only mode.",
           order: -1/0
       },
       'bannedfromchat': {
           u: 'Banished from the Collective',
           title: "This user misbehaved in this wiki's chatroom and didn't \
           follow its rules. They are now denied access to it, but can \
           still contribute to the wiki. This tag also appears when a user \
           is blocked from the wiki in general without being chatbanned first.",
           order: 1
       },
       'moderator': {
           u: 'Operator',
           title: 'This user is a general moderator of the wiki.\
           They have all the permissions of the Chat, Content and \
           Discussions Moderator positions.',
           order: 3
       },
       'adopter': {
           u: 'Wiki Adopter',
           title: 'This user adopted the Slenderverse Wiki after it had\
                  been without administration for a while.',
           order: 1
       },
       // Begin changing order of default tags
	   'bureaucrat': {order: 1},
	   'sysop': {order: 2},
	   'content-moderator': {order: 4},
	   'threadmoderator': {order: 5},
	   'rollback': {order: 6},
	   'chatmoderator': {order: 7},
}};
 
/* Automatically add global tags to users in question + download
text and data for some other tags. */
 
UserTagsJS.modules.mwGroups = Array(
 
    // Append global ranks to accounts in question
 
    'authenticated',
    'bot-global',
    'checkuser-global',
    'council',
    'helper',
    'util',
    'voldev',
    'vanguard',
    'vstf',
 
    // Import some wikispecific tags
 
    'bannedfromchat'
);

/** --------------------------------- **/
/** Script configurations and imports **/
/** --------------------------------- **/

jQuery.extend(window, {
    
    /** AJAX Auto-Refresh **/ 
 
    ajaxPages: Array(
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
        "Blog:Recent posts"
    ),
    ajaxRefresh: 30000,
    AjaxRCRefreshText: 'Auto-refresh',
    AjaxRCRefreshHoverText: 'Automatically refresh the page over time',
    ajaxIndicator: 'https://vignette.wikia.nocookie.net/dev/images/b/ba/Snake_throbber_dark-bg.gif/revision/latest?cb=20140519203615',
    
    
    /** Spoiler areas **/
    
    SpoilerAlertJS: {
        question: 'Warning! This area contains spoilers for an ARG, fan film\
                    or video game. Do you want to see them?',
        yes: 'Yes',
        no: 'No',
        fadeDelay: 625
    },
    
    /** Message Wall tags **/
    
    MessageWallUserTags: {
        tagColor: 'orangered',
        glow: Boolean(true),
        glowSize: '8px',
        glowColor: 'red',
        users: {
            'Withersoul 235': 'Bureaucrat • Admin',
            'FizzFire': 'Admin'
    }}
});


importArticles({
    type: 'script',
    articles: 
       ['u:dev:MediaWiki:SpoilerAlert/code.js',
        'u:dev:MediaWiki:AjaxRC/code.js',
        'w:c:dev:MediaWiki:AdminDashboard block/code.js',
        'external:dev:CollapsibleList.js',
        'external:dev:MediaWiki:SearchSuggest/code.js',
        'w:c:dev:UserTags/code.js',
        'u:dev:WallGreetingButton/code.js',
        "u:dev:MediaWiki:MessageWallUserTags/code.js"]
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
  } else {var tpm = 'T minus '}
 
  // calculate the diff
  var left = (diff % 60) + ' seconds';
    diff = Math.floor(diff / 60);
  if(diff > 0) left = (diff % 60) + ' minutes ' + left;
    diff=Math.floor(diff / 60);
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
  for(var i in nocountdowns) {nocountdowns[i].style.display = 'none'}
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) {countdowns[i].style.display = 'inline'}
 
  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = []; // generic holder for the timeouts, global
  if(timers.length === 0) {return}
  for(var i in timers) {
    timers[i].eventdate = Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}addOnloadHook(checktimers);

/** Makes {{Username}} display the username of the vistor ~
    Requires copying of Template:Username **/
 
jQuery(function UserNameReplace() {
    if (typeof(disableUsernameReplace) !== String('undefined') && 
    disableUsernameReplace || wgUserName === null) {return}
    $("span.insertusername").text(wgUserName);
});

/** Sorts links on Special:WhatLinksHere alphabetically **/

new function($) {
    if (wgCanonicalSpecialPageName !== 'Whatlinkshere') {return}
    var sorted_list, $list = $('#mw-whatlinkshere-list');
    sorted_list = $list.children('li').sort(function (a, b) {
        return ($(a).find('a:first').attr('title') > 
        $(b).find('a:first').attr('title')) ? 1 : -1;});
    $list.children('li').remove(); $list.append(sorted_list);
}(jQuery);

/** Fixes a bug caused by undoing an edit and leaving no 
    summary if "Prompt me when entering a blank edit summary" 
    is checked in one's Preferences **/
 
$(function () {
    if (
        document.location.search.indexOf("undo=") !== -1 && 
        document.getElementsByName('wpAutoSummary')[Number]
    ) {document.getElementsByName('wpAutoSummary')[Number].value = '1'}
});

/** ----------------------------------------------------------------- **/
/** Adds separate list of uncreated categories on Special:Categories. **/
/** ----------------------------------------------------------------- **/
 
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
            .has('.newcategory').clone().appendTo($newCatsList);}
});