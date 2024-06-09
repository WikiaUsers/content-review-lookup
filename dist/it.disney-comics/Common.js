/* Il codice JavaScript inserito qui viene caricato da ciascuna pagina, per tutti gli utenti. */
window.SpoilerAlertJS = {
    question: 'Questa parte contiene spoiler, vuoi continuare a leggere?',
    yes: 'Sì',
    no: 'No',
    fadeDelay: 500
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AdminDashboard_block/code.js',
    ]
});
importScriptPage('Status/code.js', 'dev');
/* Template espandibile */
// ShowHide - Tabelle espandibili (da http://dev.wikia.com/wiki/ShowHide )
importScriptPage('ShowHide/code.js', 'dev');
// END of ShowHide

// Import Copyright //
importScript('MediaWiki:Common.js/copyright.js');

/* Configuration for LinkPreview (from Dev Wiki) */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });

//default/missing images -> wiki logo
window.pPreview.noimage = 'https://static.wikia.nocookie.net/paperpedia/images/e/e6/Site-logo.png/revision/latest?cb=20210517130749&format=original&path-prefix=it';
window.pPreview.defimage = 'https://static.wikia.nocookie.net/paperpedia/images/e/e6/Site-logo.png/revision/latest?cb=20210517130749&format=original&path-prefix=it';
//ignore templates in preview
window.pPreview.RegExp.noinclude = ['.quote', ".notice", ".noprint", ".disambigua", ".vedi_anche", ".p-nav", ".caption"];
//ignore links to non-article namespaces
window.pPreview.RegExp.ilinks = [ new RegExp('Template\:.*'), new RegExp('File\:.*'), new RegExp('Categoria\:.*'), new RegExp('Map\:.*'), new RegExp('Utente\:.*'), new RegExp('MediaWiki\:.*'), new RegExp('Bacheca\:.*') ];
//text length
window.pPreview.tlen = 500;


  // Funzione per aggiungere l'iframe dinamicamente
function addInstagramEmbed() {
  var div = document.querySelector('.instagramembed');
  if (div) {
    div.style.display = 'block'; // Mostra il div
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.instagram.com/paperpediawikiofficial/embed';
    iframe.width = '200';
    iframe.height = '400';
    iframe.frameBorder = '0';
    iframe.style.overflow = 'auto'; // Abilita lo scrolling
    div.appendChild(iframe); // Aggiungi l'iframe al div
  }
}

// Funzione per inizializzare l'embed di Instagram
function initializeInstagramEmbed() {
  var div = document.querySelector('.instagramembed');
  if (div) {
    div.classList.add('instagramembed');
    addInstagramEmbed();
  }
}

// Chiamata alla funzione di inizializzazione quando il DOM è completamente carico
document.addEventListener('DOMContentLoaded', function() {
  initializeInstagramEmbed();
});