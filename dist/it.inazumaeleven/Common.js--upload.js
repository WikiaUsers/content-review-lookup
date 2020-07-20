// ===================================================
//              Caricamento immagini
//
// Per guidare gli utenti a compilare le informzaioni
// delle immagine caricate
// Codici in parte presi da
// http://admintools.wikia.com/wiki/MediaWiki:Wikia.js/uploadPhoto.js
// ===================================================

// ===============================
//   Modifiche per la skin Oasis  
// ===============================

// Ripristiono Speciale:Carica
// Reindirizza i pulsanti carica un'immagine a Speciale:Carica
$(function() { 
	if (window.UploadPhotos && window.UploadPhotos.showDialog) {
		$('a.wikia-button.upphotos').unbind('click',UploadPhotos.showDialog);
	}
});
// END Ripristiono Speciale:Carica
 
// Placeholders linkano a Speciale:Carica
function PlaceholderLink() {
	$('.wikiaPlaceholder a').attr('href', '/wiki/Special:Upload').unbind('click');
}
$(PlaceholderLink);
// END Placeholders linkano a Speciale:Carica

// ===============================
//     Precarica descrizione
// ===============================
// Aggiunge una descrizione standard alla nuove immagini
$(function preloadUploadDesc() {
  if ( wgCanonicalSpecialPageName != 'Upload' || $.getUrlVar('wpForReUpload') ) { return; }
 
  if ($('#wpUploadDescription').length) {
    $('#wpUploadDescription').append('== Fonte ==\n' +
      '{{Senza fonte'         +
      '}}\n\n'                +
      '== Licenza ==\n'       +
      '{{Senza licenza'       +
      '}}\n'                  +
      '[[Categoria:Immagini ' +
      'senza categorie]]');
  }
});
// END Precarica descrizione