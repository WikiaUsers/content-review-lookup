/*
	Credits: This stylesheet's structure and organization were inspired by the DOORS Wiki organization and strutcutre
	(https://doors-game.fandom.com/wiki/Special:AllPages?from=&to=&namespace=8).
	Thanks to the DOORS Wiki contributors for outlining how MediaWiki can be organized and themed.
*/
window.MessageBlock = {
    title: "Blocked",
    message: "You have been blocked for $2 because you have been $1. If you wish to appeal this block, please do so under this message.",
    autocheck: true
};
window.TBL_GROUP = "roblox-en";

importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:TopicBlockLog/code.js",
        "u:dev:MediaWiki:MessageBlock/code.js"
    ]
});