/*================================================================================

			Common.js on BlazBlue Wiki. Original: Gothicpedia

   Placed here JavaScript will be loaded by every user, during page loading.

===============================================================================*/


//===============================================================================
// SCRIPT IMPORT
// In the last line don't put a comma!
//===============================================================================

importArticles({
	type: "script",
	articles: [
// Scripts on Wiki
	"MediaWiki:Common.js/userTags.js",			/* Descriptions of users groups in the user profile */
	"MediaWiki:Common.js/articleDropdown.js",	/* Additional options for dropdown menu */
	"MediaWiki:Common.js/slider.js",			/* New slider */
	"MediaWiki:Common.js/sliderjQuery.js",		/* Slider jQuery by Tierrie */
	"MediaWiki:Common.js/userIP.js",			/* Show IP address */
	"MediaWiki:Common.js/player.js",			/* Player */
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