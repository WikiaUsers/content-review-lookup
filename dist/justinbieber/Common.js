/* Any JavaScript here will be loaded for all users on every page load. */

/* PreloadTemplates */
preloadTemplates_list = "MediaWiki:Custom-PreloadTemplatesList";
preloadTemplates_namespace = "Justin Bieber Wiki";

/* BackToTopButton */
window.BackToTopModern = true;

/* Calendar */
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var date = new Date();
var currentMonth = date.getMonth();
var currentDay = date.getDate() - 1;
var viewMonth = currentMonth;

function initCalendar() {
    // Parse month and day, not implemented
    loadMonth(currentMonth);
}

function loadMonth(month) {
    $('#cal #month').text(months[month]);
    var newMonth = '';
    for (var i = 0; i < days[month]; i++) {
        var classes = (month == currentMonth && i == currentDay) ? "day current" : "day";
        newMonth = newMonth + '<a href="/wiki/' + (i+1) + '_' + months[month] + '"><div class="' + classes + '">' + (i+1) + '</div></a>';
    }
    $('#cal #cal-frame').fadeOut('fast', function() {
        $('#cal #cal-frame').html(newMonth).fadeIn('fast');
    });
    viewMonth = month;
}

mw.hook('AddRailModule.module').add(function () {
    initCalendar();
    $('#cal #prev').click(function() {
        loadMonth((viewMonth - 1 + 12) % 12);
    });
    $('#cal #next').click(function() {
        loadMonth((viewMonth + 1) % 12);
    });
});