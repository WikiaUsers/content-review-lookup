/** Fondos aleatorios **/
function randomBack () {
    var opts = [
		'https://images.wikia.nocookie.net/elderscrolls/es/images/9/9a/FondoMorrowind1.jpg',
		'https://images.wikia.nocookie.net/elderscrolls/es/images/f/f1/FondoMorrowind2.jpg',
		'https://images.wikia.nocookie.net/elderscrolls/es/images/1/15/FondoOblivion1.jpg',
		'https://images.wikia.nocookie.net/elderscrolls/es/images/f/f4/FondoOblivion2.jpg',
		'https://images.wikia.nocookie.net/elderscrolls/es/images/0/08/FondoSkyrim1.jpg',
		'https://images.wikia.nocookie.net/elderscrolls/es/images/7/72/FondoSkyrim2.jpg',
		'https://images.wikia.nocookie.net/elderscrolls/es/images/4/47/FondoSkyrim3.jpg',
		'https://images.wikia.nocookie.net/elderscrolls/es/images/7/79/FondoSkyrim4.jpg',
		'https://images.wikia.nocookie.net/elderscrolls/es/images/7/78/FondoOnline1.jpg',
		'https://images.wikia.nocookie.net/elderscrolls/es/images/c/cd/FondoOnline2.jpg',
		];
 
	$('body').css('background-image','url(' + opts[Math.floor((opts.length-1)*Math.random())] + ')');
        $('body').css('background-attachment','fixed');
        $('body').css('background-position','center');
        $('body').css('background-repeat','no-repeat');
        $('body.background-dynamic.skin-oasis .background-image-gradient').css('display','none');
}
 
randomBack();