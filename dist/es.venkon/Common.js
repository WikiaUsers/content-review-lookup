/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

importArticles({
    type: "script",
    articles: [
        'u:dev:AllPagesHideRedirect/code.js',
        'u:dev:MediaWiki:UserActivityTab/code.js',
        'u:dev:MediaWiki:ChatReload/code.js',
    ]
});