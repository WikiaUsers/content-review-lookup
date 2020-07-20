/* Any JavaScript here will be loaded for all users on every page load. */
 
;( function ( document, location, $ ) {
 
    'use strict';
 
    $( function () {
 
        var keys = [],
            konami = '38,38,40,40,37,39,37,39,66,65';
 
        $( document ).keydown( function ( e ) {
 
            keys.push( e.keyCode );
 
            if ( keys.toString().indexOf( konami ) > -1 ) {
                window.location.assign( '/wiki/Mahouka_Koukou_no_Rettousei' );
            }
        } );
    } );
 
}( this.document, this.location, this.jQuery ) );