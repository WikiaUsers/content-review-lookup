/**
 * ChatSendButtons
 * Allows to send a preset message to the chat room in the press of a button
 * Personal use
 * @Author Mario&LuigiBowser'sInsideStory
 */
mw.hook('dev.i18n').add(function(i18no) {
    i18no.loadMessages('ChatPreloadButtons').then(function(i18n) {
        // Only run in chat + double run protection
        if (mw.config.get('wgCanonicalSpecialPageName') !== 'Chat' || !window.chatSendButtons || window.chatSendButtonsLoaded) return;
        window.chatSendButtonsLoaded = true;
        window.chatSendButtons.map(function(i) {
            $('.ChatHeader .public a[href]').first().after(
                $('<button>', {
                    'class': 'chat-send-button',
                    'data-message': mw.html.escape(i.message),
                    'title' : i18n.msg('text', i.message).plain(),
                    'text' : i.label,
                    'css' : {
                        'margin' : '2px'
                    }
                })
            );
        });
        // Sending the message to the chat room when clicked
        $(document).on('click', '.chat-send-button', function() {
            mainRoom.socket.send(new models.ChatEntry({
                roomId: this.roomId,
                name: mw.config.get('wgUserName'),
                text: $(this).attr('data-message')
            }).xport());
        });
    });
});

importArticles({
    type: 'script',
    articles: 'u:dev:MediaWiki:I18n-js/code.js'
});