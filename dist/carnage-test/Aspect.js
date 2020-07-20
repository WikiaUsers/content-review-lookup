(function(window, undefined){
    function Aspect(){
        this.target = window;
        this.width = 0;
        this.height = 0;
        this.value = 0;
        this.fontSize = 12; // in pixels
        this.ratio = "1:1";
        this.orientation = "none";
        this.ref = null;
    }
    
    Aspect.prototype = {
        constructor: Aspect,
        setTarget: function(target){
            if (Aspect.jquery){
                if (target instanceof jQuery){
                    this.target = target;
                } else {
                    this.target = $(target);
                }
            } else {
                if (typeof target === "string"){
                    this.target = document.querySelector(target);
                } else {
                    this.target = target;
                    
                    if (typeof this.target === "boolean"){
                        this.target = window;
                    }
                }
            }
            
            return this.target;
        },
        setFontSize: function(){
            var body = document.body,
                docEl = document.documentElement,
                el = null, size = 0;
                
            if (docEl === undefined){
                docEl = document.getElementsByTagName("html")[0];
            }
            
            if (this.target=== undefined || this.target === null || this.target === window){
                el = body;
            } else {
                el = this.target;
            }
            
            
            if (el === undefined || el === null){
                el = body;
            }
            
            if (Aspect.jquery){
                var $el = $(el), $docEl = $(docEl);
                
                var dFontSize = $docEl.css("fontSize"),
                    eFontSize = $el.css("fontSize");
                    
                var r = /([0-9\-]*[0-9]*[0-9\.]*[0-9]*)([\w]*)/g,
                    d = r.exec(dFontSize).slice(1),
                    e = r.exec(eFontSize).slice(1);
                
                
            }
        },
        getAspectRatio: function(){
            var w = this.width, h = this.height, r = Aspect.gcd(w, h);
            
            var x = Math.round(w / r), y = Math.round(h / r);
            
            this.value = x / y;
            this.ratio = x + ":" + y;
            
            var retValue = arguments.length && !!arguments[0];
            return retValue ? this.value : this.ratio;
        },
        getOrientation: function(){
            var orientation = "";
            if (this.width === 0 || this.height === 0) orientation = "none";
            else if (this.width < this.height) orientation = "portrait";
            else if (this.width > this.height) orientation = "landscape";
            else if (this.width === this.height) orientation = "square";
            
            if (orientation === "") orientation = "none";
            
            this.orientation = orientation;
            
            return orientation;
        }
    };
    
    Aspect.gcd = function gcd(a, b){
        if (b === 0) return a;
        
        return gcd(b, a % b);
    };
    
    Aspect.jquery = "jQuery" in window;
})(this === window ? this : window);