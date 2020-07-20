/* Any JavaScript here will be loaded for all users on every page load. */

// Import external scripts
importArticles({
    type: "script",
    articles: [
        'w:c:dev:Countdown/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:OggPlayer/code.js',
        "MediaWiki:Countdown.js",
        "MediaWiki:DisplayClock.js",
        "MediaWiki:Sm2.js",
        "MediaWiki:FixVignette.js"
    ]
});
var oggPlayerButtonOnly = false;