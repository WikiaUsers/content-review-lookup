/**
 * 
 **/

require(["wikia.window", "jquery", "mw"], function(wk, $, mw, Spinner){
    function Slideshow(){
        var options = {}, o = null;

        if (arguments.length === 1){
            o = arguments[0];

            if (typeof o === "object"){
                if (o instanceof jQuery){
                    o = { $target: o };
                } else if (o instanceof Element){
                    o = { $target: $(o) };
                }

                options = $.extend({}, options, o);
            } else if (typeof o === "function"){
                o = o.call(this);

                if (o === undefined || o == null){
                    o = {};
                }

                options = $.extend({}, options, o);
            } else if (typeof o === "string"){
                var p = {};
                if (o !== ""){
                    o = $.extend({}, p, { id: o });
                }

                options = $.extend({}, options, o);
            }
        }

        if (!(this instanceof Slideshow)){
            return new Slideshow(options);
        }

        this.$target = options.$target || $(".slideshow-data");

        this.description = options.description || false;
        this.load = options.load || false;
        this.defaultIndex = options.defaultIndex || 0;
        this.currentIndex = this.defaultIndex;
        this.length = 0;
        this.items = [];
    }

    Slideshow.prototype = {
        constructor: Slideshow
    };
});