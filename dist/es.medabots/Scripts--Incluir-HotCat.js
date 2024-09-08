// Incluir Gadget-HotCat.js
// Para desactivar, agrega "window.noHotCat = true" en tu Monobook.js
if (mw.config.get('skin') != 'oasis' && mw.config.get('wgAction') == 'view' &&
		(mw.config.get('wgNamespaceNumber') == 0 || mw.config.get('wgNamespaceNumber') == 6 || mw.config.get('wgNamespaceNumber') == 14) &&
		window.location.toString().indexOf('diff=') == -1) {
	(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
		if (!document.getElementById('csAddCategorySwitch') && !window.noHotCat) {
			if ($('#catlinks').length == 0) {
				$('#'+(window.bodyContentId||'bodyContent')).children('div.printfooter').after('<div id="catlinks" class="catlinks"></div>');
			}
			if ($('#mw-normal-catlinks').length == 0) {
				$('#catlinks').prepend('<div id="mw-normal-catlinks"><a title="Especial:Categorías" href="'+mw.config.get('wgArticlePath', '').replace('$1', 'Especial:Categorías')+'">Categorías</a></div>');
			}
			$('#mw-normal-catlinks').children('a').eq(0).after('<span class="noprint">&nbsp;<span>(<a style="cursor: pointer;" title="Modificar categorías"><span>+<sup>+</sup></span></a>)</span></span>').next().find('a').click(function() {
				$(this).unbind().closest('span.noprint').eq(0).remove();
				importScript('MediaWiki:Common.js/HotCat.js');
				return false;
			});
			$('#catlinks').removeClass('catlinks-allhidden');
		}
	});
} else if (mw.config.get('wgCanonicalSpecialPageName', '') == 'Upload') {
	(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
		importScript('MediaWiki:Common.js/HotCat.js');
	});
}