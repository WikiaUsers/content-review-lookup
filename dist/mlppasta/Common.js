//************************************************
// Imported Scripts
//************************************************
 
importArticles({
	type:'script',
	articles: [
		'w:c:dev:UserTags/code.js',
                 'u:de.coc:MediaWiki:Common.js/Rating.js'
	]
});
 
//************************************************
// User Tag Config
//************************************************
 
//*** Make New Tags
 
window.UserTagsJS = {
	modules: {},
	tags: {
        bureaucrat: { u: 'Master of Bureau'},
        bot: { link:'Schinkenbot', order:1 },
		sysop: { u: 'Jerk (Admin)', order:2 },
		'inactive': { u: 'KIA (Killed in action)', order:11 },
		'fired': { u: 'Deserted', order:12 },
        'blocked': { u: 'No Ticket!', order: 25},
	}
};

//*** Tags New Accounts
UserTagsJS.modules.autoconfirmed = true;
 
//*** Tags New Users - <10 Days or <30 Edits
UserTagsJS.modules.newuser = {
	namespace: 0, 
	computation: function(days, edits) { return days < 10 && edits < 30; }
};
 
//*** Tags Inactive Users - >=40 Days 
UserTagsJS.modules.inactive = {
	days: 40,
	namespaces: [0]
};
 
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'chatmoderator', 'rollback', 'bannedfromchat', 'bot'];
 
UserTagsJS.modules.userfilter = {
	'User': ['tag you do not want to appear'],
};