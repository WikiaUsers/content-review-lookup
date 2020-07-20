/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "anzeigen",
	hide: "ausblenden",
	showAll: "alle anzeigen",
	hideAll: "alle ausblenden"
    }
};
/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

if (mwCustomEditButtons) {

/*** wrappers *****/

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/b/b4/Button_category03.png",
     "speedTip": "Kategorie",
     "tagOpen": "[[Kategorie:",
     "tagClose": "]]",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/4/47/Button_redir.png",
     "speedTip": "Weiterleitung",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/9/9d/Button_halt.png",
     "speedTip": "Mögliche Urheberrechtsverletzung",
     "tagOpen": "{{URV",
     "tagClose": "}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/vereins/images/3/3e/Sperre.png",
     "speedTip": "Gesperrter Benutzer",
     "tagOpen": "{{Gesperrter_Benutzer",
     "tagClose": "}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_delete.png",
     "speedTip": "Löschantrag stellen",
     "tagOpen": "{{Löschantrag",
     "tagClose": "}}",
     "sampleText": "Grund"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/6/60/Button_support.png",
     "speedTip": "Mit PRO stimmen",
     "tagOpen": "{{PRO",
     "tagClose": "}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/9/98/Button_oppose.png",
     "speedTip": "Mit CONTRA stimmen",
     "tagOpen": "{{CONTRA",
     "tagClose": "}}",
     "sampleText": ""};


   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/c/cb/Button_wikipedia.png",
     "speedTip": "Aus WP importiert",
     "tagOpen": "{{WP",
     "tagClose": "}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/1/12/Button_gallery.png",
     "speedTip": "Gallerie einfügen",
     "tagOpen": "<gallery>",
     "tagClose": "</gallery>",
     "sampleText": "Füge hier deine Bilder ein"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/vereins/images/9/92/Anbeten.png",
     "speedTip": "Anbeten",
     "tagOpen": "[[Datei:Mx1.gif]]",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/vereins/images/c/cf/Nagelfeile.png",
     "speedTip": "Nagelfeile",
     "tagOpen": "[[Datei:Feile.gif]]",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/vereins/images/8/8d/HarHarHar.png",
     "speedTip": "HarHar",
     "tagOpen": "[[Datei:Twinkle.gif]]",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/vereins/images/6/6a/Verlegen.png",
     "speedTip": "Verlegen sein",
     "tagOpen": "[[Datei:Helga.gif]]",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/vereins/images/5/51/Help_me.png",
     "speedTip": "Zu Hülf",
     "tagOpen": "[[Datei:Help.gif]]",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/vereins/images/4/48/LOL.png",
     "speedTip": "LOL",
     "tagOpen": "[[Datei:Lol1.gif]]",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/vereins/images/4/4f/Fragezeichen.png",
     "speedTip": "???",
     "tagOpen": "[[Datei:IrritierterSmiley.gif]]",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/vereins/images/7/75/Zwinkern.png",
     "speedTip": "Zwinkern",
     "tagOpen": "[[Datei:Zwinker.png]]",
     "tagClose": "",
     "sampleText": ""};

}