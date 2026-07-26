(function() {
	'use strict';
	function load() {
		if ($('#wpSaveWidget').length) {
			window.initiateNoError();
			delete window.initiateNoError;
		} else {
			setTimeout(load, 500);
		}
	}
	window.mwVars = mw.config.get(
		[
			'wgPageName',
			'wgAction',
			//'wgCodeEditorCurrentLanguage',
			'wgPageContentModel'
		]
	);
	if (window.noErrorOnSafe || window.mwVars.wgAction !== 'edit' || window.mwVars.wgPageContentModel !== 'css') return;
	window.noErrorOnSafe = true;
	window.initiateNoError = function () {
		const oldButton = $('#wpSave');
		const el = $('<a>');
			el.attr('class', oldButton.attr('class'));
			el.text(oldButton.attr('value'));
		el.on('click', function() {
			mw.loader.using('mediawiki.api', function() {
				const text = (function(el) {
					if (el.length < 1) {
						return $('#wpTextbox1').val();
					}
					$('.ace_editor').attr('id', 'CSSEditor-NoError');
					const editor = window.ace.edit('CSSEditor-NoError');
					return editor.getSession().getValue();
				})($('[rel="codeEditor"] > .oo-ui-buttonElement-button[aria-pressed="true"]'));
				const api = new mw.Api();
				api.postWithToken('csrf', {
					action: 'edit',
					format: 'json',
					title: window.mwVars.wgPageName,
					text: text,
					summary: $('#wpSummary').val(),
					watchlist: document.querySelector('#wpWatchthis').checked ? 'watch' : 'unwatch',
					minor: document.querySelector('#wpMinoredit').length > 0 && document.querySelector('#wpMinoredit').checked ? true : false
				}).then(res => {
					if (res.error) {
						window.alert('An error occurred.');
						return; 
					}
					$(window).off('beforeunload');
					document.querySelector('#mw-editform-cancel>a').click();
				});
			});
		});
		oldButton.remove();
		$('#wpSaveWidget').append(el);
	};
	load();
})();