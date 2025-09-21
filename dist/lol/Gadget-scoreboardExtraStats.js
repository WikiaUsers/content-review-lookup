mw.hook('wikipage.content').add(function() {
	$('.popup-content-sbes-lazyloaded').off('click');
	$('.popup-content-sbes-lazyloaded').on('click', function(event){
		var events = $._data(document, 'events') || {};
		events = events.click || [];
		for(var i = 0; i < events.length; i++) {
			if(events[i].selector) {

				//Check if the clicked element matches the event selector
				if($(event.target).is(events[i].selector)) {
					events[i].handler.call(event.target, event);
				}

				// Check if any of the clicked element parents matches the 
				// delegated event selector (Emulating propagation)
				$(event.target).parents(events[i].selector).each(function(){
					events[i].handler.call(this, event);
				});
			}
		}
		event.stopPropagation(); //Always stop propagation
	});

	function updateStats(e) {
	   e.stopPropagation();
	   var parentDiv = $("select.sb-esd").closest(".sbes-outercontainer");
	   var active = $(".sbes-active", parentDiv);
	   var toShow = $("." + e.target.value, parentDiv);
	   $(active).removeClass('sbes-active');
	   $(active).addClass('toggle-section-hidden');
	   $(toShow).addClass('sbes-active');
	   $(toShow).removeClass('toggle-section-hidden');
	}

	$("select.sb-esd").off("change");
	$(document).on('change', 'select.sb-esd', updateStats);
});