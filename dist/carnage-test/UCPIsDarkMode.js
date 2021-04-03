( function( mw ) { 
    "use strict";
   
    const backgroundElem = document.querySelector( ".WikiaPageContentWrapper" );
    const backgroundStyle = getComputedStyle( backgroundElem );
    const backgroundColor = backgroundStyle[ "background-color" ];
    const state = { done : false };
   
    function clampFn( x, y ) {
        const min = Math.min( x, y );
        const max = Math.max( x, y );
        return function( v ) { 
            return Math.max( min, Math.min( v, max ) );
        };
    }
   
    function limit( v, y ) { 
        const h = clampFn( 0, y );
        return h( v );
    }
   
    function clamp( v, x, y ) { 
        const h = clampFn( x, y );
        return h( v );
    }
   
    function round( v, p ) { 
        if ( isNaN( p ) || !isFinite( p ) ) {
            p = 0;
        }
        if ( p < 1 ) return Math.round( v );
        const r = Math.pow( 10, p );
        const fns = [ 
            function( x ) { return x * r; },
            function( x ) { return x + 0.5; },
            Math.floor,
            function( x ) { return x / r; }
        ];
        return fns.reduce( function( x, f ) { 
            return f( x );
        }, v );
   }
   
    function toHSL( rgb ) { 
        const color = [ ];
        const pattern = /^rgba?\(\s*([^()]+)\s*\)$/g;
        const str = ( pattern.exec( rgb ) || [ ] ) [ 1 ];
        if ( !str ) return null;
        const tuple = str.trim( ).split( /,\s*/g ).slice( 0, 4 ).map( Number );
        const r = limit( tuple[ 0 ], 255 ) / 255, g = limit( tuple[ 1 ], 255 ) / 255, 
            b = limit( tuple[ 2 ], 255 ) / 255, a = limit( tuple[ 3 ] || 1, 1 );
        const x = Math.min( r, g, b ), y = Math.max( r, g, b );
        color[ 2 ] = ( x + y ) / 2;
        color[ 3 ] = a;
       
        if ( x === y ) {
            color[ 0 ] = color[ 1 ] = 0;
        } else {
            const diff = y - x;
            color[ 1 ] = color[ 3 ] > 0.5 ? diff / ( 2 - y - x ) : diff / ( x + y );
            switch( y ) { 
                case r : color[ 0 ] = ( g - b ) / diff + ( g < b ? 6 : 0 ); break;
                case g : color[ 0 ] = ( b - r ) / diff + 2; break;
                case b : color[ 0 ] = ( r - g ) / diff + 4; break;
            }
            color[ 0 ] = color[ 0 ] / 6;
        }
        
        color.forEach( function( c, i ) { 
            color[ i ] = round( c, 2 );
        } );
        
        return ( { 
            hue : color[ 0 ], 
            saturation : color[ 1 ], 
            value : color[ 2 ], 
            alpha : color[ 3 ],
            toString : function( ) { 
                return "hsla(" + color.map( function( c, i ) { 
                    if ( i === 0 ) return c * 360;
                    return c * 100 + "%";
                } ).join( ", " ) + ")";
            }
        } );
    }
   
    function isBright( ) {
        const hsl = toHSL( backgroundColor );
        return hsl.lightness > 0.5;
    }
   
    function isDark( ) { 
        return !isBright( );
    }
    
    function addDarkTheme( ) { 
        if ( state.done || !isReady( ) );
        state.done = true;
        mw.config.set( "oasisDarkTheme", isDark( ) );
        if ( mw.config.get( "oasisDarkTheme" ) && !document.body.classList.contains( "oasis-dark-theme" ) ) {
            document.body.classList.add( "oasis-dark-theme" );
        }
    }
    
    function isReady( ) { 
        return ( document.readyState === "complete" ) || 
            ( document.readyState !== "loading" && !document.documentElement.doScroll );
    }
    
    if ( !isReady( ) ) window.addEventListener( "readystatechange", addDarkTheme );
    else setTimeout( addDarkTheme, 5 );
} )( mediaWiki );