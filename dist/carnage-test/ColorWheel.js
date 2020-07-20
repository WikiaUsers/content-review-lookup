/*jshint jquery:true curly:false laxbreak:true */
/**
 * @title           ColorPicker.js
 * @description     Creates a new color picker
 * @author          Ultimate Dark Carnage <dev.wikia.com/wiki/User:Ultimate_Dark_Carnage>
 * @version         0.6
 **/
(function($, mw){
    function ColorPicker($element, callback){
        mw.hook('dev.colors').add($.proxy(function(colors){
            this.process.call(this, colors, $element, callback);
        }, this));
    }
    
    ColorPicker.prototype.process = function(colors, $element, callback){
        // The main object for the Colors library
        this.colors = colors;
        // The primary wrapper for the color picker
        this.$wrapper = $element;
        // The color picker elements
        this.$colorpicker = {};
        // The color picker
        this.$colorpicker.box = {};
        // The color picker wrapper
        this.$colorpicker.box.wrapper = $('<div />').addClass('color-picker-box-wrapper');
        // The color picker canvas
        this.$colorpicker.box.canvas = $('<canvas />').addClass('color-picker-wrapper');
        // The color picker thumb
        this.$colorpicker.box.thumb = $('<span />').addClass('color-picker-thumb color-thumb');
        // The color strip
        this.$colorpicker.strip = {};
        // The color strip wrapper
        this.$colorpicker.strip.wrapper = $('<div />').addClass('color-picker-strip-wrapper');
        // The color strip canvas
        this.$colorpicker.strip.canvas = $('<canvas />').addClass('color-picker-strip');
        // The color strip thumb
        this.$colorpicker.strip.thumb = $('<span />').addClass('color-strip-thumb color-thumb');
        // The ID for the color picker input element
        this.id = this.$wrapper.attr('data-id');
        // The selector for the color picker input element
        this.selector = '#' + this.id;
        // The default color for the color picker
        this.rgbaColor = 'rgba(255, 0, 0, 1)';
        // The hue for the color strip
        this.hue = '';
        if (typeof callback === 'function') this.insertData = callback;
    };
    
    ColorPicker.prototype.get = function(key){
        var value = this[key], _toString = Object.prototype.toString,
            pattern = /\[object ([\w\d]+)\]/gi, type = _toString.call(value);
        type = type.replace(pattern, '$1').toLowerCase();
        if (
            ['array', 'object', 'number', 'string', 'boolean'].indexOf(type) > -1
        ) return value;
        else return null;
    };
    
    ColorPicker.prototype.set = function(key, value, replace){
        if (typeof replace === 'boolean' && replace){
            this[key] = value;
        } else {
            this[key] = (typeof this[key] !== 'undefined') ? this[key] : value;
        }
    };
    
    ColorPicker.prototype.create = function(){
        this.$wrapper.empty();
        $.each(this.$colorpicker, $.proxy(function(key, value){
            this['$' + key] = value.wrapper.html([
                value.canvas.attr('id', this.id + '_' + key),
                value.thumb.attr('id', this.id + '_' + key + '__thumb')
            ]);
            this.$wrapper.append(this['$' + key]);
            this[key] = { 
                elem: $('#' + this.id + '_' + key).get(0), 
                selector: $('#' + this.id + '_' + key),
                thumb: $('#' + this.id + '_' + key + '__thumb')
            };
        }, this));
        this.createContext();
    };
    
    ColorPicker.prototype.createContext = function(){
        // Adding configurations for the color box
        this.box.context = this.box.elem.getContext('2d');
        this.box.height = Math.min(this.box.elem.height || 0, 200);
        this.box.width = Math.min(this.box.elem.width || 0, 200);
        this.box.x = this.box.y = 0;
        this.box.drag = false;
        // Adding configurations for the color strip
        this.strip.context = this.strip.elem.getContext('2d');
        if (typeof this.isVertical === 'boolean' && this.isVertical){
            this.strip.height = Math.min(this.strip.elem.height || 0, 200);
            this.strip.width = Math.min(this.strip.elem.width || 0, 10);
        } else {
            this.strip.height = Math.min(this.strip.elem.height || 0, 10);
            this.strip.width = Math.min(this.strip.elem.width || 0, 200);
        }
        this.strip.x = this.strip.y = 0;
        this.strip.drag = false;
        this.createGradient();
    };
    
    ColorPicker.prototype.createGradient = function(){
        this.createColorBox();
        this.createColorStrip();
    };
    
    ColorPicker.prototype.createColorBox = function(){
        var height = this.box.height, width = this.box.width;
        this.box.context.rect(0, 0, width, height);
        this.fillColorBox();
    };
    
    ColorPicker.prototype.createColorStrip = function(){
        var height = this.strip.height, width = this.strip.width;
        this.strip.context.rect(0, 0, width, height);
        this.fillColorStrip();
    };
    
    ColorPicker.prototype.fillColorBox = function(){
        var height = this.box.height, width = this.box.width;
        this.box.context.fillStyle = this.rgbaColor;
        this.box.context.fillRect(0, 0, width, height);
        var gradient_w = this.box.context.createLinearGradient(0, 0, width, 0);
        gradient_w.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient_w.addColorStop(1, 'rgba(255, 255, 255, 0)');
        this.box.context.fillStyle = gradient_w;
        this.box.context.fillRect(0, 0, width, height);
        var gradient_b = this.box.context.createLinearGradient(0, 0, 0, height);
        gradient_b.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient_b.addColorStop(1, 'rgba(0, 0, 0, 1)');
        this.box.context.fillStyle = gradient_b;
        this.box.context.fillRect(0, 0, width, height);
    };
    
    ColorPicker.prototype.fillColorStrip = function(){
        var height = this.strip.height, width = this.strip.width,
            isVertical = (typeof this.isVertical === 'boolean' && this.isVertical),
            w = isVertical ? 0 : width, h = isVertical ? height : 0,
            gradient_h = this.strip.context.createLinearGradient(0, 0, w, h);
        gradient_h.addColorStop(0, 'rgba(255, 0, 0, 1)');
        gradient_h.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
        gradient_h.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
        gradient_h.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
        gradient_h.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
        gradient_h.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
        gradient_h.addColorStop(1, 'rgba(255, 0, 0, 1)');
        this.strip.context.fillStyle = gradient_h;
        this.strip.context.fill();
    };
    
    ColorPicker.prototype.changeColor = function(event){
        this.box.x = event.offsetX;
        this.box.y = event.offsetY;
        var imageData = this.box.context.getImageData(this.box.x, this.box.y, 1, 1).data,
            r = imageData[0], g = imageData[1], b = imageData[2];
        this.rgbaColor = 'rgba(' + [r, g, b].join(', ') + ', 1)';
        this.box.thumb.css({ 
            'top': this.box.y + 'px',
            'left': + this.box.x + 'px',
            'background-color': this.rgbaColor
        });
        if (typeof this.insertData === 'function') this.insertData.call(this, event);
    };
    
    ColorPicker.prototype.changeHue = function(event){
        this.strip.x = event.offsetX;
        this.strip.y = event.offsetY;
        var imageData = this.strip.context.getImageData(this.strip.x, this.strip.y, 1, 1).data,
            r = imageData[0], g = imageData[1], b = imageData[2],
            isVertical = (typeof this.isVertical === 'boolean' && this.isVertical);
        this.rgbaColor = this.hue = 'rgba(' + [r, g, b].join(', ') + ', 1)';
        if (isVertical) this.strip.thumb.css({
            'top': this.strip.y + 'px',
            'background-color': this.rgbaColor
        });
        else this.strip.thumb.css({
            'left': this.strip.x + 'px',
            'background-color': this.rgbaColor
        });
        if (typeof this.insertData === 'function') this.insertData.call(this, event);
        this.fillColorBox();
    };
    
    ColorPicker.prototype.init = function(){
        this.box.selector.on('click', $.proxy(this.changeColor, this));
        this.box.selector.on('mousedown', $.proxy(function(event){
            this.box.drag = true;
            this.changeColor.apply(this, [event]);
        }, this));
        this.box.selector.on('mousemove', $.proxy(function(event){
            if (this.box.drag === true){
                this.changeColor.apply(this, [event]);
            }
        }, this));
        this.box.selector.on('mouseup', $.proxy(function(event){
            this.box.drag = false;
            this.changeColor.apply(this, [event]);
        }, this));
        this.strip.selector.on('click', $.proxy(this.changeHue, this));
        this.strip.selector.on('mousedown', $.proxy(function(event){
            this.strip.drag = true;
            this.changeHue.apply(this, [event]);
        }, this));
        this.strip.selector.on('mousemove', $.proxy(function(event){
            if (this.strip.drag === true){
                this.changeHue.apply(this, [event]);
            }
        }, this));
        this.strip.selector.on('mouseup', $.proxy(function(event){
            this.strip.drag = false;
            this.changeHue.apply(this, [event]);
        }, this));
    };
    
    $(importArticles({
        type: 'script',
        article: 'u:dev:MediaWiki:Colors/code.js'
    }, {
        type: 'style',
        article: 'MediaWiki:ColorPicker.css'
    })).on('load', function(){
        mw.hook('dev.colorpicker').fire(ColorPicker);
        window.ColorPicker = ColorPicker;
        window.ColorPicker.create = function($element, callback){
            return new ColorPicker($element, callback);
        };
    });
}(jQuery, mediaWiki));