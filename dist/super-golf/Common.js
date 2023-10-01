/* Any JavaScript here will be loaded for all users on every page load. */

/* Template Styling */
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

/* Article/Page Styling */

$(document).ready(function() {
  function floatImage() {
    $('div.float-up-down').animate({ marginTop: '+=10px' }, 1000).animate({ marginTop: '-=10px' }, 1000, floatImage);
  }
  
  $('div.animation-container').addClass('float-up-down');
  
  // Start the animation
  floatImage();
});