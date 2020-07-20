/* Add "Create loadout" option to Contribute menu */
 
//for testing
$('.contribute .WikiaMenuElement').prepend('<li><a class="createloadout" data-id="createloadout" href="http://de.animanga.wikia.com/wiki/Spezial:Seite_erstellen?preload=Template%3Aanimanga-infobox%2Fpreload&editintro=Template%3ALoadout%2Feditintro&useeditor=mediawiki">Anime o. Manga hinzufügen</a></li>');
 
/* End add "Create loadout" option to Contribute menu */

//Add fields
$( function () {

var editField = $('textarea[name="wpTextbox1"]');
/* oberstes feld im code ist unterstes feld im popup */

$('.page-Spezial_Seite_erstellen .modalWrapper .fields').prepend('<table cellpadding="0" cellspacing="0"><tr><td style="padding-right: 0.5em;">'                                            +                                                                               '<b>Anime-Informationen</b><br /><label><small>Anzahl Folgen (Format: Absolute Zahl)</small><input type="text" value="" name="AnimeFolgen"></label><br /><small>Deutsche Erstausstrahlung<br />(Format: 03.05.2008-03.07.2009)</small><input type="text" value="" name="AusstrahlungDE"></label><br /><small>Japanische Erstausstrahlung<br />(Format: 03.05.2008-03.07.2009)</small><input type="text" value="" name="AusstrahlungJA"></label><br />'                                                       +                                                                                   '</td><td style="padding-left: 0.5em;">'                                                                              +                                                                            '<b>Manga-Informationen</b><br /><label><small>Anzahl Bände (Format: Absolute Zahl)</small><input type="text" value="" name="MangaBand"></label><br /><small>Deutsche Erstpublikation<br />(Format: 03.05.2008-03.07.2009)</small><input type="text" value="" name="ErstpublikationDE"></label><br /><small>Japanische Erstpublikation<br />(Format: 03.05.2008-03.07.2009)</small><input type="text" value="" name="ErstpublikationJA"></label><br />'                                                                                   +                                                                                 '</td></tr></table>');
$('.page-Spezial_Seite_erstellen .modalWrapper .fields').prepend('<hr></hr><b>Optionales</b><br /><label>Produktionsjahr(e) (Format: 03.05.2008)<input type="text" value="" name="Produktionsjahre"></label><br /><label>Wiki-URL (Format: http://de.animanga.wikia.com/wiki/Animepedia)<input type="text" value="" name="WikiURL"></label><br />');
$('.page-Spezial_Seite_erstellen .modalWrapper .fields').prepend('<label>Bild (Dateiname, Format: Wiki-wordmark.png - wenn du nicht weißt, was angeben, einfach stehen lassen)<input type="text" value="{{subst' + ':' +'PAGENAME}}.jpg" name="Bild"></label>');
$('.page-Spezial_Seite_erstellen .modalWrapper .fields').prepend('<label>Art<br /><select name="Art"><option value="">Bitte auswählen</option><option value="Anime und Manga">Anime und Manga</option><option value="Anime">Anime</option><option value="Manga">Manga</option><option value="Light Novel">Light Novel</option><option value="Anime, Manga und Light Novel">Anime, Manga und Light Novel</option><option value="Manga und Light Novel">Manga und Light Novel</option><option value="Anime und Light Novel">Anime und Light Novel</option></select></label><br /><br />'
);
$('.page-Spezial_Seite_erstellen .modalWrapper .fields').prepend('<label>Name des Animes/Mangas<input type="text" value="" name="Artikelname"></label><br />');

//Hide pagename field
$('.page-Spezial_Seite_erstellen .fields label:last-child').css('display', 'none');
 
//Name
$('.page-Spezial_Seite_erstellen .modalWrapper input[name="Artikelname"]').keyup(function() {
var Artikelname = $('.modalWrapper input[name="Artikelname"]').val();
var nameRegex = /\|Name.*=.*/;

$('.page-Spezial_Seite_erstellen .modalWrapper input[name="wpTitle"]').attr('value','' + Artikelname);
});

//Wiki-URL
$('.page-Spezial_Seite_erstellen .modalWrapper input[name="WikiURL"]').keyup(function() {
var WikiURL = $('.modalWrapper input[name="WikiURL"]').val();
var nameRegex = /\|Wiki-URL.*=.*/;
editField.val( editField.val().replace(nameRegex,'|Wiki-URL = ' + WikiURL) );
});

//Bild
$('.page-Spezial_Seite_erstellen .modalWrapper input[name="Bild"]').keyup(function() {
var Bild = $('.modalWrapper input[name="Bild"]').val();
var nameRegex = /\|Bild.*=.*/;
editField.val( editField.val().replace(nameRegex,'|Bild = ' + Bild) );
});

//Produktionsjahre
$('.page-Spezial_Seite_erstellen .modalWrapper input[name="Produktionsjahre"]').keyup(function() {
var Produktionsjahre = $('.modalWrapper input[name="Produktionsjahre"]').val();
var nameRegex = /\|Produktionsjahre.*=.*/;
editField.val( editField.val().replace(nameRegex,'|Produktionsjahre = ' + Produktionsjahre) );
});


//code - AnimeFolgen -- artikel - Anzahl Folgen
$('.page-Spezial_Seite_erstellen .modalWrapper input[name="AnimeFolgen"]').keyup(function() {
var AnimeFolgen = $('.modalWrapper input[name="AnimeFolgen"]').val();
var nameRegex = /\|Anzahl Folgen.*=.*/;
editField.val( editField.val().replace(nameRegex,'|Anzahl Folgen = ' + AnimeFolgen) );
});

//code - AusstrahlungDE -- artikel - Deutsche Erstausstrahlung
$('.page-Spezial_Seite_erstellen .modalWrapper input[name="AusstrahlungDE"]').keyup(function() {
var AusstrahlungDE = $('.modalWrapper input[name="AusstrahlungDE"]').val();
var nameRegex = /\|Deutsche Erstausstrahlung.*=.*/;
editField.val( editField.val().replace(nameRegex,'|Deutsche Erstausstrahlung = ' + AusstrahlungDE) );
});

//code - AusstrahlungJA -- artikel - Japanische Erstausstrahlung
$('.page-Spezial_Seite_erstellen .modalWrapper input[name="AusstrahlungJA"]').keyup(function() {
var AusstrahlungJA = $('.modalWrapper input[name="AusstrahlungJA"]').val();
var nameRegex = /\|Japanische Erstausstrahlung.*=.*/;
editField.val( editField.val().replace(nameRegex,'|Japanische Erstausstrahlung = ' + AusstrahlungJA) );
});

//code - MangaBand -- artikel - Anzahl Manga-Bände
$('.page-Spezial_Seite_erstellen .modalWrapper input[name="MangaBand"]').keyup(function() {
var MangaBand = $('.modalWrapper input[name="MangaBand"]').val();
var nameRegex = /\|Anzahl Manga-Bände.*=.*/;
editField.val( editField.val().replace(nameRegex,'|Anzahl Manga-Bände = ' + MangaBand) );
});

//verify
//code - ErstpublikationDE -- artikel - Deutsche Erstpublikation
$('.page-Spezial_Seite_erstellen .modalWrapper input[name="ErstpublikationDE"]').keyup(function() {
var ErstpublikationDE = $('.modalWrapper input[name="ErstpublikationDE"]').val();
var nameRegex = /\|Deutsche Erstpublikation.*=.*/;
editField.val( editField.val().replace(nameRegex,'|Deutsche Erstpublikation = ' + ErstpublikationDE) );
});

//code - ErstpublikationJA -- artikel - Japanische Erstpublikation
$('.page-Spezial_Seite_erstellen .modalWrapper input[name="ErstpublikationJA"]').keyup(function() {
var ErstpublikationJA = $('.modalWrapper input[name="ErstpublikationJA"]').val();
var nameRegex = /\|Japanische Erstpublikation.*=.*/;
editField.val( editField.val().replace(nameRegex,'|Japanische Erstpublikation = ' + ErstpublikationJA) );
});


//Art
$('.page-Spezial_Seite_erstellen .modalWrapper select[name="Art"]').on('change click keyup', function() {
var Art = $('.modalWrapper select[name="Art"]').val();
var ArtRegex = /\|Art.*=.*/;
var ArtRegex2 = "ist ein Anime und Manga.";
var ArtRegex3 = "ist ein Anime.";
var ArtRegex4 = "ist ein Manga.";
var ArtRegex5 = "ist eine Light Novel.";
var ArtRegex6 = "ist ein Anime, Manga und eine Light Novel.";
var ArtRegex7 = "ist ein Manga und eine Light Novel.";
var ArtRegex8 = "ist ein Anime, eine Light Novel.";
var ArtRegex9 = "ist ein .";
 
editField.val( editField.val().replace(ArtRegex,'|Art = ' + Art) );
editField.val( editField.val().replace(ArtRegex2,'ist ein ' + Art + '.') );
editField.val( editField.val().replace(ArtRegex3,'ist ein ' + Art + '.') );
editField.val( editField.val().replace(ArtRegex4,'ist ein ' + Art + '.') );
editField.val( editField.val().replace(ArtRegex5,'ist eine ' + Art + '.') );
editField.val( editField.val().replace(ArtRegex6,'ist ein ' + Art + '.') );
editField.val( editField.val().replace(ArtRegex7,'ist ein ' + Art + '.') );
editField.val( editField.val().replace(ArtRegex8,'ist ein ' + Art + '.') );
editField.val( editField.val().replace(ArtRegex9,'ist ein ' + Art + '.') );
});


/* ende - nicht wegmachen, sonst kommt nix im popup an */
}
);