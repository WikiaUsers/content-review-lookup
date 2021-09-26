// https://lol.fandom.com/wiki/MediaWiki:Gadget-disableDisplayTitle.js (although modified)
/* disable displaytitle when it's doing something other than lowercasing first letter of a page (for easier copy-pasting of scoreboard page names for concepts mostly) */
$(function() {
	if ($("#firstHeading").text().toLowerCase() != mw.config.get("wgTitle").toLowerCase()) {
		if (mw.config.get("wgCanonicalNamespace") == "") {
			return; // skip main namespace
		}
		else {
			if (mw.config.get("wgCanonicalNamespace") == "Project") return; // skip Project namespace
			if (mw.config.get("wgCanonicalNamespace") == "Project_talk")
				$("#firstHeading").text("Wowpedia talk:" + mw.config.get("wgTitle"));
			else
				$("#firstHeading").text(mw.config.get("wgCanonicalNamespace").replace(/_/g," ") + ":" + mw.config.get("wgTitle"));
		}
	}
});