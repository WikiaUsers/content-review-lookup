;(function(mw) {
	'use strict';

	const config = mw.config.get([
		'wgCanonicalNamespace',
		'wgCanonicalSpecialPageName',
		'wgIsTestModeEnabled',
		'wgTitle'
	]);
	var loadPHP = 'https://dev.fandom.com/load.php';
	if (!window.SpriteEditorLoaded && config.wgCanonicalNamespace == "Module" && config.wgTitle.split("/")[0].endsWith("Sprite")) {
		if (config.wgIsTestModeEnabled)
			mw.loader.load(loadPHP + '?mode=articles&only=scripts&articles=test:' + encodeURI('MediaWiki:SpriteEditor/openButton.js') + '&*');
		else
			mw.loader.load(loadPHP + '?mode=articles&only=scripts&articles=' + encodeURI('MediaWiki:SpriteEditor/openButton.js') + '&*');
		window.SpriteEditorLoaded = true;
	}
	if (window.SpriteEditorLoaded || !(config.wgCanonicalSpecialPageName === 'Blankpage' && config.wgTitle.endsWith('/SpriteEditor'))) return;
	window.SpriteEditorLoaded = true;
	window.SpriteEditorModules = {
		shared: {}
	};
	var jsFiles = [
		'MediaWiki:SpriteEditor/diff.js',
		'MediaWiki:SpriteEditor/helper.js',
		'MediaWiki:SpriteEditor/main.js',
		'MediaWiki:SpriteEditor/new.js',
		'MediaWiki:SpriteEditor/open.js',
		'MediaWiki:SpriteEditor/settings.js',
		'MediaWiki:SpriteEditor/sorting.js'
	];
	$('head').append('<link rel="stylesheet" type="text/css" href="' + loadPHP +'?mode=articles&articles=MediaWiki:SpriteEditor.css&only=styles">');
	var a;
	if (config.wgIsTestModeEnabled) {
		a = mw.loader.load(loadPHP + '?mode=articles&only=scripts&articles=test:' + encodeURI(jsFiles.join("|test:")) + '&*');
	} else {
		a = mw.loader.load(loadPHP + '?mode=articles&only=scripts&articles=' + encodeURI(jsFiles.join("|")) + '&*');
	}
	Promise.allSettled([a]).then(function () {
		var checkExist = setInterval(function () {
			if (window.SpriteEditorModules.main.run) {
				window.SpriteEditorModules.main.run();
				clearInterval(checkExist);
			}
		}, 500);
	});
})(window.mediaWiki);