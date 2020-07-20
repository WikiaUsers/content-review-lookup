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
		montheditor: { u:'Editor of the Month' },
		featured: { u:'Featured' },
		templates: { u:'Templates Guru' }
	}
};

window.UserTagsJS = {
	modules: {},
	tags: {
		montheditor: { u:'Editor of the Month', order:-1/0 },
		featured: 'Featured',
		templates: 'Templates Guru'
	}
};

window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Bureaucrat Tag', link:'Project:Bureaucrats' },
		inactive: { u: 'Has not edited recently' }
	}
};

window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { link:'Project:Bureaucrats', order:1e101 }
	}
};

window.UserTagsJS = {
	modules: {},
	tags: {
		// DON'T DO THIS, IT WILL NOT WORK
		bot-global: { link:'Project:Bots' }
 
		// THIS WILL WORK
		'bot-global': { link: 'Project:Bots' }
	}
};