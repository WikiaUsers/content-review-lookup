/* Any JavaScript here will be loaded for autoconfirmed users only */
 
importArticles({
    type: "script",
    articles: [
        "external:dev:SignatureCheck/code.js",
        "external:dev:AjaxRC/code.js"
    ]
});
 
// AjaxRC config
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity", "Special:Log", "Special:Log/upload"];
 
/*** Reimplementations **********************************************************/
$(function() {
    /* Reimplement upload button on [[Special:Upload]] */
    $(".wikia-button.upphotos").removeClass("upphotos");
});