window.MessageWallUserTags = {
    tagColor: 'GhostWhite',  //Tag color – The color of the tag's text
    glow: true,           //Glow effect toggle – Value of 'true' turns on the glow effect, 'false' turns it off
    glowSize: '20px',     //Glow size – The default radius of the text-shadow glow effect
    glowColor: 'DarkViolet', //Glow color
    users: {
        'Daniel_Viglietti': 'Bureaucrat',
        'AquaTerra7': 'Bureaucrat',
        'FullerHouseFan01': 'Bureaucrat',
        'OLLY2': 'Chat Moderator',
        'ILoveRavensHome': 'Administrator'
    }
};

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
            'imagecontrol'
        ],
        newuser: true
    }
};

window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};

window.ajaxPages = [
    "Special:WikiActivity",
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions"
];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh this page';

importArticles({
    type: "script",
    articles: [
        "w:c:runescape:MediaWiki:Common.js/WLH_edit.js",
        "w:c:onceuponatime:MediaWiki:CollapsibleTables.js",
        "w:c:onceuponatime:MediaWiki:Common.js/DuplicateImages.js",
        ]
});


/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */

/* Countdown */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});

window.SpoilerAlertJS = {
    question: 'This area contains spoilers of episode that may have aired or not have aired. Are you sure you want to continue?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 0
};

/* WAM Log */
window.railWAM = {
    logPage:"Project:WAM Log"
};

/*Thread Delete */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxThreadDelete/code.js',
    ]
});