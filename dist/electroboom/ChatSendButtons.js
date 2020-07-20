/**
 * ChatSendButtons
 * Allows to send a preset message to the chat room in the press of a button
 * Personal use
 * @Author Mario&LuigiBowser'sInsideStory
 */
(function (){
     // only run in chat + double run protection
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Chat' || !window.chatSendButtons || window.chatSendButtonsLoaded) return;
    window.chatSendButtonsLoaded = true;
    window.chatSendButtons.map(function(i){
        $('.ChatHeader .public a[href]').first().after(
            $('<button>', {
                'class': "chat-send-button",
                'data-message': mw.html.escape(i.message),
                'title' : "One-click send: " + i.message,
                'text' : i.label,
                'css' : {
                    'margin' : '2px'
                }
            })
        );
    });
    
    // To know when the script is running
    console.log('Chat send buttons activated.');
    
    // Sending the message to the chat room when clicked
    $(document).on('click', '.chat-send-button', function (){
        mainRoom.socket.send(new models.ChatEntry({
            roomId: this.roomId,
            name: mw.config.get('wgUserName'),
            text: $(this).attr('data-message')
        }).xport());
    });
})();