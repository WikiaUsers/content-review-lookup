/* Any JavaScript here will be loaded for all users on every page load. */

;(function() {
	'use strict';
	var files = [];
	files[1] = 'f/fe/Site-logo_%28black_history_month%29.png';
	files[5] = '6/66/Site-logo_%28pride_month%29.png';
	const image = files[new Date().getMonth()];
	if (image) {
		const ele = document.querySelector('.fandom-community-header__image > img');
		ele.setAttribute('src', 'https://static.wikia.nocookie.net/undermine_gamepedia_en/images/' + image + '/revision/latest');
		ele.setAttribute('width', '500');
		ele.setAttribute('height', '250');
	}
})();