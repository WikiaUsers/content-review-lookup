// =====================
// Background randomizer
// =====================

function randomBack () {
    var opts = [
		'https://images.wikia.nocookie.net/deadspace/images/archive/f/fe/20120817172520%21RandomBG.jpg',
		'https://images.wikia.nocookie.net/deadspace/images/f/fe/RandomBG.jpg',
		'https://images.wikia.nocookie.net/deadspace/images/archive/f/fe/20130205220516%21RandomBG.jpg',
		'https://images.wikia.nocookie.net/deadspace/images/archive/f/fe/20120530002036%21RandomBG.jpg',
		'https://images.wikia.nocookie.net/deadspace/images/archive/f/fe/20120520195733%21RandomBG.jpg',
		'https://images.wikia.nocookie.net/deadspace/images/archive/f/fe/20120520195706%21RandomBG.jpg',
		'https://images.wikia.nocookie.net/deadspace/images/archive/f/fe/20120520195640%21RandomBG.jpg',
		'https://images.wikia.nocookie.net/deadspace/images/archive/f/fe/20120520195614%21RandomBG.jpg',
		'https://images.wikia.nocookie.net/deadspace/images/archive/f/fe/20120520195530%21RandomBG.jpg'
		];
	
	$('body').css('background-image','url(' + opts[Math.floor((opts.length-1)*Math.random())] + ')');
}

randomBack();