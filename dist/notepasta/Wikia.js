window.UserTagsJS = {
	modules: {},
	tags: {
		Bureaucrat: { order: 1 }
	}
};
UserTagsJS.modules.custom = {
	'Fatal_Disease': ['bureaucrat', 'sysop'] // NOTE: order of list here does NOT matter
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});