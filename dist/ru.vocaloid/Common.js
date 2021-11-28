/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
// AddRailModule config options
window.AddRailModule = ['Template:NewPagesModule'];

// Flags import statement
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Flags.js',
    ]
});