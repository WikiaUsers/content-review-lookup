/* Makes username template work */
function userNameReplace() {
    "use strict";
    var disableUsernameReplace;
    if (typeof (disableUsernameReplace) !== 'undefined' && disableUsernameReplace || mw.config.get('wgUserName') === null) {
        return;
    }
    $("span.insertusername").text(mw.config.get('wgUserName'));
}
addOnloadHook(userNameReplace);
 
/* User Tags */
window.UserTagsJS = {
    tags: {
        bureaucrat: { link: 'Special:ListUsers/bureaucrat' },
        bot: { link: 'Special:Listusers/bot' },
        chatmoderator: { link: 'Special:ListUsers/chatmoderator' },
        patroller: { link: 'Special:ListUsers/patroller' },
        imagecontrol: { u: 'imagecontrol', link: 'Special:ListUsers/imagecontrol' },
        rollback: { link: 'Special:ListUsers/rollback' },
        sysop: { link: 'Special:ListUsers/sysop' }
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
            'imagecontrol'
        ],
        newuser: true
    }
};

window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:Watchlist","Special:Log","Special:Contributions"];

/* LockForums */
window.LockForums = {
    expiryDays: 60,
    expiryMessage: "This thread is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this thread!",
    forumName: "Forum" 
};

/* MassProtect */
massProtectDelay = 300;

//—————————————————————————————— ! ! ! ———————————————————————————————//
/* Import scripts. NOTE: Place scripts configurations above this line */
// Import scripts from Wikia Developers' Wiki
importArticles({
    type: 'script',
    articles: [
        'u:admintools:MediaWiki:Wikia.js/cancelButton.js',  //Cancel Edit Button

        'u:dev:AjaxRC/code.js',
        'u:dev:ArchiveTool/code.js',
        'u:dev:BackToTopButton/code.js',    //Back to top button.
        'u:dev:Countdown/code.js',          //Countdowns.
        'u:dev:DisplayClock/code.js',       //Clock Header
        'u:dev:ExtendedNavigation/code.js', //ExtendedNavigation
        'u:dev:FloatingToc/code.js',        //Makes the toc more mobile.
        'u:dev:InactiveUsers/code.js',      //Inactive Users
        'u:dev:LockForums/code.js',         //Automatically locks old forums. 
        'u:dev:LockOldBlogs/code.js',       //Automatically locks old blogposts.
        'u:dev:MassProtect/code.js',        //Mass protection.
        'u:dev:PurgeButton/code.js',        //Refresh button.
        'u:dev:ReferencePopups/code.js',    //Allowes to make very neat things :0
        'u:dev:RevealAnonIP/code.js',       //Reveal Anon IP
        'u:dev:ShowHide/code.js',           //Show/Hide
        'u:dev:SignatureCheck/code.js',     //Talk pages vestige.
        'u:dev:UserTags/code.js',           //Customizes user tags.
        'u:dev:WallGreetingButton/code.js', //Message walls greetings. 
    ]
});