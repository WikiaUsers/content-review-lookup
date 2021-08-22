$('.characters-toggle').click(function() {
	var $this = $(this);
	
	var key = $this.data('key');
	var value = $this.data(key);
	
	var status = $this.data('toggle-status');
	var altStatus = Math.abs(status - 1);
	
	$this.data('toggle-status', altStatus);
	$this.css('filter', 'grayscale(' + status + ')');
	
	var $elements = $('.characterbox.' + key + '-' + value);

	for (var i = 0; i < $elements.length; i++) {
		var $element = $elements.eq(i);
		$element.data('toggle-' + key, altStatus);
		
		var toggleAttributes = $element.data();
		
		var show = true;
		for (var attribute in toggleAttributes) {
			if ( toggleAttributes[attribute] != 1 ) {
				show = false;
				break;
			}
		}
		
		if (show) {
			$element.fadeIn();
		} else {
			$element.fadeOut();
		}
	}
});