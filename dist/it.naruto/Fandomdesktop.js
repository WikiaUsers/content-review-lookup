// codes from https://onepiece.fandom.com/it (MediaWiki:Upload.js)
// Ripristiono Speciale:Carica
$(function() {
 if (window.UploadPhotos && window.UploadPhotos.showDialog) {
  $('a.wikia-button.upphotos').unbind('click',UploadPhotos.showDialog);
 }
});

// Preload File Description
// <nowiki> -- per evitare che il codice MediaWiki di seguito agisca su questa pagina --
PFD_template = '{{fair use}}[[categoria:immagini]]';
PFD_license = 'Fair use';
PFD_requireLicense = true;
// </nowiki>