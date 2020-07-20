(function(window, $, mw){
    $.extend(Array.prototype, {
        merge: function(){
            var a = Array.from(arguments);
            while (a.length){
                var arr = a.shift();
                if (Array.isArray(arr)){
                    arr.forEach(function(elem){
                        if (this.indexOf(elem) === -1) this.push(elem);
                    }, this);
                } else if (this.indexOf(arr) === -1) this.push(arr);
            }
            return this;
        }
    });
    
    function WikiaToolbar(){
        this.username = mw.config.get('wgUserName');
        this.page = mw.config.get('wgPageName');
        this.action = mw.config.get('wgAction');
        this.keyCache = [];
        this.items = [];
    }
    
    WikiaToolbar.prototype = {
        constructor: WikiaToolbar,
        loadSettings: function(){
            $.get('/load.php', {
                mode: 'articles',
                articles: 'MediaWiki:Custom-Toolbar'
            });
        }
    };
}(this, jQuery, mediaWiki));