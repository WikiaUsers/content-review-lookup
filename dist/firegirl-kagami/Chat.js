importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatHacks.js',
    ]
});
window.ChatHacksNoStar = true;

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:EmoticonsWindow/code.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatSendButton.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatImages/code.js',
    ]
});

/* chat status */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatStatus/code.js',
    ]
});

window.ChatStatus = {
	statuses: {
	    online: "Online",
		afk: "Idle",
		edit: "Editing"
	},
	debug: false
};

/* Kicking users */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:FixAdminKick/code.js',
    ]
});