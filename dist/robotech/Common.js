/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
	type: "script",
	articles: [
		"w:dev:ShowHide/code.js", /* Collapsible elements and tables */
/*		"MediaWiki:Common.js/addnavlinks.js", *//* Add "about us" and IRC links to "On the Wiki" menu */
		"MediaWiki:Common.js/icons.js", /* Adds icons to page header bottom border */
	]
});

/* InactiveUsers
 * Adds an "inactive" tag to the user pages, user talk pages, message walls and blog pages of users who haven't made an edit of any sort for some time
 * See w:c:dev:InactiveUsers for info and attribution
 */

InactiveUsers = { 
	months: 2
};
importScriptPage('InactiveUsers/code.js', 'dev');

/* Resolves conflict between icons and page header bottom border
 * by: [[User:The 888th Avatar]]
 */
 
$(document).ready(function() {
    if (skin == "oasis" || skin == "wikia") {
        $('.WikiaPageHeader').append($('#icons'));
    }
});