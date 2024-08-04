mw.hook('wikipage.content').add(function(){
	var addEvents = function(){
		$('.hoverbox:not(.hoverbox-smashed)').each(function(_, el) {
			var $el = $(el);
			$el.on('mouseover.shelf',function(e){
				$el.addClass('hoverbox-smashed');
				$el.children().toggleClass('selected');
				$el.off('mouseover.shelf');
			});
		});
	};
	
	// Initial load and for any further load
	addEvents();
	var observer = new MutationObserver(addEvents);
	observer.observe(document, {
		childList: true,
		subtree: true
	});
});