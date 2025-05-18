/* Any JavaScript here will be loaded for all users on every page load. */
$(function () {
    var container = $('<div>', { id: 'spooky-timer' });
    var timer = $('<div>', { id: 'spooky-countdown', text: '00:00' });
    var caption = $('<div>', { id: 'spooky-caption', text: 'Intermission...' });

    container.append(timer).append(caption);
    $('body').append(container);

    // Start the timer
    var seconds = 0;
    setInterval(function () {
        seconds++;
        var mins = String(Math.floor(seconds / 60)).padStart(2, '0');
        var secs = String(seconds % 60).padStart(2, '0');
        $('#spooky-countdown').text(mins + ':' + secs);
    }, 1000);
});