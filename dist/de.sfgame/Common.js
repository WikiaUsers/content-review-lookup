/* Jedes JavaScript hier wird f�r alle Benutzer f�r jede Seite geladen. */

 // Import [[MediaWiki:Onlyifuploading.js]] 

$(function() {
  $('a[href="/wiki/Spezial:Chat"]').attr('data-canonical', 'chat')
});