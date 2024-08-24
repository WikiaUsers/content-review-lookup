 // importScriptPage zur Implementierung von Scripts von anderen Seiten.
 function importScriptPage (page, server) {
 	var url = '/index.php?title=' + encodeURIComponent(page.replace(/ /g,'_')).replace('%2F','/').replace('%3A',':') + '&action=raw&ctype=text/javascript';
 	
 	if (typeof server == "string") {
 		url = (server.indexOf('://') == -1)?'http://' + server + '.wikia.com' + url:server + url;
 	}
 
 	return importScriptURI(url);
 }
 
 // Entfernt die "Verwendet in:" Links direkt unter dem Bild auf Datei: / Bild: Beschreibungsseiten
 if (wgNamespaceNumber == 6) {
 	$("#file").html($("#file").html().replace(/<br>.*<br>/i,"<br>"));
 }
 
 
 
 // ****************************************
 // *** Von http://de.ikariam.wikia.com/ ***
 // ****************************************
 
 // L�dt die Dateiinfo-Vorlage beim Hochladen von Bildern direkt im Beschreibungsfeld.
 // http://de.ikariam.wikia.com/wiki/MediaWiki:Onlyifuploading.js
 importScriptPage('MediaWiki:Onlyifuploading.js', 'de.ikariam');
 
 // F�gt einen Hinweise f�r Benutzer abh�ngig davon, ob sie angemeldet sind oder nicht ein.
 // http://de.ikariam.wikia.com/wiki/MediaWiki:UserHint.js
 importScriptPage('MediaWiki:UserHint.js', 'de.ikariam');
 
 // Entfernt alle Elemente, die als name noscript haben.
 // http://de.ikariam.wikia.com/wiki/MediaWiki:HideNoscript.js
 importScriptPage('MediaWiki:HideNoscript.js', 'de.ikariam');
 
 
 
 // *********************************
 // *** Von http://dev.wikia.com/ ***
 // *********************************
 
 // Sorgt daf�r, dass einige Seiten automatisch neu geladen werden k�nnen.
 // http://dev.wikia.com/wiki/AjaxRC
 ajaxPages = ["Spezial:Letzte_�nderungen","Spezial:Beobachtungsliste","Spezial:Logbuch","Spezial:Beitr�ge","Spezial:WikiActivity"];
 AjaxRCRefreshText = 'Automatisch aktualisieren';
 AjaxRCRefreshHoverText = 'Aktualisiert die Seite automatisch alle 30 Sekunden';
 indicator = 'https://images.wikia.nocookie.net/__cb20100617113123/dev/images/6/6a/Snake_throbber.gif';
 ajaxRefresh = 30000;
 importScriptPage('AjaxRC/code.js', 'dev');
 
 // Sorgt daf�r, dass Ein-/Ausklappbare Tabellen erzeugt werden k�nnen.
 // http://dev.wikia.com/wiki/ShowHide
 importScriptPage('ShowHide/code.js', 'dev');
 
 // Zeigt auf jeder Seite, auf der die Vorlage [[Vorlage:Doppelte Bilder|Doppelte Bilder]] oder ein div mit id="mw-dupimages" eingef�gt wurde eine Liste mit doppelten Bildern an.
 // http://dev.wikia.com/wiki/DupImageList
 importScriptPage('DupImageList/code.js', 'dev');
 
 // F�gt einen Link zum neu Laden der Seite ohne Nutzung des Caches hinzu.
 // http://dev.wikia.com/wiki/PurgeButton
 PurgeButtonText = 'Neu Laden';
 importScriptPage('PurgeButton/code.js', 'dev');
 
 // F�gt einige Verbesserungen auf der Benutzeroberfl�che ein.
 // http://dev.wikia.com/wiki/AdvancedOasisUI
 importScriptPage('AdvancedOasisUI/code.js', 'dev');
 
 
 // ******************************************************
 // *** Testscript(e) von http://de.ikariam.wikia.com/ ***
 // ******************************************************
 
 // Testscript, meistens leer.
 // http://de.ikariam.wikia.com/wiki/MediaWiki:Testscript.js
 importScriptPage('MediaWiki:Testscript.js', 'de.ikariam');