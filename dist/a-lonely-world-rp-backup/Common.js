/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
 AjaxRCRefreshText = 'Auto-Refresh';
 AjaxRCRefreshHoverText = 'Automatically refresh the page';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
 importScriptPage('AjaxRC/code.js', 'dev');

importArticles({
	type: "script",
	articles: [
		"u:dev:DynamicImages/code.js",
		"MediaWiki:Common.js/Usertags.js",
		"MediaWiki:Common.js/summaries.js",
		"w:c:dev:BackToTopButton/code.js",
		"MediaWiki:Common.js/displayTimer.js",
		"w:dev:WallGreetingButton/code.js",
		"w:c:monchbox:MediaWiki:Torus.js",
		"w:c:dev:Countdown/code.js",
		"w:c:dev:TimedSlider/code.js",
		"u:dev:SearchSuggest/code.js",
		"MediaWiki:Common.js/MainPageUpload.js",
		"MediaWiki:Common.js/Username.js",
		"MediaWiki:Common.js/Emote.js",
		"MediaWiki:Common.js/plok.js",
		"MediaWiki:Common.js/B3.js",
		"w:c:dev:DisplayClock/code.js"
 
	]
});