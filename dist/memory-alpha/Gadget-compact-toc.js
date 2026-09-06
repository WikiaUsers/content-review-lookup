'use strict';
$('#toc > ul > li > ul').each((_, sublist) => {
	const button = $('<button>', {
		class: 'toc-sublist-toggle',
		'aria-expanded': false,
	});
	$(sublist).toggle().before(button);
	button.on('click', () => {
		$(sublist).toggle();
		button.attr('aria-expanded', button.attr('aria-expanded') !== 'true');
	});
});

// {{JavaScript category}}