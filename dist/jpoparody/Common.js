/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};
UserTagsJS.modules.prefLanguages = true;
UserTagsJS.modules.prefCoding = true;
importArticles({
	type:'script',
	articles: [
		// ...
		'w:c:dev:UserTags/code.js',
		// ...
	]
});