/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto Refresh */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').text(mw.config.get('wgUserName'));
});

/*User Tags*/
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
        newuser: false
    },
	tags: {
        bureaucrat: {
            link: 'Special:ListUsers/bureaucrat'
        },
         sysop: {
            link: 'Special:ListUsers/sysop'
        },
         chatmoderator: {
            link: 'Special:ListUsers/chatmoderator'
        },
        threadmoderator: {
            link: 'Special:ListUsers/threadmoderator'
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
        Dorumin: { u:'God' },
        Ricardo8a: { u:'Chanel #1' },
        Idekmandy: { u:'Chanel #2' },
        Lenhi: { u:'Chanel #3' },
		QueenBela: { u:'Chanel #5' }
	}
};
 
UserTagsJS.modules.custom = {
	'Dorumin': ['Dorumin'],
	'Idekmandy': ['Idekmandy'],
	'Ricardo8a': ['Ricardo8a'],
	'Queen Bela': ['QueenBela'],
	'Lenhi': ['Lenhi']
};

UserTagsJS.modules.metafilter = {
    'sysop': ['bureaucrat'], // Remove "Admin" tag from bureaucrats
	'rollback': ['sysop', 'bureaucrat'], // Remove rollback from admins
	'chatmoderator': ['sysop', 'bureaucrat', 'threadmoderator'], // Remove chat mod from all discussions mods & admins
	'threadmoderator':['sysop', 'bureaucrat'], //Remove discussions mod from admins
	'content-moderator':['sysop', 'bureaucrat'] //Remove content mod from admins
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:Countdown/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:WallGreetingButton/code.js',
        'u:dev:LockForums/code.js',
        'u:dev:MediaWiki:GlobalEditcount/code.js',
    ]
});

/* Users blocked infinite */
window.addEventListener('load', function() {
    // Timeouts are always a terrible way to go, but UserTags has no event dispatched when it finished loading.
    setTimeout(function() {
        if (document.getElementById('UserProfileMasthead') === null) return;
        var blockTag = document.querySelector('.tag.usergroup-blocked.blocked-user');
        if (blockTag === null) return;
        new mw.Api().get({
           action: 'query',
           list: 'blocks',
           bkprop: 'expiry',
           bktimestamp: new Date().getTime(),
           bkusers: wgTitle
        }).done(function(d) {
           if (d.query.blocks[0] && d.query.blocks[0].expiry == 'infinity') {
               blockTag.innerHTML = 'Murdered';
           }
        });
    }, 250);
});