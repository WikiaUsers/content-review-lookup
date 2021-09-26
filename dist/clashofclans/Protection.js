/* Any JavaScript here will be loaded for all users on every page load. */

function addProtectionBanner() {
   var elem = $('div.protection-image').get(0);
   if (typeof elem === 'undefined') {
      return;
   }
   // Relocate it and make it appear 
   var parent = $('.page-header__contribution-buttons .wds-button-group, .page-header__bottom .page-header__actions').get(0);
   if (typeof parent !== 'undefined') {
      $(parent).prepend(elem);
      $(elem).addClass('protection-image-visible');
   }
}
$(document).ready(function() {
   addProtectionBanner();
});