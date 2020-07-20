/* Any JavaScript here will be loaded for all users on every page load. */

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/* Code imported from: [[w:c:dev:UserBadges]]*/
 
window.UserBadgesJS = {
	inactive: 30, 
	gone: {}, 
	groups: { bureaucrat:1, patroller:1, rollback:1, chatmoderator:1, bot:1, autoconfirmed:0 },
	stopBlocked: true, 
	newusers: true, 
	nonusers: true, 
	custom: {}, 
	names: {
		patroller: 'Patroller',
		rollback: 'Rollback',
		newuser: 'New User',
		inactive: 'Inactive',
		nonuser: 'No edits yet'
	} 
}

UserTagsJS.modules.inactive = 30; // 50 days

UserTagsJS.modules.newuser = {
	days: 3,
	edits: 10,
	namespace: 0
};