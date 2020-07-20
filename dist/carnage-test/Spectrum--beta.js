( function( window, document, $, mw ){
    "use strict";
    
    const ALPHA_BG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='2'%3E%3Cpath d='M1,0H0V1H2V2H1' fill='lightgrey'/%3E%3C/svg%3E";
    
    const DEFAULT_PALETTE = Object.freeze( [ 
        [ ],
        [ ],
        [ ],
        [ ],
        [ ]
    ] );
    
    function clamp( n, min, max ){
        let x = max < min ? min : max,
            y = max < min ? max : min;
        
        return Math.max( x, Math.min( n, y ) );
    }
    
    function clampFrom( n, min ){
        return clamp( n, min, Infinity );
    }
    
    function clampTo( n, max ){
        return clamp( n, -Infinity, max );
    }
    
    function limit( n, max ){
        return clamp( n, 0, max );
    }
    
    function parseHTML( string ){
        let parser = new DOMParser( ),
            context = parser.parseFromString( string ),
            body = context.body;
        
        if ( !body.children ){
            return null;
        }
        
        return body.children;
    }
    
    function isPlainObject( obj ){
        return Object.prototype.toString.call( obj ) === "[object Object]";
    }
    
    function Spectrum( container, options ){
        if ( !( this instanceof Spectrum ) ){
            return new Spectrum( container, options );
        }
        
        this.pickerWidth = 200;
        this.stripHeight = this.pickerHeight = this.pickerWidth;
        this.stripWidth = 10;
        this.type = "vertical";
        
        this.id = "";
        this.color = "rgba(255, 0, 0, 1)";
        this.hue = 0;
        
        if ( isPlainObject( container ) ){
            options = Object.assign( { }, container );
            container = options.container;
            delete options.container;
        }
        
        if ( Object( container ) instanceof Element ){
            options = Object.assign( { }, options );
        } else if ( typeof container === "string" ){
            container = document.querySelector( container );
        } else if ( Array.isArray( container ) ){
            let allElems = Array.from( container ).every( function( n ){
                return [ Element, HTMLCollection, NodeList ].some( function( constructor ){
                    return Object( n ) instanceof constructor;
                } );
            } );
            
            let allSelectors = Array.from( container ).every( function( n ){
                return typeof n === "string";
            } );
            
            if ( allSelectors ){
                container = Array.from( document.querySelectorAll( Array.from( container ).join( ", " ) ) );
            } else if ( allElems ){
                container = Array.from( container ).reduce( function( list, elem ){
                    if ( [ NodeList, HTMLCollection ].some( function( constructor ){
                        return elem instanceof constructor;
                    } ) ){
                        let collection = Array.from( elem );
                        list = list.concat( collection );
                    } else if ( Object( elem ) instanceof Element ){
                        list = list.concat( elem );
                    }
                    return list;
                }, [ ] );
            } else {
                container = Array.from( container ).reduce( function( list, elem ){
                    if ( [ NodeList, HTMLCollection ].some( function( constructor ){
                        return elem instanceof constructor;
                    } ) ){
                        let collection = Array.from( elem );
                        list = list.concat( collection );
                    } else if ( Object( elem ) instanceof Element ){
                        list = list.concat( elem );
                    } else if ( typeof elem === "string" ){
                        list = list.concat( document.querySelector( elem ) );
                    }
                    return list;
                }, [ ] );
            }
        }
        
        this.container = container;
        this.settings = Object.assign( { }, this.constructor.SETTINGS );
        return this.configure( options );
    }
    
    Spectrum.fn = Spectrum.prototype;
    
    Spectrum.SETTINGS = Object.freeze( {
        
    } );
} )( window, document, jQuery, mediaWiki );