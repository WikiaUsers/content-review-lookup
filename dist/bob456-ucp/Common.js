/* User Tags */

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		usermonth: { u:'User of the Month', order: -1/0 },
		discord: 'Discord Moderator',
		assistant: 'Assistant'
	}
};

UserTagsJS.modules.custom = {
    'The_Smarter,_Wiser_King_Dedede': ['assistant'],
    'FireMatch': ['assistant'],
    'Thelxinoe': ['assistant'],
    'Chickenkrispies': ['discord'],
    'Idroppedmypen': ['discord'],
    'Minnesotaman2007!': ['discord'],
    'TheJasbre202': ['discord']
};

UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'patroller', 'rollback', 'bannedfromchat', 'bot', 'bot-global', 'assistant', 'moderator'];