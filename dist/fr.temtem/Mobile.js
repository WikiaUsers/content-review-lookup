/* Any JavaScript here will be loaded for all users on mobile on every page load. */

( function() {
    "use strict";
    
    /* Keep variables in one namespace to prevent from creating new variable that may interfere with the global space */
    var ttw = window.ttw = {};
    
    /* Fired whenever wiki content is added. (#mw-content-text, live preview, load page, etc.) */
    mw.hook( "wikipage.content" ).add( function( $wikipageContent ) {

        /* Insert code */
            
    })
    /* End wiki content hook */    

    /* Fires when DOM is ready */
    $( function() {
        
    });
    /* End of DOM */
    
}());