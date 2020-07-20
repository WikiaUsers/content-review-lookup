/* Any JavaScript here will be loaded for all users on every page load. */
/* Any JavaScript here will be loaded for all users on every page load. */
 
 
/*Добавляет дополнительные "статусы" участников. Однако прав не дает.*/
 
// rights[""] = [""];
 
// Код написан: Rappy_4187 для англовики.
 
$(function() {
 var rights = {};
 
    //Администраторы
 
    rights["Половинка луны"]      = ["Вожак"];
    rights["Рыбья Звезда"]       = ["Помощник Вожака"];
    rights["Лепестянная звезда"]       = ["Помощник Вожака"];
    rights["Лиличка"]             = ["Помощник Вожака"]
     //Модераторы чата
 
    rights[""]   = ["Патрульный"];
    rights[""]     = ["Патрульный"];
    rights[""]     = ["Патрульный"];
 
    //Откатчики
 
    rights["Льдинка"]       = ["Целительница"];
 
    //Модераторы форума
 
    rights[" "]    = [" "]
 
    //Wikia Helper
 
    rights["Kuzura"]       = ["Бродяга"];
    rights["Plizrim"]       = ["Бродяга"];
    rights["Jormun"]       = ["Бродяга"];
    rights["Wildream"]       = ["Бродяга"]; 
    rights["SvetlanaPtrv"]       = ["Бродяга"];
 
    //Остальные
 
    rights[""]       = ["Товарищ"];
 
 
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