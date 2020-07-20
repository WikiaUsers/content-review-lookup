/**
 * @module          FandomizedChat
 * @version         1.2.0
 * @author          Ultimate Dark Carnage
 * @license         CC-BY-SA 3.0
 * @description     A script created to enhance the experience
 *                  of Chat. Core functionality is based on
 *                  Chat-js.
 **/

( function( window, document, mw, $ ){
    "use strict";
    
    window.fc = Object.assign( { }, window.fc );
    if ( window.fc.loaded ) return;
    
    window.fc.loaded = true;
    
    function FandomizedChat( room, options ){
        if ( !( this instanceof FandomizedChat ) ) return new FandomizedChat( room, options );
    }
    
    FandomizedChat.i18n = { };
    
    FandomizedChat.loadI18n = function( ){
        return new Promise( function( resolve, reject ){
            if ( !window.dev.i18n ){
                importArticle( { 
                    type: "script",
                    article: "u:dev:MediaWiki:I18n.js/code.js"
                } );
            }
            
            mw.hook( "dev.i18n" ).add( resolve );
        } );
    };
    
    FandomizedChat.fetchI18n = function( ){
        var context = this;
        return new Promise( function( resolve, reject ){
            context.loadI18n( ).then( function( i18no ){
                if ( !context.i18no ){
                    context.i18no = i18no;
                }
                
                i18no.loadMessages( context.NAME ).done( resolve ).fail( reject );
            } );
        } );
    };
    
    FandomizedChat.generateI18n = function( ){
        var context = this;
        this.fetchI18n( ).then( function( i18n ){ 
            
        } );
    };
})( window, document, mediaWiki, jQuery );