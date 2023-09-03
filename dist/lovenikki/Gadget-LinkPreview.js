importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:LinkPreview/code.js',
    ]
});

/*----- Link Preview -----*/
/* Config object */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });

window.pPreview.scale = {r: '?', t: '/scale-to-width-down/200?'};
window.pPreview.noimage = 'https://static.wikia.nocookie.net/lovenikki/images/7/77/Empty_Image.png';
window.pPreview.delay = 100;
window.pPreview.tlen = 500;

/* Do not preview links in/using these classes.
no-preview and no-preview-links are flexible classes for future use */
window.pPreview.RegExp.iparents = ['.nbs', '.pagetabber', 'category-page__member-link', 'mw-changeslist', '.wikia-gallery-item', '.no-preview', '.no-preview-links'];

/* Do not include these classes in the preview.
no-preview and no-preview-include are flexible classes for future use */
window.pPreview.RegExp.noinclude = ['.nbs', '.pagetabber', '.navbox', '.navbox2', '.mbox__content__text', '.notice', '.mbox', '.caption', '.reference', '.references', '.mw-customtoggle', '.no-preview', '.no-preview-include'];

/* Do not use these images in the preview */
window.pPreview.RegExp.iimages = [/Diamond\.png/, /Gold\.png/, /VIP Exp\.png/, /.* icon\.png/, /Attribute .*\.png/, /Style .*\.png/, /G?H\d*\.png/];

/* Do not use these pages in the preview */
/* Note: This one is not working yet and I am not sure why. */
window.pPreview.RegExp.ipages = [/V\d\: \d+\-S*\d+.+/];

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