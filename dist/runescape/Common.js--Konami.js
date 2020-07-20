/** <nowiki>
 * Konami code
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
                window.location.assign( window.atob('L3dpa2kvUGl0Y2hmb3JrX29mX2p1c3RpY2U=') );
            }
        } );
    } );

}( jQuery ) );