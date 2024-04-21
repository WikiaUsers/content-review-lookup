$(function () {
	var lang = mw.config.get('wgUserLanguage'),
		isDark = mw.config.get('isDarkTheme');

	mw.hook('wikipage.content').add(function($content) {
		var elements = $content.find('div[data-type]');
		if (elements.length == 0) return;
		elements.each(function(i) {
			var element = $(this),
				data = element.data('id').split(':'),
				iframe = document.createElement('iframe'),
				defaultWidth, defaultHeight;

			switch (element.data('type')) {

				// Apple Music: Album
				case 'applemusic:album':
					iframe.src = 'https://embed.music.apple.com/fr/album/' + element.data('id');
					defaultWidth = 300;
					defaultHeight = 300;
					break;

				// Apple Music: Track
				case 'applemusic:track':
					iframe.src = 'https://embed.music.apple.com/fr/album/' + data[0] + '/?i=' + data[1];
					defaultWidth = 300;
					defaultHeight = 120;
					break;
			}

			if (!iframe.width) iframe.width = (element.data('width') || defaultWidth) + 'px';
			if (!iframe.height) iframe.height = (element.data('height') || defaultHeight) + 'px';

			element.after(iframe);
			element.remove();
		});
	});
});