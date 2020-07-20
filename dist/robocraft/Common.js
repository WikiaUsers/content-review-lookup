/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
	type: 'script',
	articles: [
//              'MediaWiki:Archived.js',                // A list of obsolete scripts.
		'u:zh.pad:MediaWiki:CountDown.js',	// countdown
//		'MediaWiki:CountDowndi.js',
//		'MediaWiki:CountDownred.js',
//              'u:dev:ReferencePopups/code.js',        // pop up
//		'u:dev:DupImageList/code.js',		// http://dev.wikia.com/wiki/DupImageList
//		'u:dev:EditIntroButton/code.js',	// Add "Edit Intro" button to articles
//		'u:dev:ExternalImageLoader/code.js',	// Allow adding remotely hosted images {{Img}}
//		'u:dev:Countdown/code.js',		// http://dev.wikia.com/wiki/Countdown
//		'u:dev:DisplayClock/code.js',		// Top right corner clock.
//		'u:dev:BackToTopButton/code.js'		// Back to top button at bottom.
	]
}, {
	type: 'style',
	articles: [
//              'MediaWiki:Archived.css',               // A list of obsolete styles.
//		'u:zh.pad:MediaWiki:CountDown.css',
//		'MediaWiki:CountDowndi.css',
		'MediaWiki:CountDownred.css',
	]
});