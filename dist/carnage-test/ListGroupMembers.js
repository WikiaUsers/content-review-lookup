require( [
    "wikia.window",
    "wikia.document",
    "jquery",
    "mw"
], function( window, document, $, mw ){
    "use strict";
    
    const DEFAULT_RIGHTS = Object.freeze( [ 
        "staff", "helper", "wiki-manager", "vstf", ""
    ] );
    
    const MAIN_SCRIPTS = Object.freeze( [ 
        "u:dev:MediaWiki:I18n-js/code.js",
        "u:dev:MediaWiki:WDSIcons/code.js",
        "u:dev:MediaWiki:Colors/code.js"
    ] );
    
    const MAIN_STYLESHEET = "u:dev:MediaWiki:ListGroupMembers.css";
    
    async function getI18nObject( ){
        return await new Promise( function( resolve, reject ){
            mw.hook( "dev.i18n" ).add( function( i18n ){
                resolve( i18n );
            } );
        } );
    }
    
    async function loadI18n( ){
        let i18no = await getI18nObject( );
        return await i18no.loadMessages( "ListGroupMembers" );
    }
    
    async function* getMessages( ){
        let i18n = await loadI18n( );
        let messages = Object.keys( i18n._messages.en );
        
        while ( messages.length > 0 ){
            yield messages.shift( );
        }
    }
    
    async function setMessages( object ){
        for await ( const key of getMessages( ) ){
            object[ key ] = {};
        }
    }
    
    class ListGroupMembers {
        constructor( options ){
            if ( !new.target ){
                return new ListGroupMembers( options );
            }
        }
    }
} );