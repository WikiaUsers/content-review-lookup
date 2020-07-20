importArticles({
	type: 'script',
	articles: [
		'u:dev:AjaxRC/code.js',
		'u:runescape:MediaWiki:Common.js/spreport.js',
		'u:dev:InactiveUsers/code.js'
	]
});

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying [[Template:USERNAME]]. */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
/* End of the {{USERNAME}} replacement */

/* automatic actualisation of recent changes - [[w:c:dev:AjaxRC]] */
window.AjaxRCRefreshText = '자동 새로 고침';
window.AjaxRCRefreshHoverText = '자동으로 페이지를 새로 고침합니다.';
window.ajaxPages = ["특수기능:최근바뀜","특수기능:위키활동내역","특수기능:새문서","특수기능:필요한문서","특수기능:기록","특수기능:통계"];

// INACTIVE USER
window.InactiveUsers = { text: '비활동' };