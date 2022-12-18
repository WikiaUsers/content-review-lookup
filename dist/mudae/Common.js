/* Any JavaScript here will be loaded for all users on every page load. */

/*----- Link Preview -----*/
/* Config object */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });

window.pPreview.noimage = 'https://static.wikia.nocookie.net/mudae/images/f/fb/2.png';
window.pPreview.delay = 100;

/* Do not preview links in/using these classes.
no-preview and no-preview-links are flexible classes for future use */
window.pPreview.RegExp.iparents = ['.custom-tabs', '.mbox', '.navbox2', 'category-page__member-link', '.thumbimage', '.no-preview', '.no-preview-links'];

/* Do not include these classes in the preview.
no-preview and no-preview-include are flexible classes for future use */
window.pPreview.RegExp.noinclude = ['.custom-tabs', '.mbox', '.mbox__content__text', '.caption', '.mw-customtoggle', '.no-preview', '.no-preview-include'];

/* Do not use these images in the preview */
window.pPreview.RegExp.iimages = [/Kakera\.png/, /PIN\d{3}\.png/, /\d{18}\.png/];

/* Put images at the side if their height is tall */
mw.hook('ppreview.show').add(function(pp) {
  var $pp = $(pp), $div = $pp.find('div'), $img = $pp.find('img');
  setTimeout(function() {
    if(($div.width()/2) > $img.width()) {
      $img.css({float:'right'});
      $div.css({display:'block'});
    }
  }, 100)
});