/**
 * This is a temporary script used to allow you to
 * import scripts and stylesheets easily.
 **/

( function( window, $, mw ) { 
    "use strict";
    // Create a loadedScripts object
    const loadedScripts = { };
    // Loading the WikiaURL script first
    mw.loader.load( "https://dev.fandom.com/load.php?mode=articles&only=scripts&articles=MediaWiki:WikiaURL.js");
    // Creating the importArticle script
    function importArticle( ) { 
        const base = window.location.origin + mw.config.get( "wgLoadScript" );
        const defaults = Object.freeze( { 
            debug : mw.config.get( "debug" ),
            lang : mw.config.get( "wgUserLanguage" ),
            mode : "articles",
            skin : mw.config.get( "skin" )
        } );
        const loaded = { };
        const state = { done: false };
        const modules = Array.from( Array.isArray( arguments[ 0 ] ) ? 
            arguments[ 0 ] : arguments );
        const result = [ ];
        const length = modules.length;
        
        return new Promise( function( resolve, reject ) {
            mw.hook( "dev.url" ).add( function( WikiaURL ) {
                Array.from( modules ).forEach( function( module, index ) { 
                    const done = state.done = ( index === length - 1 );
                    const options = Object.assign( { }, defaults, module );
                    const type = module.type;
                    options.articles = options.article || options.articles;
                    delete options.article;
                    
                    if ( !options.articles || !options.articles.length ) return;
                    if ( Array.isArray( options.articles ) ) {
                        options.articles = options.articles.join( "|" );
                    }
                    
                    if ( mw.config.get( "wgContentReviewExtEnabled" ) ) {
                        if ( /MediaWiki:/.test( module.articles ) ) {
                            if ( mw.config.get( "wgContentReviewTestModeEnabled" ) ) {
                                options.current = mw.config.get( "wgScriptsTimestamp" );
                            } else {
                                options.reviewed = mw.config.get( "wgReviewedScriptsTimestamp" );
                            }
                        }
                    }
                    
                    const importMethod = ( /scripts?/.test( type ) ? importScriptURL : ( /styles?/.test( type ) ?
                            importStylesheetURL : null
                        ) );
                    
                    if ( importMethod === null ) return;
                    options.only = options.type.endsWith( "s" ) ? options.type : 
                        options.type + "s";
                    delete options.type;
                    
                    const url = new WikiaURL( base, options );
                    if ( loaded[ String( url ) ] ) return;
                    loaded[ String( url ) ] = true;
                    result.push( importMethod( url ) );
                    if ( done ) Promise.all( result ).then( resolve );
                } );
            } );
        } );
    }
    
    function importStylesheetURL( url, media ) {
        return new Promise( function( resolve, reject ) { 
            const env = document.createElement( "link" );
            env.type = "text/css";
            env.rel = "stylesheet";
            env.href = url;
            if ( media ) env.media = String( media );
            env.addEventListener( "load", resolve );
            document.head.appendChild( env );
        } );
    }
    
    function importScriptURL( url ) { 
        return new Promise( function( resolve, reject ) {
            if ( loadedScripts[ String( url ) ] ) resolve( null );
            loadedScripts[ String( url ) ] = true;
            const env = document.createElement( "script" );
            env.setAttribute( "src", url );
            env.setAttribute( "type", "text/javascript" );
            env.addEventListener( "load", resolve );
            document.head.appendChild( env );
        } );
    }
    
    function importStylesheet( page, media ) { 
        const url = new WikiaURL( location.origin + mw.config.get( "wgScript" ), { 
            action : "raw",
            ctype : "text/css",
            title : encodeURIComponent( page )
        } );
        return importStylesheetURL( url, media );
    }
    
    function importScript( page ) {
        const url = new WikiaURL( location.origin + mw.config.get( "wgScript" ), { 
            title : encodeURIComponent( page ),
            action : "raw",
            ctype : "text/javascript"
        } );
        return importScriptURL( url );
    }
    
    window.importArticle = window.importArticles = importArticle;
    window.importStylesheet = importStylesheet;
    window.importScript = importScript;
} )( window, jQuery, mediaWiki );