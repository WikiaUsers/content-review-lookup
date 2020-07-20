/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: "script",
    articles: [
        "MediaWiki:Common.js/refresh.js",
        "w:dev:ShowHide/code.js",
        "MediaWiki:Common.js/usertags.js",
        "w:dev:Countdown/code.js",
//        "MediaWiki:Common.js/mosbox.js",
    ]
});

window.ajaxSpecialPages = ['Recentchanges', 'WikiActivity'];