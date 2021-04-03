( function( window, mw, $ ) { 
    "use strict";
    const PAGE_PATTERN = /Special:(?:BlankPage\/)?SigMaker/gi;
    const PAGE_NAME = mw.config.get( "wgPageName" );
    if ( !PAGE_PATTERN.test( PAGE_NAME ) ) return;
    const USER_NAME = mw.config.get( "wgUserName" );
    const OPTIONS = Object.freeze( { 
        
    } );
    const OPTIONS_KEY = "sig-maker__options";
    const CACHE = { };
    const ASSERT = function( callback ) { 
        if ( typeof callback !== "function" ) return Boolean( callback );
        const args = Array.from( arguments, function( elem, index ) { 
            return index === 0 ? void 0 : elem;
        } ).filter( function( elem ) { 
            return elem !== void 0;
        } );
        const result = callback.apply( this, args );
    };
    
    function SigMaker( options ) { 
        if ( !( this instanceof SigMaker ) ) return new SigMaker( options );
        if ( CACHE[ USER_NAME ] ) {
            CACHE[ USER_NAME ].__configure( options );
            return CACHE[ USER_NAME ];
        }
        this.__settings = Object.assign( { }, OPTIONS );
        this.__configure( options );
        this.__settings.userName = USER_NAME;
        this.__delayBeforeRender = ( this.__settings.delay > 0 || !isNaN( this.__settings.delay ) );
    }
    
    SigMaker.prototype.__configure = function( options ) { 
        const settings = Object.assign( { }, options );
        Object.keys( settings ).forEach( function( key ) { 
            const original = this.__settings[ key ];
            this.__settings[ key ] = settings[ key ] || original;
            if ( typeof this.__settings[ key ] === "function" ) {
                const result = this.__settings[ key ].call( this, original );
                this.__settings[ key ] = result || this.__settings[ key ];
            }
        }, this );
    };
} )( window, mediaWiki, jQuery );