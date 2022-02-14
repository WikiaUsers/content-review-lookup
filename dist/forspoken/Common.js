// Randomize wiki logo: https://community.wikia.com/wiki/Thread:578801 ; credit to VOCALOID Wiki and Community Central

$(function() {
	var images = [
	    'https://static.wikia.nocookie.net/forspoken/images/c/cb/F-logo-1.png',
	    'https://static.wikia.nocookie.net/forspoken/images/b/b0/F-logo-2.png',
	    'https://static.wikia.nocookie.net/forspoken/images/0/02/F-logo-3.png'
	];

	$('.fandom-community-header__image img').attr('src', images[Math.floor(Math.random() * images.length)]);
});