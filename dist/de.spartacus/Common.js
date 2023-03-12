// SignatureCheck
window.SignatureCheckJS = {
	// Parts of the confirm prompt
	preamble: 'Es sind Probleme bei deiner Bearbeitung aufgetreten:\n\n',
	epilogue: '\nBist du dir sicher, dass du trotzdem fortfahren willst?',
	noForumheader: 'Es scheint, dass der [[Vorlage:Forumheader|Forumheader]] fehlt. Du solltest keine Forumseite ohne diesen erstellen, da die Diskussion sonst nicht in den Forenlisten angezeigt wird.\n',
	noSignature: 'Hast du vergessen, deinen Beitrag zu signieren? Bitte unterschreibe auf Diskussions- und Forenseiten immer mit vier Tilden ([[Benutzer: Ruben406|Ruben406]] <sup>([[Benutzer Diskussion:Ruben406|Kontakt]] • [[Spezial:Beiträge/Ruben406|Beiträge]])</sup> 22:08, 1. Apr. 2013 (UTC)).\n',
	forumheader: 'Forumheader',
	checkSignature: true
};

// Importierung
importArticles({
    type: "script",
    articles: [
        "MediaWiki:DISPLAYTITLE.js",
        "MediaWiki:SignatureCheck.js",
        "MediaWiki:FixWantedFiles.js",
        "MediaWiki:RevealAnonIP.js"
    ]
});

//Ersetzt <span class="insertusername"></span> mit dem Benutzername des Lesers
function replaceusername() {
  var spantags = document.getElementsByTagName("span");
  for (i=0; i<spantags.length; i++) {
    if (spantags[i].className=="insertusername") {
      if (wgUserName==null) {
        spantags[i].innerHTML="Gast";
      } else {
        spantags[i].innerHTML=wgUserName;
      }
    }
  }
}
addOnloadHook(replaceusername);