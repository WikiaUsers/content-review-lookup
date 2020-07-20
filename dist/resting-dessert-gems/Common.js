/* Any JavaScript here will be loaded for all users on every page load. */

/* Portable infoboxes colors */
(function() {
	// Function to check for Portable Infoboxes, and change their color
	var changeColors = function() {
		var PIs = $('.portable-infobox');
		if (PIs.length) PIs.each(function() {
			var $PI = $(this);
			$PImg = $('.pi-image-thumbnail',this);
			$prev = $(this).prev();
			if ($prev.text()) $PImg.css({
                 width: $prev.text(),
                 height: 'auto'
            });
			color = '',
				classNames = $PI.attr('class').split(' ');
			for (var i = 0; i < classNames.length; i++) {
				if (classNames[i].indexOf('pi-theme-_') !== -1) {
					color = classNames[i].replace('pi-theme-_', '');
					break;
				}
			}
			if (color) $PI.css('border', '2px solid #' + color);
		});
	};
	changeColors();
})();