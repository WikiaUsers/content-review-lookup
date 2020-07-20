/* Any JavaScript here will be loaded for all users on every page load. */
/* Any JavaScript here will be loaded for all users on every page load. */
 
 
/*Добавляет дополнительные "статусы" участников. Однако прав не дает.*/
 
// rights[""] = [""];
 
// Код написан: Rappy_4187 для англовики.
 
$(function() {
 var rights = {};
 
    //Администраторы

    rights["Летний Ветер"]      = ["Предводительница"];
    rights["Фиолетовая Тень"] = ["Обитательница Сумеречного Леса"]
    right["Морская Звездочка"] = ["Предводительница"]
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