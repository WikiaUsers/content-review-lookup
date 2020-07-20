/**
 * Clear chat
 */
function addClearChatText() {
    "use strict";
    if ($('.clearChatText').length <= 0) {
        var clearChatText = document.createElement('span');
        $('<div class="clearChatText" onclick="clearChat()" style="margin: 10px auto; -webkit-user-select: none; -moz-user-select: none; user-select: none;" align="center"><a class="clearChatButton wikia-button">Clear chat</a></div>').prependTo('.Rail');
    }
}

function clearChat() {
    "use strict";
    var chatSize = $('div.Chat:first ul li').size() - 1;
    $('.Chat:first li:lt(' + chatSize + ')').remove();
}

window.onload = addClearChatText();

var chatags = { images: true, videos: true };
importArticles( {
    type: 'script',
    articles: [
        'u:dev:MediaWiki:!mods/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:kocka:MediaWiki:Emoticons/code.js',
        'u:dev:MediaWiki:ExtendedPrivateMessaging/code.js',
        'u:dev:MediaWiki:CustomChatPings/code.js',
        'u:dev:NewMessageCount.js',
        "u:dev:IsTyping/code.js",
    ]
});

window.IsTyping = {
    $indicator: $('<div>', {
        class: 'typing-indicator'
    }).appendTo('body'),
    noStyle: true,
    doScroll: false
};