/**
 * Ajax auto-refreshing articles
 *
 * Original by pcj of Wowpedia
 *
 * Maintenance, cleanup, style and bug fixes by:
 * - Grunny         (http://c.wikia.com/wiki/User:Grunny)
 * - Kangaroopower  (http://c.wikia.com/wiki/User:Kangaroopower)
 * - Cqm            (http://c.wikia.com/wiki/User:Cqm)
 *
 * The script follows Wikia JS guidelines or MediaWiki coding standards where the Wikia guidelines do not specify:
 * - <https://github.com/Wikia/guidelines/blob/master/JavaScript/CodingConventions.md>
 * - <https://www.mediawiki.org/wiki/Manual:Coding_conventions/JavaScript>
 *
 * Editing guidelines:
 * - This script has extremely high usage across Wikia, please do not deploy without extensive testing.
 * - Be aware that this script must be ES3 compliant due to the minifier used by ResourceLoader. 
 * - Due to the historic high usage of this script, several decisions have been made to keep it stable. As such, please pay attention to comments relating to this.
 */

/* jshint

	bitwise:true, camelcase:true, curly:true, eqeqeq:true, latedef:true, maxdepth:3,
	maxlen:120, newcap:true, noarg:true, noempty:true, nonew:true, onevar:true,
	plusplus:false, quotmark:single, undef:true, unused:true, strict:true, trailing:true,

	asi:false, boss:false, debug:false, eqnull:false, evil:false, expr:false,
	lastsemic:false, loopfunc:false, moz:false, proto:false, scripturl:false,

	browser:true, devel:false, jquery:true
*/

/*global mediaWiki:true, Wikia:true */

;(function (window, $, mw, Wikia) {
	'use strict';

	var i18n = {
			/* English (English) */
			en: {
				refreshText: 'AJAX', // Do not translate this message
				loadStatusAlt: 'Refreshing page',
				refreshHover: 'Enable page auto-refresh'
			},
			/* Belarusian (Беларуская) */
			be: {
				loadStatusAlt: 'Абнаўленне старонак',
				refreshHover: 'Ўключыць аўтаматычнае абнаўленне загружанай старонкі'
			},
			/* Bulgarian (Български) */
			bg: {
				refreshHover: 'Обнови тази страница автоматично'
			},
			/* Bosnian (Bosanski) */
			bs: {
				refreshHover: 'Uključi auto-ažuriranje za ovu stranicu'
			},
			/* Catalan (Català) */
			ca: {
				refreshHover: 'Actualiza aquesta pàgina automàticament'
			},
			/* Czech (Česky) */
			cs: {
				loadStatusAlt: 'Obnovování stránky',
				refreshHover: 'Automaticky obnovit tuto stránku'
			},
			/* Danish (Dansk) */
			da: {
				refreshHover: 'Opdater siden automatisk'
			},
			/* German (Deutsch) */
			de: {
				loadStatusAlt: 'Aktualisiere Seite',
				refreshHover: 'Aktiviere die automatische Aktualisierung der Seite'
			},
			/* Greek (Ελληνικά) */
			el: {
				refreshHover: 'Ανανέωση αυτής σελίδας'
			},
			/* Esperanto (Esperanto) */
			eo: {
				refreshHover: 'Ĝisdatigu ĉi tiun paĝon aŭtomate'
			},
			/* Spanish (Español) */
			es: {
				loadStatusAlt: 'Actualizando página',
				refreshHover: 'Actualizar esta página automáticamente',
			},
			/* Basque (Euskara) */
			eu: {
				refreshHover: 'Orrialde hau automatikoki eguneratu'
			},
			/* French (Français) */
			fr: {
				refreshHover: 'Actualiser automatiquement la page'
			},
			/* Frysian (Frysk) */
			fy: {
				loadStatusAlt: 'Side ferfarskje',
				refreshHover: 'Ferfarskje dizze side Automatysk'
			},
			/* Irish (Gaeilge) */
			ga: {
				refreshHover: 'Athnuaigh an leathanach seo go huathoibríoch'
			},
			/* Galician (Galego) */
			gl: {
				refreshHover: 'Actualizar a páxina automaticamente'
			},
			/* Croatian (Hrvatski) */
			hr: {
				refreshHover: 'Uključi auto-ažuriranje za ovu stranicu'
			},
			/* Italian (Italiano) */
			it: {
				refreshHover: 'Aggiorna automaticamente la pagina'
			},
			/* Japanese (日本語) */
			ja: {
				loadStatusAlt: '自動更新',
				refreshHover: 'このページを自動的に更新します'
			},
			/* Korean (한국어) */
			ko: {
				loadStatusAlt: '문서 새로고침',
				refreshHover: '문서 자동 새로고침 활성화',
			},
			/* Latin (Latina) */
			la: {
				refreshHover: 'Hanc paginam automatice renovare'
			},
			/* Moldovan (Молдовеняскэ) */
			mo: {
				refreshHover: 'Актуализаци ачастэ паӂинэ ын мод аутомат'
			},
			/* Dutch (Nederlands) */
			nl: {
				loadStatusAlt: 'Pagina verversen',
				refreshHover: 'Ververs deze pagina automatisch'
			},
			/* Dutch informal (Nederlands informeel) */
			'nl-informal': {
				loadStatusAlt: 'Pagina verversen',
				refreshHover: 'Ververs deze pagina automatisch'
			},
			/* Norwegian (Norsk (bokmål)‬) */
			no: {
				refreshHover: 'Oppdater siden automatisk'
			},
			/* Occitan (Occitan) */
			oc: {
				refreshHover: 'Actualizatz aquesta pagina automaticament'
			},
			/* Polish (Polski) */
			pl: {
				refreshHover: 'Aktywuj automatyczyne odświeżanie strony'
			},
			/* Portuguese (Português) */
			pt: {
				refreshHover: 'Actualizar a página automaticamente'
			},
			/* Brazilian Portuguese (Português do Brasil) */
			'pt-br': {
				loadStatusAlt: 'Atualizando página',
				refreshHover: 'Ativa a atualização automática da página',
			},
			/* Romanian (Română) */
			ro: {
				refreshHover: 'Actualizaţi această pagină în mod automat'
			},
			/* Russian (Русский) */
			ru: {
				loadStatusAlt: 'Обновление страниц',
				refreshHover: 'Включить автоматическое обновление загружаемой страницы'
			},
			/* Serbian (Српски / Srpski) */
			sr: {
				refreshHover: 'Укључи ауто-ажурирање за ову страницу'
			},
			/* Swedish (Svenska) */
			sv: {
				refreshHover: 'Uppdatera sidan automatiskt'
			},
			/* Turkish (Türkçe) */
			tr: {
				refreshHover: 'Otomatik yenilenen sayfa yüklemelerine izin ver'
			},
			/* Ukrainian (Українська) */
			uk: {
				loadStatusAlt: 'Оновлення сторінок',
				refreshHover: 'Увімкнути автоматичне оновлення завантаженої сторінки'
			},
			/* Valencian (Valencià) */
			val: {
				refreshHover: 'Actualisar esta pàgina automàticament'
			},
			/* Chinese (中文) */
			zh: {
				loadStatusAlt: '正在刷新页面',
				refreshHover: '自动刷新页面'
			},
			/* Chinese (Traditional) (中文(繁體)‬) */
			'zh-hant': {
				loadStatusAlt: '正在重整頁面',
				refreshHover: '自動重新載入頁面更動'
			},
		},
		config = mw.config.get([
			'stylepath',
			'wgAction',
			'wgCanonicalSpecialPageName',
			'wgPageName',
			'wgUserLanguage'
		]),
		// use common file as it's very likely to be already cached by user
		// used in oasis sidebar loading, preview modal, etc.
		ajaxIndicator = window.ajaxIndicator || config.stylepath + '/common/images/ajax.gif',
		ajaxTimer,
		ajRefresh = window.ajaxRefresh || 60000,
		ajPages = window.ajaxPages || [],
		// WikiActivity should not be added here; use the configuration options
		// on your local wiki to add AjaxRC to your local WikiActivity page
		ajSpecialPages = window.ajaxSpecialPages || ['Recentchanges'],
		// don't load on these values of wgAction
		// @todo check if markpatrolled should be here
		disallowActions = [
			'delete',
			'edit',
			'protect',
			'revisiondelete'
		],
		// if there's a hash on the end of the url, jquery strips it
		// however, location.href keeps the hash in a url
		// so the callbacks for ajaxsend and ajaxcomplete won't fire
		// just by comparing settings.url to location.href
		href = location.href.replace(/#[\S]*/, '');

	/**
	 * Get a localised message, if it exists as well as allowing it to be
	 * overridden by per-wiki/user config.
	 *
	 * @param msgKey {string} The name of the message in the i18n object above.
	 * @param globalKey {string} The name of the message in script configuration.
	 *
	 * @return {string} The localised/cutomised message.
	 */
	function getMessage(msgKey, globalKey) {
		// older versions rely on user-supplied translations mixed in with customisations
		// so check that first
		if (globalKey && typeof window[globalKey] === 'string') {
			return window[globalKey];
		}

		var lang = config.wgUserLanguage,
			splitLang = lang.split('-')[0];

		// otherwise try and get the translated version
		if (i18n[lang] && i18n[lang][msgKey]) {
			return i18n[lang][msgKey];
		}

		// if not found check to see if the parent language has a translation
		// @example pt-br -> pt
		// if it already is a parent language it will fail again and has no adverse effect
		if (i18n[splitLang] && i18n[splitLang][msgKey]) {
			return i18n[splitLang][msgKey];
		}

		// return the english message
		return i18n.en[msgKey];
	}

	/**
	 * Set the toggle status in Local Storage.
	 *
	 * @return {boolean} The updated status of the toggle.
	 */
	function storage(setTo) {
		if (localStorage.getItem('AjaxRC-refresh') === null) {
			localStorage.setItem('AjaxRC-refresh', true);
		}

		// workaround for setTo being a jquery event on the initial load
		if (setTo === true || setTo === false) {
			localStorage.setItem('AjaxRC-refresh', setTo);
		}

		return JSON.parse(localStorage.getItem('AjaxRC-refresh'));
	}

	/**
	* Get the element to add the AjaxRC checkbox to.
    *
    * @return {jQuery.object|boolean} A jQuery object representing the element
    * or false if no suitable element was found.
	*/
	function getAppTo() {
		var $ret;

		// monobook
		$ret = $('.firstHeading');

		if ($ret.length) {
			return $ret;
		}

		// most oasis pages
		$ret = $('.WikiaPage .page-header__main');

		if ($ret.length) {
			return $ret;
		}

		return false;
	}

	/**
	 * Does the actual refresh
	 */
	function loadPageData() {
		var $temp = $('<div>');

		$temp.load(href + ' #mw-content-text', function() {
			var $newContent = $temp.children('#mw-content-text');

			if ($newContent.length) {
				$('#mw-content-text').replaceWith($newContent);
				// re-set mw.util.$content for any scripts that may use it
				mw.util.$content = $newContent;
			}

			ajaxTimer = setTimeout(loadPageData, ajRefresh);
		});

		$temp.remove();
	}

	/**
	 * Turn refresh on and off by toggling the checkbox
	 */
	function toggleAjaxReload() {
		if ($('#ajaxToggle').prop('checked')) {
			storage(true);
			loadPageData();
		} else {
			storage(false);
			clearTimeout(ajaxTimer);
		}
	}

	/**
	 * Main function to start the Auto-refresh process
	 */
	function preloadAJAXRL() {
		var $appTo = getAppTo(),
			$checkbox = $('<span>')
				.attr('id', 'ajaxRefresh')
				.css({
					'font-size': 'xx-small',
					'line-height': '100%',
					'margin-left': '5px'
				})
				.append(
					$('<label>')
						.attr({
							id: 'ajaxToggleText',
							// for for RL to comply with es3 rules
							'for': 'ajaxToggle',
							title: getMessage('refreshHover', 'AjaxRCRefreshHoverText')
						})
						.text(getMessage('refreshText', 'AjaxRCRefreshText') + ':')
						.css({
							'border-bottom': '1px dotted',
							cursor: 'help'
						}),
					$('<input>')
						.attr({
							id: 'ajaxToggle',
							type: 'checkbox'
						})
						.css('margin-bottom', 0),
					$('<span>')
						.attr('id', 'ajaxLoadProgress')
						// I think this is for a firefox bug
						// (because .hide() didn't do it properly)
						.css('display', 'none')
						.append(
							$('<img>')
								.attr({
									// @todo move to i18n
									alt: getMessage('loadStatusAlt', false),
									src: ajaxIndicator
								})
								.css({
									'vertical-align': 'baseline',
									float: 'none',
									border: 0
								})
						)
				),
			$throbber;

		// fallback for pages with profile masthead
		if ($appTo === false) {
			$('#WikiaArticle').prepend($checkbox);
		} else {
			$appTo.append($checkbox);
		}

		$throbber = $checkbox.find('#ajaxLoadProgress');

		$(document).ajaxSend(function(_, _2, settings) {
			if (href === settings.url) {
				$throbber.show();
			}
		}).ajaxComplete(function(_, _2, settings) {
			var $collapsibleElements = $('#mw-content-text').find('.mw-collapsible'),
				ajCallAgain = window.ajaxCallAgain || [],
				i;

			if (href === settings.url) {
				$throbber.hide();

				if ($collapsibleElements.length) {
					$collapsibleElements.makeCollapsible();
				}

				if (config.wgCanonicalSpecialPageName === 'Recentchanges') {
					mw.special.recentchanges.init();

					if ($('.mw-recentchanges-table').find('.WikiaDropdown').length) {
						Wikia.RecentChanges.init();
					}
				}

				if (config.wgCanonicalSpecialPageName === 'WikiActivity') {
					window.WikiActivity.init();
				}

				for (i = 0; i < ajCallAgain.length; i++) {
					// check item is a function before calling it to avoid errors
					if ($.isFunction(ajCallAgain[i])) {
						ajCallAgain[i]();
					} else {
						/*jshint debug:false */
						console.log('AjaxRC Error: Could not call non-function after reload.');
						/*jshint debug:true */
					}
				}
			}
		});

		$('#ajaxToggle')
			.attr('checked', storage())
			.click(toggleAjaxReload);

		if (storage()) {
			loadPageData();
		}
	}

	/**
	 * Load the script on specific pages
	 * and only on certain values for wgAction (see disallowActions above)
	 */
	$(function() {
		if (
			(
				ajPages.indexOf(config.wgPageName) > -1 ||
				ajSpecialPages.indexOf(config.wgCanonicalSpecialPageName) > -1
			) &&
			!$('#ajaxToggle').length &&
			disallowActions.indexOf(config.wgAction) === -1
		) {
			if($('#mw-content-text .mw-collapsible').exists()) {
				mw.loader.using('jquery.makeCollapsible', preloadAJAXRL);
			} else {
				preloadAJAXRL();
			}
		}
	});

}(this, jQuery, mediaWiki, Wikia));