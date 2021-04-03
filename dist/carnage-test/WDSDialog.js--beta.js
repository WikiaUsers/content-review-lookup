/**
 * WDSDialog
 **/

( function( window, mw ) { 
    "use strict";
    function rand( x, y, seed ) { 
        x = ( !isNaN( x ) && isFinite( x ) ) ? Number( x ) : 0;
        y = ( !isNaN( y ) && isFinite( y ) ) ? Number( y ) : 1;
        const min = Math.min( x, y );
        const max = Math.max( x, y );
        if ( typeof seed !== "function" ) seed = Math.random;
        return seed( ) * ( max - min ) + min;
    }
    
    function randInt( x, y, seed ) { 
        x = ( !isNaN( x ) && isFinite( x ) ) ? Number( x ) : 0;
        y = ( !isNaN( y ) && isFinite( y ) ) ? Number( y ) : 1;
        const min = Math.min( x, y );
        const max = Math.max( x, y );
        if ( typeof seed !== "function" ) seed = Math.random;
        return Math.floor( seed( ) * ( max - min ) + min );
    }
    
    function seed( s ) { 
        const r = Math.sin( s ) * 10000;
        return r - Math.floor( r );
    }
    
    function seedR( s, o ) { 
        const m = 0xffffffff;
 
        var w = ( 123456789 + s ) & m, z = ( 987654321 - s ) & m;
        function h( ) { 
            z = ( 36969 * ( z & 65535 ) + ( z >>> 16 ) ) & m;
            w = ( 18000 * ( w & 65535 ) + ( w >>> 16 ) ) & m;
 
            var r = ( ( z << 16 ) + ( w & 65535 ) ) >>> 0;
            r /= 4294967296;
            return r;
        }
        if ( o ) return h;
        return h( );
    }
    
    function clamp( v, x, y ) { 
        return ( function( m ) { 
            x = ( !isNaN( x ) && isFinite( x ) ) ? Number( x ) : 0;
            y = ( !isNaN( y ) && isFinite( y ) ) ? Number( y ) : 1;
            const min = Math.min( x, y );
            const max = Math.max( x, y );
            return Math.max( min, Math.min( m, max ) );
        } )( v );
    }
    
    function limit( v, y ) { 
        return clamp( v, 0, y );
    }
    
    function clampFrom( v, x ) { 
        return ( function( m ) { 
            const y = Infinity;
            x = ( !isNaN( x ) && isFinite( x ) ) ? Number( x ) : 1;
            const min = Math.min( x, y );
            const max = Math.max( x, y );
            return Math.max( min, Math.min( m, max ) );
        } )( v );
    }
    
    function clampTo( v, y ) { 
        return ( function( m ) { 
            const x = -Infinity;
            y = ( !isNaN( y ) && isFinite( y ) ) ? Number( y ) : 1;
            const min = Math.min( x, y );
            const max = Math.max( x, y );
            return Math.max( min, Math.min( m, max ) );
        } )( v );
    }
    
    const MAX_UID = 99999999, SEED_NUMBER = parseInt( mw.config.get( "wgCityId" ) );
    
    function getUID( seeded ) { 
        if ( !seeded ) return limit( rand( 0, MAX_UID ), MAX_UID );
        const r = seedR( SEED_NUMBER, true );
        return limit( rand( 0, MAX_UID, r ), MAX_UID );
    }
    
    const BASE_Z_INDEX = 5001101;
    
    const CANONICAL_MODAL_TYPES = Object.freeze( [
        "content", "confirm", "prompt"
    ] );
    
    const CACHE = { };
    
    function Dialog( id, content, options ) { 
        if ( !( this instanceof Dialog ) ) return new Dialog( id, content, options );
        
        switch ( arguments.length ) { 
            case 0 : return null;
            case 1 :
                options = Object.assign( { }, id );
                content = options.content;
                id = options.id;
                [ "content", "id" ].forEach( function( k ) { 
                    delete options[ k ];
                } );
                break;
            case 2 :
                options = Object.assign( { }, content );
                content = options.content;
                delete options.content; break;
        }
        
        if ( id === "" || id === void 0 || id === null ) return null;
        
        if ( CACHE[ id ] instanceof Dialog ) { 
            const i = CACHE[ id ];
            i._configure( options );
            if ( i._settings.autoOpen ) i._open( );
            return i;
        }
        
        this._listeners = { };
        this._state = { };
        this._data = { };
        this._active = false;
        this._opened = false;
        this._hasPromise = false;
        this._settings = Object.assign( { }, DEFAULTS );
        this._configure( options );
        
        this._uid = getUID( this._settings.seeded );
        
        this.id = id;
        this.content = content;
        this.buttons = [ ];
        this.type = this._settings.type;
        
        this._create( );
        
        if ( this._settings.nocache ) return this._process( );
        else return ( DIALOG_CACHE[ this.id ] = this._process( ) );
    }
    
    Dialog.prototype = ( { 
        constructor : Dialog,
        _configure : function( o ) { 
            const keys = Object.keys( o );
            Array.from( keys ).forEach( function( k ) { 
                const r = this._settings[ k ], t = o[ k ];
                if ( CHECK.hasOwnProperty( k ) ) {
                    const check = CHECK[ k ];
                    if ( typeof check !== "function" ) this._settings[ k ] = check ? t : r;
                    else this._settings[ k ] = check.call( this, r, t, k, o );
                } else this._setitngs[ k ] = t || r;
            }, this );
        },
        _process : function( ) { 
            if ( this.type === "content" && !this.type ) 
                return this._addContent( );
            else if ( this.type === "prompt" ) return this._createPrompt( );
            else if ( this.type === "confirm" ) return this._createConfirm( );
        },
        _create : function( ) { 
            this.curtain = document.createElement( "div" );
            this.modal = document.createElement( "section" );
            this.header = document.createElement( "header" );
            this.heading = document.createElement( "h2" );
            this.wrapper = document.createElement( "article" );
            this.footer = document.createElement( "footer" );
            this.toolbar = document.createElement( "nav" );
            
            this.curtain.className = "wds-dialog__curtain";
            this.modal.className = "wds-dialog__wrapper";
            this.header.className = "wds-dialog__title";
            this.heading.className = "wds-dialog__heading";
            this.wrapper.className = "wds-dialog__content";
            this.footer.className = "wds-dialog__footer";
            this.toolbar.className = "wds-dialog__actions";
            
            this.footer.append( this.toolbar );
            this.header.append( this.heading );
            this.modal.append( this.header, this.wrapper, this.footer );
            this.curtain.append( this.modal );
        },
        _createPrompt : function( ) {
            this.modal.classList.add( "wds-dialog__prompt" );
            this.promptWrapper = document.createElement( "div" );
            this.promptWrapper.className = "wds-dialog__prompt-wrapper";
            this.promptDescription = document.createElement( "p" );
            this.promptDescription.className = "wds-dialog__prompt-description";
            if ( typeof this.content === "string" ) {
                this.promptDescription.innerHTML = this.content;
            } else if ( Object( this.content ) instanceof HTMLElement ) { 
                this.promptDescription.append( this.content );
            }
            this.promptInputWrapper = document.createElement( "div" );
            this.promptInput = document.createElement( "input" );
            this._hasPromise = true;
            this._promise = new Promise( function( res, rej ) { 
                this._addListener( "cancel", function( value ) { 
                    if ( !value ) rej( "" );
                    else res( value );
                } );
            }.bind( this ) );
            this.promptInput.addEventListener( "input", function( event ) { 
                this._data.value = event.target.value || "";
            }.bind( this ) );
            this.promptInputWrapper.append( this.promptInput );
            this.promptWrapper.append( this.promptDescription, this.promptInputWrapper );
            this.wrapper.append( this.promptWrapper );
            this._generateConfirmOrPromptButtons( );
            return this;
        },
        _generateConfirmOrPromptButtons : function( ) {
            const buttons = Object.freeze( [
                { name : "cancel", text : "Cancel" },
                { name : "confirm", text : "Confirm" }
            ] );
            const types = Object.freeze( [ "cancel", "confirm" ] );
            switch ( this._settings.buttons.length ) {
                case 0 : 
                    this.buttons = Array.from( buttons );
                    break;
                case 1 :
                    const _b = this._settings.buttons[ 0 ];
                    this.buttons[ 0 ] = b.name === "cancel" ? b : buttons[ 0 ];
                    this.buttons[ 1 ] = b.name === "confirm" ? b : buttons[ 1 ];
                    break;
                default : 
                    const m = Array.from( buttons ).map( function( b ) { 
                        return b.name;
                    } );
                    this.buttons = Array.from( this._settings.buttons ).sort( function( a, b ) {
                        const ai = m.indexOf( a.name ), bi = m.indexOf( b.name );
                        return ai - bi;
                    } ).slice( 0, 2 );
                    const c = [ ];
                    this.buttons.forEach( function( b ) { 
                        const name = b.name;
                        if ( !c.includes( name ) && types.includes( name ) ) { 
                            c.push( name );
                        }
                    } );
                    if ( c.length === 1 ) {
                        const l = Array.from( this.buttons );
                        this.buttons[ 0 ] = ( c[ 0 ] === "cancel" ) ? l[ 0 ]
                            : buttons[ 0 ];
                        this.buttons[ 1 ] = ( c[ 0 ] === "confirm" ) ? l[ 0 ]
                            : buttons[ 1 ];
                    } else if ( c.length === 0 ) {
                        this.buttons = Array.from( buttons );
                    }
            }
            this.buttons = this.buttons.map( function( button ) { 
                button.id = button.id 
                    || ( this.id + "__" + button.name + "-button" );
            }, this );
            this.buttonElems = Array.from( this.buttons ).map( function( h ) { 
                const el = document.createElement( "a" );
                el.className = "wds-button wds-is-text";
                el.href = "#";
                el.id = h.id;
                el.dataset.handler = h.name;
                el.addEventListener( "click", function( ev ) { 
                    ev.preventDefault( );
                    this._emitListener( h.name, h.name === "confirm" ?
                        this._data.value : "" );
                }.bind( this ) );
                if ( h.text && typeof h.text === "string" ) {
                    el.innerHTML = String( h.text );
                } else if ( h.content && h.content instanceof Element ) {
                    el.append( h.content );
                }
                return el;
            }, this );
            return this;
        },
        done : function( callback ) { 
            if ( typeof callback !== "function" && !this._hasPromise ) return;
            this._promise.then( callback.bind( this ) );
        },
        fail : function( callback ) { 
            if ( typeof callback !== "function" && !this._hasPromise ) return;
            this._promise[ "catch" ]( callback.bind( this ) );
        }
    } );
} )( window, mediaWiki );