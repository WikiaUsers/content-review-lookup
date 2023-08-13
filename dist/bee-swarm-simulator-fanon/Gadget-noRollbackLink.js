$(document).ready(function() {
	if ((mw.config.get('wgCanonicalNamespace') != 'Special') || (mw.config.get('wgCanonicalSpecialPageName') != 'Recentchanges')) {
		return;
	}
	
	mw.hook('wikipage.content').add(function() {
		$('.mw-rollback-link').remove();
	});
});