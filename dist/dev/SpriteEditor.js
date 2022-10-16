;(function(mw) {
	'use strict';

	const config = mw.config.get([
		'wgCanonicalSpecialPageName',
		'wgTitle'
	]);
	if (window.SpriteEditorLoaded || !(config.wgCanonicalSpecialPageName === 'Blankpage' && config.wgTitle.endsWith('/SpriteEditor'))) return;
	window.SpriteEditorLoaded = true;
	window.SpriteEditorModules = {
		shared: {}
	};
	importArticles(
		{
			type: 'style',
			articles: [
				'u:dev:MediaWiki:SpriteEditor.css',
				'mediawiki.diff.styles'
			]
		},
		{
			type: 'script',
			articles: [
				'u:dev:MediaWiki:SpriteEditor/diff.js',
				'u:dev:MediaWiki:SpriteEditor/helper.js',
				'u:dev:MediaWiki:SpriteEditor/main.js',
				'u:dev:MediaWiki:SpriteEditor/new.js',
				'u:dev:MediaWiki:SpriteEditor/open.js',
				'u:dev:MediaWiki:SpriteEditor/settings.js',
				'u:dev:MediaWiki:SpriteEditor/sorting.js'
			]
		}
	).then(function () {
		var checkExist = setInterval(function () {
			if (window.SpriteEditorModules.main.run) {
				window.SpriteEditorModules.main.run();
				clearInterval(checkExist);
			}
		}, 500);
	});
})(window.mediaWiki);