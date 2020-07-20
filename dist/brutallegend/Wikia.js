/** Background randomizer **/
function randomBack () {
    var opts = [
		'https://images.wikia.nocookie.net/brutallegend/images/2/22/BG1a.jpg',
		'https://images.wikia.nocookie.net/brutallegend/images/9/9f/BG2a.jpg',
		'https://images.wikia.nocookie.net/brutallegend/images/4/4e/BG3a.jpg',
		'https://images.wikia.nocookie.net/brutallegend/images/2/2d/BG4a.jpg',
		'https://images.wikia.nocookie.net/brutallegend/images/0/05/BG5a.jpg',
		'https://images.wikia.nocookie.net/brutallegend/images/4/4e/BG7a.jpg',
		'https://images.wikia.nocookie.net/brutallegend/images/b/b2/BG8a.jpg',
		'https://images.wikia.nocookie.net/brutallegend/images/b/b1/BG9a.jpg',
		'https://images.wikia.nocookie.net/brutallegend/images/e/e3/BG10a.jpg',
		'https://images.wikia.nocookie.net/brutallegend/images/a/ae/BG11a.jpg',
		'https://images.wikia.nocookie.net/brutallegend/images/8/85/BG12a.jpg',
		'https://images.wikia.nocookie.net/brutallegend/images/4/4e/BG13a.jpg',
		'https://images.wikia.nocookie.net/brutallegend/images/6/6d/BG14a.jpg',
		'https://images.wikia.nocookie.net/brutallegend/images/2/23/BG15a.jpg',
		'https://images.wikia.nocookie.net/brutallegend/images/c/c0/BG17a.jpg',
		'https://images.wikia.nocookie.net/brutallegend/images/9/9a/BG18a.jpg',
		'https://images.wikia.nocookie.net/brutallegend/images/f/fe/BG19a.jpg',
		'https://images.wikia.nocookie.net/brutallegend/images/2/2c/BG20a.jpg',
'https://images.wikia.nocookie.net/brutallegend/images/5/50/Wiki-background'
		];
 
	$('body').css('background-image','url(' + opts[Math.floor((opts.length-1)*Math.random())] + ')');
        $('body').css('background-attachment','fixed');
        $('body').css('background-position','center');
        $('body').css('background-repeat','no-repeat');
        $('body.background-dynamic.skin-oasis .background-image-gradient').css('display','none');
}

randomBack();