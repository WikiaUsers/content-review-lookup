/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: "script",
    articles: [
        "u:dev:AjaxRC/code.js",
        "u:dev:LockOldBlogs/code.js",
        "u:dev:ShowHide/code.js",
        "u:dev:UserTags/code.js",
        "MediaWiki:Common.js/icons.js",
    ]
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
        "content-moderator": {
            u:  'content moderator',
            link: 'Special:ListUsers/content-moderator'
        },
        imagecontrol: {
            u: 'image control',
            link: 'Special:ListUsers/imagecontrol'
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
            'content-moderator',
            'sysop',
            'rollback',
            'bot',
            'imagecontrol'
        ],
        newuser: true
    }
};
 
importScriptPage('DisplayClock/code.js', 'dev');
 
/* reference popups */
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});