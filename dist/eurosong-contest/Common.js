window.UserTagsJS = {
	modules: {},
	tags: {
		inactive: { u: 'Inactive user', order:-1/0 },
		contentmod: { u: 'Content Moderator' },
		bot: { u: 'Bot' },
		rollback: { u: 'Rollback' },
		crat: { u: 'Bureaucrat' },
		sysop: { u: 'Administrator' },
		botowner: { u: 'Bot Owner' },
		
	}
};

UserTagsJS.modules.newuser = {
	days: 10,
	edits: 25,
	namespace: 0
};

UserTagsJS.modules.custom = {
	'BOTofwales': ['bot'],
	'Liamholton1': ['inactive'],
	'Roseofwales': ['botowner'],
	'Snigmss': ['inactive'],
	'The CoroWhovian': ['inactive'],
	'TheEngineer33': ['inactive'],
	'ShakiraWow': ['inactive'],
	'Sfinn85': ['contentmod','rollback'],
	'Tibureta': ['rollback'],
	'Gleekygal2010': ['rollback','crat']
	
};