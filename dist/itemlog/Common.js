/*Javascript applied here will apply to all skins*/
//Import Articles
importArticles({
	type: "script",
	articles: [
		"u:dev:DynamicImages/code.js",
		"MediaWiki:Common.js/Usertags.js",
		"MediaWiki:Common.js/summaries.js",
		"w:c:dev:BackToTopButton/code.js",
		"MediaWiki:Common.js/displayTimer.js",
		"w:dev:WallGreetingButton/code.js",
		"w:c:dev:Countdown/code.js",
		"w:c:dev:TimedSlider/code.js",
		"u:dev:SearchSuggest/code.js",
		"MediaWiki:Common.js/MainPageUpload.js",
		"MediaWiki:Common.js/Username.js",
		"MediaWiki:Common.js/Emote.js",
		"MediaWiki:Common.js/B3.js"

	]
});


window.ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions", "Special:WikiActivity"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');