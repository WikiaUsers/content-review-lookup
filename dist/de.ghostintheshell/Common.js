/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 

if(!!$('.insertusername').length) {
    $('.insertusername').text(wgUserName);
}