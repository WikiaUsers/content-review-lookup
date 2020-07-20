/* Any JavaScript here will be loaded for all users on every page load. */
/*Добавляет дополнительные "статусы" участников. Однако прав не дает.*/
/* База - http://ru.wikies.wikia.com/wiki/MediaWiki:Common.js/masthead.js */
 
// rights[""] = [""];
 
// Код написан: Rappy_4187 для англовики.
 
$(function() {
 var rights = {};
 
 rights["Skorp24"] = ["АДМИНИСТРАТОР"];
 rights["Cheslav"] = ["АДМИНИСТРАТОР"];
 rights["Retlizy"] = ["АДМИНИСТРАТОР", "БЮРОКРАТ"];
 rights["SkorpBot"] = ["БОТ"];
 rights["TZhivova"] = ["АВТОР"];
 rights["Shirleeman"] = ["ОТКАТЧИК"];

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