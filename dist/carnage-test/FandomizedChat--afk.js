window.AFK = (function(mw, $, mainRoom){
    /**
     * Adding helper functions and scripts to allow
     * the script to work
     **/
    
    importArticle({ type: 'script', article: 'FandomizedChat/i18n.js' });
    
    NodeChatController.prototype.setAway = function(msg){
        if (!msg){ msg = ''; }
        var statusCommand = new models.SetStatusCommand({
            statusState: STATUS_STATE_AWAY,
            statusMessage: msg
        });
        this.inlineAlert(i18n['away']);
        this.socket.send(statusCommand.xport());
    };
    
    NodeChatController.prototype.setBack = function(msg){
        if (!msg){ msg = ''; }
        if (!this.comingBackFromAway){
            this.comingBackFromAway = true;
            var statusCommand = new models.SetStatusCommand({
                statusState: STATUS_STATE_PRESENT,
                statusMessage: ''
            });
            this.inlineAlert(i18n['back']);
            this.socket.send(statusCommand.xport());
        }
    };
    
    NodeChatControler.prototype.inlineAlert = function(text){
        for (var i = 0, s = text.split(/\n/g), len = s.length; i < len; i++){
            mainRoom.model.chats.add(
                new models.inlineAlert({ text: s[i] })
            );
        }
        this.viewDiscussion.scrollToBottom();
    };
    
    var AFK = {};
    AFK.currentState = 'here';
    AFK.toggleAway = function(msg){
        if (!msg) msg = '';
        if ($('#ChatHeader .User').hasClass('away') === true){
            mainRoom.setBack();
            this.currentState = 'here';
        } else {
            mainRoom.setAway();
            this.currentState = 'away';
        }
    };
    return AFK;
}(mediaWiki, jQuery, mainRoom));