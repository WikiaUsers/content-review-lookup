/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

// Import [[MediaWiki:Onlyifuploading.js]] 
if ( wgCanonicalSpecialPageName == "Upload" ) {
  document.write('<script type="text/javascript" src="/de/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

// Allows the entire box on Help:Contents to be clickable
if (wgPageName == 'Hilfe:Übersicht') {
    $('.centralhelpbox').click(function() {
        window.location.href = '/de/wiki/Hilfe:' + $(this).attr('data-link');
    });
}

// Variablen für das Skript AjaxRC (siehe http://dev.wikia.com/wiki/AjaxRC)
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity"];
window.AjaxRCRefreshText = 'Auto-Aktualisierung';
window.AjaxRCRefreshHoverText = 'Automatische Aktualisierung ohne Neuladen der kompletten Seite';