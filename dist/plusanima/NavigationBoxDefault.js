/* Sets the default tab on a .navigation-box <tabber> */
(function() {
	// Loop navigation boxes on the page that have a default setting
	[].forEach.call(document.querySelectorAll('.navigation-box[data-default]'), function(navBox) {
		// Get the name of default
		var defaultName = navBox.getAttribute('data-default');

		// Stop if no tabber
		var tabber = navBox.querySelector('.tabber');
		if(!tabber) {
			return;
		}
		
		// Repeat until tabber finishes loading
		var interval = setInterval(function() {
			// Check for nav buttons ready, or wait
			var tabberNav = tabber.querySelector('.tabbernav');
			if(!tabberNav) {
				// Repeat if not ready
				return;
			}
			
			// Make sure our default exists
			var defaultTab = tabberNav.querySelector('li [title="' + defaultName + '"]');
			if(defaultTab) {
				// Set default
				defaultTab.click();
			}
			
			// Stop
			clearInterval(interval);
		}, 250);
	});
})();