'use strict';
mw.hook('wikipage.content').add(content => {
	content.find('.pi-panel.wds-tabber').each((index, tabber) => {
		const imageHeights = [];
		const images = $(tabber).find('.pi-image-thumbnail');
		images.each((index, image) => {
			imageHeights.push($(image).attr('height'));
		});
		images.css({
			height: Math.min(...imageHeights),
			width: 'auto',
		});
	});
});

// {{JavaScript category}}