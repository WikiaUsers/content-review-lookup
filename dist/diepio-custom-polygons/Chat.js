/* User Chat Status */
window.ChatStatus = {
	statuses: {
    afk: "Is AFK",
    awesome: "Is Awesome",
    stalking: "Is stalking",
    admin: "Is being an admin",
    user: "Is being a user",
    chat: "Is being a Chat Mod",
    bendy: "Is being Bendy",
    bored: "Is bored",
    square: "Is being a Square",
    triangle: "Is being a Triangle",
    pentagon: "Is being a Pentagon",
    hexagon: "Is being a Hexagon",
    heptagon: "Is being a Heptagon",
    octagon: "Is being an Octagon",
    nonagon: "Is being a Nonagon",
    hendecagon: "Is being a Hendecagon",
    polygon: "Is a being a polygon",
    Mystery:"Is being Mysterious",
    secret: "Is being secrative",
    unnamed_secret: "Is being secrative about a secret about a secret",
    helicoptor: "Is riding a helicoptor",
    obvious: "Is using electronics to use chat",
    rmzlk: "Is using other chats",
    crackers: "Is Tacocat247",
    tacocat: "Is being Crackers",
    tank: "Is being a tank",
    tenk: "Es Beyeng uh tenk",
    friend: "Is being a friend",
    letters: "Is QWERTYUIOPASDFGHJKLZXCVBNM",
    cookie: "is a cookie",
    Anticookie: "wants to eat a cookie",
    orocorio: "BIRDIE!!!",
    autotrapper: "Is a Auto Trapper",
    ftrapioki: "Is Fighting Trapioki",
    dtrapioki: "Is defending Trapioki",
    ftrapius: "Is fighting Trapius",
    dtrapius: "Is defending Trapius",
    sentry: "Is fighting The Sentry",
    sentry2: "Is fighting The Sentry II",
    nothing: "Is fighting Nothing",
    backwards: "sdrawkcab gnikaeps sI",
    lenny: "( ͡° ͜ʖ ͡°)",
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
            'MediaWiki:ChatCommand.js',
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