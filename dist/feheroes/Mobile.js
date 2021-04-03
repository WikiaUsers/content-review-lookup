/*
MediaWiki:Common.js - Loaded for all skins, NOT loaded on mobile.
MediaWiki:Mobile.js - Loaded for mobile ONLY.
MediaWiki:Universal.js - Loaded by both Common.js and Mobile.js, so loaded on everything no matter what.
MediaWiki:Hydra.js - Loaded on the Hydra skin ONLY.
*/
(function() {
	"use strict";
	mw.loader.load(mw.config.get("wgScriptPath")+"/index.php?title=MediaWiki:Universal.js&action=raw&ctype=text/javascript","text/javascript");
	// Place mobile-only JS here
})();