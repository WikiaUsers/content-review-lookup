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
        'u:dev:MediaWiki:ExtendedPrivateMessaging/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:dev:MediaWiki:ChatSyntaxHighlight.js',
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

// Dragon anon avatars
function changeSourceAll() {
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
        if (images[i].src.includes('https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/')) {
            images[i].src = images[i].src.replace("https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/28?format=jpg", "https://vignette.wikia.nocookie.net/wings-of-fire-experimental/images/0/06/Anonymous_IceWing_Wiki.png/revision/latest/scale-to-width-down/28");
            images[i].src = images[i].src.replace("https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/28", "https://vignette.wikia.nocookie.net/wings-of-fire-experimental/images/0/06/Anonymous_IceWing_Wiki.png/revision/latest/scale-to-width-down/28");
            images[i].src = images[i].src.replace("https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/41", "https://vignette.wikia.nocookie.net/wings-of-fire-experimental/images/0/06/Anonymous_IceWing_Wiki.png/revision/latest/scale-to-width-down/41");
        }
    }
}
changeSourceAll();
 
setInterval(function(){
    changeSourceAll();
}, 1000);


//ChatThemes Modified
window.ChatThemes = {
    current: null,
    themes: [
        chatskin1 = { name: 'Chatskin 1', class: 'chatskin1' },
        chatskin2 = { name: 'Chatskin 2', class: 'chatskin2' },
        chatskin3 = { name: 'Chatskin 3', class: 'chatskin3' },
        chatskin4 = { name: 'Chatskin 4', class: 'chatskin4' },
        chatskin5 = { name: 'Chatskin 5', class: 'chatskin5' },
        chatskin6 = { name: 'Chatskin 6', class: 'chatskin6' },
        chatskin7 = { name: 'Chatskin 7', class: 'chatskin7' },
        night = { name: 'Nightmode', class: 'nightmode' }
    ],
    functions: {
        changeTheme: function() {
            if (ChatThemes.current !== null) {
                $('.ChatWindow').removeClass(ChatThemes.current.class);
            }
            ChatThemes.current = ChatThemes.themes.shift();
            ChatThemes.themes.push(ChatThemes.current);
            $('.ChatWindow').addClass(ChatThemes.current.class);
        },
        init: function() {
            $('.wds-button-group.chat-toolbar').append('<div class="wds-button wds-is-secondary chat-toolbar__button ThemesButton">Change Chatskin</div>');
            $('.ThemesButton').click(ChatThemes.functions.changeTheme);
        }
    }
}
 
window.setTimeout(ChatThemes.functions.init, 5000);