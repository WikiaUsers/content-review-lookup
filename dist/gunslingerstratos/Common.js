/*================================================================================

			Common.js on Gunslinger Stratos Wiki. Original: Gothicpedia

   Placed here JavaScript will be loaded by every user, during page loading the page.

===============================================================================*/


//===============================================================================
// SCRIPT IMPORT
// In the last line don't put a comma!
//===============================================================================

importArticles({
	type: "script",
	articles: [
// Scripts on Wiki
	"MediaWiki:Common.js/facebook.js",			/* Facebook, that one on the right side */
	"MediaWiki:Common.js/userTags.js",			/* Descriptions of users groups in the user profile */
	"MediaWiki:Common.js/sourceButtons.js",		/* Additional buttons in source mode */
	"MediaWiki:Common.js/extraRollbacks.js",		/* Additional buttons for rollbackers - by Monchoman45 */ 
	"MediaWiki:Common.js/articleDropdown.js",	/* Additional options for dropdown menu */
	"MediaWiki:Common.js/slider.js",			/* New slider */
	"MediaWiki:Common.js/sliderjQuery.js",		/* Slider jQuery by Tierrie */
	"MediaWiki:Common.js/editSummaries.js",		/* Edit summaries */
	"MediaWiki:Common.js/addLicense.js",		/* Easy adding the license for uploaded files */
	"MediaWiki:Common.js/licences.js",			/* License select */
	"MediaWiki:Common.js/withoutLicense.js",		/* Warning for uploading files without license */
	"MediaWiki:Common.js/oldBlogPosts.js",		/* Block commenting for 90 days old blog posts */
	"MediaWiki:Common.js/userIP.js",			/* Show IP address */
	"MediaWiki:Common.js/ajax.js",			/* Auto-refresh */
	"MediaWiki:Gadget-ajaxbatchdelete.js",		/* Delete many files at once - taken from Polish Elder Scrolls Wiki */
	"MediaWiki:Common.js/playlist.js",		/* Delete many files at once - taken from Polish Elder Scrolls Wiki */
// Import scripts from other Wiki
	"u:dev:ShowHide/code.js",				/* Show or Hide */
	"u:dev:VisualSpellCheck/code.js",			/* Spellcheck in visual mode */
	"u:dev:BackToTopButton/code.js",			/* Back to top button */
	"w:dev:ReferencePopups/code.js",			/* References */
        "u:dev:ListFiles/code.js",				/* */
	"u:dev:DupImageList/code.js",			/* List of duplicated files */
	"u:dev:SearchSuggest/code.js",			/* Suggestions for search results */
	"u:dev:WallGreetingButton/code.js",			/* Edit button for greeting on Message Wall */
	"u:dev:ListAdmins/code.js",				/* Automatic update of list of admins and bureaucrats */
	"u:dev:LockOldBlogs/code.js"				/* Disables commenting on old blog posts */
	]
});