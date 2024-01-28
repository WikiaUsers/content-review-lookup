window.BackToTopModern = true;
// Randomize wiki logo: http://community.wikia.com/wiki/Thread:578801
$(function() {
	var images = [
		'https://static.wikia.nocookie.net/produce-camp/images/8/8a/Site-logo_S1.svg',
		'https://static.wikia.nocookie.net/produce-camp/images/4/44/Site-logo_S2.svg',
		'https://static.wikia.nocookie.net/produce-camp/images/6/6e/Site-logo_S3.svg',
		'https://static.wikia.nocookie.net/produce-camp/images/9/96/Site-logo_S4.svg',
		'https://static.wikia.nocookie.net/produce-camp/images/c/ce/Site-logo_S5.svg',
	];

	$('.fandom-community-header__image img').attr('src', images[Math.floor(Math.random() * images.length)]);
});