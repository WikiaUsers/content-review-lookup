/* Importations */
importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatOptions/code.js',
        'MediaWiki:Chat.js/insertAtCaret.js',
        'MediaWiki:Chat.js/listaEmoticons.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:dev:ChatNotifications/code.js'
    ]});
importArticles({ type: 'script', articles: [
        'u:dev:MediaWiki:ChatHacks.js'
]});

importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');

/* ChatNotifications */
var sfNotifications = {};
    sfNotifications.options = {
        audio: 'https://images.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg',
        caseInsensitive: false,
        highlight: false,
        highlightColor: 'red',
        notification: false,
        ping: false,
        pings: ["Foo", "Bar", "Baz"],
        regex: false,
        window: false
    };