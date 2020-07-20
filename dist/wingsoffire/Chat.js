importArticles({
    type: "script",
    articles: [
        'u:dev:MediaWiki:!ban/code.js',
        'u:dev:MediaWiki:!kick/code.js',
        'u:dev:ChatAvatarUserPageLink.js',
        'u:dev:MediaWiki:ChatBlockButton/code.2.js',
        'u:dev:MediaWiki:Custom-chat-ban-template/code.js',
        'u:dev:MediaWiki:ChatOptions/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:kocka:MediaWiki:Emoticons/code.js',
        'u:dev:MediaWiki:ExtendedPrivateMessaging/code.js',
        'u:dev:MediaWiki:FixChatWhitespace.js',
        'u:dev:MediaWiki:IsTyping.js'
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
            images[i].src = images[i].src.replace("https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/28?format=jpg", "https://vignette.wikia.nocookie.net/wings-of-fire-experimental/images/0/04/Anonymous_NightWing_Wiki.png/revision/latest/scale-to-width-down/28");
            images[i].src = images[i].src.replace("https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/28", "https://vignette.wikia.nocookie.net/wings-of-fire-experimental/images/0/04/Anonymous_NightWing_Wiki.png/revision/latest/scale-to-width-down/28");
            images[i].src = images[i].src.replace("https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/41", "https://vignette.wikia.nocookie.net/wings-of-fire-experimental/images/0/04/Anonymous_NightWing_Wiki.png/revision/latest/scale-to-width-down/41");
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
        starflight = { name: 'Starflight', class: 'starflight' },
        lava = { name: 'Lava', class: 'lava' },
        seawingegg = { name: 'SeaWing Egg', class: 'seawingegg' },
        mudwingegg = { name: 'MudWing Egg', class: 'mudwingegg' },
        sandwingegg = { name: 'SandWing Egg', class: 'sandwingegg' },
        wingsoffire = { name: 'Wings of Fire', class: 'wingsoffire' },
        fivedragons = { name: 'Five Dragons', class: 'fivedragons' },
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