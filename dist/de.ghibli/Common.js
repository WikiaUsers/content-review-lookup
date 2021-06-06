/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen.*/
window.ArticleRating = {
    title: 'Hat Dir dieser Artikel gefallen?',
    values: ['Verdorbene Himbeere', 'Mangelhaft', 'Ganz okay', 'Hervorragend', 'Meisterwerk'],
    location: 'top-rail'
}

window.BackToTopModern = true;



/* TOGGLE
Code von  20M61. Danke an Pham-Duy fuer den Hinweis.
*/
var TogglerAktiv=1;
 
function Toggler(ToggleID) {
  if (ToggleID) TogglerAktiv = ToggleID;
  var TogglerSPAN = document.getElementById("WikiaArticle").getElementsByTagName('span');
  for (i=0; i<TogglerSPAN.length; i++) {
    // Nach SPAN-Togglern suchen (das sind die, die alles steuern)
    if (TogglerSPAN[i].className.search("Toggler") >= 0) {
      // Jetzt wird geguckt, ob der vorliegende Toggler der aktive Toggler ist
      // Damit wird verhindert, dass zufällig 2 Toggler aktiv sind. (Der letzte ist der dominante)
      if (TogglerSPAN[i].getAttribute('data-Toggle') == TogglerAktiv) 
        TogglerSPAN[i].className="Toggler aktiv";
      else
        TogglerSPAN[i].className="Toggler";
    }
  }
  var TogglerDIV = document.getElementById("WikiaArticle").getElementsByTagName('i');
  for (i=0; i<TogglerDIV.length; i++) {
    // Nach DIV-Togglern suchen (das sind die, die versteckt / gezeigt werden)
    if (TogglerDIV[i].getAttribute('data-Toggle')) {
      // Wenn TogglerDIV-ID mit der aktiven ID überein stimmt, wird es angezeigt, sonst nicht
      if (TogglerDIV[i].getAttribute('data-Toggle') == TogglerAktiv) 
        TogglerDIV[i].style.display='';
      else
        TogglerDIV[i].style.display='none';
    }
  }
  return true;
}
 
//onclick-Funktion für SPAN-Toggler setzen (damit wird es gangbar gemacht)
var TogglerObjekt = document.getElementById("WikiaArticle").getElementsByTagName('span');
for (i=0; i<TogglerObjekt.length; i++) {  
// Nach SPAN-Togglern suchen (das sind die, die alles steuern)
  if (TogglerObjekt[i].className.search("Toggler") >= 0) {
    TogglerObjekt[i].onclick = function(){ Toggler(this.getAttribute('data-Toggle')); };    
// Wenn dieser Toggler als "aktiv" markiert ist, dann wird dies in der Variable gespeichert.
    // (Es kann nur einen aktiven Toggler geben)
    if (TogglerObjekt[i].className.search("aktiv") >= 0) 
      TogglerAktiv = TogglerObjekt[i].getAttribute('data-Toggle');  
}
}
// Erster Funktionsaufruf, damit nach Laden der Seite die entsprechenden Toggler versteckt sind
Toggler();