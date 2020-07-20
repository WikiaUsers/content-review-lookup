// This page relies on https://dev.fandom.com/wiki/Chart to function

$(document).ready(function() {
    // Set the default color
    Chart.defaults.global.defaultColor = '#268bd2';
    
    // Activates charts
    idx = 0;
    $('div.chart').each(function() {
        canvas_id = 'canvas-' + idx;

        $(this).empty()
        $(this).append($('<canvas id="' + canvas_id + '">'));
        var chart = new Chart($('#' + canvas_id), $(this).data('json'));

        idx += 1;
    });
});