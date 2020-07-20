/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

if (mwCustomEditButtons) {

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/b/b9/Wiki-button.png",
     "speedTip": "Wikiseite anlegen",
     "tagOpen": "{{",
     "tagClose": "}}",
     "sampleText": "Wiki|Url=de.xy|Thema=Name des Themas|Name=Wikiname|Bild=https://images.wikia.nocookie.net/digimon/de/images/b/bc/Wiki.png url fixen, statt 'digimon' dasselbe wie bei url eintragen"};
}