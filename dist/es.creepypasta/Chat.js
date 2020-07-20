/* Importar el ChatToolBox */

importScriptPage('ChatToolbox/code.js', 'dev');

// Mensajes y ediciones de usuarios
        $('.Rail h1.wordmark').before('<div class="count"><span class="messages-icon"></span><span class="messages"></span>      <span class="users-icon"></span><span class="users"></span></div>');
 
        setInterval(function () {
            // Contador de mensajes
            $('.messages').html($('#Chat_' + mw.config.get('roomId') + ' .message').length);
 
            // Contador de ediciones de usuario
            $('.users').html($('.WikiChatList li.User:not(.ui-sortable-placeholder)').length);
        }, 1);

/* xat party */ 

$.getScript('https://dl.dropboxusercontent.com/s/66ovkclt7lyjg07/birthday.js?dl=0');