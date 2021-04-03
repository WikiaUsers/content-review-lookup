/**
 * WikiaURL
 * 
 * A library dedicated to manipulating FANDOM links.
 * This library also works for external URLs.
 * 
 * @author Ultimate Dark Carnage 
 * @version 1.4
 **/

( function( window, mw ) { 
    "use strict";
    
    // Creating the dev object if it does not exist
    window.dev = window.dev || { };
    
    // If the URL object exists, do not run
    if ( window.dev.url ) return;
    
    // URL cache
    const URL_CACHE = new Map( );
    
    // URL patterns
    const PATTERNS = Object.freeze( { 
        // Noncapture patterns
        // Absolute URL pattern
        fullUrl : /^https?:\/\/(?:[\w\d][\w\d-_]*[\w\d]*)\.(?:wikia\.(?:com|org)|fandom\.com)(?:\/.*|)$/,
        
        // Absolute URL pattern (no protocol)
        fullUrl2 : /^(?:\/\/|)(?:[\w\d][\w\d-_]*[\w\d]*)\.(?:wikia\.(?:com|org)|fandom\.com)(?:\/.*|)$/,
        
        // Wiki URL pattern
        wiki : /^\/wiki\/.*$/,
        
        // Index URL pattern
        index : /^\/index\.php\?(?:.+&|)title=(?:[^?&]+).*$/,
        
        // Origin
        origin : /(?:wikia\.(?:org|com)|fandom\.com)$/,
        
        // Capture patterns
        // Wiki database name
        dbname : /^(?:https?:(?:\/\/|)|)([\w\d][\w\d-_]*[\w\d]*)\.(?:wikia\.(?:com|org)|fandom\.com)(?:\/.*|)$/,
        
        // Page title capture from wiki URL
        wikiTitle : /^\/wiki\/([^?&]+).*$/,
        
        // Page title capture from index URL
        indexTitle : /^\/index\.php(?:.+&|)title=([^?&]+).*$/
    } );
    
    // URL properties
    const URL_PROPS = Object.freeze( [
        "host",
        "protocol",
        "path",
        "hash",
        "href",
        "origin",
        "options",
        "_baseUrl",
        "_urlParams",
        "_inCache"
    ] );
    
    // Extend function
    function extend( o ) { 
        const s = Array.from( arguments ).slice( 1 );
        
        if ( arguments.length === 0 ) return { };
        
        else if ( arguments.length === 1 ) return o;
        
        s.forEach( function( m ) { 
            
        } );
    }
    
    // Special properties
    const SPECIAL_PROPS = Object.freeze( { 
        options : function( _, o ) { 
            return j;
        }
    } );
    
    // Object checker constructor
    function ObjectChecker( o, a, c ) { 
        
        if ( this.constructor !== ObjectChecker ) return new ObjectChecker( o );
        
        const p = this;
        
        c = c || p;
        
        p.isEmpty = function( ) { 
            return Object.keys( o ).length === 0;
        };
        
        p.isPlain = function( ) { 
            return Object.prototype.toString.call( o ) === "[object Object]";
        };
        
        p.isCallable = function( ) { 
            return Object.prototype.toString.call( o ) === "[object Function]";
        };
        
        p.returnsValue = function( ) { 
            if ( !p.isCallable( ) ) return false;
            
            const test = a ? o.apply( c, a ) : o( );
            
            return test !== void 0;
        };
        
        p.isFunction = p.isCallable;
    }
    
    // Initializing the WikiaURL object
    function WikiaURL( url, params, options ) { 
        
        if ( this.constructor !== WikiaURL ) { 
            return new WikiaURL( url, params, options );
        }
        
        const r = { };
        
        r._baseURL = String( url || window.location );
        
        r._urlParams = params || { };
        
        r._inCache = URL_CACHE.has( r._baseURL );
        
        if ( r._inCache ) { 
            
            const c = URL_CACHE.get( r._baseURL );
            
            const o = new ObjectChecker( r._urlParams );
            
            if ( !o.isEmpty( ) ) c.setQuery( r._urlParams );
            
            c.set( r );
            
            return c;
        }
        
        const p = this;
        
        p.set = function( k, v ) { 
            return new Promise( function( res, rej ) { 
                if ( isObject( k ) ) { 
                    Promise.all( 
                        Object.keys( k )
                            .map( function( key ) { 
                                const value = k[ key ];
                                return p.set( key, value );
                            } ) 
                    ).then( res );
                } else { 
                    if ( URL_PROPS.includes( k ) ) { 
                        p[ k ] = v;
                    } else if ( SPECIAL_PROPS.hasOwnProperty( k ) ) { 
                        const f = SPECIAL_PROPS[ k ];
                        const fo = new ObjectChecker( f, [ k, v ], p );
                        p[ k ] = fo.isCallable( ) ? f.call( p, k, v ) : f;
                        if ( !fo.returnsValue( ) ) p[ k ] = f;
                    } else { 
                        p.options[ k ] = v;
                    }
                }
            } );
        };
        
        p.set( r );
        
        p._nativeUrlObject = new URL( p._baseURL );
    }
} )( this, mediaWiki );