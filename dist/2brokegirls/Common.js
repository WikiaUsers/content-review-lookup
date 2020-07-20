var	ajaxIndicator = ajaxIndicator || 'https://images.wikia.nocookie.net/2brokegirls/images/f/f7/AjaxLoader_%281%29.gif', 
	ajaxTimer,
	ajaxRefresh = 30000,
	refreshText = 'Refresh',
	refreshHover = 'Check to automatically refresh the content of the page',
	doRefresh = true;
 
if ( !window.ajaxPages ) {
	var ajaxPages = [ 'Special:RecentChanges', 'Special:Log', 'Special:WikiActivity', 'Special:WikiActivity/activity', 'Special:WikiActivity/watchlist' ];
}
if ( !window.ajaxCallAgain ) {
	var ajaxCallAgain = [];
}
if( typeof AjaxRCRefreshText == "string" ) {
	refreshText = AjaxRCRefreshText;
}
if( typeof AjaxRCRefreshHoverText == "string" ) {
	refreshHover = AjaxRCRefreshHoverText;
}
 
importScriptPage('AjaxRC/code.js', 'dev');

importArticles({ 
    type: "script",
    articles: [
         "w:dev:ShowHide/code.js", /* Show and Hide code by tables */
    ]
});

// ************************************************************************************************************* // **************************** Experimental javascript countdown timer (Splarka) ****************************** // ******************************************** Version 0.0.2 ************************************************** // ************************************************************************************************************* // ******************* Code Source: Redwall Wiki - redwall.wikia.com/wiki/MediaWiki:Common.js ****************** // ************************************************************************************************************* // Embed with a span class="countdowntimer", eg: // <span class="countdowntimer" style="display:none;">April 12 2008 00:00:01 AM EST</span> // default replacement text can accompany, eg: <span class="notimer">*javascript required*</span>

var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
	chatOptionsLoaded = 1;
	importScriptPage('MediaWiki:Chat.js/options.js');
}

/* ============================================================ */
/*  Chat options import - multikick, afk, multipm, and others   */    
/* ============================================================ */

function checktimers() {
  var untimers = getElementsByClassName(document, 'span', 'notimer');
  for(var i=0;i < untimers.length; i++) {
    untimers[i].style.display = 'none';    
  }
  timers = getElementsByClassName(document, 'span', 'countdowntimer');  //global
  tim = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i=0;i < timers.length; i++) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    timers[i].firstChild.nodeValue = '0 days 0 hours 0 minutes 0 seconds';
    timers[i].style.display = 'inline';
    updatetimer(i);  //start it up
  }
}

importArticles({
    type: "script",
    articles: [
         "w:dev:BackToTopArrow/code.js", /* Back to top arrow */
         "w:dev:AutoEditDropdown/code.js", /* Auto edit dropdown */
         "w:dev:Countdown/code.js", /* Countdown timers on the wiki */
         "w:dev:DupImageList/code.js", /* Duplicate images */
         "w:dev:SearchGoButton/code.js", /* Search go button */
         "w:c:dev:LockOldBlogs/code.js", /* Lock blogs that haven't been commented on for more than 30 days */
         "w:c:dev:WallGreetingButton/code.js", /* Adds a button to Message Wall pages that allows a user to easily edit their wall greeting */
         "w:deadisland:User:Jgjake2/js/DISPLAYTITLE.js", /* Allows users to change the title displayed at the top of any page (Template:DISPLAYTITLE; use = {{DISPLAYTITLE|Title To Be Displayed On Page}}) */
         "MediaWiki:Common.js/CEB.js", /* Custom edit buttons */
         "MediaWiki:Common.js/Imports.js", /* Auto-refresh, Inactive users, AdvancedOasis, Anons */ 
         "MediaWiki:Common.js/Standardeditsummaries.js", /* Standard Edit Summaries */
         "MediaWiki:Common.js/Collapsibletables.js", /* Collapsible tables */
         "MediaWiki:Common.js/Sitemeter.js", /* Site Meter */
         "MediaWiki:Common.js/Clock.js", /* Clock */
         "MediaWiki:Common.js/Tooltipscript.js", /* Tooltip script begin */
         "MediaWiki:Common.js/Usernamereplace.js", /* Username replace feature */
         "MediaWiki:Common.js/Sitenotice.js", /* Added SiteNotice Functionality */
         "MediaWiki:Common.js/Chatimprovements.js", /* Chat Improvements */
         "MediaWiki:Common.js/Usericons.js", /* Adds extra user rights icons */
         "MediaWiki:Common.js/profileRedesign.js", /* Status */
         "MediaWiki:Common.js/Chatloads.js", /* Chat extras */
    ]
});
/* Credits to Sam & Cat Wiki */

importArticles({
	type: "script",
	articles: [
		"MediaWiki:Common.js/star-ratings.js",
	]
});