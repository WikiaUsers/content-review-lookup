/* Any JavaScript here will be loaded for all users on every page load. */
 
/* "Back to top" button
 * Obtained from Wikia Developers Wiki @ w:c:dev:BackToTopButton
 */
importScriptPage('BackToTopButton/code.js', 'dev');
 
/* Countdown timer */
importScriptPage('Countdown/code.js', 'dev');
 
// Show username
function userNameReplace() {
    "use strict";
    var disableUsernameReplace;
    if (typeof (disableUsernameReplace) !== 'undefined' && disableUsernameReplace || mw.config.get('wgUserName') === null) {
        return;
    }
    $("span.insertusername").text(mw.config.get('wgUserName'));
}
addOnloadHook(userNameReplace);
 
// Tags
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
        patroller: {
            link: 'Special:ListUsers/patroller'
        },
        imagecontrol: {
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
            'sysop',
            'rollback',
            'patroller',
            'bot',
            'imagecontroller'
        ],
        newuser: true
    }
};
 
// Import scripts from Wikia Developers' Wiki
importArticles({
    type: 'script',
    articles: ['u:dev:ArchiveTool/code.js', 'u:dev:Countdown/code.js', 'u:dev:FloatingToc/code.js', 'u:dev:LockOldBlogs/code.js', 'u:dev:PurgeButton/code.js', 'u:dev:ReferencePopups/code.js', '', 'u:dev:SignatureCheck/code.js', 'u:dev:UserTags/code.js', 'u:dev:WallGreetingButton/code.js']
});
 
importScriptPage('AjaxRC/code.js', 'dev');
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
}); 

importArticle({
  type: 'script',
  article: 'u:dev:FacebookLikeBox/code.js'
});