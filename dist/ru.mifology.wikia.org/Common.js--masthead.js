/*Adds extra masthead entries for:
-Администраторы
-Патрульный
-Журналист
-Боты
-Участники месяца
*/

// WRITTEN BY User:Grentor, used with permission.

$(function() {
 var rights = {};

   //БЮРОКРАТЫ

   //БЮРОКРАТЫ + MOTM (chronological)
 rights["Grentor"]             = ["Основатель", "Бюрократ","MOTM - Июнь 2012"];
 
   //АДМИНИСТРАТОРЫ
   
 rights["Dovahkin20"]                 = ["Администратор (Inactive)"];

   //АДМИНИСТРАТОРЫ + MOTM (chronological)
 rights["Kagrenak"]                = ["Администратор","MOTM - Май 2012"];
 
                                      
   //ПАТРУЛЬНЫЕ     
   

   
   //НОВОСТНАЯ КОМАНДА
   
   
   //MOTM (chronological)

 rights["Irizka"]                = ["Модератор чата", "MOTM - Июль 2012"];
   

   //БОТЫ
   

  if (typeof rights[wgTitle] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.group').remove();
 
      for( var i=0, len=rights[wgTitle].length; i < len; i++) {
 
        // add new rights
        $('<span class="group">' + rights[wgTitle][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
});