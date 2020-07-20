/**
 * This is the script for the color picker UI
 * created by Ultimate Dark Carnage
 **/

(function($, mw, window){
    /**
     * This is the color picker object
     **/
    
    function ColorPicker($element){
        // The main wrapper for the color picker
        this.$wrapper = $element;
        // The color block element (jQuery)
        this.$colorBlock = this.$wrapper.children('canvas[data-type="color-block"]');
        // The color block element (JavaScript)
        this.colorBlock = this.$colorBlock.get(0);
        // The color strip element (jQuery)
        this.$colorStrip = this.$wrapper.children('canvas[data-type="color-strip"]');
        // The color strip element (JavaScript)
        this.colorStrip = this.$colorStrip.get(0);
        // The ID for the input element
        this.id = this.$wrapper.attr('data-id');
        // The selector for the input element;
        this.selector = '#' + this.id;
        // The 2D context for the color block
        this.CBcontext = this.colorBlock.getContext('2d');
        // The 2D context for the color strip
        this.CScontext = this.colorStrip.getContext('2d');
        // Height of the color block
        this.CBheight = this.colorBlock.height;
        // Width of the color block
        this.CBwidth = this.colorBlock.width;
        // Height of the color strip
        this.CSheight = this.colorStrip.height;
        // Width of the color strip
        this.CSwidth = this.colorStrip.width;
        // X-axis of the color block
        this.CBx = 0;
        // Y-axis of the color block
        this.CBy = 0;
        // X-axis of the color strip
        this.CSx = 0;
        // Y-axis of the color strip
        this.CSy = 0;
        // Boolean value for dragging the mouse on the color block
        this.CBdrag = false;
        // Boolean value for dragging the mouse on the color strip
        this.CSdrag = false;
        // Default RGBA color
        this.RGBAColor = 'rgba(255, 0, 0, 1)';
        // Creating the color box gradient by default
        this.createColorBox();
        // Creating the color strip gradient by default
        this.createColorStrip();
    }
    
    ColorPicker.prototype.createColorBox = function(){
        var height = this.CBheight, width = this.CBwidth;
        this.CBcontext.rect(0, 0, width, height);
        this.fillCBgradient();
    };
    
    ColorPicker.prototype.createColorStrip = function(){
        var height = this.CSheight, width = this.CSwidth;
        this.CScontext.rect(0, 0, width, height);
        this.fillCSgradient();
    };
    
    ColorPicker.prototype.fillCBGradient = function(){
        var height = this.CBheight, width = this.CBwidth;
        this.CBcontext.fillStyle = this.RGBAColor;
        this.CBcontext.fillRect(0, 0, width, height);
        
        var gradientW = this.CBcontext.createLinearGradient(0, 0, width, 0);
        gradientW.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradientW.addColorStop(1, 'rgba(255, 255, 255, 0)');
        this.CBcontext.fillStyle = gradientW;
        this.CBcontext.fillRect(0, 0, width, height);
        
        var gradientB = this.CBcontext.createLinearGradient(0, 0, 0, height);
        gradientB.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradientB.addColorStop(1, 'rgba(0, 0, 0, 1)');
        this.CBcontext.fillStyle = gradientB;
        this.CBcontext.fillRect(0, 0, width, height);
    };
    
    ColorPicker.prototype.fillCSGradient = function(){
        var height = this.CSheight, width = this.CSwidth,
            gradient = this.createLinearGradient(0, 0, 0, height);
        
        gradient.addColorStop(0, 'rgba(255, 0, 0, 1)');
        gradient.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
        gradient.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
        gradient.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
        gradient.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
        gradient.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');
        
        this.CScontext.fillStyle = gradient;
        this.CScontext.fill();
    };
    
    ColorPicker.prototype.insertData = function(){
        var rgba = this.RGBAColor,
            rgbaComponents = rgba.replace(/rgb(?:a|)\(([^\(\)]{1,})\)/g, '$1'),
            components = rgbaComponents.split(/\,(?:\s+|)/g).map(Number),
            hslComponents = this.rgbToHsl(components),
            hex = this.rgbToHex(components),
            $hexElem = this.$wrapper.find('input[data-name="Hex"]'),
            $rElem = this.$wrapper.find('input[data-name="R"]'),
            $gElem = this.$wrapper.find('input[data-name="G"]'),
            $bElem = this.$wrapper.find('input[data-name="B"]'),
            $hElem = this.$wrapper.find('input[data-name="H"]'),
            $sElem = this.$wrapper.find('input[data-name="S"]'),
            $lElem = this.$wrapper.find('input[data-name="L"]'),
            $colorbox = this.$wrapper.find('div.color-box');
        $rElem.val(components[0]);
        $gElem.val(components[1]);
        $bElem.val(components[2]);
        $hElem.val(hslComponents[0]);
        $sElem.val(hslComponents[1]);
        $lElem.val(hslComponents[2]);
        $hexElem.val(hex);
        $colorbox.css('background-color', rgba);
    };
    
    // Begin converters
    ColorPicker.prototype.componentToHex = function(component){
        var hex = component.toString(16),
            result = hex.length === 1 ? '0' + hex : hex;
        return result;
    };
    
    ColorPicker.prototype.rgbToHex = function(components){
        var r = components[0], g = components[1], b = components[2],
            rHex = this.componentToHex(r),
            gHex = this.componentToHex(g),
            bHex = this.componentToHex(b),
            result = '#' + rHex + gHex + bHex;
        return result;
    };
    
    ColorPicker.prototype.rgbToHsl = function(components){
        var rL = components[0] / 255,
			gL = components[1] / 255,
			bL = components[2] / 255,
			max = Math.max(rL, gL, bL),
			min = Math.min(rL, gL, bL),
			h, s, l = (max + min) / 2;
		if (max === min){
			h = s = 0;
		} else {
			var dist = max - min;
			s = l > 0.5 ? dist / (2 - max - min) : dist / (max + min);
			switch (max) {
				case rL:
					h = (gL - bL) / dist + (gL < bL ? 6 : 0);
					break;
				case gL:
					h = (bL - rL) / dist + 2;
					break;
				case bL:
					h = (rL - gL) / dist + 4;
					break;
			}
			h = h / 6;
		}
		return [Math.round(h * 360), Math.round(s * 100) + '%', Math.round(l * 100) + '%'];
    };
    
    ColorPicker.prototype.hueToRgb = function(p, q, t){
        if (t < 0) t += 1;
		if (t > 1) t -= 1;
		if (t < 1 / 6) return p + (q - p) * 6 * t;
		if (t < 1 / 2) return q;
		if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
		return p;
    };
    
    ColorPicker.prototype.hslToRgb = function(components){
        var r, g, b, h = components[0] / 360,
			s = this.toNumber(components[1]) / 100,
			l = this.toNumber(components[2]) / 100;
		if (s === 0){
			r = g = b = l;
		} else {
			var q = l < 0.5 ? l * (1 + s) : l + s - l * s,
				p = 2 * l - q;
			r = this.hueToRgb(p, q, h + 1 / 3);
			g = this.hueToRgb(p, q, h);
			b = this.hueToRgb(p, q, h - 1 / 3);
		}
		return [r, g, b].map(function(component){
			return Math.round(component * 255);
		});
    };
    
    ColorPicker.prototype.hslToHex = function(components){
        var rgb = this.hslToRgb(components),
			hex = this.rgbToHex(rgb);
		return hex;
    };
    
    ColorPicker.prototype.hexToRgb = function(hex){
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace(shorthandRegex, function(m, r, g, b) {
			return r + r + g + g + b + b;
		});
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? [
			parseInt(result[1], 16),
			parseInt(result[2], 16),
			parseInt(result[3], 16),
			1
		] : null;
    };
    
    ColorPicker.prototype.hexToHsl = function(hex){
        var rgbComponents = this.hexToRgb(hex),
            hslComponents = (rgbComponents === null) ? this.rgbToHsl(rgbComponents) : null;
        return hslComponents.concat(1) || null;
    };
    
    ColorPicker.prototype.toDecimal = function(percentage){
        if (typeof percentage === 'number') return percentage;
		var percent = parseInt(percentage.replace('%', ''), 10);
		percent = percent / 100;
		return percent;
    };
    
    ColorPicker.prototype.toNumber = function(percentage){
        if (typeof percentage === 'number') return percentage;
		var percent = parseInt(percentage.replace('%', ''), 10);
		return percent;
    };
    ColorPicker.prototype.isType = function(components){
        if (typeof components === 'string'){
			return 'Hex';
		} else if (Array.isArray(components)) {
			var isHSL = components.some(function(component){
				return typeof component === 'string' && component.lastIndexOf('%', 1) > -1;
			});
			if (isHSL){
				return 'HSL';
			} else {
				return 'RGB';
			}
		}
    };
    ColorPicker.prototype.lighten = function(components, percent, converter){
        var r, g, b;
		if (this.isType(components) === 'Hex'){
			r = parseInt(color.substring(1, 3), 16);
			g = parseInt(color.substring(3, 5), 16);
			b = parseInt(color.substring(5, 7), 16);
		} else if (this.isType(components) === 'RGB'){
			r = components[0];
			g = components[1];
			b = components[2];
		} else if (this.isType(components) === 'HSL'){
			components = this.hexToRgb(components);
			r = components[0];
			g = components[1];
			b = components[2];
		} else {
			return null;
		}
		r = parseInt(r * (100 + percent) / 100, 10);
		g = parseInt(g * (100 + percent) / 100, 10);
		b = parseInt(b * (100 + percent) / 100, 10);
		r = (r < 255) ? r : 255;
		g = (g < 255) ? g : 255;
		b = (b < 255) ? b : 255;
		if (typeof converter === 'undefined' || converter === 'Hex'){
			var rr = ((r.toString(16).length === 1) ? "0" + r.toString(16) : r.toString(16)),
				gg = ((g.toString(16).length === 1) ? "0" + g.toString(16) : g.toString(16)),
				bb = ((b.toString(16).length === 1) ? "0" + b.toString(16) : b.toString(16));
			return '#' + [rr, gg, bb].join('');
		} else if (converter === 'RGB') {
			return [r, g, b];
		} else if (converter === 'HSL') {
			return this.rgbToHsl([r, g, b]);
		} else {
			return null;
		}
    };
    
    ColorPicker.prototype.darken = function(components, percent, converter){
        return this.lighten(components, -percent, converter);
    };
    // End converters
    
    ColorPicker.prototype.changeColor = function(event){
        this.CBx = event.offsetX;
        this.CBy = event.offsetY;
        
        var imageData = this.CBcontext.getImageData(this.CBx, this.CBy, 1, 1).data,
            r = imageData[0], g = imageData[1], b = imageData[2];
        this.RGBAColor = 'rgba(' + [r, g, b].join(', ') + ', 1)';
        this.insertData();
    };
    
    ColorPicker.prototype.changeHue = function(event){
        this.CSx = event.offsetX;
        this.CSy = event.offsetY;
        
        var imageData = this.CScontext.getImageData(this.CSx, this.CSy, 1, 1).data,
            r = imageData[0], g = imageData[1], b = imageData[2];
        this.RGBAColor = 'rgba(' + [r, g, b].join(', ') + ', 1)';
        this.insertData();
        this.fillCBGradient();
    };
    
    ColorPicker.prototype.init = function(){
        var $colorBlock = this.$colorBlock,
            $colorStrip = this.$colorStrip;
        $colorBlock.on('click', $.proxy(this.changeColor, this), false);
        $colorBlock.on('mousedown', $.proxy(function(event){
            this.CBdrag = true;
            this.changeColor.apply(this, [event]);
        }, this), false);
        $colorBlock.on('mousemove', $.proxy(function(event){
            if (this.CBdrag === true){
                this.changeColor.apply(this, [event]);
            }
        }, this), false);
        $colorBlock.on('mouseup', $.proxy(function(event){
            this.CBdrag = false;
            this.changeColor.apply(this, [event]);
        }, this), false);
        $colorStrip.on('click', $.proxy(this.changeHue, this), false);
        $colorStrip.on('mousedown', $.proxy(function(event){
            this.CSdrag = true;
            this.changeHue.apply(this, [event]);
        }, this), false);
        $colorStrip.on('mousemove', $.proxy(function(event){
            if (this.CSdrag === true){
                this.changeHue.apply(this, [event]);
            }
        }, this), false);
        $colorStrip.on('mouseup', $.proxy(function(event){
            this.CSdrag = false;
            this.changeHue.apply(this, [event]);
        }, this), false);
    };
    
    /**
     * Color Wheel
     **/
    
    function ColorWheel($element){
        // The main wrapper for the color wheel
        this.$wrapper = $element;
        // The color wheel element (jQuery)
        this.$colorWheel = $element.find('canvas[data-type="color-wheel"]');
        // The color wheel element (JavaScript)
        this.colorWheel = this.$colorWheel.get(0);
        // The 2D context of the color wheel
        this.context = this.colorWheel.getContext('2d');
        // The width of the color wheel
        this.width = this.colorWheel.width;
        // The height of the color wheel
        this.height = this.colorWheel.height;
        // The x-axis of the color block
        this.x = 0;
        // The y-axis of the color block
        this.y = 0;
        // The radial x-axis of the color wheel
        this.cx = this.width / 2;
        // The radial y-axis of the color wheel
        this.cy = this.width / 2;
        // The radius of the color wheel
        this.radius = this.width / 2;
        // The boolean value to determine whether the color wheel is counterclockwise
        this.counterClockwise = false;
        // The boolean value to determine whether to drag the mouse on the color wheel
        this.drag = false;
        // The start (minimum) angle for the wheel
        this.startAngle = 0;
        // The end (maximum) angle for the wheel
        this.endAngle = 360;
        // Default RGBA color
        this.RGBAColor = 'rgba(255, 0, 0, 1)';
        // Creating the color wheel by default
        this.create();
    }
    
    ColorWheel.prototype.create = function(){
        for (var angle = this.startAngle; angle <= this.endAngle; angle++){
            var start = (angle - 2) * Math.PI / 180,
                end = angle * Math.PI / 180;
            this.context.beginPath();
            this.context.moveTo(this.cx, this.cy);
            this.context.arc(this.cx, this.cy, this.radius, start, end, this.counterClockwise);
            this.context.closePath();
            
            var gradient = this.context.createRadialGradient(this.cx, this.cy, 0, this.cx, this.cy, this.radius);
            gradient.addColorStop(0, 'hsl(' + angle + ', 10%, 100%)');
            gradient.addColorStop(1, 'hsl(' + angle + ', 100%, 50%)');
            this.context.fillStyle = gradient;
            this.context.fill();
        }
    };
    
    ColorWheel.prototype.insertData = function(){
        var rgbaComponents = rgba.replace(/rgb(?:a|)\(([^\(\)]{1,})\)/g, '$1'),
            components = rgbaComponents.split(/\,(?:\s+|)/g).map(Number),
            hslComponents = this.rgbToHsl(components),
            hex = this.rgbToHex(components),
            $hexElem = this.$wrapper.find('input[data-name="Hex"]'),
            $rElem = this.$wrapper.find('input[data-name="R"]'),
            $gElem = this.$wrapper.find('input[data-name="G"]'),
            $bElem = this.$wrapper.find('input[data-name="B"]'),
            $hElem = this.$wrapper.find('input[data-name="H"]'),
            $sElem = this.$wrapper.find('input[data-name="S"]'),
            $lElem = this.$wrapper.find('input[data-name="L"]'),
            $colorbox = this.$wrapper.find('div.color-box');
        $rElem.val(components[0]);
        $gElem.val(components[1]);
        $bElem.val(components[2]);
        $hElem.val(hslComponents[0]);
        $sElem.val(hslComponents[1]);
        $lElem.val(hslComponents[2]);
        $hexElem.val(hex);
        $colorbox.css('background-color', rgba);
    };
    
    ColorWheel.prototype.changeColor = function(event){
        this.x = event.offsetX;
        this.y = event.offsetY;
        var imageData = this.context.getImageData(this.x, this.y, 1, 1).data,
            r = imageData[0], g = imageData[1], b = imageData[2];
        this.RGBAColor = 'rgba(' + [r, g, b].join(', ') + ', 1)';
        this.insertData();
    };
    
    ColorWheel.prototype.init = function(){
        var $colorWheel = this.$colorWheel;
        $colorWheel.on('click', $.proxy(this.changeColor, this), false);
        $colorWheel.on('mousedown', $.proxy(function(event){
            this.drag = true;
            this.changeColor.apply(this, [event]);
        }, this), false);
        $colorWheel.on('mousemove', $.proxy(function(event){
            if (this.drag === true){
                this.changeColor.apply(this, [event]);
            }
        }, this), false);
        $colorWheel.on('mouseup', $.proxy(function(event){
            this.drag = false;
            this.changeColor.apply(this, [event]);
        }, this), false);
    };
    
    ['rgbToHex', 'hexToRgb', 'rgbToHsl', 'hslToRgb', 'hslToHex', 'hueToRgb', 'componentToHex', 'lighten', 'darken', 'toNumber', 'toDecimal', 'isType'].forEach(function(fn){
        ColorWheel.prototype[fn] = ColorPicker.prototype[fn];
    });
    
    ColorPicker.create = function($element){
        return new ColorPicker($element);
    };
    
    ColorWheel.create = function($element){
        return new ColorWheel($element);
    };
    
    window.ColorPicker = ColorPicker;
    window.ColorWheel = ColorWheel;
}(jQuery, mediaWiki, this === window ? this : window));