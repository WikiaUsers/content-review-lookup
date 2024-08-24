if (wgUserName == "20M61" && false){
/*********************************************************\
    Funktion für InfoBox, MiniBox und MicroBox
 * spürt alle Boxen in einem Artikel auf
 * setzt Variablen aus Box und Datenbank
 * geht auf Besonderheiten der Boxen ein
\*********************************************************/
Fehler_angezeigt = false;
function SpoilerDBBoxen(){
  var ErrorLog='';

  // Alle Tabellen (potentielle Infoboxen) durchlaufen
  var Daten1Box = document.getElementById("WikiaArticle").getElementsByTagName('div');
  var Daten2Box = document.getElementById("WikiaArticle").getElementsByTagName('table');
  var CountAllHTMLObjects = Daten1Box.length + Daten2Box.length;
  for (var mergei = 0; mergei < CountAllHTMLObjects; mergei++){
	var DatenBox = Daten1Box;
	var i = mergei;
	if (i >= DatenBox.length) {
		i = i - DatenBox.length;
		DatenBox = Daten2Box;
	}

    if (!DatenBox[i].getAttribute('data-Name')) continue; // Nur Objekte untersuchen, die an die DB angeschlossen sind

    // MySpoilerStand ermitteln - DatenBox -> DatenSatz -> TV (Wichtig für einige Datensätze, wie z.B. Bilder)
    var Show   = DatenBox[i].getAttribute('data-Show');   if(! Show)   Show   = "TV";
    var Typ    = DatenBox[i].getAttribute('data-Typ');
    var Bild   = DatenBox[i].getAttribute('data-Bild');   if(! Bild)   Bild   = DatenBox[i].getElementsByTagName('img')[0].src;
    var Gruppe = DatenBox[i].getAttribute('data-Gruppe');
    var Status = DatenBox[i].getAttribute('data-Status');
    var MySpoilerStand = DatenBox[i].getAttribute('data-ZeigeBildBis');
    var Nickname = DatenBox[i].getAttribute('data-Nickname');

    // Datensatz auswählen
    var DB_ID = DB_Name.indexOf(DatenBox[i].getAttribute('data-Name'));
    if (DB_ID >= 0) {
		Show = DB_Daten[DB_ID]['Show'];
        if (!MySpoilerStand) MySpoilerStand = GetMyShowStatus(Show);

		Typ  = DB_Daten[DB_ID]['Typ'];

		var tmpObj = DB_Daten[DB_ID]['Spoiler'].split(',');
		for (var n=0; n < tmpObj.length; n++) {
			if ((tmpObj[n].split('-')[0]*1) > MySpoilerStand) break;
			//Slice unterstützt alle Zeichen bis ";"
			Status = tmpObj[n].slice(tmpObj[n].search("-")+1);
		} //Ende For-Spoiler

		tmpObj = DB_Daten[DB_ID]['Gruppe'].split(',');
		for (var n=0; n < tmpObj.length; n++) {
			if ((tmpObj[n].split('-')[0]*1) > MySpoilerStand) break;
			Gruppe = tmpObj[n].slice(tmpObj[n].search("-")+1);
		} // Ende For-Gruppe

		// Gucken ob kein USER-Nickname aber ein Datensatz vorhanden ist
		tmpObj = DB_Daten[DB_ID]['Nickname'];
		if (tmpObj && !Nickname){
		  tmpObj = tmpObj.split(',')
		  for (var n=0; n < tmpObj.length; n++) {
			if ((tmpObj[n].split('-')[0]*1) > MySpoilerStand) break;
			Nickname = tmpObj[n].slice(tmpObj[n].search("-")+1);
		  } // Ende For-Gruppe
	    } // Ende IF-Nickname vorhanden

        var tmpObj = DB_Daten[DB_ID]['Bild'].split(';');
	    for (var n=0; n < tmpObj.length-1; n++) {
	      if ((tmpObj[n].split('-')[0]*1) > MySpoilerStand) break;
          Bild = tmpObj[n].slice(tmpObj[n].search("-")+1);
        } //Ende For-Bild
    } // Ende If-DS
	else {
		ErrorLog += 'Datensatz "'+DatenBox[i].getAttribute('data-Name')+'" nicht gefunden. ('+DatenBox[i].className+')\n';
		if (!MySpoilerStand) MySpoilerStand = GetMyShowStatus(Show);
	}

    if (!Nickname) Nickname = DatenBox[i].getAttribute('data-Name');   // Prüfen ob Sonderbehandlung
    else if (Nickname.search(",")) {								 // Prüfen ob Multi-Nickname
	  Nickname = Nickname.split(',');								 // Aufteilen in Folgen
	  var tmpNickname = Nickname[0].slice(Nickname[0].search("-")+1);// Erster Name MUSS immer sein
	  for (var n=0; n < Nickname.length; n++) {						 // Alle Folgen durchgehen
	    if ((Nickname[n].split('-')[0]*1) > MySpoilerStand) break;   // Bis Folge gefunden wird, die User noch nicht gesehen hat
	    tmpNickname = Nickname[n].slice(Nickname[n].search("-")+1);  // Neue Folge zwischenspeichern

	  } // Ende For-Gruppe
	  Nickname = tmpNickname;										 // Ergebnis in Leitvariable übertragen
	}

    DatenBox[i].getElementsByTagName('img')[0].src = Bild;          // Bild setzen

	// Boxspezifische Dinge
    switch(DatenBox[i].className.split(' ')[0].toLowerCase()){
		case "infobox":
			// Klasse + Status setzen. Infobox und MiniBox können zusätzlich eine Hintergrundklasse haben.
  			switch(Typ) {
				default:
				case "Gegenstand": case "Waffe": case "Ausrüstung": case "Folterwerkzeug": case "Granate": case "Award": case "Serie": case "Mitwirkende":
	  				//Kein Status
		  			Status = Typ;
					break;
				case "Maschine": case "Gruppe": case "Charakter": case "Ort":
				case "Individuell":
	  				break;
  			} //Ende switch-Typ
			if (DatenBox[i].className.split(' ')[1] == 'headerBackground')
				DatenBox[i].className = "infobox headerBackground " + Status;
			else DatenBox[i].className = "infobox " + Status;

		  	DatenBox[i].getElementsByTagName('img')[0].removeAttribute('height'); // automatische Höhe

      		// Status und Gruppe in vorgesehene Zellen schreiben
      		var SpoilerTRObjekt = DatenBox[i].getElementsByTagName('tr');
      		for (var n=0; n < SpoilerTRObjekt.length-1; n++) {
        		if (SpoilerTRObjekt[n].className == "InfoStatus") {
		  			switch(Typ) {
						default:
						case "Gegenstand": case "Waffe": case "Ausrüstung": case "Folterwerkzeug": case "Granate": case "Award": case "Serie": case "Mitwirkende":
			  				//Kein Status
				  			SpoilerTRObjekt[n].style.display = 'none';
							break;
						case "Maschine": case "Gruppe": case "Charakter": case "Ort":
							// Status anzeigen und mit DB-Inhalt überschreiben.
			  				SpoilerTRObjekt[n].getElementsByTagName("td")[1].innerHTML = Status;
			  				SpoilerTRObjekt[n].style.display = '';
			  				break;
						case "Individuell":
					  		// Status anzeigen, aber nicht ändern
			  				SpoilerTRObjekt[n].style.display = '';
			  				break;
		  			} //Ende switch-Typ
	    		} // Ende if-InfoStatus

	        	if (SpoilerTRObjekt[n].className == "InfoGruppe") {
		  			switch(Typ) {
						default:
						case "Serie":
							//Kein Status
							SpoilerTRObjekt[n].style.display = 'none';
							break;
						case "Gegenstand": case "Waffe": case "Ausrüstung": case "Folterwerkzeug": case "Granate": case "Award": case "Mitwirkende": case "Maschine": case "Gruppe": case "Charakter": case "Ort":
							// Status anzeigen und mit DB-Inhalt überschreiben.
							SpoilerTRObjekt[n].getElementsByTagName("td")[1].innerHTML = Gruppe; //(2. (rechte) Spalte - nicht erste)
							SpoilerTRObjekt[n].style.display = '';
							break;
						case "Individuell":
							// Status anzeigen, aber nicht ändern
							SpoilerTRObjekt[n].style.display = '';
							break;
					} //Ende switch-InfoGruppe
				} // Ende if-InfoGruppe
	  		} // Ende For-Schleife für Zeilen in Infobox
			break;
		case "minibox":
			// Klasse + Status setzen. Infobox und MiniBox können zusätzlich eine Hintergrundklasse haben.
			if (DatenBox[i].className.split(' ')[1] == 'headerBackground')
				DatenBox[i].className = "MiniBox headerBackground " + Status;
			else DatenBox[i].className = "MiniBox " + Status;
		  	DatenBox[i].getElementsByTagName('img')[0].removeAttribute('width'); // automatische Breite

      		// Überschrift festlegen
      		switch(Typ) {
				case "Gruppe": case "Gegenstand": case "Ort": case "Waffe": case "Ausrüstung": case "Folterwerkzeug":  case "Granate": case "Maschine": case "Award": case "Serie": case "Mitwirkende":
					DatenBox[i].setAttribute('data-headline', Typ);
					break;
                case "Charakter":
                	DatenBox[i].setAttribute('data-headline', Status);
                	break;
                case "Individuell":
                	break;
                default:
                    DatenBox[i].removeAttribute('data-headline'); //Kein Status
                    break;
      		} //Ende switch-Weiche

			// (Nick)Namen austauschen
			for (n=0; n<DatenBox[i].getElementsByTagName('div').length; n++){
			  if (DatenBox[i].getElementsByTagName('div')[n].className == 'MiniName')
			    DatenBox[i].getElementsByTagName('div')[n].getElementsByTagName('a')[0].innerHTML = Nickname; //
			}
			break;
		case "microbox":
			// Klasse + Status setzen.
			DatenBox[i].className = "MicroBox " + Status;
		  	DatenBox[i].getElementsByTagName('img')[0].removeAttribute('width'); // automatische Breite
			break;
	}// Ende Switch
  }// Ende FOR-Schleife (alle Daten-Boxen)
  if (!Fehler_angezeigt && ErrorLog && wgUserName == "20M61" && 0) {
	  Fehler_angezeigt = true;
	  alert('Fehler in DatenBoxen (Info-/Mini-/MicroBox)(): \n'+ErrorLog);
  }
  setTimeout('SpoilerDBBoxen()',500);  //Automatisches Wiederholen der Abfrage
  return true;
}//Ende Funktion SpoilerDBBoxen

/*********************************************************\
                  Spoiler-Funktion
 * Erzeugt Button in Überschriftenleiste
 * Erzeugt Menü des Buttons
 * Ändert Hintergrundbild
 * Verändert die (Un-)Sichtbarkeit von DIV- und SPAN-Tags
 * Verändert Verhalten in unterschiedlichen Namensräumen
\*********************************************************/
/*********************************************************\
    Variable: alles was im Cookie stehen kann (Usereinstellungen)
\*********************************************************/
importArticles({ type: "script", articles: ["MediaWiki:SpoilerEinstellung"] });

var TWD = new Object();
  TWD['MyTVShow']        = 0; // TV-Serie
  TWD['MyTVFolge']       = 0;
  TWD['MyWebS1']         = 0; // Webisode
  TWD['MyWebS2']         = 0;
  TWD['MyWebS3']         = 0;
  TWD['MyGameDREpisode'] = 0; // Dead Reckoning
  TWD['MyGameTTEpisode'] = 0; // TWD: The Game (Telltale)
  TWD['MyGameSGEpisode'] = 0; // TWD: Social Game
  TWD['MyGameSIEpisode'] = 0; // TWD: The Game (Activision - Dixon)
  TWD['MyComic']         = 0; // Comic
  TWD['MyBook']          = 0; // Bücher
  TWD['IKnowAll']        = 0; // Master (0 =Ich weiß nicht alles - bitte Spoilerschutz gewähren)
  TWD['MyBG_TV']         = 1; //'1§1§1§1'; (TV § COMIC § SPIELE § BUCH)
  TWD['MyBG_COMIC']      = 1;
  TWD['MyBG_SPIELE']     = 1;
  TWD['MyBG_BUCH']       = 1;
  TWD['Helper']          = false;

/*********************************************************\
    Variable: Alle möglichen Hintergrundbilder sortiert in Namespaces
\*********************************************************/
var x = 0;                    // Laufvariable - Wert unbestimmt
var BG_TV     = new Array();
    BG_TV[x]               = new Object;
    BG_TV[x]['Bild']       = 'https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/9/9d/BG-Standard.jpg';
    BG_TV[x]['Attachment'] = 'scroll';
    x ++;
    BG_TV[x]               = new Object;
    BG_TV[x]['Bild']       = 'https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/c/c0/Hintergrundbild_S3.jpg';
    BG_TV[x]['Attachment'] = 'scroll';
    x ++;
    BG_TV[x]               = new Object;
    BG_TV[x]['Bild']       = 'https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/8/8a/Hintergrund_Atlanta.jpg';
    BG_TV[x]['Attachment'] = 'fixed';

    x = 0;
var BG_Comic  = new Array();
    BG_Comic[x]               = new Object;
    BG_Comic[x]['Bild']       = 'https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/3/35/Hintergrund_Comic_2.jpg';
    BG_Comic[x]['Attachment'] = 'scroll';
    x ++;
    BG_Comic[x]               = new Object;
    BG_Comic[x]['Bild']       = 'https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/8/85/Hintergrund_Comic_1.jpg';
    BG_Comic[x]['Attachment'] = 'scroll';
    x ++;
    BG_Comic[x]               = new Object;
    BG_Comic[x]['Bild']       = 'https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/5/50/Motiv_3.jpg';
    BG_Comic[x]['Attachment'] = 'scroll';

    x = 0;
var BG_Spiele = new Array();
    BG_Spiele[x]               = new Object;
    BG_Spiele[x]['Bild']       = 'https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/b/b2/Spiele_2.jpg';
    BG_Spiele[x]['Attachment'] = 'scroll';
    x ++;
    BG_Spiele[x]               = new Object;
    BG_Spiele[x]['Bild']       = 'https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/2/29/Spiele_1.jpg';
    BG_Spiele[x]['Attachment'] = 'scroll';
    x ++;
    BG_Spiele[x]               = new Object;
    BG_Spiele[x]['Bild']       = 'https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/1/1b/Spiele_1b.jpg';
    BG_Spiele[x]['Attachment'] = 'scroll';
    x ++;
    BG_Spiele[x]               = new Object;
    BG_Spiele[x]['Bild']       = 'https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/a/a3/Spiele_2b.jpg';
    BG_Spiele[x]['Attachment'] = 'scroll';
    x ++;
    BG_Spiele[x]               = new Object;
    BG_Spiele[x]['Bild']       = 'https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/3/3b/Spiele_4b.jpg';
    BG_Spiele[x]['Attachment'] = 'scroll';
    x ++;
    BG_Spiele[x]               = new Object;
    BG_Spiele[x]['Bild']       = 'https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/f/f1/Spiele_3b.jpg';
    BG_Spiele[x]['Attachment'] = 'scroll';

    x = 0;
var BG_Buch   = new Array();
    BG_Buch[x]               = new Object;
    BG_Buch[x]['Bild']       = 'https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/8/8a/Hintergrund_Atlanta.jpg';
    BG_Buch[x]['Attachment'] = 'scroll';
    x ++;
    BG_Buch[x]               = new Object;
    BG_Buch[x]['Bild']       = 'https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/c/c0/Hintergrundbild_S3.jpg';
    BG_Buch[x]['Attachment'] = 'scroll';
    x ++;
    BG_Buch[x]               = new Object;
    BG_Buch[x]['Bild']       = 'https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/9/9d/BG-Standard.jpg';
    BG_Buch[x]['Attachment'] = 'fixed';

/*********************************************************\
    Funktion ermittelt aus Show den User-Wert
\*********************************************************/
function GetMyShowStatus(Show){
  var MySpoilerStand = "000";
  switch(Show.toLowerCase()) {
    default: case "tv": MySpoilerStand = (TWD['MyTVShow']*100 + TWD['MyTVFolge']*1); break;
    case "web":
      MySpoilerStand = 300*1 + TWD['MyWebS3']*1;
      if (MySpoilerStand > 300)                           break;
      if (MySpoilerStand == 300) { MySpoilerStand = 399 ; break;}
      MySpoilerStand = 200*1 + TWD['MyWebS2']*1;
      if (MySpoilerStand > 200)                           break;
      if (MySpoilerStand == 200) { MySpoilerStand = 299 ; break;}
      MySpoilerStand = 100*1 + TWD['MyWebS1']*1;
      if (MySpoilerStand > 100)                           break;
      if (MySpoilerStand == 100) { MySpoilerStand = 199 ; break;}
      MySpoilerStand = 000 ;                              break;
    case "web1":        MySpoilerStand = TWD['MyWebS1'];                             break;
    case "web2":        MySpoilerStand = TWD['MyWebS2'];                             break;
    case "web3":        MySpoilerStand = TWD['MyWebS3'];                             break;
    case "dr":          MySpoilerStand = TWD['MyGameDREpisode'];                     break;
    case "tt":          MySpoilerStand = TWD['MyGameTTEpisode'];                     break;
    case "sg":          MySpoilerStand = TWD['MyGameSGEpisode'];                     break;
    case "si":          MySpoilerStand = TWD['MyGameSIEpisode'];                     break;
    case "comic":       MySpoilerStand = TWD['MyComic'];                             break;
    case "buch": case "roman":      MySpoilerStand = TWD['MyBook'];      break;
  } //Ende switch-Weiche
  if (MySpoilerStand == 0) MySpoilerStand = 999;
  return MySpoilerStand;
} //Ende Funktion GetMyShowStatus

/*********************************************************\
    Funktion ermittelt ob dieses Objekt angezeigt werden soll oder nicht
 * Rückgabewert TRUE, wenn persönlicher Spoiler außerhalb der VON BIS-Spoiler liegt
 * Benötigt data-FolgeZeigenVon, data-Show, data-FolgeZeigenBis (optional),
\*********************************************************/
function AmISpoiled(HTML_Element, Von, Bis, Show){
    if (HTML_Element.getAttribute('data-FolgeZeigenVon')) Von = HTML_Element.getAttribute('data-FolgeZeigenVon');
	if (HTML_Element.getAttribute('data-FolgeZeigenBis')) Bis = HTML_Element.getAttribute('data-FolgeZeigenBis');
	if (HTML_Element.getAttribute('data-Show'))           Show = HTML_Element.getAttribute('data-Show');
	if(! Von)  Von  = 0;
	if(! Bis)  Bis  = 999;
	if(! Show) Show = 'TV';
	var MySpoilerStand = GetMyShowStatus(Show);
    var Werde_ich_gespoilert = false;
    if (MySpoilerStand < Von)                Werde_ich_gespoilert = true;
    if (MySpoilerStand >= Bis && Bis != 999) Werde_ich_gespoilert = true;

    return Werde_ich_gespoilert;
} //Ende function AmISpoiled

/*********************************************************\
    Funktion setz Spoiler
 * Seitenspoiler (darf Seite gesehen werden?)
 * SPAN-Tags (sichtbar, unsichtbar, zeitweise sichtbar)
 * TD-Tags   (sichtbar, unsichtbar, zeitweise sichtbar)
 * DIV-Tags  (sichtbar, unsichtbar, zeitweise sichtbar)
\*********************************************************/
function SetSpoiler(){
	// Auslesen ob Seitenspoiler existiert (Mindestfolge um Seite zu betreten)

	SpoilerMinArtikel = document.getElementById("Spoiler_Minimum");
	if (SpoilerMinArtikel != null)	{
		if (AmISpoiled(SpoilerMinArtikel))	    {
			openSpoilerEinstellung("Diese Seite enthält Informationen, die erst in späteren Folgen gezeigt werden. Falls du den Inhalt dennoch sehen möchtest, so ändere bitte deine Spoiler-Einstellungen", SpoilerMinArtikel.getAttribute('data-FolgeZeigenVon'));
	      	return false;
		}
	}

	// SPAN-Elemente (verstecken, zeigen)
	var SpanElement = document.getElementById("WikiaArticle").getElementsByTagName("span");
	for (sid=0; sid<SpanElement.length; sid++ ){
		// Hat das Element kein FolgeZeigenVon, dann ist es kein Spoilerteil
		if (! SpanElement[sid].getAttribute('data-FolgeZeigenVon')) continue;
		// Wenn von SPAN-Element gespoilert, dann nicht anzeigen.
		if (AmISpoiled(SpanElement[sid]))
			SpanElement[sid].style.display = "none";
		else
			SpanElement[sid].style.display = "";
  	}

  	// TD-Elemente (unsichtbar, sichtbar)
  	var TabellenElement = document.getElementById("WikiaArticle").getElementsByTagName("td");
	for ( tid=0; tid<TabellenElement.length; tid++ ){
		// Hat das Element kein FolgeZeigenVon, dann ist es kein Spoilerteil
		if (! TabellenElement[tid].getAttribute('data-FolgeZeigenVon')) continue;
		// Tabellen-TD-Elemente werden unsichtbar gemacht
		// (Bei Display "none" würden sie die Tabelle zerwürfeln)
		if (AmISpoiled(TabellenElement[tid]))
			TabellenElement[tid].style.opacity = 0;
		else
			TabellenElement[tid].style.opacity = 1;
	}

	// TR-Elemente (verstecken, zeigen)
  	TabellenElement = document.getElementById("WikiaArticle").getElementsByTagName("tr");
	for ( tid=0; tid<TabellenElement.length; tid++ ){
		// Hat das Element kein FolgeZeigenVon, dann ist es kein Spoilerteil
		if (! TabellenElement[tid].getAttribute('data-FolgeZeigenVon')) continue;
		// Tabellen-TR-Elemente werden gelöscht (ganze Zeile weg)
		if (AmISpoiled(TabellenElement[tid]))
			TabellenElement[tid].style.display = "none";
		else
			TabellenElement[tid].style.display = "";
	}

	// DIV-Elemente (verstecken, zeigen)
  	DivElement = document.getElementById("WikiaArticle").getElementsByTagName("div");
	for ( did=0; did<DivElement.length; did++ ){
		// Hat das Element kein FolgeZeigenVon, dann ist es kein Spoilerteil
		if (! DivElement[did].getAttribute('data-FolgeZeigenVon')) continue;
		// Tabellen-TR-Elemente werden gelöscht (ganze Zeile weg)
		if (AmISpoiled(DivElement[did]))
			DivElement[did].style.display = "none";
		else
			DivElement[did].style.display = "";
	}
    SpoilerDBBoxen();// möglicherweise geänderte MicroBoxen (ShowFamily) korrigieren.

    return true;
} //ENDE funktion SetSpoiler

/*********************************************************\
    Funktion löst Zeitproblem von schreibCookie()
\*********************************************************/
function fixedGMTString(datum){
   var damals=new Date(1970,0,1,12);
   if (damals.toGMTString().indexOf("02")>0)
      datum.setTime(datum.getTime()-1000*60*60*24);
   return datum.toGMTString();
}

/*********************************************************\
    Funktion schreibt Cookie (alles, was in "TWD" an Eigenschaften steht)
\*********************************************************/
function schreibCookie() {
   var neuerKeks = 'TWDSpoiler=';
   for (Eigenschaft in TWD)
     { neuerKeks += Eigenschaft + ":" + TWD[Eigenschaft] + "&"; }
   var jetzt = new Date();
   var verfall = new Date(jetzt.getTime() + 1000*60*60*24*365); // 1 Jahr Cookiezeit
   neuerKeks += "; expires=" + fixedGMTString(verfall);
   neuerKeks += "; path=/";
   document.cookie = neuerKeks;
   return;
}

/*********************************************************\
    Funktion sucht Inhalt ab, ob spezielle Helfer-Boxen versteckt werden müssen
\*********************************************************/
function HideHelpingBoxes(NeueBoxenEigenschaft){
  if (NeueBoxenEigenschaft != null)
    MithelfenBoxen = NeueBoxenEigenschaft;
  var div = document.getElementById("WikiaMainContentContainer").getElementsByTagName('div');
  for (var all=0; all < div.length; all++ )
  {
    if (div[all].className == "Helferbox" && MithelfenBoxen==false)
      div[all].style.display = "none";
    else if (div[all].className == "Helferbox")
      div[all].style.display = "";
  }
}

/*********************************************************\
    Funktion ändert Hintergrundbild
\*********************************************************/
function SetBGPic(Picture, Attachment){
  var body = document.getElementsByTagName('body')[0];
  body.style.backgroundImage = "url("+Picture+")";
  if(Attachment == 'fixed')
    body.style.backgroundAttachment = 'fixed';
  else
    body.style.backgroundAttachment = 'scroll';
  return true;
}

/*********************************************************\
    Funktion liest Hintergrundbild und ruft SetBGPic zum ändern
\*********************************************************/
function ChangeHintergrund(NeuerHintergrund, SEAuswahl) {
  var SwitchItem = wgCanonicalNamespace;
  if (SEAuswahl) SwitchItem = SEAuswahl.getAttribute('data-select')
  if (NeuerHintergrund) {
    switch(SwitchItem) {
      case "MyBG_BUCH"  : case "Buch"  :TWD['MyBG_BUCH']   = NeuerHintergrund; break;
      case "MyBG_SPIELE": case "Spiele":TWD['MyBG_SPIELE'] = NeuerHintergrund; break;
      case "MyBG_COMIC" : case "Comic" :TWD['MyBG_COMIC']  = NeuerHintergrund; break;
       default:                         TWD['MyBG_TV']     = NeuerHintergrund; break;
    }
  }

  // Möglichkeit ein DIV-Element zu setzen, dass den Hintergrund überschreibt.
  var WHB = document.getElementById("Wikia-Hintergrund-Bild");
  if (WHB)
    SetBGPic(WHB.getAttribute('data-Bild'), WHB.getAttribute('data-Attachment'));
  else {
    // HINTERGRUNDBILD aus Datensammlung setzen
    switch(SwitchItem) {
      case "MyBG_BUCH": case "Buch":
        SetBGPic(BG_Buch[TWD['MyBG_BUCH']]['Bild'], BG_Buch[TWD['MyBG_BUCH']]['Attachment']);
        break;
      case "MyBG_SPIELE": case "Spiele":
        SetBGPic(BG_Spiele[TWD['MyBG_SPIELE']]['Bild'], BG_Spiele[TWD['MyBG_SPIELE']]['Attachment']);
        break;
      case "MyBG_COMIC": case "Comic":
        SetBGPic(BG_Comic[TWD['MyBG_COMIC']]['Bild'], BG_Comic[TWD['MyBG_COMIC']]['Attachment']);
        break;
      case "MyBG_TV": case "TV": default:
        SetBGPic(BG_TV[TWD['MyBG_TV']]['Bild'], BG_TV[TWD['MyBG_TV']]['Attachment']);
        break;
    }
  }
}

/*********************************************************\
    Funktion liest Cookie aus, schreibt sie in die Variablen
    und ruft Funktionen auf, die das Design ändern.
\*********************************************************/
function liesCookie() {
   var keks = document.cookie;
   if (keks) {
     // Anfangsposition des Name=Wert-Paars suchen
     var posName = keks.indexOf("; TWDSpoiler=");
     if (posName == -1) {
        if (keks.indexOf("TWDSpoiler=") == 0) {
          // Cookie war erster in der Liste
          posName = 0;
        }
        else {
          // Noch kein Cookie gesetzt
          ChangeHintergrund();
          HideHelpingBoxes();
          return false;
        }
     }

     // Anfangs- und Endposition des Krümelwerts suchen
     var wertAnfang = keks.indexOf("=", posName)+1;
     var wertEnde = keks.indexOf(";", posName+1);
     if (wertEnde == -1) wertEnde = keks.length;

     // Krümelwert auslesen und zurückgeben
     var keksinhalt = keks.substring(wertAnfang, wertEnde).split("&");
     var Eigenschaft; var Wert;
     for (var i = 0; i < keksinhalt.length; i++){
       Eigenschaft = keksinhalt[i].split(":")[0];
       Wert        = keksinhalt[i].substring(keksinhalt[i].search(":")+1);
       TWD[Eigenschaft] = Wert;
     }

     // Den gelesenen Keks auch umsetzen
     SetSpoiler();
     ChangeHintergrund();
     HideHelpingBoxes();
  }
  return true;
}

/*********************************************************\
    Funktion für Spoiler-Einstellung (Reiter)
 * setzt Reiter zurück
 * zeigt Reiter und Box an
\*********************************************************/
function ReiterSelect(Reiter){
	var allReiter = document.getElementById('SpoilerEinstellung_Auswahl').getElementsByTagName('div');
    for ( div=0; div<allReiter.length; div++ ) {
      // Alle aktivierten Reiter ausschalten
      if (allReiter[div].className == 'SEReiter' || allReiter[div].className == 'SEReiterBox')
      	allReiter[div].setAttribute('data-selected','false');
      // Herausfinden ob Box angezeigt werden muss
      if (allReiter[div].getAttribute('data-select') == Reiter.getAttribute('data-select'))
      	allReiter[div].setAttribute('data-selected','true');
    }
    ChangeHintergrund(false, Reiter);
    return true;
}

/*********************************************************\
    Funktion für Spoiler-Einstellung (Selector TV-Staffel)
 * Zeigt nur richtige Staffelfolgen
 * verbirgt die anderen
\*********************************************************/
function SwitchStaffel(Wechsel){
	var allSelector = document.getElementById('MyTVShow').parentNode.getElementsByTagName('select');
    for ( sel=0; sel<allSelector.length; sel++ ) {
      // Alle aktivierten Reiter ausschalten
      if (allSelector[sel].getAttribute('data-select') == 'MyTVFolge')
		  allSelector[sel].style.display = 'none';
    }
    if (document.getElementById('MyTVShow').value !='0'){
      document.getElementById('MyTVShow').style.width = '120px';
      document.getElementById('MyTVShow').style.marginRight = '5px';
      if (Wechsel){
        document.getElementById('S'+document.getElementById('MyTVShow').value).selectedIndex = 0;
        TWD['MyTVFolge'] = 1;
	  }
      document.getElementById('S'+document.getElementById('MyTVShow').value).style.display = '';
    }
    else{
      document.getElementById('MyTVShow').style.width = '245px';
      document.getElementById('MyTVShow').style.marginRight = '0';
      TWD['MyTVFolge'] = 0;
    }
    return true;
}

/*********************************************************\
    Funktion öffnet Spoiler-Einstellungen
\*********************************************************/
function openSpoilerEinstellung(Warntext){
	// falls noch alte blackout-Boxen vorhanden sind, werden diese hiermit gelöscht
	if (document.getElementById("blackoutHeader") != null)
		$('#blackoutHeader').remove();
	if (document.getElementById("blackout") != null)
		$('#blackout').remove();

	$('<div id="blackoutHeader">' + SpoilerEinstellungBox + '</div>').appendTo($('header#WikiaPageHeader, #WikiaUserPagesHeader')).css({
                position: 'absolute', top: 0, left: 0, width: '100%', height: '105%', zIndex: 1000, backgroundColor: '#474646', opacity: 0
          });

    // div Box mit Hintergrundfarbe und der Spoiler-Einstellungs Box wird volltransparent über den Artikel gelegt
    var article = $('div#WikiaArticle');
	$('<div id="blackout">' + '</div>').appendTo(article).css({
		position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000, backgroundColor: '#474646', opacity: 0
	  });

	// Abfragen ob es eine Kategorie gibt, wenn ja, dann unsichtbar machen
	if (document.getElementById("WikiaArticleCategories"))
	  document.getElementById("WikiaArticleCategories").style.display = 'none';
	// Abfragen ob es Kommentare gibt, wenn ja, dann unsichtbar machen
	if (document.getElementById("WikiaArticleFooter"))
	  document.getElementById("WikiaArticleFooter").style.display = 'none';
	// div Box wird nun zur vollen Sichtbarkeit (opacity=1.0) in einer halben Sekunde (500) gefahren

	//Setzen der Variablen in die Selektoren
	var allSelect = document.getElementById('SpoilerEinstellung_Auswahl').getElementsByTagName('select');
    for ( sel=0; sel<allSelect.length; sel++ ) {
      // Alle Select Auswahlboxen durchgehen und jede Eigenschaft einzeln mit der jeweiligen Refferenz vergleichen.
      for (obj=0; obj<allSelect[sel].options.length; obj++ ) {
		if (allSelect[sel].options[obj].value == TWD[allSelect[sel].getAttribute('data-select')]){
			allSelect[sel].selectedIndex = obj;
			break;
		}
	  }
    }
    SwitchStaffel(false);

    $('#blackoutHeader').fadeTo(500, 1.0,function () {});
    $('#blackout').fadeTo(500, 1.0,function () {});

	// funktion an Button: schließt Einstellungen, stellt letzte Version wieder her, schreibt Cookie
    $('#close').click(function () {
        $('#SpoilerEinstellung').remove();					// sofortiges Löschen der Box
          if (liesCookie() == false)                        // Cookie zurücksetzen
            SetSpoiler();                                   // Cookie speichern
          ChangeHintergrund();
       	  if (document.getElementById("WikiaArticleCategories"))
			document.getElementById("WikiaArticleCategories").style.display = '';
		  if (document.getElementById("WikiaArticleFooter"))
	  		document.getElementById("WikiaArticleFooter").style.display = '';
        $('#blackoutHeader').fadeOut(500, function () {});	// langsames ausblenden des Header "Schleiers"
        $('#blackout').fadeOut(500, function () {			// langsames ausblenden des grauen "Schleiers"
          $('#blackout').remove();
        });
      });
    // funktion an Button: wie close
    $('#cancel').click(function () {
        $('#dialog').remove();
          if (liesCookie() == false)                        // liest Cookie aus und setzt Spoiler zurück
            SetSpoiler();                                   // Falls keine Cookie, dann wird Spoiler gesetzt
            ChangeHintergrund();
       		if (document.getElementById("WikiaArticleCategories"))
			  document.getElementById("WikiaArticleCategories").style.display = '';
		  	if (document.getElementById("WikiaArticleFooter"))
	  		  document.getElementById("WikiaArticleFooter").style.display = '';
        $('#blackoutHeader').fadeOut(500, function () {});	// langsames ausblenden des Header "Schleiers"
        $('#blackout').fadeOut(500, function () {
          $('#blackout').remove();
        });
      });

	// funktion an Button: schließt Einstellungen, speichert Änderung, schreibt Cookie
	$('#save').click(function () {
        $('#dialog').remove();
          SetSpoiler();
          ChangeHintergrund();
       	  if (document.getElementById("WikiaArticleCategories"))
			document.getElementById("WikiaArticleCategories").style.display = '';
		  if (document.getElementById("WikiaArticleFooter"))
	  		document.getElementById("WikiaArticleFooter").style.display = '';
          schreibCookie();
      $('#blackoutHeader').fadeOut(500, function () {});	// langsames ausblenden des Header "Schleiers"
        $('#blackout').fadeOut(500, function () {
          $('#blackout').remove();
        });
      });
} //Ende openSpoilerEinstellung



if(document.getElementById('DatenbankVersion') != 'null' || wgUserName == "20M61"){
  var DB_VerDIV = document.createElement('div');
      DB_VerDIV.style.backgroundColor = 'green';
      DB_VerDIV.style.padding         = '0 5px 0 0';
      DB_VerDIV.style.textAlign       = 'right';
                document.getElementById('WikiaPage').appendChild(DB_VerDIV);
                DB_VerDIV.appendChild(document.createTextNode('Datenbank Version 1.03d'));
}

/****************************\
   Datenbank zusammentragen

Die Datenbank besteht aus Datensätzen,
die in der Seite eingearbeitet sind
Diese werden im ersten Schritt ausgelesen
und in Arrays umgewandelt.
\****************************/

//Funktion liest Bilder aus und erstellt daraus einen STRING
function GetDataPicture(Element) {
  var ReturnString ='';
  var Bild = Element.getElementsByTagName('a');
  for ( nxtA=0; nxtA<Bild.length; nxtA++ )  {
    ReturnString += Bild[nxtA].innerHTML + '-' + Bild[nxtA].href + ';';
  }
  return ReturnString;
}

// Funktion geht die Nodes hinauf bis entweder ein data-Name gefunden oder der Anfang des Artikels erreicht ist.
function GetParentName(DSNode){
	if (DSNode.id == 'WikiaMainContent')  return false;
	if (DSNode.getAttribute('data-Name')) return DSNode.getAttribute('data-Name');
	return GetParentName(DSNode.parentNode);
}

//Datenbank erstellen
var DB_Name  = new Array(); // Namen eintragen
var DB_Daten = new Array(); // Daten eintragen
var DBID     = 0; var tmpDBName;

var Datensatz = document.getElementById('WikiaMainContent').getElementsByTagName('span');
for ( nxtSPAN=0; nxtSPAN<Datensatz.length; nxtSPAN++ ) {
  // Alle SPAN Elemente durchgehen
  if (Datensatz[nxtSPAN].className == 'Datensatz') {
	tmpDBName = GetParentName(Datensatz[nxtSPAN].parentNode); //damit wird data-Name überflüssig
	if (!tmpDBName) tmpDBName = Datensatz[nxtSPAN].getAttribute('data-Name') //Wenn ElternElement keinen Namen enthält, dann muss KindElement ran
    //Ein Datensatz-Element wurde gefunden
    DB_Name.push(tmpDBName);
    DBID = DB_Name.indexOf(tmpDBName);
    DB_Daten[DBID] = new Object();
    DB_Daten[DBID]['Nickname'] = Datensatz[nxtSPAN].getAttribute('data-Nickname');
    DB_Daten[DBID]['Spoiler']   = Datensatz[nxtSPAN].getAttribute('data-Spoiler');
    DB_Daten[DBID]['Gruppe']    = Datensatz[nxtSPAN].getAttribute('data-Gruppe');
    DB_Daten[DBID]['Typ']       = Datensatz[nxtSPAN].getAttribute('data-Typ');
    DB_Daten[DBID]['Zombie']    = Datensatz[nxtSPAN].getAttribute('data-Zombie');
    DB_Daten[DBID]['Show']      = Datensatz[nxtSPAN].getAttribute('data-Show');
    DB_Daten[DBID]['Bild']      = GetDataPicture(Datensatz[nxtSPAN]);
  }
}

function ShowDataSet(){
  var sdsDS = document.getElementById('WikiaMainContent').getElementsByTagName('div');
  var DB_Bilder;
  for ( nxtDIV=0; nxtDIV<sdsDS.length; nxtDIV++ ) {
    if ( sdsDS[nxtDIV].className == 'ShowDataSet' ) {
      //Tabellenelement erzeugen
      var DB_ID = DB_Name.indexOf(sdsDS[nxtDIV].getAttribute('data-Name'));

      var TableElement = document.createElement('table');
      TableElement.className = 'ShowDatensatz';
      sdsDS[nxtDIV].appendChild(TableElement);

        TabellenTRElement = document.createElement('tr');
        TableElement.appendChild(TabellenTRElement);
          TabellenTDElement = document.createElement('td');
          TabellenTDElement.rowSpan = 2;
          TabellenTDElement.style.width = '102px';
          TabellenTDElement.style.height    = '165px';
          TabellenTDElement.style.position = 'relative';
          TabellenTDElement.style.paddingBottom     = '0';
          TabellenTDElement.style.borderBottomColor = 'transparent';
            TabellenTRElement.appendChild(TabellenTDElement);
            var TabellenDIVElement  = document.createElement('div');
              TabellenDIVElement.style.position = 'absolute';
              TabellenDIVElement.style.bottom   = '0px'; // wegen Padding:0px im TD
              TabellenDIVElement.style.backgroundColor= 'rgba(100, 100, 100, 0.5)';
              TabellenDIVElement.style.textAlign= 'center';
              TabellenDIVElement.style.width    = '102px';
                TabellenTDElement.appendChild(TabellenDIVElement);
                TabellenDIVElement.appendChild(document.createTextNode(DB_Daten[DB_ID]['Bild'].split(';')[0].split('-')[0]));
            var TabellenBildElement = document.createElement('img');
                TabellenBildElement.style.width = '100px';
                TabellenBildElement.style.maxHeight = '150px';
                TabellenBildElement.style.border= '1px solid grey';
                TabellenBildElement.src   = DB_Daten[DB_ID]['Bild'].split(';')[0].slice(DB_Daten[DB_ID]['Bild'].split(';')[0].search("-")+1);
                TabellenTDElement.appendChild(TabellenBildElement);

          TabellenTDElement = document.createElement('td');
            TabellenTDElement.style.verticalAlign  = 'top';
            TabellenTDElement.appendChild(document.createTextNode('Status'));
            TabellenTRElement.appendChild(TabellenTDElement);
          TabellenTDElement = document.createElement('td');
            TabellenTDElement.style.verticalAlign  = 'top';
            TabellenTDElement.appendChild(document.createTextNode(DB_Daten[DB_ID]['Spoiler']));
            TabellenTRElement.appendChild(TabellenTDElement);

        TabellenTRElement = document.createElement('tr');
        TableElement.appendChild(TabellenTRElement);
          TabellenTDElement = document.createElement('td');
            TabellenTDElement.style.verticalAlign  = 'top';
            TabellenTDElement.appendChild(document.createTextNode('Gruppe'));
            TabellenTRElement.appendChild(TabellenTDElement);
          TabellenTDElement = document.createElement('td');
            TabellenTDElement.style.verticalAlign  = 'top';
            TabellenTDElement.appendChild(document.createTextNode(DB_Daten[DB_ID]['Gruppe']));
            TabellenTRElement.appendChild(TabellenTDElement);

        TabellenTRElement = document.createElement('tr');
        TableElement.appendChild(TabellenTRElement);

          TabellenTDElement = document.createElement('td');
            TabellenTDElement.style.verticalAlign  = 'top';
            TabellenTDElement.style.paddingTop     = '0';
            TabellenTDElement.style.borderTopColor = 'transparent';
            TabellenTRElement.appendChild(TabellenTDElement);
            DB_Bilder = DB_Daten[DB_ID]['Bild'].split(';');
            for (var i=0; i < DB_Bilder.length-1; i ++)
            {
                TabellenBildElement = document.createElement('img');
                TabellenBildElement.style.width = '23px';
                TabellenBildElement.style.height = '23px';
                TabellenBildElement.style.border= '1px solid grey';
                TabellenBildElement.alt   = DB_Bilder[i].split('-')[0];
                 TabellenBildElement.src  = DB_Bilder[i].slice(DB_Bilder[i].search("-")+1);
                TabellenBildElement.onmouseover = function(){
                  /*Image-TD-TR-Table-TR-TD-IMAGE0-src */
                  this.parentNode.parentNode.parentNode.firstChild.firstChild.childNodes[1].src = this.src;
                  /*Image-TD-TR-Table-TR-TD-DIV-innerHTML */
                  this.parentNode.parentNode.parentNode.firstChild.firstChild.firstChild.innerHTML = this.alt;
                  this.style.borderColor = 'white';
                };
                TabellenBildElement.onmouseout = function(){
                  this.style.borderColor = 'grey';
                };
                TabellenTDElement.appendChild(TabellenBildElement);
            }
          TabellenTDElement = document.createElement('td');
            TabellenTDElement.style.verticalAlign  = 'top';
            TabellenTDElement.appendChild(document.createTextNode('Zombie'));
            TabellenTRElement.appendChild(TabellenTDElement);
          TabellenTDElement = document.createElement('td');
            TabellenTDElement.style.verticalAlign  = 'top';
            TabellenTDElement.appendChild(document.createTextNode(DB_Daten[DB_ID]['Zombie']));
            TabellenTRElement.appendChild(TabellenTDElement);

      var ShowDIVElement = document.createElement('div');
      ShowDIVElement.style.position = 'absolute';
      ShowDIVElement.style.top      = '-10px';
      ShowDIVElement.style.right    = '-10px';
      ShowDIVElement.style.border   = '1px solid grey';
      ShowDIVElement.style.fontSize = '75%';
      ShowDIVElement.style.padding  = '0 5px 0 5px';
      ShowDIVElement.style.backgroundColor = '#474646';
      ShowDIVElement.style.fontSize = '75%';
      sdsDS[nxtDIV].style.position  = 'relative';
      sdsDS[nxtDIV].style.maxWidth  = '95%';
      sdsDS[nxtDIV].appendChild(ShowDIVElement);
      ShowDIVElement.appendChild(document.createTextNode(DB_Daten[DB_ID]['Show']));
    }
  }
}
ShowDataSet();

function SpoilerStart(){
  /*********************************************************\
      Button 'Spoiler Einstellungen' setzen
  \*********************************************************/
  //In Position suchen wir ein geeignetes Element, hinter oder vor dem wir unseren Button platzieren
  var Position = document.getElementById('WikiaPageHeader');
  //Ausgangspunkt ist die Überschrift (unzwar der gesamte Bereich inkl. Artikel-Titel, Bearbeiten, Zähler ...)
  //Da nicht jede Seite sowas hat (z.B. Profilseiten) muss man überprüfen ob es möglich ist
  if (Position && HTMLAgument['action'] != 'edit' && wgPageName.search("Spezial") < 0 ) {
    // Nun werden alle Elemente innerhalb der Überschrift durchgegangen (wie gesagt ... gibt mehr als nur den Titel des Artikels
    for ( anz=0; anz<Position.childNodes.length; anz++ ) {
      // Wir suchen den 'Kommentar'-Button, denn VOR diesem wollen wir unseren Button einfügen, damit er hinter dem Bearbeiten-Button liegt.
      if (Position.childNodes[anz].className == 'wikia-button comments secondary' ||
          Position.childNodes[anz].className == 'wikia-button comments secondary talk') {
        // Jetzt fügen wir den eigentlichen Button ein:
        var ButtonElement    = document.createElement('a');  //Erzeugt ein LINK-Element
        var ButtonTxt        = document.createTextNode('Einstellungen'); //Text des Buttons
        ButtonElement.appendChild(ButtonTxt); //Hier wird dem Button sein Text zugewiesen

        ButtonElement.className    = 'TWD-Button'; // der Button bekommt eine Klasse (dort bestimmen wir das Aussehen)
        ButtonElement.href         = '#';
        ButtonElement.id           = 'TWDEinstellungen'; // eine ID, damit wir den Button schneller ansprechen können, wenn wirs brauchen.
        ButtonElement.title        = 'Einstellungen';
        ButtonElement.style.margin = '2px 0px 0px 7px'; // Die Margin-Werte haben sich als nützlich erwiesen - könnten aber auch in der Klasse definiert werden.
        ButtonElement.onclick      = function(){ openSpoilerEinstellung(); }; //Funktion, wenn man den Button drückt.
        Position.insertBefore(ButtonElement, Position.childNodes[anz+1]); //Jetzt ist der Button fertig und kann VOR dem Kommentarknopf eingesetzt werden
        break; //Wir sind fertig und brechen die FOR-Schleife ab, denn wir wollen nur 1 Button setzen.
      }
    }
  }

  if (!liesCookie()) openSpoilerEinstellung();
}
addOnloadHook(SpoilerStart);
}