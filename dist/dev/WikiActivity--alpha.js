/**
 * WikiActivity
 * 
 * Recreates the legacy Special:WikiActivity page
 * on the Unified Community Platform with a
 * modernized appearance.
 * 
 * Note: This script is in beta and will be made as a community project. 
 * If you need to make any changes that will be beneficial to the users
 * of this script, you are welcome to make them.
 * 
 * Author: Ultimate Dark Carnage (primary maintainer)
 * Version: v0.9a
 * 
 * TODO:
 * - Fix WikiActivity sorting
 * - UI options?
 * - More themes?
 * - Restore WikiaURL integration?
 * - Integration with existing WikiActivity scripts
 * - Fix image and category previews (partial)
 **/
 
// Creating the configuration object if it does not exist
window.rwaOptions = window.rwaOptions || { };

// Initializing the script via an IIFE
( function( window, $, mw ) { 
    "use strict";
    
    // Current script name
    const NAME = "WikiActivity";
    
    // Current script version
    const VERSION = "v1.0a";
    
    // Main configuration object
    const opts = window.rwaOptions;
    
    // MediaWiki configuration object
    const conf = mw.config.get( [
        "wgCityId",
        "wgNamespaceNumber",
        "wgFormattedNamespaces",
        "wgTitle",
        "wgSiteName",
        "wgUserGroups",
        "wgUserName",
        "wgScriptPath",
        "wgVersion" // Temp
    ] );
    
    // Current MediaWiki version
    const MWVERSION = parseFloat( conf.wgVersion );
    
    // TEMPORARY: If the wiki is on the legacy platform or is
    // already loaded, do not run
    if ( 
        MWVERSION === 1.19 ||
        window.WikiActivityLoaded
    ) return;
    
    // Double-run protection
    window.WikiActivityLoaded = true;
    
    // Core scripts
    const scripts = new Map( [ 
        [ "i18n", "u:dev:MediaWiki:I18n-js/code.js" ],
        [ "colors", "u:dev:MediaWiki:Colors/code.js" ],
        [ "wds", "u:dev:MediaWiki:WDSIcons/code.js" ],
        [ "dorui", "u:dev:MediaWiki:Dorui/code.js" ]
    ] );
    
    // Imports required scripts
    mw.loader.using( "mediawiki.util" ).then( function( ) { 
        scripts.forEach( function( script, name ) { 
            if ( window.dev[ name ] ) return;
            importArticle( { type : "script", article : script } );
        } );
        
        importArticle( {
            type : "style",
            article : "u:dev:MediaWiki:WikiActivity.css"
        } );
    } );
    
    // Core MediaWiki dependencies
    const deps = new Set( [ 
        "mediawiki.util",
        "mediawiki.api"
    ] );
    
    // This is a list of canonical limits
    const LIMITS = new Set( [ 
        5,
        10,
        25,
        50,
        100,
        250,
        500
    ] );
    
    // This is a list of namespaces to show
    const SUPPORTED_NS = new Set( [ 
        0, // Article (main)
        1, // Article talk
        2, // User
        3, // User talk
        4, // Project (or site name)
        5, // Project talk
        6, // File
        7, // File talk
        110, // Forum
        111, // Forum talk
        500, // User blog
        501, // User blog comment
        828, // Module
        829 // Module talk
    ] );
    
    // A list of talk namespaces
    const IS_TALK = new Set( [ 
        3,
        5,
        111,
        829
    ] );
    
    // A list of comment namespaces
    const IS_COMMENT = new Set( [ 
        3,
        5,
        111,
        501,
        829
    ] );
    
    // Default configurations for the main object
    const DEFAULTS = Object.freeze( { 
        // The limit of pages to show on the activity feed
        limit : 50,
        // A list of supported namespaces
        namespaces : Array.from( SUPPORTED_NS ).filter( function( n ) {
            return conf.wgFormattedNamespaces.hasOwnProperty( n );
        } ),
        // Determines whether to initialize the script automatically
        autoInit : true,
        // Sets the WikiActivity theme
        themeName : "main",
        // Determines whether bot edits should be shown
        showBotEdits : false,
        // Determines whether the activity feed should be loaded on a module
        loadModule : false,
        // Allows for custom rendering (when a theme is set)
        customRendering : { },
        // Determines whether the Recent Changes link on the wiki
        // header should be changed back to Wiki Activity.
        // Note: This option has been set to false by default for sitewide use.
        headerLink : false,
        // Determines whether the activity feed should automatically refresh
        refresh : false,
        // Delay for refreshing the activity feed
        // Default refresh period: 5 minutes
        refreshDelay : 5 * 60 * 1000,
        // The timeout for loading the activity feed
        timeout : 10 * 1000
    } );
    
    // A list of canonical subpages
    const SUBPAGES = new Set( [ 
        // The main activity feed page
        "main",
        // Watched pages only
        "watchlist",
        // Feeds activity
        "feeds",
        // Media activity
        "media"
    ] );
    
    // A list of user groups that can block
    const CAN_BLOCK = new Set( [ 
        "sysop",
        "staff",
        "wiki-manager",
        "helper",
        "soap",
        "global-discussions-moderator"
    ] );
    
    // A list of users that have moderator permissions
    const IS_MOD = new Set( [ 
        "sysop",
        "staff",
        "wiki-manager",
        "helper",
        "soap",
        "global-discussions-moderator",
        "discussion-moderator"
    ] );
    
    // A list of users that can rollback edits
    const CAN_ROLLBACK = new Set( [
        "sysop",
        "staff",
        "wiki-manager",
        "helper",
        "soap",
        "global-discussions-moderator",
        "discussion-moderator",
        "rollback"
    ] );
    
    // A cache of user avatars
    const AVATAR_CACHE = new Map( );
 
    // A group of icon names
    const ICON_NAMES = new Map( [ 
        [ "edit", "pencil" ],
        [ "new", "add" ],
        [ "comment", "comment" ],
        [ "talk", "bubble" ],
        [ "categorize", "tag" ],
        [ "diff", "clock" ],
        [ "options", "gear" ],
        [ "more", "more" ]
    ] );
    
    // Canonical activity types
    const TYPES = new Map( [ 
        [ "main", function( p, c ) { 
            const params = new Map( [ 
                [ "action", "query" ],
                [ "format", "json" ],
                [ "list", "recentchanges" ],
                [ "rcprop", [ 
                    "comment",
                    "timestamp",
                    "user",
                    "title",
                    "userid",
                    "ids"
                ] ],
                [ "rctype", [ 
                    "categorize",
                    "edit",
                    "new"
                ] ],
                [ "rcstart", ( new Date( ) ).toISOString( ) ],
                [ "rcdir", "older" ],
                [ "rclimit", p.limit ],
                [ "rcnamespace", p.namespaces ]
            ] );
            
            if ( p.allowBotEdits ) { 
                params.set( "rcshow", [ "!minor" ] );
            } else {
                params.set( "rcshow", [ "!minor", "!bot" ] );
            }
            
            if ( arguments.length > 1 ) { 
                params.set( "rccontinue", c );
                params[ "delete" ]( "rcstart" );
            }
            
            return ( new mw.Api( ) )
                .get( Object.fromEntries( params ) );
        } ],
        [ "watchlist", function( p, c ) { 
            const params = new Map( [ 
                [ "action", "query" ],
                [ "format", "json" ],
                [ "list", "watchlist" ],
                [ "wlprop", [ 
                    "comment",
                    "timestamp",
                    "user",
                    "title",
                    "userid",
                    "ids"
                ] ],
                [ "wltype", [ 
                    "categorize",
                    "edit",
                    "new"
                ] ],
                [ "wlstart", ( new Date( ) ).toISOString( ) ],
                [ "wldir", "older" ],
                [ "wllimit", p.limit ],
                [ "wlnamespace", p.namespaces ]
            ] );
            
            if ( p.allowBotEdits ) { 
                params.set( "wlshow", [ "!minor" ] );
            } else {
                params.set( "wlshow", [ "!minor", "!bot" ] );
            }
            
            if ( arguments.length > 1 ) { 
                params.set( "wlcontinue", c );
                params[ "delete" ]( "wlstart" );
            }
            
            return ( new mw.Api( ) )
                .get( Object.fromEntries( params ) );
        } ],
        [ "feeds", function( p, c ) { 
            return new Promise( function( res, rej ) { 
                const rx = new XMLHttpRequest( );
                
                rx.timeout = ( 30 * 1000 );
                
                rx.addEventListener( "timeout", function( ) { 
                    rej( "timeout" );
                } );
                
                rx.addEventListener( "readystatechange", function( ) { 
                    if ( rx.readyState === rx.DONE ) {
                        if ( rx.status === 200 ) {
                            const d = rx.response;
                            res( d._embedded[ "doc:posts" ] );
                        } else rej( "no-connection" );
                    }
                } );
                
                rx.responseType = "json";
                
                const sUrl = "https://services.fandom.com";
                
                const rUrl = new URL( 
                    "/discussion/" + conf.wgCityId + "/posts",
                    sUrl
                );
                
                const showDeleted = p.storage.get( "showDeleted" );
                
                const viewableOnly = ( p.isMod && !showDeleted ) ? true :
                    !p.isMod;
                
                const params = new Map( [ 
                    [ "limit", p.limit ],
                    [ "viewableOnly", viewableOnly ]
                ] );
                
                params.forEach( function( v, k ) { 
                    rUrl.searchParams.append( k, v );
                } );
                
                rx.open( "GET", rUrl, true );
                
                rx.setRequestHeader( "Accept", "application/hal+json" );
                
                rx.withCredentials = true;
                
                rx.send( );
            } );
        } ]/*,
        [ "media", function( p, c ) { } ]*/
    ] );
    
    
    // Activity type aliases
    const ALIASES = new Map( [ 
        [ new Set( [ "discussions", "d", "f" ] ), "feeds" ],
        [ new Set( [ "files", "images", "i" ] ), "media" ],
        [ new Set( [ "following", "w" ] ), "watchlist" ]
    ] );
    
    // Escaping RegExp characters
    function regesc( s ) { 
        return s.replace( /[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, "\\$&" );
    }
    
    // Parses the date object
    function parseDate( x ) { 
        var d = null;
        return !isNaN( ( 
            d = ( x instanceof Date ) ? 
                x : 
                new Date( x ) 
            ) 
            ) ?
            d : null;
    }
    
    // Checks if the value is a plain object
    function isPlainObject( o ) { 
        const ts = Object.prototype.toString;
        return ts.call( o ) === "[object Object]";
    }
    
    // Checks if the user is a member of a user group
    function isMember( groups ) { 
        if ( Array.isArray( groups ) ) {
            const a = new Set( groups.flat( Infinity ) );
            return Array.from( a ).some( isMember );
        } else if ( groups instanceof Set ) { 
            return Array.from( groups ).some( isMember );
        } else {
            return conf.wgUserGroups.includes( groups );
        }
    }
    
    // Creates the localStorage wrapper
    function WAStorage( ) { 
        // Sets the instance to a variable
        const ps = this;
        
        // Creates the storage prefix
        const psp = NAME + "-";
        
        // Parses JSON safely
        function safeJSONParse( s ) { 
            try { return JSON.parse( s ); }
            catch ( e ) { console.warn( e ); return s; }
        }
        
        // Gets the storage key
        function getStorageKey( k ) { 
            return arguments.length > 0 ? psp + k : "";
        }
        
        function watch( ) { 
            setInterval( function( ) { 
                const keys = Object.keys( localStorage )
                    .filter( function( s ) { 
                        if ( !s.startsWith( psp ) ) return false;
                        
                        const kv = localStorage.getItem( s );
                        
                        const kp = safeJSONParse( kv );
                        
                        return ( 
                            typeof kp === "object" &&
                            kp.hasOwnProperty( "expiry" ) &&
                            kp.hasOwnProperty( "value" )
                        );
                    } );
                
                Array.from( keys ).forEach( function( key ) { 
                    const value = safeJSONParse( localStorage.getItem( key ) );
                    
                    const expiry = value.expiry;
                    
                    const date = parseDate( expiry ).getTime( ) / 1000;
                    
                    const curr = Date.now( ) / 1000;
                    
                    const diff = date - curr;
                    
                    if ( diff < 1 ) localStorage.removeItem( key );
                } );
            }, 1000 );
        }
        
        // Gets the value from its key
        ps.get = function( k ) { 
            const pk = getStorageKey( k );
            
            if ( pk === "" ) return null;
            
            const pv = localStorage.getItem( pk );
            
            return safeJSONParse( pv );
        };
        
        p.set = function( k, v ) { 
            if ( 
                arguments.length === 1 &&
                typeof k === "object"
            ) { 
                return Object.keys( k ).some( function( key ) { 
                    const value = k[ key ];
                    return p.set( key, value );
                } );
            }
            
            const pk = getStorageKey( k );
            
            if ( pk === "" ) return false;
            
            const psr = JSON.stringify( v );
            
            localStorage.setItem( pk, v );
        };
        
        p.remove = function( k ) { 
            const pk = getStorageKey( k );
            localStorage.removeItem( sk );
        };
        
        p.clear = function( ) { 
            const k = Object.keys( localStorage ).filter( function( s ) { 
                return s.startsWith( psp );
            } );
            
            k.forEach( localStorage.removeItem );
        };
        
        p.store = function( o, d ) { 
            if ( 
                !isNaN( d ) &&
                isFinite( d )
            ) {
                d = Math.abs( parseInt( d ) );
                d = Date.now( ) + d;
            } else {
                d = parseDate( d );
                
                if ( isNaN( d ) ) d = Date.now( ) * ( 2 * 24 * 3600 * 1000 );
            }
            
            d = parseDate( d );
            
            Object.keys( o ).forEach( function( k ) { 
                const v = o[ k ];
                
                const r = new Map( [ 
                    [ "expiry", d.toISOString( ) ],
                    [ "value", v ]
                ] );
                
                p.set( k, Object.fromEntries( r ) );
            } );
        };
        
        p.fetch = function( k ) { 
            const pv = p.get( k );
            
            if ( 
                typeof pv === "object" &&
                pv.hasOwnProperty( "expiry" ) &&
                pv.hasOwnProperty( "value" )
            ) {
                return pv.value;
            } else {
                return pv;
            }
        };
        
        watch( );
    }
    
    // Creating the Recent Wiki Activity constructor
    function WikiActivity( o ) { 
        // If the constructor was initialized without using the
        // 'new' keyword, initialize the constructor anyway.
        if ( this.constructor !== WikiActivity ) {
            return new WikiActivity( o );
        }
        
        // Setting the current instance to a simple constant
        const p = this;
        
        // Title parts for WikiActivity
        const parts = conf.wgTitle.split( "/" );
 
        // The current subpage
        const subpage = parts[ 1 ] || "";
 
        // The custom wrapper for localStorage
        const storage = new WAStorage( );
        
        // Subpage patterns
        const subpagePatterns = new Map( );
 
        // Subpage keys
        const subpageKeys = Array
            .from( TYPES.keys( ) )
            .filter( function( k ) { 
                return k !== "main";
            } );
        
        // Creating a helper function to create the subpage pattern
        function getSubpagePattern( type, i18n ) { 
            const subpageName = i18n.msg( "page-" + type + "-subpage" )
                .plain( );
            const regexString = "^" + regesc( subpageName ) + "$";
            return new RegExp( regexString, "i" );
        }
        
        // Gets the current type
        function getType( s ) { 
            const e = Array.from( subpagePatterns.keys( ) );
            
            const r = e.find( function( k ) { 
                const v = subpagePatterns.get( k );
                
                const f = v.some( function( h ) { 
                    return h.test( s );
                } );
                
                return f;
            } );
            
            if ( r ) return r;
            
            return "main";
        }
        
        // Adding keys to subpage patterns
        const mt = { };
        
        p._loadDependencies = mw.loader.using( Array.from( DEPS ) );
        
        p._loadResources = Promise.all( 
            Array.from( scripts.keys( ) )
                .map( function( k ) { 
                    return new Promise( function( res, rej ) { 
                        mw.hook( 
                            k === "dorui" ? 
                            "doru.ui" :
                            "dev." + k 
                        ).add( res );
                    } );
                } )
        );
        
        p._load = Promise.all( [ 
            p._loadDependencies,
            p._loadResources
        ] );
        
        p._loadI18n = p._load.then( function( ) { 
            const i18n = window.dev.i18n;
            
            return i18n.loadMessages( NAME, { 
                noCache : true
            } );
        } );
        
        p._preload = p._loadI18n.then( function( i18n ) { 
            // The i18n instance for WikiActivity
            p.i18n = i18n;
            
            // Colors object
            p.colors = window.dev.colors;
            
            // UI object
            p.ui = window.dev.dorui;
            
            // WDSIcons object
            p.wds = window.dev.wds;
            
            // Adding keys to subpage patterns
            subpageKeys.forEach( function( k ) { 
                mt[ k ] = new Set( [ k ] );
            } );
            
            ALIASES.forEach( function( k, a ) { 
                if ( !mt[ k ] ) mt[ k ] = new Set( [ k ] );
                mt[ k ].add( a );
            } );
            
            function gsp( k ) { 
                return getSubpagePattern( k, i18n );
            }
            
            Object.keys( mt ).forEach( function( k ) { 
                const v = Array.from( mt[ k ] ).map( gsp );
                subpagePatterns.set( k, v );
            } );

            function matchPage( ) { 
                const title = i18n
                    .inContentLang( )
                    .msg( "page-title" )
                    .plain( );
                
                // Checks whether the page is a special page
                const isSpecial = conf.wgNamespaceNumber === -1;
    
                // Title parts
                const parts = conf.wgTitle.split( "/" );
    
                // The main title
                const mainTitle = parts[ 0 ];

                // Returns the boolean value
                return (
                    title === mainTitle ||
                    "WikiActivity" === mainTitle
                ) && isSpecial;
            }

            return matchPage( );
        } );

        p._preload.then( function( match ) { 
            if ( match ) { 
                p.start( );

                mw.hook( "ucp.wikiactivity.fallback" ).fire( p );
            } else {
                p.startFallback( );

                mw.hook( "ucp.wikiactivity.start" ).fire( p );
            }
        } );

        /* Core methods */
        p.start = function( ) { 
            // Sets the MediaWiki configuration value to WikiActivty
            mw.config.set( "wgCanonicalSpecialPageName", "WikiActivity" );

            // The list of entries to load
            p.entries = new Set( );

            // The length of entries
            p.length = 0;

            // Setting the target to the content area
            p.target = document.querySelector( "#mw-content-text" );

            // Initializes the script
            p.init = function( ) { 
                mw.hook( "ucp.wikiactivity.init" ).fire( p );

                // Sets the refresh timeout to null by default
                p.refreshTimeout = null;

                // Tab order
                const tabOrder = new Set( [ 
                    "main",
                    "watchlist",
                    "feeds",
                    "images"
                ] );

                // Creates the ActivityFeed UI
                p.fui = new FeedUI( p );

                // Adds tabs to the activity feed
                p.fui.createHeaderTabs( tabOrder );
            };
        };
    }
} );