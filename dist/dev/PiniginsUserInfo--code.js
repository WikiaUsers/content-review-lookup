/*
 * PiniginsUserInfo.js (c) 2017-2019, Maksim Pinigin
 * Creates the "Special:UserInfo" page, which allows you to view a little information about the user
 */

(function($, mw) {
	'use strict';
	var msg, input, button,
		config = mw.config.get([
			'wgTitle',
			'wgArticlePath',
			'wgNamespaceNumber',
			'wgRelevantUserName'
		]);

	if (!(
		(config.wgNamespaceNumber === -1 && config.wgTitle === 'UserInfo') ||
		config.wgRelevantUserName)) return;

	function addEntry(data, value, join) {
		var text = '',
			v = data.query.users[0][value];
		if (v) text += join ? v.join(', ') : v;
		document.getElementById('PUI-' + value).textContent = text.length ? text : '–';
	}

	function getUserInfo() {
		if (input.isReadOnly() || button.isDisabled()) return;
		var username = input.getValue().trim();
		if (!username.length) return;
		input.setReadOnly(true);
		button.setDisabled(true);
		new mw.Api().get({
			action: 'query',
			list: 'users',
			ususers: username,
			usprop: 'registration|gender|editcount|blockinfo|groups',
			formatversion: 2
		}).done(function(data) {
			addEntry(data, 'userid');
			addEntry(data, 'name');
			addEntry(data, 'editcount');
			addEntry(data, 'registration');
			addEntry(data, 'gender');
			addEntry(data, 'groups', true);
			input.setReadOnly(false);
			button.setDisabled(false);
		});
	}

	function init() {
		var header = document.getElementById('firstHeading');
		document.title = document.title.replace(header.innerText, msg('userInfo').plain());
		header.textContent = msg('userInfo').plain();
		var $content = $('#mw-content-text');
		$content.empty();
		input = new mw.widgets.UserInputWidget( {
			required: true,
			validate: function(inputValue) {
				inputValue = inputValue.trim();
				if (mw.util.isIPAddress(inputValue, true)) return false; // Filter IPs
				return true;
			},
			placeholder: 'Username'
		} );
		button = new OO.ui.ButtonWidget( {
			label:  msg('getInfo').plain(),
			flags: ['primary', 'progressive']
		} );
		var widget = new OO.ui.ActionFieldLayout(
			input, button, {
				align: 'top'
			}
		);
		$content.append(
			widget.$element,
			$('<ul>').html(
				'<li><b>' + msg('id').escape() + '</b> <span id="PUI-userid"></span></li>' +
				'<li><b>' + msg('username').escape() + '</b> <span id="PUI-name"></span></li>' +
				'<li><b>' + msg('editcount').escape() + '</b> <span id="PUI-editcount"></span></li>' +
				'<li><b>' + msg('dateRegistered').escape() + '</b> <span id="PUI-registration"></span></li>' +
				'<li><b>' + msg('gender').escape() + '</b> <span id="PUI-gender"></span></li>' +
				'<li><b>' + msg('groups').escape() + '</b> <span id="PUI-groups"></span></li>'
			)
		);
		input.on('enter', function() {
			input.getValidity().done(getUserInfo);
		});
		button.on('click', function() {
			input.getValidity().done(getUserInfo);
		});
		if (location.hash.replace('#', '') !== '') {
			input.setValue(location.hash.replace('#', ''));
			input.getValidity().done(getUserInfo);
		}
	}

	function addTool() {
		mw.loader.using('mediawiki.util').then(function() {
			var urlWithHash = 'Special:UserInfo#' + mw.util.wikiUrlencode(config.wgRelevantUserName);
			$('<li>', { id: 'userinfo' })
			.html('<a href="' + config.wgArticlePath.replace('$1', urlWithHash) + '">' + msg('userInfo').escape() + '</a>')
			.prependTo('.toolbar .tools');
		});
	}

	mw.hook('dev.i18n').add(function(i18n) {
		i18n.loadMessages('PiniginsUserInfo').done(function(i18no) {
			msg = i18no.msg;
			if (config.wgRelevantUserName) {
				addTool();
			} else if (config.wgNamespaceNumber === -1 && config.wgTitle === 'UserInfo') {
				mw.loader.using([
					'oojs-ui-widgets',
					'mediawiki.api',
					'mediawiki.util',
					'mediawiki.widgets.UserInputWidget'
				]).then(init);
			}
		});
	});

	window.importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	});
})(window.jQuery, window.mediaWiki);