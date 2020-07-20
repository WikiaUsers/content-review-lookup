/* Moves and adds a CSS class to "Show changes since X" link on RC*/
$(function() {
  $('.rcoptions > div').addClass('rcoptionSCS').css('position','relative').insertAfter('.rcoptions hr');
});

/* Re-add proper namespace prefix to titles where it has been removed "by design" */
$('.ns-5 .WikiaPageHeader h1').prepend('Memory Alpha ');
$('.ns-6 .WikiaPageHeader h1').prepend('File:');
$('.ns-7 .WikiaPageHeader h1').prepend('File ');
$('.ns-8 .WikiaPageHeader h1').prepend('MediaWiki:');
$('.ns-9 .WikiaPageHeader h1').prepend('MediaWiki ');
$('.ns-10 .WikiaPageHeader h1').prepend('Template:');
$('.ns-11 .WikiaPageHeader h1').prepend('Template ');
$('.ns-13 .WikiaPageHeader h1').prepend('Help ');
$('.ns-14 .WikiaPageHeader h1').prepend('Category:');
$('.ns-15 .WikiaPageHeader h1').prepend('Category ');

/* Remove image attribution as per new Wikia regulations */
$('.picture-attribution').remove();