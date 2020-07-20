/* Auto Refresh */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ['Special:RecentChanges', 'Special:WikiActivity'];

window.nullEditDelay = 1000;

/* Replace {{USERNAME}} */
$(function UserNameReplace() {
	if(typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace || wgUserName === null) return;
	$('span.insertusername').html(wgUserName);
});

/* Auto Lock Forum Threads */
window.LockForums = {
	expiryDays: 120,
	warningDays: 90,
	banners: false,
};