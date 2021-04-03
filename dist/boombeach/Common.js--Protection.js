function addProtectionBanner() {
   var elem = $('div.protection-image').get(0);
   if (typeof elem === 'undefined') {
      return;
   }
   // Relocate it and make it appear 
   var parent = $('.page-header__contribution > div:first-child').get(0);
   if (typeof parent !== 'undefined') {
      $(parent).prepend(elem);
      $(elem).addClass('protection-image-visible').find('img').css({
          'position': 'relative',
          'top': '-3px',
          'vertical-align': 'middle',
          'margin-right': '5px'
      });
   }
}

$(document).ready(function() {
   addProtectionBanner();
});