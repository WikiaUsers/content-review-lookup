// 1. AutoRefreshing RecentChanges and WikiActivity
var AjaxRCRefreshText = 'Act. autom�t.';
var AjaxRCRefreshHoverText = 'Refrescar esta p�gina autom�ticamente';
var ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Registro"];
var ajaxRefresh = 20000;
importScriptPage('AjaxRC/code.js', 'dev');

// 2. Last Edition
importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:LastEdited/code.js',
        // ...
    ]
});