// By English Boom Beach Wiki
$(function() {
   var elem = $('div.protection-image-hidden');
 
   if (typeof elem === 'undefined')
      return;
 
   // Relocate it and make it appear 
   var language = $('.chooselanguage');
   var btn = $('.wikia-button.comments');
   if (typeof language == "undefined") {
       language.after(elem);
       elem.addClass('protection-image');
       elem.removeClass('protection-image-hidden');
       return;
   }
   if (typeof btn !== 'undefined') {
       btn.after(elem);
   } else {
      btn = $('#WikiaMainContentContainer .wikia-menu-button');
      btn.after(elem);
   }
   elem.addClass('protection-image');
   elem.removeClass('protection-image-hidden');
});