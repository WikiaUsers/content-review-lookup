/* Any JavaScript here will be loaded for all users on every page load. */
/* User Tags */
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Bureaucrat' },
		sysop: { u: 'Admin' }
	}
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat', 'founder'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});