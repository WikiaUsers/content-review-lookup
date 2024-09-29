$(function(){
	if ($('.ns-talk').length !== 0){
		return;
	}
	
	var highlightDuplicateLinks = $('<li><a href="#">Highlight duplicate links</a></li>');
	$('#my-tools-menu').prepend(highlightDuplicateLinks);
	
	highlightDuplicateLinks.click(function(e){
		e.preventDefault();
		
		var content = ($('.ve-ce-rootNode').length === 0) ? $('#content .mw-parser-output') : $('.ve-ce-rootNode');
		
		content.children().first().nextUntil('h2').wrapAll('<div id="opening">');
		$('#opening').nextAll().wrapAll('<div id="body">');
		
		function findDuplicateLinksOpening(){
			var href = $(this).attr('href');
			
			if (href !== undefined && href.indexOf('#') != 0){
				if (seenOpening[href]){
					$(this).addClass('duplicate-link');
				} else {
					seenOpening[href] = true;
				}
			}
		}
		
		function findDuplicateLinksBody(){
			var href = $(this).attr('href');
			
			if (href !== undefined && href.indexOf('#') != 0){
				if (seenBody[href]){
					$(this).addClass('duplicate-link');
				} else {
					seenBody[href] = true;
				}
			}
		}
		
		var seenOpening = {};
		var seenBody = {};
		
		content.find('#opening p a').each(findDuplicateLinksOpening);
		content.find('#body p a').each(findDuplicateLinksBody);
	});
});