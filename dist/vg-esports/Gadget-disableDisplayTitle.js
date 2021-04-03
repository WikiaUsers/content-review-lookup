/* disable displaytitle when it's doing something other than lowercasing first letter of a page (for easier copy-pasting of scoreboard page names for concepts mostly) */

$(function() { if ($("#firstHeading").text().toLowerCase()!=mw.config.get("wgTitle").toLowerCase()) {
	if (mw.config.get("wgCanonicalNamespace") == "") {
		$("#firstHeading").text(mw.config.get("wgTitle"));
	}
	else {
		$("#firstHeading").text(mw.config.get("wgCanonicalNamespace") + ":" + mw.config.get("wgTitle"));
	}
}
});