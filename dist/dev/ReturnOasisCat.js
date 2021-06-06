(function($) {
	// -- Categories
	// Remove collapsed headers
	var cnt1 = $(".page-footer__categories").contents();
	$(".page-footer__categories").replaceWith(cnt1);
	
	var cnt2 = $(".page-footer__languages").contents();
	$(".page-footer__languages").replaceWith(cnt2);
	
	// Remove headers
	var header = $(".wds-collapsible-panel__header");
	header.remove();
	
	// Creat cat div
	$( ".page-footer .wds-collapsible-panel__content:nth-child(1)" ).wrap('<div class='+'page-footer__categories'+'></div>');
	
	// Replace cat
	var cnt3 = $(".page-footer :nth-child(1) .wds-collapsible-panel__content").contents();
	$(".page-footer :nth-child(1) .wds-collapsible-panel__content").replaceWith(cnt3);
	
	// -- Languages
	// Creat lang div
	$( ".page-footer .wds-collapsible-panel__content:nth-child(2)" ).wrap('<div class='+'page-footer__languages'+'><nav class='+'WikiaArticleInterlang'+'></nav></div>');
	
	// Replace lang
	var cnt4 = $(".page-footer :nth-child(2) .wds-collapsible-panel__content").contents();
	$(".page-footer :nth-child(2) .wds-collapsible-panel__content").replaceWith(cnt4);
})(jQuery);