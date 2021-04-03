///*** Chat Statuses ***///

window.ChatStatus = {
	statuses: {
		afk: "AFK",
		edit: "Editing",
		food: "Eating a potato",
		bathroom: "On the think pot",
		tlopo: "Playing TLOPO",
		game: "Playing anything but TLOPO",
		mall: "Obeying Lord Mallace",
		staff: "Commanding the Wiki"
	},
	debug: false
};

///*** Imports ***///

importArticles({
	type: 'script',
	articles: [
		'u:dev:MediaWiki:PrivateMessageAlert/code.js',
		'u:dev:MediaWiki:!mods/code.js',
		'u:dev:MediaWiki:CustomChatPings/code.js',
		'u:dev:MediaWiki:ChatStatus/code.js',
        'u:dev:FixAdminKick/code.js'
]
});