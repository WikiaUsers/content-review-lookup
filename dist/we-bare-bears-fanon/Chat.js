/* classes for the staff */
setInterval(function () {
    "use strict";
    $('.username').each(function () {
        if (this.innerHTML.match(/Vérité et Masques/)) {
            $(this).parent().addClass('founder').removeClass('chat-mod');
        }
        if (this.innerHTML.match(/Sharayna|Perlen297/)) {
            $(this).parent().addClass('bureaucrat').removeClass('chat-mod');
        }
        if (this.innerHTML.match(/AndyToons/)) {
            $(this).parent().addClass('admin').removeClass('chat-mod');
        }
        /*
        if (this.innerHTML.match(/Sharayna|Sergeant Spitfire/)) {
            $(this).parent().addClass('chatmod').removeClass('chat-mod');
        }
        */
    });
}, 1);
setInterval(function () {
    "use strict";
    $('.username').each(function () {
        /*
        if (this.innerHTML.match(/Randomphoenix03/)) {
            $(this).parent().addClass('moderator');
        }
        if (this.innerHTML.match(/Evtini200/)) {
            $(this).parent().addClass('rollback');
        }
        */
    });
}, 1);
 
/* Clear chat */
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
 
/* Chat options */
var chatOptionsLoaded = false;
if (!chatOptionsLoaded) {
    chatOptionsLoaded = true;
}
 
//—————————————————————————————— ! ! ! ———————————————————————————————//
/* Import scripts. NOTE: Place scripts configurations above this line */
importArticles( {
    type: 'script',
    articles: [
        'u:dev:ChatTags/code.js',
        'u:dev:!mods/code.js',
        'u:dev:ChatOptions/code.js'
    ]
} );