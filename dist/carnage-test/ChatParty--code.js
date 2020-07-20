(function($, mw, mainRoom, window){
    // Creating party mode function
    function ChatParty(roomid){
        this.defaultLanguage = mw.config.get('wgUserLanguage') || mw.config.get('wgContentLanguage') || 'en';
        this.loaded = false;
        this.enabled = false;
        this.version = '-v0.0.1';
        this.name = 'Chat Party';
        this.i18nSrc = 'u:carnage-test:MediaWiki:Custom-ChatParty/i18n.json';
        this.messages = {};
        this.settings = { disco: {}, music: {}, skins: {} };
        this.roomid = roomid;
        this.init();
    }
    
    ChatParty.prototype.stripComments = function(string){
        var result = 
            string.replace(/\/\/.*?(\n|$)/g, '$1')
                  .replace(/\/\*[\s\S]*?\*\//g, '');
        return result;
    };
    
    ChatParty.prototype.fetchMessages = function(){
        $.ajax({
            method: 'GET',
            url: '/load.php',
            data: {
                mode: 'articles',
                articles: this.i18nSrc,
                only: 'styles',
                debug: '1'
            },
            success: $.proxy(function(response){
                var json, obj;
                try {
                    json = JSON.parse(this.stripComments(response));
                } catch (e){
                    json = {};
                }
                
                this.messages = json;
                this.load.apply(this, []);
            }, this)
        });
    };
    
    ChatParty.prototype.load = function(){
        this.settings.disco = {
            orientation: 'right',
            name: 'Disco',
            speed: 'slow',
            loop: true,
            loopTime: 500,
            active: false,
            defval: 'white',
            options: []
        };
        this.settings.music = {
            name: 'Music',
            playing: false,
            loop: true,
            defval: '',
            tracks: []
        };
        this.settings.skins = {
            name: 'Skins',
            defval: 'Fire',
            options: []
        };
        this.loaded = true;
        this.insertUI();
    };
}(jQuery, mediaWiki, mainRoom, window));