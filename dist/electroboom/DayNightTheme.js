/**
 * The Day/Night theme switcher.
 * Changes the wiki's them based on the time of day. Changes every 12 hours.
 * From 7 AM to 7 PM and vice-versa.
*/
(function(){
    var t = new Date().getHours();
    if (t >= 19 || t < 7) {
        if ($('body').hasClass('night')) return;
        $('body').addClass('night').removeClass('day');
    } else if (t >= 7 || t < 19) {
        if ($('body').hasClass('day')) return;
        $('body').addClass('day').removeClass('night');
    }
})();