/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		montheditor: { u:'Editor of the Month' },
		featured: { u:'Featured' },
		templates: { u:'Templates Guru' }
	}
};