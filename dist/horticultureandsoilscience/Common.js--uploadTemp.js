$(function preloadUploadDesc() {
  if (wgPageName != 'Special:Upload') { return; }

  if ($('#wpUploadDescription').length) {
    $('#wpUploadDescription').append('{{Information\n' +
      '| Description    = \n' +
      '| Source         = \n' +
      '| Date           = \n' +
      '| Author         = \n' +
      '| Permission     = \n' +
      '| Other_versions = \n' +
      '}}');
  }
});