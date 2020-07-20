var end = new Date("2015-01-07"),
    start = new Date(),
    diff = new Date(end - start),
    days = diff/1000/60/60/24;

if (days <= 0) { 
    $('img[data-image-name="Boost.png"]').css('display', 'none'); 
}

// Konfiguration für das Skript AjaxRC
window.ajaxPages = ["Spezial:WikiActivity"];
window.AjaxRCRefreshText = 'Auto-Aktualisierung';

window.UserTagsJS = {
	modules: {},
	tags: {
        'bot': { u: 'Bot-Konto', link:'Hilfe:Bots',},
        'semiaktiv': { u: 'Sporadisch aktiv',},
        'founder': { u: 'Gründer',},
        'bureaucrat': { 
            u: 'Bürokrat',
            m: 'Bürokrat',
            f: 'Bürokratin',
            order: 1
        },
        'sysop': { 
            u: 'Administrator',
            m: 'Administrator',
            f: 'Administratorin',
            order: 2
        },
        'threadmoderator': { 
            u: 'Forum-Moderator',
            m: 'Forum-Moderator',
            f: 'Forum-Moderatorin',
            order: 3
        },
        'content-moderator': { 
            u: 'Wiki-Moderator',
            m: 'Wiki-Moderator',
            f: 'Wiki-Moderatorin',
            order: 3
        },
        'chatmoderator': { 
            u: 'Chat-Moderator',
            m: 'Chat-Moderator',
            f: 'Chat-Moderatorin',
            order: 4
        },
        'rollback': { 
            u: 'Rollback-Benutzer',
            m: 'Rollback-Benutzer',
            f: 'Rollback-Benutzerin',
            order: 5
        }
	}
};
 
UserTagsJS.modules.mwGroups = [
   'bureaucrat',
   'chatmoderator',
   'content-moderator',
   'threadmoderator',
   'rollback',
   'sysop',
   'bannedfromchat',
   'bot',
   'bot-global'
];
UserTagsJS.modules.userfilter = {
    'Medusa78': ['bureaucrat'],
    'Solaia': ['bureaucrat']
};

UserTagsJS.modules.metafilter = {
	'chatmoderator': ['moderator'],
	'threadmoderator': ['moderator'],
	'rollback': ['moderator']
};

// Import [[MediaWiki:Onlyifuploading.js]]
if ( wgCanonicalSpecialPageName == "Upload" ) {
    importScriptURI('/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s');
}

//Ersetzt <span class="insertusername"></span> mit dem Benutzername des Lesers
$(function replaceusername() {
    var spantags = document.getElementsByTagName("span");
    for (i=0; i<spantags.length; i++) {
        if (spantags[i].className == "insertusername") {
            if (wgUserName === null) {
                spantags[i].innerHTML = "Beacher";
            } else {
                spantags[i].innerHTML=wgUserName;
            }
        }
    }
});
 
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
  var TogglerDIV = document.getElementById("WikiaArticle").getElementsByTagName('div');
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
    TogglerObjekt[i].onclick = function(){ Toggler(this.getAttribute('data-Toggle')) };
    // Wenn dieser Toggler als "aktiv" markiert ist, dann wird dies in der Variable gespeichert.
    // (Es kann nur einen aktiven Toggler geben)
    if (TogglerObjekt[i].className.search("aktiv") >= 0) 
      TogglerAktiv = TogglerObjekt[i].getAttribute('data-Toggle');
  }
}
// Erster Funktionsaufruf, damit nach Laden der Seite die entsprechenden Toggler versteckt sind
Toggler();