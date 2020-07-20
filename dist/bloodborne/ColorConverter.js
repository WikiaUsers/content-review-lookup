/**
 * Utilities for dealing with colours.
 * 
 * @module ColorConverter
 * @version 1.1.0
 */

;(function () {
    'use strict';
    
    var mw = window.mw;
    
    if (window.ColorConverter) return;
    
    var hexLengths = [4, 7];
    var regex = /^#?([a-f,A-F,0-9]{1,2})([a-f,A-F,0-9]{1,2})([a-f,A-F,0-9]{1,2})$/;
    
    var ColorConverter = {
        padHex: function (n) {
            return n.length === 1 ? '0' + n : n;
        },
        getDarkness: function (color) {
            var a = color >> 16 & 255;
            var b = color >> 8 & 255;
            var c = 255 & color;
            var d = (0.299 * (a) + 0.587 * (b) + 0.114 * (c));
            
            return 1 - d / 255;
        },
        rgb2hex: function (r, g, b) {
            var hexComponents = [
                this.padHex(r.toString(16)),
                this.padHex(g.toString(16)),
                this.padHex(b.toString(16))
            ];
            return '#' + hexComponents.join('');
        },
        rgb2int: function (r, g, b) {
            var hex = this.rgb2hex(r, g, b);
            return this.hex2int(hex);
        },
        hex2int: function (hex) {
            if (!this.isValidHex(hex)) return null;
            
            var str = '#';
            if (hex.length === 4) {
                for (var i = 1; i < 4; i++) str += hex[i].repeat(2);
            } else str = hex;
            
            return parseInt(str.slice(1), 16);
        },
        hex2rgb: function (hex, alpha) {
            if (!this.isValidHex(hex)) return null;
            if (alpha === void 0) alpha = 1;
            
            var matches = hex.match(regex);
            if (3 !== (matches = matches.slice(1)).length) return null;
            var ints = matches.map(function(e) {
                return e.length === 1 && (e += e), parseInt(e, 16);
            });
            
            return 'rgba(' + ints.join(', ') + ', ' + alpha + ')';
        },
        int2hex: function (int) {
            var a = int >> 16 & 255;
            var b = int >> 8 & 255;
            var c = 255 & int;
            var hex = '#';
            
            hex += this.padHex(a.toString(16));
            hex += this.padHex(b.toString(16));
            hex += this.padHex(c.toString(16));
            
            return hex;
        },
        int2rgb: function (int, alpha) {
            var ints = [int >> 16 & 255, int >> 8 & 255, 255 & int];
            
            if (alpha === void 0) alpha = 1;
            else if (alpha === null) alpha = (int >> 24 & 255) / 255;
            
            return 'rgba(' + ints.join(', ') + ', ' + alpha + ')';
        },
        isValidHex: function (hex) {
            if (!hexLengths.includes(hex.length) || hex[0] !== '#') return false;
            return hex.match(regex) !== null;
        },
        getRGB: function (color) {
            var one = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/;
            var two = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)%\s*,\s*([0-9]+(?:\.[0-9]+)?)%\s*,\s*([0-9]+(?:\.[0-9]+)?)%\s*\)/;
            var three = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/;
            var four = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/;
            var value = [];
            
            var m = one.exec(color);
            if (m) return value.push(
                parseInt(m[1]), 
                parseInt(m[2]), 
                parseInt(m[3])
            ), value;
            
            m = two.exec(color);
            if (m) return value.push(
                parseFloat(m[1]) * 2.55, 
                parseFloat(m[2]) * 2.55, 
                parseFloat(m[3]) * 2.55
            ), value;
            
            m = three.exec(color);
            if (m) return value.push(
                parseInt(m[1], 16), 
                parseInt(m[2], 16), 
                parseInt(m[3], 16)
            ), value;
            
            m = four.exec(color);
            if (m) return value.push(
                parseInt(m[1] + m[1], 16), 
                parseInt(m[2] + m[2], 16), 
                parseInt(m[3] + m[3], 16)
            ), value;
        },
        darkenColor: function (color, percent) {
            var rgb = this.getRGB(color);
            
            for (var i = 0; i < rgb.length; i++) rgb[i] = Math.round(
                Math.max(0, rgb[i] - rgb[i] * (percent / 100))
            );
            
            return 'rgb(' + rgb.join(', ') + ')';
        },
        lightenColor: function (color, percent) {
            var rgb = this.getRGB(color);
            
            for (var i = 0; i < rgb.length; i++) rgb[i] = Math.round(
                Math.min(255, rgb[i] - rgb[i] * (percent / 100))
            );
            
            return 'rgb(' + rgb.join(', ') + ')';
        },
        rgbToAlpha: function (color, alpha) {
            var rgb = this.getRGB(color);
            return 'rgba(' + rgb.join(', ') + ', ' + alpha + ')';
        }
    };
    
    Object.defineProperties(ColorConverter, {
        name: {
            value: 'ColorConverter',
            writable: false,
            enumerable: true,
            configurable: false
        },
        version: {
            value: '1.1.0',
            writable: false,
            enumerable: true,
            configurable: false
        }
    });
    
    Object.defineProperty(ColorConverter, Symbol.toStringTag, {
        writable: false,
        configurable: false,
        value: ColorConverter.name
    });
    
    Object.freeze(ColorConverter);
    
    window.ColorConverter = ColorConverter;
    mw.hook('ColorConverter').fire(ColorConverter);
})();

/*@end@*/