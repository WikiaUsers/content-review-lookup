/*jshint jquery:true curly:false laxbreak:true */
(function (module, $, window, mw) {
    "use strict";
    
    if (module.parse) return;
 
    var colorPresets = {
        aliceblue : [240, 248, 255],
        antiquewhite : [250, 235, 215],
        aqua : [0, 255, 255],
        aquamarine : [127, 255, 212],
        azure : [240, 255, 255],
        beige : [245, 245, 220],
        bisque : [255, 228, 196],
        black : [0, 0, 0],
        blanchedalmond : [255, 235, 205],
        blue : [0, 0, 255],
        blueviolet : [138, 43, 226],
        brown : [165, 42, 42],
        burlywood : [222, 184, 135],
        cadetblue : [95, 158, 160],
        chartreuse : [127, 255, 0],
        chocolate : [210, 105, 30],
        coral : [255, 127, 80],
        cornflowerblue : [100, 149, 237],
        cornsilk : [255, 248, 220],
        crimson : [220, 20, 60],
        cyan : [0, 255, 255],
        darkblue : [0, 0, 139],
        darkcyan : [0, 139, 139],
        darkgoldenrod : [184, 134, 11],
        darkgray : [169, 169, 169],
        darkgrey : [169, 169, 169],
        darkgreen : [0, 100, 0],
        darkkhaki : [189, 183, 107],
        darkmagenta : [139, 0, 139],
        darkolivegreen : [85, 107, 47],
        darkorange : [255, 140, 0],
        darkorchid : [153, 50, 204],
        darkred : [139, 0, 0],
        darksalmon : [233, 150, 122],
        darkseagreen : [143, 188, 143],
        darkslateblue : [72, 61, 139],
        darkslategray : [47, 79, 79],
        darkslategrey : [47, 79, 79],
        darkturquoise : [0, 206, 209],
        darkviolet : [148, 0, 211],
        deeppink : [255, 20, 147],
        deepskyblue : [0, 191, 255],
        dimgray : [105, 105, 105],
        dimgrey : [105, 105, 105],
        dodgerblue : [30, 144, 255],
        firebrick : [178, 34, 34],
        floralwhite : [255, 250, 240],
        forestgreen : [34, 139, 34],
        fuchsia : [255, 0, 255],
        gainsboro : [220, 220, 220],
        ghostwhite : [248, 248, 255],
        gold : [255, 215, 0],
        goldenrod : [218, 165, 32],
        gray : [128, 128, 128],
        grey : [128, 128, 128],
        green : [0, 128, 0],
        greenyellow : [173, 255, 47],
        honeydew : [240, 255, 240],
        hotpink : [255, 105, 180],
        indianred  : [205, 92, 92],
        indigo   : [75, 0, 130],
        ivory : [255, 255, 240],
        khaki : [240, 230, 140],
        lavender : [230, 230, 250],
        lavenderblush : [255, 240, 245],
        lawngreen : [124, 252, 0],
        lemonchiffon : [255, 250, 205],
        lightblue : [173, 216, 230],
        lightcoral : [240, 128, 128],
        lightcyan : [224, 255, 255],
        lightgoldenrodyellow : [250, 250, 210],
        lightgray : [211, 211, 211],
        lightgrey : [211, 211, 211],
        lightgreen : [144, 238, 144],
        lightpink : [255, 182, 193],
        lightsalmon : [255, 160, 122],
        lightseagreen : [32, 178, 170],
        lightskyblue : [135, 206, 250],
        lightslategray : [119, 136, 153],
        lightslategrey : [119, 136, 153],
        lightsteelblue : [176, 196, 222],
        lightyellow : [255, 255, 224],
        lime : [0, 255, 0],
        limegreen : [50, 205, 50],
        linen : [250, 240, 230],
        magenta : [255, 0, 255],
        maroon : [128, 0, 0],
        mediumaquamarine : [102, 205, 170],
        mediumblue : [0, 0, 205],
        mediumorchid : [186, 85, 211],
        mediumpurple : [147, 112, 219],
        mediumseagreen : [60, 179, 113],
        mediumslateblue : [123, 104, 238],
        mediumspringgreen : [0, 250, 154],
        mediumturquoise : [72, 209, 204],
        mediumvioletred : [199, 21, 133],
        midnightblue : [25, 25, 112],
        mintcream : [245, 255, 250],
        mistyrose : [255, 228, 225],
        moccasin : [255, 228, 181],
        navajowhite : [255, 222, 173],
        navy : [0, 0, 128],
        oldlace : [253, 245, 230],
        olive : [128, 128, 0],
        olivedrab : [107, 142, 35],
        orange : [255, 165, 0],
        orangered : [255, 69, 0],
        orchid : [218, 112, 214],
        palegoldenrod : [238, 232, 170],
        palegreen : [152, 251, 152],
        paleturquoise : [175, 238, 238],
        palevioletred : [219, 112, 147],
        papayawhip : [255, 239, 213],
        peachpuff : [255, 218, 185],
        peru : [205, 133, 63],
        pink : [255, 192, 203],
        plum : [221, 160, 221],
        powderblue : [176, 224, 230],
        purple : [128, 0, 128],
        rebeccapurple : [102, 51, 153],
        red : [255, 0, 0],
        rosybrown : [188, 143, 143],
        royalblue : [65, 105, 225],
        saddlebrown : [139, 69, 19],
        salmon : [250, 128, 114],
        sandybrown : [244, 164, 96],
        seagreen : [46, 139, 87],
        seashell : [255, 245, 238],
        sienna : [160, 82, 45],
        silver : [192, 192, 192],
        skyblue : [135, 206, 235],
        slateblue : [106, 90, 205],
        slategray : [112, 128, 144],
        slategrey : [112, 128, 144],
        snow : [255, 250, 250],
        springgreen : [0, 255, 127],
        steelblue : [70, 130, 180],
        tan : [210, 180, 140],
        teal : [0, 128, 128],
        thistle : [216, 191, 216],
        tomato : [255, 99, 71],
        turquoise : [64, 224, 208],
        violet : [238, 130, 238],
        wheat : [245, 222, 179],
        white : [255, 255, 255],
        whitesmoke : [245, 245, 245],
        yellow : [255, 255, 0],
        yellowgreen : [154, 205, 50]
    };
    
    var check = {};
    $.each({
        rgb: [0, 255],
        hsl: [0, 1],
        percentage: [-100, 100],
        mix: [0, 100],
        degree: [-360, 360]
    }, function (type, bounds) {
        var min = bounds[0], max = bounds[1];
        check[type] = function (i, v) {
            if (typeof v !== 'number' || v < min || v > max) {
                throw new Error('color value out of bounds');
            }
        };
    });
    
    var Color = function (tuple, type) {
        if (tuple === undefined || !$.isArray(tuple) || tuple.length !== 3) {
            throw new Error('no color data provided');
        }
        if (!({ rgb:1,hsl:1 }[type])) {
            throw new Error('no valid color type');
        }
        $.each(tuple, check[type]);
        this.type = type;
        this.tuple = tuple;
    };
    
    module.fromRgb = function (r, g, b) {
        return new Color([r,g,b], 'rgb');
    };
    
    module.fromHsl = function (h, s, l) {
        return new Color([h,s,l], 'hsl');
    };
    
    module.parse = function (str) {
        var result = false, m, radix = false, c = false;
        if (typeof str === 'string') {
            str = str.toLowerCase().trim();
            if ((m = str.match(/^(?:#([\da-f])([\da-f])([\da-f])|#([\da-f]{2})([\da-f]{2})([\da-f]{2})|#([\da-f]{2})([\da-f]{2})([\da-f]{2})([\da-f]{2})|rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)\s*|rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(1|\d*\.?\d*%?)\s*\))$/)) !== null) {
                     if (m[1])  { c = m.slice(1,  4);  radix = 16; $.each(c, function (i,v) { c[i] += v; }); }
                else if (m[4])  { c = m.slice(4,  7);  radix = 16; }
                else if (m[7])  { c = m.slice(7, 10);  radix = 16; }
                else if (m[11]) { c = m.slice(11, 14); radix = 10; }
                else if (m[14]) { c = m.slice(14, 17); radix = 10; }
                if (radix) {
                    result = [ parseInt(c[0], radix), parseInt(c[1], radix), parseInt(c[2], radix) ];
                }
            } else if (colorPresets.hasOwnProperty(str)) {
                result = colorPresets[str];
            }
            if (result) return new Color(result, 'rgb');
        }
        throw new Error('cannot parse '+str);
    };

    $.each(['rotate', 'saturate', 'lighten'], function (i, fn) {
        var div = 100,
            test = 'percentage',
            cap = limit;
        if (fn === 'rotate') {
            div = 360;
            test = 'degree';
            cap = circle;
        }
        Color.prototype[fn] = function (mod) {
            check[test](null, mod);
            var self = clone(this, 'hsl');
            self.tuple[i] = cap(self.tuple[i] + mod / div, 1);
            return self;
        };
    });
    
    Color.prototype.mix = function (other, weight) {
        if (!(other instanceof Color)) {
            other = module.parse(other);
            convert(other, 'rgb');
        } else {
            other = clone(other, 'rgb');
        }
        weight = weight || 50;
        check.mix(null, weight);
        weight /= 100;
        var self = clone(this, 'rgb');
        for (var i = 0; i < 3; i++) {
            self.tuple[i] = Math.floor(self.tuple[i] * weight + other.tuple[i] * (1 - weight));
            self.tuple[i] = limit(self.tuple[i], 255);
        }
        return self;
    };
    
    Color.prototype.invert = function () {
        var self = clone(this, 'rgb');
        for (var i = 0; i < 3; i++) {
            self.tuple[i] = 255 - self.tuple[i];
        }
        return self;
    };
    
    Color.prototype.complement = function () {
        return this.rotate(180);
    };
    
    Color.prototype.isBright = function () {
       var self = clone(this, 'hsl');
       return self.tuple[2] >= 0.5;
    };
    
    Color.prototype.isColor = function () {
       var self = clone(this, 'hsl');
       return self.tuple[1] !== 0 && self.tuple[2] !== 0;
    };
    
    $.each(['red', 'green', 'blue', 'hue', 'saturation', 'lightness'], function (i, fn) {
        var n = i % 3,
            type = i < 3 ? 'rgb' : 'hsl';
        Color.prototype[fn] = function (value) {
            var self = clone(this, type);
            if (value !== undefined) {
                check[type](null, value);
                self.tuple[n] = value;
                return self;
            } else {
                return self.tuple[n];
            }
        };
    });
    
    Color.prototype.hex = function () {
       var self = clone(this, 'rgb'),
           str = '#';
       for (var i = 0; i < 3; i++) {
            var hex = self.tuple[i].toString(16);
            if (hex.length === 1) {
                hex = '0' + hex;
            }
            str += hex;
        }
        return str;
    };
    
    Color.prototype.toString = Color.prototype.hex;
    
    $.each(['rgb', 'hsl'], function (i, type) {
        Color.prototype[type] = function () {
            var self = clone(this, type);
            if (type === 'hsl') {
                self.tuple = $.map(self.tuple, function(t, i) {
                    return i === 0 ?
                        String(t*360) :
                        String(t*100) + '%';
                });
            }
            return type + '(' + self.tuple.join(', ') + ')';
        };
    });
    
    function clone (color, type) {
        var c = new Color([color.tuple[0], color.tuple[1], color.tuple[2]], color.type);
        convert(c, type);
        return c;
    }
    
    function limit (value, max) {
        return Math.max(0, Math.min(value, max));
    }
    
    function circle (value, max) {
        if (value < 0) value += max;
        else if (value > max) value -= max;
        return value;
    }
    
    function convert (color, type) {
        if (color.type !== type) {
            color.type   = type;
            color.tuple  = type === 'rgb'
                ? hslToRgb(color.tuple)
                : rgbToHsl(color.tuple);
        }
        if (color.type === 'rgb') {
            for (var i = 0; i < 3; i++) {
                color.tuple[i] = Math.floor(color.tuple[i]);
            }
        }
    }
    
    function rgbToHsl (rgb) {
        var r = rgb[0], g = rgb[1], b = rgb[2];
        r /= 255; g /= 255; b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min)  / 2;
        
        if (max === min) {
            h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min)  : d / (max + min);
            switch (max) {
                case r: h = (g - b)  / d + (g < b ? 6 : 0); break;
                case g: h = (b - r)  / d + 2; break;
                case b: h = (r - g)  / d + 4; break;
            }
            h /= 6;
        }
        
        return [h, s, l];
    }
    
    function hueToRgb (p, q, t) {
        if (t < 0)  t += 1;
        if (t > 1)  t -= 1;
        if (t < 1/6)  return p + (q - p)  * 6 * t;
        if (t < 1/2)  return q;
        if (t < 2/3)  return p + (q - p)  * (2/3 - t)  * 6;
        return p;
    }
    
    function hslToRgb (hsl) {
        var h = hsl[0], s = hsl[1], l= hsl[2];
        var r, g, b;
        
        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            var q = l < 0.5 ? l * (1 + s)  : l + s - l * s;
            var p = 2 * l - q;
            r = hueToRgb(p, q, h + 1/3);
            g = hueToRgb(p, q, h);
            b = hueToRgb(p, q, h - 1/3);
        }
        
        return [r * 255, g * 255, b * 255];
    }
    
    module.wikia = (function () {
        var colors = {},
            sassParams =  mw.config.get('wgSassParams');

        if (!sassParams) {
            // If wgSassParams doesn't exist, fetch theme colors from the DOM.
            var computedBodyStyle = getComputedStyle(document.body);
            sassParams = {
                'color-body': computedBodyStyle.getPropertyValue('--theme-body-background-color'),
                'color-body-middle': computedBodyStyle.getPropertyValue('--theme-body-background-color'),
                'color-page': computedBodyStyle.getPropertyValue('--theme-page-background-color'),
                'color-buttons': computedBodyStyle.getPropertyValue('--theme-accent-color'),
                'color-community-header': computedBodyStyle.getPropertyValue('--theme-header-background-color'),
                'color-links': computedBodyStyle.getPropertyValue('--theme-link-color'),
            };
        }

        $.each({
            body: 'color-body',
            page: 'color-page',
            menu: 'color-buttons',
            header: 'color-community-header',
            nav: 'color-community-header', //deprecated name
            link: 'color-links',
            split: 'color-body-middle',
        }, function (prop, sassName) {
            colors[prop] = sassParams[sassName];
        });

        var page = module.parse(colors.page),
            menu = module.parse(colors.menu),
            pageBright = page.isBright(),
            menuBright = menu.isBright();

        $.extend(colors, {
            contrast:  menuBright ? '#000' : '#fff',
            text:      pageBright ? '#3a3a3a' : '#d5d4d4',
            border:    page.mix(pageBright ? 'black' : 'white', 80).hex(),
            gradient:  menu.lighten(menuBright ? -20 : 20).hex()
        });

        document.body.classList.add(menuBright ? 'menu-bright' : 'menu-dark');
        document.body.classList.add(pageBright ? 'page-bright' : 'page-dark');

        return colors;
    }());
    module.fandom = module.wikia;
    
    module.replace = function (styles, variables) {
        variables = (variables ? $.extend({}, module.wikia, variables) : module.wikia);
        return styles.replace(/\$([a-z][\w\-]*)/ig, function (match, p1) {
            if (variables.hasOwnProperty(p1)) {
                return variables[p1];
            }
            return match;
        });
    };

    module.css = function (styles, variables) {
        var el = document.createElement('style');
        el.type = 'text/css';
        el.textContent = module.replace(styles, variables);
        document.head.appendChild(el);
    };

    mw.hook('dev.colors').fire(module);

}((window.dev = window.dev || {}).colors = window.dev.colors || {}, jQuery, window, mediaWiki));