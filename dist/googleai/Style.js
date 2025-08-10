// AnAmanLyetNye background
if (mw.config.get('wgPageName') === 'User:AnAmanLyetNye' && mw.config.get('wgAction') !== 'edit') {
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:SnowStorm.js',
        ]
    });
}