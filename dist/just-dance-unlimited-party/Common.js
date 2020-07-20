/* Any JavaScript here will be loaded for all users on every page load. */
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

jQuery('.achievementbox').mouseover(function() {
   jQuery("div", this).show();
});

jQuery('.achievementbox').mouseout(function() {
   jQuery("div", this).hide();
});

$(document).ready(function(){
	if( $('#control_form_edit').length )
	{
		$('#control_edit').remove();
	}
});

/* Credits to Avatar Wiki */
/* Adds icons to page header bottom border
 * by: [[User:The 888th Avatar]]
 */
 
$(document).ready(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').text(mw.config.get('wgUserName'));
});

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

//DPLforums
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
  { boardName: 'new-on-just-dance-unlimited-party-wiki',
    boardDescription: "Want to share something posted on the wiki, or congratulate somebody?"
  },
  //Staff
  { boardName: 'applications',
    boardDescription: 'Apply for staff here.'
  },
  { boardName: 'staff',
    boardDescription: 'Staff meetings and more.'
  },
  //Defaults
  { boardName: 'help-desk',
    boardDescription: 'Need help with the wiki?'
  },
  { boardName: 'watercooler',
    boardDescription: 'Looking to chat?'
  }
];
window.i = window.i || 0; //Required for SignatureCheck to work properly
window.SignatureCheckJS = {
	forumheader: 'Forum/Header',
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AddArticleToCategory/code.js',
    ]
});