require(['wikia.window', 'jquery', 'mediawiki.api'], function(window, $){
    if (typeof window.Fetch !== 'undefined') return;
    
    function Fetch(msg, lang){
        var msgs = [];
        if (Array.isArray(msg)){
            msgs = msg;
            msg = msg.join('|');
        } else msgs = msg.split('|');
        this.msg = msg;
        this.lang = lang;
        return this;
    }
    
    Fetch.prototype.getAjax = function(){
        this.api = new mw.Api();
        this.ajax = this.api.get({
            action: 'query',
            meta: 'allmessages',
            ammessages: this.msg,
            amlang: lang
        });
        return this;
    };
    
    Fetch.prototype.done = function(callback){
        this.ajax.done($.proxy(function(data){
            if (data.error) throw new Error('Failed to get messages: ' + 
                data.error.code + '!');
            else {
                var msgs = data.query.allmessages;
                if (this.msgs.length > 1){
                    callback.call(this, this.getData(data));
                } else callback.call(this, data[0]['*']);
            }
        }, this));
    };
});