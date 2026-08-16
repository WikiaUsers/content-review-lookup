// ----------------------------------------------------------------------------------------------------
// Imports

(function() {
	"use strict";
	
	function localLoader(title) {
		const baseURL = 'https://saktkia51.fandom.com/index.php';
		const params = new URLSearchParams({
			title:title,
			action:'raw',
			ctype:'text/javascript',
		});
		return mw.loader.getScript(`${baseURL}?${params}`);
	};
	// [ Basic Functions ]
	// Adds some common functions.
	localLoader('MediaWiki:BasicFunctions.js')
	.then(function() {
	// [ Staff ]
	// Small stuff pertaining to Wiki Staff.
	return localLoader('MediaWiki:Staff.js');
	
	}).then(function() {
	// [ User Page Notice ]
	// Script for adding a notice to user sub-pages that the current page is not a main wiki article.
	return localLoader('MediaWiki:UserPageNotice.js');
	
	}).then(function() {
	// [ Default Upload Summary ]
	// Set a default value for file upload summaries on Special:Upload. Also allows the user to define a custom summary that applies to all uploads on the page.
	return localLoader('MediaWiki:DefaultUploadSummary.js');
	
	}).then(function() {
	// [ Main Page Search ]
	// Adds a search box to the main page to aid unfamiliar users with usage of Special:Search.
	return localLoader('MediaWiki:MainPageSearch.js');
	
	}).then(function() {
	// [ Exclusive Skins Daily Logger ]
	// Displays the current exclusive daily skin's various info according to the browser's detected time zone.
	// See also: https://saktkia51.fandom.com/wiki/Weapon_Skins
	return localLoader('MediaWiki:ExclusiveSkinsDailyLogger.js');
	});
})();

// ----------------------------------------------------------------------------------------------------
// Other code
window.BackToTopModern = true;

window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 90;