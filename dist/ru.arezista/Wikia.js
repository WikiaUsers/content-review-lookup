function randomBack () {
    var opts = [
'',
'https://images.wikia.nocookie.net/arezista/ru/images/3/3e/WBG.jpg',
		];
	
	if (wgPageName=='Main_Page') {
		$('body').css('background-image','url(' + opts[0] + ')');
		$('body').css('background-size','100%'); 
	}
	else
		$('body').css('background-image','url(' + opts[Math.floor((opts.length-1)*Math.random()+1)] + ')'); 
}
 
$(randomBack);