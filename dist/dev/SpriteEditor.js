;(function($, mw) {
	'use strict';
	const config = mw.config.get([
		'wgAction',
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
			],
			flags: [ // [tag-name, display title]
				["deprecated", "Deprecated"],
				["black", "Black"],
				["dark", "Dark"],
				["nolink", "No link"]
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
	
	window.SpriteEditorModules.main.flags = window.SpriteEditorModules.main.flags.concat(window.SpriteEditorFlags || []);
	window.SpriteEditorModules.main.blacklist = window.SpriteEditorModules.main.blacklist.concat(window.SpriteEditorBlacklist || []);

	var loadPHP = 'https://dev.fandom.com/load.php';
	var jsFiles = [
		'MediaWiki:SpriteEditor/helper.js',
		'MediaWiki:SpriteEditor/main.js'
	];
	var files = [];
	var sP = new URL(document.location).searchParams;
	if (config.wgAction === "view" && !sP.has("oldid") && !sP.has("curid") && (config.wgCanonicalNamespace === "Module" || config.wgCanonicalNamespace === "Template") && config.wgTitle.split("/")[0].endsWith("Sprite")) {
		var names = window.SpriteEditorModules.seperatePath(config.wgPageName);
		if (!names.module.endsWith("Sprite") || window.SpriteEditorModules.main.blacklist.includes(names.module.toLowerCase())) return;
		files = jsFiles.concat(['MediaWiki:SpriteEditor/openButton.js']);
	}
	if (config.wgCanonicalSpecialPageName === 'Blankpage' && config.wgTitle.endsWith('/SpriteEditor')) {
		files = jsFiles.concat([
			'MediaWiki:SpriteEditor/diff.js',
			'MediaWiki:SpriteEditor/new.js',
			'MediaWiki:SpriteEditor/open.js',
			'MediaWiki:SpriteEditor/sprite_reorder.js',
			'MediaWiki:SpriteEditor/settings.js',
			'MediaWiki:SpriteEditor/sorting.js'
		]);
	}
	if (files.length > 2) {
		var a;
		if (config.wgIsTestModeEnabled) {
			a = mw.loader.load(loadPHP + '?mode=articles&only=scripts&articles=test:' + encodeURI(files.join("|test:")) + '&*');
		} else {
			a = mw.loader.load(loadPHP + '?mode=articles&only=scripts&articles=' + encodeURI(files.join("|")) + '&*');
		}
		Promise.allSettled([a]).then(function () {
			var checkExist = setInterval(function () {
				if (window.SpriteEditorModules.main.run) {
					clearInterval(checkExist);
					if ( // Don't load if the user hasn't specified a position for preview on sprite-template pages.
						window.SpriteEditorModules.openButton &&
						['Template', 'Module'].includes(config.wgCanonicalNamespace) &&
						!document.getElementById('sprite-root')
					) return;
					$('head').append('<link rel="stylesheet" type="text/css" href="' + loadPHP + '?mode=articles&articles=MediaWiki:SpriteEditor.css&only=styles">');
					window.SpriteEditorModules.main.run();
				}
			}, 500);
		});
	}
})(window.jQuery, window.mediaWiki);