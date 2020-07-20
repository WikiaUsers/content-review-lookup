/* Any JavaScript here will be loaded for all users on every page load. */

;( function ( $ ) {
 
    'use strict';
 
    $( function () {
 
        var keys = [],
            konami = '38,38,40,40,37,39,37,39,66,65';
 
        $( document ).keydown( function ( e ) {
 
            keys.push( e.keyCode );
 
            if ( keys.toString().indexOf( konami ) > -1 ) {
                // redirect the user
                window.location.assign( 'http://i.ytimg.com/vi/9avDgHtynXo/hqdefault.jpg' );
            }
        } );
    } );
 
}( jQuery ) );