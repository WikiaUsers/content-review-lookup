require( [
    "wikia.window",
    "wikia.document",
    "jquery",
    "mw"
], function( window, document, $, mw ){
    "use strict";
    
    const VERSION = "v1.0";
    
    const AUTHOR = "Ultimate Dark Carnage";
    
    const BLACKLISTED_NAMESPACES = Object.freeze( [
        "Template",
        "Special"
    ] );
    
    const BLACKLISTED_QUERY_VALUES = Object.freeze( {
        action: Object.freeze( [
            "edit",
            "history"
        ] ),
        nowikisense: Object.freeze( [
            "1",
            "true"
        ] )
    } );
    
    const LOGGER_CACHE = { };
    
    const DAY = 24 * 60 * 60 * 1000;
    
    function isAuthor( ){
        return mw.config.get( "wgUserName" ) === AUTHOR;
    }
    
    function Logger( id ){
        if ( !( this instanceof Logger ) ) return new Logger( id );
        
        if ( LOGGER_CACHE.hasOwnProperty( id ) ){
            return LOGGER_CACHE[ id ];
        }
        
        this.__id = id;
        this.__active = false;
        
        if ( isAuthor( ) ){
            this.__active = true;
        }
        
        this.__delay = 0;
        this.__delayActive = false;
        this.__delayTimeout = null;
        
        return ( LOGGER_CACHE[ id ] = this );
    }
    
    Logger.prototype.log = function( message ){
        if ( !this.__active ) return;
        const msg = String( message ) + "; Log ID: " + this.__id;
        
        if ( this.__delay > 0 ){
            this.delayLog( function( ){
                console.log( msg );
            } );
        } else {
            console.log( msg );
        }
    };
    
    Logger.prototype.error = function( message, __throw__ ){
        if ( !this.__active ) return;
        
        const msg = String( message ) + "; Log ID: " + this.__id;
        
        if ( this.__delay > 0 ){
            this.delayLog( function( ){
                if ( __throw__ ){
                    throw new Error( msg );
                } else {
                    console.error( msg );
                }
            } );
        } else {
            if ( __throw__ ){
                throw new Error( msg );
            } else {
                console.error( msg );
            }
        }
    };
    
    Logger.prototype.warn = function( message ){
        if ( !this.__active ) return;
        
        const msg = String( message ) + "; Log ID: " + this.__id;
        
        if ( this.__delay > 0 ){
            this.delayLog( function( ){
                console.warn( msg );
            } );
        } else {
            console.warn( msg );
        }
    };
    
    Logger.prototype.delay = function( ms ){
        if ( this.__delayActive ) return this;
        const time = Math.max( 0, Math.min( !isNaN( ms ) && isFinite( ms ) ? parseInt( ms ) : 0, DAY ) );
        
        if ( time === 0 ) return this;
        Object.defineProperties( this, {
            __delay: {
                configurable: false,
                enumerable: false,
                writable: false,
                value: time
            },
            __delayActive: {
                configurable: false,
                enumerable: false,
                writable: false,
                value: true
            }
        } );
        return this;
    };
    
    Logger.prototype.delayLog = function( callback ){
        if ( this.__delay === 0 ) callback.call( this );
        this.__delayTimeout = setTimeout( function( ){
            clearTimeout( this.__delayTimeout );
            this.__delayTimeout = null;
            
            callback.call( this );
        }.bind( this ), this.__delay );
    };
    
    Logger.prototype.activate = function( condition ){
        if ( this.__active ) return this;
        
        let activate = false;
        if ( typeof condition !== "function" ){
            activate = true;
        } else {
            let res = condition.call( this );
            activate = res ? true : false;
        }
        
        if ( !activate ) return this;
        this.__active = true;
        return this;
    };
    
    Logger.prototype.deactivate = function( condition ){
        if ( !this.__active ) return this;
        
        let deactivate = false;
        if ( typeof condition !== "function" ){
            deactivate = true;
        } else {
            let res = condition.call( this );
            deactivate = res ? true : false;
        }
        
        if ( !deactivate ) return this;
        this.__active = false;
        return this;
    };
    
    const AUTHOR_LOG = new Logger( "author.log" );
    const DEBUG_LOG = new Logger( "debug.log" );
    const GENERAL_LOG = new Logger( "general.log" );
    
    function getUrlParams( url ){
        let a = document.createElement( "a" ), params = { };
        a.href = url;
        
        let f = a.search.substr( 1 ).split( "&" ).filter( function( m ){
            return m !== "";
        } );
        
        return f.reduce( function( o, string ){
            let eq = string.indexOf( "=" );
            
            let key = string.substr( 0, eq ), value = string.substr( eq + 1 );
            o[ key ] = value;
            return o;
        }, params );
    }
    
    function allowDebug( ){
        let params = getUrlParams( window.location.href ), allow = false;
        if ( window.WikiSenseDebug ){
            allow = true;
        } else {
            if ( params.hasOwnProperty( "debug" ) ){
                let t = [ "true", "1", "" ];
                allow = t.indexOf( params.debug ) > -1 ;
            }
        }
        return allow;
    }
    
    DEBUG_LOG.activate( allowDebug );
    
    GENERAL_LOG.activate( );
    
    GENERAL_LOG.log( "Loading WikiSense, version " + VERSION + "." );
    
    function WikiSense( ){
        if ( !( this instanceof WikiSense ) ) return new WikiSense( );
        this.__contentLoaded = false;
        this.__isContentPage = false;
        this.__allowed = false;
        this.__elapsedTime = 0;
        AUTHOR_LOG.log( "Initializing WikiSense instance, version " + VERSION + "." );
        return this;
    }
    
    WikiSense.prototype.loadContent = function( ){
        this.__paragraphs = [ ];
        this.__contentPromise = new Promise( function( resolve, reject ){
            mw.hook( "wikipage.content" ).add( resolve );
        } );
        this.__i18nPromise = new Promise( function( resolve, reject ){
            mw.hook( "dev.i18n" ).add( resolve );
        } );
        
        Promise[ "allSettled" in Promise ? "allSettled" : "all" ]( [
            this.__contentPromise,
            this.__i18nPromise
        ] ).then( this.createController.bind( this ) );
    };
    
    WikiSense.prototype.createController = function( $content, i18no ){
        this.contentElement = jQuery( $content ).get( 0 );
        let children = Array.from( this.contentElement.children );
        let hasParagraph = children.some( function( child ){
            return child.tagName.toLowerCase( ) === "p";
        } );
        
        this.__complete = null;
        if ( !hasParagraph ){
            this.__complete = Promise.reject( "There are no paragraph elements present on the content wrapper." );
        } else {
            this.__complete = Promise.resolve( children.map( function( child ){
                return String( child.textContent );
            } ) );
        }
        
        this.__complete
            .then( this.parseParagraphs.bind( this ) )
            .catch( DEBUG_CACHE.error );
    };
    
    WikiSense.prototype.parseParagraphs = function( paragraphs ){
        this.__paragraphs = paragraphs.filter( function( p ){
            return p !== "";
        } );
        
        this.__activeUtterance = null;
        this.__synthesis = window.speechSynthesis;
        this.__state = "inactive";
        this.__paused = false;
        this.__active = false;
        this.__text = "";
    };
    
    WikiSense.prototype.speak = function( ){
        this.__activeUtterance = new SpeechSynthesisUtterance( this.__text );
        let voices = Array.from( this.__synthesis.getVoices( ) );
        if ( voices.length > 0 ){
            this.__activeUtterance.voice = voices[ 0 ];
        }
        this.__activeUtterance.addEventListener( "end", this.end );
        this.__synthesis.speak( this.__activeUtterance );
        this.__state = "active";
        this.__active = true;
        this.__paused = false;
    };
} );