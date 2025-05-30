/* Configuration for dev:PreloadTemplates.js */
window.preloadTemplates_subpage = "case-by-case";

/* Configuration for dev:WikiActivity.js */
window.rwaOptions = {
	limit: 50,
	namespaces: [ 0, 1, 2, 3, 4, 5, 6, 7, 110, 111, 500, 501, 828, 829 ],
	autoInit: true 
};

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