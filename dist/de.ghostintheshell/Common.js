/* Jedes JavaScript hier wird f�r alle Benutzer f�r jede Seite geladen. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 

if(!!$('.insertusername').length) {
    $('.insertusername').text(wgUserName);
}