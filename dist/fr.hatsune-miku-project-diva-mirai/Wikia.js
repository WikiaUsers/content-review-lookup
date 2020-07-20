
$(function() {
	var images = [
		'http://i.imgur.com/C1i9buI.png',
		'http://i.imgur.com/TZaRexL.png',
		'http://i.imgur.com/YX9GImC.png',
		'http://i.imgur.com/DghG9rG.png',
		'http://i.imgur.com/7if47ru.png'
	];
 
	$('h2.wordmark a img').attr('src', images[Math.floor(Math.random() * images.length)]);
});