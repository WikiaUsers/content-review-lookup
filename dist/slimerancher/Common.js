/* Any JavaScript here will be loaded for all users on every page load. */

/* dev:AjaxRC configuration */
window.ajaxSpecialPages = [
	"RecentChanges",
	"UncategorizedPages",
	"UnusedFiles",
	"AllPages"
];

/* Converts Unix time to local time zone */
(function(mw) {
	'use strict';
	mw.hook('wikipage.content').add(function($content) {
		var ele = $content.find('.unix:not(.loaded)');

		for (var i = 0; i < ele.length; i++) {
			var ele2 = ele[i];
			ele2.classList.add('loaded');

			var code = ele2.textContent;
			if (!Number(code)) code = Math.floor(Date.now() * 0.001);

			// Get the data-format attribute, or use a default format if not specified
			var format = ele2.getAttribute('data-format') || 'default';

			// Convert the Unix timestamp to a local date and time format based on the specified format
			var date = new Date(code * 1000);
			var options;
			switch (format) {
				case 'shortTime':
					options = {
						timeStyle: 'short'
					};
					break;
				case 'longTime':
					options = {
						timeStyle: 'medium'
					};
					break;
				case 'shortDate':
					options = {
						dateStyle: 'short'
					};
					break;
				case 'longDate':
					options = {
						dateStyle: 'long'
					};
					break;
				case 'shortDateTime':
					options = {
						dateStyle: 'long',
						timeStyle: 'short'
					};
					break;
				case 'longDateTime':
					options = {
						dateStyle: 'full',
						timeStyle: 'short'
					};
					break;
				default:
					options = {};
					break;
			}

			ele2.textContent = date.toLocaleString('en-GB', options);
		}
	});
})(window.mediaWiki);