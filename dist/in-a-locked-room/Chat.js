var chatags = { videos: true };
 
// Chat Announcements; chat moderators and above 
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatOptions/code.js',
        'u:kocka:MediaWiki:Emoticons.js',
        'u:dev:ChatBlockButton/code.2.js',
        'u:dev:GiveChatModPrompt/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:!kick/code.js',
        'u:dev:MediaWiki:!ban/code.js',
        'u:dev:MediaWiki:!mods/code.js',
        'u:dev:ChatImages/code.js',
        "u:dev:MediaWiki:ChatStatus/code.js",
        'u:dev:MediaWiki:FaviconNotifier/code.js',
        "u:dev:Tabinsert.js",
        'u:dev:SpellingBee/startup.js',
        'u:dev:MediaWiki:Tictactoe/code.js',
        'u:dev:MediaWiki:Jumbles/startup.js',
        "u:dev:IsTyping/code.js"
    ]
});
 
 window.ChatStatus = {
	statuses: {
		afk: "AFK",
		edit: "Editing",
		food: "Eating",
		tv: "Watching TV",
		game: "Playing games",
		study: "Studying",
		meme: "Making memes",
		hw: "Doing HW",
		rp: "Roleplaying",
		yt: "Watching YouTube",
		zzz: "Sleeping/Siesta",
		bored: "is Bored",
		lrp: "Looking for a RP",
		net: "Surfing the Web",
		test: "Testing something",
		fix: "Fixing something",
		gtg: "Going somewhere",
		fun: "Having fun!",
		draw: "Drawing",
		chore: "Doing chores",
		news: "Learning News",
		lazy: "Being lazy...",
		wait: "Waiting for other users"
	},
	debug: true
};