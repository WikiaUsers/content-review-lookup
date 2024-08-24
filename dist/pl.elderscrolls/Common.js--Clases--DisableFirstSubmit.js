// <pre>
/*
 * DisableFirstSubmit v2.4: Clase para deshabilitar el bot�n de guardar la primera vez que se edita un art�culo.
 * No lo deshabilita f�sicamente, pero en lugar de guardar avisar� al usuario con un mensaje que obtiene de una p�gina del wiki.
 * Copyright (C) 2009 - 2012 Jes�s Mart�nez Novo ([[User:Ciencia Al Poder]])
 * This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 2 of the License, or
 *   (at your option) any later version
 * @requires: jquery.ui.dialog, mediawiki.api
 */
(function($) {
	var _dlg = null,
		_init = function() {
			$('#wpSave').bind('click', _onSave);
			// oasis hack
			$('#wpPreview').add('#wpDiff').bind('click.disablefirstsubmit', _onPreview);
		},
		_onSave = function() {
			var api, params;
			if (_dlg == null) {
				api = new mw.Api();
				params = {
					action: 'parse',
					page: 'MediaWiki:Common.js/Clases/DisableFirstSubmit.js/Userpage',
					prop: 'text',
					lang: mw.config.get('wgUserLanguage', mw.config.get('wgContentLanguage')),
					disablepp: ''
				};
				api.get(params, { ok: _displayDialog, err: _endError } );
			} else {
				_dlg.dialog('open');
			}
			$('#wpSave').attr('disabled', 'disabled');
			return false;
		},
		// oasis hack
		_onPreview = function() {
			$('#wpSave').unbind('click', _onSave);
			$('#wpPreview').add('#wpDiff').unbind('click.disablefirstsubmit');
		},
		_displayDialog = function(data) {
			if (data.error) {
				_end();
				return;
			}
			_dlg = $('<div></div>').html(data.parse.text['*']).dialog({
				modal: true,
				title: 'Atenci�n',
				width: $(document).width()*0.75,
				close: _end
			});
		},
		_endError = function() {
			$('#wpSave').unbind('click', _onSave);
			_end();
		},
		_end = function() {
			$('#wpSave').removeAttr('disabled');
		};

	$(_init);
})(jQuery);
// </pre>