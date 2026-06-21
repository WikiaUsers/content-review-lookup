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
				const func = () => {
					document.querySelector('[title="Toggle code editor"][role="button"].oo-ui-buttonElement-button').click();
					$('#wpTextbox1').css({display:'none'});
					document.querySelector('[title="Toggle code editor"][role="button"].oo-ui-buttonElement-button').click();
					return $('#wpTextbox1').val();
				};
				const api = new mw.Api();
				api.postWithToken('csrf', {
					action: 'edit',
					format: 'json',
					title: window.mwVars.wgPageName,
					text: $('[title="Toggle code editor"][role="button"].oo-ui-buttonElement-button').attr('aria-pressed') === 'true'? func() : $('#wpTextbox1').val(),
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