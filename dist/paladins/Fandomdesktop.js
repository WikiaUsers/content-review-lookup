// How to import from dev on a GP wiki
mw.loader.getScript('https://dev.fandom.com/load.php?mode=articles&articles=MediaWiki:ArticlesAsResources.js&only=scripts').then(function() {
    importArticles({
        type: 'script',
        articles: [
            'u:dev:Discord.js',
        ],
    });
});