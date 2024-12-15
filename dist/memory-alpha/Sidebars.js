$(function(){
	var localImageHeights = [];
	
	$('.pi-panel.wds-tabber').each(function(){
		var localImages = $(this).find('.pi-image-thumbnail');
		
		localImages.each(function(){
			localImageHeights.push($(this).attr('height'));
		});
		
		var height = Math.min.apply(this, localImageHeights) * (290/268);
		
		localImages.each(function(){
			$(this).css({'height': height, 'width': 'auto'});
		});
		
		localImageHeights = [];
	});
});