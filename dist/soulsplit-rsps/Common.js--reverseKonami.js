/* Any JavaScript here will be loaded for all users on every page load. */
;( function ( $ ) {
 
    'use strict';
 
    $( function () {
 
        var keys = [],
            reverseKonami = '65,66,39,37,39,37,40,40,38,38';
 
        $( document ).keydown( function ( e ) {
 
            keys.push( e.keyCode );
  if (keys.toString().indexOf( reverseKonami ) > -1){ 
                //redirect the user
                window.location.assign('http://media.tumblr.com/e533cdd30b34a8813b4cc7da4a9d3b82/tumblr_inline_mpwj7uZrC11qz4rgp.gif');
            }
        } );
    } );
 
}( jQuery ) );