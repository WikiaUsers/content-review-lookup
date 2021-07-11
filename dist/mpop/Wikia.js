// Customize infoboxes border-color
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
				$PI.css('border', '2px solid #' + color);
			}
		});
	};
	// Run it right now
	changeColors();
})();