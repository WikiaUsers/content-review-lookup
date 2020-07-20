require(["wikia.window", "jquery", "mw", "ext.wikia.design-system.loading-spinner"],
(function(window, $, mw, Spinner){
    if (!$("#WikiaRail").length) return;
    
    this._data = {};
    
    this._length = 0;
    
    this._active = 4;
    
    this._count = 0;
    
    this._images = [];
    
    this._i18n = {};
    
    (function(){
        
    }).call(this._i18n);
    
    this.msg = function(msg){
        var args = [], type = "escape";
        
        if (arguments.length > 1){
            type = arguments[1];
            args = [].slice.call(arguments, 2);
        }
        
        return this._i18n.msg(msg).get(type, args);
    };
}).bind((window.NewImages = {}))
);