/* Any JavaScript here will be loaded for all users on every page load. */

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