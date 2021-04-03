// ChatTags
window.chatags = {
    images: true,
    videos: true
};
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
        'u:dev:ChatOptions/code.js',
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
//Add chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = '<font color:#000000>Welcome to the Battle for Admin Wiki chat! <br/ >Please make sure to read the <a href="/wiki/Battle for Admin Wiki:Rules" target="_blank" title="Rules"><u>rules</u></a> before using the chat.</font>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#000000; font-weight:normal; line-height:1.6; margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
 
//CHAT TOPIC END
 
//Chat importArticles
importArticles({
    type: "script",
    articles: [
         "u:shining-armor:MediaWiki:ChatTags/code.js",
         'u:dev:MediaWiki:ChatAnnouncements/code.js',
         'u:dev:MediaWiki:IsTyping.js',
    ]
    });
importArticles({ type: 'script', articles: [
    'u:dev:MediaWiki:ChatHacks.js',
    'u:dev:MediaWiki:EmoticonsWindow/code.js',
    'u:dev:MediaWiki:GiveChatMod/code.js',
]});

/* Day/Night Switch Feature */
function dayNightButton() {
    var dayText = 'Day theme';
    var nightText = 'Night theme';
    var $dayNightButton = $('<div>').addClass('chat-button');
    var $dayNightLink = $('<a>').addClass('wikia-button').text(dayText);
    var $body = $('body');
    $dayNightButton.html($dayNightLink);
    $dayNightLink.click(function() {
        $body.toggleClass('day');
        $body.toggleClass('night');
        $(this).text(function(index, text) {
            return text === dayText ? nightText : dayText;
        });
    });
    $body.addClass('night');
    return $dayNightButton;
}
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
        'u:dev:MediaWiki:IsTyping.js',
        'u:dev:MediaWiki:ChatImages/code.js'
    ]
});