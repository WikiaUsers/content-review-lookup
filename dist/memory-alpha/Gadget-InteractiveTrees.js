'use strict';
mw.hook('wikipage.content').add(content => {
	const smallTreeCount = 3;
	const appearLists = content.find('.appear');
	
	appearLists.each((index, currentTree) => {
		const currentButtonID = `mainButton-${index}`;
		const numberOfSubLists = $(currentTree).find('ul li ul, ol li ol, ul li ol, ol li ul').length;
		const total = $(currentTree).find('ul li, ol li').length - numberOfSubLists;
		const buttonLabel = (total > smallTreeCount) ? 'show all' : 'hide all';
		const button = !numberOfSubLists ? '' : ` (<a href="#" id="${currentButtonID}" class="show-hide-button">${buttonLabel}</a>)`;
		const desc = $(`<div>This list includes ${total} items${button}.</div>`);
		
		$(currentTree).prepend(desc);
		
		if (total > smallTreeCount){
			$(currentTree).find('ul li ul, ol li ol, ul li ol, ol li ul').hide();
		}
		
		$(`#${currentButtonID}`).on('click', event => {
			event.preventDefault();
			if ($(event.currentTarget).text() === 'show all'){
				$(currentTree).find('ul li ul, ol li ol, ul li ol, ol li ul').show();
			} else {
				$(currentTree).find('ul li ul, ol li ol, ul li ol, ol li ul').hide();
			}
			
			$(event.currentTarget).text(($(event.currentTarget).text() === 'show all') ? 'hide all' : 'show all');
		});
	});
	
	appearLists.find('li ul, li ol').each((index, currentTree) => {
		const currentButtonID = `pane-${index}`;
		const total = $(currentTree).find('li').length - $(currentTree).find('ul, ol').length;
		const button = `<a href="#" id="${currentButtonID}" class="show-hide-button">${total}</a>`;
		
		$(currentTree).before(` (${button})`);
		
		$(`#${currentButtonID}`).on('click', event => {
			event.preventDefault();
			$(currentTree).toggle();
		});
	});
});