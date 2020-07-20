//Настройки импортов

var ExtendedPrivateMessaging = {
    groupIcon: 'https://i.imgur.com/ulaOCLw.png'
};

window.PrivateMessageAlert = $.extend(window.PrivateMessageAlert, {
    beepSound: 'https://vignette.wikia.nocookie.net/five-nights-at-freddys-rus/images/5/5c/PartyFavorraspyPart_AC01_3.ogg/revision/latest?cb=20141216181918&path-prefix=ru',
    message: '$1 прислал вам личное сообщение!',
    notifications: true,
    alertWhileFocused: false,
    interval: 1000
});

var chatags = { images: true, videos: true };

window.ModPing = "https://vignette.wikia.nocookie.net/five-nights-at-freddys-rus/images/9/92/Startday.ogg/revision/latest?cb=20150311022623&path-prefix=ru";

/*
window.ChatThemes = {
    themes: [
            theme = {
                name: 'Theme',
                class: 'theme1'
            },
    ]
}
*/

//Импорт
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:IsTyping/code.js',
        'u:dev:MediaWiki:ExtendedPrivateMessaging/code.js',
        'u:dev:MediaWiki:ChatUserPageButton.js',
        'u:dev:MediaWiki:EmoticonsWindow/code.js',
        'u:dev:MediaWiki:FaviconNotifier/code.js',
        'u:dev:MediaWiki:PrivateMessageAlert/code.js',
        'u:dev:MediaWiki:ChatThemes/code.js',
        'u:dev:MediaWiki:ChatSyntaxHighlight.js',
        'u:dev:MediaWiki:ChatHacks.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:dev:MediaWiki:!mods.js',
        'u:dev:MediaWiki:FucodeLogger.js',
        'u:dev:MediaWiki:ChatImages/code.js',
        'u:dev:MediaWiki:ChatDelay/code.js',
        'u:dev:ChatLinkPreview/code.js',
        'u:dev:ChatTags/code.js'
    ]
});