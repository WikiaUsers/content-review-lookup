/*================================================================================
 
			Common.js on BlazBlue Wiki. Original: Gothicpedia
 
   Placed here JavaScript will be loaded by every user, during page loading the page.
 
===============================================================================*/
 
//===============================================================================
// SCRIPT IMPORT
// In the last line don't put a comma!
//===============================================================================
 
importArticles({
	type: "script",
	articles: [
	"MediaWiki:Common.js/articleDropdown.js",	/* Additional options for dropdown menu */
	"MediaWiki:Common.js/userIP.js",			/* Show IP address */
	"MediaWiki:Common.js/ajax.js",              /* Auto-refresh */
	"MediaWiki:Common.js/SoundNotifications.js",/* Sound notifications about new replies */
	]
});