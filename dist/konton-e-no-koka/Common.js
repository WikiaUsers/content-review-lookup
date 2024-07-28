window.UserTagsJS = {
	modules: {},
	tags: {
		'Helper': { u: 'Top Contributor', order: 100 },
		'Enforcer': { u: 'Editor of The Month', order: 101 },
		'Enforcer2': { u: 'Featured Editor', order: 101 },
		bureaucrat: { order: 1 } // Normal order is 0
	}
};

UserTagsJS.modules.custom = {
	'Kirumin': ['Helper', 'Enforcer', 'Enforcer2'] // NOTE: order of list here does NOT matter
};