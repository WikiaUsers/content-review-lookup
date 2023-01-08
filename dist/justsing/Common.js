/* Any JavaScript here will be loaded for all users on every page load. */

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

jQuery('.achievementbox').mouseover(function() {
   jQuery("div", this).show();
})

jQuery('.achievementbox').mouseout(function() {
   jQuery("div", this).hide();
})

function fBox() {
	$('#fbox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=107365159296867&amp;connections=10" align="top" frameborder="0" width="300" height="250" scrolling="no" />');
}

$(fBox);

$(document).ready(function(){
	if( $('#control_form_edit').length )
	{
		$('#control_edit').remove();
	}
});

$(".openchat a").click(function() {
   window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
   return false;
});

/* For AjaxRC/code.js */
var ajaxPages = ["Special:WikiActivity"];
var AjaxRCRefreshText = 'Auto-Refresh';

PurgeButtonText = 'Purge'; // for PurgeButton/code.js

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

/* Credits to Avatar Wiki */
/* Adds icons to page header bottom border
 * by: [[User:The 888th Avatar]]
 */
 
$(document).ready(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});

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

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').html(mw.config.get('wgUserName'));
});