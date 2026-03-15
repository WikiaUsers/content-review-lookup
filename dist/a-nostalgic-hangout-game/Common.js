window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 30;
window.lockOldComments.addNoteAbove = true;

/* Preload custom page-title font to reduce FOUT (flash of fallback font) */
(function(){
	try {
		var url = 'https://a-nostalgic-hangout-game.fandom.com/wiki/Special:FilePath/Roblox_classic_font_by_ripoof_dek2qmw.woff2';
		var link = document.createElement('link');
		link.rel = 'preload';
		link.as = 'font';
		link.href = url;
		link.crossOrigin = 'anonymous';
		document.head.appendChild(link);
	} catch (e) {
		/* fail silently */
	}
})();