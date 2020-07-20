/* Any JavaScript here will be loaded for all users on every page load. */

/* Compatibility iAtrox */
function oasisCompatElements() {
	$(document.body).append('<section id="positioned_elements"></section>');
	var fb = $('#WikiaArticle').children('#fb-root').eq(0);
	if (window.wgNamespaceNumber == -1 && window.wgCanonicalSpecialPageName == 'Listusers') return; // Wikia is too incompatible
	if (fb.exists()) {
		$('<div id="bodyContent"></div>').insertAfter(fb);
		if ($('#wikiPreview').exists()) {
			$('#wikiPreview').appendTo('#bodyContent');
		} else {
			var pf = $('#WikiaArticle').children('div.printfooter').eq(0);
			if (pf.exists()) {
				$('#bodyContent').nextAll().not(pf).not(pf.nextAll()).appendTo('#bodyContent');
			}
		}
	}
}

if (window.skin == 'oasis') {
	$(oasisCompatElements);
};