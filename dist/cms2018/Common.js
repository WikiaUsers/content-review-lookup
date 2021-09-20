/* Any JavaScript here will be loaded for all users on every page load. */

// Disables the Rollback Script 
window.RollbackWikiDisable = true;

// Back to Top Button Params
window.BackToTopSpeed = 400;
window.BackToTopModern = true;

// Default Image License: Fairuse
$(function() {
	if (wgPageName === "Special:Upload") {
    	$("#wpLicense").val("Fairuse");
	}
});

// Redirect Special:Chat to Discord
if (mw.config.get('wgPageName') === "Special:Chat") {
    window.location = "https://cms2018.fandom.com/wiki/Discord";
}