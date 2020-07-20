/* Any JavaScript here will be loaded for all users on every page load. */
/* User Tags config */
UserTagsJS.modules.inactive = {
	days: 60,
	namespaces: [0],
	zeroIsInactive: true 
};

UserTagsJS.modules.newuser = {
	days: 7,
	edits: 10,
	namespace: 0 
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'bot', 'rollback', 'chatmoderator', 'content-moderator'];

window.UserTagsJS = {
	modules: {},
	tags: {
	    bureaucrat: { link:'Project:Administrators' },
	    sysop: { link:'Project:Administrators' },
	    newuser: { u: 'New User', link:'Help:New to the Wiki?' },
	    'bot-global': { link: 'Project:Bots' },
	    bot: { link:'Project:Bots' },
		inactive: { u: 'Inactive' }
	}
};

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});