
// =====================
// Background randomizer
// =====================

function randomBack () {
    var opts = [

'https://images.wikia.nocookie.net/usuario/es/images/9/9a/KfWB.PNG',

'https://images.wikia.nocookie.net/usuario/es/images/a/a2/Kfpb.PNG',

'https://images.wikia.nocookie.net/usuario/es/images/8/81/1600x1200-kung-fu-panda-desktop-free-wallpaper.jpg',

'https://images.wikia.nocookie.net/__cb20121124013246/kungfupanda/es/images/e/ef/Kungfupanda6.jpg',

];
	
	$('body').css('background-image','url(' + opts[Math.floor((opts.length-1)*Math.random())] + ')');
}

randomBack();