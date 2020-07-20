// The following code is needed to mark bureaucrats and admins from chatmoderators in special:chat
// The following code is to be inserted to your wiki's Chat.js
// Mark admins and bureaucrats
setInterval(function(){
    "use strict";
    $('.User.chat-mod .username').each(function () {
 
        if (this.innerHTML.match(/Bobnekaro|Sassmaster15/)) {
            $(this).parent().addClass('admin').removeClass('chat-mod');
        }
        if (this.innerHTML.match(/DarrenDude|Hypercane/)) {
            $(this).parent().addClass('bureaucrat').removeClass('chat-mod');
        }
        if (this.innerHTML.match(/Example1/)) {
            $(this).parent().addClass('junioradmin').removeClass('chat-mod');
        }         
        if (this.innerHTML.match(/Example2/)) {
            $(this).parent().addClass('rollback').removeClass('chat-mod');
        }         
        if (this.innerHTML.match(/Example3/)) {
            $(this).parent().addClass('bot').removeClass('chat-mod');
        }      
    });
}, 1);