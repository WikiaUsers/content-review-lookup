/* Any JavaScript here will be loaded for all users on every page load. */

/* ShowHide */

var ShowHideConfig = { 
    brackets: '[[]]'
};
importScriptPage('ShowHide/code.js', 'dev');

/* Tweaks */
importArticles({
	type: "script",
	articles: [
		"w:dev:PurgeButton/code.js", /* Add "purge" option to page controls */
		"MediaWiki:Common.js/disableforumedit.js", /* Discourage/disable the editing of forum archives */
		"MediaWiki:Common.js/disablecommentsblogs.js", /* Disable blog comments on old blog posts */
		"MediaWiki:Common.js/wallgreetingbutton.js", /* Add a button to edit Message Wall Greeting */
		"MediaWiki:Common.js/insertusername.js", /* User name replace for Template:USERNAME */
		"MediaWiki:Common.js/preload.js", /* Template preloads */
	]
});