(function($, mw, mainRoom){
    if (
        typeof window.ChatPings === '' &&
        mw.config.get('wgCanonicalSpecialPageName') !== 'Chat'
    ) return;
    
    function ChatPings(){}
    
    $.extend(ChatPings.prototype, {
        self: mw.config.get('wgUserName'),
        loadStorage: $.Deferred(),
        loadPhrases: $.Deferred(),
        loaded: false,
        localStorageKey: 'ping_phrases',
        phrases: {},
        autosave: true
    });
    
    ChatPings.prototype.getPhrases = function(){
        this.source = 'User:' + this.self + '/PingPhrases';
        this.getStorage(function(json){
            var object = JSON.parse(json);
            this.phrases = object;
            this.init();
        }, function(Api){
            Api.get({
                action: 'query',
                
            });
        });
    };
}(jQuery, mediaWiki, mainRoom));