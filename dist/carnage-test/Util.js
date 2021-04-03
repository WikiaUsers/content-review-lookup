( function( window ) { 
    "use strict";
    function clamp( x, y ) { 
        x = isNaN( x ) ? Number( x ) : 0;
        y = isNaN( y ) ? Number( y ) : 1;
        return function( v ) { 
            const min = Math.min( x, y );
            const max = Math.max( x, y );
            return Math.max( min, Math.min( v, max ) );
        };
    }
    var Util = { 
        clamp : function( v, x, y ) { 
            const r = clamp( x, y );
            return r( v );
        },
        limit : function( v, y ) { 
            const r = clamp( 0, y );
            return r( v );
        },
        clampFrom : function( v, x ) { 
            const r = clamp( x, Infinity );
            return r( v );
        },
        clampTo : function( v, y ) { 
            const r = clamp( -Infinity, y );
            return r( v );
        },
        rand : function( x, y, seed ) { 
            x = ( !isNaN( x ) && isFinite( x ) ) ? Number( x ) : 0;
            y = ( !isNaN( y ) && isFinite( y ) ) ? Number( y ) : 1;
            const min = Math.min( x, y );
            const max = Math.max( x, y );
            if ( typeof seed !== "function" ) seed = Math.random;
            return seed( ) * ( max - min ) + min;
        },
        randInt : function( x, y, seed ) {
            x = ( !isNaN( x ) && isFinite( x ) ) ? Number( x ) : 0;
            y = ( !isNaN( y ) && isFinite( y ) ) ? Number( y ) : 1;
            const min = Math.min( x, y );
            const max = Math.max( x, y );
            if ( typeof seed !== "function" ) seed = Math.random;
            return Math.floor( seed( ) * ( max - min ) + min );
        },
        randSeed : function( x, y, s ) { 
            x = ( !isNaN( x ) && isFinite( x ) ) ? Number( x ) : 0;
            y = ( !isNaN( y ) && isFinite( y ) ) ? Number( y ) : 1;
            const min = Math.min( x, y );
            const max = Math.max( x, y );
            const seed = Util.seedR( s );
            return seed( ) * ( max - min ) + min;
        },
        randIntSeed : function( x, y, s ) { 
            x = ( !isNaN( x ) && isFinite( x ) ) ? Number( x ) : 0;
            y = ( !isNaN( y ) && isFinite( y ) ) ? Number( y ) : 1;
            const min = Math.min( x, y );
            const max = Math.max( x, y );
            const seed = Util.seedR( s );
            return Math.floor( seed( ) * ( max - min ) + min );
        }, 
        seed : function( s ) { 
            const r = Math.sin( s ) * 10000;
            return r - Math.floor( r );
        },
        seedR : function( s, o ) { 
            var m = 0xffffffff, w = ( 123456789 + s ) & m,
                z = ( 987654321 - s ) & m;
            function h( ) { 
                z = ( 36969 * ( z & 65535 ) + ( z >>> 16 ) ) & m;
                w = ( 18000 * ( w & 65535 ) + ( w >>> 16 ) ) & m;
                var r = ( ( z << 16 ) + ( w & 65535 ) ) >>> 0;
                r /= 4294967296;
                return r;
            }
            return o ? h : h( );
        }
    };
    
    Util.math = { 
        sin : Math.sin,
        cos : Math.cos,
        tan : Math.tan,
        csc : function( v ) { 
            return 1 / Math.sin( v );
        },
        sec : function( v ) { 
            return 1 / Math.cos( v );
        },
        cot : function( v ) {
            return 1 / Math.tan( v );
        },
        pow : Math.pow,
        sqrt : Math.sqrt,
        cbrt : Math.cbrt
    };
    
    window.Util = Util;
} )( window );