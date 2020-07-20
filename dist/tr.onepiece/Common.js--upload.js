// ===================================================
//              Images upload
//
// To guide users in adding information
// about the upload images
// Codes in part took from
// http://admintools.wikia.com/wiki/MediaWiki:Wikia.js/uploadPhoto.js
// ===================================================

// ===============================
//       Preload description
// ===============================
// Add a standard description to new images
$(function preloadUploadDesc() {
  if ( wgCanonicalSpecialPageName != 'Upload' || $.getUrlVar('wpForReUpload') ) { return; }
 
  if ($('#wpUploadDescription').length) {
    $('#wpUploadDescription').append('== Source ==\n' +
      '{{No Source'         +
      '}}\n\n'                +
      '== Licensing ==\n'       +
      '{{No License'       +
      '}}');
  }
});
// END Preload description
/* Any JavaScript here will be loaded for all users on every page load. */