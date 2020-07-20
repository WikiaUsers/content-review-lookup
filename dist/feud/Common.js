/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto Refresh */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').text(mw.config.get('wgUserName'));
});

/* User Tags */
window.UserTagsJS = {
    tags: {
        bureaucrat: {
            link: 'Special:ListUsers/bureaucrat'
        },
        bot: {
           link: 'Special:Listusers/bot'
        },
        chatmoderator: {
            link: 'Special:ListUsers/chatmoderator'
        },
        threadmoderator: {
            link: 'Special:ListUsers/threadmoderator'
        }, 
        patroller: {
            link: 'Special:ListUsers/patroller'
        },
        rollback: {
            link: 'Special:ListUsers/rollback'
        },
        sysop: {
            link: 'Special:ListUsers/sysop'
        },
        Idekmandy: { u:'Blanche' },
        Lenhi: { u:'Baby Jane' }
    },
    modules: {
        autoconfirmed: true,
        inactive: {
            days: 30
        },
        mwGroups: [
            'bannedfromchat',
            'bureaucrat',
            'chatmoderator',
            'threadmoderator',
            'sysop',
            'rollback',
            'patroller',
            'bot'
        ],
    }
};
 
UserTagsJS.modules.custom = {
	'Idekmandy': ['Idekmandy'],
	'Lenhi': ['Lenhi']
};
 
UserTagsJS.modules.metafilter = {
    'founder': ['bureaucrat'], // Remove "Founder" tag from bureaucrats
    'sysop': ['bureaucrat'], // Remove "Admin" tag from bureaucrats
	'rollback': ['sysop', 'bureaucrat'], // Remove rollback from admins
	'chatmoderator': ['sysop', 'bureaucrat', 'threadmoderator'], // Remove chat mod from all discussions mods & admins
	'threadmoderator':['sysop', 'bureaucrat'], //Remove discussions mod from admins
	'content-moderator':['sysop', 'bureaucrat'] //Remove content mod from admins
};