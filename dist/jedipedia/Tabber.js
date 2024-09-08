/* --------------------------------------
   Vielen lieben Dank an den User [[w:c:de.thewalkingdeadtv:User:20M61|20M61]] (http://de.thewalkingdeadtv.wikia.com/wiki/Benutzer:20M61)
   -------------------------------------- */
//Dieses Skript wird für die Tabber (Legends/Kanon) verwendet.
var Version = 'Legends'; // Standardmäßig soll ein Artikel mit Legends geöffnet werden
var Artikelraum;
if(mw.config.get('skin') == 'monobook')
    Artikelraum = document.getElementById("content");
else
    Artikelraum = document.getElementById("WikiaMainContent");

//Diese Funktion liest alle übergebenen Variablen aus und gibt diese in einem Objekt wieder
function Werteliste (querystring) {
  if (querystring == '') return;
  var wertestring = querystring.slice(1); // Übergeben wird eine URL als Array. Der Link wir abgeschnitten
  var paare = wertestring.split('&');
  var paar, name, wert;
  for (var i = 0; i < paare.length; i++) {
    paar = paare[i].split('=');
    name = paar[0];
    wert = paar[1];
    name = unescape(name).replace('+', ' ');
    wert = unescape(wert).replace('+', ' ');
    this[name] = wert;
  }
  var HTML_link = window.location + '';
  this['PageName'] = HTML_link.split('=')[0].split('/')[4].replace(/_/g, ' ').split('?')[0];
}
var HTMLAgument = new Werteliste(location.search); //Objekt HTMLArgument enthält alle übergebenen Variablen
 
function ChangeVersion(NewVersion) {
        Version = NewVersion;
        //Alle DIV-Elemente, die im Artikel enthalten sind im Objekt "TabberObj" speichern
        var TabberObj = Artikelraum.getElementsByTagName('div');
        //Jedes Objekt in "TabberObj" einzeln durchgehen und nacheinander bearbeiten
        for (var i= 0; i< TabberObj.length; i++){
                //Überprüfen ob aktuelles Objekt ein SWTabber ist
                if (TabberObj[i].className.toLowerCase() == 'swtabber'){
                        //Überprüfen, ob aktuelles Objekt angezeigt werden soll oder nicht
                        if (TabberObj[i].getAttribute('data-Version').toLowerCase() == Version.toLowerCase())
                                TabberObj[i].style.display = '';
                        else
                                TabberObj[i].style.display = 'none';
                }
    if (TabberObj[i].classList.contains("SWTabber-Knopf") && TabberObj[i].getAttribute('data-Version').toLowerCase() == Version.toLowerCase()) {
      TabberObj[i].classList.add("SWTabber-visible");
    } else {
      TabberObj[i].classList.remove("SWTabber-visible");
    }
        }
        //Funktion erfolgreich beenden (ein Returnwert ist nicht nötig, aber guter Stil).
        return true;
}
 
//Alle DIV-Elemente, die im Artikel enthalten sind im Objekt "TabberObj" speichern
var TabberMenuObj = Artikelraum.getElementsByTagName('div');
//Jedes Objekt in "TabberMenuObj" einzeln durchgehen und nacheinander bearbeiten
for (var i= 0; i< TabberMenuObj.length; i++){
	//Wenn ein Menü-Objekt gefunden wird, dann diesem eine Funktion zuweisen.
	if (TabberMenuObj[i].className.toLowerCase() == 'swtabber-knopf'){
		TabberMenuObj[i].onclick=function(){ChangeVersion(this.getAttribute('data-Version'));};
	}
}
 
function VaterNode(ReverseObjekt){
	if (ReverseObjekt.getAttribute('data-Version')) return ReverseObjekt.getAttribute('data-Version');
	if (ReverseObjekt == Artikelraum) return false;
	return (VaterNode(ReverseObjekt.parentNode));
}
 
//Alle Links im Artikel heraus suchen
var SearchDIV = Artikelraum.getElementsByTagName('div');
var MindestensEinTabberElementVorhanden = false;
for (i=0; i < SearchDIV.length; i++){
	// Hier wird geschaut, ob es mindestens ein Tabber-Element gibt, sonst den ganzen Code nicht verwenden.
	if (SearchDIV[i].getAttribute('data-Version')) MindestensEinTabberElementVorhanden = true;
    // Gucken, ob übergebene Tabber-Vorauswahl vorhanden ist und nur dann ändern 
    // Verhindert, dass unsinnige Tabber-Auswahlen verwendet werden und eine leere Seite gezeigt wird.
    if (HTMLAgument['version'] && SearchDIV[i].getAttribute('data-Version')){
    	if (HTMLAgument['version'].toLowerCase() == SearchDIV[i].getAttribute('data-Version').toLowerCase()) 
			Version = HTMLAgument['version'];
	}
}
 
if (MindestensEinTabberElementVorhanden){
  var VersionLink = Artikelraum.getElementsByTagName('a'); 
  for (i = 0; i < VersionLink.length; i++){
    //Es darf kein Fragezeichen bereits enthalten sein (sonst ist es wahrscheinlich ein RED-Link)
    if(VersionLink[i].href.indexOf("jedipedia.wikia.com") < 0) continue;
    if(VersionLink[i].href.split('?')[1]) continue;
    //Sprungmarken müssen hinter den Variablen stehen
    if(VersionLink[i].href.split('#')[1]) {
      VersionLink[i].href = VersionLink[i].href.split('#')[0]+'?version='+VaterNode(VersionLink[i].parentNode)+'#'+VersionLink[i].href.split('#')[1];    
    } else {
      //Link ergänzen um Version in der er sich befindet.
      VersionLink[i].href = VersionLink[i].href+'?version='+VaterNode(VersionLink[i].parentNode);
    }
  }
  ChangeVersion(Version);
}
 
function FindLiEbene(CurrentEbene, SearchEbene, UL){
    while (CurrentEbene > SearchEbene) {
        UL = UL.parentNode;
        CurrentEbene --;
    }
    while (CurrentEbene < SearchEbene) {
        CurrentEbene ++;
        var newUL = document.createElement("ol");
        newUL.className = "TOC_Ebene_H"+ (CurrentEbene + 2);
        UL.insertBefore(newUL, null);
        UL = newUL;
    }
    return UL;
}
 
Toc = document.getElementsByTagName("div");
for (var i=0; i < Toc.length; i++) {
    if (Toc[i].classList.contains("SWTabber")) {
        // Hier befinden wir uns in einem Legends oder Kanon-Tabber.
        var FindTOCPlace = Toc[i].getElementsByTagName("div")
        var NoTOCPlace = true;
        for (var j=0; j < FindTOCPlace.length; j++) {
            if (FindTOCPlace[j].classList.contains("TOC")) {
                FindTOCPlace = FindTOCPlace[j];
                NoTOCPlace = false;
                break;
            }
        }
        if (NoTOCPlace) { 
        /*
            var DIV_Box = document.createElement("div");
            DIV_Box.className = "TOC";
            Toc[i].insertBefore(DIV_Box, Toc[i].firstChild);
            FindTOCPlace = DIV_Box;
        */ 
            continue;
        }
        var Inhaltsverzeichnis = document.createElement("ol");
        Inhaltsverzeichnis.className = "TOC_Ebene_H2";
        FindTOCPlace.insertBefore(Inhaltsverzeichnis, FindTOCPlace.lastChild);
 
        var Ebene = 0;
        for (var n=0; n < Toc[i].childNodes.length; n++){
            switch (Toc[i].childNodes[n].tagName){
                case "H2": 
                    Inhaltsverzeichnis = FindLiEbene(Ebene, 0, Inhaltsverzeichnis);
                    Ebene = 0;
                    break;
                case "H3": 
                    Inhaltsverzeichnis = FindLiEbene(Ebene, 1, Inhaltsverzeichnis);
                    Ebene = 1;
                    break;
                case "H4": 
                    Inhaltsverzeichnis = FindLiEbene(Ebene, 2, Inhaltsverzeichnis);
                    Ebene = 2;
                    break;
                case "H5": 
                    Inhaltsverzeichnis = FindLiEbene(Ebene, 3, Inhaltsverzeichnis);
                    Ebene = 3;
                    break;
                case "H6": 
                    Inhaltsverzeichnis = FindLiEbene(Ebene, 4, Inhaltsverzeichnis);
                    Ebene = 4;
                    break;
                default: continue;
            }
            Listeneintrag = document.createElement("li");
            LI_Link       = document.createElement("a");
            LI_Link.innerHTML = Toc[i].childNodes[n].getElementsByClassName("mw-headline")[0].innerHTML;
            LI_Link.href  = "?version="+Version+"#"+Toc[i].childNodes[n].getElementsByClassName("mw-headline")[0].id;
            Listeneintrag.insertBefore(LI_Link,null);
            Inhaltsverzeichnis.insertBefore(Listeneintrag,null); 
        }
    }
}
 
//Danke an 20M61!