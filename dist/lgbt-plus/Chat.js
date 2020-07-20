importArticles({
    type: "script",
    articles: [
        'u:dev:MediaWiki:!ban/code.js',
        'u:dev:MediaWiki:!kick/code.js',
        'u:dev:ChatAvatarUserPageLink.js',
        'u:dev:MediaWiki:ChatBlockButton/code.2.js',
        'u:dev:MediaWiki:Custom-chat-ban-template/code.js',
        'u:dev:MediaWiki:ChatOptions/code.js',
        'u:kocka:MediaWiki:Emoticons/code.js',
        'u:dev:MediaWiki:ExtendedPrivateMessaging/code.js',
        'u:dev:MediaWiki:IsTyping.js'
    ]
});
 
window.IsTyping = {
    doScroll: true
};

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