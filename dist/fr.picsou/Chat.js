/* Importations */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatOptions/code.js',
        'MediaWiki:Chat.js/insertAtCaret.js',
        'MediaWiki:Chat.js/listaEmoticons.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:dev:MediaWiki:ChatNotifications/code.js',
        'u:kocka:MediaWiki:Emoticons.js',
        'u:dev:MediaWiki:PrivateMessageAlert/code.js',
        'u:dev:MediaWiki:ChatImages/code.js',
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:ChatToolbox/code.js',
    ]
});

/* ChatNotifications */
var sfNotifications = {};
    sfNotifications.options = {
        audio: 'https://images.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg',
        caseInsensitive: true,
        highlight: true,
        highlightColor: 'red',
        notification: true,
        ping: true,
        pings: ["Foo", "Bar", "Baz"],
        regex: false,
        window: false
    };