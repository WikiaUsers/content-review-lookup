/* Credits to Avatar and Dev Wiki */
 
// UserBadges settings
window.UserBadgesJS = {
	inactive: 30,          // Inactive if no edits in this many days, 0=disabled
	gone: {'Some User Name':true}, // List of users who have formally left or are taking a break but it hasn't been 'inactive' days yet
//      example - gone: {'Some User Name':true, 'Some Other User':true},
	groups: { bureaucrat:1, patroller:1, rollback:1, chatmoderator:1 },
	stopBlocked: true,     // Don't display any non-custom tags for blocked users
	newusers: true,        // Tag non-autoconfirmed users (MW1.19 only)
	nonusers: true,        // Tag global Wikia accounts that have never edited anything
	custom: { },    // Custom tags for users
//      example - custom: { 'UserName 1': ['My Badge 1', 'My Badge 2'], 'UserName 2': ['Other Badge'] },
	names: {},             // Tags display names
	debug: false           // Extra debugging messages in the console
}

/* Any JavaScript here will be loaded for all users on every page load. */

/* collapsible */
importScriptPage('ShowHide/code.js', 'dev');

/* Collapsible classes
 * See w:c:dev:ShowHide for info and attribution
 */

importScriptPage('Countdown/code.js', 'dev');

importScriptPage('ShowHide/code.js', 'dev');