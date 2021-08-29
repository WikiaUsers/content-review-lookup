/* Any JavaScript here will be loaded for users using the desktop site */

$('.wrapped').wrap('<div class="table-wrapper">');
$('.wikitable').wrap('<div class="table-wrapper">');

mw.loader.getScript('https://dev.fandom.com/index.php?title=MediaWiki:ArticlesAsResources.js&action=raw&ctype=text/javascript').then(function() {
    importArticles({
        type: 'script',
        articles: [
            'u:dev:Discord.js',
        ],
    });
});