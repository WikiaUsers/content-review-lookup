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
		
		// Initialise counter for timeout
		var i = 0;
		// Repeat until tabber finishes loading
		var interval = setInterval(function() {
			// Check for nav buttons ready, or wait
			var tabberNav = tabber.querySelector('.wds-tabs');
			if(!tabberNav) {
				i++;
				if(i > 120) { // 30 seconds
					clearInterval(interval);
				}
				// Repeat if not ready
				return;
			}
			
			// Make sure our default exists
			var defaultTab;
			[].some.call(tabberNav.querySelectorAll('li.wds-tabs__tab a'), function(tab) {
				if(tab.textContent == defaultName) {
					defaultTab = tab;
					return true;
				}
				
				return false;
			});

			if(defaultTab) {
				var currentHash = window.location.hash;
				// Trigger tabber change
				defaultTab.click();
				// Remove tabber hash from url
				window.history.replaceState({}, '', window.location.pathname + currentHash);
			}
			
			// Stop
			clearInterval(interval);
		}, 250);
	});
})();