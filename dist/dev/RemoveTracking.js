// RemoveTracking by Agent Zuri
(function() {
    'use strict';

    // Prevent double-loading
    if ( window.RemoveTrackingLoaded ) return;
    window.RemoveTrackingLoaded = true;

    // Copied from https://plainjs.com/javascript/utilities/set-cookie-get-cookie-and-delete-cookie-5/
    function getCookie ( name ) {
        var v = document.cookie.match( '(^|;) ?' + name + '=([^;]*)(;|$)' );
        return v ? v[2] : null;
    }

    // Define meta-variables if undefined
    if ( !window.hasOwnProperty( 'dev' ) ) window.dev = {};
    if ( !window.dev.hasOwnProperty( 'forceRemoveTracking' ) ) window.dev.forceRemoveTracking = true;

    // Check if user rejected tracking
    if ( getCookie( 'tracking-opt-in-status' ) === 'rejected' || window.dev.forceRemoveTracking ) {
        // Catch tracking elements
        var trackers = document.querySelectorAll( '[data-tracking-label], [data-tracking]' );

        // Prevent unusual exception when trackers doesn't exist
        if ( !trackers ) return;

        // Perform to all tracking elements found
        trackers.forEach( function( tracker ) {
            // Remove tracking attributes from elements
            tracker.removeAttribute( 'data-tracking' );
            tracker.removeAttribute( 'data-tracking-label' );
        } );
    }
})();