/* Any JavaScript here will be loaded for all users on every page load. 
   Adds reusable timer. */
window.Countdown = (function() {
    // Constructor
    function Countdown(target) {
        // Store date. (is unix epoch, and as such is automatically localised)
        this._date = new Date(parseInt(target.data("countdown-time"), 10) * 1000);
        
        // Store target (is already jQuery wrapped)
        this._target = target;
        
        // Set up interval. (stored to allow ending of loop, this is passed so context is still accessible.)
        this._intervalId = setInterval(this.update, 1000, this);
    }
    
    // Update displayed time
    Countdown.prototype.update = function(self) {
        // Calculate time remaining.
        var timeleft = Math.floor(self._date.getTime() / 1000) - Math.floor(new Date().getTime() / 1000);
        
        // If timeleft is 0, set value to data-countdown-endmsg, and end interval loop.
        if (timeleft <= 0) {
            self._target.html(self._target.data("countdown-endmsg"));
            clearInterval(self._intervalId);
            return;
        }
        
        // Extract units.
        var releaseDays, releaseMinutes, releaseSeconds;
        daysLeft = Math.floor(timeleft / 86400);
        timeleft %= 86400;
        hoursLeft = Math.floor(timeleft / 3600);
        timeleft %= 3600;
        minutesLeft = Math.floor(timeleft / 60);
        secondsLeft = Math.floor(timeleft % 60);
        
        // Build readable string.
        var content = daysLeft + "d " + hoursLeft + "h " + minutesLeft + "m " + secondsLeft + "s";
        self._target.html(content);
        
    };
    
    return Countdown;
})();

// Match all DOM elements with a specific class, and apply Countdown.
$(".countdown2").each(function() {
    new window.Countdown($(this));
});