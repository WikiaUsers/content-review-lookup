// <nowiki>
$(function() {
	$("#ca-purge").css("display", "none");
	$(mw.util.addPortletLink("p-cactions", "javascript:;", "Purge", "ca-fastpurge", "Purge the cache of this page", "p")).click(function() {
		window.purgeWithReload(mw.config.get('wgPageName'));
	});
});
// </nowiki>