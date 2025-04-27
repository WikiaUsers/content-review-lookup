'use strict';
$(() => {
	if (!$('.convo-group').length){
		return;
	}
	
	const popupContainer = $('<div id="convo-popup-container" class="mw-parser-output">');
	const popup = $('<div id="convo-popup" class="convo-popup-hidden">');
	popupContainer.append(popup);
	$('.convo-group').each((index, group) => $(group).on('mouseenter', onHover).on('mouseleave', offHover));
	popup.on('mouseleave', () => popup.attr('class', 'convo-popup-hidden'));
	
	function onHover(event){
		const buttonDimensions = $(event.currentTarget).get(0).getBoundingClientRect();
		const rootDimensions = $(':root').get(0).getBoundingClientRect();
		const dimensions = {};
		
		popup.html($(event.currentTarget).find('.convo-info').html());
		popup.removeAttr('class');
		
		const popupDimensions = popup.get(0).getBoundingClientRect();
		
		if (popupDimensions.height + buttonDimensions.bottom > window.innerHeight){
			dimensions.bottom = window.innerHeight - (buttonDimensions.top - rootDimensions.top);
			dimensions.top = 'auto';
		} else {
			dimensions.top = buttonDimensions.bottom - rootDimensions.top;
			dimensions.bottom = 'auto';
		}
		
		if (popupDimensions.width + buttonDimensions.left > window.innerWidth){
			dimensions.right = 'calc(' + (window.innerWidth - (buttonDimensions.right - rootDimensions.left)) + 'px - 1em)';
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
});