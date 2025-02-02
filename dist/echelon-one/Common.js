$(document).ready(function() {
    // Create the clock container
    var clockContainer = '<div id="header-chronometer"><span class="clock-digits"></span></div>';

    // Find the container to insert the clock into
    var targetContainer = $('.fandom-community-header__top-container');

    // Insert the clock container into the target container
    if (targetContainer.length > 0) {
        targetContainer.append(clockContainer);
    }

    // Function to update the clock
    function updateHeaderClock() {
        var now = new Date();
        var hours = now.getHours().toString().padStart(2, '0');
        var minutes = now.getMinutes().toString().padStart(2, '0');
        var seconds = now.getSeconds().toString().padStart(2, '0');
        var timeString = hours + ':' + minutes + ':' + seconds;

        // Update the clock digits
        $('#header-chronometer .clock-digits').text(timeString);
    }

    // Update the clock every second
    setInterval(updateHeaderClock, 1000);

    // Initial call to set the time immediately
    updateHeaderClock();
});