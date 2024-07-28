/* Any JavaScript here will be loaded for all users on every page load. */
$('.toggle_button').on('click', function() {
 $((this).closest('.toggle_container').querySelector('.toggle_content')).attr('class','toggle_content_hide');
 if($(this).attr('class') == 'toggle_button toggle_active') {
  $(this).attr('class','toggle_button');
 } else {
  $((this).closest('.toggle_container').querySelector('.toggle_active')).attr('class','toggle_button');
  $(this).attr('class','toggle_button toggle_active');
  for (var i = 0; i < $((this).closest('.toggle_container').querySelectorAll('.toggle_button')).length; i++) {
   if($((this).closest('.toggle_container').querySelectorAll('.toggle_button')[i]).attr('class') == 'toggle_button toggle_active') {
    $((this).closest('.toggle_container').querySelectorAll('.toggle_content_hide')[i]).attr('class','toggle_content');
   }
  }
 }
});