/** <nowiki>
 * Adds a timer to [[Warbands]]
 *
 * @author Suppa chuppa
 * @author Cqm
 *
 * @notes Warbands occur noon (utc) sunday and every 7 hours after
 */

( function ( window, $, rswiki ) {

    'use strict';

    rswiki.warbands = {

        /**
         * Used in setInterval
         */
        count: false,

        /**
         * Loading function
         */
        init: function () {
            rswiki.warbands.count = window.setInterval( rswiki.warbands.time, 1000 );
        },

        /**
         * Calculates how many seconds are left in the 7 hour warband cycle and displays that on the page
         */
        time: function () {

            var d = new Date(),
                day = d.getUTCDate() - d.getUTCDay(),
                diff = new Date(),
                secs;

            // fix for when we're between 00:00 and 12:00 sunday
            // otherwise it counts up instead of down
            if ( d.getUTCDay() === 0 && d.getUTCHours() < 12 ) {
                day = day - 7;
            }

            // set date to sunday
            diff.setUTCDate( day );

            // hours, minutes, seconds, milliseconds
            // set mins, secs and ms here as changing hours doesn't reset them to zero
            diff.setUTCHours( 12, 0, 0, 0 );

            // .valueOf() converts to unix time
            // absolute the number so it's always positive
            // it'll be negative when we're on sunday, but before 12 noon
            secs = d.valueOf() - diff.valueOf();

            // negatives cause errors
            if ( secs !== Math.abs( secs ) ) {
                return;
            }

            // convert to seconds integer
            secs = Math.floor( secs / 1000 );

            // convert to how much time is left in the 7 hour cycle
            // 7 * 60 * 60 = 25200
            secs = 25200 - ( secs % 25200 );

            if ( secs > 24600 ) {
                // we're in the first 10 mins of the 7 hour cycle
                // and the warband is active
                window.clearInterval( rswiki.warbands.count );
                rswiki.warbands.live( true, secs - 24600 );
                return;
            }

            secs = rswiki.warbands.convert( secs );
            $( '#wb-countdown' ).text( secs );

        },

        /**
         * Converts seconds to hours, minutes and seconds
         *
         * @param secs {number} Number of seconds to convert
         * @return {string} Time string in the format hh:mm:ss
         */
        convert: function ( secs ) {

            var hours = Math.floor( secs / 3600 ),
                mins = Math.floor( ( secs % 3600 ) / 60 );

            secs = ( secs % 3600 ) % 60;

            // zero pad mins and secs
            mins = mins < 10 ? '0' + mins : mins;
            secs = secs < 10 ? '0' + secs : secs;

            return hours + ':' + mins + ':' + secs;

        },

        /**
         * Changes status of timer - live or counting down
         *
         * @param live {boolean} (optional) true if the warbands are live
         * @param secs {int} (optional) The number of seconds until the warband ends
         */
        live: function ( live, secs ) {
        
            if ( live ) {
                $( '#wb-countdown' ).text( 'Active' );
                $( '#wb-timer' ).css( 'background', '#5f5' );
                $( '#wb-active' ).text( 'Wilderness Warbands is currently' );

                // convert to milliseconds
                secs = secs * 1000;
                window.setTimeout( rswiki.warbands.live, secs );
            } else {
                $( '#wb-timer' ).css( 'background', '#ff5' );
                $( '#wb-active' ).text( 'The next warband begins in' );

                rswiki.warbands.count = window.setInterval( rswiki.warbands.time, 1000 );
            }

        }

    };

    $( rswiki.warbands.init );

}( this, this.jQuery, this.rswiki = this.rswiki || {} ) );

// </nowiki>