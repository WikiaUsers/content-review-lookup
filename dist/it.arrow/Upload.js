//   Tratto da https://onepiece.fandom.com/it
// ===================================================
//              Caricamento immagini
//
// Per guidare gli utenti a compilare le informzaioni
// delle immagine caricate
// ===================================================

// ===============================
//   Modifiche per la skin Oasis  
// ===============================

// Ripristiono Speciale:Carica
$(function() {
 if (window.UploadPhotos && window.UploadPhotos.showDialog) {
  $('a.wikia-button.upphotos').unbind('click',UploadPhotos.showDialog);
 }
});

/* Codice sostituito da http://dev.wikia.com/wiki/PreloadFileDescription
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
      '}}');
  }
});
*/
// END Precarica descrizione