/**
 * This script is based on the isTyping script by Dorumin.
 **/

(function(mw, $, mainRoom, config){
    if (
        (typeof window.isTypingInit == 'boolean' && window.isTypingInit === false) ||
        mw.config.get('wgCanonicalSpecialPageName') == 'Chat'
    ) return;
    window.isTypingInit = true;
    var it = {};
    it = $.extend({
        currentState: false,
        lastRequestTime: 0,
        i18n: $.extend({
            en: {
                1: '$1 is typing...',
                2: '$1 and $2 are typing...',
                3: '$1, $2, and $3 are typing...',
                more: '$1, $2, $3, and more are typing...'
            }
        }, window.isTypingi18n)
    }, it);
    
    it.i18nMsg = function(msg, arr){
        var lang = it.i18n[mw.config.get('wgUserLanguage')] || it.i18n[mw.config.get('wgContentLanguage')] || it.i18n.en;
        if (!lang[msg]) return 'N/A';
        return lang[msg].replace(/\$(\d+)/g, function(match, $1){
            var lang_html = '<span class="username">' + mw.html.escape(arr[parseInt($1, 10) - 1]) + '</span>';
            return lang_html;
        });
    };
    
    it.getCurrentRoom = function(){
        if (mainRoom.activeRoom == 'main' || mainRoom.activeRoom === null)
            return mainRoom;
        return mainRoom.chats.privates[mainRoom.activeRoom];
    };
    
    it.sendTypingState = function(state){
        this.currentState = state;
        var currentRoom = this.getCurrentRoom(),
            isMain = this.isMain();
        if (
            (isMain && this.mainRoomDisabled) ||
            (!isMain && this.privateRoomDisabled)
        ) return;
        var typingStatus = new models.SetStatusCommand({
            statusMessage: 'typingState',
            statusState: state
        });
        currentRoom.socket.send(typingStatus.xport());
    };
}(this.mediaWiki, this.jQuery, this.mainRoom, window.isTyping == window.isTyping || {}));