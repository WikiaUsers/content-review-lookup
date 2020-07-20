/* Any JavaScript here will be loaded for all users on every page load. */
 
importArticles({
	type: "script",
	articles: [
		"w:dev:ShowHide/code.js", /* Collapsible elements and tables */
		"w:dev:PurgeButton/code.js", /* Add "purge" option to page controls */
		"w:dev:Countdown/code.js", /* Countdown clock */
		"MediaWiki:Common.js/icons.js", /* Adds icons to page header bottom border */
	]
});