/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
	type: 'script',
	articles: [
		// Adds a Clock above Contribute Button
		'u:dev:DisplayClock/code.js',
		// Extends Navigation to Level 4 & 5
                'u:dev:ExtendedNavigation/code.js'
	]
});

/* Renames Purge Button */
PurgeButtonText = 'Purge';

/* Adds Purge Button under Edit */
importScriptPage('PurgeButton/code.js', 'dev');