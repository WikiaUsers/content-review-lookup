/* Any JavaScript here will be loaded for all users on every page load. */
if (mw.config.get("wgAction") === "view") {
	mw.loader.load(
		mw.util.getUrl("MediaWiki:FilterTable.js", {
			action: "raw",
			ctype: "text/javascript"
		})
	);
}