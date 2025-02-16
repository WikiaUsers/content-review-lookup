mw.hook('wikipage.content').add(function($content) {
	$content.find('.deezerwidget').each(function(_, ele) {
		var data = ele.dataset;

		if (data.loaded) return;
		data.loaded = true;

		var params = new URLSearchParams({
			format: '' + data.playlist,
			autoplay: window.DeezerWidgetDisableAutoplay ? 'false' : ('' + data.autoplay),
			playlist: '' + data.playlist,
			color: '' + data.color,
			layout: '' + data.layout,
			size: '' + data.size,
			type: '' + data.type,
			emptyPlayer: '' + data.emptyPlayer,
			id: '' + data.id,
			app_id: '1'
		});

		// Remove empty values
		params.forEach(function(value, prop) {
			if (value === 'undefined') params.delete(prop);
		});

		// Append iframe
		ele.innerHTML = mw.html.element('iframe', {
			scrolling: 'no',
			frameborder: '0',
			allowTransparency: 'true',
			src: 'https://www.deezer.com/plugins/player?' + params,
			width: ('' + data.width).trim(),
			height: ('' + data.height).trim()
		});
	});
});