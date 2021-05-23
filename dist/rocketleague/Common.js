/* Any JavaScript here will be loaded for all users on every page load. */


/***************************/
/* Patches - toggle button */
/***************************/
window.MassCategorizationGroups = ['sysop', 'content-moderator'];

$('.mw-customtoggle-Patches').click(function(){
	if($('#mw-customcollapsible-Patches').hasClass('mw-collapsed')) {
		$(this).text('Hide previous');
	} else {
		$(this).text('Show previous');
	}
});
$('.mw-customtoggle-RP').click(function(){
	if($('#mw-customcollapsible-RP').hasClass('mw-collapsed')) {
		$(this).text('Hide legacy passes');
	} else {
		$(this).text('Show legacy passes');
	}
});
$('.mw-customtoggle-Seasons').click(function(){
	if($('#mw-customcollapsible-Seasons').hasClass('mw-collapsed')) {
		$(this).text('Hide legacy seasons');
	} else {
		$(this).text('Show legacy seasons');
	}
});