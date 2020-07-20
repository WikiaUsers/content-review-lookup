// script for [[:de:Wikipedia:Persönliche Bekanntschaften]]
// author: [[:de:Benutzer:Euku]]
// second part: [[MediaWiki:Gadget-PB2.js]]
// <nowiki>

var persBekannt = {
  workPage: "Wikipedia:Pers%C3%B6nliche_Bekanntschaften/neue_Anfragen",
  requestPage: "Wikipedia:Pers%C3%B6nliche_Bekanntschaften/neue_Eintr%C3%A4ge",
  userList: "Wikipedia:Pers%C3%B6nliche Bekanntschaften/JS-alle Benutzer",
  bigUserList: "Wikipedia:Pers%C3%B6nliche Bekanntschaften/Teilnehmerliste",
  newUserList: "Wikipedia:Pers%C3%B6nliche Bekanntschaften/Neu_dazugekommen",
  versionCheckPage: "User:Euku/PB-version.css",
  PBJSversion: 15
}

function loadSecondScript() {
     xmlHttp = null;
     if (typeof XMLHttpRequest != 'undefined') { xmlHttp = new XMLHttpRequest(); }
     if (!xmlHttp) {
        try { xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); }
        catch(e) {
            try { xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); }
            catch(e) { throw 'Could not create XMLHttpRequest. Stopping now.'; }
        }
     }
     if (xmlHttp) {
        xmlHttp.open('GET', wgServer + wgScript + '?title=MediaWiki:Gadget-PB2.js&action=raw&ctype=text/javascript', false);
        xmlHttp.send(null);
        return (xmlHttp.responseText);
     }
     return false;
 }

// test with encodeURI and without it, because document.URL is encoded in FF and IE but decoded in Opera
// load [[MediaWiki:Gadget-PB2.js]] if necessary
var myArticlePath = wgArticlePath.replace(/\$1/g, "");
if (wgCanonicalNamespace == "Project" && (document.URL == wgServer + myArticlePath + persBekannt.workPage || 
     document.URL == wgServer + myArticlePath + persBekannt.workPage + '?action=purge' || encodeURI(document.URL) == wgServer + myArticlePath + persBekannt.workPage || encodeURI(document.URL) == wgServer + myArticlePath + persBekannt.workPage + '?action=purge'  || encodeURI(document.URL) == wgServer + myArticlePath + 'Wikipedia:PB/A' )) {
   eval(loadSecondScript());
   addOnloadHook(startGUI);
}
// </nowiki>