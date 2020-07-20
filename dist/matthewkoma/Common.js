/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage('SpoilerAlert/code.js', 'dev');
 
 
importArticles({ type: 'script', articles: [
 
'u:dev:Standard_Edit_Summary/code.js'
 
]});

/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: 'script',
    articles: [
"w:c:dev:BackToTopButton/code.js",
"w:c:dev:Countdown/code.js",
'u:dev:DisplayClock/code.js',
"w:c:dev:DISPLAYTITLE/code.js",
"w:c:dev:LockOldBlogs/code.js",
'u:dev:MessageWallUserTags/code.js',
"w:c:dev:PowerPageMaker/code.js",
"w:c:dev:ReferencePopups/code.js",
"w:c:dev:ShowHide/code.js",
"w:c:dev:UserTags/code.js",
"w:dev:WallGreetingButton/code.js",
    ]
});


/* Any JavaScript HERE, however, will not be available for all users; certain rights must be possessed to use them */
importArticles( {
    type: 'script',
    articles: [
'u:admintools:MediaWiki:Common.js/extraRollbacks.js',
    ]
} );


//Explicit alert config
SpoilerAlert = {
    question: 'This page is for a song that is explicit, meaning that the lyrics may not be appropriate for&mdash;and may even be offensive to&mdash;younger readers.<br />Do you wish to proceed anyway?',
    yes: 'Yes',
    no: 'No',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Explicit');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');

	
importArticles({ type: 'script', articles: [
 		
'u:dev:Standard_Edit_Summary/code.js'
 		
]});
 	
	
// Create the "dev" namespace if it doesn't exist already:
 	
	
window.dev = window.dev || {};
 	 
	
// Create the sub-namespace for this addon and set some options:
 	 	
 	 	
window.dev.editSummaries = {
 		
css: '#stdSummaries { ... }',
 		
select: 'MediaWiki:StandardEditSummary'
 		
};
 	
	
// The options need to be set before the import! Otherwise they may not work.
 	 
	
importArticles({ type: 'script', articles: [
 		
'u:dev:Standard_Edit_Summary/code.js'
 		
]});

///////////////////////////////////////////////////////////////////////////////////////////////////////////
 
// ADVANCED AUTO REFRESHING RECENT CHANGES AND WATCHLIST
// Code courtesy of "pcj" of WoWWiki.
 
///////////////////////////////////////////////////////////////////////////////////////////////////////////
 
importScriptPage('AjaxRC/code.js', 'dev');

/* AJAX */
importScriptPage('MediaWiki:AjaxRC.js');
ajaxPages = ["Special:RecentChanges", "Special:WikiActivity", "Special:NewPages"];

//Message wall usertags config
window.MessageWallUserTags = {
    tagColor: 'gray',
    glow: true,
    glowSize: '15px',
    glowColor: 'cyan',
    users: {
        'username': 'usergroup',
        'Dragonleaf5678': 'Founder',
        'KCCreations': 'Co-founder',
    }
};