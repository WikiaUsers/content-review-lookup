mw.hook('wikipage.content').add(function() {
	// add class to body as hook for any further styling or detection
	var body = document.querySelector('body');
	body.classList.add('gadget-toggle-tooltip');
	
	// only run if page has any tooltip to avoid wasting resources
	if (!document.querySelector('.custom-tt-wrapper')) {return;}
	
	// Update tooltips to be above all content due to no overflow in most containers (e.g., tables)
	var res = document.querySelector('body > .main-container > .resizable-container');
	function updatePos(el) {
		el = $(el);
		if (el.length==0){return;} 
		el.css('positon', 'relative');
		if(!el.hasClass('mw-collapsed')) {
			var togl = el.children('.mw-collapsible-toggle')[0];
			var cont = el.children('.mw-collapsible-content');
			el.css({position: 'unset'});
			cont.css({top: '', right: '', 'max-width': ''});
			var parenPos = togl.offsetParent.getBoundingClientRect();
			var pos = togl.getBoundingClientRect();
			var w = Math.floor(el.outerWidth());
			cont.css({
				top: pos.top - parenPos.top,
				right: parenPos.right - pos.right + w/2,
			});
			var pos2 = cont[0].getBoundingClientRect();
			if (pos2.left<0) {
				cont.css('max-width', cont.outerWidth()+pos2.left);
			}
		}
	}
	
	// run code on toggle by observing class change
	var observer = new MutationObserver(function (m) {
		if (m[0] && m[0].type === 'attributes' && m[0].attributeName === 'class' && m[0].target) {
			updatePos(m[0].target);
		}
	});
	$('.custom-tt-wrapper').each(function(_, element){
		observer.observe(element, {attributes: true});
	});
	
	// update on page change too so it doesnt look off
	$(window).on('scroll.tt resize.tt', function(e){
		$('.custom-tt-wrapper:not(.mw-collapsed)').each(function(_, el){
			updatePos(el);
		});
	});
});