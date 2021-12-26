// <nowiki>
window.dev = window.dev || {};

// Default Image License: Permission
$(function() {
	if (wgPageName == "Special:Upload") {
		$("#wpLicense").val("Fairuse");
	}
});

// Redirect Special:Chat to Discord
if (mw.config.get('wgPageName') == "Special:Chat") {
	window.location = "https://dontescape.fandom.com/wiki/Project:Discord";
}

// </nowiki>