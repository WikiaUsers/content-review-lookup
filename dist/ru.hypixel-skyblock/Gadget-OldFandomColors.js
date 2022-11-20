// Только для использования гаджета, по умолчанию отключено для всех пользователей
mw.loader.using(['mediawiki.util', 'mediawiki.Uri', 'ext.fandom.ContentReview.legacyLoaders.js'], function() {
	importArticles({
	    type: "script",
	    articles: [
			"u:dev:MediaWiki:OldFandomColors.js",
	    ]
	}, {
	    type: "style",
	    articles: [
			"u:dev:MediaWiki:OldFandomColors.css",
		],
	});
});