/* PrivateMessageAlert */
var PrivateMessageAlert = {
    beepSound: 'https://images.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg',
    notifications: true,
    alertWhileFocused: false
};

/* ChatStatus */
window.ChatStatus = {
	statuses: {
		afk: "Ausente",
		edit: "Editando",
		food: "Comendo",
		tv: "Assistindo",
		game: "Jogando"
	},
	debug: false
};

/* Imports */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatOptions/code.js',
        'u:dev:MediaWiki:PrivateMessageAlert/code.js',
        'u:kocka:MediaWiki:Emoticons.js',
        'u:dev:MediaWiki:AjaxEmoticons/code.js',
        'u:dev:MediaWiki:!mods/code.js',
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:ChatStatus/code.js'
    ]
});