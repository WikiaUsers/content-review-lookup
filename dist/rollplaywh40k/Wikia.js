rp_onResize = function() {
	//pad out content to fill one screen
	var main_content = $('#WikiaMainContent')
	var min_height = $('#WikiaBarWrapper').offset().top - main_content.offset().top - $('#WikiaFooter').height() - 100 + 'px'
	main_content.css('min-height', min_height)
}
$(document).on('ready', rp_onResize);
//$(window).on('resize', rp_onResize);