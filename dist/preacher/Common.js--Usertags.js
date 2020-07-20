/* Any JavaScript here will be loaded for all users on every page load. */
/* UserTags */
 
window.UserTagsJS = {
	modules: {},
	tags: {
		Founder: { u: 'Founder', order: 100 },
		sysop: { order: 1 } // Normal order is 0
	}
};
 
UserTagsJS.modules.custom = {
	'TimeShade': ['sysop'] // NOTE: order of list here does NOT matter
};
UserTagsJS.modules.mwGroups = ['sysop'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});