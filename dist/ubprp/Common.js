/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: "script",
    articles: [
        'u:dev:DisplayClock/code.js',
        'u:dev:MessageWallUserTags/code.js',
	'w:c:dev:UserTags/code.js',
	'MediaWiki:Common.js/minx.js'
    ]
});

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
	Rebun: { u:'Nope' },
	DB: { u:'Cosmic Mustache Guy' },
	Bureaucrat: { u:'Bureaucrat' }
	}
};

UserTagsJS.modules.custom = {
	'Rebun123': ['Rebun'],
    'DB511611': ['DB'],
}

UserTagsJS.modules.mwGroups = ['bureaucrat', 'moderator', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global', 'newuser'];
UserTagsJS.modules.metafilter = { sysop: ['bureaucrat', 'founder'], chatmoderator: ['sysop', 'bureaucrat', 'rollback'], rollback: ['sysop'], newuser: ['chatmoderator', 'bannedfromchat', 'newuser'] };
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.isblocked = true;
UserTagsJS.modules.inactive = 30; // 30 days
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.userfilter = {
};

importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:LastEdited/code.js',
        // ...
    ]
});

window.lastEdited = {
    avatar: true,
    size: true,
    diff: true,
    comment: false,
    time: 'timeago',
    lang: 'en',
    namespaces: {
        include: [],
        exclude: []
    },
    pages: []
};