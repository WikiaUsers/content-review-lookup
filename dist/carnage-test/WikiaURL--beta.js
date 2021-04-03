/**
 * WikiaURL
 * 
 * A library dedicated to manipulating links from FANDOM.
 * Note: This library can also work on external links.
 * 
 * @author  Ultimate Dark Carnage
 * @version v1.3
 **/
( function( window, mw ) { 
    "use strict";
    
    // If the dev object does not exist, create one
    window.dev = Object.assign( { }, window.dev );
    
    // If the URL property exists, do not run;
    if ( window.dev.hasOwnProperty( "url" ) ) return;
    
    // URL cache object
    const URL_CACHE = { };
    
    // URL query cache object
    const QUERY_CACHE = new Map( );
    
    // URL pattern parts
    const PARTS = Object.freeze( { 
        swProtocol : "^https?:\\/\\/",
        swSlash : "^(?:\\/\\/)?",
        dbName : "[\\w\\d]*[\\w\\d-_]*[\\w\\d]",
        fandomURL : "\\.(?:wikia\\.(?:org|com)|fandom\\.com)",
        wiki : "\\/wiki\\/",
        swWiki : "^\\/wiki\\/",
        index : "\\/index\\.php\\?",
        swIndex : "^\\/index\\.php\\?",
        noQuery : "[^?&]",
        ewWc : ".*$",
        wc : ".*",
        wcs : ".+",
        ewWcs : ".+$",
        title : "title="
    } );
    
    // URL patterns
    const PATTERNS = Object.freeze( { 
        absoluteExtURL : new RegExp( PARTS.swProtocol + "(?:[^\\/]+)(?:\\/" + PARTS.wc + ")?$", "g" ),
        absoluteExtURLNp : new RegExp( PARTS.swSlash + "(?:[^\\/]+)(?:\\/" + PARTS.wc + ")?$", "g" ),
        absoluteURL : new RegExp( PARTS.swProtocol + "(?:" + PARTS.dbName +
            ")" + PARTS.fandomURL + "(?:\\/" + PARTS.wc + ")?$", "g" ),
        absoluteURLNp : new RegExp( PARTS.swSlash + "(?:" + PARTS.dbName +
            ")" + PARTS.fandomURL + "(?:\\/" + PARTS.wc + ")?$", "g" ),
        wikiURL : new RegExp( PARTS.swWiki + PARTS.ewWc, "g" ),
        indexURL : new RegExp( PARTS.swIndex + "(?:" + PARTS.wcs + "&)?" +
            PARTS.title + "(?:" + PARTS.noQuery + "+)" + PARTS.ewWc, "g" ),
        dbName : new RegExp( PARTS.swProtocol + "(" + PARTS.dbName + ")" +
            PARTS.fandomURL + "(?:\\/" + PARTS.wc + ")?$", "g" ),
        dbNameNp : new RegExp( PARTS.swSlash + "(" + PARTS.dbName + ")" +
            PARTS.fandomURL + "(?:\\/" + PARTS.wc + ")?$", "g" ),
        wikiTitle : new RegExp( PARTS.swWiki + "(" + PARTS.noQuery + "+)" +
            PARTS.ewWc, "g" ),
        indexTitle : new RegExp( PARTS.swIndex + "(?:" + PARTS.wcs + "&)?" +
            PARTS.title + "(" +  PARTS.noQuery + "+)" + PARTS.ewWc, "g" ),
        absoluteWikiTitle : new RegExp( PARTS.swProtocol + "(?:" + PARTS.dbName +
            ")" + PARTS.fandomURL + PARTS.wiki + "(" + PARTS.noQuery + "+)" +
            PARTS.ewWc, "g" ),
        absoluteIndexTitle : new RegExp( PARTS.swProtocol + "(?:" + 
            PARTS.dbName + ")" + PARTS.fandomURL + PARTS.index + "(?:" + 
            PARTS.wcs + "&)?" + PARTS.title + "(" +  PARTS.noQuery + "+)" + 
            PARTS.ewWc, "g" ),
        absoluteWikiTitleNp : new RegExp( PARTS.swSlash + "(?:" + PARTS.dbName +
            ")" + PARTS.fandomURL + PARTS.wiki + "(" + PARTS.noQuery + "+)" +
            PARTS.ewWc, "g" ),
        absoluteIndexTitleNp : new RegExp( PARTS.swSlash + "(?:" + 
            PARTS.dbName + ")" + PARTS.fandomURL + PARTS.index + "(?:" + 
            PARTS.wcs + "&)?" + PARTS.title + "(" +  PARTS.noQuery + "+)" + 
            PARTS.ewWc, "g" ),
        __default : new RegExp( PARTS.wc )
    } );
    
    const URL_PROPS = Object.freeze( [ 
        "href",
        "host",
        "path",
        "pathname",
        "origin",
        "hash"
    ] );
    
    const FANDOM_ORIGINS = Object.freeze( [ 
        ".wikia.com",
        ".wikia.org",
        ".fandom.com"
    ] );
    
    function isInstance( obj, constructor ) { 
        return Object( obj ) instanceof constructor;
    }
    
    function isObject( o ) { 
        return Object.prototype.toString.call( o ) === "[object Object]";
    }
    
    function getPattern( name ) { 
        if ( Array.isArray( name ) ) { 
            const a = Array.prototype.flat.call( name, Infinity );
            return Array.from( a ).reduce( function( o, n ) { 
                o[ n ] = getPattern( n );
                return o;
            }, { } );
        } else {
            const key = String( name );
            if ( PATTERNS.hasOwnProperty( key ) ) {
                return PATTERNS.__default;
            }
            const pattern = PATTERNS[ key ];
            if ( isInstance( pattern, String ) ) {
                return getPattern( pattern );
            } else if ( isInstance( pattern, RegExp ) ) {
                return pattern;
            }
        }
    }
    
    function isEmptyObject( o ) { 
        return Object.keys( o ).length === 0;
    }
    
    function returnFalse( ) { 
        return false;
    }
    
    function assertFrom( ) { 
        const args = Array.from( arguments );
        
        var context, handler, r, f = [ "", 0, null, void 0, false ], 
            a = [ ], l = 2;
        if ( isInstance( args[ 0 ], Function ) ) {
            handler = args[ 0 ];
            context = window;
            l--;
        } else { 
            context = args[ 0 ];
            handler = args[ 1 ];
        }
        
        a = args.slice( l );
        
        if ( !isInstance( handler, Function ) ) {
            handler = returnFalse;
        }
        
        r = handler.apply( context, a );
        return f.every( function( v ) { 
            return r !== v;
        } );
    }
    
    // Creating the WikiaURL constructor
    function WikiaURL( url, params, options ) { 
        if ( !isInstance( this, WikiaURL ) ) {
            return new WikiaURL( url, params, options );
        }
        
        const baseURL = String( url ? url : window.location.href );
        const urlParams = Object.assign( { }, params );
        
        const absoluteURLPattern = getPattern( "absoluteExtURL" );
        const isPath = baseURL.indexOf( "/", 0 ) === 0;
        
        const trueURL = isPath ? window.location.origin + baseURL : baseURL;
        
        console.log( trueURL );
        
        if ( isInstance( URL_CACHE[ trueURL ], WikiaURL ) ) {
            const p = URL_CACHE[ trueURL ];
            if ( !isEmptyObject( urlParams ) ) p.setQuery( urlParams );
            return p;
        }
        
        this.baseURL = baseURL;
        this.trueURL = trueURL;
        
        const temp = new URL( this.trueURL );
        
        this.href = temp.href;
        this.options = Object.assign( { }, options );
        
        const search = temp.search.substr( 1 ).split( "&" );
        this.query = new WikiaURL.Query( this );
        
        this.setQuery( Array.from( search ).reduce( function( o, q ) { 
            const i = q.indexOf( "=", 0 );
            const k = q.substr( 0, i );
            const v = q.substr( i + 1 );
            if ( k !== "" && v !== "" ) o[ k ] = v;
            return o;
        }, { } ) );
        
        this.host = temp.host;
        this.protocol = temp.protocol;
        this.origin = temp.origin;
        
        this.pathname = ( ( temp.pathname.indexOf( "/", 0 ) === 0 ) ? "" : "/" )
            + temp.pathname;
        
        Object.defineProperty( this, "path", { 
            get( ) { 
                return this.pathname;
            },
            set( v ) { 
                this.pathname = v;
            }
        } );
        
        this.hash = temp.hash.substr( 1 );
        this.title = "";
        this.wikiname = "";
        
        Object.defineProperty( this, "dbname", { 
            get( ) {
                return this.wikiname;
            },
            set( v ) { 
                this.wikiname = v;
            }
        } );
        
        this.action = "";
        
        if ( this.isFandomLink( ) ) { 
            this.title = this.getTitle( );
            this.wikiname = this.getDbName( );
            this.action = this.getAction( );
        }
        
        if ( !isEmptyObject( urlParams ) ) this.setQuery( urlParams );
        return ( URL_CACHE[ this.trueURL ] = this );
    }
    
    Object.assign( WikiaURL, { 
        __version : 1.3,
        __patterns : PATTERNS,
        __parts : PARTS,
        create : function( url, params, options ) { 
            return new WikiaURL( url, params, options );
        },
        prototype : { 
            constructor : WikiaURL,
            makeURL : function( ) { 
                const temp = new URL( this );
                this.href = temp.href;
                const search = temp.search.substr( 1 ).split( "&" );
                this.setQuery( Array.from( search ).reduce( function( o, q ) { 
                    const i = q.indexOf( "=", 0 );
                    const k = q.substr( 0, i );
                    const v = q.substr( i + 1 );
                    if ( k !== "" && v !== "" ) o[ k ] = v;
                    return o;
                }, { } ) );
                this.host = temp.host;
                this.protocol = temp.protocol;
                this.pathname = ( ( temp.pathname.indexOf( "/", 0 ) === 0 ) ?
                    "" : "/" ) + temp.pathname;
                this.hash = temp.hash.substr( 1 );
                return this;
            },
            isExternal : function( callback, ret ) { 
                const check = assertFrom( this, function( origins ) { 
                    return Array.from( origins ).some( function( origin ) { 
                        return this.origin.endsWith( origin );
                    }, this );
                }, FANDOM_ORIGINS );
                
                if ( check && typeof callback === "function" ) { 
                    const r = callback.call( this );
                    return ret && ( r !== void 0 ) ? r : check;
                } else {
                    return check;
                }
            },
            isFandomLink : function( callback, ret ) { 
                const check = assertFrom( this, function( ) { 
                    return !this.isExternal( );
                } );
                
                if ( check && typeof callback === "function" ) { 
                    const r = callback.call( this );
                    return ret && ( r !== void 0 ) ? r : check;
                } else {
                    return check;
                }
            },
            isWikiLink : function( callback, ret ) { 
                const check = assertFrom( this, function( path ) { 
                    const pattern = getPattern( "wikiURL" );
                    return pattern.test( path );
                }, this.path );
                
                if ( check && typeof callback === "function" ) { 
                    const r = callback.call( this );
                    return ret && ( r !== void 0 ) ? r : check;
                } else {
                    return check;
                }
            },
            getQuery : function( k ) {
                return this.query.get( k );
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
            set : function( k, v ) { 
                if ( !isObject( k ) ) { 
                    if ( URL_PROPS.includes( k ) ) this[ k ] = v;
                    else this.options[ k ] = v;
                } else {
                    Object.keys( k ).forEach( function( key ) { 
                        const value = k[ key ];
                        this.set( key, value );
                    }, this );
                }
            },
            setPath : function( path ) { 
                var p = String( path ), 
                    r = p.indexOf( "/", 0 ) === 0 ? p : "/" + p;
                this.set( "path", p );
                return this.makeURL( );
            },
            setHost : function( host ) { 
                this.set( "host", String( host ) );
                return this.makeURL( );
            },
            setDbName : function( db, isWO ) { 
                const suff = "." + ( isWO ? "wikia.org" : "fandom.com" );
                const dbHost = String( db ) + suff;
                return this.setHost( dbHost );
            },
            addCb : function( ) { 
                this.setQuery( "cb", Date.now( ) );
                return this;
            },
            get : function( k ) { 
                return ( URL_PROPS.includes( k ) ? this : this.options )[ k ];
            },
            getAction : function( k ) { 
                return this.isFandomLink( ) ? ( this.getQuery( "action" ) ||
                    "view" ) : "";
            },
            getDbName : function( ) { 
                const pattern = getPattern( "dbName" );
                const a = Array.from( pattern.exec( this.host ) || [ ] );
                return a[ 1 ] || "";
            },
            getTitle : function( ) { 
                const p = getPattern( this.isWikiLink( ) ? "wikiTitle" :
                    "indexTitle" );
                const r = Array.from( p.exec( this.path ) || [ ] )[ 1 ] || "";
                const s = decodeURIComponent( r.split( "_" ).join( " " ) );
                return s;
            },
            matchDbName : function matchDbName( db, callback, ret ) { 
                const orig = this.getDbName( );
                const check = assertFrom( this, function( r ) { 
                    if ( !Array.isArray( r ) ) {
                        return isInstance( r, RegExp ) ? r.test( orig ) :
                            ( r === String( orig ) );
                    } else {
                        const a = Array.prototype.flat.call( r, Infinity );
                        return a.some( matchDbName, this );
                    }
                }, db );
                
                if ( check && typeof callback === "function" ) { 
                    const r = callback.call( this );
                    return ret && ( r !== void 0 ) ? r : check;
                } else {
                    return check;
                }
            },
            matchTitle : function matchTitle( title, callback, ret ) { 
                const orig = this.getTitle( );
                const check = assertFrom( this, function( r ) { 
                    if ( !Array.isArray( r ) ) {
                        return isInstance( r, RegExp ) ? r.test( orig ) :
                            ( r === String( orig ) );
                    } else {
                        const a = Array.prototype.flat.call( r, Infinity );
                        return a.some( matchTitle, this );
                    }
                }, title );
                
                if ( check && typeof callback === "function" ) { 
                    const r = callback.call( this );
                    return ret && ( r !== void 0 ) ? r : check;
                } else {
                    return check;
                }
            },
            decode : function( ) { 
                return decodeURIComponent( this );
            },
            encode : function( ) { 
                return encodeURIComponent( this );
            },
            plain : function( ) { 
                return ( this.protocol ? this.protocol + "//" : "" ) +
                    this.host + this.path + this.query +
                    ( this.hash ? "#" + this.hash : "" );
            },
            toString : function( ) { 
                return this.plain( );
            },
            goTo : function( ) { 
                window.location.href = this;
            },
            open : function( ) { 
                const a = Array.from( arguments );
                a.unshift( this );
                return window.open.apply( window, args );
            }
        },
        Query : function( referrer ) { 
            if ( !isInstance( this, WikiaURL.Query ) ) {
                return new WikiaURL.Query( referrer );
            }
            
            if ( !isInstance( referrer, WikiaURL ) ) {
                referrer = new WikiaURL( String( referrer ) );
            }
            
            if ( QUERY_CACHE.has( referrer ) ) { 
                return QUERY_CACHE.get( referrer );
            }
            
            this.referrer = referrer;
            this.query = { };
            
            QUERY_CACHE.set( referrer, this );
            
            Object.assign( this, { 
                constructor : WikiaURL.Query,
                set : function( k, v ) { 
                    if ( isObject( k ) ) { 
                        Object.keys( k ).forEach( function( key ) { 
                            const value = k[ key ];
                            this.query[ key ] = value || "";
                        } );
                    } else {
                        this.query[ k ] = String( v );
                    }
                },
                get : function getQuery( k ) { 
                    if ( Array.isArray( k ) ) { 
                        const a = Array.prototype.flat.call( k, Infinity );
                        return a.reduce( function( obj, key ) { 
                            obj[ key ] = getQuery.call( this, key );
                            return obj;
                        }.bind( this ), { } );
                    } else {
                        return this.has( k ) ? this.query[ k ] : "";
                    }
                },
                remove : function remove( k ) { 
                    if ( Array.isArray( k ) ) { 
                        const a = Array.prototype.flat.call( k, Infinity );
                        a.forEach( remove, this );
                    } else {
                        if ( this.has( k ) ) {
                            this.query[ k ] = void 0;
                            delete this.query[ k ];
                        }
                    }
                },
                has : function has( k ) { 
                    return assertFrom( this, function( key ) {
                        if ( Array.isArray( key ) ) {
                            const a = Array.prototype.flat.call( key, Infinity );
                            return a.every( has, this );
                        } else {
                            return this.query.hasOwnProperty( key );
                        }
                    }, k );
                },
                matches : function matches( key, matcher ) { 
                    return assertFrom( this, function( k ) { 
                        if ( isObject( k ) ) { 
                            return Object.keys( k ).every( function( _k ) { 
                                const _v = k[ _k ];
                                return matches.call( this, _k, _v );
                            }, this );
                        } else {
                            if ( !this.has( key ) ) return false;
                            const value = this.get( key );
                            const vIsPattern = isInstance( value, RegExp );
                            if ( !isInstance( matcher, Function ) ) { 
                                return isInstance( matcher, RegExp ) ?
                                    matcher.test( value ) :
                                    ( value === String( matcher ) );
                            } else {
                                return assertFrom( this, matcher, key, value );
                            }
                        }
                    } );
                },
                toString : function( ) { 
                    return ( isEmptyObject( this.query ) ? "" : "?" +
                        Object.keys( this.query ).map( function( key ) { 
                            const value = this.get( key );
                            return value ? key + "=" + String( value ) : "";
                        }, this ).filter( function( q ) { 
                            return q !== "";
                        } ).join( "&" ) );
                }
            } );
            return this;
        }
    } );
    
    window.WikiaURL = window.dev.url = WikiaURL;
    window.dev.urlquery = WikiaURL.Query;
    
    mw.hook( "dev.url" ).fire( window.dev.url );
    mw.hook( "dev.url.query" ).fire( window.dev.urlquery );
} )( this, this.mediaWiki );