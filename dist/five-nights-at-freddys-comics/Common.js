/* Any JavaScript here will be loaded for all users on every page load. */

window.DisplayClockJS = '%2H:%2M:%2S - %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';


importArticles({
    type: "script",
    articles: [
	'u:dev:DisplayClock/code.js',
	'w:c:dev:UserTags/code.js',
    ]
});

window.UserTagsJS = {
	modules: {},
	tags: {
	bureaucrat: { u:'Admin'},
        coder: { u:'CSS Coder'},
        founder: { u:'Founder'},
	}
};

UserTagsJS.modules.custom = {
	'Skyfuree': ['coder'],
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global', 'newuser'];
UserTagsJS.modules.metafilter = { sysop: ['bureaucrat', 'founder'], chatmoderator: ['sysop', 'bureaucrat', 'rollback'], rollback: ['sysop'], newuser: ['chatmoderator', 'bannedfromchat', 'newuser'] };
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.isblocked = true;
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.userfilter = {
	"Dawnstar's Account": ['sysop'],
};