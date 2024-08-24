/* Display Clock */
importArticle({
    type: "script",
    article: [
        "w:c:dev:DisplayClock/code.js"
    ]
});

/* AutoRefreshing RecentChanges and WikiActivity */
 
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');