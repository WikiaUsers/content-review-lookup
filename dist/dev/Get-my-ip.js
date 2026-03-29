mw.hook( "wikipage.content" ).add( function( element ) {
    element.find( ".get-my-ip-hide" ).hide();
    mw.loader.using( "mediawiki.util", function() {
        $.get( mw.util.wikiScript( "api"), {
            "action": "query",
            "meta": "userinfo",
            "callback": "",
            "format": "json",
            "formatversion": "2"
        } ).then( function ( data ) {
            if( data.substring( 0, 5 ) === "/**/(" ) {
                var json = JSON.parse( data.substring( 5, data.length - 1 ) );
                if( json && json.query && json.query.userinfo && json.query.userinfo.name && json.query.userinfo.anon ) {
                    element.find( ".get-my-ip-target" ).text( json.query.userinfo.name );
                } else {
                    element.find( ".get-my-ip-target" ).text( "ERROR" );
                    console.error( "Get-my-ip.js: ERROR - malformed API response detected. Response: ", json );
                }
            } else {
                element.find( ".get-my-ip-target" ).text( "ERROR" );
                console.error( "Get-my-ip.js: ERROR - API response had no opening comment. Response: ", data );
            }
        } );
    } );
} );