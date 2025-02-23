/**
 * FileTools.js
 * SOAP script to add quick action buttons on file pages
 * @summary Quick file actions
 * @see https://dev.fandom.com/wiki/FileTools
 * @author Kopcap94
 * @author Noreplyz
 * @author magiczocker
 */

(function(mw) {
	'use strict';

	const token = mw.user.tokens.get('csrfToken'),
		config = mw.config.get([
			'wgCanonicalNamespace',
			'wgArticlePath',
			'wgScriptPath',
			'wgUserGroups',
			'wgPageName',
			'wgTitle'
		]);

	if (
		config.wgCanonicalNamespace !== 'File' ||
		window.FileToolsLoaded ||
		document.getElementsByClassName('sharedUploadNotice').length ||
		!/sysop|soap|wiki-specialist|wiki-representative|staff/.test(config.wgUserGroups.join())
	) return;
	window.FileToolsLoaded = true;

	var i18n,
		events = {},
		summaries = {};

	/**
	 * Summary promt.
	 * @param {string} type - Button type for default summary.
	 */
	function summary(type) {
		const summary = prompt(i18n.msg('summary_title', i18n.inContentLang().msg('summary_' + type).plain() ).plain(), summaries[type] || '');
		summaries[type] = summary;
		if (summary === null) return false;
		return !summary.length ? i18n.msg('summary_' + type).plain() : summary;
	}

	/**
	 * Protect button.
	 * @param {object} element - Button data.
	 */
	events.protect = function(element) {
		const sum = summary('protect');
		if (!sum) return;
		fetch(config.wgScriptPath + '/api.php?', {
			body: new URLSearchParams({
				action: 'protect',
				format: 'json',
				title: config.wgPageName,
				protections: 'upload=sysop',
				expiry: '2 weeks',
				reason: sum,
				bot: true,
				token: token
			}),
			method: 'POST',
			credentials: 'include'
		}).then(function() {
			element.target.textContent = i18n.msg('protected').plain();
		});
	};

	/**
	 * Refresh button.
	 * @param {object} element - Button data.
	 */
	events.refresh = function(element) {
		if (element) element.target.textContent = '...';
		const pathname = config.wgArticlePath.replace('$1', config.wgPageName) + '?safemode=1&useskin=apioutput';
		fetch(pathname).then(function(response) {
			return response.text();
		}).then(function(data) {
			const parser = new DOMParser();
			return parser.parseFromString(data, 'text/html');
		}).then(function(data) {
			const section = 'mw-imagepage-section-filehistory';
			document.getElementById(section).innerHTML = data.getElementById(section).innerHTML;
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
			fetch(config.wgScriptPath + '/api.php?', {
				body: new URLSearchParams({
					action: 'delete',
					format: 'json',
					title: config.wgPageName,
					reason: sum,
					oldimage: new URL(ele.href).searchParams.get('oldimage'),
					bot: true,
					token: token
				}),
				method: 'POST',
				credentials: 'include'
			}).then(function() {
				ele.parentElement.parentElement.style.opacity = 0.2;
			});
		});
	};

	/**
	 * Delete button.
	 * @param {object} element - Button data.
	 */
	events.delete = function(element) {
		const sum = summary('delete'),
			ele = element.target;
		if (!sum) return;
		fetch(config.wgScriptPath + '/api.php?', {
			body: new URLSearchParams({
				action: 'delete',
				format: 'json',
				title: config.wgPageName,
				reason: sum,
				oldimage: ele.getAttribute('data-filepath'),
				bot: true,
				token: token
			}),
			method: 'POST',
			credentials: 'include'
		}).then(function() {
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
		fetch(config.wgScriptPath + '/api.php?', {
			body: new URLSearchParams({
				action: 'filerevert',
				format: 'json',
				filename: config.wgTitle,
				comment: sum,
				archivename: element.target.getAttribute('data-filepath'),
				bot: true,
				token: token
			}),
			method: 'POST',
			credentials: 'include'
		}).then(function() {
			events.refresh();
		});
	};

	/**
	 * Create button.
	 * @param {string} label - Button label.
	 * @param {string} data - Image value for revert/delete.
	 * @returns {object} Button
	 */
	function createButton(label, data) {
		const btn = document.createElement('button');
		btn.classList = 'wds-button';
		btn.textContent = i18n.msg(label).plain();
		if (data) {
			btn.style.display = 'block';
			btn.dataset.filepath = data;
		}
		btn.addEventListener('click', events[label], false);
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
		const firstColumn = document.querySelectorAll('.filehistory tr:nth-of-type(n + 3) > td:nth-child(1) > a'),
			secondColumn = document.querySelectorAll('.filehistory tr:nth-of-type(n + 3) > td:nth-child(2) > a');

		firstColumn.forEach(function(ele) {
			const btn = createButton('delete', new URL(ele.href).searchParams.get('oldimage'));
			ele.before(btn);
		});

		secondColumn.forEach(function(ele) {
			const btn = createButton('revert', new URL(ele.href).searchParams.get('oldimage'));
			ele.before(btn);
		});
	}

	mw.hook('dev.i18n').add(function(i18no) {
		i18no.loadMessages('FileTools').done(function(msg) {
			i18n = msg;
			addButtons();
		});
	});

	window.importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	});
})(window.mediaWiki);