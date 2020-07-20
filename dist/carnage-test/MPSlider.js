void (function(mw, $, window, MPSlider){
    $.extend(MPSlider, {
        state: "",
        source: "MediaWiki:Custom-MPSlider.json",
        start: 0
    });
    
    MPSlider.loaded = MPSlider.state === "loaded";
    
    MPSlider.updateState = function(options){
        MPSlider.state = options.state || MPSlider.state;
        MPSlider.loaded = MPSlider.state === "loaded";
    };
    
    function MPSliderData(options){
        $.extend(this, options, {
            orientation: "portrait",
            type: "fixed",
            minSize: 60,
            maxSize: 250,
            active: false,
            title: '',
            limit: Infinity,
            id: '',
            caption: '',
            link: '',
            children: [],
            transition: "auto",
            transitionDelay: '5s'
        });
        
        this.dimensions = this.getDimensions();
        return this;
    }
    
    MPSliderData.prototype.getDimensions = function getDimensions(){
        var dimensions = {
            width: 0,
            height: 0
        };
        
        if (this.orientation === "portrait"){
            dimensions.height = Math.max(this.minSize, this.maxSize);
            dimensions.width = Math.min(this.minSize, this.maxSize);
        } else if (this.orientation === "landscape"){
            dimensions.height = Math.min(this.minSize, this.maxSize);
            dimensions.width = Math.max(this.minSize, this.maxSize);
        } else if (this.orientation === "square"){
            dimensions.height = Math.max(this.minSize || 0, this.maxSize || this.minSize);
            dimensions.width = Math.max(this.minSize || 0, this.maxSize || this.minSize);
        } else {
            return;
        }
        return dimensions;
    };
    
    MPSliderData.prototype.transition = function transition(){
        var fn = {
            then: $.proxy(function then(){
                var completeCb = arguments[0],
                    errorCb = arguments[1],
                    t;
                if (errorCb instanceof Function){
                    if (this.transition !== '' || this.transition !== null){
                        t = this.parseTime(this.transitionDelay);
                        completeCb.apply(this, [t]);
                    } else {
                        errorCb.apply(this, []);
                    }
                } else {
                    t = this.parseTime(this.transitionDelay);
                    completeCb.apply(this, [this.transition !== '' || this.transition !== null ? t : { error: 'The transition delay has not been set.' } ]);
                }
            }, this),
            complete: $.proxy(function complete(){
                var cb = arguments[0], t;
                if (this.transition !== '' || this.transition !== null){
                    t = this.parseTime(this.transitionDelay);
                    cb.apply(this, [t]);
                }
            }, this),
            fail: $.proxy(function fail(){
                var cb = arguments[0];
                if (!(this.transition !== '' || this.transition !== null)){
                    cb.apply(this, [{ error: 'The transition delay has not been set.' }]);
                }
            }, this)
        };
        
        var fnAliases = {
            "then": ["always"],
            "complete": ["done", "found"],
            "fail": ["error"]
        };
        
        $.each(fnAliases, function(key, value){
            if (key in fn && fn.hasOwnProperty(key)){
                $.each(value, function(index, name){
                    Object.defineProperty(fn, name, {
                        value: fn[key]
                    });
                });
            }
        });
        return fn;
    };
    
    
    
    MPSliderData.prototype.toElement = function toElement(){
        var $mainElement = $('<section />', { 'class': 'MPSlider main-page-slider slider' });
    };
})(mediaWiki, jQuery, window, window.MPSlider = window.MPSlider || {});