/**
 * SigCreator
 * 
 * This is a script that allows you to easily create
 * signatures.
 **/
( function( window, $, mw ) { 
    "use strict";
    
    function SigCreator( o ) { 
        if ( this.constructor !== SigCreator ) {
            return new SigCreator( o );
        }
        
        const t = this;
        
        t._loaded = false;
        
        t._cache = false;
        
        t._options = { };
        
        t._loadOptions = function( ) { 
            if ( t._loaded ) { }
        };
    }
} )( window, jQuery, mediaWiki );