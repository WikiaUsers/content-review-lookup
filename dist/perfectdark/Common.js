
// ============================================================
// BEGIN Template:Games
// ============================================================
 
// Description: Add icons to article title
// Credit:      User:Porter21
 
function addTitleIcons () {
   var iconBar = $('#va-titleicons');
   var previewBar = $('#va-titleicons-preview');
 
   if (iconBar.length > 0 && $('a', previewBar).length > 0) {
      if (skin == 'oasis' || skin == 'wikia') {
         var detailsBar = $('#WikiaPageHeader details');
 
         if (detailsBar.length > 0) {
            iconBar.css('display', 'block').appendTo(detailsBar);
         }
      } else if (skin == 'monobook') {
         var firstHeading = $('#firstHeading').css('position', 'relative');
 
         if (firstHeading.length > 0) {
            iconBar.css('display', 'block').appendTo(firstHeading.css('padding-right', previewBar.width() + 25));
         }
      }
 
      $('#va-titleicons-more').append('<img width="0" height="0" class="va-titleicons-chevron" src="https://images.wikia.nocookie.net/common/skins/common/blank.gif">');
 
      iconBar.hover(
         function () {
            $(this).addClass('va-titleicons-hover');
         }, function () {
            $(this).removeClass('va-titleicons-hover');
         });
   }
}
 
jQuery(function($) {
   if (skin == 'monobook' || skin == 'oasis' || skin == 'wikia') {
      addTitleIcons();
   }
});
 
// ============================================================
// END Template:Games
// ============================================================