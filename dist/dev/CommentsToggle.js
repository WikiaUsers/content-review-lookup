;(function(window, $, mw) {
	'use strict';
	const config = mw.config.get([
		'wgRestrictionComment',
		'wgScriptPath',
		'wgPageName',
		'wgCanonicalNamespace',
		'wgUserGroups'
	]);
	
	if (
		window.commentsToggleLoaded ||
		config.wgCanonicalNamespace != '' ||
		!/threadmoderator|sysop|soap|helper|wiki-specialist|wiki-representative|staff/.test(mw.config.values.wgUserGroups.join())
	) {
		return;
	}
	window.commentsToggleLoaded = true;
	
	var msg;
	
	var buttonInput = document.createElement('input');
		buttonInput.type = 'checkbox';
		buttonInput.id = 'commentToggle';
		buttonInput.checked = true;
		buttonInput.className = 'wds-toggle__input';
	
	var buttonLabel = document.createElement('label');
		buttonLabel.htmlFor = 'commentToggle';
		buttonLabel.className = 'wds-toggle__label';
	
	function protect() {
		buttonInput.disabled = true;
		$.get( config.wgScriptPath + '/api.php', {
			action: 'query',
			format: 'json',
			prop: 'info',
			titles: config.wgPageName,
			formatversion: 2,
			inprop: 'protection'
		})
		.done(function(data) {
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
			
			$.post( config.wgScriptPath + '/api.php', {
				action: 'protect',
				format: 'json',
				title: config.wgPageName,
				protections: protections.join('|'),
				expiry: expiry.join('|'),
				token: mw.user.tokens.values.csrfToken,
				formatversion: 2
			})
			.done(function() {
				location.reload();
			});
		});
	}
	
	function init() {
		buttonLabel.innerText = msg.buttonText;
		if (config.wgRestrictionComment.length) buttonInput.checked = false;
		
		var commentArea = document.getElementById('articleComments');
		if (commentArea) commentArea.before(buttonInput, buttonLabel);
		
		buttonInput.addEventListener('change', protect);
	}
	
	mw.hook('dev.i18n').add(function (i18n) {
		i18n.loadMessages('CommentsToggle').done(function (i18no) {
			msg = i18no.msg;
			init();
		});
	});
	importArticles({
		type: 'script',
		articles: 'u:dev:MediaWiki:I18n-js/code.js'
	});
})(window, window.jQuery, window.mediaWiki);