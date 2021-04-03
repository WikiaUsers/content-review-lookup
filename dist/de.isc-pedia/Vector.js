/* Das folgende JavaScript wird für Benutzer der Vector-Benutzeroberfläche geladen. Allgemeingültiges JavaScript bitte in [[MediaWiki:Common.js]] eintragen. */

/* Der Grossteil des Codes befindet sich in [[MediaWiki:Common.js]] */

/*
 * showTopicon
 * Funktion zum Anzeigen von Bewertungskästchen im rechten oberen Bereich des Artikels,
 * um exzellente bzw. lesenswerte Artikel, ausgezeichnete Bilder und dergleichen zu kennzeichnen.
 *
 * Abschaltbar für angemeldete Benutzer, einfach
 * mw.config.set( 'dontShowTopicons', true )
 * in die eigene vector.js aufnehmen
 */
mw.loader.using( [ 'mediawiki.util', 'user', 'mediawiki.user' ], function() { $( function() { //wait for overrides in user.js
	if ( mw.config.get( 'dontShowTopicons', false ) ) return;
	mw.util.$content
	.find( 'div.topicon' )
	.insertBefore( '#firstHeading' )
	.show();
})});