/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		founder: { u:'K (Founder)' },
		bureaucrat: { u:'CC (Bureaucrat)' },
		administrator: { u:'Gus (Administrator)' },
		inactive: { u: 'Offline' },
		featured: { u: 'Featured User' },
		weekeditor: { u: 'Editor of the Week' },
		montheditor: { u: 'Editor of the Month'},
		templates: { u: 'Templates Guru'}
	}
		
		
};

UserTagsJS.modules.newuser = {
	days: 1, // Must have been on the Wiki for 1 day
	edits: 10, // And have at least 10 edits to remove the tag
};