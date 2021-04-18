
/* Change the wiki's header randomly */

$(function changeHeader() {
	var header = [
		'https://vignette.wikia.nocookie.net/okegom/images/1/14/Wiki-header-1.png',
		'https://vignette.wikia.nocookie.net/okegom/images/8/8d/Wiki-header-2.png',
		'https://vignette.wikia.nocookie.net/okegom/images/d/dd/Wiki-header-3.png',
		'https://vignette.wikia.nocookie.net/okegom/images/f/fb/Wiki-header-4.png',
		'https://vignette.wikia.nocookie.net/okegom/images/b/b9/Wiki-header-5.png'
	];
	
	var selectedHeader = header[Math.floor(Math.random() * header.length)];
	var headerTarget = document.querySelectorAll(".wds-community-header");
	
	headerTarget[0].style.backgroundImage = 'url(' + selectedHeader + ')';

});

/* Modernize the BackToTop button */
window.BackToTopModern = true;