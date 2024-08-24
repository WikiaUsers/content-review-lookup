/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página */

/*******************
/* Main page boxes *
/*******************/

/**
 * This function moves the right hand boxes on the main page down in narrow windows to avoid sideways scrolling.
 */

function mainPageBoxes() {
    if ($(window).width() < 1590) {
        $('body.ns-0.page-Heroes_of_the_Storm_Wiki').css('min-width','0');
        $('body.ns-0.page-Heroes_of_the_Storm_Wiki div#content').css('width', 'calc(937px + 6em)');
        $('body.ns-0.page-Heroes_of_the_Storm_Wiki .main-page.main-page-left').css('width','100%');
        $('body.ns-0.page-Heroes_of_the_Storm_Wiki #news, body.ns-0.page-Heroes_of_the_Storm_Wiki #community, body.ns-0.page-Heroes_of_the_Storm_Wiki #competitive-scene').css('width','calc(50% - 1em)').css('margin-left','0').css('margin-right','2em').css('float','left').css('box-sizing','border-box').css('-mox-box-sizing','border-box');
        $('body.ns-0.page-Heroes_of_the_Storm_Wiki #twitter').css('width','calc(50% - 1em)').css('margin-left','auto').css('margin-right','0');
    } else {
        $('body.ns-0.page-Heroes_of_the_Storm_Wiki').removeAttr('style');
        $('body.ns-0.page-Heroes_of_the_Storm_Wiki div#content').removeAttr('style');
        $('body.ns-0.page-Heroes_of_the_Storm_Wiki .main-page.main-page-left').removeAttr('style');
        $('body.ns-0.page-Heroes_of_the_Storm_Wiki #news, body.ns-0.page-Heroes_of_the_Storm_Wiki #community, body.ns-0.page-Heroes_of_the_Storm_Wiki #competitive-scene').removeAttr('style');
        $('body.ns-0.page-Heroes_of_the_Storm_Wiki #twitter').removeAttr('style');
    }
}

mainPageBoxes();

$(window).resize(mainPageBoxes);

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

if (typeof countdown !== 'undefined') { // Check that the countdown library is present
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
} else {
    console.error('Warning: The Countdown javascript library is not present on the wiki or its gadget is disable in your user preferences. Countdowns will not function.');
}

/** 
 * Match Heights
 */
$('.match-heights').each(function() {
    var heights = [];

    $(this).children().each(function() {
        heights.push($(this).outerHeight());
    });

    var height = Math.max.apply(null,heights);

    $(this).children().css('height', height + 'px');
});