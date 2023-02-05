/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
/*** Это массив изображений для логотипа вики ***/
var wordmarkImages = ['https://images.wikia.nocookie.net/castleclash/ru/images/1/12/Wiki-wordmark_1.png', 'https://images.wikia.nocookie.net/castleclash/ru/images/f/f8/Wiki-wordmark_2.png', 'https://images.wikia.nocookie.net/castleclash/ru/images/e/e3/Wiki-wordmark_3.png'];
$(function () {
    $('.wordmark').find('img').attr('src', wordmarkImages[Math.floor(Math.random() * wordmarkImages.length)]);
});
/*** Тест званий ***/
window.onload = function () {
if (wgUserName !== 'null') {
        $('.insertusername').html(wgUserName);
    }
}
$(function() {
 var rights = {};
   //users
 rights["Jack Colt"]                    = ["ХРАНИТЕЛЬ WIKIA"];

  if (typeof rights[wgTitle] != "undefined") { 
       //remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
      for( var i=0, len=rights[wgTitle].length; i < len; i++) {
        // add new rights
        $('<span class="tag">' + rights[wgTitle][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
});