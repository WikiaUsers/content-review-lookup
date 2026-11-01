/* Таймер для Dust Picks */
mw.loader.using(['mediawiki.util'], function() {
    var timer = document.getElementById('daily-timer-box');
    if (!timer) return; 

    function updateClock() {
        var now = new Date();
        var midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
        
        var diff = midnight - now;
        
        var h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        var s = Math.floor((diff % (1000 * 60)) / 1000);
        
        h = h < 10 ? "0" + h : h;
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;
        
        timer.innerHTML = "Daily Reset in: " + h + "h " + m + "m " + s + "s";
    }
    
    updateClock();
    setInterval(updateClock, 1000);
});