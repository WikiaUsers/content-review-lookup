/* Il codice JavaScript inserito qui viene caricato da tutti gli utenti ad ogni visualizzazione di pagina. */

// Caricamento automatico pagine speciali
ajaxPages = ["Speciale:UltimeModifiche", "Speciale:OsservatiSpeciali", "Speciale:WikiActivity", "Speciale:ImmaginiRecenti", "Speciale:Registri", "Speciale:AbuseLog"];
AjaxRCRefreshText = "Aggiornamento automatico";
AjaxRCRefreshHoverText = "Abilita l'aggiornamento automatico della pagina";

//Immagine default per anteprima di link privi di immagini
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = 'https://vignette.wikia.nocookie.net/dragonball/images/e/ee/No_immagine.png/revision/latest?cb=20181002202318&path-prefix=it';

/* Automated Profile Template 
Script from dev wiki to automatically create new user pages
Needed to replace the welcome tool currently missing in UCP 
see: https://community.fandom.com/f/p/4400000000002024105  */
window.AutoCreateUserPagesConfig = {
    content: {
        2:'{{sub'+'st:MediaWiki:Welcome-user-page}}',
        3:false,
        1202:false
    },
    summary:'Creata pagina utente di benvenuto'
};

/* import the script only AFTER setting the configuration:
   avoid putting this import line in ImportJS!!  */
importArticles({ 
	type: 'script', 
	articles: [ 
		'u:dev:MediaWiki:AutoCreateUserPages.js', 
	]
});