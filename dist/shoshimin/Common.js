/* Any JavaScript here will be loaded for all users on every page load. */
// Countdown Timer
(function() {
    function updateCountdowns() {
        var now = new Date();
        $('.countdown').each(function() {
            var $this = $(this);
            var endDate = new Date($this.find('.countdowndate').text());
            var remaining = endDate - now;

            if (remaining < 0) {
                $this.html($this.find('.post_countdown').html());
                return;
            }

            var seconds = Math.floor((remaining / 1000) % 60);
            var minutes = Math.floor((remaining / (1000 * 60)) % 60);
            var hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
            var days = Math.floor(remaining / (1000 * 60 * 60 * 24));

            $this.find('.countdown-number').html(days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's');
        });
    }

    if ($('.countdown').length) {
        setInterval(updateCountdowns, 1000);
        updateCountdowns();
    }
})();