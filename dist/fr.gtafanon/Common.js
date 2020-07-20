/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */
importScriptPage("CategoryRenameAuto-update/code.js","dev");
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:AjaxBatchDelete/code.2.js', // Permet de supprimer plusieurs pages à la fois
        'u:dev:AddTag/code.js', // Permet de nominer plusieurs pages à la suppression à la fois
        'u:dev:AjaxDiff/code.js', // Permet de vérifier les différences entre deux contributions tout en restant sur Spécial:WikiActivity
        'u:dev:AjaxRC/code.js', // Rafraîchit automatiquement certaines pages.
        'u:dev:AjaxUndo/code.js', // Permet d'annuler une contribution rapidement sans quitter la page
        'u:dev:DupImageList/code.js', // Permet de faire une liste de fichiers dupliqués
        'u:dev:EditcountTag/code.js', // Permet de visiter Special:Editcount via le profil d'un tiers
        'u:dev:FindAndReplace/code.js' // Permet de trouver un objet particulier et de le remplacer
        // ...
    ]
} );

/* AjaxBatchDelete */
batchDeleteDelay = 1000;
/* AjaxDiff */
AjaxDiff = {
expiry: "1 semaine",
reason: "Vandalisme"
};
/* AjaxRC */
window.ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Accueil"];
window.ajaxIndicator = 'http://www.std1.net/greybox/indicator.gif';
window.ajaxRefresh = 5000;
window.AjaxRCRefreshText = 'Actualisation automatique';