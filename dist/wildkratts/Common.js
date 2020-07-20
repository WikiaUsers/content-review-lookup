/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: "script",
    articles: [
        "MediaWiki:Common.js/InactiveUsers.js",
        "MediaWiki:Common.js/SpoilerPop.js",
        "MediaWiki:Common.js/JsTabs.js",
         "u:dev:BackToTopButton/code.js",
        "u:dev:ReferencePopups/code.js",
        "u:dev:FloatingToc/code.js",
        "u:dev:Countdown/code.js",
        "u:dev:DisplayClock/code.js"
        ]
});

var MessageBlock = {
  title : 'Block',
  message : 'You have been blocked for $2 because you have $1.'
};

SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Upcoming Content');
    }
};