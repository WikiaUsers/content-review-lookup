/**
 * RemoveTracking by Agent Zuri
 * 
 * Disclaimer: Running this script may have an advesre impact on functionality of
 * some site elements and/or other custom scripts.
 * 
 * By removing tracking attributes from site DOM elements you agree that when
 * something goes wrong, it may not be possible to fix it while maintaining
 * core functionality of this script – i.e. intentionally breaking tracking.
 */
mw.loader.using( 'mediawiki.cookie', function() {
    'use strict';

    // Prevent double-loading
    if ( window.RemoveTrackingLoaded ) return;
    window.RemoveTrackingLoaded = true;

    // Define meta-variables if undefined
    window.dev = window.dev || {};
    window.dev.forceRemoveTracking = window.dev.forceRemoveTracking || true;

    // Check if user rejected tracking
    if ( mw.cookie.get( 'tracking-opt-in-status', '' ) === 'rejected' || window.dev.forceRemoveTracking ) {
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
} );