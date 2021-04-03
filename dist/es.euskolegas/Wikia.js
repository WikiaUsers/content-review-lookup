/* Widen Oasis skin to max 1210 wide, also permitting users who have smaller screens to get full experience. */
/* To-do: Must click button to activate.
$(document).ready(function() {
	var lmw = 0;
	$(window).bind("resize load",function() {
		var maxWidth = 630;
		if (document.body && document.body.offsetWidth)
			maxWidth = document.body.offsetWidth;
		if (document.compatMode == 'CSS1Compat' && document.documentElement && document.documentElement.offsetWidth)
			maxWidth = document.documentElement.offsetWidth;
		if (window.innerWidth && window.innerHeight)
			maxWidth = window.innerWidth;
		if (maxWidth < 1010)
			maxWidth = 1010; // Oasis default
		if (maxWidth > 1210)
			maxWidth = 1210; // Preferred size
		if (lmw != maxWidth) {
			$(".WikiaPage, .edit_enhancements_toolbar_fixed").each(function() {
				$(this).width(maxWidth - 10);
			});
			$(".edit_enhancements_toolbar_static").each(function() {
				$(this).width(maxWidth - 30);
			});
			$(".WikiaMainContent").each(function() {
				$(this).width(maxWidth - 330);
			});
			$(".WikiaHeader, .WikiaFooter, .WikiaFooter .toolbar").each(function() {
				$(this).width(maxWidth);
			});
			lmw = maxWidth;
		}
	});
});
*/