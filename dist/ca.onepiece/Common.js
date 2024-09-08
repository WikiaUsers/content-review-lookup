// =====================================
//              Imports
// =====================================
 
// Veure MediaWiki:ImportJS

// InactiveUsers: Etiqueta per inactius 
InactiveUsers = { text: 'Inactiu' };

// BackToTopButton
window.BackToTopModern = true;

// ===============================
//  Càrrega de fitxers
//  [[Especial:Carrega]]
// ===============================
// Afegeix una descripció predeterminada durant la càrrega de fitxers
$(function preloadUploadDesc() {
  if ( wgCanonicalSpecialPageName != 'Upload' || $.getUrlVar('wpForReUpload') ) { return; }
 
  if ($('#wpUploadDescription').length) {
    $('#wpUploadDescription').append('== Llicència ==\n' +
            '{{Fairuse'         +
            '}}');
  }
});