$('document').ready(function ( ) {
  //Restores normal upload form to stop weird names everywhere. From wookieepedia.
  if (typeof window.UploadPhotos !== "undefined") {
    $('a.wikia-button.upphotos').unbind('click', window.UploadPhotos.showDialog);
  }
});