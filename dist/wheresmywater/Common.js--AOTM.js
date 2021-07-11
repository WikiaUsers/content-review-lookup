//Based off Protection JS
	
function addArticleMonthBanner() {
   var elem = $('div.aotm-image').get(0);
   if (typeof elem === 'undefined') {
      return;
   }
   // Relocate it and make it appear 
   var parent = $('.page-header__actions').get(0);
   if (typeof parent !== 'undefined') {
      $(parent).prepend(elem);
      $(elem).addClass('aotm-image-visible');
   }
}
$(document).ready(function() {
   addArticleMonthBanner();
});