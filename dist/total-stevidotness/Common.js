/* Any JavaScript here will be loaded for all users on every page load. */

/* Makes username template work */
$(function userNameReplace() {
    "use strict";
    var disableUsernameReplace;
    if (disableUsernameReplace || mw.config.get('wgUserName') === null) {
        return;
    }
    $("span.insertusername").html(mw.config.get('wgUserName'));
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
            days: 60,
            namespaces: [0],
            zeroIsInactive: true
        },
        mwGroups: [
            'bannedfromchat',
            'bureaucrat',
            'chatmoderator',
            'threadmoderator',
            'sysop',
            'rollback',
            'bot'
        ],
        newuser: true
    }
};

// Change title
$(function () {
    "use strict";
    var newTitle = $('#title-meta').html(),
        edits = $('#user_masthead_since').text();
 
    if (!newTitle) {
        return;
    }
 
    $('.firstHeading, #WikiaUserPagesHeader h1, #WikiaPageHeader h1').html(newTitle);
    $('.#user_masthead_head h2').html(newTitle + '<small id="user_masthead_since">' + edits + '</small>');
});

/* LockForums */
window.LockForums = {
    expiryDays: 15,
    expiryMessage: "This thread is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this thread!",
    forumName: "Forum" 
};