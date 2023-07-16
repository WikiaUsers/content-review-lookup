(function(mw) {
	'use strict';
	if ([
			'Allpages',
			'Prefixindex'
		].indexOf(mw.config.get('wgCanonicalSpecialPageName')) === -1 ||
		window.AllPagesHideRedirectLoaded
	) {
		return;
	}
	window.AllPagesHideRedirectLoaded = true;
	var preloads = 2;
	var msg, sheet, button;
	function update() {
		sheet.disabled = !sheet.disabled;
		button.textContent = msg(sheet.disabled ? 'hide' : 'show').plain();
	}
	function init(i18n) {
		msg = i18n.msg;
		sheet = mw.util.addCSS( '.allpagesredirect { display: none; }' );
		button = document.createElement('span');
		button.classList.add('wds-button');
		button.textContent = msg('show').plain();
		button.addEventListener('click', update);
		document.getElementsByClassName('mw-htmlform-submit-buttons')[0].append(button);
		mw.hook('AllPagesHideRedirect.loaded').fire();
	}
	function preload() {
		if (--preloads>0) return;
		window.dev.i18n.loadMessages('AllPagesHideRedirect').then(init);
	}
	importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	});
	mw.hook('dev.i18n').add(preload);
	mw.loader.using('mediawiki.util').then(preload);
})(window.mediaWiki);