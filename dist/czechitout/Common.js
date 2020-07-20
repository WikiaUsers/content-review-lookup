/* Any JavaScript here will be loaded for all users on every page load. */

SpoilerAlert = {
    isSpoiler: function () {
        return Boolean($('.spoiler').length);
    }
};
importArticles({
    type: "script",
    articles: [
        "MediaWiki:SimpleAgegate.js"

    ]
});