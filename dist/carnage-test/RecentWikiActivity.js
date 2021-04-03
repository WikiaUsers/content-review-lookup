( function( window, $, mw ) { 
    "use strict";
    // Namespaces to show WikiActivity in
    const NAMESPACES = Object.freeze( [ 
        0, 1, 2, 3, 4, 5, 6, 7, 10, 11, 500, 501
    ] );
    // Icons by recent changes event
    const ICONS = Object.freeze( { 
        "new" : "add",
        "edit" : "new"
    } );
} )( this, jQuery, mediaWiki );