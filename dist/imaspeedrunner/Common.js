/* Any JavaScript here will be loaded for all users on every page load. */

/* Propeties for HighlightUsers javascript */

highlight = {
    selectAll: false,
    sysop: '#DEBE40',
    bot: '#6AC944',
    users: {}
};

/* Propeties for UserTags javascript. Please read the documentation before editing. */

window.UserTagsJS = {
	modules: {},
	tags: {
        'chat-sysop' : { u: 'Chat-Admin' }
        }
};

// UserTag Modules

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'bot', 'bot-global', 'bannedfromchat', 'chatmoderator', 'blocked'];

UserTagsJS.modules.inactive = {
	days: 30,
	zeroIsInactive: true
};

UserTagsJS.modules.implode = {
	'chat-sysop': ['chatmoderator', 'sysop']
};

UserTagsJS.modules.metafilter = {
	'sysop': ['bureaucrat'], // Remove "Admin" tag from bureaucrats
        'founder': ['bureaucrat'],
        'bot-global': ['bot']
};

/* Import scripts from local article on other wikis */
importArticles({
    type: "script",
    articles: [
        "u:dev:Countdown/code.js",
        "u:dev:UserTags/code.js",
        "u:dev:HighlightUsers/code.js",
        "u:dev:QuickDelete/code.js"
    ]
});

/* ImageMapEdit by Dapete. */
importScriptURI('//tools.wmflabs.org/imagemapedit/ime.js');