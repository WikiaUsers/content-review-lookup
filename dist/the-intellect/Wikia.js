$('.bookcover').hide();
$('.book').bind('mouseover', function() {
        $('.bookcover').fadeOut();
        $('#'+$(this).attr('id')+'cover').fadeIn();
    });

$('.book').bind('mouseoff', function() {
  $('.bookcover').fadeOut();
});