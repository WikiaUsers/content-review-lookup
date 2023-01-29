// See [[w:c:dev:ReferencePopups/code.configure.js]]
/*! Copyright (C) 2012 Lunarity
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/*jshint browser:true jquery:true laxbreak:true smarttabs:true multistr:true trailing:true */
/*global mediaWiki */

// Global namespace
window.dev = window.dev || {};
/*global dev */
dev.ReferencePopups = dev.ReferencePopups || {};

// i18n messages
// TODO: This could get rather large, it may be worth having separate language files for each.
(function(module, lang) {
	"use strict";
	var i18n = {
		en: {
			confTitle: 'Configure Reference Popups',
			confReenableHelp: 'If you disable the popups, they can be re-enabled by clicking the "Configure Reference Popups" link at the bottom of the page, near the categories.',
			confDisable: 'Disable Reference Popups',
			confEnable: 'Enable Reference Popups',
			confLockdown: '[LOCKED]',
			confLockdownMsg: 'This wiki has been configured to always require Reference Popups be enabled.',
			confActivateDelay: 'Hover Activation Delay:',
			confMilliseconds: 'ms',
			confHoverSticky: 'Make popups stay open until touched with the mouse',
			confActivateDelayInstant: 'Instant',
			confActivateDelayNormal: 'Normal',
			confActivateDelaySlow: 'Slow',
			confActivateDelayLate: 'Tedious',
			confActivateBy: 'Activate Popup by:',
			confActivateByHover: 'Hovering',
			confActivateByClick: 'Clicking',
			confEnableAnimations: 'Enable Open/Close Animation:',
			confSaveButton: 'Save',
			confCancelButton: 'Cancel'
		},
		es: {
			confTitle: 'Configurar Popups de referencia',
			confReenableHelp: 'Si desactiva las ventanas emergentes, se pueden volver a activar pulsando el enlace "Configurar Popups de referencia" en la parte inferior de la página, cerca de las categorías.',
			confDisable: 'Desactivar Popups de referencia',
			confEnable: 'Habilitar Popups de referencia',
			confLockdown: '[BLOQUEADO]',
			confLockdownMsg: 'Este wiki se ha configurado para requerir siempre de las ventanas emergentes de referencia',
			confActivateDelay: 'Pase el ratón Retraso de activación:',
			confMilliseconds: 'ms',
			confHoverSticky: 'Haga que los popups permanescan abiertos hasta tocar con el ratón',
			confActivateDelayInstant: 'Instantaneo',
			confActivateDelayNormal: 'Normal',
			confActivateDelaySlow: 'Lento',
			confActivateDelayLate: 'Tedioso',
			confActivateBy: 'Activar Popup por:',
			confActivateByHover: 'Suspendido',
			confActivateByClick: 'Cliqueando',
			confEnableAnimations: 'Mantener abierto/cerrado la aniomación:',
			confSaveButton: 'Guardar',
			confCancelButton: 'Cancelar'
		},
                fr: {
                        confTitle: 'Configurer Popups de Référence',
                        confReenableHelp: 'Si vous désactivez les popups, elles peuvent être réactivées en cliquant sur le lien «Configurer Popups de Référence» en bas de page, à proximité des catégories.',
                        confDisable: 'Désactiver les Popups de Référence',
                        confEnable: 'Activer les Popups de Référence',
                        confLockdown: '[VERROUILLÉ]',
                        confLockdownMsg: 'Ce wiki a été configuré pour activer en permanence les Popups de Référence.',
                        confActivateDelay: 'Délai d\'activation au survol:',
                        confMilliseconds: 'ms',
                        confHoverSticky: 'Laisser les popups ouvertes jusqu\'au contact avec la souris',
                        confActivateDelayInstant: 'Instantanné',
                        confActivateDelayNormal: 'Normal',
                        confActivateDelaySlow: 'Lent',
                        confActivateDelayLate: 'Très lent',
                        confActivateBy: 'Activer les Popups:',
                        confActivateByHover: 'Au survol',
                        confActivateByClick: 'En cliquant',
                        confEnableAnimations: 'Activer l\'Animation d\'Ouverture/Fermeture:',
                        confSaveButton: 'Enregistrer',
                        confCancelButton: 'Annuler'
                },
		pl: {
			confTitle: 'Skonfiguruj wyskakujące przypisy',
			confReenableHelp: 'Aby ponownie włączyć wyskakujące przypisy, kliknij przycisk "Skonfiguruj wyskakujące przypisy" na dole strony (obok kategorii).',
			confDisable: 'Wyłącz wyskakujące przypisy',
			confEnable: 'Włącz wyskakujące przypisy',
			confLockdown: '[ZABLOKOWANE]',
			confLockdownMsg: 'Ta wiki ma zawsze włączone wyskakujące przypisy.',
			confActivateDelay: 'Zmień opóźnienie:',
			confHoverSticky: 'Nie zamykaj okienka dopóki nie kliknę myszką',
			confActivateDelayInstant: 'Szybko',
			confActivateDelayNormal: 'Normalnie',
			confActivateDelaySlow: 'Wolno',
			confActivateDelayLate: 'Bardzo wolno',
			confActivateBy: 'Aktywuj wyskakujące okno przez:',
			confActivateByHover: 'Najechanie',
			confActivateByClick: 'Kliknięcie',
			confEnableAnimations: 'Animacja przy włączeniu/wyłączeniu',
			confSaveButton: 'Zapisz',
			confCancelButton: 'Anuluj'
		}
	};
	module.messages = $.extend(module.messages, i18n.en, i18n[lang]);
})(dev.ReferencePopups, mediaWiki.config.get('wgUserLanguage'));


// Reference Popup core's configuration UI. Separated for size/performance reasons.
// This code is written to be almost entirely independent from the core to make it easier to
// test separately. No promises are made about CSS styling though.
(function(window, $, mw, callback) {
	"use strict";

	// Double runs
	var module = window.dev.ReferencePopups;
	if (module.configure) {
		return $.noop;
	}

	var mwReady = $.Deferred(), mwDeps = ['jquery.ui.slider', 'jquery.ui.button', 'wikia.mustache'];
	mw.loader.load(mwDeps, null, true);
	mw.loader.using(mwDeps, mwReady.resolve, mwReady.reject);
	var colors = window.dev.colors || $.ajax({
		url: mw.config.get('wgLoadScript'),
		data: {
			mode: 'articles',
			only: 'scripts',
			articles: 'MediaWiki:Colors/code.js'
		},
		dataType: 'script',
		cache: true
	});

	// Support CSS
	if (!module.cssLoaded) {
		window.importArticle({ type: 'style', article: 'MediaWiki:ReferencePopups/code.css' });
		module.cssLoaded = true;
	}

	var dfd = $.Deferred();
	module.configure = dfd.promise();
	$.when(mwReady, colors).done(function() {
		dfd.resolve(module.configure = callback(module, window, $, mw, window.dev.colors, window.Mustache));
	}).fail(function() {
		delete module.configure;
		dfd.reject();
	});
})(window, jQuery, mediaWiki, function(module, window, $, mw, Colors, Mustache) {
"use strict";

// Custom CSS. Try to make the popup fit into the skin by adapting to the color scheme
// Oasis' SCSS sheets do not style jQuery UI's slider so we need to hack that in
if (mw.config.get('skin') === 'oasis') {
	// The slider background needs to be similar but different from the menu gradient.
	module.colors.slideBack = Colors.parse(Colors.wikia.gradient).mix('white', 85);
	module.colors.darkGradient = Colors.parse(Colors.wikia.menu).mix('black', 75);
	Colors.css('\
	#refpopups-delay-slider {\
		background-image: -webkit-linear-gradient(left, $slideBack 30%, $menu 70%);\
		background-image: linear-gradient(to right, $slideBack 30%, $menu 70%);\
	}\
	#refpopups-delay-slider > .ui-slider-handle {\
		background-color: $menu;\
		border: 2px solid $gradient;\
		background-image: -webkit-linear-gradient(top, $gradient 35%, $menu 65%);\
		background-image: linear-gradient(to bottom, $gradient 35%, $menu 65%);\
	}\
	#refpopups-delay-slider > .ui-slider-handle:hover {\
		background-image: -webkit-linear-gradient(top, $menu 35%, $darkGradient 65%);\
		background-image: linear-gradient(to bottom, $menu 35%, $darkGradient 65%);\
	}\
	#refpopups-delay-slider > .ui-slider-handle.ui-state-active {\
		background-image: -webkit-linear-gradient(top, $darkGradient 35%, $menu 65%);\
		background-image: linear-gradient(to bottom, $darkGradient 35%, $menu 65%);\
	}', module.colors);
}

// PROBLEM: Oasis does not have a jquery.ui.dialog stylesheet so the dialog has no
//	proper appearance (the background is transparent and the modal blackout is as well),
//	I had to resort to Wikia's showModal instead to get something workable.
//	[Fortunately, this works in Monobook]
return function(settings, onSave, onClose) {
	function saveDialog() {
		settings.animate = $('#refpopups-animate').prop('checked');
		settings.hoverDelay = +$('#refpopups-delay').val() || 200;
		settings.react = $('#refpopups-byhover').prop('checked') ? 'hover' : 'click';
		settings.disabled = $('#refpopups-disable').data('val') && !module.lockdown;
		settings.stick = $('#refpopups-sticky').prop('checked');
		onSave(settings);
	}
	var msg = module.messages;

	// Construct the interface's UI
	var $modal = $.showCustomModal(
		msg.confTitle,
		Mustache.render('<form onsubmit="return false">' +
		'<button id="refpopups-disable" type="button"></button>' +
		'<p>{{confReenableHelp}}</p>' +
		'<hr>' +
		'<label for="refpopups-delay">{{confActivateDelay}}</label>' +
		'<input type="number" min="0" step="1" size="5" id="refpopups-delay">{{confMilliseconds}}' +
		'<input type="checkbox" id="refpopups-sticky">' +
		'<label for="refpopups-sticky">{{confHoverSticky}}</label>' +
		'<table class="refpopups-delay-slider-table"><tbody>' +
		'<tr><td class="refpopups-delay-slider-instant">{{confActivateDelayInstant}}</td>' +
		'<td class="refpopups-delay-slider-normal">{{confActivateDelayNormal}}</td>' +
		'<td class="refpopups-delay-slider-slow">{{confActivateDelaySlow}}</td>' +
		'<td class="refpopups-delay-slider-late">{{confActivateDelayLate}}</td></tr>' +
		'<tr><td colspan="4"><div id="refpopups-delay-slider"></div></td></tr>' +
		'</tbody></table>' +
		'<span id="refpopups-activateby-msg">{{confActivateBy}}</span>' +
		'<input type="radio" id="refpopups-byhover" name="activate" aria-describedby="refpopups-activateby-msg">' +
		'<label for="refpopups-byhover">{{confActivateByHover}}</label>' +
		'<input type="radio" id="refpopups-byclick" name="activate" aria-describedby="refpopups-activateby-msg">' +
		'<label for="refpopups-byclick">{{confActivateByClick}}</label>' +
		'<br><label for="refpopups-animate">{{confEnableAnimations}}</label><input type="checkbox" id="refpopups-animate">' +
		'</form>', msg),
		{
			buttons: [
				{
					id: 'refpopups-save',
					message: Mustache.render('{{confSaveButton}}', msg),
					defaultButton: true,
					handler: function() {
						saveDialog();
						$modal.closeModal();
						if (typeof(onClose) === 'function') { onClose(); }
					}
				}, {
					id: 'refpopups-close',
					message: Mustache.render('{{confCancelButton}}', msg),
					handler: function() {
						$modal.closeModal();
						if (typeof(onClose) === 'function') { onClose(); }
					}
				}
			],
			onClose: onClose
		}
	);

	// Monobook fix
	if (mw.config.get('skin') !== 'oasis') {
		$('#refpopups-save, #refpopups-close').button();
	}

	// Configure dialog properties
	var $slider = $('#refpopups-delay-slider').slider({
		min: 1,
		max: 1000, // Long enough to be frustratingly slow
		value: settings.hoverDelay,
		slide: function(ev, ui) {
			$delay.val(ui.value); // Link slider and textbox together
		}
	});
	var $delay = $('#refpopups-delay').val(settings.hoverDelay).on('change', function() {
		$slider.slider('value', $(this).val());
	});
	$('#refpopups-sticky').prop('checked', settings.stick);
	$('#refpopups-animate').prop('checked', settings.animate);

	// Interface lock when switching between click/hover
	$('#refpopups-byclick').click(function() {
		if (!this.checked) { return; }
		$('#refpopups-delay, #refpopups-sticky').prop('disabled', true);
		$('#refpopups-delay-slider').slider('disable');
	});
	$('#refpopups-byhover').click(function() {
		if (!this.checked) { return; }
		$('#refpopups-delay, #refpopups-sticky').prop('disabled', false);
		$('#refpopups-delay-slider').slider('enable');
	});
	$('#refpopups-by' + settings.react).prop('checked', true).click();

	// Disable button event
	$('#refpopups-disable').data('val', !settings.disabled).click(function() {
		var $this = $(this), toggle = !$this.data('val');
		$this.data('val', toggle).text(msg[toggle ? 'confEnable' : 'confDisable']);
	}).click();

	// Lockdown feature removes menu items for configuration, that means that it can't
	// be disabled.
	if (module.lockdown) {
		$('#refpopups-disable').prop('disabled', true);
		$modal.find('#refpopups-disable + p').html(
		Mustache.render('<b style="font-weight:bold">{{confLockdown}}</b>{{confLockdownMsg}}', msg)
		);
	}
};

});