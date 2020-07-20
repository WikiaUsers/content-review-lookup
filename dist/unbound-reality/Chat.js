window.IsTyping = {
    $indicator: $('<div>', {
        class: 'typing-indicator'
    }).appendTo('body'),
    noStyle: true,
    doScroll: false,
    mainRoomDisabled: true
}

// Chat Options & Other Imports //
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatOptions/code.js',
        'u:dev:MediaWiki:CustomModIcons.js',
        'u:dev:MediaWiki:IsTyping/code.js'
    ]
});