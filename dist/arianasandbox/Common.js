/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage('AjaxRC/code.js', 'dev');

importScriptPage('Countdown/code.js', 'dev');

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

/ =====================
// Background randomizer
// =====================

function randomBack () {
    var opts = [
		'http://images.wikia.com/deadspace/images/archive/f/fe/20120817172520%21RandomBG.jpg',
		'http://images.wikia.com/deadspace/images/f/fe/RandomBG.jpg',
		'http://images.wikia.com/deadspace/images/archive/f/fe/20130205220516%21RandomBG.jpg',
		'http://images.wikia.com/deadspace/images/archive/f/fe/20120530002036%21RandomBG.jpg',
		'http://images.wikia.com/deadspace/images/archive/f/fe/20120520195733%21RandomBG.jpg',
		'http://images.wikia.com/deadspace/images/archive/f/fe/20120520195706%21RandomBG.jpg',
		'http://images.wikia.com/deadspace/images/archive/f/fe/20120520195640%21RandomBG.jpg',
		'http://images.wikia.com/deadspace/images/archive/f/fe/20120520195614%21RandomBG.jpg',
		'http://images.wikia.com/deadspace/images/archive/f/fe/20120520195530%21RandomBG.jpg'
		];
	
	$('body').css('background-image','url(' + opts[Math.floor((opts.length-1)*Math.random())] + ')');
}

randomBack();