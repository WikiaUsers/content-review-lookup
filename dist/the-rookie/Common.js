/* Any JavaScript here will be loaded for all users on every page load. */
$(function() {
    mw.hook('DiscordIntegrator.added').add(function($el) {
        $el.appendTo('#WikiaRail');
    });
});

/*countdown timer*/
var t = document.getElementsByClassName('hour-countdown'), prev;
if (t) {
    setInterval(function() {
        var now = new Date();
        if (now.valueOf() !== prev) {
            prev = now.valueOf();
            $(t).text('' + (60 - now.getMinutes()) + ':' + (60 - now.getSeconds()).toString().padStart(2, '0'));
        }
    }, 500);
}