importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:ChatHacks.js'
});

/**
 * Mark chat moderators, admins, and bureaucrats
 */
setInterval(function () {
    "use strict";
    $('.User.chat-mod .username').each(function () {
        if (this.innerHTML.match(/Kelliegeorgiashadowsmith|TalkingOddlySpooky|Random_Pesron/)) {
            $(this).parent().addClass('admin').removeClass('chat-mod');
        }
        if (this.innerHTML.match(/Idroppedmypen|TwoBrainsAreBetterThanOne|Baghead11/)) {
            $(this).parent().addClass('bureaucrat').removeClass('chat-mod');
        }
        if (this.innerHTML.match(/Baghead12/)) {
            $(this).parent().addClass('bot').removeClass('chat-mod');
        }
    });
}, 1);
 
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
 
/**
 * Chat options
 *   By [[User:Callofduty4]], [[User:Madnessfan34537]], and [[User:Sactage]]
 *   From the Call of Duty Wiki
 */
var chatOptionsLoaded = false;
if (!chatOptionsLoaded) {
    chatOptionsLoaded = true;
    importScriptPage('MediaWiki:Chat.js/options.js', 'cod');
}
 
/**
 * ChatTags
 *   By [[User:AnimatedCartoons]]
 */
var chatags = { images: true, videos: true };
importScriptPage('ChatTags/code.js', 'dev');
 
importArticles( {
    type: 'script',
    articles: [
        'u:dev:!kick/code.js',
        'u:dev:!mods/code.js',
        'u:dev:NewMessageCount.js',
        "u:dev:MediaWiki:PrivateMessageAlert/code.js"
    ]
} );