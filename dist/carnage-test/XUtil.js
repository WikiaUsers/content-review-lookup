( function( window ) { 
    "use strict";
    const ts = Object.prototype.toString;
    const v = "v1.2";
    
    var XUtil = Object.create( { } );
    
    XUtil.throttle = function throttle( callback, delay, context ) { 
        var timeout = null, prev = 0, args, res;
        function later( ) { 
            prev = Date.now( );
            timeout = null;
            res = callback.apply( context, args );
            if ( !timeout ) context = args = null;
        }
        return function( ) { 
            const now = Date.now( );
            if ( !prev ) prev = now;
            const rem = delay - ( now - prev );
            context = context || this;
            args = Array.from( arguments );
            if ( rem < 1 || rem > delay ) {
                if ( timeout ) {
                    clearTimeout( timeout );
                    timeout = null;
                }
                prev = now;
                res = callback.apply( context, args );
                if ( !timeout ) context = args = null;
            } else if ( !timeout ) { 
                timeout = setTimeout( later, rem );
            }
            return res;
        };
    };
} )( window );