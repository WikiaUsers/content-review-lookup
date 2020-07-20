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
window.pPreview.noimage = 'https://vignette.wikia.nocookie.net/dragonball/images/e/ee/No_immagine.png/revision/latest?cb=20181002202318&path-prefix=it';
//railwam
window.railWAM = {
    logPage:"Project:WAM Log"
};