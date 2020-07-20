/**
 * ChatTags
 *   By [[User:AnimatedCartoons]]
 */
(function ($) {
    "use strict";
    mainRoom.model.chats.bind('afteradd', function (chat) {
        var t = chat.attributes.text,
            $m = $('.Chat .message:last').html();

        if (t.match(/(?=.*\/limpiar)/gi) && t.prev().text() == "Benfutbol10") {
      	    $('.Chat ul').append('<div class="inline-alert">Limpieza del chat ejecutada por ' + $(".Chat .message:last").prev().text() + '.</div>');
            $('.Chat li').remove();
            return false;
        }

        $('.Chat .message:last').html($m);
    });
}(this.jQuery));