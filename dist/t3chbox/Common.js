//Collapse Code
$('.hn-collapse').click(function() {
  if ( $('.hn-collapsible').is(':hidden') ) {
    $('.hn-collapsible').slideDown();
	$('.hn-collapse').text('[Hide]');
  } else {
    $('.hn-collapsible').slideUp();
	$('.hn-collapse').text('[Show]');
  }
});