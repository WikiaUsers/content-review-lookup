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