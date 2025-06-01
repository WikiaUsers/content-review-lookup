/* Any JavaScript here will be loaded for all users on every page load. */
//Quote color auto-set 
$(function() {
if ($('.portable-infobox .pi-secondary-background').length > 0) {
	$(':root').css('--lquote-color', $('.portable-infobox .pi-secondary-background').css('background-color')); //set css variable to our custom accent color
}
else 
	return;
});