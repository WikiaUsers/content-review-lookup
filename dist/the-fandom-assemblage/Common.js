window.UserTagsJS = {
	modules: {},
	tags: {
		foundertag: 'Founder',
		dictator: 'Wiki Dictator',
		customtagw: 'An (Yet To Be) Official Scientist',
		comm: 'Communist',
		nazi: 'Grammar Nazi'
	}
};

UserTagsJS.modules.custom = {
	'TheGalacticBlueJay': ['foundertag', 'dictator', 'nazi'],
	'DoctorHopper': ['foundertag', 'comm', 'customtagw']
};

UserTagsJS.modules.metafilter = {
	'inactive': ['sysop', 'bureaucrat'],
	'sysop': ['bureaucrat'],
	'chatmoderator': ['sysop', ['patroller', 'rollback']]
};