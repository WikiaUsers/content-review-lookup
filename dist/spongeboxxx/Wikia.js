window.UserTagsJS = {
	modules: {},
	tags: {
 
		VRCOC: { order: 1 }
	}
};
UserTagsJS.modules.custom = {
	'Fatal Disease': ['VCROC'] // NOTE: order of list here does NOT matter
};
UserTagsJS.modules.mwGroups = ['VCROC'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});