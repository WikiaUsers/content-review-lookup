/* Chat Statuses */
window.ChatStatus = {
	statuses: {
    editing: "is editing",
    gaming: "is gaming",
    eating: "is eating",
    AFK: "is AFK",
    semiafk: "is semi-afk",
    thinking: "is thinking",
    away: "is away temporarily",
    stalking: "is stalking",
    bored: "is bored",
    polygon: "is being a polygon",
    OPpolygon: "is being a OP polygon",
    polygonded: "is killing polygons",
    tank: "is being a tank",
    OPtank: "is being a OP tank",
    tankded: "is killing tanks",
    boss: "is a boss",
    OPboss: "is a OP boss",
    ugly: "is ugly",
    suggestive: "is being suggestive :^)",
    OP: "is OP"
	},
	debug: false
};

chatAnnouncementsAll = false;

var chatags = { images: true, videos: true };

/* Imports*/
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
        'MediaWikI:ChatCommand.js'
    ]
});