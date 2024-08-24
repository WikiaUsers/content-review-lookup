/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

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