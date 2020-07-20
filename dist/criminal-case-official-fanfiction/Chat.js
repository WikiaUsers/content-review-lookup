importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');

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
        'u:dev:MediaWiki:ChatThemes/code.js',
    ]
});