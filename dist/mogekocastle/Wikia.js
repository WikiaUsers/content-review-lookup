//Change the wiki's logo randomly
$(function() {
	var logo = [
		'https://vignette.wikia.nocookie.net/mogekocastle/images/8/89/Wiki-wordmark.png',
		'https://vignette.wikia.nocookie.net/mogekocastle/images/d/d7/Mcwiki-2.png',
		'https://vignette.wikia.nocookie.net/mogekocastle/images/f/f4/Mcwiki-3.png',
		'https://vignette.wikia.nocookie.net/mogekocastle/images/f/f4/Mcwiki-4.png',
		'https://vignette.wikia.nocookie.net/mogekocastle/images/b/bf/Mcwiki-5.png',
		'https://vignette.wikia.nocookie.net/mogekocastle/images/7/73/Mcwiki-6.png',
		'https://vignette.wikia.nocookie.net/mogekocastle/images/a/a6/Mcwiki-7.png'
	];
 
	$('.wds-community-header__wordmark img').attr('src', logo[Math.floor(Math.random() * logo.length)]);
});