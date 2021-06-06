$(function(){
	$('.wds-tabber > * > .wds-tabs > .wds-tabs__tab').each(function(){
		$(this).click(function() {
			hash = $(this).text().trim();
			$('.wds-tabber').each(function(){
    			currentTab = $('> .wds-tabs__wrapper > .wds-tabs > .wds-tabs__tab:contains('+hash+')', $(this));
				if(currentTab.length){
    				indexOfTab = $(currentTab).parent().children('.wds-tabs__tab').toArray().indexOf(currentTab.toArray()[0]);
        			$('> .wds-tabs__wrapper > .wds-tabs > .wds-tabs__tab', this).each(function(){
        				$(this).removeClass('wds-is-current');
        			});
        			$(this).children('.wds-tab__content').each(function(){
            			$(this).removeClass('wds-is-current');
        			});
        			$($('> .wds-tabs__wrapper > .wds-tabs > .wds-tabs__tab', this)[indexOfTab]).addClass('wds-is-current');
        			$($(this).children('.wds-tab__content')[indexOfTab]).addClass('wds-is-current');
    			}
			});
		});
	});
});