/* Live Clock for Main Page */
$(function() {
    function updateClock() {
        var now = new Date();
        var hours = String(now.getHours()).padStart(2, '0');
        var minutes = String(now.getMinutes()).padStart(2, '0');
        var seconds = String(now.getSeconds()).padStart(2, '0');
        var timeString = hours + ':' + minutes + ':' + seconds;
        
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var dateString = now.toLocaleDateString('en-US', options);
        
        $('#wiki-clock-time').text(timeString);
        $('#wiki-clock-date').text(dateString);
    }
    
    if ($('#wiki-clock-time').length) {
        updateClock();
        setInterval(updateClock, 1000);
    }
});