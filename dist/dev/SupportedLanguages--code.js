;(function($, mw) {
	'use strict';
	var msg;
	var config = mw.config.get([
		'wgPageName',
		'wgScriptPath',
		'wgIsMainPage'
	]);

	if (!config.wgIsMainPage) return;

	function init() {
	    $.post(config.wgScriptPath + '/api.php', {
	        action: 'parse',
	        page: config.wgPageName,
	        format: 'json'
	    }).then(function(res) {
	        $('.page-header__title-wrapper').append(
	            $('<div>', {
	                html: msg('availableInLangs', res.parse.langlinks.length).parse()
	            }).css({ color: '#666' })
	        );
	    });
	}

    mw.hook('dev.i18n').add(function(i18n) {
		i18n.loadMessages('SupportedLanguages').done(function(i18no) {
			msg = i18no.msg;
			init();
		});
	});
	importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	});
})(window.jQuery, window.mediaWiki);