/* Any JavaScript here will be loaded for all users on every page load. */
$("#mw-content-text div.embedpdf").each(function() {
	var path = $(this).data("path");
	// if a non-Fandom or non PDF path is provided, skip
	if (!path.match(/https:\/\/vignette\.wikia\.nocookie\.net\/.*?\/images\/[\d\w]\/[\d\w]{2}\/.*?\.pdf/)) return;
	$(this).html('<object width="100%" height="100%" data="'+path+'" type="application/pdf"></object>');
});