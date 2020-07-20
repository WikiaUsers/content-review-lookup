highlight = {
    selectAll: false,
    sysop: 'red',
    bot: 'white',
    users: {
        user1: '#000000',
        'other user': '#FFFFFF'
    }
    };
'(end)';
importArticles({
    type: 'script',
    articles: [
        'u:dev:HighlightUsers/code.js'
    ]
});

// =====================================
//        Variables for functions
// =====================================
// Ajax auto-refresh
ajaxPages = ['Special:RecentChanges', 'Special:WikiActivity', 'Special:Watchlist', 'Special:Log', 'Special:Contributions', 'Special:NewFiles', 'Special:AbuseLog'];
AjaxRCRefreshText = 'Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';

//ArchiveTool
var ArchiveToolConfig = { 
   archiveListTemplate: 'Archived Talk Tabs',
   archivePageTemplate: 'Archived Talk Tabs',
   archiveSubpage: 'Archive',
   userLang: true
};

// =====================================
//                Imports
// =====================================
/*Floating Table of Contents*/

importArticles({
    type: 'script',
    articles: [
        //... preceding scripts ...
        'u:dev:CustomGalleryButton.js',
        //... following scripts ...
    ]
});

importArticles({
    type: "style",
    articles: [
        "u:dev:Highlight/code.css"
    ]
});

window.SpoilerAlertJS = {
    question: 'You know, this page contains spoilers... Do you still want to continue on?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1000
};