/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

/* Automatische blanke Dateiinfo beim Hochladen einer Datei
 * by: [[User:KettleMeetPot]] (taken from  [[w:c:Avatar|Avatar Wiki]]).
 */

$(function() {
    if ( mw.config.get('wgCanonicalSpecialPageName') == "Upload" || mw.config.get('wgCanonicalSpecialPageName') == "MultipleUpload") {
	    var value = "{"+"{Dateiinfo\n"
		+ "| Beschreibung = \n"
		+ "| Quelle       = \n"
		+ "| Künstler     = \n"
		+ "| Kategorien   = \n"
		+ "}"+"}";
		$('#wpUploadDescription').val(value);
    }
});
 
/* Use EraIcon's default CSS */
window.useIncludedStylesheet = true;

/* Wird für die Vorlage:USERNAME benötigt */
if (mw.config.get('wgUserName') != 'null') {
	$('.insertusername').text(mw.config.get('wgUserName'));
}

/* Auto-refreshing recent changes */
ajaxPages = ["Spezial:WikiActivity","Spezial:Letzte_Änderungen","Spezial:Beobachtungsliste","Spezial:Logbuch","Spezial:Beiträge"];
AjaxRCRefreshText = 'Aktualisierung';
AjaxRCRefreshHoverText = 'Aktualisiert die Seite automatisch';