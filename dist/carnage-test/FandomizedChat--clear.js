window.ClearChat = (function(mw, $, mainRoom){
    var ClearChat = {};
    ClearChat.msgLength = mainRoom.viewDiscussion.chatUL.children().length;
    NodeChatController.prototype.clearWindow = function(){
        this.viewDiscussion.chatUL.empty();
        this.inlineAlert(i18n['cleared']);
    };
    ClearChat.init = function(){
        if (ClearChat.msgLength === 0){
            mainRoom.inlineAlert(i18n['clearfailed']);
        } else {
            mainRoom.clearWindow();
            ClearChat.msgLength = 0;
        }
    };
    
    setInterval(() => {
        ClearChat.msgLength = mainRoom.viewDiscussion.chatUL.children().length;
    }, 1000);
    return ClearChat;
}(mediaWiki, jQuery, mainRoom));