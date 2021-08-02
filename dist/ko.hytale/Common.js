/**** Any JavaScript here will be loaded for all users on every page load. ****/

/* RailWAM */
window.railWAM = {
    logPage:"Project:WAM Log"
};
/* End of RailWAM */


/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */

/* Auto-Refresh */
window.ajaxPages = [
    'Special:RecentChanges',
    'Special:Watchlist',
    'Special:WikiActivity',
    'Special:Log',
    'Special:Contributions'
];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

/* User Tags */
window.UserTagsJS = {
	modules: {},
	tags: {
        blocked:            { u:'Banned', order: 0 },
        bureaucrat:         { u:'Bureaucrat', link:'Hytale Wiki:Staff', order: 1 },
        sysop:              { u:'Administrator', link:'Hytale Wiki:Staff', order: 2 },
        'content-moderator':{ u:'Content Moderator', link:'Hytale Wiki:Staff', order: 3 },
        threadmoderator:    { u:'Forum Moderator', link:'Hytale Wiki:Staff', order: 4  },
        chatmoderator:      { u:'Chat Moderator', link:'Hytale Wiki:Staff', order: 5 },
        rollback:           { u:'Rollback', link:'Hytale Wiki:Staff', order: 6 },
        verified:           { u:'Verified', order: 7 },
        artist:             { u:'Artist', order: 8  },
        moderator:          { u:'Moderator', link:'Hytale Wiki:Staff'  }
    }
};

UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = [
    'bannedfromchat',
    'bot',
    'bot-global',
    'bureaucrat', 
    'chatmoderator',
    'rollback',
    'sysop',
    'threadmoderator',
    'moderator',
    'content-moderator'
];
UserTagsJS.modules.metafilter = {
    'sysop': ['bureaucrat'],
    'moderator': ['sysop', 'bureaucrat'],
    'rollback': ['moderator']
};
UserTagsJS.modules.implode = {
    'moderator': ['content-moderator', 'threadmoderator', 'chatmoderator']
};

UserTagsJS.modules.inactive = 30; //Sets an inactive tag after 90 days

/* RevealAnonIP */
window.RevealAnonIP = {
    permissions: ['bureaucrat', 'sysop', 'moderator']
}

// Importing from dev.wikia.com
// See the pages for the code.
 importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:Countdown/code.js',
        'u:dev:FloatingToc/code.js',
        'u:dev:LockForums/code.js',
        'u:dev:LockOldBlogs/code.js',
        'u:dev:MassProtect/code.js',
        'u:dev:PurgeButton/code.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:RevealAnonIP/code.js',
        'u:dev:SignatureCheck/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:WallGreetingButton/code.js',
        'u:dev:YouTubeModal/code.js'
        ]
});