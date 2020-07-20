/**
 * Functionality of the script is taken from Chat-js
 * created by Speedit <https://dev.wikia.com/wiki/User:Speedit>
 **/
(function($, mw, mainRoom, FandomizedChat){
    function FC(room){
        this.room = room;
        this.socket = false;
        this.loaded = false;
        this._controller = {};
        this._onsocketload = $.Deferred();
        this._onroomload = $.Deferred();
        this.time = 1000;
        $.when(
            mw.loader.using('mediawiki.api'),
            this._controller.ready,
            $.ready
        ).then($.proxy(this._main, this));
    }
    
    FC.prototype._main = function(){
        var mr = this.room == mainRoom ? this.room : mainRoom;
        if (!(mr || {}).socket){
            return (this.failsafe = !this.failsafe)
                ? setTimeout($.proxy(this._main, this), 0)
                : false;
        }
        mw.hook('fc.main').fire(this);
        this._socket();
        if (mr.isInitialized){
            this._render();
        } else {
            mr.socket.bind('initial', $.proxy(this._render, this));
        }
    };
    
    FC.prototype._socket = function(){
        this.socket = true;
        this._onsocketload.resolve();
    };
    
    FC.prototype._render = function(){
        this.loaded = true;
        this._onroomloaded.resolve();
    };
    
    FC.prototype.onroomloaded = function(callback){
        $.when(this._onroomloaded)
            .done($.proxy(callback, window.FandomizedChat));
    };
    
    FC.prototype.onsocketloaded = function(callback){
        $.when(this._onsocketloaded)
            .done($.proxy(callback, window.FandomizedChat));
    };
    
    FC.prototype._controller.init = function(){
        var r = this.ready;
        if (window.NodeChatSocketWrapper){
            r.resolve();
        } else {
            $('script[src$="chat_js2"]').on('load', $.proxy(r.resolve, r));
        }
    };
    
    FC.prototype._controller.ready = $.Deferred();
    
    $(document).ready(function(){
        var fc_socket = new FC(mainRoom);
        window.FandomizedChat = $.extend(FandomizedChat, fc_socket);
        ['socketloaded', 'roomloaded'].forEach(function(fn){
            var fnName = 'on' + fn;
            window.FandomizedChat.events[fn] = function(callback){
                window.FandomizedChat[fnName].call(window.FandomizedChat, callback);
            };
        });
    });
}(this.jQuery, this.mediaWiki, this.mainRoom, this.FandomizedChat));