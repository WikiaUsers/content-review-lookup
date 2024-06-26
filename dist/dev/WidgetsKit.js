$(function () {
	var lang = mw.config.get('wgUserLanguage'),
		isDark = mw.config.get('isDarkTheme');

	mw.hook('wikipage.content').add(function($content) {
		var elements = $content.find('div[data-type]');
		if (elements.length == 0) return;
		elements.each(function(i) {
			var element = $(this),
				data = element.attr('data-id').split(':'),
				iframe = document.createElement('iframe'),
				defaultWidth, defaultHeight;

			switch (element.data('type')) {
				// AllMyLinks
				case 'allmylinks':
					iframe.src = 'https://allmylinks.com/widget/profile/' + data[0] + '.html';
					defaultWidth = 395;
					defaultHeight = 163;
					iframe.scrolling = 'no';
					
					// Return zero for dark theme if light theme is specified
					if (data[1] === 'light') {
						iframe.src += '?dark=0';
					// Apply dark theme if specified or the wiki uses dark theme
					} else if (data[1] === 'dark' || isDark) {
						iframe.src += '?dark=1';
					}
					
					// Skip small size if small size is specified
					if (data[2] === 'small') {}
					// Apply dark theme if specified or the wiki uses dark theme
					else if (data[2] === 'big' || data[2] === 'large') {
						iframe.src += '&big=1';
						iframe.height = '324px';
					}
					break;
				// Amazon Music
				case 'amazonmusic':
					iframe.src = 'https://music.amazon.com/embed/' + element.data('id');
					defaultWidth = 300;
					defaultHeight = 410;
					break;

				// Apple Music: Album
				case 'applemusic:album':
					iframe.src = 'https://embed.music.apple.com/us/album/' + element.data('id');
					defaultWidth = 300;
					defaultHeight = 300;
					break;

				// Apple Music: Track
				case 'applemusic:track':
					iframe.src = 'https://embed.music.apple.com/us/album/' + data[0] + '/?i=' + data[1];
					defaultWidth = 300;
					defaultHeight = 120;
					break;

				// Apple Podcasts: Show
				case 'applepodcasts':
				case 'applepodcasts:show':
					iframe.src = 'https://embed.podcasts.apple.com/us/podcast/' + element.data('id');
					defaultWidth = 300;
					defaultHeight = 450;
					break;

				// Apple Podcasts: Episode
				case 'applepodcasts:episode':
					iframe.src = 'https://embed.podcasts.apple.com/us/podcast/' + data[0] + '/?i=' + data[1];
					defaultWidth = 300;
					defaultHeight = 175;
					break;

				// Google Forms
				case 'googleforms':
					iframe.src = 'https://docs.google.com/forms/d/e/' + element.data('id') + '/viewform';
					defaultWidth = 500;
					defaultHeight = 500;
					break;

				// Google Spreadsheets
				case 'googlespreadsheets':
					iframe.src = 'https://docs.google.com/spreadsheets/d/e/' + element.data('id') + '/pubhtml?widget=true';
					defaultWidth = 680;
					defaultHeight = 380;
					break;

				// itch.io
				case 'itchio':
					iframe.src = 'https://itch.io/embed/' + data[0];

					// Skip dark theme if light theme is specified
					if (data[1] === 'light') {}

					// Apply dark theme if specified or the wiki uses dark theme
					else if (data[1] === 'dark' || isDark) {
						iframe.src += '?dark=true';
					}

					iframe.width = '552px';
					iframe.height = '167px';
					iframe.frameborder = 0;
					break;

				// Medal
				case 'medal':
					iframe.src = 'https://medal.tv/games/' + data[0] + '/clip/' + data[1];
					defaultWidth = 640;
					defaultHeight = 360;
					break;

				// Pinterest
				case 'pinterest':
					iframe.src = 'https://assets.pinterest.com/ext/embed.html?id=' + element.data('id');
					defaultWidth = 236;
					defaultHeight = 390;
					break;

				// Sketchfab
				case 'sketchfab':
					iframe.src = 'https://sketchfab.com/models/' + element.data('id') + '/embed?ui_inspector=1';
					defaultWidth = 640;
					defaultHeight = 480;
					break;
					
				// p3d.in
				case 'p3din':
					iframe.src = 'https://p3d.in/e/' + element.data('id');
					defaultWidth = 640;
					defaultHeight = 480;
					break;

				// Steam
				case 'steam':
					var id = data.shift(), text = data.join(':');

					iframe.src = 'https://store.steampowered.com/widget/' + id;
					if (text) iframe.src += '/?t=' + encodeURIComponent(text);

					defaultWidth = 646;
					iframe.height = '190px';
					break;

				// TikTok
				case 'tiktok':
					iframe.src = 'https://www.tiktok.com/embed/v2/' + element.data('id') + '?lang=' + lang;
					defaultWidth = 325;
					defaultHeight = 750;
					break;
			}

			if (!iframe.width) iframe.width = (element.data('width') || defaultWidth) + 'px';
			if (!iframe.height) iframe.height = (element.data('height') || defaultHeight) + 'px';

			iframe.style = element.attr("style");

			element.after(iframe);
			element.remove();
		});
	});
});