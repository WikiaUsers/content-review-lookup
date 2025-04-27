$(() => {
	if ($('.ns-talk').length){
		return;
	}
	
	const label = 'Highlight duplicate links';
	const button = $('<li>').append($('<a href="#">').text(label));
	$('#my-tools-menu').prepend(button);
	
	button.on('click', (e) => {
		e.preventDefault();
		const veRoot = $('.ve-ce-rootNode');
		const pgRoot = $('#content .mw-parser-output');
		const content = veRoot.length ? veRoot : pgRoot;
		content.prepend('<div id="lede-start">');
		
		$('#lede-start').nextUntil('h2').wrapAll('<div id="lede">');
		$('#lede').after('<div id="body-start">');
		$('#body-start').nextAll().wrapAll('<div id="body">');
		
		function findDuplicateLinksLede(index, link){
			const href = $(link).attr('href');
			
			if (href !== undefined && href.indexOf('#')){
				if (seenLede[href]){
					$(link).addClass('duplicate-link');
				} else {
					seenLede[href] = true;
				}
			}
		}
		
		function findDuplicateLinksBody(index, link){
			const href = $(link).attr('href');
			
			if (href !== undefined && href.indexOf('#')){
				if (seenBody[href]){
					$(link).addClass('duplicate-link');
				} else {
					seenBody[href] = true;
				}
			}
		}
		
		const seenLede = {};
		const seenBody = {};
		
		content.find('#lede p a').each(findDuplicateLinksLede);
		content.find('#body p a').each(findDuplicateLinksBody);
	});
});