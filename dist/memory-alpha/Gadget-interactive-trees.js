'use strict';
const smallTreeCount = 3;
const showText = 'show all';
const hideText = 'hide all';

mw.hook('wikipage.content').add(content => {
	const appearLists = content.find('.appear');
	appearLists.each((index, currentTree) => {
		const subLists = $(currentTree).find('li ul, li ol');
		const total = $(currentTree).find('li').length - subLists.length;
		const button = $('<a>', {
			href: '#',
			text: total > smallTreeCount ? showText : hideText,
		});
		const desc = $('<div>').append(`This list includes ${total} items (`, button, ').');
		if (!subLists.length){
			return;
		}
		$(currentTree).prepend(desc);
		if (total > smallTreeCount){
			subLists.hide();
		}
		button.on('click', event => {
			event.preventDefault();
			if (button.text() === showText){
				subLists.show();
				button.text(hideText);
			} else {
				subLists.hide();
				button.text(showText);
			}
		});
	});
	appearLists.find('li ul, li ol').each((index, currentTree) => {
		const total = $(currentTree).find('li').length - $(currentTree).find('ul, ol').length;
		const button = $('<a>', {href: '#', text: total});
		$(currentTree).before(' (', button, ')');
		button.on('click', event => {
			event.preventDefault();
			$(currentTree).toggle();
		});
	});
});

// {{JavaScript category}}