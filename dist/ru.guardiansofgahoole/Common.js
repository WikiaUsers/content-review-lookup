/*Отображение ника на странице с соответствующим шаблоном*/
(function($, mw) {
   if (!$('.insertusername').length) {
       return;
   }
 
   if (wgUserName != 'null') {
       $('.insertusername').html(wgUserName);
   } else {
       $('.insertusername').text('Анонимный участник');
   }
   })(this.jQuery, this.mediaWiki);