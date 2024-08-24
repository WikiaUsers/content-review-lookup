/* Any JavaScript here will be loaded for all users on every page load. */

// ===================
// AJAX Auto-Refresh
// ===================

window.ajaxPages = new Array(
    "Special:WikiActivity",
    "Special:WikiActivity/watchlist",
    "Special:RecentChanges",
    "Special:RecentChangesLinked",
    "Special:Log",
    "Special:Images",
    "Special:ListFiles",
    "Special:Contributions",
    "Special:NewPages",
    "Special:UncategorizedPages",
    "Special:DoubleRedirects",
    "Special:WhatLinksHere",
    "Special:Categories",
    "Special:Videos",
    "Special:Watchlist",
    "Special:LonelyPages",
    "Special:BrokenRedirects",
    "Special:DeadendPages",
    "Special:Disambiguation",
    "Special:Withoutimages",
    "Special:BlockList",
    "Special:ChatBanList",
    "Blog:Recent_posts");
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/dev/images/b/ba/Snake_throbber_dark-bg.gif/revision/latest?cb=20140519203615';

// ===========
// User Tags
// ===========

window.UserTagsJS = {
    modules: {
        inactive: {
            days: 60,
            zeroIsInactive: false
        },
        mwGroups: ['bannedfromchat', 'util', 'checkuser', 'authenticated'],
        autoconfirmed: true,
        newuser: {
            computation: function(days, edits) {
                return days < 10 && edits < 20;
            }
        },
        explode: {
            'sysop': ['bureaucrat']
        },
        implode: {
            'moderator': ['content-moderator', 'threadmoderator']
        },
        metafilter: {
            'chatmoderator': ['moderator']
        },
        isblocked: true,
        custom: {
            'RedFurnace': ['founder', 'exburo'],
            'TwistedInferno': ['exadmin'],
            'ThaChompyLeader': ['exadmin'],
            'Smoothman75': ['exadmin'],
            'Nedly': ['exburo'],
            'Adventure Mangle': ['exburo'],
            'EpicNachos102': ['exburo'],
            'Wc383193': ['exburo'],
            'René Descartes': ['exburo'],
            'SpiralFrost': ['exburo']
        }
    },
    
    tags: {
        
        // Change order of default tags
        
        bureaucrat: {order: 1},
        sysop: {order: 2},
        'content-moderator': {order: 4},
        rollback: {order: 5},
        threadmoderator: {order: 6},
        chatmoderator: {order: 7},
        
        // Make new tags
        
        moderator: {u: 'Moderator', order: 3},
        exadmin: {u: 'Former Admin'},
        exburo: {u: 'Former Bureaucrat'}
        
    }
};

// ==============
// Staff tools
// =============

if(wgUserGroups.includes('rollback') || 
   wgUserGroups.includes('content-moderator') ||
   wgUserGroups.includes('sysop') ||
   wgUserGroups.includes('bureaucrat')){
      importArticles({
            type: 'script',
            articles: [
            'u:dev:MediaWiki:AjaxUndo/code.js',
            'u:dev:MediaWiki:AjaxRename/code.js',
            'u:dev:MediaWiki:CategoryRenameAuto-update/code.js',
            'u:dev:MediaWiki:FileRenameAuto-update/code.js',
        ]
    });
}

// Mass Categorization
 
window.MassCategorizationGroups = [
    'bot',
    'bureaucrat', 
    'content-moderator', 
    'rollback',
    'sysop'
];
 
window.massCategorizationDelay = 2500; // 2.5 second interval
 
// Mass Rename Revert
 
window.MassRenameRevertGroups = [
    'bureaucrat', 
    'content-moderator', 
    'rollback',
    'sysop'
];


// =============================================
// Disable YouTube Player's autoplay feature
// =============================================
 
window.YoutubePlayerDisableAutoplay = true;