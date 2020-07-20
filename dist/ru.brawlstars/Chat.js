window.ChatThemes = {
    themes: [
            theme1 = {
                name: 'Светлая',
                class: 'theme1'
            },
            theme2 = {
                name: 'Бравл',
                class: 'theme2'
            },
    ]
};

window.ChatStatus = {
	statuses: {
		afk: "AFK",
		edit: "Редактирует",
        game: "Играет в игры",
        discord: "Отошёл в Discord",
        other: "Занят",
        weekend: "Взял выходной",
	},
	debug: true
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:EmoticonsWindow/code.js',
        'u:dev:MediaWiki:ChatSendButton.js',
        'u:dev:MediaWiki:ChatThemes/code.js',
        'u:dev:MediaWiki:ChatStatus/code.js',
        'u:dev:MediaWiki:CustomModIcons.js',
    ]
});