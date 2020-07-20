/**
 * Replaces {{USERNAME}} with the name of the user browsing the page.
 * For usage with Template:USERNAME.
 */
$(function () {
    if (!wgUserName) return;
    $('span.insertusername').html(wgUserName);
});
//End of Template:USERNAME usage
//Clock
// Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2I:%2M:%2S %p %2d %{January;Febuary;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';
importArticles({
	type: 'script',
	articles: [
		// ...
		'u:dev:DisplayClock/code.js',
		// ...
	]
});