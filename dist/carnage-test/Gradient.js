(function(window, $){
    var a = [], slice = a.slice, indexOf = a.indexOf,
        o = ({}), has = o.hasOwnProperty;

    function G(type, options){
        if (!(this instanceof G)){
            return new G(type, options);
        }

        if (typeof type === "object"){
            options = type;
            if (!("type" in options)) options.type = "CSS";
        } else if (typeof type === "string"){
            options = $.extend({}, options);
            options.type = type;
        } else {
            options = {};
            options.type = "CSS";
        }

        this.type = def(options.type);
        this.colorStops = [];
        this.length = this.colorStops.length;
        return this;
    }

    G.prototype = {
        constructor: G,
        addColorStop: function(stop){
            if (typeof stop === "function"){}
        },
        toString: function(){
            return this.join(this.colorStops.map(this.mapColorStops, this));
        }
    };
})(window, window.jQuery);