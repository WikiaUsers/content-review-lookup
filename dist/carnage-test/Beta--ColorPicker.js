(function(window, $, mw){
    function ColorPicker($elem, options, callback){
        if ($elem instanceof Element) $elem = $($elem);
        if (Object(options) instanceof Function){
            callback = options;
            options = {};
        }
        this.$wrapper = $elem;
        this.picker = {};
        this.strip = {};
        this.vertical = Object(options.vertical) instanceof Boolean && options.vertical;
        this.color = this.rgbaColor = 'rgba(255, 0, 0, 1)';
        this.hue = this.hueColor = '';
        if (Object(callback) instanceof Function) this.insertData = callback;
    }

    ColorPicker.prototype = {
        constructor: ColorPicker,
        process: function(){
            $.extend(this.strip, {
                
            })
        }
    };
}(this, jQuery, mediaWiki));