(function () {
	if (
		window.ViewRawLoaded ||
		mw.config.get('wgArticleId') === 0
	) {
		return;
	}
	window.ViewRawLoaded = true;
	importArticles({
		type: 'script',
		articles: [
			'u:dev:MediaWiki:I18n-js/code.js',
			'u:dev:MediaWiki:Placement.js'
		]
	});
	var preloads = 3;
	function preload () {
		if (--preloads === 0) {
			window.dev.i18n.loadMessages('View Raw').then(init);
		}
	}
	function init (i18n) {
		window.dev.placement.loader.util({
			script: 'View Raw',
			element: 'editdropdown',
			type: 'append',
			content: $('<li>', {
				id: 'ca-raw'
			}).append(
				$('<a>', {
					href: new mw.Uri().extend({
						action: 'raw',
						ctype: ctype(mw.config.get('wgPageContentModel'))
					}).toString(),
					text: i18n.msg('text').plain(),
					title: i18n.msg('title').plain()
				})
			)
		});
	}
	function ctype(contentModel) {
		switch (contentModel) {
			case 'wikitext': return; // 'text/x-wiki' is the default
			case 'javascript': return 'text/javascript';
			case 'css': return 'text/css';
			case 'json': case 'GeoJSON': case 'GeoJson': case 'interactivemap': return 'application/json';
			case 'text': return 'text/plain';
		}
	}
	mw.hook('dev.i18n').add(preload);
	mw.hook('dev.placement').add(preload);
	mw.loader.using('mediawiki.Uri').then(preload);
})();