/* Any JavaScript here will be loaded for all users on every page load. */
 
/* AjaxRC */
window.ajaxPages = ["Blog:Recent_posts","Special:Chat","Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif';
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
 
/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
 AjaxRCRefreshText = 'Auto-Refresh';
 AjaxRCRefreshHoverText = 'Automatically refresh the page';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
 importScriptPage('AjaxRC/code.js', 'dev');
 
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