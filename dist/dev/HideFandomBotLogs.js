/**
 * HideFandomBotLogs.js
 * Adds a toggleable button that lets you hide logs from Fandom bots in Special:Log. Default is 'shown', not hidden.
 * @summary Hide Fandom bot logs.
 * @author Noreplyz
 * @author magiczocker
 */

;(function (window, mw) {
	'use strict';

	if (window.HideFandomBotLogsLoaded ||
		mw.config.get('wgCanonicalSpecialPageName') !== 'Log') return;
	window.HideFandomBotLogsLoaded = true;

	const bots = [
		'Fandom',
		'FANDOM',
		'FandomBot',
		'FANDOMbot',
		'IWR News Bot',
		'Wikia',
		'WikiaBot',
		'Wikia Video Library'
	];
	var msg;
	var visible = true;

	function init() {
		// add button
		var button = document.createElement('a');
		button.className = 'wds-button';
		button.textContent = msg('labelHide').plain();
		button.title = msg('titleHide').plain();
		document.getElementsByClassName('mw-htmlform-submit-buttons')[0].append(button);

		const li = document.querySelectorAll('ul.mw-logevent-loglines > li');

		button.addEventListener('click', function() {
			// toggle visibility
			for (var i = 0; i < li.length; i++) {
				var a = li[i];
				if (bots.includes(a.children[1].textContent)) {
					a.style.display = (visible ? 'none' : null);
				}
			}

			// update button
			this.textContent = msg(visible ? 'labelShow' : 'labelHide').plain();
			this.title = msg(visible ? 'titleShow' : 'titleHide').plain();

			// update state
			visible = !visible;
		});
	}

	// load i18n
	mw.hook('dev.i18n').add(function(i18n) {
		i18n.loadMessages('HideFandomBotLogs').done(function(i18no) {
			msg = i18no.msg;
			init();
		});
	});
	importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	});
})(window, window.mediaWiki);