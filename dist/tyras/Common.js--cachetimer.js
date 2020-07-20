/** <nowiki>
 * Adds a timer to [[Guthixian Cache]]
 *
 * @author Cqm
 *
 * @notes Caches occur ever hour, with every third cache allowing extra benefits
 */

/*
Layout:

+-----------------------------------+----------+
| The next cache begins in:         | HH:MM:SS |
+-----------------------------------+----------+
| The next boosts cache begins in:  | HH:MM:SS |
+-----------------------------------+----------+

+----------------------------------------------+
|         A cache is current active!           |
+-----------------------------------+----------+
| The next boosts cache begins in:  | HH:MM:SS |
+-----------------------------------+----------+

+---------------------------------------+
| The boosts cache is currently active! |
+---------------------------------------+

TODO: finish converting warbands script to work for caches
      then go back and tidy up warbands script
*/

(function ($, rs) {

    'use strict';

    var count = null;

    /**
     * Calculates how many seconds are left in the 3 hour cache cycle and displays that on the page
     */
    function time() {
        var d = new Date(),
            day = d.getUTCDate() - d.getUTCDay(),
            diff = new Date(),
            secs;

        // fix for when we're between 00:00 and 12:00 sunday
        // otherwise it counts up instead of down
        if (d.getUTCDay() === 0 && d.getUTCHours() < 12) {
            day = day - 7;
        }

        // set date to sunday
        diff.setUTCDate(day);

        // hours, minutes, seconds, milliseconds
        // set mins, secs and ms here as changing hours doesn't reset them to zero
        diff.setUTCHours(12, 0, 0, 0);

        // .valueOf() converts to unix time
        // absolute the number so it's always positive
        // it'll be negative when we're on sunday, but before 12 noon
        secs = d.valueOf() - diff.valueOf();

        // negatives cause errors
        if ( secs !== Math.abs( secs ) ) {
            return;
        }

        // convert to seconds integer
        secs = Math.floor(secs / 1000);

        // convert to how much time is left in the 7 hour cycle
        // 3 * 60 * 60 = 10800
        secs = 10800 - ( secs % 10800 );

        if ( secs > 24600 ) {
            // we're in the first 10 mins of the 3 hour cycle
            // and the warband is active
            window.clearInterval(count);
            live(true, secs - 24600);
                return;
            }

            secs = convert( secs );
            $('#gc-countdown').text( secs );

        }

        /**
         * Converts seconds to hours, minutes and seconds
         *
         * @param secs {number} Number of seconds to convert
         * @return {string} Time string in the format hh:mm:ss
         */
        function convert(secs) {

            var hours = Math.floor( secs / 3600 ),
                mins = Math.floor( ( secs % 3600 ) / 60 );

            secs = ( secs % 3600 ) % 60;

            // zero pad mins and secs
            mins = mins < 10 ? '0' + mins : mins;
            secs = secs < 10 ? '0' + secs : secs;

            return hours + ':' + mins + ':' + secs;

        }

        /**
         * Changes status of timer - live or counting down
         *
         * @param live {boolean} (optional) true if the warbands are live
         * @param secs {int} (optional) The number of seconds until the warband ends
         */
    function live(live, secs) {
        
            if (live) {
                $('#gc-countdown').text('Active');
                $('#gc-timer').css('background', '#5f5');
                $('#gc-active').text('A Guthixian Cache is currently');

                // convert to milliseconds
                secs = secs * 1000;
                window.setTimeout(live, secs);
            } else {
                $('#gc-timer').css('background', '#ff5');
                $('#gc-active').text( 'The next cache begins in' );

                count = window.setInterval(time, 1000);
            }

        }

    $(function () {
        count = window.setInterval(time, 1000);
    });

}(this.jQuery, this.rswiki));