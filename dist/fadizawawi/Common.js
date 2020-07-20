/* Any JavaScript here will be loaded for all users on every page load. */

// 11:08, August 19, 2013 (UTC)
// <source lang="JavaScript">
$('.username').text(mw.config.get('wgUserName'));
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
             u: 'Apprentice',
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
	
}
};

UserTagsJS.modules.metafilter = {
	'rollback': ['sysop', 'bureaucrat'], // Remove rollback from admins
	'chatmoderator': ['sysop', 'bureaucrat', 'threadmoderator'], // Remove chat mod from all discussions mods & admins
	'threadmoderator':['sysop', 'bureaucrat'], //Remove discussions mod from admins
	'content-moderator':['sysop', 'bureaucrat'] //Remove content mod from admins
};