// <nowiki>
$(function() {
	$(document).on("click", "#purge-cache", function() {
		window.purgeWithConfirmationAndReload(mw.config.get('wgPageName'));	
	});
});
// </nowiki>