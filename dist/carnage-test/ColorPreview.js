window.dev = $.extend({}, window.dev);

window.dev.ColorPreview = (function(window, $, mw){
    var support = {};
    
    support.oninput = !($.browser.msie);
    
    var ColorPreview = {
        name: "ColorPreview",
        version: "2.0a"
    };
    
    var i18n = { msgs: {} };
 
    i18n.msg = function(name, type){
        if (typeof type !== "string") type = "_default";
 
        if (!has.call(i18n.msgs, name)) return "";
        var msg = i18n.msgs[name], res = "";
 
        if (!has.call(msg, type)) type = "_default";
 
        if (type === "_default") type = msg[type];
 
        if (type === "replace"){
            var args = [].slice.call(arguments, 2);
            res = msg.replace.apply(msg, args);
        } else res = msg[type];
 
        return res;
    };
 
    i18n.replace = function(name){
        var args = slice.call(arguments, 1);
        return i18n.msg.apply(i18n.msg, [name, "replace"].concat(args));
    };
 
    ["parse", "plain", "escape"].forEach(function(key){
        i18n[key] = function(name){
            return i18n.msg(name, key);
        };
    });
 
    i18n.load = function(){
        mw.hook("dev.i18n").add(function(i18no){
            i18no.loadMessages("ColorPreview").done(i18n.getMessages);
        });
    };
 
    i18n.getMessages = function(_i18n){
        var msgs = _i18n._messages["en"];
        Object.keys(msgs).forEach(function(key){
            i18n.msgs[key] = {};
            i18n.msgs[key].parse = _i18n.msg(key).parse();
            i18n.msgs[key].escape = _i18n.msg(key).escape();
            i18n.msgs[key].plain = _i18n.msg(key).plain();
            i18n.msgs[key]._default = "escape";
            i18n.msgs[key].replace = function(){
                var args = slice.call(arguments);
                return _i18n.msgs.apply(_i18n, args).parse();
            };
        });
        i18n.init.resolve();
    };
 
    i18n.init = $.Deferred();
    
    ColorPreview.i18n = i18n;
    
    function _default(){
        var args = [].slice.call(arguments), value;
        
        while (args.length){
            value = args.shift();
            if (_isset(value)) return value;
        }
        
        return null;
    }
    
    ColorPreview._default = _default;
    
    ColorPreview.colorNames = ColorPreview.colorNames = {
        aliceblue: [240, 248, 255],
        antiquewhite: [250, 235, 215],
        aqua: [0, 255, 255],
        aquamarine: [127, 255, 212],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        bisque: [255, 228, 196],
        black: [0, 0, 0],
        blanchedalmond: [255, 235, 205],
        blue: [0, 0, 255],
        blueviolet: [138, 43, 226],
        brown: [165, 42, 42],
        burlywood: [222, 184, 135],
        cadetblue: [95, 158, 160],
        chartreuse: [127, 255, 0],
        chocolate: [210, 105, 30],
        coral: [255, 127, 80],
        cornflowerblue: [100, 149, 237],
        cornsilk: [255, 248, 220],
        crimson: [220, 20, 60],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgoldenrod: [184, 134, 11],
        darkgray: [169, 169, 169],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkseagreen: [143, 188, 143],
        darkslateblue: [72, 61, 139],
        darkslategray: [47, 79, 79],
        darkslategrey: [47, 79, 79],
        darkturquoise: [0, 206, 209],
        darkviolet: [148, 0, 211],
        deeppink: [255, 20, 147],
        deepskyblue: [0, 191, 255],
        dimgray: [105, 105, 105],
        dimgrey: [105, 105, 105],
        dodgerblue: [30, 144, 255],
        firebrick: [178, 34, 34],
        floralwhite: [255, 250, 240],
        forestgreen: [34, 139, 34],
        fuchsia: [255, 0, 255],
        gainsboro: [220, 220, 220],
        ghostwhite: [248, 248, 255],
        gold: [255, 215, 0],
        goldenrod: [218, 165, 32],
        gray: [128, 128, 128],
        grey: [128, 128, 128],
        green: [0, 128, 0],
        greenyellow: [173, 255, 47],
        honeydew: [240, 255, 240],
        hotpink: [255, 105, 180],
        indianred: [205, 92, 92],
        indigo: [75, 0, 130],
        ivory: [255, 255, 240],
        khaki: [240, 230, 140],
        lavender: [230, 230, 250],
        lavenderblush: [255, 240, 245],
        lawngreen: [124, 252, 0],
        lemonchiffon: [255, 250, 205],
        lightblue: [173, 216, 230],
        lightcoral: [240, 128, 128],
        lightcyan: [224, 255, 255],
        lightgoldenrodyellow: [250, 250, 210],
        lightgray: [211, 211, 211],
        lightgrey: [211, 211, 211],
        lightgreen: [144, 238, 144],
        lightpink: [255, 182, 193],
        lightsalmon: [255, 160, 122],
        lightseagreen: [32, 178, 170],
        lightskyblue: [135, 206, 250],
        lightslategray: [119, 136, 153],
        lightslategrey: [119, 136, 153],
        lightsteelblue: [176, 196, 222],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        limegreen: [50, 205, 50],
        linen: [250, 240, 230],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        mediumaquamarine: [102, 205, 170],
        mediumblue: [0, 0, 205],
        mediumorchid: [186, 85, 211],
        mediumpurple: [147, 112, 219],
        mediumseagreen: [60, 179, 113],
        mediumslateblue: [123, 104, 238],
        mediumspringgreen: [0, 250, 154],
        mediumturquoise: [72, 209, 204],
        mediumvioletred: [199, 21, 133],
        midnightblue: [25, 25, 112],
        mintcream: [245, 255, 250],
        mistyrose: [255, 228, 225],
        moccasin: [255, 228, 181],
        navajowhite: [255, 222, 173],
        navy: [0, 0, 128],
        oldlace: [253, 245, 230],
        olive: [128, 128, 0],
        olivedrab: [107, 142, 35],
        orange: [255, 165, 0],
        orangered: [255, 69, 0],
        orchid: [218, 112, 214],
        palegoldenrod: [238, 232, 170],
        palegreen: [152, 251, 152],
        paleturquoise: [175, 238, 238],
        palevioletred: [219, 112, 147],
        papayawhip: [255, 239, 213],
        peachpuff: [255, 218, 185],
        peru: [205, 133, 63],
        pink: [255, 192, 203],
        plum: [221, 160, 221],
        powderblue: [176, 224, 230],
        purple: [128, 0, 128],
        rebeccapurple: [102, 51, 153],
        red: [255, 0, 0],
        rosybrown: [188, 143, 143],
        royalblue: [65, 105, 225],
        saddlebrown: [139, 69, 19],
        salmon: [250, 128, 114],
        sandybrown: [244, 164, 96],
        seagreen: [46, 139, 87],
        seashell: [255, 245, 238],
        sienna: [160, 82, 45],
        silver: [192, 192, 192],
        skyblue: [135, 206, 235],
        slateblue: [106, 90, 205],
        slategray: [112, 128, 144],
        slategrey: [112, 128, 144],
        snow: [255, 250, 250],
        springgreen: [0, 255, 127],
        steelblue: [70, 130, 180],
        tan: [210, 180, 140],
        teal: [0, 128, 128],
        thistle: [216, 191, 216],
        tomato: [255, 99, 71],
        turquoise: [64, 224, 208],
        violet: [238, 130, 238],
        wheat: [245, 222, 179],
        white: [255, 255, 255],
        whitesmoke: [245, 245, 245],
        yellow: [255, 255, 0],
        yellowgreen: [154, 205, 50]
    };
    
    ColorPreview.controller = function(options){
        if (!(this instanceof ColorPreview.controller)){
            return new ColorPreview.controller(options);
        }
        
        // Color space support configurations
        this.supportHSV = _default(options.supportHSV, true);
        this.supportCMYK = _default(options.supportCMYK, true);
        this.supportHWB = _default(options.supportHWB, false);
        this.supportHSL = _default(options.supportHSL, true);
        
        // Color name support configuration
        this.supportColorNames = _default(options.supportColorNames, options.supportNames, true);
        
        // Alpha support configuration
        this.supportAlpha = _default(options.supportAlpha, true);
        
        // RGB from 0 to 1
        this.rgbTo1 = _default(options.rgbTo1, false);
        
        // Hue from 0 to 1
        this.hueTo1 = _default(options.hueTo1, false);
        
        /* Regular expression patterns */
        // Hexadecimal
        this.rhex1 = /#([\da-f]{2})([\da-f]{2})([\da-f]{2})/i;
        this.rhex2 = /#([\da-f])([\da-f])([\da-f])/i;
        // RGB
        this.rrgb1 = /rgb\(([\d]{1,3}),\s?([\d]{1,3}),\s?([\d]{1,3})\)/i;
        this.rrgb2 = /rgb\(([0-1](?:\.[\d]+)?),\s?([0-1](?:\.[\d]+)?),\s?([0-1](?:\.[\d]+)?)\)/i;
        // RGBA
        this.rrgba1 = /rgba\(([\d]{1,3}),\s?([\d]{1,3}),\s([\d]{1,3}),\s?([0-1](?:\.[\d]+)?)\)/i;
        this.rrgba2 = /rgba\(([0-1](?:\.[\d]+)?),\s?([0-1](?:\.[\d]+)?),\s?([0-1](?:\.[\d]+)?),\s?([0-1](?:\.[\d]+)?)\)/i;
        // HSL
        this.rhsl1 = /hsl\(([\d]{1,3}),\s?([0-1](?:\.[\d]+)?),\s?([0-1](?:\.[\d]+)?)\)/i;
        this.rhsl2 = /hsl\(([0-1](?:\.[\d]+)?),\s?([0-1](?:\.[\d]+)?),\s([0-1](?:\.[\d]+)?)\)/i;
        // HSLA
        this.rhsla1 = /hsla\(([\d]{1,3}),\s?([0-1](?:\.[\d]+)?),\s?([0-1](?:\.[\d]+)?),\s?([0-1](?:\.[\d]+)?)\)/i;
        this.rhsla2 = /hsla\(([0-1](?:\.[\d]+)?),\s?([0-1](?:\.[\d]+)?),\s?([0-1](?:\.[\d]+)?),\s?([0-1](?:\.[\d]+)?)\)/i;
        // HSV
        this.rhsv = /hsv\(([\d]{1,3}),\s?([0-1](?:\.[\d]+)?),\s?([0-1](?:\.[\d]+)?)/i;
        this.rhsv2 = /hsv\(([0-1](?:\.[\d]+)?),\s?([0-1](?:\.[\d]+)?),\s([0-1](?:\.[\d]+)?)\)/i;
        // HSVA
        this.rhsva1 = /hsva\(([\d]{1,3}),\s?([0-1](?:\.[\d]+)?),\s?([0-1](?:\.[\d]+)?),\s?([0-1](?:\.[\d]+)?)\)/i;
        this.rhsva2 = /hsva\(([0-1](?:\.[\d]+)?),\s?([0-1](?:\.[\d]+)?),\s?([0-1](?:\.[\d]+)?),\s?([0-1](?:\.[\d]+)?)\)/i;
        // HWB
        this.rhwb1 = /hwb\(([\d]{1,3}),\s?([0-1](?:\.[\d]+)?),\s?([0-1](?:\.[\d]+)?)\)/i;
        this.rhwb2 = /hwb\(([0-1](?:\.[\d]+)?),\s?([0-1](?:\.[\d]+)?),\s?([0-1](?:\.[\d]+)?)\)/i;
        // CMYK
        this.rcmyk = /cmyk\(([0-1](?:\.[\d]+)?),\s?([0-1](?:\.[\d]+)?),\s?([0-1](?:\.[\d]+)?),\s?([0-1](?:\.[\d]+)?)\)/i;
        return this;
    };
    
    ColorPreview.converters = {
        rgb: function(type, tuple) {
            if (type === 'rgb') return;
            else if (type === 'hsl') {
                let h = tuple[0],
                    s = tuple[1],
                    l = tuple[2],
                    r, g, b;
                if (s === 0) r = g = b = l;
                else {
                    let q = l < 0.5 ? l * (1 + s) : l + s - l * s,
                        p = 2 * l - q;
                    r = Color.hueToRgb(p, q, h + 1 / 3);
                    g = Color.hueToRgb(p, q, h);
                    b = Color.hueToRgb(p, q, h - 1 / 3);
                }
                return [r, g, b].map(function(n){
                    return n * 255;
                });
            } else if (type === 'hsv'){
                let r, g, b, i = Math.floor(h * 6),
                    f = h * 6 - i,
                    p = v * (1 - s),
                    q = v * (1 - f * s),
                    t = v * (1 - (1 - f) * s);

                switch (i % 6) {
                    case 0:
                        r = v, g = t, b = p;
                        break;
                    case 1:
                        r = q, g = v, b = p;
                        break;
                    case 2:
                        r = p, g = v, b = t;
                        break;
                    case 3:
                        r = p, g = q, b = v;
                        break;
                    case 4:
                        r = t, g = p, b = v;
                        break;
                    case 5:
                        r = v, g = p, b = q;
                        break;
                }
                return [r, g, b].map(function(n) {
                    return n * 255;
                });
            } else if (type === 'hwb') {
                let h = tuple[0],
                    w = tuple[1],
                    bl = tuple[2],
                    s = 1 - (w / (1 - bl)),
                    v = 1 - bl,
                    l = (2 - s) * v / 2,
                    r, g, b;
                if (l !== 0) {
                    if (l == 1) s = 0;
                    else if (l < 0.5) s = s * v / (l * 2);
                    else s = s * v / (2 - l * 2);
                }

                if (s === 0) r = g = b = l;
                else {
                    let q = l < 0.5 ? l * (1 + s) : l + s - l * s,
                        p = 2 * l - q;
                    r = Color.hueToRgb(p, q, h + 1 / 3);
                    g = Color.hueToRgb(p, q, h);
                    b = Color.hueToRgb(p, q, h - 1 / 3);
                }
                return [r, g, b].map(function(n) {
                    return n * 255;
                });
            } else if (type === 'cmyk') {
                let C = tuple[0],
                    M = tuple[1],
                    Y = tuple[2],
                    K = tuple[3],
                    r = (1 - C) * (1 - K),
                    g = (1 - M) * (1 - K),
                    b = (1 - Y) * (1 - K);
                return [r, g, b].map(function(n) {
                    return n * 255;
                });
            }
        },
        hsl: function(type, tuple){
            if (type === 'hsl') return;
            else if (type === 'rgb') {
                let r = tuple[0],
                    g = tuple[1],
                    b = tuple[2];
                r /= 255;
                g /= 255;
                b /= 255;
                let max = Math.max(r, g, b),
                    min = Math.min(r, g, b),
                    h, s, l = (max + min) / 2;
                if (max === min) h = s = 0;
                else {
                    let d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    switch (max) {
                        case r:
                            h = (g - b) / d + (g < b ? 6 : 0);
                            break;
                        case g:
                            h = (b - r) / d + 2;
                            break;
                        case b:
                            h = (r - g) / d + 4;
                            break;
                    }
                    h /= 6;
                }
                return [h, s, l];
            } else if (type === 'hsv') {
                let h = tuple[0],
                    s = tuple[1],
                    v = tuple[2],
                    l = (2 - s) * v / 2;
                if (l !== 0) {
                    if (l == 1) s = 0;
                    else if (l < 0.5) s = s * v / (l * 2);
                    else s = s * v / (2 - l * 2);
                }
                return [h, s, l];
            } else if (type === 'hwb') {
                let h = tuple[0],
                    w = tuple[1],
                    b = tuple[2],
                    s = 1 - (w / (1 - b)),
                    v = 1 - b,
                    l = (2 - s) * v / 2;
                if (l !== 0) {
                    if (l == 1) s = 0;
                    else if (l < 0.5) s = s * v / (l * 2);
                    else s = s * v / (2 - l * 2);
                }
                return [h, s, l];
            } else if (type === 'cmyk') {
                let C = tuple[0],
                    M = tuple[1],
                    Y = tuple[2],
                    K = tuple[3],
                    r = (1 - C) * (1 - K),
                    g = (1 - M) * (1 - K),
                    b = (1 - Y) * (1 - K);
                let max = Math.max(r, g, b),
                    min = Math.min(r, g, b),
                    h, s, l = (max + min) / 2;
                if (max === min) h = s = 0;
                else {
                    let d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    switch (max) {
                        case r:
                            h = (g - b) / d + (g < b ? 6 : 0);
                            break;
                        case g:
                            h = (b - r) / d + 2;
                            break;
                        case b:
                            h = (r - g) / d + 4;
                            break;
                    }
                    h /= 6;
                }
                return [h, s, l];
            }
        },
        hsv: function(type, tuple) {
            if (type === 'hsv') return;
            else if (type === 'hsl') {
                let h = tuple[0],
                    s = tuple[1],
                    l = tuple[2],
                    v = s * Math.min(l, 1 - l) + l;
                s = v ? 2 - 2 * l / v : 0;
                return [h, s, v];
            } else if (type === 'rgb'){
                let r = tuple[0],
                    g = tuple[1],
                    b = tuple[2];
                r /= 255;
                g /= 255;
                b /= 255;
                let max = Math.max(r, g, b),
                    min = Math.min(r, g, b),
                    h, s, v = max;

                let d = max - min;
                s = max === 0 ? 0 : d / max;
                if (max === min) h = 0;
                else {
                    switch (max) {
                        case r:
                            h = (g - b) / d + (g < b ? 6 : 0);
                            break;
                        case g:
                            h = (b - r) / d + 2;
                            break;
                        case b:
                            h = (r - g) / d + 4;
                            break;
                    }

                    h /= 6;
                }
                return [h, s, v];
            } else if (type === 'hwb') {
                let h = tuple[0],
                    w = tuple[1],
                    b = tuple[2],
                    s = 1 - (w / (1 - b)),
                    v = 1 - b;
                return [h, s, v];
            } else if (type === 'cmyk') {
                let C = tuple[0],
                    M = tuple[1],
                    Y = tuple[2],
                    K = tuple[3],
                    r = (1 - C) * (1 - K),
                    g = (1 - M) * (1 - K),
                    b = (1 - Y) * (1 - K);
                let max = Math.max(r, g, b),
                    min = Math.min(r, g, b),
                    h, s, v = max;

                let d = max - min;
                s = max === 0 ? 0 : d / max;
                if (max === min) h = 0;
                else {
                    switch (max) {
                        case r:
                            h = (g - b) / d + (g < b ? 6 : 0);
                            break;
                        case g:
                            h = (b - r) / d + 2;
                            break;
                        case b:
                            h = (r - g) / d + 4;
                            break;
                    }

                    h /= 6;
                }
                return [h, s, v];
            }
        },
        hwb: function(type, tuple){
            if (type === 'hwb') return;
            else if (type === 'rgb') {
                let r = tuple[0],
                    g = tuple[1],
                    b = tuple[2];
                r /= 255;
                g /= 255;
                b /= 255;
                let max = Math.max(r, g, b),
                    min = Math.min(r, g, b),
                    h, s, v = max;

                let d = max - min;
                s = max === 0 ? 0 : d / max;
                if (max === min) h = 0;
                else {
                    switch (max) {
                        case r:
                            h = (g - b) / d + (g < b ? 6 : 0);
                            break;
                        case g:
                            h = (b - r) / d + 2;
                            break;
                        case b:
                            h = (r - g) / d + 4;
                            break;
                    }

                    h /= 6;
                }
                let w = (1 - s) * v,
                    bl = 1 - v;
                return [h, w, b];
            } else if (type === 'hsl'){
                let h = tuple[0],
                    s = tuple[1],
                    l = tuple[2],
                    v = s * Math.min(l, 1 - l) + l;
                s = v ? 2 - 2 * l / v : 0;
                let w = (1 - s) * v,
                    bl = 1 - v;
                return [h, w, b];
            } else if (type === 'hsv'){
                let h = tuple[0],
                    s = tuple[1],
                    v = tuple[2],
                    w = (1 - s) * v,
                    b = 1 - v;
                return [h, w, b];
            } else if (type === 'cmyk'){
                let C = tuple[0],
                    M = tuple[1],
                    Y = tuple[2],
                    K = tuple[3],
                    r = (1 - C) * (1 - K),
                    g = (1 - M) * (1 - K),
                    b = (1 - Y) * (1 - K);
                let max = Math.max(r, g, b),
                    min = Math.min(r, g, b),
                    h, s, v = max;

                let d = max - min;
                s = max === 0 ? 0 : d / max;
                if (max === min) h = 0;
                else {
                    switch (max) {
                        case r:
                            h = (g - b) / d + (g < b ? 6 : 0);
                            break;
                        case g:
                            h = (b - r) / d + 2;
                            break;
                        case b:
                            h = (r - g) / d + 4;
                            break;
                    }

                    h /= 6;
                }
                let w = (1 - s) * v,
                    bl = 1 - v;
                return [h, w, b];
            }
        },
        cmyk: function(type, tuple){
            if (type === 'cmyk') return;
            else if (type === 'rgb') {
                let r = tuple[0],
                    g = tuple[1],
                    b = tuple[2],
                    C, M, Y, K;
                if ((r == 0) && (g == 0) && (b == 0)) {
                    C = M = Y = 0;
                    K = 1;
                } else {
                    let p = 1 - (r / 255),
                        q = 1 - (g / 255),
                        r = 1 - (b / 255);

                    K = Math.min(p, Math.max(q, r));
                    C = (p - K) / (1 - K);
                    M = (q - K) / (1 - K);
                    Y = (r - K) / (1 - K);
                }
                return [C, M, Y, K];
            } else if (type === 'hsl') {
                let h = tuple[0],
                    s = tuple[1],
                    l = tuple[2],
                    r, g, b, C, M, Y, K;
                if (s === 0) r = g = b = l;
                else {
                    let q = l < 0.5 ? l * (1 + s) : l + s - l * s,
                        p = 2 * l - q;
                    r = Color.hueToRgb(p, q, h + 1 / 3);
                    g = Color.hueToRgb(p, q, h);
                    b = Color.hueToRgb(p, q, h - 1 / 3);
                }
                if ((r == 0) && (g == 0) && (b == 0)) {
                    C = M = Y = 0;
                    K = 1;
                } else {
                    let p = 1 - (r / 255),
                        q = 1 - (g / 255),
                        r = 1 - (b / 255);

                    K = Math.min(p, Math.max(q, r));
                    C = (p - K) / (1 - K);
                    M = (q - K) / (1 - K);
                    Y = (r - K) / (1 - K);
                }
                return [C, M, Y, K];
            } else if (type === 'hsv') {
                let r, g, b, i = Math.floor(h * 6),
                    f = h * 6 - i,
                    p = v * (1 - s),
                    q = v * (1 - f * s),
                    t = v * (1 - (1 - f) * s);

                switch (i % 6) {
                    case 0:
                        r = v, g = t, b = p;
                        break;
                    case 1:
                        r = q, g = v, b = p;
                        break;
                    case 2:
                        r = p, g = v, b = t;
                        break;
                    case 3:
                        r = p, g = q, b = v;
                        break;
                    case 4:
                        r = t, g = p, b = v;
                        break;
                    case 5:
                        r = v, g = p, b = q;
                        break;
                }

                let C, M, Y, K;
                if ((r == 0) && (g == 0) && (b == 0)) {
                    C = M = Y = 0;
                    K = 1;
                } else {
                    let p = 1 - (r / 255),
                        q = 1 - (g / 255),
                        r = 1 - (b / 255);

                    K = Math.min(p, Math.max(q, r));
                    C = (p - K) / (1 - K);
                    M = (q - K) / (1 - K);
                    Y = (r - K) / (1 - K);
                }
                return [C, M, Y, K];
            } else if (type === 'hwb') {
                let h = tuple[0],
                    w = tuple[1],
                    bl = tuple[2],
                    s = 1 - (w / (1 - bl)),
                    v = 1 - bl,
                    l = (2 - s) * v / 2,
                    r, g, b;
                if (l !== 0) {
                    if (l == 1) s = 0;
                    else if (l < 0.5) s = s * v / (l * 2);
                    else s = s * v / (2 - l * 2);
                }

                if (s === 0) r = g = b = l;
                else {
                    let q = l < 0.5 ? l * (1 + s) : l + s - l * s,
                        p = 2 * l - q;
                    r = Color.hueToRgb(p, q, h + 1 / 3);
                    g = Color.hueToRgb(p, q, h);
                    b = Color.hueToRgb(p, q, h - 1 / 3);
                }
                let C, M, Y, K;
                if ((r == 0) && (g == 0) && (b == 0)) {
                    C = M = Y = 0;
                    K = 1;
                } else {
                    let p = 1 - (r / 255),
                        q = 1 - (g / 255),
                        r = 1 - (b / 255);

                    K = Math.min(p, Math.max(q, r));
                    C = (p - K) / (1 - K);
                    M = (q - K) / (1 - K);
                    Y = (r - K) / (1 - K);
                }
                return [C, M, Y, K];
            }
        }
    };
    
    ColorPreview.controller.prototype = {
        constructor: ColorPreview.controller,
        
    };
}(window, window.jQuery, window.mediaWiki));