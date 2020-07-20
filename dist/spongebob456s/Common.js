importArticles({
	type:'script',
	articles: [
		'w:c:dev:UserTags/code.js',
 
	]
});
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;
//************************************************
// User Tag Config - Credit: South Park Wiki
//************************************************
//*** Make New Tags
window.UserTagsJS = {
	modules: {},
	tags: {
                bureaucrat: { u: 'Bureaucrat' },
                bot: { u: 'Bot', order:1 },
		sysop: { u: 'Administrator', order:2 },
		rollback: { u: 'Rollback', order:3 },
		chatmoderator: { u: 'Moderator', order:4 },
		'inactivebcrat': { u: 'Inactive Bureaucrat', order:8 },
		'inactiveadmin': { u: 'Inactive Administrator', order:9 },
		'inactive': { u: 'Inactive User', order:10 },
		'fired': { u: 'Fired Administrator', order:11 }
	}
};