/* Any JavaScript here will be loaded for all users on every page load. */
/* Special thanks to Alice wiki for inspiration. */
importScriptPage('DisplayClock/code.js', 'dev');
importScriptPage('PurgeButton/code.js', 'dev');
importArticles({
    type: 'script',
    articles: [
		"u:dev:BackToTopButton/code.js", /* Back to top button */
                "u:dev:ReferencePopups/code.js", /* Reference popups*/
		"u:dev:DupImageList/code.js", /* Lists dup images */
		"MediaWiki:Common.js/imports.js", /* UserTags, AjaxRC */
		
    ]
});