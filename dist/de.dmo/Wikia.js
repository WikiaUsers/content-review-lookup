// ================================================================
// BEGINN – Zufälliger Hintergrund
// Quelle und Autoren siehe: 
http://deadspace.wikia.com/wiki/MediaWiki:Wikia.js
http://de.halo.wikia.com/wiki/MediaWiki:Wikia.js
http://de.digimonmasters.wikia.com/wiki/Digimon_Masters_Wiki
// ================================================================
 
function randomBack () {
    var opts = [
	        'https://images.wikia.nocookie.net/__cb20130510184035/digimonmasters/de/images/1/1d/WikiBG_Blauweis.jpg',
		'https://images.wikia.nocookie.net/__cb20130515202045/digimonmasters/de/images/6/6a/WikiBG_BlauweisVW.jpg',
		'https://images.wikia.nocookie.net/__cb20130515202045/digimonmasters/de/images/a/a6/WikiBG_BlauweisYV.jpg',
		];
 
	if (wgPageName=='Hauptseite') {
		$('body').css('background-image','url(' + opts[0] + ')'); // Auf der Hauptseite wird immer das erste Bild angezeigt
	}
	else
		$('body').css('background-image','url(' + opts[Math.floor((opts.length-1)*Math.random()+1)] + ')'); //remove +1 to include first element of the array
}
 
randomBack();
 
// ================================================================
// ENDE – Zufälliger Hintergrund
// ================================================================