/* By the English Boom Beach Wiki (boombeach.wikia.com) */

function addProtectionBanner() {
   var elem = $('div.protection-image').get(0);
 
   if (typeof elem === 'undefined')
      return;
 
   // Relocate it and make it appear 
   var btn = $('a.wikia-button.comments.secondary').get(0);
 
   if (typeof btn !== 'undefined') {
      btn.parentNode.insertBefore(elem, btn.nextSibling);
      $(elem).addClass('protection-image-visible');
   }
   else {
      btn = $('#WikiaMainContentContainer .wikia-menu-button').get(0);
      btn.parentNode.insertBefore(elem, btn.nextSibling);
      $(elem).addClass('protection-image-visible');
   }
}
 
addOnloadHook(addProtectionBanner);