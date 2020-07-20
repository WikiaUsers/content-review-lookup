// rights[""] = [""];
 
/* Code from ru.elderscrolls.wikia.com */
 
$(function() {
 var rights = {};
 
   //Боты
 rights["EleventhSiege"]               = ["Бот"];

   //Бюрократы
 rights["White torch"]                 = ["Бюрократ"];

   //Откатчики

   //Откатчики/Модераторы чата

  if (typeof rights[wgTitle] != "undefined") {
 
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[wgTitle].length; i < len; i++) {
 
        $('<span class="tag">' + rights[wgTitle][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
});