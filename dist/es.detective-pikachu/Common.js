/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */

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