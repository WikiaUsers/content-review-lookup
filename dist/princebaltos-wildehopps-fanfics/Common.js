/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
	type: "script",
	articles: [
		"w:dev:ShowHide/code.js", /* Collapsible elements and tables */
		"w:dev:PurgeButton/code.js", /* Add "purge" option to page controls */
		"w:dev:Countdown/code.js", /* Countdown clock */
		"w:runescape:MediaWiki:Common.js/standardeditsummaries.js", /* Standard edit summaries */
		"MediaWiki:Common.js/imports.js", /* InactiveUsers and AjaxRC */
		"MediaWiki:Common.js/randompagelink.js", /* Special:Random > Special:Random/main in navigation */
		"MediaWiki:Common.js/disableforumedit.js", /* Discourage/disable the editing of forum archives */
		"MediaWiki:Common.js/disablecommentsblogs.js", /* Disable blog comments on old blog posts */
	]
});

jQuery('.achievementbox').mouseover(function() {
   jQuery("div", this).show();
});
 
jQuery('.achievementbox').mouseout(function() {
   jQuery("div", this).hide();
});

/* Template:USERNAME */

var username = wgUserName;
if (username) {$('.InsertUsername').text(username);}