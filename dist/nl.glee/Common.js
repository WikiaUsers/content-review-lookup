importArticles({
	type: 'script',
	articles: [
                "w:dev:AjaxRC/code.js",
                "w:dev:ShowHide/code.js", 
                "w:dev:BackToTopButton/code.js", 
		"w:dev:WallGreetingButton/code.js", 
                "w:dev:FileUsageAuto-update/code.js",
		"w:dev:Countdown/code.js",
		"w:dev:AjaxRC444/code.js",
                "w:dev:AutoEditDropdown/code.js",
                "w:dev:FixMultipleUpload/code.js",
                "w:dev:DupImageList/code.js", 
                "w:dev:AjaxPatrol/code.js", 
                "w:dev:InactiveUsers/code.js",
                "w:dev:MiniComplete/code.js",
                "w:dev:RelatedDiscussionsModule/code.js", 
	]
});
 
/* Ajax auto-refresh */
window.ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
window.AjaxRCRefreshText = 'Auto-refresh';
window.ajaxRefresh = 30000;
 
/* Extra user rights icons */
function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons
 
    rights["WikiaBot"]              =   ["Bot"], 
    rights["Wikia"]                 =   ["Bot"],
    rights["UltravoX"]              =   ["Bureaucrat", "Administrator"];
 
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