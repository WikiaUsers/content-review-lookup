'use strict';
mw.hook('wikipage.content').add(content => {
	const seenOpening = [];
	const seenBody = [];
	content = content.find('.mw-parser-output').first();
	content.children().first().nextUntil('h2').addBack().wrapAll('<div class="opening-section">');
	content.children('h2').first().nextAll().addBack().wrapAll('<div class="body-sections">');
	content.children('.opening-section').find('p a').each(findDuplicateLinksOpening);
	content.children('.body-sections').find('p a').each(findDuplicateLinksBody);

	function findDuplicateLinksOpening(index, link){
		const href = $(link).attr('href');
		if (href && href.indexOf('#')){
			if (seenOpening.includes(href)){
				$(link).addClass('duplicate-link');
			} else {
				seenOpening.push(href);
			}
		}
	}

	function findDuplicateLinksBody(index, link){
		const href = $(link).attr('href');
		if (href && href.indexOf('#')){
			if (seenBody.includes(href)){
				$(link).addClass('duplicate-link');
			} else {
				seenBody.push(href);
			}
		}
	}
});

// {{JavaScript category}}