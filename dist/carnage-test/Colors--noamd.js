/**
 * This script is for
 * testing purposes only.
 **/

( function( window, $, mw ){ 
    "use strict";
    
    window.dev = Object.assign( { }, window.dev );
    
    window.dev.colors = Object.assign( { }, window.dev.colors );
    
    if ( "beta" in window.dev.colors ) return;
    
    const COLOR_PRESETS = Object.freeze( {
        aliceblue : [ 240, 248, 255 ],
        antiquewhite : [ 250, 235, 215 ],
        aqua : [ 0, 255, 255 ],
        aquamarine : [ 127, 255, 212 ],
        azure : [ 240, 255, 255 ],
        beige : [ 245, 245, 220 ],
        bisque : [ 255, 228, 196 ],
        black : [ 0, 0, 0 ],
        blanchedalmond : [ 255, 235, 205 ],
        blue : [ 0, 0, 255 ],
        blueviolet : [ 138, 43, 226 ],
        brown : [ 165, 42, 42 ],
        burlywood : [ 222, 184, 135 ],
        cadetblue : [ 95, 158, 160 ],
        chartreuse : [ 127, 255, 0 ],
        chocolate : [ 210, 105, 30 ],
        coral : [ 255, 127, 80 ],
        cornflowerblue : [ 100, 149, 237 ],
        cornsilk : [ 255, 248, 220 ],
        crimson : [ 220, 20, 60 ],
        cyan : [ 0, 255, 255 ],
        darkblue : [ 0, 0, 139 ],
        darkcyan : [ 0, 139, 139 ],
        darkgoldenrod : [ 184, 134, 11 ],
        darkgray : [ 169, 169, 169 ],
        darkgrey : [ 169, 169, 169 ],
        darkgreen : [ 0, 100, 0 ],
        darkkhaki : [ 189, 183, 107 ],
        darkmagenta : [ 139, 0, 139 ],
        darkolivegreen : [ 85, 107, 47 ],
        darkorange : [ 255, 140, 0 ],
        darkorchid : [ 153, 50, 204 ],
        darkred : [ 139, 0, 0 ],
        darksalmon : [ 233, 150, 122 ],
        darkseagreen : [ 143, 188, 143 ],
        darkslateblue : [ 72, 61, 139 ],
        darkslategray : [ 47, 79, 79 ],
        darkslategrey : [ 47, 79, 79 ],
        darkturquoise : [ 0, 206, 209 ],
        darkviolet : [ 148, 0, 211 ],
        deeppink : [ 255, 20, 147 ],
        deepskyblue : [ 0, 191, 255 ],
        dimgray : [ 105, 105, 105 ],
        dimgrey : [ 105, 105, 105 ],
        dodgerblue : [ 30, 144, 255 ],
        firebrick : [ 178, 34, 34 ],
        floralwhite : [ 255, 250, 240 ],
        forestgreen : [ 34, 139, 34 ],
        fuchsia : [ 255, 0, 255 ],
        gainsboro : [ 220, 220, 220 ],
        ghostwhite : [ 248, 248, 255 ],
        gold : [ 255, 215, 0 ],
        goldenrod : [ 218, 165, 32 ],
        gray : [ 128, 128, 128 ],
        grey : [ 128, 128, 128 ],
        green : [ 0, 128, 0 ],
        greenyellow : [ 173, 255, 47 ],
        honeydew : [ 240, 255, 240 ],
        hotpink : [ 255, 105, 180 ],
        indianred  : [ 205, 92, 92 ],
        indigo   : [ 75, 0, 130 ],
        ivory : [ 255, 255, 240 ],
        khaki : [ 240, 230, 140 ],
        lavender : [ 230, 230, 250 ],
        lavenderblush : [ 255, 240, 245 ],
        lawngreen : [ 124, 252, 0 ],
        lemonchiffon : [ 255, 250, 205 ],
        lightblue : [ 173, 216, 230 ],
        lightcoral : [ 240, 128, 128 ],
        lightcyan : [ 224, 255, 255 ],
        lightgoldenrodyellow : [ 250, 250, 210 ],
        lightgray : [ 211, 211, 211 ],
        lightgrey : [ 211, 211, 211 ],
        lightgreen : [ 144, 238, 144 ],
        lightpink : [ 255, 182, 193 ],
        lightsalmon : [ 255, 160, 122 ],
        lightseagreen : [ 32, 178, 170 ],
        lightskyblue : [ 135, 206, 250 ],
        lightslategray : [ 119, 136, 153 ],
        lightslategrey : [ 119, 136, 153 ],
        lightsteelblue : [ 176, 196, 222 ],
        lightyellow : [ 255, 255, 224 ],
        lime : [ 0, 255, 0 ],
        limegreen : [ 50, 205, 50 ],
        linen : [ 250, 240, 230 ],
        magenta : [ 255, 0, 255 ],
        maroon : [ 128, 0, 0 ],
        mediumaquamarine : [ 102, 205, 170 ],
        mediumblue : [ 0, 0, 205 ],
        mediumorchid : [ 186, 85, 211 ],
        mediumpurple : [ 147, 112, 219 ],
        mediumseagreen : [ 60, 179, 113 ],
        mediumslateblue : [ 123, 104, 238 ],
        mediumspringgreen : [ 0, 250, 154 ],
        mediumturquoise : [ 72, 209, 204 ],
        mediumvioletred : [ 199, 21, 133 ],
        midnightblue : [ 25, 25, 112 ],
        mintcream : [ 245, 255, 250 ],
        mistyrose : [ 255, 228, 225 ],
        moccasin : [ 255, 228, 181 ],
        navajowhite : [ 255, 222, 173 ],
        navy : [ 0, 0, 128 ],
        oldlace : [ 253, 245, 230 ],
        olive : [ 128, 128, 0 ],
        olivedrab : [ 107, 142, 35 ],
        orange : [ 255, 165, 0 ],
        orangered : [ 255, 69, 0 ],
        orchid : [ 218, 112, 214 ],
        palegoldenrod : [ 238, 232, 170 ],
        palegreen : [ 152, 251, 152 ],
        paleturquoise : [ 175, 238, 238 ],
        palevioletred : [ 219, 112, 147 ],
        papayawhip : [ 255, 239, 213 ],
        peachpuff : [ 255, 218, 185 ],
        peru : [ 205, 133, 63 ],
        pink : [ 255, 192, 203 ],
        plum : [ 221, 160, 221 ],
        powderblue : [ 176, 224, 230 ],
        purple : [ 128, 0, 128 ],
        rebeccapurple : [ 102, 51, 153 ],
        red : [ 255, 0, 0 ],
        rosybrown : [ 188, 143, 143 ],
        royalblue : [ 65, 105, 225 ],
        saddlebrown : [ 139, 69, 19 ],
        salmon : [ 250, 128, 114 ],
        sandybrown : [ 244, 164, 96 ],
        seagreen : [ 46, 139, 87 ],
        seashell : [ 255, 245, 238 ],
        sienna : [ 160, 82, 45 ],
        silver : [ 192, 192, 192 ],
        skyblue : [ 135, 206, 235 ],
        slateblue : [ 106, 90, 205 ],
        slategray : [ 112, 128, 144 ],
        slategrey : [ 112, 128, 144 ],
        snow : [ 255, 250, 250 ],
        springgreen : [ 0, 255, 127 ],
        steelblue : [ 70, 130, 180 ],
        tan : [ 210, 180, 140 ],
        teal : [ 0, 128, 128 ],
        thistle : [ 216, 191, 216 ],
        tomato : [ 255, 99, 71 ],
        turquoise : [ 64, 224, 208 ],
        violet : [ 238, 130, 238 ],
        wheat : [ 245, 222, 179 ],
        white : [ 255, 255, 255 ],
        whitesmoke : [ 245, 245, 245 ],
        yellow : [ 255, 255, 0 ],
        yellowgreen : [ 154, 205, 50 ]
    } );
    
    const CAMEL_CASE_COLOR_NAMES = Object.freeze( {
        AliceBlue : "aliceblue",
        AntiqueWhite : "antiquewhite",
        Aqua : "aqua",
        Aquamarine : "aquamarine",
        Azure : "azure",
        Beige : "beige",
        Bisque : "bisque",
        Black : "black",
        BlanchedAlmond : "blanchedalmond",
        Blue : "blue",
        BlueViolet : "blueviolet",
        Brown : "brown",
        Burlywood : "burlywood",
        CadetBlue : "cadetblue",
        Chartreuse : "chartreuse",
        Chocolate : "chocolate",
        Coral : "coral",
        CornflowerBlue : "cornflowerblue",
        Cornsilk : "cornsilk",
        Crimson : "crimson",
        Cyan : "cyan",
        DarkBlue : "darkblue",
        DarkCyan : "darkcyan",
        DarkGoldenrod : "darkgoldenrod",
        DarkGray : "darkgray",
        DarkGrey : "darkgrey",
        DarkGreen : "darkgreen",
        DarkKhaki : "darkkhaki",
        DarkMagenta : "darkmagenta",
        DarkOliveGreen : "darkolivegreen",
        DarkOrange : "darkorange",
        DarkOrchid : "darkorchid",
        DarkRed : "darkred",
        DarkSalmon : "darksalmon",
        DarkSeaGreen : "darkseagreen",
        DarkSlateBlue : "darkslateblue",
        DarkSlateGray : "darkslategray",
        DarkSlateGrey : "darkslategrey",
        DarkTurquoise : "darkturquoise",
        DarkViolet : "darkviolet",
        DeepPink : "deeppink",
        DeepSkyBlue : "deepskyblue",
        DimGray : "dimgray",
        DimGrey : "dimgrey",
        DodgerBlue : "dodgerblue",
        Firebrick : "firebrick",
        FloralWhite : "floralwhite",
        ForestGreen : "forestgreen",
        Fuchsia : "fuchsia",
        Gainsboro : "gainsboro",
        GhostWhite : "ghostwhite",
        Gold : "gold",
        Goldenrod : "goldenrod",
        Gray : "gray",
        Grey : "grey",
        Green : "green",
        GreenYellow : "greenyellow",
        Honeydew : "honeydew",
        HotPink : "hotpink",
        IndianRed : "indianred",
        Indigo : "indigo",
        Ivory : "ivory",
        Khaki : "khaki",
        Lavender : "lavender",
        LavenderBlush : "lavenderblush",
        LawnGreen : "lawngreen",
        LemonChiffon : "lemonchiffon",
        LightBlue : "lightblue",
        LightCoral : "lightcoral",
        LightCyan : "lightcyan",
        LightGoldenrodYellow : "lightgoldenrodyellow",
        LightGray : "lightgray",
        LightGrey : "lightgrey",
        LightGreen : "lightgreen",
        LightPink : "lightpink",
        LightSalmon : "lightsalmon",
        LightSeaGreen : "lightseagreen",
        LightSkyBlue : "lightskyblue",
        LightSlateGray : "lightslategray",
        LightSlateGrey : "lightslategrey",
        LightSteelBlue : "lightsteelblue",
        LightYellow : "lightyellow",
        Lime : "lime",
        LimeGreen : "limegreen",
        Linen : "linen",
        Magenta : "magenta",
        Maroon : "maroon",
        MediumAquamarine : "mediumaquamarine",
        mediumBlue : "mediumblue",
        MediumOrchid : "mediumorchid",
        MediumPurple : "mediumpurple",
        MediumSeaGreen : "mediumseagreen",
        MediumSlateBlue : "mediumslateblue",
        MediumSpringGreen : "mediumspringgreen",
        MediumTurquoise : "mediumturquoise",
        MediumVioletRed : "mediumvioletred",
        MidnightBlue : "midnightblue",
        MintCream : "mintcream",
        MistyRose : "mistyrose",
        Moccasin : "moccasin",
        NavajoWhite : "navajowhite",
        Navy : "navy",
        OldLace : "oldlace",
        Olive : "olive",
        OliveDrab : "olivedrab",
        Orange : "orange",
        OrangeRed : "orangered",
        Orchid : "orchid",
        PaleGoldenrod : "palegoldenrod",
        PaleGreen : "palegreen",
        PaleTurquoise : "paleturquoise",
        PaleVioletRed : "palevioletred",
        PapayaWhip : "papayawhip",
        PeachPuff : "peachpuff",
        Peru : "peru",
        Pink : "pink",
        Plum : "plum",
        PowderBlue : "powderblue",
        Purple : "purple",
        RebeccaPurple : "rebeccapurple",
        Red : "red",
        RosyBrown : "rosybrown",
        RoyalBlue : "royalblue",
        SaddleBrown : "saddlebrown",
        Salmon : "salmon",
        SandyBrown : "sandybrown",
        SeaGreen : "seagreen",
        Seashell : "seashell",
        Sienna : "sienna",
        Silver : "silver",
        SkyBlue : "skyblue",
        SlateBlue : "slateblue",
        SlateGray : "slategray",
        SlateGrey : "slategrey",
        Snow : "snow",
        SpringGreen : "springgreen",
        SteelBlue : "steelblue",
        Tan : "tan",
        Teal : "teal",
        Thistle : "thistle",
        Tomato : "tomato",
        Turquoise : "turquoise",
        Violet : "violet",
        Wheat : "wheat",
        White : "white",
        WhiteSmoke : "whitesmoke",
        Yellow : "yellow",
        YellowGreen : "yellowgreen"
    } );
    
    var Colors = { 
        __VERSION__: 0.6,
        __NAME__: "Colors",
        __PRESETS__: COLOR_PRESETS
    };
    
    function Color( color, type ){
        var colorObject = { }, isAlpha = false, alpha = 1;
        if ( typeof color == "string" ){
            if ( color === "transparent" ){
                colorObject = Object.assign( {
                    values: [ 255, 255, 255, 0 ],
                    type: 'rgba'
                }, colorObject );
            } else {
                colorObject = Colors.getColorDataFromString( color );
                colorObject.type = colorObject.type || "rgb";
            }
        } else if ( Array.isArray( color ) ){
            colorObject.values = color;
            colorObject.type = type || "rgb";
        } else if ( typeof color === "object" ){
            if ( Object( color ) instanceof Color ){
                return color;
            }
            colorObject = Object.assign( { }, color );
            colorObject.type = colorObject.type || "rgb";
        } else {
            throw new Error( "No valid color data has been found." );
        }
        
        color = colorObject.values || [ ];
        type = colorObject.type;
        
        if ( color.length === 0 ) return;
        
        if ( color.length === 1 ){
            color = Array( 3 ).fill( color[ 0 ] );
        }
        
        if ( Colors.ALPHA_TYPES.indexOf( type ) > -1 ){
            isAlpha = true;
            alpha = Number( color.pop( ) );
            
            if ( isNaN( alpha ) ){
                alpha = 1;
            }
            
            Colors.check( alpha, "alpha" );
        } 
        
        color.forEach( function( n, i ){
            var t = "rgb", hsl = [ "hue", "saturation", "lightness" ],
                hsv = [ "hue", "saturation", "value" ];
            
            if ( /hsla?/.test( type ) ){
                t = hsl[ i ];
            } else if ( /hsva?/.test( type ) ){
                t = hsv[ i ];
            } else if ( type === "rgba" ){
                t = "rgb";
            }
            
            Colors.check( n, t );
        } );
        
        this.type = type;
        this.color = color;
        this.alpha = alpha;
        this.isAlpha = isAlpha;
        return this;
    }
    
    Colors.parse = function( string ){
        return new Color( string );
    };
    
    Colors.ALPHA_TYPES = Object.freeze( [
        "rgba", "hsla", "hsva", "hexa"
    ] );
    
    Colors.CHECK_TYPES = Object.freeze( {
        rgb: { min: 0, max: 255 },
        red: "rgb",
        green: "rgb",
        blue: "rgb",
        hue: { min: 0, max: 360 },
        degree: "hue",
        radian: { min: 0, max: 2 * Math.PI },
        gon: { min: 0, max: 400 },
        turn: { min: 0, max: 1 },
        percentage: { min: 0, max: 100 },
        alpha: "turn",
        saturation: "turn",
        lightness: "turn",
        value: "turn"
    } );
    
    Colors.check = function( n, type ){
        if ( !Colors.CHECK_TYPES.hasOwnProperty( type ) ){
            type = "rgb";
        }
        
        var bounds = Colors.CHECK_TYPES[ type ];
        if ( typeof handler === "string" ){
            bounds = Colors.CHECK_TYPES[ handler ];
        }
        
        var max = bounds.max, min = bounds.min;
        
        if ( n > max || n < min ){
            throw new Error( "The value is out of bounds. The minimum is " 
                + min + ", the maximum is " + max + ", and the value is " 
                + n + "." );
        }
    };
    
    Colors.COLOR_PATTERNS = Object.freeze( {
        rgb : /^rgb\(\s*(\d{1,3}%?)\s*,\s*(\d{1,3}%?)\s*,\s*(\d{1,3}%?)\s*\)$/i,
        rgba : /^rgba\(\s*(\d{1,3}%?)\s*,\s*(\d{1,3}%?)\s*,\s*(\d{1,3}%?)\s*,\s*([01](?:\.\d+)?|\d{1,3}%)\s*\)$/i,
        hsl : /^hsl\(\s*(\d{1,3}(?:\.\d+)?(?:deg|gon|grad|%|)|[01](?:\.\d+)?turn|\d(?:\.\d+)?rad)\s*,\s*([01](?:\.\d+)?)\s*,\s*([01](?:\.\d+)?)\)$/i,
        hsla : /^hsla\(\s*(\d{1,3}(?:\.\d+)?(?:deg|gon|grad|%|)|[01](?:\.\d+)?turn|\d(?:\.\d+)?rad)\s*,\s*([01](?:\.\d+)?)\s*,\s*([01](?:\.\d+)?)\s*,\s*([01](?:\.\d+)?)\s*\)$/i,
        hex : /#\s*([\da-f]{2})([\da-f]{2})([\da-f]{2})\s*$/i,
        hexs : /#\s*([\da-f])([\da-f])([\da-f])\s*$/i,
        hexa : /#\s*([\da-f]{2})([\da-f]{2})([\da-f]{2})([\da-f]{2})\s*$/i,
        hexsa : /#\s*([\da-f])([\da-f])([\da-f])([\da-f])\s*$/i
    } );
    
    Colors.ANGLE_MEASURES = Object.freeze( { 
        deg: function( n ){
            Colors.check( n, "degree" );
            return n;
        },
        rad: function( n ){
            Colors.check( n, "radian" );
            var r = ( n * 180 ) / Math.PI;
            
            Colors.check( r, "degree" );
            return r;
        },
        gon: function( n ){
            Colors.check( n, "gon" );
            var r = ( n / 400 ) * 360;
            
            Colors.check( r, "degree" );
            return r;
        },
        turn: function( n ){
            Colors.check( n, "turn" );
            var r = n * 360;
            
            Colors.check( r, "degree" );
            return r;
        },
        grad: "gon",
        gradian: "gon"
    } );
    
    Colors.parseAngleMeasure = function( n, measure ){
        if ( !Colors.ANGLE_MEASURES.hasOwnProperty( measure ) ){
            measure = "degree";
        }
        
        var handler = Colors.ANGLE_MEASURES[ measure ];
        
        if ( typeof handler === "string" ){
            handler = Colors.ANGLE_MEASURES[ handler ];
        }
        
        return handler.call( this, n );
    };
    
    Colors.PATTERN_TYPES = Object.freeze( {
        rgb : "rgb",
        rgba : "rgba",
        hsl : "hsl",
        hsla : "hsla",
        hex : [ "hex", "hexs" ],
        hexa: [ "hexa", "hexsa" ]
    } );
    
    Colors.PARSERS = Object.freeze( {
        rgb: function( ){
            var percent = Array.from( arguments ).every( function( n ){
                return /^(?:\d{1,3}(?:\.\d+)?%)$/g.test( n );
            } );
            
            var number = Array.from( arguments ).every( function( n ){ 
                return /^\d{1,3}(?:\.\d+)?/g.test( n );
            } );
            
            if ( percent ){
                return Array.from( arguments ).map( function( n ){ 
                    var p = /^(\d{1,3}(?:\.\d+)?)%$/g,
                        r = Number( p.exec( n )[ 1 ] ) / 100,
                        s = r * 255;
                    
                    Colors.check( s, "rgb" );
                    return s;
                } );
            } else if ( number ){
                return Array.from( arguments ).map( function( n ){
                    Colors.check( n, "rgb" );
                    return n;
                } );
            } else {
                throw new Error( "Cannot convert RGB values." );
            }
        },
        rgba: function( ){
            var percent = Array.from( arguments ).every( function( n, i ){
                return ( i !== 3 ? /^(?:\d{1,3}(?:\.\d+)?%)$/g : /(?:[01](?:\.\d+)?|\d{1,3}%)/g ).test( n );
            } );
            
            var number = Array.from( arguments ).every( function( n, i ){ 
                return ( i !== 3 ? /^\d{1,3}(?:\.\d+)?/g : /(?:[01](?:\.\d+)?|\d{1,3}%)/g ).test( n );
            } );
            
            if ( percent ){
                return Array.from( arguments ).map( function( n, i ){
                    var p = /^(\d{1,3}(?:\.\d+)?)%$/g,
                        r = Number( ( i === 3 && /(?:[01](?:\.\d+)?|\d{1,3}%)/g.test( n ) ) ? n : p.exec( n )[ 1 ] ) / 100,
                        s = i === 3 ? r : r * 255;
                    
                    Colors.check( s, i === 3 ? "alpha" : "rgb" );
                    return s;
                } );
            } else if ( number ){
                return Array.from( arguments ).map( function( n, i ){ 
                    if ( i === 3 ){
                        if ( /(?:[01](?:\.\d+)?)/g.test( n ) ){
                            n = Colors.limit( Number( n ), 1 );
                        } else {
                            var p = /^(\d{1,3}(?:\.\d+)?)%$/g;
                            n = Number( p.exec( n )[ 1 ] ) / 100;
                        }
                        
                        Colors.check( n, "alpha" );
                    } else {
                        Colors.check( n, "rgb" );
                    }
                    
                    return n;
                } );
            } else {
                throw new Error( "Cannot convert RGBA values." );
            }
        },
        hsl: function( ){
            var percent = Array.from( arguments ).every( function( n, i ){
                return ( i === 0 ? /(\d{1,3}(?:\.\d+)?(?:deg|gon|grad|%|)|[01](?:\.\d+)?turn|\d(?:\.\d+)?rad)/g : /^(?:\d{1,3}(?:\.\d+)?%)$/g ).test( n );
            } );
            
            var number = Array.from( arguments ).every( function( n, i ){ 
                return ( i === 0 ? /(\d{1,3}(?:\.\d+)?(?:deg|gon|grad|%|)|[01](?:\.\d+)?turn|\d(?:\.\d+)?rad)/g : /^(?:\d{1,3}(?:\.\d+)?%)$/g ).test( n );
            } );
            
            if ( percent ){
                return Array.from( arguments ).map( function( n, i ){ 
                    var r = 0, p = /^(\d{1,3}(?:\.\d+)?)%$/g, a = [];
                    if ( i === 0 ){
                        var d = /\d{1,3}(?:\.\d+)?/g,
                            e = /^(?:\d{1,3}(?:\.\d+)?%)$/g,
                            f = /\d{1,3}(?:\.\d+)?(?:deg|gon|grad)/g,
                            h = /[01](?:\.\d+)?turn/g,
                            k = /\d(?:\.\d+)?rad/g,
                            m = "";
                        if ( d.test( n ) ){
                            r = Number( n );
                            Colors.check( r, "hue" );
                            return r;
                        } else if ( e.test( n ) ){
                            r = Number( p.exec( n )[ 1 ] ) / 100;
                            var s = r * 360;
                            Colors.check( s, "hue" );
                            return s;
                        } else if ( f.test( n ) ){
                            var j = /(\d{1,3}(?:\.\d+)?)(deg|gon|grad)/g;
                            a = Array.from( j.exec( n ) ).slice( 1 );
                            m = a[ 1 ];
                            r = Colors.parseAngleMeasure( Number( a[ 0 ] ), m );
                            return r;
                        } else if ( h.test( n ) ){
                            var z = /([01](?:\.\d+)?)(turn)/g;
                            a = Array.from( z.exec( n ) ).slice( 1 );
                            m = a[ 1 ];
                            r = Colors.parseAngleMeasure( Number( a[ 0 ] ), m );
                            return r;
                        } else if ( k.test( n ) ){
                            var y = /(\d(?:\.\d+)?)(rad)/g;
                            a = Array.from( y.exec( n ) ).slice( 1 );
                            m = a[ 1 ];
                            r = Colors.parseAngleMeasure( Number( a[ 0 ] ), m );
                            return r;
                        } else {
                            throw new Error( "This value is not valid." );
                        }
                    } else {
                        var _p = /^(\d{1,3}(?:\.\d+)?)%$/g,
                            _r = Number( _p.exec( n )[ 1 ] ) / 100,
                            _s = ( i === 3 ? _r : _r * 255 );
                        
                        Colors.check( _s, ( i === 3 ) ? "alpha" : "hsl" );
                        return _s;
                    }
                } );
            } else if ( number ){
                return Array.from( arguments ).map( function( n, i ){
                    var r = 0, p = /^(\d{1,3}(?:\.\d+)?)%$/g, a = [];
                    if ( i === 0 ){
                        var d = /\d{1,3}(?:\.\d+)?/g,
                            e = /^(?:\d{1,3}(?:\.\d+)?%)$/g,
                            f = /\d{1,3}(?:\.\d+)?(?:deg|gon|grad)/g,
                            h = /[01](?:\.\d+)?turn/g,
                            k = /\d(?:\.\d+)?rad/g,
                            m = "";
                        if ( d.test( n ) ){
                            r = Number( n );
                            Colors.check( r, "hue" );
                            return r;
                        } else if ( e.test( n ) ){
                            r = Number( p.exec( n )[ 1 ] ) / 100;
                            var s = r * 360;
                            Colors.check( s, "hue" );
                            return s;
                        } else if ( f.test( n ) ){
                            var j = /(\d{1,3}(?:\.\d+)?)(deg|gon|grad)/g;
                            a = Array.from( j.exec( n ) ).slice( 1 );
                            m = a[ 1 ];
                            r = Colors.parseAngleMeasure( Number( a[ 0 ] ), m );
                            return r;
                        } else if ( h.test( n ) ){
                            var z = /([01](?:\.\d+)?)(turn)/g;
                            a = Array.from( z.exec( n ) ).slice( 1 );
                            m = a[ 1 ];
                            r = Colors.parseAngleMeasure( Number( a[ 0 ] ), m );
                            return r;
                        } else if ( k.test( n ) ){
                            var y = /(\d(?:\.\d+)?)(rad)/g;
                            a = Array.from( y.exec( n ) ).slice( 1 );
                            m = a[ 1 ];
                            r  = Colors.parseAngleMeasure( Number( a[ 0 ] ), m );
                            return r;
                        } else {
                            throw new Error( "This value is not valid." );
                        }
                    } else if ( i === 3 ){
                        if ( /(?:[01](?:\.\d+)?|\d{1,3}%)/g.test( n ) ){
                            n = Number( n ) / 100;
                        } else {
                            var _p = /^(\d{1,3}(?:\.\d+)?)%$/g;
                            
                            n = Number( _p.exec( n )[ 1 ] ) / 100;
                        }
                        
                        Colors.check( n, "alpha" );
                    } else {
                        Colors.check( n, "rgb" );
                    }
                    
                    var _b = [ "saturation", "lightness" ];
                    Colors.check( n, _b[ i - 1 ] || "hue" );
                    return n;
                } );
            } else {
                throw new Error( "Cannot convert HSL values." );
            }
        },
        hsla: function( ){ 
            var percent = Array.from( arguments ).every( function( n, i ){
                return ( i === 0 ? /(\d{1,3}(?:\.\d+)?(?:deg|gon|grad|%|)|[01](?:\.\d+)?turn|\d(?:\.\d+)?rad)/g : /^(?:\d{1,3}(?:\.\d+)?%)$/g ).test( n );
            } );
            
            var number = Array.from( arguments ).every( function( n, i ){ 
                return ( i === 0 ? /(\d{1,3}(?:\.\d+)?(?:deg|gon|grad|%|)|[01](?:\.\d+)?turn|\d(?:\.\d+)?rad)/g : /^(?:\d{1,3}(?:\.\d+)?%)$/g ).test( n );
            } );
            
            if ( percent ){
                return Array.from( arguments ).map( function( n, i ){ 
                    var r = 0, p = /^(\d{1,3}(?:\.\d+)?)%$/g, a = [];
                    if ( i === 0 ){
                        var d = /\d{1,3}(?:\.\d+)?/g,
                            e = /^(?:\d{1,3}(?:\.\d+)?%)$/g,
                            f = /\d{1,3}(?:\.\d+)?(?:deg|gon|grad)/g,
                            h = /[01](?:\.\d+)?turn/g,
                            k = /\d(?:\.\d+)?rad/g,
                            m = "";
                        if ( d.test( n ) ){
                            r = Number( n );
                            Colors.check( r, "hue" );
                            return r;
                        } else if ( e.test( n ) ){
                            r = Number( p.exec( n )[ 1 ] ) / 100;
                            var s = r * 360;
                            Colors.check( s, "hue" );
                            return s;
                        } else if ( f.test( n ) ){
                            var j = /(\d{1,3}(?:\.\d+)?)(deg|gon|grad)/g;
                            a = Array.from( j.exec( n ) ).slice( 1 );
                            m = a[ 1 ];
                            r = Colors.parseAngleMeasure( Number( a[ 0 ] ), m );
                            return r;
                        } else if ( h.test( n ) ){
                            var z = /([01](?:\.\d+)?)(turn)/g;
                            a = Array.from( z.exec( n ) ).slice( 1 );
                            m = a[ 1 ];
                            r = Colors.parseAngleMeasure( Number( a[ 0 ] ), m );
                            return r;
                        } else if ( k.test( n ) ){
                            var y = /(\d(?:\.\d+)?)(rad)/g;
                            a = Array.from( y.exec( n ) ).slice( 1 );
                            m = a[ 1 ];
                            r  = Colors.parseAngleMeasure( Number( a[ 0 ] ), m );
                            return r;
                        } else {
                            throw new Error( "This value is not valid." );
                        }
                    } else {
                        var _p = /^(\d{1,3}(?:\.\d+)?)%$/g,
                            _r = Number( _p.exec( n )[ 1 ] ) / 100,
                            _s = _r * 255;
                        
                        Colors.check( _s, "rgb" );
                        return _s;
                    }
                } );
            } else if ( number ){
                return Array.from( arguments ).map( function( n, i ){
                    var r = 0, p = /^(\d{1,3}(?:\.\d+)?)%$/g, a = [];
                    if ( i === 0 ){
                        var d = /\d{1,3}(?:\.\d+)?/g,
                            e = /^(?:\d{1,3}(?:\.\d+)?%)$/g,
                            f = /\d{1,3}(?:\.\d+)?(?:deg|gon|grad)/g,
                            h = /[01](?:\.\d+)?turn/g,
                            k = /\d(?:\.\d+)?rad/g,
                            m = "";
                        if ( d.test( n ) ){
                            r = Number( n );
                            Colors.check( r, "hue" );
                            return r;
                        } else if ( e.test( n ) ){
                            r = Number( p.exec( n )[ 1 ] ) / 100;
                            var s = r * 360;
                            Colors.check( s, "hue" );
                            return s;
                        } else if ( f.test( n ) ){
                            var j = /(\d{1,3}(?:\.\d+)?)(deg|gon|grad)/g;
                            a = Array.from( j.exec( n ) ).slice( 1 );
                            m = a[ 1 ];
                            r = Colors.parseAngleMeasure( Number( a[ 0 ] ), m );
                            return r;
                        } else if ( h.test( n ) ){
                            var z = /([01](?:\.\d+)?)(turn)/g;
                            a = Array.from( z.exec( n ) ).slice( 1 );
                            m = a[ 1 ];
                            r = Colors.parseAngleMeasure( Number( a[ 0 ] ), m );
                            return r;
                        } else if ( k.test( n ) ){
                            var y = /(\d(?:\.\d+)?)(rad)/g;
                            a = Array.from( y.exec( n ) ).slice( 1 );
                            m = a[ 1 ];
                            r  = Colors.parseAngleMeasure( Number( a[ 0 ] ), m );
                            return r;
                        } else {
                            throw new Error( "This value is not valid." );
                        }
                    } else {
                        var _b = [ "saturation", "lightness" ];
                        Colors.check( n, i !== 3 ? _b[ i - 1 ] : "alpha" );
                        return n;
                    }
                } );
            } else {
                throw new Error( "Cannot convert HSLA values." );
            }
        },
        hex: function( ){
            return Array.from( arguments ).map( function( n ){ 
                return parseInt( n, 16 );
            } );
        },
        hexa: function( ){
            return Array.from( arguments ).map( function( n, i ){ 
                if ( i === 3 ){
                    return parseInt( n, 16 ) / 255;
                } else {
                    return parseInt( n, 16 );
                }
            } );
        },
        hexs: function( ){
            return Array.from( arguments ).map( function( n ){
                var r = [ n, n ].join( '' );
                return parseInt( r, 16 );
            } );
        },
        hexsa: function( ){
            return Array.from( arguments ).map( function( n, i ){
                var r = [ n, n ].join( '' );
                if ( i === 3 ){
                    return parseInt( r, 16 ) / 255;
                } else {
                    return parseInt( r, 16 );
                }
            } );
        }
    } );

    Colors.findType = function( type ){ 
        var keys = Object.keys( Colors.PATTERN_TYPES );
        
        while ( keys.length ){
            const canonicalType = keys.shift( );
            const types = Colors.PATTERN_TYPES[ canonicalType ];
            
            if ( Array.isArray( types ) ){
                if ( types.indexOf( type ) === -1 ){
                    continue;
                }
                return canonicalType;
            } else {
                if ( types !== type ){
                    continue;
                }
                return canonicalType;
            }
        }
        
        throw new Error( "No valid color type found." );
    };
    
    Colors.getColorDataFromString = function( color ){
        if ( typeof color !== "string" ) return null;
        var values = [ ], type = "rgb", colorData = { };
        
        if ( CAMEL_CASE_COLOR_NAMES.hasOwnProperty( color ) ){
            var original = CAMEL_CASE_COLOR_NAMES[ color ];
            values = COLOR_PRESETS[ original ];
        } else if ( COLOR_PRESETS.hasOwnProperty( color ) ){
            values = COLOR_PRESETS[ color ];
        } else {
            var patternKeys = Object.keys( Colors.COLOR_PATTERNS );
            loopPatterns: while ( patternKeys.length ){
                const key = patternKeys.shift( );
                const pattern = Colors.COLOR_PATTERNS[ key ];
                
                if ( pattern.test( color ) ){
                    var a = Array.from( pattern.exec( color ) ).slice( 1 );
                    if ( Colors.PARSERS.hasOwnProperty( key ) ){
                        const parser = Colors.PARSERS[ key ];
                        if ( typeof parser !== "function" ){
                            a = a.map( Number );
                        } else {
                            a = parser.apply( null, a );
                        }
                    } else {
                        a = a.map( Number );
                    }
                    values = a;
                    type = Colors.findType( key );
                    break loopPatterns;
                }
            }
        }
        
        colorData.values = values;
        colorData.type = type;
        return colorData;
    };
    
    const COLOR_SPACES = Object.freeze( [ "rgb", "rgba", "hsl", "hsla", "hsv", "hsva" ] );
    
    COLOR_SPACES.forEach( function( key ){
        Colors[ "from" + key.toUpperCase( ) ] = function( ){ 
            return new Color( {
                color: Array.from( arguments ).slice( 0, 3 ),
                type: key
            } );
        };
    } );
    
    Colors.clone = function( color, type ){
        var inst = new Color( { 
            color: color.color,
            type: color.type
        } );
        
        Colors.convert( inst, type );
        inst.alpha = color.alpha;
        
        if ( inst.alpha < 1 ){
            if ( !type.endsWith( "a" ) ){
                type = type + "a";
            }
            
            inst.type = type;
            inst.isAlpha = true;
        }
        
        return inst;
    };
    
    Colors.clamp = function( value, min, max ){
        var x = max < min ? max : min,
            y = max < min ? min : max;
        
        return Math.max( min, Math.min( value, max ) );
    };
    
    const CLAMP_TYPES = Object.freeze( {
        clampTo: [ -Infinity, "$" ],
        clampFrom: [ "$", Infinity ],
        limit: [ 0, "$" ]
    } );
    
    Object.keys( CLAMP_TYPES ).forEach( function( type ){
        const tuple = CLAMP_TYPES[ type ];
        Colors[ type ] = function( value, n ){
            var i = tuple.indexOf( "$" ),
                x = i < 1 ? i + 1 : i - 1,
                v = tuple[ x ];
            
            return Colors.clamp( value, i === 0 ? n : v, i === 1 ? n : v );
        };
    } );
    
    const HUE_TO_RGB = function( p, q, t ){
        if ( t < 0 ) t += 1;
        if ( t > 1 ) t -= 1;
        if ( t < ( 1 / 6 ) ) return p + ( q - p ) * 6 * t;
        if ( t < ( 1 / 2 ) ) return q;
        if ( t < ( 2 / 3 ) ) return p + ( q - p ) * ( ( 2 / 3 ) - t ) * 6;
        return p;
    };
    
    Colors.CONVERTERS = Object.freeze( {
        rgb: {
            rgb: function( ){
                return Array.from( arguments );
            },
            hsl: function( ){
                const a = Array.from( arguments ).map( function( n ){ 
                    return n / 255;
                } );
                
                var r = a[ 0 ], g = a[ 1 ], b = a[ 2 ];
                
                var y = Math.max( r, g, b ), x = Math.min( r, g, b );
                var h, s, l = ( x + y ) / 2;
                
                if ( x === y ){
                    h = s = 0;
                } else {
                    var d = y - x;
                    s = l > 0.5 ? d / ( 2 - y - x ) : d / ( y + x );
                    switch ( y ){
                        case r: h = ( g - b ) / d + ( g < b ? 6 : 0 ); break;
                        case g: h = ( b - r ) / d + 2; break;
                        case b: h = ( r - g ) / d + 4; break;
                    }
                    h = ( h / 6 ) * 360;
                }
                
                return [ h, s, l ];
            }
        },
        hsl: {
            hsl: function( ){
                return Array.from( arguments );
            },
            rgb: function( ){
                const a = Array.from( arguments ).map( function( n, i ){
                    if ( i === 0 ) return n / 360;
                    return n;
                } );
                
                var h = a[ 0 ], s = a[ 1 ], l = a[ 2 ],
                    r, g, b;
                
                if ( s === 0 ){
                    r = g = b = l;
                } else {
                    var q = l < 0.5 ? l *( 1 + s ) : l + s - l * s;
                    var p = 2 * l - q;
                    
                    r = HUE_TO_RGB( p, q, h + ( 1 / 3 ) );
                    g = HUE_TO_RGB( p, q, h );
                    b = HUE_TO_RGB( p, q, h - ( 1 / 3 ) );
                }
                
                return [ r, g, b ].map( function( n ){
                    return n * 255;
                } );
            }
        },
        hsv: {
            hsv: function( ){
                return Array.from( arguments );
            },
            rgb: function( ){}
        }
    } );
    
    Colors.convert = function( inst, type ){
        if ( !( inst instanceof Color ) ){
            throw new Error( "The first argument is not an instance of Color." );
        }
        
        const currentType = inst.type;
        
        if ( currentType !== type ){
            inst.type = type;
            var converterTypes = Colors.CONVERTERS[ currentType ];
            
            if ( converterTypes === void 0 || converterTypes === null ){
                converterTypes = Colors.CONVERTERS.rgb;
            }
            
            console.log( converterTypes, type, inst, currentType );
            
            if ( converterTypes.hasOwnProperty( type ) ){
                const converter = converterTypes[ type ];
                inst.color = converter.apply( this, inst.color );
            } else {
                throw new Error( "There is no valid converter for this type." );
            }
        }
    };
    
    Colors.circle = function( n, max ){
        if ( n < 0 ) n += max;
        else if ( n > max ) n -= max;
        return n;
    };
    
    Color.fn = Color.prototype;
    
    const FN_TYPES = Object.freeze( {
        rotate: Object.freeze( { type: "degree", cap: 'circle', div: 360 } ),
        saturate: Object.freeze( { type: "percentage", cap: 'limit', div: 100 } ),
        lighten: Object.freeze( { type: "percentage", cap: 'limit', div: 100 } )
    } );
    
    Object.keys( FN_TYPES ).forEach( function( fn, i ){
        var obj = FN_TYPES[ fn ];
        
        const { type, cap, div } = obj;
        // var type = obj.type, cap = obj.cap;
        
        const capHandler = Colors[ cap ];
        
        Color.fn[ fn ] = function( value ){
            Colors.check( value, type );
            var inst = Colors.clone( this, 'hsl' );
            inst.color[ i ] = capHandler( inst.color[ i ] + value / div, 1 );
            return inst;
        };
    } );
    
    Color.fn.darken = function( value ){
        Colors.check( value, "percentage" );
        return this.lighten( -value );
    };
    
    Color.fn.mix = function( color, percentage ){
        if ( !( color instanceof Color ) ){
            color = Colors.parse( color );
            console.log( color );
            Colors.convert( color, 'rgb' );
        } else {
            color = Colors.clone( color, 'rgb' );
        }
        
        percentage = isNaN( percentage ) ? 50 : Number( percentage );
        Colors.check( percentage, "percentage" );
        
        percentage = percentage / 100;
        var cloned = Colors.clone( this, 'rgb' );
        
        for ( var i = 0; i < cloned.color.length; i++ ){
            cloned.color[ i ] = ( ( cloned.color[ i ] * percentage ) + ( color.color[ i ] * ( 1 - percentage ) ) );
            cloned.color[ i ] = Colors.limit( Colors.cloned[ i ], 255 );
        }
        
        return cloned;
    };
    
    Color.fn.invert = function( ){
        var cloned = Colors.clone( this, 'rgb' );
        for ( var i = 0; i < cloned.color.length; i++ ){
            cloned.color[ i ] = Color.limit( 255 - cloned.color[ i ], 255 );
        }
        return cloned;
    };
    
    Color.fn.complement = function( ){
        return this.rotate( 180 );
    };
    
    Color.fn.isBright = function( ){
        var cloned = Colors.clone( this, 'hsl' );
        return cloned.color[ 2 ] >= 0.5;
    };
    
    Color.fn.isColor = function( ){
        var cloned = Colors.clone( this, 'hsl' );
        return Array.from( cloned.color ).every( function( n, i ){
            if ( i === 0 ) return true;
            return n !== 0;
        } );
    };
    
    const COLOR_FNS = Object.freeze( [
        "red", "green", "blue", "hue", "saturation", "lightness", "alpha"
    ] );
    
    COLOR_FNS.forEach( function( f, i ){
        var ni = i % 3, type = i < 3 ? 'rgb' : 'hsl';
        
        Color.fn[ f ] = function( value ){
            var cloned = Colors.clone( this, type );
            if ( f === "alpha" ){
                if ( typeof value === "number" ){
                    Colors.check( value, "alpha" );
                    cloned.alpha = value;
                    cloned.isAlpha = true;
                    return cloned;
                } else {
                    return cloned.alpha;
                }
            } else {
                if ( typeof value === "number" ){
                    Colors.check( value, f );
                    cloned.color[ ni ] = value;
                    return cloned;
                } else {
                    return cloned.color[ ni ];
                }
            }
        };
    } );
    
    Color.fn.setAlpha = Color.fn.alpha;
    
    Color.fn.makeOpaque = function( ){
        return this.setAlpha( 1 );
    };
    
    Color.fn.makeTransparent = function( ){
        if ( this.type === "rgb" ){
            this.type = "rgba";
        } else if ( this.type === "hsl" ){
            this.type = "hsla";
        } else if ( this.type === "hsv" ){
            this.type = "hsva";
        }
        return this.setAlpha( 0 );
    };
    
    Color.fn.isOpaque = function( ){
        this.isAlpha = this.alpha < 1;
        return !this.isAlpha;
    };
    
    Color.fn.isTransparent = function( ){
        this.isAlpha = this.alpha < 1;
        return this.alpha === 0;
    };
    
    Color.fn.hex = function( ){
        var color = Colors.clone( this, "rgb" ),
            isOpaque = color.isOpaque( ),
            s = "#", c = Array.from( color.color );
        
        if ( !isOpaque ){
            c.push( color.alpha );
        }
        
        return Array.from( c ).reduce( function( hex, value, index ){
            if ( index > 3 ){
                return hex;
            }
            
            if ( index === ( c.length - 1 ) && !isOpaque ){
                value = ( value / 100 ) * 255;
            }
            
            value = Math.floor( value );
            var part = value.toString( 16 );
            
            if ( part.length === 1 ){
                part = "0" + part;
            }
            
            hex = hex + part;
            return hex;
        }, s );
    };
    
    Color.fn.toString = Color.fn.hex;
    
    const COLOR_TYPES = Object.freeze( [
        "rgb", "rgba", "hsl", "hsla", "hsv", "hsva"
    ] );
    
    COLOR_TYPES.forEach( function( type ){
        Color.fn[ type ] = function( ){
            var cloned = Colors.clone( this, type.slice( 0, 3 ) ),
                c = Array.from( cloned.color );
            if ( /hs[lv]a?/g.test( type ) ){
                c = Array.from( c ).map( function( n, i ){
                    return i === 0 ? String( n ) + "deg" :
                        String( t ) + "%";
                } );
            }
            
            var a = cloned.alpha;
            
            if ( cloned.isAlpha ){
                if ( !type.endsWith( "a" ) ){
                    type = type + "a";
                }
                c.push( String( a * 100 ) + "%" );
            }
            
            return type + "(" + c.join( ", " ) + ")";
        };
    } );
    
    var colors = {};
    
    const SASS_PARAMS = Object.freeze( {
        'color-body': 'body',
        'color-page': 'page',
        'color-buttons': 'menu',
        'color-community-header': 'header',
        'color-links': 'link',
        'color-body-middle': 'split'
    } );
    
    Object.keys( SASS_PARAMS ).forEach( function( key ){
        const name = SASS_PARAMS[ key ];
        colors[ name ] = mw.config.get( "wgSassParams" )[ key ];
    } );
    
    /* ( function( c ){
        const page = Colors.parse( colors.page );
        const menu = Colors.parse( colors.menu );
        const pageBright = page.isBright( );
        const menuBright = menu.isBright( );
        
        c.nav = colors.header;
        c.contrast = menuBright ? "#000000" : "#ffffff";
        c.text = pageBright ? "#3a3a3a" : "#d5d4d4";
        c.border = page.mix( pageBright ? "black" : "white", 80 ).hex( );
        c.gradient = menu.lighten( menuBright ? -20 : 20 ).hex( );
        
        document.body.classList.add(
            menuBright ? 'menu-bright' : 'menu-dark',
            pageBright ? 'page-bright' : 'page-dark'
        );
    }( colors ) ); */
    
    const OBJS = Object.freeze( [ 
        "FANDOM", "WIKIA", "fandom", "wikia"
    ] );
    
    OBJS.forEach( function( n ){
        Colors[ n ] = colors;
    } );
    
    Colors.activeEnvironment = null;
    
    Colors.Environment = function( ){
        if ( Object( Color.activeEnvironment ) instanceof Color.Environment ){
            return Color.activeEnvironment;
        }
        
        this.__styleElement = document.createElement( "style" );
        this.__variables = {};
        return this;
    };
    
    Colors.Environment.fn = Colors.Environment.prototype;
    
    Colors.Environment.fn.init = function( ){
        Color.activeEnvironment = this;
        this.__variables = Object.assign( { }, colors );
        Object.keys( this.__variables ).forEach( function( k ){
            var v = this.__variables[ k ];
            this.__variables[ "fandom__" + k ] = v;
        }, this );
    };
    
    Colors.Environment.fn.setVariable = function( variable, value ){
        if ( this.__variables.hasOwnProperty( variable ) ){
            return false;
        } else {
            this.__variables[ variable ] = value;
            return true;
        }
    };
    
    Colors.Environment.fn.createCSSVariables = function( ){
        var s = ":root { \n $rule \n }";
        return s.replace( "$rule", function( ){
            return Object.keys( this.__variables ).reduce( function( rule, key ){
                var name = "--" + key, value = this.__variables[ key ];
                var v = "\t" + name + ": " + String( value ) + ";";
                
                rule = rule + "\n" + v;
                return rule;
            }, "" );
        }.bind( this ) );
    };
    
    Colors.Environment.fn.destroy = function( ){
        this.__styleElement.textContent = "";
        document.head.removeChild( this.__styleElement );
        this.__variables = {};
        Color.activeEnvironment = null;
    };
    
    Colors.Environment.fn.createCSS = function( ){
        if ( !this.__styleElement ){
            this.__styleElement = document.createElement( "style" );
            this.__styleElement.id = "ColorsEnvironmentStyle";
            document.head.appendChild( this.__styleElement );
        }
        this.__styleElement.textContent = this.createCSSVariables( );
        return this;
    };
    
    Colors.createEnvironment = function( ){
        var env = new Colors.Environment( );
        env.init( );
        return Colors;
    };
    
    Colors.css = function( vars ){
        if ( !Colors.activeEnvironment ) return;
        
        if ( typeof vars === "object" ){
            vars = Object.assign( { }, vars );
            Object.keys( vars ).forEach( function( k ){
                var v = vars[ k ];
                Colors.activeEnvironment.setVariable( k, v );
            } );
        }
        
        Colors.activeEnvironment.createCSS( );
    };
    
    window.dev.colors.beta = Colors;
    
    window.dev.colors.color = Color;
    
    define( [ "fandom.dev.colors" ], null, function( ){ 
        return Colors;
    } );
} )( window, jQuery, mediaWiki );