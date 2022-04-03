/* Any JavaScript here will be loaded for all users on every page load. */

if (document.getElementById('discordBannerPublic')) {
    importArticles({
        type: "script",
        articles: [
            "MediaWiki:Common.js/discordASTDBannerPublic.js"
        ]
    });
}