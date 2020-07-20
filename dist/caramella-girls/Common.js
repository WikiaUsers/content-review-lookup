/* Any JavaScript here will be loaded for all users on every page load. */

//MastHeadRightsBadge
window.MastheadRightsBadgeSettings = {
    iconSize: '25px',
};

//TopicBlockList
TBL_WIKIS = [ "community"];

//MarkForDeletion
window.MarkForDeletion = {
    promptedDeleteReason: "Vandalism/Spam",
    replace: true
};

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
if (mw.config.get('wgUserName').includes('VacantIntern') /*Intern*/ || 
    mw.config.get('wgUserName').includes('VacantHelper1') || 
    mw.config.get('wgUserName').includes('VacantHelper2') || 
    mw.config.get('wgUserName').includes('VacantHelper3') || 
    mw.config.get('wgUserName').includes('VacantHelper4') || 
    mw.config.get('wgUserName').includes('VacantHelper5') || 
    mw.config.get('wgUserName').includes('VacantHelper5') || 
    mw.config.get('wgUserGroups').includes('rollback') ||
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

/*This section is intentionally commented out until DPLforums are added to the wiki
window.dplforumBoards = [
   //General
  { boardName: 'general-discussion',
    boardDescription: 'This board is for general conversations about the wiki.'
  },
  { boardName: 'fun-and-games',
    boardDescription: 'This board is for off-topic conversation - a place to hang out.'
  },
  { boardName: 'questions-and-answers',
    boardDescription: 'Got a question about the wiki, or the topic? Ask your questions here!'
  },
  //News
  { boardName: 'news-and-announcements',
    boardDescription: 'Breaking news and information!'
  },
  { boardName: 'new-on-caramella-girls-wikia',
    boardDescription: "Want to share something posted on the wiki, or congratulate somebody?"
  },
  //Staff
  { boardName: 'staff',
    boardDescription: 'Staff meetings and more.'
  },
  { boardName: 'applications',
    boardDescription: 'Apply for staff here.'
  },
  //Defaults
  { boardName: 'help-desk',
    boardDescription: 'Need help with the wiki?'
  },
  { boardName: 'watercooler',
    boardDescription: 'Looking to chat?'
  }
];
*/
window.i = window.i || 0; //Required for SignatureCheck to work properly
window.SignatureCheckJS = {
	forumheader: 'Forum/Header',
};