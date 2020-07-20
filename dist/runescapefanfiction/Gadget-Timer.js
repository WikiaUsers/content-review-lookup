/** <nowiki>
 * Adds a UTC clock to the global navigation in the Oasis skin
 *
 * @author Poke <http://bulbapedia.bulbagarden.net/wiki/User:Poke>
 * @author Suppa chuppa
 * @author Ryan PM
 * @author Cqm
 */

;( function ( window, document, $, mw, rswiki ) {

    'use strict';

    rswiki.displaytimer = {
        /**
         * Checks for global nav and inserts new nodes
         */
        init: function () {

            var li,
                a,
                elem = mw.config.get( 'skin' ) === 'oasis' ? document.getElementById( 'GlobalNavigation' ) :
                           document.getElementById( 'p-personal' ).getElementsByTagName( 'ul' )[0];

            // create elements
            li = document.createElement( 'li' );
            a = document.createElement( 'a' );

            li.setAttribute( 'id', 'display-timer' );
            a.setAttribute( 'id', 'show-date' );
            a.setAttribute( 'title', 'Purge the server cache and update the contents of this page.' );
            a.setAttribute( 'href', '/wiki/' + mw.config.get( 'wgPageName' ) + '?action=purge' );

            li.appendChild( a );

            // make sure there's something to add the timer into
            if ( mw.config.get( 'skin' ) === 'oasis' && !!elem ) {
                elem.appendChild( li );
            } else if ( !!elem ) {
                elem.insertBefore( li, elem.firstChild );
            } else {
                return;
            }

            // insert time
            rswiki.displaytimer.update();
            // and update time every 5 seconds
            window.setInterval( rswiki.displaytimer.update, 5000 );

        },

        /**
         * Updates the time
         */
        update: function () {

            var time = new Date(),
                a = document.getElementById( 'show-date' );

            time = time.toUTCString();
            time = time.replace( 'GMT', '(UTC)' )
                       .substring( 5 );

            a.innerHTML = time;

        }
    };

    $( rswiki.displaytimer.init );

}( this, this.document, this.jQuery, this.mediaWiki, this.rswiki = this.rswiki || {} ) );

/* <nowiki> */