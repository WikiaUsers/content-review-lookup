/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen.

Inhalt:
> imported scripts
  > ArticleRating (Artikelbewertung)
  > BackToTopButton (Sprung zum Seitenanfang)
  > LinkPreview (Link:hover)
  > ReferencePopups (Fussnote:hover)
  > SourceEditButton (Editor oeffnen)
  > WikiaNotification (Wiki-Nachrichten)
> toggle
*/

 // Import [[MediaWiki:Onlyifuploading.js]] 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

importArticles({
    type: 'script',
    articles: [

/* ARTIKEL BEWERTEN
Oben rechts (im Wikirail) ist ein Abschnitt, in der der Artikel mit bis zu 5 Sternen bewertet werden kann. Noten und Platzierung des Abschnitts wird unter window.ArticleRating definiert.
Referenz:
https://dev.fandom.com/wiki/ArticleRating
*/
        'w:c:dev:ArticleRating.js',

/* ZU SEITENANFANG SPRINGEN
Ganz unten befindet sich ein Button/Schaltfläche. Klickt man darauf, springt man zum Seitenanfang. Nur fuer angemeldete User sichtbar. Referenz:
http://dev.fandom.com/wiki/BackToTopButton
*/
        'w:c:dev:BackToTopButton/code.js', 
        'w:c:dev:DiscordChat.js', 

/* TOOLTIP-TEXT DER LINKS
Bewegt man mit der Maus auf einen Link, erscheint der Linkinhalt in einer Textbox. Bewegt man die Maus weg, verschwindet die Textbox. Referenz: 
https://dev.fandom.com/wiki/LinkPreview
CSS-Code:
https://dev.fandom.com/wiki/MediaWiki:LinkPreview/code.css
*/
        'w:c:dev:LinkPreview/code.js',

/* TOOLTIP-TEXT DER FUSSNOTEN
Bewegt man mit der Maus auf eine Fußnote, erscheint der Tooltip-Text in einer Textbox. Man kann auch auf die Links im Textbox klicken. Bewegt man die Maus weg, verschwindet die Textbox. Referenz: 
http://dev.fandom.com/wiki/ReferencePopups
CSS-Code: 
http://dev.fandom.com/wiki/ReferencePopups/code.css
*/
        'w:c:dev:ReferencePopups/code.js',

/* ANDERE EDITOR OEFFNEN
Oeffnet den gewuenschten Editor, wenn mit der Maus auf den Pfeil neben dem Button Bearbeiten bewegt wird. Alternativ können die Wikianer ihr Editoreinstellung ueber Einstellungen aendern. Referenz: 
https://dev.fandom.com/wiki/SourceEditButton
*/
        'w:c:dev:SourceEditButton.js',

/* WIKI-NACHRICHTEN
Unten rechts, wo auch die Neuigkeiten des Wikias stehen, kann nun eigene hinzugefügt werden. Den Text kann geändert werden unter:
MediaWiki:Custom-WikiaNotifications
Referenz:
https://dev.fandom.com/wiki/WikiaNotification
*/
        'w:c:dev:WikiaNotification/code.js',

    ]
});

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