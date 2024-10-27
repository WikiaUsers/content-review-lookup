mw.hook('userjs.loadSectionTags.done').add(function(){
	if ($('.ns-talk').length !== 0){
		return;
	}
	
	var seen;
	
	$('.section-level-2, .opening-section').each(function(){
		seen = {};
		$(this).find('p a, p span.new').each(findDuplicateLinks);
	});
	
	function findDuplicateLinks(){
		var href;
		
		if ($(this).attr('class') === 'new'){
			var redLinkString = ' (page does not exist)';
			href = mw.util.getUrl($(this).attr('title').slice('0', '-' + redLinkString.length));
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