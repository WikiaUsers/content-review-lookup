(function($, mw, window){
    function ChatKeypress(keys){
        var callbacks = Array.prototype.slice.call(keys, 1);
        this.keys = keys || [];
        this.map = {};
        this.callbacks = {
            keydown: callbacks[0],
            keyup: callbacks[1]
        };
        this.init();
    }
    
    ChatKeypress.prototype._set = function(key, value, descriptor){
        if (this.hasOwnProperty(key)){
            this[key] = value;
        } else {
            descriptor = descriptor !== undefined ? descriptor : {
                value: value,
                writable: true,
                enumerable: true,
                configurable: true
            };
            if (descriptor.value === undefined){
                descriptor.value = value;
            }
            Object.defineProperty(this, key, descriptor);
        }
    };
    
    ChatKeypress.prototype._get = function(key){
        if (this[key] !== undefined){
            return this[key];
        } else {
            return null;
        }
    };
    
    ChatKeypress.prototype.init = function(){
        $(window).on('keydown keyup', $.proxy(function(event){
            event = event || window.event;
            if (this.keys.indexOf(event.keyCode) > -1){
                map[event.keyCode] = (event.type === 'keydown');
                var keys = Object.keys(this.map),
                    active = keys.every($.proxy(function(keyCode){
                        return this.map[keyCode] === true;
                    }, this));
                if (active){
                    this.callbacks.keydown.apply(this, [event]);
                } else {
                    this.callbacks.keyup.apply(this, [event]);
                }
            }
        }, this));
    };
}(jQuery, mediaWiki, window));