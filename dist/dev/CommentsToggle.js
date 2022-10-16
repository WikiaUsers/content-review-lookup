;(function(mw) {
	'use strict';
	const config = mw.config.get([
		'wgRestrictionComment',
		'wgPageName',
		'wgUserGroups'
	]);

	if (
		window.commentsToggleLoaded ||
		!/threadmoderator|sysop|soap|helper|wiki-specialist|wiki-representative|staff/.test(mw.config.values.wgUserGroups.join())
	) return;
	window.commentsToggleLoaded = true;

	var commentArea = document.getElementById('articleComments');
	if (!commentArea) return;

	var msg, buttonInput, buttonLabel;

	function protect() {
		var api = new mw.Api();
		buttonInput.disabled = true;
		api.get({
			action: 'query',
			format: 'json',
			prop: 'info',
			titles: config.wgPageName,
			formatversion: 2,
			inprop: 'protection'
		}).done(function(data) {
			const curProtect = data.query.pages[0].protection;
			var protections = [];
			var expiry = [];

			for (var i = 0; i < curProtect.length; i++) {
				if (curProtect[i].type != 'comment') {
					protections[protections.length] = curProtect[i].type + '=' + curProtect[i].level;
					expiry[expiry.length] = curProtect[i].expiry;
				}
			}
			
			if (!buttonInput.checked) {
				protections[protections.length] = 'comment=sysop';
				expiry[expiry.length] = 'infinite';
			}
			
			api.postWithEditToken({
				action: 'protect',
				format: 'json',
				title: config.wgPageName,
				protections: protections.join('|'),
				expiry: expiry.join('|'),
				reason: (buttonInput.checked ? 'Enabled' : 'Disabled') + ' comments using [[w:c:dev:CommentsToggle|CommentsToggle]].',
				formatversion: 2
			}).done(function() {
				location.reload();
			});
		});
	}

	function init() {
		buttonInput = document.createElement('input');
		buttonInput.type = 'checkbox';
		buttonInput.id = 'commentToggle';
		buttonInput.checked = true;
		buttonInput.className = 'wds-toggle__input';
		buttonInput.addEventListener('change', protect);

		buttonLabel = document.createElement('label');
		buttonLabel.htmlFor = 'commentToggle';
		buttonLabel.className = 'wds-toggle__label';
		buttonLabel.textContent = msg('buttonText').plain();

		if (config.wgRestrictionComment.length) buttonInput.checked = false;

		commentArea.before(buttonInput, buttonLabel);
	}

	mw.loader.using('mediawiki.api').then(function () {
		mw.hook('dev.i18n').add(function (i18n) {
			i18n.loadMessages('CommentsToggle').done(function (i18no) {
				msg = i18no.msg;
				init();
			});
		});
		importArticle({
			type: 'script',
			article: 'u:dev:MediaWiki:I18n-js/code.js'
		});
	});
})(window.mediaWiki);