/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */

// Importes
importArticles({
    type: 'script',
    articles: [
        'u:dev:AddRailModule/code.js',
        'u:dev:MediaWiki:YouTubeModal/code.js',
    ]
});
  
// LinkPreview
window.pPreview = $.extend(true, window.pPreview, {
    noimage: 'https://static.wikia.nocookie.net/onepunchman/images/e/e6/Site-logo.png/revision/latest?cb=20210910233155&path-prefix=es'
});