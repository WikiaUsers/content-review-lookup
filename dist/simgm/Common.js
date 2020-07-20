importArticles({
    type: "script",
    articles: [
         "w:dev:AutoEditDropdown/code.js", /* Auto edit dropdown */
         "w:dev:BackToTopArrow/code.js", /* Back to top arrow */
         "w:dev:ShowHide/code.js", /* Show and Hide code by tables */
         "w:dev:Countdown/code.js", /* Countdown timers on the wiki */
         "w:dev:DupImageList/code.js", /* Duplicate images */
         "w:dev:WallGreetingButton/code.js", /* Adds a button to Message Wall pages that allows a user to easily edit their wall greeting */
         "MediaWiki:Common.js/blocklock.js", /* Lock blogs that haven't been commented on for more than 30 days */
    ]
});

// 18:08, September 5, 2012 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY User:Rappy_4187
// If you use this on your wiki, you assume responsibility for
// ensuring compliance with Wikia’s ToU
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons
 
    rights["Songsinabox"]               = ["Bureaucrat", "Administrator"],  
    rights["AnotherLittleLamb"]         = ["Bureaucrat", "Administrator"], 
    rights["Stephanie Samara LeBlanc"]  = ["Bureaucrat", "Administrator", "SIMGM Crew Member"], 
    rights["Noirrodrigues"]             = ["SIMGM Cast Member"],  
    rights["Cyrus Arc"]                 = ["SIMGM Cast Member"],
    rights["DylanKidwell"]              = ["SIMGM Cast Member"],
    rights["SugaryDonught"]             = ["Wiki Team"],
    rights["WikiaBot"]                  = ["Bot"], 
    rights["Wikia"]                     = ["Bot"];
 
  // END List of Accounts Given Extra User Rights Icons
 
  // BEGIN Script to Remove Old Rights Icons & Insert New
 
    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[user].length; i < len; i++) {
 
        // add new rights
        $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
  // END Script to Remove Old Rights Icons & Insert New
 
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});
 
// END CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
// </source>

/********************************/
/* Auto-refresh by wikiactivity */
/********************************/
 
var	ajaxIndicator = ajaxIndicator || 'https://images.wikia.nocookie.net/__cb20100617113125/dev/images/e/e4/3D_throbber.gif',
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
 
 
/******************/
/* Inactive Users */
/******************/
 
InactiveUsers = { 
	months: 2
};
importScriptPage('InactiveUsers/code.js', 'dev');
 
 
/******************************/
/* No anonymous anons anymore */
/******************************/
 
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};
importScriptPage('RevealAnonIP/code.js', 'dev');