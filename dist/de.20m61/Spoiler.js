if (wgUserName == "20M61") {
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
  TWD['MyTVShow']        = 1; // TV-Serie
  TWD['MyTVFolge']       = 0;
  TWD['MyWebS1']         = 1; // Webisode
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
    Funktion ermittelt ob dieses Objekt angezeigt werden soll oder nicht
 * Rückgabewert TRUE, wenn persönlicher Spoiler außerhalb der VON BIS-Spoiler liegt
 * Benötigt data-FolgeZeigenVon, data-Show, data-FolgeZeigenBis (optional),
\*********************************************************/
function AmISpoiled(HTML_Element){
	var Von = HTML_Element.getAttribute('data-FolgeZeigenVon');
	if(! Von) Von = 0;
	var Bis = HTML_Element.getAttribute('data-FolgeZeigenBis');
	if(! Bis) Bis = 9999;
	var Show = HTML_Element.getAttribute('data-Show');
	if(! Show) Show = 'TV';
	var MySpoilerStand = GetMyShowStatus(Show);

    if (MySpoilerStand < Von || MySpoilerStand > Bis)
		return true;
    else
    	return false
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
			SpoilerEinstellung("Diese Seite enthält Informationen, die erst in späteren Folgen gezeigt werden. "
							  +"Falls du den Inhalt dennoch sehen möchtest, so ändere bitte deine Spoiler-Einstellungen",
								SpoilerMinArtikel.getAttribute('data-FolgeZeigenVon'));
	      	return false;
		}
	}

	// SPAN-Elemente (verstecken, zeigen)
	var SpanElement = document.getElementsByTagName("span");
	for (sid=0; sid<SpanElement.length; sid++ ){
		// Hat das Element kein FolgeZeigenVon, dann ist es kein Spoilerteil
		if (! SpanElement.getAttribute('data-FolgeZeigenVon')) continue;
		// Wenn von SPAN-Element gespoilert, dann nicht anzeigen.
		if (AmISpoiled(SpanElement[sid]))
			SpanElement[sid].style.display = "none";
		else
			SpanElement[sid].style.display = "";
  	}

  	// TD-Elemente (unsichtbar, sichtbar)
  	var TabellenElement = document.getElementsByTagName("td");
	for ( tid=0; tid<TabellenElement.length; tid++ ){
		// Hat das Element kein FolgeZeigenVon, dann ist es kein Spoilerteil
		if (! TabellenElement.getAttribute('data-FolgeZeigenVon')) continue;
		// Tabellen-TD-Elemente werden unsichtbar gemacht
		// (Bei Display "none" würden sie die Tabelle zerwürfeln)
		if (AmISpoiled(TabellenElement[tid]))
			TabellenElement[tid].style.opacity = 0;
		else
			TabellenElement[tid].style.opacity = 1;
	}

	// TR-Elemente (verstecken, zeigen)
  	TabellenElement = document.getElementsByTagName("tr");
	for ( tid=0; tid<TabellenElement.length; tid++ ){
		// Hat das Element kein FolgeZeigenVon, dann ist es kein Spoilerteil
		if (! TabellenElement.getAttribute('data-FolgeZeigenVon')) continue;
		// Tabellen-TR-Elemente werden gelöscht (ganze Zeile weg)
		if (AmISpoiled(TabellenElement[tid]))
			TabellenElement[tid].style.display = "none";
		else
			TabellenElement[tid].style.display = "";
	}

	// DIV-Elemente (verstecken, zeigen)
  	DivElement = document.getElementsByTagName("tr");
	for ( did=0; did<DivElement.length; did++ ){
		// Hat das Element kein FolgeZeigenVon, dann ist es kein Spoilerteil
		if (! DivElement.getAttribute('data-FolgeZeigenVon')) continue;
		// Tabellen-TR-Elemente werden gelöscht (ganze Zeile weg)
		if (AmISpoiled(DivElement[did]))
			DivElement[did].style.display = "none";
		else
			DivElement[did].style.display = "";
	}
} //ENDE funktion SetSpoiler

/*********************************************************\
    Funktion löst Zeitproblem von schreibCookie()
\*********************************************************/
function fixedGMTString(datum)
{
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
   var verfall = new Date(jetzt.getTime() + 1000*60*60*24*365);
   neuerKeks += "; expires=" + fixedGMTString(verfall);
   neuerKeks += "; path=/"
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
       Eigenschaft = keksinhalt.split(":")[0];
       Wert        = keksinhalt.substring(keksinhalt.search(":")+1)
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
function ChangeHintergrund(NeuerHintergrund) {
  if (NeuerHintergrund) {
    switch(wgCanonicalNamespace) {
      case "Buch":   TWD['MyBG_BUCH']   = NeuerHintergrund; break;
      case "Spiele": TWD['MyBG_SPIELE'] = NeuerHintergrund; break;
      case "Comic":  TWD['MyBG_COMIC']  = NeuerHintergrund; break;
      default:       TWD['MyBG_TV']     = NeuerHintergrund; break;
    }
  }

  // Möglichkeit ein DIV-Element zu setzen, dass den Hintergrund überschreibt.
  var WHB = document.getElementById("Wikia-Hintergrund-Bild");
  if (WHB)
    SetBGPic(WHB.getAttribute('data-Bild'), WHB.getAttribute('data-Attachment'));
  else {
    // HINTERGRUNDBILD aus Datensammlung setzen
    switch(wgCanonicalNamespace) {
      case "Buch":
        SetBGPic(BG_Buch[TWD['MyBG_BUCH']]['Bild'], BG_Buch[TWD['MyBG_BUCH']]['Attachment']);
        break;
      case "Spiele":
        SetBGPic(BG_Spiele[TWD['MyBG_BUCH']]['Bild'], BG_Spiele[TWD['MyBG_BUCH']]['Attachment']);
        break;
      case "Comic":
        SetBGPic(BG_Comic[TWD['MyBG_BUCH']]['Bild'], BG_Comic[TWD['MyBG_BUCH']]['Attachment']);
        break;
      case "TV": default:
        SetBGPic(BG_TV[TWD['MyBG_BUCH']]['Bild'], BG_TV[TWD['MyBG_BUCH']]['Attachment']);
        break;
    }
  }
}

/*********************************************************\
    Funktion ermittelt aus Show den User-Wert
\*********************************************************/
function GetMyShowStatus(Show){
  var MySpoilerStand = "000";
  switch(Show)
  {
    default: case "TV":
      MySpoilerStand = (TWD['MyTVShow']*100 + TWD['MyTVFolge']*1);
      break;
    case "WEB":
      MySpoilerStand = (TWD['MyWebShow']*100 + TWD['MyWebShow']*1);
      break;
    case "DR":
      MySpoilerStand = TWD['MyGameDREpisode'];
      break;
    case "TT":
      MySpoilerStand = TWD['MyGameTTEpisode'];
      break;
    case "SG":
      MySpoilerStand = TWD['MyGameSGEpisode'];
      break;
    case "SI":
      MySpoilerStand = TWD['MyGameSIEpisode'];
      break;
    case "Comic":
      MySpoilerStand = TWD['MyComic'];
      break;
    case "Buch": case "Roman":
      MySpoilerStand = TWD['MyBook'];
      break;
  } //Ende switch-Weiche
  return MySpoilerStand;
} //Ende Funktion GetMyShowStatus

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
      	allReiter[div].setAttribute('data-selected','false')
      // Herausfinden ob Box angezeigt werden muss
      if (allReiter[div].getAttribute('data-select') == Reiter.getAttribute('data-select'))
      	allReiter[div].setAttribute('data-selected','true')
    }
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
      if (Wechsel) 
        document.getElementById('S'+document.getElementById('MyTVShow').value).selectedIndex = 0;
      document.getElementById('S'+document.getElementById('MyTVShow').value).style.display = '';
    }
    else{
      document.getElementById('MyTVShow').style.width = '245px';
      document.getElementById('MyTVShow').style.marginRight = '0';
    }
    return true;
}

/*********************************************************\
    Funktion öffnet Spoiler-Einstellungen
\*********************************************************/
function openSpoilerEinstellung(){
	// falls noch alte blackout-Boxen vorhanden sind, werden diese hiermit gelöscht
	if (document.getElementById("blackoutHeader") != null)
		$('#blackoutHeader').remove();
	if (document.getElementById("blackout") != null)
		$('#blackout').remove();

	$('<div id="blackoutHeader">' + SpoilerEinstellungBox + '</div>').appendTo($('header#WikiaPageHeader')).css({
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
        $('#blackoutHeader').fadeOut(500, function () {});	// langsames ausblenden des Header "Schleiers"
        $('#blackout').fadeOut(500, function () {			// langsames ausblenden des grauen "Schleiers"
          $('#blackout').remove();
          if (liesCookie() == false)                        // Cookie zurücksetzen
            SetSpoiler();                                   // Cookie speichern
       	  if (document.getElementById("WikiaArticleCategories"))
			document.getElementById("WikiaArticleCategories").style.display = '';
		  if (document.getElementById("WikiaArticleFooter"))
	  		document.getElementById("WikiaArticleFooter").style.display = '';
        });
      });
    // funktion an Button: wie close
    $('#cancel').click(function () {
        $('#dialog').remove();
        $('#blackoutHeader').fadeOut(500, function () {});	// langsames ausblenden des Header "Schleiers"
        $('#blackout').fadeOut(500, function () {
          $('#blackout').remove();
          if (liesCookie() == false)                        // liest Cookie aus und setzt Spoiler zurück
            SetSpoiler();                                   // Falls keine Cookie, dann wird Spoiler gesetzt
       		if (document.getElementById("WikiaArticleCategories"))
			  document.getElementById("WikiaArticleCategories").style.display = '';
		  	if (document.getElementById("WikiaArticleFooter"))
	  		  document.getElementById("WikiaArticleFooter").style.display = '';
        });
      });

	// funktion an Button: schließt Einstellungen, speichert Änderung, schreibt Cookie
	$('#save').click(function () {
        $('#dialog').remove();
        $('#blackoutHeader').fadeOut(500, function () {});	// langsames ausblenden des Header "Schleiers"
        $('#blackout').fadeOut(500, function () {
          $('#blackout').remove();
          SetSpoiler();
       	  if (document.getElementById("WikiaArticleCategories"))
			document.getElementById("WikiaArticleCategories").style.display = '';
		  if (document.getElementById("WikiaArticleFooter"))
	  		document.getElementById("WikiaArticleFooter").style.display = '';
        });
        schreibCookie();
      });
} //Ende openSpoilerEinstellung

/*********************************************************\
    Funktion für MINIBOX
 * spürt alle MiniBoxen in einem Artikel auf
 * setzt Spoiler (verbirgt MiniBoxen für den User)
 * fragt und setzt Inhalt aus JS-Datenbank
\*********************************************************/
function MiniBox(){
  var MyMiniBild;
  var MyMiniStatus = 'unbekannt';
  // Alle MiniBoxen durchlaufen
  var MiniBox = document.getElementsByTagName('div');
  for (var i = 0; i < MiniBox.length; i++){

    // Wenn MiniBox gefunden, dann arbeiten
    if(MiniBox[i].className == "MiniBox"){

      // Datensatz auswählen
      var DB_ID = DB_Name.indexOf(MiniBox[i].getAttribute('data-Name'));
      if(DB_ID < 0 && wgUserName == "20M61")
        alert('Datensatz "'+MiniBox[i].getAttribute('data-Name')+'" wurde nicht gefunden. - Fehler in Spoiler.js:function MiniBox()');

      if (AmISpoiled(MiniBox[i])){
        // MiniBox ausblenden, wenn außerhalb meines Spoilers
        MiniBox[i].style.display = 'none';
      } else {
        // MiniBox anzeigen (könnte ja ausgeblendet sein)
		MiniBox[i].style.display = '';

        //aktuellen Status auslesen
	    var MyMiniStatus = 'unbekannt';
	    var tmpSpoilerDS = DB_Daten[DB_ID]['Spoiler'];
		for (var n=0; n < tmpSpoilerDS.length; n++) {
	      if (tmpSpoilerDS[n].split('-')[0] > MySpoilerStand)
	        break;
	      //Slice unterstützt alle Zeichen bis ";"
	      MyMiniStatus = tmpSpoilerDS[n].slice(tmpSpoilerDS[n].search("-")+1);
	    } //Ende For-Schleife
        MiniBox[i].className = "MiniBox "+MyMiniStatus;

		//aktuelles Bild auslesen
		var tmpBildDS = DB_Daten[DB_ID]['Bild'].split(';');
		for (var n=0; n < tmpBildDS.length-1; n++) {
	      if (tmpBildDS[n].split('-')[0] > MySpoilerStand)
	        break;
	      MyMiniBild = tmpBildDS[n].slice(tmpBildDS[n].search("-")+1);
	    } //Ende For-Schleife
		MiniBox[i].getElementsByTagName('img')[0].src = MyMiniBild;
      } //Ende Bedingung


      // Überschrift festlegen
      switch(DB_Daten[DB_ID]['Typ'])
      {
        case "Gruppe":
          MiniBox[i].setAttribute('data-headline', 'Gruppe');
          break;
        case "Gegenstand":
          MiniBox[i].setAttribute('data-headline', 'Gegenstand');
          break;
        case "Charakter":
          MiniBox[i].setAttribute('data-headline', MyMiniStatus);
          break;
        case "Ort":
          MiniBox[i].setAttribute('data-headline', 'Ort');
          break;
        case "Waffe":
          MiniBox[i].setAttribute('data-headline', 'Waffe');
          break;
        case "Ausrüstung":
          MiniBox[i].setAttribute('data-headline', 'Ausrüstung');
          break;
        case "Folterwerkzeug":
          MiniBox[i].setAttribute('data-headline', 'Folterwerkzeug');
          break;
        case "Granate":
          MiniBox[i].setAttribute('data-headline', 'Granate');
          break;
        case "Maschine":
          MiniBox[i].setAttribute('data-headline', 'Maschine');
          break;
        case "Award":
          MiniBox[i].setAttribute('data-headline', 'Award');
          break;
        case "Serie":
          MiniBox[i].setAttribute('data-headline', 'Serie');
          break;
        case "Mitwirkende":
          MiniBox[i].setAttribute('data-headline', 'Mitwirkender');
          break;
        default:
          //Kein Status
          MiniBox[i].removeAttribute('data-headline');
          break;
      } //Ende switch-Weiche
    } //Ende if-Bedingung
  } //Ende for-Schleife
  return true;
}//Ende Funktion MiniBox

/*********************************************************\
    Button 'Einstellungen' setzen
\*********************************************************/
//In Position suchen wir ein geeignetes Element, hinter oder vor dem wir unseren Button platzieren
var Position = document.getElementById('WikiaPageHeader');
//Ausgangspunkt ist die Überschrift (unzwar der gesamte Bereich inkl. Artikel-Titel, Bearbeiten, Zähler ...)
//Da nicht jede Seite sowas hat (z.B. Profilseiten) muss man überprüfen ob es möglich ist
if (Position != null) {
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
      ButtonElement.href         = '#'
      ButtonElement.id           = 'TWDEinstellungen'; // eine ID, damit wir den Button schneller ansprechen können, wenn wirs brauchen.
      ButtonElement.title        = 'Einstellungen';
      ButtonElement.style.margin = '2px 0px 0px 7px'; // Die Margin-Werte haben sich als nützlich erwiesen - könnten aber auch in der Klasse definiert werden.
      ButtonElement.onclick      = function(){ openSpoilerEinstellung(); }; //Funktion, wenn man den Button drückt.
      Position.insertBefore(ButtonElement, Position.childNodes[anz+1]); //Jetzt ist der Button fertig und kann VOR dem Kommentarknopf eingesetzt werden
      break; //Wir sind fertig und brechen die FOR-Schleife ab, denn wir wollen nur 1 Button setzen.
    }
  }
}

} // Filter 20M61