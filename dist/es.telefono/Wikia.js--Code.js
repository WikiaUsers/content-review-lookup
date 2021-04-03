{{:MediaWiki:Common.js/Code.js}}
/*<pre> MediaWiki:Wikia.js v1.31 */
// Parche para la búsqueda
(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
	var f = $('#WikiaSearch');
	if (f && f.attr('action') && f.attr('action').indexOf('index.php') == 0) {
		f.attr('action', mw.config.get('wgScript'));
		f.prepend('<input type="hidden" name="title" value="Especial:Buscar"/>');
	}
});
 
// Reportar páginas en blanco
(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
	if ($('#mw-content-text').children(':not(noscript)').length == 0) {
		mw.config.set('varnish_stat', $.cookie('varnish-stat'));
		importScript('MediaWiki:Common.js/Clases/ReportBlankPages.js');
	}
});

/*</pre>*/