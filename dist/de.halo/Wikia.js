/* JavaScript an dieser Stelle wirkt sich nur auf den Oasis-Skin aus. */
/* Siehe auch: [[MediaWiki:Common.js]] und [[MediaWiki:Monobook.js]] */
/* <pre><nowiki> */
// ================================================================
// ANFANG - Spezial:Hochladen
// Wiederherstellen der ursprünglichen Funktionalität der Schaltfläche "Neues Bild"
// Dokumentation und Autoren: http://disable.wikia.com/wiki/Add_a_Photo_button_in_the_photos_module
// ================================================================


$(function() {
	$('#WikiaRail').on('click', '.upphotos', function(e) {if (e.target && e.target.href) { document.location.href = e.target.href; return false;}});
});

// ================================================================
// ENDE - Spezial:Hochladen
// ================================================================

// ================================================================
// Anfang – Small Oasis tweak by [[User:Rappy]]
// Versetzt die Bearbeiten-Schaltfläche auf Benutzerseiten
// ================================================================

$(function() {
    $('.UserProfileActionButton').prependTo('.tabs-container').css({
        marginRight: '320px',
        float: 'right',
        marginTop: '4px'
    });
});

// ================================================================
// ENDE – Small Oasis tweak
// ================================================================

// ================================================================
// Anfang – Im Wiki
// Fügt einen Link nach "Halopedia:Über dieses Wiki" zur "Im Wiki"-Navigation hinzu
// ================================================================

$(function() {
        $('.WikiHeader nav ul li.marked ul').append('<li class="subnav-2-item"><a class="subnav-2a" href="/wiki/Halopedia:Über dieses Wiki">Über uns</a></li>');
});

// ================================================================
// ENDE – Im Wiki
// ================================================================

// ================================================================
// ANFANG – Zufälliger Hintergrund
// Quelle und Autoren siehe: http://deadspace.wikia.com/wiki/MediaWiki:Wikia.js
// Hinweis: Bildgröße sollte mindestens 1280 x 720 px betragen
// Hinweis: Um Ladezeiten gering zu halten, sollten die Bilder jeweils max. 1 MB groß sein
//Allgemein:
//'https://images.wikia.nocookie.net/__cb20140703095353/halo/de/images/7/7e/Hintergrund1.png',
//'https://images.wikia.nocookie.net/__cb20140703095437/halo/de/images/c/c6/Hintergrund2.png',
//'https://images.wikia.nocookie.net/__cb20140703095506/halo/de/images/0/00/Hintergrund3.png',
//'https://images.wikia.nocookie.net/__cb20140703095555/halo/de/images/b/be/Hintergrund4.png',
//'https://images.wikia.nocookie.net/__cb20140703095704/halo/de/images/a/aa/Hintergrund5.png',
//'https://images.wikia.nocookie.net/__cb20140703095736/halo/de/images/4/48/Hintergrund6.png',
//'https://images.wikia.nocookie.net/__cb20140703095757/halo/de/images/2/28/Hintergrund7.png',
//'https://images.wikia.nocookie.net/__cb20140703095851/halo/de/images/4/43/Hintergrund8.png',
//'https://images.wikia.nocookie.net/__cb20140703095923/halo/de/images/a/aa/Hintergrund9.png',
//'https://images.wikia.nocookie.net/__cb20140703095950/halo/de/images/0/0c/Hintergrund10.png',
//'https://images.wikia.nocookie.net/__cb20140703100016/halo/de/images/c/c8/Hintergrund11.png'
// Für Weihnachten: 
//'https://images.wikia.nocookie.net/halo/de/images/0/00/Holiday_Card_2010_Blank.jpg'
//'https://images.wikia.nocookie.net/__cb20111224134029/halo/de/images/6/63/Halo_Christmas_Artwork.jpg'
//'https://images.wikia.nocookie.net/halo/de/images/6/60/Card07_1900.jpg'
//'https://images.wikia.nocookie.net/__cb20131220193847/halo/de/images/4/43/Weihnachtslasky.png'
//'https://images.wikia.nocookie.net/__cb20131220193116/halo/de/images/a/a8/Schlafender_Weihnachtschief.png'
//'https://images.wikia.nocookie.net/__cb20131220192929/halo/de/images/8/82/Halo_4_John-117_Palmer_Lasky.jpg'
//'https://images.wikia.nocookie.net/__cb20131220192861/halo/de/images/5/58/Weihnachtslasky_und_Wichtelchief.png'
// ================================================================
 
function randomBack () {
    var opts = [
'https://images.wikia.nocookie.net/__cb20140703095353/halo/de/images/7/7e/Hintergrund1.png',
'https://images.wikia.nocookie.net/__cb20140703095437/halo/de/images/c/c6/Hintergrund2.png',
'https://images.wikia.nocookie.net/__cb20140703095506/halo/de/images/0/00/Hintergrund3.png',
'https://images.wikia.nocookie.net/__cb20140703095555/halo/de/images/b/be/Hintergrund4.png',
'https://images.wikia.nocookie.net/__cb20140703095704/halo/de/images/a/aa/Hintergrund5.png',
'https://images.wikia.nocookie.net/__cb20140703095736/halo/de/images/4/48/Hintergrund6.png',
'https://images.wikia.nocookie.net/__cb20140703095757/halo/de/images/2/28/Hintergrund7.png',
'https://images.wikia.nocookie.net/__cb20140703095851/halo/de/images/4/43/Hintergrund8.png',
'https://images.wikia.nocookie.net/__cb20140703095923/halo/de/images/a/aa/Hintergrund9.png',
'https://images.wikia.nocookie.net/__cb20140703095950/halo/de/images/0/0c/Hintergrund10.png',
'https://images.wikia.nocookie.net/__cb20140703100016/halo/de/images/c/c8/Hintergrund11.png'
		];
 
	if (wgPageName=='Hauptseite') {
		$('body').css('background-image','url(' + opts[0] + ')'); // Auf der Hauptseite wird immer das erste Bild angezeigt
	}
	else
		$('body').css('background-image','url(' + opts[Math.floor((opts.length-1)*Math.random()+1)] + ')'); // Wenn +1 angegeben, erscheint das erste Bild nur auf der Hauptseite
}
 
randomBack();

// ================================================================
// ENDE – Zufälliger Hintergrund
// ================================================================

// ================================================================
// Importierte Skripte
// ================================================================
// "Zurück zum Anfang"-Schaltfläche
// Dokumentation und Autoren: http://dev.wikia.com/wiki/BackToTopButton
// ================================================================

// Importierung
importArticles({
    type: 'script',
    articles: [
        'w:dev:BackToTopButton/code.js',
    ]
});