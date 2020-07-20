// rights[""] = [""];
 
/* Code from ru.elderscrolls.wikia.com */
 
$(function() {
 var rights = {};
 
 
   //Бюрократы
 rights["White torch"]                 = ["Бюрократ"];
 rights["ValveHammerEditor"]           = ["Бюрократ"];

   //Администраторы
 rights["Thest"]                 = ["Одмиен"];

 
   //Откатчики/Модераторы чата
 rights["Iris iter"]                    = ["Администратор", "Технический архитектор"];
 
 
  if (typeof rights[wgTitle] != "undefined") {
 
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[wgTitle].length; i < len; i++) {
 
        $('<span class="tag">' + rights[wgTitle][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
});