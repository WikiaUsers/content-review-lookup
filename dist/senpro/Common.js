/* Any JavaScript here will be loaded for all users on every page load. */
// Import debug scripts
importArticles({
    type: "script",
    articles: [
        "MediaWiki:Utils.js"
        //"MediaWiki:CommentQuote.js"
    ],
    debug: true,
});