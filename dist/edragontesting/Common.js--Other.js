
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
$(document).ready(function() {
   addProtectionBanner();
});
function addArticleMonthBanner() {
   var elem = $('div.aotm-image').get(0);
   if (typeof elem === 'undefined') {
      return;
   }
   // Relocate it and make it appear 
   var parent = $('.page-header__contribution-buttons .wds-button-group').get(0);
   if (typeof parent !== 'undefined') {
      $(parent).prepend(elem);
      $(elem).addClass('aotm-image-visible');
   }
}
$(document).ready(function() {
   addArticleMonthBanner();
});