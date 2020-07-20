/* Any JavaScript here will be loaded for all users on every page load. */
window.UserBadgesJS = {
	inactive: 14, // Inactive if no edits in this many days, 0=disabled
	gone: {}, // List of users who have formally left but it hasn't been 'inactive' days yet
	groups: { bureaucrat:true, patroller:1, rollback:1, chatmoderator:1 },
	stopBlocked: true, // Don't display any non-custom badges for blocked users
	newusers: no, // Tag non-autoconfirmed users (MW1.19 only)
	nonusers: true, // Tag global Wikia accounts that have never edited anything
	custom: { 'GleamingAmethyst': ['COMPLETE VORE TRASH', 'THE FOUNDER', 'I ALSO WANNA HUG AMETHYST'], 'AbyssalFate': ['Dreemurr Memer'] }, // Map of user names to arrays of strings
	names: {} // Badge display names
importArticle({type:'script', article:'w:c:dev:UserBadges/code.js'});

/* User Tags */
// User Tags
window.UserTagsJS = {
	modules: {
		inactive: 30,
		mwGroups: [
            'bureaucrat',
            'chatmoderator',
            'rollback',
            'sysop',
            'bannedfromchat',
            'bot',
            'bot-global'
        ],
		autoconfirmed: false,
		metafilter: {
			sysop: ['bureaucrat'],
			chatmoderator: ['sysop'],
			rollback: ['sysop'],
			contentmoderator: ['mod'],
		},
		newuser: true,
	},
    tags: {
		handy: { u: 'miette', order: 2 },
		handy: { u: 'shope', order: 2 },
		handy: { u: 'chansey princess', order: 2 }
    }
};
 
UserTagsJS.modules.custom = {
	"Shope-Santiago": ['sysop', 'miette', 'shope', 'chansey princess']