/**
 * FileTools.js
 * SOAP script to add quick action buttons on file pages
 * @summary Quick file actions
 * @see https://dev.fandom.com/wiki/FileTools
 * @author Kopcap94
 * @author Noreplyz
 * @author magiczocker
 */

;(function($, mw) {
	'use strict';

	const config = mw.config.get([
		'wgCanonicalNamespace',
		'wgUserGroups',
		'wgPageName',
		'wgTitle'
	]);

	if (
		config.wgCanonicalNamespace !== 'File' ||
		window.FileToolsLoaded ||
		document.getElementsByClassName('sharedUploadNotice').length ||
		!/sysop|soap|helper|wiki-specialist|wiki-representative|staff/.test(config.wgUserGroups.join())
	) return;
	window.FileToolsLoaded = true;

	var preloads = 2;
	var msg, api;
	var events = {};
	var summaries = {};

	/**
	 * Summary promt.
	 * @param {string} type - Button type for default summary.
	 */
	function summary(type) {
		const summary = prompt(msg('summary_title', msg('summary_' + type).plain() ).plain(), summaries[type] || '');
		summaries[type] = summary;
		if (summary === null) return false;
		return !summary.length ? msg('summary_' + type).plain() : summary;
	}

	/**
	 * Protect button.
	 * @param {object} element - Button data.
	 */
	events.protect = function(element) {
		const sum = summary('protect');
		if (!sum) return;
		api.postWithEditToken({
			action: 'protect',
			title: config.wgPageName,
			protections: 'upload=sysop', 
			reason: sum,
			expiry: '2 weeks'
		}).done(function() {
			element.srcElement.textContent = msg('protected').plain();
		});
	};

	/**
	 * Refresh button.
	 */
	events.refresh = function() {
		$('#mw-imagepage-section-filehistory').load(window.location.pathname + ' #mw-imagepage-section-filehistory', function() {
			addButtons();
		});
	};

	/**
	 * Delete all button.
	 */
	events.deleteAll = function() {
		const sum = summary('deleteAll');
		if (!sum) return;
		const images = document.querySelectorAll('.filehistory tr:nth-of-type(n + 3) > td:nth-child(1) > a');
		images.forEach(function(ele) {
			api.postWithEditToken({
				action: 'delete',
				title: config.wgPageName,
				oldimage: new URL(ele.href).searchParams.get('oldimage'), 
				reason: sum
			}).done(function() {
				ele.parentElement.parentElement.style.opacity = 0.2;
			});
		});
	};

	/**
	 * Delete button.
	 * @param {object} element - Button data.
	 */
	events.delete = function(element) {
		const sum = summary('delete');
		if (!sum) return;
		const ele = element.srcElement;
		api.postWithEditToken({
			action: 'delete',
			title: config.wgPageName,
			oldimage: ele.dataset.filepath, 
			reason: sum
		}).done(function() {
			ele.parentElement.parentElement.style.opacity = 0.2;
		});
	};

	/**
	 * Revert button.
	 * @param {object} element - Button data.
	 */
	events.revert = function(element) {
		const sum = summary('revert');
		if (!sum) return;
		api.postWithEditToken({
			action: 'filerevert',
			filename: config.wgTitle, 
			archivename: element.srcElement.dataset.filepath, 
			comment: sum
		}).done(function() {
			events.refresh();
		});
	};

	/**
	 * Create button.
	 * @param {string} label - Button label.
	 * @param {string} data - Image value for revert/delete.
	 */
	function createButton(label, data) {
		const btn = document.createElement('button');
		btn.classList = 'wds-button';
		btn.textContent = msg(label).plain();
		if (data) {
			btn.style.display = 'block';
			btn.dataset.filepath = data;
		}
		btn.addEventListener('click', events[label]);
		return btn;
	}

	/**
	 * Add buttons.
	 */
	function addButtons() {
		// Above table
		document.getElementById('mw-imagepage-section-filehistory').prepend(
			createButton('protect'),
			document.createTextNode(' '),
			createButton('refresh'),
			document.createTextNode(' '),
			createButton('deleteAll')
		);

		// Inside table
		const firstColumn = document.querySelectorAll('.filehistory tr:nth-of-type(n + 3) > td:nth-child(1) > a');
		const secondColumn = document.querySelectorAll('.filehistory tr:nth-of-type(n + 3) > td:nth-child(2) > a');

		firstColumn.forEach(function(ele) {
			const btn = createButton('delete', new URL(ele.href).searchParams.get('oldimage'));
			ele.before(btn);
		});

		secondColumn.forEach(function(ele) {
			const btn = createButton('revert', new URL(ele.href).searchParams.get('oldimage'));
			ele.before(btn);
		});
	}

	/**
	 * Load translations.
	 */
	function preload() {
		if (--preloads > 0) return;
		api = new mw.Api();
		window.dev.i18n.loadMessages('FileTools').done(function(i18n) {
			msg = i18n.msg;
			addButtons();
		});
	}

	mw.hook('dev.i18n').add(preload);
	mw.loader.using('mediawiki.api').then(preload);

	importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	});
})(window.jQuery, window.mediaWiki);