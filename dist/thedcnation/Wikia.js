/** Pop-up images remover **/

/* function imagelinks() {
    var a = document.getElementsByTagName("a");
    for ( var t = 0; t < a.length; ++t ) {
        var a2 = a[t];
        var img = a2.getElementsByTagName("img");
        if ( img[0] != null ) {
            if ( a2.href.indexOf("images.wikia.com") != -1 ) {
                var link = wgServer + '/wiki/File:' + a2.href.substring(a2.href.lastIndexOf('/') + 1);
                a2.setAttribute('href',link);
                a2.onclick = (function (link_a) { return function(){window.location=link_a; return false};})(link);
            }
        }
    }
}

addOnloadHook(imagelinks); */

/** Background randomiser **/

function randomBack () {
    var opts = [
		'https://images.wikia.nocookie.net/__cb20120903185802/thedcnation/images/5/56/YJ_ART_KEY.png',
		'https://images.wikia.nocookie.net/__cb20120903192949/thedcnation/images/3/35/Green_Lantern_shot.jpg',
		'https://images.wikia.nocookie.net/__cb20120903184405/thedcnation/images/b/ba/Beware-the-batman.png',
		'https://images.wikia.nocookie.net/thedcnation/images/f/fe/Youngjustice.jpg',
		'https://images.wikia.nocookie.net/thedcnation/images/1/13/Teen_Titans_Go%21.jpg',
		'https://images.wikia.nocookie.net/__cb20120903190946/thedcnation/images/8/8b/DC_Nation_Poster.png',
		'https://images.wikia.nocookie.net/__cb20120903191546/thedcnation/images/3/37/DC-nation-sbfff.png',
		'https://images.wikia.nocookie.net/__cb20120903191813/thedcnation/images/f/fe/AN_03_04_Still_01.jpg'
		];
	
	if (wgPageName=='Main_Page') {
		$('body').css('background-image','url(' + opts[0] + ')');
		$('body').css('background-size','120%'); //for the DS3 background to look better
	}
	else
		$('body').css('background-image','url(' + opts[Math.floor((opts.length-1)*Math.random()+1)] + ')'); //remove +1 to include first element of the array
}
 
$(randomBack);