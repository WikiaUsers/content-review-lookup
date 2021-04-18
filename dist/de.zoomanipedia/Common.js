// Import MediaWiki:Onlyifuploading.js (http://de.community.wikia.com/wiki/MediaWiki:Common.js)
if ( wgCanonicalSpecialPageName == "Upload" ) {
  document.write('<script type="text/javascript" src="/de/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }
 
/* Anpassungen für AjaxRC */
ajaxPages = ['Spezial:Letzte_Änderungen','Spezial:WikiActivity'];
AjaxRCRefreshText = 'Auto-Aktualisierung';
AjaxRCRefreshHoverText = 'Automatische Aktualisierung der kompletten Seite';

var ArchiveToolConfig = { 
   archiveListTemplate: 'Archiv',
   archivePageTemplate: 'Archiv-Seite',
   archiveSubpage: 'Archiv',
   userLang: false
};

/* Details automatisch ausfüllen 
*Autor: AmonFatals
*Taken from: de.monsterhunter.wikia.com/wiki/MediaWiki:Common.js */
function preloadUploadDesc() {
    if (wgPageName.toLowerCase() != 'Upload') {
        return;
    }
 
    document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Dateiinfo \r|Beschreibung= \r|Datum= \r|Autor= \r|Quelle= \r|Lizenz= \r}}"));
 
}

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