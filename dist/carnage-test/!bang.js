( function( window, mw, $ ) { 
    "use strict";
    // Ensures the UCP object exists
    window.UCP = window.UCP || { };
    // Creating the !bang object
    window.UCP[ "!bang" ] = function( o ) { 
        const searchInput = document.querySelector( ".wds-global-navigation__search-input" );
        
        const namespaces = Object.freeze( { 
            t : "Template",
            mw : "MediaWiki",
            s : "Special",
            h : "Help",
            m : "Module",
            f : "File",
            u : "User",
            p : "Project",
            c : "Category"
        } );
        
        const throttle = function throttle( f, d ) { 
            var timerId;
            return function( ) {
                if ( timerId ) return;
                const a = Array.from( arguments ), context = this;
                timerId = setTimeout( function( ) { 
                    f.apply( context, a );
                    timerId = undefined;
                }, d );
            };
        };
        
        const npattern = /^\!(\w+)\s+(.*)$/;
        
        searchInput.addEventListener( "input", function( event ) { 
            const string = event.target.value;
            if ( string.match( npattern ) ) { 
                event.target.value = string.replace( npattern, function( m, k, s ) { 
                    
                    if ( namespaces.hasOwnProperty( k ) ) {
                        return namespaces[ k ] + ":" + s;
                    }
                    
                    return m;
                } );
            }
        } );
    };
} )( this, jQuery, mediaWiki );