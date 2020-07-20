/* Any JavaScript here will be loaded for all users on every page load. */

/* BlockMessages module setup */
var MessageBlock = {
  title : 'Blocked',
  message : '{'+'{subst:#invoke:BlockMessages|main|reason=$1|expiry=$2}'+'}',
  autocheck : true  // set to false, if automatic block messages are not desired
};

/* RailWAM setup */
window.railWAM = {
    logPage:"Project:WAM Log"
};

/* Import scripts for all users */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:InputUsername/code.js",
        "w:c:dev:DisableBotMessageWalls/code.js",
        'u:dev:MediaWiki:WallGreetingButton/code.js',
        'u:dev:MediaWiki:RailWAM/code.js',
    ]
});