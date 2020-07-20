/* Any JavaScript here will be loaded for all users on every page load. */
//MastHeadRightsBadge
window.MastheadRightsBadgeSettings = {
    iconSize: '25px',
};

TBL_WIKIS = [ "community", "yandere-simulator", "yandere-simulator-fan", "yandere-simulator-2d", "yandere-simulator-2d-fanon"];

//RailWAM
window.railWAM = {
     logPage: 'Project:WAM Log',
     loadOnPage: ['Special:WikiActivity', 'Project:WAM Log'],
     showToAnons: 'false',
     loadOnNamespace: 4
};

//Import for Content Staff
if (mw.config.get('wgUserGroups').includes('rollback') || 
    mw.config.get('wgUserGroups').includes('content-moderator') || 
    mw.config.get('wgUserGroups').includes('sysop')) 
    {
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:MarkForDeletion/code.js',
            'u:dev:MediaWiki:CategoryRenameAuto-update/code.js',
        ]
    });
}
//Import for Social Staff
if (mw.config.get('wgUserGroups').includes('threadmoderator') || 
    mw.config.get('wgUserGroups').includes('sysop')) 
    {
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:ArchiveTool/code.js',
        ]
    });
}
//Import for all Staff
if (mw.config.get('wgUserGroups').includes('rollback') ||
    mw.config.get('wgUserGroups').includes('chatmoderator') || 
    mw.config.get('wgUserGroups').includes('content-moderator') ||
    mw.config.get('wgUserGroups').includes('threadmoderator') || 
    mw.config.get('wgUserGroups').includes('sysop')) 
    {
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:RCStats.js',
            'u:dev:MediaWiki:RailWAM/code.js',
        ]
    });
}

//AjaxRC
window.ajaxSpecialPages = [
    "Recentchanges", 
    "WikiActivity", 
    "Watchlist", 
    "Log", 
    "Contributions"
    ];
window.ajaxRefresh = 60000;

//BackToTopButton
window.BackToTopModern = true;

//Refresh Live! Chat every 30 seconds
window.chatReloadTime = 30000;

window.dplforumBoards = [
/*   //General
  { boardName: 'general-discussion',
    boardDescription: 'This board is for general conversations about the wiki.'
  },
  { boardName: 'fun-and-games',
    boardDescription: 'This board is for off-topic conversation - a place to hang out.'
  },
  //HelpCenter
  { boardName: 'questions-and-answers',
    boardDescription: 'Got a question about the wiki, or the topic? Ask your questions here!'
  },
  { boardName: 'bug-reports',
    boardDescription: "Found a bug and don't want to annoy YandereDev? Maybe we can help."
  },
  //News
  { boardName: 'news-and-announcements',
    boardDescription: 'Breaking news and information!'
  },
  { boardName: 'new-on-yandere-simulator-wiki',
    boardDescription: "Want to share something posted on the wiki, or congratulate somebody?"
  },
  { boardName: 'update-hype',
    boardDescription: "Are you hyped for the next update?"
  },
  //Staff
  { boardName: 'staff',
    boardDescription: 'Staff meetings and more.'
  },
  { boardName: 'applications',
    boardDescription: 'Apply for staff here.'
  },*/
  //Defaults
  { boardName: 'help-desk',
    boardDescription: 'Need help with the wiki?'
  },
  { boardName: 'watercooler',
    boardDescription: 'Looking to chat?'
  }
];
window.i = window.i || 0; //Required for SignatureCheck to work properly