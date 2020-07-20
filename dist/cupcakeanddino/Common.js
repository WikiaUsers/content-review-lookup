var username = wgUserName;
if (username) {$('.InputUsername').text(username);}

window.UserTagsJS = {
	modules: {},
	tags: {
		discordfounder: { u:'Discord Founder' },
		discordadmin: { u:'Discord Admin' },
		discordmod: { u:'Discord Moderator' }
	}
};

UserTagsJS.modules.custom = {
	'Hairypoppins': ['discordfounder', 'discordadmin']
};