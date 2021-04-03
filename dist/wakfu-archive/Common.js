/* Any JavaScript here will be loaded for all users on every page load. */

/* Preventing titles from appearing when hovering the classes on the main page */
$(function() {
	$('div.tooltip a.to_hasTooltip').removeAttr('title');
});

/* Removing tooltips when hovering an [edit] link  */
$(function() {
	var title = mw.config.get('wgTitle');
	$('[data-to-id="' + title + '"]').each(function () {
		$(this).removeClass('to_hasTooltip');
		$(this).attr('data-to-id','');
	});
});

/* Removing the native title attribute from pages with tooltips */
$(function() {
	$('.to_hasTooltip[data-to-flags="fiem"]').removeAttr('title');
});

/* Graying out classes that do not correspond to the selected role on the main page */
$(function() {
	$('.main-page-classes-roles-container .main-page-classes-roles-item').click(function(){
		
		if ($(this).hasClass("selected")) {
			$(this).removeClass("selected");
			$('.main-page-classes-roles-container .main-page-classes-roles-item').removeClass("darkened");
			$('.main-page-classes-container .main-page-classes-item').removeClass("darkened");
		}
		else {
			$('.main-page-classes-roles-container .main-page-classes-roles-item').addClass("darkened").removeClass("selected");
			$(this).removeClass("darkened").addClass("selected");
		
			$('.main-page-classes-container .main-page-classes-item').removeClass("darkened");
			$('.main-page-classes-container .main-page-classes-item:not(.main-page-classes-' + $(this).data("role") + ')').addClass("darkened");
		}
	})
})

/* Preventing titles from appearing on tabber tabs */
jQuery(window).load(function () {
    $('div.tabbertab').removeAttr('title');
});