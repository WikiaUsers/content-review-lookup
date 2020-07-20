window.ChatStatus = {
	statuses: {
		afk: "AFK",
		edit: "Editing",
		food: "Eating",
		tv: "Watching TV",
		game: "Playing games",
		read: "Reading",
		program: "Programming",
		spree: "On a banning spree",
		btext: "BOTTOM TEXT",
		nsoos: "NOT Soos",
		pie: "Eating pie",
		google: "Googling my name",
		alien: "Being an alien",
		hsapiens: "Homo Sapiens",
		faces: "All around me are familiar faces worn out places worn out fa",
		kawaii: "K-K-K-KAWAII",
		wakemeup: "(Wake me up) Wake me up inside",
		depression: "I have crippling depression",
		thank: "Me too thanks",
		you: "Y-you too",
		meme: "Generating the dankest memes",
		judge: "Silently judging you",
		dead: "LITERALLY DEAD"
	},
	debug: false
};
importArticles({
    type: 'script',
    articles: [
        'u:runescape:User:Joeytje50/tabinsert.js', 
        'u:dev:ChatAnnouncements/code.js', 
        'u:dev:PrivateMessageAlert/code.js',
        'u:dev:MediaWiki:ChatStatus/code.js',
        'u:dev:ChatUserpageLink.js',
        'u:dev:MediaWiki:!kick/code.js',
        'u:dev:ChatOptions/code.js',
        'u:kocka:MediaWiki:Emoticons.js',
        'u:dev:MediaWiki:ChatModHover/code.js',
        'u:dev:MediaWiki:AjaxEmoticons/code.js',
        'u:dev:ChatMessageWallCount.js',
        'u:dev:MediaWiki:Jumbles/startup.js',
        'u:dev:NewMessageCount.js'
    ]
});
 
var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');