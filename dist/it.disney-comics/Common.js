/* Il codice JavaScript inserito qui viene caricato da ciascuna pagina, per tutti gli utenti. */
importScript('MediaWiki:InactiveUser.js');



importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AdminDashboard_block/code.js',
    ]
});


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
window.pPreview.RegExp.ilinks = [ new RegExp('Template\:.*'), new RegExp('File\:.*'), new RegExp('Categoria\:.*'), new RegExp('Map\:.*'), new RegExp('Utente\:.*'), new RegExp('MediaWiki\:.*'), new RegExp('Bacheca\:.*'), new RegExp('Blog\_utente\:.*'),];
//text length
window.pPreview.tlen = 500;
window.pPreview.tlen = 500;