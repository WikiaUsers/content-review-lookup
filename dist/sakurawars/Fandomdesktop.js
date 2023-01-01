/* Infoboxes */ 
//The following code allows for custom-colored infoboxes
(function() {
	var changeColors = function() {
		var PIs = $('.portable-infobox');
		if (PIs.length) PIs.each(function() {
			var $PI = $(this);
			var color = '',
				classNames = $PI.attr('class').split(' ');
			for (var i = 0; i < classNames.length; i++) {
				if (classNames[i].indexOf('pi-theme-_') !== -1) {
					color = classNames[i].replace('pi-theme-_', '');
					break;
				}
			}
			if (color) {
				$PI.css('border', '1px solid #' + color);
				$PI.find('h2').css('background-color', '#' + color);
			}
		});
	};
	// Run it now
	changeColors();
})();