// <nowiki>

// FilterTable from https://pad.fandom.com/wiki/Puzzle_%26_Dragons_Wiki
importArticles({
	type: "script",
	articles: "u:pad.fandom.com:MediaWiki:FilterTable.js"
});

// Special:Chat Redirect to Project:Discord
if (mw.config.get('wgPageName') == "Special:Chat") {
	window.location = "https://nuclear-blaze.fandom.com/wiki/Project:Discord";
}

// </nowiki>