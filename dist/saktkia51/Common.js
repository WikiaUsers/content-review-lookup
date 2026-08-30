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
	// Adds some common functions to the environment. Required before anything else is loaded.
	localLoader('MediaWiki:BasicFunctions.js')
	.then(() =>{
	// [ Staff ]
	// Small stuff pertaining to Wiki Staff.
	localLoader('MediaWiki:Staff.js');

	// [ User Page Notice ]
	// Script for adding a notice to user sub-pages that the current page is not a main wiki article.
	localLoader('MediaWiki:UserPageNotice.js');

	// [ Default Upload Summary ]
	// Set a default value for file upload summaries on Special:Upload. Also allows the user to define a custom summary that applies to all uploads on the page.
	localLoader('MediaWiki:DefaultUploadSummary.js');

	// [ Main Page Search ]
	// Adds a search box to the main page to aid unfamiliar users with usage of Special:Search.
	localLoader('MediaWiki:MainPageSearch.js');

	// [ Exclusive Skins Daily Logger ]
	// Displays the current exclusive daily skin's various info according to the browser's detected time zone.
	// See also: https://saktkia51.fandom.com/wiki/Weapon_Skins
	localLoader('MediaWiki:ExclusiveSkinsDailyLogger.js');
	});
})();

// ----------------------------------------------------------------------------------------------------
// Other code
globalThis.BackToTopModern = true;

globalThis.lockOldComments = (globalThis.lockOldComments || {});
globalThis.lockOldComments.limit = 90;