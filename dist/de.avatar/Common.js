/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

// Import [[MediaWiki:Onlyifuploading.js]] 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }
 
/* Use EraIcon's default CSS */
window.useIncludedStylesheet = true;

//Wird für die Vorlage:USERNAME benötigt
if (wgUserName != 'null') {
	$('.insertusername').text(wgUserName);
}

/* Auto-refreshing recent changes */
ajaxPages = ["Spezial:WikiActivity","Spezial:Letzte_Änderungen","Spezial:Beobachtungsliste","Spezial:Logbuch","Spezial:Beiträge"];
AjaxRCRefreshText = 'Aktualisierung';
AjaxRCRefreshHoverText = 'Aktualisiert die Seite automatisch';