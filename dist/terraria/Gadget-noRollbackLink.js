$(document).ready(function (){
	if ((mw.config.get('wgCanonicalNamespace') != 'Special') || (mw.config.get('wgCanonicalSpecialPageName') != 'RecentChanges')) {
		return;
	}
	$('.mw-rollback-link').remove();
});