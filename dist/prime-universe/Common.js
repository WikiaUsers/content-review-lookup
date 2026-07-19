/* ============================================================
   PRIME UNIVERSE WIKI - COMMON.JS
   ============================================================ */

/* Live Clock for Main Page
   Pairs with .mainpage-clock styling in Mainpage.css.
   Markup:
   <div class="mainpage-clock">
     <span id="wiki-clock-time"></span>
     <span id="wiki-clock-date"></span>
     <span class="clock-label">Multiverse Standard Time</span>
   </div>
*/
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