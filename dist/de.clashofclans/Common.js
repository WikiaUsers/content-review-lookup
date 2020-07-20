window.ajaxPages = ['Spezial:Letzte_Änderungen','Spezial:WikiActivity'];
window.AjaxRCRefreshText = 'Auto-Aktualisierung';
window.AjaxRCRefreshHoverText = 'Automatische Aktualisierung der kompletten Seite';

//Nachrichten
var messageWallUserTags = {
    'IchMachMucke': 'Administrator',
    'DarkBarbarian': 'Administrator',
    'AmonFatalis': 'Technischer Administrator',
    'Clash_of_Clans_Wikia': 'Administrator',
    'MrKnow': 'Beutekönig',
    'Bloodgod666': 'Super-Moderator',
    'Cheaper-trick': 'Moderator',
    'Reazor': 'Wiki-Youtuber',
    'Kr%C3%BCmelmonsta97': 'Rh9-Turnier-Sieger',
    'HockeTW': 'Rh10-Turnier-Sieger',
    'MrMobilefanboyFred': 'Wiki-Youtuber',
    'Tobi_bs': 'Rh11-Turnier-Sieger',
    'SwissDaggy': 'Rh10-Turnier-Sieger',
    'SkelA.de': 'Rh9-Turnier-Sieger',
    'AUT-Aventador': 'Rh11-Turnier-Sieger',
    'Dennis_-_Clash_of_Clans': 'Supercell Community-Manager',
    'Stefan_-_Clash_of_Clans_CM': 'Supercell Community-Manager',
    'NicoHohadler':'Rh9-Turnier-Sieger',
    'Braindeadwulf':'Rh10-Turnier-Sieger',
    'Body95':'Rh11-Turnier-Sieger',
    'R3stl3SSWarr1or':'Moderator'
};
 
$(function($) {
    for (var name in messageWallUserTags) {
        $('a.subtle[href$="Nachrichtenseite:' + name + '"]').after('<span style="color:#FFFFFF;background:#ff8450;border-radius:1em;padding:1px 5px;margin-left:1px;font-size:85%;font-weight:bold;vertical-align:top;">' + messageWallUserTags[name] + '</span>');
    }
});

//Verified-Badge (modified from https://clashofclans.fandom.com/wiki/MediaWiki:Common.js/Lugia.js/Verify.js)
function checkVerif(){
	var users=[
	    'Stefan_-_Clash_of_Clans_CM'];
	var name=location.href;
	name=name.split('/wiki/');
	name=name[name.length-1];
	for(var i = 0; i < users.length; i++) {
		if('Benutzer:'+users[i] == name
		||'Nachrichtenseite:'+users[i] == name
		||'Benutzer_Blog:'+users[i] == name
		||'Spezial:Beitr%C3%A4ge/'+users[i] == name) {
			var verif=document.createElement('img');
			verif.setAttribute('src','https://images.wikia.nocookie.net/clashofclans/de/images/0/07/Verified-Twitter.png');
			verif.setAttribute('class','verify');
			verif.setAttribute('width','25');
			verif.setAttribute('height','25');
			var mhi=document.getElementsByClassName('masthead-info')[0];
			mhi=mhi.getElementsByTagName('hgroup')[0];
			mhi.appendChild(verif);
			break;
		}
	}
}
addOnloadHook(checkVerif);

//Ersetzt <span class="insertusername"></span> mit dem Benutzername des Lesers
$(function replaceusername() {
    var spantags = document.getElementsByTagName("span");
    for (i=0; i<spantags.length; i++) {
        if (spantags[i].className=="insertusername") {
            if (wgUserName === null) {
                spantags[i].innerHTML="Chef";
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

/*AbuseLogRC*/
abuseLogRC_showTo = 'sysop';
abuseLogRC_users = ['Bloodgod666'];
abuseLogRC_collapsible = true;
abuseLogRC_userInfo = true;