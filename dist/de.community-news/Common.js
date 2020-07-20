// Import MediaWiki:Onlyifuploading.js (http://de.community.wikia.com/wiki/MediaWiki:Common.js)
if ( wgCanonicalSpecialPageName == "Upload" ) {
  document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

/* Variablen für AjaxRC*/
window.ajaxPages = ["Spezial:Letzte_Änderungen","Spezial:Logbuch","Spezial:WikiActivity"];
window.AjaxRCRefreshText = 'Auto-Aktualisierung';
window.AjaxRCRefreshHoverText = 'automatische Aktualisierung ohne Neuladen der kompletten Seite';
 
/* Skript-Import */
importArticles({
    type: "script",
    articles: [
        'u:dev:AjaxRC/code.js',
        'u:dev:MediaWiki:ShowHide/code.js'
    ]
});

/* Details automatisch ausfüllen 
*Autor: AmonFatals
*Taken from: de.monsterhunter.wikia.com/wiki/MediaWiki:Common.js */
function preloadUploadDesc() {
    if (wgPageName.toLowerCase() != 'Upload') {
        return;
    }
 
    document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Dateiinfo \r|Beschreibung= \r|Datum= \r|Autor= \r|Quelle= \r|Lizenz= \r}}"));
 
}
addOnloadHook(preloadUploadDesc);
// Entferne auf [[Spezial:Hochladen]] „keine Vorauswahl“
 function remove_no_license_special_upload() {
   if (wgPageName != "Spezial:Hochladen")
     return;
   var license = document.getElementById("wpLicense");
   if (!license)
     return;
   var options = license.getElementsByTagName("option");
   if (!options)
     return;
   license.removeChild(options[0]);
 }
 
 addOnloadHook(remove_no_license_special_upload);
 
// Entferne auf [[Spezial:Mehrere_Dateien_hochladen]] „keine Vorauswahl“
 function remove_no_license_special_multipleupload() {
   if (wgPageName != "Spezial:Mehrere_Dateien_hochladen")
     return;
   var license = document.getElementById("wpLicense");
   if (!license)
     return;
   var options = license.getElementsByTagName("option");
   if (!options)
     return;
   license.removeChild(options[0]);
 }
 
 addOnloadHook(remove_no_license_special_multipleupload);