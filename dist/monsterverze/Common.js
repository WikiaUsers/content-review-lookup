/* MonsterVerze Common.js */

(function () {

	'use strict';
	/*
	 * UploadMultipleFiles translation fallback
	 * The dev UploadMultipleFiles script occasionally displays raw
	 * i18n keys such as:
	 * ⧼i18njs-UploadMultipleFiles-multiupload⧽
	 * These overrides provide the English labels if the external
	 * translation bundle fails to load.
	 */
	window.dev = window.dev || {};
	window.dev.i18n = window.dev.i18n || {};
	window.dev.i18n.overrides = window.dev.i18n.overrides || {};
	window.dev.i18n.overrides.UploadMultipleFiles =
		window.dev.i18n.overrides.UploadMultipleFiles || {};
	window.dev.i18n.overrides.UploadMultipleFiles.multiupload =
		'Upload multiple files?';
	window.dev.i18n.overrides.UploadMultipleFiles.yes =
		'Yes';
	window.dev.i18n.overrides.UploadMultipleFiles.no =
		'No';
	window.dev.i18n.overrides.UploadMultipleFiles.sourcefiles =
		'Source files';

	// Bump this by hand after editing CosmeticFilter.js or ItemFilter.js.
	// Using Date.now() here made the URL unique on every page load, so the
	// browser could never cache either script and re-downloaded both every time.

	var MV_SCRIPT_VERSION = '205802f';
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
	loadMonsterVerzeScript('UpdateCreator.js');
	loadMonsterVerzeScript('UploadCredits.js');
	loadMonsterVerzeScript('UploadCategories.js');
	loadMonsterVerzeScript('DeveloperPagePreload.js');
	loadMonsterVerzeScript('ItemFilter.js');
}());