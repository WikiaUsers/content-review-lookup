/******************************
Script Settings
******************************/
/******************************
AjaxRC
******************************/
var ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:WikiActivity"];
var ajaxindicator = 'http://images1.wikia.nocookie.net/__cb20100617113125/dev/images/8/82/Basic_throbber.gif';
var ajaxRefresh = 30000;
var AjaxRCRefreshText = 'Auto-refresh';
var AjaxRCRefreshHoverText = 'Automatically refresh the page';
/******************************
RevealAnonIP
******************************/
window.RevealAnonIP = {
    permissions : ['*']
};
ajaxCallAgain = [RevealAnonIP.reveal];
/******************************
ArchiveTool
******************************/
var ArchiveToolConfig = { 
   archiveListTemplate: 'Archives',
   archivePageTemplate: 'Archivepage',
   archiveSubpage: 'Archive',
   userLang: false
};
/******************************
BackToTopArrow
******************************/
var Speed = 600;
var Start = 800;
/******************************
DisableArchiveEdit
******************************/
var DisableArchiveEditConfig = { 
   archiveSubpage: 'Archive',
   disableCompletely: false,
   textColor: '#D9D9D9',
   userLang: false
};
/******************************
EditIntroButton
******************************/
EditIntroButtonText = 'intro';
/******************************
SpoilerAlert
******************************/
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
/******************************
Script Import
******************************/
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
        'u:dev:RevealAnonIP/code.js',
        'u:dev:ArchiveTool/code.js',
        'u:dev:DupImageList/code.js',
        'u:dev:ListFiles/code.js',
        'u:dev:BackToTopArrow/code.js',
        'u:dev:AllPagesHideRedirect/code.js',
        'u:dev:AntiUnicruft/code.js',
        'u:dev:Countdown/code.js',
        'u:dev:DisableArchiveEdit/code.js',
        'u:dev:EditIntroButton/code.js',
        'u:dev:FixMultipleUpload/code.js',
        'u:dev:FixWantedFiles/code.js',
        'u:dev:SearchSuggest/code.js',
        'u:dev:SpoilerAlert/code.js',
        'u:dev:WallGreetingButton/code.js'
        'u:dev:Code/code.js'
        'u:dev:UnsafeScripts/code.js'
        'u:dev:TabKeyInserter/code.js'
    ]
});