window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		charwork: { u:'Character Worker' },
	}
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

UserTagsJS.modules.custom = {
	'The Symphonic Taco': ['charwork'], // Add Character Worker
};