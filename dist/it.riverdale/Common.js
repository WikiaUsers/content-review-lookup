/* Il codice JavaScript inserito qui viene caricato da tutti gli utenti ad ogni visualizzazione di pagina. */
/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 /* Ajax mods */
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages"
];

window.railWAM = {
     loadOnPage: 'Special:WikiActivity',
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:FileUsageAuto-update/code.js',
        'u:dev:PageRenameAuto-update/code.js',
    ]
});

/* Username Detector */
$(function() {
    $('.username').text(mw.config.get('wgUserName'));
});

 /* Article Rating */
window.ArticleRating = {
    starColor: ['#ccc', '#45c2f5'],
}