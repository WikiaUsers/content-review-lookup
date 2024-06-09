(function () {
	'use strict';
	if (window.GetDisplayTitleLoaded) {
		return;
	}
	window.GetDisplayTitleLoaded = true;
	var displayTitle = document.getElementById('firstHeadingTitle');
	if (displayTitle === null) {
		displayTitle = document.getElementById('firstHeading');
	}
	document.querySelectorAll('.get-display-title').forEach(function (e) {
		e.innerText = displayTitle.innerText.replace(/[\n\r\t]/g, '');
	});
})();