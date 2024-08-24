/*********************************************************\
  Bewertungssystem
  Dieses JavaScript ermöglicht es einfache Abstimmungen
  innerhalb des Wikia durchzuführen. Der User kann mit einem
  Klick auf ein Item oder Text eine vordefinierte Wertung abgeben

  (c) 2015-2016 - 20M61 (TWD-Wikia)
  Idee: http://de.community.wikia.com/wiki/Diskussionsfaden:64256
\*********************************************************/

/* JSON Unterstützung um Wikia-Seiten auszulesen */
function apiReq(q, fn) {q.format='json'; return $.ajax({ async:false, type:'POST', url:''+wgScriptPath+'/api.php', data:q, success:fn, dataType:'json', }); }
function getToken(page, fn) {apiReq({ action: 'query',query: 'prop',prop: 'info',titles: page,intoken: 'edit' }, function(q){ for( var k in q.query.pages )return fn(q.query.pages[k]); }); }

/* Hauptfunktion: Liest Bewertungen der Unterseite /Bewertung und ergänzt sie um die Wertung des Users */
function SetBewertung(ListenElement){
  //Es wird das ListenElement übergeben, auf das geklickt wurde
  var Wert        = ListenElement.getAttribute("data-Wert"); // Dieses Listenelement hat einen Wert (Punkte oder vergleichbares)
  var Artikel     = ListenElement.parentNode.getAttribute("data-Artikel");
  var Name        = ListenElement.parentNode.getAttribute("data-Name");
  var BewertungID = ListenElement.parentNode.getAttribute("data-BewertungID");
  // Kompatibilität mit älteren Browsern herstellen, obwohl unnötig, da auch HTML5 und CSS3 verwendet werden, was es damals nicht gab
  var xmlhttp;
  // Codeweiche IE6/7 zu den restlichen Browsern
  if (window.XMLHttpRequest){ xmlhttp=new XMLHttpRequest(); }
                       else { xmlhttp=new ActiveXObject("Microsoft.XMLHTTP"); }
  // Wenn Ajax die Seite eingelesen hat, dann gibt es zwei Möglichkeiten
  xmlhttp.onreadystatechange=function()  {
    // Erstens: Die Seite existiert nicht. Dann wird sie angelegt und mit den übergebenen Werten gefüllt
    if (xmlhttp.readyState==4 && (xmlhttp.status==404 || xmlhttp.status==410)) {
          NeueBewertung = "<noinclude>{{Bewertung/Hinweis}}</noinclude> {{#switch: {{{Name}}}\n";
          NeueBewertung += "  |"+Name+" = {{#switch: {{{Zeige|}}} |Wert = "+Wert+" |Anzahl = 1 |Durchschnitt = "+Wert+"}}\n"
          NeueBewertung += "}}<noinclude>\n";
          NeueBewertung += "{{Bewertung/Darstellung|Name="+Name+"|Inhalt=\n"
          NeueBewertung += "{{Bewertung/User|"+wgUserName+"|"+Wert+"}}\n";
          NeueBewertung += "}}</noinclude>";
          AjaxWritePage(NeueBewertung, ListenElement);
          Wertungsbreite = ListenElement.parentNode.offsetWidth
                           - (ListenElement.parentNode.offsetWidth * Wert
                           / (ListenElement.parentNode.getElementsByTagName('li').length-2));
          ListenElement.parentNode.setAttribute("data-Durchschnitt",Wert);
          ListenElement.parentNode.childNodes[1].style.width = Wertungsbreite+"px";
          ListenElement.parentNode.childNodes[0].textContent = "Bewertet mit "+ Wert;
          ListenElement.parentNode.childNodes[0].style.backgroundColor= ""; // Standardfarbe herstellen für Schutz (grün)
          Keksdose(BewertungID, Wert);
        }
    // Zweitens: Die Seite existiert, dann wird die Angabe vom User ergänzt
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      var Ajax = xmlhttp.responseText;              // Sichern, was auf der Ajax-geladenen-Seite steht
      if (!Ajax) {ajaxWert = 0; ajaxAnzahl = 0;}    // Falls jemand die Seite geleert hat, springen Standardwerte ein.
      else if(Ajax.search(Name) < 0) {ajaxWert = 0; ajaxAnzahl = 0;} // Für die ausgewählte Bewertung wurde noch nichts eingeschrieben.
      else {
        // Normalfall: Auslesen welche Werte bislang gesetzt wurden (erste Zeile)
        ajaxWert   = Ajax.substring(Ajax.search(Name) + Name.length);       // Auswählen der richtigen Zeile
        ajaxWert   = ajaxWert.substring(ajaxWert.search("Wert = ")+7);      // Der erste "Wert=" enthält alle Bewertungen summiert
        ajaxWert   = ajaxWert.substring(0, ajaxWert.search(/\u007C/));      // (Der Wert muss aus dem String ausgeschnitten werden)
        ajaxAnzahl = Ajax.substring(Ajax.search(Name) + Name.length);       // Auswählen der richtigen Zeile
        ajaxAnzahl = ajaxAnzahl.substring(ajaxAnzahl.search("Anzahl = ")+9);            // In Anzahl werden alle Bewerter gezählt
        ajaxAnzahl = ajaxAnzahl.substring(0, ajaxAnzahl.search(/\u007C/));  // (Auch die Zahl muss aus dem String geschnitten werden)
      }

      ajaxWert   = ajaxWert*1 + Wert*1;         // Den Wert des Users zu den anderen addieren
      ajaxAnzahl = ajaxAnzahl*1 + 1;            // Den Benutzer zu den anderen Benutzern dazu zählen
      ajaxDurchschnitt = ajaxWert / ajaxAnzahl; // Durchschnitt berechnen: Wert aller User / Anzahl User

      //Zusammenstellen der Nachweisseite (/Bewertung)
      NeueBewertung = Ajax.substring(0, Ajax.search(/\n/g)+1); //Speichern der ersten Zeile ("{{#switch: {{{Name}}}\n")
      RestAjax      = Ajax.substring(Ajax.search(/\n/g)+1); //Hier wird der noch zu verarbeitende Rest gespeichert.
      if(RestAjax.search(Name) < 0){
          //Wenn das die erste Bewertung ist, dann muss sie komplett angelegt werden
          NeueBewertung += "  |"+Name+" = {{#switch: {{{Zeige|}}} |Wert = "+ajaxWert+" |Anzahl = 1 |Durchschnitt = "+ajaxWert+"}}\n";
      } else {
          //Wenn es schon eine Bewertung gibt, dann müssen wir bis dahin rein schneiden:
          NeueBewertung += RestAjax.substring(0, RestAjax.search(Name)+Name.length);
          NeueBewertung += " = {{#switch: {{{Zeige|}}} |Wert = "+ajaxWert+" |Anzahl = "+ajaxAnzahl+" |Durchschnitt = "+ajaxDurchschnitt+"}}\n";
          RestAjax      = RestAjax.substring(RestAjax.search(Name));
          RestAjax      = RestAjax.substring(RestAjax.search(/\n/g)+1);
      }
      NeueBewertung += RestAjax.substring(0, RestAjax.search("<noinclude>"));
      RestAjax       = RestAjax.substring(RestAjax.search("<noinclude>"));
      //Hier wäre das Speichermodul beendet - nun kommt die Kür: Darstellung der Ergebnisse

      if(RestAjax.search(Name) < 0){
          //Dies ist die erste Bewertung von {{{Name}}}
          NeueBewertung += RestAjax.substring(0, RestAjax.search("</noinclude>"));
          NeueBewertung += "\n{{Bewertung/Darstellung|Name="+Name+"|Inhalt=\n"
          NeueBewertung += "{{Bewertung/User|"+wgUserName+"|"+Wert+"}}\n";
          NeueBewertung += "}}</noinclude>";
      } else {
          NeueBewertung += RestAjax.substring(0, RestAjax.search(Name));
          RestAjax       = RestAjax.substring(RestAjax.search(Name));
          NeueBewertung += RestAjax.substring(0, RestAjax.search(/\n/g)+1);
          RestAjax       = RestAjax.substring(RestAjax.search(/\n/g)+1);
          NeueBewertung += "{{Bewertung/User|"+wgUserName+"|"+Wert+"}}\n";
          NeueBewertung += RestAjax;
      }
      AjaxWritePage(NeueBewertung, ListenElement);   // Hier wird die Seite geschrieben
      Wertungsbreite = ListenElement.parentNode.offsetWidth
                       - (ListenElement.parentNode.offsetWidth * ajaxDurchschnitt
                       / (ListenElement.parentNode.getElementsByTagName('li').length-2)); //Berechnen wie breit ein Icon ist * Durchschnitt
      ListenElement.parentNode.setAttribute("data-Durchschnitt",ajaxDurchschnitt); // Durchschnitt in die UL-Liste schreiben (kein Nutzen)
      ListenElement.parentNode.childNodes[1].style.width = Wertungsbreite+"px"; // Breite des ausgeblendeten Bereichs für Icons setzen
      ListenElement.parentNode.childNodes[0].textContent = "Bewertet mit "+ Wert; // Info für Benutzer, was er gewählt hat.
          ListenElement.parentNode.childNodes[0].style.backgroundColor= ""; // Standardfarbe herstellen für Schutz (grün)
      Keksdose(BewertungID, Wert); // Cookie setzen, damit er nicht nochmal bewerten kann + sich erinnert, was er bewertet hat
    }
  }
  ListenElement.parentNode.classList.add("bewertet"); // diese Bewertung als "bewertet" markieren (löst einige CSS-Funktionen aus)
  ListenElement.parentNode.childNodes[0].textContent = "Bitte warten..."; // Info für Benutzer, was er gewählt hat.
  ListenElement.parentNode.childNodes[0].style.backgroundColor= "#04075A"; // Schutz bekommt andere Farbe um "Warten" deutlich zu machen.
  // Ajax-Seite auslesen. Es ist die Seite, auf die später die Bewertung eingetragen wird (Artikel/Bewertung)
  var wiki_url = location.href;
      wiki_url = wiki_url.slice(0, (wiki_url.search(".wikia.com/wiki/")*1+16));
      wiki_url += wgPageName.replace(' ', '_'); // Falls der Name Leerzeichen enthält, werden diese durch Unterstriche ersetzt
      wiki_url += "/Bewertung?action=raw"; //action=raw gibt den vollen Seiteninhalt inkl. NOINCLUDE
  //Ajax-Anfrage senden
  xmlhttp.open("POST", wiki_url, true);
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xmlhttp.send("");
}

/* Hilfsfunktion, welche die Bewertung schreibt (also reines Ajax-Schreiben eines Artikels) */
function AjaxWritePage(Bewertung, ListenElement) {
  var p;
  var Wert    = ListenElement.getAttribute("data-Wert"); // Dieses Listenelement hat einen Wert (Punkte oder vergleichbares)
  var Artikel = ListenElement.parentNode.getAttribute("data-Artikel");
  var Name    = ListenElement.parentNode.getAttribute("data-Name");
  getToken(Artikel+"/Bewertung", function(x){ p = x; }); //vordefinierter Name /Bewertung - Funktion gibt ein "Wikia-Token"

  apiReq({
    action:  'edit',
    title:   Artikel+"/Bewertung",       // Seitenname
    text:    Bewertung,                     // Neuer Seiteninhalt
    token:   p.edittoken,                   // Hier wird das Wikia-Token von vorher benötigt, da Wikia sonst nicht reagiert (Antispam)
    summary: wgUserName + " bewertet "+Name+" mit "+Wert+".", //Zusammenfassung, die später auch in der Historie angezeigt wird
    minor:   true,
  });

  var xmlhttp;
  if (window.XMLHttpRequest){ xmlhttp=new XMLHttpRequest(); }
                       else { xmlhttp=new ActiveXObject("Microsoft.XMLHTTP"); }
  xmlhttp.onreadystatechange=function()  { }
  var wiki_url = location.href;
    wiki_url = wiki_url.slice(0, (wiki_url.search(".wikia.com/wiki/")*1+16));
    wiki_url += wgPageName.replace(' ', '_'); // Falls der Name Leerzeichen enthält, werden diese durch Unterstriche ersetzt
    wiki_url += "?action=purge"; //action=raw gibt den vollen Seiteninhalt inkl. NOINCLUDE
  //Ajax-Anfrage senden
  xmlhttp.open("POST", wiki_url, true);
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xmlhttp.send("");
}

/* Hilfsfunktion überprüft ob ein Wert eine Zahl ist */
function isNumeric(n) { return !isNaN(parseFloat(n)) && isFinite(n); }

/* Hilfsfunktion löst ein Zeitproblem bei Cookies */
function fixedGMTString(datum){
   var damals=new Date(1970,0,1,12);
   if (damals.toGMTString().indexOf("02")>0)
      datum.setTime(datum.getTime()-1000*60*60*24);
   return datum.toGMTString();
}

/* Cookie-Funktion verwaltet das Bewertungs-Cookie, welches dafür sorgt, dass User nicht doppelt bewerten */
function Keksdose(DieseUmfrage, neuerWert) {
   var keks = document.cookie; // Cookie-auslesen (alle Cookies)
   if (keks) { // Wenn keine Cookies existieren, hat der User diese Funktion deaktiviert
    var keinKeks = false; // Hilfsvariable um heraus zu finden, ob das erste Element gesetzt wird
    // Anfangsposition des Name=Wert-Paars suchen
    var posName = keks.indexOf("; Bewertung=");
    if (posName == -1) {
        if (keks.indexOf("Bewertung=") == 0) {
          // Cookie war erster in der Liste
          posName = 0;
        }
        else {
          // Noch kein Cookie gesetzt
          keinKeks = true;
        }
    }

    // Anfangs- und Endposition des Krümelwerts suchen
    var wertAnfang = keks.indexOf("=", posName)+1;
    var wertEnde = keks.indexOf(";", posName+1);
    if (wertEnde == -1) wertEnde = keks.length;

    // Krümelwert auslesen und zurückgeben
    var keksinhalt = keks.substring(wertAnfang, wertEnde).split("&");
    var ArtikelBewertung=""; var KompletterKeks; var Eigenschaft; var Wert;
    KompletterKeks = 'Bewertung='; //Während der Cookie ausgelesen wird, werden alle nicht benötigten Variablen zurück geschrieben
    if (keinKeks !== true){ // Sollte Cookie nicht existieren, wird der folgende Bereich übersprungen, da sonst Müll drin landet
        for (var i = 0; i < keksinhalt.length; i++){
            //Separator ist ":" alles davor ist eine Variable, danach der Wert
            Eigenschaft = keksinhalt[i].split(":")[0];
            //Damit der Separator (":") auch im Wert auftauchen darf, diese Funktion
            Wert        = keksinhalt[i].substring(keksinhalt[i].search(":")+1);
            if(Eigenschaft == DieseUmfrage) // Wenn der Artikel schon bewertet wurde, wird er übersprungen (= ans Ende des Cookies gesetzt)
              ArtikelBewertung = Wert; // Der Wert wird gesichert, um ihn dem User anzuzeigen
            else
              KompletterKeks += Eigenschaft + ":" + Wert + "&"; // Alle anderen Werte des Cookies werden zurück geschrieben
        }
    }
    if (neuerWert)  { ArtikelBewertung = neuerWert; } // Wurde ein Wert übergeben, der in den Cookie soll, so wird er hier aufgenommen
    KompletterKeks += DieseUmfrage+":"+ArtikelBewertung; // Der Wert des Artikels kommt an die letzte Stelle
    // Schreiben des Cookies
    var jetzt = new Date();
    var verfall = new Date(jetzt.getTime() + 1000*60*60*24*365); // 1 Jahr Cookiezeit
    KompletterKeks += "; expires=" + fixedGMTString(verfall);
    KompletterKeks += "; path=/";
    document.cookie = KompletterKeks;
  }
  return ArtikelBewertung; // Der Wert vom User wird zurück gegeben
}

/* Hauptroutine: Dieses Skript durchsucht die Seite nach ul-Listen mit der Klasse "Bewertung"
   wird eine gefunden, so erhält jedes li-Element eine onClick-Funktion.
   Außerdem werden zwei Listenelemente ergänzt: Schutz und Wertung.
   Während Schutz dafür sorgt, dass nicht versehentlich doppelt abgestimmt wird, zeigt Wertung den Durchschnitt an. */
var Bewertung = document.getElementsByTagName('ul');
var Bewertung_count = 0
for (var i=0; i<Bewertung.length; i++) {
    if(Bewertung[i].classList.contains('Bewertung')) {
        Bewertung_count ++;
        var Bewertung_Artikel = Bewertung[i].getAttribute("data-Artikel");
        var Bewertung_Name = Bewertung[i].getAttribute("data-Name");
        if (!Bewertung_Name) {
            Bewertung_Name = "Unbenannt_"+Bewertung_count;
            Bewertung[i].setAttribute("data-Name", Bewertung_Name);
        }
        BewertungID = Bewertung_Artikel + "_" + Bewertung_Name;
        Bewertung[i].setAttribute("data-BewertungID", BewertungID);
        var BewertungStars = Bewertung[i].getElementsByTagName('li');
        for (var j=0; j < BewertungStars.length; j++){
            BewertungStars[j].onclick = function(){ SetBewertung(this); };
        }
        Wertung = document.createElement("li");
        Wertung.className = "Wertung";
        var Bewertungsbreite = Bewertung[i].offsetWidth / (BewertungStars.length);
        Wertung.style.width = '0';
        if (isNumeric(Bewertung[i].getAttribute("data-Durchschnitt")))
            Wertung.style.width = (Bewertung[i].offsetWidth - (Bewertungsbreite * Bewertung[i].getAttribute("data-Durchschnitt")))+"px";
        Bewertung[i].insertBefore(Wertung, Bewertung[i].childNodes[0]);
        Schutz = document.createElement("li");
        Schutz.className = "Schutz";
        Schutz.style.lineHeight = Bewertung[i].offsetHeight + "px"; //Zentriert Hinweistext
        Bewertung[i].insertBefore(Schutz, Bewertung[i].childNodes[0]);
        if (Keksdose(BewertungID, false)) {
            Bewertung[i].classList.add("bewertet");
            Bewertung[i].childNodes[0].textContent = "Bewertet mit "+ Keksdose(BewertungID, false);
        }
    }
}