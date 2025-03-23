mw.hook('wikipage.content').add(() => {
	$('.pi-panel.wds-tabber').each((index, tabber) => {
		const localImageHeights = [];
		const localImages = $(tabber).find('.pi-image-thumbnail');
		localImages.each((index, image) => localImageHeights.push($(image).attr('height')));
		const height = Math.min(...localImageHeights) * (290 / 268);
		const imageStyles = {
			'height': height,
			'width': 'auto',
		};
		localImages.each((index, image) => $(image).css(imageStyles));
	});
});