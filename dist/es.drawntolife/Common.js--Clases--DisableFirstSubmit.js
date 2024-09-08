// <pre>
/*
 * DisableFirstSubmit v2.5: Clase para deshabilitar el botón de guardar la primera vez que se edita un artículo.
 * No lo deshabilita físicamente, pero en lugar de guardar avisará al usuario con un mensaje que obtiene de una página del wiki.
 * Copyright (C) 2009, 2010 Jesús Martínez Novo ([[User:Ciencia Al Poder]])
 * This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 2 of the License, or
 *   (at your option) any later version
*/
(function($) {

	DisableFirstSubmit = function(submit, title) {
		this.dialogOpened = false;
		if (submit && title) {
			this.init(submit, title);
		}
	};

	DisableFirstSubmit.prototype = {
		init: function(submit, title) {
			this.reqURL = wgScriptPath+'/api.php?action=parse&page='+encodeURIComponent(title)+'&prop=text&format=json&lang='+(window.wgUserLanguage||window.wgContentLanguage);
			submit.bind('click', function(thisArg) {
				return function(e){ return thisArg.onSubmit(e); };
			}(this));
		},
		onSubmit: function() {
			this.showDlg();
			return false;
		},
		showDlg: function() {
			if (this.dialogOpened) return;
			Thickbox.preload();
			Thickbox.xhr = $.getJSON(this.reqURL, function(data) {
				Thickbox.xhr = null;
				var w = $('#TB_window');
				w.width($(document).width()*0.75).append('<div id="TB_title"><div id="TB_closeAjaxWindow"><a href="#" id="TB_closeWindowButton" title="Cerrar [ESC]">cerrar</a></div>¡Atención!</div><div id="TB_ajaxContent">'+data.parse.text['*']+'</div>');
				$('#TB_closeWindowButton').click(Thickbox.remove);
				$(document).bind('keyup.thickbox', Thickbox.keyListener);
				var h = w.height();
				var mh = $(window).height() - (Thickbox.minMarginHeight*2);
				if (h > mh) {
					var ac = $('#TB_ajaxContent');
					ac.height(mh - h + ac.height());
				}
				Thickbox.width = w.width();
				Thickbox.height = w.height();
				Thickbox.position();
				Thickbox.displayClean();
			});
			this.dialogOpened = true;
			$('#TB_window').bind('unload', function(thisArg) {
				return function() {
					thisArg.dialogOpened = false;
				};
			}(this));
		}
	};
})(jQuery);

new DisableFirstSubmit($('#wpSave'), 'MediaWiki:Common.js/Clases/DisableFirstSubmit.js/Userpage');
// </pre>