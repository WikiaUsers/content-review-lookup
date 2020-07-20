/* Script for adding various UI improvements to Oasis
 * Script by User:Porter21 (http://fallout.wikia.com) and User:Kangaroopower
 * i18n function originally by User:Dantman
 */
(function ($) {
	var config = window.AdvancedOasisUI;
	if (!config) config = {};
	// Stop the script from starting more than once
	if (config.Actions) return;
 
	// true=deep copy (allows user to override some of the translations for
	// one language without causing the script to fall back to English for
	// everything that wasn't overridden)
	config = $.extend(true, {
		accountNavFollowedPages: false,
		accountNavWatchlist: false,
		categoryRedlink: true,
		RCHeader: true,
		lightbox: true,
		randomPageLimitedTo: '',
		userLang: true,
		// German
		'de': {
			addPage: "Seite hinzufügen",
			contributions: "Beiträge",
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
			contributions: "Contribuciones",
			followedPages: "Páginas seguidas",
			goToPage: "Ir",
			history: "Historial",
			recentChanges: "Cambios rec.",
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
		// Italiano
		'it': {
			contributions: "Contributi",
			followedPages: "Pagine seguite ",
			goToPage: "Vai",
			history: "Cronologia",
			recentChanges: "Ultime modifiche",
			savePage: "Salva la pagina",
			watchlist: "Osservati speciali",
			whatLinksHere: "Puntano qui"
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
			contributions: "Mój wkład",
			followedPages: "Obserwowane",
			goToPage: "Przejdź",
			history: "Historia",
			recentChanges: "Ostatnie zmiany",
			savePage: "Zapisz",
			watchlist: "Obserwowane",
			whatLinksHere: "Linkujące"
		}
	}, config, { version: '1.03' });
	window.AdvancedOasisUI = config;
 
	// Private function
	function msg( name ) {
		if ( config.userLang ) {
			if (typeof(config.userLang) !== 'string') {
				if ( window.wgUserLanguage in config && name in config[wgUserLanguage] ) {
					return config[wgUserLanguage][name];
				}
			} else if ( config.userLang in config && name in config[config.userLang] ) {
				return config[config.userLang][name];
			}
		}
		if ( window.wgContentLanguage in config && name in config[wgContentLanguage] ) {
			return config[wgContentLanguage][name];
		}
		return config.en[name];
	}
 
	// Private function
	function newNavItem (navItemID, navItemLink, navItemMsg) {
		return '<li><a href="/wiki/' + navItemLink + '" data-id="' + navItemID + '">' + msg(navItemMsg) + '</a></li>';
	}
 
	// Expose this function as window.AdvancedOasisUI.Actions
	config.Actions = function () {
		var encodedPagename = encodeURIComponent(window.wgPageName),
			accountNavTalk = $('#AccountNavigation > li > ul.subnav > li:has(a[data-id="mytalk"])');
 
		// Header: Limit "Random Page" to specific namespace
		if(config.randomPageLimitedTo) $('a[data-id="randompage"]').attr('href', '/wiki/Special:Random/' + config.randomPageLimitedTo);
 
		// Account navigation: Add "contributions", "followed pages", "watchlist"
		accountNavTalk.after(
			newNavItem('mycontribs', 'Special:Contributions/' + window.wgUserName, 'contributions') + 
			(config.accountNavFollowedPages ? newNavItem('myfollowedpages', 'Special:Following/', 'followedPages') : '') + 
			(config.accountNavWatchlist ? newNavItem('mywatchlist', 'Special:Watchlist/', 'watchlist') : '')
		);
 
		// Search: Add "go to search term" button
		if (window.wgCanonicalSpecialPageName === "Search" && $('#search-v2-input').val()) $('.tabs').append('<li class="normal"><a title="'+ $('#search-v2-input').val() +'" href="/index.php?title='+ encodeURIComponent($('#search-v2-input').val()) +'">' + msg('goToPage') + '</a></li>');
 
		// Edit screen: Add "history" and "what links here"
		if (window.wgAction === "edit" || window.wgAction === "submit") $('#wpDiff').parent().after('<li><a href="/index.php?title=' + encodedPagename + '&action=history">' + msg('history') + '</a></li><li><a href="/wiki/Special:WhatLinksHere/' + encodedPagename + '">' + msg('whatLinksHere') + '</a></li>');
 
		// Publish to save and rename to move
		$('#wpSave').attr('value', msg('savePage'));
		$('a[data-id="move"]').html(msg('movePage'));   
 
		// Adds a "Create a page" button in the recent changes portlet in the sidebar
		if (config.RCHeader && $('#WikiHeader').hasClass('WikiHeaderRestyle')) $('<a class="wikia-button createpage" href="/wiki/Special:CreatePage"><img class="sprite new" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" style="left: 0; position: relative; top: 0;">' + msg('addPage') + '</a>').insertBefore('.WikiaActivityModule h1.activity-heading');
	};
 
	if (window.skin === 'oasis') $(config.Actions);
})(jQuery);