/* Display Clock */
importArticle({
    type: "script",
    article: [
        "w:c:dev:DisplayClock/code.js"
    ]
});

/* AutoRefreshing RecentChanges and WikiActivity */
 
AjaxRCRefreshText = 'Act. autom�t.';
AjaxRCRefreshHoverText = 'Refrescar esta p�gina autom�ticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');