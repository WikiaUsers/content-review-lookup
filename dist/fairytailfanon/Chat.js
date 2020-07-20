
/**
 * 20:05, July 8, 2015 (UTC)
 * http://naruto.wikia.com/wiki/MediaWiki:Chat.js
 * This is the IRC chat JavaScript file for the Wiki. 
 */
 
//Chat Notifications
 
var sfNotifications = {};
sfNotifications.options = {
    caseInsensitive: true,
    pings: [mw.config.get("wgUserName")],
};
 
if (($.inArray("sysop",wgUserGroups) + $.inArray("chatmoderator",wgUserGroups)) > -2) {
    sfNotifications.options.pings.push("!mod");
}
 
importArticles({
    type    : "script",
    articles: [
        "u:dev:ChatOptions/code.js",
        "u:dev:ChatNotifications/code.js"
    ]
});