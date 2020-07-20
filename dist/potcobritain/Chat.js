///*** Chat Statuses ***///

window.ChatStatus = {
	statuses: {
		afk: "𝙳𝚛𝚎𝚊𝚖𝚒𝚗𝚐 𝚘𝚏 𝙶𝚘𝚘𝚍 𝙱𝚞𝚜𝚒𝚗𝚎𝚜𝚜",
		edit: "𝙻𝚘𝚋𝚋𝚢𝚒𝚗𝚐",
		food: "Dʀɪɴᴋɪɴɢ ᴛᴇᴀ", 
		bathroom: "𝔘𝔰𝔦𝔫𝔤 𝔱𝔥𝔢 𝔠𝔥𝔞𝔪𝔟𝔢𝔯𝔭𝔬𝔱",
		tlopo: "ℛ𝓲𝓭𝓭𝓲𝓷𝓰 𝓽𝓱𝒆 𝓒𝓪𝓻𝓲𝓫𝓫𝒆𝓪𝓷 𝓸𝒇 𝓹𝓲𝓻𝓪𝓬𝔂",
		game: "OᑭᖇᕮᔕᔕIᑎG IᑎᗪIᗩ"
	},
	debug: false
};

///*** Imports ***///

importArticles({
	type: 'script',
	articles: [
		'u:dev:MediaWiki:!mods/code.js',
		'u:dev:MediaWiki:PrivateMessageAlert/code.js',
		'u:dev:MediaWiki:CustomChatPings/code.js',
		'u:dev:MediaWiki:ChatStatus/code.js',
		'u:dev:MediaWiki:ChatAnnouncements/code.js',
		'u:kocka:MediaWiki:Emoticons.js',
		'u:dev:MediaWiki:ClassicModIcons/code.js',
	]});