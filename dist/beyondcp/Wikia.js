// <source lang="JavaScript">
 
// Additional UserRights Icons in profile mastheads
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
// END Additional UserRights Icons in profile mastheads

// 123kitten1 names replacement (credits to Penguin-Pal)
$(document).ready(function() {
	// in history revision comparison
		$('table.diff tbody #mw-diff-ntitle2 a[href="/wiki/Special:Contributions/72.179.180.86"]').replaceWith('<a href="/wiki/User:72.179.180.86">72.179.180.86 (123kitten1)</a>');
		$('table.diff tbody #mw-diff-otitle2 a[href="/wiki/Special:Contributions/72.179.180.86"]').replaceWith('<a href="/wiki/User:72.179.180.86">72.179.180.86 (123kitten1)</a>');
	// in Special:RecentChanges
		$('mw-special-Recentchanges .rc-conntent .changedby a[href="/wiki/Special:Contributions/72.179.180.86"]').replaceWith('<a href="/wiki/User:72.179.180.86" title="User:72.179.180.86" class="mw-userlink">72.179.180.86 (123kitten1)</a>');
		$('.mw-special-Recentchanges .rc-conntent table.mw-collapsible a[href="/wiki/Special:Contributions/72.179.180.86"].mw-userlink').replaceWith('<a href="/wiki/User:72.179.180.86" title="User:72.179.180.86" class="mw-userlink">72.179.180.86 (123kitten1)</a>');
		$('.rc-conntent .mw-enhanced-rc a[title="Special:Contributions/72.179.180.86"].mw-userlink').replaceWith('<a href="/wiki/User:72.179.180.86" class="mw-userlink" title="User:72.179.180.86">72.179.180.86 (123kitten1)</a>');
		$('.rc-conntent .mw-enhanced-rc .mw-usertoollinks a[title="User talk:72.179.180.86"]').replaceWith('<a href="/wiki/User_talk:72.179.180.86" title="User talk:72.179.180.86">Talk</a> | <a href="/wiki/Special:Contributions/72.179.180.86" title="Special:Contributions/72.179.180.86">contribs</a>');
	// page history
		$('#pagehistory .history-user a[href="/wiki/Special:Contributions/72.179.180.86"]').replaceWith('<a href="/wiki/User:72.179.180.86" title="User:72.179.180.86" class="mw-userlink">72.179.180.86 (123kitten1)</a>');
	// in Special:WikiActivity
		$('body.mw-special-WikiActivity ul.activityfeed li cite a[href="/wiki/Special:Contributions/72.179.180.86"]').replaceWith('<a href="/wiki/User:72.179.180.86" rel="nofollow">72.179.180.86 (123kitten1)</a>');
	// wiki activity module
		$('section.WikiaActivityModule .edited-by a[href="/wiki/Special:Contributions/72.179.180.86"]').replaceWith('<a href="/wiki/User:72.179.180.86">72.179.180.86 (123kitten1)</a>');
	// message wall name
		$('section.WikiaPage .edited-by <a href="/wiki/User:72.179.180.86">72.179.180.86</a>').replaceWith('<a href="/wiki/Message_Wall:72.179.180.86">123kitten1</a>');
	// "aka" - user hgroup
		$("body.page-User_72_179_180_86 hgroup h2, body.page-Special_Contributions_72_179_180_86 hgroup h2, body.page-Message_Wall_72_179_180_86 hgroup h2").html("<span>aka</span> 123kitten1");
});
// END 123kitten1 names replacement (credits to Penguin-Pal)