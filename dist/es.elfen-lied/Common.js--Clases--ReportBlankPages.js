/*<pre> v1.1*/
(function() {
	var _varnish = '',
	_popup = null,
	_init = function() {
		mw.loader.using('mediawiki.api', _getRevisionDetails);
		$.get('/__varnish_servername', function(data) {
			_varnish = data;
		});
	},
	_getRevisionDetails = function() {
		var api = new mw.Api();
		api.get({
			action: 'query',
			prop: 'revisions',
			titles: mw.config.get('wgPageName'),
			rvprop: 'size'
		}, _parseRevisionDetails);
	},
	_parseRevisionDetails = function(data) {
		var pages;
		if (data && data.query && data.query.pages) {
			pages = data.query.pages;
			for (var pp in pages) {
				if (typeof pages[pp].missing == 'undefined') {
					if (pages[pp].revisions[0].size > 500) {
						// Hay contenido suficiente, no solo categorías. WARN
						_mostrarMensaje();
					}
				}
			}
		}
	},
	// Mostrar mensaje al usuario
	_mostrarMensaje = function() {
		var mwContWrapper = $('#mw-content-text'),
			msgCont = [
				'Los administradores de Wiki Elfen Lied hemos recibido varios reportes de usuarios diciendo que algunas páginas aparecen en blanco.',
				'Dado que los técnicos de Wikia no son capaces de encontrar el problema, hemos diseñado un script para detectar cuando esto ocurre.',
				'Aparentemente, ha sucedido en la página que estás viendo actualmente.',
				'Sería de gran ayuda que reportaras el problema a Wikia. Para ello usa el botón "reportar problema". Se abrirá una nueva ventana (asegúrate que el bloqueador de ventanas emergentes no la bloquea). Cuando la página se cargue, espera un poco a que se rellenen los datos del mensaje (se incluirá información en inglés). El script rellenará el mensaje con información necesaria para que Wikia diagnostique el problema. Revisa la información, escribe los caracteres borrosos (si no has iniciado sesión) y pulsa el botón para enviar el formulario.',
				'Si quieres intentar purgar la caché a ver si aparece el contenido, pulsa el botón "purgar la página". Puedes hacerlo después de reportar el problema, puesto que una vez aparezca el contenido ya no podrás reportar el problema.'
			],
			$iframe;
		for (var i = 0; i < msgCont.length; i++) {
			mwContWrapper.append($('<p></p>').text(msgCont[i]));
		}
		mwContWrapper.append($('<p></p>').append(_contactButton()));
		mwContWrapper.append($('<p></p>').append(_purgeForm()));
		mwContWrapper.append($('<p></p>').append(_reloadAlternate()));
	},
	_contactButton = function() {
		var $button = $('<button id="contactButton" class="mw-htmlform-submit">Reportar problema</button>');
		$button.on('click', _onContactButton);
		return $button;
	},
	_onContactButton = function(e) {
		var url = mw.config.get('wgArticlePath').replace('$1', 'Especial:Contactar/bug');
		_popup = window.open(url, 'blankpageerror');
		$(_popup).on('load', _onWinLoaded);
	},
	_onWinLoaded = function() {
		var $form = $(_popup.document.body).find('#contactform');
		$form.find('input[name="wpContactWikiName"]').val(window.location.toString());
		$form.find('input[name="wpFeature"]').val('Blank pages / Páginas en blanco');
		$form.find('textarea[name="wpDescription"]').val('Refer to http://support.wikia-inc.com/tickets/71277\n\n'+
			'Blank page detected through automated script. Information provided with user consent.\n\n' +
			'__varnish_servername: '+_varnish+'\n\n'+
			'skin: '+mw.config.get('skin')+'\n\n');
	},
	_purgeForm = function() {
		var options = {
				wpEditToken: mw.user.tokens.get('editToken'),
				title: mw.config.get('wgPageName'),
				action: 'purge',
				redirectparams: ''
			},
			$form = $('<form></form>').attr({
				enctype: 'multipart/form-data',
				method: 'post',
				action: mw.config.get('wgArticlePath').replace('$1', encodeURIComponent(mw.config.get('wgPageName')))
			});
		for (var opt in options) {
			$form.append($('<input type="hidden"/>').attr({
				name: opt,
				value: options[opt]
			}));
		}
		$form.append($('<input type="submit"/>').attr({
			'class': 'mw-htmlform-submit',
			'value': 'Purgar la página'
		}));
		return $form;
	},
	_reloadAlternate = function() {
		var $button = $('<button id="reloadAlternate" class="mw-htmlform-submit">Purgar la página (método alternativo)</button>');
		$button.on('click', _onReloadAlternate);
		return $button;
	},
	_onReloadAlternate = function() {
		var url = mw.config.get('wgArticlePath').replace('$1', encodeURIComponent(mw.config.get('wgPageName'))),
			ts = new Date().getTime();
		if (url.indexOf('?') == -1) {
			url += '?ts='+ts;
		} else {
			url += '&ts='+ts;
		}
		window.location.href = url;
	};

	(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(_init);
})();
/*</pre>*/