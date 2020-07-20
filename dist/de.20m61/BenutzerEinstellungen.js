if (wgUserName.search('20M61') >=0) {                                                   // Skript erstmal nur für mich 

var VersionChatPlease = "BenutzerEinstellungen V. 0.01";
var VersionsNr = document.createElement("div");
    VersionsNr.style.top       = '3px';
    VersionsNr.style.right     = '5px';
    VersionsNr.style.zIndex    = '1000';
    VersionsNr.style.position  = 'absolute';
    VersionsNr.appendChild(document.createTextNode('Version '+VersionChatPlease));
var VersionPlatz = document.getElementById("WikiaPageBackground");
if (VersionPlatz)
  VersionPlatz.parentNode.insertBefore(VersionsNr,VersionPlatz);

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

// Menü nur einfügen auf Profilseiten (Wenn Menü exisitiert
if (document.getElementById('UserProfileMasthead')){
  var ulTabs = document.getElementsByClassName('tabs')[0];
  var UserEigenschaft = document.createElement('li');
      UserEigenschaft.setAttribute("data-id","individual");
      var UserEigenschaftLINK = document.createElement('a');
          UserEigenschaftLINK.appendChild(document.createTextNode('Mein Wikia'));
      UserEigenschaft.appendChild(UserEigenschaftLINK);
      UserEigenschaft.onclick = function(){
        document.getElementById('WikiaMainContent').removeChild(document.getElementById('WikiaMainContentContainer'));
        ajax_GetMenu();
        for (var i=0; i < this.parentNode.childNodes.length; i++){
          this.parentNode.childNodes[i].className = '';
        }
        this.className = 'selected';
      }
  ulTabs.appendChild(UserEigenschaft);
}

/*****************************************\
* AJAX - Speicher / Ladeerweiterung

Aufbau der FORM: 
<form id="editform" class="editform" name="editform" method="post" action="/wiki/MediaWiki:ExtendedMenu.js?action=submit" enctype="">
  <input type="hidden" value="" name="wpSection">
  <input type="hidden" value="20141004182249" name="wpStarttime">
  <input type="hidden" value="20141004053516" name="wpEdittime">
  <input type="hidden" value="" name="wpScrolltop" id="wpScrolltop">
  <input type="hidden" name="wpLogin">
  <input type="hidden" value="d41d8cd98f00b204e9800998ecf8427e" name="wpAutoSummary">
  <input type="hidden" value="0" name="oldid">
  <input type="hidden" value="8dbaaf0a88b69252110da6ccf4e294f8+\" name="wpEditToken">
  <input type="text" value="" id="antispam" name="antispam">
  <input type="checkbox" tabindex="21" name="wpMinoredit" id="wpMinoredit" accesskey="i" checked="checked">

  <textarea tabindex="1" accesskey="," id="wpTextbox1" lang="en" dir="ltr" name="wpTextbox1" class="">TXT</textarea>
  <textarea id="wpSummary" name="wpSummary" placeholder="Eine Zusammenfassung der Änderungen angeben" tabindex="1" maxlength="250"></textarea>							
  <input class="control-button even" tabindex="22" id="wpSave" name="wpSave" type="submit" value="Seite speichern" accesskey="s">
</form>

\*****************************************/



function ajax_GetMenu(){
  var xmlhttp;
  if (window.XMLHttpRequest){
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  }
  else {
    // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function()  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      var Codeinhalt = xmlhttp.responseText;
      
      Codeinhalt = Codeinhalt.slice(Codeinhalt.search('<div id="mw-content-text"'), Codeinhalt.length); // Alles vor Start entfernen
      Codeinhalt = Codeinhalt.slice(Codeinhalt.search('>')*1+1, Codeinhalt.length); // Erstes Tag (Suchtag) entfernen - gehört zum Wikia Body
      Codeinhalt = Codeinhalt.slice(0, Codeinhalt.search('<div class="printfooter">')); // Ende entfernen - gehört zum Wikia Body
      
      alert(Codeinhalt);
      $(Codeinhalt).appendTo(document.getElementById('WikiaMainContent'));
    }
  }
  var wiki_url = location.href;
      wiki_url = wiki_url.slice(0, (wiki_url.search(".wikia.com/wiki/")*1+16));
      wiki_url += 'Goofy_Max';
      wiki_url += '?action=submit';

      wiki_url = location.href;
      wiki_url = wiki_url.slice(0, (wiki_url.search(".wikia.com/wiki/"))); // http://de.thewalkingdead(TV)
      wiki_url += '/api.php?action=edit';

      alert(wiki_url);
  xmlhttp.open("POST", wiki_url, true);
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  var FormInhalt = 'ajax_manipulation_ver=1.0';
      FormInhalt += '&categories='          + '';
      FormInhalt += '&wpSection='           + '';
      FormInhalt += '&wpStarttime='         + '20141011184653';
      FormInhalt += '&wpEdittime='          + '20140928192004';
      FormInhalt += '&wpScrolltop='         + '0';
      FormInhalt += '&wpLogin='             + '';
      FormInhalt += '&wpAutoSummary='       + 'd41d8cd98f00b204e9800998ecf8427e';
      FormInhalt += '&oldid='               + '0';
      FormInhalt += '&wpTextbox1='          + 'Neuer INHALT';
      FormInhalt += '&wpEditToken='         + '59bf6404a2f3823e9ca069adfe285e49+\\';
      FormInhalt += '&antispam='            + '';
      FormInhalt += '&wpMinoredit='         + 'on';
      FormInhalt += '&wpSummary='           + 'autotext';
      FormInhalt += '&CategorySelectInput=' + '';
  xmlhttp.send(FormInhalt);           // EIN STRING??? --- eher ohne Anführungszeichen... (geändert)
}

}