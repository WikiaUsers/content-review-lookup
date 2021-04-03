( function( window, document ){
    "use strict";
    
    function Card( target ) { 
        if ( this.constructor !== Card ) {
            return new Card( target );
        }
        
        if ( target instanceof Node ) {
            target = [ target ];
        } else if ( 
            target instanceof NodeList || 
            target instanceof HTMLCollection
        ) {
            target = Array.from( target || [ ] );
        } else if ( typeof target === "string" ) {
            target = Array.from( document.querySelectorAll( target ) || [ ] );
        } else {
            target = Array.from( document.querySelectorAll( ".card-render" ) || [ ] );
        }
        
        const c = this;
        
        c._entries = [ ];
        
        c._fetchFromTarget = function( ) { 
            if ( !target.length ) return;
            
            target.forEach( function( t ) { 
                const image = t.querySelector( ".card-image" );
            } );
        };
    }
} )( window, document );