/* <pre> */

// Incluir Gadget-HotCat.js
// Para desactivar, agrega "window.noHotCat = true" en tu Monobook.js
if (window.skin != 'oasis' && wgAction == 'view' &&
		(wgNamespaceNumber == 0 || wgNamespaceNumber == 6 || wgNamespaceNumber == 14) &&
		window.location.toString().indexOf('diff=') == -1) {
	$(function() {
		if (!document.getElementById('csAddCategorySwitch') && !window.noHotCat) {
			if ($('#catlinks').length == 0) {
				$('#bodyContent').children('div.printfooter').after('<div id="catlinks" class="catlinks"></div>');
			}
			if ($('#mw-normal-catlinks').length == 0) {
				$('#catlinks').prepend('<div id="mw-normal-catlinks"><a title="Especial:Categorías" href="'+wgArticlePath.replace('$1', 'Especial:Categorías')+'">Categorías</a></div>');
			}
			$('#mw-normal-catlinks').children('a').eq(0).after('<span class="noprint">&nbsp;<span>(<a style="cursor: pointer;" title="Modificar categorías"><span>+<sup>+</sup></span></a>)</span></span>').next().find('a').click(function() {
				$(this).unbind().parents('span.noprint').eq(0).remove();
				importScript('MediaWiki:Common.js/Gadget-HotCat.js');
				return false;
			});
			$('#catlinks').removeClass('catlinks-allhidden');
		}
	});
} else if (wgNamespaceNumber == -1 && wgCanonicalSpecialPageName == 'Upload') {
	importScript('MediaWiki:Common.js/Gadget-HotCat.js');
}

//</pre>