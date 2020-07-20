/* User Chat Status */
window.ChatStatus = {
statuses: {
afk: "Is AFK",
awesome: "Is Awesome",
stalking: "Is stalking",
admin: "Is being an admin",
user: "Is being a user", 
mlg: "is being an MLG dude",
radium: "is dancing hysterically",
wut: "is being a fucking retard"
        },
        debug: false
};

chatAnnouncementsAll = false;
 
var chatags = { images: true, videos: true };
/* Imports */
importArticles({
    type: 'script',
    articles: [
        'u:dev:BlinkingTabAlert.js',
        //'u:dev:ChatUserPageButton.js',
        //'u:dev:ChatHacksNoStar/code.js',
        'u:dev:MediaWiki:ChatStatus/code.js',
        'u:kocka:MediaWiki:Emoticons/code.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:!kick/code.js',
        'u:diepio-custom-polygons:ChatCommand.js'
    ]
});//End UI*/
 
/* Staff CSS */
(function (mw) {
    "use strict";
 
    var wUG = mw.config.get("wgUserGroups"),
        isStaff = /(bureaucrat|sysop|content-moderator|threadmoderator|chatmoderator|rollback)/.test(wUG.join(" "));
 
    if (isStaff) {
        importArticles({
            type: "style",
            article: "MediaWiki:Staff.css"
        });
    }
}(mediaWiki));//End SCSS*/