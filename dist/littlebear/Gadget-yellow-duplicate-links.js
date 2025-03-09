mw.hook('userjs.loadSectionTags.done').add(() => {
	if ($('.ns-talk').length){
		return;
	}
	
	let seen;
	let href;
	const redLinkString = ' (page does not exist)';
	
	$('.section-level-2, .opening-section').each(() => {
		seen = {};
		$(this).find('p a, p span.new').each(findDuplicateLinks);
	});
	
	function findDuplicateLinks(){
		if ($(this).attr('class') === 'new'){
			href = mw.util.getUrl($(this).attr('title').slice('0', `-${redLinkString.length}`));
		} else {
			href = $(this).attr('href');
		}
		
		if (href !== undefined && href.indexOf('#cite_note-') === -1){
			if (seen[href]){
				$(this).addClass('duplicate-link');
			} else {
				seen[href] = true;
			}
		}
	}
});