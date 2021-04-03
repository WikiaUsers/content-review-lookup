/**
 * Anima.js
 * 
 * @version v0.5
 * @author Ultimate Dark Carnage
 **/
( function( window, $, mw ) { 
    "use strict";
    
    const rnum = "[+-]?(?:\\d*\\.|)\\d+(?:[eE][+-]?\\d+|)";
    
    const rcssnum = "^(?:([+-])=|)(" + rnum + ")([a-z]*|%)$";
    
    const rnopx = "^(" + rnum + ")(?!px)(?:[a-z]+|%)$";
    
    const patterns = Object.freeze( { 
        bezier : /(cubic(?:-b|B)ezier)\((.*)\)/g,
        bounceIniFin : /(bounce(?:(?:-i|I)ni(?:(?:-f|F)in|)|(?:-f|F)in))\((.*)\)/g,
        num : new RegExp( rnum ),
        cssnum : new RegExp( rcssnum, "i" ),
        nopx : new RegExp( rnopx, "i" ),
        param : /^-{2}/
    } );
    
    const getPattern = function( type ) { 
        return patterns[ type ] || null;
    };
    
    const bezier = ( function( ) { 
        const NEWTON_ITERATIONS = 4;
        const NEWTON_MIN_SLOPE = 0.001;
        const SUBDIVISION_PRECISION = 0.0000001;
        const SUBDIVISION_MAX_ITERATIONS = 10;
 
        const kSpline = 11;
        const kSampleStepSize = 1.0 / ( kSpline - 1.0 );
 
        function A( a1, a2 ) { 
            return 1.0 - 3.0 * a2 + 3.0 * a1;
        }
 
        function B( a1, a2 ) { 
            return 3.0 * a2 - 6.0 * a1;
        }
 
        function C( a ) { 
            return 3.0 * a;
        }
 
        function calc( t, a1, a2 ) { 
            return ( ( A( a1, a2 ) * t + B( a1, a2 ) ) * t + C( a1 ) ) * t;
        }
 
        function slope( t, a1, a2 ) { 
            return 3.0 * A( a1, a2 ) * Math.pow( t, 2 ) + 2.0 * B( a1, a2 ) *
                t + C( a1 );
        }
 
        function subdivide( x, a, b, x1, x2 ) {
            var currT, currX, i = 0;
            do {
                currT = a + ( b - a ) / 2.0;
                currX = calc( t, x1, x2 ) - x;
                if ( currX > 0.0 ) b = currT;
                else a = currT;
            } while ( 
                ( Math.abs( currX ) > SUBDIVISION_PRECISION ) &&
                ( ++i < SUBDIVISION_MAX_ITERATIONS )
            );
            return currT;
        }
 
        function newtonIterate( x, gt, x1, x2 ) { 
            for ( var i = 0; i < NEWTON_ITERATIONS; ++i ) { 
                var currSlope = slope( gt, x1, x2 );
                if ( currSlope === 0.0 ) return gt;
                var currX = calc( gt, x1, x2 ) - x;
                gt -= currX / currSlope;
            }
            return gt;
        }
 
        function linear( x ) { 
            return x;
        }
 
        return function bezier( x1, y1, x2, y2 ) { 
            x1 = Math.max( 0, Math.min( x1, 1 ) );
            x2 = Math.max( 0, Math.min( x2, 1 ) );
            y1 = Math.max( 0, Math.min( y1, 1 ) );
            y2 = Math.max( 0, Math.min( y2, 1 ) );
 
            if ( x1 === y1 && x2 === y2 ) return linear;
 
            var sampleValues = new Float32Array( kSpline );
            for ( var i = 0; i < kSpline; ++i ) {
                sampleValues[ i ] = calc( i * kSampleStepSize, x1, x2 );
            }
 
            function getTForX( x ) { 
                var intervalStart = 0.0, 
                    currSample = 1, 
                    lastSample = kSpline - 1;
 
                for ( ; currSample !== lastSample && 
                    sampleValues[ currSample ] <= x; ++currSample ) {
                    intervalStart += kSampleStepSize;
                }
 
                --currSample;
                var dist = ( x - sampleValues[ currSample ] ) /
                    ( sampleValues[ currSample + 1 ] - sampleValues[ currSample ] );
                var gt = intervalStart + dist * kSampleStepSize;
 
                var initialSlope = slope( gt, x1, x2 );
                if ( initialSlope >= NEWTON_MIN_SLOPE ) {
                    return newtonIterate( x, gt, x1, x2 );
                } else if ( initialSlope === 0.0 ) {
                    return gt;
                } else {
                    return subdivide( x, intervalStart, intervalStart + 
                        kSampleStepSize, x1, x2 );
                }
            }
 
            return function bezier_easing( x ) { 
                if ( x === 0 || x === 1 ) return x;
                return calc( getTForX( x ), y1, y2 );
            };
        };
    } )( );
 
    const camelCase = function( s ) { 
        const string = String( s );
        const pattern = /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g;
        const match = Array.from( string.match( pattern ) || [ ] );
        return match.length > 0 ? match.reduce( function( result, item, index ) { 
            if ( index === 0 ) return item;
            const lower = String( item ).toLowerCase( );
            const firstLetter = lower.substr( 0, 1 ).toUpperCase( );
            const word = lower.substr( 1 );
            return result + ( firstLetter + word );
        }, s ) : s;
    };
 
    const toRadians = function( v ) { 
        return ( v * Math.PI ) / 180;
    };
    
    const bodyStyle = getComputedStyle( document.body, null );
    
    const defFontSize = parseFloat( bodyStyle[ "font-size" ] );
    
    const setPositiveNumber = function( value, subtract ) { 
        const matches = getPattern( "cssnum" ).exec( value ).slice( 1 );
        return matches ?
            Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
            value;
    };
    
    function Anima( el, opts ) { 
        if ( !( this instanceof Anima ) ) return new Anima( el, opts );
        
        if ( !( Object( el ) instanceof Element ) && typeof el !== "string" ) { 
            opts = Object.assign( { }, el );
            if ( opts.hasOwnProperty( "selector" ) ) {
                el = document.querySelector( opts.selector );
                delete opts.selector;
            } else if ( opts.target || opts.element || opts.el ) { 
                el = opts.target || opts.element || opts.el;
                [ "target", "element", "el" ].forEach( function( k ) { 
                    delete opts[ k ];
                } );
            }
        } else if ( typeof el === "string" ) { 
            el = document.querySelector( el );
        }
        
        this.target = el;
        this.active = false;
        this.state = "";
        this.defaults = Object.freeze( { 
            speed : "medium"
        } );
    }
    
    Anima._easing = Object.freeze( { 
        
    } );
    
    Anima._converters = Object.freeze( { 
        
    } );
    
    Anima.prototype = ( { 
        constructor : Anima,
        
    } );
} )( window, jQuery, mediaWiki );