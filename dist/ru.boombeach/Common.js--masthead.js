/* Any JavaScript here will be loaded for all users on every page load. */

/*Добавляет дополнительные "статусы" участников. Однако прав не дает.*/

// rights[""] = [""];

// Код написан: Rappy_4187 для англовики.

$(function() {
 var rights = {};

 rights["Gvenvivar"]                      = ["Бот"];
 rights[""]                             =[""];

//Участники, имеющие более одного статуса
 rights["Plizirim"] = ["Helper", "Администратор"];
 rights["Dragon Rainbow"] = ["VSTF", "German Wiki Administrator"];
 rights["Kopcap94"] = ["VSTF", "Администратор"];
 
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