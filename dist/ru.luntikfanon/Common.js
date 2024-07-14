/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 180;
/* Импортированный JS код */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MultipleFileDelete/code.js'
    ]
});