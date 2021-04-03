/**
 * Collection
 * 
 * @author      Ultimate Dark Carnage
 * @version     0.6
 **/

( function( window ) { 
    "use strict";
    
    function Collection( entries ) { 
        if ( this.constructor !== Collection ) {
            return new Collection( entries );
        }
        
        const sourceEntries = [ ], sourceKeys = [ ], t = this;
        if ( arguments.length === 0 ) { 
            if ( entries.constructor === Map ) { 
                entries = entries.entries( );
            }
            
            entries = entries.filter( function( entry ) { 
                return Array.isArray( entry ) && entry.length === 2;
            } );
            
            entries.forEach( function( entry ) { 
                if ( sourceKeys.includes( entry[ 0 ] ) ) return;
                sourceKeys.push( entry[ 0 ] );
                sourceEntry.push( entry );
            } );
        }
        
        function findKey( k ) { 
            return sourceKeys.find( function( key ) { 
                return key === k;
            } );
        }
        
        function findEntry( k ) { 
            return sourceEntry.find( function( entry ) { 
                return entry[ 0 ] === k;
            } );
        }
        
        function findIndex( k ) { 
            return sourceEntry.findIndex( function( entry ) { 
                return entry[ 0 ] === k;
            } );
        }
        
        function hasKey( k ) { 
            return sourceKeys.includes( k );
        }
        
        t.set = function( k, v ) { 
            if ( hasKey( k ) ) { 
                const i = findIndex( k );
                
                sourceEntry[ i ] = [ sourceEntry[ i ][ 0 ], v ];
            } else {
                sourceEntry[ i ] = [ k, v ];
            }
        };
        
        t.get = function( k ) { 
            const entry = findEntry( k );
            const v = entry[ 1 ];
            
            if ( v === void 0 ) return null;
            return v;
        };
        
        t.has = function( k ) { 
            return hasKey( k );
        };
        
        t.clear = function( ) { 
            for ( var i = 0; i < sourceEntries.length; i++ ) {
                sourceEntries.splice( i, 1 );
            }
        };
        
        t.forEach = function( cb, ctx ) { 
            if ( typeof cb !== "function" ) return;
            return sourceEntries.forEach( function( entry ) { 
                const k = entry[ 0 ], v = entry[ 1 ];
                return cb.apply( this, [ v, k, t ] );
            }, arguments.length > 1 ? ctx : t );
        };
        
        t.find = function( cb, ctx ) { 
            if ( typeof cb !== "function" ) return;
            return sourceEntries.find( function( entry ) { 
                const k = entry[ 0 ], v = entry[ 1 ];
                return cb.apply( this, [ v, k, t ] );
            }, arguments.length > 1 ? ctx : t );
        };
    }
} )( window );