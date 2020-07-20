// Ajax auto-refresh
window.ajaxPages = ['Speciaal:RecenteWijzigingen','Speciaal:WikiActivity','Special:Bijdragen'];
window.AjaxRCRefreshText = 'Auto-refresh';
window.ajaxRefresh = 10000;
 
importArticles({
    type: 'script',
    articles: [
        "w:c:dev:AjaxRC/code.js",
    ]
});