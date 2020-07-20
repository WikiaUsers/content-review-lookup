/* Any JavaScript here will be loaded for all users on every page load. */

/* JavaScript User Tags */
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
 
window.UserTagsJS = {
	modules: {},
	tags: {
		founder: { order: 0 },
		bureaucrat: { order: 1 },
		sysop: {order: 2}
	}
};
UserTagsJS.modules.custom = {
	'ColColton': ['founder'] // NOTE: order of list here does NOT matter
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});