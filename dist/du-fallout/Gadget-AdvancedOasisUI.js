/* Script for adding various UI improvements to Oasis
 * Version 0.41
 * Script by User:Porter21 (http://fallout.wikia.com)
 * i18n function by User:Dantman
 */

function addAdvancedOasisUI () {
   var encodedPagename = encodeURIComponent(wgPageName);
   var wikiHeaderButtons = $('#WikiHeader > div.buttons');
   var accountNavTalk = $('#AccountNavigation > li > ul.subnav > li:has(a[data-id="mytalk"])');
   // Configuration
   var userconfig = (window.AdvancedOasisUIConfig) ? window.AdvancedOasisUIConfig : {};
   var config = $.extend(true, {
      accountNavFollowedPages: false,
      accountNavWatchlist: false,
      categoryRedlink: true,
      randomPageLimitedTo: "",
      userLang: true,
      // Deutsch
      de: {
         contributions: "Beiträge",
         followedPages: "Verfolgte Seiten",
         goToPage: "Gehe zur Seite",
         history: "Versionen",
         recentChanges: "Letzte Änd.",
         watchlist: "Beobachtungsliste",
         whatLinksHere: "Links auf diese Seite"
      },
      // English
      en: {
         contributions: "Contributions",
         followedPages: "Followed pages",
         goToPage: "Go to page",
         history: "History",
         recentChanges: "Recent Changes",
         watchlist: "Watchlist",
         whatLinksHere: "What links here"
      },
      // Español
      es: {
         contributions: "Contribuciones",
         followedPages: "Páginas seguidas",
         goToPage: "Ir a la página",
         history: "Historial",
         recentChanges: "Cambios rec.",
         watchlist: "Lista de seguimiento",
         whatLinksHere: "Lo que enlaza aquí"
      },
      // Français
      fr: {
         contributions: "Contributions",
         followedPages: "Pages suivies",
         goToPage: "Aller à la page",
         history: "Historique",
         recentChanges: "Mod. récentes",
         watchlist: "Liste de suivi",
         whatLinksHere: "Pages liées"
      },
      // Nederlands
      nl: {
         contributions: "Bijdragen",
         followedPages: "Gevolgde pagina's",
         goToPage: "Ga naar pagina",
         history: "Geschiedenis",
         recentChanges: "Recente Wijzigingen",
         watchlist: "Volglijst",
         whatLinksHere: "Verwijzingen naar deze pagina"
      }
   }, userconfig);

   // Function for multi-language support (by Daniel Friesen aka User:Dantman)
   function msg(name) {
      if ( config.userLang && wgUserLanguage in config && name in config[wgUserLanguage] )
         return config[wgUserLanguage][name];
      if ( wgContentLanguage in config && name in config[wgContentLanguage] )
         return config[wgContentLanguage][name];
      return config.en[name];
   }

   // Function for generating account navigation items
   function createAccountNavItem(navItemID, navItemLink, navItemMsg) {
      return '<li><a href="/wiki/' + navItemLink + '" data-id="' + navItemID + '">' + msg(navItemMsg) + '</a></li>';
   }

   // Header: "WikiActivity" -> "Recent Changes"
   $('a[data-id="wikiactivity"]', wikiHeaderButtons)
      .attr('href', '/wiki/Special:RecentChanges')
      .attr('title', 'Special:RecentChanges')
      .contents().filter(function() { return this.nodeType == 3; }).replaceWith(msg('recentChanges'));

   // Header: Limit "Random Page" to specific namespace
   if(config.randomPageLimitedTo) {
      $('a[data-id="randompage"]', wikiHeaderButtons).attr('href', '/wiki/Special:Random/' + config.randomPageLimitedTo);
   }

   // Account navigation: Add "contributions", "followed pages", "watchlist"
   accountNavTalk.after(
      createAccountNavItem('mycontribs', 'Special:Contributions/' + wgUserName, 'contributions') + 
      ((config.accountNavFollowedPages) ? createAccountNavItem('myfollowedpages', 'Special:Following/', 'followedPages') : '') + 
      ((config.accountNavWatchlist) ? createAccountNavItem('mywatchlist', 'Special:Watchlist/', 'watchlist') : '')
   );

   // Search: Add "go to search term" button
   if (wgNamespaceNumber == -1 && wgCanonicalSpecialPageName == "Search") {
      searchTerm = $('#powerSearchText').val();

      if (searchTerm) {
         $('#WikiaArticle h1:first').prepend('<a class="wikia-button" style="float: right;" title="' + searchTerm + '" href="/wiki/' + encodeURIComponent(searchTerm) + '">' + msg('goToPage') + '</a>');
      }
   }

   // Edit screen: Add "history" and "what links here"
   if (wgAction == "edit" || wgAction == "submit") {
      $('#wpDiff').parent().after('<li><a href="/index.php?title=' + encodedPagename + '&action=history" title="' + msg('history') + '">' + msg('history') + '</a></li><li><a href="/wiki/Special:WhatLinksHere/' + encodedPagename + '" title="' + msg('whatLinksHere') + '">' + msg('whatLinksHere') + '</a></li>');
   }

   // Categories: Turn links pointing to non-created categories into redlinks (MediaWiki default)
   if(config.categoryRedlink) {
      $('.newcategory').addClass('new');
   }
}

jQuery(function($) {
   if (skin == 'oasis' || skin == 'wikia') {
      addAdvancedOasisUI();
   }
});