// =====================================
//              Imports
// =====================================
 
// Veure MediaWiki:ImportJS

// InactiveUsers: Etiqueta per inactius 
InactiveUsers = { text: 'Inactiu' };

// BackToTopButton
window.BackToTopModern = true;

// ===============================
//  C�rrega de fitxers
//  [[Especial:Carrega]]
// ===============================
// Afegeix una descripci� predeterminada durant la c�rrega de fitxers
$(function preloadUploadDesc() {
  if ( wgCanonicalSpecialPageName != 'Upload' || $.getUrlVar('wpForReUpload') ) { return; }
 
  if ($('#wpUploadDescription').length) {
    $('#wpUploadDescription').append('== Llic�ncia ==\n' +
            '{{Fairuse'         +
            '}}');
  }
});