$(function preloadUploadDesc() {
  if (wgCanonicalSpecialPageName != 'Upload' || $.getUrlVar('wpForReUpload')) { return; }
 
  if ($('#wpUploadDescription').length) {
    $('#wpUploadDescription').append('TEXT');
  }
});