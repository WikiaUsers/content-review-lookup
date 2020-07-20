if (mw.config.get('wgCanonicalSpecialPageName', '') != 'MyHome') {
	window.wgEnableImageLightboxExt = false;
	// Por si ya se ha cargado (a veces pasa)
	(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
		$('#'+(window.bodyContentId||'bodyContent')).unbind('.lightbox');
	});
}

// UserWikiInfo
// UserWikiInfo
if ((mw.config.get('wgNamespaceNumber', 0) == -1 && mw.config.get('wgCanonicalSpecialPageName', '') == 'Contributions') || (mw.config.get('wgCanonicalNamespace', '') == 'User' || mw.config.get('wgCanonicalNamespace', '') == 'User_talk')) {
	(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
		if (!window.disableUserWikiInfo) {
			mw.loader.using(['mediawiki.api'], function() {
				importScript('MediaWiki:Common.js/Clases/UserWikiInfo.js');
			});
		}
	});
}