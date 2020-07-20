/* JavaScript die hier wordt geplaatst heeft invloed op alle pagina's voor alle gebruikers */

var ajaxPages = ["Speciaal:WikiActivity","Speciaal:RecentChanges","Speciaal:Watchlist","Speciaal:Log","Speciaal:Contributions"];
var AjaxRCRefreshText = 'Auto-refresh';
var AjaxRCRefreshHoverText = 'Automatisch de pagina verversen';
var ajaxRefresh = 15000;

importArticles({
    type: "script",
    articles: [
        "u:dev:AjaxRC/code.js"
    ]
});