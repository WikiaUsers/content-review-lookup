/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:LastEdited/code.js',
        // ...
    ]
});
 
window.lastEdited = {
    avatar: true,
    size: true,
    diff: true,
    comment: true,
    time: 'timestamp',
    lang: 'es',
    namespaces: {
        include: [],
        exclude: []
    },
    pages: []
};