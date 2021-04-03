/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

 
/*Import*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:CategoryRenameAuto-update/fr.js',
        'u:dev:AllPagesHideRedirect/code.js',
    ]
});

/* Auto updating recent changes opt-in. See w:c:dev:AjaxRC for info & attribution */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages","Special:NewFiles"];
importScriptPage('AjaxRC/code.js', 'dev');