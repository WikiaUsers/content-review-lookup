window.UserTagsJS = {
	modules: {},
	tags: {
		newuser: 'New Recruit',
		inactive: 'Missing in Action',
		cataloger: 'Weapon Cataloger',
		'chat-regular': 'Tavern Regular',
		'plural-bureaucrat': 'Volunteer Army Brigadiers',
		'inactive-bureaucrat': 'Missing Brigadier',
		'inactive-sysop': 'Missing Colonel',
		'inactive-founder': 'Missing General',
		'inactive-newuser': 'Missing Recruit'
	}
};
// Add custom groups to users
UserTagsJS.modules.custom = {
    'KodachiZero': ['plural-bureaucrat'],
	'SpaceCobra31': ['cataloger'],
	'RenChronomio': ['chat-regular']
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 10; // Inactive if no edits in 10 days
UserTagsJS.modules.mwGroups = ['bureaucrat']; // Add bureaucrat group to bureaucrats
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat'], // Remove administrator group from bureaucrats
	founder: ['sysop'], // Remove sysop group from founder
	chatmoderator: ['inactive'],
	'chat-regular': ['inactive']
};
UserTagsJS.modules.userfilter = {
	'Derpmaci': ['inactive'], // Derpmaci is never inactive, even when it is
	'KodachiZero': ['bureaucrat', 'inactive'] // Kodachi & Zero are never inactive, even when they are. Additionally, plural bureaucrat form instead of singular.
};
UserTagsJS.modules.implode = {
	'inactive-bureaucrat': ['bureaucrat', 'inactive'],
	'inactive-founder': ['founder', 'inactive'],
	'inactive-sysop': ['sysop', 'inactive'],
	'inactive-newuser': ['newuser', 'inactive']
};