/* 这里的任何JavaScript将为所有用户在每次页面加载时加载。 */

jQuery(function($) {
	$('.embed-video').each(function() {
		tag = $(this);
		var $container = $(tag);
		source = $container.attr('data-src');
		poster = $container.attr('data-poster');
		width = $container.attr('data-width');
		align = $container.attr('data-align');
		caption = $container.attr('data-caption');
		html = '<div class="nomobile">';
		html += '<div class="thumb embedvideo ev_' + align + '" style="width: ' + width + ';">';
		if(caption != "") html += '<div class="embedvideo thumbinner html5player">';
		html += '<div class="embedvideowrap"><video src="' + source + '" controls width="' + width + '" poster="' + poster + '" /></div>';
		html += '<div class="thumbcaption">' + caption + '</div>';
		html += '</div>';
		if(caption != "") html += '</div>';
		$(tag).replaceWith(html);
		warpper = $('.embedvideowrap');
		$('video').attr('width', $(warpper).width());
	})
});