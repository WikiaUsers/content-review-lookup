/* ============================================================
   NATIONAL UNIVERSE WIKI - LIVE CLOCK WITH DATE
   ============================================================ */

$(document).ready(function() {
    if ($('#nu-live-clock').length) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        function updateClock() {
            var now = new Date();
            var hours = now.getHours();
            var minutes = now.getMinutes();
            var seconds = now.getSeconds();
            var day = now.getDate();
            var month = months[now.getMonth()];
            
            // 12-hour format
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            
            // Add leading zeros
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            
            var timeString = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
            var dateString = month + ' ' + day;
            
            $('#nu-live-clock').html(timeString);
            $('#nu-live-date').html(dateString);
        }
        
        updateClock();
        setInterval(updateClock, 1000);
    }
});