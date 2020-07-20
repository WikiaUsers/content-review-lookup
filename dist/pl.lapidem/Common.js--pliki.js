$(function preloadUploadDesc() {
  if (wgPageName != 'Specjalna:Prześlij') { return; }
 
  if ($('#wpUploadDescription').length) {
    $('#wpUploadDescription').append('{{Obraz_infobox\n' +
      '| opis           = \n' +
      '| rozdział       = \n' +
      '| strona         = \n' +
      '| żródło         = \n' +
      '}}');
  }
});