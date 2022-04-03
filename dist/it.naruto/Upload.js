// Aggiunge una descrizione standard alla nuove immagini (original on https://onepiece.fandom.com/it/wiki/MediaWiki:Upload.js?action=history)
$(function preloadUploadDesc() {
  if ( wgCanonicalSpecialPageName != 'Upload' || $.getUrlVar('wpForReUpload') ) { return; }
 
  if ($('#wpUploadDescription').length) {
    $('#wpUploadDescription').append('{{fair use}}[[categoria:immagini]]');
  }
});