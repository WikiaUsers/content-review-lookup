/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js",
        "w:dev:WallGreetingButton/code.js",
        "MediaWiki:Common.js/forumnote.js",
        "MediaWiki:Common.js/editnotice.js",
        "MediaWiki:Common.js/insertNewArticleTemplate.js"
    ]
}, {
    type: "style",
    articles: [
        "MediaWiki:BFW-CategoryBoxes.css"
    ]
});