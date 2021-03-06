/* Códigos JavaScript colocados aqui serão carregados por todos aqueles que acessarem alguma página desta wiki */

importArticles({
    type: "script",
    articles: [
        "MediaWiki:Common.js/Countdown.js",
        "w:runescape:MediaWiki:Common.js/WLH_edit.js",
        'u:dev:MediaWiki:PurgeButton/code.js',
        'u:dev:MediaWiki:AllPagesHideRedirect/code.js',
        'u:dev:MediaWiki:ReferencePopups/code.js',
        'u:dev:MediaWiki:UTCClock/code.js',
        'u:dev:MediaWiki:YoutubePlayer/code.js',
        'u:dev:ExtendedNavigation/code.js',
        "u:dev:MediaWiki:InputUsername/code.js",
    ]
});
 
var ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
var AjaxRCRefreshText = 'Auto-refresh';
var AjaxRCRefreshHoverText = 'Automatically refresh this page';
var ajaxRefresh = 30000;
importScriptPage('AjaxRC/code.js', 'dev');
 
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Upcoming Content');
    }
};
importScriptPage('MediaWiki:Common.js/SpoilerPop.js', 'onceuponatime');
 
// Alert contributors when they are editing with their bot flag set
if (mediaWiki.config.get("wgAction") == "edit" && mediaWiki.config.get("wgUserGroups").indexOf("bot") != -1){
   $("#EditPageHeader").after('<div id="botWarning" style="background-color: darkred; color:silver; display:block; padding: 5px 0px; text-align: center; font-weight: bold; font-size: 110%;">NOTE: You are currently editing with your bot flag set!!</div>')
}

window.AddRailModule = [
    {page: 'Template:Sidebar', prepend: true},
    'Template:RailModule',
];