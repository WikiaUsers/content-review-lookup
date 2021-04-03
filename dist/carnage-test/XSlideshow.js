( function( window, mw, $ ) { 
    "use strict";
    
    const BASE_UID = Date.now( );
    
    const CUBIC_BEZIER_REGEX = /(cubic(?:-b|B)ezier)\((.*)\)/g;
    
    const BOUNCE_INI_FIN_REGEX = /(bounce(?:(?:-i|I)ni(?:(?:-f|F)in|)|(?:-f|F)in))\((.*)\)/g;
    
    const getUID = function( ) { 
        return BASE_UID + Math.floor( Math.random( ) * 99999999 );
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
    
    function XSlideshow( el, opts ) { 
        
        if ( !( this instanceof XSlideshow ) ) return new XSlideshow( el, opts );
        
        this._defaults = Object.freeze( { 
            prevArrow : document.createElement( "a" ),
            nextArrow : document.createElement( "a" ),
            accessibility : true,
            adaptiveHeight : false,
            arrows : true,
            asNavFor : null,
            autoplay : false,
            autoplaySpeed : 3000,
            centerMode : false,
            centerPadding : "50px",
            cssEase : "ease",
            dots : false,
            draggable : true,
            easing : "linear",
            edgeFriction : 0.35,
            fade : false,
            focusOnSelect : false,
            focusOnChange : false,
            infinite : true,
            initialSlide : 0,
            lazyload : "ondemand",
            mobileFirst : false,
            pauseOnHover : true,
            pauseOnFocus : true,
            respondTo : 'window',
            responsive : null,
            rows : 1,
            rtl : false,
            slide : "",
            slidesPerRow : 1,
            slidesToShow : 1,
            slidesToScroll : 1,
            speed : 500,
            swipe : true,
            swipeToSlide : false,
            touchMove : true,
            touchThreshold : 1,
            useCSS : true,
            useTransform : true,
            variableWidth : false,
            vertical : false,
            verticalSwiping : false,
            waitForAnimate : true,
            zIndex : 1000
        } );
        
        this._initials = Object.freeze( { 
            animating : false,
            dragging : false,
            autoPlayTimer : null,
            currentDirection : 0,
            currentLeft : null,
            currentSlide : 0,
            direction : 1,
            listWidth : null,
            listHeight : null,
            loadIndex : 0,
            nextArrow : null,
            prevArrow : null,
            scrolling : false,
            slideCount : null,
            slideWidth : null,
            slideTrack : null,
            slides : null,
            sliding : false,
            slideOffset : 0,
            swipeLeft : null,
            swiping : false,
            list : null,
            touchObject : { },
            transformEnabled : false
        } );
        
        Object.assign( this, this._initial );
        
        this.activeBreakpoint = null;
        this.animType = null;
        this.animProp = null;
        this.breakpoints = [ ];
        this.breakpointSettings = [ ];
        this.cssTransitions = false;
        this.focused = false;
        this.interrupted = false;
        this.hidden = "hidden";
        this.paused = true;
        this.positionProp = null;
        this.respondTo = null;
        this.rowCount = 1;
        this.shouldClick = true;
        this.target = el;
        this.slidesCache = null;
        this.transformType = null;
        this.transitionType = null;
        this.visibilityChange = "visibilitychange";
        this.windowWidth = 0;
        this.windowTimer = null;
        
        const data = Object.assign( { }, this.target.dataset );
        
        this._options = Object.assign( { }, this._defaults, data );
        
        const easing = this._easing = Object.freeze( { 
            linear : function( v ) { 
                return v;
            },
            swing : function( v ) { 
                return 0.5 - Math.cos( v * Math.PI ) / 2;
            },
            elastic : function( v, a ) { 
                const m = Math.max( 1, Math.min( a[ 0 ], 10 ) );
                const p = Math.max( 0.1, Math.min( a[ 1 ], 2 ) );
                const f = function( t ) { 
                    return ( t === 0 || t === 1 ) ? t :
                    ( -m * Math.pow( 2, 10 * ( t - 1 ) ) *
                        Math.sin( ( ( ( t - 1 ) - ( p / ( Math.PI * 2 ) * Math.asin( 1 / m ) ) ) * ( Math.PI * 2 ) ) / p )
                    );
                };
                return f( v );
            },
            ease : function( v ) { 
                const f = bezier( 0.25, 0.1, 0.25, 1.0 );
                return f( v );
            },
            easeIn : function( v ) { 
                return Math.pow( v, 1.675 );
            },
            easeOut : function( v ) { 
                return Math.pow( 1 - v, 1.675 );
            },
            easeInOut : function( v ) { 
                return 0.5 * ( Math.sin( ( k - 0.5 ) * Math.PI ) + 1 );
            },
            easeInSine : function( v ) { 
                return 1 - Math.cos( ( v * Math.PI ) / 2 );
            },
            easeOutSine : function( v ) { 
                return Math.sin( ( v * Math.PI ) / 2 );
            },
            easeInOutSine : function( v ) { 
                return -( Math.cos( Math.PI * v ) - 1 ) / 2;
            },
            easeInCosine : function( v ) { 
                return 1 - Math.sin( ( v * Math.PI ) / 2 );
            },
            easeOutCosine : function( v ) { 
                return Math.cos( ( v * Math.PI ) / 2 );
            },
            easeInOutCosine : function( v ) { 
                return -( Math.sin( Math.PI * v ) - 1 ) / 2;
            },
            easeInQuad : function( v ) { 
                return Math.pow( v, 2 );
            },
            easeOutQuad : function( v ) { 
                return v * ( 2 - v );
            },
            easeInOutQuad : function( v ) { 
                return v < 0.5 ? 2 * Math.pow( v, 2 ) : -1 + ( 4 - 2 * v ) * v;
            },
            easeInCubic : function( v ) { 
                return Math.pow( v, 3 );
            },
            easeOutCubic : function( v ) { 
                return ( --v ) * Math.pow( v, 2 ) + 1;
            },
            easeInOutCubic : function( v ) { 
                return v < 0.5 ? 4 * Math.pow( v, 3 ) : ( v - 1 ) * 
                    ( 2 * v - 2 ) * ( 2 * v - 2 ) + 1;
            },
            easeInQuart : function( v ) { 
                return Math.pow( v, 4 );
            },
            easeOutQuart : function( v ) { 
                return 1 - ( --v ) * Math.pow( v, 3 );
            },
            easeInOutQuart : function( v ) { 
                return v < 0.5 ? 8 * Math.pow( v, 4 ) : 1 - 8 * 
                    ( --v ) * Math.pow( v, 3 );
            },
            easeInBounce : function( v ) { 
                return 1 - easing.easeOutBounce( v );
            },
            easeOutBounce : function( v ) { 
                const nl = 7.5625, dl = 2.75;
                
                if ( v < 1 / dl ) {
                    return nl * Math.pow( v, 2 );
                } else if ( v < 2 / dl ) { 
                    return nl * ( v -= 1.5 / dl ) * v + 0.75;
                } else if ( v < 2.5 / dl ) {
                    return nl * ( v -= 2.25 / dl ) * v + 0.9375;
                } else {
                    return nl * ( v -= 2.625 / dl ) * v + 0.984375;
                }
            },
            cubicBezier : function( v, a ) { 
                const _easing = bezier.apply( null, a );
                return _easing( v );
            },
            bounceIni: function( v, a ) { 
                const s = a[ 0 ];
                return 1 - Math.sin( ( 1 - v ) * s ) / Math.sin( s );
            },
            bounceFin : function( v, a ) { 
                const e = a[ 0 ];
                return Math.sin( v * e ) / Math.sin( e );
            },
            bounceIniFin : function( v, a ) { 
                const s = a[ 0 ], e = a[ 1 ];
                return ( Math.sin( v * ( e - s ) + s ) - Math.sin( s ) ) /
                    ( Math.sin( e ) - Math.sin( s ) );
            }
        } );
        
        this.currentSlide = this.options.initialSlide;
        
        this.originalSettings = this.options;
        
        this.uid = getUID( );
        
        this.registerBreakpoints( );
        this.init( true );
    }
    
    XSlideshow.prototype = ( { 
        constructor : XSlideshow,
        activateAccessibility : function( ) { 
            const active = this.slideTrack.querySelectorAll( ".xs-active" );
            Array.from( active ).forEach( function( el ) { 
                el.setAttribute( "aria-hidden", false );
            }, this );
            
            const m = this.slideTrack.querySelectorAll( "a, input, button, select" );
            Array.from( active ).forEach( function( el ) { 
                el.setAttribute( "tabindex", 0 );
            } );
        },
        addSlide : function( html, index, addBefore ) { 
            if ( typeof index === "boolean" ) {
                addBefore = index;
                index = null
            } else if ( index < 0 || index >= this.slideCount ) {
                return false;
            }
            
            this.unload( );
            
            const m = parseHTML( html );
            
            if ( typeof index === "number" ) { 
                if ( index === 0 && this.slides.length === 0 ) {
                    this.slideTrack.appendChild( m );
                } else if ( addBefore ) {
                    var child = this.slideTrack.children[ index ];
                    child.insertAdjacentElement( "beforebegin", m );
                } else {
                    var child = this.slideTrack.children[ index ];
                    child.insertAdjacentElement( "afterend", m );
                }
            } else {
                if ( addBefore ) {
                    this.slideTrack.insertAdjacentElement( "afterbegin", m );
                } else {
                    this.slideTrack.insertAdjacentElement( "beforeend", m );
                }
            }
            
            const s = this.slideTrack.querySelectorAll( this.options.slide );
            this.slides = Array.from( s ).filter( function( el ) { 
                return el.parentElement === this.slideTrack;
            }, this );
            
            this.slides.forEach( function( slide, index ) { 
                slide.dataset.index = index;
            } );
            
            this.slidesCache = this.slides;
            
            this.reset( );
        }
    } );
} )( window, mediaWiki, jQuery );