/* Яваскрыпт, упісаны сюды, будзе выконвацца для кожнага чытача, на кожным счытванні старонкі. */
/* See also: [[Special:JSPages]]. */
/* IMPORT */
importArticles({
	type: 'script',
	articles: [
		'u:dev:AjaxRC/code.js',
	]
});
 
/* Replaces {{USERNAME}} with the name of the user browsing the page. Requires copying [[Template:USERNAME]]. */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* Аўтаматычнае абнаўленне */
window.AjaxRCRefreshText = 'Аўтаматычнае абнаўленне';
window.AjaxRCRefreshHoverText = 'Аўтаматычнае абнаўленне';
window.ajaxPages = ["Адмысловае:RecentChanges","Адмысловае:WikiActivity"];