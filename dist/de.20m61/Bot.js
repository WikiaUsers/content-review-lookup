wgPageNameNoSpace = wgPageName.replace(/ /g, "_");

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

function WarteAufInhalt(dbObjekt, Suchstring, Ersatzstring){
  var Suchtext; var Ersatztext;
 
  // Solange nichts im Objekt drin ist, wird gewartet (halbe Sekunde)
  if (dbObjekt.innerHTML =='') {
    setTimeout('WarteAufInhalt('+dbObjekt+', "'+Suchstring+'", "'+Ersatzstring+'");',500);
    return;
  }
 
  dbObjekt.innerHTML = dbObjekt.innerHTML.replace(Suchstring, Ersatzstring);
  dbObjekt.innerHTML = dbObjekt.innerHTML.replace(Suchstring.replace(/ /g, "_"), Ersatzstring.replace(/ /g, "_"));
  dbObjekt.innerHTML = dbObjekt.innerHTML.replace(Suchstring.replace(/ /g, ""), Ersatzstring);

  document.getElementById('wpSummary').innerHTML = 'JS-Bot: Ersetze "'+Suchstring+'" mit "'+Ersatzstring+'".';
  document.getElementById('wpSave').click();
  document.getElementById("editform").submit();  
  return;
}

if (HTMLAgument['action'] == 'edit' && HTMLAgument['Ersatzstring']) 
  WarteAufInhalt(document.getElementById('mw-content-text').getElementsByTagName('textarea')[0], wgPageNameNoSpace, HTMLAgument['Ersatzstring']);
else if (wgPageNameNoSpace=="Vorlage:Chateinladung") window.close();
else if (wgPageNameNoSpace.search("Spezial:Verschieben") >= 0 && HTMLAgument['Ersatzstring']) {
  document.getElementById('wpNewTitleMain').value = HTMLAgument['Ersatzstring'];
  document.getElementById('wpReason').innerHTML = 'JS-Bot: Eindeutschung in: "'+Ersatzstring+'".';
  if (document.getElementById('wpLeaveRedirect')) document.getElementById('wpLeaveRedirect').checked = "false";
  if (document.getElementById('wpMovetalk')) document.getElementById('wpMovetalk').checked = "true";
  if (document.getElementById('watch')) document.getElementById('watch').checked = "false";
  if (document.getElementById('wpMovesubpages')) document.getElementById('wpMovesubpages').checked = "true";
  document.getElementsByTagName('wpMove').click();
  document.getElementById("movepage").submit();  
}
if (document.getElementById('WikiaPageHeader').getElementsByTagName('h1')[0] == 'Quellseite nicht vorhanden')
  window.close();



var Wk_Artikel = document.getElementById('WikiaArticle');
if (Wk_Artikel){
  var ErsatzFeld             = document.createElement("textarea");
      ErsatzFeld.id          = "Ers_Strg";
      ErsatzFeld.name        = "Ersatzstring";
      ErsatzFeld.placeholder = wgPageNameNoSpace;
      ErsatzFeld.tabIndex    = "1";
      ErsatzFeld.maxLength   = "250";
      ErsatzFeld.style.top      = "9px";
      ErsatzFeld.style.left     = "3px";
      ErsatzFeld.style.height   = "15px";
      ErsatzFeld.style.padding  = "2px";
      ErsatzFeld.style.margin   = "0";

  Wk_Artikel.insertBefore(ErsatzFeld,Wk_Artikel.childNodes[0]);
  var ErsatzFeldButton       = document.createElement("div");
      ErsatzFeldButton.className = "wikia-menu-button";
      ErsatzFeldButton.style.height = "15px";
      ErsatzFeldButton.style.fontSize = "15px";
      ErsatzFeldButton.style.padding   = "3px";
      ErsatzFeldButton.style.top = "-2px";
      ErsatzFeldButton.style.marginLeft = "5px";
      ErsatzFeldButton.onclick          = function(){
        var ErsatzstringSetzen = document.getElementById('Ers_Strg').value;
        var fenstereinstellungen = "height=150, width=276, directories=0, location=0, menubar=0, resizable=0, scrollbars=0, status=0, titlebar=0, toolbar=0, top=70, left=50px";
        var url = location.href+'';
        url = url.slice(0,url.lastIndexOf("/")+1) + 'Spezial:Verschieben/' +wgPageNameNoSpace;
        
        window.open(url + ' Baby Icon.png?Ersatzstring='+ErsatzstringSetzen+' Baby Icon.png', "Baby Icon", fenstereinstellungen);
        window.open(url + 'Teen.png?Ersatzstring='+ErsatzstringSetzen+' Jung.png', "Jung", fenstereinstellungen);
        window.open(url + 'Adult.png?Ersatzstring='+ErsatzstringSetzen+' Erwachsen.png', "Erwachsen", fenstereinstellungen);
        window.open(url + ' Icon.png?Ersatzstring='+ErsatzstringSetzen+' Icon.png', "Icon", fenstereinstellungen);
        window.open(url + ' Egg.png?Ersatzstring='+ErsatzstringSetzen+' Ei.png', "Ei", fenstereinstellungen);

        url = url.slice(0,url.lastIndexOf("/")+1) + 'Spezial:Verschieben/' +wgPageName.replace(/ /g, "");
        
        window.open(url + ' Baby Icon.png?Ersatzstring='+ErsatzstringSetzen+' Baby Icon.png', "Baby Icon", fenstereinstellungen);
        window.open(url + 'Teen.png?Ersatzstring='+ErsatzstringSetzen+' Jung.png', "Jung", fenstereinstellungen);
        window.open(url + 'Adult.png?Ersatzstring='+ErsatzstringSetzen+' Erwachsen.png', "Erwachsen", fenstereinstellungen);
        window.open(url + ' Icon.png?Ersatzstring='+ErsatzstringSetzen+' Icon.png', "Icon", fenstereinstellungen);
        window.open(url + ' Egg.png?Ersatzstring='+ErsatzstringSetzen+' Ei.png', "Ei", fenstereinstellungen);


        location.href = location.href + '?action=edit&Ersatzstring=' + ErsatzstringSetzen;
      }
      ErsatzFeldButton.appendChild(document.createTextNode('Go'));
  Wk_Artikel.insertBefore(ErsatzFeldButton,Wk_Artikel.childNodes[1]);

}