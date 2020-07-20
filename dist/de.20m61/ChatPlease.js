/* ********************************* *\
* Idee: Gameheld (http://de.community.wikia.com/wiki/Diskussionsfaden:45014)
* Umsetzung: 20M61 Copyright 2014
* Verwendung in Wikia-Wikis nur nach vorheriger Genehmigung durch Wikia-Staff oder für Testzwecke
* Keine Gewährleistung oder Verantwortung für Permanente Verbannung durch Staff-Mitglieder.
\* ********************************* */
var VersionChatPlease = "1.87d";
var VersionsNr = document.createElement("div");
    VersionsNr.style.top       = '3px';
    VersionsNr.style.right     = '5px';
    VersionsNr.style.zIndex    = '1000';
    VersionsNr.style.position  = 'absolute';
    VersionsNr.appendChild(document.createTextNode('Version '+VersionChatPlease));
var VersionPlatz = document.getElementById("WikiaPageBackground");
if (VersionPlatz)
  VersionPlatz.parentNode.insertBefore(VersionsNr,VersionPlatz);

var BenutzerEinladen = "";
importArticles({ type: "script", articles: ["Vorlage:Chateinladung"] });

function Werteliste (querystring) {
  if (querystring == '') return;
  var wertestring = querystring.slice(1); // Übergeben wird eine URL als Array. Der Link wir abgeschnitten
  var paare = wertestring.split('&');
  var name, wert;
  for (var i = 0; i < paare.length; i++) {
    name = paare[i].split('=')[0];
    wert = paare[i].split('=')[1];
    name = unescape(name).replace('+', ' ');
    wert = unescape(wert).replace('+', ' ');
    this[name] = wert;
  }
  var HTML_link = window.location + '';
  this['PageName'] = HTML_link.split('=')[0].split('/')[4].replace(/_/g, ' ').split('?')[0];
}
var HTMLAgument = new Werteliste(location.search);

// Cookie-System
var Liste_Aller_Gesehenen_Chateinladungen='';
/*********************************************************\
    Funktion löst Zeitproblem von schreibCookie()
\*********************************************************/
function fixedGMTString(datum){
   var damals=new Date(1970,0,1,12);
   if (damals.toGMTString().indexOf("02")>0)
      datum.setTime(datum.getTime()-1000*60*60*24);
   return datum.toGMTString();
}
/*********************************************************\
    Funktion schreibt Cookie (alles, was in "TWD" an Eigenschaften steht)
\*********************************************************/
function schreibCookie() {
   var neuerKeks = 'Chateinladung=';
   neuerKeks += Liste_Aller_Gesehenen_Chateinladungen;
   var jetzt = new Date();
   var verfall = new Date(jetzt.getTime() + 1000*60*60*24*365); // 1 Jahr Cookiezeit
   neuerKeks += "; expires=" + fixedGMTString(verfall);
   neuerKeks += "; path=/";
   document.cookie = neuerKeks;
   return true;
}
/*********************************************************\
    Funktion liest Cookie aus, schreibt sie in die Variablen
    und ruft Funktionen auf, die das Design ändern.
\*********************************************************/
function liesCookie() {
   var keks = document.cookie;
   if (keks) {
     // Anfangsposition des Name=Wert-Paars suchen
     var posName = keks.indexOf("; Chateinladung=");
     if (posName == -1) {
        if (keks.indexOf("Chateinladung=") == 0) {
          // Cookie war erster in der Liste
          posName = 0;
        }
        else {
          // Noch kein Cookie gesetzt
          return false;
        }
     }
 
     // Anfangs- und Endposition des Krümelwerts suchen
     var wertAnfang = keks.indexOf("=", posName)+1;
     var wertEnde = keks.indexOf(";", posName+1);
     if (wertEnde == -1) wertEnde = keks.length;
 
     // Krümelwert auslesen und zurückgeben
     Liste_Aller_Gesehenen_Chateinladungen = keks.substring(wertAnfang, wertEnde);
  }
  return true;
}

/*********************************************************\
    Schreibt direkt in Artikel
\*********************************************************/
function SchreibChateinladung(Anfragender, Eingeladener, Zeit){
  //öffnen des Artikels im bearbeiten Modus (iFrame)
  var url =  'http://de.20m61.wikia.com/wiki/Vorlage:Chateinladung?action=edit&';
      url += 'Anfragender='+Anfragender+'&';
      url += 'Eingeladener='+Eingeladener+'&';
      url += 'Zeit='+Zeit;
  var zentrieren = (screen.width-276)/2;
  var fenstereinstellungen = "height=150, width=276, directories=0, location=0, menubar=0, resizable=0, scrollbars=0, status=0, titlebar=0, toolbar=0, top=70, left="+zentrieren;
  var Artikel_window = window.open(url, "Chateinladung", fenstereinstellungen);
  window.focus();

  return true;
}

function WaitForContent(dbObjekt){
  window.blur();
  var Suchtext; var Ersatztext;
 
  // Solange nichts im Objekt drin ist, wird gewartet (halbe Sekunde)
  if (dbObjekt.innerHTML =='') {
    setTimeout('WaitForContent('+dbObjekt+');',500);
    return;
  }
 
  var ArtikelTextfeld = dbObjekt.innerHTML; 
  var ArtikelTextfeldInhalt = ArtikelTextfeld.split('"')[1];

  var Chateinladung = ArtikelTextfeldInhalt.replace(/&amp;/g, '&').split(';');
  ArtikelTextfeldInhalt = '';
  var ChatAnfragenNummer = 0;
  for (i=0; i<Chateinladung.length; i++){
    var tmpAnfragender  = Chateinladung[i].split('&')[0];
    var tmpEingeladener = Chateinladung[i].split('&')[1];
    var tmpZeit         = Chateinladung[i].split('&')[2];
    var tmpCE_ID        = Chateinladung[i].split('&')[3];
    ChatAnfragenNummer ++;
    if (tmpEingeladener) 
      ArtikelTextfeldInhalt += tmpAnfragender+'&'+tmpEingeladener+'&'+tmpZeit+'&'+tmpCE_ID+';';
  }

  ArtikelTextfeldInhalt += HTMLAgument['Anfragender']+'&'
  ArtikelTextfeldInhalt += HTMLAgument['Eingeladener']+'&'
  ArtikelTextfeldInhalt += HTMLAgument['Zeit']+'&'
  ArtikelTextfeldInhalt += Chateinladung.length +';';

  dbObjekt.innerHTML = '\/\/<!--\nBenutzerEinladen = "' + ArtikelTextfeldInhalt + '";\n\/\/-->';
  document.getElementById('wpSave').click();
  document.getElementById("editform").submit();  
  return;
}

if (HTMLAgument['action'] == 'edit' && HTMLAgument['Anfragender']) 
  WaitForContent(document.getElementById('mw-content-text').getElementsByTagName('textarea')[0]);
else if (wgPageName=="Vorlage:Chateinladung") window.close();

/*********************************************************\
    Kleiner Button unter Bild im Benutzer-Menü
\*********************************************************/
  var UserSelection = document.getElementById("UserProfileMasthead");
  if (UserSelection) {
    if (wgUserName != document.getElementById('UserProfileMasthead').getElementsByTagName('h1')[0].innerHTML) {
      var Chatdate             = new Date();
      var Button               = document.createElement("div");
        Button.className       = 'wikia-menu-button';
        Button.style.bottom    = '0';
        Button.style.left      = '15px';
        Button.style.width     = '146px';
        Button.style.position  = 'absolute';
        Button.style.textAlign = 'center';
        Button.onclick         = function(){SchreibChateinladung(wgUserName, document.getElementById('UserProfileMasthead').getElementsByTagName('h1')[0].innerHTML, Chatdate.getTime())};
        Button.appendChild(document.createTextNode('Zum Chat einladen'));
      UserSelection.appendChild(Button);
    }
  }

function IgnoreChatInvitation(){
  for (i=0; i<BenutzerEinladen.length; i++){
    var Anfragender  = BenutzerEinladen[i].split('&')[0];
    var Eingeladener = BenutzerEinladen[i].split('&')[1];
    var Zeit         = BenutzerEinladen[i].split('&')[2];
    var CE_ID        = BenutzerEinladen[i].split('&')[3];
    if (Eingeladener == wgUserName && !CheckListeAllerEinladungen(CE_ID)) {
      Liste_Aller_Gesehenen_Chateinladungen += CE_ID+ ",";
    }
  }

  var ULelement = document.getElementById('WallNotifications').getElementsByTagName('ul')[0];
  var OldEinladung = document.getElementById('Chateinladung');
  if (OldEinladung) {
    OldEinladung.parentNode.removeChild(OldEinladung);
    ULelement.style.top                = '33px';
  }
  var OldEinladungAnz = document.getElementById('ChatEinladungsAnzahl');
  if (OldEinladungAnz) OldEinladungAnz.parentNode.removeChild(OldEinladungAnz);

  schreibCookie();
  return true;
}

function PreGetChatInvitation(){
  liesCookie();
  BenutzerEinladen = BenutzerEinladen.split(';');
  AvatarMenu();
  GetChatInvitation();
}

function AvatarMenu(){
  var Avatar = document.getElementById('WikiaMainContent').getElementsByTagName('img');
  var Chatdate               = new Date();
  for (var i = 0; i < Avatar.length; i++){
    if (Avatar[i].className== 'avatar'){
      if (Avatar.alt == wgUserName) continue;
      Avatar[i].parentNode.parentNode.style.position = 'relative';
      Avatar[i].parentNode.parentNode.onmouseleave   = function(){this.firstChild.style.display = 'none';};
      Avatar[i].parentNode.parentNode.onmouseenter   = function(){this.firstChild.style.display = '';};

      var AvatarMenu = document.createElement("div");
      AvatarMenu.style.position        = 'absolute';
      AvatarMenu.style.width           = '130px';
      AvatarMenu.style.right           = '-131px';
      AvatarMenu.style.backgroundColor = 'lawngreen';
      AvatarMenu.style.zIndex          = '100';
      AvatarMenu.style.display         = 'none';
      AvatarMenu.style.border          = '1px solid #3A3A3A';

        var AM_Benutzerseite = document.createElement("div");
        AM_Benutzerseite.style.marginLeft      = '5px';
        AM_Benutzerseite.style.backgroundColor = '#FFFFFF';
        AM_Benutzerseite.style.paddingLeft     = '5px';
        AM_Benutzerseite.style.cursor          = 'pointer';
        AM_Benutzerseite.onmouseover           = function(){this.style.backgroundColor = '#b0d0e3';};
        AM_Benutzerseite.onmouseout            = function(){this.style.backgroundColor = '#FFFFFF';};
        AM_Benutzerseite.onclick               = function(){
          location.href = location.protocol+'//'+location.hostname + '/wiki/User:'+this.parentNode.parentNode.getElementsByTagName('img')[0].alt;
                                                 };
        AM_Benutzerseite.appendChild(document.createTextNode('Benutzerseite'));

        var AM_ChatPlease = document.createElement("div");
        AM_ChatPlease.style.marginLeft      = '5px';
        AM_ChatPlease.style.backgroundColor = '#FFFFFF';
        AM_ChatPlease.style.paddingLeft     = '5px';
        AM_ChatPlease.style.cursor          = 'pointer';
        AM_ChatPlease.onmouseover           = function(){this.style.backgroundColor = '#b0d0e3';};
        AM_ChatPlease.onmouseout            = function(){this.style.backgroundColor = '#FFFFFF';};
        AM_ChatPlease.onclick               = function(){
        SchreibChateinladung(wgUserName,this.parentNode.parentNode.getElementsByTagName('img')[0].alt,Chatdate.getTime());
                                              };
        AM_ChatPlease.appendChild(document.createTextNode('Zum Chat einladen'));

      AvatarMenu.appendChild(AM_Benutzerseite);
      AvatarMenu.appendChild(AM_ChatPlease);
      Avatar[i].parentNode.parentNode.insertBefore(AvatarMenu, Avatar[i].parentNode.parentNode.childNodes[0]);
    }
  }
  return true;
}

function CheckGastgeber(str, Name){
  var Gastgeber = str.split(',');
  for (var i=0; i<Gastgeber.length; i++){
    if (Gastgeber[i] == Name) return false;
  }
  return true
}

function GetChatInvitation(){
  var Counter_Invitation = 0;
  var Gastgeber = '';
  var ULelement = document.getElementById('WallNotifications').getElementsByTagName('ul')[0];
  var OldEinladung = document.getElementById('Chateinladung');

  for (i=0; i<BenutzerEinladen.length; i++){
    var Anfragender  = BenutzerEinladen[i].split('&')[0];
    var Eingeladener = BenutzerEinladen[i].split('&')[1];
    var Zeit         = BenutzerEinladen[i].split('&')[2];
    var CE_ID        = BenutzerEinladen[i].split('&')[3];
    if (Eingeladener == wgUserName && !CheckListeAllerEinladungen(CE_ID)) {
      if (CheckGastgeber(Gastgeber, Anfragender)){
        Counter_Invitation ++;
        Gastgeber += Anfragender + ",";
      }
    }
  }
  var Einlader = Gastgeber.split(",");
  if (Einlader.length < 3) { 
    Gastgeber = Einlader[0]; 
  }
  else if (Einlader.length == 3) { 
    Gastgeber = Einlader[0] + ' und ' + Einlader[0]; 
  }
  else {
    Gastgeber = '';
    for (i=0; i<Einlader.length-3; i++){
      Gastgeber += Einlader[i] + ', ';
    }
    Gastgeber += Einlader[Einlader.length-3] + ' und ' + Einlader[Einlader.length-2];
  }

  if (Counter_Invitation == 0) {
    if (OldEinladung) {
      OldEinladung.parentNode.removeChild(OldEinladung);
      ULelement.style.top                = '33px';
    }
    return false;
  }

  var OldEinladungAnz = document.getElementById('ChatEinladungsAnzahl');
  if (OldEinladungAnz) OldEinladungAnz.parentNode.removeChild(OldEinladungAnz);

  // Nummer oben neben Sprechblasen
  var ChatEinladungItem = document.createElement('span');
      ChatEinladungItem.id                 = 'ChatEinladungsAnzahl'
      ChatEinladungItem.style.position     = 'absolute';
      ChatEinladungItem.style.left         = '6px';
      ChatEinladungItem.style.top          = '3px';
      ChatEinladungItem.style.background   = 'lawngreen';
      ChatEinladungItem.style.color        = 'black';
      ChatEinladungItem.style.fontSize     = '12px';
      ChatEinladungItem.style.textAlign    = 'center';
      ChatEinladungItem.style.display      = 'inline-block';
      ChatEinladungItem.style.padding      = '0 4px 0 4px';
      ChatEinladungItem.style.borderRadius = '15px';
      ChatEinladungItem.style.lineHeight   = '14px';
      ChatEinladungItem.appendChild(document.createTextNode(Counter_Invitation));
  document.getElementById('WallNotifications').getElementsByTagName('div')[0].appendChild(ChatEinladungItem);

  // Einfügen in Nachrichten-Liste
  if (!OldEinladung && ULelement.className.search('show') >= 0) {
    // Neue Nachrichtenliste, die vor der alten eingequetscht wird    
    var ChatEinladungDIV = document.createElement('div');
      ChatEinladungDIV.className         = 'subnav';
      ChatEinladungDIV.style.borderBottom= '0';
      ChatEinladungDIV.style.width       = '250px';
      ChatEinladungDIV.style.right       = '0';
      ChatEinladungDIV.style.top         = '33px';
      ChatEinladungDIV.style.padding     = '1px 0 1px 0';
      ChatEinladungDIV.style.height      = '96px';
      ChatEinladungDIV.id                = 'Chateinladung';

    var ChatNachricht = '';
      ChatNachricht += '<dt class="notifications-header" style="border-bottom: 1px solid #8e8d8d">';
      ChatNachricht += '  <span>Chateinladung';
      ChatNachricht += '    <span style="position:absolute; right: 2px; top: 2px; cursor: pointer; font-size:11px; font-weight:normal; color: #70b8ff;" onclick="IgnoreChatInvitation();" onMouseOver="this.style.textDecoration = \'underline\';" onMouseOut="this.style.textDecoration = \'\';">Ignorieren</span>';
      ChatNachricht += '  </span>';
      ChatNachricht += '</dt>';
      ChatNachricht += '<dd class="notifications-for-wiki show">';
      ChatNachricht += '  <dl class="notifications-for-wiki-list">';
      ChatNachricht += '    <dd class="unread_notification admin_notification" style="position:relative">';
      ChatNachricht += '      <a href="" onclick="IgnoreChatInvitation(); ChatEntryPoint.onClickChatButton(\'/wiki/Spezial:Chat\')">';
      ChatNachricht += '        <div style="position: absolute; top: 0; left: 0; width: 7px; height: 100%; background: #0F5901;"></div>';
      ChatNachricht += '        <div class="notification" style="margin-left:7px;">';
      ChatNachricht += '          <div class="msg-title">Einladung zum Chat</div>';
      ChatNachricht += '          Von '+Gastgeber+' abgeschickt';
      ChatNachricht += '          <div class="timeago" title="'+Zeit+'">-</div>';
      ChatNachricht += '        </div>';
      ChatNachricht += '      </a>';
      ChatNachricht += '    </dd>';
      ChatNachricht += '  </dl>';
      ChatNachricht += '</dd>';
 
    ChatEinladungDIV.innerHTML = ChatNachricht;

    ULelement.parentNode.insertBefore(ChatEinladungDIV, ULelement);
    ULelement.style.top                = '133px';
  } 
  else if (OldEinladung && ULelement.className.search('show') < 0){
    OldEinladung.parentNode.removeChild(OldEinladung);
    ULelement.style.top                = '33px';
  }
  setTimeout('GetChatInvitation();',200);
}

function CheckListeAllerEinladungen(ChatEinladungID){
  var CookieListe = Liste_Aller_Gesehenen_Chateinladungen.split(',');
  for (j=0; j<CookieListe.length; j++){
    if (CookieListe[j] == ChatEinladungID) return true;
  }
  return false;
}

addOnloadHook(PreGetChatInvitation);