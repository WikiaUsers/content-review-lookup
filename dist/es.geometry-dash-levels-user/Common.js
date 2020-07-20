/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
importArticles({
    type: 'script',
    articles: [
        'u:dev:Medals/code.js',
        'u:dev:ModernButtons/code.js',
    ]
}, {
    type: 'style',
    article: 'u:dev:MediaWiki:RoundAvatars/borders.css'
});