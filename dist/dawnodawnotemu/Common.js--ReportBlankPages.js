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
				'Otrzymaliśmy kilka raportów od użytkowników, którzy twierdzili, że niektóre strony na Dawno, dawno temu Wiki są puste.',
				'Dopóki technicy Wikia nię będą w stanie znaleźć problemu, opracowaliśmy dla was skrypt wykrywający, kiedy zawartość strony zniknie.',
				'Wygląda na to, że błąd ten występuje na stronie, którą ktualnie przeglądasz. Dobrze byłoby, gdybyś go zgłosił. W tym celu należy użyć przycisku "Zgłoś problem", który znajduje się poniżej.',
				'Jeśli chcesz spróbować wyczyścić pamięć podręczną, aby zobaczyć, czy pojawi się treść, kliknij przycisk "Odśwież stronę". Można to zrobić po zgłoszeniu problemu.'
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
		var $button = $('<button id="contactButton" class="mw-htmlform-submit">Zgłoś problem</button>');
		$button.on('click', _onContactButton);
		return $button;
	},
	_onContactButton = function(e) {
		var url = mw.config.get('wgArticlePath').replace('$1', 'Specjalna:Kontakt/bug');
		_popup = window.open(url, 'blankpageerror');
		$(_popup).on('load', _onWinLoaded);
	},
	_onWinLoaded = function() {
		var $form = $(_popup.document.body).find('#contactform');
		$form.find('input[name="wpContactWikiName"]').val(window.location.toString());
		$form.find('input[name="wpFeature"]').val('Blank pages');
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
			'value': 'Odśwież stronę'
		}));
		return $form;
	},
	_reloadAlternate = function() {
		var $button = $('<button id="reloadAlternate" class="mw-htmlform-submit">Odśwież stronę (metoda alternatywna)</button>');
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