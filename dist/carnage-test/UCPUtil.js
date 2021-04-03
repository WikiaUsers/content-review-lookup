( function( window, mw ) { 
    "use strict";
    window.UCP = { };
    window.UCP.profileLoad = new Promise( function( resolve, reject ) { 
        if ( !mw.config.get( "profileUserName" ) ) return reject( );
        
    } );
} )( this, mediaWiki );