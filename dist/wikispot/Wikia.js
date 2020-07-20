// Source code from Vocaloid wikia 
$(function() {
	var images = [
		'https://vignette.wikia.nocookie.net/spot/images/9/99/WikispotHead2.png',
		'https://vignette.wikia.nocookie.net/spot/images/9/99/WikispotHead3.png',
	];

	$('.wds-community-header__wordmark img').attr('src', images[Math.floor(Math.random() * images.length)]);
});