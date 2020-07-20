/** <nowiki>
 * Adds a timer to [[Supply Run]], based on the Warbands timer
 *
 * @author Suppa chuppa
 * @author Cqm
 *
 * @notes Supply runs occur every 12 hours starting at daily reset
 */
 
( function ( window, $, rswiki ) {
 
    'use strict';
 
    rswiki.supplyruns = {
 
        /**
         * Used in setInterval
         */
        count: false,
 
        /**
         * Loading function
         */
        init: function () {
            rswiki.supplyruns.count = window.setInterval( rswiki.supplyruns.time, 1000 );
        },
 
        /**
         * Calculates how many seconds are left in the 12 hour supplyrun cycle and displays that on the page
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
 
            // convert to how much time is left in the 12 hour cycle
            // 12 * 60 * 60 = 43200
            secs = 43200 - ( secs % 43200 );
 
            if ( secs > 41700 ) {
                // we're in the first 25 mins of the 12 hour cycle
                // and the supply run is active
                window.clearInterval( rswiki.supplyruns.count );
                rswiki.supplyruns.live( true, secs - 41700 );
                return;
            }
 
            secs = rswiki.supplyruns.convert( secs );
            $( '#sr-countdown' ).text( secs );
 
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
         * @param live {boolean} (optional) true if the supplyruns are live
         * @param secs {int} (optional) The number of seconds until the supplyruns ends
         */
        live: function ( live, secs ) {
 
            if ( live ) {
                $( '#sr-countdown' ).text( 'Active' );
                $( '#sr-timer' ).css( 'background', '#5f5' );
                $( '#sr-active' ).text( 'Supply Runs is currently' );
 
                // convert to milliseconds
                secs = secs * 1000;
                window.setTimeout( rswiki.supplyruns.live, secs );
            } else {
                $( '#sr-timer' ).css( 'background', '#ff5' );
                $( '#sr-active' ).text( 'The next supply run begins in' );
 
                rswiki.supplyruns.count = window.setInterval( rswiki.supplyruns.time, 1000 );
            }
 
        }
 
    };
 
    $( rswiki.supplyruns.init );
 
}( this, this.jQuery, this.rswiki = this.rswiki || {} ) );
 
// </nowiki>