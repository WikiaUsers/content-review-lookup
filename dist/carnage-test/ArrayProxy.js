( function( window ) { 
    "use strict";
    function ArrayProxy( ) {
        if ( !( this instanceof ArrayProxy ) ) {
            const a = Array.from( arguments );
            return new ArrayProxy( a );
        }
        
        const a = Array.from( arguments );
        
        var r = [ ];
        if ( a.length === 1 ) { 
            if ( Array.isArray( a[ 0 ] ) ) {
                r = r.concat( a[ 0 ] );
            } else if ( isNumber( a[ 0 ] ) ) {
                r = new Array( a[ 0 ] );
            } else {
                r = [ a[ 0 ] ];
            }
        } else if ( a.length > 1 ) {
            r = r.concat( a );
        }
        
        r.forEach( function( item, index ) { 
            
        }, this );
    }
} )( this );