/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {
		creator: { u: 'KyaJuVerse Creator', order:100 },
		wikifounder: { u: 'Wiki Founder', order:101 },
		bureaucrat: { u: 'Wiki Naukarashaah'},
		sysop: { u: 'Wiki Prashaasak'},
		discordsysop: { u: 'Discord Prashaasak'}
	},
};

UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;

// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = [
    'founder',
    'bureaucrat',
    'chatmoderator',
    'patroller',
    'rollback',
    'sysop',
    'bannedfromchat',
    'bot',
    'bot-global'

];

UserTagsJS.modules.userfilter = {
	'ThatMinecrafterDJ': ['founder'] // Remove the founder group
};
UserTagsJS.modules.custom = {
	'KyaOBeans': ['creator', 'wikifounder', 'discordsysop'],
	'Konig Ju1': ['creator', 'wikifounder', 'discordsysop']
};
UserTagsJS.modules.metafilter = {
	bureaucrat: ['creator'], // Remove bureaucrat group from people with Creator Group
	chatmoderator: ['sysop', 'bureaucrat'], // Remove chatmoderator group from people with Administrator and Bureaucrat group
	sysop: ['bureaucrat', 'creator'], // Remove Administrator group from people with bureaucrat and founder group
};