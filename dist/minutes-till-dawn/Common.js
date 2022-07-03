/* Any JavaScript here will be loaded for all users on every page load. */
$(function() {
    $('.minute-filter').each(function(){
        $(this).click(function() {
            var toggleclass = 'toggle-minute-' + $(this).attr('data-minute');
			if ($(this).attr('data-status') == 'Hide') {
            	$('.spawn-popup.mw-collapsible.mw-collapsed.' + toggleclass).each(function() {
            		$(this).css('display', '').removeClass('mw-collapsed');
            	});
            	$(this).attr('data-status','Show');
            }
            else {
            	$('.spawn-popup.mw-collapsible.' + toggleclass + ':not(.mw-collapsed)').each(function() {
            		$(this).css('display', 'none').addClass('mw-collapsed');
            	});
            	$(this).attr('data-status','Hide');
            }
            $('.spawn-popup.mw-collapsible:not(.mw-collapsed):not(.' + toggleclass + ')').each(function() {
            		$(this).css('display', 'none').addClass('mw-collapsed');
            });
            $('.minute-filter').not(this).attr('data-status', 'Hide');
        });
    });
});