/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
/* Any JavaScript here will be loaded for all users on every page load. */
 
 
/*Добавляет дополнительные "статусы" участников. Однако прав не дает.*/
 
// rights[""] = [""];
 
// Код написан: Rappy_4187 для англовики.
 
$(function() {
 var rights = {};
 
    //Администраторы

    rights["Листик"]       = ["Директор"];
    
  


    //Модераторы чата

    
    //Откатчики


    //Модераторы форума

    
 

    //Wikia Helper

    rights["Kuzura"]       = ["Помощник"];
    rights["Plizrim"]       = ["Помощник"];
    rights["Jormun"]       = ["Помощник"];
    rights["Wildream"]       = ["Помощник"]; 
    rights["SvetlanaPtrv"]       = ["Помощник"];

    //Остальные

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