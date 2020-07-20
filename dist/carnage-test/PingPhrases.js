(function(window, $, mw, mainRoom){
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Chat') return;
    else if (typeof window.Promise === 'undefined'){
        importArticle({
            type: 'script',
            article: 'u:carnage-test:MediaWiki:PingPhrases/old.js'
        });
        return;
    }
    var Ping = window.Ping;
    
    function Pings(){
        this.unseenCount = 0;
        this.maxPings = 5;
        this.name = mw.config.get('wgUserName');
        this.ajax = $.extend(new Image(), {
            src: mw.config.get('stylepath') + '/common/images/ajax.gif'
        }),
        this.state = {};
        this.avatars = {};
        this.regexPattern = /^regex:\/(.+)\/(\w*)$/gm;
    }
    
    Pings.prototype = {
        constructor: Pings,
        check: {
            audio: function(src){
                var i18n = this.i18n;
                return new Promise(function(resolve){
                    if (src.trim() === '') return resolve(true);
                    var audio = $.extend(new Audio(), {
                        onerror: resolve.bind(window, i18n.msg('invalid-audio-url').plain()),
                        onloadeddata: resolve.bind(window, true)
                    });
                });
            }
        }
    };
}(this, jQuery, mediaWiki, mainRoom)).init();