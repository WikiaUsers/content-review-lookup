/* MonsterVerze Common.js */

(function () {
	'use strict';

	// Bump this by hand after editing CosmeticFilter.js or ItemFilter.js.
	// Using Date.now() here made the URL unique on every page load, so the
	// browser could never cache either script and re-downloaded both every time.
	var MV_SCRIPT_VERSION = '20260716a';

	window.mvCommonJsLoaded = true;
	console.log('MonsterVerze Common.js loaded');

	function loadMonsterVerzeScript(pageName) {
		var script = document.createElement('script');

		script.src =
			location.origin +
			'/wiki/MediaWiki:' +
			encodeURIComponent(pageName) +
			'?action=raw&ctype=text/javascript&v=' +
			MV_SCRIPT_VERSION;

		script.async = false;

		script.onload = function () {
			console.log('Loaded MonsterVerze script:', pageName);
		};

		script.onerror = function () {
			console.error('Failed to load MonsterVerze script:', pageName);
		};

		document.head.appendChild(script);
	}

loadMonsterVerzeScript('CosmeticFilter.js');
loadMonsterVerzeScript('ItemFilter.js');
loadMonsterVerzeScript('UpdateCreator.js');
loadMonsterVerzeScript('UploadCredits.js');
}());