/* AjaxRC */
window.ajaxPages = ["Blog:Recent_posts","Special:Chat","Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif';
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

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
            'sysop',
            'rollback',
            'patroller',
            'bot',
            'imagecontrol'
        ],
        newuser: true
    }
};
 
//—————————————————————————————— ! ! ! ———————————————————————————————//
/* Import scripts. NOTE: Place scripts configurations above this line */
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:MassProtect/code.js',        //Mass protection.
        'u:dev:BackToTopButton/code.js',    //Back to top button.
        'u:dev:WallGreetingButton/code.js', //Message walls greetings. 
        'u:dev:UserTags/code.js',           //Customizes user tags.
        'u:dev:SignatureCheck/code.js',     //Talk pages vestige.
        'u:dev:ReferencePopups/code.js',    //Allowes to make very neat things :0
        'u:dev:PurgeButton/code.js',        //Refresh button.
        'u:dev:FloatingToc/code.js',        //Makes the toc more mobile.
        'u:dev:Countdown/code.js',          //Countdowns.
        "u:dev:AjaxBatchDelete/code.2.js",  //Mass deletion
        'u:dev:YoutubePlayer/code.js'       //Revives MPC
    ]
});

/* Mass Categorization */
massCategorizationDelay = 1000;
importScriptPage('MediaWiki:MassCategorization/code.js', 'dev');