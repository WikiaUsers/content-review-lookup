$(function() {
    var commentheader = "#WikiaArticleComments > h1#article-comments-counter-header";
    $("body").on("DOMNodeInserted", commentheader, function() {
        importArticles({
            type: 'script',
            articles: [
                'u:dcsuper:MediaWiki:Sharethis.js'
            ]
        });
    });
}());