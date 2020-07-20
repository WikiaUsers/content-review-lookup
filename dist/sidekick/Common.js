/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
	    inactive: { u: 'Inactive' }
	},
	oasisPlaceBefore: ''
};
 
UserTagsJS.modules.inactive = 90; // 90 days
 
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});