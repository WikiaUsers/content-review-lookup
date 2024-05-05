/* Il codice JavaScript inserito qui viene caricato da tutti gli utenti ad ogni visualizzazione di pagina. */
// Pulsante per accedere al Javascript
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AdminDashboard JS-Button/code.js',
    ]
});

// Caricamento automatico pagine speciali
ajaxPages = ["Speciale:UltimeModifiche", "Speciale:OsservatiSpeciali", "Speciale:WikiActivity", "Speciale:ImmaginiRecenti", "Speciale:Registri", "Speciale:AbuseLog"];
AjaxRCRefreshText = "Aggiornamento automatico";
AjaxRCRefreshHoverText = "Abilita l'aggiornamento automatico della pagina";

//Immagine default per anteprima di link privi di immagini
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://static.wikia.nocookie.net/lamelevisione/images/f/fb/Melevisione_-_Pagina_senza_immagine.png/revision/latest?cb=20210630221740&path-prefix=it';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/lamelevisione/images/f/fb/Melevisione_-_Pagina_senza_immagine.png/revision/latest?cb=20210630221740&path-prefix=it';
window.pPreview.tlen = 1000;
window.pPreview.RegExp.iparents = ['.myclass', '#myid', 'div[data-ignore-me=1]'];