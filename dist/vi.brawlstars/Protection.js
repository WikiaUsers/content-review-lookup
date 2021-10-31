   /**********************************************************
   **Mã nguồn cho tính năng hiển thị icon cho cấp độ bảo vệ**
  *****Mã nguồn gốc thuộc về Wiki Brawl Stars tiếng Anh*****
 **********************************************************/

function addProtectionIcon() {
   var elem = $('div.protection-image').get(0);
   if (typeof elem === 'undefined') {
      return;
   }
   // Đặt lại vị trí và hiển thị nó 
   var parent = $('.page-header__actions').get(0);
   if (typeof parent !== 'undefined') {
      $(parent).prepend(elem);
      $(elem).addClass('protection-image-visible').find('img').css({
          'vertical-align': 'middle'
      });
   }
}

$(document).ready(function() {
   addProtectionIcon();
});