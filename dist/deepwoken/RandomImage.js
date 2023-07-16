// jshint esversion: 6

$(function() {
	function getRandomIndex(array) {
		const lastIndex = array.length - 1;
		const chance = Math.random();
		if(chance < 0.9)
			return Math.floor(Math.random() * lastIndex);
		return lastIndex;
	}
	
	if($('#ep_image').length != 0) {
		const images = [
			'EmptyPage0.png',
			'EmptyPage1.png',
			'EmptyPage2.png',
			'EmptyPage4.png',
			'EmptyPage5.png',
			'EmptyPage3.png',
		];
		
		const image = $('<img>');
		const index = getRandomIndex(images);
		image.attr('src', '/wiki/Special:FilePath/File:' + images[index]);
		image.width(250);
		if(index == 5) {
			image.addClass('EPCursed');
			const overlay = $('<div class="EPOverlay">');
			overlay.appendTo('#ep_image');
		}
		image.appendTo('#ep_image');
	}
});