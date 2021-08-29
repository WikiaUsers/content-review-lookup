/* Any JavaScript here will be loaded for all users on every page load. */

// Disables the Rollback Script 
window.RollbackWikiDisable = true;

// Default Image License: Fairuse
$(function() {
	if (wgPageName === "Special:Upload") {
    	$("#wpLicense").val("Fairuse");
	}
});