( function( window ) { 
    "use strict";
    function noop( ) { }
    
    function isInst( o, c ) { 
        return Object( o ) instanceof c;
    }
    
    function ts( o ) { 
        return Object.prototype.toString.call( o );
    }
    
    function isPlainObject( o ) { 
        return ts( o ) === "[object Object]"; 
    }
    
    function CacheProxy( ) { 
        const cache = { };
        this.get = function( key ) { 
            if ( arguments.length > 0 ) { 
                if ( Array.isArray( key ) ) {
                    return Array.from( key ).reduce( function( o, k ) { 
                        const v = cache[ k ];
                        if ( v !== void 0 ) {
                            o[ k ] = v;
                        }
                        return o;
                    }, { } );
                } else {
                    const value = cache[ key ];
                    return value !== void 0 ? value : null;
                }
            } else {
                return cache;
            }
        };
        this.set = function( key, value ) { 
            if ( isPlainObject( key ) ) { 
                return Object.keys( key ).every( function( k ) {
                    const v = key[ k ];
                    return this.set( k, v );
                }, this );
            } else {
                if ( value === void 0 ) return false;
                cache[ key ] = value;
                return true;
            }
        };
        this.has = function( key ) { 
            if ( Array.isArray( key ) ) {
                return Array.from( key ).flat( Infinity )
                    .every( this.has, this );
            } else {
                return cache.hasOwnProperty( key );
            }
        };
        this.forEach = function( callback, context ) { 
            const keys = Object.keys( cache );
            context = arguments.length > 1 ? context : this;
            callback = isInst( callback, Function ) ? callback : noop;
            Array.from( keys ).forEach( function( key ) { 
                const value = cache[ key ];
                callback.call( context, key, value, cache );
            } );
        };
        this.map = function( callback, context ) { 
            const keys = Object.keys( cache );
            context = arguments.length > 1 ? context : this;
            callback = isInst( callback, Function ) ? callback : noop;
            return Array.from( keys ).map( function( key ) { 
                const value = cache[ key ];
                return { key : key, value : callback.call( context, key, value, cache ) };
            } ).reduce( function( obj, result ) { 
                const key = result.key;
                const value = result.value;
                if ( value !== void 0 ) {
                    obj[ key ] = value;
                }
                return obj;
            }, { } );
        };
        this.filter = function( callback, context ) { 
            const keys = Object.keys( cache );
            context = arguments.length > 1 ? context : this;
            callback = isInst( callback, Function ) ? callback : noop;
            Array.from( keys ).filter( function( key ) { 
                const value = cache[ key ];
                return callback.call( context, key, value, cache );
            } ).reduce( function( obj, key ) { 
                obj[ key ] = cache[ key ];
                return obj;
            }, { } );
        };
        var currentItem, currentIndex = 0;
        this.done = false;
        this.prev = function( ) { 
            if ( this.done ) return void 0;
            const keys = Object.keys( cache );
            const length = keys.length;
            const lastIndex = length - 1;
            const key = keys[ lastIndex - currentIndex++ ];
            
            currentItem = cache[ key ];
            if ( currentIndex === length ) {
                this.done = true;
                currentIndex = 0;
            }
            return currentItem;
        };
        this.next = function( ) { 
            if ( this.done ) return void 0;
            const keys = Object.keys( cache );
            const length = keys.length;
            const lastIndex = length - 1;
            const key = keys[ currentIndex++ ];
            
            currentItem = cache[ key ];
            if ( currentIndex === length ) {
                this.done = true;
            }
            return currentItem;
        };
        this.reset = function( ) { 
            currentIndex = 0;
            currentItem = void 0;
            this.done = false;
        };
    }
    window.CacheProxy = CacheProxy;
} )( this );