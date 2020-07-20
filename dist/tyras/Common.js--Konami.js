/** <nowiki>
 * Konami code
 *
 * Redirects to [[Cabbage]] when konami code is input
 *
 * @source <http://www.yourinspirationweb.com/en/fun-with-javascript-jquery-and-konami-code/>
 */

;( function ( $ ) {

    'use strict';

    $( function () {

        var keys = [],
            konami = '38,38,40,40,37,39,37,39,66,65';

        $( document ).keydown( function ( e ) {

            keys.push( e.keyCode );

            if ( keys.toString().indexOf( konami ) > -1 ) {
                // redirect to [[Cabbage]]
                window.location.assign( '/wiki/Cabbage' );
            }
        } );
    } );

}( jQuery ) );