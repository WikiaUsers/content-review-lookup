/* Any JavaScript here will be loaded for all users on every page load. */

// https://dev.fandom.com/wiki/RevealAnonIP
window.RevealAnonIP = {
	permissions : ["rollback", "sysop", "bureaucrat"]
};

// Disables the Rollback Script 
window.RollbackWikiDisable = true;

// Default Image License: Fairuse
$(function() {
	if (wgPageName === "Special:Upload") {
    	$("#wpLicense").val("Fairuse");
	}
});