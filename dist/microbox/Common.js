importArticle({type:'script', article:'w:c:dev:UserBadges/code.js'});
window.UserBadgesJS = {
	inactive: 30, // Inactive if no edits in this many days, 0=disabled
	gone: {}, // List of users who have formally left but it hasn't been 'inactive' days yet
	groups: { bureaucrat:1, patroller:1, rollback:1, chatmoderator:1 },
	stopBlocked: true, // Don't display any non-custom badges for blocked users
	newusers: true, // Tag non-autoconfirmed users (MW1.19 only)
	nonusers: true, // Tag global Wikia accounts that have never edited anything
	custom: {}, // Map of user names to arrays of strings
	names: {}, // Badge display names
	debug: false // Extra debugging messages in the console
window.UserBadgesJS = {
	custom: {
		'Emperor Andrew': ['JavaScript', 'CSS', 'Templates'],
                'SaluteChicken': ['King of the Hill', 'KFC', ''],

		// List more users here
	}
};