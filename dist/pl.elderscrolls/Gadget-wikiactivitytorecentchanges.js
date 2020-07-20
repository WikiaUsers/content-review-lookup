/**********************************************************/
/* WikiActivityToRecentChanges                            */
/* Changes the WikiActivity button to RecentChanges on    */
/* Oasis/Wikia skins                                      */
/* Author: User:Tierrie at http://dragonage.wikia.com     */
/* Origin: User:Porter21 at http://fallout.wikia.com      */
/**********************************************************/

function WikiActivityToRecentChanges()
{
  var config = 
  {
    de: { recentChanges: "Letzte Änd." },         // Deutsch
    en: { recentChanges: "Recent Changes" },      // English
    es: { recentChanges: "Cambios rec." },        // Español
    fr: { recentChanges: "Mod. récentes" },       // Français
    nl: { recentChanges: "Recente Wijzigingen" }  // Dutch
    pl: { recentChanges: "Ostatnie zmiany" }      // Polish
  };
  
  // Function for multi-language support (by Daniel Friesen aka User:Dantman)
  function msg(name) {
    if ( wgUserLanguage in config && name in config[wgUserLanguage] )
       return config[wgUserLanguage][name];
    if ( wgContentLanguage in config && name in config[wgContentLanguage] )
       return config[wgContentLanguage][name];
    return config.en[name];
  }
  
  // Header: "WikiActivity" -> "Recent Changes"
  $('#WikiHeader ul.WikiaMenuElement > li > a[data-id="wikiactivity"]')
    .attr('href', '/wiki/Special:RecentChanges')
    .attr('title', 'Special:RecentChanges')
    .contents().filter(function() { return this.nodeType == 3; }).replaceWith(msg('recentChanges'));
}

$(function(){
  if (skin == 'oasis' || skin == 'wikia') {
    WikiActivityToRecentChanges();
  }
});