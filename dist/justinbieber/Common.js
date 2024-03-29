/* Any JavaScript here will be loaded for all users on every page load. */

/* BackToTopButton */
window.BackToTopModern = true;

/* YouTube subscribe button */
importScriptURI('//apis.google.com/js/platform.js');

/* YouTube subscribe/views */
$(document).ready(function() {
	$('.pi-theme-ytBox').each(function() {
		function numberWithCommas(x) {
			return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
		var username = $('.pi-title').text().toLowerCase();
		var ytBox = $(this);
		$.ajax({
			url: 'https://www.googleapis.com/youtube/v3/channels?forUsername=' + username + '&part=statistics&key=AIzaSyCkQCSBWwmMaBDJ4YrkLNGu_MbDVttaPY0',
			type: 'GET',
			dataType: 'json'
		})
		.done(function(data) {
			views = data.items[0].statistics.viewCount;
			subscribers = data.items[0].statistics.subscriberCount;
			ytBox.find('.ytViewerCount').html(numberWithCommas(views));
			ytBox.find('.ytSubscriberCount').html(numberWithCommas(subscribers));
		})
	});
});

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