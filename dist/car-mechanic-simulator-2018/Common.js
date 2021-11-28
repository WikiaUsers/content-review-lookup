// <nowiki>
window.dev = window.dev || {};

// Default Image License: Fairuse
$(function() {
	if (wgPageName === "Special:Upload") {
    	$("#wpLicense").val("Fairuse");
	}
});

// Redirect Special:Chat to Discord
if (mw.config.get('wgPageName') === "Special:Chat") {
    window.location = "https://car-mechanic-simulator-2018.fandom.com/wiki/Project:Discord";
}

// </nowiki>