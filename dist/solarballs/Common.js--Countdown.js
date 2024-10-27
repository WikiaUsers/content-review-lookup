/* Any JavaScript here will be loaded for all users on every page load. */

/* Countdown script. */

(function() {
    function startCountdown(elementId, totalSeconds) {
        const countdownElement = document.getElementById(elementId);
        let secondsLeft = totalSeconds;

        function updateCountdown() {
            if (secondsLeft >= 0) {
                const days = Math.floor(secondsLeft / 86400);
                const hours = Math.floor((secondsLeft % 86400) / 3600);
                const minutes = Math.floor((secondsLeft % 3600) / 60);
                const seconds = secondsLeft % 60;
                
                countdownElement.textContent = 
                    `${days}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                
                secondsLeft--;
            } else {
                countdownElement.textContent = "Time's up!";
                clearInterval(countdownInterval);
            }
        }

        const countdownInterval = setInterval(updateCountdown, 1000);
    }

    // Example usage: Replace 'countdown' with the id of your countdown element
    // and 3600 with the total number of seconds for your countdown.
    if (typeof mw !== 'undefined') {
        mw.hook('wikipage.content').add(function($content) {
            const countdownElements = $content.find('.countdown'); // Adjust based on your HTML
            countdownElements.each(function() {
                const totalSeconds = parseInt($(this).data('total-seconds'), 10);
                startCountdown(this.id, totalSeconds);
            });
        });
    }
})();