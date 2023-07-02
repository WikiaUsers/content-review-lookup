/**
 * WikiaURL
 * 
 * A library dedicated to manipulating FANDOM links.
 * This library also works for external URLs.
 * 
 * @author Ultimate Dark Carnage <https://dev.fandom.com/User:Ultimate_Dark_Carnage>
 * @version 1.2
 **/
 
/* global window, mediaWiki */
( function( window, mw ) { 
    "use strict";
 
    // Creating the dev object if it does not exist
    window.dev = Object.assign( { }, window.dev );
 
    // If the URL object exists, do not run
    if ( window.dev.hasOwnProperty( "url" ) ) return;
 
    // URL cache
    const URL_CACHE = { };
 
    // Absolute (full) URL regex pattern
    const ABSOLUTE_URL_PATTERN = /^https?:\/\/(?:[\w\d][\w\d-_]*[\w\d]*)\.(?:wikia|fandom)\.(?:com|org)(?:\/.*)?$/g;
 
    // Absolute URL w/o protocol pattern
    const ABSOLUTE_URL_NP_PATTERN = /^(?:\/\/)?(?:[\w\d][\w\d-_]*[\w\d]*)\.(?:wikia|fandom)\.(?:com|org)(?:\/.*)?$/g;
 
    // Wiki URL pattern
    const WIKI_URL_PATTERN = /^\/wiki\/.*$/g;
 
    // Page URL pattern
    const INDEX_URL_PATTERN = /^\/index\.php\?(?:.+&)?title=(?:[^?&]+).*$/g;
 
    // URL pattern object
    const FANDOM_URL_PATTERNS = Object.freeze( { 
        full: ABSOLUTE_URL_PATTERN,
        np: ABSOLUTE_URL_NP_PATTERN,
        wiki: WIKI_URL_PATTERN,
        index: INDEX_URL_PATTERN
    } );
 
    // Wiki name capture pattern (w/protocol)
    const DBNAME_CAPTURE = /^https?:\/\/([\w\d][\w\d-_]*[\w\d]*)\.(?:wikia|fandom)\.(?:com|org)(?:\/.*)?$/g;
 
    // Wiki name capture pattern (no protocol)
    const DBNAME_NP_CAPTURE = /^(?:\/\/)?([\w\d][\w\d-_]*[\w\d]*)\.(?:wikia|fandom)\.(?:com|org)(?:\/.*)?$/g;
 
    // Page title capture
    const WIKI_TITLE_CAPTURE = /^\/wiki\/([^?&]+).*$/g;
 
    // Page title capture (index.php)
    const INDEX_TITLE_CAPTURE = /^\/index\.php\?(?:.+&)?title=([^?&]+).*$/g;
 
    // URL capture object
    const FANDOM_URL_CAPTURES = Object.freeze( { 
        dbname: DBNAME_CAPTURE,
        dbnamenp: DBNAME_NP_CAPTURE,
        wiki: WIKI_TITLE_CAPTURE,
        index: INDEX_TITLE_CAPTURE
    } );
 
    // Origin
    const FANDOM_ORIGINS = Object.freeze( [ 
        ".wikia.org",
        ".fandom.com",
        ".wikia.com"
    ] );
 
    // URL properties
    const URL_PROPS = Object.freeze( [
        "host",
        "protocol",
        "path",
        "hash",
        "href",
        "origin"
    ] );
 
    // Checking if the value is a plain object
    function isObject( v ) {
        return Object.prototype.toString.call( v ) === "[object Object]";
    }
    
    // Checking if the object is empty
    function isEmptyObject( o ) {
        return Object.keys( o ).length < 1;
    }
 
    // Initializing the WikiaURL object
    function WikiaURL( url, params, options ) {
        if ( !( this instanceof WikiaURL ) ) return new WikiaURL( url, params );
        const baseURL = String( url ? url : window.location );
        const urlParams = Object.assign( { }, params );
 
        if ( URL_CACHE[ baseURL ] instanceof WikiaURL ) {
            const p = URL_CACHE[ baseURL ];
            if ( Object.keys( urlParams ).length > 0 ) p.setQuery( urlParams );
            return p;
        }
 
        this.baseURL = baseURL;
        const temp = new URL( this.baseURL );
 
        this.href = temp.href;
        this.options = Object.assign( { }, options );
 
        const search = temp.search.substr( 1 ).split( "&" );
        this.query = new WikiaURL.Query( this );
 
        this.setQuery( Array.from( search ).reduce( function( obj, q ) { 
            const i = q.indexOf( "=", 0 );
            const k = q.substr( 0, i );
            const v = q.substr( i + 1 );
            if ( k !== "" && v !== "" ) obj[ k ] = v;
            return obj;
        }, { } ) );
 
        this.host = temp.host;
        this.protocol = temp.protocol;
        this.origin = temp.origin;
        this.path = ( ( temp.pathname.indexOf( "/", 0 ) === 0 ) ? "" : "/" ) + temp.pathname;
        this.pathname = this.path;
        this.hash = temp.hash.substr( 1 );
        this.title = "";
        this.wikiname = "";
        this.action = "";
 
        if ( this.isFandomLink( ) ) {
            this.title = this.getTitle( );
            this.wikiname = this.getDbName( );
            this.action = this.getAction( );
        }
 
        if ( Object.keys( urlParams ).length > 0 ) this.setQuery( urlParams );
        return ( URL_CACHE[ this.baseURL ] = this );
    }
 
    WikiaURL.patterns = Object.freeze( { 
        noncapture: FANDOM_URL_PATTERNS,
        capture: FANDOM_URL_CAPTURES
    } );
 
    WikiaURL.prototype = { 
        constructor : WikiaURL,
        // Function to update the URL object
        __makeURL: function( ) {
            const temp = new URL( this );
            this.href = temp.href;
            const search = temp.search.substr( 1 ).split( "&" );
            this.setQuery( Array.from( search ).reduce( function( obj, q ) { 
                const i = q.indexOf( "=", 0 );
                const k = q.substr( 0, i );
                const v = q.substr( i + 1 );
                if ( k !== "" && v !== "" ) obj[ k ] = v;
                return obj;
            }, { } ) );
            this.host = temp.host;
            this.protocol = temp.protocol;
            this.path = ( ( temp.pathname.indexOf( "/", 0 ) === 0 ) ? "" : "/" ) + temp.pathname;
            this.pathname = this.path;
            this.hash = temp.hash.substr( 1 );
            return this;
        },
        // URL check functions
        isExternal : function( callback, ret ) {
            const check = !Array.from( FANDOM_ORIGINS ).some( function( origin ) { 
                return this.origin.endsWith( origin );
            }, this );
            if ( check && typeof callback === "function" ) {
                const r = callback.call( this );
                return ret && ( r !== void 0 ) ? r : check;
            }
            return check;
        },
        isFandomLink : function( callback, ret ) {
            const check = !this.isExternal( );
            if ( check && typeof callback === "function" ) {
                const r = callback.call( this );
                return ret && ( r !== void 0 ) ? r : check;
            }
            return check;
        },
        isWikiLink : function( callback, ret ) { 
            const check = WIKI_URL_PATTERN.test( this.path );
            if ( check && typeof callback === "function" ) {
                const r = callback.call( this );
                return ret && ( r !== void 0 ) ? r : check;
            }
            return check;
        },
        // URL query functions
        getQuery : function( q ) {
            return this.query.get( q );
        },
        setQuery : function( k, v ) {
            return this.query.set( k, v );
        },
        removeQuery : function( k ) {
            return this.query.remove( k );
        },
        hasQuery : function( k ) {
            return this.query.has( k );
        },
        matchesQuery : function( k, v ) {
            return this.query.matches( k, v );
        },
        // Setter functions
        set : function( k, v ) {
            if ( isObject( k ) ) {
                Object.keys( k ).forEach( function( key ) { 
                    const value = k[ key ];
                    this.set( key, value );
                }, this );
            }
            if ( Array.from( URL_PROPS ).includes( k ) ) this[ k ] = v;
            else this.options[ k ] = v;
        },
        setPath : function( path ) {
            this.set( "path", String( path ) );
            return this.__makeURL( );
        },
        setHost : function( host ) {
            this.set( "host", String( host ) );
            return this.__makeURL( );
        },
        setDbName : function( db, isWikiaOrg ) { 
            const suffix = "." + ( isWikiaOrg ? "wikia.org" : "fandom.com" );
            const dbhost = db + suffix;
            return this.setHost( dbhost );
        },
        addCb : function( ) { 
            this.setQuery( "cb", Math.ceil( Math.random( ) * 10001 ) );
            return this;
        },
        // Getter functions
        get : function( k ) {
            if ( Array.from( URL_PROPS ).includes( k ) ) return this[ k ];
            else return this.options[ k ];
        },
        getAction : function( ) {
            return this.getQuery( "action" ) || "view";
        },
        getDbName : function( ) {
            return Array.from( DBNAME_NP_CAPTURE.exec( this.host ) || [ ] )[ 1 ] || "";
        },
        getTitle : function( ) { 
            var result = "", r;
            if ( this.isWikiLink( ) ) {
                r = Array.from( WIKI_TITLE_CAPTURE.exec( this.path ) || [ ] )[ 1 ] || "";
                result = decodeURIComponent( r.split( "_" ).join( " " ) );
            } else {
                r = Array.from( INDEX_TITLE_CAPTURE.exec( this.path ) || [ ] )[ 1 ] || "";
                result = decodeURIComponent( r.split( "_" ).join( " " ) );
            }
            return result;
        },
        // Matcher functions
        matchDbName : function matchDbName( db, callback, ret ) {
            const orig = this.getDbName( );
            if ( orig === "" ) return false;
            var check = false;
            if ( Array.isArray( db ) ) {
                const a = Array.from( db ).flat( Infinity );
                check = a.some( matchDbName, this );
            } else {
                check = ( Object( db ) instanceof RegExp ) ? db.test( orig ) :
                ( db === String( orig ) );
            }
            if ( check && typeof callback === "function" ) {
                const r = callback.call( this, db );
                return ret && ( r === void 0 ) ? r : check;
            }
        },
        matchTitle : function matchTitle( title, callback, ret ) {
            const orig = this.getTitle( );
            if ( orig === "" ) return false;
            var check = false;
            if ( Array.isArray( title ) ) {
                const a = Array.from( title ).flat( Infinity );
                check = a.some( matchTitle, this );
            } else {
                check = ( Object( title ) instanceof RegExp ) ? title.test( orig ) :
                ( title === String( orig ) );
            }
            if ( check && typeof callback === "function" ) {
                const r = callback.call( this, title );
                return ret && r ? r : check;
            }
        },
        // String functions
        decode : function( ) {
            return decodeURIComponent( this );
        },
        encode : function( ) {
            return encodeURIComponent( this );
        },
        toString : function( ) {
            return ( this.protocol ? this.protocol + "//" : "" ) + this.host +
                this.path + this.query + ( this.hash ? "#" + this.hash : "" );
        },
        // URL actions
        goTo : function( ) {
            window.location.href = this;
        },
        open : function( ) {
            const args = Array.from( arguments );
            args.unshift( this );
            return window.open.apply( window, args );
        }
    };
 
    // Object to cache URL queries
    const QUERY_CACHE = new Map( );
 
    // Creating a query object
    WikiaURL.Query = function( referrer ) {
        if ( !( this instanceof WikiaURL.Query ) ) return new WikiaURL.Query( referrer );
 
        if ( !( referrer instanceof WikiaURL ) ) {
            referrer = new WikiaURL( String( referrer ) );
        }
 
        if ( QUERY_CACHE.has( referrer ) ) return QUERY_CACHE.get( referrer );
        this.__referrer = referrer;
        this.query = { };
        QUERY_CACHE.set( referrer, this );
        return this;
    };
 
    WikiaURL.Query.prototype = { 
        constructor : WikiaURL.Query,
        set : function( k, v ) { 
            if ( isObject( k ) ) Object.keys( k ).forEach( function( key ) { 
                const value = k[ key ];
                this.query[ key ] = value || "";
            }, this );
            else this.query[ k ] = String( v );
        },
        get : function( k ) {
            if ( Array.isArray( k ) ) {
                return Array.from( k ).flat( Infinity ).reduce( function( params, key ) { 
                    params[ key ] = this.has( key ) ? this.query[ key ] : key;
                    return params;
                }.bind( this ), { } );
            } else {
                return this.has( k ) ? this.query[ k ] : "";
            }
        },
        remove: function( k ) { 
            if ( Array.isArray( k ) ) {
                Array.from( k ).flat( Infinity ).forEach( this.remove, this );
            } else {
                if ( this.has( k ) ) {
                    this.query[ k ] = void 0;
                    delete this.query[ k ];
                }
            }
        },
        has : function has( k ) {
            if ( Array.isArray( k ) ) return Array.from( k ).every( has, this );
            return this.query.hasOwnProperty( k );
        },
        matches : function matches( key, matcher ) {
            if ( isObject( key ) ) {
                return Object.keys( key ).every( function( k ) { 
                    const v = key[ k ];
                    return matches.call( this, k, v );
                }, this );
            }
            if ( !this.has( key ) ) return false;
            const value = this.get( key );
            if ( typeof matcher === "string" ) {
                return value === matcher;
            } else if ( typeof matcher === "function" ) {
                return !!matcher.call( this, key, value );
            } else return false;
        },
        toString: function( ) {
            return ( !isEmptyObject( this.query ) ? "?" + Object.keys( this.query ).map( function( key ) {
                const value = this.query[ key ];
                const q = value ? key + "=" + String( value ) : "";
                return q;
            }, this ).filter( function( q ) { 
                return q !== "";
            } ).join( "&" ) : "" );
        }
    };
 
    WikiaURL.create = function( url, params ) {
        return new WikiaURL( url, params );
    };
 
    window.WikiaURL = window.dev.url = WikiaURL;
    window.dev.urlquery = WikiaURL.Query;
 
    mw.hook( "dev.url" ).fire( window.dev.url );
    mw.hook( "dev.url.query" ).fire( window.dev.urlquery );
} )( window, mediaWiki );