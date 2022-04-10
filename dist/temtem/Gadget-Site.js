/* 
 * Any JavaScript here will be loaded for all users (both desktop and mobile) on every page load.
 * 
 * Desktop-only scripts should go in [[MediaWiki:Common.js]]
 * Mobile-only scripts should go in [[MediaWiki:Mobile.js]].
 */

( function() {
    "use strict";
    
    /* Keep variables in one namespace to prevent from creating new variable that may interfere with the global space */
    var ttw = window.ttw = {};
    
    /* Fired whenever wiki content is added. (#mw-content-text, live preview, load page, etc.) */
    mw.hook( "wikipage.content" ).add( function( $wikipageContent ) {
        /* Basic Dropdown */
        $( ".js-dropdown" ).click( function() {
            $( this ).toggleClass( "active" );
        });

        $( document ).click( function(e) {
            const $target = $(e.target);
            if (!$target.is('.js-dropdown') || $target.parents().is('.js-dropdown')) {
            $('.js-dropdown').removeClass( "active" );
            }
        });
        /* End Dropdown */
            
    })
    /* End wiki content hook */    

    /* Fires when DOM is ready */
    $( function() {
        
    });
    /* End of DOM */
    
}());