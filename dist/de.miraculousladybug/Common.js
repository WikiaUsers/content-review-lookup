/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

// Import MediaWiki:Onlyifuploading.js (http://de.community.wikia.com/wiki/MediaWiki:Common.js)
if ( wgCanonicalSpecialPageName == "Upload" ) {
  document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }
 
/* Anpassungen für AjaxRC */
ajaxPages = ['Spezial:Letzte_Änderungen','Spezial:WikiActivity'];
AjaxRCRefreshText = 'Auto-Aktualisierung';
AjaxRCRefreshHoverText = 'Automatische Aktualisierung der kompletten Seite';
 
 
/* Importierte Skripte */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxRC/code.js'
    ]
});
 
 /* Link zum Diskussions Feed */
if (mw.config.get('wgCanonicalSpecialPageName') == 'WikiActivity' || mw.config.get('wgCanonicalSpecialPageName') == 'Recentchanges') {
    $('<li>', {
        id: 'discussrclink',
    }).html('<a href="/wiki/Spezial:DiscussionsFeed">Diskussions Feed</a>')
    .prependTo('.toolbar .tools');
}
 
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
 
//Toolbar
if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",
    "speedTip": "Weiterleitung",
    "tagOpen": "#REDIRECT [[",
    "tagClose": "]]",
    "sampleText": "R"
    };
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://upload.wikimedia.org/wikipedia/commons/0/05/Button_Anf%C3%BChrung.png",
    "speedTip": "Anführungszeichen",
    "tagOpen": "„",
    "tagClose": "“",
    "sampleText": "M"
    };
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Button_en.png",
    "speedTip": "Interwiki",
    "tagOpen": "[[en:",
    "tagClose": "]]",
    "sampleText": "E"
    };
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://upload.wikimedia.org/wikipedia/commons/0/0c/Button_Link_DifferentName.png",
    "speedTip": "Link",
    "tagOpen": "[[|",
    "tagClose": "]]",
    "sampleText": "Link"
    };
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://upload.wikimedia.org/wikipedia/commons/3/3b/Button_template_alt.png",
    "speedTip": "Vorlage",
    "tagOpen": "{{",
    "tagClose": "}}",
    "sampleText": "Vorlage"
    };
}