/* Any JavaScript here will be loaded for all users on every page load. */

/* Configuration for dev:PreloadTemplates.js */
window.preloadTemplates_subpage = "case-by-case";

/* Expanding categories section by default */
$(function() {
    $('.page-footer__categories.wds-is-collapsed').removeClass('wds-is-collapsed');
});
/* End categories section */

/* Selecting Fair use licensing by default on Special:Upload */
$(document).on("submit", function(e) {
	if (e.target.id == "mw-upload-form") {
		$(e.target).find('[name="wpLicense"] [value=""]:not([disabled])').attr("value", "Fairuse");
	}
});
/* End Licensing */