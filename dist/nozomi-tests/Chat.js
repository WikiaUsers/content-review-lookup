'use strict';
/* global mw, chatUI, $, importArticles */

mw.hook('dev.chat').add(function (chat) {
    new chat.button({
        name: 'emoji',
        attr: {
            'id': 'chat-emoji-ui-button',
            text: 'Emoticonos',
            click: null
        }});
    new chat.button({
        name: 'notifications',
        attr: {
            'id': 'chat-notifs-ui-button',
            text: 'Notificaciones',
            click: null
        }});
    new chat.button({
        name: 'rules',
        attr: {
            'id': 'chat-rules-ui-button',
            text: 'Reglas',
            click: null
        }});
});

mw.hook('dev.chat.socket').add(function (mainRoom) {
    console.log('Connected to chat socket');
});

mw.hook('dev.chat.render').add(function (mainRoom) {
    console.log('Chat UI rendering finished');

});


importArticles({
    type: 'script',
    articles: ['u:dev:Chat-js.js', 'u:dev:MediaWiki:QDmodal.js']
});