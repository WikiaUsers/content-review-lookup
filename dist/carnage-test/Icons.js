(function(window, $, mw){
    var Icons = {};
    
    const SIZEMAP = Object.freeze({
        tiny: 40,
        "x-small": 100,
        small: 180,
        medium: 300,
        large: 450,
        "x-large": 650,
        huge: 900
    });
    
    const ORIENTATIONS = Object.freeze({
        "landscape": function(ratio){ return ratio < 1; },
        "square": function(ratio){ return ratio === 1; },
        "portrait": function(ratio){ return ratio > 1; }
    });
    
    function getSize(size){
        var width, height, sizeObj = {};
        if (typeof size === "string"){
            size = size in SIZEMAP ? SIZEMAP[size] : SIZEMAP.medium;
            sizeObj.width = size;
            sizeObj.height = size;
        } else if (typeof size === "number"){
            sizeObj.width = size;
            sizeObj.height = size;
        } else if (typeof size === "object"){
            if (Array.isArray(size)){
                sizeObj.width = size[0];
                sizeObj.height = size[1];
            } else {
                sizeObj.width = size.width || SIZEMAP.medium;
                sizeObj.height = size.height || sizeObj.width;
            }
        }
        
        sizeObj.aspectRatio = sizeObj.height / sizeObj.width;
        for (var o in ORIENTATIONS){
            if (ORIENTATIONS.hasOwnProperty(o)){
                var res = ORIENTATIONS[o].call(null, sizeObj.aspectRatio);
                if (res){ sizeObj.orientation = o; break; }
            }
        }
        
        return sizeObj;
    }
    
    function setAttrs(elem, attrs){
        var $elem = $(elem);
        $elem.attr(attrs);
        
        return $elem.get(0);
    }
    
    function isset(value){
        return !(value === void 0 || value === null || value === "");
    }
    
    function Icon(name, options){
        options = Object.assign({}, options);
        if (!(this instanceof Icon)) return new Icon(name, options);
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svg = setAttrs(this.svg, {
            "xmlns:xlink": "http://www.w3.org/1999/xlink",
            "xmlns": "http://www.w3.org/2000/svg",
            "xml:space": "preserve",
            "version": "1.1",
            "x": "0px",
            "y": "0px"
        });
        this.name = name;
        this.id = options.id || "";
        return this;
    }
    
    Icon.prototype = {
        setSize: function(size){
            var sizeObj = getSize(size);
            
            this.width = sizeObj.width;
            this.height = sizeObj.height;
            this.aspectRatio = sizeObj.aspectRatio;
            this.orientation= sizeObj.orientation;
            
            this.svg = setAttrs(this.svg, {
                "width": this.width,
                "height": this.height
            });
            return this;
        },
        process: function(){
            var obj = Icon.getIconObj(this.name);
        }
    };
    
    Icon.types = {};
    Icon.getIconObj = function(name){
        var res = {};
        for (var type in Icon.types){
            if (!Icon.types.hasOwnProperty(type)) continue;
            var obj = Icon.types[type];
            
            if (name in obj){
                res.type = type;
                res.icon = obj[name];
                break;
            }
        }
        return res;
    };
})(window, jQuery, mediaWiki);