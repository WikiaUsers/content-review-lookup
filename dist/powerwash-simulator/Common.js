// <nowiki>
window.dev = window.dev || {},

// Disables the Rollback Script 
window.RollbackWikiDisable = true;

// Default Image License: Fairuse
$(function() {
	if (wgPageName == "Special:Upload") {
		$("#wpLicense").val("Fairuse");
	}
});

// Redirect Special:Chat to Project:Discord
if (mw.config.get('wgPageName') === "Special:Chat") {
    window.location = "https://powerwash-simulator.fandom.com/wiki/Project:Discord";
}

// </nowiki>