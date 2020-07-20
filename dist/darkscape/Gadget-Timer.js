/** <nowiki>
 * Adds a UTC clock to oasis (global nav) or monobook (user links)
 *
 * @author Poke <http://bulbapedia.bulbagarden.net/wiki/User:Poke>
 * @author Suppa chuppa
 * @author Ryan PM
 * @author Cqm
 */
 
/* From RuneScape Wiki */
 
;( function ( $, mw ) {
 
    'use strict';
 
    var self = {
        /**
         * Placeholder for element to update with the new time
         */
        $timer: null,
 
        /**
         * Initial loading function
         */
        init: function () {
            var $elem = $( '#WikiHeader > .buttons, #p-personal ul:first-child' ),
                $li;
 
            if ( !$elem.length ) {
                return;
            }
 
            // don't load twice
            if ( $( '#display-timer' ).length ) {
                return;
            }
 
            $li = $( '<li>' )
                .attr( 'id', 'display-timer' )
                .append(
                    $( '<a>' )
                        .attr( {
                            'id': 'show-date',
                            'title': 'Purge the server cache and update the contents of this page.',
                            'href': mw.util.wikiGetlink() + '?action=purge'
                        } )
                );
 
            if ( mw.config.get( 'skin' ) === 'oasis' ) {
                $elem.append(
                    $li.attr( 'class', 'oasis-timer' )
                );
            } else {
                $elem.prepend( $li );
            }
 
            // store reference to element which we update the time with
            self.$timer = $( '#show-date' );
            // set initial time
            self.update();
            // and update every 5 secs
            setInterval( self.update, 5000 );
        },
 
        /**
         * Updates the time
         */
        update: function () {
            var time = ( new Date() )
                .toUTCString()
                .replace( 'GMT', '(UTC)' )
                .substring( 5 );
 
            self.$timer.text( time );
        }
 
    };
 
    $( self.init );
 
}( jQuery, mediaWiki ) );