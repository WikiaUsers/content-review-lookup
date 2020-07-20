/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

window.SpoilerAlertJS = {
    question: 'Dieser Artikel beinhaltet Spoiler. Willst du fortfahren?',
    yes: 'Ja',
    no: 'Nein',
    fadeDelay: 1600
};