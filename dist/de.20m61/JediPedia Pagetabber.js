/* --------------------------------------
   Vielen lieben Dank an den User [[w:c:de.thewalkingdeadtv:User:20M61|20M61]] (http://de.thewalkingdeadtv.wikia.com/wiki/Benutzer:20M61)
   -------------------------------------- */
//Dieses Skript wird für die Tabber (Legends/Kanon) verwendet.
var Version = 'Legends'; // Standardmäßig soll ein Artikel mit Legends geöffnet werden
 
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
	var TabberObj = document.getElementById("WikiaMainContentContainer").getElementsByTagName('div');
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
	}
	//Funktion erfolgreich beenden (ein Returnwert ist nicht nötig, aber guter Stil).
	return true;
}
 
//Alle DIV-Elemente, die im Artikel enthalten sind im Objekt "TabberObj" speichern
var TabberMenuObj = document.getElementById("WikiaMainContentContainer").getElementsByTagName('div');
//Jedes Objekt in "TabberMenuObj" einzeln durchgehen und nacheinander bearbeiten
for (var i= 0; i< TabberMenuObj.length; i++){
	//Wenn ein Menü-Objekt gefunden wird, dann diesem eine Funktion zuweisen.
	if (TabberMenuObj[i].className.toLowerCase() == 'swtabber-button'){
		TabberMenuObj[i].onclick=function(){ChangeVersion(this.getAttribute('data-Version'));};
	}
}
 
function VaterNode(ReverseObjekt){
	if (ReverseObjekt.getAttribute('data-Version')) return ReverseObjekt.getAttribute('data-Version');
	if (ReverseObjekt.id == 'WikiaMainContentContainer') return false;
	return (VaterNode(ReverseObjekt.parentNode));
}
 
//Alle Links im Artikel heraus suchen
var SearchDIV = document.getElementById("WikiaMainContentContainer").getElementsByTagName('div');
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
	var VersionLink = document.getElementById("WikiaMainContentContainer").getElementsByTagName('a');
	for (i = 0; i < VersionLink.length; i++){
		//Es darf kein Fragezeichen bereits enthalten sein (sonst ist es wahrscheinlich ein RED-Link)
		if(VersionLink[i].href.split('?')[1]) continue;
		//Link ergänzen um Version in der er sich befindet.
		VersionLink[i].href = VersionLink[i].href+'?version='+VaterNode(VersionLink[i].parentNode);
	}
	ChangeVersion(Version);
}