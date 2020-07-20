/* Link Preview */
mw.hook('ppreview.show').add(function(pp) {
  var $pp = $(pp), $div = $pp.find('div'), $img = $pp.find('img');
  setTimeout(function() {
    if(($img.height()) > $img.width()) {
      $pp.css({width:'450px'});
      $pp.css({height:'auto'});
      $img.css({float:'right'});
      $img.css({width:'180px'});
      $div.css({display:'block'});
      $div.css({width:'230px'});
      $div.css({padding: '20px 15px 15px 15px'});
    } 
    else
    {
      $pp.css({width:'320px'});
      $img.css({height:'auto'});
      $div.css({height: 'auto'});
      $div.css({padding: '15px 15px 15px 15px'});
    }
  }, 100)
});
 
window.pPreview = $.extend(true, window.pPreview, {
    tlen: 450,
    delay: 450,
    scale: false,
    RegExp: {
       ilinks: [new RegExp('(Diskussion:)|(Benutzer:)|(Datei:)|(MediaWiki:)|(Vorlage:)|(Hilfe:)|(Kategorie:)|(Forum:)|(Benutzer_Blog:)|(Blog:)')],
       iclasses: ['activityfeed-diff'],
       iparents: ['#IgnorePreview', 'div[data-ignore-me=1]', '.tabs', '.wikia-gallery', '.wikiaPhotoGallery-slider-body', '.controls'],
       onlyinclude : ['.LinkPreviewText', '[data-include-me=1]'],
   },
});