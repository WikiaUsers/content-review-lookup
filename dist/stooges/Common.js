/* Any JavaScript here will be loaded for all users on every page load. */
// **************************************************
//  START import coding
// **************************************************
 
window.RevealAnonIP = {
    permissions : ['sysop', 'bureaucrat']
};
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxCallAgain = [RevealAnonIP];
ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Allpages","Special:Log","Special:WikiActivity","Special:Contributions","Blog:Recent posts","Blog:News","Blog:Featured blog posts","Blog:Popular blog posts"];
 
var monoBookText = 'Mono',
    oasisText = 'Oasis';
 
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
 
// 1. AjaxRC configuration option
var ajaxRefresh = 30000;
 
// 2. AjaxRC import statement
importScriptPage('AjaxRC/code.js','dev')
 
importArticles({
    type: "script",
    articles: [
	'u:dev:RevealAnonIP/code.js',
	'u:dev:ArchiveTool/code.js',
	'u:dev:DisableArchiveEdit/code.js',
	'u:dev:AjaxRC/code.js',
	'u:dev:FixWantedFiles/code.js',
	'u:dev:Countdown/code.js',
	'u:dev:PurgeButton/code.js',
	'u:dev:SkinSwitchButton/code.js',
	'u:deadisland:User:Jgjake2/js/DISPLAYTITLE.js',
	'u:dev:DupImageList/code.js',
	'u:dev:LockOldBlogs/code.js',
	'u:dev:PortableCSSPad/code.js',
	'u:dev:ExtendedNavigation/code.js',
	'u:dev:Thread Inspection/code.js',
	'u:dev:Category_Sorter/code.js',
	'u:dev:Standard_Edit_Summary/code.js',
	'u:dev:DISPLAYTITLE/code.js',
	'u:dev:ReferencePopups/code.js',
	'u:dev:SpoilerAlert/code.js',
	'u:dev:MessageBlock/code.js',
    ]
});