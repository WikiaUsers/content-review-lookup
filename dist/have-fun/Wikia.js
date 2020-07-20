window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { order: 1 }
	}
};
UserTagsJS.modules.custom = {
	'GodzillaFan1': ['bureaucrat'] // NOTE: order of list here does NOT matter
};
UserTagsJS.modules.mwGroups = ['bureaucrat'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'})