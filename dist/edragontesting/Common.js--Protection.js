$(function addProtectionBanner() {
   var elem = $('div.protection-image');
   // Relocate it and make it appear 
   var parent = $('.page-header__title-wrapper > .page-header__actions');
      $(parent).prepend(elem);
      $(elem).addClass('protection-image-visible');
});