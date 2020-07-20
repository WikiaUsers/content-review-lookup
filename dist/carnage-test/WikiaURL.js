( function( window, $, mw ) {
    "use strict";
    window.dev = Object.assign( { }, window.dev );
    
    if ( window.dev.url ) return;
    
    const URL_CACHE = { };
    
    const FANDOM_URL_PATTERNS = Object.freeze( { 
        full: /^https:?\/\/(?:[\w\d][\w\d\-\_]*[\w\d]*)\.(?:wikia|fandom)\.(?:com|org)(?:\/(?:.*))?$/g,
        noprotocol: /^(?:[\w\d][\w\d\-\_]*[\w\d]*)\.(?:wikia|fandom)\.(?:com|org)(?:\/(?:.*))?$/g,
        wiki: /^\/wiki\/(?:.*)$/g,
        index: /^\/index\.php\?(?:.+&|)title=(?:.*)$/g
    } );
    
    const FANDOM_URL_CAPTURES = Object.freeze( { 
        dbname: /^https:?\/\/([\w\d]*[\w\d\-\_]*[\w\d])\.(?:wikia|fandom)\.(?:com|org)(?:\/(?:.*))?$/g,
        dbnamenp: /^([\w\d]*[\w\d\-\_]*[\w\d])\.(?:wikia|fandom)\.(?:com|org)(?:\/(?:.*))?$/g,
        wikititle: /^\/wiki\/(.*)$/g,
        indextitle: /^\/index\.php\?(?:.+&|)tile=(.*)$/g
    } );
    
    const FANDOM_URL_CHECK_PATTERNS = Object.freeze( Object.values( FANDOM_URL_PATTERNS ) );
    
    const PROPS = Object.freeze( [ 
        "host",
        "protocol",
        "path",
        "hash"
    ] );
    
    function WikiaURL( url ) {
        if ( !( this instanceof WikiaURL ) ) return new WikiaURL( url );
        const __url = String( url ? url : window.location.href );
        
        if ( URL_CACHE[ __url ] instanceof WikiaURL ) {
            return URL_CACHE[ __url ];
        }
        
        this.__url = __url;
        
        const temp = document.createElement( "a" );
        temp.href = this.__url;
        
        this.href = temp.href;
        
        this.options = { };
        
        var search = temp.search.substr( 1 ).split( "&" );
        this.query = new WikiaURLQuery( this );
        
        Array.from( search ).forEach( function( q ) { 
            var key = q.substr( 0, q.indexOf( "=" ) ),
                value = q.substr( q.indexOf( "=" ) + 1 );
            
            this.query.set( key, value );
        }, this );
        
        this.host = temp.host;
        this.protocol = temp.protocol;
        this.path = ( ( temp.pathname.indexOf( "/", 0 ) === 0 ) ? "" : "/" ) + temp.pathname;
        this.hash = temp.hash.substr( 1 );
        this.dbname = "";
        this.title = "";
        
        return ( URL_CACHE[ this.__url ] = this );
    }
    
    WikiaURL.prototype.isExternal = function( ) {
        return Array.from( FANDOM_URL_CHECK_PATTERNS ).some( function( pattern ) {
            return !pattern.test( this.href );
        }, this );
    };
    
    WikiaURL.prototype.getQuery = function( q ) {
        return this.query.get( q );
    };
    
    WikiaURL.prototype.setQuery = function( k, v ) {
        return this.query.set( k, v );
    };
    
    WikiaURL.prototype.hasQuery = function( k ) {
        return this.query.has( k );
    };
    
    WikiaURL.prototype.matchesQuery = function( k, v ) {
        return this.query.matches( k, v );
    };
    
    WikiaURL.prototype.setHost = function( host ) {
        this.set( "host", String( host ) );
        return this;
    };
    
    WikiaURL.prototype.setPath = function( host ) {
        this.set( "path", String( host ) );
        return this;
    };
    
    WikiaURL.prototype.toString = function( ) {
        return ( this.protocol ? this.protocol + "//" : "" ) + this.host 
            + this.path + this.query.toString( ) + ( this.hash ? "#" + this.hash : "" );
    };
    
    WikiaURL.prototype.set = function( k, v ) {
        if ( Array.from( PROPS ).includes( k ) ){
            this[ k ] = v;
        } else {
            this.options[ k ] = v;
        }
    };
    
    WikiaURL.prototype.get = function( k ) { 
        if ( Array.from( PROPS ).includes( k ) ){
            return this[ k ];
        } else {
            return this.options[ k ];
        }
    };
    
    WikiaURL.prototype.addCb = function( ) {
        this.setQuery( "cb", Math.ceil( Math.random() * 10001 ) );
        return this;
    };
    
    WikiaURL.prototype.goTo = function( ) {
        window.location.href = this.toString( );
    };
    
    WikiaURL.prototype.decode = function( ) {
        return decodeURIComponent( this.toString( ) );
    };
    
    WikiaURL.prototype.encode = function( ) {
        return encodeURIComponent( this.toString( ) );
    };
    
    WikiaURL.prototype.open = function( ) {
        var args = Array.from( arguments );
        args.unshift( this.toString( ) );
        return window.open.apply( window, args );
    };
    
    WikiaURL.prototype.getAction = function( ) { 
        return this.getQuery( "action" ) || "view";
    };
    
    WikiaURL.prototype.getDBName = function( ) {
        if ( this.isExternal( ) ) return "";
        
        const PATTERN = FANDOM_URL_CAPTURES.dbname;
        return ( PATTERN.exec( this.href ) )[ 1 ] || "";
    };
    
    WikiaURL.prototype.matchDB = function( db ) { 
        const orig = this.getDBName( );
        
        if ( Array.isArray( db ) ) {
            return Array.from( db ).some( function( name ) {
                return ( Object( name ) instanceof RegExp ) ? name.test( orig ) : ( orig === String( name ) );
            }, this );
        } else {
            return ( Object( db ) instanceof RegExp ) ? db.test( orig ) : ( orig === String( db ) );
        }
    };
    
    const QUERY_CACHE = new Map( );
    
    function WikiaURLQuery( referrer ) {
        if ( !( this instanceof WikiaURLQuery ) ) return new WikiaURLQuery( referrer );
        
        if ( !( referrer instanceof WikiaURL ) ) {
            referrer = new WikiaURL( String( referrer ) );
        }
        
        if ( QUERY_CACHE.has( referrer ) ) {
            return QUERY_CACHE.get( referrer );
        }
        
        this.__query = { };
        this.__referrer = referrer;
        QUERY_CACHE.set( referrer, this );
        return this;
    }
    
    WikiaURLQuery.prototype.set = function( k, v ) {
        if ( typeof k === "object" ) {
            Object.keys( k ).forEach( function( key ) {
                var value = k[ key ];
                this.__query[ key ] = value || "";
            } );
        } else {
            this.__query[ k ] = String( v );
        }
    };
    
    WikiaURLQuery.prototype.get = function( k ) {
        if ( Array.isArray( k ) ) {
            return Array.from( k ).reduce( function( params, key ) {
                if ( this.has( key ) ) {
                    params[ key ] = this.__query[ key ] || "";
                }
                return params;
            }.bind( this ), { } );
        } else {
            return this.has( k ) ? this.__query[ k ] : "";
        }
    };
    
    WikiaURLQuery.prototype.has = function has( k ) {
        if ( !Array.isArray( k ) ){
            return this.__query.hasOwnProperty( k );
        }
        
        return Array.from( k ).every( function( key ) {
            return this.__query.hasOwnProperty( k );
        }, this );
    };
    
    WikiaURLQuery.prototype.matches = function matches( key, matcher ) {
        if ( typeof key === "object" ) {
            return Object.keys( key ).every( function( k ) {
                const v = key[ k ];
                return matches.call( this, k, v );
            } );
        }
        if ( !this.has( key ) ) return false;
        const value = this.get( key );
        
        if ( typeof matcher === "string" ) {
            return value === matcher;
        } else if ( typeof matcher === "function" ) {
            return Boolean( matcher.call( this, key, value ) );
        } else return false;
    };
    
    WikiaURLQuery.prototype.toString = function( ) {
        return "?" + Object.keys( this.__query ).map( function( key ) {
            var value = this.__query[ key ];
            var query = ( value ) ? key + "=" + String( value ) : "";
            return query;
        }, this ).filter( function( query ) {
            return query !== "";
        } ).join( "&" );
    };
    
    window.dev.url = WikiaURL;
    window.dev.urlquery = WikiaURLQuery;
    
    mw.hook( "dev.url" ).fire( window.dev.url );
    mw.hook( "dev.url.query" ).fire( window.dev.urlquery );
} )( window, jQuery, mediaWiki );