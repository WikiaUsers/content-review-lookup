/**
 * @title           ArticlePreview
 * @version         v1.2
 * @author          Ultimate Dark Carnage
 * @description     This script allows the viewer to see a preview of
 *                  an article by hovering a local link.
 * 
 *                  - version v1.0.1 -
 *                  * Allows a user to create a new page if it does not
 *                    exist
 *                  - version v1.1 -
 *                  * Added support to default colors
 **/

( function( window, document, $, mw ) {
    "use strict";
    
    const MW_CONFIG = Object.freeze( mw.config.get( [
        "wgServer",
        "wgPageName",
        "wgNamespaceNumber",
        "wgArticlePath",
        "wgAction",
        "wgFormattedNamespaces",
        "wgUserGroups",
        "wgUserName"
    ] ) );
    
    const NAME = "ArticlePreview";
    
    const VERSION = "1.3";
    
    const CORE_DEPS = Object.freeze( [ 
        "mediawiki.api", 
        "mediawiki.util",
        "mediawiki.Title"
    ] );
    
    const CORE_EXTS = Object.freeze( [
        "dev.colors",
        "dev.wds",
        "dev.i18n",
        "dev.url"
    ] );
    
    function clamp( n, min, max ) {
        let x = Math.min( min, max ) || -Infinity;
        let y = Math.max( min, max ) || Infinity;
        return Math.max( x, Math.min( n, max ) );
    }
    
    function clampFrom( n, min ) {
        return clamp( n, min, Infinity );
    }
    
    function clampTo( n, max ) {
        return clamp( n, -Infinity, max );
    }
    
    function limit( n, max ){
        return clamp( n, 0, max );
    }
    
    const cap = limit;
    
    // Creating the core ArticlePreview object
    function ArticlePreview( config ) {
        if ( !( this instanceof ArticlePreview ) ) return new ArticlePreview( config );
        this.settings = Object.assign( { }, this.constructor._settings );
        this.host = MW_CONFIG.wgServer,
        this.page = MW_CONFIG.wgPageName;
        this.path = MW_CONFIG.wgArticlePath;
        this.ns = MW_CONFIG.wgNamespaceNumber;
        this.namespaces = MW_CONFIG.wgFormattedNamespaces;
        this.namespace = this.namespaces[ this.ns ];
        this.patterns = Object.assign( { }, this.constructor._patterns );
        
        this.configure( config );
        this.exceptions = this.settings.exceptions;
        this.noImage = this.settings.noImage;
        this.scope = this.settings.scope;
        this.buttons = this.settings.button;
        this.maxLength = this.settings.maxLength;
        this.maxSize = this.settings.maxSize;
        return this;
    }
    
    ArticlePreview._settings = Object.freeze( { 
        exceptions : [
            ".free",
            ".toc a",
            ".wikia-button",
            ".wds-button",
            ".wds-button a",
            ".button a",
            "a.button",
            ".wikia-menu-button a",
            ".new",
            ".external"
        ],
        allowed : [
            "#WikiaRail .rail-module",
            "#mw-content-text",
            "#article-comments"
        ],
        buttons : [
            { msg: "edit", handler: "?action=edit" },
            { msg: "history", handler: "?action=history" },
            { msg: "delete", handler: "?action=delete", admin: true }
        ],
        maxSize : 350,
        maxLength : 400
    } );
    
    ArticlePreview._patterns = Object.freeze( {
        
    } );
    
    ArticlePreview._setters = Object.freeze( {
        maxSize : function( orig, value ) {
            let result = clamp( value, orig, 600 );
            return ( !isNaN( result ) && isFinite( result ) ) ? result : orig;
        },
        maxLength : function( orig, value ) {
            let result = clampFrom( value, orig );
            return ( !isNaN( result ) ) ? result : orig;
        },
        buttons : function( orig, value ) {},
        allowed : function( orig, value ) {},
        exceptions : function( orig, value ) {}
    } );
    
    ArticlePreview.fn = ArticlePreview.prototype;
    
    ArticlePreview.fn.configure = function( config ) {
        const object = Object.assign( { }, config );
        
        Object.keys( object ).forEach( function( key ) {
            if ( !this.settings.hasOwnProperty( key ) ) return;
            const original = this.settings[ key ];
            const value = object[ key ];

            let result = null;
            if ( this.constructor._setters.hasOwnProperty( key ) ){
                const setter = this.constructor._setters[ key ];
                if ( typeof setter !== "function" ){
                    result = setter;
                } else {
                    let r = setter.call( this, original, value );
                    result = r || value;
                }
            } else {
                result = value || original;
            }
            
            this.settings[ key ] = result;
        }, this );
    };
    
    ArticlePreview.fn.loadDeps = function( ) {
        return new Promise( function( resolve, reject ) {
            mw.loader.using( CORE_DEPS ).then( resolve );
        } );
    };
    
    ArticlePreview.fn.loadExts = function( ) {
        const as = "allSettled" in Promise;
        return Promise.all(
            Array.from( CORE_EXTS ).map( function( dep ) {
                return new Promise( function( resolve, reject ) {
                    mw.hook( dep ).add( resolve );
                } );
            } ).concat( this.loadDeps( ) )
        );
    };
    
    const ALLOWED_PAGES = Object.freeze( [ ] );
    
    ArticlePreview.prototype.isAllowedPage = function( ) {
        return Array.from( ALLOWED_PAGES ).some( function( page ) {
            const activePage = this.page;
            const url = new APURL( window.location.href );
            
            if ( Object( page ) instanceof RegExp ) {
                return page.test( activePage );
            } else if ( typeof page === "string" ) {
                return page === activePage;
            } else if ( isPlainObject( page ) ){
                return url.matchParams( page );
            }
            
            return false;
        } , this );
    };
    
    ArticlePreview.fn.load = function( ) {
        if ( !this.isAllowedPage( ) ) return Promise.reject( );
        return new Promise( function( resolve, reject ) {
            this.loadExts( ).then( resolve ).catch( reject );
        }.bind( this ) );
    };
    
    ArticlePreview.fn.loadI18n = function( ){
        const i18n = window.dev.i18n;
        return new Promise( function( resolve, reject ) {
            $.when( i18n.loadMessages( NAME ) ).done( resolve ).fail( reject );
        } );
    };
    
    ArticlePreview.fn.getMessages = function( ){
        return new Promise( function( resolve, reject ) {
            this.loadI18n( ).then( function( i18n ) {
                var messages = { }, keys = Object.keys( i18n._messages.en );
                resolve( Array.from( keys ).reduce( function( obj, key ) {
                    obj[ key ] = Object.assign( { }, obj[ key ], { 
                        parse: i18n.msg( key ).parse,
                        escape: i18n.msg( key ).escape,
                        plain: i18n.msg( key ).plain,
                        markdown: i18n.msg( key ).markdown,
                        replace: function( ) {
                            var args = Array.from( arguments );
                            args.unshift( key );
                            return i18n.msg.apply( i18n, args );
                        }
                    } );
                    return obj;
                }, messages ) );
            }.bind( this ) );
        }.bind( this ) );
    };
} )( window, document, jQuery, mediaWiki );