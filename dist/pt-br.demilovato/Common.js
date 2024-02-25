/* Códigos JavaScript colocados aqui serão carregados por todos aqueles que acessarem alguma página desta wiki */

importArticles({
    type: "script",
    articles: [
        "MediaWiki:CollapsibleTables.js",
        "MediaWiki:Common.js/Countdown.js",
        "w:runescape:MediaWiki:Common.js/WLH_edit.js",
        'w:dev:MediaWiki:PurgeButton/code.js',
        'w:dev:MediaWiki:AllPagesHideRedirect/code.js',
        'w:dev:MediaWiki:UTCClock/code.js',
        'w:dev:MediaWiki:YoutubePlayer/code.js',
        "w:dev:MediaWiki:InputUsername/code.js",
        'u:dev:MediaWiki:CategoryQuickRemove.js',
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

window.AddRailModule = [
    {page: 'Template:Sidebar', prepend: true},
    'Template:RailModule',
];