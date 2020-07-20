/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
 AjaxRCRefreshText = 'Auto-Refresh';
 AjaxRCRefreshHoverText = 'Automatically refresh the page';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
 importScriptPage('AjaxRC/code.js', 'dev');

PurgeButtonText = 'Purge';

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:PurgeButton/code.js'
    ]
});

/* Username replace feature
 * Inserts viewing user's name into <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */
 
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

/* User Tags*/
UserTagsJS.modules.custom = {
	'ChristinaGrimmieLove': ['ChristinaGrimmieLove'],
	'Melody Phoenix': ['MelodyPhoenix'],
	'JohnJD1302': ['JohnJD1302'],
	'PinkStar19': ['PinkStar19']
	
};

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
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);

  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }

  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = ' ';
  } else {
    var tpm = ' ';
  }

  // calcuate the diff
  var left = (diff%60) + ' seconds';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left
  timers[i].firstChild.nodeValue = tpm + left;

  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}

function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'

  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this blog! If a reply must be produced, please message the blog's creator.",
    nonexpiryCategory: "Never archived blogs"
};
 
/* Credits to Avengers Alliance Wiki */
window.LockForums = {
    expiryDays: 30,
    expiryMessage: "Bringing back old conversations clutters the Forums. Dance carefully away.",
};
    
 
importArticles({
    type: "script",
    articles: [
	"w:c:dev:ShowHide/code.js",
	"w:c:dev:CollapsibleInfobox/code.js",
	"w:c:dev:DisplayClock/code.js" ,
	// for examples on w:c:dev:CollapsibleInfobox
	"w:c:dev:AjaxRC/code.js",
	"w:c:dev:BackToTopButton/code.js",
	"w:c:dev:OasisToolbarButtons/code.js",
	"w:c:dev:AutoEditDropdown/code.js",
	"w:c:dev:PurgeButton/code.js",
    "w:c:dev:Countdown/code.js",
    "w:c:dev:LockOldBlogs/code.js",
	"MediaWiki:Common.js/displayTimer.js", // Add UTC clock above articles
	"MediaWiki:Common.js/userRightsIcons.js" //Custom user rights icons on userpages
    ]
});
 
/* LockForum (coding can be found at http://dev.wikia.com/wiki/LockForums) */
window.LockForums = {
    expiryDays: 180,
    expiryMessage: "This forum has been automatically archived because its most recent comment is over <expiryDays> days old.",
    warningDays: 30,
    warningMessage: "This forum is now <actualDays> days old; out of courtesy to your fellow Wikians, please do not comment unless it is absolutely necessary. This forum will archive automatically when the last comment is <expiryDays> days old.",
    banners: true,
    ignoreDeletes: true,
    warningPopup: true,
    warningPopupMessage: "By posting on an old forum you may be filling up the e-mail boxes of many people who are still following this topic. Are you sure you want to do this?",
    disableOn: ["12345", "67890"]
};
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:LockForums/code.js"
    ]
});