importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WordFilter/code.js',
    ]
});

window.WordFilter = $.extend(window.WordFilter, {
    alert: 'Your message contains a word that shall not be used.',
    badWords: ['robux', 'bgs', 'bubble', 'bubble gum', 'bubble gum simulator']
});