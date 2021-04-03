/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
	type: 'script',
	articles: [
		// Adds a Clock above Contribute Button
		'u:dev:DisplayClock/code.js',
		// Extends Navigation to Level 4 & 5
        'u:dev:ExtendedNavigation/code.js',
        /* Adds Purge Button under Edit */
        'u:dev:PurgeButton/code.js',
        /* A Script for Collapsible Tables and Divs */
        'u:dev:ShowHide/code.js',
        /* Adds Back to Top Button to Oasis Footer*/
        'u:dev:BackToTopButton/code.js'
	]
});

/* Renames Purge Button */
PurgeButtonText = 'Purge';