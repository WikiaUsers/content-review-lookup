/* Employee infobox stats slider */
/* User:Joritochip */
$(function() {
    if (window.EmployeeInfoboxSliderLoaded) return;
    window.EmployeeInfoboxSliderLoaded = true;

    var infobox = $('.portable-infobox.type-employee');
    if (!infobox.length) return;

    var stats = infobox.find('.stats-slider');
    var statsContainer = stats.find('.stats-display');
    var sliderContainer = stats.find('.slider');
    
    var label = $('<span>Level 1</span>');
    var slider = $('<input type="range" min="1" max="20" value="1" step="1">');

    var classes = stats[0].classList;

    slider.change(function() {
        var val = $(this).val();
        label.text('Level '+val);
        classes.forEach(function(c) {
            var split = c.split('-');
            var display = statsContainer.find('span.stat-'+split[0]);
            if (split && split.length == 3 && display.length) {
                display.text(parseInt(split[1]) + parseInt(split[2]) * (val - 1));
            }
        });
    });
    slider.on('input', function() {
        $(this).trigger('change');
    });

    sliderContainer.append(label, slider);
});

/* Daily Reset Timer */
/* User:Joritochip */
$(function() {
    var timer = $('#daily-reset-timer').not('.timer-started');
    if (!timer.length) return;
    timer.addClass('timer-started');

    function format(n) {
        return (n < 10 ? '0' : '') + n;
    }

    function update() {
        var dateNow = new Date();
        
        var dateThen = new Date();
        dateThen.setUTCHours(dateNow.getUTCHours() < 4 ? 4 : 28, 0, 0, 0);

        var diff = dateThen - dateNow;
        var hours = diff / 3.6e6 | 0;
        var mins = diff % 3.6e6 / 6e4 | 0;
        var secs = Math.round(diff % 6e4 / 1e3);

        timer.text(format(hours) + ':' + format(mins) + ':' + format(secs));
    }

    update();
    setInterval(update, 1000);
});