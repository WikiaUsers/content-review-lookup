/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */



//===========================================
//*** http://dev.wikia.com/wiki/ShowHide

importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "anzeigen",
	hide: "ausblenden",
	showAll: "alle anzeigen",
	hideAll: "alle ausblenden"
    }
};


function Spoiler() {
  var Spoiler_vorhanden = document.getElementById("WikiaArticle").getElementsByTagName("div");
  for (i=0; i < Spoiler_vorhanden.length; i ++){
    if (Spoiler_vorhanden[i].className.toLowerCase() == "spoiler")
      return true;
 }
  return false;
}
 
if (Spoiler()) {
  var article = $('div#WikiaArticle');
	$('<div id="blackout">' + '</div>').appendTo(article).css({
		position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000, backgroundColor: '#FFFFFF', opacity: 1
	  });
  var r = confirm("Auf der Seite befinden sich einige Spoiler. \nDrücke OK um es dir den Artikel anzuschauen. Abbruch bringt dich zurück auf die Startseite.");
  if (r != true)
    window.location.href = "http://de.megaman.wikia.com/";
  else 
    $('#blackout').fadeOut(500, function () { });
}