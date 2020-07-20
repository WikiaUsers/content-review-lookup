// UserWikiInfo
if (mw.config.get('skin') == 'monobook' && ((mw.config.get('wgNamespaceNumber', 0) == -1 && mw.config.get('wgCanonicalSpecialPageName', '') == 'Contributions') || (mw.config.get('wgCanonicalNamespace', '') == 'User' || mw.config.get('wgCanonicalNamespace', '') == 'User_talk'))) {
	$(function() {
		if (!window.disableUserWikiInfo) {
			mw.loader.using(['mediawiki.api'], function() {
				importScript('MediaWiki:Common.js/Clases/UserWikiInfo.js');
			});
		}
	});
}