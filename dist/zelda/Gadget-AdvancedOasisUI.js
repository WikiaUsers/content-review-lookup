/* Script for adding various UI improvements to Oasis
 * Version 0.2
 * Script by User:Porter21 (http://fallout.wikia.com)
 * i18n function by User:Dantman
 */

function addAdvancedOasisUI () {
   var encodedPagename = encodeURIComponent(wgPageName);
   var wikiHeaderButtons = $('#WikiHeader > div.buttons');
   var accountNavWatch = $('#AccountNavigation > li > ul.subnav > li:has(a[data-id="watchlist"])');
   // Configuration
   var config = window.AdvancedOasisUIConfig = $.extend(true, {
      accountNavWatchlist: false,
      randomPageLimitedTo: "",
      userLang: true,
      // Deutsch
      de: {
         contributions: "Beiträge",
         goToPage: "Gehe zur Seite",
         history: "Versionen",
         recentChanges: "Letzte Änd.",
         watchlist: "Beobachtungsliste",
         whatLinksHere: "Links auf diese Seite"
      },
      // English
      en: {
         contributions: "Contributions",
         goToPage: "Go to page",
         history: "History",
         recentChanges: "Recent Changes",
         watchlist: "Watchlist",
         whatLinksHere: "What links here"
      },
      // Español
      es: {
         contributions: "Contribuciones",
         goToPage: "Ir a la página",
         history: "Historial",
         recentChanges: "Cambios rec.",
         watchlist: "Lista de seguimiento",
         whatLinksHere: "Lo que enlaza aquí"
      },
      // Français
      fr: {
         contributions: "Contributions",
         goToPage: "Aller à la page",
         history: "Historique",
         recentChanges: "Mod. récentes",
         watchlist: "Liste de suivi",
         whatLinksHere: "Pages liées"
      }
   }, window.AdvancedOasisUIConfig || {});

   // Function for multi-language support (by Daniel Friesen aka User:Dantman)
   function msg(name) {
      if ( config.userLang && wgUserLanguage in config && name in config[wgUserLanguage] )
         return config[wgUserLanguage][name];
      if ( wgContentLanguage in config && name in config[wgContentLanguage] )
         return config[wgContentLanguage][name];
      return config.en[name];
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

   // Account navigation: Add "contributions"
   accountNavWatch.before('<li><a href="/wiki/Special:Contributions/' + wgUserName + '" data-id="mycontribs">' + msg('contributions') + '</a></li>');

   // Account navigation: "Followed pages" -> "watchlist"
   if (config.accountNavWatchlist) {
      accountNavWatch.children('a').attr('href', '/wiki/Special:Watchlist').text(msg('watchlist'));
   }

   // Search: Add "go to search term" button
   if (wgNamespaceNumber == -1 && wgCanonicalSpecialPageName == "Search") {
      searchTerm = $('#powerSearchText').val();

      if (searchTerm) {
         $('#WikiaArticle h1:first').prepend('<a class="wikia-button" style="float: right;" title="' + searchTerm + '" href="/wiki/' + encodeURIComponent(searchTerm) + '">' + msg('goToPage') + '</a>');
      }
   }

   // Edit screen: Add "history" and "what links here"
   if (wgAction == "edit" || wgAction == "submit") {
      $('#wpDiff').parent().before('<div style="float: right;"><a href="/index.php?title=' + encodedPagename + '&action=history" title="' + msg('history') + '">' + msg('history') + '</a> | <a href="/wiki/Special:WhatLinksHere/' + encodedPagename + '" title="' + msg('whatLinksHere') + '">' + msg('whatLinksHere') + '</a></div>');
   }
}

jQuery(function($) {
   if (skin == 'oasis' || skin == 'wikia') {
      addAdvancedOasisUI();
   }
});