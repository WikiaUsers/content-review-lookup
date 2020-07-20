
 
/* Размещённый здесь код JavaScript будет загружен всем пользователям при обращении к какой-либо странице */

/*Добавляет дополнительные флаги участникам.*/
 
// rights[""] = [""];
 
$(function() {
 var rights = {};
 
 
   //Участники
  rights["Система"]                     = ["Бот"];
 
 if (typeof rights[wgTitle] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[wgTitle].length; i < len; i++) {
 
        // add new rights
        $('<span class="tag">' + rights[wgTitle][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
});