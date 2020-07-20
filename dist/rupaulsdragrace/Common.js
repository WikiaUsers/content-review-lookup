/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto Refresh */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

importScriptPage('MediaWiki:VideoIntegrator/VideoIntegrator.js', 'dev');

$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').text(mw.config.get('wgUserName'));
});

/* User Tags*/
window.UserTagsJS = {
	modules: {
        autoconfirmed: true,
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: true
        },
        mwGroups: [
            'bannedfromchat',
            'bureaucrat',
            'content-moderator',
            'bot',
            'rollback'
        ],
        newuser: true
    },
	tags: {
        bureaucrat: { u:'Glamazon',
            link: 'Special:ListUsers/bureaucrat'
        },
         sysop: { u:'Hunty',
            link: 'Special:ListUsers/sysop'
        },
         chatmoderator: {
            link: 'Special:ListUsers/chatmoderator'
        },
        threadmoderator: {
            link: 'Special:ListUsers/threadmoderator'
        },
        'wiki-manager': {
            link: 'Help:Wiki_Managers'
        },
        blocked: {
            link: 'Special:BlockList'
        },
        bot: {
            link: 'Special:ListUsers/bot'
        },
        'content-moderator': { u: 'Content Moderator', link: 'Special:ListUsers/content-moderator'
        },
        'rollback': { u: 'Rollback', link: 'Special:ListUsers/rollback'
        },
        Idekmandy: { u:'Drag Superstar'
        },
		QueenBela: { u:'Jinkx Monsoon',
            link: 'Jinkx_Monsoon' }
	}
};
 
UserTagsJS.modules.custom = {
	'Idekmandy': ['Idekmandy'],
	'Queen Bela': ['QueenBela']
};

UserTagsJS.modules.metafilter = {
	'rollback': ['sysop', 'bureaucrat', 'content-moderator'],
	'chatmoderator': ['sysop', 'bureaucrat', 'threadmoderator'],
	'threadmoderator':['sysop', 'bureaucrat', 'content-moderator' ],
	'content-moderator':['sysop', 'bureaucrat']
};
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:UserTags/code.js',
        'u:dev:Countdown/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:WallGreetingButton/code.js',
    ]
});

window.railWAM = {
    logPage:'Project:WAM Log',
    loadOnPage:'Special:WikiActivity',
};