importArticles({
    type: 'script',
    articles: [
        'u:dev:!ban/code.js',
        'u:dev:!kick/code.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatAvatarUserPageLink.js',
        'u:dev:ChatModHover/code.js',
        'u:dev:ChatNotifications/code.js',
        'u:dev:ChatOptions/code.js',
        'u:dev:ChatQuote/code.js',
        'u:dev:ChatStatus/code.js',
        'u:dev:ExtendedPrivateMessaging/code.js',
        'u:dev:IsTyping.js',

        'u:kocka:MediaWiki:Emoticons/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
    ]
});
 
window.IsTyping = {
    doScroll: true
};
 
(function() {
    var chatagsEdit = setInterval(function() {
        if(window.chatags && window.chatags.tags) {
            delete window.chatags.tags.big;
            delete window.chatags.tags.bg;
            delete window.chatags.tags.c;
            delete window.chatags.tags.font;
            delete window.chatags.tags.yt;
            delete window.chatags.tags.img;
            clearInterval(chatagsEdit);
        }
    }, 500);
})();

window.ChatStatus = {
	statuses: {
		afk: 'AFK',
		edit: 'Editing',
		food: 'Eating',
		tv: 'Watching TV',
		game: 'Playing games'
	},
	debug: false
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SpellingBee/startup.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Jumbles/startup.js',
    ]
});