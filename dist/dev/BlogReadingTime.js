(function() {
	'use strict';

	function readingTimeInit(i18n) {
		const isInBlogNamespace = mw.config.get('wgNamespaceNumber') === 500;

		if (!isInBlogNamespace || window.fandomDevDisableBlogReadingTime || window.fandomDevReadingTimeLoaded) return;

		// Double-run protection.
		window.fandomDevReadingTimeLoaded = true;

		const blogContent = document.querySelector('#content .mw-parser-output');

		if (!blogContent) throw new Error('Blog content is missing.');

		const classes = {
				blogDetails: 'page-header__blog-post-details',
				blogDetailsBullet: 'page-header__blog-post-details__bullet',
				blogDetailsReadingTime: 'page-header__blog-post-details__reading-time'
			},
			blogImages = blogContent.querySelectorAll('img'),
			// Approximate average reading speed of an adult (meassured in words per minute).
			wordsPerMinute = typeof window.fandomDevBlogReadingTimeWpm === 'number' ? window.fandomDevBlogReadingTimeWpm : 265,
			// The time needed to read an image varies wildly, so we'll just use some arbitrary
			// medium number to represent the time, in seconds, that it takes to scan an image.
			imageSeconds = 12;

		var readingSeconds = 0,
			text = blogContent.textContent?.replace(/(\r\n|\n|\r)/gm, '').split(' ') || [];
	
		if (blogImages.length) {
			blogImages.forEach(function(image) {
				readingSeconds += imageSeconds;
			});
		}

		// Calculate how many seconds it would take to read the blog without counting
		// for empty strings/words.
		const textSeconds = 60 * text.filter(function(word) { return '' !== word }).length / wordsPerMinute,
			blogDetails = document.querySelector('.' + classes.blogDetails);

		if (!blogDetails) throw new Error('Blog details is missing.');
		
		readingSeconds += textSeconds;

		// Convert seconds into minutes and inject result into the blog details' HTML.
		const readingTime = Math.ceil(readingSeconds / 60),
			blogDetailsBullet = document.createElement('span'),
			readingTimeElement = document.createElement('span'),
			readingTimeText = i18n.msg('reading-minutes', readingTime).parse();

		blogDetailsBullet.className = classes.blogDetailsBullet;
		blogDetailsBullet.innerText = '•';
		readingTimeElement.className = classes.blogDetailsReadingTime;
		readingTimeElement.innerText = readingTimeText;

		blogDetails.append(blogDetailsBullet);
		blogDetails.append(readingTimeElement);
	}

	mw.hook('dev.i18n').add(function(i18n) {
		i18n.loadMessages('BlogReadingTime').done(function(i18n) {
		    readingTimeInit(i18n);
		});
	});

	importArticle({ article: 'u:dev:MediaWiki:I18n-js/code.js' });
}());