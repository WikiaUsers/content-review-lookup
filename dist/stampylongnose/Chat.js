/**
 * Mark rollbacks, chat-mods, admins, and bureaucrats
 */
setInterval(function () {
    "use strict";
    $('.User.chat-mod .username').each(function () {
        if (this.innerHTML.match(/RatchetInTheDino|Vaughanmoore/)) {
            $(this).parent().addClass('admin').removeClass('chat-mod');
        }
        if (this.innerHTML.match(/KalinParsonsGaming|SuperlyAttachedGlitch77|Trenchpit|Ollieeh/)) {
            $(this).parent().addClass('bureaucrat').removeClass('chat-mod');
        }
        if (this.innerHTML.match(/Tundratotalyrocks/)) {
            $(this).parent().addClass('rollback').removeClass('chat-mod');
        }
        if (this.innerHTML.match(/Mystery Confetti|CaptainChimpy/))
            $(this).parent().addClass('chat-mod');
    });
}, 1);
/**
 * Clear chat
 */
function addClearChatText() {
    "use strict";
    if ($('.clearChatText').length <= 0) {
        var clearChatText = document.createElement('span');
        $('<div class="clearChatText" onclick="clearChat()" style="margin: 10px auto; -webkit-user-select: none; -moz-user-select: none; user-select: none;" align="center"><a class="clearChatButton wikia-button">Clear Chat</a></div>').prependTo('.Rail');
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
 *   By [[User:Shining-Armor]]
 */
importScriptPage('ChatTags/code.js', 'dev');