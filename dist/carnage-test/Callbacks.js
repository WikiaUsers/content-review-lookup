( function( window, mw ) { 
    "use strict";
    const CALLBACK_NAMESPACES = { };
    const DEFAULTS = Object.freeze( { 
        once : false,
        memory : false
    } );
    const ts = function( o ) { 
        return Object.prototype.toString.call( o );
    };
    const isPlainObject = function( o ) { 
        return ts( o ) === "[object Object]";
    };
    const isNumber = function( o ) { 
        return !isNaN( o ) && isFinite( o );
    };
    function Callbacks( namespace, options ) { 
        if ( !( this instanceof Callbacks ) ) return new Callbacks( namespace, options );
        this._options = Object.assign( { }, DEFAULTS );
        this._hasNamespace = false;
        this._configure = function( opts ) { 
            if ( Object( opts ) instanceof String ) {
                const s = opts.split( /\s+/g );
                opts = Array.from( s ).reduce( function( o, k ) {
                    if ( k !== "" ) o[ k ] = true;
                    return o;
                }, { } );
            } else if ( Array.isArray( opts ) ) {
                opts = Array.from( opts ).reduce( function( o, k ) {
                    if ( k !== "" ) o[ k ] = true;
                    return o;
                }, { } );
            } else if ( !isPlainObject( opts ) ) return;
            
            Object.keys( opts ).forEach( function( key ) { 
                const orig = this._options[ key ];
                if ( opts[ key ] !== void 0 ) {
                    this._options[ key ] = opts[ key ];
                } else {
                    this._options[ key ] = orig;
                }
            }, this );
        };
        if ( arguments.length !== 1 ) { 
            if ( isPlainObject( namespace ) ) { 
                this._configure( namespace );
            } else {
                const namespaceIsArray = Array.isArray( namespace );
                this._configure( options );
                if ( namespaceIsArray ) { 
                    Array.from( namespace ).forEach( function( n ) { 
                        CALLBACK_NAMESPACES[ String( n ) ] = this;
                    }, this );
                } else {
                    const n = String( namespace );
                    if ( CALLBACK_NAMESPACES.hasOwnProperty( n ) ) { 
                        const context = CALLBACKS_NAMESPACES[ n ];
                        if ( context instanceof Callbacks ) {
                            context._configure( options );
                            return context;
                        }
                    } else {
                        CALLBACK_NAMESPACES[ n ] = this;
                    }
                }
            }
        } else this._configure( namespace );
        
        this._queue = [ ];
        this._list = [ ];
        this._fired = null;
        this._firing = null;
        this._locked = null;
        this._memory = null;
        this._firingIndex = -1;
        
        const fire = function fire( ) { 
            this._locked = this._locked || this._options.once;
            this._fired = this._firing = true;
            for ( ; this._queue.length; this._firingIndex = -1 ) {
                this._memory = this._queue.shift( );
                while ( ++this._firingIndex < this._list.length ) {
                    const r = this._list[ this._firingIndex ];
                    const result = r.apply( this._memory[ 0 ], this._memory[ 1 ] );
                    if ( result === false && this._options.stopOnFalse ) {
                        this._firingIndex = this._list.length;
                        this._memory = false;
                    }
                }
            }
            
            if ( !this._options.memory ) {
                this._memory = false;
            }
            
            this._firing = false;
            
            if ( this._locked ) {
                if ( this._memory ) this._list = [ ];
                else this._list = "";
            }
        };
        
        Object.assign( this, { 
            add : function( ) { 
                const a = Array.from( arguments );
                if ( this._list ) {
                    if ( this._memory && !this._firing ) {
                        this._firingIndex = this._list.length - 1;
                        this._queue.push( this._memory );
                    }
                    
                    ( function add( args ) {
                        Array.from( args ).forEach( function( item ) { 
                            if ( typeof arg === "function" ) {
                                if ( 
                                    !this._options.unique || !this.has( item ) 
                                ) {
                                    this._list.push( item );
                                }
                            } else if ( 
                                item && item.length && typeof item !== "string"
                            ) {
                                add.call( this, item );
                            }
                        }, this );
                    } ).call( this, a );
                    
                    if ( this._memory && !this._firing ) fire.call( this );
                }
                return this;
            },
            remove : function( ) {
                Array.from( arguments ).forEach( function( item ) { 
                    var index = -1;
                    while ( ( index = this._list.indexOf( item ) ) > -1 ) {
                        this._list.splice( index, 1 );
                        if ( index <= this._firingIndex ) this._firingIndex--;
                    }
                }, this );
                return this;
            },
            has : function( callback ) {
                return arguments.length > 0 ?
                    this._list.indexOf( callback ) > -1 :
                    this._list.length > 0;
            },
            empty : function( ) { 
                if ( this._list ) this._list = [ ];
                return this;
            },
            disable : function( ) { 
                this._locked = this._queue = [ ];
                this._list = this._memory = "";
                return this;
            },
            disabled : function( ) {
                return !this._list;
            },
            lock : function( ) {
                this._locked = this._queue = [ ];
                if ( !this._memory && !this._firing ) {
                    this._list = this._memory = "";
                }
                return this;
            },
            locked : function( ) {
                return !!this._locked;
            },
            fireWith : function( context, args ) {
                if ( this._locked ) {
                    args = Array.from( args || [ ] );
                    args = [ context, args ];
                    this._queue.push( args );
                    if ( !this._firing ) fire.call( this );
                }
                return this;
            },
            fire : function( ) { 
                return this.fireWith( this, arguments );
            },
            fired : function( ) {
                return !!this.__fired;
            }
        } );
        return this;
    }
    
    window.Callbacks = Callbacks;
} )( this, mediaWiki );