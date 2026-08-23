mw.loader.using('mediawiki.util').then(function() {
    mw.loader.load('https://fandom.com');
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ScriptA/code.js',
        'u:dev:MediaWiki:LastEdited/code.js'
    ]
});