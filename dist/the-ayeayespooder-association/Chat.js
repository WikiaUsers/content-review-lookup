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
        'u:dev:MediaWiki!ban/code.js',
        'u:dev:MediaWiki!kick/code.js',
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:ChatAvatarUserPageLink.js',
        'u:dev:MediaWiki:ChatAwayButton/code.js',
        'u:dev:MediaWiki:ChatMessageWallCount/code.js',
        'u:dev:MediaWiki:ChatNotifications/code.js',
        'u:dev:MediaWiki:ChatOptions/code.js',
        'u:dev:MediaWiki:ChatQuote/code.js',
        'u:dev:MediaWiki:ChatStatus/code.js',
        'u:dev:MediaWiki:EmoticonsWindow/code.js',
        'u:dev:MediaWiki:ExtendedPrivateMessaging/code.js',
        'u:dev:MediaWiki:FixAdminKick/code.js',
        'u:dev:MediaWiki:GiveChatMod/code.js',
        'u:dev:MediaWiki:IsTyping.js',
        'u:dev:MediaWiki:Jumbles/startup.js',
        'u:dev:MediaWiki:SpellingBee/startup.js',
    
        'u:kocka:MediaWiki:Emoticons/code.js',
    
        'u:shining-armor:MediaWiki:ChatTags/code.js',
    ]
});