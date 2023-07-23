/*
 * PiniginsUserInfo.js (c) 2017-2019, Maksim Pinigin
 * Creates the "Special:UserInfo" page, which allows you to view a little information about the user
 */

;(function($, mw) {
	'use strict';
	var config = mw.config.get([
		'wgTitle',
		'wgSiteName',
		'wgNamespaceNumber',
		'wgRelevantUserName'
	]);

	if (!(
		(config.wgNamespaceNumber === -1 && config.wgTitle === 'UserInfo') ||
		(config.wgNamespaceNumber === 2 && config.wgRelevantUserName))) return;
	var input, info, msg;
	var preloads = 2;

	function addEntry(data, label, value, join) {
		var text = '';
		var v = data.query.users[0][value];
		if (v) {
			text += join ? v.join(', ') : v;
		}
		document.getElementById('PUI-' + value).textContent = text;
	}
	function getUserInfo() {
		var username = input.value;
		info.innerHTML = '';
		new mw.Api().get({
			action: 'query',
			list: 'users',
			ususers: username,
			usprop: 'registration|gender|editcount|blockinfo|groups',
			formatversion: 2
		}).done(function(data) {
			if (data.query.users[0].missing || data.query.users[0].invalid || username === '') {
				info.innerHTML = '<br><b>' + msg('enterUsername').escape() + '</b>';
			} else {
				info.innerHTML =
					'<br><b>' + msg('id').escape() + '</b> <span id="PUI-userid"></span>' +
					'<br><b>' + msg('username').escape() + '</b> <span id="PUI-name"></span>' +
					'<br><b>' + msg('editcount').escape() + '</b> <span id="PUI-editcount"></span>' +
					'<br><b>' + msg('dateRegistered').escape() + '</b> <span id="PUI-registration"></span>' +
					'<br><b>' + msg('gender').escape() + '</b> <span id="PUI-gender"></span>' +
					'<br><b>' + msg('groups').escape() + '</b> <span id="PUI-groups"></span>';
				addEntry(data, msg('id').escape(), 'userid');
				addEntry(data, msg('username').escape(), 'name');
				addEntry(data, msg('editcount').escape(), 'editcount');
				addEntry(data, msg('dateRegistered').escape(), 'registration');
				addEntry(data, msg('gender').escape(), 'gender');
				addEntry(data, msg('groups').escape(), 'groups', true);
			}
		});
	}
	function init() {
		var header = document.getElementById('firstHeading');
		document.title = document.title.replace(header.innerText, msg('userInfo').plain());
		header.textContent = msg('userInfo').plain();
		document.getElementById('mw-content-text').innerHTML = '';

		input = document.createElement('input');
		input.type = 'text';
		input.placeholder = 'Username';

		var button = document.createElement('button');
		button.innerText = msg('getInfo').plain();
		button.addEventListener('click', getUserInfo);

		info = document.createElement('div');

		document.getElementById('mw-content-text').append(input, button, info);
		
		if (location.hash.replace('#', '') !== '') {
			input.value = location.hash.replace('#', '');
			getUserInfo();
		}
	}
	function addTool() {
		var urlWithHash = './Special:UserInfo#' + config.wgRelevantUserName;
		$('<li>', { id: 'userinfo' })
		.html('<a href="' + urlWithHash + '">' + msg('userInfo').escape() + '</a>')
		.prependTo('.toolbar .tools');
	}

	function preload() {
		if (--preloads > 0) return;
		window.dev.i18n.loadMessages('PiniginsUserInfo').done(function(i18no) {
			msg = i18no.msg;
			if (config.wgNamespaceNumber === -1) init();
			if (config.wgNamespaceNumber === 2) addTool();
		});
	}

	mw.hook('dev.i18n').add(preload);
	mw.loader.using(['mediawiki.api']).then(preload);

	importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	});
})(window.jQuery, window.mediaWiki);