
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
importScriptPage("ChatNotifications/code.js", "dev");

setInterval(function () {
    "use strict";
    $('.User.chat-mod .username').each(function () {
        if (this.innerHTML.match()) {
            $(this).parent().addClass('admin');
        }
        if (this.innerHTML.match()) {
            $(this).parent().addClass('bureaucrat');
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
importScriptPage('ChatTags/code.js', 'dev');

importArticles( {
    type: 'script',
    articles: [
        'u:dev:!kick/code.js',
        'u:dev:!mods/code.js',
    ]
} );