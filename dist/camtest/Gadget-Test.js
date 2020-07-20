/** <nowiki>
 * Testing [ResourceLoader] on [[MediaWiki:Gadgets-definition]]
 */
;( function ( $, console ) {

    'use strict';

    $( function () {

        // log js has loaded
        console.log( 'gadget test.js loaded - 3' );

        // check css is loaded too
        if ( $( 'link[href*="ext.gadget"]' ).attr( 'href' ).indexOf( 'Test' ) > -1 ) {
            console.log( 'gadget css loaded' );
        }

    });

}( this.jQuery, this.console ) );

/* </nowiki> */