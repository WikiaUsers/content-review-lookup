/**
 * Chat topic
 *   From the RuneScape Wiki
 */
var chatTopic = 'Por favor, leia as <a href="O Incrível Mundo de Gumball Wiki:Regras do Chat" target="_blank">Regras do Chat</a> antes de conversar.';
 
$(function () {
    "use strict";
    $('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#FFFFFF; font-weight:bold; line-height:1.6; margin-left:110px;">' + chatTopic + '</div>').find('a').attr('style', 'position:relative; text-decoration:underline;');
});
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();



/**
 * Mark admins and chat mods
 */
setInterval(function () {
    "use strict";
    $('.User.chat-mod .username').each(function () {
        if (this.innerHTML.match(/Gummy Brony|Derpy Star123|GumballGuy2361|Pedro Flares/)) {
            $(this).parent().addClass('admin').removeClass('chat-mod');
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
        $('<div class="clearChatText" onclick="clearChat()" style="margin: 10px auto; -webkit-user-select: none; -moz-user-select: none; user-select: none;" align="center"><a class="clearChatButton wikia-button">Limpar chat</a></div>').prependTo('.Rail');
    }
}
 
function clearChat() {
    "use strict";
    var chatSize = $('div.Chat:first ul li').size() - 1;
    $('.Chat:first li:lt(' + chatSize + ')').remove();
}
 
window.onload = addClearChatText();
 
/**
 * Spam protection
 *   By [[User:Joeytje50]]
 *   From the RuneScape Wiki
 */
 
var maxLimit = 6, // Limit for sent lines
    maxLength = 1250, // Limit for how long a line can be (in chars)
    limitTimeout = 2000, // Timeout for the sent lines limiter
    rate = 0;
 
function ratelimit(e) {
    if (rate > maxLimit) {
        this.disabled = true;
        e.preventDefault();
        mainRoom.sendMessage({
            which: 13,
            shiftKey: false,
            preventDefault: function () {}
        });
        document.location.href = wgServer + "/wiki/Main_Page";
        return false;
    }
    if (this.value.length >= maxLength || this.value.split('\n').length >= 6) {
        var val = this.value.substring(0, maxLength).split('\n');
        val = val[0] + '\n' + val[1] + '\n' + val[2] + '\n' + val[3] + '\n' + val[4];
        this.value = val;
        if (e.type === 'keypress') {
            e.preventDefault();
            return false;
        }
    }
    if (e.type === 'keypress' && e.which === 13 && !e.shiftKey && this.value !== '') {
        rate += 1;
        setTimeout(function () {
            if (rate > 0) {
                rate -= 1;
            }
        }, limitTimeout);
    }
}
$('[name="message"]').keyup(ratelimit).keypress(ratelimit).keydown(ratelimit);
 
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