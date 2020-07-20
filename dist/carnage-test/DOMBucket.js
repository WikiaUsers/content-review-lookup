( function( window, document ){
    function DOMBucket( target ){
        if ( !( this instanceof DOMBucket ) ) return new DOMBucket( target );
        
        if ( !( Object( target ) instanceof Node || Object( target ) instanceof Element ) ){
            if ( typeof target === "string" ){
                target = document.querySelector( target );
            } else if ( Array.isArray( target ) ){
                var elements = target;
                target = document.createDocumentFragment( );
                
                elements.forEach( function( element ){
                    target.appendChild( element );
                } );
            } else if ( target === document ){
                target = document.documentElement;
            }
        }
        
        this.target = target;
        return this;
    }
    
    DOMBucket.extend = function extend( target ){
        var sources = Array.prototype.slice.call( arguments, 1 );
        
        if ( arguments.length === 0 ){
            return this;
        } else if ( arguments.length === 1 ){
            sources = [ target ];
            target = this;
        }
        
        loopSources: while ( sources.length ){
            var source = sources.shift( );
            
            if ( source === null || source === void 0 ) continue loopSources;
            
            loopProperties: for ( const property in source ){
                var original = source[ property ];
                
                if ( typeof original === "object" ){ 
                    target[ property ] = Object.assign( { }, target[ property ] );
                    extend( target[ property ], original );
                } else if ( original !== void 0 ){
                    target[ property ] = original;
                } else {
                    continue loopProperties;
                }
            }
        }
        
        return target;
    };
    
    DOMBucket.extend( {
        createNode: function( value ){
            var isNode = Object( value ) instanceof Node;
            return isNode ? value : document.createTextNode( String( value ) );
        },
        createFragmentFromArgs: function( args ){
            var fragment = document.createDocumentFragment( );
            
            args.forEach( function( element ){
                fragment.appendChild( element );
            } );
            
            return fragment;
        },
        toElements: function( args ){
            if ( Array.isArray( args[ 0 ] ) ){
                args = args[ 0 ];
            }
            return Array.from( args ).map( function( elem ){
                if ( typeof elem === "string" ){
                    return document.querySelector( elem );
                } else if ( Array.isArray( elem ) ){
                    var fragment = this.createFragmentFromArgs( elem );
                    return fragment;
                } else if ( Object( elem ) instanceof Node || Object( elem ) instanceof Element ){
                    return elem;
                } else return null;
            } ).filter( function( elem ){ 
                return elem !== null || elem !== void 0;
            } );
        }
    } );
    
    DOMBucket.fn = DOMBucket.prototype;
    
    DOMBucket.fn.extend = DOMBucket.extend;
    
    DOMBucket.fn.extend( {
        append: function( ){
            try { 
                var args = this.constructor.toElements( arguments );
                
                if ( this.target.append ){
                    this.target.append.apply( this.target, args );
                } else {
                    var fragment = this.createFragmentFromArgs( args );
                    this.target.appendChild( fragment );
                }
                return true;
            } catch ( e ){
                return false;
            }
        },
        remove: function( ){
            try {
                if ( arguments.length === 0 ){
                    if ( this.target.remove ){
                        this.target.remove( );
                    } else {
                        this.target.parentNode.removeChild( this.target );
                    }
                } else {
                    var args = this.constructor.toElements( arguments );
                    
                    args.forEach( function( element ){
                        this.target.removeChild( element );
                    }, this );
                }
                
                return true;
            } catch ( e ){
                return false;
            }
        },
        after: function( ){
            try {
                var args = this.constructor.toElements( arguments );
                
                if ( this.target.after ){
                    this.target.after.apply( this.target, args );
                } else {
                    var fragment = this.createFragmentFromArgs( args );
                    this.target.parentNode.insertBefore( fragment, this.target.nextSibling );
                }
                
                return true;
            } catch ( e ){
                return false;
            }
        },
        before: function( ){
            try {
                var args = this.constructor.toElements( arguments );
                
                if ( this.target.before ){
                    this.target.before.apply( this.target, args );
                } else {
                    var fragment = this.createFragmentFromArgs( args );
                    this.target.parentNode.insertBefore( fragment, this.target );
                }
                return true;
            } catch ( e ){
                return false;
            }
        },
        on: function( eventType, callback, options ){
            this.target.addEventListener( eventType, callback, options );
            return this;
        }
    } );
    
    window.DOMBucket = DOMBucket;
} )( window, document );