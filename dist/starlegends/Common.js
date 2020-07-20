/* Any JavaScript here will be loaded for all users on every page load. */
 
importScriptPage('ShowHide/code.js', 'dev');
 
var ShowHideConfig = { 
    autoCollapse: 3,
    brackets: '  ',
    userlang: false, 
    en: {
	show: "[show]",
	hide: "[hide]",
	showAll: "[expand all]",
	hideAll: "[collapse all]"
    }
}
/* Compatibilidad, al inicio del resto de carga de elementos. Necesario para que todas las utilidades que funcionan en Monobook y Monaco funcionen en oasis 
* Wikia: ¿Quién tuvo la estupenda idea de no respetar los ID's comunes del wiki? */
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