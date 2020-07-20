/* Any JavaScript here will be loaded for all users on every page load. */

/* Adds icons to page header bottom border */
 
$(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaArticle').prepend($('#top-page-icons'));
	}
});

/* End icons */