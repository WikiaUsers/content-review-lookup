window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.tlen = 300;
window.pPreview.RegExp.noinclude = [".inftemplate", ".quote", ".mw-ext-cite-error", ".error", ".references", ".reference", ".sup.reference"];
window.pPreview.RegExp.iimages = ['Non-Canon_TRTF-Alt.png'];

mw.hook('ppreview.show').add(function(pp) {
  var $pp = $(pp), $div = $pp.find('div'), $img = $pp.find('img');
  setTimeout(function() {
    var w = $img.width(),
        h = $img.height();
    if(h > w) {
      $img.css({float:'right'});
      $div.css({display:'block'});
      $pp.addClass('ppreview-vertical');
    }
  }, 100);
});