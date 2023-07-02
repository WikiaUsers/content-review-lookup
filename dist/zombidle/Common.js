/* Any JavaScript here will be loaded for all users on every page load. */

(function BountiesTimer() {
    /**
     * @class Timer
     */
    function Timer(endDate, display) {
        this.endDate = new Date(endDate + 'Z'); // Time in UTC
        this.displayElem = display;
 
        this.start = function() {
            this._countDown();
        };
        
        /**
         * @private
         */
        this._countDown = function() {
            var timeLeft = this.endDate.getTime() - Date.now();
            if(timeLeft < 0) {
                this._displayDate(0);
            } else {
                setTimeout(this._countDown.bind(this), 1000); // Refresh every second
                this._displayDate(timeLeft);
            }
        };
 
        /**
         * @private
         * @param{number} time Time in milliseconds
         */
        this._displayDate = function(time) {
            var timeString = getDays(time) + 'd ' + getHours(time) + 'h ' + getMinutes(time) + 'm ' + getSeconds(time) + 's';
            this.displayElem.innerHTML = timeString;
        };
 
        // Time conversion functions
        //   all take time in milliseconds
        function getDays(time) {
            return time / (1000 * 3600 * 24) | 0;
        }
 
        function getHours(time) {
            return time % (1000 * 3600 * 24) / (1000 * 3600) | 0;
        }
 
        function getMinutes(time) {
            return time % (1000 * 3600) / (1000 * 60) | 0;
        }
 
        function getSeconds(time) {
            return time % (1000 * 60) / 1000 | 0;
        }
    }
 
    var timerElements = document.getElementsByClassName('cscripts_timers_bounties-timer');
    if(timerElements.length === 0) {
        return;
    }
 
    var timers = [];
    for(var i = 0; i < timerElements.length; ++i) {
        var timer = new Timer(timerElements[i].dataset['endDate'], timerElements[i]);
        timer.start();
        timers.push(timer);
    }
})();