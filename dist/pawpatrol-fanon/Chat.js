var chatags = { images: true, videos: true };
chatAnnouncementsAll = true;

window.absentMessage = '<user> is not at the chat to cause trouble.';
importScriptPage('!kick.js', 'dev');

importArticles({
    type: 'script',
    articles: [

    'u:dev:MediaWiki:ChatOptions/code.js',
    'u:shining-armor:MediaWiki:ChatTags/code.js',
    'u:dev:MediaWiki:ChatAnnouncements/code.js',
    'u:dev:MediaWiki:!mods/code.js',
    'u:dev:MediaWiki:!kick/code.js',
    'u:dev:MediaWiki:Tictactoe/code.js',
    "u:dev:IsTyping/code.js"
    ]
});


window.IsTyping = {
    $indicator: $('<div>', {
        class: 'typing-indicator'
    }).appendTo('body'),
    noStyle: true,
    doScroll: false,
    mainRoomDisabled: true
}