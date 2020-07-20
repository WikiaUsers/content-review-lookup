( function( window, $, mw ) { 
    "use strict";
    function FandomAPI( options ) { 
        if ( !( this instanceof FandomAPI ) ) return new FandomAPI( options );
        this.__settings = Object.assign( { }, options );
        this.__endpoint = "/api.php";
        this.__format = "json";
        
        if ( this.__settings.fromWiki ) {
            this.__endpoint = "https://" + String( this.__settings.fromWiki ) + ".fandom.com/api.php";
            this.__format = "jsonp";
        }
    }
    
    FandomAPI.prototype.getContentFromPage = function( title ) { 
        return this.__getAjax( { 
            
        } );
    };
} )( window, jQuery, mediaWiki );