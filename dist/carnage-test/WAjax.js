/**
 * WAjax
 * 
 * A library dedicated to creating asyncronous requests
 * from FANDOM links.
 *
 * @author Ultimate Dark Carnage <https://dev.fandom.com/User:Ultimate_Dark_Carnage>
 * @version 1.0
 **/

/* global window, mediaWiki */
( function( window, mw ) { 
    "use strict";
    
    const deps = Object.freeze( [ "window.dev.url" ] );
    
    const SUPPORTED_FORMATS = Object.freeze( [
        "",
        "text",
        "json",
        "document"
    ] );
    
    function WAjax( url, options ) { 
        if ( !( this instanceof WAjax ) ) return new WAjax( url, options );
        
        if ( typeof url === "object" ) {
            url = String( url.url );
            delete url.url;
            options = url;
        }
        
        this.__xhr = new XMLHttpRequest( );
        this.__baseURL = String( url );
        this.__settings = Object.assign( { }, options );
        this.__url = new WikiaURL( this.__baseURL );
        
        if ( typeof this.__settings.data === "object" ) {
            this.__url.setQuery( this.__settings.data );
        }
        
        if ( typeof this.__settings.format === "string" ) {
            const format = String( this.__settings.format );
            if ( SUPPORTED_FORMATS.includes( format ) ) {
                this.__xhr.responseType = format;
            }
        }
        
        if ( typeof this.__settings.progress === "function" ) {
            this.__addListener( "progress", this.__settings.progress );
        }
        
        if ( typeof this.__settings.done === "function" ) {
            this.__addListener( "load", this.__settings.done );
        }
        
        if ( typeof this.__settings.auto === "boolean" ) {
            const auto = this.__settings.auto;
            if ( auto ) this.init( );
        }
    }
    
    WAjax.prototype = { 
        constructor: WAjax,
        __addListener: function( name, callback ) {
            if ( typeof name !== "string" ) return;
            this.__xhr.addEventListener( name, callback.bind( this ) );
        }
    };
} )( window, mediaWiki );