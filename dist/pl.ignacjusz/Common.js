/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		steward: { u:'Steward', order:-1/0 },
	}
};

UserTagsJS.modules.custom = {
	'Podkomendy Felga': ['steward'],
};

UserTagsJS.modules.metafilter = {
	'inactive': ['sysop', 'bureaucrat','content-moderator'],
	'rollback': ['sysop'],
	'rollback': ['bureaucrat'],
	'rollback': ['content-moderator'],
	'bureaucrat': ['founder'],
	'sysop': ['founder', 'bureaucrat']
	// Remove chat moderator from admins as well as users who have BOTH patroller AND rollback
};