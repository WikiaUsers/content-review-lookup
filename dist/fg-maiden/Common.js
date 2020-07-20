/* Any JavaScript here will be loaded for all users on every page load. */

/* Pinto */

window.UserTagsJS = {
	modules: {},
	tags: {
		a: { u: 'Test Tag 1', order:1 },
		b: { u: 'Test Tag 2', order:2 },
		c: { u: 'Test Tag 3', order:3 },
		d: { u: 'Test Tag 4', order:4 },
		e: { u: 'Test Tag 5', order:5 }
	},
	oasisPlaceBefore: '> h1'
};
UserTagsJS.modules.custom = {
	'Sunny_Kelin': ['a', 'b', 'c', 'd', 'e', 'inactive']
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});