/* Any JavaScript here will be loaded for all users on every page load. */

/* Cf. http://dev.wikia.com/wiki/QuickDelete#.2FmultiCats.js */
window.categories = ['削除候補'];


importArticles({
    type: 'script',
    articles: [
        'u:googology:MediaWiki:Common.js',
        'u:dev:QuickDelete/multiCats.js'
    ]
});