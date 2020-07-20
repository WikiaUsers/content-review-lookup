                /*****Protection Page Icons (from Boom Beach Wiki)*****/
function addProtectionBanner() {
   var elem = $('div.protection-image').get(0);
   if (typeof elem === 'undefined') {
      return;
   }
   // Relocate it and make it appear 
   var parent = $('.page-header__contribution-buttons .wds-button-group').get(0);
   if (typeof parent !== 'undefined') {
      $(parent).prepend(elem);
      $(elem).addClass('protection-image-visible');
   }
}
addOnloadHook(addProtectionBanner);

                            /*****Link Preview Settings*****/

mw.hook('ppreview.show').add(function(pp) {
  var $pp = $(pp), $div = $pp.find('div'), $img = $pp.find('img');
  setTimeout(function() {
    if(($div.width()/1) > $img.width()) {
      $img.css({float:'right'});
      $div.css({display:'block'});
    }
  }, 100)
});

window.pPreview = $.extend(true, window.pPreview, {
    tlen: 450,
    delay: 450,
    RegExp: {
       iparents: ['#IgnorePreview', 'div[data-ignore-me=1]', '.tabs'],
       onlyinclude : ['.LinkPreviewText', '[data-include-me=1]'],
   },
});