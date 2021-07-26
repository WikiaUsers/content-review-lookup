window.BackToTopModern = true;
// Randomize wiki logo: http://community.wikia.com/wiki/Thread:578801
$(function() {
	var images = [
		'https://static.wikia.nocookie.net/produce-camp/images/7/75/Site-logo_S1.png',
		'https://static.wikia.nocookie.net/produce-camp/images/c/c0/Site-logo_S2.png',
		'https://static.wikia.nocookie.net/produce-camp/images/b/b9/Site-logo_S3.png',
		'https://static.wikia.nocookie.net/produce-camp/images/b/bd/Site-logo_S4.png',
	];

	$('.fandom-community-header__image img').attr('src', images[Math.floor(Math.random() * images.length)]);
});