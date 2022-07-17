function addProtectionIcon() {
   var elem = $('div.protection-image').get(0);
   if (typeof elem === 'undefined') {
      return;
   }
   // Relocate it and make it appear 
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

// Click element with this class to bring up an alert with the element's title attribute's contents (Template:Help)
$(".titleAlert").click(function() {
    alert($(this).attr("title"));
});