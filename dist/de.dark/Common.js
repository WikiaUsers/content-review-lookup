/* JavaScript hier wird für alle Benutzer für jede Seite geladen. */

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
        }
    },
    modules: {
        autoconfirmed: true,
        inactive: {
            days: 60
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
        newuser: true
    }
};

$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').text(mw.config.get('wgUserName'));
});