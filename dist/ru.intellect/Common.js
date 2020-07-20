/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/*Добавляет дополнительные «статусы» участников. Однако прав не дает.*/
 
// rights[""] = [""];
 
// Код написан: Rappy 4187 для англовики.
 
$(function() {
 var rights = {};
 
 
   //Участники, имеющие более одного статуса
  rights["MajortBot"]                     = ["Бот"];
 
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
 
//Username
var username = wgUserName;
if (username != null) {
	$('#InputUsername').html(username);
}