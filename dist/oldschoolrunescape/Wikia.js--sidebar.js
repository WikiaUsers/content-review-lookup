( function ( $, mw ) {
 
    'use strict';
 
    function addRSWGuideModule() {
        $( '<section>' )
            .attr( 'class', 'RSWGuide module' )
            .append(
                $( '<h1>' )
                    .css( {
                        'margin-top': '0px',
                        'margin-bottom': '10px'
                    } )
 
                    // Head text for module
                    .text( 'Are advertisements obstructing this page?' )
            )
            .append(
                $( '<div>' )
                    .append(
                        $( '<p>' )
                            .append(
                                $( '<a>' )
                                    .attr( 'href', '/wiki/2007scape_Wiki:Advertisements' )
                                    // you don't need a trailing period/full stop on this
                                    .text( 'Click here to find out how to resolve that' ),
                                '.'
                            )
                    )
            )
            .insertBefore( '.LatestPhotosModule' );
    }
 
    function init() {
        if ( $( ".LatestPhotosModule" ).length ) {
            addRSWGuideModule();
            return;
        }
 
        setTimeout( init, 500 );
    }
 
    init()
 
}( this.jQuery, this.mediaWiki ) );