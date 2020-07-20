/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
	type: 'script',
	articles: [
		// ...
		'u:dev:DisplayClock/code.js',			// Warframe wiki styled UTC clock.
		'u:dev:BackToTopButton/code.js',		// Back to top button at bottom.
		'u:dev:ExtendedNavigation/code.js',		// Level 4 and 5 Navbar menus.
		'u:dev:LastEdited/code.js'			// Show who last edited an article on every page.
		// ...
	]
});