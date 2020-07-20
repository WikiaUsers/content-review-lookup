importArticles({
    type: "script",
    articles: [
        "w:dev:Countdown/code.js",
        "w:dev:DisplayClock/code.js",
        "w:dev:BackToTopButton/code.js",
        "MediaWiki:Common.js/DISPLAYTITLE.js",
        "MediaWiki:Common.js/SpoilerPop.js"
    ]
});

SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Prossimamente...');
    }
};