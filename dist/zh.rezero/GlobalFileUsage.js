window.globalFileUsageConfig = {
    'lang': ['de', 'en', 'es', 'fr', 'it', 'nl', 'pl', 'pt-br', 'ru', 'uk', 'zh'],
    'auto_show': true,
    'hide_on_delete': false,
    'hide_on_move': false
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:GlobalFileUsage.js',
    ]
});