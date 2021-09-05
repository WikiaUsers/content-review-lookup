mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function () {
	window.byteCounter = {
		/**
		 * Default regular expressions
		 */
		defaultRegexp: [
			// Remove most html tags supported by fandom and comments
			{
				find:
					'<(/)?' +
					'(abbr|b|big|blockquote|br|center|code|dd|div|dt|em|font|h1|h2|h3|h4|h5|h6|hr|i|li|ol|p|pre|q|s|small|span|strike|strong|sub|sup|table|td|th|tr|tt|u|ul|!--)' +
					'([^>]+)?>',
				replaceWith: '',
			},
			// Remove the style attribute
			{
				find: 'style="([^"]*)"( )?(\\|)?',
				replaceWith: '',
			},
			// Remove files and categories
			{
				find: '(\\[\\[)?(File|Category):.*(\\]\\])?',
				replaceWith: '',
			},
			// Remove zalgo text (with the side effect of removing all diacritics)
			{
				find: '[\u0300-\u036f]',
				replaceWith: '',
			},
			// Two+ new spaces, replace with a space
			{
				find: '[  ]{2,}',
				replaceWith: ' ',
			},
			// Two+ new lines, replace with a two newlines
			{
				find: '(?:\h*\n){2,}',
				replaceWith: '\n\n',
			},
			// Remove (most of) external links 
			{
				find: '\\[(http|https):\/\/([^\\s]+)',
				replaceWith: '',
			},
		],

		/**
		 * Create and add the button to the wiki toolbar
		 */
		button: function button() {
			const context = this;
			const toolbar = document.querySelector('#WikiaBarWrapper .tools');
			const button = {
				type: 'li',
				children: [
					{
						type: 'a',
						attr: { href: '#?' },
						text: 'Get byte count',
						events: {
							click: function () {
								context.checkPage();
							},
						},
					},
				],
			};

			toolbar.append(dev.ui(button));
		},

		/**
		 * Filter out page data
		 * @param {String} data - Page data
		 * @param {Object} context - Object containing the `this` from the f
		 */
		filterData: function filterData(data, context) {
			var filteredData = data;
			var regexp;
			if (window.bcRegexp) regexp = window.bcRegexp;
			else regexp = context.defaultRegexp;

			regexp.forEach(function (i) {
				const regexp = new RegExp(i.find, 'gim');

				filteredData = filteredData.replace(regexp, i.replaceWith);
			});

			return filteredData;
		},

		/**
		 * Display a notification containing size of the trimmed page
		 * @param {Number} size - Size of the trimmed page
		 */
		notification: function notification(size) {
			if (size < 2500) {
				dev.toasts.warning('Page is smaller than 2500 bytes: ' + size, { timeout: 10000 });
			} else {
				dev.toasts.success('Page is larger than 2500 bytes: ' + size, { timeout: 10000 });
			}
		},

		/**
		 * Get the page contents and its size
		 */
		checkPage: function checkPage() {
			// Only run if we're (probably) on an actual page
			if (!mw.config.get('wgIsArticle')) {
				dev.toasts.error("This isn't an article page!", { timeout: 10000 });
				return;
			}

			// Fetch the current page's context as wikitext
			new mw.Api()
				.get({
					action: 'parse',
					format: 'json',
					page: mw.config.get('wgPageName'),
					prop: 'wikitext',
					formatversion: 'latest',
				})
				.then(
					function (data) {
						const page = data.parse.wikitext;

						// String is broken up to prevent this page being categorised
						if (page.includes('[[' + 'Category:Genre (Comic)]]')) {
							return dev.toasts.success("This page is a comic and shouldn't be deleted!", { timeout: 10000 });
						}

						const filteredPage = this.filterData(page, this);

						const pageSize = new Blob([filteredPage]).size;

						this.notification(pageSize);
					}.bind(this)
				)
				.catch(function () {
					console.error;
				});
		},
	};

	importArticles({
		type: 'script',
		articles: ['u:dev:MediaWiki:Toasts.js', 'u:dev:MediaWiki:UI-js/code.js'],
	});

	mw.hook('dev.ui').add(function () {
		window.byteCounter.button();
	});
});