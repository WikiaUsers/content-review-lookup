;(function($, mw) {
	'use strict';
	const config = mw.config.get([
		'wgCanonicalNamespace',
		'wgCanonicalSpecialPageName',
		'wgIsTestModeEnabled',
		'wgPageName',
		'wgTitle'
	]);
	if (window.SpriteEditorLoaded) return;
	window.SpriteEditorLoaded = true;
	
	window.SpriteEditorModules = {
		shared: {},
		main: {
			blacklist: [
				"animatesprite",
				"sprite"
			]
		},
		seperatePath: function(path) {
			var a = path.split("/");
			if (a.length === 1)
				a[1] = a[0].substring(a[0].indexOf(":") + 1);
			return {
				full: path.substring(path.indexOf(":") + 1),
				module: a[0].substring(a[0].indexOf(":") + 1),
				name: a[a.length - 1],
				all: a
			};
		}
	};
	var loadPHP = 'https://dev.fandom.com/load.php';
	if ((config.wgCanonicalNamespace === "Module" || config.wgCanonicalNamespace === "Template") && config.wgTitle.split("/")[0].endsWith("Sprite")) {
		var names = window.SpriteEditorModules.seperatePath(config.wgPageName);
		if (!names.module.endsWith("Sprite") || window.SpriteEditorModules.main.blacklist.includes(names.module.toLowerCase())) return;
		if (config.wgIsTestModeEnabled)
			mw.loader.load(loadPHP + '?mode=articles&only=scripts&articles=test:' + encodeURI('MediaWiki:SpriteEditor/openButton.js') + '&*');
		else
			mw.loader.load(loadPHP + '?mode=articles&only=scripts&articles=' + encodeURI('MediaWiki:SpriteEditor/openButton.js') + '&*');
	}
	if (config.wgCanonicalSpecialPageName === 'Blankpage' && config.wgTitle.endsWith('/SpriteEditor')) {
		var jsFiles = [
			'MediaWiki:SpriteEditor/diff.js',
			'MediaWiki:SpriteEditor/helper.js',
			'MediaWiki:SpriteEditor/main.js',
			'MediaWiki:SpriteEditor/new.js',
			'MediaWiki:SpriteEditor/open.js',
			'MediaWiki:SpriteEditor/settings.js',
			'MediaWiki:SpriteEditor/sorting.js'
		];
		$('head').append('<link rel="stylesheet" type="text/css" href="' + loadPHP + '?mode=articles&articles=MediaWiki:SpriteEditor.css&only=styles">');
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
	}
})(window.jQuery, window.mediaWiki);