$(function () {
    'use strict';
 
    var $messageBox = $('.Write [name="message"]');
    var $sendButton = $('<span class="button">Enviar mensaje</span>');
 
    $sendButton
        .css({
            position: 'relative',
            bottom: '33px',
            left: '951px'
        })
        .click(function () {
            $messageBox.trigger({
            type: 'keypress',
            which: 13 // enter/return key
        });
    });
 
    $messageBox
        .css('width', 'calc(100% - 70px)')
        .after($sendButton);
});