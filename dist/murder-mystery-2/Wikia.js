window.UserTagsJS = {
	modules: {},
	tags: {
        bureaucrat: { order: 97},
        sysop: { u: 'Murderer', order: 98},
	    'content-moderator': { u: 'Sheriff', order: 99},
        chatmoderator: { u: 'Sheriff', order: 99},
        threadmoderator: { u:'Sheriff', order: 99},
	    discord: { u: 'Discord Moderator', order: 100},
		jshelper: { u: 'JavaScript', order: 101},
		csshelper: { u: 'CSS', order: 102}
	}
};

UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.custom = {
	'BemuTheDuck': ['content-moderator'],
	'Ldoe Master': ['discord', 'sysop'],
	'Parkour2906': ['csshelper', 'jshelper', 'discord', 'sysop'],
    'Realify': ['sysop'],
    'Vinexyrd': ['content-moderator']
};