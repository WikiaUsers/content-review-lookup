( function( window, document ){
    "use strict";
    const PARSE_HTML = function( string, all ){ 
        var BODY = null;
        if ( !( "DOMParser" in window ) ){
            const DOC = document.implementation.createHTMLDocument( "DOC" );
            BODY = DOC.body;
            BODY.innerHTML = string;
        } else {
            const PARSER = new DOMParser( );
            BODY = PARSER.parseFromString( string, "text/html" ).body;
        }
        
        if ( !all ){
            return BODY.firstElementChild || BODY.firstChild;
        } else {
            var childNodes = Array.prototype.slice.call( BODY.children || BODY.childNodes );
            return childNodes.filter( function( childNode ){ 
                return childNode.nodeType === childNode.ELEMENT_NODE;
            } );
        }
    };
    
    const CLAMP = function( value, min, max ){ 
        const x = max < min ? max : min;
        const y = max < min ? min : max;
        
        return Math.max( x, Math.min( value, y ) );
    };
    
    const CLAMP_FROM = function( value, min ){
        return CLAMP( value, min, Infinity );
    };
    
    const CLAMP_TO = function( value, max ){
        return CLAMP( value, -Infinity, max );
    };
    
    function Quake( name, options ){
        if ( !( this instanceof Quake ) ) return new Quake( name, options );
        
        if ( !this.constructor.COMPONENTS[ name ] ){
            throw new Error( "This is not a valid component." );
        }
        
        this.__base = this.constructor.COMPONENTS[ name ];
        this.__uid = this.constructor.UID++;
        this.__settings = Object.assign( { }, this.__base.constructor.settings );
        this.__instance = null;
        this.__configure( options );
        return this;
    }
    
    Quake.extend = function extend( target ){
        if ( arguments.length === 0 ){
            return this;
        }
        
        var sources = [ ];
        
        if ( arguments.length === 1 ){
            sources.push( target );
            target = this;
        } else {
            sources = Array.prototype.slice.call( arguments, 1 );
        }
        
        loopSources: while ( sources.length ){
            const source = sources.shift( );
            if ( sources === void 0 || sources === null ) continue loopSources;
            
            loopKeys: for ( const key in source ){
                const original = source[ key ];
                
                if ( typeof original === "object" ){
                    target[ key ] = Object.assign( { }, target[ key ] );
                    extend( target[ key ], original );
                } else if ( original !== void 0 ){
                    target[ key ] = original;
                } else continue loopKeys;
            }
        }
        
        return target;
    };
    
    Quake.extend( { 
        UID: 0,
        COMPONENTS: { },
        CACHE: { },
        bridge: function( name, BaseConstructor ){
            if ( this.COMPONENTS[ name ] ){
                throw new Error( "This component already exists." );
            }
            
            this.COMPONENTS[ name ] = function( id, options ){
                const base = new BaseConstructor( id, options );
                this.extend( base );
                
                Quake.CACHE[ name ] = Object.assign( { }, Quake.CACHE[ name ] );
                if ( Quake.CACHE[ name ][ id ] ){
                    return Quake.CACHE[ name ][ id ];
                }
                
                Quake.CACHE[ name ][ id ] = this;
                return this;
            };
        }
    } );
    
    Quake.fn = Quake.prototype;
    
    Quake.fn.extend = Quake.extend;
    
    function QuakeComponent(){}
    
    QuakeComponent.fn = QuakeComponent.prototype;
    
    QuakeComponent.fn.extend = Quake.extend;
    
    window.Quake = Quake;
    
    window.QuakeComponent = QuakeComponent;
} )( window, document );