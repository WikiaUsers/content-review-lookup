// jshint jquery:true, browser:true, devel:true, camelcase:true, curly:false, eqeqeq:true, esversion: 5, forin:true, freeze:true, immed:true, latedef:true, leanswitch:true, newcap:true, noarg:true, regexp:true, strict:true, trailing:false, undef:true, unused:true
/* global URLSearchParams */
/**
 * FileTools.js
 * SOAP script to add quick action buttons on file pages
 * @summary Quick file actions
 * @see https://dev.fandom.com/wiki/FileTools
 * @author Kopcap94
 * @author Noreplyz
 * @author magiczocker
 */

(function($, mw) {
	'use strict';

	var token = mw.user.tokens.get('csrfToken'),
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
		summaries = {},
		preloads = 2,
		OO,
		protectBtn,
		addButtons,
		buttongroup;

	function summary(type) {
		var summary = prompt(i18n.msg('summary_title', i18n.inContentLang().msg('summary_' + type).plain() ).plain(), summaries[type] || '');
		summaries[type] = summary;
		if (summary === null) return false;
		return !summary.length ? i18n.msg('summary_' + type).plain() : summary;
	}

	function protect() {
		var sum = summary('protect');
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
			protectBtn.setLabel(i18n.msg('protected').plain());
		});
	}

	function refresh() {
		var pathname = config.wgArticlePath.replace('$1', config.wgPageName) + '?safemode=1&useskin=apioutput';
		fetch(pathname).then(function(response) {
			return response.text();
		}).then(function(data) {
			var parser = new DOMParser();
			return parser.parseFromString(data, 'text/html');
		}).then(function(data) {
			var section = 'mw-imagepage-section-filehistory';
			document.getElementById(section).innerHTML = data.getElementById(section).innerHTML;
			addButtons();
		});
	}

	function deleteAll() {
		var sum = summary('deleteAll');
		if (!sum) return;
		var images = document.querySelectorAll('.filehistory tr:nth-of-type(n + 3) > td:nth-child(1) > a');
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
				ele.parentElement.parentElement.style.pointerEvents = 'none';
			});
		});
	}

	function deleteFile(ele) {
		var sum = summary('delete');
		if (!sum) return;
		fetch(config.wgScriptPath + '/api.php?', {
			body: new URLSearchParams({
				action: 'delete',
				format: 'json',
				title: config.wgPageName,
				reason: sum,
				oldimage: ele.attr('data-filepath'),
				bot: true,
				token: token
			}),
			method: 'POST',
			credentials: 'include'
		}).then(function() {
			ele.parent().parent().css({'opacity': '0.2', 'pointer-events': 'none'});
		});
	}

	function revert(ele) {
		var sum = summary('revert');
		if (!sum) return;
		fetch(config.wgScriptPath + '/api.php?', {
			body: new URLSearchParams({
				action: 'filerevert',
				format: 'json',
				filename: config.wgTitle,
				comment: sum,
				archivename: ele.attr('data-filepath'),
				bot: true,
				token: token
			}),
			method: 'POST',
			credentials: 'include'
		}).then(function() {
			refresh();
		});
	}

	addButtons = function() {
		$('#mw-imagepage-section-filehistory').prepend(buttongroup.$element);

		var firstColumn = $('.filehistory tr:nth-of-type(n + 3) > td:nth-child(1) > a'),
			secondColumn = $('.filehistory tr:nth-of-type(n + 3) > td:nth-child(2) > a');

		firstColumn.each(function(i, ele) {
			var btn = new OO.ui.ButtonWidget( {
				icon: 'trash',
				label: i18n.msg('delete').plain(),
				flags: ['primary', 'destructive']
			} );
			btn.$element.attr('data-filepath', new URL(ele.href).searchParams.get('oldimage'));
			btn.$element.css({'display': 'block'});
			btn.on('click', function() {
				deleteFile(btn.$element);
			});
			$(ele).before(btn.$element);
		});

		secondColumn.each(function(i, ele) {
			var btn = new OO.ui.ButtonWidget( {
				icon: 'undo',
				label: i18n.msg('revert').plain(),
				flags: ['primary', 'progressive']
			} );
			btn.$element.attr('data-filepath', new URL(ele.href).searchParams.get('oldimage'));
			btn.$element.css({'display': 'block'});
			btn.on('click', function() {
				revert(btn.$element);
			});
			$(ele).before(btn.$element);
		});
	};

	function init() {
		if (--preloads>0) return;

		protectBtn = new OO.ui.ButtonWidget( {
			icon: 'lock',
			label: i18n.msg('protect').plain(),
			flags: ['primary', 'progressive']
		} );
		var refreshBtn = new OO.ui.ButtonWidget( {
			icon: 'reload',
			label: i18n.msg('refresh').plain(),
			flags: ['primary', 'progressive']
		} ),
		deleteAllBtn = new OO.ui.ButtonWidget( {
			icon: 'trash',
			label: i18n.msg('deleteAll').plain(),
			flags: ['primary', 'destructive']
		} );
		buttongroup = new OO.ui.ButtonGroupWidget( {
			items: [protectBtn, refreshBtn, deleteAllBtn]
		} );
		protectBtn.on('click', protect);
		refreshBtn.on('click', refresh);
		deleteAllBtn.on('click', deleteAll);

		addButtons();
	}

	mw.hook('dev.i18n').add(function(i18no) {
		i18no.loadMessages('FileTools').done(function(msg) {
			i18n = msg;
			init();
		});
	});

	mw.loader.using([
		'oojs-ui-widgets',
		'oojs-ui.styles.icons-moderation', // lock, trash
		'oojs-ui.styles.icons-interactions', // reload
		'oojs-ui.styles.icons-editing-core' // undo
	]).then(function(require) {
		OO = require('oojs');
		init();
	});

	mw.loader.load('https://dev.fandom.com/load.php?articles=MediaWiki:I18n-js/code.js&only=scripts&mode=articles');
})(window.jQuery, window.mediaWiki);