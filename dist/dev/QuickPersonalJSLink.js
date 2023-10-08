(function () {
	if (!mw.config.get('wgUserName')) {
		return;
	}
	
	importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
	
	var langCode = mw.config.get('wgPageContentLanguage');
	
	if (langCode != 'en' && langCode != null) {
		langCode = '/' + langCode;
	} else {
		langCode = '';
	}
	
	var userName = mw.util.wikiUrlencode(mw.config.get('wgUserName'));
	
	var quickJSConfig = {
		cfg: $.extend({
			globalCSS: true,
			globalJS: true,
			localCSS: true,
			localJS: true
		}, window.quickJSConfig)
	};
	
	var elemLinks = {
		'globalCSS': 'https://community.fandom.com/wiki/User:' + userName + '/global.css',
		'globalJS': 'https://community.fandom.com/wiki/User:' + userName + '/global.js',
		'localCSS': langCode + '/wiki/User:' + userName + '/common.css',
		'localJS': langCode + '/wiki/User:' + userName + '/common.js'
	};
	
	function createElem(elemName, i18n) {
		$('#my-tools-menu').append(
		    $('<li>').append(
		    	$('<a>', {
		    		href: elemLinks[elemName],
		    		text: i18n.msg(elemName).plain()
		    	})
		    )
		);
	}
	
	function createList(i18n) {
		if (quickJSConfig.cfg.globalCSS) createElem('globalCSS', i18n);
		if (quickJSConfig.cfg.globalJS) createElem('globalJS', i18n);
		if (quickJSConfig.cfg.localCSS) createElem('localCSS', i18n);
		if (quickJSConfig.cfg.localJS) createElem('localJS', i18n);
	}
	
	mw.hook('dev.i18n').add(function (i18n) {
        i18n.loadMessages('QuickPersonalJSLink').then(createList);
    });
})();