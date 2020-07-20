
/* Portable infoboxes colors */
(function() {
	// Function to check for Portable Infoboxes, and change their color
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
	// Run it right now
	changeColors();
	// Bind it to TabView loadContent function, so Portable Infoboxes
	// inside TabView can also have fabulous custom backgrounds.
	// - - - -
	// WARNING! This may cause compatibility issues!
	/*
	TabViewClass.prototype.loadContent = function(tabLink) {
		var tabUrl = tabLink.attr('href')
		  , dataTabId = tabLink.parent().attr('data-tab')
		  , containerSelector = $('#' + this.cashedStuff.containersWrapperId).children('div[data-tab-body="' + dataTabId + '"]');
		if (containerSelector.data('loaded') !== true) {
			containerSelector.startThrobbing();
			$.get(tabUrl, {
				action: 'render'
			}, function(html) {
				containerSelector.html(html).data('loaded', true).stopThrobbing();
				mw.hook('wikipage.content').fire(containerSelector);
				changeColors();
			});
		}
	};
	*/
})();