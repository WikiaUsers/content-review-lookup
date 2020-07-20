/* v1.0 <pre>
 * AvisoPrevioEditarLista: Muestra un aviso al editar un artículo si está
 *  enlazado desde una página concreta
 * Copyright (c) 2016 Jesús Martínez (User:Ciencia_Al_Poder)
 * This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 2 of the License, or
 *   (at your option) any later version
 * @requires: jquery.ui.dialog, mediawiki.api
 */
(function($, mw) {
	'use strict';
	// Página que contiene enlaces a las páginas que deben mostrar el aviso
	var _enlacesAvisos = 'Usuario:Ciencia Al Poder/Aviso info aun no revelada SL',
		// Página que contiene el aviso
		_paginaAviso = 'MediaWiki:Custom-Aviso datos no oficiales SL',
		_init = function() {
			if (mw.config.get('wgNamespaceNumber') !== 0) return;
			if (mw.config.get('wgAction') == 'edit' && document.location.href.indexOf('action=edit') != -1) {
				mw.loader.using( ['jquery.ui.dialog', 'mediawiki.api'], _cargarPaginas );
			}
		},
		_cargarPaginas = function() {
			var params, api;
			params = {
				action: 'query',
				titles: _enlacesAvisos,
				prop: 'links',
				plnamespace: '0',
				pltitles: mw.config.get('wgPageName')
			};
			api = new mw.Api();
			api.get(params).done(_comprobarPagina);
		},
		_comprobarPagina = function(data) {
			var pp;
			if (data && data.query && data.query.pages) {
				pp = data.query.pages;
				for (var pId in pp) {
					if (pp.hasOwnProperty(pId) &&
					 pp[pId].hasOwnProperty('links') &&
					 pp[pId].links.length > 0) {
						_obtenerTextoAviso();
					}
				}
			}
		},
		_obtenerTextoAviso = function() {
			var params, api;
			params = {
				action: 'parse',
				page: _paginaAviso,
				prop: 'text',
				disablepp: '1'
			};
			api = new mw.Api();
			api.get(params).done(_comprobarTextoAviso);
		},
		_comprobarTextoAviso = function(data) {
			if (data && data.parse && data.parse.text && data.parse.text['*']) {
				_mostrarAviso(data.parse.text['*']);
			}
		},
		_mostrarAviso = function(html) {
			$('<div></div>').html(html).dialog({
				modal: true,
				title: 'Atención',
				width: $(document).width()*0.75,
			});
		};

	$(_init);
})(jQuery, mw);
/*</pre>*/