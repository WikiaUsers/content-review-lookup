/* Any JavaScript here will be loaded for all users on every page load. */

importArticle({type:'script', article:'w:c:dev:UserBadges/code.js'});

window.UserBadgesJS = {
	inactive: 30, // Inactive if no edits in this many days, 0=disabled
	gone: {}, // List of users who have formally left but it hasn't been 'inactive' days yet
	groups: { bureaucrat:1, patroller:1, rollback:1, chatmoderator:1 },
	stopBlocked: true, // Don't display any non-custom badges for blocked users
	newusers: true, // Tag non-autoconfirmed users (MW1.19 only)
	nonusers: true, // Tag global Wikia accounts that have never edited anything
	custom: { '900bv': ['2edgy', 'uwot'], 'Bumblebeeprime09': ['xXxL33T5C0P3Z420BL4Z3ITF4G1TxXx'] }, 
	names: {} // Badge display names
}