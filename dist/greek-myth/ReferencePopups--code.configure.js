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
		ru: {
			confTitle: 'Настройки всплывающих подсказок',
			confReenableHelp: 'После отключения всплывающие подсказки могут быть повторно включены при помощи ссылки внизу страницы.',
			confDisable: 'Отключить всплывающие подсказки',
			confEnable: 'Включить всплывающие подсказки',
			confLockdown: '[Закрыто]',
			confLockdownMsg: 'Эта вики настроена так, чтобы всплывающие подсказки всегда были включены',
			confActivateDelay: 'Задержка перед появлением подсказки:',
			confMilliseconds: '(в миллисекундах)',
			confHoverSticky: 'Сделать всплывающие подсказки всегда открытыми, пока по ним не кликнуть мышью.',
			confActivateDelayInstant: 'Задерж.',
			confActivateDelayNormal: 'Нормальная',
			confActivateDelaySlow: 'Медленная',
			confActivateDelayLate: 'Очень медленная',
			confActivateBy: 'Подсказка появляется при',
			confActivateByHover: 'наведении',
			confActivateByClick: 'клике',
			confEnableAnimations: 'Включить/Выключить анимацию:',
			confSaveButton: 'Сохранить настройки',
			confCancelButton: 'Отменить настройки'
		},
		uk: {
			confTitle: 'Налаштування спливаючих підказок',
			confReenableHelp: 'Після відключення, спливаючі підказки можуть бути повторно включені за допомогою посилання внизу сторінки.',
			confDisable: 'Відключити спливаючі підказки',
			confEnable: 'Увімкнути спливаючі підказки',
			confLockdown: '[Закрито]',
			confLockdownMsg: 'Ця вікі налаштована так, щоб спливаючі підказки завжди були увімкненні',
			confActivateDelay: 'Затримка перед появою підказки:',
			confMilliseconds: '(в мілісекундах)',
			confHoverSticky: 'Зробити спливаючі підказки завжди відкритими, поки по них не клікнути мишею.',
			confActivateDelayInstant: 'Затрим.',
			confActivateDelayNormal: 'Нормальна',
			confActivateDelaySlow: 'Повільна',
			confActivateDelayLate: 'Дуже повільна',
			confActivateBy: 'Підказка відобразиться при:',
			confActivateByHover: 'наведенні',
			confActivateByClick: 'кліку',
			confEnableAnimations: 'Увімкнути / Вимкнути анімацію:',
			confSaveButton: 'Зберегти налаштування',
			confCancelButton: 'Відмінити'
		},
		es: {
			confTitle: 'Configurar popups para referencias',
			confReenableHelp: 'Si desactivas las ventanas emergentes, se pueden volver a activar pulsando el enlace "Configurar popups para referencias" en la parte inferior de la página, cerca de las categorías.',
			confDisable: 'Desactivar popups para referencias',
			confEnable: 'Habilitar popups para referencias',
			confLockdown: '[BLOQUEADO]',
			confLockdownMsg: 'Este wiki se ha configurado para tener habilitadas las ventanas emergentes para las referencias siempre',
			confActivateDelay: 'Retraso para la activación del popup',
			confMilliseconds: 'ms',
			confHoverSticky: 'Hacer que las ventanas emergentes permanezcan abiertas hasta hacer clic con el ratón',
			confActivateDelayInstant: 'Instantáneo',
			confActivateDelayNormal: 'Normal',
			confActivateDelaySlow: 'Lento',
			confActivateDelayLate: 'Tedioso',
			confActivateBy: 'Activar ventana emergente al:',
			confActivateByHover: 'Poner el cursor encima',
			confActivateByClick: 'Hacer clic',
			confEnableAnimations: 'Activar la animación para abrir/cerrar:',
			confSaveButton: 'Guardar',
			confCancelButton: 'Cancelar'
		},
		'pt-br': {
			confTitle: 'Configurar Popups de Referência',
			confReenableHelp: 'Se você desabilitar os popups, eles podem ser reabilitados clicando em "Configurar Popups de Referência" no fim das páginas, perto das categorias.',
			confDisable: 'Desabilitar Popups de Referência',
			confEnable: 'Habilitar Popups de Referência',
			confLockdown: '[TRANCADO]',
			confLockdownMsg: 'Esta wiki foi configurada para os Popups de Referência estarem sempre habilitados',
			confActivateDelay: 'Atraso para ativação:',
			confMilliseconds: 'ms',
			confHoverSticky: 'Fazer popups ficarem abertos até serem clicados com o mouse',
			confActivateDelayInstant: 'Instantâneo',
			confActivateDelayNormal: 'Normal',
			confActivateDelaySlow: 'Lento',
			confActivateDelayLate: 'Tedioso',
			confActivateBy: 'Ativar o popup:',
			confActivateByHover: 'Passando o cursor',
			confActivateByClick: 'Clicando',
			confEnableAnimations: 'Ativar animação de abertura/fechamento:',
			confSaveButton: 'Salvar',
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
		},
                nl: {
			confTitle: 'Configureer ReferentiePopups',
			confReenableHelp: 'Als u de popups uitschakelt kunt u ze weer inschakelen door op "Configureer ReferentiePopups" onderaan de pagina te klikken.',
			confDisable: 'Schakel ReferentiePopups uit',
			confEnable: 'Schakel ReferentiePopups in',
			confLockdown: '[LOCKED]',
			confLockdownMsg: 'Deze wiki is geconfigureerd om ReferentiePopups altijd in te hebben geschakeld.',
			confActivateDelay: 'Activeringsvertraging:',
			confMilliseconds: 'ms',
			confHoverSticky: 'Laat popups open staan tot ze worden geraakt door de cursor',
			confActivateDelayInstant: 'Direct',
			confActivateDelayNormal: 'Normal',
			confActivateDelaySlow: 'Langzaam',
			confActivateDelayLate: 'Zeer langzaam',
			confActivateBy: 'Activeer Popup door:',
			confActivateByHover: 'Zweven',
			confActivateByClick: 'Klikken',
			confEnableAnimations: 'Schakel open/sluit-animatie in:',
			confSaveButton: 'Opslaan',
			confCancelButton: 'Annuleren'
		},
                ko: {
			confTitle: '주석 말풍선 설정',
			confReenableHelp: '주석 말풍선을 비활성화하셨다면 문서 하단 분류 근처에 위치한 "주석 말풍선 설정" 링크를 통해 다시 활성화하실 수 있습니다.',
			confDisable: '주석 말풍선 비활성화',
			confEnable: '주석 말풍선 활성화',
			confLockdown: '[잠김]',
			confLockdownMsg: '이 위키는 항상 주석 말풍선이 나타나도록 설정되어 있습니다.',
			confActivateDelay: '말풍선을 띄울 때까지 걸릴 시간:',
			confMilliseconds: '밀리초(ms)',
			confHoverSticky: '주석 위에 커서가 있는 동안 말풍선이 계속 있도록 함',
			confActivateDelayInstant: '즉시',
			confActivateDelayNormal: '보통',
			confActivateDelaySlow: '느리게',
			confActivateDelayLate: '더 느리게',
			confActivateBy: '말풍선을 띄울 방법:',
			confActivateByHover: '커서를 위치시킬 때',
			confActivateByClick: '클릭할 때',
			confEnableAnimations: '말풍선이 나타나고 사라질 때 애니메이션 활성화:',
			confSaveButton: '저장',
			confCancelButton: '취소'
		},
		ja: {
			confTitle: '注釈ふきだしの設定',
			confReenableHelp: '注釈ふきだしを無効にした場合、ページ下部のカテゴリ欄付近にある「注釈ふきだしの設定」をクリックすれば再設定できます。',
			confDisable: '注釈ふきだしを無効にする',
			confEnable: '注釈ふきだしを有効にする',
			confLockdown: '[ロック]',
			confLockdownMsg: 'このウィキは常に注釈ふきだしが有効になるよう設定されています。',
			confActivateDelay: '表示までの時間:',
			confMilliseconds: 'ミリ秒 (ms)',
			confHoverSticky: 'マウスポインターが触れるまで表示',
			confActivateDelayInstant: 'すぐに',
			confActivateDelayNormal: 'ふつう',
			confActivateDelaySlow: 'ゆっくり',
			confActivateDelayLate: 'とてもゆっくり',
			confActivateBy: '表示方法:',
			confActivateByHover: 'ポインターを合わせる',
			confActivateByClick: 'クリックする',
			confEnableAnimations: 'アニメーション表示を有効にする:',
			confSaveButton: '保存',
			confCancelButton: '取り消し'
	    },
	        zh: {
			confTitle: '设定参考资料弹窗',
			confReenableHelp: '如果你禁用了弹窗，可以在页面底部接近分类的地方点击“设定参考资料弹窗”来重新启用它。',
			confDisable: '禁用参考资料弹窗',
			confEnable: '启用参考资料弹窗',
			confLockdown: '[锁定]',
			confLockdownMsg: '这个维基被设定为总是需要启用参考资料弹窗。',
			confActivateDelay: '悬停启动延迟：',
			confMilliseconds: '毫秒（ms）',
			confHoverSticky: '使弹窗持续开启直到鼠标触碰到它',
			confActivateDelayInstant: '瞬间',
			confActivateDelayNormal: '中等',
			confActivateDelaySlow: '慢速',
			confActivateDelayLate: '很慢',
			confActivateBy: '启动弹窗的方式：',
			confActivateByHover: '悬停',
			confActivateByClick: '点击',
			confEnableAnimations: '启用弹窗开/关动画：',
			confSaveButton: '保存',
			confCancelButton: '取消'
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
			articles: 'w:dev:Colors/code.js'
		},
		dataType: 'script',
		cache: true
	});

	// Support CSS
	if (!module.cssLoaded) {
		window.importArticle({ type: 'style', article: 'w:dev:ReferencePopups/code.css' });
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
		'<br><input type="checkbox" id="refpopups-sticky">' +
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