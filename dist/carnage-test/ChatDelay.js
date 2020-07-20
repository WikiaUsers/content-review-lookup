(function(window, $, mw, mainRoom){
    var config = $.extend({}, window.ChatDelayConfig);
    
    function ChatDelay(){
        this.disabled = false;
        this.maxDelay = 4;
        this.mainOnly = true;
    }
    
    ChatDelay.prototype = {};
    
    return (window.ChatDelay = new ChatDelay());
}(this, jQuery, mediaWiki, mainRoom)).init();