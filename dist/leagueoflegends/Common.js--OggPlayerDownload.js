/* Any JavaScript here will be loaded for all users on every page load. */

// alt + double click on OggPlayer button to download
// first alt + click wraps the button in <a>, second alt + click downloads file
(function (window, $, mw) {
	// return;
	'use strict';
	// Load Protection
	if (window.hotkeyDownload) return;
	window.hotkeyDownload = true;
	
	// var config = mw.config.get([
	// 	'wgPageName'
	// ]);
	
	$(function () {
		document.addEventListener('click', function (e) {
	        if (e.altKey && e.target.classList.contains('audio-button') && e.target.parentElement.tagName.toLowerCase() !== 'a') {
	        	var src = e.target.querySelector('audio.OggPlayer-Audio').getAttribute('src');
				var link = document.createElement('a');
				link.setAttribute('href', src);
				e.target.before(link);
				link.append(e.target);
				link.addEventListener('click', function (e2) {
					if (!e2.altKey) {
						e2.preventDefault();
					}
				});
			}
	    });
	});
})(this, jQuery, mediaWiki);