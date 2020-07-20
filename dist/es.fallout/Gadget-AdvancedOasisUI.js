//<syntaxhighlight lang="javascript">
/* Script for adding various UI improvements to Oasis
 * Script by User:Porter21 (http://fallout.wikia.com) and User:Kangaroopower (http://39clues.wikia.com)
 */
(function (window, $, mw, dev) {
	"use strict";
	var config = dev.AdvancedOasisUI || window.AdvancedOasisUI || {};

	// Stop the script from starting more than once
	if (config.Actions) {
		return;
	}

	// true=deep copy (allows user to override some of the translations for
	// one language without causing the script to fall back to English for
	// everything that wasn't overridden)
	config = $.extend(true, {
		accountNavFollowedPages: false,
		accountNavWatchlist: false,
		categoryRedlink: true,
		RCHeader: true,
		lightbox: false,
		DefaultSourceMode: true,
		randomPageLimitedTo: '',
		activity2RC: true,
		userLang: true,

		// German
		'de': {
			contributions: "Beiträge",
			movePage: "Verschieben",
			addPage: "Seite erstellen",
			followedPages: "Verfolgte Seiten",
			goToPage: "Artikel",
			history: "Versionen",
			recentChanges: "Letzte Änd.",
			savePage: "Seite speichern",
			watchlist: "Beobachtungsliste",
			whatLinksHere: "Links auf diese Seite"
		},
		// English
		'en': {
			addPage: "Add a Page",
			movePage: "Move",
			contributions: "Contributions",
			followedPages: "Followed pages",
			goToPage: "Go",
			history: "History",
			recentChanges: "Recent Changes",
			savePage: "Save Page",
			watchlist: "Watchlist",
			whatLinksHere: "What links here"
		},
		//Español
		'es': {
			addPage: "Añadir Página",
			movePage: "Mover",
			contributions: "Contribuciones",
			followedPages: "Páginas seguidas",
			goToPage: "Ir",
			history: "Historial",
			recentChanges: "Cambios recientes",
			savePage: "Grabar la página",
			watchlist: "Lista de seguimiento",
			whatLinksHere: "Lo que enlaza aquí"
		},
		// Français
		'fr': {
			contributions: "Contributions",
			followedPages: "Pages suivies",
			goToPage: "Lire",
			history: "Historique",
			recentChanges: "Mod. récentes",
			savePage: "Publier",
			watchlist: "Liste de suivi",
			whatLinksHere: "Pages liées"
		},
		// Magyar
		'hu': {
			contributions: "Szerkesztő közreműködései",
			followedPages: "Követett lapok",
			goToPage: "Ugrás",
			history: "Laptörténet",
			recentChanges: "Friss változtatások",
			savePage: "Mentés",
			watchlist: "Figyelőlistám",
			whatLinksHere: "Mi hivatkozik erre"
		},
		// Italiano
		'it': {
			addPage: 'Aggiungi pagina',
			movePage: "Muovi",
			contributions: "Contributi",
			followedPages: "Pagine seguite ",
			goToPage: "Vai",
			history: "Cronologia",
			recentChanges: "Ultime modifiche",
			savePage: "Salva la pagina",
			watchlist: "Osservati speciali",
			whatLinksHere: "Puntano qui"
		},
		// 한국어
		'ko': {
			addPage: "문서 생성",
			movePage: "문서 이동",
			contributions: "기여 목록",
			followedPages: "주시된 문서",
			goToPage: "문서로 이동",
			history: "역사",
			recentChanges: "최근 바뀜",
			savePage: "문서 저장",
			watchlist: "주시문서 목록",
			whatLinksHere: "가리키는 문서"
		},
		// Nederlands
		'nl': {
			contributions: "Bijdragen",
			followedPages: "Gevolgde pagina's",
			goToPage: "Artikel",
			history: "Geschiedenis",
			recentChanges: "Recente Wijzigingen",
			savePage: "Pagina opslaan",
			watchlist: "Volglijst",
			whatLinksHere: "Verwijzingen naar deze pagina"
		},
		// Polski
		'pl': {
			addPage: "Dodaj stronę",
			movePage: "Przenieś",
			contributions: "Mój wkład",
			followedPages: "Obserwowane",
			goToPage: "Przejdź",
			history: "Historia",
			recentChanges: "Ostatnie zmiany",
			savePage: "Zapisz",
			watchlist: "Obserwowane",
			whatLinksHere: "Linkujące"
		},
		// Russian
		'ru': {
			addPage: "Создать страницу",
			movePage: "Переименовать",
			contributions: "Мой вклад",
			followedPages: "Отслеживаемые страницы",
			goToPage: "Перейти",
			history: "История",
			recentChanges: "Свежие правки",
			savePage: "Записать",
			watchlist: "Список наблюдения",
			whatLinksHere: "Ссылки сюда"
		},
		//Swedish
		'sv': {
			addPage: "Lägg till en sida",
			movePage: "Flytta",
			contributions: "Bidrag",
			followedPages: "Bevakade sidor",
			goToPage: "Gå till sida",
			history: "Historik",
			recentChanges: "Senaste ändringar",
			savePage: "Spara sida",
			watchlist: "Bevakningslista",
			whatLinksHere: "Linkujące"
		}
	}, config, {
		version: '1.15.1'
	});

	// Private function
	function msg(name) {
		var lang = config.userLang ;

		if (typeof lang !== "string") {
			lang = config[mw.config.get('wgContentLanguage')] || config.en;
		}
		return lang[name];
	}

	// Private function
	function newNavItem(navItemLink, navItemMsg) {
		return '<li><a href="' + mw.util.getUrl(navItemLink) + '" class="wds-global-navigation__dropdown-link">' + msg(navItemMsg) + '</a></li>';
	}

	// Expose this function as window.AdvancedOasisUI.Actions
	config.Actions = function () {
		var accountNavTalk = $('.wds-global-navigation__user-menu li').has('a[data-tracking-label$="talk"], a[data-tracking-label$="wall"]');

		// Header: "WikiActivity" -> "Recent Changes"
		if (config.activity2RC) {
			$('.subnav-2a[data-canonical="wikiactivity"]').attr({
				href: '/wiki/Special:RecentChanges',
				title: 'Special:RecentChanges'
			}).contents().filter(function () {
				return this.nodeType === 3;
			}).replaceWith(msg('recentChanges'));
		}

		// Header: Limit "Random Page" to specific namespace
		if (config.randomPageLimitedTo) {
			$('a[data-id="randompage"]').attr('href', '/wiki/Special:Random/' + config.randomPageLimitedTo);
		}

		// Account navigation: Add "contributions", "followed pages", "watchlist"
		accountNavTalk.after(newNavItem('Special:Contributions/' + mw.config.get('wgUserName'), 'contributions') + (config.accountNavFollowedPages ? newNavItem('Special:Following', 'followedPages') : '') + (config.accountNavWatchlist ? newNavItem('Special:Watchlist', 'watchlist') : ''));

		// Search: Add "go to search term" button
		if (mw.config.get('wgCanonicalSpecialPageName') === "Search" && $('#search-v2-input').val() !== "") {
			$('.search-tabs').append('<li class="normal"><a title="' + $('#search-v2-input').val() + '" href="/index.php?title=' + encodeURIComponent($('#search-v2-input').val()) + '">' + msg('goToPage') + '</a></li>');
		}

		// Edit screen: Add "history" and "what links here"
		if (mw.config.get('wgAction') === "edit" || mw.config.get('wgAction') === "submit") {
			if (!$('#wpSave').parent().hasClass('wikia-menu-button')) {
				// save button does not have dropdown menu, so make one
				$('#wpSave')
					.removeClass('even')
					.css({
						'width': 'calc(100% - 17px)',
						'margin-top': '0'
					})
					.after(
						'<nav class="wikia-menu-button wikia-menu-button-submit control-button even">' +
							'<span class="drop">' +
								'<img class="chevron" src="' + mw.config.get('wgBlankImgUrl') + '"/>' +
							'</span>' +
							'<ul class="WikiaMenuElement"/>' +
						'</nav>'
					);
				$('.wikia-menu-button-submit').prepend($('#wpSave'));
				WikiaButtons.add($('.wikia-menu-button-submit'));
			}
			$('#wpSave').parent().children('.WikiaMenuElement').append(
				'<li><a href="' + mw.util.getUrl(mw.config.get('wgPageName'), {action: 'history'}) + '" target="_blank">' + msg('history') + '</a></li>' +
				'<li><a href="' + mw.util.getUrl('Special:WhatLinksHere/' + mw.config.get('wgPageName')) + '" target="_blank">' + msg('whatLinksHere') + '</a></li>'
			);
		}

		// Categories: Turn links pointing to non-created categories into redlinks (MW default)
		if (config.categoryRedlink) {
			$('.newcategory').addClass('new');
		}

		// Publish to save and rename to move
		$('#wpSave').attr('value', msg('savePage'));
		$('a[data-id="move"], a[data-name="move"]').text(msg('movePage'));

		// Adds a "Create a page" button in the recent changes portlet in the sidebar
		if (config.RCHeader) {
			$(window).load(function(){
				$('<a class="wikia-button createpage" href="/wiki/Special:CreatePage"><img class="sprite new" src="' + mw.config.get('wgBlankImgUrl') + '" style="left: 0; position: relative; top: 0;">' + msg('addPage') + '</a>').insertBefore('.WikiaActivityModule .activity-heading');
			});
		}

		// Disable image lightboxes
		if (config.lightbox) {
			importArticle({
				type: "script",
				article: "external:dev:NoImageLightbox/code.js"
			});
		}

		// Source mode as default
		if (config.DefaultSourceMode) {
			$(window.document).on('click.DefaultSourceMode', function (ev) {
				if (mw.config.get('wgAction') === 'view' && ev.target.tagName === 'A' && /[\?&]action=edit(?:[&#]|$)/.test(ev.target.href)) {
					ev.target.href += '&useeditor=source';
				}
			});
		}
	};
	if ({ 'oasis': 1, 'wikia': 1 }[mw.config.get('skin')] === 1) {
		$(config.Actions);
	}

	dev.AdvancedOasisUI = config;

}(this, jQuery, mediaWiki, window.dev = window.dev || {}));
//</syntaxhighlight>