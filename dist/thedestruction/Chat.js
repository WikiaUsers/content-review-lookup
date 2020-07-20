// Chat options
importScriptPage('ChatOptions/code.js', 'dev');
 
// The following code is needed to mark bureaucrats and admins from chatmoderators in special:chat
// The following code is to be inserted to your wiki's Chat.js
// Mark admins and bureaucrats
setInterval(function () {
    "use strict";
    $('.User.chat-mod .username').each(function () {
        if (this.innerHTML.match(/FlakyPorcupine/)) {
            $(this).parent().addClass('admin').removeClass('chat-mod');
        }
        if (this.innerHTML.match(/MasterOfDescruction|HurricaneTeen6900/)) {
            $(this).parent().addClass('bureaucrat').removeClass('chat-mod');
        }
       
    });
}, 1);