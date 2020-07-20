// customizations that work with the UserTags import from dev

window.UserTagsJS = {
	modules: {},
	tags: {
		head: { u:'Headmistress', m:'Headmaster', order:-1/0 },
		inactive: { title: 'The user hasn\'t edited for the last 60 days' }
	}
};
UserTagsJS.modules.inactive = 60;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'chatmoderator', 'patroller', 'rollback', 'bannedfromchat', 'bot', 'bot-global'];

UserTagsJS.modules.metafilter = {};

UserTagsJS.modules.custom = {
	'KylaraE': ['head']
};