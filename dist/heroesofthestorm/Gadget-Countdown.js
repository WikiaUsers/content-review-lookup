
/*******************
/* Countdown Timer *
/*******************/

/**
 * To create a timer add the class countdown-timer to the element that will container the countdown as well
 * as the attribute countdown-timer, which should container the target date-time for the countdown.
 * The target element can contain default output for if javascript is disabled by the user, such as the target date-time.
 *
 * Relies on [[MediaWiki:Gadget-Countdown]].
 */
$(function() {
    $('.countdown-timer[data-countdown-timer]').each(function () {
        var el = this;
        var targetDate = new Date($(el).attr('data-countdown-timer'));
        countdown.setLabels('||m|h|d|','||m|h|d|',' ',' ');
        $(el).html(countdown(null, targetDate, countdown.DAYS | countdown.HOURS | countdown.MINUTES).toString());
        countdown.resetLabels();
        setInterval(function() {
            countdown.setLabels('||m|h|d|','||m|h|d|',' ',' ');
            $(el).html(countdown(null, targetDate, countdown.DAYS | countdown.HOURS | countdown.MINUTES).toString());
            countdown.resetLabels();
        }, 1000);
    });
});