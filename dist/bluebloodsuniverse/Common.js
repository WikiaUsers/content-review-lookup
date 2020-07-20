/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
	type: "script",
	articles: [
		"w:dev:ShowHide/code.js", /* Collapsible elements and tables */
		"w:dev:PurgeButton/code.js", /* Adds "purge" option to page controls */
		"w:dev:Countdown/code.js", /* Countdown clock */
	]
});

importArticles({
	type: 'script',
	articles: [
		'u:dev:ExtendedNavigation/code.js' /* Extends nav bar */
	]
});