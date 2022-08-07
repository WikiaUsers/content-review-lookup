/*
 * PiniginsUserInfo.js (c) 2017-2019, Maksim Pinigin
 * Creates the "Special:UserInfo" page, which allows you to view a little information about the user
 */

;(function($, mw) {
	'use strict';
	var config = mw.config.get([
		'wgPageName',
		'wgSiteName',
		'wgScriptPath',
		'wgNamespaceNumber'
	]);
	
	if (!(mw.config.values.wgPageName === "Special:UserInfo" || mw.config.values.wgNamespaceNumber === 2)) return;
	
	var button, input, info, msg;

	function addEntry(data, label, value, join) {
		var text = "";
		if (data.query.users[0][value]) {
			text = "<b>" + label + "</b> ";
			if (join) {
				text += data.query.users[0][value].join(', ');
			} else {
				text += data.query.users[0][value];
			}
			text += "<br />";
		}
		return text;
	}

	function getUserInfo() {
		var username = input.value;
		info.innerHTML = "";
		$.get(config.wgScriptPath + "/api.php", {
			action: "query",
			list: "users",
			ususers: username,
			usprop: "registration|gender|editcount|blockinfo|groups",
			format: "json"
		})
		.done(function(data) {
			if (username === "") {
				info.innerHTML = "<br><b>" + msg('enterUsername').plain() + "</b>";
			} else {
				info.innerHTML =
					"<br>" +
					addEntry(data, msg('id').escape(), "userid") +
					addEntry(data, msg('username').escape(), "name") +
					addEntry(data, msg('editcount').escape(), "editcount") +
					addEntry(data, msg('dateRegistered').escape(), "registration") +
					addEntry(data, msg('gender').escape(), "gender") +
					addEntry(data, msg('groups').escape(), "groups", true);
			}
		});
	}
	
	function init() {
		document.title = msg('userInfo').plain() + " | " + config.wgSiteName;
		document.getElementById('firstHeading').textContent = msg('userInfo').plain();
		document.getElementById('mw-content-text').innerHTML = "";

		input = document.createElement('input');
		input.type = "text";
		input.placeholder = "Username";

		button = document.createElement('button');
		button.innerText = msg('getInfo').plain();
		button.addEventListener('click', getUserInfo);

		info = document.createElement('div');

		document.getElementById('mw-content-text').append(input, button, info);
		
		if (location.hash.replace("#", "") !== "") {
			input.value = location.hash.replace("#", "");
			getUserInfo();
		}
	}
	function addTool() {
		var userName = config.wgPageName.split(':')[1];
		var urlWithHash = "./Special:UserInfo#" + userName;
		$('<li>', { id: "userinfo" })
		.html('<a href="' + urlWithHash + '">' + msg('userInfo').escape() + '</a>')
		.prependTo('.toolbar .tools');
	}

	
	mw.hook('dev.i18n').add(function(i18n) {
		i18n.loadMessages('PiniginsUserInfo').done(function(i18no) {
			msg = i18no.msg;
			if (config.wgPageName === "Special:UserInfo") init();
			if (config.wgNamespaceNumber === 2 && config.wgPageName.indexOf("/") === -1) addTool();
		});
	});
	importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	});
})(window.jQuery, window.mediaWiki);