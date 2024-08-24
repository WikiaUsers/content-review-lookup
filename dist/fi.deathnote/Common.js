/* T‰m‰n sivun JavaScript-koodi liitet‰‰n jokaiseen sivulataukseen */

window.UserTagsJS = {
	modules: {},
	tags: {
		inactive: {
			title: 'The user hasn\'t edited for the last 60 days'
		}
	},
};
UserTagsJS.modules.inactive = 60;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'],
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat'],
};