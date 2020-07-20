/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying [[Template:USERNAME]]. */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */

/* Timer */
window.DisplayClockJS = '%2H:%2M:%2S, %2d.%{01;02;03;04;05;06;07;08;09;10;11;12}m.%Y (UTC)';
importArticles({
	type: 'script',
	articles: [
		// …
		'u:dev:DisplayClock/code.js',
		// …
	]
});