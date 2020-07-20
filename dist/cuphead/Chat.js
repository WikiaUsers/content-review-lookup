/* User Chat Status */
window.ChatStatus = {
	statuses: {
    afk: "Is AFK",
    awesome: "Is Awesome",
    stalking: "Is stalking",
    admin: "Is being an admin",
    user: "Is being a user",
    chat: "Is being a Chat Mod",
    bored: "Is Bored",
    lenny: "( ͡° ͜ʖ ͡°)",
    cuphead: "Likes Cuphead",
    mugman: "Likes Mugman",
    cala: "Likes Cala Maria",
    end_of_commands: "found the secret"
	},
	debug: false
};//End CS*/
/* Chat Tags */
var chatags = { videos: true };//End CT1*/
 
///////////////////////////////////////////////////////////////////////////
/*************************************************************************/
/********************************* Imports *******************************/
/*************************************************************************/
///////////////////////////////////////////////////////////////////////////
    importArticles({
        type: 'script',
        articles: [
            'u:diepio-custom-polygons:MediaWiki:ChatCommand.js',
            'u:dev:BlinkingTabAlert.js',
            'u:dev:ChatStatus/code.js',
            'u:dev:ChatAnnouncements/code.js'
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