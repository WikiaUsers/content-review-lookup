require( [
    "wikia.window",
    "wikia.document",
    "jquery",
    "mw"
], function( window, document, $, mw ){ 
    "use strict";
    function Clock( target, options ){
        if ( !( this instanceof Clock ) ) return new Clock( target, options );
        var isjQuery = false;
        if ( Object( target ) instanceof HTMLElement ){
            options = Object.assign( { }, options );
        } else if ( Object( target ) instanceof $ ){
            isjQuery = true;
            options = Object.assign( { }, options );
        } else {
            options = Object.assign( { }, target );
            target = options.target;
            
            if ( Object( target ) instanceof $ ){
                isjQuery = true;
            }
            
            delete options.target;
        }
        
        this.settings = Object.assign( { }, this.constructor.settings );
        this.callbacks = {};
        this.loaded = false;
        this.active = false;
        this.target = target;
        this.interval = null;
        
        this.configure( options );
        return this;
    }
    
    Clock.extend = function extend( target ){
        var sources = Array.prototype.slice.call( arguments, 1 );
        
        if ( arguments.length === 0 ){
            return this;
        } else if ( arguments.length === 1 ){
            sources = [ target ];
            target = this;
        }
        
        loopSources: while ( sources.length ){
            var source = sources.shift( );
            
            if ( sources === null || sources === void 0 ) continue loopSources;
            
            loopProperties: for ( const property in source ){
                var original = source[ property ];
                
                if ( typeof original === "object" ){
                    target[ property ] = Object.assign( { }, target[ property ] );
                    extend( target[ property ], original );
                } else {
                    target[ property ] = original;
                }
            }
        }
        
        return target;
    };
    
    Clock.extend( { 
        settings: Object.freeze( {
            dateFormat: "$D $OO $dd, $yyyy",
            timeFormat: "$12hh:$mm$ss $ap",
            parse: null,
            specialDates: { }
        } ),
        setters: Object.freeze( {
        
        } ),
        converters: Object.freeze( {
            // Time converters
            s: function( date ){
                return this.pad( date.getSeconds( ) );
            },
            ss: "s",
            m: function( date ){
                return this.pad( date.getMinutes( ) );
            },
            mm: "m",
            h: function( date ){
                return date.getHours( );
            },
            hh: function( date ){
                return this.pad( date.getHours( ) );
            },
            th: function( date ){
                var x = date.getHours( );
                x = x % 12 === 0 ? 12 : x % 12;
                return x;
            },
            thh: function( date ){
                var x = date.getHours( );
                x = x % 12 === 0 ? 12 : x % 12;
                return this.pad( x );
            },
            "12h": "th",
            "12hh": "thh",
            ampm: function( date ){
                return date.getHours( ) < 12 ? "am" : "pm";
            },
            ap: "ampm",
            AMPM: function( date ){
                return date.getHours( ) < 12 ? "AM" : "PM";
            },
            AP: "AMPM",
            // Date converters
            d: function( date ){
                return date.getDate( );
            },
            dd: function( date ){
                return this.pad( date.getDate( ) );
            },
            D: function( date ){
                return this.days[ date.getDay( ) ].substr( 0, 3 );
            },
            DD: function( date ){
                return this.days[ date.getDay( ) ];
            },
            o: function( date ){
                return date.getMonth( ) + 1;
            },
            oo: function( date ){
                return this.pad( date.getMonth( ) + 1 );
            },
            O: function( date ){
                return this.months[ date.getMonth( ) ].substr( 0, 3 );
            },
            OO: function( date ){
                return this.months[ date.getMonth( ) ];
            },
            y: "yy",
            yy: function( date ){
                return this.pad( date.getFullYear( ) % 100 );
            },
            yyy: "yyyy",
            yyyy: function( date ){
                return this.pad( date.getFullYear( ) );
            },
            // Special date converter
            S: function( date ){
                loopSpecialDates: for ( const name in this.specialDates ){
                    var condition = this.specialDates[ name ];
                    if ( !condition( date ) ) continue loopSpecialDates;
                    return name;
                }
                return "";
            },
            Sp: "S",
            sp: "S",
            special: "S"
        } ),
        convert: function convert( key, date ){
            if ( !( key in this.converters ) ) return date.getTime( );
            
            var converter = this.converters[ key ];
            
            if ( typeof converter === "string" ){
                return convert.call( this, converter, date );
            } else {
                
            }
        }
    } );
    
    Clock.fn = Clock.prototype;
    
    Clock.fn.extend = Clock.extend;
    
    Clock.fn.extend( {
        constructor: Clock,
        configure: function( options ){
            options = Object.assign( { }, options );
            
            loopProperties: for ( const property in options ){
                var value = options[ property ];
                
                if ( this.constructor.setters[ property ] ){
                    var setter = this.constructor.setters[ property ];
                    if ( typeof setter === "function" ){
                        value = setter.call( this, value );
                    } else {
                        value = setter;
                    }
                }
                
                this.settings[ property ] = value;
            }
        }
    } );
} );