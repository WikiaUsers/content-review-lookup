/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
 
/*Даём ещё руки и и инженера.*/
 
// rights[""] = [""];
 
// Код написан: Rappy_4187 для англовики.
 
$(function() {
 var rights = {};
 
 
   //Участники, имеющие более одного статуса
  rights["Fedor 22"]                     = ["Правая рука Капитана-лейтенанта"];
  rights["Алмас"]                     = ["Левая рука Капитана-лейтенанта"];
  rights["Nutone+Xitrokris"]                     = ["Инженер"];
  rights["603140"]                     = ["Генерал"];
  
 
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