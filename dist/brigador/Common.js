/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ExtendedNavigation/code.js',   // Level 4 Nav for MediaWiki:Wiki-navigation
        'u:dev:MediaWiki:EditIntroButton/code.js',      // Add "Edit Intro" button to articles
        'u:dev:MediaWiki:DisplayClock/code.js',         // Top right corner clock.
        'u:dev:MediaWiki:BackToTopButton/code.js'      // Back to top button at bottom.
	]
});