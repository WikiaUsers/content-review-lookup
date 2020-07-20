/**
 * @title           Qslideshow
 * @version         0.1.0a
 * @author          Ultimate Dark Carnage
 * @description     Creates a dynamic slideshow
 */
require([
    "wikia.window",
    "mw",
    "jquery",
    require.optional("ext.wikia.design-system.loading-spinner")
], function(window, mw, $, Spinner){
    var QSlideshow = (function(window, $, mw){
        function QSlideshow(){
            var id, o, l = 0, opts = {};
            if (arguments.length === 0) return;
            id = arguments[l];
            if (typeof id === "object"){
                opts = Object.assign({}, opts, id);
                if (!("id" in opts) || (typeof opts.id !== "string")) return;
            } else {
                o = arguments[++l];
                if (typeof o === "object"){
                    opts = Object.assign({}, opts, o);
                    delete opts.id;
                    opts.id = id;
                    if (typeof opts.id !== "string") return;
                } else return;
            }
            this.id = opts.id;
            this.defaultIndex = opts.defaultIndex || 0;
            this.currentIndex = this.defaultIndex;
            this.items = [];
            this.generate();
            return this;
        }
        
        QSlideshow.MAX_SAFE_INDEX = 100;
        
        QSlideshow.clamp = function(n){
            return Math.min(Math.max(0, n), QSlideshow.MAX_SAFE_INDEX);
        };
        
        QSlideshow.prototype.seekTo = function(index){
            if (isNaN(index) || !isFinite(index)) index = 0;
            index = parseInt(index, 10);
            this.currentIndex = QSlideshow.clamp(index);
            this.update();
        };
        
        QSlideshow.prototype.seek = function(increment){
            if (isNaN(increment) || !isFinite(increment)) return;
            increment = parseInt(increment, 10);
            var length = this.length, index;
            if (increment < 0) index = length + increment;
            else if (increment > (length - 1)) index = increment - length;
            else index = increment;
            this.seekTo(index);
        };
        
        QSlideshow.prototype.prev = function(){
            var currIndex = this.currIndex, index = currIndex - 1;
            this.seek(index);
        };
        
        QSlideshow.prototype.next = function(){
            var currIndex = this.currIndex, index = currIndex + 1;
            this.seek(index);
        };
        
        QSlideshow.prototype.update = function(){
            var currIndex = this.currIndex;
        };
    }(window, $, mw));
    
    window.QSlideshow = QSlideshow;
});