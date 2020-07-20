// ================================================================
// BEGINN – Zufälliger Hintergrund
// Quelle und Autoren siehe: http://deadspace.wikia.com/wiki/MediaWiki:Wikia.js und 
http://de.halo.wikia.com/wiki/MediaWiki:Wikia.js und http://de.digimonmasters.wikia.com/wiki/MediaWiki:Wikia.js
// ================================================================
 
function randomBack () {
    var opts = [
		'https://images.wikia.nocookie.net/__cb20140324191904/disneyfairies/de/images/d/d0/TinkerBell-Secret-Of-The-Wings.jpg',
                'https://images.wikia.nocookie.net/__cb20140324185424/disneyfairies/de/images/b/b4/Tinkerbell_Gl%C3%A4tscher.jpg',
                'https://images.wikia.nocookie.net/__cb20140324184948/disneyfairies/de/images/4/4b/Feenspiele_Stadion.jpg',
                'https://images.wikia.nocookie.net/__cb20140324184453/disneyfairies/de/images/b/bd/Sonnenblumen_Feld.jpg',
                'https://images.wikia.nocookie.net/__cb20140324184456/disneyfairies/de/images/5/5c/Tinkerbell_Winterwalt.jpg',
                'https://images.wikia.nocookie.net/__cb20140324182536/disneyfairies/de/images/3/38/Film_6_SkullRock_Insel.jpg',
                'https://images.wikia.nocookie.net/__cb20140324182244/disneyfairies/de/images/3/39/Zarina_von_hinten.jpg',
                'https://images.wikia.nocookie.net/__cb20140324182007/disneyfairies/de/images/3/30/Tinkerbell_Flugschiff.jpg',
                'https://images.wikia.nocookie.net/__cb20140324181714/disneyfairies/de/images/8/84/Piratenschiff.jpg',
                'https://images.wikia.nocookie.net/__cb20140324182001/disneyfairies/de/images/c/c8/Tal_der_Feen_Gro%C3%9F.jpg',
                'https://images.wikia.nocookie.net/__cb20140324181441/disneyfairies/de/images/8/8a/Feenglanz_Muehle.jpg',
                'https://images.wikia.nocookie.net/__cb20140424191009/disneyfairies/de/images/0/0b/Tinker_Bell_Piraten.jpg',
                'https://images.wikia.nocookie.net/__cb20140424191010/disneyfairies/de/images/6/60/Tinkerbell_Autumn.jpg',
		];
 
	if (wgPageName=='Hauptseite') {
		$('body').css('background-image','url(' + opts[0] + ')'); // Auf der Hauptseite wird immer das erste Bild 

angezeigt
	}
	else
		$('body').css('background-image','url(' + opts[Math.floor((opts.length-1)*Math.random()+1)] + ')'); 

//remove +1 to include first element of the array
}
 
randomBack();
 
// ================================================================
// ENDE – Zufälliger Hintergrund
// ================================================================