/**
 * WikiActivity
 *
 * Recreates the legacy Special:WikiActivity page on the Unified
 * Community platform with a modernized appearance and a few
 * upgrades.
 *
 * Note: This script is a community project and is high-traffic.
 * If you know what you're doing and need to make any changes
 * that will impact the users of the script, you are welcome
 *
 * Author: Ultimate Dark Carnage
 * Version: v0.998b
 **/

// Creating the configuration object if it does not exist
window.rwaOptions = window.rwaOptions || { };

// Initializing the script via an IIFE
( function( window, $, mw ) {
    "use strict";

    // The script name
    const NAME = "WikiActivity";

    // Current script version
    const VERSION = "v1.0b";

    // Creating the options object
    const options = window.rwaOptions;

    // Creating the MediaWiki configuration object
    const conf = mw.config.get( [
        "wgCityId",
        "wgNamespaceNumber",
        "wgFormattedNamespaces",
        "wgTitle",
        "wgSiteName",
        "wgServer",
        "wgUserName",
        "wgUserGroups",
        "wgScriptPath",
        "wgVersion" // Temporary
    ] );

    // MediaWiki version (in floating point)
    const MW_VERSION = parseFloat( conf.mwVersion );

    // TEMPORARY: If this wiki is on the legacy platform, do not run
    if ( MW_VERSION === 1.19 ) return;

    // Creating the UCP object
    window.UCP = window.UCP || { };

    // Creating the Dev object
    window.dev = window.dev || { };

    // If this is not a special page or the script has been ran, do not run
    if (
        window.UCP.WikiActivity ||
        window.WikiActivityLoaded
    ) return;

    // Setting the loaded state to true
    window.WikiActivityLoaded = true;

    // Core scripts
    const scripts = new Map( [
        [ "i18n", "u:dev:MediaWiki:I18n-js/code.js" ],
        [ "colors", "u:dev:MediaWiki:Colors/code.js" ],
        [ "wds", "u:dev:MediaWiki:WDSIcons/code.js" ],
        [ "ui", "u:dev:MediaWiki:UI-js/code.js" ]
    ] );

    mw.loader.using( "mediawiki.util" ).then( function( ) {
        // Importing required scripts
        scripts.forEach( function( script, scriptName ) {
            if ( window.dev[ scriptName ] ) return;

            importArticle( { type : "script", article : script } );
        } );

        // Importing the core stylesheet
        importArticle( {
            type : "style",
            article : "u:dev:MediaWiki:WikiActivity.css"
        } );
    } );

    // Core MediaWiki dependencies
    const deps = Object.freeze( [
        "mediawiki.util",
        "mediawiki.api"
    ] );

    // This is a list of canonical limits
    const LIMITS = Object.freeze( [
        5,
        10,
        25,
        50,
        100,
        250,
        500
    ] );

    // This is a list of namespaces to show
    const SUPPORTED_NAMESPACES = Object.freeze( [
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
    const IS_TALK = Object.freeze( [
        3,
        5,
        111,
        829
    ] );

    // A list of comment namespaces
    const IS_COMMENT = Object.freeze( Array.from( IS_TALK ).concat( 501 ) );

    // Default configurations for the main object
    const DEFAULTS = Object.freeze( {
        // The limit of pages to show on the activity feed
        limit : 50,
        // A list of supported namespaces
        namespaces : Array.from( SUPPORTED_NAMESPACES ).filter( function( n ) {
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
    const SUBPAGES = Object.keys( [
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
    const CAN_BLOCK = Object.freeze( [
        "sysop",
        "staff",
        "wiki-manager",
        "helper",
        "soap",
        "global-discussions-moderator"
    ] );

    // A list of user groups that have moderator permissions
    const IS_MOD = Object.freeze( Array.from( CAN_BLOCK )
        .concat( "discussion-moderator", "threadmoderator" ) );

    // A list of users that can rollback edits
    const CAN_ROLLBACK = Object.freeze( Array.from( IS_MOD )
        .concat( "rollback" ) );

    // Escaping RegExp characters
    function regesc( s ) {
        return s.replace( /[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, "\\$&" );
    }

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
        [ "main", function( p, cont ) {
            const params = {
                action : "query",
                format : "json",
                list : "recentchanges",
                rcprop : [
                    "comment",
                    "timestamp",
                    "user",
                    "title",
                    "userid",
                    "ids"
                ],
                rctype : [
                    "categorize",
                    "edit",
                    "new"
                ],
                rcstart : ( new Date( ) ).toISOString( ),
                rcdir : "older",
                rcshow : [ "!minor" ],
                rclimit : p.limit,
                rcnamespace : p.namespaces
            };

            if ( !p.allowBotEdits ) {
                params.rcshow.push( "!bot" );
            }

            if ( cont ) {
                params.rccontinue = cont;
                delete params.rcstart;
            }

            return ( new mw.Api( ) ).get( params );
        } ],
        [ "watchlist", function( p, cont ) {
            const params = {
                action : "query",
                format : "json",
                list : "watchlist",
                wlprop : [
                    "comment",
                    "timestamp",
                    "user",
                    "title",
                    "userid",
                    "ids"
                ],
                wltype : [
                    "categorize",
                    "edit",
                    "new"
                ],
                wlstart : ( new Date( ) ).toISOString( ),
                wldir : "older",
                wlshow : [ "!minor" ],
                wllimit : p.limit,
                wlnamespace : p.namespaces
            };

            if ( !p.allowBotEdits ) {
                params.wlshow.push( "!bot" );
            }

            if ( cont ) {
                params.wlcontinue = cont;
                delete params.wlstart;
            }

            return ( new mw.Api( ) ).get( params );
        } ],
        /* [ "images", function( p, cont ) {
            return ( new mw.Api( ) ).get( {
                action : "query",
                list : "logevents",
                leprop : [
                    "title",
                    "userid",
                    "timestamp",
                    "comment"
                ],
                ledir : "older",
                lelimit : p.limit,
                letype : "upload",
                leaction : "upload/upload",
                leend : ( new Date( ) ).toISOString( ),
                format : "json"
            } );
        } ],*/
        [ "feeds", function( p ) {
            return new Promise( function( res, rej ) {
                const req = new XMLHttpRequest( );

                req.timeout = 30000;

                req.addEventListener( "timeout", function( ) {
                    rej( "timeout" );
                } );

                req.addEventListener( "readystatechange", function( ) {
                    if ( req.readyState === req.DONE ) {
                        if ( req.status === 200 ) {
                            const data = req.response;
                            res( data._embedded[ "doc:posts" ] );
                        } else {
                            rej( "no-connection" );
                        }
                    }
                } );

                req.responseType = "json";

                const servicesURL = "https://services.fandom.com";

                const reqURL = new URL( "/discussion/" + conf.wgCityId + "/posts", servicesURL );

                const showDeleted = p.storage.get( "showDeleted" );

                const viewableOnly = ( p.isMod && !showDeleted ) ? true :
                    !p.isMod;

                const params = new Map( [
                    [ "limit", p.limit ],
                    [ "viewableOnly", viewableOnly ]
                ] );

                params.forEach( function( v, k ) {
                    reqURL.searchParams.append( k, v );
                } );

                req.open( "GET", reqURL, true );

                req.setRequestHeader( "Accept", "application/hal+json" );

                req.withCredentials = true;

                req.send( );
            } );
        } ]
    ] );

    // Aliases for activity types
    const ALIASES = new Map( [
        [ "discussions", "feeds" ],
        [ "files", "images" ],
        [ "following", "watchlist" ]
    ] );

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

    // Creating the storage constructor
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

        ps.set = function( k, v ) {
            if (
                arguments.length === 1 &&
                typeof k === "object"
            ) {
                return Object.keys( k ).some( function( key ) {
                    const value = k[ key ];
                    return ps.set( key, value );
                } );
            }

            const pk = getStorageKey( k );

            if ( pk === "" ) return false;

            const psr = JSON.stringify( v );

            localStorage.setItem( pk, psr );
        };

        ps.remove = function( k ) {
            const pk = getStorageKey( k );
            localStorage.removeItem( sk );
        };

        ps.clear = function( ) {
            const k = Object.keys( localStorage ).filter( function( s ) {
                return s.startsWith( psp );
            } );

            k.forEach( localStorage.removeItem );
        };

        ps.store = function( o, d ) {
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

                ps.set( k, Object.fromEntries( r ) );
            } );
        };

        ps.fetch = function( k ) {
            const pv = ps.get( k );

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

    // Checks if the value is a plain object
    function isPlainObject( o ) {
        const ts = Object.prototype.toString;
        return ts.call( o ) === "[object Object]";
    }

    // Creating the Recent Wiki Activity constructor
    function WikiActivity( o, i18n ) {
        // If the constructor was initialized without using the
        // 'new' keyword, initialize the constructor anyway.
        if ( this.constructor !== WikiActivity ) {
            return new WikiActivity( o, i18n );
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
        function getSubpagePattern( type ) {
            const subpageName = i18n.msg( "page-" + type + "-subpage" )
                .plain( );
            const regexString = "^" + regesc( subpageName ) + "$";
            return new RegExp( regexString, "i" );
        }

        // Adding keys to subpage patterns
        const mt = { };

        subpageKeys.forEach( function( k ) {
            mt[ k ] = [ k ];
        } );

        ALIASES.forEach( function( k, a ) {
            if ( !mt[ k ] ) mt[ k ] = [ k ];

            mt[ k ].push( a );
        } );

        Object.keys( mt ).forEach( function( k ) {
            const v = mt[ k ].map( getSubpagePattern );

            subpagePatterns.set( k, v );
        } );

        function getType( s ) {
            const e = Array.from( subpagePatterns.keys( ) );

            const r = e.find( function( k ) {
                const v = subpagePatterns.get( k );

                const f = v.some( function( h ) {
                    return h.test( s );
                } );

                return f;
            } );

            if ( !r ) return "main";

            return r;
        }

        function isMember( groups ) {
            if ( Array.isArray( groups ) ) {
                const g = Array.from( groups ).flat( Infinity );
                return g.some( isMember );
            } else {
                return conf.wgUserGroups.includes( groups );
            }
        }

        function timeago( x, p, calcDiff ) {
            const diff = calcDiff ? (
                Math.floor( Date.now( ) ) -
                ( new Date( x * 1000 ) )
            ) / 1000 : Number( x );

            if ( isNaN( diff ) ) return "";

            const minutes = Math.round( diff / 60 );

            const hours = Math.round( minutes / 60 );

            const days = Math.round( hours / 24 );

            const months = Math.round( days / 30 );

            const years = Math.round( months / 12 );

            const prefix = "timeago-", suffix = "-ago";

            if ( diff < 5 ) {
                return p.msg( prefix + "justnow" ).parse( );
            } else if ( diff < 60 ) {
                return p.msg( prefix + "seconds" + suffix, diff ).parse( );
            } else if ( minutes < 2 ) {
                return p.msg( prefix + "minute" + suffix ).parse( );
            } else if ( minutes < 60 ) {
                return p.msg( prefix + "minutes" + suffix, minutes ).parse( );
            } else if ( hours < 2 ) {
                return p.msg( prefix + "hour" + suffix ).parse( );
            } else if ( hours < 24 ) {
                return p.msg( prefix + "hours" + suffix, hours ).parse( );
            } else if ( days < 2 ) {
                return p.msg( prefix + "day" + suffix ).parse( );
            } else if ( days < 30 ) {
                return p.msg( prefix + "days" + suffix, days ).parse( );
            } else if ( months < 2 ) {
                return p.msg( prefix + "month" + suffix ).parse( );
            } else if ( months < 12 ) {
                return p.msg( prefix + "months" + suffix, months ).parse( );
            } else if ( years < 2 ) {
                return p.msg( prefix + "year" + suffix ).parse( );
            } else {
                return p.msg( prefix + "years" + suffix, years ).parse( );
            }
        }

        // Sets default options
        p.options = Object.assign( { }, DEFAULTS );

        // Setting the storage to the current instance
        p.storage = storage;

        // Determines whether the script has been loaded
        p.loaded = false;

        // Determines whether the script is loading
        p.loading = false;

        // Determines whether the user can block
        p.canBlock = isMember( CAN_BLOCK );

        // Determines whether the user has moderator permissions
        p.isMod = p.canDelete = isMember( IS_MOD );

        // Creating a shortcut to i18n.msg
        p.msg = function( ) {
            const a = Array.from( arguments );

            const i18nWA = p.i18n;

            return i18nWA.msg.apply( i18nWA, a );
        };

        // Determines whether the user has rollback permissions
        p.canRollback = isMember( CAN_ROLLBACK );

        // The I18n object
        p.i18n = i18n;

        // The current activity type
        p.type = getType( subpage );

        // Fetches the time difference
        p.getTimeDiff = function( x ) {
            const d = parseDate( x );

            if ( d === null ) return d;

            const t = Date.now( );

            return Math.floor( ( t - d ) / 1000 );
        };

        // Configures all properties
        p.configure = function( ) {
            if ( arguments.length === 0 ) return null;

            const r = Object( arguments[ 0 ] );

            Object.keys( r ).forEach( function( k ) {
                const g = p.options[ k ], v = r[ k ];

                if ( v === void 0 ) p.options[ k ] = g;

                else p.options[ k ] = v;
            } );
        };

        // Gets the WikiActivity URL
        p.getURL = function( ) {
            // The "Special" namespace
            const ns = conf.wgFormattedNamespaces[ -1 ];

            // The "Wiki Activity" title
            const title = p.i18n
                .inContentLang( )
                .msg( "page-title" )
                .plain( );

            // Returns the WikiActivity URL
            return mw.util.getUrl( ns + ":" + title );
        };

        // Checks if the page matches
        p.matchPage = function( ) {
            // The primary page title
            const title = p.i18n
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
            return ( title === mainTitle || "WikiActivity" === mainTitle ) && isSpecial;
        };

        /* Core methods */
        p.start = function( ) {
            // Sets the MediaWiki config value to WikiActivity
            mw.config.set( "wgCanonicalSpecialPageName", "WikiActivity" );

            // The list of entries to load
            p.entries = [ ];

            // The length of entries
            p.length = 0;

            // Setting the target to the content area
            p.target = document.querySelector( "#mw-content-text" );

            // Loads all required resources
            p.load = function( ) {
                if ( arguments.length === 1 ) {
                    p.limit = Math.max( 5, Math.min( arguments[ 0 ], 500 ) );

                    if ( isNaN( p.limit ) ) p.limit = 50;
                }

                mw.hook( "ucp.wikiactivity.load" ).fire( p );

                p.loading = true;

                p.target.innerHTML = "";

                Promise.all( [ "colors", "wds", "ui" ].map( function( k ) {
                    return new Promise( function( res, rej ) {
                        mw.hook( "dev." + k ).add( res );
                    } );
                } ) ).then( p.init );
            };

            // Initializes the script
            p.init = function( ) {
                mw.hook( "ucp.wikiactivity.init" ).fire( p );

                // Sets the refresh timeout to null by default
                p.refreshTimeout = null;

                // WDSIcons
                p.wds = window.dev.wds;

                // Colors
                p.colors = window.dev.colors;

                // UI-js
                p.uijs = window.dev.ui;

                // Creates the Activity Feed UI
                p.ui = new FeedUI( p );

                // Adding header tabs
                const tabOrder = Object.freeze( [
                    "main",
                    "watchlist",
                    "feeds",
                    "images"
                ] );

                const tabItems = Array
                    .from( tabOrder )
                    .sort( function( a, b ) {
                        const ai = tabOrder.indexOf( a );
                        const bi = tabOrder.indexOf( b );

                        return ai - bi;
                    } );

                p.ui.addHeaderTabs( tabItems );

                // Adds the loading spinner
                p.ui.addSpinner( );

                // Overwrites the document and header titles
                p.overwriteTitle( );

                // Sets the theme for WikiActivity
                p.setTheme( );

                // Loads data by type
                p.loadData( );
            };

            // Fetches the key for the heading and document titles
            p.getTitles = function( ) {
                const type = p.type;

                const o = { doc : "", heading : "" };

                if ( type === "main" ) {
                    o.doc = "doc-title";
                    o.heading = "heading-title";
                } else {
                    o.doc = "doc-" + type + "-title";
                    o.heading = "doc-" + type + "-heading";
                }

                return o;
            };

            // Overwrites existing titles
            p.overwriteTitle = function( ) {
                // Title key
                const title = p.getTitles( );

                // Changes the original document title to
                // the WikiActivity title
                document.title = p.msg( title.doc, conf.wgSiteName )
                    .escape( );

                // Changes the original heading title to the
                // WikiActivity title
                document.querySelector( ".page-header__title" )
                    .textContent = p.msg( title.heading ).escape( );
            };

            // Gets the current theme name
            p.getTheme = function( ) {
                return typeof p.themeName === "string" ? p.themeName : "main";
            };

            // Sets the theme
            p.setTheme = function( ) {
                // Fetches the theme name
                const themeName = p.getTheme( );

                // Sets the theme name
                p.themeName = themeName;

                // Sets the theme to the data attribute
                p.ui.setTheme( themeName );

                // Checks if the page color is bright
                const isBright = p.colors.parse( p.colors.fandom.page )
                    .isBright( );

                // Creates the initial theme object
                p.theme = { };

                // Link color
                p.theme.link = p.colors.parse( p.colors.fandom.link );

                // Background color
                p.theme.backgroundColor = p.colors.parse( p.colors.fandom.page )
                    .lighten( 45 * ( isBright ? 1 : -1 ) );

                // Border color for edited changes
                p.theme.edit = p.colors.parse( "#feaf09" );

                // Border color for comments
                p.theme.comment = p.colors.parse( "#dddddd" );

                // Border color for new pages
                p.theme[ "new" ] = p.colors.parse( "deepskyblue" );

                // Border color for new categories
                p.theme.categorize = p.colors.parse( "#b76801" );

                // Creates a new stylesheet
                p.colors.css( ":root { " +
                    "--wa-edit: $edit;" +
                    "--wa-comment: $comment;" +
                    "--wa-new: $new;" +
                    "--wa-categorize: $categorize;" +
                    "--wa-background__color: $backgroundColor;" +
                    "--wa-link__color: $link;" +
                "}", p.theme );
            };

            // Fetches the proper ajax for a certain type
            p.getAjax = function( ) {
                var a;
                if ( TYPES.has( p.type ) ) {
                    a = TYPES.get( p.type );
                } else {
                    a = TYPES.get( "main" );
                }

                return a( p );
            };

            // Fetches the proper ajax for a certain type
            p.getAjaxCont = function( cont ) {
                var a;
                if ( TYPES.has( p.type ) ) {
                    a = TYPES.get( p.type );
                } else {
                    a = TYPES.get( "main" );
                }

                return a( p, cont );
            };

            // Loads data for all changes
            p.loadData = function( ) {
                mw.hook( "ucp.wikiactivity.load" ).fire( p );

                // Main and watchlist types
                const mainWLTypes = Object.freeze( [
                    "main",
                    "watchlist"
                ] );

                // If the activity type is main or watchlist,
                // handle data the regular way
                if ( mainWLTypes.includes( p.type ) ) {
                    p.loadChanges( );
                } else if ( p.type === "feeds" ) {
                    p.loadFeeds( );
                } else if ( p.type === "images" ) {
                    p.loadImageUpload( );
                } else {
                    p.type = "main";
                    p.loadChanges( );
                }
            };

            // Loads more data for all changes
            p.loadMore = function( ) {
                // Main and watchlist types
                const mainWLTypes = Object.freeze( [
                    "main",
                    "watchlist"
                ] );

                // If the activity type is main or watchlist,
                // handle data the regular way
                if ( mainWLTypes.includes( p.type ) ) {
                    p.loadMoreChanges( );
                } else if ( p.type === "feeds" ) {
                    p.loadMoreFeeds( );
                } else if ( p.type === "images" ) {
                    p.loadMoreImageUpload( );
                } else {
                    p.type = "main";
                    p.loadMoreChanges( );
                }
            };

            /* Recent Changes and Watchlist */
            // Loads data from recent changes or watchlist
            p.loadChanges = function( ) {
                // Fetches ajax from recent changes or watchlist
                const ajax = p.ajax = p.getAjax( );

                // Creates a new promise for handling queries
                const qp = new Promise( function( res, rej ) {
                    ajax.then( p.handleChanges )
                        .then( res )
                        [ "catch" ]( rej );
                } );

                qp.then( p.handleData )
                    [ "catch" ]( p.handleLoadException );
            };

            // Handles results from changes
            p.handleChanges = function( response ) {
                if ( response.error ) throw new ReferenceError( resposne );

                // Current key for types
                const k = p.type === "main" ? "recentchanges" : p.type;

                // Fetches the query
                const query = response.query, result = query[ k ];

                // Continue prefix
                const cp = p.type === "main" ? "rc" : "wl";

                // Continue key
                const ck = cp + "continue";

                // Continue object
                const contO = response.continue || null;

                // Continue string
                const cont = contO && contO[ ck ];

                if ( contO && cont ) {
                    p._hasContinue = true;
                    p._continue = cont;
                } else {
                    p._hasContinue = false;
                }

                return result;
            };

            // Loads more changes when triggered
            p.loadMoreChanges = function( ) {
                // If no continue string is found, do not run
                if ( !p._hasContinue ) return;

                // Fetches ajax from recent changes or watchlist
                const ajax = p.ajax = p.getAjaxCont( p._continue );

                // Creates a new promise for handling queries
                const qp = new Promise( function( res, rej ) {
                    ajax.then( p.handleChanges )
                        .then( res )
                        [ "catch" ]( rej );
                } );

                qp.then( p.handleData )
                    [ "catch" ]( p.handleLoadException );
            };

            // Handles data from recent changes or watchlist
            p.handleData = function( v ) {
                Promise
                    .all( Array.from( v ).map( p.loadEntryData ) )
                    .then( p.render );
            };

            // Loads data from individual recent changes entries
            p.loadEntryData = function( entry ) {
                const params = new Map( [
                    [ "user", entry.user ],
                    [ "title", entry.title ],
                    [ "userid", entry.userid ],
                    [ "revid", entry.revid ],
                    [ "oldid", entry.old_revid ],
                    [ "summary", entry.comment ],
                    [ "ns", entry.ns ],
                    [ "time", entry.timestamp ],
                    [ "isComment", IS_COMMENT.includes( entry.ns ) ],
                    [ "isTalk", IS_TALK.includes( entry.ns ) ]
                ] );

                if ( params.get( "isComment" ) ) {
                    params.set( "type", "comment" );
                    params.set( "trueType", entry.type );
                } else {
                    params.set( "type", entry.type );
                    params.set( "trueType", entry.type );
                }

                if ( params.get( "trueType" ) === "new" ) {
                    const w = p.msg( "created-with" ).escape( );
                    const r = params.get( "summary" ).startsWith( w );

                    if ( r ) {
                        const l = w.length;
                        const s = params.get( "summary" );

                        const u = s.slice( l )
                            .trim( )
                            .replace( /^\"\s*|\s*\"$/g, "" )
                            .trim( );

                        params.set( "summary", u );
                    }
                }

                const c = p.parseSummary( params.get( "summary" ) );
                const d = p.getTimeDiff( params.get( "time" ) );

                params.set( "summary", c.trim( ) );
                params.set( "timeDiff", d );

                const esp = /^\/\*\s*(.*)\s*\*\/$/;

                const e = esp.test( params.get( "summary" ) );

                params.set( "editedSection", e );

                if ( params.get( "editedSection" ) ) {
                    const t = params.get( "summary" );

                    const v = t.replace( esp, "$1" ).trim( );

                    params.set( "type", "edited-section" );

                    params.set( "summary", v );
                }

                return p.generateRevisions( params );
            };

            // If there is no old revision ID, proceed with generating an individual entry
            p.generateRevisions = function( params ) {
                const f = params.get( "oldid" ) === 0 ?
                    "generateEntryData" :
                    "compareRevisions";

                return p[ f ]( params );
            };

            // Compares revisions and finds data for each revision
            p.compareRevisions = function( params ) {
                const oldid = params.get( "oldid" );
                const revid = params.get( "revid" );

                const revids = [ oldid, revid ];

                const ajax = p.compareRevisionsAjax( revids );

                return new Promise( function( res, rej ) {
                    ajax.then( function( response ) {
                        const query = response.query;

                        const missing = query.pages.hasOwnProperty( "-1" );

                        if ( missing ) {
                            return p.generateEntryData( params ).then( res );
                        }

                        const pageid = query.pageids[ 0 ];

                        const page = query.pages[ pageid ];

                        const rev = page.revisions;

                        if ( rev.length === 0 ) {
                            return p.generateEntryData( params ).then( res );
                        }

                        const or = rev.find( function( r ) {
                            return r.revid === oldid;
                        } );

                        const nr = rev.find( function( r ) {
                            return r.revid === revid;
                        } );

                        const omain = or.slots.main;

                        const nmain = nr.slots.main;

                        const owikitext = omain.contentmodel === "wikitext";

                        const nwikitext = nmain.contentmodel === "wikitext";

                        if ( owikitext && nwikitext ) {
                            const oc = omain[ "*" ];

                            const nc = nmain[ "*" ];

                            const catp = new RegExp(
                                "\\[\\[(" + conf.wgFormattedNamespaces[ 14 ] +
                                ":[^\\[\\]\\|]+)(?:\\s*\\|.*)?\\]\\]", "g"
                            );

                            const filp = new RegExp(
                                "\\[\\[(" + conf.wgFormattedNamespaces[ 6 ] +
                                ":[^\\[\\]\\|]+)(?:\\s*\\|.*)?\\]\\]", "g"
                            );

                            const tp = new RegExp(
                                "\\{\\{([^\\{\\}\\|]+)(?:\\|.*)?\\}\\}", "g"
                            );

                            const ocat = ( oc.match( catp ) || [ ] )
                                .map( function( n ) {
                                    return n.replace( catp, "$1" );
                                } );

                            const ncat = ( nc.match( catp ) || [ ] )
                                .map( function( n ) {
                                    return n.replace( catp, "$1" );
                                } );

                            const ofil = ( oc.match( filp ) || [ ] )
                                .map( function( n ) {
                                    return n.replace( filp, "$1" );
                                } );

                            const nfil = ( nc.match( filp ) || [ ] )
                                .map( function( n ) {
                                    return n.replace( filp, "$1" );
                                } );

                            const otem = ( oc.match( tp ) || [ ] )
                                .map( function( n ) {
                                    return n.replace( tp, "$1" );
                                } );

                            const ntem = ( nc.match( tp ) || [ ] )
                                .map( function( n ) {
                                    return n.replace( tp, "$1" );
                                } );

                            const categories = ncat.filter( function( n ) {
                                return !ocat.includes( n );
                            } );

                            const files = nfil.filter( function( n ) {
                                return !ofil.includes( n );
                            } );

                            const templates = ntem.filter( function( n ) {
                                return !otem.includes( n );
                            } );

                            params.set( "categories", categories );

                            if ( params.get( "categories" ).length ) {
                                params.set( "type", "categorize" );
                            }

                            params.set( "templates", templates );

                            if ( files.length > 0 ) {
                                p.fetchImageInfo( files, params, res );
                            } else {
                                params.set( "images", [ ] );
                                p.handleEntryData( params, res );
                            }
                        } else {
                            return p.generateEntryData( params ).then( res );
                        }
                    } );
                } );
            };

            // Ajax for comparing revisions to each other
            p.compareRevisionsAjax = function( revids ) {
                return new Promise( function( res, rej ) {
                    return ( new mw.Api( ) ).get( {
                        action : "query",
                        prop : "revisions",
                        rvprop : [ "content", "ids" ],
                        rvslots : "*",
                        revids : revids,
                        indexpageids : true
                    } ).done( res ).fail( rej );
                } );
            };

            // Parses the summary
            p.parseSummary = function( s ) {
                s = mw.html.escape( s );

                const replacers = new Map( [
                    [ /\[\[([^\[\]\|]+)\|([^\[\]]+)\]\]/g, function( m, r1, r2 ) {
                        const a = document.createElement( "a" );
                        const url = mw.util.getUrl( r1 );
                        a.setAttribute( "href", url );
                        a.innerText = r2;
                        return a.outerHTML;
                    } ],
                    [ /\[\[([^\[\]]+)\]\]/g, function( m, r1 ) {
                        const a = document.createElement( "a" );
                        const url = mw.util.getUrl( r1 );
                        a.setAttribute( "href", url );
                        a.innerText = r1;
                        return a.outerHTML;
                    } ]
                ] );

                replacers.forEach( function( value, pattern ) {
                    s = s.replace( pattern, value );
                } );

                return s;
            };

            // Generates the required AJAX object for
            // generating entry data.
            p.generateDataAjax = function( revid ) {
                return new Promise( function( res, rej ) {
                    ( new mw.Api( ) ).get( {
                        action : "query",
                        prop : [
                            "categories",
                            "images"
                        ].join( "|" ),
                        revids : revid,
                        indexpageids : true,
                        format : "json"
                    } ).done( res ).fail( rej );
                } );
            };

            // Generates data from a feed entry
            p.generateEntryData = function( params ) {
                const revid = params.get( "revid" );

                const ajax = p.generateDataAjax( revid );

                return new Promise( function( res, rej ) {
                    ajax.then( function( d ) {
                        const pageid = d.query.pageids[ 0 ];

                        const missing = d.query.hasOwnProperty( "-1" );

                        if ( missing ) {
                            p.handleEntryData( params, res );
                        } else {
                            const page = d.query.pages[ pageid ];

                            p.handleEntryInfo( page, params, res );
                        }
                    } );
                } );
            };

            // Handles info fetched from the feed entry
            p.handleEntryInfo = function( page, params, callback ) {
                const categories = Array.from( page.categories || [ ] )
                    .map( function( c ) { return c.title; } );

                const files = Array.from( page.images || [ ] )
                    .map( function( f ) { return f.title; } );

                params.set( "categories", categories );

                p.fetchTemplates( files, params, callback );
            };

            // Fetches templates from the page
            p.fetchTemplates = function( files, params, callback ) {
                const ajax = p.fetchTemplatesAjax( params );

                ajax.done( function( response ) {
                    const query = response.query;
                    const missing = query.pages.hasOwnProperty( "-1" );

                    if ( !missing ) {
                        const pageid = query.pageids[ 0 ];
                        const page = query.pages[ pageid ];
                        const revisions = page.revisions;

                        if ( revisions.length === 0 ) {
                            params.set( "templates", [ ] );
                        } else {
                            const revision = revisions[ 0 ];
                            const main = revision.slots.main;

                            const content = main[ "*" ];

                            const tPattern = new RegExp(
                                "\\{\\{([^\\{\\}\\|]+)(?:\\|.*)?\\}\\}", "g"
                            );

                            const t = content.match( tPattern ) || [ ];

                            const templates = t.map( function( n ) {
                                return n.replace( tPattern, "$1" );
                            } );

                            params.set( "templates", templates );
                        }
                    } else {
                        params.set( "templates", [ ] );
                    }

                    if ( files.length ) {
                        // If any images exists, get info
                        p.fetchImageInfo( files, params, callback );
                    } else {
                        // Otherwise, immediately handle the entry data
                        params.set( "images", [ ] );
                        p.handleEntryData( params, callback );
                    }
                } );
            };

            // Ajax for fetching templates from the page content
            p.fetchTemplatesAjax = function( params ) {
                return ( new mw.Api( ) ).get( {
                    action : "query",
                    prop : "revisions",
                    rvprop : "content",
                    rvslots : "*",
                    revids : params.get( "revid" ),
                    indexpageids : true,
                    format : "json"
                } );
            };

            // Fetches the required AJAX for fetching image info
            p.fetchImageInfoAjax = function( files ) {
                return new Promise( function( res, rej ) {
                    return ( new mw.Api( ) ).get( {
                        action : "query",
                        prop : "imageinfo",
                        iiprop : "url",
                        titles : files,
                        indexpageids : true,
                        format : "json"
                    } ).done( res ).fail( rej );
                } );
            };

            // Fetches image file URL and source from files
            p.fetchImageInfo = function( files, params, callback ) {
                const ajax = p.fetchImageInfoAjax( files );

                ajax.then( function( d ) {
                    const pageids = d.query.pageids;

                    const missing = d.query.pages[ "-1" ];

                    if ( missing ) {
                        params.set( "images", [ ] );
                    } else {
                        const images = Array.from( pageids ).map( function( pageid ) {
                            const file = d.query.pages[ pageid ];

                            const fileParams = new Map( [
                                [ "src", file.imageinfo[ 0 ].url ],
                                [ "url", file.imageinfo[ 0 ].descriptionurl ],
                                [ "title", file.title ]
                            ] );

                            return fileParams;
                        } );

                        params.set( "images", images );
                    }

                    // Now we can handle the data from our entry
                    p.handleEntryData( params, callback );
                } );
            };

            // Handle an individual entry and inserts them into the array
            p.handleEntryData = function( params, callback ) {
                // Fetches the user's avatar
                p.fetchAvatar( params )
                    .then( function( avatar ) {
                        params.set( "avatar", avatar );
                        return p.addEntry( params );
                    } )
                    .then( callback );
            };

            // Inserts an entry into the array
            p.addEntry = function( params ) {
                const entry = p.makeFeedEntry( params );
                p.length = p.entries.push( entry );
                return entry;
            };

            // Fetches the name of the icon
            p.fetchIconName = function( type ) {
                if ( ICON_NAMES.has( type ) ) {
                    return type;
                } else {
                    return "edit";
                }
            };

            // Makes feed entry
            p.makeFeedEntry = function( params ) {
                const type = params.get( "type" );
                const iconName = p.fetchIconName( type );

                params.set( "icon", iconName );

                const editedKey = ( type === "new" ) ?
                    "created" :
                    "edited";

                params.set( "editedKey", editedKey );

                const timediff = params.get( "timeDiff" );

                const t = timeago( timediff, p );

                params.set( "timeago", t );

                params.set( "hasDiff", params.get( "oldid" ) !== 0 );

                const isTalk = params.get( "isTalk" );

                const skm = new Map( [
                    [ "edited-section", ( isTalk && type === "edit" ) ],
                    [ "new-page", type === "new" ],
                    [ "summary", true ] // default key
                ] );

                const sk = Array.from( skm.keys( ) ).find( function( k ) {
                    const c = skm.get( k );

                    return c === true;
                } );

                params.set( "summaryKey", sk );

                return params;
            };

            // Generates the avatar from the user who made the edit
            p.fetchAvatar = function( params ) {
                const userid = params.get( "userid" );

                return new Promise( function( res, rej ) {
                    // Inserts the avatar into the cache if it does not exist
                    if ( AVATAR_CACHE.has( userid ) ) {
                        res( AVATAR_CACHE.get( userid ) );
                    } else {
                        const ajax = p.generateAvatar( userid );

                        ajax.then( function( a ) {
                            AVATAR_CACHE.set( userid, a );
                            res( a );
                        } );
                    }
                } );
            };

            // Creating required AJAX for generating an avatar
            p.fetchUserDataAjax = function( userid ) {
                return $.get( mw.util.wikiScript( "wikia" ), {
                    controller : "UserProfile",
                    method : "getUserData",
                    userId : userid,
                    format : "json"
                } );
            };

            // Fetches the user data from AJAX
            p.generateAvatar = function( userid ) {
                return new Promise( function( res, rej ) {
                    p.fetchUserDataAjax( userid )
                        .done( function( d ) {
                            const user = d.userData;
                            res( user.avatar );
                        } );
                } );
            };

            // Handles exception for loading recent changes
            p.handleRCLoadException = function( exception ) {
                p.renderException( "failed", exception );
            };

            // Renders activity feed
            p.render = function( ) {
                if (
                    p.themeName !== "main" ||
                    p.themeName !== void 0
                ) {
                    p.ui.setTheme( p.themeName );
                }

                // Main and watchlist types
                const mainWLTypes = Object.freeze( [
                    "main",
                    "watchlist"
                ] );

                // If the activity type is main or watchlist,
                // handle data the regular way
                if ( mainWLTypes.includes( p.type ) ) {
                    p.renderChanges( );
                } else if ( p.type === "feeds" ) {
                    p.renderFeeds( );
                } else if ( p.type === "images" ) {
                    p.renderImages( );
                } else {
                    p.renderChanges( );
                }

                mw.hook( "ucp.wikiactivity.render" ).fire( p, p.ui );

                p.loading = false;

                p.loaded = true;

                if ( p.refresh ) {
                    p.refreshTimeout = setTimeout( function( ) {
                        clearTimeout( p.refreshTimeout );

                        p.refreshTimeout = null;

                        p.ui.addSpinner( );

                        p.load( );
                    }, p.refreshDelay );
                }
            };

            // Renders recent changes and watchlist
            p.renderChanges = function( ) {
                const entries = p.entries.sort( function( a, b ) {
                    return a.get( "timeDiff" ) - b.get( "timeDiff" );
                } );

                p.ui.addEntries( entries );

                p.ui.appendTo( p.wrapper );

                p.loading = false;

                p.loaded = true;
            };

            // Render feeds
            p.renderFeeds = function( ) {
                const entries = p.entries.sort( function( a, b ) {
                    return a.get( "timeDiff" ) - b.get( "timeDiff" );
                } );

                p.ui.addFeedsEntries( entries );

                p.ui.appendTo( p.wrapper );

                p.loading = false;

                p.loaded = true;
            };

            // Renders an exception for WikiActivity
            p.renderException = function( name, exception ) {
                const s = p.msg( "rwa-exception-" + ( name || "main" ), exception ).escape( );

                console.error( s );

                p.wrapper.innerHTML = s;
            };

            // Creates a rail module for WikiActivity
            p.createModule = p.createRailModule = function( opts ) {
                opts = p.configureModuleOptions( opts );
                p.ui.createModule( opts );
            };

            // Configuring options for the modules
            p.configureModuleOptions = function( o ) {
                const r = Object.freeze( {
                    id : "",
                    classes : [ ],
                    background : true,
                    title : "",
                    content : ""
                } );

                o = Object( o );

                const n = { };

                Object.keys( o ).forEach( function( k ) {
                    n[ k ] = o[ k ] !== void 0 ? o[ k ] : r[ k ];
                } );

                return n;
            };

            /* Feeds */
            p.loadFeeds = function( ) {
                // Checks if the Message Walls are enabled
                p.wallsEnabled = false;

                // Gets Services API ajax for feeds
                const t = TYPES.get( p.type );

                const ajax = t.call( p, p );

                // Ajax for checking if Message Walls exists
                const wajax = p.wallsEnabledAjax( );

                // Creates a new promise for handling data
                const qp = new Promise( function( res, rej ) {
                    ajax.then( res )
                        [ "catch" ]( rej );
                } );

                // Checks if message walls exists
                const we = new Promise( function( res, rej ) {
                    wajax.then( function( ) {
                        p.wallsEnabled = true;
                    } )[ "finally" ]( res );
                } );

                // Then, handle data from feeds
                we.then( function( ) {
                    qp.then( p.handleFeedsData )
                        [ "catch" ]( p.handleLoadException );
                } );
            };

            // Checks if Message Walls exists
            p.wallsEnabledAjax = function( ) {
                return new Promise( function( res, rej ) {
                    const req = new XMLHttpRequest( );

                    req.timeout = 30000;

                    req.addEventListener( "timeout", rej );

                    req.addEventListener( "readystatechange", function( ) {
                        if ( req.readyState === req.DONE ) {
                            if ( req.status === 200 ) res( );
                            rej( );
                        }
                    } );

                    const u = mw.util.getUrl( "Message Wall:Wikia" );

                    req.open( "GET", u, true );

                    req.send( );
                } );
            };

            // Handles Feeds data
            p.handleFeedsData = function( d ) {
                Promise
                    .all( Array.from( d ).map( p.getFeedsEntry ) )
                    .then( p.render );
            };

            // Loads Feeds entry
            p.getFeedsEntry = function( post ) {
                return new Promise( function( res, rej ) {
                    const params = new Map( [
                        [ "title", mw.html.escape( post._embedded.thread[ 0 ].title || "" ) ],
                        [ "text", mw.html.escape( ( post.rawContent.length > 250 ?
                            post.rawContent.substring( 0, 250 ).trim( ) + "..." :
                            post.rawContent ) || "" ) ],
                        [ "username", mw.html.escape( post.createdBy.name || "" ) ],
                        [ "userid", post.createdBy.id ],
                        [ "avatar", post.createdBy.avatarUrl ],
                        [ "time", timeago( post.creationDate.epochSecond, p, true ) ],
                        [ "images", post._embedded.contentImages ],
                        [ "embed", post._embedded.openGraph ],
                        [ "messageId", post.id ],
                        [ "threadId", post.threadId ],
                        [ "forumName", mw.html.escape( post.forumName || "" ) ],
                        [ "forumId", post.forumId ],
                        [ "isReply", post.isReply ],
                        [ "tags", [ ] ],
                        [ "isReported", ( p.isMod ? post.isReported : null ) ],
                        [ "isLocked", post._embedded.thread[ 0 ].isLocked ],
                        [ "isDeleted", null ],
                        [ "isMessageDeleted", post.isDeleted ],
                        [ "isThreadDeleted", post._embedded.thread[ 0 ].isDeleted ]
                    ] );

                    console.log( params );

                    const username = params.get( "username" );
                    params.set(
                        "usernameEncoded",
                        username.replace( /\s+/g, "_" )
                    );

                    const avatar = params.get( "avatar" );

                    if ( !avatar ) {
                        const defAvatar = 'https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest';
                        params.set( "avatar", defAvatar );
                    } else if ( avatar.includes( "/messaging/" ) ) {
                        const finalAvatarURL = avatar
                            .replace( /[^jpg]*$/, "" ) +
                            '/revision/latest';
                        params.set( "avatar", finalAvatarURL );
                    }

                    const isThreadDeleted = params.get( "isThreadDeleted" );
                    const isMessageDeleted = params.get( "isMessageDeleted" );

                    const isDeleted = Boolean( isThreadDeleted || isMessageDeleted );

                    params.set( "isDeleted", isDeleted );

                    if ( isMessageDeleted ) {
                        params.set( "deleter", post.lastDeletedBy.name );
                        params.set( "deleterId", post.lastDeletedBy.id );
                    }

                    if (
                        !post.isReply &&
                        post._embedded &&
                        post._embedded.thread &&
                        post._embedded.thread[ 0 ] &&
                        post._embedded.thread[ 0 ].tags
                    ) {
                        const tags = post._embedded.thread[ 0 ].tags;
                        const t = Array.from( params.get( "tags" ) || [ ] );
                        tags.forEach( function( tag ) {
                            console.log( tag );
                            t.push( {
                                title : mw.html.escape( tag.articleTitle )
                            } );
                        } );
                        params.set( "tags", t );
                    }

                    p.addEntry( params );

                    res( params );
                } );
            };

            /* Image Upload (not ready yet) */
            /* p.loadImageUpload = function( ) {
                const t = TYPES.get( p.type );

                const ajax = t.call( p, p );

                const qp = new Promise( function( res, rej ) {
                    ajax.then( function( d ) {
                        if ( d.error ) return rej( "notfound", d.error );


                    } );
                } );
            }; */

            p.load( );
        };

        /* Fallback methods */
        // Initializing the fallback
        p.startFallback = function( ) {
            // If the page matches, do not continue
            if ( p.matchPage( ) ) return;

            // Adds a link to the toolbar
            p.addLink = function( ) {
                // The tool item to the WikiActivity page
                const li = document.createElement( "li" );

                // The link for the WikiActivity page
                const a = document.createElement( "a" );

                // Inserts the link to the tool item
                li.append( a );

                // Inserts the overflow class
                li.classList.add( "overflow" );

                // The link title
                const linkTitle = p.msg( "link-title" ).plain( );

                // Page suffix
                const pageSuffix = p.i18n
                    .inContentLang( )
                    .msg( "page-title" )
                    .plain( );

                // The page title
                const pageTitle = conf.wgFormattedNamespaces[ -1 ] + ":" +
                    pageSuffix;

                // Setting up the link
                a.setAttribute( "href", mw.util.getUrl( pageTitle )  );

                a.textContent = linkTitle;

                // Inserting the link to the tools menu
                const tools = document.querySelector( "#WikiaBarWrapper .tools" );

                tools.insertAdjacentElement( "afterbegin", li );

                // After that, convert header link if it is allowed
                if ( p.options.headerLink ) p.convertHeaderLink( );
            };

            p.convertHeaderLink = function( ) {
                // If the user does not want the header links to be converted,
                // do not continue.
                if ( !p.options.headerLink ) return;

                // The link target
                const target = document.querySelector( ".wds-community-header__wiki-buttons [data-tracking='recent-changes']" );

                // Changes the link to a wiki activity link
                target.dataset.tracking = "wiki-activity";

                target.setAttribute( "href", p.getURL( ) );

                // Fetches the explore tab
                const exploreLink = document.querySelector( '.wds-community-header__local-navigation [data-tracking="explore-changes"]' );

                // Changes the explore link to an activity link
                exploreLink.dataset.tracking = "explore-activity";

                exploreLink.setAttribute( "href", p.getURL( ) );

                exploreLink.textContent = p.msg( "link-title" ).plain( );

                // If loading the module is allowed, continue
                if ( p.options.loadModule ) p.loadModule( );
            };

            p.loadModule = function( ) { };

            p.addLink( );
        };


        p.configure( o );

         // Namespaces to show on the activity feed
        p.namespaces = p.options.namespaces;

        // Limit of entries to show on the feed
        p.limit = p.options.limit;

        // Determines whether the script should be automatically initialized
        p.autoInit = p.options.autoInit;

        // Determines how the activity feed gets rendered
        p.customRendering = p.options.customRendering;

        // Sets the WikiActivity theme
        p.themeName = p.options.themeName;

        // Determines whether bot edits should be shown
        p.showBotEdits = p.options.showBotEdits;

        // Determines whether the activity feed should be loaded on a module
        p.loadModule = p.options.loadModule;
        // Determines whether the Recent Changes link on the wiki
        // header should be changed back to Wiki Activity.
        // Note: This option has been set to false by default for sitewide use.
        p.headerLink = p.options.headerLink;

        // Determines whether the activity feed should automatically refresh
        p.refresh = p.options.refresh;

        // Delay for refreshing the activity feed
        // Default refresh period: 5 minutes
        p.refreshDelay = p.options.refreshDelay;

        // The timeout for loading the activity feed
        p.timeout = p.options.timeout;

        if ( !p.matchPage( ) ){
            p.startFallback( );

            mw.hook( "ucp.wikiactivity.fallback" ).fire( p );
        } else {
            p.start( );

            mw.hook( "ucp.wikiactivity.start" ).fire( p );
        }
    }

    function FeedUI( p ) {
        if ( this.constructor !== FeedUI ) {
            return new FeedUI( p );
        }

        const u = this, limitCache = { };

        function parseHTML( s ) {
            const w = new DOMParser( );

            const q = w.parseFromString( s, "text/html" );

            return q.body.firstElementChild;
        }

        function safeJSONParse( s ) {
            try {
                return JSON.parse( s );
            } catch( e ) {
                return { };
            }
        }

        function createElement( s, o ) {
            const r = { }, q = Object( o );

            if ( typeof s === "string" ) {
                r.type = s;
            }

            if ( q.hasOwnProperty( "condition" ) ) {
                if ( typeof q.condition === "function" ) {
                    const v = q.condition( );
                    r.condition = v;
                } else {
                    r.condition = q.condition;
                }
            }

            if (
                q.hasOwnProperty( "attr" ) ||
                q.hasOwnProperty( "attributes" )
            ) {
                const attr = q.attr || q.attributes;

                r.attr = attr instanceof Map ? Object.fromEntries( map ) :
                    attr;
            }

            if (
                q.hasOwnProperty( "data" ) ||
                q.hasOwnProperty( "dataset" )
            ) {
                const data = q.data || q.dataset;

                r.data = data instanceof Map ? Object.fromEntries( data ) :
                    Object( data );
            }

            if (
                q.hasOwnProperty( "events" ) ||
                q.hasOwnProperty( "on" )
            ) {
                const evs = q.events || q.on;
                r.events = evs instanceof Map ? Object.fromEntries( evs ) :
                    Object( evs );
            }

            if ( q.child ) {
                r.children = [ q.child ];
            } else if ( q.children ) {
                r.children = q.children;
            }

            if (
                q.hasOwnProperty( "classes" ) ||
                q.hasOwnProperty( "classNames" )
            ) {
                r.classes = q.classes || q.classNames;
            } else if (
                q.hasOwnProperty( "className" )
            ) {
                r.classes = q.className.split( /\s+/g );
            }

            if ( q.html ) r.html = q.html;

            if ( q.text ) r.text = q.text;

            if ( q.parent ) {
                r.parent = q.parent;
            }

            if ( q.hasOwnProperty( "props" ) ) {
                const props = q.props;
                r.props = props instanceof Map ? Object.fromEntries( props ) :
                    Object( props );
            }

            if ( q.checked ) r.checked = q.checked;

            if ( q.selected ) r.selected = q.selected;

            if ( q.value ) r.value = q.value;

            return p.uijs( r );
        }

        u.createElement = createElement;

        u.empty = function( el ) {
            if ( arguments.length === 0 ) {
                el = u.el;
            } else if ( typeof el === "string" ) {
                el = document.querySelector( el );
            }

            while ( el.firstChild ) {
                el.removeChild( el.firstChild );
            }
        };

        u.init = function( ) {
            u.header = createElement( "header", {
                classes : [ "FeedHeader" ],
                attr : {
                    id : "FeedHeader"
                }
            } );

            u.content = createElement( "div", {
                classes : [ "FeedContent" ],
                attr : {
                    id : "FeedContent"
                }
            } );

            u.rail = createElement( "aside", {
                classes : [ "FeedRail" ],
                attr : {
                    id : "FeedRail"
                }
            } );

            u.wrapper = createElement( "section", {
                classes : [ "FeedContentWrapper" ],
                attr : {
                    id : "FeedContentWrapper"
                },
                children : [
                    u.content,
                    u.rail
                ]
            } );

            u.el = createElement( "div", {
                classes : [ "Feed" ],
                attr : {
                    id : "Feed"
                },
                children : [
                    u.header,
                    u.wrapper
                ]
            } );

            p.target.append( u.el );

            u.render( );
        };

        u.addSpinner = function( ) {
            u.spinner = createElement( "svg", {
                classes : [
                    "wds-spinner",
                    "wds-spinner__block"
                ],
                attr : {
                    width : "66",
                    height : "66",
                    viewBox : "0 0 66 66",
                    xmlns : "http://www.w3.org/2000/svg"
                },
                children : [ {
                    type : "g",
                    attr : {
                        transform : "translate(33, 33)"
                    },
                    children : [ {
                        type : "circle",
                        classes : [
                            "wds-spinner__stroke"
                        ],
                        attr : {
                            fill : "none",
                            "stroke-width" : "2",
                            "stroke-dasharray" : "188.49555921538757",
                            "stroke-dashoffset" : "188.49555921538757",
                            "stroke-linecap" : "round",
                            "r" : "30"
                        }
                    } ]
                } ]
            } );

            u.empty( u.content );

            u.content.append( u.spinner );
        };

        u.render = function( ) {
            u.rcButton = createElement( "div", {
                classes : [
                    "FeedRCButtonWrapper",
                    "FeedHeaderSection"
                ],
                children : [ {
                    type : "a",
                    attr : {
                        href : mw.util.getUrl( "Special:RecentChanges" )
                    },
                    classes : [
                        "FeedRCButton",
                        "wds-button"
                    ],
                    text : p.msg( "recentchanges-text" ).plain( )
                } ]
            } );

            u.headerTabs = createElement( "nav", {
                classes : [
                    "FeedTabsContainer",
                    "FeedHeaderSection"
                ]
            } );

            u.headerOptions = createElement( "nav", {
                classes : [
                    "FeedOptions",
                    "FeedHeaderSection"
                ],
                children : [
                    {
                        type : "div",
                        classes : [
                            "FeedDropdown"
                        ],
                        events : {
                            click : function( ev ) {
                                const t = { };

                                if (
                                    !ev.target.classList
                                        .contains( "FeedDropdown" )
                                ) {
                                    t.el = ev.target.parentElement;
                                } else {
                                    t.el = ev.target;
                                }

                                t.dropdown = t.el.nextElementSibling;

                                t.dropdown.classList.toggle( "active" );
                            }
                        },
                        children : [ u.getIcon( "options" ) ]
                    },
                    {
                        type : "section",
                        classes : [
                            "FeedDropdownContent"
                        ],
                        children : [
                            {
                                type : "div",
                                classes : [
                                    "FeedLimitContainer",
                                    "FeedSelect"
                                ],
                                children : [
                                    {
                                        type : "nav",
                                        classes : [
                                            "FeedLimitNav",
                                            "FeedSelectDropdown"
                                        ],
                                        children : [
                                            {
                                                type : "span",
                                                classes : [
                                                    "FeedLimitCounter",
                                                    "FeedSelectLabel"
                                                ],
                                                text : String( p.limit )
                                            },
                                            {
                                                type : "ul",
                                                classes : [
                                                    "FeedLimits",
                                                    "FeedSelectList"
                                                ],
                                                children : LIMITS.map( u.createLimit )
                                            }
                                        ]
                                    },
                                    {
                                        type : "span",
                                        classes : [
                                            "FeedLimitDesc",
                                            "FeedSelectDesc"
                                        ],
                                        text : p.msg( "wa-limit-desc" ).escape( )
                                    }
                                ]
                            }
                        ]
                    }
                ]
            } );

            u.header.append( u.rcButton, u.headerTabs, u.headerOptions );
        };

        u.createLimit = function( limit ) {
            return {
                type : "li",
                classes : [
                    "FeedSelectListItem",
                    "FeedLimit"
                ],
                text : String( limit ),
                events : {
                    click : u.limitSelect
                }
            };
        };

        u.setType = function( t ) {
            const types = Object.freeze( [
                "main",
                "watchlist",
                "feeds",
                "images"
            ] );

            if ( types.includes( t ) ) {
                u.el.dataset.type = t;
            } else {
                u.el.dataset.type = p.type;
            }

            u.type = u.el.dataset.type;
        };

        u.setTheme = function( h ) {
            if ( arguments.length === 0 ) {
                h = p.themeName;
            }

            const preservedClasses = Object.freeze( [
                "Feed"
            ] );

            u.el.classList.forEach( function( m ) {
                if ( preservedClasses.includes( m ) ) return;

                u.el.classList.remove( m );
            } );

            const l = "Feed__theme-" + h;

            u.el.classList.add( l );

            u.el.dataset.theme = h;
        };

        u.limitSelect = function( ev ) {
            const l = ev.target.textContent;

            const n = parseInt( l );

            if ( isNaN( n ) || !isFinite( n ) ) return;

            u.setLimit( n );

            p.entries = [ ];

            p.loaded = false;

            u.addSpinner( );

            p.load( n );
        };

        u.loadMore = function( ev ) {
            ev.preventDefault( );

            p.loadMore( );
        };

        u.setLimit = function( n ) {
            const a = u.el.querySelector( ".FeedLimitCounter" );

            a.textContent = n;
        };

        u.addHeaderTabs = function( tabs ) {
            const t = tabs.map( u.generateTab );

            u.tabs = createElement( "ul", {
                id : "FeedTabs",
                classes : [ "FeedTabs" ],
                children : t
            } );

            if ( u._tabsAdded ) {
                u.empty( u.headerTabs );
                u.headerTabs.append( u.tabs );
            } else {
                u.headerTabs.append( u.tabs );
                u._tabsAdded = true;
            }
        };

        u.addModule = u.createModule = function( opts ) {
            const classes = [ "FeedModule" ];

            const title = [ ];

            if ( opts.title ) {
                classes.push( "has-title" );

                title.push( {
                    type : "span",
                    classes : [ "FeedModuleTitle" ],
                    text : opts.title
                } );
            }

            if ( opts.icon ) {
                const icon = p.wds.icon( opts.icon );

                classes.push( "has-icon" );

                title.push( {
                    type : "div",
                    classes : [ "FeedModuleIcon" ],
                    children : [ icon ]
                } );

                if ( opts.title ) {
                    classes.push( "has-title" );

                    title.push( {
                        type : "span",
                        classes : [ "FeedModuleTitle" ],
                    } );
                }
            }

            const heading = createElement( "h2", {
                classes : [ "FeedModuleHeading" ],
                children : title
            } );

            const obj = { };

            if ( opts.classes ) {
                if ( typeof opts.classes === "string" ) {
                    const clz = opts.classes.split( /\s+/g ).filter( function( m ) {
                        return m !== "";
                    } );

                    clz.forEach( function( cl ) {
                        if ( cl === "" ) return;
                        classes.push( cl );
                    } );
                } else if ( Array.isArray( opts.classes ) ) {
                    opts.classes.forEach( function( cl ) {
                        classes.push( cl );
                    } );
                }
            }

            if ( !opts.background ) {
                classes.push( "no-background" );
            }

            obj.classes = classes;

            if ( opts.id ) obj.id = opts.id;

            const content = createElement( "div", {
                classes : [ "FeedModuleContent" ],
                condition : !!opts.content,
                children : [ opts.content ]
            } );

            obj.children = [ ];

            if ( opts.title || opts.icon ) {
                obj.children.push( heading );
            }

            if ( opts.content ) {
                obj.children.push( content );
            }

            const module = createElement( "section", obj );

            u.rail.append( module );
        };

        u.generateTab = function( tab ) {
            const tabPrefix = "wa-tab-";
            const text = p.msg( tabPrefix + tab + "-text" ).plain( );
            const page = p.msg( tabPrefix + tab + "-page" ).plain( );
            const url = mw.util.getUrl( page );

            const isCurrent = p.type === tab;

            const classes = [ "FeedTab" ];

            if ( isCurrent ) classes.push( "current" );

            return {
                type : "li",
                classes : classes,
                data : {
                    name : tab
                },
                children : [ {
                    type : "a",
                    classes : [ "FeedTabLink" ],
                    text : text,
                    attr : {
                        href : url
                    }
                } ]
            };
        };

        u.addEntries = function( entries ) {
            if ( !u._entriesLoaded ) {
                u.list = createElement( "ul", {
                    classes : [ "FeedEntries" ],
                    attr : {
                        id : "FeedEntries"
                    }
                } );

                u.more = createElement( "div", {
                    classes : [ "FeedMore" ],
                    attr : {
                        id : "FeedMore"
                    },
                    children : [
                        {
                            type : "a",
                            classes : [ "FeedMoreButton" ],
                            attr : {
                                id : "FeedMoreButton",
                                href : "#"
                            },
                            text : p.msg( "see-more-activity" ).plain( ),
                            events : {
                                click : u.loadMore
                            }
                        }
                    ]
                } );

                u.entries = createElement( "nav", {
                    classes : [ "FeedEntriesWrapper" ],
                    attr : {
                        id : "FeedEntriesWrapper"
                    },
                    children : [
                        u.list,
                        u.more
                    ]
                } );

                u.renderContent( u.entries );

                u._entriesLoaded = true;
            }

            entries.forEach( u.renderEntry );
        };

        u.addFeedsEntries = function( entries ) {
            if ( !u._entriesLoaded ) {
                u.list = createElement( "ul", {
                    classes : [ "FeedPostEntries" ],
                    attr : {
                        id : "FeedPostEntries"
                    }
                } );

                u.entries = createElement( "nav", {
                    classes : [ "FeedPostEntriesWrapper" ],
                    attr : {
                        id : "FeedPostEntriesWrapper"
                    },
                    children : [
                        u.list
                    ]
                } );

                u.renderContent( u.entries );

                u._entriesLoaded = true;
            }

            entries.forEach( u.renderFeedsEntry );
        };

        u.renderContent = function( content ) {
            if ( content instanceof Element ) {
                u.empty( u.content );
                u.content.append( content );
            } else if ( typeof content === "string" ) {
                u.content.innerHTML = content;
            } else if ( isPlainObject( content ) ) {
                createElement( u.content, content );
            }
        };

        u.renderEntry = function( entry ) {
            const params = Object.fromEntries( entry );

            const el = createElement( "li", {
                classes : [
                    "FeedEntry",
                    "feed-entry"
                ],
                data : {
                    type : params.type,
                    ns : params.ns
                },
                children : u.renderChildren( params )
            } );

            u.list.append( el );
        };

        u.renderFeedsEntry = function( entry ) {
            const params = Object.fromEntries( entry );

            const el = createElement( "li", {
                classes : [
                    "FeedPostEntry",
                    "feed-post-entry"
                ],
                data : {
                    type : params.isReply ? "reply" : "post"
                },
                children : u.renderChildren( params )
            } );

            u.list.append( el );
        };

        u.renderChildren = function( params ) {
            const type = p.type;

            if ( p.customRendering.hasOwnProperty( type ) ) {
                const f = p.customRendering[ type ];
                return f.call( p, [ u, p ] );
            }

            switch ( type ) {
                case "feeds" :
                    return u.renderFeeds( params );
                case "images" :
                    return u.renderImages( params );
                default :
                    return u.renderActivity( params );
            }
        };

        u.renderActivity = function( params ) {
            return [
                // Creates an icon that corresponds to the entry
                u.renderIcon,
                // Creates a set of details for the following entry
                u.renderDetails,
                // Creates the actions button
                u.renderActions
            ].map( function( f ) {
                return f( params );
            } );
        };

        u.renderImages = function( params ) {
            return [
            ].map( function( f ) {

            } );
        };

        u.getIcon = function( icon ) {
            const hasIconName = ICON_NAMES.has( icon );

            if ( !hasIconName ) {
                return null;
            }

            return p.wds.icon( ICON_NAMES.get( icon ) );
        };

        u.renderIcon = function( params ) {
            const icon = u.getIcon( params.icon );

            return {
                type : "div",
                classes : [
                    "FeedIconContainer",
                    "feed-icon__container"
                ],
                data : {
                    icon: params.icon
                },
                children : [ {
                    type : "span",
                    classes : [
                        "FeedIconWrapper",
                        "feed-icon__wrapper"
                    ],
                    children : [ icon ]
                } ],
                condition : icon !== null
            };
        };

        // Creating activity details
        u.renderDetails = function( params ) {
            return {
                type : "section",
                classes : [
                    "FeedDetails",
                    "feed-details"
                ],
                children : [
                    u.createTitle,
                    u.createEdited,
                    u.createSummary,
                    u.createCategories,
                    u.createTemplates,
                    u.createImages
                ].map( function( f ) {
                    return f( params );
                } )
            };
        };

        // Page title
        u.createTitle = function( params ) {
            const url = mw.util.getUrl( params.title );

            return {
                type : "header",
                classes : [
                    "FeedPageTitle",
                    "feed-title"
                ],
                children : [ {
                    type : "a",
                    classes : [
                        "FeedPageTitleText",
                        "feed-title__text"
                    ],
                    attr : {
                        href : url
                    },
                    text : params.title
                } ]
            };
        };

        // Edited user details
        u.createEdited = function( params ) {
            return {
                type : "div",
                classes : [
                    "FeedEdited",
                    "feed-edited"
                ],
                children : [
                    {
                        type : "span",
                        classes : [
                            "FeedEditedText",
                            "feed-edited__text"
                        ],
                        text : p.msg( params.editedKey ).escape( )
                    },
                    {
                        type : "a",
                        attr : {
                            href : mw.util.getUrl(
                                conf.wgFormattedNamespaces[ 2 ] +
                                ":" + params.user
                            )
                        },
                        children : [
                            u.createAvatar,
                            u.createUserName
                        ].map( function( f ) {
                            return f( params );
                        } )
                    },
                    // Creates a timeago element
                    u.renderTimeago( params ),
                    // Creates a diff button
                    u.renderDiff( params )
                ]
            };
        };

        // User avatar
        u.createAvatar = function( params ) {
            return {
                type : "div",
                classes : [
                    "FeedEditedAvatar",
                    "feed-edited__avatar",
                    "wds-avatar"
                ],
                children : [ {
                    type : "img",
                    classes : [
                        "FeedEditedAvatarImage",
                        "feed-edited__avatar-image",
                        "wds-avatar__image"
                    ],
                    attr : {
                        src : params.avatar,
                        alt : params.user
                    }
                } ]
            };
        };

        u.createUserName = function( params ) {
            return {
                type : "em",
                classes : [
                    "FeedEditedUsername",
                    "feed-edited__username"
                ],
                text : params.user
            };
        };

        // Activity summary
        u.createSummary = function( params ) {
            return {
                type : "section",
                classes : [
                    "FeedSection",
                    "feed-section",
                    "feed-section__summary"
                ],
                data : {
                    type : "summary"
                },
                condition : params.summary !== "",
                children : [
                    {
                        type : "div",
                        classes : [
                            "FeedSectionTitle",
                            "feed-section__title"
                        ],
                        text : p.msg( params.summaryKey ).parse( )
                    },
                    {
                        type : "div",
                        classes : [
                            "FeedSectionField",
                            "feed-section__field"
                        ],
                        html : params.summary
                    }
                ]
            };
        };

        // Categories
        u.createCategories = function( params ) {
            const t = p.msg( "added-category", params.categories.length )
                    .parse( );

            const c = params.categories.length !== 0;

            return {
                type : "section",
                classes : [
                    "FeedSection",
                    "feed-section",
                    "feed-section__categories"
                ],
                data : {
                    type : "categories"
                },
                condition : c,
                children : [
                    {
                        type : "div",
                        classes : [
                            "FeedSectionTitle",
                            "feed-section__title"
                        ],
                        text : t
                    },
                    {
                        type : "div",
                        classes : [
                            "FeedSectionField",
                            "feed-section__field"
                        ],
                        children : params.categories.map(
                            u.createCategory
                        )
                    }
                ]
            };
        };

        u.createCategory = function( category ) {
            const url = mw.util.getUrl( category );

            const pattern = new RegExp( "^" +
                conf.wgFormattedNamespaces[ 14 ] +
                ":\\s*", "g" );

            const title = category.replace( pattern, "" );

            return {
                type : "a",
                classes : [
                    "FeedCategory",
                    "feed-category"
                ],
                attr : {
                    href : url
                },
                text : title
            };
        };

        // Categories
        u.createTemplates = function( params ) {
            const t = p.msg( "added-template", params.templates.length )
                    .parse( );

            const exclude = params.ns === 2 && /\.js|\.css$/.test( params.title );

            const c = params.templates.length !== 0 && !exclude;

            return {
                type : "section",
                classes : [
                    "FeedSection",
                    "feed-section",
                    "feed-section__templates"
                ],
                data : {
                    type : "templates"
                },
                condition : c,
                children : [
                    {
                        type : "div",
                        classes : [
                            "FeedSectionTitle",
                            "feed-section__title"
                        ],
                        text : t
                    },
                    {
                        type : "div",
                        classes : [
                            "FeedSectionField",
                            "feed-section__field"
                        ],
                        children : params.templates.map(
                            u.createTemplate
                        )
                    }
                ]
            };
        };

        u.createTemplate = function( title ) {
            const page = conf.wgFormattedNamespaces[ 10 ] +
                ":" + title;

            const url = mw.util.getUrl( page );

            return {
                type : "a",
                classes : [
                    "FeedTemplate",
                    "feed-template"
                ],
                attr : {
                    href : url
                },
                text : title
            };
        };

        // Images
        u.createImages = function( params ) {
            const t = p.msg( "added-image", params.images.length )
                    .parse( );

            const c = params.images.length !== 0;

            return {
                type : "section",
                classes : [
                    "FeedSection",
                    "feed-section",
                    "feed-section__images"
                ],
                data : {
                    type : "images"
                },
                condition : c,
                children : [
                    {
                        type : "div",
                        classes : [
                            "FeedSectionTitle",
                            "feed-section__title"
                        ],
                        text : t
                    },
                    {
                        type : "div",
                        classes : [
                            "FeedSectionField",
                            "feed-section__field"
                        ],
                        children : params.images.map(
                            u.createImage
                        )
                    }
                ]
            };
        };

        u.createImage = function( image ) {
            const i = Object.fromEntries( image );

            const src = i.src, url = i.url, title = i.title;

            return {
                type : "figure",
                classes : [
                    "FeedImageWrapper",
                    "feed-image__wrapper"
                ],
                children : [ {
                    type : "a",
                    classes : [
                        "FeedImageLink",
                        "feed-image__link"
                    ],
                    /*events : {
                        click : function( event ) {
                            event.preventDefault( );

                            const target = event.target;

                            u.openLightbox( target );
                        }
                    },*/
                    attr : {
                        href : url
                    },
                    children : [
                        {
                            type : "img",
                            classes : [
                                "FeedImage",
                                "feed-image"
                            ],
                            attr : {
                                src : src,
                                alt : title
                            },
                            data : {
                                "file-url" : url
                            }
                        },
                        {
                            type : "figcaption",
                            classes : [
                                "FeedImageFileName",
                                "feed-image__file-name"
                            ],
                            text : title
                        }
                    ]
                } ]
            };
        };

        u.renderTimeago = function( params ) {
            return {
                type : "div",
                classes : [
                    "FeedTimeago",
                    "feed-timeago"
                ],
                text : params.timeago
            };
        };

        u.renderDiff = function( params ) {
            const diffUrl = mw.util.getUrl( params.title, {
                diff : params.revid,
                oldid : params.oldid
            } );

            return {
                type : "a",
                condition : params.oldid !== 0,
                classes : [
                    "FeedDiff",
                    "feed-history__button"
                ],
                attr : {
                    href : diffUrl
                },
                children : [ u.getIcon( "diff" ) ]
            };
        };

        u.renderActions = function( params ) {
            return {
                type : "div",
                classes : [
                    "FeedActions",
                    "wds-dropdown"
                ],
                children : [
                    {
                        type : "span",
                        children : [ u.getIcon( "more" ) ],
                        classes : [
                            "FeedActionsLabel",
                            "wds-dropdown__toggle"
                        ]
                    },
                    {
                        type : "div",
                        classes : [
                            "FeedActionsContent",
                            "wds-dropdown__content",
                            "wds-is-not-scrollable"
                        ],
                        children : [ {
                            type : "ul",
                            classes : [
                                "FeedActionsList",
                                "wds-list",
                                "wds-is-linked"
                            ],
                            children : [
                                u.renderUndoButton/*,
                                u.renderRollbackButton,
                                u.renderBlockButton*/
                            ].map( function( f ) {
                                return f( params );
                            } )
                        } ]
                    }
                ]
            };
        };

        u.renderUndoButton = function( params ) {
            const url = mw.util.getUrl( params.title, {
                action : "edit",
                undo : params.revid
            } );

            return {
                type : "li",
                data : {
                    action : "undo"
                },
                children : [
                    {
                        type : "a",
                        attr : {
                            href : url
                        },
                        text : p.msg( "wa-actions-undo" ).plain( )
                    }
                ]
            };
        };

        u.renderRollbackButton = function( params ) {
            return {
                type : "li",
                data : {
                    action : "rollback"
                },
                children : [
                    {
                        type : "a",
                        attr : {
                            href : url
                        },
                        text : p.msg( "wa-actions-rollback" ).plain( )
                    }
                ],
                condition : p.canRollback
            };
        };

        u.renderBlockButton = function( ) {
            return {
                type : "li",
                data : {
                    action : "block"
                },
                children : [
                    {
                        type : "a",
                        attr : {
                            href : url
                        },
                        text : p.msg( "wa-actions-block" ).plain( )
                    }
                ],
                condition : p.canBlock
            };
        };

        u.renderDeleteButton = function( ) {
            return {
                type : "li",
                data : {
                    action : "delete"
                },
                children : [
                    {
                        type : "a",
                        attr : {
                            href : url
                        },
                        text : p.msg( "wa-actions-delete" ).plain( )
                    }
                ],
                condition : p.canRollback
            };
        };

        /* Feeds */
        u.renderFeeds = function( params ) {
            return [
                // Creates an icon that corresponds to the Feeds entry
                u.renderFeedsIcon,
                // Creates details about the Feeds entry
                u.renderFeedsDetails
            ].map( function( f ) {
                return f( params );
            } );
        };

        u.renderFeedsIcon = function( params ) {
            const icon = ( params.isReply ? "comment" : "add" );

            return {
                type : "div",
                classes : [
                    "FeedIcon",
                    "feed-icon__container"
                ],
                data : {
                    icon : icon
                },
                children : [ {
                    type : "span",
                    classes : [
                        "FeedIconWrapper",
                        "feed-icon__wrapper"
                    ],
                    children : [ p.wds.icon( icon ) ]
                } ]
            };
        };

        u.renderFeedsDetails = function( params ) {
            return {
                type : "section",
                classes : [
                    "FeedPostDetails",
                    "feed-post__details"
                ],
                children : [
                    // Renders title for the Feeds post
                    u.createFeedsTitle,
                    // Renders Feeds content
                    u.createFeedsContent,
                    // Renders images
                    u.createFeedsImages,
                    // Renders tags
                    u.createFeedsTags,
                    // Renders embed
                    u.createFeedsEmbed
                ].map( function( f ) {
                    return f( params );
                } )
            };
        };

        u.createFeedsTitle = function( params ) {
            const url = conf.wgServer + conf.wgScriptPath +
                "/f/p/" + params.threadId;

            const catUrl = new URL( conf.wgServer + conf.wgScriptPath +
                "/f" );

            catUrl.searchParams.append( "catId", params.forumId );

            catUrl.searchParams.append( "sort", "latest" );

            return {
                type : "header",
                classes : [
                    "FeedPostTitle",
                    "feed-post__title"
                ],
                children : [ {
                    type : "div",
                    classes : [
                        "FeedPostTitleContent",
                        "feed-post__title-content"
                    ],
                    children : [
                        {
                            type : "a",
                            classes : [
                                "FeedPostTitleText",
                                "feed-post__title-text"
                            ],
                            attr : {
                                href : url
                            },
                            text : params.title
                        },
                        {
                            type : "span",
                            text : p.msg( "wa-feeds-in" ).plain( )
                        },
                        {
                            type : "a",
                            attr : {
                                href : String( catUrl )
                            },
                            text : params.forumName
                        }
                    ]
                } ]
            };
        };

        u.createFeedsContent = function( params ) {
            return {
                type : "div",
                classes : [
                    "FeedPostContentWrapper",
                    "feed-post__contentWrapper"
                ],
                children : [
                    u.createFeedsAvatar,
                    u.createFeedsPostContent
                ].map( function( f ) {
                    return f( params );
                } )
            };
        };

        u.createFeedsAvatar = function( params ) {
            return {
                type : "div",
                classes : [
                    "FeedPostAvatar",
                    "feed-post__avatar",
                    "wds-avatar"
                ],
                children : [ {
                    type : "img",
                    classes : [
                        "FeedPostAvatarImage",
                        "feed-post__avatar-image",
                        "wds-avatar__image"
                    ],
                    attr : {
                        src : params.avatar
                    }
                } ]
            };
        };

        u.createFeedsPostContent = function( params ) {
            return {
                type : "section",
                classes : [
                    "FeedPostContent",
                    "feed-post__content"
                ],
                children : [
                    {
                        type : "div",
                        classes : [
                            "FeedPostEditedBy",
                            "feed-post__edited-by"
                        ],
                        children : u.createFeedsPostEdited( params )
                    },
                    {
                        type : "div",
                        classes : [
                            "FeedPostText",
                            "feed-post__text"
                        ],
                        children : [
                            u.createFeedsPostText
                        ].map( function( f ) {
                            return f( params );
                        } )
                    }
                ]
            };
        };

        u.createFeedsPostEdited = function( params ) {
            const w = p.wallsEnabled ? "wall" : "talk";

            const n = p.wallsEnabled ? 1200 : 3;

            const wallTitle = p.msg( "wa-feeds-post-" + w ).plain( );

            const ns = conf.wgFormattedNamespaces[ n ];

            const page = ns + ":" + params.usernameEncoded;

            const url = mw.util.getUrl( page );

            const contribsTitle = p.msg( "wa-feeds-post-contribs" ).plain( );

            const cns = conf.wgFormattedNamespaces[ -1 ];

            const cpage = cns + ":" + contribsTitle + "/" + params.usernameEncoded;

            const cUrl = mw.util.getUrl( cpage );

            const editedKey = params.isReply ? "commented" : "created";

            const fUrl = conf.wgServer + conf.wgScriptPath + "/f/u/" +
                params.userId;

            const blockTitle = p.msg( "wa-feeds-post-block" ).plain( );

            const blockpage = cns + ":" + blockTitle + "/" + params.usernameEncoded;

            const bUrl = mw.util.getUrl( blockpage );

            return [
                {
                    type : "span",
                    classes : [
                        "FeedPostEditedText",
                        "feed-post__edited-text"
                    ],
                    text : p.msg( "wa-feeds-post-" + editedKey + "-key" )
                        .plain( )
                },
                {
                    type : "a",
                    classes : [
                        "FeedPostEditedUser",
                        "feed-post__edited-user"
                    ],
                    attr : {
                        href : fUrl
                    },
                    text : params.userName
                },
                {
                    type : "span",
                    classes : [
                        "FeedPostEditedLinks",
                        "feed-post__edited-links"
                    ],
                    children : [
                        "(",
                        {
                            type : "a",
                            attr : {
                                href : url
                            },
                            text : wallTitle
                        },
                        "|",
                        {
                            type : "a",
                            attr : {
                                href : cUrl
                            },
                            text : contribsTitle
                        },
                        {
                            type : "#text",
                            text : "|",
                            condition : p.canBlock
                        },
                        {
                            type : "a",
                            attr : {
                                href : bUrl
                            },
                            text : blockTitle,
                            condition : p.canBlock
                        },
                        ")"
                    ]
                }
            ];
        };

        u.createFeedsPostText = function( params ) {
            return {
                type : "div",
                classes : [
                    "FeedPostTextContent",
                    "feed-post__text-content"
                ],
                text : params.text
            };
        };

        u.createFeedsImages = function( params ) {
            return {
                type : "div"
            };
        };

        u.createFeedsTags = function( params ) {
            return {
                type : "div"
            };
        };

        u.createFeedsEmbed = function( params ) {
            return {
                type : "div"
            };
        };

        u.appendTo = function( el ) {
            if ( !( el instanceof Element ) ) return;
            el.append( u.el );
        };

        u.init( );
    }

    mw.hook( "dev.i18n" ).add( function( i18no ) {
        Promise.all( [
            i18no.loadMessages( NAME, { noCache : true } ),
            mw.loader.using( deps )
        ] ).then( function( m ) {
            const i18n = m[ 0 ];

            window.WikiActivity =
                window.UCP.WikiActivity =
                    new WikiActivity( options, i18n );

            window.UCP.WikiActivityController = WikiActivity;

            window.UCP.WikiActivityUI = FeedUI;

            mw.hook( "ucp.wikiactivity" ).fire( window.UCP.WikiActivity );
        } );
    } );
} )( this, jQuery, mediaWiki );