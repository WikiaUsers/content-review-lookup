// Randomize wiki logo: https://community.wikia.com/wiki/Thread:578801 ; credit to VOCALOID Wiki and Community Central
$(function() {
	var images = [
	    'https://static.wikia.nocookie.net/cevio/images/e/e6/Site-logo.png',
	    'https://static.wikia.nocookie.net/cevio/images/6/65/Wiki-logo_VS.png',
	];

	$('.fandom-community-header__image img').attr('src', images[Math.floor(Math.random() * images.length)]);
});