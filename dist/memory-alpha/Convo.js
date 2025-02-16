$(function(){
	if (!$('.convo-group').length){
		return;
	}
	
	var popupContainer = $('<div id="convo-popup-container" class="mw-parser-output">');
	var popup = $('<div id="convo-popup" class="convo-popup-hidden">');
	popupContainer.append(popup);
	
	$('.convo-group').each(function(){
		$(this).hover(onHover, offHover);
	});
	
	function onHover(){
		var buttonDimensions = $(this).get(0).getBoundingClientRect();
		var rootDimensions = $(':root').get(0).getBoundingClientRect();
		var dimensions = {};
		
		popup.html($(this).find('.convo-info').html());
		popup.removeAttr('class');
		
		var popupDimensions = popup.get(0).getBoundingClientRect();
		
		if (popupDimensions.height + buttonDimensions.bottom > innerHeight){
			dimensions.bottom = innerHeight - (buttonDimensions.top - rootDimensions.top);
			dimensions.top = 'auto';
		} else {
			dimensions.top = buttonDimensions.bottom - rootDimensions.top;
			dimensions.bottom = 'auto';
		}
		
		if (popupDimensions.width + buttonDimensions.left > innerWidth){
			dimensions.right = 'calc(' + (innerWidth - (buttonDimensions.right - rootDimensions.left)) + 'px - 1em)';
			dimensions.left = 'auto';
		} else {
			dimensions.left = 'calc(' + (buttonDimensions.left - rootDimensions.left) + 'px - 1em)';
			dimensions.right = 'auto';
		}
		
		popup.css(dimensions);
		$('.mediawiki').append(popupContainer);
	}
	
	function offHover(){
		if (!popup.is(':hover')){
			popup.attr('class', 'convo-popup-hidden');
		}
	}
	
	popup.hover(function(){}, function(){
		popup.attr('class', 'convo-popup-hidden');
	});
});