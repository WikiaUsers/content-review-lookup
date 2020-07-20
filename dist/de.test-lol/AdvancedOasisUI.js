/** Stammt von hier: http://dev.wikia.com/wiki/AdvancedOasisUI **/
/** Wurde von [[User:Porter21]] und [[User:Kangaroopower]] erstellt **/

//<syntaxhighlight lang="javascript">
/* Script for adding various UI improvements to Oasis
 * Script by User:Porter21 (http://fallout.wikia.com) and User:Kangaroopower
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
		RCHeader: false,
		lightbox: true,
		randomPageLimitedTo: '',
		activity2RC: false,
		userLang: true,
		// German
		'de': {
			contributions: "Beiträge",
			followedPages: "Verfolgte Seiten",
			goToPage: "Artikel",
			movePage: "Verschieben",
	                addPage: "Seite erstellen",
			history: "Versionen",
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
	}, config, { version: '1.12' });
	window.AdvancedOasisUI = config;
 
	// Private function
	function msg( name ) {
		var lang;
		if (typeof config.userLang === "string") lang = config.userLang;
		else lang = config[mw.config.get('wgContentLanguage')] || config.en;

		return lang[name];
	}

	// Private function
	function newNavItem (navItemID, navItemLink, navItemMsg) {
		return '<li><a href="/wiki/' + navItemLink + '" data-id="' + navItemID + '">' + msg(navItemMsg) + '</a></li>';
	}

	// Expose this function as window.AdvancedOasisUI.Actions
	config.Actions = function () {
		var encodedPagename = encodeURIComponent(window.wgPageName),
			accountNavTalk = $('#AccountNavigation > li > ul.subnav > li:has(a[data-id="mytalk"])');

		// Header: "WikiActivity" -> "Recent Changes"
		if (config.activity2RC) $('.subnav-2a[data-canonical="wikiactivity"]').attr('href', '/wiki/Special:RecentChanges').attr('title', 'Special:RecentChanges').contents().filter(function() { return this.nodeType === 3; }).replaceWith(msg('recentChanges'));

		// Header: Limit "Random Page" to specific namespace
		if(config.randomPageLimitedTo) $('a[data-id="randompage"]').attr('href', '/wiki/Special:Random/' + config.randomPageLimitedTo);

		// Account navigation: Add "contributions", "followed pages", "watchlist"
		accountNavTalk.after(
			newNavItem('mycontribs', 'Special:Contributions/' + window.wgUserName, 'contributions') + 
			(config.accountNavFollowedPages ? newNavItem('myfollowedpages', 'Special:Following/', 'followedPages') : '') + 
			(config.accountNavWatchlist ? newNavItem('mywatchlist', 'Special:Watchlist/', 'watchlist') : '')
		);

		// Search: Add "go to search term" button
		if (window.wgCanonicalSpecialPageName === "Search" && $('#search-v2-input').val()) $('.search-tabs').append('<li class="normal"><a title="'+ $('#search-v2-input').val() +'" href="/index.php?title='+ encodeURIComponent($('#search-v2-input').val()) +'">' + msg('goToPage') + '</a></li>');

		// Edit screen: Add "history" and "what links here"
		if (window.wgAction === "edit" || window.wgAction === "submit") $('#wpDiff').parent().after('<li><a href="/index.php?title=' + encodedPagename + '&action=history">' + msg('history') + '</a></li><li><a href="/wiki/Special:WhatLinksHere/' + encodedPagename + '">' + msg('whatLinksHere') + '</a></li>');

		// Categories: Turn links pointing to non-created categories into redlinks (MW default)
		if(config.categoryRedlink) $('.newcategory').addClass('new');

		// Publish to save and rename to move
		$('#wpSave').attr('value', msg('savePage'));
		$('a[data-id="move"]').html(msg('movePage'));   

		// Adds a "Create a page" button in the recent changes portlet in the sidebar
		if (config.RCHeader) $('<a class="wikia-button createpage" href="/wiki/Special:CreatePage"><img class="sprite new" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" style="left: 0; position: relative; top: 0;">' + msg('addPage') + '</a>').insertBefore('.WikiaActivityModule h1.activity-heading');

		// Disable image lightboxes: TODO- add a simplified version of Math's code in here
		if (config.lightbox) {
			window.wgEnableImageLightboxExt = false;
			$('#WikiaArticle, .LatestPhotosModule, #article-comments').unbind('click.lightbox');
			var anchors = $('a > img').parent();
			for (var i = anchors.length; i--; ) {
				var a = anchors[i];
				if (/^http:\/\/images[^\/]*?\.wikia\./.test(a.href)) a.href = '/wiki/File:' + a.href.substring(a.href.lastIndexOf('/') + 1);
			}
		}
	};
 
	if (window.skin === 'oasis') $(config.Actions);
})(jQuery);
//</syntaxhighlight>