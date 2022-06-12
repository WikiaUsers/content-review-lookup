/* Any JavaScript here will be loaded for all users on every page load. */
var t = document.getElementsByClassName('hour-countdown'), prev;
if (t) {
    setInterval(function() {
        var now = new Date();
        if (now.valueOf() !== prev) {
            prev = now.valueOf();
            $(t).text('' + (720 - now.getMinutes()) + ':' + (720 - now.getSeconds()).toString().padStart(2, '0'));
        }
    }, 500);
}