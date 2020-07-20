importScriptPage('ChatOptions/code.js', 'dev');
// Mark admins from chatmoderators
setInterval(function () {
    "use strict";
    $('.User.chat-mod .username').each(function () {
        if (this.innerHTML.match(/TheFinalPhase|Mckrongs|Heaven Canceller|Kason1221/)) {
            $(this).parent().addClass('admin').removeClass('chat-mod');
        }
    });
}, 1);