importArticles({
    type: "script",
    articles: [
        "u:dev:ChatOptions/code.js",
        'u:kocka:MediaWiki:Emoticons/code.js',
        'u:dev:ChatAvatarUserPageLink.js',
        'u:dev:MediaWiki:ChatModHover/code.js',
        'u:dev:MediaWiki:!kick/code.js',
        'u:dev:MediaWiki:!ban/code.js',
        'u:dev:IsTyping/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js'
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